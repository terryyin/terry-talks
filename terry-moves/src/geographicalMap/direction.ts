import { Easing, interpolate } from 'remotion';
import { beat, timeline, Timeline } from '../beatTimeline';

export type MapPoint = { x: number; y: number };
export type MapCamera = { center: MapPoint; scale: number };
export type MapPlace = { id: string; name: string; position: MapPoint; labelOffset: MapPoint };
export type MapRoute = {
	id: string;
	name: string;
	points: MapPoint[];
	color: string;
	labelPosition: MapPoint;
	labelOffset: MapPoint;
	waypoints?: MapPoint[];
};
export type MapGeography = {
	land: MapPoint[];
	coastline: MapPoint[];
	places: MapPlace[];
	routes: MapRoute[];
	water: { name: string; labelPosition: MapPoint };
};
export type RouteState = { progress: number; opacity: number };
export type MapFrame = { camera: MapCamera; routes: Record<string, RouteState>; waterLabelOpacity?: number };
export type MapCopy = { eyebrow: string; headline: string[]; supporting?: string[]; footer: string };
export type MapCue = {
	id: string;
	moveSeconds: number;
	holdSeconds: number;
	from: MapFrame;
	to: MapFrame;
	copy: MapCopy;
};
export type MapDirection = { geography: MapGeography; cues: MapCue[] };
export type MapPose = MapFrame & { cue: string; copy: MapCopy };

const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const pointBetween = (a: MapPoint, b: MapPoint, t: number): MapPoint => ({ x: mix(a.x, b.x, t), y: mix(a.y, b.y, t) });

// Direction is sampled by the existing beat clock; there is no mutable camera
// or route-animation clock to replay when seeking into the middle of a shot.
export const mapTimeline = (direction: MapDirection, fps: number): Timeline<MapPose> => timeline(
	direction.cues.map((cue) => beat(cue.id, cue.moveSeconds + cue.holdSeconds, undefined, (seconds) => {
		const t = cue.moveSeconds === 0 ? 1 : interpolate(seconds, [0, cue.moveSeconds], [0, 1], {
			extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.45, 0, 0.2, 1),
		});
		const routes = Object.fromEntries([...new Set([...Object.keys(cue.from.routes), ...Object.keys(cue.to.routes)])].map((id) => {
			const from = cue.from.routes[id] ?? { progress: 0, opacity: 0 };
			const to = cue.to.routes[id] ?? { progress: 0, opacity: 0 };
			return [id, { progress: mix(from.progress, to.progress, t), opacity: mix(from.opacity, to.opacity, t) }];
		}));
		return {
			cue: cue.id, copy: cue.copy, routes,
			waterLabelOpacity: mix(cue.from.waterLabelOpacity ?? 1, cue.to.waterLabelOpacity ?? 1, t),
			camera: { center: pointBetween(cue.from.camera.center, cue.to.camera.center, t), scale: mix(cue.from.camera.scale, cue.to.camera.scale, t) },
		};
	}, fps)), fps,
);

// Map geometry lives in one local coordinate system. Labels use the resulting
// screen positions but remain outside this scaled SVG group.
export const mapScreenOrigin: MapPoint = { x: 540, y: 635 };

export const projectMapPoint = (point: MapPoint, camera: MapCamera): MapPoint => ({
	x: mapScreenOrigin.x + (point.x - camera.center.x) * camera.scale,
	y: mapScreenOrigin.y + (point.y - camera.center.y) * camera.scale,
});

export const mapPath = (points: MapPoint[], closed = false) => points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ') + (closed ? ' Z' : '');
