import React from 'react';
import { BallPose, CellPose, GRID, palette } from './scene';
import { Face } from './face';
import {
	AXES,
	BEHAVIOR_LABEL_ANGLE,
	centerOf,
	FONT_FAMILY,
	GRID_MARGIN,
	ORIGIN,
	OUTLINE,
	Point,
	quad,
	roundedPath,
	SHADOW,
	shrink,
	STAGE,
	TRAY,
	wallOutline,
	wallPoint,
} from './layout';

// Every piece is a pure function of its props: no frame hooks here, so the
// pieces render in jsdom and can later be driven by interpolated poses.

const Label: React.FC<{
	x: number;
	y: number;
	text: string;
	color: string;
	size: number;
	angle?: number;
	anchor?: 'start' | 'middle' | 'end';
}> = ({ x, y, text, color, size, angle = 0, anchor = 'middle' }) => (
	<text
		x={x}
		y={y}
		transform={angle ? `rotate(${angle} ${x} ${y})` : undefined}
		textAnchor={anchor}
		fontFamily={FONT_FAMILY}
		fontWeight={700}
		fontSize={size}
		fill={color}
		stroke={palette.paper}
		strokeWidth={size / 5}
		strokeLinejoin="round"
		paintOrder="stroke"
	>
		{text}
	</text>
);

const Arrow: React.FC<{ from: Point; to: Point; color: string; testId: string }> = ({
	from,
	to,
	color,
	testId,
}) => {
	const len = Math.hypot(to.x - from.x, to.y - from.y);
	const ux = (to.x - from.x) / len;
	const uy = (to.y - from.y) / len;
	const head = 34;
	const baseX = to.x - ux * head;
	const baseY = to.y - uy * head;
	const nx = -uy * 20;
	const ny = ux * 20;
	const tip = [
		{ x: to.x, y: to.y },
		{ x: baseX + nx, y: baseY + ny },
		{ x: baseX - nx, y: baseY - ny },
	];
	const headPath = roundedPath(tip, 6);
	const line = (stroke: string, width: number) => (
		<line
			x1={from.x}
			y1={from.y}
			x2={baseX + ux * 4}
			y2={baseY + uy * 4}
			stroke={stroke}
			strokeWidth={width}
			strokeLinecap="round"
		/>
	);
	return (
		<g data-testid={testId}>
			{line(palette.ink, 18)}
			<path d={headPath} fill={palette.ink} stroke={palette.ink} strokeWidth={14} strokeLinejoin="round" />
			{line(color, 8)}
			<path d={headPath} fill={color} stroke={color} strokeWidth={2} strokeLinejoin="round" />
		</g>
	);
};

export const Paper: React.FC = () => (
	<g>
		<rect x={0} y={0} width={STAGE.width} height={STAGE.height} fill={palette.paper} />
		{Array.from({ length: 14 }, (_, i) => (
			<circle
				key={i}
				cx={(i * 257) % 1040 + 20}
				cy={(i * 397) % 820 + 30}
				r={4 + (i % 3) * 2}
				fill={palette.paperShadow}
				opacity={0.7}
			/>
		))}
	</g>
);

export const ProductCell: React.FC<{ cell: CellPose }> = ({ cell }) => {
	const corners = quad(cell.col, cell.col + 1, cell.row, cell.row + 1);
	const c = centerOf(corners);
	return (
		<g
			data-testid="product-cell"
			data-col={cell.col}
			data-row={cell.row}
			transform={`translate(${cell.dx} ${cell.dy}) rotate(${cell.rot} ${c.x} ${c.y})`}
		>
			<path
				d={roundedPath(shrink(corners, 0.82), 10)}
				fill={cell.color}
				stroke={palette.ink}
				strokeWidth={5}
				strokeLinejoin="round"
			/>
			{cell.smear ? <Smear corners={shrink(corners, 0.82)} color={cell.smear} flip={(cell.col + cell.row) % 2 === 0} /> : null}
		</g>
	);
};

