import React from 'react';
import { palette, ValuesPose } from './scene';
import { FONT_FAMILY, lerpPointOnArc, OUTLINE, Point, scaleAround, SHADOW } from './layout';

// A story's impact and the two values it delivers: a comic "impact!" burst,
// the physical SPLAT!'s bright cousin, out of which two value pills spring
// to their places: "customer value" (a heart) beside where the customer
// stands, and "option value" (a key: doors kept open) in the top-right
// corner. Pure function of the pose.

export const IMPACT_BURST = { at: { x: 790, y: 330 } as Point, rx: 215, ry: 118, text: 'impact!', size: 88 } as const;
export const VALUE_PILLS = {
	customer: { at: { x: 800, y: 790 } as Point, text: 'customer value', border: palette.behavior },
	option: { at: { x: 890, y: 62 } as Point, text: 'option value', border: palette.structure },
	size: 32,
	height: 54,
} as const;

const HEART = '#FF5DA2';
const KEY = '#FFC93C';
const BURST_FILL = '#FFE066';

const TEXT_FROM = 78; // px from the pill's left end to its text, past the icon
export const pillWidth = (text: string) => text.length * VALUE_PILLS.size * 0.56 + TEXT_FROM + 30;

// A spiky comic burst around its center.
const burstPath = ({ x, y }: Point, rx: number, ry: number): string => {
	const spikes = 14;
	return `${Array.from({ length: spikes * 2 }, (_, i) => {
		const a = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2;
		const k = i % 2 === 0 ? 1 : 0.72 + 0.06 * ((i * 7) % 3);
		return `${i === 0 ? 'M' : 'L'}${(x + Math.cos(a) * rx * k).toFixed(1)},${(y + Math.sin(a) * ry * k).toFixed(1)}`;
	}).join(' ')} Z`;
};

const Burst: React.FC<{ scale: number; fade?: number }> = ({ scale, fade }) => {
	const { at, rx, ry, text, size } = IMPACT_BURST;
	const d = burstPath(at, rx, ry);
	return (
		<g data-testid="impact-burst" opacity={fade} transform={scaleAround(at, scale, scale)}>
			<path d={d} transform={`translate(${SHADOW.x} ${SHADOW.y})`} fill={palette.paperShadow} />
			<path d={d} fill={BURST_FILL} stroke={palette.ink} strokeWidth={OUTLINE} strokeLinejoin="round" />
			<text
				x={at.x}
				y={at.y + size * 0.33}
				transform={`rotate(-6 ${at.x} ${at.y})`}
				textAnchor="middle"
				fontFamily={FONT_FAMILY}
				fontWeight={900}
				fontSize={size}
				fill={palette.white}
				stroke={palette.ink}
				strokeWidth={12}
				strokeLinejoin="round"
				paintOrder="stroke"
			>
				{text}
			</text>
		</g>
	);
};

const heartPath = (x: number, y: number, s: number): string =>
	`M${x},${y + s * 0.9} C${x - s * 1.4},${y - s * 0.1} ${x - s * 0.7},${y - s * 1.1} ${x},${y - s * 0.35} C${x + s * 0.7},${y - s * 1.1} ${x + s * 1.4},${y - s * 0.1} ${x},${y + s * 0.9} Z`;

const HeartIcon: React.FC<{ at: Point }> = ({ at }) => (
	<path d={heartPath(at.x, at.y, 13)} fill={HEART} stroke={palette.ink} strokeWidth={4} strokeLinejoin="round" />
);

