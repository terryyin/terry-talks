// The last beats of the one-story film: the spent story's pale, emptied skin
// peels off the product and drifts, bouncy and content, into History; then
// the next ball hops eagerly at the front of the queue. The product's changed
// cells stay: the story's effect remains, only the used-up story leaves.

import { Easing } from 'remotion';
import { BallPose, exampleBall, IMPACT, Pose, SpentPose } from './scene';
import { coherentProduct, readyForNext, storyInHistory } from './assimilation';
import { historySpot, HOP, Point, wallPoint } from './layout';
import { between, bounce, bounceSpeed, BOUNCY, hopping, jelly, lerpPoint, POPPY, unless, withoutUndefined } from './motion';

// --- 9. history -------------------------------------------------------------

const SPARKLES_OUT = 0.4;
const BOX_FROM = 0.1;
const PEEL_FROM = 0.6;
const PEEL_UNTIL = 1.3;
const DRIFT = { from: 1.4, to: 3.3 };
const FALL_UNTIL = 3.6;
const DROP = 70; // px above its resting spot where it starts to drop in

// It peels off the middle of the cell the story hit hardest.
const PEEL_SPOT: Point = wallPoint(IMPACT.col + 0.5, IMPACT.row + 0.5);
const LIFT: Point = { x: 12, y: -44 };
const REST = historySpot(1, 0, exampleBall.size);
const ABOVE_REST: Point = { x: REST.x, y: REST.y - DROP };
const ARC_PEAK: Point = { x: 300, y: 40 };

const onArc = (u: number): Point => {
	const from = { x: PEEL_SPOT.x + LIFT.x, y: PEEL_SPOT.y + LIFT.y };
	const v = 1 - u;
	return {
		x: v * v * from.x + 2 * v * u * ARC_PEAK.x + u * u * ABOVE_REST.x,
		y: v * v * from.y + 2 * v * u * ARC_PEAK.y + u * u * ABOVE_REST.y,
	};
};

// The skin, from lying flat on the wall to drifting above its spot.
const skinAt = (sec: number): SpentPose => {
	// It loosens slowly, then pops free with a little overshoot.
	const peel = between(sec, PEEL_FROM, PEEL_UNTIL, Easing.out(Easing.back(2.2)));
	const ball = exampleBall;
	if (sec < DRIFT.from) {
		const lifted = lerpPoint(PEEL_SPOT, { x: PEEL_SPOT.x + LIFT.x, y: PEEL_SPOT.y + LIFT.y }, Math.min(1, peel));
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

export const historyBeat = (sec: number): Pose => {
	const target = storyInHistory();
	// The coherent product's sparkles fade as the story's journey goes on.
	const sparkles = 1 - between(sec, 0, SPARKLES_OUT);
	const fading = sparkles > 0 ? { assimilation: coherentProduct().assimilation, sparkles } : {};
	const reveal = bounce(sec, BOX_FROM, POPPY);
	let history: BallPose[] = [];
	let spent: SpentPose | undefined;
	if (sec < DRIFT.to) {
		spent = skinAt(sec);
	} else {
		// It drops into the box, squashes on landing, wobbles and dozes off.
		const fall = between(sec, DRIFT.to, FALL_UNTIL, Easing.in(Easing.quad));
		const squash = sec < FALL_UNTIL ? 1 - 0.12 * fall : jelly(sec, FALL_UNTIL, 0.28, 3, 8);
		history = [withoutUndefined({ ...exampleBall, hop: unless(DROP * (1 - fall), 0), squash: unless(squash, 1) })];
	}
	return withoutUndefined({
		...target,
		...fading,
		history,
		historyReveal: unless(reveal, 1),
		spent,
	});
};

// --- 10. next -----------------------------------------------------------------

const EAGER_FROM = 1.3;

export const NEXT_SECONDS = 4;

export const nextBeat = (sec: number): Pose => {
	const target = readyForNext();
	const [next, ...rest] = storyInHistory().backlog;
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
