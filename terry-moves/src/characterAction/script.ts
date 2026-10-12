import { CharacterDirection } from './direction';

export const filmFormat = { width: 1080, height: 1080, fps: 30 };

// One ordered direction owns clip phase/rate, stepping turn, settles and staging.
export const greetingDirection: CharacterDirection = {
	asset: 'character-action/RobotExpressive.glb',
	stage: {
		position: [-5.4, 0.01, -2.2],
		yaw: Math.PI / 2,
		background: '#20333e',
		floor: '#354d5b',
		camera: { position: [5.5, 6, 19.3], target: [-2.5, 2.1, 0.3], fov: 33 },
	},
	actions: [
		{ name: 'approach', clip: 'Walking', seconds: 2.8, transitionSeconds: 0, startSeconds: 0, rate: 0.9, playback: 'loop', turn: { startSeconds: 1, seconds: 1.1, toYaw: 0 } },
		{ name: 'settle', clip: 'Idle', seconds: 0.6, transitionSeconds: 0.5, startSeconds: 0, rate: 1, playback: 'hold' },
		{ name: 'regard', clip: 'Idle', seconds: 0.5, transitionSeconds: 0, startSeconds: 0, rate: 1, playback: 'hold' },
		{ name: 'greeting', clip: 'Wave', seconds: 2.2, transitionSeconds: 0.3, startSeconds: 0, rate: 1, playback: 'once' },
		{ name: 'settled-exit', clip: 'Idle', seconds: 1, transitionSeconds: 0.35, startSeconds: 0, rate: 1, playback: 'hold' },
	],
};
