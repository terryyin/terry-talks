import { engineerRig } from '../aiTestAutomation/actors';
import { articulatedArm, gesture, lerpPoint, Point, reach, travel } from '../aiTestAutomation/motion';
import { beat, Beat, timeline, Timeline } from '../beatTimeline';
import { Move, SceneScript } from './script';

/** `hand` is the Engineer's local right-hand target; `resting` maps each prop not in hand to its stage point. */
export type ScenePose = { x: number; y: number; lift: number; hand: Point; gaze: number; held: string | null; resting: Readonly<Record<string, Point>> };

const hasDestination = (move: Move): move is Extract<Move, { to: string }> => move.kind === 'travel' || move.kind === 'cut';
const handlesProp = (move: Move): move is Extract<Move, { prop: string }> => move.kind === 'pick up' || move.kind === 'put down';
const describeMove = (move: Move) => `${move.kind}${hasDestination(move) ? ` to ${move.to}` : handlesProp(move) ? ` ${move.prop}` : ''}`;
const supportedKinds: Move['kind'][] = ['travel', 'hop', 'hold', 'cut', 'pick up', 'put down'];

// The shared solver decides reach: a target beyond the arm settles short of it.
const reachable = (target: Point) => {
	const { hand } = articulatedArm(engineerRig.rightShoulder, target, engineerRig.upper, engineerRig.lower, -1);
	return Math.hypot(hand.x - target.x, hand.y - target.y) < 1e-6;
};

const list = (names: string[]) => names.join(', ') || 'none';

/** Where the Engineer stands, what is in hand, and the place each other prop rests at, by name. */
type Staging = { place: string; held: string | null; restsAt: Readonly<Record<string, string>> };

// Asked only of a place the rehearsal found a surface at.
const surfaceAt = (script: SceneScript, place: string) => script.places[place].surface!;

// Walks the script by name, so a problem can say how to fix it; returns the staging before each move and after the last.
const rehearse = (script: SceneScript): Staging[] => {
	const report = (where: string, problem: string): never => {
		throw new Error(`${where}: ${problem}`);
	};
	const fail = (index: number, problem: string): never => {
		const move = script.moves[index];
		return report(`move ${index + 1} (${move ? describeMove(move) : 'scene start'})`, problem);
	};
	const places = Object.keys(script.places).join(', ');
	const requirePlace = (place: string, index: number) => {
		if (!Object.hasOwn(script.places, place)) fail(index, `unknown place "${place}"; places are ${places}`);
	};
	if (script.actor !== 'Engineer') fail(0, `unknown actor "${script.actor}"; actors are Engineer`);
	requirePlace(script.start, 0);
	const surfaces = list(Object.keys(script.places).filter((place) => script.places[place].surface));
	const beyondReach = (surfaceOf: string, from: string) => {
		const { x, y } = script.places[from];
		const surface = surfaceAt(script, surfaceOf);
		return !reachable(reach(x, y, surface.x, surface.y, 1));
	};
	let now: Staging = { place: script.start, held: null, restsAt: {} };
	Object.entries(script.props).forEach(([prop, start]) => {
		if (start === 'held') {
			if (now.held !== null) report('scene start', `${now.held} and ${prop} are both held; only one prop can be held`);
			now = { ...now, held: prop };
			return;
		}
		if (!Object.hasOwn(script.places, start.at)) report('scene start', `${prop} rests at unknown place "${start.at}"; places are ${places}`);
		if (!script.places[start.at].surface) report('scene start', `${prop} rests at ${start.at}, which has no surface; surfaces are ${surfaces}`);
		now = { ...now, restsAt: { ...now.restsAt, [prop]: start.at } };
	});
	const handled = ({ kind, prop }: Extract<Move, { prop: string }>, index: number): Staging => {
		const { place, held, restsAt } = now;
		if (!Object.hasOwn(script.props, prop)) fail(index, `unknown prop "${prop}"; props are ${list(Object.keys(script.props))}`);
		if (kind === 'pick up') {
			if (held === prop) fail(index, `${prop} is already in hand`);
			if (held !== null) fail(index, `the Engineer at ${place} already holds ${held}; put down ${held} first`);
			const { [prop]: at, ...others } = restsAt;
			if (beyondReach(at, place)) {
				fail(index, at === place
					? `${prop} rests at ${at}, but the ${at} surface is beyond the Engineer's reach from ${at}; move the surface closer`
					: `${prop} rests at ${at}, out of reach from ${place}; travel or cut to ${at} first`);
			}
			return { place, held: prop, restsAt: others };
		}
		if (held === null) fail(index, 'nothing is held');
		if (held !== prop) fail(index, `${prop} rests at ${restsAt[prop]}, not in hand; the Engineer at ${place} holds ${held}`);
		if (!script.places[place].surface) fail(index, `${place} has no surface; surfaces are ${surfaces}`);
		if (beyondReach(place, place)) fail(index, `${prop} is in hand at ${place}, but the ${place} surface is beyond the Engineer's reach; move the surface closer`);
		return { place, held: null, restsAt: { ...restsAt, [prop]: place } };
	};
	return [now, ...script.moves.map((move, index) => {
		if (!supportedKinds.includes(move.kind)) {
			fail(index, `unknown move kind "${move.kind}"; kinds are ${supportedKinds.join(', ')}`);
		}
		if (hasDestination(move)) requirePlace(move.to, index);
		if (move.kind !== 'cut' && (!Number.isFinite(move.seconds) || move.seconds <= 0)) {
			fail(index, `invalid duration ${move.seconds}; duration must be a finite number greater than 0`);
		}
		if (hasDestination(move)) now = { ...now, place: move.to };
		if (handlesProp(move)) now = handled(move, index);
		return now;
	})];
};

