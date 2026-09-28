import React from 'react';
import { CellPose, palette, plainCellColor } from './scene';
import { Sparkle } from './storyBall';
import { cellCenter } from './cell';
import { FONT_FAMILY, Point } from './layout';

// Friendly cues while development re-sorts the product: curly "turning back"
// arrows on sliding cells, snap ticks on cells that clicked into place, and
// sparkles when the product is coherent again. Pure function of the cells.

// A small curved arrow circling part of the cell, turning against its tilt.
const TurnBackArrow: React.FC<{ at: Point; clockwise: boolean }> = ({ at, clockwise }) => {
	const r = 50;
	const s = clockwise ? 1 : -1;
	const a0 = (-150 * Math.PI) / 180;
	const a1 = (-40 * Math.PI) / 180;
	const p = (a: number): Point => ({ x: at.x + s * Math.cos(a) * r, y: at.y + Math.sin(a) * r });
	const from = p(a0);
	const to = p(a1);
	const arc = `M${from.x.toFixed(1)},${from.y.toFixed(1)} A${r},${r} 0 0 ${clockwise ? 1 : 0} ${to.x.toFixed(1)},${to.y.toFixed(1)}`;
	// Arrowhead along the tangent at the end of the arc.
	const tx = -Math.sin(a1) * s;
	const ty = Math.cos(a1);
	const nx = -ty;
	const ny = tx;
	const head = `M${to.x + tx * 16},${to.y + ty * 16} L${to.x + nx * 12},${to.y + ny * 12} L${to.x - nx * 12},${to.y - ny * 12} Z`;
	return (
		<g data-testid="turn-back-arrow" strokeLinecap="round" strokeLinejoin="round">
			<path d={arc} fill="none" stroke={palette.ink} strokeWidth={13} />
			<path d={head} fill={palette.ink} stroke={palette.ink} strokeWidth={9} />
			<path d={arc} fill="none" stroke={palette.white} strokeWidth={5} />
			<path d={head} fill={palette.white} stroke={palette.white} strokeWidth={1} />
		</g>
	);
};

const SnapTicks: React.FC<{ at: Point }> = ({ at }) => (
	<g data-testid="snap-ticks" stroke={palette.ink} strokeWidth={5} strokeLinecap="round">
		<line x1={at.x - 30} y1={at.y - 46} x2={at.x - 42} y2={at.y - 62} />
		<line x1={at.x - 38} y1={at.y - 34} x2={at.x - 58} y2={at.y - 40} />
		<line x1={at.x - 20} y1={at.y - 52} x2={at.x - 22} y2={at.y - 72} />
	</g>
);

const SnapWord: React.FC<{ at: Point }> = ({ at }) => (
	<text
		x={at.x}
		y={at.y}
		transform={`rotate(-12 ${at.x} ${at.y})`}
		textAnchor="middle"
		fontFamily={FONT_FAMILY}
		fontWeight={900}
		fontSize={34}
		fill={palette.white}
		stroke={palette.ink}
		strokeWidth={8}
		strokeLinejoin="round"
		paintOrder="stroke"
	>
		snap!
	</text>
);

export const TidyMarks: React.FC<{ cells: CellPose[]; done: boolean }> = ({ cells, done }) => {
	if (done) {
		const changed = cells.filter((c) => c.split || c.color !== plainCellColor(c)).map(cellCenter);
		return (
			<g data-testid="tidy-marks" data-stage="done">
				{changed.map((p, i) => (
					<Sparkle key={i} x={p.x + (i % 2 === 0 ? 34 : -34)} y={p.y - 46} s={i % 2 === 0 ? 20 : 16} />
				))}
			</g>
		);
	}
	const sliding = cells
		.filter((c) => c.rot !== 0)
		.sort((a, b) => Math.abs(b.rot) - Math.abs(a.rot))
		.slice(0, 2);
	// Ticks go on the far side from the axes, where there is room.
	const snapped = cells
		.filter((c) => c.snapped)
		.sort((a, b) => b.col - a.col || b.row - a.row)
		.slice(0, 2);
	return (
		<g data-testid="tidy-marks" data-stage="underway">
			{sliding.map((c) => (
				<TurnBackArrow key={`${c.col}-${c.row}`} at={cellCenter(c)} clockwise={c.rot < 0} />
			))}
			{snapped.map((c) => (
				<SnapTicks key={`${c.col}-${c.row}`} at={cellCenter(c)} />
			))}
			{snapped.length > 0 ? <SnapWord at={{ x: cellCenter(snapped[0]).x - 70, y: cellCenter(snapped[0]).y - 84 }} /> : null}
			{sliding.map((c, i) => (
				<Sparkle key={i} x={cellCenter(c).x - 40} y={cellCenter(c).y + 46} s={10} />
			))}
		</g>
	);
};
