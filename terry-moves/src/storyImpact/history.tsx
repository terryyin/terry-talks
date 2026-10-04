import React from 'react';
import { BallPose, palette, SpentPose } from './scene';
import { FONT_FAMILY, HISTORY_BOX, HISTORY_LABEL, historyLabelAt, HISTORY_LIP_TOP, historySpot, historyWidth, OUTLINE, SHADOW, spentShape, squashAround } from './layout';

// The History box behind the product, top-left: spent stories rest here,
// translucent ghosts. Pure function of the spent balls. On its way there,
// the same ghost is drawn by SpentGhost.

const crate = { back: '#EADFC8', front: '#C9B08A' } as const;

// Mixes a hex color toward another; t = 1 gives the other color.
const mix = (hex: string, toward: string, t: number): string => {
	const parse = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
	const a = parse(hex);
	const b = parse(toward);
	return `#${a
		.map((v, i) => Math.round(v + (b[i] - v) * t).toString(16).padStart(2, '0'))
		.join('')}`;
};

// A Western sheet ghost: a rounded head, dark eyes and a scalloped hem.
// Its old color survives in the outline and cheeks; the sheet is white.
// `rise` grows the ghost upright out of the story's flattened remnant.
const GhostBody: React.FC<{
	ball: BallPose;
	x: number;
	y: number;
	squash?: number;
	base?: { x: number; y: number };
	rise?: number;
}> = ({ ball, x, y, squash, base, rise = 1 }) => {
	const { r, rx, ry } = spentShape(ball.size);
	const upright = Math.max(0, Math.min(1, rise));
	const sheet = `M${-rx},${ry * 0.78} L${-rx},${-ry * 0.14}
		C${-rx},${-ry * 1.28} ${rx},${-ry * 1.28} ${rx},${-ry * 0.14}
		L${rx},${ry * 0.78}
		Q${rx * 0.74},${ry * 0.52} ${rx * 0.55},${ry * 0.94}
		Q${rx * 0.27},${ry * 0.63} 0,${ry}
		Q${-rx * 0.27},${ry * 0.63} ${-rx * 0.55},${ry * 0.94}
		Q${-rx * 0.74},${ry * 0.52} ${-rx},${ry * 0.78} Z`;
	return (
		<g transform={squashAround(base ?? { x, y }, squash)}>
			<g data-testid="story-ghost" data-color={ball.color} opacity={0.5 + 0.34 * upright} transform={`translate(${x} ${y}) scale(1 ${0.16 + 0.84 * upright})`}>
				<path data-testid="ghost-sheet" d={sheet} fill={palette.white} stroke={mix(ball.color, palette.ink, 0.45)} strokeWidth={5} strokeLinejoin="round" />
				<g opacity={upright}>
					{[-1, 1].map((side) => (
						<g key={side}>
							<ellipse data-testid="ghost-eye" cx={side * r * 0.29} cy={-r * 0.18} rx={r * 0.12} ry={r * 0.19} fill={palette.ink} />
							<ellipse cx={side * r * 0.56} cy={r * 0.2} rx={r * 0.15} ry={r * 0.08} fill={ball.color} opacity={0.55} />
						</g>
					))}
					<ellipse cx={0} cy={r * 0.32} rx={r * 0.1} ry={r * 0.13} fill={palette.ink} />
				</g>
			</g>
		</g>
	);
};

// A spent ball resting in the box, or dropping into it (`hop` above its spot).
const SpentBall: React.FC<{ ball: BallPose; x: number; y: number }> = ({ ball, x, y }) => {
	const lifted = y - (ball.hop ?? 0);
	const floor = { x, y: y + spentShape(ball.size).ry };
	return (
		<g data-testid="history-ball" data-id={ball.id}>
			<GhostBody ball={ball} x={x} y={lifted} squash={ball.squash} base={floor} />
		</g>
	);
};

// The spent story's ghost rises from the product, then floats to History.
export const SpentGhost: React.FC<{ spent: SpentPose }> = ({ spent }) => (
	<g data-testid="spent-story" data-id={spent.ball.id}>
		<GhostBody
			ball={spent.ball}
			x={spent.at.x}
			y={spent.at.y}
			squash={spent.squash}
			rise={spent.peel}
		/>
	</g>
);

// The z's reach this far right of where they start; they stay inside the box.
const ZZZ_WIDTH = 40;

const Zzz: React.FC<{ x: number; y: number }> = ({ x, y }) => (
	<g fontFamily={FONT_FAMILY} fontWeight={700} fill={palette.ink} opacity={0.75}>
		<text x={x} y={y} fontSize={22}>z</text>
		<text x={x + 16} y={y - 18} fontSize={28}>z</text>
	</g>
);

// Laid out for `room` spent balls (film: growing to make room for one more);
// left out, for the balls in it.
export const HistoryBox: React.FC<{ balls: BallPose[]; room?: number }> = ({ balls, room = balls.length }) => {
	const { left, top, bottom } = HISTORY_BOX;
	const lipTop = HISTORY_LIP_TOP;
	const width = historyWidth(room);
	const right = left + width;
	const label = historyLabelAt(room);
	return (
		<g data-testid="history-box">
			<rect x={left + SHADOW.x} y={top + SHADOW.y} width={width} height={bottom - top} rx={18} fill={palette.paperShadow} />
			<rect x={left} y={top} width={width} height={bottom - top} rx={18} fill={crate.back} stroke={palette.ink} strokeWidth={OUTLINE} />
			{balls.map((ball, i) => {
				const { x, y } = historySpot(room, i, ball.size);
				const asleep = ball.hop === undefined && ball.squash === undefined;
				return (
					<g key={ball.id}>
						<SpentBall ball={ball} x={x} y={y} />
						{asleep ? <Zzz x={Math.min(x + ball.size * 0.9, right - ZZZ_WIDTH)} y={lipTop - ball.size * 1.2} /> : null}
					</g>
				);
			})}
			<rect x={left} y={lipTop} width={width} height={bottom - lipTop} rx={14} fill={crate.front} stroke={palette.ink} strokeWidth={OUTLINE} />
			<text x={(left + right) / 2} y={(lipTop + bottom) / 2 + 12} textAnchor="middle" fontFamily={FONT_FAMILY} fontWeight={700} fontSize={34} fill={palette.ink} opacity={0.8}>
				(in Git)
			</text>
			<text
				x={label.x}
				y={label.y}
				textAnchor="middle"
				fontFamily={FONT_FAMILY}
				fontWeight={700}
				fontSize={HISTORY_LABEL.size}
				fill={palette.ink}
			>
				{HISTORY_LABEL.text}
			</text>
		</g>
	);
};
