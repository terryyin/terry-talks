import React from 'react';
import { ballColors, palette, seeded, StoryPose } from './scene';
import { Face, Mood } from './face';
import { flightPoint, HOVER, Point, scaleAround, smoothBlob, squashAround } from './layout';
import { BUBBLE, WishBubble } from './wishBubble';

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
	fuzz?: number; // how far a fuzzy body has turned fuzzy, 1 when left out
}> = ({ x, y, r, color, fuzzy, mood, transform, grounded = true, fuzz }) => {
	const outline = fuzzy ? smoothBlob(wobblyCircle(x, y, r, fuzz === undefined ? 0.16 : 0.16 * fuzz, 3)) : undefined;
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
					<g clipPath="url(#story-ball-clip)" opacity={fuzz === undefined ? undefined : Math.max(0, Math.min(1, fuzz))}>
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

export const Sparkle: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
	<path d={sparklePath(x, y, s)} fill={ballColors.sun} stroke={palette.ink} strokeWidth={3.5} strokeLinejoin="round" />
);

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
const IgnoredLines: React.FC<{ at: Point; fade?: number /* 0–1 */ }> = ({ at, fade }) => (
	<g
		data-testid="ignored-lines"
		stroke={palette.structure}
		strokeWidth={5}
		strokeDasharray="12 9"
		opacity={fade === undefined ? 0.6 : 0.6 * fade}
	>
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

// Wraps the parts that pop in with the wish bubble; left alone on the storyboard.
// `maxWidth` caps the horizontal overshoot, for parts that sit near the frame's edge.
const PopIn: React.FC<{ at: Point; scale?: number; maxWidth?: number; children: React.ReactNode }> = ({
	at,
	scale,
	maxWidth = Infinity,
	children,
}) =>
	scale === undefined ? (
		<>{children}</>
	) : scale <= 0 ? null : (
		<g transform={scaleAround(at, Math.min(scale, maxWidth), scale)}>{children}</g>
	);

export const StoryBall: React.FC<{ story: StoryPose }> = ({ story }) => {
	const { ball, state, wish, flight, at: moved, squash, stretch, bubble, fuzz } = story;
	const r = ball.size;
	if (state === 'flying') {
		const at = moved ?? flightPoint(flight);
		// Heading along the arc; at its very end, the heading it arrives with.
		const arcAt = Math.min(flight, 0.98);
		const onPath = flightPoint(arcAt);
		const next = flightPoint(arcAt + 0.02);
		const heading = { x: next.x - onPath.x, y: next.y - onPath.y };
		const angle = (Math.atan2(heading.y, heading.x) * 180) / Math.PI;
		const { along, across } = stretch ?? { along: 1.14, across: 0.9 };
		const stretched = `rotate(${angle} ${at.x} ${at.y}) ${scaleAround(at, along, across)} rotate(${-angle} ${at.x} ${at.y})`;
		const fast = stretch === undefined || stretch.along > 1.08;
		return (
			<g data-testid="story-ball" data-state={state}>
				<FlightTrail upTo={flight} />
				{fast ? <SpeedLines at={at} heading={heading} r={r} /> : null}
				<StoryBody x={at.x} y={at.y} r={r} color={ball.color} fuzzy mood="gleeful" transform={stretched} grounded={false} />
			</g>
		);
	}
	const at = moved ?? HOVER;
	if (state === 'fuzzy') {
		const shown = fuzz === undefined ? undefined : Math.max(0, Math.min(1, fuzz));
		const squiggles = (
			<>
				<Squiggle x={at.x - r - 44} y={at.y - 30} vertical />
				<Squiggle x={at.x + r + 34} y={at.y - 20} vertical />
				<Squiggle x={at.x - 30} y={at.y - r - 34} />
			</>
		);
		return (
			<g data-testid="story-ball" data-state={state}>
				<IgnoredLines at={HOVER} fade={shown} />
				<StoryBody
					x={at.x}
					y={at.y}
					r={fuzz === undefined ? r * 1.05 : r * (1 + 0.05 * fuzz)}
					color={ball.color}
					fuzzy
					mood="dreamy"
					transform={squashAround(at, squash)}
					fuzz={fuzz}
				/>
				{shown === undefined ? squiggles : <g opacity={shown}>{squiggles}</g>}
			</g>
		);
	}
	return (
		<g data-testid="story-ball" data-state={state}>
			<StoryBody x={at.x} y={at.y} r={r} color={ball.color} fuzzy={false} mood="hopeful" transform={squashAround(at, squash)} />
			<PopIn at={at} scale={bubble}>
				<Heart x={at.x - r - 18} y={at.y - r + 2} s={16} rot={-18} />
				<Heart x={at.x - r + 16} y={at.y - r - 38} s={11} rot={12} />
				<Sparkle x={at.x + r - 8} y={at.y - r - 22} s={16} />
				<Sparkle x={at.x - r - 26} y={at.y + 18} s={10} />
			</PopIn>
			<PopIn at={{ x: BUBBLE.left, y: (BUBBLE.top + BUBBLE.bottom) / 2 }} scale={bubble} maxWidth={1}>
				<WishBubble wish={wish} toward={{ x: at.x + r + 2, y: at.y + 6 }} />
			</PopIn>
		</g>
	);
};
