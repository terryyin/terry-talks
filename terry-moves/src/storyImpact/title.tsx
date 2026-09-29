import React from 'react';
import { ballColors, palette, seeded, TitlePose } from './scene';
import { FONT_FAMILY, OUTLINE, Point, scaleAround, SHADOW, smoothBlob } from './layout';

// The film's title on the empty paper. Pure function of its pose: the first
// line is romantic (bright, tilted letters dropped onto a paint splash), the
// second disciplined (straight ink over a ruled underline).

const CENTER: Point = { x: 540, y: 500 };
const ROMANTIC = { y: 480, size: 100 };
const DISCIPLINED = { y: 620, size: 80 };
const LETTER_COLORS = [ballColors.grape, ballColors.pink, ballColors.sun, ballColors.lime];

// The splash sits behind the start of the first line, like the paint ball
// that brought the letters.
const SPLASH: Point = { x: 150, y: 385 };
const SPLASH_SEED = 11;

const splashBlob = (at: Point, r: number): string =>
	smoothBlob(
		Array.from({ length: 18 }, (_, i) => {
			const angle = (i / 18) * Math.PI * 2;
			const dist = r * (i % 2 === 0 ? 1.05 + 0.35 * seeded(SPLASH_SEED + i) : 0.85 + 0.1 * seeded(SPLASH_SEED + i));
			return { x: at.x + Math.cos(angle) * dist, y: at.y + Math.sin(angle) * dist };
		}),
	);

const splashDrops = (at: Point) =>
	Array.from({ length: 6 }, (_, i) => {
		const angle = -0.6 + i * 0.95 + seeded(SPLASH_SEED + 30 + i) * 0.4;
		const dist = 105 + 40 * seeded(SPLASH_SEED + 40 + i);
		return { x: at.x + Math.cos(angle) * dist, y: at.y + Math.sin(angle) * dist, r: 7 + 7 * seeded(SPLASH_SEED + 50 + i) };
	});

// A paint splash, like the paint ball that brought the romantic letters.
export const Splash: React.FC<{ scale: number; at?: Point }> = ({ scale, at = SPLASH }) =>
	scale <= 0 ? null : (
		<g data-testid="title-splash" transform={scaleAround(at, scale, scale)} fill={ballColors.pink}>
			<path d={splashBlob(at, 68)} transform={`translate(${SHADOW.x} ${SHADOW.y})`} fill={palette.paperShadow} />
			<path d={splashBlob(at, 68)} stroke={palette.ink} strokeWidth={OUTLINE} strokeLinejoin="round" />
			{splashDrops(at).map((d, i) => (
				<circle key={i} cx={d.x} cy={d.y} r={d.r} stroke={palette.ink} strokeWidth={4} />
			))}
			<ellipse cx={at.x - 26} cy={at.y - 28} rx={18} ry={10} transform={`rotate(-35 ${at.x - 26} ${at.y - 28})`} fill={palette.white} opacity={0.8} />
		</g>
	);

// Bright, tilted letters that drop in one by one (`drops`: px above their
// place, null = not dropped yet).
export const RomanticLine: React.FC<{ text: string; drops: (number | null)[]; y?: number; size?: number }> = ({
	text,
	drops,
	y = ROMANTIC.y,
	size = ROMANTIC.size,
}) => {
	let colorIndex = 0;
	const letters = [...text].map((ch, i) => {
		const color = ch === ' ' ? palette.ink : LETTER_COLORS[colorIndex++ % LETTER_COLORS.length];
		return { ch, color, drop: drops[i] ?? null, tilt: Math.round((seeded(i + 3) - 0.5) * 16) };
	});
	return (
		<text
			data-testid="title-romantic"
			x={CENTER.x}
			y={y}
			textAnchor="middle"
			fontFamily={FONT_FAMILY}
			fontWeight={800}
			fontSize={size}
			stroke={palette.ink}
			strokeWidth={12}
			strokeLinejoin="round"
			paintOrder="stroke"
			rotate={letters.map((l) => l.tilt).join(' ')}
		>
			{letters.map((l, i) => (
				// Relative shifts keep the line one text chunk, so it stays centered.
				<tspan key={i} dy={(letters[i - 1]?.drop ?? 0) - (l.drop ?? 0)} fill={l.color} fillOpacity={l.drop === null ? 0 : 1} strokeOpacity={l.drop === null ? 0 : 1}>
					{l.ch}
				</tspan>
			))}
		</text>
	);
};

// Straight ink that snaps into place over a ruled underline.
export const DisciplinedLine: React.FC<{ text: string; snap: number; underline: number; y?: number; size?: number }> = ({
	text,
	snap,
	underline,
	y = DISCIPLINED.y,
	size = DISCIPLINED.size,
}) => {
	const half = 330;
	const lineY = y + 34;
	const ticks = Array.from({ length: 11 }, (_, i) => CENTER.x - half + (i * 2 * half) / 10).filter(
		(x) => x <= CENTER.x - half + 2 * half * underline + 0.5,
	);
	return (
		<g data-testid="title-disciplined">
			{snap > 0 ? (
				<g transform={scaleAround({ x: CENTER.x, y: y - 30 }, snap, snap)}>
					<text
						x={CENTER.x}
						y={y}
						textAnchor="middle"
						fontFamily={FONT_FAMILY}
						fontWeight={800}
						fontSize={size}
						fill={palette.ink}
					>
						{text}
					</text>
				</g>
			) : null}
			{underline > 0 ? (
				<g stroke={palette.structure} strokeLinecap="round">
					<line x1={CENTER.x - half} y1={lineY} x2={CENTER.x - half + 2 * half * underline} y2={lineY} strokeWidth={8} />
					{ticks.map((x, i) => (
						<line key={i} x1={x} y1={lineY} x2={x} y2={lineY + (i % 5 === 0 ? 22 : 12)} strokeWidth={5} />
					))}
				</g>
			) : null}
		</g>
	);
};

export const Title: React.FC<{ title: TitlePose }> = ({ title }) => {
	const k = 1 - title.leave;
	if (k <= 0) return null;
	return (
		<g data-testid="title" transform={title.leave === 0 ? undefined : scaleAround(CENTER, k, k)} opacity={Math.min(1, k * 1.5)}>
			<Splash scale={title.splash} />
			<RomanticLine text={title.romantic} drops={title.drops} />
			<DisciplinedLine text={title.disciplined} snap={title.snap} underline={title.underline} />
		</g>
	);
};
