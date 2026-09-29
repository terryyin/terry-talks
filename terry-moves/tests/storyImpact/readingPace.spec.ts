import { Beat, FPS } from '@/storyImpact/film';
import { fullFilm, fullFilmBeats } from '@/storyImpact/fullFilm';
import { paced, PAUSE_SECONDS, readingSeconds, syllables } from '@/storyImpact/readingPace';
import { productSpace } from '@/storyImpact/scene';

const { beatRange, captionAt, durationInFrames, poseAt } = fullFilm;

// Seconds a caption shows in the full film.
const shownSeconds = (caption: string) => {
	let frames = 0;
	for (let f = 0; f < durationInFrames; f++) if (captionAt(f) === caption) frames++;
	return frames / FPS;
};

describe('reading pace', () => {
	test('counts syllables in the film\'s own words', () => {
		expect(syllables('a software product is a space: what it does × how it\'s built.')).toBe(13);
		expect(syllables('It\'s fuzzy. It doesn\'t care about our boundaries.')).toBe(13);
		expect(syllables('Behavior gets messy. Structure wobbles.')).toBe(10);
		expect(syllables('…and bring new ideas. The backlog is reordered.')).toBe(13);
		expect(syllables('Customer value: people feel the new behavior…')).toBe(13);
		expect(syllables('One story touches many features…')).toBe(9);
		expect(syllables('Spent stories pile up in History, out of the way.')).toBe(13);
	});

	test('a caption needs a lead-in plus its syllables at 3.5 a second, and never less than 3 s', () => {
		expect(readingSeconds('Spent stories pile up in History, out of the way.')).toBeCloseTo(1 + 13 / 3.5);
		expect(readingSeconds('More stories come and go…')).toBe(3);
		expect(readingSeconds('')).toBe(0);
	});

	test('example 1: a caption that was too short gets its reading time, and its beat still ends in History', () => {
		const caption = 'Spent stories pile up in History, out of the way.';
		expect(shownSeconds(caption)).toBeGreaterThanOrEqual(readingSeconds(caption));
		expect(shownSeconds(caption)).toBeLessThan(readingSeconds(caption) + 0.1);
		const authored = fullFilmBeats.find((b) => b.name === 'idea-history')!;
		const { from, durationInFrames: frames } = beatRange('idea-history');
		expect(frames).toBeGreaterThan(Math.round(authored.seconds * FPS));
		expect(poseAt(from + frames - 1)).toEqual(authored.pose(1));
	});

	test('example 2: a caption whose span is already long enough keeps it, less its breath', () => {
		expect(shownSeconds('More stories come and go…') + PAUSE_SECONDS).toBeCloseTo(7.8, 1);
	});

	test('every caption shows at least as long as its hand-set span did, and every beat ends on its authored pose', () => {
		const authoredSpans = new Map<string, number>();
		let current = '';
		fullFilmBeats.forEach((b) => {
			if (b.caption !== undefined) current = b.caption;
			authoredSpans.set(current, (authoredSpans.get(current) ?? 0) + b.seconds);
		});
		authoredSpans.forEach((seconds, caption) => {
			const breath = fullFilmBeats.find((b) => b.caption === caption)?.pause ?? 0;
			if (caption !== '') expect({ caption, kept: shownSeconds(caption) + breath >= seconds - 1e-6 }).toEqual({ caption, kept: true });
		});
		fullFilmBeats.forEach((b) => {
			const { from, durationInFrames: frames } = beatRange(b.name);
			expect({ name: b.name, same: poseAt(from + frames - 1) }).toEqual({ name: b.name, same: b.pose(1) });
		});
	});

	test('example 4: rewording a caption re-times its span by the added syllables', () => {
		const still = (name: string, seconds: number, caption?: string): Beat => ({ name, seconds, caption, pose: productSpace });
		const span = (caption: string) => paced([still('a', 1, caption), still('b', 1)]).reduce((n, b) => n + b.seconds, 0);
		const short = 'The idea fits the same domain and it comes cheap.';
		const longer = 'The idea fits the same domain and so it comes cheap and quick.';
		expect(span(longer) - span(short)).toBeCloseTo((syllables(longer) - syllables(short)) / 3.5, 1);
	});
});
