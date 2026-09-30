import React from 'react';
import { palette, seeded } from '../storyImpact/scene';
import { Face } from '../storyImpact/face';
import { FONT_FAMILY, OUTLINE, Point, scaleAround, SHADOW } from '../storyImpact/layout';
import { CARD, HEADER, METER, PANEL } from './layout';
import type { BallPose, CardPose, Pose } from './pose';
import { mixHex } from './pose';

// The smaller pieces around the product: the header pill, the story balls,
// the test tags, the "how we build here" card, the quality meter, the
// downward spiral, the page that turns between the two stories. Pure.

const sparkle = (x: number, y: number, s: number): string =>
	`M${x},${y - s} Q${x + s * 0.15},${y - s * 0.15} ${x + s},${y} Q${x + s * 0.15},${y + s * 0.15} ${x},${y + s} Q${x - s * 0.15},${y + s * 0.15} ${x - s},${y} Q${x - s * 0.15},${y - s * 0.15} ${x},${y - s} Z`;

const GREEN = '#2A9D5C';
const RED = '#E5484D';

export const Header: React.FC<{ header: Pose['header'] }> = ({ header }) => {
	const width = header.text.length * 20 + 52;
	const fill = header.warn ? palette.ink : palette.white;
	const k = Math.max(0.001, header.pop);
	return (
		<g data-testid="header" transform={scaleAround({ x: HEADER.left, y: HEADER.top + HEADER.height / 2 }, k, k)}>
			<rect x={HEADER.left + SHADOW.x} y={HEADER.top + SHADOW.y} width={width} height={HEADER.height} rx={28} fill={palette.paperShadow} />
			<rect x={HEADER.left} y={HEADER.top} width={width} height={HEADER.height} rx={28} fill={fill} stroke={palette.ink} strokeWidth={OUTLINE - 1} />
			<text x={HEADER.left + width / 2} y={HEADER.top + 40} textAnchor="middle" fontFamily={FONT_FAMILY} fontWeight={800} fontSize={36} fill={header.warn ? palette.white : palette.ink}>
				{header.text}
			</text>
		</g>
	);
};

// A shiny plan: stars twinkling round it.
const Twinkles: React.FC<{ at: Point; r: number; t: number }> = ({ at, r, t }) => (
	<g data-testid="twinkles" fill={palette.white} stroke="#E8B923" strokeWidth={3} strokeLinejoin="round">
		{[0, 1, 2, 3, 4].map((i) => {
			const k = Math.max(0, Math.sin(t * 4 + i * 1.7));
			const a = -2.6 + i * 1.3;
			const d = r * 1.55;
			return k < 0.05 ? null : <path key={i} d={sparkle(at.x + Math.cos(a) * d, at.y + Math.sin(a) * d, 14 * k)} />;
		})}
	</g>
);

export const Ball: React.FC<{ ball: BallPose }> = ({ ball }) => {
	const { x, y, r } = ball;
	return (
		<g data-testid="story-ball" data-id={ball.id} transform={scaleAround({ x, y }, ball.show, ball.show)}>
			<g transform={scaleAround({ x, y: y + r }, ball.squash, 1 / ball.squash)}>
				<circle cx={x} cy={y} r={r} fill={ball.color} stroke={palette.ink} strokeWidth={6} />
				<ellipse cx={x - r * 0.4} cy={y - r * 0.45} rx={r * 0.26} ry={r * 0.16} transform={`rotate(-35 ${x - r * 0.4} ${y - r * 0.45})`} fill={palette.white} opacity={0.85} />
				<Face x={x} y={y} r={r} mood={ball.mood} />
			</g>
			{ball.twinkle === undefined ? null : <Twinkles at={{ x, y }} r={r} t={ball.twinkle} />}
			{ball.label ? (
				<text x={x} y={y - r - 14} textAnchor="middle" fontFamily={FONT_FAMILY} fontWeight={700} fontSize={26} fill={palette.ink} stroke={palette.paper} strokeWidth={6} paintOrder="stroke">
					{ball.label}
				</text>
			) : null}
		</g>
	);
};

const Shield: React.FC<{ at: Point; text: string; color: string; ok: boolean; pop: number }> = ({ at, text, color, ok, pop }) =>
	pop <= 0 ? null : (
		<g data-testid={ok ? 'tests-tag' : 'no-tests-tag'} transform={scaleAround(at, pop, pop)}>
			<rect x={at.x - 78 + 5} y={at.y - 24 + 5} width={156} height={48} rx={14} fill={palette.paperShadow} />
			<rect x={at.x - 78} y={at.y - 24} width={156} height={48} rx={14} fill={palette.white} stroke={color} strokeWidth={5} strokeDasharray={ok ? undefined : '10 7'} />
			{ok ? (
				<path d={`M${at.x - 62},${at.y} l9,10 l18,-20`} fill="none" stroke={color} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
			) : (
				<path d={`M${at.x - 60},${at.y - 10} l18,20 m0,-20 l-18,20`} fill="none" stroke={color} strokeWidth={6} strokeLinecap="round" />
			)}
			<text x={at.x + 16} y={at.y + 9} textAnchor="middle" fontFamily={FONT_FAMILY} fontWeight={800} fontSize={26} fill={color}>
				{text}
			</text>
		</g>
	);

