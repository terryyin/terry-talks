import { renderToStaticMarkup } from 'react-dom/server';
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import performance from '../../../AI Test Automation/cedar-performance.json';
import { AITestAutomationScene } from '../../src/aiTestAutomation/Scene';
import { captionAt, durationInFrames, filmScript, FPS, sceneAt, STAGE } from '../../src/aiTestAutomation/film';

const tokens = (text: string): string[] => text.toLowerCase().replace(/[’']/g, '').match(/[a-z0-9]+/g) ?? [];
const captions = filmScript.scenes.flatMap((scene) => scene.captionRanges);
const spoken = captions.map((caption) => caption.spoken).join(' ');

describe('AI testing film audiovisual contract', () => {
	it('asks the question before the hook and preserves the complete actual spoken performance', () => {
		expect(sceneAt(0).id).toBe('hook');
		expect(captionAt(0)?.spoken).toBe('Ask AI to write more tests?');
		expect(captions[1].spoken).toBe('You probably don’t want to do that.');
		expect(captions[0].speechStart).toBeLessThan(0.2);
		expect(tokens(spoken)).toEqual(tokens(performance.transcript));
		expect(tokens(spoken)).toEqual(tokens(performance.unpromptedTranscript));
		expect(tokens(spoken)).toEqual(performance.words.flatMap((word) => tokens(word.word)));
		const take = fs.readFileSync(path.join(__dirname, '../../public/assets/ai-test-automation/cedar-take.wav'));
		expect(createHash('sha256').update(take).digest('hex')).toBe(performance.takeSha256);
		expect(captions[captions.length - 1].spoken).toBe('Less to carry. Fewer bugs to chase.');
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
		expect(filmScript.duration).toBeLessThanOrEqual(85);
		expect(filmScript.duration - captions[captions.length - 1].speechEnd).toBeGreaterThan(1.8);
		expect(STAGE).toEqual({ width: 1080, height: 1350 });
	});

	it('exports purpose and proof before the code objection, and the complete stop-and-fix recovery to SRT', () => {
		const srt = fs.readFileSync(path.join(__dirname, '../../../AI Test Automation/ai-test-automation.srt'), 'utf8');
		const lines = srt.split('\n').filter((line) => line && !/^\d+$/.test(line) && !line.includes('-->'));
		expect(tokens(lines.join(' '))).toEqual(tokens(spoken));
		expect(srt.indexOf('Tests define what your code should do: purpose.')).toBeLessThan(srt.indexOf('But first, they’re more code.'));
		expect(srt.indexOf('And show whether it does: proof.')).toBeLessThan(srt.indexOf('But first, they’re more code.'));
		expect(srt).toContain('Test automation requires high-level software engineering—and must preserve the original intent.');
		expect(srt).toContain('Stop adding complexity.');
		expect(srt).toContain('confirm fixes, explore for bugs,');
		expect(srt).toContain('and check that known behavior still works.');
		expect(srt).toContain('It’s a compromise.');
		expect(srt).toContain('No AI needed to run it.');
		expect(srt).toContain('For new features, express intent in tests first.');
		expect(srt.toLowerCase()).not.toContain('targeted');
		expect(srt).toContain('Less to carry. Fewer bugs to chase.');
	});

	it('distinguishes hands-on observation from maintained code and retains essential wider protection while simplifying', () => {
		filmScript.scenes.forEach((scene) => {
			const markup = renderToStaticMarkup(<AITestAutomationScene seconds={(scene.start + scene.end) / 2}/>);
			expect(markup).toContain('data-testid="caption-bar"');
		});
		const sandbox = filmScript.scenes.find((scene) => scene.id === 'sandbox')!;
		const markup = renderToStaticMarkup(<AITestAutomationScene seconds={sandbox.end - 0.5}/>);
		expect(markup).toContain('data-testid="isolated-repeatable-environment"');
		expect(markup).toContain('data-testid="reset-control"');
		const investigation = filmScript.scenes.find((scene) => scene.id === 'investigate')!;
		const repair = renderToStaticMarkup(<AITestAutomationScene seconds={investigation.end - 0.5}/>);
		expect(repair).toContain('data-testid="finding-card"');
		expect(repair).toContain('data-current-work="repair-reload"');
		expect(repair).not.toContain('data-testid="test-card"');
		const optimize = filmScript.scenes.find((scene) => scene.id === 'optimize')!;
		const optimization = renderToStaticMarkup(<AITestAutomationScene seconds={optimize.end - 0.5}/>);
		expect(optimization).toContain('data-testid="focused-unit-check"');
		expect(optimization).toContain('data-testid="retained-wider-protection"');
	});
});
