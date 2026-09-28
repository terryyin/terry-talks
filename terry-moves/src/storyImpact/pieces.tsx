import React from 'react';
import { BallPose, CellPose, GRID, palette } from './scene';
import { Face } from './face';
import { ProductCell } from './cell';
import {
	BEHAVIOR_LABEL_ANGLE,
	centerOf,
	FONT_FAMILY,
	GRID_MARGIN,
	ORIGIN,
	OUTLINE,
	roundedPath,
	scaleAround,
	SHADOW,
	STAGE,
	HOP,
	squashAround,
	TRAY,
	TRAY_FLOOR,
	traySpot,
	wallOutline,
	wallPoint,
} from './layout';

// Every piece is a pure function of its props: no frame hooks here, so the
// pieces render in jsdom and can later be driven by interpolated poses.

export const Label: React.FC<{
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

// `underCells` is paint that sits on the wall behind the cells.
// `wall` pops the wall in from the origin while the product is built.
export const ProductGrid: React.FC<{ cells: CellPose[]; underCells?: React.ReactNode; wall?: number }> = ({ cells, underCells, wall }) => {
	if (wall !== undefined && wall <= 0) return null;
	const wallPop = wall === undefined ? undefined : scaleAround(ORIGIN, wall, wall);
	const outline = roundedPath(wallOutline(), 18);
	const topMid = centerOf([wallPoint(0, GRID.rows + GRID_MARGIN.row), wallPoint(GRID.columns, GRID.rows + GRID_MARGIN.row)]);
	return (
		<g data-testid="product-grid">
			<g transform={wallPop}>
				<path d={outline} transform={`translate(${SHADOW.x} ${SHADOW.y})`} fill={palette.paperShadow} />
				<path d={outline} fill={palette.panel} stroke={palette.ink} strokeWidth={OUTLINE} strokeLinejoin="round" />
			</g>
			{underCells}
			{cells.map((cell) => (
				<ProductCell key={`${cell.col}-${cell.row}`} cell={cell} />
			))}
			<g transform={wallPop}>
				<Label x={topMid.x - 8} y={topMid.y - 22} text="Product" color={palette.ink} size={40} angle={BEHAVIOR_LABEL_ANGLE} />
			</g>
		</g>
	);
};


const DROP_SHADOW_FROM = 80;

// An eager ball hops up from the tray floor, its shadow left behind.
export const PaintBall: React.FC<{ ball: BallPose; x: number; y: number }> = ({ ball, x: slotX, y: rest }) => {
	const r = ball.size;
	const x = ball.dx === undefined ? slotX : slotX + ball.dx;
	const y = ball.hop !== undefined ? rest - ball.hop : ball.eager ? rest - HOP : rest;
	// A ball dropping in from high above casts a shadow that grows as it nears.
	const falling = ball.hop !== undefined && ball.hop > DROP_SHADOW_FROM ? Math.max(0, 1 - (ball.hop - DROP_SHADOW_FROM) / 400) : 1;
	const shadow = (ball.hop !== undefined ? 0.9 - (0.3 * Math.min(ball.hop, HOP)) / HOP : ball.eager ? 0.6 : 0.9) * falling;
	const squash = squashAround({ x, y: y + r }, ball.squash);
	return (
		<g data-testid="backlog-ball" data-id={ball.id} data-eager={ball.eager ? 'true' : undefined}>
			<ellipse cx={x + 4} cy={rest + r * 0.95} rx={r * shadow} ry={r * 0.18} fill={palette.ink} opacity={0.18} />
			{ball.eager ? (
				<g stroke={palette.ink} strokeWidth={5} strokeLinecap="round">
					<line x1={x - r - 14} y1={y - r * 0.2} x2={x - r - 30} y2={y - r * 0.5} />
					<line x1={x + r + 14} y1={y - r * 0.2} x2={x + r + 30} y2={y - r * 0.5} />
					<line x1={x} y1={y - r - 14} x2={x} y2={y - r - 32} />
				</g>
			) : null}
			<g transform={squash}>
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
				<Face x={x} y={y} r={r} mood={ball.eager ? 'hopeful' : 'smile'} />
			</g>
		</g>
	);
};

export const BacklogTray: React.FC<{ balls: BallPose[] }> = ({ balls }) => {
	const { left, right, top, bottom } = TRAY;
	const trayPath = [
		`M${left},${top}`,
		`L${left + 10},${bottom - 18}`,
		`Q${left + 12},${bottom} ${left + 34},${bottom}`,
		`L${right - 34},${bottom}`,
		`Q${right - 12},${bottom} ${right - 10},${bottom - 18}`,
		`L${right},${top}`,
	].join(' ');
	const floor = TRAY_FLOOR;
	return (
		<g data-testid="backlog-tray">
			<path d={`${trayPath} Z`} transform={`translate(${SHADOW.x} ${SHADOW.y})`} fill={palette.paperShadow} />
			<path d={`${trayPath} Z`} fill={palette.trayInside} />
			{balls.map((ball, i) => {
				const spot = traySpot(balls.length, i, ball.size);
				return <PaintBall key={ball.id} ball={ball} x={spot.x} y={spot.y} />;
			})}
			<path
				d={`M${left + 2},${bottom - 32} L${right - 2},${bottom - 32} L${right - 8},${bottom - 12} Q${right - 12},${bottom} ${right - 30},${bottom} L${left + 30},${bottom} Q${left + 12},${bottom} ${left + 8},${bottom - 12} Z`}
				fill={palette.tray}
				stroke={palette.ink}
				strokeWidth={OUTLINE}
				strokeLinejoin="round"
			/>
			<path d={trayPath} fill="none" stroke={palette.ink} strokeWidth={OUTLINE} strokeLinejoin="round" strokeLinecap="round" />
			<Label x={(left + right) / 2} y={Math.min(top, floor - Math.max(...balls.map((b) => 2 * b.size + (b.eager ? HOP + 40 : 0)))) - 20} text="Product Backlog" color={palette.ink} size={40} />
		</g>
	);
};
