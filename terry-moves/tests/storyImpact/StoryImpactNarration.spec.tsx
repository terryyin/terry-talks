import { render } from '@testing-library/react';
import { existsSync, readFileSync } from 'fs';
import { createHash } from 'crypto';
import { resolve } from 'path';
import { fullFilm } from '@/storyImpact/fullFilm';
import { COVER_FRAMES, COVER_SOURCE_FRAME, releaseFrame, EN_NARRATION, ZH_HANT_NARRATION } from '@/stories/StoryImpactFilm';
import { RecordedNarration } from '@/storyImpact/RecordedNarration';
import recordingTimeline from '@/storyImpact/recordingTimeline.json';
import cleanup from '../../public/assets/story-impact/cleanup-en.json';

// Remotion's media transport is external to this component's sequencing.
jest.mock('remotion', () => ({
	...jest.requireActual('remotion'),
	Audio: ({ src, trimBefore, trimAfter, playbackRate }: { src: string; trimBefore: number; trimAfter: number; playbackRate: number }) => (
		<audio data-testid="recorded-audio" src={src} data-start={trimBefore} data-end={trimAfter} data-rate={playbackRate} />
	),
	Sequence: ({ from, durationInFrames, children }: { from: number; durationInFrames: number; children: React.ReactNode }) => (
		<div data-testid="audio-sequence" data-from={from} data-duration={durationInFrames}>{children}</div>
	),
}));

describe('Story Impact release and narration', () => {
	test('opens on the complete cover before restarting the animated film', () => {
		expect(releaseFrame(0)).toBe(COVER_SOURCE_FRAME);
		expect(releaseFrame(COVER_FRAMES - 1)).toBe(COVER_SOURCE_FRAME);
		expect(fullFilm.poseAt(COVER_SOURCE_FRAME).title?.leave).toBe(0);
		expect(fullFilm.poseAt(COVER_SOURCE_FRAME).title?.drops.every((drop) => drop !== null)).toBe(true);
		expect(releaseFrame(COVER_FRAMES)).toBe(0);
		expect(releaseFrame(COVER_FRAMES + fullFilm.durationInFrames - 1)).toBe(fullFilm.durationInFrames - 1);
	});

	test('English uses the cleaned original recording and the source stays unchanged', () => {
		expect(existsSync(resolve(__dirname, '../../public', EN_NARRATION))).toBe(true);
		expect(cleanup.voice).toBe('Terry Yin (original recording)');
		expect(cleanup.source).toBe('terry-moves/public/assets/audios/impact_en.m4a');
		const source = readFileSync(resolve(__dirname, '../../public/assets/audios/impact_en.m4a'));
		expect(createHash('sha256').update(source).digest('hex')).toBe(cleanup.sourceSha256);
		expect(Math.abs(cleanup.sourceDuration - cleanup.outputDuration)).toBeLessThan(0.04);
	});

	test.each([EN_NARRATION, ZH_HANT_NARRATION])('%s keeps every original segment in order and fits the revised beats after the cover', (src) => {
		const { getAllByTestId } = render(<RecordedNarration src={src} from={COVER_FRAMES} />);
		const sequences = getAllByTestId('audio-sequence');
		const recordings = getAllByTestId('recorded-audio');
		expect(recordings).toHaveLength(recordingTimeline.length);
		let sourceEnd = 0;
		let outputEnd = COVER_FRAMES;
		for (let i = 0; i < recordings.length; i++) {
			const original = recordingTimeline[i];
			const current = fullFilm.beatRange(original.name);
			expect(recordings[i].getAttribute('src')).toContain(src);
			expect(Number(recordings[i].getAttribute('data-start'))).toBe(sourceEnd);
			sourceEnd = original.from + original.durationInFrames;
			expect(Number(recordings[i].getAttribute('data-end'))).toBe(sourceEnd);
			expect(Number(recordings[i].getAttribute('data-rate')) * current.durationInFrames).toBeCloseTo(original.durationInFrames);
			expect(Number(sequences[i].getAttribute('data-from'))).toBe(outputEnd);
			outputEnd += current.durationInFrames;
			expect(Number(sequences[i].getAttribute('data-duration'))).toBe(current.durationInFrames);
		}
		expect(outputEnd).toBe(COVER_FRAMES + fullFilm.durationInFrames);
	});
});