const Warning: React.FC<{ at: Point; pop: number; beat: number }> = ({ at, pop, beat }) => {
	if (pop <= 0) return null;
	const k = pop * (1 + 0.08 * Math.sin(beat * 8));
	return (
		<g data-testid="warning" transform={scaleAround(at, k, k)}>
			<path d={`M${at.x},${at.y - 28} L${at.x + 30},${at.y + 22} L${at.x - 30},${at.y + 22} Z`} fill="#FFD23F" stroke={palette.ink} strokeWidth={5} strokeLinejoin="round" />
			<text x={at.x} y={at.y + 15} textAnchor="middle" fontFamily={FONT_FAMILY} fontWeight={900} fontSize={30} fill={palette.ink}>
				!
			</text>
		</g>
	);
};

export const Tags: React.FC<{ tags: Pose['tags']; s: number }> = ({ tags, s }) => {
	const fixed = tags.testsOnTeam2 > 0.5;
	return (
		<g data-testid="tags">
			<Shield at={{ x: 215, y: 585 }} text="tests" color={GREEN} ok pop={tags.tests} />
			<Shield at={{ x: 480, y: 640 }} text={fixed ? 'tests' : 'no tests'} color={fixed ? GREEN : RED} ok={fixed} pop={tags.noTests} />
			<Warning at={{ x: 337, y: 520 }} pop={tags.warning} beat={s} />
			{tags.overlap > 0 ? (
				<g data-testid="overlap-label" transform={scaleAround({ x: 337, y: 405 }, tags.overlap, tags.overlap)}>
					<rect x={337 - 62} y={405 - 22} width={124} height={44} rx={22} fill={palette.white} stroke={palette.ink} strokeWidth={5} />
					<text x={337} y={405 + 10} textAnchor="middle" fontFamily={FONT_FAMILY} fontWeight={800} fontSize={28} fill={palette.ink}>
						overlap
					</text>
				</g>
			) : null}
		</g>
	);
};

// A jagged spark between two people whose ways of working just collided:
// painful.
export const Zap: React.FC<{ zap: number }> = ({ zap }) =>
	zap <= 0 ? null : (
		<g data-testid="zap" transform={scaleAround({ x: 385, y: 895 }, zap, zap)} stroke={palette.ink} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" fill="#FFD23F">
			<path d="M385,850 L366,896 L390,896 L372,940 L410,884 L386,884 L400,850 Z" />
		</g>
	);

const CARD_ITEMS = ['Tests for new code', 'Review each change', 'One shared "done"'];

export const Card: React.FC<{ card: CardPose }> = ({ card }) => {
	const { left, top, width, height } = CARD;
	const middle = left + width / 2;
	const ring = card.pulse * (0.5 + 0.5 * Math.sin(card.pulse * 20));
	return (
		<g
			data-testid="how-we-build-card"
			transform={`${scaleAround({ x: middle, y: top }, card.pin, card.pin)} translate(${card.fall * 330} ${card.fall * 40}) rotate(${-2 + card.fall * 30} ${middle} ${top})`}
			opacity={1 - card.fall * 0.5}
		>
			<rect x={left + SHADOW.x} y={top + SHADOW.y} width={width} height={height} rx={22} fill={palette.paperShadow} />
			<rect x={left} y={top} width={width} height={height} rx={22} fill={palette.white} stroke={palette.ink} strokeWidth={OUTLINE - 1} />
			{ring > 0.05 ? <rect x={left - 8} y={top - 8} width={width + 16} height={height + 16} rx={28} fill="none" stroke={GREEN} strokeWidth={6} opacity={ring} /> : null}
			<text x={middle} y={top + 46} textAnchor="middle" fontFamily={FONT_FAMILY} fontWeight={800} fontSize={32} fill={palette.ink}>
				How we build here
			</text>
			<path d={`M${left + 24},${top + 62} h${width - 48}`} stroke={palette.structure} strokeWidth={5} strokeLinecap="round" />
			{CARD_ITEMS.map((text, i) => {
				const done = Math.max(0, Math.min(1, card.items - i));
				const y = top + 106 + i * 42;
				return (
					<g key={text} data-testid="card-item" data-done={done >= 1 ? 'true' : 'false'}>
						<rect x={left + 24} y={y - 22} width={28} height={28} rx={7} fill={palette.white} stroke={palette.ink} strokeWidth={4} />
						<path d={`M${left + 30},${y - 8} l6,7 l10,-14`} fill="none" stroke={GREEN} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={30} strokeDashoffset={30 * (1 - done)} />
						<text x={left + 66} y={y} fontFamily={FONT_FAMILY} fontWeight={700} fontSize={24} fill={palette.ink}>
							{text}
						</text>
					</g>
				);
			})}
			<circle cx={middle} cy={top - 2} r={13} fill={RED} stroke={palette.ink} strokeWidth={4} />
			<circle cx={middle - 4} cy={top - 6} r={4} fill={palette.white} opacity={0.8} />
		</g>
	);
};

