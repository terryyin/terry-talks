// The two focuses, and the judgment the work takes, shown on the pink
// (first) story only: while the story
// hovers it wears a "customer-value focused" tag; once it has splashed onto
// the product, the whole wall is outlined as "whole-product focused" while
// the developers assimilate the splash. The general story beats stay
// unchanged, so later stories carry neither.

import { Easing } from 'remotion';
import { GridSpot, OutlinePose, palette, pinkStory, Pose, tidyCells } from './scene';
import { flightBeat, fuzzyBeat, FUZZ_FROM, storyOf, wishBeat } from './storyBeats';
import { storyWishes } from './scene';
import { ASSIMILATE_SECONDS, assimilateBeat, coherentBeat, WOBBLE_SECONDS, wobbleBeat } from './productBeats';
import { between, jelly, lastFrameAt, unless, withoutUndefined } from './motion';

export const VALUE_FOCUS = 'customer-value focused';
export const PRODUCT_FOCUS = 'whole-product focused';

export const withValueTag = (pose: Pose, show: number, fade = 1): Pose => ({
	...pose,
	tag: withoutUndefined({ text: VALUE_FOCUS, color: pinkStory.ball.color, show, fade: unless(fade, 1) }),
});

const everyCell: GridSpot[] = tidyCells().map(({ col, row }) => ({ col, row }));
const MARCH_SPEED = 28; // px per second

export const wholeProductOutline = (draw: number, sec: number, opacity = 1, labelShow = 1): OutlinePose =>
	withoutUndefined({
		labelShow: unless(labelShow, 1),
		cells: everyCell,
		color: palette.structure,
		together: true,
		draw,
		march: MARCH_SPEED * sec,
		opacity: unless(opacity, 1),
		label: PRODUCT_FOCUS,
		at: { x: 760, y: 300 },
		pointAt: { col: 0.3, row: 3.7 },
		tags: [],
	});

export const withOutline = (pose: Pose, outline: OutlinePose | undefined): Pose => (outline ? { ...pose, outlines: [outline] } : pose);

// The pink story's beats with its focuses. One message at a time: the wish
// bubble shows alone; it pops away, and only then the tag pops in, in a beat
// of its own; the tag is gone before the story turns fuzzy.
const DRAW = { from: 0.6, to: 1.6 }; // after the SPLAT! word has gone

export const valueWishBeat = wishBeat;

// The story hovers without its bubble, bobbing gently.
const hovering = (sec: number): Pose => storyOf(storyWishes(), { bubble: 0, squash: unless(jelly(sec, 0.35, 0.05, 1.6, 3), 1) });

export const FOCUS_SECONDS = 2.8;
const BUBBLE_OUT = 0.35;
const TAG_POP = { from: 0.45, to: 0.85 };
export const valueFocusBeat = (sec: number): Pose => {
	if (sec < BUBBLE_OUT) return fuzzyBeat(sec); // the fuzzy beat starts by popping the bubble away
	return withValueTag(hovering(sec), between(sec, TAG_POP.from, TAG_POP.to, Easing.out(Easing.back(2.2))));
};

export const focusBoard = (): Pose => withValueTag(storyOf(storyWishes(), { bubble: 0 }), 1);

// The tag fades before the story turns fuzzy.
export const valueFuzzyBeat = (sec: number): Pose => {
	if (sec >= FUZZ_FROM) return fuzzyBeat(sec);
	const fade = 1 - between(sec, 0, FUZZ_FROM * 0.9);
	const bare = storyOf(storyWishes(), { bubble: 0 });
	return fade > 0 ? withValueTag(bare, 1, fade) : bare;
};
export const valueFlightBeat = flightBeat;

export const productWobbleBeat = (sec: number): Pose => {
	const draw = between(sec, DRAW.from, DRAW.to);
	return withOutline(wobbleBeat(sec), draw > 0 ? wholeProductOutline(draw, sec) : undefined);
};
// While the developers assimilate the splash, it is judgment-intensive: the
// whole-product name gives way to "judgment-intensive" in the same spot,
// while the outline stays.
const LABEL_OUT = { from: 0.05, to: 0.35 };
const JUDGMENT_POP = { from: 0.35, to: 1.35 };
const labelShowAt = (sec: number) => 1 - between(sec, LABEL_OUT.from, LABEL_OUT.to);
export const withJudgment = (pose: Pose, show: number, bob: number, fade = 1): Pose =>
	show > 0 && fade > 0 ? { ...pose, judgment: withoutUndefined({ show, bob, fade: unless(fade, 1) }) } : pose;

export const productAssimilateBeat = (sec: number): Pose =>
	withJudgment(withOutline(assimilateBeat(sec), wholeProductOutline(1, WOBBLE_SECONDS + sec, 1, labelShowAt(sec))), between(sec, JUDGMENT_POP.from, JUDGMENT_POP.to), sec);
export const productCoherentBeat = (sec: number): Pose => {
	const opacity = 1 - between(sec, 0, 0.5);
	const march = WOBBLE_SECONDS + ASSIMILATE_SECONDS + sec;
	const coherent = withOutline(coherentBeat(sec), opacity > 0 ? wholeProductOutline(1, march, opacity, 0) : undefined);
	return withJudgment(coherent, 1, ASSIMILATE_SECONDS + sec, opacity);
};

// Where the wobble and assimilate beats end, for their boards.
export const wobbleEndOutline = () => wholeProductOutline(1, lastFrameAt(WOBBLE_SECONDS));
export const assimilateEndOutline = () => wholeProductOutline(1, WOBBLE_SECONDS + lastFrameAt(ASSIMILATE_SECONDS), 1, 0);
export const assimilateEndJudgment = (pose: Pose): Pose => withJudgment(pose, 1, lastFrameAt(ASSIMILATE_SECONDS));
