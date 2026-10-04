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

/** Two rigid segments. Targets beyond reach settle on the reachable circle. */
export const articulatedArm = (shoulder: Point, target: Point, upper: number, lower: number, bend = 1): { elbow: Point; hand: Point } => {
	const dx = target.x - shoulder.x;
	const dy = target.y - shoulder.y;
	const distance = Math.hypot(dx, dy);
	const angle = distance > 0.0001 ? Math.atan2(dy, dx) : Math.PI / 2;
	const radius = Math.max(Math.abs(upper - lower) + 0.001, Math.min(upper + lower - 0.001, distance));
	const turn = Math.acos(Math.max(-1, Math.min(1, (upper * upper + radius * radius - lower * lower) / (2 * upper * radius))));
	return {
		elbow: { x: shoulder.x + upper * Math.cos(angle + bend * turn), y: shoulder.y + upper * Math.sin(angle + bend * turn) },
		hand: { x: shoulder.x + radius * Math.cos(angle), y: shoulder.y + radius * Math.sin(angle) },
	};
};
