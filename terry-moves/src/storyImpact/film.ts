// Films as timelines of beats over the storyboard's pose model; the
// one-story film is one of them.
// Each beat maps its progress (0–1) to a pose; where a beat matches a
// storyboard board it ends on that board's pose. Pure, so any frame can be
// sampled in tests.

import { Pose } from './scene';
import { clamp01, FPS } from './motion';
import { backlogBeat, FLIGHT_SECONDS, splatBeat } from './storyBeats';
import { ASSIMILATE_SECONDS, WOBBLE_SECONDS } from './productBeats';
import { productAssimilateBeat, productCoherentBeat, productWobbleBeat, valueFlightBeat, valueFuzzyBeat, valueWishBeat } from './focus';
import { HISTORY_SECONDS, historyBeat, NEXT_SECONDS, nextBeat } from './historyBeats';
import { DOMAIN_SECONDS, domainBeat, TESTS_SECONDS, testsBeat } from './protectBeats';
import { CUSTOMER_SECONDS, customerBeat, NEW_IDEA_SECONDS, newIdeaBeat } from './customerBeats';

export { FPS, WOBBLE_SECONDS };

export type Beat = {
	name: string;
	seconds: number;
	caption?: string; // shown from this beat until the next captioned beat
	pose: (t: number) => Pose;
};

// --- timeline ------------------------------------------------------------

// A beat whose pose is given by seconds into the beat.
export const beat = (name: string, seconds: number, caption: string | undefined, bySeconds: (sec: number) => Pose): Beat => {
	const frames = Math.round(seconds * FPS);
	return {
		name,
		seconds,
		caption,
		pose: (t) => bySeconds((clamp01(t) * (frames - 1)) / FPS),
	};
};

// A beat that plays a longer beat's motion faster, so it still ends where
// that beat ends.
export const squeezed = (
	name: string,
	seconds: number,
	caption: string | undefined,
	bySeconds: (sec: number) => Pose,
	fromSeconds: number,
): Beat => {
	const speed = (Math.round(fromSeconds * FPS) - 1) / (Math.round(seconds * FPS) - 1);
	return beat(name, seconds, caption, (sec) => bySeconds(sec * speed));
};

export type Timeline = {
	beats: Beat[];
	durationInFrames: number;
	// Where a beat sits on the film's timeline, in frames.
	beatRange: (name: string) => { from: number; durationInFrames: number };
	poseAt: (frame: number) => Pose;
	captionAt: (frame: number) => string;
};

const framesOf = (b: Beat) => Math.round(b.seconds * FPS);

// The arithmetic of a film made of the given beats, in order.
export const timeline = (beats: Beat[]): Timeline => {
	const durationInFrames = beats.reduce((sum, b) => sum + framesOf(b), 0);

	const beatRange = (name: string): { from: number; durationInFrames: number } => {
		let from = 0;
		for (const b of beats) {
			if (b.name === name) return { from, durationInFrames: framesOf(b) };
			from += framesOf(b);
		}
		throw new Error(`No beat named ${name}`);
	};

	const beatAt = (frame: number): { index: number; t: number } => {
		const f = Math.max(0, Math.min(durationInFrames - 1, Math.floor(frame)));
		let from = 0;
		for (let index = 0; index < beats.length; index++) {
			const frames = framesOf(beats[index]);
			if (f < from + frames) return { index, t: frames > 1 ? (f - from) / (frames - 1) : 1 };
			from += frames;
		}
		return { index: beats.length - 1, t: 1 };
	};

	const poseAt = (frame: number): Pose => {
		const { index, t } = beatAt(frame);
		return beats[index].pose(t);
	};

	const captionAt = (frame: number): string => {
		const { index } = beatAt(frame);
		for (let i = index; i >= 0; i--) {
			const { caption } = beats[i];
			if (caption !== undefined) return caption;
		}
		return '';
	};

	return { beats, durationInFrames, beatRange, poseAt, captionAt };
};

// The one-story film.
export const SPLAT_SECONDS = 3;
export const COHERENT_SECONDS = 4;

export const beats: Beat[] = [
	beat('backlog', 2, 'A story is romantic: a wish for a better world.', backlogBeat),
	beat('wish', 3.5, undefined, valueWishBeat),
	beat('fuzzy', 3, 'It\'s fuzzy. It doesn\'t care about our boundaries.', valueFuzzyBeat),
	beat('flight', FLIGHT_SECONDS, 'It carries an impact we want in the world…', valueFlightBeat),
	beat('splat', SPLAT_SECONDS, '…and it makes an impact on the product: SPLAT!', splatBeat),
	beat('wobble', WOBBLE_SECONDS, 'Behavior gets messy. Structure wobbles.', productWobbleBeat),
	beat('assimilate', ASSIMILATE_SECONDS, 'Developers assimilate the splash…', productAssimilateBeat),
	beat('coherent', COHERENT_SECONDS, '…into a coherent product, changed where it matters. No scars.', productCoherentBeat),
	beat('tests', TESTS_SECONDS, 'Judgment spent: tests guard what it does…', testsBeat),
	beat('domain', DOMAIN_SECONDS, '…and how it\'s built maps the domain.', domainBeat),
	beat('customer', CUSTOMER_SECONDS, 'A customer feels the impact… and gets a new idea!', customerBeat),
	beat('new-idea', NEW_IDEA_SECONDS, 'New ideas join the backlog, and it\'s reordered.', newIdeaBeat),
	beat('history', HISTORY_SECONDS, 'The spent story goes to history. Available, but out of the way.', historyBeat),
	beat('next', NEXT_SECONDS, 'Ready for the next story.', nextBeat),
];

const oneStory = timeline(beats);

export const filmDurationInFrames = oneStory.durationInFrames;
export const { beatRange, poseAt, captionAt } = oneStory;
