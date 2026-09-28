import React from 'react';
import { ballColors, palette, seeded, StoryPose } from './scene';
import { Face, Mood } from './face';
import { flightPoint, FONT_FAMILY, HOVER, OUTLINE, Point, SHADOW, smoothBlob } from './layout';

// The example story after it leaves the backlog. Pure function of its pose.

const wobblyCircle = (x: number, y: number, r: number, wobble: number, seed: number): Point[] =>
	Array.from({ length: 11 }, (_, i) => {
		const a = (i / 11) * Math.PI * 2;
		const k = 1 + wobble * (seeded(seed + i) * 2 - 1);
		return { x: x + Math.cos(a) * r * k, y: y + Math.sin(a) * r * k };
	});

const StoryBody: React.FC<{
	x: number;
	y: number;
	r: number;
	color: string;
	fuzzy: boolean;
	mood: Mood;
	transform?: string;
	grounded?: boolean;
}> = ({ x, y, r, color, fuzzy, mood, transform, grounded = true }) => {
	const outline = fuzzy ? smoothBlob(wobblyCircle(x, y, r, 0.16, 3)) : undefined;
	const stripes = [ballColors.sun, ballColors.grape, ballColors.lime, ballColors.sun, ballColors.grape];
	return (
		<g transform={transform}>
			{grounded ? <ellipse cx={x + 4} cy={y + r * 1.25} rx={r * 0.75} ry={r * 0.16} fill={palette.ink} opacity={0.12} /> : null}
			{fuzzy ? (
				<g>
					<defs>
						<clipPath id="story-ball-clip">
							<path d={outline} />
						</clipPath>
					</defs>
					<path d={outline} fill={color} />
					<g clipPath="url(#story-ball-clip)">
						{stripes.map((stripe, i) => {
							const sy = y - r * 1.1 + i * r * 0.5;
							return (
								<path
									key={i}
									d={`M${x - r * 1.4},${sy + r * 0.3} q${r * 0.35},${-r * 0.35} ${r * 0.7},0 t${r * 0.7},0 t${r * 0.7},0 t${r * 0.7},0`}
									fill="none"
									stroke={stripe}
									strokeWidth={r * 0.18}
									strokeLinecap="round"
								/>
							);
						})}
					</g>
					<path d={outline} fill="none" stroke={palette.ink} strokeWidth={6} strokeLinejoin="round" />
				</g>
			) : (
				<circle cx={x} cy={y} r={r} fill={color} stroke={palette.ink} strokeWidth={6} />
			)}
			<ellipse
				cx={x - r * 0.42}
				cy={y - r * 0.5}
				rx={r * 0.24}
				ry={r * 0.14}
				transform={`rotate(-35 ${x - r * 0.42} ${y - r * 0.5})`}
				fill={palette.white}
				opacity={0.85}
			/>
			{fuzzy ? <circle cx={x} cy={y + r * 0.08} r={r * 0.5} fill={color} opacity={0.9} /> : null}
			<Face x={x} y={y} r={r} mood={mood} />
		</g>
	);
};

const heartPath = (x: number, y: number, s: number): string =>
	`M${x},${y + s * 0.9} C${x - s * 1.4},${y - s * 0.1} ${x - s * 0.7},${y - s * 1.1} ${x},${y - s * 0.35} C${x + s * 0.7},${y - s * 1.1} ${x + s * 1.4},${y - s * 0.1} ${x},${y + s * 0.9} Z`;

const sparklePath = (x: number, y: number, s: number): string =>
	`M${x},${y - s} Q${x + s * 0.15},${y - s * 0.15} ${x + s},${y} Q${x + s * 0.15},${y + s * 0.15} ${x},${y + s} Q${x - s * 0.15},${y + s * 0.15} ${x - s},${y} Q${x - s * 0.15},${y - s * 0.15} ${x},${y - s} Z`;

const Heart: React.FC<{ x: number; y: number; s: number; rot: number }> = ({ x, y, s, rot }) => (
	<path
		d={heartPath(x, y, s)}
		transform={`rotate(${rot} ${x} ${y})`}
		fill={ballColors.pink}
		stroke={palette.ink}
		strokeWidth={4}
		strokeLinejoin="round"
	/>
);

const Sparkle: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
	<path d={sparklePath(x, y, s)} fill={ballColors.sun} stroke={palette.ink} strokeWidth={3.5} strokeLinejoin="round" />
);

// Breaks the wish into short lines for the speech bubble.
const bubbleLines = (text: string, maxChars = 15): string[] =>
	text.split(' ').reduce<string[]>((lines, word) => {
		const last = lines[lines.length - 1];
		if (last !== undefined && `${last} ${word}`.length <= maxChars) {
			return [...lines.slice(0, -1), `${last} ${word}`];
		}
		return [...lines, word];
	}, []);

const BUBBLE = { left: 728, right: 1048, top: 168, bottom: 392 } as const;

