// The one-story film as a timeline of beats over the storyboard's pose model.
// Each beat maps its progress (0–1) to a pose; where a beat matches a
// storyboard board it ends on that board's pose. Pure, so any frame can be
// sampled in tests.

import { Pose } from './scene';
import { clamp01, FPS } from './motion';
import { backlogBeat, flightBeat, FLIGHT_SECONDS, fuzzyBeat, splatBeat, wishBeat } from './storyBeats';
import { ASSIMILATE_SECONDS, assimilateBeat, coherentBeat, wobbleBeat } from './productBeats';
import { HISTORY_SECONDS, historyBeat, NEXT_SECONDS, nextBeat } from './historyBeats';

export { FPS };

export type Beat = {
	name: string;
	seconds: number;
	caption?: string; // shown from this beat until the next captioned beat
	pose: (t: number) => Pose;
};

// --- timeline ------------------------------------------------------------

const beat = (name: string, seconds: number, caption: string | undefined, bySeconds: (sec: number) => Pose): Beat => {
	const frames = Math.round(seconds * FPS);
	return {
		name,
		seconds,
		caption,
		pose: (t) => bySeconds((clamp01(t) * (frames - 1)) / FPS),
	};
};

export const beats: Beat[] = [
	beat('backlog', 2, 'A story is romantic: a wish for a better world.', backlogBeat),
	beat('wish', 3.5, undefined, wishBeat),
	beat('fuzzy', 3, 'It\'s fuzzy. It doesn\'t care about our boundaries.', fuzzyBeat),
	beat('flight', FLIGHT_SECONDS, 'It carries an impact we want in the world…', flightBeat),
	beat('splat', 3, '…and it makes an impact on the product: SPLAT!', splatBeat),
	beat('wobble', 3.5, 'Behavior gets messy. Structure wobbles.', wobbleBeat),
	beat('assimilate', ASSIMILATE_SECONDS, 'Development assimilates the splash…', assimilateBeat),
	beat('coherent', 4, '…into a coherent product, changed where it matters. No scars.', coherentBeat),
	beat('history', HISTORY_SECONDS, 'The spent story goes to history. Available, but out of the way.', historyBeat),
	beat('next', NEXT_SECONDS, 'Ready for the next story.', nextBeat),
];

const framesOf = (b: Beat) => Math.round(b.seconds * FPS);

export const filmDurationInFrames = beats.reduce((sum, b) => sum + framesOf(b), 0);

// Where a beat sits on the film's timeline, in frames.
export const beatRange = (name: string): { from: number; durationInFrames: number } => {
	let from = 0;
	for (const b of beats) {
		if (b.name === name) return { from, durationInFrames: framesOf(b) };
		from += framesOf(b);
	}
	throw new Error(`No beat named ${name}`);
};

const beatAt = (frame: number): { index: number; t: number } => {
	const f = Math.max(0, Math.min(filmDurationInFrames - 1, Math.floor(frame)));
	let from = 0;
	for (let index = 0; index < beats.length; index++) {
		const frames = framesOf(beats[index]);
		if (f < from + frames) return { index, t: frames > 1 ? (f - from) / (frames - 1) : 1 };
		from += frames;
	}
	return { index: beats.length - 1, t: 1 };
};

export const poseAt = (frame: number): Pose => {
	const { index, t } = beatAt(frame);
	return beats[index].pose(t);
};

export const captionAt = (frame: number): string => {
	const { index } = beatAt(frame);
	for (let i = index; i >= 0; i--) {
		const { caption } = beats[i];
		if (caption !== undefined) return caption;
	}
	return '';
};
