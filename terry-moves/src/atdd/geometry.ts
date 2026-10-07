import type { Point } from '../storyImpact/layout';

// Round the bends of an open line while keeping its two endpoints exact.
export const roundedLine = (points: Point[], radius = 12): string => {
	const [first] = points;
	const parts = [`M${first.x} ${first.y}`];
	for (let i = 1; i < points.length - 1; i++) {
		const previous = points[i - 1];
		const corner = points[i];
		const next = points[i + 1];
		const before = Math.hypot(previous.x - corner.x, previous.y - corner.y);
		const after = Math.hypot(next.x - corner.x, next.y - corner.y);
		const turn = (previous.x - corner.x) * (next.y - corner.y) - (previous.y - corner.y) * (next.x - corner.x);
		if (before === 0 || after === 0 || turn === 0) {
			parts.push(`L${corner.x} ${corner.y}`);
			continue;
		}
		const r = Math.min(radius, before / 2, after / 2);
		const approach = { x: corner.x + (previous.x - corner.x) * r / before, y: corner.y + (previous.y - corner.y) * r / before };
		const leave = { x: corner.x + (next.x - corner.x) * r / after, y: corner.y + (next.y - corner.y) * r / after };
		parts.push(`L${approach.x} ${approach.y} Q${corner.x} ${corner.y} ${leave.x} ${leave.y}`);
	}
	const last = points[points.length - 1];
	return `${parts.join(' ')} L${last.x} ${last.y}`;
};
