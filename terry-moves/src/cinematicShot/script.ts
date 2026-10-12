import { Direction, StageObject, WorkPiece } from './direction';

export const shotFormat = { fps: 30, width: 1080, height: 1080 };

const work = (name: string, start: string, yaw = 0): WorkPiece => ({ name, start, yaw, size: [0.8, 0.62, 0.8], material: 'work', bevel: 0.075 });
const box = (name: string, position: [number, number, number], size: [number, number, number], material: string, bevel = 0.035): StageObject => ({ name, position, size, material, bevel });

// The cue sheet is the editable direction. Marks describe the stage in meters;
// cues author camera/light endpoints and the pieces that move to a new mark.
export const originalDirection: Direction = {
	background: '#09121c',
	materials: {
		platform: { color: '#263747', roughness: 0.62, metalness: 0.35 },
		wall: { color: '#526e82', roughness: 0.48, metalness: 0.4 },
		work: { color: '#e6a33d', roughness: 0.28, metalness: 0.48 },
		rail: { color: '#738b96', roughness: 0.3, metalness: 0.65 },
		line: { color: '#b97732', roughness: 0.5, metalness: 0.15, emissive: '#c66b1d', emissiveIntensity: 0.24 },
		threshold: { color: '#a6f0ed', roughness: 0.32, metalness: 0.15, emissive: '#47d9d7', emissiveIntensity: 1.1 },
	},
	marks: {
		activeStart: [-3.4, 0.43, 0],
		activeWaiting: [-1.25, 0.43, 0],
		activeThrough: [3.55, 0.43, 0],
		centerRear: [-4.7, 0.43, 0],
		centerTail: [-5.8, 0.43, 0],
		northFront: [-1.35, 0.43, -1.5],
		northMiddle: [-2.55, 0.43, -1.5],
		northRear: [-3.75, 0.43, -1.5],
		northTail: [-4.95, 0.43, -1.5],
		southFront: [-1.35, 0.43, 1.5],
		southMiddle: [-2.55, 0.43, 1.5],
		southRear: [-3.75, 0.43, 1.5],
		southTail: [-4.95, 0.43, 1.5],
	},
	stage: [
		box('platform', [0, -0.12, 0], [13.5, 0.3, 7.2], 'platform', 0.12),
		box('north wall', [0.65, 0.9, -2.1], [0.52, 1.72, 2.88], 'wall', 0.055),
		box('south wall', [0.65, 0.9, 2.1], [0.52, 1.72, 2.88], 'wall', 0.055),
		box('lintel', [0.65, 1.64, 0], [0.52, 0.25, 1.36], 'wall'),
		box('threshold', [0.65, 0.053, 0], [0.56, 0.055, 1.22], 'threshold', 0.012),
		box('north opening light', [0.367, 0.8, -0.64], [0.035, 1.45, 0.035], 'threshold', 0.01),
		box('south opening light', [0.367, 0.8, 0.64], [0.035, 1.45, 0.035], 'threshold', 0.01),
		...[-2.25, -0.75, 0.75, 2.25].map((z, i) => box(`feed line ${i}`, [-3.15, 0.044, z], [6.3, 0.025, 0.028], 'line', 0.008)),
		...[-0.75, 0.75].map((z, i) => box(`exit rail ${i}`, [3.9, 0.1, z], [5.05, 0.12, 0.06], 'rail', 0.025)),
		box('front edge', [0, -0.07, 3.57], [12.6, 0.075, 0.06], 'rail', 0.025),
	],
	pieces: [
		work('active', 'activeStart'), work('center rear', 'centerRear'), work('center tail', 'centerTail'),
		work('north front', 'northFront'), work('north middle', 'northMiddle', -0.025), work('north rear', 'northRear', 0.025), work('north tail', 'northTail'),
		work('south front', 'southFront'), work('south middle', 'southMiddle', 0.025), work('south rear', 'southRear', -0.025), work('south tail', 'southTail'),
	],
	lightPositions: { key: [-3, 7, 5], rim: [3, 5, -4], passage: [1.7, 2.4, 0] },
	lightColors: { key: '#ffdeab', rim: '#a8d8ff', passage: '#6cf2e8' },
	start: {
		camera: { position: [-5.05, 2.65, 4.65], target: [-3.25, 0.43, 0.25], fov: 40 },
		lights: { ambient: 0.42, key: 3.4, rim: 2.1, passage: 9 },
	},
	cues: [
		{ name: 'local activity', seconds: 2.5, moves: { active: { mark: 'activeWaiting' } } },
		{
			name: 'reveal the constraint', seconds: 5.5,
			camera: { position: [-8.6, 9.6, 12.4], target: [-0.3, 0.2, 0], fov: 42 },
			lights: { ambient: 0.5, key: 3.1, rim: 2.8, passage: 11 },
			moves: { active: { mark: 'activeThrough' } },
		},
		{ name: 'read the queue', seconds: 4 },
	],
};
