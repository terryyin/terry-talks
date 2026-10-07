import { LOCAL_CYCLE_RADIUS, SHEET_BADGE, SHEET_BODY, SheetDirection, sheetPoints } from './pieces';
import { clearOf, pointOnOutline, Point, ROUTE_CLEARANCE } from './geometry';
import { lerp } from '../storyImpact/motion';
import { ATDDStaging, CircleStep } from './staging';

type Checkpoint = Point & { id: CircleStep; direction: SheetDirection; numberSide: 'left' | 'right'; angle: number; from: number; scale: number; origin: Point; outline: Point[]; badge: Point };
export type CirclePose = ReturnType<typeof circlePose>;
const steps: { id: CircleStep; direction: SheetDirection; from: number }[] = [
	{ id: 'given', direction: 'right', from: 3 },
	{ id: 'selection', direction: 'down', from: 4 },
	{ id: 'update', direction: 'left', from: 5 },
	{ id: 'then', direction: 'left', from: 8 },
	{ id: 'finishing', direction: 'up', from: 9 },
	{ id: 'finished', direction: 'up', from: 10 },
];
const radians = (angle: number) => angle * Math.PI / 180;
const pointAt = (circle: ATDDStaging['circle'], angle: number): Point => ({
	x: circle.x + circle.radius * Math.cos(radians(angle)),
	y: circle.y + circle.radius * Math.sin(radians(angle)),
});
const coordinate = (p: Point) => `${p.x.toFixed(2)} ${p.y.toFixed(2)}`;

// Evaluate from the selected authored scene, never from a prior rendered frame.
export const circlePose = (staging: ATDDStaging) => {
	const circle = staging.circle;
	const checkpoints: Checkpoint[] = steps.map((step) => {
		const { angle, scale: relativeScale } = circle.sheets[step.id];
		const center = pointAt(circle, angle);
		const scale = circle.sheetScale * relativeScale;
		const origin = { x: center.x - SHEET_BODY.width / 2 * scale, y: center.y - SHEET_BODY.height / 2 * scale };
		const outline = sheetPoints(step.direction).map((p) => ({ x: origin.x + p.x * scale, y: origin.y + p.y * scale }));
		const numberSide = step.id === 'selection' ? 'right' : 'left';
		const badge = { x: origin.x + (SHEET_BADGE.x + (numberSide === 'right' ? SHEET_BADGE.rightOffset : 0)) * scale, y: origin.y + SHEET_BADGE.y * scale };
		return { ...step, ...center, numberSide, angle, scale, origin, outline, badge };
	});
	return {
		circle, checkpoints,
		frontEndCycle: { x: circle.x, y: circle.y, size: 0.82 },
		localCycle: { x: circle.x + staging.localLoop.offset.x, y: circle.y + staging.localLoop.offset.y, size: staging.localLoop.size },
	};
};
const clearOfSheet = (p: Point, node: Checkpoint) => clearOf(p, node.outline) && Math.hypot(p.x - node.badge.x, p.y - node.badge.y) >= SHEET_BADGE.radius * node.scale + ROUTE_CLEARANCE;

// Every main edge follows the authored circumference. The drawn outline and
// its number reservation trim the endpoints, including after a size change.
export const circleArc = (pose: CirclePose, index: number) => {
	const { circle, checkpoints } = pose;
	const source = checkpoints[index];
	const target = checkpoints[(index + 1) % checkpoints.length];
	const startAngle = source.angle;
	const endAngle = target.angle <= startAngle ? target.angle + 360 : target.angle;
	let start = startAngle;
	let end = endAngle;
	while (start < endAngle && !clearOfSheet(pointAt(circle, start), source)) start += 0.25;
	while (end > startAngle && !clearOfSheet(pointAt(circle, end), target)) end -= 0.25;
	return `M${coordinate(pointAt(circle, start))} A${circle.radius} ${circle.radius} 0 ${end - start > 180 ? 1 : 0} 1 ${coordinate(pointAt(circle, end))}`;
};
const betweenPoints = (from: Point, to: Point, t: number) => ({ x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t });
export const forkToCycle = (pose: CirclePose) => {
	const { checkpoints, frontEndCycle } = pose;
	const source = checkpoints[3];
	let t = 0;
	while (t < 1 && !clearOfSheet(betweenPoints(source, frontEndCycle, t), source)) t += 0.002;
	const start = betweenPoints(source, frontEndCycle, t);
	return `M${coordinate(start)} L${frontEndCycle.x} ${frontEndCycle.y + LOCAL_CYCLE_RADIUS * frontEndCycle.size + ROUTE_CLEARANCE}`;
};
export const cycleToMerge = (pose: CirclePose) => {
	const { checkpoints, frontEndCycle } = pose;
	const target = checkpoints[5];
	const length = Math.hypot(target.x - frontEndCycle.x, target.y - frontEndCycle.y);
	const start = betweenPoints(frontEndCycle, target, (LOCAL_CYCLE_RADIUS * frontEndCycle.size + ROUTE_CLEARANCE) / length);
	let t = 1;
	while (t > 0 && !clearOfSheet(betweenPoints(frontEndCycle, target, t), target)) t -= 0.002;
	return `M${coordinate(start)} L${coordinate(betweenPoints(frontEndCycle, target, t))}`;
};

