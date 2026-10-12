import { group, passage, picture, transport } from './renderedFilm';
import { renderToStaticMarkup } from 'react-dom/server';
import { feedbackExample, problemBaseline, problemRevision } from '../../src/typographyFilm/script';
import { TypographyFeedbackExampleComposition, TypographyFilm, TypographyProblemRevisionComposition } from '../../src/typographyFilm/TypographyFilm';

test('the named revision and second idea register the same film with their own authored durations', () => {
	transport.registrations = [];
	renderToStaticMarkup(<><TypographyProblemRevisionComposition /><TypographyFeedbackExampleComposition /></>);
	expect(transport.registrations).toMatchObject([
		{ id: 'TypographyProblemRevision', component: TypographyFilm, durationInFrames: 930, fps: 30, width: 1080, height: 1080 },
		{ id: 'TypographyFeedbackExample', component: TypographyFilm, durationInFrames: 240, fps: 30, width: 1080, height: 1080 },
	]);
	const pages = transport.registrations.map(({ component: Film, defaultProps, fps }, index) => {
		transport.frame = index === 0 ? 525 : 60;
		transport.fps = fps;
		const page = document.createElement('div');
		page.innerHTML = renderToStaticMarkup(<Film {...defaultProps} />);
		return page;
	});
	expect(group(pages[0], 'context').textContent).toBe('for tonight.');
	expect(group(pages[0], 'context').style).toMatchObject({ fontSize: '112px', fontWeight: '700', opacity: '1' });
	expect([...pages[1].querySelectorAll('[data-type-line]')].map((line) => line.textContent)).toEqual(['Make', 'feedback', 'small.']);
});

test('the script-only revision moves visible emphasis from the seat to the deadline without changing the words', () => {
	const original = picture(problemBaseline, 525);
	const revised = picture(problemRevision, 525);
	for (const page of [original, revised]) {
		expect([...page.querySelectorAll('[data-type-line]')].map((line) => line.textContent)).toEqual(['Find', 'a seat', 'for tonight.']);
	}
	expect(group(original, 'focus').style).toMatchObject({ fontSize: '132px', fontWeight: '700', letterSpacing: '-5px', color: 'rgb(220, 227, 189)' });
	expect(group(revised, 'focus').style).toMatchObject({ fontSize: '72px', fontWeight: '400', letterSpacing: '-2px', color: 'rgb(243, 239, 231)' });
	expect(group(original, 'context').style).toMatchObject({ fontSize: '60px', fontWeight: '400', letterSpacing: '-1px', marginTop: '32px', color: 'rgb(243, 239, 231)' });
	expect(group(revised, 'context').style).toMatchObject({ fontSize: '112px', fontWeight: '700', letterSpacing: '-3px', marginTop: '44px', color: 'rgb(220, 227, 189)' });
});

test('the revised pause, arrival and settled hold change the actual transition rather than only the script values', () => {
	const pause = picture(problemRevision, 494);
	expect(group(pause, 'focus').style).toMatchObject({ opacity: '1', translate: '0px 0px' });
	expect(group(pause, 'context').style.opacity).toBe('0');
	expect(group(pause, 'context').style.translate).toBe('0px 22px');
	expect(group(picture(problemBaseline, 494), 'context').style.opacity).toBe('1');
	const arriving = group(picture(problemRevision, 501), 'context');
	expect(Number(arriving.style.opacity)).toBeGreaterThan(0);
	expect(Number(arriving.style.opacity)).toBeLessThan(1);
	expect(arriving.style.translate).not.toBe('0px 0px');
	expect(group(picture(problemRevision, 511), 'context').style.opacity).not.toBe('1');
	const revealed = group(picture(problemRevision, 516), 'context');
	expect(revealed.style.opacity).toBe('1');
	expect(revealed.style.translate).not.toBe('0px 0px');
	const held = picture(problemRevision, 522);
	expect(group(held, 'context').style).toMatchObject({ opacity: '1', translate: '0px 0px' });
	expect(picture(problemRevision, 629).innerHTML).toBe(held.innerHTML);
	expect(passage(picture(problemBaseline, 585))).toBe('smaller-step');
	expect(passage(picture(problemRevision, 629))).toBe('useful-outcome');
	expect(passage(picture(problemRevision, 630))).toBe('smaller-step');
	expect(passage(picture(problemRevision, 779))).toBe('smaller-step');
	expect(passage(picture(problemRevision, 780))).toBe('return-to-problem');
});

test('the revision preserves every other passage and the retained baseline remains unchanged after revised sampling', () => {
	const retained = [0, 24, 134, 135, 269, 270, 312, 434, 435, 474, 495, 584, 585, 627, 734, 735, 777, 884];
	const before = new Map(retained.map((frame) => [frame, picture(problemBaseline, frame).innerHTML]));
	for (const frame of [929, 501, 0, 630, 522, 435]) picture(problemRevision, frame);
	for (const frame of retained) expect(picture(problemBaseline, frame).innerHTML).toBe(before.get(frame));
	for (const frame of [0, 24, 134, 135, 269, 270, 294, 312, 434]) {
		expect(picture(problemRevision, frame).innerHTML).toBe(picture(problemBaseline, frame).innerHTML);
	}
	for (const frame of [585, 609, 627, 734, 735, 759, 777, 884]) {
		expect(picture(problemRevision, frame + 45).innerHTML).toBe(picture(problemBaseline, frame).innerHTML);
	}
	const frames = [0, 494, 501, 516, 522, 629, 630, 780, 929];
	const forward = new Map(frames.map((frame) => [frame, picture(problemRevision, frame).innerHTML]));
	for (const frame of [...frames].reverse()) expect(picture(problemRevision, frame).innerHTML).toBe(forward.get(frame));
});

test('another idea consumes its own two-line grouping, spacing and rhythm without changing the renderer', () => {
	const first = picture(feedbackExample, 60);
	expect([...group(first, 'lead-in').querySelectorAll('[data-type-line]')].map((line) => line.textContent)).toEqual(['Make', 'feedback']);
	expect(group(first, 'lead-in').style).toMatchObject({ fontSize: '78px', lineHeight: '1.02' });
	expect(group(first, 'focus').textContent).toBe('small.');
	expect(group(first, 'focus').style).toMatchObject({ fontSize: '140px', fontWeight: '700', marginTop: '36px', opacity: '1', translate: '0px 0px' });
	expect(group(picture(feedbackExample, 23), 'focus').style.opacity).toBe('0');
	expect(group(picture(feedbackExample, 30), 'focus').style.opacity).not.toBe('1');
	expect(passage(picture(feedbackExample, 119))).toBe('feedback-small');
	expect(passage(picture(feedbackExample, 120))).toBe('feedback-useful');
	const final = picture(feedbackExample, 239);
	expect([...final.querySelectorAll('[data-type-line]')].map((line) => line.textContent)).toEqual(['Make it', 'useful.']);
	expect(group(final, 'focus').style).toMatchObject({ fontSize: '132px', marginTop: '48px', opacity: '1', translate: '0px 0px' });
	expect(final.innerHTML).toBe(picture(feedbackExample, 159).innerHTML);
});
