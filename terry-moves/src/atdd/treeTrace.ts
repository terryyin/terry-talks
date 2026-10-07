import { lerp } from '../storyImpact/motion';
import { Point, RoundedSegment, roundedSegments, segmentCommand } from './geometry';
import { move } from './timing';

const at = (segment: RoundedSegment, t: number): Point => segment.control ? {
	x: (1 - t) ** 2 * segment.from.x + 2 * (1 - t) * t * segment.control.x + t ** 2 * segment.to.x,
	y: (1 - t) ** 2 * segment.from.y + 2 * (1 - t) * t * segment.control.y + t ** 2 * segment.to.y,
} : { x: lerp(segment.from.x, segment.to.x, t), y: lerp(segment.from.y, segment.to.y, t) };
const length = (segment: RoundedSegment, t = 1) => {
	let total = 0;
	let previous = segment.from;
	for (let i = 1; i <= 24; i++) {
		const point = at(segment, t * i / 24);
		total += Math.hypot(point.x - previous.x, point.y - previous.y);
		previous = point;
	}
	return total;
};

// These five narrated stages stay fixed when the authored node geometry moves.
const stages = [
	{ end: 3, delay: 0, duration: 0.9 },
	{ end: 6, delay: 0.9, duration: 1.05 },
	{ end: 9, delay: 2.25, duration: 1 },
	{ end: 10, delay: 3.25, duration: 1.2 },
	{ end: 13, delay: 4.45, duration: 1.3 },
];

export const treeTrace = (points: Point[], seconds: number, began: number, growing: boolean) => {
	// A stage arriving at a rounded corner stops halfway around its bend; its
	// departure owns the other half. This keeps arrival in the identified box.
	const segments = roundedSegments(points).flatMap((segment) => {
		if (!segment.control || !stages.some((stage) => stage.end === segment.landmark)) return [segment];
		const midpoint = at(segment, 0.5);
		return [
			{ ...segment, control: { x: (segment.from.x + segment.control.x) / 2, y: (segment.from.y + segment.control.y) / 2 }, to: midpoint },
			{ ...segment, from: midpoint, control: { x: (segment.control.x + segment.to.x) / 2, y: (segment.control.y + segment.to.y) / 2 }, landmark: segment.landmark + 1 },
		];
	}).map((segment) => ({ ...segment, length: length(segment) }));
	let remaining = growing ? stages.reduce((distance, stage, i) => distance + segments
		.filter((segment) => segment.landmark > (i === 0 ? 0 : stages[i - 1].end) && segment.landmark <= stage.end)
		.reduce((total, segment) => total + segment.length, 0) * move(seconds, began + stage.delay, stage.duration), 0) : 0;
	const started = remaining > 0;
	const commands = [`M${points[0].x} ${points[0].y}`];
	let cursor = points[0];
	for (const segment of segments) {
		if (remaining >= segment.length) {
			commands.push(segmentCommand(segment));
			cursor = segment.to;
			remaining -= segment.length;
			continue;
		}
		let low = 0;
		let high = 1;
		for (let i = 0; i < 18; i++) {
			const mid = (low + high) / 2;
			if (length(segment, mid) < remaining) low = mid; else high = mid;
		}
		const t = (low + high) / 2;
		cursor = at(segment, t);
		commands.push(segmentCommand({ ...segment, to: cursor, control: segment.control ? {
			x: lerp(segment.from.x, segment.control.x, t), y: lerp(segment.from.y, segment.control.y, t),
		} : undefined }));
		break;
	}
	return { ...cursor, started, trail: commands.join(' ') };
};
