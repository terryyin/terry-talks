import { excerptPicture, registeredExcerpt } from './renderedFilm';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { SharedRhythmFilm } from '../../src/musicAndSound/SharedRhythmFilm';
import { RhythmDirection, rhythmTimeline } from '../../src/musicAndSound/direction';
import { rhythmFingerprint, rhythmSampleRate, rhythmWave, synthesizeRhythm } from '../../src/musicAndSound/score';

const performer = (page: HTMLElement, id: string) => page.querySelector(`[data-rhythm-performer="${id}"]`)!;
const passage = (page: HTMLElement) => page.querySelector('[data-rhythm-passage]')!.getAttribute('data-rhythm-passage');

test('Root registers the real saved excerpt with its derived duration and audio selection', () => {
	const entry = registeredExcerpt();
	expect(entry).toMatchObject({ id: 'SharedRhythmExcerpt', component: SharedRhythmFilm, durationInFrames: 288, fps: 30, width: 1080, height: 1080 });
	expect(entry.calculateMetadata({ props: entry.defaultProps })).toEqual({ durationInFrames: 288 });
	const page = excerptPicture(18);
	expect(page.querySelector('audio')!.getAttribute('src')).toContain('/assets/shared-rhythm/excerpt.wav');
	expect(page.querySelectorAll('audio')).toHaveLength(1);
	expect(page.textContent).toContain('Finding a');
	expect(performer(page, 'pulse').querySelector('circle')!.getAttribute('fill')).toBe('#f07d62');
});

test('actual rendered anticipation, impact, answering cut and distinct motifs follow the named cue targets', () => {
	const { direction } = registeredExcerpt().defaultProps;
	const performance = rhythmTimeline(direction, 30);
	const first = performance.cues.find((cue) => cue.id === 'first-pulse')!;
	expect(first.frame).toBe(18);
	expect(performer(excerptPicture(17), 'pulse').getAttribute('transform')).not.toBe(performer(excerptPicture(18), 'pulse').getAttribute('transform'));
	expect(excerptPicture(17).querySelector('[data-rhythm-impact]')).toBeNull();
	expect(performer(excerptPicture(first.frame), 'pulse').getAttribute('data-rhythm-impact')).toBe('first-pulse');
	expect(excerptPicture(19).querySelector('[data-rhythm-impact]')).toBeNull();
	expect(passage(excerptPicture(71))).toBe('one-pulse');
	expect(passage(excerptPicture(72))).toBe('an-answer');
	expect(performer(excerptPicture(72), 'answer').getAttribute('data-rhythm-impact')).toBe('answer-enters');
	expect(performer(excerptPicture(72), 'answer').querySelector('rect')).not.toBeNull();
	expect(performer(excerptPicture(144), 'spark').querySelector('circle')!.getAttribute('fill')).toBe('none');
	expect(performer(excerptPicture(144), 'spark').getAttribute('data-rhythm-impact')).toBe('spark-enters');
	expect(excerptPicture(252).querySelectorAll('[data-rhythm-impact]')).toHaveLength(3);
});

test('the deliberate rest holds the real picture and direct/backward seeks reproduce every selected pose', () => {
	expect(excerptPicture(216).innerHTML).toBe(excerptPicture(251).innerHTML);
	expect(excerptPicture(230).querySelector('[data-rhythm-impact]')).toBeNull();
	const frames = [0, 17, 18, 54, 71, 72, 108, 144, 180, 216, 230, 251, 252, 287];
	const forward = new Map(frames.map((frame) => [frame, excerptPicture(frame).innerHTML]));
	for (const frame of [...frames].reverse()) expect(excerptPicture(frame).innerHTML).toBe(forward.get(frame));
	for (const frame of [180, 18, 252, 0, 108]) expect(excerptPicture(frame).innerHTML).toBe(forward.get(frame));
});

