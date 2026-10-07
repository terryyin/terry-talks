import { compileScene } from '../../src/silentScene/compileScene';
import { Move, SceneScript, script } from '../../src/silentScene/script';
import { original } from './fixtures';

test('the story\'s last travel to kitchen reports its 1-based move and the named places before a timeline is returned', () => {
	const invalid: SceneScript = {
		...original,
		moves: [original.moves[0], original.moves[1], { kind: 'travel', to: 'kitchen', seconds: 2 }],
	};
	expect(() => compileScene(invalid)).toThrow(new Error('move 3 (travel to kitchen): unknown place "kitchen"; places are door, desk, window'));
});

test('an unknown starting place reports the first move context', () => {
	expect(() => compileScene({ ...original, start: 'kitchen' })).toThrow(new Error('move 1 (travel to desk): unknown place "kitchen"; places are door, desk, window'));
});

test('a cut uses the same named-place rule as travel', () => {
	const invalid: SceneScript = { ...original, moves: [original.moves[0], { kind: 'cut', to: 'kitchen' }] };
	expect(() => compileScene(invalid)).toThrow(new Error('move 2 (cut to kitchen): unknown place "kitchen"; places are door, desk, window'));
});

test.each(['constructor', 'toString'])('inherited place name %s is not a named destination', (to) => {
	const invalid: SceneScript = { ...original, moves: [{ kind: 'travel', to, seconds: 1 }] };
	expect(() => compileScene(invalid)).toThrow(new Error(`move 1 (travel to ${to}): unknown place "${to}"; places are door, desk, window`));
});

test('an own place may share an inherited property name', () => {
	const named: SceneScript = {
		...original,
		places: { ...original.places, toString: { x: 700, y: 650 } },
		moves: [{ kind: 'cut', to: 'toString' }],
	};
	expect(compileScene(named).poseAt(0)).toEqual({ x: 700, y: 650, lift: 0 });
});

test('an unknown actor identifies the first move and supported actor', () => {
	const invalid = { ...original, actor: 'Painter' } as unknown as SceneScript;
	expect(() => compileScene(invalid)).toThrow(new Error('move 1 (travel to desk): unknown actor "Painter"; actors are Engineer'));
});

test('an unknown move kind identifies its position, name and supported kinds', () => {
	const invalid = { ...original, moves: [original.moves[0], { kind: 'dance', seconds: 1 }] } as unknown as SceneScript;
	expect(() => compileScene(invalid)).toThrow(new Error('move 2 (dance): unknown move kind "dance"; kinds are travel, hop, hold, cut'));
});

describe.each(['travel', 'hop', 'hold'] as const)('%s duration validation', (kind) => {
	test.each([0, -0.1, NaN, Infinity, -Infinity])('rejects %s seconds before returning a timeline', (seconds) => {
		const move: Move = kind === 'travel' ? { kind, to: 'window', seconds } : { kind, seconds };
		const invalid: SceneScript = { ...original, moves: [original.moves[0], move] };
		const description = kind === 'travel' ? 'travel to window' : kind;
		expect(() => compileScene(invalid)).toThrow(new Error(`move 2 (${description}): invalid duration ${seconds}; duration must be a finite number greater than 0`));
	});
});

test('the first invalid move is reported when a later move also has a problem', () => {
	const invalid: SceneScript = {
		...original,
		moves: [{ kind: 'hop', seconds: 0 }, { kind: 'travel', to: 'kitchen', seconds: 1 }],
	};
	expect(() => compileScene(invalid)).toThrow(new Error('move 1 (hop): invalid duration 0; duration must be a finite number greater than 0'));
});

test('the actual valid script still compiles at its authored duration and final place', () => {
	const scene = compileScene(script);
	expect(scene.durationInFrames).toBe(124);
	expect(scene.poseAt(scene.durationInFrames - 1)).toEqual({ ...script.places.desk, lift: 0 });
});