const WishBubble: React.FC<{ wish: string; toward: Point }> = ({ wish, toward }) => {
	const { left, right, top, bottom } = BUBBLE;
	const lines = bubbleLines(wish);
	const size = 38;
	const lineHeight = size * 1.2;
	const midY = (top + bottom) / 2;
	const first = midY - ((lines.length - 1) * lineHeight) / 2 + size * 0.35;
	const tail = `M${left + 4},${midY - 14} L${toward.x},${toward.y} L${left + 4},${midY + 40} Z`;
	return (
		<g data-testid="wish-bubble">
			<rect x={left + SHADOW.x} y={top + SHADOW.y} width={right - left} height={bottom - top} rx={44} fill={palette.paperShadow} />
			<path d={tail} fill={palette.white} stroke={palette.ink} strokeWidth={OUTLINE} strokeLinejoin="round" />
			<rect x={left} y={top} width={right - left} height={bottom - top} rx={44} fill={palette.white} stroke={palette.ink} strokeWidth={OUTLINE} />
			<path d={`M${left + 10},${midY - 6} L${left + 10},${midY + 32}`} stroke={palette.white} strokeWidth={12} />
			<text textAnchor="middle" fontFamily={FONT_FAMILY} fontWeight={700} fontSize={size} fill={palette.ink}>
				{lines.map((line, i) => (
					<tspan key={i} x={(left + right) / 2} y={first + i * lineHeight}>
						{i < lines.length - 1 ? `${line} ` : line}
					</tspan>
				))}
			</text>
		</g>
	);
};

const Squiggle: React.FC<{ x: number; y: number; vertical?: boolean }> = ({ x, y, vertical }) => (
	<path
		d={vertical ? `M${x},${y} q10,9 0,18 t0,18 t0,18` : `M${x},${y} q9,-10 18,0 t18,0 t18,0`}
		fill="none"
		stroke={palette.ink}
		strokeWidth={5}
		strokeLinecap="round"
	/>
);

// A faint dashed patch of grid lines that the fuzzy ball spills across.
const IgnoredLines: React.FC<{ at: Point }> = ({ at }) => (
	<g data-testid="ignored-lines" stroke={palette.structure} strokeWidth={5} strokeDasharray="12 9" opacity={0.6}>
		{[-1, 1].map((k) => (
			<g key={k}>
				<line x1={at.x + k * 40} y1={at.y - 108} x2={at.x + k * 40} y2={at.y + 96} />
				<line x1={at.x - 112} y1={at.y + k * 40} x2={at.x + 112} y2={at.y + k * 40} />
			</g>
		))}
	</g>
);

const FlightTrail: React.FC<{ upTo: number }> = ({ upTo }) => {
	const dots = Array.from({ length: 30 }, (_, i) => i / 30);
	return (
		<g data-testid="flight-trail">
			{dots
				.filter((s) => s < upTo - 0.12 || s > upTo + 0.14)
				.map((s) => {
					const p = flightPoint(s);
					const ahead = s > upTo;
					return <circle key={s} cx={p.x} cy={p.y} r={ahead ? 5 : 7} fill={palette.ink} opacity={ahead ? 0.25 : 0.7} />;
				})}
		</g>
	);
};

const SpeedLines: React.FC<{ at: Point; heading: Point; r: number }> = ({ at, heading, r }) => {
	const len = Math.hypot(heading.x, heading.y);
	const ux = heading.x / len;
	const uy = heading.y / len;
	return (
		<g data-testid="speed-lines">
			{[-0.55, 0, 0.55].map((k) => {
				const sx = at.x - ux * r * 1.3 - uy * r * k;
				const sy = at.y - uy * r * 1.3 + ux * r * k;
				const l = k === 0 ? 70 : 48;
				return (
					<line key={k} x1={sx} y1={sy} x2={sx - ux * l} y2={sy - uy * l} stroke={palette.ink} strokeWidth={7} strokeLinecap="round" />
				);
			})}
		</g>
	);
};

export const StoryBall: React.FC<{ story: StoryPose }> = ({ story }) => {
	const { ball, state, wish, flight } = story;
	const r = ball.size;
	if (state === 'flying') {
		const at = flightPoint(flight);
		const next = flightPoint(Math.min(1, flight + 0.02));
		const heading = { x: next.x - at.x, y: next.y - at.y };
		const angle = (Math.atan2(heading.y, heading.x) * 180) / Math.PI;
		const stretch = `rotate(${angle} ${at.x} ${at.y}) translate(${at.x} ${at.y}) scale(1.14 0.9) translate(${-at.x} ${-at.y}) rotate(${-angle} ${at.x} ${at.y})`;
		return (
			<g data-testid="story-ball" data-state={state}>
				<FlightTrail upTo={flight} />
				<SpeedLines at={at} heading={heading} r={r} />
				<StoryBody x={at.x} y={at.y} r={r} color={ball.color} fuzzy mood="gleeful" transform={stretch} grounded={false} />
			</g>
		);
	}
	if (state === 'fuzzy') {
		return (
			<g data-testid="story-ball" data-state={state}>
				<IgnoredLines at={HOVER} />
				<StoryBody x={HOVER.x} y={HOVER.y} r={r * 1.05} color={ball.color} fuzzy mood="dreamy" />
				<Squiggle x={HOVER.x - r - 44} y={HOVER.y - 30} vertical />
				<Squiggle x={HOVER.x + r + 34} y={HOVER.y - 20} vertical />
				<Squiggle x={HOVER.x - 30} y={HOVER.y - r - 34} />
			</g>
		);
	}
	return (
		<g data-testid="story-ball" data-state={state}>
			<StoryBody x={HOVER.x} y={HOVER.y} r={r} color={ball.color} fuzzy={false} mood="hopeful" />
			<Heart x={HOVER.x - r - 18} y={HOVER.y - r + 2} s={16} rot={-18} />
			<Heart x={HOVER.x - r + 16} y={HOVER.y - r - 38} s={11} rot={12} />
			<Sparkle x={HOVER.x + r - 8} y={HOVER.y - r - 22} s={16} />
			<Sparkle x={HOVER.x - r - 26} y={HOVER.y + 18} s={10} />
			<WishBubble wish={wish} toward={{ x: HOVER.x + r + 2, y: HOVER.y + 6 }} />
		</g>
	);
};
