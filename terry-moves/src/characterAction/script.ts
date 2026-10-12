import { CharacterDirection } from './direction';

export const filmFormat = { width: 1080, height: 1080, fps: 30 };

// A settled gesture rehearsal. The approach and stepping turn join this script
// in the next story slice; they are deliberately absent from this usable take.
export const greetingDirection: CharacterDirection = {
	asset: 'character-action/RobotExpressive.glb',
	stage: {
		position: [0, 0.035, 0],
		yaw: 0,
		background: '#253842',
		floor: '#617986',
		camera: { position: [7, 5.5, 16], target: [0, 2.3, 0], fov: 32 },
	},
	actions: [
		{ name: 'settled-entry', clip: 'Idle', seconds: 0.8, transitionSeconds: 0, startSeconds: 0, rate: 1, playback: 'hold' },
		{ name: 'greeting', clip: 'Wave', seconds: 2.2, transitionSeconds: 0.3, startSeconds: 0, rate: 1, playback: 'once' },
		{ name: 'settled-exit', clip: 'Idle', seconds: 1, transitionSeconds: 0.35, startSeconds: 0, rate: 1, playback: 'hold' },
	],
};
