import { gesture, lerpPoint, travel } from '../aiTestAutomation/motion';
import { beat, Beat, timeline, Timeline } from '../beatTimeline';
import { SceneScript } from './script';

export type ScenePose = { x: number; y: number; lift: number };

export const compileScene = (script: SceneScript, fps = 30): Timeline<ScenePose> => {
	let position = script.places[script.start];
	const beats: Beat<ScenePose>[] = script.moves.map((move, index) => {
		const start = position;
		// Hop needs a lifted middle sample, travel two endpoints, and hold one.
		const minimumFrames = move.kind === 'hold' ? 1 : move.kind === 'hop' ? 3 : 2;
		const frames = Math.max(minimumFrames, Math.round(move.seconds * fps));
		const seconds = frames / fps;
		// beat() samples seconds through the last frame, so settle on that frame.
		const lastSeconds = (frames - 1) / fps;
		const name = `${index + 1} ${move.kind}${move.kind === 'travel' ? ` to ${move.to}` : ''}`;
		switch (move.kind) {
			case 'travel': {
				const end = script.places[move.to];
				position = end;
				return beat(name, seconds, undefined, (elapsed) => ({ ...lerpPoint(start, end, travel(elapsed, 0, lastSeconds)), lift: 0 }), fps);
			}
			case 'hop':
				return beat(name, seconds, undefined, (elapsed) => ({ ...start, lift: 80 * gesture(elapsed, 0, lastSeconds) }), fps);
			case 'hold':
				return beat(name, seconds, undefined, () => ({ ...start, lift: 0 }), fps);
		}
	});
	return timeline(beats, fps);
};
