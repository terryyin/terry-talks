import { renderToStaticMarkup } from 'react-dom/server';
import { typographyTimeline, TypeDirection } from '../../src/typographyFilm/direction';
import { editedOpeningContrast, openingContrast, problemBaseline } from '../../src/typographyFilm/script';
import { TypographyFilm, TypographyOpeningCompositions, TypographyProblemBaselineComposition } from '../../src/typographyFilm/TypographyFilm';

type Registration = {
	id: string;
	component: typeof TypographyFilm;
	defaultProps: { direction: TypeDirection };
	durationInFrames: number;
	fps: number;
	width: number;
	height: number;
};
type Transport = { frame: number; fps: number; registrations: Registration[] };

// Replace only Remotion's clock and registration. The authored script,
// shared beat clock, registered film and picture renderer all execute.
jest.mock('remotion', () => {
	const transport: Transport = { frame: 0, fps: 30, registrations: [] };
	return {
		...jest.requireActual('remotion'),
		__typeTransport: transport,
		Composition: (entry: Registration) => { transport.registrations.push(entry); return null; },
		useCurrentFrame: () => transport.frame,
		useVideoConfig: () => ({ fps: transport.fps }),
	};
});

const transport = (jest.requireMock('remotion') as { __typeTransport: Transport }).__typeTransport;
const registrations = () => {
	transport.registrations = [];
	renderToStaticMarkup(<TypographyOpeningCompositions />);
	return transport.registrations;
};
const picture = (direction: TypeDirection, frame: number, fps = 30) => {
	transport.frame = frame;
	transport.fps = fps;
	const page = document.createElement('div');
	page.innerHTML = renderToStaticMarkup(<TypographyFilm direction={direction} />);
	return page;
};
const group = (page: HTMLElement, id: string) => page.querySelector<HTMLElement>(`[data-type-group="${id}"]`)!;
const passage = (page: HTMLElement) => page.querySelector('[data-passage]')!.getAttribute('data-passage');

test('the two named square compositions consume their retained scripts and authored durations', () => {
	const entries = registrations();
	expect(entries.map(({ id, durationInFrames, fps, width, height }) => ({ id, durationInFrames, fps, width, height }))).toEqual([
		{ id: 'TypographyOpeningContrast', durationInFrames: 270, fps: 30, width: 1080, height: 1080 },
		{ id: 'TypographyOpeningContrastEdited', durationInFrames: 330, fps: 30, width: 1080, height: 1080 },
	]);
	const pages = entries.map(({ component: Film, defaultProps, fps }) => {
		transport.frame = 90;
		transport.fps = fps;
		const page = document.createElement('div');
		page.innerHTML = renderToStaticMarkup(<Film {...defaultProps} />);
		return page;
	});
	expect(group(pages[0], 'lead-in').textContent).toBe('Start with the');
	expect(group(pages[1], 'lead-in').textContent).toBe('Begin with the');
});

test('a script edit changes visible wording, size, weight, tracking and spacing in the same renderer', () => {
	const baseline = picture(openingContrast, 90);
	const edited = picture(editedOpeningContrast, 90);
	expect(group(baseline, 'lead-in').textContent).toBe('Start with the');
	expect(group(edited, 'lead-in').textContent).toBe('Begin with the');
	expect(group(baseline, 'lead-in').style).toMatchObject({ fontSize: '64px', fontWeight: '400', letterSpacing: '-1px' });
	expect(group(edited, 'lead-in').style).toMatchObject({ fontSize: '72px', fontWeight: '700', letterSpacing: '-2px' });
	expect(group(baseline, 'focus').style).toMatchObject({ fontSize: '142px', fontWeight: '700', marginTop: '18px' });
	expect(group(edited, 'focus').style).toMatchObject({ fontSize: '120px', fontWeight: '400', marginTop: '38px' });
	expect(group(baseline, 'focus').textContent).toBe('problem.');
	expect(group(edited, 'focus').textContent).toBe('problem.');
});

test('line grouping is authored, and the first frame has readable lead-in text', () => {
	const split: TypeDirection = {
		passages: [{ ...openingContrast.passages[0], groups: [{ ...openingContrast.passages[0].groups[0], lines: ['Start', 'with the'] }] }],
	};
	const page = picture(split, 0);
	expect([...group(page, 'lead-in').querySelectorAll('[data-type-line]')].map((line) => line.textContent)).toEqual(['Start', 'with the']);
	expect(group(page, 'lead-in').style.opacity).toBe('1');
	expect(group(picture(openingContrast, 0), 'lead-in').textContent).toBe('Start with the');
});

test('script-directed reveal and settling reach opacity and vertical placement before the reading hold', () => {
	const arriving = group(picture(openingContrast, 24), 'focus');
	expect(Number(arriving.style.opacity)).toBeGreaterThan(0);
	expect(Number(arriving.style.opacity)).toBeLessThan(1);
	expect(arriving.style.translate).not.toBe('0px 0px');
	expect(group(picture(editedOpeningContrast, 24), 'focus').style.opacity).toBe('0');
	expect(group(picture(openingContrast, 45), 'focus').style.translate).toBe('0px 0px');
	expect(group(picture(editedOpeningContrast, 45), 'focus').style.translate).not.toBe('0px 0px');
	for (const frame of [48, 90, 134]) {
		expect(group(picture(openingContrast, frame), 'focus').style).toMatchObject({ opacity: '1', translate: '0px 0px' });
	}
});

