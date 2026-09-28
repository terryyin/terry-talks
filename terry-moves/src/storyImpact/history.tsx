import React from 'react';
import { BallPose, palette, SpentPose } from './scene';
import { Face, Mood } from './face';
import { BEHAVIOR_STEP, FONT_FAMILY, HISTORY_BOX, HISTORY_LIP_TOP, historySpot, OUTLINE, SHADOW, spentShape, squashAround } from './layout';

// The History box behind the product, top-left: spent stories rest here,
// pale and content. Pure function of the spent balls. On its way there, a
// spent story is drawn by SpentSkin.

// A skin lying on the product wall slants along the Behavior axis.
const WALL_SLOPE = BEHAVIOR_STEP.y / BEHAVIOR_STEP.x;

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

// A spent ball's pale, emptied body around its center, squashed around
// `base` when given. `flat` (0–1) presses it flat onto a wall, face hidden.
const PaleBody: React.FC<{
	ball: BallPose;
	x: number;
	y: number;
	squash?: number;
	base?: { x: number; y: number };
	flat?: number;
	mood: Mood;
}> = ({ ball, x, y, squash, base, flat = 0, mood }) => {
	const { r, rx: restRx, ry: restRy } = spentShape(ball.size);
	const rx = restRx * (1 + 0.1 * flat);
	const ry = restRy * (1 - 0.2 * flat);
	const face = Math.max(0, 1 - flat * 2);
	// Lying on the wall, it slants along the Behavior axis like a decal.
	const onWall = flat === 0 ? undefined : `translate(${x} ${y}) matrix(1 ${WALL_SLOPE * flat} 0 1 0 0) translate(${-x} ${-y})`;
	return (
		<g transform={squashAround(base ?? { x, y }, squash)} opacity={flat > 0 ? 1 - 0.4 * flat : undefined}>
			<g transform={onWall}>
				<ellipse cx={x} cy={y} rx={rx} ry={ry} fill={mix(ball.color, '#E6DED3', 0.62)} stroke={palette.ink} strokeWidth={6} />
				<ellipse cx={x - rx * 0.42} cy={y - ry * 0.45} rx={r * 0.2} ry={r * 0.11} transform={`rotate(-25 ${x - rx * 0.42} ${y - ry * 0.45})`} fill={palette.white} opacity={0.6} />
				{face > 0 ? (
					<g opacity={face < 1 ? face : undefined}>
						<Face x={x} y={y + ry * 0.05} r={r} mood={mood} />
					</g>
				) : null}
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
			<PaleBody ball={ball} x={x} y={lifted} squash={ball.squash} base={floor} mood="sleepy" />
		</g>
	);
};

// The spent story on its way: its pale skin peels off the product and
// drifts, content, toward History.
export const SpentSkin: React.FC<{ spent: SpentPose }> = ({ spent }) => (
	<g data-testid="spent-story" data-id={spent.ball.id}>
		<PaleBody
			ball={spent.ball}
			x={spent.at.x}
			y={spent.at.y}
			squash={spent.squash}
			flat={1 - (spent.peel ?? 1)}
			mood="smile"
		/>
	</g>
);

const Zzz: React.FC<{ x: number; y: number }> = ({ x, y }) => (
	<g fontFamily={FONT_FAMILY} fontWeight={700} fill={palette.ink} opacity={0.75}>
		<text x={x} y={y} fontSize={22}>z</text>
		<text x={x + 16} y={y - 18} fontSize={28}>z</text>
	</g>
);

export const HistoryBox: React.FC<{ balls: BallPose[] }> = ({ balls }) => {
	const { left, right, top, bottom } = HISTORY_BOX;
	const lipTop = HISTORY_LIP_TOP;
	const width = right - left;
	return (
		<g data-testid="history-box">
			<rect x={left + SHADOW.x} y={top + SHADOW.y} width={width} height={bottom - top} rx={18} fill={palette.paperShadow} />
			<rect x={left} y={top} width={width} height={bottom - top} rx={18} fill={crate.back} stroke={palette.ink} strokeWidth={OUTLINE} />
			{balls.map((ball, i) => {
				const { x, y } = historySpot(balls.length, i, ball.size);
				const asleep = ball.hop === undefined && ball.squash === undefined;
				return (
					<g key={ball.id}>
						<SpentBall ball={ball} x={x} y={y} />
						{asleep ? <Zzz x={x + ball.size * 0.9} y={lipTop - ball.size * 1.2} /> : null}
					</g>
				);
			})}
			<rect x={left} y={lipTop} width={width} height={bottom - lipTop} rx={14} fill={crate.front} stroke={palette.ink} strokeWidth={OUTLINE} />
			<line x1={left + 22} y1={(lipTop + bottom) / 2} x2={right - 22} y2={(lipTop + bottom) / 2} stroke={palette.ink} strokeWidth={4} strokeLinecap="round" opacity={0.35} />
			<text
				x={(left + right) / 2}
				y={top - 20}
				textAnchor="middle"
				fontFamily={FONT_FAMILY}
				fontWeight={700}
				fontSize={40}
				fill={palette.ink}
			>
				History
			</text>
			<text x={(left + right) / 2} y={bottom + 40} textAnchor="middle" fontFamily={FONT_FAMILY} fontWeight={700} fontSize={26} fill={palette.ink} opacity={0.7}>
				(in Git)
			</text>
		</g>
	);
};
