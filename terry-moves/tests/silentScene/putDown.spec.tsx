import { engineerRig } from '../../src/aiTestAutomation/actors';
import { compileScene } from '../../src/silentScene/compileScene';
import { SceneScript, script } from '../../src/silentScene/script';
import { hopWhileCarrying, putDown } from './fixtures';
import { expectCarriedWrench, expectWrenchRestingAt, firstMiddleLast, picture } from './picture';

describe('putting the wrench down on the window surface', () => {
	const scene = compileScene(putDown);
	const { window } = putDown.places;
	const putDownRange = scene.beatRange('4 put down wrench');
	const [, contact, last] = firstMiddleLast(putDownRange);
	const hop = scene.beatRange('5 hop');

	test('each move begins the frame after the previous one ends, in the same whole pose', () => {
		expect(scene.beats.map((current) => scene.beatRange(current.name))).toEqual([
			{ from: 0, durationInFrames: 45 },
			{ from: 45, durationInFrames: 24 },
			{ from: 69, durationInFrames: 60 },
			{ from: 129, durationInFrames: 24 },
			{ from: 153, durationInFrames: 18 },
		]);
		expect(scene.durationInFrames).toBe(171);
		[45, 69, 129, 153].forEach((from) => expect(scene.poseAt(from)).toEqual(scene.poseAt(from - 1)));
	});

	test('the wrench is in the real hand on every frame from the pick up contact until the release', () => {
		const pickUpRange = scene.beatRange('2 pick up wrench');
		for (let frame = firstMiddleLast(pickUpRange)[1]; frame < contact; frame++) expectCarriedWrench(scene.poseAt(frame), putDown.places);
	});

	test('the Engineer stands still at the window through the put down', () => {
		for (let frame = putDownRange.from; frame <= last; frame++) {
			expect(picture(scene.poseAt(frame), putDown.places).actor).toEqual({ x: window.x, y: window.y });
		}
	});

	test('the put down begins from the carry position looking ahead, and the lowering hand looks toward the wrench', () => {
		const first = expectCarriedWrench(scene.poseAt(putDownRange.from), putDown.places);
		expect(first.hand).toEqual(engineerRig.carryHand);
		expect(first.gaze).toBe(0);
		const lowering = expectCarriedWrench(scene.poseAt(putDownRange.from + 6), putDown.places);
		expect(lowering.worldHand.y).toBeGreaterThan(window.y + engineerRig.carryHand.y);
		expect(lowering.worldHand.y).toBeLessThan(window.surface.y);
		expect(lowering.gaze).toBeGreaterThan(0);
	});

	test('on the middle frame the real hand is at the surface grip, the wrench is released there, and the gaze is toward it', () => {
		const drawn = expectWrenchRestingAt(window.surface, scene.poseAt(contact), putDown.places);
		expect(drawn.worldHand.x).toBeCloseTo(window.surface.x, 8);
		expect(drawn.worldHand.y).toBeCloseTo(window.surface.y, 8);
		expect(drawn.gaze).toBeGreaterThan(0);
	});

	test('on the first frame after release the hand is returning to rest and the wrench is on the window surface', () => {
		const drawn = expectWrenchRestingAt(window.surface, scene.poseAt(contact + 1), putDown.places);
		expect(drawn.worldHand.x).toBeLessThan(window.surface.x);
		expect(drawn.worldHand.x).toBeGreaterThan(window.x + engineerRig.restRightHand.x);
		expect(drawn.worldHand.y).toBeLessThan(window.surface.y);
		expect(drawn.worldHand.y).toBeGreaterThan(window.y + engineerRig.restRightHand.y);
		expect(drawn.gaze).toBeGreaterThan(0);
	});

	test('the put down settles the hand at rest, looking ahead again', () => {
		const drawn = expectWrenchRestingAt(window.surface, scene.poseAt(last), putDown.places);
		expect(drawn.hand).toEqual(engineerRig.restRightHand);
		expect(drawn.gaze).toBe(0);
	});

	test('the hop happens with an empty resting hand while the wrench stays on the window surface', () => {
		for (let frame = contact; frame < scene.durationInFrames; frame++) {
			const drawn = expectWrenchRestingAt(window.surface, scene.poseAt(frame), putDown.places);
			if (frame >= last) expect(drawn.hand).toEqual(engineerRig.restRightHand);
		}
		expect(picture(scene.poseAt(firstMiddleLast(hop)[1]), putDown.places).actor.y).toBeLessThan(window.y);
		expect(picture(scene.poseAt(scene.durationInFrames - 1), putDown.places).actor).toEqual({ x: window.x, y: window.y });
	});

	test('a put down behind the Engineer turns the gaze the other way', () => {
		const behind: SceneScript = { ...putDown, places: { ...putDown.places, window: { ...window, surface: { x: 810, y: 590 } } } };
		expect(picture(compileScene(behind).poseAt(contact), behind.places).gaze).toBeLessThan(0);
	});

});

