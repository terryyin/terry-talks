// The first (pink) story's impact, named and split into its two values. Once
// the product is coherent, an "impact!" burst pops and two value pills spring
// out of it to their places. Customer value comes first: the customer sees
// the behavior the story touched (customerBeats.ts). Then option value, which
// users never see: the judgment spent on tests and on a structure that maps
// the domain (protectBeats.ts). The pills fade as the spent story goes to
// History; the customer's idea later brings the option pill back when it
// exercises the option (laterStories.ts).

import { Easing } from 'remotion';
import { pinkAfterIdea, pinkBefore, pinkStory, Pose, ProtectPose, ValuesPose } from './scene';
import { coherentProductOf } from './assimilation';
import { customerBeatOf, newIdeaBeatOf } from './customerBeats';
import { domainBeatOf, testsBeatOf } from './protectBeats';
import { historyBeatOf } from './historyBeats';
import { between, bounce, lerp, POPPY, unless, withoutUndefined } from './motion';

export const IMPACT_SECONDS = 4;

// A pill steps back to this opacity while the other value is in focus.
export const DIMMED = 0.35;

export const withValues = (pose: Pose, values: ValuesPose | undefined): Pose => (values ? { ...pose, values: withoutUndefined(values) } : pose);

// Both pills in place, each at its opacity.
export const pills = (customer: number, option: number, glint?: number): ValuesPose =>
	withoutUndefined({ spring: 1, customer, option, glint: glint === undefined ? undefined : unless(glint, 0) });

const BURST_FROM = 0.15;
const SPRING = { from: 1.2, to: 2.1 };
const BURST_OUT = { from: 2.0, to: 2.5 };

// The burst pops over the coherent product, then the pills spring out of it
// and it fades away.
export const impactBeat = (sec: number): Pose => {
	const burst = bounce(sec, BURST_FROM, POPPY);
	const spring = between(sec, SPRING.from, SPRING.to, Easing.inOut(Easing.cubic));
	const fade = 1 - between(sec, BURST_OUT.from, BURST_OUT.to);
	const values: ValuesPose = {
		burst: fade > 0 && burst > 0 ? burst : undefined,
		burstFade: fade > 0 ? unless(fade, 1) : undefined,
		spring,
		customer: spring > 0 ? 1 : 0,
		option: spring > 0 ? 1 : 0,
	};
	return withValues(coherentProductOf(pinkStory, pinkBefore()), sec < BURST_FROM ? undefined : values);
};

// The pills' focus moving from one value to the other over the first
// moments of a beat.
const refocus = (sec: number, from: [number, number], to: [number, number]): ValuesPose => {
	const k = between(sec, 0, 0.4, Easing.inOut(Easing.cubic));
	return pills(lerp(from[0], to[0], k), lerp(from[1], to[1], k));
};

const pink = pinkBefore();
const afterIdea = pinkAfterIdea();

export const customerValueBeat = (sec: number): Pose => withValues(customerBeatOf(pinkStory, pink)(sec), refocus(sec, [1, 1], [1, DIMMED]));
export const newIdeaValueBeat = (sec: number): Pose => withValues(newIdeaBeatOf(pinkStory, pink)(sec), pills(1, DIMMED));
export const optionTestsBeat = (sec: number): Pose => withValues(testsBeatOf(pinkStory, afterIdea)(sec), refocus(sec, [1, DIMMED], [DIMMED, 1]));
export const optionDomainBeat = (sec: number): Pose => withValues(domainBeatOf(pinkStory, afterIdea)(sec), pills(DIMMED, 1));

// The pills, the shields and the domain links fade as the spent story sets
// off for History.
const history = historyBeatOf(pinkStory, afterIdea);
export const pinkHistoryBeat = (sec: number): Pose => {
	const fade = 1 - between(sec, 0, 0.4);
	if (fade <= 0) return history(sec);
	const protect: ProtectPose = { shields: 1, links: 1, fade };
	return withValues({ ...history(sec), protect }, pills(DIMMED * fade, fade));
};
