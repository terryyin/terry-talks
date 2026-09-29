// Films as timelines of beats over the storyboard's pose model; the
// one-story film is one of them.
// Each beat maps its progress (0–1) to a pose; where a beat matches a
// storyboard board it ends on that board's pose. Pure, so any frame can be
// sampled in tests.

import { Pose } from './scene';
import { afterABreath, paced } from './readingPace';
import { clamp01, FPS } from './motion';
import { backlogBeat, FLIGHT_SECONDS, splatBeat } from './storyBeats';
import { ASSIMILATE_SECONDS, WOBBLE_SECONDS } from './productBeats';
import { FOCUS_SECONDS, productAssimilateBeat, productCoherentBeat, productWobbleBeat, valueFlightBeat, valueFocusBeat, valueFuzzyBeat, valueWishBeat } from './focus';
import { HISTORY_SECONDS, NEXT_SECONDS, nextBeat } from './historyBeats';
import { DOMAIN_SECONDS, TESTS_SECONDS } from './protectBeats';
import { CUSTOMER_SECONDS, NEW_IDEA_SECONDS } from './customerBeats';
import { customerValueBeat, IMPACT_SECONDS, impactBeat, newIdeaValueBeat, optionDomainBeat, optionTestsBeat, pinkHistoryBeat } from './valueBeats';

export { FPS, WOBBLE_SECONDS };

export type Beat = {
	name: string;
	seconds: number;
	caption?: string; // shown from this beat until the next captioned beat
	pause?: number; // seconds the caption line stays empty first, a breath
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

// The arithmetic of a film made of the given beats, in order, each caption
// paced for reading.
export const timeline = (authored: Beat[]): Timeline => {
	const beats = paced(authored);
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
			const { caption, name, pause } = beats[i];
			if (caption === undefined) continue;
			const breathing = pause !== undefined && Math.floor(frame) < beatRange(name).from + Math.round(pause * FPS);
			return breathing ? '' : caption;
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
	beat('focus', FOCUS_SECONDS, 'It\'s focused on customer value.', valueFocusBeat),
	beat('fuzzy', 3, 'It\'s fuzzy. It doesn\'t care about our boundaries.', valueFuzzyBeat),
	beat('flight', FLIGHT_SECONDS, 'It carries an impact we want in the world…', valueFlightBeat),
	beat('splat', SPLAT_SECONDS, '…and it makes an impact on the product: SPLAT!', splatBeat),
	afterABreath(beat('wobble', WOBBLE_SECONDS, 'Behavior gets messy. Structure wobbles.', productWobbleBeat)),
	beat('assimilate', ASSIMILATE_SECONDS, 'Developers assimilate the splash…', productAssimilateBeat),
	beat('coherent', COHERENT_SECONDS, '…into a coherent product, changed where it matters. No scars.', productCoherentBeat),
	afterABreath(beat('impact', IMPACT_SECONDS, 'A story\'s goal is an impact, with two values.', impactBeat)),
	beat('customer', CUSTOMER_SECONDS, 'Customer value: people feel the new behavior…', customerValueBeat),
	beat('new-idea', NEW_IDEA_SECONDS, '…and bring new ideas. The backlog is reordered.', newIdeaValueBeat),
	afterABreath(beat('tests', TESTS_SECONDS, 'Option value, unseen by users: judgment spent on tests…', optionTestsBeat)),
	beat('domain', DOMAIN_SECONDS, '…and on a structure that maps the domain.', optionDomainBeat),
	beat('history', HISTORY_SECONDS, 'The spent story goes to history. Available, but out of the way.', pinkHistoryBeat),
	beat('next', NEXT_SECONDS, 'Ready for the next story.', nextBeat),
];

const oneStory = timeline(beats);

export const filmDurationInFrames = oneStory.durationInFrames;
export const { beatRange, poseAt, captionAt } = oneStory;