// A key: a round bow with a hole, and a shaft with two teeth.
const KeyIcon: React.FC<{ at: Point; glint: number }> = ({ at, glint }) => {
	const { x, y } = at;
	return (
		<g data-testid="option-key" transform={`rotate(${-35 + 20 * glint} ${x} ${y})`}>
			<path
				d={`M${x - 2},${y - 4} L${x + 24},${y - 4} L${x + 24},${y + 10} L${x + 18},${y + 10} L${x + 18},${y + 4} L${x + 12},${y + 4} L${x + 12},${y + 8} L${x + 6},${y + 8} L${x + 6},${y + 4} L${x - 2},${y + 4} Z`}
				fill={KEY}
				stroke={palette.ink}
				strokeWidth={3.5}
				strokeLinejoin="round"
			/>
			<circle cx={x - 8} cy={y} r={11} fill={KEY} stroke={palette.ink} strokeWidth={4} />
			<circle cx={x - 8} cy={y} r={4} fill={palette.white} stroke={palette.ink} strokeWidth={2.5} />
		</g>
	);
};

// Four-point sparkles around the key while the option pays off.
const Glint: React.FC<{ at: Point; k: number }> = ({ at, k }) => (
	<g data-testid="option-glint" fill={palette.white} stroke={palette.ink} strokeWidth={3} strokeLinejoin="round">
		{[
			{ dx: -34, dy: -30, s: 13 },
			{ dx: 30, dy: -34, s: 10 },
			{ dx: 38, dy: 22, s: 8 },
		].map(({ dx, dy, s }, i) => {
			const r = s * k;
			const cx = at.x + dx;
			const cy = at.y + dy;
			return (
				<path
					key={i}
					d={`M${cx},${cy - r} Q${cx + r * 0.15},${cy - r * 0.15} ${cx + r},${cy} Q${cx + r * 0.15},${cy + r * 0.15} ${cx},${cy + r} Q${cx - r * 0.15},${cy + r * 0.15} ${cx - r},${cy} Q${cx - r * 0.15},${cy - r * 0.15} ${cx},${cy - r} Z`}
				/>
			);
		})}
	</g>
);

const Pill: React.FC<{ kind: 'customer' | 'option'; at: Point; scale: number; opacity: number; glint: number }> = ({ kind, at, scale, opacity, glint }) => {
	const { text, border } = VALUE_PILLS[kind];
	const { size, height } = VALUE_PILLS;
	const w = pillWidth(text);
	const left = at.x - w / 2;
	const icon = { x: left + 34, y: at.y };
	return (
		<g data-testid={`${kind}-value`} opacity={opacity} transform={scale === 1 ? undefined : scaleAround(at, scale, scale)}>
			<rect x={left + SHADOW.x * 0.6} y={at.y - height / 2 + SHADOW.y * 0.6} width={w} height={height} rx={height / 2} fill={palette.paperShadow} />
			<rect x={left} y={at.y - height / 2} width={w} height={height} rx={height / 2} fill={palette.white} stroke={border} strokeWidth={6} />
			{kind === 'customer' ? <HeartIcon at={icon} /> : <KeyIcon at={{ x: icon.x - 2, y: icon.y }} glint={glint} />}
			<text x={left + TEXT_FROM} y={at.y + size * 0.34} fontFamily={FONT_FAMILY} fontWeight={700} fontSize={size} fill={palette.ink}>
				{text}
			</text>
			{kind === 'option' && glint > 0 ? <Glint at={icon} k={glint} /> : null}
		</g>
	);
};

export const Values: React.FC<{ values: ValuesPose }> = ({ values }) => {
	const { burst, burstFade, spring, customer, option, glint = 0 } = values;
	const pillAt = (home: Point) => lerpPointOnArc(IMPACT_BURST.at, home, spring);
	const scale = spring >= 1 ? 1 : 0.3 + 0.7 * spring;
	return (
		<g data-testid="values">
			{burst !== undefined && burst > 0 && (burstFade === undefined || burstFade > 0) ? <Burst scale={burst} fade={burstFade} /> : null}
			{spring > 0 && customer > 0 ? <Pill kind="customer" at={pillAt(VALUE_PILLS.customer.at)} scale={scale} opacity={customer} glint={0} /> : null}
			{spring > 0 && option > 0 ? <Pill kind="option" at={pillAt(VALUE_PILLS.option.at)} scale={scale} opacity={option} glint={glint} /> : null}
		</g>
	);
};
