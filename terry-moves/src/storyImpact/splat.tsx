import React from 'react';
import { CellPose, palette, seeded, SplatPose } from './scene';
import type { Extent, GridSpot } from './poseTypes';
import { cellCenter } from './cell';
import { BEHAVIOR_STEP, FONT_FAMILY, GRID_MARGIN, HOVER, ORIGIN, Point, scaleAround, smoothBlob, wallPoint } from './layout';

// Paint on the product wall, drawn on top of the cells so it visibly runs
// over their gaps. Pure function of the splat pose.

// Grid units are wider along Structure than along Behavior on screen, so the
// blob is stretched along Behavior to look round.
const COL_STRETCH = 1.2;

// The grid spot `dist` from the splat's center, in the direction `angle`.
const spotAround = (splat: SplatPose, angle: number, dist: number): GridSpot => ({
	col: splat.center.col + Math.cos(angle) * dist * COL_STRETCH,
	row: splat.center.row + Math.sin(angle) * dist,
});

const onWall = (splat: SplatPose, angle: number, dist: number): Point => {
	const { col, row } = spotAround(splat, angle, dist);
	return wallPoint(col, row);
};

const LOBES = 22;

const blobShape = (splat: SplatPose) =>
	Array.from({ length: LOBES }, (_, i) => {
		const angle = (i / LOBES) * Math.PI * 2 + (seeded(splat.seed + i * 3) - 0.5) * 0.25;
		const lobe = i % 2 === 0;
		const dist = splat.radius * (lobe ? 1.1 + 0.3 * seeded(splat.seed + i) : 0.9 + 0.08 * seeded(splat.seed + i));
		return { angle, lobe, point: onWall(splat, angle, dist) };
	});

type Drip = { from: Point; length: number; width: number };
type Drop = { at: Point; r: number };

const dripsOf = (splat: SplatPose): Drip[] =>
	blobShape(splat)
		.filter((p) => p.lobe && Math.sin(p.angle) < -0.2)
		.map((p, i) => ({
			from: { x: p.point.x, y: p.point.y - 14 },
			length: (26 + 40 * seeded(splat.seed + 40 + i)) * splat.drip,
			width: 15 + 6 * seeded(splat.seed + 50 + i),
		}));

// Droplets stay on the wall, off the Structure axis: each is pulled in from
// the wall's edges far enough to lie wholly inside its outline (with its ink
// rim). A step along Behavior moves |BEHAVIOR_STEP.x| px across the edge it
// runs to, and a step along Structure about 77 px.
const DROP_RIM = 5.5;
export const splatDrops = (splat: SplatPose, wall: Extent): Drop[] =>
	Array.from({ length: 9 }, (_, i) => {
		const angle = (i / 9) * Math.PI * 2 + seeded(splat.seed + 60 + i) * 0.5;
		const dist = splat.radius * (1.55 + 0.25 * seeded(splat.seed + 70 + i));
		const r = 6 + 7 * seeded(splat.seed + 80 + i);
		const pad = { col: (r + DROP_RIM) / -BEHAVIOR_STEP.x, row: (r + DROP_RIM) / 77 };
		const spot = spotAround(splat, angle, dist);
		const col = Math.min(spot.col, wall.columns + GRID_MARGIN.col - pad.col);
		const row = Math.max(-GRID_MARGIN.row + pad.row, Math.min(spot.row, wall.rows + GRID_MARGIN.row - pad.row));
		return { at: wallPoint(col, row), r };
	}).filter((drop) => drop.at.x < ORIGIN.x - 24);

const dripPath = ({ from, length, width }: Drip): string => {
	const w = width / 2;
	const end = from.y + length;
	return `M${from.x - w},${from.y} L${from.x - w},${end} A${w},${w} 0 0 0 ${from.x + w},${end} L${from.x + w},${from.y} Z`;
};