// A patch of paint wiped over one side of a cell.
const Smear: React.FC<{ corners: Point[]; color: string; flip: boolean }> = ({ corners, color, flip }) => {
	const [a, b, c, d] = flip ? corners : [corners[1], corners[2], corners[3], corners[0]];
	const lerp = (p: Point, q: Point, t: number): Point => ({ x: p.x + (q.x - p.x) * t, y: p.y + (q.y - p.y) * t });
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

// `underCells` is paint that sits on the wall behind the cells.
export const ProductGrid: React.FC<{ cells: CellPose[]; underCells?: React.ReactNode }> = ({ cells, underCells }) => {
	const outline = roundedPath(wallOutline(), 18);
	const topMid = centerOf([wallPoint(0, GRID.rows + GRID_MARGIN.row), wallPoint(GRID.columns, GRID.rows + GRID_MARGIN.row)]);
	return (
		<g data-testid="product-grid">
			<path d={outline} transform={`translate(${SHADOW.x} ${SHADOW.y})`} fill={palette.paperShadow} />
			<path d={outline} fill={palette.panel} stroke={palette.ink} strokeWidth={OUTLINE} strokeLinejoin="round" />
			{underCells}
			{cells.map((cell) => (
				<ProductCell key={`${cell.col}-${cell.row}`} cell={cell} />
			))}
			<Label x={topMid.x - 8} y={topMid.y - 22} text="Product" color={palette.ink} size={40} angle={BEHAVIOR_LABEL_ANGLE} />
		</g>
	);
};

export const Axes: React.FC<{ showTime: boolean }> = ({ showTime }) => {
	const behaviorLabel = wallPoint(3.3, 0);
	return (
		<g>
			{showTime ? (
				<g data-testid="time-axis">
					<Arrow from={ORIGIN} to={AXES.timeEnd} color={palette.time} testId="time-arrow" />
					<Label x={AXES.timeEnd.x - 20} y={AXES.timeEnd.y + 62} text="Time" color={palette.ink} size={46} anchor="end" />
				</g>
			) : null}
			<Arrow from={ORIGIN} to={AXES.behaviorEnd} color={palette.behavior} testId="behavior-axis" />
			<Arrow from={ORIGIN} to={AXES.structureEnd} color={palette.structure} testId="structure-axis" />
			<g transform={`rotate(${BEHAVIOR_LABEL_ANGLE} ${behaviorLabel.x} ${behaviorLabel.y})`}>
				<Label x={behaviorLabel.x} y={behaviorLabel.y + 58} text="Behavior" color={palette.behavior} size={46} />
				<Label x={behaviorLabel.x} y={behaviorLabel.y + 90} text="what it does" color={palette.ink} size={26} />
			</g>
			<Label x={AXES.structureEnd.x + 30} y={AXES.structureEnd.y + 36} text="Structure" color={palette.structure} size={46} anchor="start" />
			<Label x={AXES.structureEnd.x + 32} y={AXES.structureEnd.y + 68} text="how it's built" color={palette.ink} size={26} anchor="start" />
		</g>
	);
};

export const PaintBall: React.FC<{ ball: BallPose; x: number; y: number }> = ({ ball, x, y }) => {
	const r = ball.size;
	return (
		<g data-testid="backlog-ball" data-id={ball.id}>
			<ellipse cx={x + 4} cy={y + r * 0.95} rx={r * 0.9} ry={r * 0.22} fill={palette.ink} opacity={0.18} />
			<circle cx={x} cy={y} r={r} fill={ball.color} stroke={palette.ink} strokeWidth={6} />
			<ellipse
				cx={x - r * 0.4}
				cy={y - r * 0.45}
				rx={r * 0.26}
				ry={r * 0.16}
				transform={`rotate(-35 ${x - r * 0.4} ${y - r * 0.45})`}
				fill={palette.white}
				opacity={0.85}
			/>
			<Face x={x} y={y} r={r} />
		</g>
	);
};

export const BacklogTray: React.FC<{ balls: BallPose[] }> = ({ balls }) => {
	const { left, right, top, bottom } = TRAY;
	const lip = 10;
	const trayPath = [
		`M${left},${top}`,
		`L${left + 10},${bottom - 18}`,
		`Q${left + 12},${bottom} ${left + 34},${bottom}`,
		`L${right - 34},${bottom}`,
		`Q${right - 12},${bottom} ${right - 10},${bottom - 18}`,
		`L${right},${top}`,
	].join(' ');
	const floor = bottom - lip;
	const slot = (right - left - 60) / Math.max(balls.length, 1);
	return (
		<g data-testid="backlog-tray">
			<path d={`${trayPath} Z`} transform={`translate(${SHADOW.x} ${SHADOW.y})`} fill={palette.paperShadow} />
			<path d={`${trayPath} Z`} fill={palette.trayInside} />
			{balls.map((ball, i) => (
				<PaintBall key={ball.id} ball={ball} x={left + 30 + slot * (i + 0.5)} y={floor - ball.size} />
			))}
			<path
				d={`M${left + 2},${bottom - 32} L${right - 2},${bottom - 32} L${right - 8},${bottom - 12} Q${right - 12},${bottom} ${right - 30},${bottom} L${left + 30},${bottom} Q${left + 12},${bottom} ${left + 8},${bottom - 12} Z`}
				fill={palette.tray}
				stroke={palette.ink}
				strokeWidth={OUTLINE}
				strokeLinejoin="round"
			/>
			<path d={trayPath} fill="none" stroke={palette.ink} strokeWidth={OUTLINE} strokeLinejoin="round" strokeLinecap="round" />
			<Label x={(left + right) / 2} y={Math.min(top, floor - 2 * Math.max(...balls.map((b) => b.size))) - 20} text="Product Backlog" color={palette.ink} size={40} />
		</g>
	);
};
