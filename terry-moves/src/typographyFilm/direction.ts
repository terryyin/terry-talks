import { Easing, interpolate } from 'remotion';
import { beat, timeline, Timeline } from '../beatTimeline';

export type TypeGroup = {
	id: string;
	lines: string[];
	size: number;
	weight: number;
	letterSpacing: number;
	lineHeight: number;
	spaceBefore: number;
	tone: 'ink' | 'quiet' | 'accent';
	motion: {
		delaySeconds: number;
		revealSeconds: number;
		settleSeconds: number;
		risePixels: number;
	};
};

export type TypePassage = {
	id: string;
	groups: TypeGroup[];
	holdSeconds: number;
};

export type TypeDirection = { passages: TypePassage[] };
export type TypePose = {
	passage: string;
	groups: (TypeGroup & { opacity: number; y: number })[];
};

const motionProgress = (seconds: number, delay: number, duration: number) => {
	if (duration === 0) return seconds >= delay ? 1 : 0;
	return interpolate(seconds, [delay, delay + duration], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});
};

// The existing beat clock owns ordering, frame rounding and seek sampling.
// A reading hold starts only after the last group has revealed and settled.
export const typographyTimeline = (direction: TypeDirection, fps: number): Timeline<TypePose> => timeline(
	direction.passages.map((passage) => {
		const entranceSeconds = Math.max(...passage.groups.map(({ motion }) =>
			motion.delaySeconds + Math.max(motion.revealSeconds, motion.settleSeconds)));
		return beat(passage.id, entranceSeconds + passage.holdSeconds, undefined, (seconds) => ({
			passage: passage.id,
			groups: passage.groups.map((group) => ({
				...group,
				opacity: motionProgress(seconds, group.motion.delaySeconds, group.motion.revealSeconds),
				y: group.motion.risePixels * (1 - motionProgress(seconds, group.motion.delaySeconds, group.motion.settleSeconds)),
			})),
		}), fps);
	}), fps,
);
