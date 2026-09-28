// Fixed stage geometry for the 1080×1080 storyboard, following the flip
// chart's lower diagram: the product is a wall standing on the Behavior axis
// (running toward the viewer, down-left), Structure goes up, Time runs right.
// The History box sits top-left, and the band above the Time axis is kept
// free for the ball's flight from the tray to the product.

import { GRID, IMPACT } from './scene';
import type { GridSpot } from './poseTypes';

export type Point = { x: number; y: number };

export const STAGE = { width: 1080, height: 1080 } as const;

export const FONT_FAMILY =
	"'Baloo 2', 'Comic Neue', 'Chalkboard SE', 'Trebuchet MS', sans-serif";

export const OUTLINE = 7;

// Offset of the flat drop shadow behind panels.
export const SHADOW: Point = { x: 9, y: 9 };

// SVG transforms that scale a part in place around a point, for film motion.
export const scaleAround = (p: Point, sx: number, sy: number): string =>
	`translate(${p.x} ${p.y}) scale(${sx} ${sy}) translate(${-p.x} ${-p.y})`;

// Squash keeps a ball's area: wider means flatter. Left out, no transform.
export const squashAround = (p: Point, squash?: number): string | undefined =>
	squash === undefined ? undefined : scaleAround(p, squash, 1 / squash);

export const ORIGIN: Point = { x: 480, y: 590 };
export const BEHAVIOR_STEP: Point = { x: -60, y: 40 };
export const STRUCTURE_STEP: Point = { x: 0, y: -92 };

// A point on the product wall in grid units (col along Behavior, row along Structure).
export const wallPoint = (col: number, row: number): Point => ({
	x: ORIGIN.x + col * BEHAVIOR_STEP.x + row * STRUCTURE_STEP.x,
	y: ORIGIN.y + col * BEHAVIOR_STEP.y + row * STRUCTURE_STEP.y,
});

export const quad = (col0: number, col1: number, row0: number, row1: number): Point[] => [
	wallPoint(col0, row0),
	wallPoint(col1, row0),
	wallPoint(col1, row1),
	wallPoint(col0, row1),
];

export const centerOf = (points: Point[]): Point => ({
	x: points.reduce((s, p) => s + p.x, 0) / points.length,
	y: points.reduce((s, p) => s + p.y, 0) / points.length,
});

export const shrink = (points: Point[], factor: number): Point[] => {
	const c = centerOf(points);
	return points.map((p) => ({ x: c.x + (p.x - c.x) * factor, y: c.y + (p.y - c.y) * factor }));
};

// Closed polygon path whose corners are rounded with the given radius.
export const roundedPath = (points: Point[], radius: number): string => {
	const n = points.length;
	const parts: string[] = [];
	for (let i = 0; i < n; i++) {
		const prev = points[(i + n - 1) % n];
		const cur = points[i];
		const next = points[(i + 1) % n];
		const toward = (p: Point) => {
			const len = Math.hypot(p.x - cur.x, p.y - cur.y);
			const r = Math.min(radius, len / 2);
			return { x: cur.x + ((p.x - cur.x) / len) * r, y: cur.y + ((p.y - cur.y) / len) * r };
		};
		const a = toward(prev);
		const b = toward(next);
		parts.push(`${i === 0 ? 'M' : 'L'}${a.x.toFixed(1)},${a.y.toFixed(1)}`);
		parts.push(`Q${cur.x.toFixed(1)},${cur.y.toFixed(1)} ${b.x.toFixed(1)},${b.y.toFixed(1)}`);
	}
	return `${parts.join(' ')} Z`;
};

// Closed smooth path through the given points (curves through midpoints).
export const smoothBlob = (points: Point[]): string => {
	const n = points.length;
	const mid = (a: Point, b: Point) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
	const start = mid(points[n - 1], points[0]);
	const parts = [`M${start.x.toFixed(1)},${start.y.toFixed(1)}`];
	for (let i = 0; i < n; i++) {
		const m = mid(points[i], points[(i + 1) % n]);
		parts.push(`Q${points[i].x.toFixed(1)},${points[i].y.toFixed(1)} ${m.x.toFixed(1)},${m.y.toFixed(1)}`);
	}
	return `${parts.join(' ')} Z`;
};

// How far the product wall's outline reaches beyond the cells, in grid units.
export const GRID_MARGIN = { col: 0.15, row: 0.12 } as const;

export const wallOutline = (): Point[] =>
	quad(-GRID_MARGIN.col, GRID.columns + GRID_MARGIN.col, -GRID_MARGIN.row, GRID.rows + GRID_MARGIN.row);

// Text that runs along the Behavior axis is rotated by this angle (degrees).
export const BEHAVIOR_LABEL_ANGLE = (Math.atan2(-BEHAVIOR_STEP.y, -BEHAVIOR_STEP.x) * 180) / Math.PI;

export const AXES = {
	behaviorEnd: wallPoint(GRID.columns + 1.2, 0),
	structureEnd: wallPoint(0, GRID.rows + 1.35),
	timeEnd: { x: 1035, y: ORIGIN.y } as Point,
};

export const TRAY = { left: 560, right: 1010, top: ORIGIN.y - 88, bottom: ORIGIN.y - 18 } as const;

// The tray's floor, and the center of a resting ball of the given radius in
// the index-th of `count` evenly spread slots.
export const TRAY_FLOOR = TRAY.bottom - 10;

export const traySpot = (count: number, index: number, radius: number): Point => {
	const slot = (TRAY.right - TRAY.left - 60) / Math.max(count, 1);
	return { x: TRAY.left + 30 + slot * (index + 0.5), y: TRAY_FLOOR - radius };
};

// How high an eager ball hops up from the tray floor.
export const HOP = 30;

// Where the example story hovers after popping out of the tray, and the arc
// it flies along from the tray to where it hits the product (by default,
// where the example story hits it).
export const HOVER: Point = { x: 628, y: 318 };
const FLIGHT = {
	from: { x: 620, y: 470 } as Point,
	peak: { x: 600, y: 20 } as Point,
};

export const flightPoint = (t: number, impact: GridSpot = IMPACT): Point => {
	const u = 1 - t;
	const to = wallPoint(impact.col, impact.row);
	return {
		x: u * u * FLIGHT.from.x + 2 * u * t * FLIGHT.peak.x + t * t * to.x,
		y: u * u * FLIGHT.from.y + 2 * u * t * FLIGHT.peak.y + t * t * to.y,
	};
};

export const HISTORY_BOX = { left: 40, right: 236, top: 118, bottom: 286 } as const;

// The History box's front lip, the floor its spent balls rest on, and the
// shape of a spent ball: pale, emptied and slumped, wider than it is tall.
export const HISTORY_LIP_TOP = HISTORY_BOX.bottom - 50;
export const HISTORY_FLOOR = HISTORY_LIP_TOP + 14;
export const spentShape = (size: number) => {
	const r = size * 0.9;
	return { r, rx: r * 1.14, ry: r * 0.84 };
};

// Center of the index-th of `count` spent balls resting in the History box.
export const historySpot = (count: number, index: number, size: number): Point => {
	const slot = (HISTORY_BOX.right - HISTORY_BOX.left) / Math.max(count, 1);
	return { x: HISTORY_BOX.left + slot * (index + 0.5), y: HISTORY_FLOOR - spentShape(size).ry };
};

export const CAPTION_BOX = { left: 40, right: 1040, top: 880, bottom: 1040 } as const;
