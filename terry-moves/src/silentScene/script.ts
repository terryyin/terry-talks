import type { Point } from '../aiTestAutomation/motion';

export type Move =
	| { kind: 'travel'; to: string; seconds: number }
	| { kind: 'hop'; seconds: number }
	| { kind: 'hold'; seconds: number };

export type SceneScript = {
	actor: 'Engineer';
	start: string;
	places: Readonly<Record<string, Point>>;
	moves: readonly Move[];
};

// Direct the scene by rearranging this list; start times and joins are derived.
export const script = {
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
