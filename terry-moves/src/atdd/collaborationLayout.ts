import { lerp } from '../storyImpact/motion';
import { CAPTION_BOX, STAGE } from '../storyImpact/layout';
import { SHADOW, STROKE } from './art';
import { CirclePose } from './circleLayout';
import { crew } from './crew';
import { Point, ROUTE_CLEARANCE } from './geometry';
import { LOCAL_CYCLE_RADIUS, PERSON_FOOTPRINT, SHEET_BADGE } from './pieces';

const bounds = (points: Point[]) => ({ left: Math.min(...points.map((p) => p.x)), right: Math.max(...points.map((p) => p.x)), top: Math.min(...points.map((p) => p.y)), bottom: Math.max(...points.map((p) => p.y)) });
const interpolate = (from: Point, to: Point, progress: number) => ({ x: lerp(from.x, to.x, progress), y: lerp(from.y, to.y, progress) });
const stage = (progress: number, from: number, to: number) => Math.max(0, Math.min(1, (progress - from) / (to - from)));

// These are authored lane roles, evaluated against today's drawn owners.
// The finishers rise, cross the sheet gap, rise beside Finished, then join.
export const collaborationPose = (pose: CirclePose) => {
	const all = crew(pose.participants.scales);
	const frontEnd = crew(pose.participants.scales, [0, 1, 2]);
	const { crew: finishers, y: gapY } = pose.finisherReturnLane;
	const [given, selection, , then, finishing, finished] = pose.checkpoints.map((p) => bounds(p.outline));
	const centerX = (finished.right + selection.left) / 2;
	const reunion = { x: finished.right + ROUTE_CLEARANCE + all.width / 2, y: pose.checkpoints[5].y - 30 * pose.checkpoints[5].scale };
	const belowGiven = Math.max(given.bottom, pose.checkpoints[0].origin.y + 184 * pose.checkpoints[0].scale + 24 * 0.35) + ROUTE_CLEARANCE - all.top;
	const belowLoop = (pose.circle.y + then.top) / 2;
	const aboveUpdateBadge = pose.checkpoints[2].badge.y - SHEET_BADGE.radius * pose.checkpoints[2].scale - ROUTE_CLEARANCE - all.bottom;
	const thenBadgeTop = pose.checkpoints[3].badge.y + (SHEET_BADGE.labelBaseline - SHEET_BADGE.labelSize * 1.2) * pose.checkpoints[3].scale;
	const updateBadgeLeft = pose.checkpoints[2].badge.x - (SHEET_BADGE.radius + 1.5) * pose.checkpoints[2].scale;
	const workingLabel = { text: 'Working together', size: 25 };
	const belowCrew = workingLabel.size * 1.2 + ROUTE_CLEARANCE + 2;
	const labelWidth = workingLabel.text.length * workingLabel.size * 0.65;
	const beforeThen = {
		x: Math.min(centerX, updateBadgeLeft - ROUTE_CLEARANCE - all.width / 2),
		y: Math.min(belowLoop, thenBadgeTop - ROUTE_CLEARANCE - all.bottom - belowCrew - workingLabel.size * 0.35),
	};
	const teamSpots = [
		{ x: centerX, y: belowGiven }, { x: centerX, y: pose.circle.y - 45 },
		{ x: centerX, y: aboveUpdateBadge }, beforeThen,
		beforeThen, reunion,
	];
	const teamPosition = (previous: number, current: number, travel: number) => {
		const from = teamSpots[previous];
		const to = teamSpots[current];
		if (current !== 3) return interpolate(from, to, travel);
		const besideBadge = interpolate(from, { x: to.x, y: from.y }, stage(travel, 0, 0.4));
		return interpolate(besideBadge, to, stage(travel, 0.4, 1));
	};
	const teamLabel = (team: Point) => ({ x: Math.min(team.x, updateBadgeLeft - ROUTE_CLEARANCE - labelWidth / 2), y: team.y + all.bottom + belowCrew, size: workingLabel.size, children: workingLabel.text });
	const front = { x: pose.frontEndCycle.x, y: pose.frontEndCycle.y - LOCAL_CYCLE_RADIUS * pose.frontEndCycle.size - ROUTE_CLEARANCE - frontEnd.bottom };
	const finishingBadgeLeft = pose.checkpoints[4].badge.x - (SHEET_BADGE.radius + 1.5) * pose.checkpoints[4].scale;
	const finish = { x: Math.min(finishing.left, finishingBadgeLeft) - ROUTE_CLEARANCE - finishers.width / 2, y: Math.min(pose.checkpoints[4].y - 20 * pose.checkpoints[4].scale, thenBadgeTop - finishers.bottom - ROUTE_CLEARANCE) };
	const besideX = reunion.x + all.people[3].offset - finishers.people[0].offset + ROUTE_CLEARANCE;
	const labels = {
		front: { x: front.x, y: front.y + frontEnd.top - ROUTE_CLEARANCE, size: 26 },
		finish: { x: finish.x, y: finishing.top - ROUTE_CLEARANCE, size: 24 },
	};
	const working = all.people.map(({ id }) => {
		const row = id < 3 ? frontEnd : finishers;
		const owner = id < 3 ? front : finish;
		return { x: owner.x + row.people.find((p) => p.id === id)!.offset, y: owner.y };
	});
	const reunited = all.people.map(({ offset }) => ({ x: reunion.x + offset, y: reunion.y }));
	const person = (id: number, split: number, merge: number) => {
		const together = { x: teamSpots[4].x + all.people[id].offset, y: teamSpots[4].y };
		// Separate vertically before either subgroup crosses the other row.
		const departing = interpolate(together, { x: together.x, y: working[id].y }, stage(split, 0, 0.35));
		const leaving = interpolate(departing, working[id], stage(split, 0.35, 1));
		// The three return first, leaving the sheet gap clear for the finishers.
		if (id < 3) return interpolate(leaving, reunited[id], stage(merge, 0.1, 0.25));
		const offset = finishers.people.find((p) => p.id === id)!.offset;
		const rising = interpolate(leaving, { x: leaving.x, y: gapY }, stage(merge, 0, 0.25));
		const crossing = interpolate(rising, { x: besideX + offset, y: gapY }, stage(merge, 0.25, 0.5));
		const beside = interpolate(crossing, { x: besideX + offset, y: reunion.y }, stage(merge, 0.5, 0.78));
		return interpolate(beside, reunited[id], stage(merge, 0.78, 1));
	};
	// Fit the occupied diamond, rather than magnifying fixed circle coordinates.
	const occupied = pose.checkpoints.slice(3).flatMap((p) => p.outline.flatMap((point) => [point, { x: point.x + SHADOW.x + STROKE.panel, y: point.y + SHADOW.y + STROKE.panel }]));
	pose.checkpoints.slice(3).forEach((p) => {
		const radius = (SHEET_BADGE.radius + 1.5) * p.scale;
		occupied.push({ x: p.badge.x - radius, y: p.badge.y - radius }, { x: p.badge.x + radius, y: p.badge.y + radius });
	});
	working.concat(reunited).forEach((point, index) => {
		const scale = all.people[index % all.people.length].scale;
		occupied.push({ x: point.x + PERSON_FOOTPRINT.left * scale, y: point.y + PERSON_FOOTPRINT.top * scale - 2 }, { x: point.x + PERSON_FOOTPRINT.right * scale, y: point.y + PERSON_FOOTPRINT.bottom * scale + 2 });
	});
	Object.values(labels).forEach((p) => occupied.push({ x: p.x - p.size * 5.6, y: p.y - p.size * 1.2 }, { x: p.x + p.size * 5.6, y: p.y + p.size * 0.35 }));
	const content = bounds(occupied);
	const window = { left: 40, right: STAGE.width - 40, top: 140, bottom: CAPTION_BOX.top - 24 };
	const zoom = Math.min(1.18, (window.right - window.left) / (content.right - content.left), (window.bottom - window.top) / (content.bottom - content.top));
	const contentCenter = { x: (content.left + content.right) / 2, y: (content.top + content.bottom) / 2 };
	const destination = { x: (window.left + window.right) / 2, y: (window.top + window.bottom) / 2 };
	const camera = (focus: number) => `translate(${(destination.x - zoom * contentCenter.x) * focus} ${(destination.y - zoom * contentCenter.y) * focus}) scale(${lerp(1, zoom, focus)})`;
	return { all, teamPosition, teamLabel, labels, person, camera };
};
