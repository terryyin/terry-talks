import { renderToStaticMarkup } from 'react-dom/server';
import { beat, timeline } from '../../src/beatTimeline';
import { brief } from '../../src/visualTreatments/brief';
import { CharacterTreatment } from '../../src/visualTreatments/character/CharacterTreatment';
import { characterTimeline, characterV1, stage } from '../../src/visualTreatments/character/script';
import { typographyTimeline, typographyV1 } from '../../src/visualTreatments/typography/script';

const sample = characterTimeline(characterV1);

const markupAt = (frame: number) => renderToStaticMarkup(<CharacterTreatment pose={sample.poseAt(frame)} caption={sample.captionAt(frame)}/>);
const picture = (frame: number) => new DOMParser().parseFromString(markupAt(frame), 'text/html');

const first = (name: string) => sample.beatRange(name).from;
const settled = (name: string) => {
	const { from, durationInFrames } = sample.beatRange(name);
	return from + durationInFrames - 1;
};
const atSecond = (name: string, seconds: number) => first(name) + Math.round(seconds * characterV1.fps);

const outcome = (page: Document, id: string) => page.querySelector(`[data-outcome="${id}"]`)!;
const status = (page: Document, id: string) => outcome(page, id).getAttribute('data-status');
const text = (element: Element | null) => element?.textContent ?? '';
const opacity = (element: Element) => Number((element as HTMLElement).style.opacity);
const attention = (page: Document) => page.querySelector('[data-attention]')!.getAttribute('data-attention');
const shopper = (page: Document) => {
	const actors = page.querySelectorAll('[data-testid="engineer"]');
	expect(actors).toHaveLength(1);
	const actor = actors[0];
	expect(actor.closest('[data-role="shopper"]')).not.toBeNull();
	const [x, y, scale] = actor.getAttribute('transform')!.match(/-?[\d.]+/g)!.map(Number);
	const [handX, handY] = actor.querySelectorAll('[data-testid="articulated-arm"]')[1].getAttribute('data-hand')!.split(',').map(Number);
	return { x, y, scale, mood: actor.getAttribute('data-mood'), hand: { x: x + handX * scale, y: y + handY * scale } };
};

test('screen, API and database stay an imagined answer the shopper looks past to their own questions', () => {
	const page = picture(settled('distinction'));
	const solution = page.querySelector('[data-region="imagined-solution"]')!;
	const customer = page.querySelector('[data-region="customer-outcomes"]')!;
	expect([...solution.querySelectorAll('[data-part]')].map(text)).toEqual(['Screen', 'API', 'Database']);
	expect(solution.querySelector('[data-outcome]')).toBeNull();
	expect([...customer.querySelectorAll('[data-outcome]')].map((card) => card.getAttribute('data-outcome'))).toEqual(['stock', 'hours', 'reservation']);
	['Screen', 'API', 'Database'].forEach((part) => expect(text(customer)).not.toContain(part));

	const looking = sample.poseAt(atSecond('distinction', 1.6));
	expect(looking.attention).toBe('solution');
	expect(looking.shopper.gaze).toBe(-1);
	expect(shopper(picture(atSecond('distinction', 1.6))).mood).toBe('concerned');
	expect(attention(page)).toBe('customer');
	expect(sample.poseAt(settled('distinction')).shopper.gaze).toBe(1);
});

test('one shopper, the same figure at the same size, acts the whole passage with finite poses', () => {
	for (let frame = 0; frame < sample.durationInFrames; frame += 2) {
		const markup = markupAt(frame);
		expect(markup).not.toMatch(/NaN|Infinity/);
		const actor = shopper(new DOMParser().parseFromString(markup, 'text/html'));
		expect(actor.scale).toBe(stage.scale);
		expect(actor.x).toBeGreaterThanOrEqual(stage.home);
		expect(actor.x).toBeLessThanOrEqual(stage.door);
	}
	sample.beats.forEach(({ name }) => [first(name), settled(name)].forEach((frame) => expect(markupAt(frame)).not.toMatch(/NaN|Infinity/)));
});

