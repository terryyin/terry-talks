import { render } from '@testing-library/react';
import { FPS } from '@/storyImpact/film';
import { fullFilm } from '@/storyImpact/fullFilm';
import { CellPose, GridSpot, pinkStory, plainCellColor, sameSpot } from '@/storyImpact/scene';
import { StoryImpactScene } from '@/storyImpact/StoryImpactScene';

const { beatRange, captionAt, durationInFrames, poseAt } = fullFilm;

const framesOf = (name: string) => {
	const { from, durationInFrames: frames } = beatRange(name);
	return Array.from({ length: frames }, (_, i) => from + i);
};
const lastFrame = (name: string) => {
	const frames = framesOf(name);
	return frames[frames.length - 1];
};
const renderFrame = (f: number) => render(<StoryImpactScene pose={poseAt(f)} caption={captionAt(f)} />);

const spotKey = ({ col, row }: GridSpot) => `${col},${row}`;
const storyColors = (cell: CellPose) => [cell.color, cell.split].filter((c) => c !== undefined && c !== plainCellColor(cell));
const endingBeats = ['story-outline', 'feature-outline', 'closing'];

describe('StoryImpactFilm ending: a story is not a feature', () => {
	const product = poseAt(lastFrame('grape-coherent')).cells;

	test('the product stays exactly as the last story left it', () => {
		for (const name of endingBeats) {
			framesOf(name)
				.filter((_, i) => i % 5 === 0)
				.forEach((f) => expect(poseAt(f).cells).toEqual(product));
		}
	});

	test("one story's outlined cells are the pink story's cells, across columns and rows", () => {
		const outline = poseAt(lastFrame('story-outline')).outlines!;
		expect(outline).toHaveLength(1);
		const [story] = outline;
		expect(story.color).toBe(pinkStory.ball.color);
		expect(story.draw).toBe(1);
		expect(story.cells.map(spotKey).sort()).toEqual([...pinkStory.changed, pinkStory.reorganized].map(spotKey).sort());
		expect(new Set(story.cells.map((c) => c.col)).size).toBeGreaterThanOrEqual(2);
		expect(new Set(story.cells.map((c) => c.row)).size).toBeGreaterThanOrEqual(2);
		// Every outlined cell carries the pink story's color.
		story.cells.forEach((spot) => expect(storyColors(product.find((c) => sameSpot(c, spot))!)).toContain(pinkStory.ball.color));
	});

	test('one outlined Behavior column carries several story colors', () => {
		const outlines = poseAt(lastFrame('feature-outline')).outlines!;
		expect(outlines).toHaveLength(1);
		const [feature] = outlines;
		expect(feature.together).toBe(true);
		const cols = new Set(feature.cells.map((c) => c.col));
		expect(cols.size).toBe(1);
		const [col] = [...cols];
		expect(feature.cells.map((c) => c.row).sort()).toEqual([0, 1, 2, 3]);
		const colors = new Set(product.filter((c) => c.col === col).flatMap(storyColors));
		expect(colors.size).toBeGreaterThanOrEqual(2);
		expect(new Set(feature.tags)).toEqual(colors);
	});

	test('the story outline fades as the feature outline is drawn on', () => {
		const opacities = framesOf('feature-outline').map((f) => {
			const story = poseAt(f).outlines!.find((o) => o.color === pinkStory.ball.color);
			return story ? (story.opacity ?? 1) : 0;
		});
		expect(opacities[0]).toBe(1);
		expect(opacities[opacities.length - 1]).toBe(0);
		opacities.slice(1).forEach((o, i) => expect(o).toBeLessThanOrEqual(opacities[i]));
	});

	test('the closing line holds on the tidy product with the next ball eager in the tray', () => {
		const last = poseAt(durationInFrames - 1);
		expect(captionAt(durationInFrames - 1)).toBe('Stories should be romantic. Products should not.');
		expect(last.outlines).toBeUndefined();
		expect(last.dim).toBeUndefined();
		expect(last.backlog[0].eager).toBe(true);
		// The next ball hops during the closing beat, then everything rests for at least 2 s.
		expect(Math.max(...framesOf('closing').map((f) => poseAt(f).backlog[0].hop ?? 0))).toBeGreaterThan(0);
		for (let f = durationInFrames - 2 * FPS; f < durationInFrames; f++) expect(poseAt(f)).toEqual(last);
	});

	test('every 5th frame of the ending renders, with outlines while they show', () => {
		for (let f = beatRange('story-outline').from; f < durationInFrames; f += 5) {
			const { unmount, getByTestId, queryByTestId } = renderFrame(f);
			expect(getByTestId('caption')).toHaveTextContent(captionAt(f));
			if (poseAt(f).outlines) expect(queryByTestId('outlines')).not.toBeNull();
			else expect(queryByTestId('outlines')).toBeNull();
			unmount();
		}
	});

	test('at the height of each beat, the outline is drawn with its name', () => {
		for (const name of ['story-outline', 'feature-outline']) {
			const { getByTestId, unmount } = renderFrame(lastFrame(name));
			expect(getByTestId('outline-tag')).toBeInTheDocument();
			expect(getByTestId('outline-pointer')).toBeInTheDocument();
			unmount();
		}
	});
});
