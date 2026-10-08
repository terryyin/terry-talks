import { renderToStaticMarkup } from 'react-dom/server';
import { beat, timeline } from '../../src/beatTimeline';
import { typographyTimeline, typographyV1 } from '../../src/visualTreatments/typography/script';
import { TypographyTreatment } from '../../src/visualTreatments/typography/TypographyTreatment';

const sample = typographyTimeline(typographyV1);

const picture = (frame: number) => {
	const markup = renderToStaticMarkup(<TypographyTreatment pose={sample.poseAt(frame)} caption={sample.captionAt(frame)}/>);
	return new DOMParser().parseFromString(markup, 'text/html');
};

const settled = (name: string) => {
	const { from, durationInFrames } = sample.beatRange(name);
	return from + durationInFrames - 1;
};

const outcome = (page: Document, id: string) => page.querySelector(`[data-outcome="${id}"]`)!;
const status = (page: Document, id: string) => outcome(page, id).getAttribute('data-status');
const text = (element: Element | null) => element?.textContent ?? '';
const opacity = (element: Element) => Number((element as HTMLElement).style.opacity);

test('keeps screen, API and database as parts of one imagined answer, apart from customer outcomes', () => {
	const page = picture(settled('distinction'));
	const solution = page.querySelector('[data-region="imagined-solution"]')!;
	const customer = page.querySelector('[data-region="customer-outcomes"]')!;

	expect([...solution.querySelectorAll('[data-part]')].map(text)).toEqual(['Screen', 'API', 'Database']);
	expect(solution.querySelector('[data-outcome]')).toBeNull();
	expect([...customer.querySelectorAll('[data-outcome]')].map((card) => card.getAttribute('data-outcome'))).toEqual(['stock', 'hours', 'reservation']);
	['Screen', 'API', 'Database'].forEach((part) => expect(text(customer)).not.toContain(part));
});

test('named beats move from the stock question to a usable result, feedback, and opening hours next', () => {
	expect(sample.beats.map((b) => b.name)).toEqual(['title', 'distinction', 'question', 'result', 'feedback', 'next']);

	const question = picture(settled('question'));
	expect(status(question, 'stock')).toBe('question');
	expect(text(outcome(question, 'stock'))).toContain('Is it in stock?');
	expect(opacity(question.querySelector('[data-testid="feedback"]')!)).toBe(0);

	const result = picture(settled('result'));
	expect(status(result, 'stock')).toBe('done');
	expect(text(outcome(result, 'stock'))).toContain('✓ In stock: 1 left');
	expect(status(result, 'hours')).toBe('later');
	expect(opacity(result.querySelector('[data-testid="feedback"]')!)).toBe(0);

	const feedback = picture(settled('feedback'));
	expect(text(feedback.querySelector('[data-testid="feedback"]'))).toContain('The shop was closed when I arrived.');
	expect(opacity(feedback.querySelector('[data-testid="feedback"]')!)).toBe(1);
	expect(status(feedback, 'hours')).toBe('later');

	const next = picture(settled('next'));
	expect(status(next, 'hours')).toBe('next');
	expect(text(outcome(next, 'hours'))).toContain('When is it open?');
	expect(status(next, 'reservation')).toBe('unstarted');
	expect(text(outcome(next, 'reservation'))).toContain('Can I reserve it?');
});

test('the usable stock result stays completed after feedback changes the priority', () => {
	for (let frame = settled('result'); frame < sample.durationInFrames; frame += 3) {
		const page = picture(frame);
		expect(status(page, 'stock')).toBe('done');
		expect(text(outcome(page, 'stock'))).toContain('In stock: 1 left');
		expect(opacity(outcome(page, 'stock'))).toBe(1);
	}
});

test('reservation is never started in the passage', () => {
	for (let frame = 0; frame < sample.durationInFrames; frame += 3) {
		expect(['open', 'later', 'unstarted']).toContain(status(picture(frame), 'reservation'));
	}
});

test('every beat shows its own caption with the title and attribution', () => {
	const captions = sample.beats.map(({ name }) => {
		const { from, durationInFrames } = sample.beatRange(name);
		const page = picture(from + Math.floor(durationInFrames / 2));
		expect(text(page.querySelector('[data-testid="title"]'))).toBe('Problem Decomposition');
		expect(text(page.querySelector('[data-testid="attribution"]'))).toBe('Terry Yin');
		expect(page.querySelector('[data-beat]')!.getAttribute('data-beat')).toBe(name);
		return text(page.querySelector('[data-testid="caption"]'));
	});
	captions.forEach((caption) => expect(caption.length).toBeGreaterThan(20));
	expect(new Set(captions).size).toBe(captions.length);
	expect(captions[2]).toContain('in stock');
	expect(captions[4]).toContain('The shop was closed when I arrived.');
	expect(captions[5]).toContain('Reservation stays unstarted');
});

test('appending a beat leaves every earlier picture unchanged', () => {
	const end = sample.poseAt(sample.durationInFrames - 1);
	const continued = timeline([...sample.beats, beat('appended', 1, 'An appended beat.', () => end, typographyV1.fps)], typographyV1.fps);
	expect(continued.durationInFrames).toBe(sample.durationInFrames + typographyV1.fps);
	for (let frame = 0; frame < sample.durationInFrames; frame += 2) {
		expect(renderToStaticMarkup(<TypographyTreatment pose={continued.poseAt(frame)} caption={continued.captionAt(frame)}/>))
			.toBe(renderToStaticMarkup(<TypographyTreatment pose={sample.poseAt(frame)} caption={sample.captionAt(frame)}/>));
	}
});
