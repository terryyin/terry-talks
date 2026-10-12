import { timeline } from '../beatTimeline';

export type Vector = [number, number, number];
export type CameraDirection = { position: Vector; target: Vector; fov: number };
export type Lighting = { ambient: number; key: number; rim: number; passage: number };
export type PiecePose = { position: Vector; yaw: number };
export type ShotPose = { camera: CameraDirection; lights: Lighting; pieces: Record<string, PiecePose> };
export type Material = { color: string; roughness: number; metalness: number; emissive?: string; emissiveIntensity?: number };
export type StageObject = { name: string; position: Vector; size: Vector; material: string; bevel: number };
export type WorkPiece = { name: string; start: string; size: Vector; material: string; bevel: number; yaw: number };
export type Direction = {
	marks: Record<string, Vector>;
	materials: Record<string, Material>;
	stage: StageObject[];
	pieces: WorkPiece[];
	background: string;
	lightPositions: { key: Vector; rim: Vector; passage: Vector };
	lightColors: { key: string; rim: string; passage: string };
	start: { camera: CameraDirection; lights: Lighting };
	cues: {
		name: string;
		seconds: number;
		camera?: CameraDirection;
		lights?: Lighting;
		moves?: Record<string, { mark: string; yaw?: number }>;
	}[];
};

const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const vector = (a: Vector, b: Vector, t: number): Vector => [mix(a[0], b[0], t), mix(a[1], b[1], t), mix(a[2], b[2], t)];

// Endpoints are resolved once from the authored cue sheet. Every requested
// frame samples those endpoints directly; no previous rendered frame is needed.
export const compileDirection = (direction: Direction, fps: number) => {
	let previous: ShotPose = {
		...direction.start,
		pieces: Object.fromEntries(direction.pieces.map((piece) => [piece.name, { position: direction.marks[piece.start], yaw: piece.yaw }])),
	};
	return timeline(direction.cues.map((cue) => {
		const start = previous;
		const end: ShotPose = {
			camera: cue.camera ?? start.camera,
			lights: cue.lights ?? start.lights,
			pieces: Object.fromEntries(direction.pieces.map((piece) => {
				const move = cue.moves?.[piece.name];
				return [piece.name, move ? { position: direction.marks[move.mark], yaw: move.yaw ?? start.pieces[piece.name].yaw } : start.pieces[piece.name]];
			})),
		};
		previous = end;
		return {
			name: cue.name,
			seconds: cue.seconds,
			pose: (progress: number): ShotPose => {
				if (progress <= 0) return start;
				if (progress >= 1) return end;
				const t = progress * progress * (3 - 2 * progress);
				return {
					camera: { position: vector(start.camera.position, end.camera.position, t), target: vector(start.camera.target, end.camera.target, t), fov: mix(start.camera.fov, end.camera.fov, t) },
					lights: { ambient: mix(start.lights.ambient, end.lights.ambient, t), key: mix(start.lights.key, end.lights.key, t), rim: mix(start.lights.rim, end.lights.rim, t), passage: mix(start.lights.passage, end.lights.passage, t) },
					pieces: Object.fromEntries(direction.pieces.map((piece) => [piece.name, { position: vector(start.pieces[piece.name].position, end.pieces[piece.name].position, t), yaw: mix(start.pieces[piece.name].yaw, end.pieces[piece.name].yaw, t) }])),
				};
			},
		};
	}), fps);
};