test('editing a cue refuses stale saved audio at both the render and export-metadata boundary', () => {
	const props = registeredExcerpt().defaultProps;
	const direction: RhythmDirection = {
		...props.direction,
		passages: props.direction.passages.map((item, index) => index === 0 ? {
			...item, cues: item.cues.map((cue, cueIndex) => cueIndex === 0 ? { ...cue, beat: cue.beat + 0.5 } : cue),
		} : item),
	};
	const expected = 'pnpm -C terry-moves exec tsx scripts/shared-rhythm-score.ts excerpt';
	expect(() => excerptPicture(18, { ...props, direction })).toThrow(expected);
	expect(() => registeredExcerpt().calculateMetadata({ props: { ...props, direction } })).toThrow(expected);
	const score = { ...props.score, directionFingerprint: rhythmFingerprint(direction, 30) };
	expect(excerptPicture(18, { direction, score }).querySelector('[data-rhythm-impact]')).toBeNull();
	expect(performer(excerptPicture(27, { direction, score }), 'pulse').getAttribute('data-rhythm-impact')).toBe('first-pulse');
});

test('the saved original WAV reproduces the direction and isolated sample onsets stay within one frame of rendered impacts', () => {
	const { direction, score } = registeredExcerpt().defaultProps;
	const wav = readFileSync(resolve(__dirname, '../../public', score.audioPath));
	expect(createHash('sha256').update(wav).digest('hex')).toBe(score.wavSha256);
	expect(Buffer.from(rhythmWave(synthesizeRhythm(direction, 30))).equals(wav)).toBe(true);
	expect(wav.readUInt32LE(24)).toBe(rhythmSampleRate);
	const sampleAt = (index: number) => wav.readInt16LE(44 + index * 2);
	const onsetAfter = (seconds: number) => {
		const begin = Math.round(seconds * rhythmSampleRate);
		for (let index = begin; index < begin + rhythmSampleRate / 10; index++) {
			if (Math.abs(sampleAt(index)) > 100) return index / rhythmSampleRate;
		}
		throw new Error(`No audible onset near ${seconds}.`);
	};
	for (const id of ['first-pulse', 'answer-enters', 'spark-enters', 'together-pulse']) {
		const cue = rhythmTimeline(direction, 30).cues.find((item) => item.id === id)!;
		expect(onsetAfter(cue.seconds) - cue.seconds).toBeLessThan(1 / 30);
		expect(performer(excerptPicture(cue.frame), cue.motif).getAttribute('data-rhythm-impact')).toBe(id);
	}
	const expectSilentSamples = (from: number, to: number) => {
		const bytes = wav.subarray(44 + from * 2, 44 + to * 2);
		expect(bytes.equals(Buffer.alloc((to - from) * 2))).toBe(true);
	};
	expectSilentSamples(216 / 30 * rhythmSampleRate, 252 / 30 * rhythmSampleRate);
	expectSilentSamples(wav.readUInt32LE(40) / 2 - rhythmSampleRate / 10, wav.readUInt32LE(40) / 2);
});

test('an additional authored passage previews through the same renderer without a passage-name branch', () => {
	const props = registeredExcerpt().defaultProps;
	const direction: RhythmDirection = {
		...props.direction,
		passages: [...props.direction.passages, {
			id: 'scratch-answer', beats: 2, performers: [{ motif: 'answer', x: 540, y: 560, size: 180 }],
			cues: [{ id: 'scratch-pluck', beat: 0.5, motif: 'answer', pitch: 1.5 }],
		}],
	};
	// Supply a matching-take precondition for this picture-only vocabulary proof.
	// This fixture is not a saved new WAV and proves no revised sound playback.
	const score = { ...props.score, directionFingerprint: rhythmFingerprint(direction, 30), durationInFrames: 324 };
	expect(registeredExcerpt().calculateMetadata({ props: { direction, score } })).toEqual({ durationInFrames: 324 });
	const page = excerptPicture(297, { direction, score });
	expect(passage(page)).toBe('scratch-answer');
	expect(page.querySelectorAll('[data-rhythm-performer]')).toHaveLength(1);
	expect(performer(page, 'answer').getAttribute('data-rhythm-impact')).toBe('scratch-pluck');
	expect(performer(page, 'answer').querySelector('rect')!.getAttribute('width')).toBe('180');
});
