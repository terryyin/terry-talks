import { render } from '@testing-library/react';
import { useCurrentFrame } from 'remotion';
import { fullFilm } from '@/storyImpact/fullFilm';
import { CAPTION_BOX } from '@/storyImpact/layout';
import { JA_CAPTIONS, JA_FONT_FAMILY, jaCaption } from '@/storyImpact/ja';
import { zhHantCaption } from '@/storyImpact/zhHant';
import { COVER_FRAMES, StoryImpactFilm, StoryImpactFilmZhHant } from '@/stories/StoryImpactFilm';

// Render the component selected by the real composition without Remotion's
// player or media transport; the film's frame-to-caption wiring stays real.
jest.mock('remotion', () => ({
	...jest.requireActual('remotion'),
	useCurrentFrame: jest.fn(() => 0),
	Composition: ({ component: Component }: { component: React.ComponentType }) => <Component />,
}));
jest.mock('@/storyImpact/RecordedNarration', () => ({ RecordedNarration: () => null }));

const captionFrames = new Map<string, number>();
const emptyRuns: number[] = [];
for (let frame = 0; frame < fullFilm.durationInFrames; frame++) {
	const caption = fullFilm.captionAt(frame);
	if (caption !== '' && !captionFrames.has(caption)) captionFrames.set(caption, frame);
	if (caption === '' && (frame === 0 || fullFilm.captionAt(frame - 1) !== '')) emptyRuns.push(frame);
}

describe('Japanese subtitles beneath the English Story Impact film', () => {
	test('every film caption has a Japanese translation, with no obsolete entries', () => {
		expect(Object.keys(JA_CAPTIONS).sort()).toEqual([...captionFrames.keys()].sort());
		Object.values(JA_CAPTIONS).forEach((translation) => expect(translation).toMatch(/[\u3040-\u30ff\u4e00-\u9fff]/));
		expect(jaCaption('')).toBe('');
	});

	test.each([...captionFrames])('the English composition shows both languages for "%s" within the original bar', (caption, frame) => {
		jest.mocked(useCurrentFrame).mockReturnValue(COVER_FRAMES + frame);
		const { getByTestId } = render(<StoryImpactFilm />);
		const english = getByTestId('caption');
		const japanese = getByTestId('secondary-caption');
		expect(english).toHaveTextContent(caption);
		expect(japanese).toHaveTextContent(JA_CAPTIONS[caption]);
		expect(english).toHaveAttribute('font-size', '44');
		expect(japanese).toHaveAttribute('font-size', '26');
		expect(japanese).toHaveAttribute('font-family', JA_FONT_FAMILY);

		// Use generous glyph bounds: Japanese can occupy a full em in width.
		// Verify the longest English two-line captions leave a visible language
		// gap and all glyphs stay inside the unchanged caption rectangle.
		const englishSize = Number(english.getAttribute('font-size'));
		const japaneseSize = Number(japanese.getAttribute('font-size'));
		const englishBaselines = [...english.querySelectorAll('tspan')].map((line) => Number(line.getAttribute('y')));
		const japaneseBaseline = Number(japanese.getAttribute('y'));
		const englishBottom = Math.max(...englishBaselines) + englishSize * 0.2;
		const japaneseTop = japaneseBaseline - japaneseSize * 0.8;
		expect(Math.min(...englishBaselines) - englishSize * 0.8).toBeGreaterThan(CAPTION_BOX.top + 8);
		expect(japaneseTop - englishBottom).toBeGreaterThanOrEqual(12);
		expect(japaneseBaseline + japaneseSize * 0.2).toBeLessThan(CAPTION_BOX.bottom - 8);
		expect([...JA_CAPTIONS[caption]].length * japaneseSize).toBeLessThan(CAPTION_BOX.right - CAPTION_BOX.left - 72);
	});

	test.each([0, ...emptyRuns.map((frame) => COVER_FRAMES + frame)])('cover and caption gaps hide both languages at release frame %i', (frame) => {
		jest.mocked(useCurrentFrame).mockReturnValue(frame);
		const { queryByTestId } = render(<StoryImpactFilm />);
		expect(queryByTestId('caption')).toBeNull();
		expect(queryByTestId('secondary-caption')).toBeNull();
	});

	test('the Traditional Chinese edition keeps its existing single-language caption', () => {
		const [caption, frame] = [...captionFrames][0];
		jest.mocked(useCurrentFrame).mockReturnValue(COVER_FRAMES + frame);
		const { getByTestId, queryByTestId } = render(<StoryImpactFilmZhHant />);
		expect(getByTestId('caption')).toHaveTextContent(zhHantCaption(caption));
		expect(getByTestId('caption')).toHaveAttribute('font-size', '44');
		expect(queryByTestId('secondary-caption')).toBeNull();
	});
});