test('intent, modest relief, surprise at the closed door, then attention to opening hours', () => {
	const title = picture(settled('title'));
	expect(attention(title)).toBe('trip');
	expect(shopper(title).mood).toBe('concerned');
	expect(text(title.querySelector('[data-testid="need"]'))).toContain(brief.need);

	const asking = picture(atSecond('question', 1.5));
	expect(attention(asking)).toBe('stock');
	expect(shopper(asking).mood).toBe('focused');
	expect(sample.poseAt(atSecond('question', 1.5)).shopper.reach.amount).toBeGreaterThan(0.5);

	expect(shopper(picture(atSecond('result', 1.2))).mood).toBe('relieved');
	const result = picture(settled('result'));
	expect(attention(result)).toBe('result');
	expect(shopper(result).mood).toBe('pleased');
	expect(shopper(result).x).toBe(stage.home);

	const walking = shopper(picture(atSecond('feedback', 1.2)));
	expect(walking.x).toBeGreaterThan(stage.home);
	expect(walking.x).toBeLessThan(stage.door);
	const arrived = picture(atSecond('feedback', 2.8));
	expect(shopper(arrived).mood).toBe('surprised');
	expect(attention(arrived)).toBe('door');
	const feedback = picture(settled('feedback'));
	expect(shopper(feedback).mood).toBe('concerned');
	expect(shopper(feedback).x).toBe(stage.door);
	expect(feedback.querySelector('[data-testid="closed-sign"]')!.getAttribute('data-shown')).toBe('true');
	expect(text(feedback.querySelector('[data-testid="feedback"]'))).toContain(brief.feedback);
	expect(opacity(feedback.querySelector('[data-testid="feedback"]')!)).toBe(1);

	expect(attention(picture(atSecond('next', 4.2)))).toBe('result');
	const next = picture(settled('next'));
	expect(attention(next)).toBe('hours');
	const { hand } = shopper(next);
	const hours = outcome(next, 'hours') as HTMLElement;
	const box = { left: parseFloat(hours.style.left), top: parseFloat(hours.style.top), width: parseFloat(hours.style.width), height: parseFloat(hours.style.height) };
	expect(hand.x).toBeGreaterThanOrEqual(box.left);
	expect(hand.x).toBeLessThanOrEqual(box.left + box.width);
	expect(hand.y).toBeGreaterThanOrEqual(box.top);
	expect(hand.y).toBeLessThanOrEqual(box.top + box.height);
});

test('the outcome information stays readable: stock kept, opening hours next, reservation unstarted', () => {
	const question = picture(settled('question'));
	expect(status(question, 'stock')).toBe('question');
	expect(text(outcome(question, 'stock'))).toContain('Is it in stock?');

	for (let frame = settled('result'); frame < sample.durationInFrames; frame += 3) {
		const page = picture(frame);
		expect(status(page, 'stock')).toBe('done');
		expect(text(outcome(page, 'stock'))).toContain('In stock: 1 left');
		expect(opacity(outcome(page, 'stock'))).toBe(1);
	}
	for (let frame = 0; frame < sample.durationInFrames; frame += 3) {
		expect(['open', 'later', 'unstarted']).toContain(status(picture(frame), 'reservation'));
	}
	expect(status(picture(settled('feedback')), 'hours')).toBe('later');

	const next = picture(settled('next'));
	expect(status(next, 'hours')).toBe('next');
	expect(text(outcome(next, 'hours'))).toContain('When is it open?');
	expect(status(next, 'reservation')).toBe('unstarted');
	expect(text(outcome(next, 'reservation'))).toContain('Can I reserve it?');
});

test('the same beats carry the same captions, title and attribution as the typography sample', () => {
	const typography = typographyTimeline(typographyV1);
	expect(sample.beats.map((b) => b.name)).toEqual(typography.beats.map((b) => b.name));
	sample.beats.forEach(({ name }) => {
		const { from, durationInFrames } = sample.beatRange(name);
		const frame = from + Math.floor(durationInFrames / 2);
		const other = typography.beatRange(name);
		const page = picture(frame);
		expect(page.querySelector('[data-beat]')!.getAttribute('data-beat')).toBe(name);
		expect(text(page.querySelector('[data-testid="caption"]'))).toBe(typography.captionAt(other.from + Math.floor(other.durationInFrames / 2)));
		expect(text(page.querySelector('[data-testid="title"]'))).toBe('Problem Decomposition');
		expect(text(page.querySelector('[data-testid="attribution"]'))).toBe('Terry Yin');
	});
});

test('appending a beat leaves every earlier picture unchanged', () => {
	const end = sample.poseAt(sample.durationInFrames - 1);
	const continued = timeline([...sample.beats, beat('appended', 1, 'An appended beat.', () => end, characterV1.fps)], characterV1.fps);
	expect(continued.durationInFrames).toBe(sample.durationInFrames + characterV1.fps);
	for (let frame = 0; frame < sample.durationInFrames; frame += 2) {
		expect(renderToStaticMarkup(<CharacterTreatment pose={continued.poseAt(frame)} caption={continued.captionAt(frame)}/>)).toBe(markupAt(frame));
	}
});
