import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import { captionAt, cue, durationInFrames, film, loomFrameAt, sceneAt } from '../../src/tpsAndAi/film';
import { Captions, Shot } from '../../src/tpsAndAi/Frame';
import { HookPicture } from '../../src/tpsAndAi/Hook';
import { HousePicture } from '../../src/tpsAndAi/House';
import { LoomPicture } from '../../src/tpsAndAi/Loom';
import { PairedPainting, ContrastPicture } from '../../src/tpsAndAi/Contrast';
import { JudgmentPicture } from '../../src/tpsAndAi/Judgment';
import { MinimalismPicture } from '../../src/tpsAndAi/Minimalism';
import { ClosingPicture } from '../../src/tpsAndAi/Closing';
import { FilmLanguage, FilmLanguageProvider } from '../../src/tpsAndAi/language';

jest.mock('remotion', () => ({
	...jest.requireActual('remotion'),
	Img: (props: React.ComponentProps<'img'>) => React.createElement('img', props),
	Freeze: ({ frame, children }: { frame: number; children: React.ReactNode }) => <div data-freeze-frame={frame}>{children}</div>,
	OffthreadVideo: (props: React.ComponentProps<'video'>) => React.createElement('video', props),
}));
const picture = (node: React.ReactNode) => {
	const element = document.createElement('div');
	element.innerHTML = renderToStaticMarkup(node);
	return element;
};
const parseSubtitles = (srt: string) => srt.trim().split('\n\n').map((entry) => {
	const [index, interval, ...text] = entry.split('\n');
	const [start, end] = interval.split(' --> ').map((stamp) => {
		const [h, m, s, ms] = stamp.split(/[:,]/).map(Number);
		return h * 3600 + m * 60 + s + ms / 1000;
	});
	return { index: Number(index), start, end, text: text.join('\n') };
});
const exporterWrappers = [
	['tps-and-ai', 'TPS and AI', 'film-en.srt'],
	['ai-test-automation', 'AI Test Automation', 'ai-test-automation.srt'],
	['problem-decomposition', 'Problem Decomposition', 'problem-decomposition.srt'],
	['problem-decomposition-remake', 'Problem Decomposition Remake', 'problem-decomposition-remake.srt'],
];
const inDisposableRepository = (run: (repository: string) => void) => {
	const checkout = path.resolve(process.cwd(), '..');
	const repository = mkdtempSync(path.join(os.tmpdir(), 'tps-subtitles-'));
	try {
		for (const directory of ['scripts', 'terry-moves/out', ...exporterWrappers.map(([, directory]) => directory)]) mkdirSync(path.join(repository, directory), { recursive: true });
		for (const script of ['film-subtitles.mjs', ...exporterWrappers.map(([wrapper]) => `${wrapper}-subtitles.mjs`)]) copyFileSync(path.join(checkout, 'scripts', script), path.join(repository, 'scripts', script));
		for (const [, directory] of exporterWrappers) copyFileSync(path.join(checkout, directory, 'film-script.json'), path.join(repository, directory, 'film-script.json'));
		run(repository);
	} finally {
		rmSync(repository, { recursive: true, force: true });
	}
};
const tpsOutputs = (repository: string, language: FilmLanguage) => ({
	source: path.join(repository, `TPS and AI/film-${language.toLowerCase()}.srt`),
	delivery: path.join(repository, `terry-moves/out/tps-and-ai-jidoka-${language.toLowerCase()}.srt`),
});

