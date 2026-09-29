import { fullFilm } from '../../src/storyImpact/fullFilm';
import { captionLines } from '../../src/storyImpact/caption';
import { ZH_HANT_CAPTIONS, zhHantCaption } from '../../src/storyImpact/zhHant';

const filmCaptions = (): string[] => {
	const seen = new Set<string>();
	for (let f = 0; f < fullFilm.durationInFrames; f++) seen.add(fullFilm.captionAt(f));
	seen.delete('');
	return [...seen];
};

describe('Traditional Chinese subtitles', () => {
	test('every caption in the film has a translation, and no translation is left over', () => {
		const captions = filmCaptions();
		expect(captions.filter((c) => !(c in ZH_HANT_CAPTIONS))).toEqual([]);
		expect(Object.keys(ZH_HANT_CAPTIONS).filter((c) => !captions.includes(c))).toEqual([]);
	});

	test('a pause stays a pause', () => {
		expect(zhHantCaption('')).toBe('');
	});

	test('each subtitle fits the caption bar in at most two lines, never starting a line with punctuation', () => {
		Object.values(ZH_HANT_CAPTIONS).forEach((zh) => {
			const lines = captionLines(zh);
			expect({ zh, lines: lines.length <= 2, width: lines.every((l) => [...l].length <= 20) }).toEqual({ zh, lines: true, width: true });
			expect(lines.join('')).toBe(zh);
			lines.slice(1).forEach((l) => expect(l).not.toMatch(/^[，。：；！？、]/));
		});
	});

	test('English captions still break on spaces', () => {
		expect(captionLines('The spent story goes to history. Available, but out of the way.')).toEqual([
			'The spent story goes to history.',
			'Available, but out of the way.',
		]);
	});
});