// These are authored route roles: backlog enters the first sheet, and Update
// leaves for local work then returns to its lower right edge.
export const backlogPose = (backlog: Point, compact: number) => {
	const compactWidth = 96;
	const width = lerp(188, compactWidth, compact);
	const outline = { x: 49, y: lerp(231, 184, compact), width, height: lerp(608, 337, compact) };
	const rows = [0, 1, 2, 3, 4].map((i) => ({
		x: lerp(72, 58, compact), y: lerp(250 + i * 111, 200 + i * 62, compact),
		width: lerp(142, 78, compact), height: lerp(91, 50, compact),
	}));
	const last = rows[rows.length - 1];
	const bottom = outline.y + outline.height;
	const labelSpace = bottom - last.y - last.height;
	// Reserve the measured "Waiting scenarios" typography in the current lower
	// strip: room above/below the glyphs and inside both panel strokes.
	const labelAscent = 1.2;
	const labelDescent = 0.35;
	const labelSize = Math.min(21, (labelSpace - 12) / (labelAscent + labelDescent), (outline.width - 16) / 8.4);
	const labelBaseline = last.y + last.height + (labelSpace + labelSize * (labelAscent - labelDescent)) / 2;
	return {
		offset: { x: backlog.x - 49, y: backlog.y - 231 },
		outline, rows,
		waitingLabel: { x: outline.x + outline.width / 2, y: labelBaseline, size: labelSize },
		entry: { x: backlog.x + width + 10, y: backlog.y - 11 },
		nextEntry: { x: backlog.x + compactWidth + 10, y: backlog.y + 55 },
	};
};
export type BacklogPose = ReturnType<typeof backlogPose>;
export const backlogEntry = (pose: CirclePose, backlog: BacklogPose, next = false) => {
	const start = next ? backlog.nextEntry : backlog.entry;
	const target = pose.checkpoints[0];
	const end = pointOnOutline(target.outline, { x: target.x, y: target.y - 36 * target.scale }, { x: -1, y: 0 });
	return next
		? `M${coordinate(start)} Q${(start.x + end.x) / 2} ${Math.min(start.y, end.y) - 40} ${coordinate(end)}`
		: `M${coordinate(start)} C${start.x + 23} ${start.y} ${end.x - 163} ${end.y - 17} ${coordinate(end)}`;
};
export const localLoopRoutes = (pose: CirclePose) => {
	const node = pose.checkpoints[2];
	const loop = pose.localCycle;
	const attach = (y: number) => pointOnOutline(node.outline, { x: node.x, y: node.y + y * SHEET_BODY.height * node.scale }, { x: 1, y: 0 });
	const cyclePort = (angle: number) => ({ x: loop.x + (LOCAL_CYCLE_RADIUS * loop.size + ROUTE_CLEARANCE) * Math.cos(radians(angle)), y: loop.y + (LOCAL_CYCLE_RADIUS * loop.size + ROUTE_CLEARANCE) * Math.sin(radians(angle)) });
	const out = attach(0.1);
	const enter = cyclePort(-64);
	const leave = cyclePort(-160);
	const back = attach(0.35);
	return {
		out: `M${coordinate(out)} C${out.x + 43} ${out.y + 14} ${loop.x + 52} ${loop.y - 106} ${coordinate(enter)}`,
		back: `M${coordinate(leave)} C${leave.x + 20} ${leave.y - 24} ${back.x + 28} ${back.y + 28} ${coordinate(back)}`,
	};
};
