import { captionAt, captionRanges, durationInFrames, filmScript, FPS, sceneAt } from '../../src/problemDecomposition/film';

describe('problem decomposition film timeline', () => {
	it('opens with the stopped-development question, then distinguishes parts from a useful problem', () => {
		expect(sceneAt(0).id).toBe('hook');
		expect(captionAt(0.2)?.text).toContain('stopped tomorrow');
		const parts = filmScript.scenes.find((scene) => scene.id === 'parts')!;
		const problem = filmScript.scenes.find((scene) => scene.id === 'problem')!;
		expect(sceneAt(parts.start).id).toBe('parts');
		expect(sceneAt(parts.end).id).toBe('problem');
		expect(problem.narration).toContain('split one bill equally');
	});

	it('keeps scene and caption boundaries aligned with the narration timeline', () => {
		filmScript.scenes.forEach((scene, index) => {
			expect(scene.end).toBeGreaterThan(scene.start);
			if (index > 0) expect(scene.start).toBeCloseTo(filmScript.scenes[index - 1].end, 4);
			const captions = captionRanges(scene);
			expect(captions[0].start).toBeCloseTo(scene.start, 4);
			expect(captions[captions.length - 1].end).toBeCloseTo(scene.end, 4);
			captions.forEach((caption, captionIndex) => {
				if (captionIndex > 0) expect(caption.start).toBeCloseTo(captions[captionIndex - 1].end, 4);
				expect(caption.end).toBeGreaterThan(caption.start);
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
