import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { captionAt, cue, customerStateAt, durationInFrames, film, ruleStateAt, sceneAt } from '../../src/tpsAndAi/film';
import { captionLines, Captions } from '../../src/tpsAndAi/Frame';
import { RulePicture } from '../../src/tpsAndAi/Rule';
import { TrainResult, FutureNeeds } from '../../src/tpsAndAi/Customer';
import { ClosingPicture } from '../../src/tpsAndAi/Closing';
import { HookPicture } from '../../src/tpsAndAi/Hook';
import { BurdenPicture } from '../../src/tpsAndAi/Burden';
import { FreedomPicture } from '../../src/tpsAndAi/Freedom';
import { NeedPicture } from '../../src/tpsAndAi/Need';
import { FeedbackPicture } from '../../src/tpsAndAi/Feedback';
import { TrustPicture } from '../../src/tpsAndAi/Trust';

jest.mock('remotion', () => ({
	...jest.requireActual('remotion'),
	Img: (props: React.ComponentProps<'img'>) => React.createElement('img', props),
}));

describe('the actual Freedom and Trust film', () => {
	it('uses the authored contiguous clock, choosing the incoming scene/caption at every boundary', () => {
		film.scenes.forEach((scene, index) => {
			expect(sceneAt(scene.start).id).toBe(scene.id);
			if (index) {
				expect(scene.start).toBe(film.scenes[index - 1].end);
				expect(sceneAt(scene.start - 1 / film.fps).id).toBe(film.scenes[index - 1].id);
			}
			scene.captionRanges.forEach((caption) => {
				expect(captionAt(caption.start)).toBe(caption);
				expect(captionAt(caption.end)).not.toBe(caption);
				expect(caption.sourceIds.every((id) => id in film.sources)).toBe(true);
				const markup = renderToStaticMarkup(<Captions seconds={(caption.start + caption.end) / 2} />);
				expect(markup.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').replace(/&quot;/g, '"').trim()).toBe(caption.spoken);
			});
		});
		expect(captionAt(0)).toBeUndefined();
		expect(captionAt(91)).toBeUndefined();
		expect(sceneAt((durationInFrames - 1) / film.fps).id).toBe('closing');
	});

	it('keeps complete natural phrases in the embedded caption lines', () => {
		const displayedAt = (seconds: number) => {
			const caption = captionAt(seconds)!;
			return captionLines(caption.spoken, caption.lineBreakAfter);
		};
		expect(displayedAt(62)).toBe('Deliver one useful result:\nthe next train leaves at 22:45.');
		expect(displayedAt(72)).toBe('Keep the train result.\nA step-free route is next.');
		expect(displayedAt(89)).toBe('Trust them with\nthe next real problem.');
		for (const caption of film.scenes.flatMap((scene) => scene.captionRanges)) {
			if (caption.lineBreakAfter !== undefined) {
				expect(Number.isInteger(caption.lineBreakAfter)).toBe(true);
				expect(caption.lineBreakAfter).toBeGreaterThan(0);
				expect(caption.lineBreakAfter).toBeLessThan(caption.spoken.split(' ').length);
			}
			const lines = captionLines(caption.spoken, caption.lineBreakAfter).split('\n');
			expect(lines.join(' ')).toBe(caption.spoken);
			if (lines.length > 1) expect(lines[0]).not.toMatch(/\b(?:the|a|an)$/i);
		}
	});

	it('exports the same wording and intervals selected by the real embedded-caption consumer', () => {
		const srt = readFileSync(path.resolve(process.cwd(), '../TPS and AI/film-en.srt'), 'utf8');
		const toSeconds = (stamp: string) => {
			const [hours, minutes, seconds, milliseconds] = stamp.split(/[:,]/).map(Number);
			return hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
		};
		const subtitles = srt.trim().split('\n\n').map((entry) => {
			const [index, interval, ...text] = entry.split('\n');
			const [start, end] = interval.split(' --> ').map(toSeconds);
			return { index: Number(index), start, end, text: text.join(' ') };
		});
		const captions = film.scenes.flatMap((scene) => scene.captionRanges);
		expect(subtitles).toHaveLength(captions.length);
		subtitles.forEach((subtitle, index) => {
			const caption = captions[index];
			expect(subtitle).toEqual({ index: index + 1, start: caption.start, end: caption.end, text: caption.spoken });
			for (const seconds of [subtitle.start, (subtitle.start + subtitle.end) / 2, subtitle.end - 1 / film.fps]) {
				expect(captionAt(seconds)).toBe(caption);
				const picture = document.createElement('div');
				picture.innerHTML = renderToStaticMarkup(<Captions seconds={seconds} />);
				expect(picture.textContent!.replace(/\s+/g, ' ').trim()).toBe(subtitle.text);
			}
			expect(captionAt(subtitle.end)).not.toBe(caption);
		});
	});

	it('physically blocks the failed empty input and downstream work until human response repairs its cause', () => {
		const stop = cue('rule', 3);
		const response = cue('rule', 4);
		const frozen = ruleStateAt(stop);
		const pathsAt = (seconds: number) => {
			const picture = document.createElement('div');
			picture.innerHTML = renderToStaticMarkup(<RulePicture seconds={seconds} />);
			return {
				input: picture.querySelector('[data-testid="input-token"]')!.getAttribute('transform'),
				downstream: picture.querySelector('[data-testid="downstream-work"]')!.getAttribute('transform'),
			};
		};
		const stoppedPicture = pathsAt(stop);
		for (const seconds of [stop, stop + 2, response, response + 2.5]) {
			const state = ruleStateAt(seconds);
			expect(state.gate).toBe('closed');
			expect(state.inputX).toBe(frozen.inputX);
			expect(state.downstreamX).toBe(frozen.downstreamX);
			const markup = renderToStaticMarkup(<RulePicture seconds={seconds} />);
			expect(markup).toContain('data-stopped="true"');
			expect(markup).toContain('data-gate="closed"');
			expect(markup).toContain('Stopped');
			expect(pathsAt(seconds)).toEqual(stoppedPicture);
		}
		expect(ruleStateAt(response - 1 / film.fps).responding).toBe(false);
		expect(ruleStateAt(response).responding).toBe(true);
		expect(ruleStateAt(response + 2).repaired).toBe(true);
		const resumed = ruleStateAt(41.6);
		expect(resumed.inputX).toBeGreaterThan(frozen.inputX);
		expect(resumed.downstreamX).toBeGreaterThan(frozen.downstreamX);
		expect(pathsAt(41.6).input).not.toBe(stoppedPicture.input);
		expect(pathsAt(41.6).downstream).not.toBe(stoppedPicture.downstream);
		const markup = renderToStaticMarkup(<RulePicture seconds={41.6} />);
		expect(markup).toContain('data-resumed="true"');
		expect(markup).toContain('data-check-retained="true"');
		expect(markup).toContain('data-empty="false"');
	});

	it('retains a useful train result across feedback and reprioritizes only unstarted needs', () => {
		const receipt = (seconds: number) => renderToStaticMarkup(<TrainResult seconds={seconds} />);
		expect(receipt(cue('need', 1) - 1 / film.fps)).not.toContain('22:45');
		const delivered = receipt(65.9);
		for (const seconds of [66, 69.8, 72, 77.9]) expect(receipt(seconds)).toBe(delivered);
		expect(delivered).toContain('data-complete="true"');
		expect(delivered).toContain('22:45');
		expect(customerStateAt(69).fare.x).toBeLessThan(customerStateAt(69).route.x);
		expect(customerStateAt(72).route.x).toBeLessThan(customerStateAt(72).fare.x);
		const next = renderToStaticMarkup(<FutureNeeds seconds={72} />);
		expect(next).toContain('data-testid="future-route" data-started="false" data-next="true"');
		expect(next).toContain('data-testid="future-fare" data-started="false" data-next="false"');
		const picture = document.createElement('div');
		picture.innerHTML = next;
		const route = picture.querySelector<HTMLElement>('[data-testid="future-route"]')!;
		const fare = picture.querySelector<HTMLElement>('[data-testid="future-fare"]')!;
		expect(route.textContent).toBe('Step-free route');
		expect(fare.textContent).toBe('Check the fare');
		expect(parseFloat(route.style.left)).toBeLessThan(parseFloat(fare.style.left));
	});

	it('keeps all authored audience text in English and ends with a stable title/credit hold', () => {
		const audienceText = [film.title, film.subtitle, ...film.scenes.flatMap((scene) => [scene.label, ...scene.captionRanges.map((caption) => caption.spoken), ...scene.creditLines ?? []])].join(' ');
		expect(audienceText).not.toMatch(/[\u3040-\u30ff\u3400-\u9fff]/u);
		const final = renderToStaticMarkup(<ClosingPicture seconds={(durationInFrames - 1) / film.fps} />);
		expect(final).toBe(renderToStaticMarkup(<ClosingPicture seconds={92} />));
		expect(final).toContain('Freedom');
		expect(final).toContain('and Trust');
		expect(final).toContain('Terry Yin');
		expect(final).toContain('AI-assisted illustrations');
		expect(final).not.toMatch(/[\u3040-\u30ff\u3400-\u9fff]/u);
	});

	it('renders the diagnostic and English learning/customer labels in the actual pictures', () => {
		const pictures = [
			<HookPicture seconds={5} />, <BurdenPicture seconds={18} />, <RulePicture seconds={28} />,
			<RulePicture seconds={36} />, <FreedomPicture seconds={48} />, <NeedPicture seconds={62} />,
			<FeedbackPicture seconds={73} />, <TrustPicture seconds={82} />, <ClosingPicture seconds={93} />,
		].map((picture) => renderToStaticMarkup(picture));
		pictures.forEach((picture) => expect(picture).not.toMatch(/[\u3040-\u30ff\u3400-\u9fff]/u));
		expect(pictures[0]).toContain('More free?');
		expect(pictures[2]).toContain('The list must not be empty.');
		expect(pictures[3]).toContain('Empty list');
		expect(pictures[3]).toContain('failure');
		expect(pictures[4]).toContain('Room to think.');
		expect(pictures[5]).toContain('Next train');
		expect(pictures[5]).toContain('22:45');
		expect(pictures[6]).toContain('Step-free route');
	});
});
