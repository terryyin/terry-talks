import { Easing, interpolate } from 'remotion';
import { beat, timeline } from '../beatTimeline';
import { TypeDirection } from '../typographyFilm/direction';
import { FilmScene, SceneId, sceneById } from './film';

const directionFor = (id: SceneId, size: number): TypeDirection => {
	const scene = sceneById(id);
	const lines = scene.heading.split('\n');
	const entrance = 0.5 + (lines.length - 1) * 0.15;
	return { passages: [{ id, holdSeconds: scene.end - scene.start - entrance, groups: lines.map((line, index) => ({
		id: `${id}-${index}`, lines: [line], size, weight: 400, letterSpacing: -2.5, lineHeight: 1.14, spaceBefore: 0, tone: 'ink',
		motion: { delaySeconds: index * 0.15, revealSeconds: 0.3, settleSeconds: 0.5, risePixels: 10 },
	})) }] };
};

export const headingDirections = {
	free: directionFor('free', 74),
	entrust: directionFor('entrust', 76),
	agency: directionFor('agency', 68),
	respect: directionFor('respect', 76),
	improve: directionFor('improve', 70),
	cycle: directionFor('cycle', 76),
	closing: directionFor('closing', 76),
};

export const enterProgress = (seconds: number, duration = 0.5): number => interpolate(seconds, [0, duration], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.65, 0, 0.35, 1) });

export const teachingViewAt = (scene: FilmScene, seconds: number) => {
	const change = scene.captionRanges[scene.captionRanges.length - 1].start;
	return { second: seconds >= change, opacity: enterProgress(seconds - change, 0.45) };
};

export type CycleNode = 'safeguards' | 'freedom' | 'capability' | 'trust';
export const cycleTimeline = (fps: number) => {
	const scene = sceneById('cycle');
	const [first, second] = scene.captionRanges;
	const boundaries = [first.start, (first.start + first.end) / 2, second.start, (second.start + second.end) / 2, scene.end].map((seconds) => Math.round((seconds - scene.start) * fps));
	const duration = (index: number) => (boundaries[index + 1] - boundaries[index]) / fps;
	return timeline([
		beat<CycleNode>('safeguards', duration(0), undefined, () => 'safeguards', fps),
		beat<CycleNode>('freedom', duration(1), undefined, () => 'freedom', fps),
		beat<CycleNode>('capability', duration(2), undefined, () => 'capability', fps),
		beat<CycleNode>('trust', duration(3), undefined, () => 'trust', fps),
	], fps);
};
