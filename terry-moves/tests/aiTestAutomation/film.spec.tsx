import { renderToStaticMarkup } from 'react-dom/server';
import fs from 'node:fs';
import path from 'node:path';
import performance from '../../../AI Test Automation/cedar-performance.json';
import { AITestAutomationScene } from '../../src/aiTestAutomation/Scene';
import { captionAt, durationInFrames, filmScript, FPS, sceneAt, STAGE } from '../../src/aiTestAutomation/film';

const tokens = (text: string): string[] => text.toLowerCase().replace(/[’']/g, '').match(/[a-z0-9]+/g) ?? [];
const captions = filmScript.scenes.flatMap((scene) => scene.captionRanges);
const spoken = captions.map((caption) => caption.spoken).join(' ');

describe('AI testing film audiovisual contract', () => {
	it('starts the hook immediately and preserves the actually measured full spoken performance', () => {
		expect(sceneAt(0).id).toBe('hook');
		expect(captionAt(0)?.spoken).toBe('You probably don’t want to do that.');
		expect(captions[0].speechStart).toBeLessThan(0.2);
		expect(tokens(spoken)).toEqual(tokens(performance.transcript));
		expect(tokens(spoken)).toEqual(performance.words.flatMap((word) => tokens(word.word)));
		expect(captions[captions.length - 1].spoken).toContain('with less to maintain');
	});

	it('contains every measured phrase in contiguous frame-aligned readable captions', () => {
		captions.forEach((caption, index) => {
			if (index > 0) expect(caption.start).toBeCloseTo(captions[index - 1].end, 7);
			expect(caption.end).toBeGreaterThan(caption.start);
			expect(caption.start * FPS).toBeCloseTo(Math.round(caption.start * FPS), 7);
			expect(caption.end * FPS).toBeCloseTo(Math.round(caption.end * FPS), 7);
			expect(caption.speechStart).toBeGreaterThanOrEqual(caption.start - 1 / FPS);
			expect(caption.speechEnd).toBeLessThanOrEqual(caption.end + 1 / FPS);
			Object.values(caption.wordCues).forEach((cue) => {
				expect(cue).toBeGreaterThanOrEqual(caption.speechStart);
				expect(cue).toBeLessThanOrEqual(caption.speechEnd);
			});
			expect(captionAt((caption.start + caption.end) / 2)?.text).toBe(caption.text);
		});
		filmScript.scenes.forEach((scene, index) => {
			if (index > 0) expect(scene.start).toBeCloseTo(filmScript.scenes[index - 1].end, 7);
			expect(scene.captionRanges[0].start).toBe(scene.start);
			expect(scene.captionRanges[scene.captionRanges.length - 1].end).toBe(scene.end);
		});
		expect(durationInFrames / FPS).toBe(filmScript.duration);
		expect(filmScript.duration).toBeLessThanOrEqual(75);
		expect(filmScript.duration - captions[captions.length - 1].speechEnd).toBeGreaterThan(1.8);
		expect(STAGE).toEqual({ width: 1080, height: 1350 });
	});

	it('exports the whole narration to SRT, including the engineering claim and ending', () => {
		const srt = fs.readFileSync(path.join(__dirname, '../../../AI Test Automation/ai-test-automation.srt'), 'utf8');
		const lines = srt.split('\n').filter((line) => line && !/^\d+$/.test(line) && !line.includes('-->'));
		expect(tokens(lines.join(' '))).toEqual(tokens(spoken));
		expect(srt).toContain('Reliable test automation requires high-level software engineering.');
		expect(srt).toContain('with less to maintain.');
	});

	it('keeps useful protection on screen throughout and distinguishes observation from maintained code', () => {
		filmScript.scenes.forEach((scene) => {
			const markup = renderToStaticMarkup(<AITestAutomationScene seconds={(scene.start + scene.end) / 2}/>);
			expect(markup).toContain('data-testid="useful-protection"');
			expect(markup).toContain('data-testid="caption-bar"');
		});
		const sandbox = filmScript.scenes.find((scene) => scene.id === 'sandbox')!;
		const markup = renderToStaticMarkup(<AITestAutomationScene seconds={sandbox.end - 0.5}/>);
		expect(markup).toContain('data-testid="isolated-repeatable-environment"');
		expect(markup).toContain('data-testid="reset-control"');
		const investigation = filmScript.scenes.find((scene) => scene.id === 'investigate')!;
		expect(renderToStaticMarkup(<AITestAutomationScene seconds={investigation.start + 1}/>)).toContain('data-testid="finding-card"');
		const optimize = filmScript.scenes.find((scene) => scene.id === 'optimize')!;
		const optimization = renderToStaticMarkup(<AITestAutomationScene seconds={optimize.end - 0.5}/>);
		expect(optimization).toContain('data-testid="focused-unit-check"');
		expect(optimization).toContain('data-testid="retained-wider-protection"');
	});
});
