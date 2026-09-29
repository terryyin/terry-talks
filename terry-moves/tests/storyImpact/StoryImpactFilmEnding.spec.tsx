import { render } from '@testing-library/react';
import { PAUSE_SECONDS } from '@/storyImpact/readingPace';
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
	const product = poseAt(lastFrame('idea-coherent')).cells;

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

	test('the feature is the Behavior column on the Structure axis, taking every layer, with no tie to stories', () => {
		const f = lastFrame('feature-outline');
		expect(captionAt(f)).toBe('…and one feature takes many layers working together.');
		const outlines = poseAt(f).outlines!;
		expect(outlines).toHaveLength(1);
		const [feature] = outlines;
		expect(feature.together).toBe(true);
		expect(feature.cells.map(spotKey).sort()).toEqual(['0,0', '0,1', '0,2']);
		expect(feature.tags).toEqual([]);
		expect(feature.layers).toBe(3);
		expect(feature.joints).toBe(1);
		expect(feature.wash).toBeGreaterThan(0.5);
		const { getAllByTestId, queryAllByTestId, unmount } = renderFrame(f);
		expect(getAllByTestId('outline-layer-bar')).toHaveLength(3);
		expect(getAllByTestId('outline-joint')).toHaveLength(2);
		expect(queryAllByTestId('outline-tag-dot')).toHaveLength(0);
		unmount();
	});

	test('the joints between the layers pop on after the outline has risen, bottom up', () => {
		const joints = framesOf('feature-outline').map((fr) => poseAt(fr).outlines!.find((o) => o.label === 'a feature')!);
		const risenAt = joints.findIndex((o) => o.draw >= 1);
		const firstJoint = joints.findIndex((o) => (o.joints ?? 0) > 0);
		expect(firstJoint).toBeGreaterThanOrEqual(risenAt);
		expect(joints[joints.length - 1].joints).toBe(1);
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

	test('the product rests with the next ball eager: neither is better', () => {
		const frames = framesOf('closing');
		const breath = Math.round(PAUSE_SECONDS * FPS);
		frames.slice(0, breath).forEach((f) => expect(captionAt(f)).toBe(''));
		frames.slice(breath).forEach((f) => expect(captionAt(f)).toBe('Neither is better. They do different jobs.'));
		expect(Math.max(...frames.map((f) => poseAt(f).backlog[0].hop ?? 0))).toBeGreaterThan(0);
		const last = poseAt(frames[frames.length - 1]);
		expect(last.outlines).toBeUndefined();
		expect(last.dim).toBeUndefined();
		expect(last.backlog[0].eager).toBe(true);
	});

	test('the stage shrinks away and the end card lands the line, then credits Terry Yin and holds', () => {
		const end = durationInFrames - 1;
		expect(captionAt(end)).toBe('');
		const { getByTestId, queryByTestId } = renderFrame(end);
		expect(queryByTestId('product-grid')).toBeNull();
		expect(queryByTestId('behavior-axis')).toBeNull();
		expect(queryByTestId('caption')).toBeNull();
		expect(getByTestId('end-lead')).toHaveTextContent('Stories should be');
		expect(getByTestId('title-romantic')).toHaveTextContent('romantic.');
		expect(getByTestId('title-disciplined')).toHaveTextContent('Products should not.');
		expect(getByTestId('end-credit')).toHaveTextContent('An idea and film by Terry Yin');
		const leave = framesOf('finale').map((f) => poseAt(f).stageLeave ?? 0);
		expect(leave[0]).toBe(0);
		expect(leave.some((l) => l > 0.2 && l < 0.8)).toBe(true);
		for (let f = durationInFrames - 2 * FPS; f < durationInFrames; f++) expect(poseAt(f)).toEqual(poseAt(end));
	});

	test('every 5th frame of the ending renders, with outlines while they show', () => {
		for (let f = beatRange('story-outline').from; f < durationInFrames; f += 5) {
			const { unmount, getByTestId, queryByTestId } = renderFrame(f);
			if (captionAt(f) === '') expect(queryByTestId('caption')).toBeNull();
			else expect(getByTestId('caption')).toHaveTextContent(captionAt(f));
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
