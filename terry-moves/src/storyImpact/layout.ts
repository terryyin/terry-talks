// Fixed stage geometry for the 1080×1080 storyboard, following the flip
// chart's lower diagram: the product is a wall standing on the Behavior axis
// (running toward the viewer, down-left), Structure goes up, Time runs right.
// Free room is kept top-left (History box, later) and above the Time axis
// (ball flight from the tray to the product, later).

import { GRID } from './scene';

export type Point = { x: number; y: number };

export const STAGE = { width: 1080, height: 1080 } as const;

export const FONT_FAMILY =
	"'Baloo 2', 'Comic Neue', 'Chalkboard SE', 'Trebuchet MS', sans-serif";

export const OUTLINE = 7;

// Offset of the flat drop shadow behind panels.
export const SHADOW: Point = { x: 9, y: 9 };

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

export const CAPTION_BOX = { left: 40, right: 1040, top: 880, bottom: 1040 } as const;
