// Motion helpers for the film's beats: easing values, springs, and the
// settling rules that let a beat end exactly on a storyboard pose.

import { spring, SpringConfig } from 'remotion';
import { Point } from './layout';

export const FPS = 30;

export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

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
