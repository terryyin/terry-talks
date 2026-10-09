import { captionAt, durationInFrames, film, sceneAt } from '../../src/tpsAndAiJit/film';
import { filmAt, jitAt, normalized, registerFilms, registration } from './frames';

beforeAll(registerFilms);

it('selects the complete English JIT film from the real Root with the authored seven-scene clock', () => {
	expect(durationInFrames).toBe(2580);
	expect(registration('TPSAndAIJITFilm')).toMatchObject({ id: 'TPSAndAIJITFilm', durationInFrames: 2580, fps: 30, width: 1080, height: 1080 });
	expect(film.scenes.map((scene) => scene.id)).toEqual(['hook', 'house', 'resourceful', 'pull', 'feedback', 'integration', 'closing']);
	expect(film.scenes[0].start).toBe(0);
	expect(film.scenes[film.scenes.length - 1].end).toBe(86);
	const cover = jitAt(0).picture;
	expect(cover.querySelector('[data-scene="hook"]')!.textContent).toContain('Trust');
	expect(cover.querySelector('[data-scene="hook"]')!.textContent).toContain('Just in time');
	expect(normalized(cover.querySelector('[data-testid="film-caption"]')!.textContent)).toBe('AI can produce more. Can you trust your team to respond?');
	expect(normalized(jitAt(5.5).picture.querySelector('[data-testid="film-caption"]')!.textContent)).toBe('More output alone does not earn that trust.');
	expect(jitAt(0).sequences.map(({ from, durationInFrames: frames }) => [from, frames])).toEqual(film.scenes.map((scene) => [Math.round(scene.start * film.fps), Math.round((scene.end - scene.start) * film.fps)]));
	for (const [index, scene] of film.scenes.entries()) {
		if (index) {
			expect(scene.start).toBe(film.scenes[index - 1].end);
			expect(sceneAt(scene.start - 1 / film.fps).id).toBe(film.scenes[index - 1].id);
		}
		for (const seconds of [scene.start, (scene.start + scene.end) / 2, scene.end - 1 / film.fps]) {
			const { picture } = jitAt(seconds);
			expect(sceneAt(seconds).id).toBe(scene.id);
			expect([...picture.querySelectorAll('[data-scene]')].map((node) => node.getAttribute('data-scene'))).toEqual([scene.id]);
			expect(normalized(picture.querySelector('[data-scene]')!.textContent)).toContain(normalized(scene.heading));
			expect(picture.textContent).not.toMatch(/\bJIT\b/);
			const logo = picture.querySelector<HTMLImageElement>('img[src$="odd-e-logo.png"]')!;
			expect(logo.style.left).toBe('934px');
			expect(logo.style.top).toBe('40px');
			expect(picture.querySelector('audio')!.getAttribute('src')).toContain('assets/tps-and-ai/score.wav');
		}
	}
});

it('runs the authored caption wording and natural line breaks at starts, midpoints and exclusive ends', () => {
	for (const scene of film.scenes) {
		for (const caption of scene.captionRanges) {
			expect(caption.start).toBeGreaterThanOrEqual(scene.start);
			expect(caption.end).toBeLessThanOrEqual(scene.end);
			for (const seconds of [caption.start, (caption.start + caption.end) / 2, caption.end - 1 / film.fps]) {
				const rendered = jitAt(seconds).picture.querySelector('[data-testid="film-caption"]')!;
				expect(rendered.getAttribute('lang')).toBe('en');
				expect(normalized(rendered.textContent)).toBe(caption.spoken);
				expect(rendered.textContent).not.toMatch(/\bJIT\b/);
				const lines = rendered.textContent!.split('\n');
				expect(lines).toHaveLength(caption.lineBreakAfter === undefined ? 1 : 2);
				if (lines.length === 2) expect(lines[0]).not.toMatch(/\b(?:the|a|an)$/i);
			}
			expect(captionAt(caption.end)).not.toBe(caption);
			expect(normalized(jitAt(caption.end).picture.querySelector('[data-testid="film-caption"]')!.textContent)).toBe(captionAt(caption.end)?.spoken ?? '');
		}
	}
});

