import React from 'react';
import { Easing } from 'remotion';
import { CellPose, DimPose, OutlinePose, palette, sameSpot } from './scene';
import { centerOf, OUTLINE, OUTLINE_LABEL, Point, quad, roundedPath, scaleAround, shrink, wallPoint } from './layout';
import { CELL_SCALE, cellCorners } from './cell';
import { Label } from './pieces';
import { clamp01 } from './motion';

// The film's ending marks: dashed outlines over parts of the product, and the
// rest of the product fading back while they are in focus. Pure functions of
// their poses.

const DASH = '24 16';
const pop = Easing.out(Easing.back(2.4));

export const Dim: React.FC<{ cells: CellPose[]; dim: DimPose }> = ({ cells, dim }) =>
	dim.amount <= 0 ? null : (
		<g data-testid="dim" opacity={dim.amount}>
			{cells
				.filter((cell) => !dim.except.some((s) => sameSpot(s, cell)))
				.map((cell) => (
					<path
						key={`${cell.col}-${cell.row}`}
						d={roundedPath(shrink(cellCorners(cell), CELL_SCALE + 0.03), 10)}
						fill={palette.paper}
					/>
				))}
		</g>
	);

// A dashed line in the outline's color over a wider ink one, so it reads on
// any cell color.
const Dashed: React.FC<{ d: string; color: string; march: number }> = ({ d, color, march }) => (
	<g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={DASH} strokeDashoffset={-march}>
		<path d={d} stroke={palette.ink} strokeWidth={15} />
		<path d={d} stroke={color} strokeWidth={9} />
	</g>
);

// One outline per cell, popping on one after another.
const EachCell: React.FC<{ outline: OutlinePose; march: number }> = ({ outline, march }) => {
	const n = outline.cells.length;
	return (
		<>
			{outline.cells.map((spot, i) => {
				const k = clamp01(outline.draw * n - i);
				if (k <= 0) return null;
				const corners = shrink(cellCorners(spot), 0.97);
				const s = pop(k);
				return (
					<g key={`${spot.col}-${spot.row}`} data-testid="outlined-cell" data-col={spot.col} data-row={spot.row} transform={scaleAround(centerOf(corners), s, s)}>
						<Dashed d={roundedPath(corners, 16)} color={outline.color} march={march} />
					</g>
				);
			})}
		</>
	);
};

// One outline around all the cells, rising from the bottom as it is drawn.
const Together: React.FC<{ outline: OutlinePose; march: number }> = ({ outline, march }) => {
	if (outline.draw <= 0) return null;
	const cols = outline.cells.map((c) => c.col);
	const rows = outline.cells.map((c) => c.row);
	const [c0, c1] = [Math.min(...cols) - 0.03, Math.max(...cols) + 1.03];
	const [r0, r1] = [Math.min(...rows) - 0.06, Math.max(...rows) + 1.06];
	const top = r0 + (r1 - r0) * Easing.inOut(Easing.cubic)(outline.draw);
	return (
		<g data-testid="outlined-band">
			<Dashed d={roundedPath(quad(c0, c1, r0, top), 22)} color={outline.color} march={march} />
		</g>
	);
};

// A curved pointer from the name to a spot on the wall, with an arrowhead.
const Pointer: React.FC<{ from: Point; to: Point; color: string }> = ({ from, to, color }) => {
	const bend: Point = { x: (from.x + to.x) / 2, y: Math.min(from.y, to.y) - 70 };
	const len = Math.hypot(to.x - bend.x, to.y - bend.y);
	const [ux, uy] = [(to.x - bend.x) / len, (to.y - bend.y) / len];
	const head = [
		to,
		{ x: to.x - ux * 24 - uy * 13, y: to.y - uy * 24 + ux * 13 },
		{ x: to.x - ux * 24 + uy * 13, y: to.y - uy * 24 - ux * 13 },
	];
	const curve = `M${from.x},${from.y} Q${bend.x},${bend.y} ${to.x - ux * 14},${to.y - uy * 14}`;
	const arrow = `M${head.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' L')} Z`;
	return (
		<g data-testid="outline-pointer" strokeLinecap="round" strokeLinejoin="round">
			<path d={curve} fill="none" stroke={palette.ink} strokeWidth={12} />
			<path d={arrow} fill={palette.ink} stroke={palette.ink} strokeWidth={9} />
			<path d={curve} fill="none" stroke={color} strokeWidth={6} />
			<path d={arrow} fill={color} stroke={color} strokeWidth={2} />
		</g>
	);
};

const TAG_R = 13;
const TAG_STEP = 36;

// The outline's name off the wall, with a row of story-colored dots under
// it and a pointer to the outline.
const Tag: React.FC<{ outline: OutlinePose }> = ({ outline }) => {
	const s = pop(clamp01((outline.draw - 0.75) / 0.25));
	if (s <= 0) return null;
	const p = OUTLINE_LABEL;
	const { tags } = outline;
	const x0 = p.x - ((tags.length - 1) * TAG_STEP) / 2;
	return (
		<g data-testid="outline-tag" transform={scaleAround(p, s, s)}>
			<Pointer from={{ x: p.x - 120, y: p.y - 14 }} to={wallPoint(outline.pointAt.col, outline.pointAt.row)} color={outline.color} />
			<Label x={p.x} y={p.y} text={outline.label} color={outline.color} size={44} />
			{tags.map((color, i) => (
				<circle
					key={i}
					data-testid="outline-tag-dot"
					data-color={color}
					cx={x0 + i * TAG_STEP}
					cy={p.y + 34}
					r={TAG_R}
					fill={color}
					stroke={palette.ink}
					strokeWidth={OUTLINE - 2}
				/>
			))}
		</g>
	);
};

export const Outlines: React.FC<{ outlines: OutlinePose[] }> = ({ outlines }) => (
	<g data-testid="outlines">
		{outlines.map((outline, i) => (
			<g key={i} data-testid="outline" data-color={outline.color} opacity={outline.opacity}>
				{outline.together ? <Together outline={outline} march={outline.march} /> : <EachCell outline={outline} march={outline.march} />}
				<Tag outline={outline} />
			</g>
		))}
	</g>
);
