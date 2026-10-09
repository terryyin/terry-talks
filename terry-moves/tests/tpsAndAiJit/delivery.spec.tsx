import { execFileSync } from 'node:child_process';
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { captionAt, film } from '../../src/tpsAndAiJit/film';
import { jitAt, normalized, registerFilms } from './frames';

const repository = path.resolve(__dirname, '../../..');
const captions = film.scenes.flatMap((scene) => scene.captionRanges);
const parseSubtitles = (srt: string) => srt.trim().split('\n\n').map((entry) => {
	const [index, interval, ...lines] = entry.split('\n');
	const [start, end] = interval.split(' --> ').map((stamp) => {
		const [hours, minutes, seconds, ms] = stamp.split(/[:,]/).map(Number);
		return hours * 3600 + minutes * 60 + seconds + ms / 1000;
	});
	return { index: Number(index), start, end, text: lines.join('\n') };
});

beforeAll(registerFilms);

it('runs the real CLI in isolation and exports fresh source and byte-identical delivery subtitles from the mounted film clock', () => {
	const fixture = mkdtempSync(path.join(os.tmpdir(), 'tps-jit-subtitles-'));
	const scriptDirectory = path.join(fixture, 'scripts');
	const sourceDirectory = path.join(fixture, 'TPS and AI/JIT');
	const deliveryDirectory = path.join(fixture, 'terry-moves/out');
	const sourceFile = path.join(sourceDirectory, 'film-en.srt');
	const deliveryFile = path.join(deliveryDirectory, 'tps-and-ai-jit-en.srt');
	try {
		for (const directory of [scriptDirectory, sourceDirectory, deliveryDirectory]) mkdirSync(directory, { recursive: true });
		for (const filename of ['film-subtitles.mjs', 'tps-and-ai-jit-subtitles.mjs']) copyFileSync(path.join(repository, 'scripts', filename), path.join(scriptDirectory, filename));
		copyFileSync(path.join(repository, 'TPS and AI/JIT/film-script.json'), path.join(sourceDirectory, 'film-script.json'));
		writeFileSync(sourceFile, 'stale source');
		writeFileSync(deliveryFile, 'stale delivery');
		execFileSync(process.execPath, [path.join(scriptDirectory, 'tps-and-ai-jit-subtitles.mjs')], { cwd: fixture, stdio: 'pipe' });
		const sourceBytes = readFileSync(sourceFile);
		expect(readFileSync(deliveryFile).equals(sourceBytes)).toBe(true);
		const subtitles = parseSubtitles(sourceBytes.toString('utf8'));
		expect(subtitles).toEqual(captions.map((caption, index) => ({ index: index + 1, start: caption.start, end: caption.end, text: caption.spoken })));
		for (const subtitle of subtitles) {
			const caption = captions[subtitle.index - 1];
			for (const seconds of [subtitle.start, (subtitle.start + subtitle.end) / 2, subtitle.end - 1 / film.fps]) {
				expect(captionAt(seconds)).toBe(caption);
				expect(normalized(jitAt(seconds).picture.querySelector('[data-testid="film-caption"]')!.textContent)).toBe(subtitle.text);
			}
			expect(captionAt(subtitle.end)).not.toBe(caption);
			const incoming = captionAt(subtitle.end)?.spoken ?? '';
			expect(normalized(jitAt(subtitle.end).picture.querySelector('[data-testid="film-caption"]')!.textContent)).toBe(incoming);
		}
		for (const seconds of [83, 85, 2579 / 30]) expect(jitAt(seconds).picture.querySelector('[data-testid="film-caption"]')!.textContent).toBe('');
	} finally {
		rmSync(fixture, { recursive: true, force: true });
	}
});

it('ties every caption to declared provenance and retains the original slide illustrations and genuine logo bytes', () => {
	for (const caption of captions) {
		expect(caption.sourceIds.length).toBeGreaterThan(0);
		expect(caption.sourceIds.every((id) => id in film.sources)).toBe(true);
	}
	for (const source of Object.values(film.sources)) {
		expect(source.kind).toEqual(expect.any(String));
		expect(source.reference).toContain('slides/tps-and-ai/slides.md');
	}
	expect(film.artwork.map((art) => art.file)).toEqual(['green-light-stockpile.png', 'jit-resourceful-response.png', 'pull-customer-need.png', 'pull-customer-feedback.png', 'integration-coordination.png']);
	for (const art of film.artwork) {
		const retained = readFileSync(path.join(repository, 'terry-moves/public/assets/tps-and-ai', art.file));
		expect(retained.equals(readFileSync(path.join(repository, art.source)))).toBe(true);
	}
	const logo = readFileSync(path.join(repository, 'terry-moves/public/assets/tps-and-ai/odd-e-logo.png'));
	expect(logo.equals(readFileSync(path.join(repository, 'themes/odd-e/images/odd-e-logo.png')))).toBe(true);
});
