import { engineerRig } from '../aiTestAutomation/actors';
import { articulatedArm, gesture, lerpPoint, Point, reach, travel } from '../aiTestAutomation/motion';
import { beat, Beat, timeline, Timeline } from '../beatTimeline';
import { Move, SceneScript } from './script';

/** `hand` is the Engineer's local right-hand target; `resting` maps each prop not in hand to its stage point. */
export type ScenePose = { x: number; y: number; lift: number; hand: Point; gaze: number; held: string | null; resting: Readonly<Record<string, Point>> };

const hasDestination = (move: Move): move is Extract<Move, { to: string }> => move.kind === 'travel' || move.kind === 'cut';
const describeMove = (move: Move) => `${move.kind}${hasDestination(move) ? ` to ${move.to}` : move.kind === 'pick up' ? ` ${move.prop}` : ''}`;
const supportedKinds: Move['kind'][] = ['travel', 'hop', 'hold', 'cut', 'pick up'];

const validateScene = (script: SceneScript) => {
	const fail = (index: number, problem: string): never => {
		const move = script.moves[index];
		const description = move ? describeMove(move) : 'scene start';
		throw new Error(`move ${index + 1} (${description}): ${problem}`);
	};
	const requirePlace = (place: string, index: number) => {
		if (!Object.hasOwn(script.places, place)) {
			fail(index, `unknown place "${place}"; places are ${Object.keys(script.places).join(', ')}`);
		}
	};
	if (script.actor !== 'Engineer') fail(0, `unknown actor "${script.actor}"; actors are Engineer`);
	requirePlace(script.start, 0);
	script.moves.forEach((move, index) => {
		if (!supportedKinds.includes(move.kind)) {
			fail(index, `unknown move kind "${move.kind}"; kinds are ${supportedKinds.join(', ')}`);
		}
		if (hasDestination(move)) requirePlace(move.to, index);
		if (move.kind !== 'cut' && (!Number.isFinite(move.seconds) || move.seconds <= 0)) {
			fail(index, `invalid duration ${move.seconds}; duration must be a finite number greater than 0`);
		}
	});
};

// The shared solver decides reach: a target beyond the arm settles short of it.
const reachable = (target: Point) => {
	const { hand } = articulatedArm(engineerRig.rightShoulder, target, engineerRig.upper, engineerRig.lower, -1);
	return Math.hypot(hand.x - target.x, hand.y - target.y) < 1e-6;
};

export const compileScene = (script: SceneScript, fps = 30): Timeline<ScenePose> => {
	validateScene(script);
	let position: Point = script.places[script.start];
	let hand: Point = engineerRig.restRightHand;
	let held: string | null = null;
	let resting: Readonly<Record<string, Point>> = {};
	Object.entries(script.props).forEach(([prop, start]) => {
		if (start === 'held') {
			if (held !== null) throw new Error(`scene start: ${prop} cannot be held while ${held} is held`);
			held = prop;
			hand = engineerRig.carryHand;
			return;
		}
		const surface = Object.hasOwn(script.places, start.at) ? script.places[start.at].surface : undefined;
		if (!surface) throw new Error(`scene start: ${prop} cannot rest at ${start.at}`);
		resting = { ...resting, [prop]: surface };
	});
	const beats: Beat<ScenePose>[] = script.moves.map((move, index) => {
		const start = position;
		const end = hasDestination(move) ? script.places[move.to] : start;
		position = end;
		const before = { hand, gaze: 0, held, resting };
		// Hop and pick up need a middle sample, travel two endpoints, and hold one.
		const minimumFrames = move.kind === 'hold' ? 1 : move.kind === 'hop' || move.kind === 'pick up' ? 3 : 2;
		const frames = move.kind === 'cut' ? 1 : Math.max(minimumFrames, Math.round(move.seconds * fps));
		const seconds = frames / fps;
		// beat() samples seconds through the last frame, so settle on that frame.
		const lastSeconds = (frames - 1) / fps;
		const name = `${index + 1} ${describeMove(move)}`;
		switch (move.kind) {
			case 'travel':
				return beat(name, seconds, undefined, (elapsed) => ({ ...lerpPoint(start, end, travel(elapsed, 0, lastSeconds)), lift: 0, ...before }), fps);
			case 'hop':
				return beat(name, seconds, undefined, (elapsed) => ({ x: start.x, y: start.y, lift: 80 * gesture(elapsed, 0, lastSeconds), ...before }), fps);
			case 'hold':
				return beat(name, seconds, undefined, () => ({ x: start.x, y: start.y, lift: 0, ...before }), fps);
			case 'cut':
				return beat(name, seconds, undefined, () => ({ x: end.x, y: end.y, lift: 0, ...before }), fps);
			case 'pick up': {
				const { prop } = move;
				const point = Object.hasOwn(resting, prop) ? resting[prop] : undefined;
				const grip = point && reach(start.x, start.y, point.x, point.y, 1);
				if (held !== null || !grip || !reachable(grip)) throw new Error(`move ${index + 1} (${describeMove(move)}): cannot pick up ${prop} here`);
				const stillResting = Object.fromEntries(Object.entries(resting).filter(([name]) => name !== prop));
				// The prop is taken on the middle frame, between the reach and the settle into carry.
				const contactFrame = Math.floor(frames / 2);
				const contactSeconds = contactFrame / fps;
				const gaze = Math.sign(grip.x);
				hand = engineerRig.carryHand;
				held = prop;
				resting = stillResting;
				return beat(name, seconds, undefined, (elapsed) => ({
					x: start.x,
					y: start.y,
					lift: 0,
					gaze: gaze * gesture(elapsed, 0, lastSeconds) || 0,
					...(Math.round(elapsed * fps) < contactFrame
						? { hand: lerpPoint(before.hand, grip, travel(elapsed, 0, contactSeconds)), held: null, resting: before.resting }
						: { hand: lerpPoint(grip, engineerRig.carryHand, travel(elapsed, contactSeconds, lastSeconds - contactSeconds)), held: prop, resting: stillResting }),
				}), fps);
			}
		}
	});
	return timeline(beats, fps);
};
