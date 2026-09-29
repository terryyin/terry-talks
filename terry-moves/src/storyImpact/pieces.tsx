import React from 'react';
import { BallPose, CellPose, palette } from './scene';
import { Face } from './face';
import { ProductCell } from './cell';
import {
	BACKLOG_LABEL,
	BEHAVIOR_LABEL_ANGLE,
	FONT_FAMILY,
	ORIGIN,
	PRODUCT_LABEL,
	OUTLINE,
	roundedPath,
	scaleAround,
	SHADOW,
	STAGE,
	HOP,
	squashAround,
	TRAY,
	trayBallCenter,
	traySpot,
	wallOutline,
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
				<Label x={PRODUCT_LABEL.at.x} y={PRODUCT_LABEL.at.y} text={PRODUCT_LABEL.text} color={palette.ink} size={PRODUCT_LABEL.size} angle={BEHAVIOR_LABEL_ANGLE} />
			</g>
		</g>
	);
};


const DROP_SHADOW_FROM = 80;

// An eager ball hops up from the tray floor, its shadow left behind.
export const PaintBall: React.FC<{ ball: BallPose; x: number; y: number }> = ({ ball, x: slotX, y: rest }) => {
	if (ball.scale !== undefined && ball.scale <= 0) return null;
	const r = ball.size;
	const { x, y } = trayBallCenter(ball, { x: slotX, y: rest });
	const popped = ball.scale === undefined ? undefined : scaleAround({ x, y }, ball.scale, ball.scale);
	// A ball dropping in from high above casts a shadow that grows as it nears.
	const falling = ball.hop !== undefined && ball.hop > DROP_SHADOW_FROM ? Math.max(0, 1 - (ball.hop - DROP_SHADOW_FROM) / 400) : 1;
	const shadow = (ball.hop !== undefined ? 0.9 - (0.3 * Math.min(ball.hop, HOP)) / HOP : ball.eager ? 0.6 : 0.9) * falling;
	const squash = squashAround({ x, y: y + r }, ball.squash);
	return (
		<g data-testid="backlog-ball" data-id={ball.id} data-eager={ball.eager ? 'true' : undefined} transform={popped}>
			{ball.flying ? null : <ellipse cx={x + 4} cy={rest + r * 0.95} rx={r * shadow} ry={r * 0.18} fill={palette.ink} opacity={0.18} />}
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
	return (
		<g data-testid="backlog-tray">
			<path d={`${trayPath} Z`} transform={`translate(${SHADOW.x} ${SHADOW.y})`} fill={palette.paperShadow} />
			<path d={`${trayPath} Z`} fill={palette.trayInside} />
			{balls.map((ball, i) => {
				if (ball.flying) return null;
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
			<Label x={BACKLOG_LABEL.at.x} y={BACKLOG_LABEL.at.y} text={BACKLOG_LABEL.text} color={palette.trayInk} size={BACKLOG_LABEL.size} />
		</g>
	);
};

// Balls on their way into the tray from outside it, drawn above the stage.
export const FlyingBalls: React.FC<{ balls: BallPose[] }> = ({ balls }) => (
	<g>
		{balls.map((ball, i) => {
			if (!ball.flying) return null;
			const spot = traySpot(balls.length, i, ball.size);
			return <PaintBall key={ball.id} ball={ball} x={spot.x} y={spot.y} />;
		})}
	</g>
);
