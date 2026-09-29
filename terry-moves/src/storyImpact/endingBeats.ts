// The film's ending, on the product the last story left: a story is not a
// feature. First one story's cells are outlined — they lie across several
// Behavior columns and Structure rows; then one Behavior column, a feature,
// is outlined — it carries the colors of several stories. Then the outlines
// fade, the product rests and the next ball hops eagerly in the tray: neither
// is better. The product itself does not change. Finally the whole stage
// shrinks away and the end card lands the essay's last line, like the title,
// and credits the author.

import { CellPose, extentOf, GridSpot, OutlinePose, palette, pinkStory, Pose, StorySpec, storyColorsOf } from './scene';
import { storyInHistoryOf } from './assimilation';
import { beat, Beat } from './film';
import { nextBeatOf } from './historyBeats';
import { lastStory } from './laterStories';
import { Easing } from 'remotion';
import { between, bounce, BOUNCY, POPPY, settle, unless, withoutUndefined } from './motion';
import { END_CARD } from './endCard';
import { afterABreath } from './readingPace';

// The product at rest after the last story, with every spent story in History.
const settled: Pose = storyInHistoryOf(lastStory.spec, lastStory.stage);

// The cells a story changed and reorganized.
const storyCellsOf = (spec: StorySpec): GridSpot[] => [...spec.changed, spec.reorganized];

// The Behavior column that carries the most different stories, with their
// colors in the order the stories were spent.
const featureColumnOf = (cells: CellPose[], spentOrder: string[]): { col: number; colors: string[] } => {
	const columns = Array.from({ length: extentOf(cells).columns }, (_, col) => {
		const colors = new Set(cells.filter((c) => c.col === col).flatMap(storyColorsOf));
		return { col, colors: spentOrder.filter((c) => colors.has(c)) };
	});
	return columns.reduce((best, c) => (c.colors.length > best.colors.length ? c : best));
};

const feature = featureColumnOf(
	settled.cells,
	settled.history!.map((b) => b.color),
);
const featureCells: GridSpot[] = Array.from({ length: extentOf(settled.cells).rows }, (_, row) => ({ col: feature.col, row }));
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
export const CLOSING_SECONDS = 3.2;
export const FINALE_SECONDS = 6.2;

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

// The end card: the stage shrinks away, a splash pops, the lead-in pops, the
// romantic word's letters drop in, the disciplined line snaps in over its
// ruled underline, then the credit. Then it holds still.
const LETTER_FROM = 0.95;
const LETTER_EVERY = 0.06;
const LETTER_DROP = 170;

const finaleBeat = (sec: number): Pose => {
	const stage = closingBeat(CLOSING_SECONDS + sec);
	const drops = [...END_CARD.romantic.text].map((_, i) => {
		const from = LETTER_FROM + i * LETTER_EVERY;
		return sec < from ? null : LETTER_DROP * (1 - bounce(sec, from, BOUNCY));
	});
	return {
		...stage,
		stageLeave: settle(between(sec, 0, 0.5, Easing.in(Easing.back(1.8))), 1),
		endCard: {
			splash: bounce(sec, 0.55, POPPY),
			lead: between(sec, 0.6, 0.85, Easing.out(Easing.back(2.5))),
			drops,
			snap: between(sec, 2.0, 2.25, Easing.out(Easing.back(2.5))),
			underline: between(sec, 2.25, 2.7, Easing.inOut(Easing.cubic)),
			credit: between(sec, 3.2, 3.55, Easing.out(Easing.back(2.2))),
		},
	};
};

export const endingBeatList: Beat[] = [
	afterABreath(beat('story-outline', STORY_OUTLINE_SECONDS, 'One story touches many features…', storyOutlineBeat)),
	beat('feature-outline', FEATURE_OUTLINE_SECONDS, '…and one feature carries many stories.', featureOutlineBeat),
	afterABreath(beat('closing', CLOSING_SECONDS, 'Neither is better. They do different jobs.', closingBeat)),
	beat('finale', FINALE_SECONDS, '', finaleBeat),
];
