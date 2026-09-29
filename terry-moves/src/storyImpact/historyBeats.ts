// The last beats of the one-story film: the spent story's pale, emptied skin
// peels off the product and drifts, bouncy and content, into History; then
// the next ball hops eagerly at the front of the queue. The product's changed
// cells stay: the story's effect remains, only the used-up story leaves.
// Each beat is built from a story and the stage before it; the plain beats
// are the pink (example) story's.

import { Easing } from 'remotion';
import { BallPose, pinkAfterIdea, pinkStory, SpentPose, StoryBeat, StoryBefore, StorySpec } from './scene';
import { coherentProductOf, readyForNextOf, storyInHistoryOf } from './assimilation';
import { historySpot, HOP, Point, wallPoint } from './layout';
import { between, bounce, bounceSpeed, BOUNCY, hopping, jelly, lerpPoint, POPPY, unless, withoutUndefined } from './motion';

// --- 9. history -------------------------------------------------------------

const SPARKLES_OUT = 0.4;
const BOX_FROM = 0.1;
const PEEL_FROM = 0.6;
const PEEL_UNTIL = 1.3;
const DRIFT = { from: 1.4, to: 3.3 };
const FALL_UNTIL = 3.6;
const DROP = 60; // px above its resting spot where it starts to drop in, just under the History label

const LIFT: Point = { x: 12, y: -44 };
// It drifts down and round the wall's "Product" label, then up to the box,
// under the History label.
const BENDS: [Point, Point] = [
	{ x: 230, y: 470 },
	{ x: 100, y: 330 },
];

// The skin, from lying flat on the wall to drifting above its spot in
// History, next to the stories spent before it.
const skinAt = (spec: StorySpec, before: StoryBefore, sec: number): SpentPose => {
	// It peels off the middle of the cell the story hit hardest.
	const peelSpot: Point = wallPoint(spec.impact.col + 0.5, spec.impact.row + 0.5);
	const spent = before.history.length;
	const rest = historySpot(spent + 1, spent, spec.ball.size);
	const aboveRest: Point = { x: rest.x, y: rest.y - DROP };
	const onArc = (u: number): Point => {
		const from = { x: peelSpot.x + LIFT.x, y: peelSpot.y + LIFT.y };
		const v = 1 - u;
		const [a, b] = BENDS;
		const at = (k: 'x' | 'y') => v * v * v * from[k] + 3 * v * v * u * a[k] + 3 * v * u * u * b[k] + u * u * u * aboveRest[k];
		return { x: at('x'), y: at('y') };
	};
	// It loosens slowly, then pops free with a little overshoot.
	const peel = between(sec, PEEL_FROM, PEEL_UNTIL, Easing.out(Easing.back(2.2)));
	const ball = spec.ball;
	if (sec < DRIFT.from) {
		const lifted = lerpPoint(peelSpot, { x: peelSpot.x + LIFT.x, y: peelSpot.y + LIFT.y }, Math.min(1, peel));
		return withoutUndefined({ ball, at: lifted, peel: unless(peel, 1), squash: unless(jelly(sec, PEEL_UNTIL - 0.2, 0.12), 1) });
	}
	// A gentle, bouncy drift: bobbing up and down and wobbling as it floats.
	const s = sec - DRIFT.from;
	const u = between(sec, DRIFT.from, DRIFT.to, Easing.inOut(Easing.sin));
	const along = onArc(u);
	const swell = Math.sin(Math.PI * u);
	const bob = 14 * swell * Math.sin(2 * Math.PI * 1.6 * s);
	const squash = 1 + 0.1 * swell * Math.sin(2 * Math.PI * 1.6 * s + Math.PI / 2);
	return withoutUndefined({ ball, at: { x: along.x, y: along.y + bob }, squash: unless(squash, 1) });
};

export const HISTORY_SECONDS = 4.5;

export const historyBeatOf: StoryBeat = (spec, before) => (sec) => {
	const target = storyInHistoryOf(spec, before);
	// The coherent product's sparkles fade as the story's journey goes on.
	const sparkles = 1 - between(sec, 0, SPARKLES_OUT);
	const fading = sparkles > 0 ? { assimilation: coherentProductOf(spec, before).assimilation, sparkles } : {};
	// The History box pops in with the first spent story; later, it is there.
	const reveal = before.history.length === 0 ? bounce(sec, BOX_FROM, POPPY) : 1;
	let history: BallPose[] = before.history;
	let spent: SpentPose | undefined;
	if (sec < DRIFT.to) {
		spent = skinAt(spec, before, sec);
	} else {
		// It drops into the box, squashes on landing, wobbles and dozes off.
		const fall = between(sec, DRIFT.to, FALL_UNTIL, Easing.in(Easing.quad));
		const squash = sec < FALL_UNTIL ? 1 - 0.12 * fall : jelly(sec, FALL_UNTIL, 0.28, 3, 8);
		history = [...before.history, withoutUndefined({ ...spec.ball, hop: unless(DROP * (1 - fall), 0), squash: unless(squash, 1) })];
	}
	// Earlier spent stories shuffle aside, and the box grows if it must, to
	// make room while the skin drifts over.
	const earlier = before.history.length;
	const room = earlier === 0 ? undefined : earlier + between(sec, DRIFT.from, DRIFT.to, Easing.inOut(Easing.cubic));
	return withoutUndefined({
		...target,
		...fading,
		history,
		historyReveal: unless(reveal, 1),
		historyRoom: room === undefined ? undefined : unless(room, history.length),
		spent,
	});
};

// --- 10. next -----------------------------------------------------------------

const EAGER_FROM = 1.3;

export const NEXT_SECONDS = 4;

export const nextBeatOf: StoryBeat = (spec, before) => (sec) => {
	const target = readyForNextOf(spec, before);
	const [next, ...rest] = before.backlog;
	// The next ball gets excited: two little hops, then an eager spring up.
	let front: BallPose;
	if (sec < EAGER_FROM) {
		const { hop, squash } = hopping(
			sec,
			[
				{ from: 0.25, to: 0.65, height: 18 },
				{ from: 0.75, to: 1.05, height: 10 },
			],
			0.1,
		) ?? { hop: 0, squash: 1 };
		front = withoutUndefined({ ...next, hop: unless(hop, 0), squash: unless(squash, 1) });
	} else {
		const rise = bounce(sec, EAGER_FROM, BOUNCY);
		const speed = Math.abs(bounceSpeed(sec, EAGER_FROM, BOUNCY));
		const squash = 1 / (1 + speed * 4);
		front = withoutUndefined({ ...target.backlog[0], hop: unless(HOP * rise, HOP), squash: unless(squash, 1) });
	}
	// The rest of the queue shuffles up behind it, one after the other.
	const queue = rest.map((ball, i) => {
		const k = between(sec, 0.1 + 0.15 * i, 0.8 + 0.15 * i, Easing.inOut(Easing.quad));
		const lean = k > 0 && k < 1 ? Math.sin(Math.PI * k) : 0;
		return withoutUndefined({ ...ball, dx: unless(-12 * lean, 0), squash: unless(1 + 0.08 * lean, 1) });
	});
	return { ...target, backlog: [front, ...queue] };
};

const pink = pinkAfterIdea();
export const nextBeat = nextBeatOf(pinkStory, pink);
