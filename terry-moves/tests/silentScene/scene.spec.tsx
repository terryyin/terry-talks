import { renderToStaticMarkup } from 'react-dom/server';
import { engineerRig } from '../../src/aiTestAutomation/actors';
import { compileScene, ScenePose } from '../../src/silentScene/compileScene';
import { SceneScript, script } from '../../src/silentScene/script';
import { SilentScene } from '../../src/silentScene/SilentScene';
import { original, pickUp, reordered, withCut } from './fixtures';

const withHold: SceneScript = {
	...reordered,
	moves: [...reordered.moves, { kind: 'hold', seconds: 0.8 }],
};

const numbers = (text: string) => text.match(/-?[\d.]+/g)!.map(Number);
const point = (text: string) => { const [x, y] = text.split(',').map(Number); return { x, y }; };
const propsAt = (document: Document, testId: string) => [...document.querySelectorAll(`[data-testid="${testId}"]`)].map((prop) => {
	const [x, y] = numbers(prop.querySelector('g')!.getAttribute('transform')!);
	return { name: prop.getAttribute('data-prop'), x, y };
});

// Reads the drawn picture: the world hand comes from the real articulated arm.
const picture = (pose: ScenePose, places: SceneScript['places']) => {
	const document = new DOMParser().parseFromString(renderToStaticMarkup(<SilentScene pose={pose} places={places}/>), 'text/html');
	const actor = document.querySelector('[data-testid="engineer"]')!;
	const [x, y, scale] = numbers(actor.getAttribute('transform')!);
	const arm = actor.querySelectorAll('[data-testid="articulated-arm"]')[1];
	const [shoulder, elbow, hand] = ['data-shoulder', 'data-elbow', 'data-hand'].map((name) => point(arm.getAttribute(name)!));
	const pupils = [...actor.querySelectorAll('ellipse[rx="4.5"]')].map((pupil) => Number(pupil.getAttribute('cx')));
	return {
		document,
		actor: { x, y },
		hand,
		worldHand: { x: x + hand.x * scale, y: y + hand.y * scale },
		upper: Math.hypot(elbow.x - shoulder.x, elbow.y - shoulder.y),
		lower: Math.hypot(hand.x - elbow.x, hand.y - elbow.y),
		// The Engineer's pupils sit at -31 and 17 when looking straight ahead.
		gaze: pupils[0] + 31,
		carried: propsAt(document, 'carried-prop'),
		resting: propsAt(document, 'resting-prop'),
	};
};

const expectCarriedWrench = (pose: ScenePose, places: SceneScript['places']) => {
	const drawn = picture(pose, places);
	expect(drawn.actor).toEqual({ x: pose.x, y: pose.y - pose.lift });
	expect(drawn.carried).toHaveLength(1);
	expect(drawn.carried[0].name).toBe('wrench');
	expect(drawn.carried[0].x).toBeCloseTo(drawn.worldHand.x, 8);
	expect(drawn.carried[0].y).toBeCloseTo(drawn.worldHand.y, 8);
	expect(drawn.upper).toBeCloseTo(engineerRig.upper, 8);
	expect(drawn.lower).toBeCloseTo(engineerRig.lower, 8);
	expect(drawn.resting).toEqual([]);
	expect(drawn.document.querySelector('[data-testid="caption"], text')).toBeNull();
	expect(drawn.document.body.textContent).toBe('');
	return drawn;
};

const firstMiddleLast = ({ from, durationInFrames }: { from: number; durationInFrames: number }) => [from, from + Math.floor(durationInFrames / 2), from + durationInFrames - 1];

describe.each([['original story order', original], ['reordered with hold', withHold], ['with cut', withCut]] as const)('%s picture with the wrench held from the start', (_order, authored) => {
	const scene = compileScene(authored);

	test('keeps the wrench on the real articulated hand on every frame without captions', () => {
		for (let frame = 0; frame < scene.durationInFrames; frame++) expectCarriedWrench(scene.poseAt(frame), authored.places);
	});
});

test('the wrench stays at the real world hand on the cut frame and both neighbors', () => {
	const scene = compileScene(withCut);
	const { from } = scene.beatRange('3 cut to door');
	[from - 1, from, from + 1].forEach((frame) => expectCarriedWrench(scene.poseAt(frame), withCut.places));
});

