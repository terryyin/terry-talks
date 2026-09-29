// The two focuses, shown on the pink (first) story only: while the story
// hovers it wears a "customer-value focused" tag; once it has splashed onto
// the product, the whole wall is outlined as "whole-product focused" while
// the developers assimilate the splash. The general story beats stay
// unchanged, so later stories carry neither.

import { Easing } from 'remotion';
import { GridSpot, OutlinePose, palette, pinkStory, Pose, tidyCells } from './scene';
import { flightBeat, fuzzyBeat, wishBeat } from './storyBeats';
import { ASSIMILATE_SECONDS, assimilateBeat, coherentBeat, WOBBLE_SECONDS, wobbleBeat } from './productBeats';
import { between, lastFrameAt, unless, withoutUndefined } from './motion';

export const VALUE_FOCUS = 'customer-value focused';
export const PRODUCT_FOCUS = 'whole-product focused';

export const withValueTag = (pose: Pose, show: number, fade = 1): Pose => ({
	...pose,
	tag: withoutUndefined({ text: VALUE_FOCUS, color: pinkStory.ball.color, show, fade: unless(fade, 1) }),
});

const everyCell: GridSpot[] = tidyCells().map(({ col, row }) => ({ col, row }));
const MARCH_SPEED = 28; // px per second

export const wholeProductOutline = (draw: number, sec: number, opacity = 1): OutlinePose =>
	withoutUndefined({
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

// The pink story's beats with its focuses.
const DRAW = { from: 0.6, to: 1.6 }; // after the SPLAT! word has gone

export const valueWishBeat = (sec: number): Pose => withValueTag(wishBeat(sec), between(sec, 0.9, 1.3, Easing.out(Easing.back(2.2))));
export const valueFuzzyBeat = (sec: number): Pose => withValueTag(fuzzyBeat(sec), 1);
export const valueFlightBeat = (sec: number): Pose => {
	const fade = 1 - between(sec, 0.15, 0.55);
	return fade > 0 ? withValueTag(flightBeat(sec), 1, fade) : flightBeat(sec);
};

export const productWobbleBeat = (sec: number): Pose => {
	const draw = between(sec, DRAW.from, DRAW.to);
	return withOutline(wobbleBeat(sec), draw > 0 ? wholeProductOutline(draw, sec) : undefined);
};
export const productAssimilateBeat = (sec: number): Pose => withOutline(assimilateBeat(sec), wholeProductOutline(1, WOBBLE_SECONDS + sec));
export const productCoherentBeat = (sec: number): Pose => {
	const opacity = 1 - between(sec, 0, 0.5);
	const march = WOBBLE_SECONDS + ASSIMILATE_SECONDS + sec;
	return withOutline(coherentBeat(sec), opacity > 0 ? wholeProductOutline(1, march, opacity) : undefined);
};

// Where the wobble and assimilate beats end, for their boards.
export const wobbleEndOutline = () => wholeProductOutline(1, lastFrameAt(WOBBLE_SECONDS));
export const assimilateEndOutline = () => wholeProductOutline(1, WOBBLE_SECONDS + lastFrameAt(ASSIMILATE_SECONDS));
