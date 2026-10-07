import { gesture, lerpPoint, travel } from '../aiTestAutomation/motion';
import { beat, Beat, timeline, Timeline } from '../beatTimeline';
import { Move, SceneScript } from './script';

export type ScenePose = { x: number; y: number; lift: number };

const hasDestination = (move: Move): move is Extract<Move, { to: string }> => move.kind === 'travel' || move.kind === 'cut';
const describeMove = (move: Move) => `${move.kind}${hasDestination(move) ? ` to ${move.to}` : ''}`;
const supportedKinds: Move['kind'][] = ['travel', 'hop', 'hold', 'cut'];

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

export const compileScene = (script: SceneScript, fps = 30): Timeline<ScenePose> => {
	validateScene(script);
	let position = script.places[script.start];
	const beats: Beat<ScenePose>[] = script.moves.map((move, index) => {
		const start = position;
		const end = hasDestination(move) ? script.places[move.to] : start;
		position = end;
		// Hop needs a lifted middle sample, travel two endpoints, and hold one.
		const minimumFrames = move.kind === 'hold' ? 1 : move.kind === 'hop' ? 3 : 2;
		const frames = move.kind === 'cut' ? 1 : Math.max(minimumFrames, Math.round(move.seconds * fps));
		const seconds = frames / fps;
		// beat() samples seconds through the last frame, so settle on that frame.
		const lastSeconds = (frames - 1) / fps;
		const name = `${index + 1} ${describeMove(move)}`;
		switch (move.kind) {
			case 'travel':
				return beat(name, seconds, undefined, (elapsed) => ({ ...lerpPoint(start, end, travel(elapsed, 0, lastSeconds)), lift: 0 }), fps);
			case 'hop':
				return beat(name, seconds, undefined, (elapsed) => ({ ...start, lift: 80 * gesture(elapsed, 0, lastSeconds) }), fps);
			case 'hold':
				return beat(name, seconds, undefined, () => ({ ...start, lift: 0 }), fps);
			case 'cut':
				return beat(name, seconds, undefined, () => ({ ...end, lift: 0 }), fps);
		}
	});
	return timeline(beats, fps);
};
