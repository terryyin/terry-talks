import type { Point } from '../aiTestAutomation/motion';

export type Move =
	| { kind: 'travel'; to: string; seconds: number }
	| { kind: 'hop'; seconds: number }
	| { kind: 'hold'; seconds: number }
	| { kind: 'cut'; to: string }
	| { kind: 'pick up'; prop: string; seconds: number }
	| { kind: 'put down'; prop: string; seconds: number };

// A place is where the actor stands; its surface is where a prop rests.
export type Place = Point & { surface?: Point };
export type PropStart = 'held' | { at: string };

export type SceneScript = {
	actor: 'Engineer';
	start: string;
	places: Readonly<Record<string, Place>>;
	props: Readonly<Record<string, PropStart>>;
	moves: readonly Move[];
};

// Direct the scene by rearranging this list; start times and joins are derived.
export const script = {
	actor: 'Engineer',
	start: 'door',
	places: {
		door: { x: 220, y: 820 },
		desk: { x: 540, y: 820, surface: { x: 660, y: 690 } },
		window: { x: 850, y: 720, surface: { x: 970, y: 590 } },
	},
	props: { wrench: { at: 'desk' } },
	moves: [
		{ kind: 'travel', to: 'desk', seconds: 1.5 },
		{ kind: 'pick up', prop: 'wrench', seconds: 0.8 },
		{ kind: 'travel', to: 'window', seconds: 2 },
		{ kind: 'put down', prop: 'wrench', seconds: 0.8 },
		{ kind: 'hop', seconds: 0.6 },
	],
} as const satisfies SceneScript;
