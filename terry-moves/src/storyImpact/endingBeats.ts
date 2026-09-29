// The film's ending, on the product the last story left: a story is not a
// feature. First one story's cells are outlined — they lie across several
// Behavior columns and Structure rows; then one Behavior column, a feature,
// is outlined and washed in its own color — it takes every Structure layer,
// and joints pop on where the layers work together. A story is an impact
// that means something only for planning, so nothing ties the feature back
// to stories: it is picked by its place, and it shows layers, not stories'
// colors. Then the outlines fade, the product rests and the next ball hops
// eagerly in the tray, while the two value pills spring back over it: story
// after story, customer value and option value build up, not debt. The
// product itself does not change. Finally the whole stage shrinks away and the end card lands the
// essay's last line, like the title, and credits the author.

import { extentOf, GridSpot, OutlinePose, palette, pinkStory, Pose, StorySpec } from './scene';
import { storyInHistoryOf } from './assimilation';
import { beat, Beat } from './film';
import { nextBeatOf } from './historyBeats';
import { lastStory } from './laterStories';
import { Easing } from 'remotion';
import { between, bounce, BOUNCY, clamp01, POPPY, settle, unless, withoutUndefined } from './motion';
import { END_CARD } from './endCard';
import { afterABreath } from './readingPace';
import { withValues } from './valueBeats';

// The product at rest after the last story, with every spent story in History.
const settled: Pose = storyInHistoryOf(lastStory.spec, lastStory.stage);

// The cells a story changed and reorganized.
const storyCellsOf = (spec: StorySpec): GridSpot[] => [...spec.changed, spec.reorganized];

// The feature: the Behavior column standing on the Structure axis, through
// every Structure row.
const FEATURE_COL = 0;
const layerCount = extentOf(settled.cells).rows;
const featureCells: GridSpot[] = Array.from({ length: layerCount }, (_, row) => ({ col: FEATURE_COL, row }));
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

const WASH = 0.85;

// The feature: one outline along the whole column, its cells washed in the
// feature's color, and joints between its layers.
const featureOutline = (draw: number, sec: number, opacity = 1, joints = 1): OutlinePose =>
	withoutUndefined({
		cells: featureCells,
		color: palette.behavior,
		together: true,
		draw,
		march: MARCH_SPEED * sec,
		opacity: unless(opacity, 1),
		label: 'a feature',
		pointAt: { col: FEATURE_COL - 0.12, row: 3.4 },
		tags: [],
		layers: layerCount,
		wash: WASH * clamp01(draw / 0.6),
		joints,
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
			featureOutline(between(sec, SWAP, 1.5), sec, 1, between(sec, 1.5, 2.4)),
		],
		dim:
			sec < SWAP
				? { except: storyCells, amount: DIM * fading }
				: { except: featureCells, amount: DIM * between(sec, SWAP, 1.0) },
	};
};

const HOP_FROM = 0.3; // the next ball starts hopping as the outlines fade

// The two values spring back as the line lands, and the option's key glints.
const VALUES_SPRING = { from: 0.8, to: 1.5 };
const VALUES_GLINT = { from: 1.7, to: 2.2 };

const closingBeat = (sec: number): Pose => {
	const next = nextBeatOf(lastStory.spec, lastStory.stage)(Math.max(0, sec - HOP_FROM));
	const fading = 1 - between(sec, 0, 0.6);
	const rested: Pose =
		fading > 0
			? {
					...next,
					outlines: [featureOutline(1, FEATURE_OUTLINE_SECONDS + sec, fading)],
					dim: { except: featureCells, amount: DIM * fading },
				}
			: next;
	const spring = between(sec, VALUES_SPRING.from, VALUES_SPRING.to, Easing.out(Easing.back(1.6)));
	const glint = between(sec, VALUES_GLINT.from, VALUES_GLINT.to, Easing.out(Easing.back(2)));
	return spring > 0 ? withValues(rested, withoutUndefined({ spring: Math.min(spring, 1), customer: 1, option: 1, glint: unless(glint, 0) })) : rested;
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
	beat('feature-outline', FEATURE_OUTLINE_SECONDS, '…and one feature takes many layers working together.', featureOutlineBeat),
	afterABreath(beat('closing', CLOSING_SECONDS, 'Story after story, value builds up. Not debt.', closingBeat)),
	beat('finale', FINALE_SECONDS, '', finaleBeat),
];
