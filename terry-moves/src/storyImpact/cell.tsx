import React from 'react';
import { CellPose, palette } from './scene';
import { centerOf, Point, quad, roundedPath, shrink } from './layout';

// One cell of the product wall. Pure function of its pose.

const CELL_SCALE = 0.82;

const cellCorners = (cell: CellPose): Point[] => quad(cell.col, cell.col + 1, cell.row, cell.row + 1);

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
const SplitHalves: React.FC<{ corners: Point[]; lower: string; upper: string }> = ({ corners, lower, upper }) => {
	const [p0, p1, p2, p3] = corners;
	const gap = 0.07;
	return (
		<g data-testid="split-cell">
			<CellShape points={[p0, p1, lerp(p1, p2, 0.5 - gap), lerp(p0, p3, 0.5 - gap)]} color={lower} radius={8} />
			<CellShape points={[lerp(p0, p3, 0.5 + gap), lerp(p1, p2, 0.5 + gap), p2, p3]} color={upper} radius={8} />
		</g>
	);
};

// A patch of paint wiped over one side of a cell.
const Smear: React.FC<{ corners: Point[]; color: string; flip: boolean }> = ({ corners, color, flip }) => {
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
			opacity={0.95}
		/>
	);
};

export const ProductCell: React.FC<{ cell: CellPose }> = ({ cell }) => {
	const corners = cellCorners(cell);
	const c = centerOf(corners);
	const inner = shrink(corners, CELL_SCALE);
	return (
		<g
			data-testid="product-cell"
			data-col={cell.col}
			data-row={cell.row}
			transform={`translate(${cell.dx} ${cell.dy}) rotate(${cell.rot} ${c.x} ${c.y})`}
		>
			{cell.split ? (
				<SplitHalves corners={inner} lower={cell.color} upper={cell.split} />
			) : (
				<CellShape points={inner} color={cell.color} />
			)}
			{cell.smear ? <Smear corners={inner} color={cell.smear} flip={(cell.col + cell.row) % 2 === 0} /> : null}
		</g>
	);
};
