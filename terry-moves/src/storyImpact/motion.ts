// Motion helpers for the film's beats: easing values, springs, and the
// settling rules that let a beat end exactly on a storyboard pose.

import { interpolate, spring, SpringConfig } from 'remotion';
import { Point } from './layout';

export const FPS = 30;

export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

// From 0 to 1 between two moments of a beat, held at either end.
export const between = (sec: number, from: number, to: number, easing?: (t: number) => number) =>
	interpolate(sec, [from, to], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing });

export const lerpPoint = (a: Point, b: Point, k: number): Point => ({ x: lerp(a.x, b.x, k), y: lerp(a.y, b.y, k) });

// A value close enough to where it settles is exactly there, so beats end on
// the storyboard's poses.
export const settle = (v: number, target: number) => (Math.abs(v - target) < 1e-3 ? target : v);

// A field is left out once it is back at its storyboard look.
export const unless = <T>(v: T, rest: T): T | undefined => (v === rest ? undefined : v);

export const withoutUndefined = <T extends object>(o: T): T =>
	Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined)) as T;

export const BOUNCY: Partial<SpringConfig> = { damping: 9, stiffness: 140, mass: 0.8 };
export const POPPY: Partial<SpringConfig> = { damping: 8, stiffness: 180, mass: 0.6 };
export const WOBBLY: Partial<SpringConfig> = { damping: 6, stiffness: 120, mass: 0.7 };

// Springs from 0 toward 1 starting `delay` seconds into the beat.
export const bounce = (sec: number, delay: number, config: Partial<SpringConfig>) =>
	settle(spring({ frame: Math.max(0, Math.round((sec - delay) * FPS)), fps: FPS, config }), 1);

// Speed of a spring in units per frame, for squash and stretch.
export const bounceSpeed = (sec: number, delay: number, config: Partial<SpringConfig>) =>
	bounce(sec + 0.5 / FPS, delay, config) - bounce(sec - 0.5 / FPS, delay, config);

// A decaying jelly wobble around 1.
export const jelly = (sec: number, delay: number, amount: number, hz = 3, decay = 3.2) => {
	const s = sec - delay;
	if (s <= 0) return 1;
	return settle(1 + amount * Math.sin(2 * Math.PI * hz * s) * Math.exp(-decay * s), 1);
};

// From a to b by k, landing exactly on b, so beats end on storyboard values.
export const toward = (a: number, b: number, k: number) => (k >= 1 ? b : lerp(a, b, k));

// Little hops in place: height over time as a parabola, squashing a little
// in the air and a lot on landing. Undefined when neither in the air nor landing.
export type Hop = { from: number; to: number; height: number };
export const LANDING_SECONDS = 0.12;
export const hopping = (sec: number, hops: Hop[], stretch: number): { hop: number; squash: number } | undefined => {
	const airborne = hops.find((h) => sec >= h.from && sec < h.to);
	if (airborne) {
		const k = (sec - airborne.from) / (airborne.to - airborne.from);
		return { hop: airborne.height * 4 * k * (1 - k), squash: 1 - stretch * Math.sin(Math.PI * k) };
	}
	const landed = hops.find((h) => sec >= h.to && sec < h.to + LANDING_SECONDS);
	return landed && { hop: 0, squash: 1 + 0.22 * Math.sin((Math.PI * (sec - landed.to)) / LANDING_SECONDS) };
};
