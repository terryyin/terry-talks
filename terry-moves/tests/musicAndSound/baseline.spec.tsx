import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { registeredRhythm, rhythmPicture } from './renderedFilm';
import { SharedRhythmFilm } from '../../src/musicAndSound/SharedRhythmFilm';
import { rhythmTimeline } from '../../src/musicAndSound/direction';
import { rhythmSampleRate, rhythmWave, synthesizeRhythm } from '../../src/musicAndSound/score';

const baseline = () => registeredRhythm('SharedRhythmBaseline');
const picture = (frame: number) => rhythmPicture('SharedRhythmBaseline', frame);
const passage = (frame: number) => picture(frame).querySelector('[data-rhythm-passage]')!.getAttribute('data-rhythm-passage');
const impact = (frame: number, cue: string) => picture(frame).querySelector(`[data-rhythm-impact="${cue}"]`);

test('Root selects the full saved baseline with derived 36-second metadata and one retained audio asset', () => {
	const entry = baseline();
	expect(entry).toMatchObject({ id: 'SharedRhythmBaseline', component: SharedRhythmFilm, durationInFrames: 1080, fps: 30, width: 1080, height: 1080 });
	expect(entry.defaultProps.direction.id).toBe('baseline');
	expect(entry.calculateMetadata({ props: entry.defaultProps })).toEqual({ durationInFrames: 1080 });
	expect(picture(18).querySelectorAll('audio')).toHaveLength(1);
	expect(picture(18).querySelector('audio')!.getAttribute('src')).toContain('/assets/shared-rhythm/baseline.wav');
});

test('the full arc stages separate voices, musical cuts, a shared ensemble and a resolved return without losing their shapes', () => {
	expect(picture(18).querySelectorAll('[data-rhythm-performer]')).toHaveLength(1);
	expect(impact(18, 'alone-first')).not.toBeNull();
	expect(passage(143)).toBe('a-pulse-alone');
	expect(passage(144)).toBe('an-answer-across-space');
	expect(impact(144, 'answer-arrives')!.querySelector('rect')).not.toBeNull();
	expect(impact(216, 'answer-turns')).not.toBeNull();
	expect(passage(287)).toBe('an-answer-across-space');
	expect(impact(288, 'spark-arrives')!.querySelector('circle')!.getAttribute('fill')).toBe('none');
	expect(passage(432)).toBe('passing-the-phrase');
	expect(impact(432, 'passing-pulse-one')).not.toBeNull();
	expect(picture(576).querySelectorAll('[data-rhythm-impact]')).toHaveLength(3);
	expect(passage(576)).toBe('an-ensemble');
	expect(picture(792).querySelectorAll('[data-rhythm-impact]')).toHaveLength(3);
	expect(passage(792)).toBe('return-together');
	expect(picture(900).querySelectorAll('[data-rhythm-impact]')).toHaveLength(3);
	const ending = picture(950);
	expect(ending.querySelector('[data-rhythm-performer="pulse"] circle')!.getAttribute('fill')).toBe('#f07d62');
	expect(ending.querySelector('[data-rhythm-performer="answer"] rect')!.getAttribute('fill')).toBe('#75b9ae');
	expect(ending.querySelector('[data-rhythm-performer="spark"] circle')!.getAttribute('stroke')).toBe('#efc875');
	expect(ending.textContent).toContain('Sound & motion · Koharu-chan');
	expect(ending.textContent).toContain('Made for Terry · Original score');
	expect(ending.textContent).toContain('No external samples');
});

test('the 2.4-second shared rest and full credits tail hold still, including direct and backward seeks', () => {
	expect(passage(720)).toBe('a-shared-breath');
	expect(picture(720).innerHTML).toBe(picture(791).innerHTML);
	expect(picture(750).querySelector('[data-rhythm-impact]')).toBeNull();
	expect(picture(936).innerHTML).toBe(picture(1079).innerHTML);
	const frames = [18, 144, 215, 216, 217, 288, 432, 576, 720, 750, 791, 792, 900, 936, 1079];
	const forward = new Map(frames.map((frame) => [frame, picture(frame).innerHTML]));
	for (const frame of [...frames].reverse()) expect(picture(frame).innerHTML).toBe(forward.get(frame));
});

test('saved baseline audio reproduces its actual direction, cue impacts, silent rest and clean release tail', () => {
	const { direction, score } = baseline().defaultProps;
	const wav = readFileSync(resolve(__dirname, '../../public', score.audioPath));
	expect(createHash('sha256').update(wav).digest('hex')).toBe(score.wavSha256);
	expect(Buffer.from(rhythmWave(synthesizeRhythm(direction, 30))).equals(wav)).toBe(true);
	expect(wav.readUInt32LE(40) / 2 / rhythmSampleRate).toBe(36);
	const samplesAt = (index: number) => wav.readInt16LE(44 + index * 2);
	for (const id of ['alone-first', 'answer-arrives', 'answer-turns', 'spark-arrives', 'ensemble-pulse-one', 'return-pulse', 'resolve-pulse']) {
		const cue = rhythmTimeline(direction, 30).cues.find((item) => item.id === id)!;
		const begin = Math.round(cue.seconds * rhythmSampleRate);
		let onset = begin;
		while (onset < begin + rhythmSampleRate / 30 && Math.abs(samplesAt(onset)) <= 100) onset++;
		expect((onset - begin) / rhythmSampleRate).toBeLessThan(1 / 30);
		expect(impact(cue.frame, id)).not.toBeNull();
	}
	for (const [from, to] of [[24, 26.4], [30.6, 36]]) {
		const bytes = wav.subarray(44 + Math.round(from * rhythmSampleRate) * 2, 44 + Math.round(to * rhythmSampleRate) * 2);
		expect(bytes.equals(Buffer.alloc(bytes.length))).toBe(true);
	}
});
