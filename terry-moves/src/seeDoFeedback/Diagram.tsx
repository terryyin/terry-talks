import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {poppinsFontFamily} from './font';
import {colors, Stage} from './Stage';

// Redrawn from Terry's provided sketch, kept in
// public/assets/see-do-feedback/source-sketch.jpeg. The paths intentionally
// retain the marker's broad bends, double downstroke, and asymmetric arrows.
const upperLoop =
	'M616 457 C624 410 658 373 697 366 C755 353 810 379 839 414 Q853 432 855 453';
const lowerLoop =
	'M855 641 C845 696 811 729 754 739 C700 750 656 731 624 709 Q603 689 601 650';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const MarkerStroke: React.FC<{
	d: string;
	progress: number;
	width?: number;
}> = ({d, progress, width = 11}) => (
	<path
		d={d}
		fill="none"
		stroke={colors.ink}
		strokeWidth={width}
		strokeLinecap="round"
		strokeLinejoin="round"
		pathLength={1}
		strokeDasharray="1 1"
		strokeDashoffset={1 - progress}
		opacity={progress > 0 ? 1 : 0}
	/>
);

const MovingInk: React.FC<{
	d: string;
	progress: number;
	active: boolean;
	color: string;
}> = ({d, progress, active, color}) => {
	const length = Math.min(0.18, Math.max(0, progress));
	return (
		<path
			d={d}
			fill="none"
			stroke={color}
			strokeWidth={13}
			strokeLinecap="round"
			pathLength={1}
			strokeDasharray={`${length} 1`}
			strokeDashoffset={-(progress - length)}
			opacity={active && length > 0 ? 1 : 0}
		/>
	);
};

export const Diagram: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const down = interpolate(frame, [0, 1.1 * fps], [0, 1], clamp);
	const forward = interpolate(frame, [0.8 * fps, 1.7 * fps], [0, 1], clamp);
	const upper = interpolate(frame, [1.5 * fps, 2.6 * fps], [0, 1], clamp);
	const lower = interpolate(frame, [2.3 * fps, 3.4 * fps], [0, 1], clamp);
	const loopStart = 3.5 * fps;
	const circuit = 4.5 * fps;
	const loopEnd = loopStart + 2 * circuit;
	const running = frame >= loopStart && frame < loopEnd;
	const phase = ((frame - loopStart) % circuit) / circuit;
	const onUpper = running && phase < 0.5;
	const onLower = running && phase >= 0.5;
	const annotations = interpolate(
		frame,
		[loopStart + circuit, loopStart + circuit + 0.7 * fps],
		[0, 1],
		clamp,
	);
	const caption =
		frame < 3.5 * fps
			? 'See the problem.'
			: frame < 10 * fps
				? 'Act. Learn. Improve.'
				: 'A product preserves what we learn.';

	return (
		<Stage chapter="">
			<svg
				width="1080"
				height="1080"
				viewBox="0 0 1080 1080"
				role="img"
				aria-label="Terry's hand-drawn diagram: suffering becomes passion; seeing leads to doing; doing and feedback form a learning loop."
				data-artwork="terry-source-sketch-redraw"
				style={{position: 'absolute', inset: 0, fontFamily: poppinsFontFamily}}
			>
				<g
					fill={colors.ink}
					fontSize={52}
					fontWeight={500}
					textAnchor="middle"
					letterSpacing={-1.8}
				>
					<text x="155" y="382">Suffer</text>
					<text x="155" y="708">Passion</text>
					<text x="383" y="562">See</text>
					<text x="610" y="562">Do</text>
					<text x="849" y="562">Feedback</text>
				</g>

				<MarkerStroke d="M139 432 Q137 483 142 532 L144 598" progress={down} width={12} />
				<MarkerStroke d="M172 432 Q174 485 177 531 L177 596" progress={down} width={12} />
				<MarkerStroke
					d="M125 579 Q134 609 157 632 Q171 618 191 584"
					progress={interpolate(frame, [0.7 * fps, 1.3 * fps], [0, 1], clamp)}
					width={12}
				/>

				<MarkerStroke d="M454 544 Q485 547 511 545 L547 544" progress={forward} />
				<MarkerStroke
					d="M528 531 Q543 537 552 544 Q542 552 531 558"
					progress={interpolate(frame, [1.3 * fps, 1.8 * fps], [0, 1], clamp)}
				/>

				<MarkerStroke d={upperLoop} progress={upper} />
				<MarkerStroke
					d="M837 442 Q842 460 856 465 Q866 463 875 442"
					progress={interpolate(frame, [2.3 * fps, 2.8 * fps], [0, 1], clamp)}
				/>
				<MarkerStroke d={lowerLoop} progress={lower} />
				<MarkerStroke
					d="M586 671 Q591 654 601 640 Q609 650 623 660"
					progress={interpolate(frame, [3.1 * fps, 3.5 * fps], [0, 1], clamp)}
				/>

				<MovingInk d={upperLoop} progress={phase * 2} active={onUpper} color={colors.gold} />
				<MovingInk d={lowerLoop} progress={(phase - 0.5) * 2} active={onLower} color={colors.coral} />

				<g
					opacity={annotations}
					fill={colors.muted}
					fontSize={25}
					fontWeight={400}
					textAnchor="middle"
					letterSpacing={0}
					data-annotations="human-ai-human"
				>
					<text x="383" y="607">Human</text>
					<text x="610" y="607">AI</text>
					<text x="849" y="607">Human</text>
				</g>
			</svg>
			<div
				style={{
					position: 'absolute',
					left: 62,
					right: 62,
					bottom: 113,
					fontFamily: poppinsFontFamily,
					fontWeight: 400,
					fontSize: 40,
					lineHeight: 1.3,
					letterSpacing: -0.9,
					textAlign: 'center',
					color: colors.muted,
				}}
			>
				{caption}
			</div>
		</Stage>
	);
};
