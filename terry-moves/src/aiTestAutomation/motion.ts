import { reveal } from './film';

export type Point = { x: number; y: number };
export const mix = (a: number, b: number, amount: number): number => a + (b - a) * amount;
export const travel = (seconds: number, start: number, duration: number): number => {
	const t = Math.max(0, Math.min(1, (seconds - start) / duration));
	return t * t * (3 - 2 * t);
};
/** A single intentional gesture, with an anticipation and a settled return. */
export const gesture = (seconds: number, start: number, duration: number): number => {
	const t = (seconds - start) / duration;
	return t <= 0 || t >= 1 ? 0 : Math.sin(Math.PI * t) ** 2;
};
export const blinkAt = (seconds: number, moments: number[]): boolean => moments.some((moment) => seconds >= moment && seconds < moment + 0.11);
export const reach = (x: number, y: number, targetX: number, targetY: number, scale: number): Point => ({ x: (targetX - x) / scale, y: (targetY - y) / scale });
export const lerpPoint = (a: Point, b: Point, amount: number): Point => ({ x: mix(a.x, b.x, amount), y: mix(a.y, b.y, amount) });
export const appear = reveal;