test('the edited entrance and longer hold change the actual passage transition and retain the final contrast', () => {
	expect(passage(picture(openingContrast, 134))).toBe('problem');
	expect(passage(picture(openingContrast, 135))).toBe('solution');
	expect(passage(picture(editedOpeningContrast, 135))).toBe('problem');
	expect(passage(picture(editedOpeningContrast, 194))).toBe('problem');
	expect(passage(picture(editedOpeningContrast, 195))).toBe('solution');
	const baselineEnd = picture(openingContrast, 269);
	const editedEnd = picture(editedOpeningContrast, 329);
	for (const page of [baselineEnd, editedEnd]) {
		expect(group(page, 'lead-in').textContent).toBe('not the');
		expect(group(page, 'focus').textContent).toBe('solution.');
		expect(group(page, 'focus').style).toMatchObject({ fontSize: '108px', fontWeight: '400', opacity: '1', translate: '0px 0px' });
		expect(page.querySelector('audio,video')).toBeNull();
	}
});

test('frame sampling uses the composition frame rate and stays stable across out-of-order seeks', () => {
	const atThirty = picture(openingContrast, 24).innerHTML;
	expect(picture(openingContrast, 48, 60).innerHTML).toBe(atThirty);
	const frames = [0, 24, 48, 134, 135, 171, 269];
	const forward = new Map(frames.map((frame) => [frame, picture(openingContrast, frame).innerHTML]));
	for (const frame of [...frames].reverse()) expect(picture(openingContrast, frame).innerHTML).toBe(forward.get(frame));
	expect(typographyTimeline(openingContrast, 60).durationInFrames).toBe(540);
});

test('the named baseline carries the complete argument through its registered film', () => {
	transport.registrations = [];
	renderToStaticMarkup(<TypographyProblemBaselineComposition />);
	const entry = transport.registrations[0];
	expect(entry).toMatchObject({ id: 'TypographyProblemBaseline', component: TypographyFilm, durationInFrames: 885, fps: 30, width: 1080, height: 1080 });
	const Film = entry.component;
	const beats = [
		{ frame: 0, id: 'problem', lines: ['Start with the', 'problem.'] },
		{ frame: 135, id: 'solution', lines: ['not the', 'solution.'] },
		{ frame: 270, id: 'question', lines: ['What is someone', 'trying to do?'] },
		{ frame: 435, id: 'useful-outcome', lines: ['Find', 'a seat', 'for tonight.'] },
		{ frame: 585, id: 'smaller-step', lines: ['Help them', 'find one.'] },
		{ frame: 735, id: 'return-to-problem', lines: ['Start with the', 'problem.'] },
	];
	for (const { frame, id, lines } of beats) {
		transport.frame = frame;
		transport.fps = entry.fps;
		const page = document.createElement('div');
		page.innerHTML = renderToStaticMarkup(<Film {...entry.defaultProps} />);
		expect(passage(page)).toBe(id);
		expect([...page.querySelectorAll('[data-type-line]')].map((line) => line.textContent)).toEqual(lines);
		if (frame > 0) expect(passage(picture(problemBaseline, frame - 1))).not.toBe(id);
	}
});

test('the baseline settles its question and small outcome before reading holds and returns to the problem', () => {
	expect(group(picture(problemBaseline, 294), 'focus').style.opacity).not.toBe('1');
	for (const frame of [312, 434]) {
		expect(group(picture(problemBaseline, frame), 'focus').style).toMatchObject({ opacity: '1', translate: '0px 0px' });
	}
	expect(group(picture(problemBaseline, 471), 'context').style.opacity).toBe('0');
	const outcomeHold = picture(problemBaseline, 496);
	expect(group(outcomeHold, 'focus').style).toMatchObject({ fontSize: '132px', fontWeight: '700', opacity: '1', translate: '0px 0px' });
	expect(group(outcomeHold, 'context').style).toMatchObject({ fontSize: '60px', marginTop: '32px', opacity: '1', translate: '0px 0px' });
	expect(picture(problemBaseline, 584).innerHTML).toBe(outcomeHold.innerHTML);
	expect(picture(problemBaseline, 734).innerHTML).toBe(picture(problemBaseline, 627).innerHTML);
	const final = picture(problemBaseline, 884);
	expect(passage(final)).toBe('return-to-problem');
	expect(group(final, 'focus').textContent).toBe('problem.');
	expect(group(final, 'focus').style).toMatchObject({ fontSize: '142px', fontWeight: '700', opacity: '1', translate: '0px 0px' });
	expect(final.querySelector('audio,video')).toBeNull();
});

test('the baseline retains the sample and repeats first, entrance, hold, transition and final pictures across fresh reverse seeks', () => {
	for (const frame of [0, 24, 42, 134, 135, 171, 269]) {
		expect(picture(problemBaseline, frame).innerHTML).toBe(picture(openingContrast, frame).innerHTML);
	}
	const frames = [0, 24, 42, 134, 135, 269, 270, 294, 312, 434, 435, 474, 495, 584, 585, 609, 627, 734, 735, 759, 777, 884];
	const forward = new Map(frames.map((frame) => [frame, picture(problemBaseline, frame).innerHTML]));
	for (const frame of [...frames].reverse()) expect(picture(problemBaseline, frame).innerHTML).toBe(forward.get(frame));
	for (const frame of [495, 270, 884, 0, 627]) expect(picture(problemBaseline, frame).innerHTML).toBe(forward.get(frame));
});
