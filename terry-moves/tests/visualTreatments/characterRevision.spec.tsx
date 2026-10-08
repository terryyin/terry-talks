import { renderToStaticMarkup } from 'react-dom/server';
import { CharacterTreatment } from '../../src/visualTreatments/character/CharacterTreatment';
import { characterTimeline, characterV1, stage } from '../../src/visualTreatments/character/script';
import { characterV2 } from '../../src/visualTreatments/character/v2';

const v1 = characterTimeline(characterV1);
const v2 = characterTimeline(characterV2);

const markup = (sample: typeof v1, frame: number) => renderToStaticMarkup(<CharacterTreatment pose={sample.poseAt(frame)} caption={sample.captionAt(frame)}/>);
const picture = (sample: typeof v1, frame: number) => new DOMParser().parseFromString(markup(sample, frame), 'text/html');
const range = (name: string) => v1.beatRange(name);
const atSecond = (name: string, seconds: number) => range(name).from + Math.round(seconds * characterV1.fps);
const settled = (name: string) => range(name).from + range(name).durationInFrames - 1;
const framesOf = (name: string) => Array.from({ length: range(name).durationInFrames }, (_, i) => range(name).from + i);

// Where the drawn right hand is, in scene coordinates.
const hand = (page: Document) => {
	const actor = page.querySelector('[data-testid="engineer"]')!;
	const [x, y, scale] = actor.getAttribute('transform')!.match(/-?[\d.]+/g)!.map(Number);
	const [handX, handY] = actor.querySelectorAll('[data-testid="articulated-arm"]')[1].getAttribute('data-hand')!.split(',').map(Number);
	return { x: x + handX * scale, y: y + handY * scale };
};

test('the revision is a new named version with the same timing; the first take keeps its name', () => {
	expect(characterV2.id).toBe('TreatmentCharacterV2');
	expect(characterV1.id).toBe('TreatmentCharacterV1');
	expect(characterV2.fps).toBe(characterV1.fps);
	expect(characterV2.seconds).toEqual(characterV1.seconds);
	expect(v2.durationInFrames).toBe(v1.durationInFrames);
	(['title', 'distinction', 'question'] as const).forEach((name) => expect(characterV2.performance[name]).toBe(characterV1.performance[name]));
	expect(characterV2.performance.result).not.toBe(characterV1.performance.result);
});

test('beats outside the correction, and the walk to the door, are the first take exactly', () => {
	[...framesOf('title'), ...framesOf('distinction'), ...framesOf('question')].filter((frame) => frame % 3 === 0)
		.forEach((frame) => expect(markup(v2, frame)).toBe(markup(v1, frame)));
	framesOf('feedback').filter((frame) => frame < atSecond('feedback', 2.3)).forEach((frame) => expect(v2.poseAt(frame)).toEqual(v1.poseAt(frame)));
});

test('captions, outcomes and feedback stay those of the first take at every frame', () => {
	for (let frame = 0; frame < v1.durationInFrames; frame++) {
		const [before, after] = [v1.poseAt(frame), v2.poseAt(frame)];
		expect(v2.captionAt(frame)).toBe(v1.captionAt(frame));
		expect(after.outcomes).toEqual(before.outcomes);
		expect([after.feedback, after.closedSign, after.attention]).toEqual([before.feedback, before.closedSign, before.attention]);
	}
});

test('at the result, a visible breath out with a hand to the chest, then a look up at the kept answer', () => {
	const relief = atSecond('result', 1.5);
	expect(v2.poseAt(relief).shopper.mood).toBe('relieved');
	expect(v2.poseAt(relief).shopper.reach.amount).toBeGreaterThan(0.8);
	expect(v1.poseAt(relief).shopper.reach.amount).toBe(0);
	const chest = hand(picture(v2, relief));
	expect(Math.abs(chest.x - stage.home)).toBeLessThan(20);

	const after = v2.poseAt(settled('result')).shopper;
	expect(after).toMatchObject({ mood: 'pleased', gaze: 1, x: stage.home, reach: { amount: 0 } });
	expect(after.headTilt).toBeGreaterThan(v1.poseAt(settled('result')).shopper.headTilt + 5);
});

test('at the closed door, a half step back in surprise and a hand to the chin, back at rest before hours become next', () => {
	const surprised = v2.poseAt(atSecond('feedback', 3.1)).shopper;
	expect(surprised.mood).toBe('surprised');
	expect(surprised.x).toBeLessThan(stage.door - 20);
	expect(v1.poseAt(atSecond('feedback', 3.1)).shopper.x).toBe(stage.door);

	const thinking = atSecond('feedback', 5.0);
	expect(v2.poseAt(thinking).shopper.mood).toBe('concerned');
	expect(hand(picture(v2, thinking)).y).toBeLessThan(stage.ground - 200);

	const end = v2.poseAt(settled('feedback')).shopper;
	expect(end.x).toBe(stage.door);
	expect(end.reach.amount).toBeLessThan(0.01);
	expect(end.mood).toBe(v1.poseAt(settled('feedback')).shopper.mood);
});

test('the hand ends against the opening-hours sign rather than under it', () => {
	const page = picture(v2, settled('next'));
	const hours = page.querySelector('[data-outcome="hours"]') as HTMLElement;
	const box = { left: parseFloat(hours.style.left), top: parseFloat(hours.style.top), height: parseFloat(hours.style.height) };
	const end = hand(page);
	expect(end.x).toBeLessThan(box.left);
	expect(box.left - end.x).toBeLessThan(20);
	expect(end.y).toBeGreaterThan(box.top);
	expect(end.y).toBeLessThan(box.top + box.height);
	expect(hand(picture(v1, settled('next'))).x).toBeGreaterThan(box.left);

	const glance = atSecond('next', 4.2);
	expect(v2.poseAt(glance).attention).toBe('result');
	expect({ ...v2.poseAt(glance).shopper, reach: null }).toEqual({ ...v1.poseAt(glance).shopper, reach: null });
});
