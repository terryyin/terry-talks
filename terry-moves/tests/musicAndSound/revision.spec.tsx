import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { registeredRhythm, rhythmPicture } from './renderedFilm';
import { SharedRhythmFilm } from '../../src/musicAndSound/SharedRhythmFilm';
import { rhythmTimeline } from '../../src/musicAndSound/direction';
import { rhythmSampleRate, rhythmWave, synthesizeRhythm } from '../../src/musicAndSound/score';

const baseline = () => registeredRhythm('SharedRhythmBaseline');
const revision = () => registeredRhythm('SharedRhythmRevision');
const picture = (take: 'Baseline' | 'Revision', frame: number) => rhythmPicture(`SharedRhythm${take}`, frame);
const stage = (take: 'Baseline' | 'Revision', frame: number) => picture(take, frame).querySelector('[data-rhythm-passage]')!;
const performer = (take: 'Baseline' | 'Revision', frame: number) => stage(take, frame).querySelector('[data-rhythm-performer="answer"]')!;
const savedWave = (take: ReturnType<typeof baseline>) => readFileSync(resolve(__dirname, '../../public', take.defaultProps.score.audioPath));

test('Root selects separate saved revision and baseline media with the same full metadata and common film', () => {
	expect(revision()).toMatchObject({ id: 'SharedRhythmRevision', component: SharedRhythmFilm, durationInFrames: 1080, fps: 30, width: 1080, height: 1080 });
	for (const take of ['Baseline', 'Revision'] as const) {
		const entry = registeredRhythm(`SharedRhythm${take}`);
		expect(entry.calculateMetadata({ props: entry.defaultProps })).toEqual({ durationInFrames: 1080 });
		expect(entry.defaultProps.direction.id).toBe(take.toLowerCase());
		expect(picture(take, 225).querySelector('audio')!.getAttribute('src')).toContain(`/assets/shared-rhythm/${take.toLowerCase()}.wav`);
	}
	expect(picture('Baseline', 216).querySelector('[data-rhythm-impact="answer-turns"]')).not.toBeNull();
	expect(picture('Revision', 225).querySelector('[data-rhythm-impact="answer-turns"]')).not.toBeNull();
	expect(picture('Baseline', 216).querySelector('[data-rhythm-impact="answer-turns"]')).not.toBeNull();
});

test('the actual rendered answer impact moves nine frames while unrelated targets, cuts and holds stay authored', () => {
	const original = rhythmTimeline(baseline().defaultProps.direction, 30);
	const revised = rhythmTimeline(revision().defaultProps.direction, 30);
	expect(original.cues.find((cue) => cue.id === 'answer-turns')!.frame).toBe(216);
	expect(revised.cues.find((cue) => cue.id === 'answer-turns')!.frame).toBe(225);
	expect(performer('Baseline', 216).getAttribute('transform')).toBe('translate(770 470) scale(1.2 0.84)');
	expect(performer('Revision', 225).getAttribute('transform')).toBe('translate(770 470) scale(1.2 0.84)');
	expect(performer('Revision', 216).getAttribute('data-rhythm-impact')).toBeNull();
	expect(performer('Baseline', 225).getAttribute('data-rhythm-impact')).toBeNull();
	for (const cue of original.cues.filter((item) => item.id !== 'answer-turns')) {
		expect(revised.cues.find((item) => item.id === cue.id)).toEqual(cue);
		expect(stage('Revision', cue.frame).innerHTML).toBe(stage('Baseline', cue.frame).innerHTML);
	}
	for (const passage of baseline().defaultProps.direction.passages) {
		const range = original.beatRange(passage.id);
		expect(revised.beatRange(passage.id)).toEqual(range);
		for (const frame of [range.from, range.from + range.durationInFrames - 1]) expect(stage('Revision', frame).outerHTML).toBe(stage('Baseline', frame).outerHTML);
	}
	const selected = [0, 144, 210, 215, 216, 219, 224, 225, 226, 236, 237, 288, 750, 1079];
	const forward = new Map(selected.map((frame) => [frame, stage('Revision', frame).outerHTML]));
	for (const frame of [...selected].reverse()) expect(stage('Revision', frame).outerHTML).toBe(forward.get(frame));
});

test('saved revision samples move the isolated pluck exactly nine frames and preserve all sound outside its envelope', () => {
	const original = savedWave(baseline());
	const revised = savedWave(revision());
	const selected = revision().defaultProps;
	expect(createHash('sha256').update(revised).digest('hex')).toBe(selected.score.wavSha256);
	expect(Buffer.from(rhythmWave(synthesizeRhythm(selected.direction, 30))).equals(revised)).toBe(true);
	const bytesAt = (seconds: number) => 44 + Math.round(seconds * rhythmSampleRate) * 2;
	expect(original.subarray(0, bytesAt(7.2)).equals(revised.subarray(0, bytesAt(7.2)))).toBe(true);
	expect(original.subarray(bytesAt(7.96)).equals(revised.subarray(bytesAt(7.96)))).toBe(true);
	expect(original.subarray(bytesAt(7.2), bytesAt(7.66)).equals(revised.subarray(bytesAt(7.5), bytesAt(7.96)))).toBe(true);
	const onset = (wav: Buffer, seconds: number) => {
		const start = Math.round(seconds * rhythmSampleRate);
		for (let sample = start; sample < start + rhythmSampleRate / 30; sample++) {
			if (Math.abs(wav.readInt16LE(44 + sample * 2)) > 100) return sample / rhythmSampleRate;
		}
		throw new Error('Expected an isolated saved pluck onset.');
	};
	expect((onset(revised, 7.5) - onset(original, 7.2)) * 30).toBeCloseTo(9, 8);
});

test('cross-selecting retained saved takes fails before metadata or picture can claim a matching performance', () => {
	const mismatched = { direction: revision().defaultProps.direction, score: baseline().defaultProps.score };
	const command = 'pnpm -C terry-moves exec tsx scripts/shared-rhythm-score.ts revision';
	expect(() => revision().calculateMetadata({ props: mismatched })).toThrow(command);
	expect(() => rhythmPicture('SharedRhythmRevision', 225, mismatched)).toThrow(command);
	expect(() => rhythmPicture('SharedRhythmBaseline', 216, { direction: baseline().defaultProps.direction, score: revision().defaultProps.score })).toThrow('scripts/shared-rhythm-score.ts baseline');
});
