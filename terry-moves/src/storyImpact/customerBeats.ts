// The story's other impact: out in the world. Once the product is coherent,
// a customer pops up in front of it, looks at the change and nods, and a
// light bulb pops over their head. Then the new idea springs out of the bulb
// and bounces into the tray as the second ball, while the two balls behind
// it swap places, and the customer leaves. Each beat ends on its storyboard
// board.

import { Easing } from 'remotion';
import { BallPose, ideaBall, pinkBefore, pinkStory, Pose, StoryBefore, StorySpec, withIdea } from './scene';
import { coherentProductOf } from './assimilation';
import { ideaFlightPoint, traySpot } from './layout';
import { between, hopping, jelly, lerp, unless, withoutUndefined } from './motion';

export const CUSTOMER_SECONDS = 3;
export const NEW_IDEA_SECONDS = 3;

// Two nods, each a quick dip and back.
const NODS = [
	{ from: 0.9, to: 1.3 },
	{ from: 1.4, to: 1.85 },
];
const nodAt = (sec: number): number => {
	const nod = NODS.find((n) => sec >= n.from && sec < n.to);
	return nod ? Math.sin(Math.PI * between(sec, nod.from, nod.to)) : 0;
};

const BULB_POP = { from: 2.0, to: 2.4 };

// The customer pops up, nods at the product, and a light bulb pops over them.
// The tests and domain links fade as they appear.
export const customerBeatOf = (spec: StorySpec, before: StoryBefore) => (sec: number): Pose => {
	const show = between(sec, 0.25, 0.7, Easing.out(Easing.back(1.8)));
	const bulb = between(sec, BULB_POP.from, BULB_POP.to, Easing.out(Easing.back(2.6)));
	const fade = 1 - between(sec, 0, 0.25);
	return withoutUndefined({
		...coherentProductOf(spec, before),
		protect: fade > 0 ? { shields: 1, links: 1, fade: unless(fade, 1) } : undefined,
		customer: withoutUndefined({ show: unless(show, 1), nod: unless(nodAt(sec), 0), bulb }),
	});
};

const QUEUE = { from: 0.15, to: 0.85 }; // the queue makes room, the swapped ball hopping over
const FLIGHT = { from: 0.2, to: 1.2 }; // the idea flies from the bulb into its slot
const GROW_UNTIL = 0.25; // share of the flight over which the idea grows to full size
const SETTLE = [{ from: 1.3, to: 1.6, height: 16 }]; // a little bounce once it has landed
const LEAVE = { from: 1.9, to: 2.35 }; // the customer shrinks away
const SWAP_HOP = 56;

// A ball's center in a tray of `count` balls at slot `index`.
const slotX = (count: number, index: number, size: number) => traySpot(count, index, size).x;

export const newIdeaBeatOf = (spec: StorySpec, before: StoryBefore) => (sec: number): Pose => {
	const after = withIdea(before.backlog, ideaBall);
	const base = coherentProductOf(spec, before);
	const leave = between(sec, LEAVE.from, LEAVE.to, Easing.in(Easing.back(1.6)));
	const customer = leave >= 1 ? undefined : withoutUndefined({ show: unless(1 - leave, 1), bulb: 1 });
	if (sec < QUEUE.from) return withoutUndefined({ ...base, customer });

	const move = between(sec, QUEUE.from, QUEUE.to, Easing.inOut(Easing.cubic));
	const flight = between(sec, FLIGHT.from, FLIGHT.to, Easing.inOut(Easing.quad));
	const n = after.length;
	const backlog = after.map((ball, i): BallPose => {
		if (ball.id === ideaBall.id) {
			if (sec < FLIGHT.to) {
				const spot = traySpot(n, i, ball.size);
				const at = ideaFlightPoint(flight, spot);
				return withoutUndefined({
					...ball,
					flying: true,
					dx: at.x - spot.x,
					hop: spot.y - at.y,
					scale: sec < FLIGHT.from ? 0 : unless(lerp(0.3, 1, Math.min(1, flight / GROW_UNTIL)), 1),
				});
			}
			const settling = hopping(sec, SETTLE, 0.1);
			const squash = settling?.squash ?? jelly(sec, FLIGHT.to, 0.25, 3, 7);
			return withoutUndefined({ ...ball, hop: unless(settling?.hop ?? 0, 0), squash: unless(squash, 1) });
		}
		// The others slide from their places in the old queue to the new one;
		// the ball that moves back past its neighbor hops over it.
		const old = before.backlog.findIndex((b) => b.id === ball.id);
		const fromX = slotX(n - 1, old, ball.size);
		const dx = (fromX - slotX(n, i, ball.size)) * (1 - move);
		const hop = i > old + 1 && move < 1 ? SWAP_HOP * Math.sin(Math.PI * move) : 0;
		return withoutUndefined({ ...ball, dx: unless(dx, 0), hop: unless(hop, 0) });
	});
	return withoutUndefined({ ...base, backlog, customer });
};

const pink = pinkBefore();
export const customerBeat = customerBeatOf(pinkStory, pink);
export const newIdeaBeat = newIdeaBeatOf(pinkStory, pink);