export const Meter: React.FC<{ quality: number }> = ({ quality }) => {
	const { left, top, width } = METER;
	const bar = width - 4;
	const filled = Math.max(26, bar * quality);
	const color = mixHex(mixHex(RED, '#FFC93C', quality * 2), GREEN, quality * 2 - 1);
	return (
		<g data-testid="quality-meter" data-quality={quality.toFixed(2)}>
			<text x={left} y={top - 8} fontFamily={FONT_FAMILY} fontWeight={700} fontSize={26} fill={palette.ink}>
				Product quality
			</text>
			<rect x={left + 2} y={top} width={bar} height={26} rx={13} fill={palette.white} stroke={palette.ink} strokeWidth={5} />
			<rect x={left + 2} y={top} width={filled} height={26} rx={13} fill={color} stroke={palette.ink} strokeWidth={5} />
			<ellipse cx={left + filled - 12} cy={top + 8} rx={5} ry={3} fill={palette.white} opacity={0.8} />
		</g>
	);
};

// A downward spiral: the warning of what neglect does.
export const Spiral: React.FC<{ spiral: number; turn: number }> = ({ spiral, turn }) => {
	if (spiral <= 0) return null;
	const c = { x: 885, y: 262 };
	const path = Array.from({ length: 40 }, (_, i) => {
		const a = (i / 39) * Math.PI * 5.2 + turn;
		const rr = 92 - (i / 39) * 76;
		return `${i === 0 ? 'M' : 'L'}${(c.x + Math.cos(a) * rr).toFixed(1)},${(c.y + Math.sin(a) * rr * 0.9 + i * 0.9).toFixed(1)}`;
	}).join(' ');
	return (
		<g data-testid="spiral" transform={scaleAround(c, spiral, spiral)} opacity={spiral}>
			<path d={path} fill="none" stroke={palette.ink} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
			<path d={path} fill="none" stroke={RED} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
			<path d={`M${c.x - 24},${c.y + 30} l24,26 l24,-26 Z`} fill={RED} stroke={palette.ink} strokeWidth={5} strokeLinejoin="round" />
		</g>
	);
};

// The page that turns over the product between the two stories.
export const Sheet: React.FC<{ sheet: Pose['sheet'] }> = ({ sheet }) => {
	if (sheet.cover <= 0 || sheet.uncover >= 1) return null;
	const w = PANEL.width + 30;
	const x = PANEL.left - 15 - (1 - sheet.cover) * (w + 80) + sheet.uncover * (w + 80);
	return (
		<g data-testid="sheet">
			<rect x={x + SHADOW.x} y={PANEL.top - 10 + SHADOW.y} width={w} height={PANEL.height + 20} rx={20} fill={palette.paperShadow} />
			<rect x={x} y={PANEL.top - 10} width={w} height={PANEL.height + 20} rx={20} fill={palette.paper} stroke={palette.ink} strokeWidth={OUTLINE} />
		</g>
	);
};

const SPARKS = Array.from({ length: 12 }, (_, i) => ({ x: 70 + seeded(i * 3 + 1) * 590, y: 180 + seeded(i * 3 + 2) * 530, s: 12 + seeded(i * 3 + 3) * 12, phase: seeded(i + 90) * 6 }));

// Sparkles over a product that reads as one surface.
export const Sparkles: React.FC<{ joy: number; s: number }> = ({ joy, s }) =>
	joy <= 0 ? null : (
		<g data-testid="sparkles" fill={palette.white} stroke="#E8B923" strokeWidth={3} strokeLinejoin="round">
			{SPARKS.map((sp, i) => {
				const k = joy * Math.max(0, Math.sin(s * 3 + sp.phase));
				return k <= 0.02 ? null : <path key={i} d={sparkle(sp.x, sp.y, sp.s * k)} />;
			})}
		</g>
	);
