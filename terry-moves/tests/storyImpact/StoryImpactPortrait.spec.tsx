import { render } from '@testing-library/react';
import { useCurrentFrame } from 'remotion';
import { fullFilm } from '@/storyImpact/fullFilm';
import { FPS } from '@/storyImpact/film';
import { jaCaption } from '@/storyImpact/ja';
import { PORTRAIT_PRESENTATION } from '@/storyImpact/presentation';
import { COVER_FRAMES, EN_NARRATION, StoryImpactFilm, StoryImpactFilmPortrait } from '@/stories/StoryImpactFilm';

// Keep the selected composition, performance and SVG presentation real; replace
// only Remotion registration/frame hooks and external audio transport.
jest.mock('remotion', () => ({
	...jest.requireActual('remotion'),
	useCurrentFrame: jest.fn(() => 0),
	Composition: ({ component: Component, id, width, height, fps, durationInFrames }: { component: React.ComponentType; id: string; width: number; height: number; fps: number; durationInFrames: number }) =>
		<section data-testid="composition" data-id={id} data-width={width} data-height={height} data-fps={fps} data-frames={durationInFrames}><Component /></section>,
}));
jest.mock('@/storyImpact/RecordedNarration', () => ({
	RecordedNarration: ({ src, from }: { src: string; from: number }) => <audio data-testid="narration" src={src} data-from={from} />,
}));

const coherentEnd = fullFilm.beatRange('coherent').from + fullFilm.beatRange('coherent').durationInFrames;
const openingCaptions = new Map<string, number>();
for (let frame = 0; frame < coherentEnd; frame++) {
	const caption = fullFilm.captionAt(frame);
	if (caption && !openingCaptions.has(caption)) openingCaptions.set(caption, frame);
}

describe('the registered Story Impact portrait opening', () => {
	test('selects the authored portrait canvas and stage with the original release clock and cleaned voice', () => {
		jest.mocked(useCurrentFrame).mockReturnValue(COVER_FRAMES + fullFilm.beatRange('backlog').from + 30);
		const { getByTestId, container } = render(<StoryImpactFilmPortrait />);
		const composition = getByTestId('composition');
		expect(composition).toHaveAttribute('data-id', 'StoryImpactFilmPortrait');
		expect(composition).toHaveAttribute('data-width', '1080');
		expect(composition).toHaveAttribute('data-height', '1920');
		expect(composition).toHaveAttribute('data-fps', String(FPS));
		expect(composition).toHaveAttribute('data-frames', String(COVER_FRAMES + fullFilm.durationInFrames));
		expect(container.querySelector('svg')).toHaveAttribute('viewBox', '0 0 1080 1920');
		expect(getByTestId('focal-stage')).toHaveAttribute('transform', 'translate(0 340) scale(1)');
		expect(getByTestId('product-grid')).toBeInTheDocument();
		expect(getByTestId('backlog-tray')).toBeInTheDocument();
		expect(getByTestId('behavior-axis')).toBeInTheDocument();
		expect(getByTestId('structure-axis')).toBeInTheDocument();
		expect(getByTestId('narration')).toHaveAttribute('src', EN_NARRATION);
		expect(getByTestId('narration')).toHaveAttribute('data-from', String(COVER_FRAMES));
	});

	test.each([...openingCaptions])('retains both texts at the source frame for "%s" in their separate reading region', (caption, frame) => {
		jest.mocked(useCurrentFrame).mockReturnValue(COVER_FRAMES + frame);
		const { getByTestId } = render(<StoryImpactFilmPortrait />);
		const english = getByTestId('caption');
		const japanese = getByTestId('secondary-caption');
		expect(english).toHaveTextContent(caption);
		expect(japanese).toHaveTextContent(jaCaption(caption));
		expect(english).toHaveAttribute('font-size', '54');
		expect(japanese).toHaveAttribute('font-size', '48');
		const baselines = (text: HTMLElement) => [...text.querySelectorAll('tspan')].map((line) => Number(line.getAttribute('y')));
		const primary = baselines(english);
		const secondary = baselines(japanese);
		expect(primary[0] - 54 * 0.8).toBeGreaterThan(PORTRAIT_PRESENTATION.captions.box.top + 20);
		expect(secondary[0] - 48 * 0.8 - (primary.at(-1)! + 54 * 0.2)).toBeGreaterThanOrEqual(32);
		expect(secondary.at(-1)! + 48 * 0.2).toBeLessThan(PORTRAIT_PRESENTATION.captions.box.bottom - 20);
		// Generous full-em CJK bounds supplement real browser text inspection.
		[...japanese.querySelectorAll('tspan')].forEach((line) => expect([...line.textContent!].length * 48).toBeLessThan(920));
	});

	test('wraps the dense Japanese opening without changing its translation', () => {
		jest.mocked(useCurrentFrame).mockReturnValue(COVER_FRAMES + fullFilm.beatRange('time').from + 60);
		const { getByTestId } = render(<StoryImpactFilmPortrait />);
		expect(getByTestId('secondary-caption').querySelectorAll('tspan')).toHaveLength(2);
	});

	test('keeps the complete cover, hides captions during it, and preserves the square defaults', () => {
		jest.mocked(useCurrentFrame).mockReturnValue(0);
		const portrait = render(<StoryImpactFilmPortrait />);
		expect(portrait.getByTestId('title')).toBeInTheDocument();
		expect(portrait.queryByTestId('caption')).toBeNull();
		expect(portrait.queryByTestId('secondary-caption')).toBeNull();
		portrait.unmount();
		jest.mocked(useCurrentFrame).mockReturnValue(COVER_FRAMES + fullFilm.beatRange('time').from + 60);
		const square = render(<StoryImpactFilm />);
		expect(square.getByTestId('composition')).toHaveAttribute('data-height', '1080');
		expect(square.getByTestId('focal-stage')).not.toHaveAttribute('transform');
		expect(square.getByTestId('caption')).toHaveAttribute('font-size', '44');
		expect(square.getByTestId('secondary-caption')).toHaveAttribute('font-size', '26');
		expect(square.getByTestId('secondary-caption').querySelectorAll('tspan')).toHaveLength(0);
	});
});