describe('picking up the wrench that rests on the desk', () => {
	const scene = compileScene(pickUp);
	const draw = (frame: number) => picture(scene.poseAt(frame), pickUp.places);
	const pickUpRange = scene.beatRange('2 pick up wrench');
	const contact = pickUpRange.from + Math.floor(pickUpRange.durationInFrames / 2);
	const desk = pickUp.places.desk;

	test('each move begins the frame after the previous one ends, in the same whole pose', () => {
		expect(scene.beats.map((current) => scene.beatRange(current.name))).toEqual([
			{ from: 0, durationInFrames: 45 },
			{ from: 45, durationInFrames: 24 },
			{ from: 69, durationInFrames: 60 },
			{ from: 129, durationInFrames: 18 },
		]);
		expect(scene.durationInFrames).toBe(147);
		[45, 69, 129].forEach((from) => expect(scene.poseAt(from)).toEqual(scene.poseAt(from - 1)));
	});

	test('the wrench lies on the desk surface and nothing is carried on every frame before contact', () => {
		for (let frame = 0; frame < contact; frame++) {
			const drawn = draw(frame);
			expect(drawn.resting).toEqual([{ name: 'wrench', ...desk.surface }]);
			expect(drawn.carried).toEqual([]);
			expect(drawn.upper).toBeCloseTo(engineerRig.upper, 8);
			expect(drawn.lower).toBeCloseTo(engineerRig.lower, 8);
		}
	});

	test('the empty hand hangs at rest and looks ahead until the pick up begins', () => {
		for (let frame = 0; frame <= pickUpRange.from; frame++) {
			const drawn = draw(frame);
			expect(drawn.hand).toEqual(engineerRig.restRightHand);
			expect(drawn.gaze).toBe(0);
		}
	});

	test('the Engineer stands still at the desk through the pick up', () => {
		for (let frame = pickUpRange.from; frame < pickUpRange.from + pickUpRange.durationInFrames; frame++) {
			expect(draw(frame).actor).toEqual({ x: desk.x, y: desk.y });
		}
	});

	test('the reaching hand moves between rest and the grip while the gaze turns to the wrench', () => {
		const drawn = draw(pickUpRange.from + 6);
		expect(drawn.worldHand.x).toBeGreaterThan(desk.x + engineerRig.restRightHand.x);
		expect(drawn.worldHand.x).toBeLessThan(desk.surface.x);
		expect(drawn.worldHand.y).toBeGreaterThan(desk.y + engineerRig.restRightHand.y);
		expect(drawn.worldHand.y).toBeLessThan(desk.surface.y);
		expect(drawn.gaze).toBeGreaterThan(0);
	});

	test('on the middle frame the real hand is at the grip, the wrench is taken, and the gaze is toward it', () => {
		const drawn = expectCarriedWrench(scene.poseAt(contact), pickUp.places);
		expect(drawn.worldHand.x).toBeCloseTo(desk.surface.x, 8);
		expect(drawn.worldHand.y).toBeCloseTo(desk.surface.y, 8);
		expect(drawn.gaze).toBeGreaterThan(0);
	});

	test('the pick up settles the hand at the carry offset, looking ahead again', () => {
		const drawn = expectCarriedWrench(scene.poseAt(pickUpRange.from + pickUpRange.durationInFrames - 1), pickUp.places);
		expect(drawn.hand).toEqual(engineerRig.carryHand);
		expect(drawn.gaze).toBe(0);
	});

	test.each(['3 travel to window', '4 hop'])('the wrench follows the fixed-length arm on the first, middle, and last frames of %s', (name) => {
		firstMiddleLast(scene.beatRange(name)).forEach((frame) => {
			const drawn = expectCarriedWrench(scene.poseAt(frame), pickUp.places);
			expect(drawn.hand).toEqual(engineerRig.carryHand);
			expect(drawn.gaze).toBe(0);
		});
	});

	test('the carried wrench rises with the hop', () => {
		const hop = scene.beatRange('4 hop');
		const drawn = expectCarriedWrench(scene.poseAt(hop.from + Math.floor(hop.durationInFrames / 2)), pickUp.places);
		expect(drawn.carried[0].y).toBeLessThan(pickUp.places.window.y + engineerRig.carryHand.y);
	});

	test('a slab is drawn under each declared surface on every frame and none at the door', () => {
		[0, contact, scene.durationInFrames - 1].forEach((frame) => {
			const slabs = [...draw(frame).document.querySelectorAll('[data-testid="surface"]')];
			expect(slabs.map((slab) => slab.getAttribute('data-place'))).toEqual(['desk', 'window']);
			const [slab] = slabs;
			expect(Number(slab.getAttribute('y'))).toBeGreaterThan(desk.surface.y);
			expect(Number(slab.getAttribute('x'))).toBeLessThan(desk.surface.x);
			expect(Number(slab.getAttribute('x')) + Number(slab.getAttribute('width'))).toBeGreaterThan(desk.surface.x);
		});
	});

	test('a gaze the other way follows a wrench resting behind the Engineer', () => {
		const behind: SceneScript = { ...pickUp, places: { ...pickUp.places, desk: { ...desk, surface: { x: 500, y: 690 } } } };
		const mirrored = compileScene(behind);
		expect(picture(mirrored.poseAt(contact), behind.places).gaze).toBeLessThan(0);
	});

	test('a wrench beyond the fixed-length arm is refused before a timeline is returned', () => {
		const tooFar: SceneScript = { ...pickUp, moves: [pickUp.moves[2], pickUp.moves[1]] };
		expect(() => compileScene(tooFar)).toThrow('move 2 (pick up wrench)');
	});
});

test('the authored scene is the pick up example', () => {
	expect(script).toEqual(pickUp);
});