export const compileScene = (script: SceneScript, fps = 30): Timeline<ScenePose> => {
	const stagings = rehearse(script);
	const handOf = (held: string | null) => (held === null ? engineerRig.restRightHand : engineerRig.carryHand);
	const propsIn = ({ held, restsAt }: Staging) => ({ held, resting: Object.fromEntries(Object.entries(restsAt).map(([prop, place]) => [prop, surfaceAt(script, place)])) });
	const beats: Beat<ScenePose>[] = script.moves.map((move, index) => {
		const [from, to] = [stagings[index], stagings[index + 1]];
		const [start, end] = [script.places[from.place], script.places[to.place]];
		const before = { hand: handOf(from.held), gaze: 0, ...propsIn(from) };
		// Hop, pick up, and put down need a middle sample, travel two endpoints, and hold one.
		const minimumFrames = move.kind === 'hold' ? 1 : move.kind === 'hop' || handlesProp(move) ? 3 : 2;
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
			case 'pick up':
			case 'put down': {
				// A pick up reaches where the prop rests; a put down reaches the surface of the place the actor stands at.
				const point = surfaceAt(script, move.kind === 'pick up' ? from.restsAt[move.prop] : from.place);
				const grip = reach(start.x, start.y, point.x, point.y, 1);
				const settled = handOf(to.held);
				const after = propsIn(to);
				// The prop changes hands on the middle frame, between the reach and the settle.
				const contactFrame = Math.floor(frames / 2);
				const contactSeconds = contactFrame / fps;
				const gaze = Math.sign(grip.x);
				return beat(name, seconds, undefined, (elapsed) => ({
					x: start.x,
					y: start.y,
					lift: 0,
					gaze: gaze * gesture(elapsed, 0, lastSeconds) || 0,
					...(Math.round(elapsed * fps) < contactFrame
						? { hand: lerpPoint(before.hand, grip, travel(elapsed, 0, contactSeconds)), held: before.held, resting: before.resting }
						: { hand: lerpPoint(grip, settled, travel(elapsed, contactSeconds, lastSeconds - contactSeconds)), ...after }),
				}), fps);
			}
		}
	});
	return timeline(beats, fps);
};
