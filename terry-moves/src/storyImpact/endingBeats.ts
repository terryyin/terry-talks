// The film's ending, on the product the last story left: a story is not a
// feature. First one story's cells are outlined — they lie across several
// Behavior columns and Structure rows; then one Behavior column, a feature,
// is outlined — it carries the colors of several stories. Then the outlines
// fade, the product rests, the next ball hops eagerly in the tray, and the
// closing line holds. The product itself does not change.

import { CellPose, GRID, GridSpot, OutlinePose, palette, pinkStory, Pose, StorySpec, storyColorsOf } from './scene';
import { storyInHistoryOf } from './assimilation';
import { beat, Beat } from './film';
import { nextBeatOf } from './historyBeats';
import { lastStory } from './laterStories';
import { between, unless, withoutUndefined } from './motion';

// The product at rest after the last story, with every spent story in History.
const settled: Pose = storyInHistoryOf(lastStory.spec, lastStory.stage);

// The cells a story changed and reorganized.
const storyCellsOf = (spec: StorySpec): GridSpot[] => [...spec.changed, spec.reorganized];

// The Behavior column that carries the most different stories, with their
// colors in the order the stories were spent.
const featureColumnOf = (cells: CellPose[], spentOrder: string[]): { col: number; colors: string[] } => {
	const columns = Array.from({ length: GRID.columns }, (_, col) => {
		const colors = new Set(cells.filter((c) => c.col === col).flatMap(storyColorsOf));
		return { col, colors: spentOrder.filter((c) => colors.has(c)) };
	});
	return columns.reduce((best, c) => (c.colors.length > best.colors.length ? c : best));
};

const feature = featureColumnOf(
	settled.cells,
	settled.history!.map((b) => b.color),
);
const featureCells: GridSpot[] = Array.from({ length: GRID.rows }, (_, row) => ({ col: feature.col, row }));
const storyCells = storyCellsOf(pinkStory);

const DIM = 0.55;
const MARCH_SPEED = 28; // px per second

// Pink story: one outline per cell it changed.
const storyOutline = (draw: number, sec: number, opacity = 1): OutlinePose =>
	withoutUndefined({
		cells: storyCells,
		color: pinkStory.ball.color,
		draw,
		march: MARCH_SPEED * sec,
		opacity: unless(opacity, 1),
		label: 'one story',
		pointAt: { col: 0.88, row: 2.6 },
		tags: [pinkStory.ball.color],
	});

// The feature: one outline along the whole column.
const featureOutline = (draw: number, sec: number, opacity = 1): OutlinePose =>
	withoutUndefined({
		cells: featureCells,
		color: palette.behavior,
		together: true,
		draw,
		march: MARCH_SPEED * sec,
		opacity: unless(opacity, 1),
		label: 'a feature',
		pointAt: { col: feature.col - 0.12, row: 3.4 },
		tags: feature.colors,
	});

export const STORY_OUTLINE_SECONDS = 3.5;
export const FEATURE_OUTLINE_SECONDS = 3.5;
export const CLOSING_SECONDS = 5.5;

const storyOutlineBeat = (sec: number): Pose => ({
	...settled,
	outlines: [storyOutline(between(sec, 0.2, 1.5), sec)],
	dim: { except: storyCells, amount: DIM * between(sec, 0, 0.6) },
});

const SWAP = 0.5; // the story's outline has faded and the focus moves to the column

const featureOutlineBeat = (sec: number): Pose => {
	const fading = 1 - between(sec, 0, SWAP);
	const march = STORY_OUTLINE_SECONDS + sec;
	return {
		...settled,
		outlines: [
			...(fading > 0 ? [storyOutline(1, march, fading)] : []),
			featureOutline(between(sec, SWAP, 1.5), sec),
		],
		dim:
			sec < SWAP
				? { except: storyCells, amount: DIM * fading }
				: { except: featureCells, amount: DIM * between(sec, SWAP, 1.0) },
	};
};

const HOP_FROM = 0.3; // the next ball starts hopping as the outlines fade

const closingBeat = (sec: number): Pose => {
	const next = nextBeatOf(lastStory.spec, lastStory.stage)(Math.max(0, sec - HOP_FROM));
	const fading = 1 - between(sec, 0, 0.6);
	return fading > 0
		? {
				...next,
				outlines: [featureOutline(1, FEATURE_OUTLINE_SECONDS + sec, fading)],
				dim: { except: featureCells, amount: DIM * fading },
			}
		: next;
};

export const endingBeatList: Beat[] = [
	beat('story-outline', STORY_OUTLINE_SECONDS, 'One story touches many features…', storyOutlineBeat),
	beat('feature-outline', FEATURE_OUTLINE_SECONDS, '…and one feature carries many stories.', featureOutlineBeat),
	beat('closing', CLOSING_SECONDS, 'Stories should be romantic. Products should not.', closingBeat),
];
