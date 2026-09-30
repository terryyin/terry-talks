// The film as a function of the frame: a short opening (the finished,
// patchwork product wiped back to paper as the title lands), Bas's clip with
// the scene following his narration, the scene's last moment held, and the
// end card. Pure, so any frame can be sampled in tests.

import { Easing } from 'remotion';
import { between, bounce, BOUNCY, POPPY, settle } from '../storyImpact/motion';
import { palette } from '../storyImpact/scene';
import type { EndCardPose, TitlePose } from '../storyImpact/scene';
import { CLIP_SECONDS } from './cues';
import { mixHex, Pose, poseAt } from './pose';

export { FPS } from '../storyImpact/motion';
import { FPS } from '../storyImpact/motion';

export const TITLE = { romantic: 'Team friction,', disciplined: 'raises standards' } as const;
export const END = {
	lead: 'Friction is painful, but',
	romantic: 'useful.',
	disciplined: 'when facilitated.',
	credit: 'An idea and film by Terry Yin',
	bas: 'Content and voice by Bas Vodde',
} as const;

export const OPEN_SECONDS = 3.6;
export const HOLD_SECONDS = 1.5; // the scene's last moment, after Bas has finished
export const END_SECONDS = 7;
export const OPEN_FRAMES = Math.round(OPEN_SECONDS * FPS);
// Bas's clip is 113.508 s long; it plays in full.
export const CLIP_FRAMES = Math.ceil(113.508 * FPS);
export const durationInFrames = OPEN_FRAMES + Math.round((CLIP_SECONDS + HOLD_SECONDS + END_SECONDS) * FPS);

export type BasEndCardPose = EndCardPose & { bas: number };

export type FilmPose = {
	scene: Pose;
	stage: number; // scale of the stage; 0 = away
	title?: TitlePose;
	endCard?: BasEndCardPose;
	clipShown: number; // pop-in scale of Bas's inset
};

// The cover: Bas's "Aren't we supposed to write tests here?" moment, the
// two splashes overlapping and the conversation opened.
export const COVER_CLIP_SECONDS = 59.6;
export const COVER_FRAME = OPEN_FRAMES + Math.round(COVER_CLIP_SECONDS * FPS);

const titleAt = (o: number): TitlePose => ({
	...TITLE,
	splash: bounce(o, 1.2, POPPY),
	drops: [...TITLE.romantic].map((_, i) => (o < 1.4 + i * 0.04 ? null : 150 * (1 - bounce(o, 1.4 + i * 0.04, BOUNCY)))),
	snap: between(o, 1.95, 2.2, Easing.out(Easing.back(2.5))),
	underline: between(o, 2.2, 2.65, Easing.inOut(Easing.cubic)),
	leave: settle(between(o, 2.85, 3.3, Easing.in(Easing.back(1.8))), 1),
});

// The scene with its paper eased to the plain paper the title and end card sit on.
const onPlainPaper = (scene: Pose, k: number): Pose => ({ ...scene, look: { ...scene.look, paper: mixHex(scene.look.paper, palette.paper, k) } });

const opening = (o: number): FilmPose => {
	const teaser = o < 1.3;
	return {
		scene: onPlainPaper(poseAt(teaser ? CLIP_SECONDS : 0), between(o, 0.8, 1.3)),
		stage: teaser ? 1 - between(o, 0.8, 1.3, Easing.in(Easing.back(1.5))) : between(o, 3.25, 3.6, Easing.out(Easing.back(1.4))),
		title: o < 1.3 ? undefined : titleAt(o),
		clipShown: 0,
	};
};

const ending = (e: number): FilmPose => ({
	scene: onPlainPaper(poseAt(CLIP_SECONDS + HOLD_SECONDS), between(e, 0, 0.6)),
	stage: 1 - settle(between(e, 0, 0.5, Easing.in(Easing.back(1.8))), 1),
	endCard: {
		splash: bounce(e, 0.55, POPPY),
		lead: between(e, 0.6, 0.85, Easing.out(Easing.back(2.5))),
		drops: [...END.romantic].map((_, i) => (e < 0.95 + i * 0.06 ? null : 170 * (1 - bounce(e, 0.95 + i * 0.06, BOUNCY)))),
		snap: between(e, 2.0, 2.25, Easing.out(Easing.back(2.5))),
		underline: between(e, 2.25, 2.7, Easing.inOut(Easing.cubic)),
		credit: between(e, 3.4, 3.75, Easing.out(Easing.back(2.2))),
		bas: between(e, 4.1, 4.45, Easing.out(Easing.back(2.2))),
	},
	clipShown: 0,
});

// Seconds into Bas's clip at a film frame (negative in the opening).
export const clipSecondsAt = (frame: number): number => frame / FPS - OPEN_SECONDS;

export const filmPoseAt = (frame: number): FilmPose => {
	const f = Math.max(0, Math.min(durationInFrames - 1, Math.floor(frame)));
	const s = clipSecondsAt(f);
	if (s < 0) return opening(f / FPS);
	if (s >= CLIP_SECONDS + HOLD_SECONDS) return ending(s - CLIP_SECONDS - HOLD_SECONDS);
	const clipOver = s >= CLIP_SECONDS;
	return {
		scene: poseAt(s),
		stage: 1,
		clipShown: clipOver ? 1 - between(s, CLIP_SECONDS, CLIP_SECONDS + 0.4) : bounce(s, 0, POPPY),
	};
};