describe('the hop moved between the pick up and the travel to the window', () => {
	const scene = compileScene(hopWhileCarrying);
	const example = compileScene(putDown);
	const { desk, window } = hopWhileCarrying.places;
	const hop = scene.beatRange('3 hop');

	test('only the hop changed position in the script and the scene length is unchanged', () => {
		expect([0, 1, 3, 4, 2].map((index) => hopWhileCarrying.moves[index])).toEqual(putDown.moves.map((move) => move));
		expect(scene.durationInFrames).toBe(171);
		expect(hop).toEqual({ from: 69, durationInFrames: 18 });
	});

	test('the Engineer hops at the desk and the carried wrench follows the lifted hand on every frame', () => {
		for (let frame = hop.from; frame < hop.from + hop.durationInFrames; frame++) {
			const drawn = expectCarriedWrench(scene.poseAt(frame), hopWhileCarrying.places);
			expect(drawn.actor.x).toBe(desk.x);
			expect(drawn.hand).toEqual(engineerRig.carryHand);
		}
		const lifted = expectCarriedWrench(scene.poseAt(firstMiddleLast(hop)[1]), hopWhileCarrying.places);
		expect(lifted.actor.y).toBeLessThan(desk.y);
		expect(lifted.carried[0].y).toBeLessThan(desk.y + engineerRig.carryHand.y);
	});

	test.each([['4 travel to window', '3 travel to window'], ['5 put down wrench', '4 put down wrench']])('%s plays exactly as %s does in the example order', (name, exampleName) => {
		const range = scene.beatRange(name);
		const exampleRange = example.beatRange(exampleName);
		expect(range.durationInFrames).toBe(exampleRange.durationInFrames);
		for (let offset = 0; offset < range.durationInFrames; offset++) expect(scene.poseAt(range.from + offset)).toEqual(example.poseAt(exampleRange.from + offset));
	});

	test('every move still joins the previous one and the wrench ends on the window surface', () => {
		[45, 69, 87, 147].forEach((from) => expect(scene.poseAt(from)).toEqual(scene.poseAt(from - 1)));
		const drawn = expectWrenchRestingAt(window.surface, scene.poseAt(scene.durationInFrames - 1), hopWhileCarrying.places);
		expect(drawn.actor).toEqual({ x: window.x, y: window.y });
		expect(drawn.hand).toEqual(engineerRig.restRightHand);
	});
});

describe('returning to a wrench that was put down at the window', () => {
	const returning: SceneScript = {
		...putDown,
		moves: [...putDown.moves.slice(0, 4), { kind: 'travel', to: 'desk', seconds: 1 }, { kind: 'travel', to: 'window', seconds: 1 }, { kind: 'pick up', prop: 'wrench', seconds: 0.8 }],
	};
	const scene = compileScene(returning);
	const { window } = putDown.places;
	const release = scene.beatRange('4 put down wrench');
	const again = scene.beatRange('7 pick up wrench');
	const [, contact] = firstMiddleLast(again);

	test('the wrench waits on the window surface while the Engineer travels away and back', () => {
		for (let frame = firstMiddleLast(release)[1]; frame < contact; frame++) expectWrenchRestingAt(window.surface, scene.poseAt(frame), returning.places);
		const away = scene.beatRange('5 travel to desk');
		expect(picture(scene.poseAt(firstMiddleLast(away)[2]), returning.places).actor).toEqual({ x: returning.places.desk.x, y: returning.places.desk.y });
	});

	test('the second pick up takes the wrench from the window surface and carries it', () => {
		const taken = expectCarriedWrench(scene.poseAt(contact), returning.places);
		expect(taken.worldHand.x).toBeCloseTo(window.surface.x, 8);
		expect(taken.worldHand.y).toBeCloseTo(window.surface.y, 8);
		const settled = expectCarriedWrench(scene.poseAt(scene.durationInFrames - 1), returning.places);
		expect(settled.actor).toEqual({ x: window.x, y: window.y });
		expect(settled.hand).toEqual(engineerRig.carryHand);
	});
});

test('the authored scene is the pick up, carry, put down example', () => {
	expect(script).toEqual(putDown);
});