it('retains the full original illustrations for the stockpile, resourceful response, user need and feedback', () => {
	for (const [id, filename] of [
		['hook', 'green-light-stockpile.png'],
		['resourceful', 'jit-resourceful-response.png'],
		['pull', 'pull-customer-need.png'],
		['feedback', 'pull-customer-feedback.png'],
	] as const) {
		const scene = film.scenes.find((entry) => entry.id === id)!;
		const image = jitAt((scene.start + scene.end) / 2).picture.querySelector<HTMLImageElement>(`img[src$="${filename}"]`)!;
		expect(image).not.toBeNull();
		expect(image.style.objectFit).toBe('contain');
	}
	const integration = film.scenes.find((scene) => scene.id === 'integration')!;
	expect(jitAt((integration.start + integration.end) / 2).picture.querySelector('img[src$="integration-coordination.png"]')).not.toBeNull();
});

it('selects need, teams, stop, collaboration and the coherent result in the authored panorama order', () => {
	for (const [seconds, expected] of [[62, 'need'], [64, 'teams'], [67, 'stop'], [69, 'collaboration'], [73, 'result']] as const) {
		const focus = jitAt(seconds).picture.querySelector<HTMLElement>('[data-focus]')!;
		expect(focus.getAttribute('data-focus')).toBe(expected);
		expect(focus.style.clipPath).toBe(expected === 'need' ? 'polygon(0 0, 100% 0, 100% 60%, 72% 60%, 72% 100%, 0 100%)' : '');
	}
	for (const seconds of [78, 83, 2579 / 30]) {
		const focus = jitAt(seconds).picture.querySelector<HTMLElement>('[data-focus]')!;
		expect(focus.getAttribute('data-focus')).toBe('result');
		expect(focus.style.clipPath).toBe('');
	}
});

it('emphasizes JIT in the selected house while the registered Jidoka house preserves its default pillar', () => {
	const jitHouse = film.scenes.find((scene) => scene.id === 'house')!;
	const jit = jitAt((jitHouse.start + jitHouse.end) / 2).picture;
	const jidoka = filmAt('TPSHouse', 0).picture;
	expect(jit.querySelector('[data-testid="jit-pillar"]')).not.toBeNull();
	expect(jidoka.querySelector('[data-testid="jidoka-pillar"]')).not.toBeNull();
	expect(jit.querySelector('[data-testid="jit-pillar"]')!.getAttribute('stroke')).toBe('#b33a2b');
	expect(jit.querySelector('[data-testid="jidoka-pillar"]')!.getAttribute('stroke')).toBe('#5c564e');
	expect(jidoka.querySelector('[data-testid="jidoka-pillar"]')!.getAttribute('stroke')).toBe('#b33a2b');
	expect(jidoka.querySelector('[data-testid="jit-pillar"]')).toBeNull();
});

it('ends on Trust the team and holds the exact credit with no captions from 83 seconds through the last frame', () => {
	expect(normalized(jitAt(78).picture.querySelector('[data-testid="film-caption"]')!.textContent)).toBe('Build capability to respond, so you can trust the team.');
	const creditAt = (seconds: number) => {
		const picture = jitAt(seconds).picture;
		expect(picture.querySelector('[data-scene="closing"]')).not.toBeNull();
		expect(picture.querySelector('[data-scene="closing"]')!.textContent).toContain('Trust the team.');
		expect(picture.querySelector('[data-testid="film-caption"]')!.textContent).toBe('');
		const credit = picture.querySelector('[data-testid="film-credits"]')!;
		expect(credit.textContent).toBe('Idea and film from Terry');
		return credit.outerHTML;
	};
	const settledCredit = creditAt(83);
	for (const seconds of [84.5, 85, 2579 / 30]) expect(creditAt(seconds)).toBe(settledCredit);
});
