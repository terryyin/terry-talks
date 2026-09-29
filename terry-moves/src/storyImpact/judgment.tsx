import React from 'react';
import { Easing } from 'remotion';
import { JudgmentPose, palette } from './scene';
import { Label } from './pieces';
import { FONT_FAMILY, Point, scaleAround, wallPoint } from './layout';
import { clamp01 } from './motion';

// Development at work on a splash: "judgment-intensive" under the
// whole-product name, and "?" thought bubbles bobbing over the product.
// Pure function of the pose.

export const JUDGMENT_LABEL = { at: { x: 760, y: 385 } as Point, size: 40, text: 'judgment-intensive' } as const;

const BUBBLES: { at: Point; phase: number }[] = [
	{ at: wallPoint(1.0, 3.6), phase: 0 },
	{ at: wallPoint(3.2, 3.5), phase: 2.1 },
	{ at: wallPoint(2.7, 0.75), phase: 4.2 },
];

const pop = Easing.out(Easing.back(2.4));

const Bubble: React.FC<{ at: Point; scale: number }> = ({ at, scale }) => (
	<g data-testid="judgment-bubble" transform={scaleAround({ x: at.x - 20, y: at.y + 30 }, scale, scale)}>
		<circle cx={at.x - 20} cy={at.y + 32} r={5} fill={palette.white} stroke={palette.ink} strokeWidth={3} />
		<circle cx={at.x - 10} cy={at.y + 20} r={8} fill={palette.white} stroke={palette.ink} strokeWidth={3.5} />
		<circle cx={at.x + 8} cy={at.y - 8} r={24} fill={palette.white} stroke={palette.ink} strokeWidth={5} />
		<text x={at.x + 8} y={at.y + 4} textAnchor="middle" fontFamily={FONT_FAMILY} fontWeight={900} fontSize={34} fill={palette.ink}>
			?
		</text>
	</g>
);

export const Judgment: React.FC<{ judgment: JudgmentPose }> = ({ judgment }) => {
	const { show, bob, fade } = judgment;
	if (show <= 0 || (fade !== undefined && fade <= 0)) return null;
	const label = pop(clamp01(show * 2));
	const { at, size, text } = JUDGMENT_LABEL;
	return (
		<g data-testid="judgment" opacity={fade}>
			{BUBBLES.map((b, i) => {
				const k = clamp01(show * 4 - 1 - i);
				if (k <= 0) return null;
				const lift = 6 * Math.sin(2 * Math.PI * 1.2 * bob + b.phase);
				return <Bubble key={i} at={{ x: b.at.x, y: b.at.y + lift }} scale={pop(k)} />;
			})}
			<g transform={label === 1 ? undefined : scaleAround(at, label, label)}>
				<Label x={at.x} y={at.y} text={text} color={palette.ink} size={size} />
			</g>
		</g>
	);
};
