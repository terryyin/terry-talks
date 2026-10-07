import { SheetDirection, sheetPoints } from './pieces';

type Point = { x: number; y: number };
export const circle = { x: 610, y: 485, radius: 280, sheetScale: 0.9 };
const pointAt = (angle: number): Point => ({
	x: circle.x + circle.radius * Math.cos(angle * Math.PI / 180),
	y: circle.y + circle.radius * Math.sin(angle * Math.PI / 180),
});
export const checkpoints = (['right', 'down', 'left', 'left', 'up', 'up'] as SheetDirection[]).map((direction, i) => {
	const angle = -90 + i * 60;
	const center = pointAt(angle);
	return { ...center, direction, angle, from: [3, 4, 5, 8, 9, 10][i] };
});
export const sheetOrigin = (center: Point) => ({ x: center.x - 90 * circle.sheetScale, y: center.y - 78 * circle.sheetScale });
const outline = (index: number) => {
	const node = checkpoints[index];
	const origin = sheetOrigin(node);
	return sheetPoints(node.direction).map((p) => ({ x: origin.x + p.x * circle.sheetScale, y: origin.y + p.y * circle.sheetScale }));
};
const distanceToSegment = (p: Point, a: Point, b: Point) => {
	const dx = b.x - a.x;
	const dy = b.y - a.y;
	const t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy)));
	return Math.hypot(p.x - a.x - t * dx, p.y - a.y - t * dy);
};
const clearOf = (p: Point, polygon: Point[], gap = 18) => {
	let inside = false;
	let distance = Infinity;
	polygon.forEach((a, i) => {
		const b = polygon[(i + 1) % polygon.length];
		if ((a.y > p.y) !== (b.y > p.y) && p.x < (b.x - a.x) * (p.y - a.y) / (b.y - a.y) + a.x) inside = !inside;
		distance = Math.min(distance, distanceToSegment(p, a, b));
	});
	return !inside && distance >= gap;
};
const coordinate = (p: Point) => `${p.x.toFixed(2)} ${p.y.toFixed(2)}`;

// Every main edge follows the same circumference; only its endpoints are trimmed.
export const circleArc = (index: number) => {
	const startAngle = checkpoints[index].angle;
	const endAngle = startAngle + 60;
	let start = startAngle;
	let end = endAngle;
	while (start < endAngle && !clearOf(pointAt(start), outline(index))) start += 0.25;
	while (end > startAngle && !clearOf(pointAt(end), outline((index + 1) % 6))) end -= 0.25;
	return `M${coordinate(pointAt(start))} A${circle.radius} ${circle.radius} 0 0 1 ${coordinate(pointAt(end))}`;
};
const betweenPoints = (from: Point, to: Point, t: number) => ({ x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t });
export const frontEndCycle = { x: circle.x, y: circle.y, size: 0.82 };
const cycleClearance = 52 * frontEndCycle.size + 18;
export const forkToCycle = () => {
	const source = checkpoints[3];
	let t = 0;
	while (t < 1 && !clearOf(betweenPoints(source, frontEndCycle, t), outline(3))) t += 0.002;
	const start = betweenPoints(source, frontEndCycle, t);
	return `M${coordinate(start)} L${frontEndCycle.x} ${frontEndCycle.y + cycleClearance}`;
};
export const cycleToMerge = () => {
	const target = checkpoints[5];
	const length = Math.hypot(target.x - frontEndCycle.x, target.y - frontEndCycle.y);
	const start = betweenPoints(frontEndCycle, target, cycleClearance / length);
	let t = 1;
	while (t > 0 && !clearOf(betweenPoints(frontEndCycle, target, t), outline(5))) t -= 0.002;
	return `M${coordinate(start)} L${coordinate(betweenPoints(frontEndCycle, target, t))}`;
};
