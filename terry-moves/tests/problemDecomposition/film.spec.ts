import { captionAt, durationInFrames, filmScript, FPS, sceneAt } from '../../src/problemDecomposition/film';

describe('problem decomposition film timeline', () => {
	it('opens in the Story Impact world, then distinguishes solution parts from customer problems', () => {
		expect(sceneAt(0).id).toBe('hook');
		expect(captionAt(filmScript.coverDuration + 0.3)?.spoken).toContain('wish for a better world');
		expect(filmScript.scenes[0].captionRanges[0].speechStart).toBeGreaterThan(filmScript.coverDuration);
		const parts = filmScript.scenes.find((scene) => scene.id === 'parts')!;
		const problem = filmScript.scenes.find((scene) => scene.id === 'problem')!;
		expect(sceneAt(parts.start).id).toBe('parts');
		expect(sceneAt(parts.end).id).toBe('problem');
		expect(problem.captionRanges[0].spoken).toContain('splits customer problems');
	});

	it('keeps scene and caption boundaries aligned with the narration timeline', () => {
		filmScript.scenes.forEach((scene, index) => {
			expect(scene.end).toBeGreaterThan(scene.start);
			if (index > 0) expect(scene.start).toBeCloseTo(filmScript.scenes[index - 1].end, 4);
			const captions = scene.captionRanges;
			expect(captions[0].start).toBeCloseTo(scene.start, 4);
			expect(captions[captions.length - 1].end).toBeCloseTo(scene.end, 4);
			captions.forEach((caption, captionIndex) => {
				if (captionIndex > 0) expect(caption.start).toBeCloseTo(captions[captionIndex - 1].end, 4);
				expect(caption.end).toBeGreaterThan(caption.start);
				expect(caption.speechStart).toBeGreaterThanOrEqual(caption.start - 1 / FPS);
				expect(caption.speechEnd).toBeLessThanOrEqual(caption.end + 1 / FPS);
				Object.values(caption.wordCues).forEach((time) => {
					expect(time).toBeGreaterThanOrEqual(caption.speechStart);
					expect(time).toBeLessThanOrEqual(caption.speechEnd);
				});
				expect(captionAt((caption.start + caption.end) / 2)?.text).toBe(caption.text);
			});
		});
	});

	it('ends within two minutes without cutting the final scene', () => {
		expect(filmScript.duration).toBeLessThanOrEqual(120);
		expect(durationInFrames / FPS).toBeGreaterThanOrEqual(filmScript.scenes[filmScript.scenes.length - 1].end);
		expect(sceneAt((durationInFrames - 1) / FPS).id).toBe('end');
	});
});
