import { CharacterDirection, ClipCue } from './direction';

export const filmFormat = { width: 1080, height: 1080, fps: 30 };

// Author a gesture's clip and complete duration here. Both saved takes use the
// same approach, turn, joins and stage; no component owns gesture choreography.
export const directGreeting = (gesture: Pick<ClipCue, 'clip' | 'seconds'>): CharacterDirection => ({
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
		{ name: 'greeting', transitionSeconds: 0.3, startSeconds: 0, rate: 1, playback: 'once', ...gesture },
		{ name: 'settled-exit', clip: 'Idle', seconds: 1, transitionSeconds: 0.35, startSeconds: 0, rate: 1, playback: 'hold' },
	],
});

// Each duration includes the saved clip's full performance and a short hold.
export const greetingDirection = directGreeting({ clip: 'Wave', seconds: 2.2 });
export const thumbsUpDirection = directGreeting({ clip: 'ThumbsUp', seconds: 1.9 });
export const greetingDirections = { original: greetingDirection, 'thumbs-up': thumbsUpDirection };
export type GreetingTake = keyof typeof greetingDirections;
export const selectedTake: GreetingTake = 'original';
