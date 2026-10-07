import type { Point } from '../storyImpact/layout';
export type { Point } from '../storyImpact/layout';
export const ROUTE_CLEARANCE = 18;

export const distanceToSegment = (p: Point, a: Point, b: Point) => {
	const dx = b.x - a.x;
	const dy = b.y - a.y;
	const t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy)));
	return Math.hypot(p.x - a.x - t * dx, p.y - a.y - t * dy);
};
export const clearOf = (p: Point, polygon: Point[], gap = ROUTE_CLEARANCE) => {
	let inside = false;
	let distance = Infinity;
	polygon.forEach((a, i) => {
		const b = polygon[(i + 1) % polygon.length];
		if ((a.y > p.y) !== (b.y > p.y) && p.x < (b.x - a.x) * (p.y - a.y) / (b.y - a.y) + a.x) inside = !inside;
		distance = Math.min(distance, distanceToSegment(p, a, b));
	});
	return !inside && distance >= gap;
};

// A directed port on a drawn polygon, with room for the stroke and arrowhead.
export const pointOnOutline = (outline: Point[], origin: Point, direction: Point, gap = ROUTE_CLEARANCE): Point => {
	const length = Math.hypot(direction.x, direction.y);
	const ray = { x: direction.x / length, y: direction.y / length };
	const cross = (a: Point, b: Point) => a.x * b.y - a.y * b.x;
	let distance = Infinity;
	outline.forEach((a, i) => {
		const b = outline[(i + 1) % outline.length];
		const edge = { x: b.x - a.x, y: b.y - a.y };
		const offset = { x: a.x - origin.x, y: a.y - origin.y };
		const denominator = cross(ray, edge);
		if (denominator === 0) return;
		const along = cross(offset, edge) / denominator;
		const across = cross(offset, ray) / denominator;
		if (along >= 0 && across >= 0 && across <= 1) distance = Math.min(distance, along);
	});
	return { x: origin.x + ray.x * (distance + gap), y: origin.y + ray.y * (distance + gap) };
};

export type RoundedSegment = { from: Point; to: Point; control?: Point; landmark: number };

// Drawing and a moving cursor share these endpoint-preserving rounded bends.
export const roundedSegments = (points: Point[], radius = 12): RoundedSegment[] => {
	const parts: RoundedSegment[] = [];
	let from = points[0];
	const line = (to: Point, landmark: number) => { parts.push({ from, to, landmark }); from = to; };
	for (let i = 1; i < points.length - 1; i++) {
		const previous = points[i - 1];
		const corner = points[i];
		const next = points[i + 1];
		const before = Math.hypot(previous.x - corner.x, previous.y - corner.y);
		const after = Math.hypot(next.x - corner.x, next.y - corner.y);
		const turn = (previous.x - corner.x) * (next.y - corner.y) - (previous.y - corner.y) * (next.x - corner.x);
		if (before === 0 || after === 0 || turn === 0) {
			line(corner, i);
			continue;
		}
		const r = Math.min(radius, before / 2, after / 2);
		const approach = { x: corner.x + (previous.x - corner.x) * r / before, y: corner.y + (previous.y - corner.y) * r / before };
		const leave = { x: corner.x + (next.x - corner.x) * r / after, y: corner.y + (next.y - corner.y) * r / after };
		line(approach, i);
		parts.push({ from: approach, to: leave, control: corner, landmark: i });
		from = leave;
	}
	const last = points[points.length - 1];
	line(last, points.length - 1);
	return parts;
};

export const segmentCommand = (segment: RoundedSegment) => segment.control
	? `Q${segment.control.x} ${segment.control.y} ${segment.to.x} ${segment.to.y}`
	: `L${segment.to.x} ${segment.to.y}`;
export const roundedLine = (points: Point[], radius = 12): string => `M${points[0].x} ${points[0].y} ${roundedSegments(points, radius).map(segmentCommand).join(' ')}`;
