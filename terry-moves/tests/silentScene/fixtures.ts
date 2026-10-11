import { engineerRig } from '../../src/aiTestAutomation/actors';
import { Point } from '../../src/aiTestAutomation/motion';
import { ScenePose } from '../../src/silentScene/compileScene';
import { SceneScript } from '../../src/silentScene/script';

// Story example 1 stays independent of changes to the preview's authored script.
export const original = {
	actor: 'Engineer',
	start: 'door',
	places: {
		door: { x: 220, y: 820 },
		desk: { x: 540, y: 820 },
		window: { x: 850, y: 720 },
	},
	props: { wrench: 'held' },
	moves: [
		{ kind: 'travel', to: 'desk', seconds: 1.5 },
		{ kind: 'hop', seconds: 0.6 },
		{ kind: 'travel', to: 'window', seconds: 2 },
	],
} as const satisfies SceneScript;

export const reordered: SceneScript = {
	...original,
	moves: [original.moves[2], original.moves[1], original.moves[0]],
};

// Story 1's authored scene, kept for the cut once the preview's script moved on.
export const withCut = {
	...original,
	moves: [
		{ kind: 'travel', to: 'window', seconds: 2 },
		{ kind: 'hop', seconds: 0.6 },
		{ kind: 'cut', to: 'door' },
		{ kind: 'travel', to: 'desk', seconds: 1.5 },
	],
} as const satisfies SceneScript;

// Prop story example 1 before its put down: the wrench rests on the desk until it is picked up.
export const pickUp = {
	actor: 'Engineer',
	start: 'door',
	places: {
		door: { x: 220, y: 820 },
		desk: { x: 540, y: 820, surface: { x: 620, y: 690 } },
		window: { x: 850, y: 720, surface: { x: 930, y: 590 } },
	},
	props: { wrench: { at: 'desk' } },
	moves: [
		{ kind: 'travel', to: 'desk', seconds: 1.5 },
		{ kind: 'pick up', prop: 'wrench', seconds: 0.8 },
		{ kind: 'travel', to: 'window', seconds: 2 },
		{ kind: 'hop', seconds: 0.6 },
	],
} as const satisfies SceneScript;

// The settled pose of a scene whose wrench starts in hand and is never released.
export const carrying = ({ x, y }: Point): ScenePose => ({ x, y, lift: 0, hand: engineerRig.carryHand, gaze: 0, held: 'wrench', resting: {} });
