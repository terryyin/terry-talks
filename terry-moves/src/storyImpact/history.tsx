import React from 'react';
import { BallPose, palette } from './scene';
import { Face } from './face';
import { FONT_FAMILY, HISTORY_BOX, OUTLINE, SHADOW } from './layout';

// The History box behind the product, top-left: spent stories rest here,
// pale and content. Pure function of the spent balls.

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

const SpentBall: React.FC<{ ball: BallPose; x: number; floor: number }> = ({ ball, x, floor }) => {
	const r = ball.size * 0.9;
	const rx = r * 1.14;
	const ry = r * 0.84;
	const y = floor - ry;
	return (
		<g data-testid="history-ball" data-id={ball.id}>
			<ellipse cx={x} cy={y} rx={rx} ry={ry} fill={mix(ball.color, '#E6DED3', 0.62)} stroke={palette.ink} strokeWidth={6} />
			<ellipse cx={x - rx * 0.42} cy={y - ry * 0.45} rx={r * 0.2} ry={r * 0.11} transform={`rotate(-25 ${x - rx * 0.42} ${y - ry * 0.45})`} fill={palette.white} opacity={0.6} />
			<Face x={x} y={y + ry * 0.05} r={r} mood="sleepy" />
		</g>
	);
};

const Zzz: React.FC<{ x: number; y: number }> = ({ x, y }) => (
	<g fontFamily={FONT_FAMILY} fontWeight={700} fill={palette.ink} opacity={0.75}>
		<text x={x} y={y} fontSize={22}>z</text>
		<text x={x + 16} y={y - 18} fontSize={28}>z</text>
	</g>
);

export const HistoryBox: React.FC<{ balls: BallPose[] }> = ({ balls }) => {
	const { left, right, top, bottom } = HISTORY_BOX;
	const lipTop = bottom - 50;
	const width = right - left;
	const slot = width / Math.max(balls.length, 1);
	return (
		<g data-testid="history-box">
			<rect x={left + SHADOW.x} y={top + SHADOW.y} width={width} height={bottom - top} rx={18} fill={palette.paperShadow} />
			<rect x={left} y={top} width={width} height={bottom - top} rx={18} fill={crate.back} stroke={palette.ink} strokeWidth={OUTLINE} />
			{balls.map((ball, i) => {
				const x = left + slot * (i + 0.5);
				return (
					<g key={ball.id}>
						<SpentBall ball={ball} x={x} floor={lipTop + 14} />
						<Zzz x={x + ball.size * 0.9} y={lipTop - ball.size * 1.2} />
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
