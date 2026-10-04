import { existsSync } from 'fs';
import { resolve } from 'path';
import { FPS } from '@/storyImpact/film';
import { fullFilm } from '@/storyImpact/fullFilm';
import { COVER_FRAMES, COVER_SOURCE_FRAME, releaseFrame, EN_NARRATION } from '@/stories/StoryImpactFilm';
import alignment from '../../public/assets/story-impact/alignment-en.json';

describe('Story Impact release and narration', () => {
	test('opens on the complete cover before restarting the animated film', () => {
		expect(releaseFrame(0)).toBe(COVER_SOURCE_FRAME);
		expect(releaseFrame(COVER_FRAMES - 1)).toBe(COVER_SOURCE_FRAME);
		expect(fullFilm.poseAt(COVER_SOURCE_FRAME).title?.leave).toBe(0);
		expect(fullFilm.poseAt(COVER_SOURCE_FRAME).title?.drops.every((drop) => drop !== null)).toBe(true);
		expect(releaseFrame(COVER_FRAMES)).toBe(0);
		expect(releaseFrame(COVER_FRAMES + fullFilm.durationInFrames - 1)).toBe(fullFilm.durationInFrames - 1);
	});

	test('the generated Cedar voice exists and each spoken clause stays inside its current caption span', () => {
		expect(existsSync(resolve(__dirname, '../../public', EN_NARRATION))).toBe(true);
		expect(alignment.voice).toBe('cedar');
		expect(alignment.durationInFrames).toBe(fullFilm.durationInFrames);
		const captioned = fullFilm.beats.filter((b) => Boolean(b.caption));
		expect(alignment.placements.map((span) => span.name)).toEqual([...captioned.map((b) => b.name), 'finale']);
		for (const span of alignment.placements) {
			const start = Math.ceil(span.speechFrom * FPS);
			const end = Math.floor(span.speechTo * FPS);
			expect(span.speechFrom).toBeGreaterThanOrEqual(span.from);
			expect(span.speechTo).toBeLessThanOrEqual(span.to);
			if (span.name === 'finale') continue;
			const text = fullFilm.captionAt(start).replace(/×/g, 'by').replace(/…/g, '').trim();
			expect(text).toBe(span.text);
			expect(fullFilm.captionAt(end)).toBe(fullFilm.captionAt(start));
		}
	});
});
