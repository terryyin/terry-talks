import { compileScene } from '../../src/silentScene/compileScene';
import { SceneScript, script } from '../../src/silentScene/script';
import { original, reordered } from './fixtures';

describe.each<[string, SceneScript]>([['original story order', original], ['reordered', reordered]])('%s silent scene', (_order, authored) => {
	const scene = compileScene(authored);

	test('starts at the named start and joins every adjacent move on the next frame', () => {
		expect(scene.poseAt(0)).toEqual({ ...authored.places.door, lift: 0 });
		let nextFrame = 0;
		scene.beats.forEach((current, index) => {
			const range = scene.beatRange(current.name);
			expect(range.from).toBe(nextFrame);
			if (index > 0) expect(scene.poseAt(range.from)).toEqual(scene.poseAt(range.from - 1));
			nextFrame += range.durationInFrames;
		});
		expect(nextFrame).toBe(123);
		expect(scene.durationInFrames).toBe(123);
	});

	test('travels from the previous place to the named target and hops there before settling', () => {
		let previous = authored.places[authored.start];
		authored.moves.forEach((move, index) => {
			const { from, durationInFrames } = scene.beatRange(scene.beats[index].name);
			const first = scene.poseAt(from);
			const middle = scene.poseAt(from + Math.floor(durationInFrames / 2));
			const last = scene.poseAt(from + durationInFrames - 1);
			expect(first).toEqual({ ...previous, lift: 0 });
			if (move.kind === 'travel') {
				const target = authored.places[move.to];
				expect(last).toEqual({ ...target, lift: 0 });
				expect(middle).not.toEqual(first);
				expect(middle).not.toEqual(last);
				previous = target;
			} else {
				expect(last).toEqual(first);
				expect({ x: middle.x, y: middle.y }).toEqual(previous);
				expect(middle.lift).toBeGreaterThan(0);
			}
		});
	});

	test('has no authored caption placeholders or timeline caption line', () => {
		authored.moves.forEach((move) => expect(move).not.toHaveProperty('caption'));
		scene.beats.forEach((current) => expect(current.caption).toBeUndefined());
		for (let frame = 0; frame < scene.durationInFrames; frame++) expect(scene.captionAt(frame)).toBe('');
	});
});

test('the authored cut jumps from window to door for one frame, then travel begins there and ends at desk', () => {
	const scene = compileScene(script);
	const cut = scene.beatRange('3 cut to door');
	expect(scene.durationInFrames).toBe(124);
	expect(scene.beats.map((current) => scene.beatRange(current.name))).toEqual([
		{ from: 0, durationInFrames: 60 },
		{ from: 60, durationInFrames: 18 },
		{ from: 78, durationInFrames: 1 },
		{ from: 79, durationInFrames: 45 },
	]);
	expect(scene.poseAt(cut.from - 1)).toEqual({ ...script.places.window, lift: 0 });
	expect(scene.poseAt(cut.from)).toEqual({ ...script.places.door, lift: 0 });
	expect(scene.poseAt(cut.from + 1)).toEqual({ ...script.places.door, lift: 0 });
	expect(scene.poseAt(scene.durationInFrames - 1)).toEqual({ ...script.places.desk, lift: 0 });
	expect(script.moves[2]).not.toHaveProperty('seconds');
	for (let frame = 0; frame < scene.durationInFrames; frame++) expect(scene.captionAt(frame)).toBe('');
});

test('a hold keeps every frame at the previous move end, including after reordering', () => {
	const withHold: SceneScript = { ...reordered, moves: [...reordered.moves, { kind: 'hold', seconds: 0.8 }] };
	const scene = compileScene(withHold);
	const hold = scene.beatRange(scene.beats[3].name);
	expect(hold).toEqual({ from: 123, durationInFrames: 24 });
	for (let frame = hold.from; frame < scene.durationInFrames; frame++) {
		expect(scene.poseAt(frame)).toEqual({ ...reordered.places.desk, lift: 0 });
		expect(scene.poseAt(frame)).toEqual(scene.poseAt(hold.from - 1));
	}
});

test.each([0.001, 1 / 30])('tiny positive moves (%s seconds) retain finite endpoints and adjacent joins', (seconds) => {
	const tiny: SceneScript = {
		...original,
		moves: [
			{ kind: 'travel', to: 'desk', seconds },
			{ kind: 'hop', seconds },
			{ kind: 'hold', seconds },
			{ kind: 'travel', to: 'window', seconds },
		],
	};
	const scene = compileScene(tiny);
	expect(scene.durationInFrames).toBe(8);
	expect(scene.beats.map((current) => scene.beatRange(current.name))).toEqual([
		{ from: 0, durationInFrames: 2 },
		{ from: 2, durationInFrames: 3 },
		{ from: 5, durationInFrames: 1 },
		{ from: 6, durationInFrames: 2 },
	]);
	for (let frame = 0; frame < scene.durationInFrames; frame++) {
		Object.values(scene.poseAt(frame)).forEach((value) => expect(Number.isFinite(value)).toBe(true));
	}
	expect(scene.poseAt(0)).toEqual({ ...tiny.places.door, lift: 0 });
	expect(scene.poseAt(1)).toEqual({ ...tiny.places.desk, lift: 0 });
	[2, 5, 6].forEach((from) => expect(scene.poseAt(from)).toEqual(scene.poseAt(from - 1)));
	expect(scene.poseAt(2).lift).toBe(0);
	expect(scene.poseAt(3).lift).toBeGreaterThan(0);
	expect(scene.poseAt(4).lift).toBe(0);
	expect(scene.poseAt(7)).toEqual({ ...tiny.places.window, lift: 0 });
});
