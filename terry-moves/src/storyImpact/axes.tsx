import React from 'react';
import { palette } from './scene';
import { Label } from './pieces';
import { AXES, BEHAVIOR_LABEL_ANGLE, ORIGIN, Point, roundedPath, scaleAround, wallPoint } from './layout';
import { lerpPoint } from './motion';

// The product space's axes: Behavior and Structure, and Time once stories
// arrive. Pure function of its props, like the other pieces.

// `grow` (0–1) draws the arrow only part of the way from `from` to `to`, its
// head shrinking while the arrow is still short.
const Arrow: React.FC<{ from: Point; to: Point; color: string; testId: string; grow?: number }> = ({
	from,
	to: fullTo,
	color,
	testId,
	grow = 1,
}) => {
	const to = grow === 1 ? fullTo : lerpPoint(from, fullTo, grow);
	const len = Math.hypot(to.x - from.x, to.y - from.y);
	const ux = (to.x - from.x) / len;
	const uy = (to.y - from.y) / len;
	const headScale = grow === 1 ? 1 : Math.min(1, len / 90);
	const head = 34 * headScale;
	const baseX = to.x - ux * head;
	const baseY = to.y - uy * head;
	const nx = -uy * 20 * headScale;
	const ny = ux * 20 * headScale;
	const tip = [
		{ x: to.x, y: to.y },
		{ x: baseX + nx, y: baseY + ny },
		{ x: baseX - nx, y: baseY - ny },
	];
	const headPath = roundedPath(tip, 6);
	const line = (stroke: string, width: number) => (
		<line
			x1={from.x}
			y1={from.y}
			x2={baseX + ux * 4}
			y2={baseY + uy * 4}
			stroke={stroke}
			strokeWidth={width}
			strokeLinecap="round"
		/>
	);
	return (
		<g data-testid={testId}>
			{line(palette.ink, 18)}
			<path d={headPath} fill={palette.ink} stroke={palette.ink} strokeWidth={14} strokeLinejoin="round" />
			{line(color, 8)}
			<path d={headPath} fill={color} stroke={color} strokeWidth={2} strokeLinejoin="round" />
		</g>
	);
};

// A label shows once its arrow has nearly grown: it pops in around `at`.
const labelPop = (grow: number | undefined, at: Point): { transform?: string; hidden: boolean } => {
	if (grow === undefined || grow >= 1) return { hidden: false };
	const k = Math.max(0, (grow - 0.75) / 0.25);
	return { hidden: k <= 0, transform: scaleAround(at, k, k) };
};

// `grow` and `timeGrow` (0–1, left out = 1) grow the arrows from the origin
// while the product space is built; the labels pop in as they arrive.
export const Axes: React.FC<{ showTime: boolean; grow?: number; timeGrow?: number }> = ({ showTime, grow, timeGrow }) => {
	const behaviorLabel = wallPoint(3.3, 0);
	const timeLabel = labelPop(timeGrow, { x: AXES.timeEnd.x - 60, y: AXES.timeEnd.y + 50 });
	const behaviorPop = labelPop(grow, { x: behaviorLabel.x, y: behaviorLabel.y + 60 });
	const structurePop = labelPop(grow, { x: AXES.structureEnd.x + 30, y: AXES.structureEnd.y + 40 });
	const axesShown = grow === undefined || grow > 0;
	if (!axesShown && !showTime) return null;
	return (
		<g>
			{showTime && (timeGrow === undefined || timeGrow > 0) ? (
				<g data-testid="time-axis">
					<Arrow from={ORIGIN} to={AXES.timeEnd} color={palette.time} testId="time-arrow" grow={timeGrow} />
					{timeLabel.hidden ? null : (
						<g transform={timeLabel.transform}>
							<Label x={AXES.timeEnd.x - 20} y={AXES.timeEnd.y + 62} text="Time" color={palette.ink} size={46} anchor="end" />
						</g>
					)}
				</g>
			) : null}
			{axesShown ? (
				<>
					<Arrow from={ORIGIN} to={AXES.behaviorEnd} color={palette.behavior} testId="behavior-axis" grow={grow} />
					<Arrow from={ORIGIN} to={AXES.structureEnd} color={palette.structure} testId="structure-axis" grow={grow} />
				</>
			) : null}
			{behaviorPop.hidden ? null : (
				<g transform={behaviorPop.transform}>
					<g transform={`rotate(${BEHAVIOR_LABEL_ANGLE} ${behaviorLabel.x} ${behaviorLabel.y})`}>
						<Label x={behaviorLabel.x} y={behaviorLabel.y + 58} text="Behavior" color={palette.behavior} size={46} />
						<Label x={behaviorLabel.x} y={behaviorLabel.y + 90} text="what it does" color={palette.ink} size={26} />
					</g>
				</g>
			)}
			{structurePop.hidden ? null : (
				<g transform={structurePop.transform}>
					<Label x={AXES.structureEnd.x + 30} y={AXES.structureEnd.y + 36} text="Structure" color={palette.structure} size={46} anchor="start" />
					<Label x={AXES.structureEnd.x + 32} y={AXES.structureEnd.y + 68} text="how it's built" color={palette.ink} size={26} anchor="start" />
				</g>
			)}
		</g>
	);
};