describe('the actual Jidoka film', () => {
	it('selects incoming scenes and captions at the authored contiguous boundaries', () => {
		expect(durationInFrames).toBe(2580);
		expect(film.duration).toBeGreaterThanOrEqual(60);
		expect(film.duration).toBeLessThanOrEqual(90);
		film.scenes.forEach((scene, index) => {
			expect(sceneAt(scene.start).id).toBe(scene.id);
			if (index) {
				expect(scene.start).toBe(film.scenes[index - 1].end);
				expect(sceneAt(scene.start - 1 / film.fps).id).toBe(film.scenes[index - 1].id);
			}
			scene.captionRanges.forEach((caption) => {
				expect(captionAt(caption.start)).toBe(caption);
				expect(captionAt(caption.end)).not.toBe(caption);
				expect(caption.start).toBeGreaterThanOrEqual(scene.start);
				expect(caption.end).toBeLessThanOrEqual(scene.end);
				expect(caption.sourceIds.every((id) => id in film.sources)).toBe(true);
			});
		});
	});

	it('keeps the authored caption wording in no more than two natural display lines', () => {
		const displayed = picture(<Captions seconds={0} />).textContent;
		expect(displayed).toBe('How do you know your\norganization is using AI well?');
		for (const caption of film.scenes.flatMap((scene) => scene.captionRanges)) {
			const lines = picture(<Captions seconds={caption.start} />).textContent!.split('\n');
			expect(lines.join(' ')).toBe(caption.spoken);
			expect(lines.length).toBeLessThanOrEqual(2);
			if (lines.length > 1) expect(lines[0]).not.toMatch(/\b(?:the|a|an)$/i);
			for (const language of ['ja', 'zh-Hant', 'th'] as const) {
				const localized = picture(<FilmLanguageProvider language={language}><Captions seconds={caption.start} /></FilmLanguageProvider>);
				expect(localized.textContent).toBe(caption.translations[language]);
				expect(localized.textContent!.split('\n').length).toBeLessThanOrEqual(2);
			}
		}
		expect(picture(<FilmLanguageProvider language="ja"><Captions seconds={0} /></FilmLanguageProvider>).textContent).toBe('組織がAIをうまく使えているか、\nどうすればわかる？');
		expect(picture(<FilmLanguageProvider language="zh-Hant"><Captions seconds={0} /></FilmLanguageProvider>).textContent).toBe('如何判斷組織\n有沒有善用 AI？');
	});

	it.each<FilmLanguage>(['en', 'ja', 'zh-Hant', 'th'])('exports exactly the %s intervals and text selected by the embedded caption consumer', (language) => {
		inDisposableRepository((repository) => {
			const { source, delivery } = tpsOutputs(repository, language);
			for (const file of [source, delivery]) writeFileSync(file, 'stale subtitles');
			execFileSync(process.execPath, [path.join(repository, 'scripts/tps-and-ai-subtitles.mjs'), language]);
			const srt = readFileSync(source, 'utf8');
			expect(readFileSync(delivery, 'utf8')).toBe(srt);
			const subtitles = parseSubtitles(srt);
			const captions = film.scenes.flatMap((scene) => scene.captionRanges);
			expect(subtitles).toHaveLength(captions.length);
			subtitles.forEach((subtitle, index) => {
				const caption = captions[index];
				expect(subtitle).toEqual({ index: index + 1, start: caption.start, end: caption.end, text: language === 'en' ? caption.spoken : caption.translations[language] });
				for (const at of [subtitle.start, (subtitle.start + subtitle.end) / 2, subtitle.end - 1 / film.fps]) {
					expect(captionAt(at)).toBe(caption);
					const displayed = picture(<FilmLanguageProvider language={language}><Captions seconds={at} /></FilmLanguageProvider>).textContent!;
					expect(language === 'en' ? displayed.replace(/\s+/g, ' ').trim() : displayed).toBe(subtitle.text);
				}
				expect(captionAt(subtitle.end)).not.toBe(caption);
			});
			for (const at of [83, 85.9]) expect(picture(<FilmLanguageProvider language={language}><Captions seconds={at} /></FilmLanguageProvider>).textContent).toBe('');
		});
	});

	it('exports fresh source and delivery subtitles when all editions are requested', () => {
		inDisposableRepository((repository) => {
			const outputs = (['en', 'ja', 'zh-Hant', 'th'] as const).map((language) => ({ language, ...tpsOutputs(repository, language) }));
			for (const file of outputs.flatMap(({ source, delivery }) => [source, delivery])) writeFileSync(file, 'stale subtitles');
			execFileSync(process.execPath, [path.join(repository, 'scripts/tps-and-ai-subtitles.mjs'), 'all']);
			for (const { language, source, delivery } of outputs) {
				const srt = readFileSync(source, 'utf8');
				expect(parseSubtitles(srt)).toEqual(film.scenes.flatMap((scene) => scene.captionRanges).map((caption, index) => ({
					index: index + 1, start: caption.start, end: caption.end, text: language === 'en' ? caption.spoken : caption.translations[language],
				})));
				expect(readFileSync(delivery, 'utf8')).toBe(srt);
			}
		});
	});

	it('preserves all shared exporters’ English defaults', () => {
		inDisposableRepository((repository) => {
			for (const [wrapper, directory, filename] of exporterWrappers) {
				writeFileSync(path.join(repository, directory, filename), 'stale subtitles');
				execFileSync(process.execPath, [path.join(repository, `scripts/${wrapper}-subtitles.mjs`)]);
				const source = JSON.parse(readFileSync(path.join(repository, directory, 'film-script.json'), 'utf8'));
				const entries = parseSubtitles(readFileSync(path.join(repository, directory, filename), 'utf8'));
				const captions = source.scenes.flatMap((scene: { captionRanges: { start: number; end: number; spoken: string }[] }) => scene.captionRanges);
				expect(entries).toHaveLength(captions.length);
				entries.forEach(({ start, end, text }, index) => {
					expect([start, end]).toEqual([Math.round(captions[index].start * 1000) / 1000, Math.round(captions[index].end * 1000) / 1000]);
					expect(text).toBe(captions[index].spoken);
				});
			}
		});
	});

	it('rejects unknown or unavailable subtitle languages', () => {
		inDisposableRepository((repository) => {
			expect(() => execFileSync(process.execPath, [path.join(repository, 'scripts/tps-and-ai-subtitles.mjs'), 'unknown'], { stdio: 'pipe' })).toThrow(/Unknown TPS film language: unknown/);
			expect(() => execFileSync(process.execPath, ['--input-type=module', '-e', "import {exportFilmSubtitles} from '../scripts/film-subtitles.mjs'; exportFilmSubtitles('Problem Decomposition', 'untranslated-ja.srt', 'ja')"], { cwd: path.join(repository, 'terry-moves'), stdio: 'pipe' })).toThrow(/Missing ja caption translation/);
		});
	});

	it('composes frame zero and retains the genuine upper-right logo through every shot', () => {
		const opening = picture(<Shot seconds={0} id="hook"><HookPicture /></Shot>);
		expect(opening.textContent).toContain('Jidoka');
		expect(opening.textContent).toContain('Free to Move On');
		expect(opening.textContent).toContain('How do you know your');
		expect(opening.querySelector('img[src$="called-by-the-stop.png"]')).not.toBeNull();
		expect(opening.querySelector('[data-scene="hook"]')!.getAttribute('style')).not.toContain('opacity:0');
		for (const scene of film.scenes) {
			const logo = picture(<Shot seconds={scene.start} id={scene.id} />).querySelector<HTMLImageElement>('img[src$="odd-e-logo.png"]')!;
			expect(logo.style.left).toBe('934px'); expect(logo.style.top).toBe('40px');
		}
		const asset = readFileSync(path.resolve(process.cwd(), 'public/assets/tps-and-ai/odd-e-logo.png'));
		expect(asset.equals(readFileSync(path.resolve(process.cwd(), '../themes/odd-e/images/odd-e-logo.png')))).toBe(true);
	});

	it('uses the local loom once then holds its visible stopped pose with the radical beneath it', () => {
		expect(loomFrameAt(27, 30)).toBe(0);
		expect(loomFrameAt(29, 30)).toBe(60);
		for (const at of [36, 37.5, 38.9]) {
			const clip = picture(<LoomPicture seconds={at} fps={30} />);
			expect(clip.querySelector('[data-freeze-frame]')!.getAttribute('data-freeze-frame')).toBe('270');
			const video = clip.querySelector('video')!;
			expect(video.getAttribute('src')).toContain('loom-warp-stop.mp4');
			expect(video.hasAttribute('loop')).toBe(false);
			expect(video.hasAttribute('muted')).toBe(true);
			expect(clip.querySelector('img[src$="jidoka-human-radical.svg"]')).not.toBeNull();
		}
		expect(readFileSync(path.resolve(process.cwd(), 'public/assets/tps-and-ai/jidoka-human-radical.svg')).equals(readFileSync(path.resolve(process.cwd(), '../slides/tps-and-ai/public/jidoka-human-radical.svg')))).toBe(true);
	});

	it('matches the full paired paintings and changes their generic screens with the stop', () => {
		const watching = picture(<PairedPainting state="watching" />);
		const stopped = picture(<PairedPainting state="stopped" />);
		expect(watching.firstElementChild!.getAttribute('style')).toBe(stopped.firstElementChild!.getAttribute('style'));
		expect(watching.querySelector('img')!.style.objectFit).toBe('contain');
		expect(stopped.querySelector('img')!.style.objectFit).toBe('contain');
		expect(watching.textContent).toBe('CHECKING'); expect(stopped.textContent).toBe('STOP');
		expect(watching.querySelector('polygon')).not.toBeNull(); expect(stopped.querySelector('polygon')).not.toBeNull();
		const before = picture(<ContrastPicture seconds={40} />), after = picture(<ContrastPicture seconds={50} />);
		expect(before.querySelector<HTMLElement>('[data-testid="paired-watching"]')!.style.opacity).toBe('1');
		expect(after.querySelector<HTMLElement>('[data-testid="paired-stopped"]')!.style.opacity).toBe('1');
	});

	it('preserves the closed stop and needed behavior, and ends on the exact stable credit', () => {
		const knowledge = picture(<JudgmentPicture seconds={65} />);
		expect(knowledge.querySelector('[data-testid="closed-software-stop"]')!.getAttribute('data-work-blocked')).toBe('true');
		expect(knowledge.textContent).toContain('Clear evidence');
		const necessaryBefore = picture(<MinimalismPicture seconds={67} />).querySelector('[data-testid="necessary-behavior"]')!.outerHTML;
		const necessaryAfter = picture(<MinimalismPicture seconds={74} />).querySelector('[data-testid="necessary-behavior"]')!.outerHTML;
		expect(necessaryAfter).toBe(necessaryBefore);
		expect(picture(<HousePicture />).querySelector('[data-testid="jidoka-pillar"]')).not.toBeNull();
		expect(captionAt(cue('minimalism', 2))!.spoken).toBe('Remove unnecessary parts. Preserve needed behavior.');
		const closing = renderToStaticMarkup(<ClosingPicture />);
		expect(closing).toContain('Idea and film from Terry');
		expect(captionAt(83)).toBeUndefined(); expect(captionAt((durationInFrames - 1) / film.fps)).toBeUndefined();
		const audienceText = [film.title, film.subtitle, ...film.scenes.flatMap((scene) => [scene.label, ...scene.captionRanges.map((c) => c.spoken), ...scene.creditLines ?? []])].join(' ');
		expect(audienceText).not.toMatch(/[\u3040-\u30ff\u3400-\u9fff]/u);
		expect(audienceText).not.toMatch(/empty list|train leaves|customer|Freedom and Trust/i);
	});
});