const SplatShapes: React.FC<{ splat: SplatPose; wall: Extent; fill: string; grow: number }> = ({ splat, wall, fill, grow }) => {
	const blob = smoothBlob(blobShape(splat).map((p) => p.point));
	return (
		<g fill={fill} stroke={fill} strokeWidth={grow} strokeLinejoin="round">
			<path d={blob} />
			{dripsOf(splat).map((drip, i) => (
				<g key={i}>
					<path d={dripPath(drip)} />
					<circle cx={drip.from.x} cy={drip.from.y + drip.length} r={drip.width * 0.62} />
				</g>
			))}
			{splatDrops(splat, wall).map((drop, i) => (
				<circle key={i} cx={drop.at.x} cy={drop.at.y} r={drop.r} />
			))}
		</g>
	);
};

const Shout: React.FC<{ text: string; color: string; scale?: number }> = ({ text, color, scale }) => {
	const x = HOVER.x + 40;
	const y = HOVER.y - 10;
	const popped = scale === undefined ? '' : ` ${scaleAround({ x, y }, scale, scale)}`;
	return (
		<g data-testid="splat-shout" transform={`rotate(-9 ${x} ${y})${popped}`}>
			<text
				x={x + 7}
				y={y + 7}
				textAnchor="middle"
				fontFamily={FONT_FAMILY}
				fontWeight={900}
				fontSize={110}
				fill={palette.paperShadow}
				stroke={palette.paperShadow}
				strokeWidth={22}
				strokeLinejoin="round"
			>
				{text}
			</text>
			<text
				x={x}
				y={y}
				textAnchor="middle"
				fontFamily={FONT_FAMILY}
				fontWeight={900}
				fontSize={110}
				fill={color}
				stroke={palette.ink}
				strokeWidth={14}
				strokeLinejoin="round"
				paintOrder="stroke"
			>
				{text}
			</text>
		</g>
	);
};

// `wall`: the size of the wall the paint stays on.
export const Splat: React.FC<{ splat: SplatPose; wall: Extent }> = ({ splat, wall }) => {
	const highlight = onWall(splat, 2.3, splat.radius * 0.55);
	return (
		<g data-testid="splat">
			<SplatShapes splat={splat} wall={wall} fill={palette.ink} grow={11} />
			<SplatShapes splat={splat} wall={wall} fill={splat.color} grow={0} />
			<ellipse
				cx={highlight.x}
				cy={highlight.y}
				rx={22}
				ry={12}
				transform={`rotate(-30 ${highlight.x} ${highlight.y})`}
				fill={palette.white}
				opacity={0.7}
			/>
			<circle cx={highlight.x + 30} cy={highlight.y - 10} r={6} fill={palette.white} opacity={0.7} />
			{splat.shout && splat.shoutScale !== 0 ? <Shout text={splat.shout} color={splat.color} scale={splat.shoutScale} /> : null}
		</g>
	);
};

// Little "wobble" marks beside the cells that were knocked the hardest.
export const WobbleMarks: React.FC<{ cells: CellPose[] }> = ({ cells }) => {
	const shaken = [...cells]
		.filter((c) => Math.abs(c.rot) >= 5 && !c.smear)
		.sort((a, b) => Math.abs(b.rot) - Math.abs(a.rot))
		.slice(0, 2);
	return (
		<g data-testid="wobble-marks" fill="none" stroke={palette.ink} strokeWidth={5} strokeLinecap="round">
			{shaken.map((cell) => {
				const { x, y } = cellCenter(cell);
				return (
					<g key={`${cell.col}-${cell.row}`}>
						<path d={`M${x - 44},${y - 22} q-10,22 0,44`} />
						<path d={`M${x - 56},${y - 14} q-7,14 0,28`} />
						<path d={`M${x + 44},${y - 22} q10,22 0,44`} />
						<path d={`M${x + 56},${y - 14} q7,14 0,28`} />
					</g>
				);
			})}
		</g>
	);
};
