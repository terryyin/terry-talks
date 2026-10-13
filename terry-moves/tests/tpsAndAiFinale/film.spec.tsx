import { readFileSync } from 'node:fs';
import path from 'node:path';
import { assetPathFor, captionAt, durationInFrames, film, sceneAt, sceneById } from '../../src/tpsAndAiFinale/film';
import { filmAt, normalized, registerFilms, registration } from '../tpsAndAiJit/frames';

const finaleAt = (seconds: number) => filmAt('TPSAndAIFinaleFilm', seconds);
beforeAll(registerFilms);

it('registers a complete square English finale and runs its contiguous eight-scene clock through the real Root', () => {
	expect(registration('TPSAndAIFinaleFilm')).toMatchObject({ durationInFrames: 2580, fps: 30, width: 1080, height: 1080 });
	expect(durationInFrames).toBe(2580);
	expect(film.scenes.map(({ id }) => id)).toEqual(['cover', 'free', 'entrust', 'agency', 'respect', 'improve', 'cycle', 'closing']);
	expect(film.scenes[0].start).toBe(0);
	expect(film.scenes[film.scenes.length - 1].end).toBe(86);
	const opening = finaleAt(0);
	expect(normalized(opening.picture.querySelector('[data-scene]')!.textContent)).toContain('Freedom and trust');
	expect(opening.picture.querySelector<HTMLElement>('[data-scene] > div')!.style.opacity).not.toBe('0');
	expect(opening.picture.querySelector('img[src$="jidoka-jit-balanced-scale.png"]')).not.toBeNull();
	expect(opening.sequences.map(({ from, durationInFrames: frames }) => [from, frames])).toEqual(film.scenes.map((scene) => [Math.round(scene.start * film.fps), Math.round((scene.end - scene.start) * film.fps)]));
	for (const [index, scene] of film.scenes.entries()) {
		if (index) expect(scene.start).toBe(film.scenes[index - 1].end);
		for (const seconds of [scene.start, (scene.start + scene.end) / 2, scene.end - 1 / film.fps]) {
			const picture = finaleAt(seconds).picture;
			expect(sceneAt(seconds).id).toBe(scene.id);
			expect([...picture.querySelectorAll('[data-scene]')].map((entry) => entry.getAttribute('data-scene'))).toEqual([scene.id]);
			const logo = picture.querySelector<HTMLImageElement>('img[src$="odd-e-logo.png"]')!;
			expect(logo.style).toMatchObject({ left: '934px', top: '40px' });
			expect(picture.querySelector('audio[src$="score.wav"]')).not.toBeNull();
			expect(picture.querySelector('audio[src$="tps-and-ai-finale/narration-en.wav"]')).not.toBeNull();
			expect(picture.textContent).not.toMatch(/\bJIT\b/);
		}
	}
});

it('burns in each source clause with its authored phrase break at starts, midpoints, last frames and exclusive ends', () => {
	for (const scene of film.scenes) {
		for (const caption of scene.captionRanges) {
			expect(caption.start).toBeGreaterThanOrEqual(scene.start);
			expect(caption.end).toBeLessThanOrEqual(scene.end);
			expect(caption.end).toBeGreaterThan(caption.start);
			for (const seconds of [caption.start, (caption.start + caption.end) / 2, caption.end - 1 / film.fps]) {
				const rendered = finaleAt(seconds).picture.querySelector<HTMLElement>('[data-testid="film-caption"]')!;
				expect(rendered.getAttribute('lang')).toBe('en');
				expect(normalized(rendered.textContent)).toBe(caption.spoken);
				expect(rendered.textContent!.split('\n')).toHaveLength(caption.lineBreakAfter === undefined ? 1 : 2);
				expect(rendered.style).toMatchObject({ top: '856px', height: '154px', fontSize: '56px' });
			}
			expect(captionAt(caption.end)).not.toBe(caption);
			expect(normalized(finaleAt(caption.end).picture.querySelector('[data-testid="film-caption"]')!.textContent)).toBe(captionAt(caption.end)?.spoken ?? '');
		}
	}
});

it('keeps Toyota Way separate from the operational pillars and connects responsibility and authority to the same people', () => {
	const agency = finaleAt(31).picture;
	expect(normalized(agency.querySelector('[data-scene]')!.textContent)).toContain('Responsibility + authority');
	expect(normalized(agency.querySelector('[data-scene]')!.textContent)).toContain('With the same people.');
	expect(agency.querySelector('[data-illustration-view="people-and-shared-product"]')).not.toBeNull();
	for (const [id, heading] of [['respect', 'Respect for People'], ['improve', 'Continuous Improvement']] as const) {
		const scene = sceneById(id);
		const picture = finaleAt(scene.start + 1).picture;
		expect(normalized(picture.querySelector('[data-scene]')!.textContent)).toContain('Toyota Way');
		expect(normalized(picture.querySelector('[data-scene]')!.textContent)).toContain(heading);
		expect(film.sources.way.boundary).toContain('broader Toyota Way principles');
	}
});

it('preserves every source illustration and keeps each clause tied to an explicit declared source', () => {
	const repository = path.resolve(__dirname, '../../..');
	for (const caption of film.scenes.flatMap((scene) => scene.captionRanges)) {
		expect(caption.sourceIds.length).toBeGreaterThan(0);
		expect(caption.sourceIds.every((id) => id in film.sources)).toBe(true);
	}
	for (const art of film.artwork) {
		const retained = readFileSync(path.join(repository, 'terry-moves/public', assetPathFor(art.file)));
		expect(retained.equals(readFileSync(path.join(repository, art.source)))).toBe(true);
	}
	expect(readFileSync(path.join(repository, 'terry-moves/public/assets/tps-and-ai/odd-e-logo.png')).equals(readFileSync(path.join(repository, 'themes/odd-e/images/odd-e-logo.png')))).toBe(true);
});

it('makes a final conclusion and holds the exact credit without subtitles for the final three seconds', () => {
	const scene = sceneById('closing');
	const lastCaption = scene.captionRanges[scene.captionRanges.length - 1];
	expect(normalized(finaleAt(lastCaption.start).picture.querySelector('[data-scene]')!.textContent)).toContain('Build the product. Grow the people. Keep learning.');
	let credit: string | undefined;
	for (const seconds of [83, 84.5, 85.9, 2579 / 30]) {
		const picture = finaleAt(seconds).picture;
		expect(picture.querySelector('[data-testid="film-caption"]')!.textContent).toBe('');
		const rendered = picture.querySelector('[data-testid="film-credits"]')!;
		expect(rendered.textContent).toBe('Idea and film from Terry');
		if (credit) expect(rendered.outerHTML).toBe(credit);
		credit = rendered.outerHTML;
	}
});
