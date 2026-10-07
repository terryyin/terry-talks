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
