// What keeps the product coherent once the story is assimilated: first a
// test shield pops onto every Behavior column, then each Structure row is
// linked to a domain concept: the option value a story leaves behind.

import { Easing } from 'remotion';
import { Pose, StoryBefore, StorySpec } from './scene';
import { coherentProductOf } from './assimilation';
import { between } from './motion';

export const TESTS_SECONDS = 2.8;
export const DOMAIN_SECONDS = 2.7;

const tidily = (sec: number, from: number, to: number) => between(sec, from, to, Easing.inOut(Easing.cubic));

export const testsBeatOf = (spec: StorySpec, before: StoryBefore) => (sec: number): Pose => ({
	...coherentProductOf(spec, before),
	protect: { shields: tidily(sec, 0.2, 1.5), links: 0 },
});

export const domainBeatOf = (spec: StorySpec, before: StoryBefore) => (sec: number): Pose => ({
	...coherentProductOf(spec, before),
	protect: { shields: 1, links: tidily(sec, 0.1, 1.6) },
});

