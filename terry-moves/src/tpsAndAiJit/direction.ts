import { Easing, interpolate } from 'remotion';
import { beat, timeline } from '../beatTimeline';
import { TypeDirection } from '../typographyFilm/direction';
import { FocusView, SceneId, sceneById } from './film';

const heading = (id: string, text: string, seconds: number, size = 76): TypeDirection => {
	const lines = text.split('\n');
	const entrance = 0.45 + (lines.length - 1) * 0.18;
	return { passages: [{
		id,
		holdSeconds: seconds - entrance,
		groups: lines.map((line, index) => ({
			id: `${id}-${index}`,
			lines: [line], size, weight: 400, letterSpacing: -2.5, lineHeight: 1.14, spaceBefore: 0, tone: 'ink',
			motion: { delaySeconds: index * 0.18, revealSeconds: 0.28, settleSeconds: 0.45, risePixels: 10 },
		})),
	}] };
};

// Copy stays in the accepted film script; direction owns only its performance.
const sceneHeading = (id: SceneId, size?: number) => {
	const scene = sceneById(id);
	return heading(id, scene.heading, scene.end - scene.start, size);
};
export const headingDirections = {
	resourceful: sceneHeading('resourceful'),
	pull: sceneHeading('pull'),
	feedback: sceneHeading('feedback'),
	integration: sceneHeading('integration', 64),
	closing: sceneHeading('closing', 82),
};

export const definitionDirections = sceneById('house').definitionViews!.map((view, index) =>
	heading(`definition-${index}`, view.heading, view.end - view.start));

const moveSeconds = 0.6;
const cameraValueAt = (seconds: number, range: [number, number]) => interpolate(seconds, [0, moveSeconds], range, {
	extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.65, 0, 0.35, 1),
});

export const closingFramingAt = (seconds: number) => ({
	top: cameraValueAt(seconds, [294, 250]),
	height: cameraValueAt(seconds, [536, 580]),
});

export type PanoramaPose = { view: FocusView; opacity: number; outgoing?: { view: FocusView; opacity: number } };

// Reuse the beat clock so direct seeks produce the same camera pose as playback.
// A mask change dissolves; compatible views travel through source coordinates.
export const panoramaTimeline = (views: FocusView[], fps: number) => timeline(views.map((view, index) =>
	beat<PanoramaPose>(view.id, view.end - view.start, undefined, (seconds) => {
		const previous = views[index - 1];
		if (!previous) return { view, opacity: 1 };
		const progress = cameraValueAt(seconds, [0, 1]);
		if (previous.clipPath !== view.clipPath) return {
			view, opacity: progress,
			...(progress < 1 ? { outgoing: { view: previous, opacity: 1 - progress } } : {}),
		};
		const between = (key: 'x' | 'y' | 'width' | 'height') => previous[key] + (view[key] - previous[key]) * progress;
		return { view: { ...view, x: between('x'), y: between('y'), width: between('width'), height: between('height') }, opacity: 1 };
	}, fps)), fps);
