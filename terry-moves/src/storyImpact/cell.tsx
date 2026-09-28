import React from 'react';
import { CellPose, GridSpot, palette, plainCellColor } from './scene';
import { centerOf, Point, quad, roundedPath, scaleAround, shrink } from './layout';
import { toward } from './motion';

// One cell of the product wall. Pure function of its pose.

// How much of its grid square a cell fills.
export const CELL_SCALE = 0.82;

// A cell's grid square on the wall.
export const cellCorners = ({ col, row }: GridSpot): Point[] => quad(col, col + 1, row, row + 1);

// Where a cell is drawn on the stage, including how far it has been knocked.
export const cellCenter = (cell: CellPose): Point => {
	const c = centerOf(cellCorners(cell));
	return { x: c.x + cell.dx, y: c.y + cell.dy };
};

const lerp = (p: Point, q: Point, t: number): Point => ({ x: p.x + (q.x - p.x) * t, y: p.y + (q.y - p.y) * t });

const CellShape: React.FC<{ points: Point[]; color: string; radius?: number }> = ({ points, color, radius = 10 }) => (
	<path d={roundedPath(points, radius)} fill={color} stroke={palette.ink} strokeWidth={5} strokeLinejoin="round" />
);

// A cell reorganized into a lower and an upper half with a gap between them.
// While it splits, the upper half grows in from the top and pushes the lower
// half down to its share.
const SplitHalves: React.FC<{ corners: Point[]; lower: string; upper: string; progress?: number }> = ({
	corners,
	lower,
	upper,
	progress = 1,
}) => {
	const [p0, p1, p2, p3] = corners;
	const gap = 0.07;
	const lowerTop = toward(1, 0.5 - gap, progress);
	const upperBottom = toward(1, 0.5 + gap, progress);
	return (
		<g data-testid="split-cell">
			<CellShape points={[p0, p1, lerp(p1, p2, lowerTop), lerp(p0, p3, lowerTop)]} color={lower} radius={8} />
			<CellShape points={[lerp(p0, p3, upperBottom), lerp(p1, p2, upperBottom), p2, p3]} color={upper} radius={8 * Math.min(1, progress * 2)} />
		</g>
	);
};

// A patch of paint wiped over one side of a cell.
const Smear: React.FC<{ corners: Point[]; color: string; flip: boolean; amount?: number }> = ({ corners, color, flip, amount = 1 }) => {
	const [a, b, c, d] = flip ? corners : [corners[1], corners[2], corners[3], corners[0]];
	const patch = [a, lerp(a, b, 0.75), lerp(lerp(a, b, 0.5), lerp(d, c, 0.5), 0.55), lerp(a, d, 0.8)];
	return (
		<path
			data-testid="cell-smear"
			d={roundedPath(patch, 9)}
			fill={color}
			stroke={palette.ink}
			strokeWidth={3}
			strokeLinejoin="round"
			opacity={0.95 * amount}
		/>
	);
};

// A cell whose new color rises from the bottom over its plain color, like
// paint draining into it.
const FillingCell: React.FC<{ cell: CellPose; points: Point[]; level: number }> = ({ cell, points, level }) => {
	const [p0, p1, p2, p3] = points;
	const outline = roundedPath(points, 10);
	const id = `cell-fill-${cell.col}-${cell.row}`;
	return (
		<g data-testid="filling-cell">
			<clipPath id={id}>
				<path d={outline} />
			</clipPath>
			<path d={outline} fill={plainCellColor(cell)} />
			<path
				d={`M${[p0, p1, lerp(p1, p2, level), lerp(p0, p3, level)].map((p) => `${p.x},${p.y}`).join(' L')} Z`}
				fill={cell.color}
				clipPath={`url(#${id})`}
			/>
			<path d={outline} fill="none" stroke={palette.ink} strokeWidth={5} strokeLinejoin="round" />
		</g>
	);
};

export const ProductCell: React.FC<{ cell: CellPose }> = ({ cell }) => {
	if (cell.pop !== undefined && cell.pop <= 0) return null;
	const corners = cellCorners(cell);
	const c = centerOf(corners);
	const inner = shrink(corners, CELL_SCALE);
	const pop = cell.pop === undefined ? '' : ` ${scaleAround(c, cell.pop, cell.pop)}`;
	return (
		<g
			data-testid="product-cell"
			data-col={cell.col}
			data-row={cell.row}
			transform={`translate(${cell.dx} ${cell.dy}) rotate(${cell.rot} ${c.x} ${c.y})${pop}`}
		>
			{cell.split && (cell.splitting ?? 1) > 0.02 ? (
				<SplitHalves corners={inner} lower={cell.color} upper={cell.split} progress={cell.splitting} />
			) : cell.filling !== undefined ? (
				<FillingCell cell={cell} points={inner} level={cell.filling} />
			) : (
				<CellShape points={inner} color={cell.color} />
			)}
			{cell.smear ? <Smear corners={inner} color={cell.smear} flip={(cell.col + cell.row) % 2 === 0} amount={cell.smearAmount} /> : null}
		</g>
	);
};
