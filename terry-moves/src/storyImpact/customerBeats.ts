// Customer value: once the product is coherent, the Behavior the story
// touched is outlined, and a customer pops up in front of it — they see the
// behavior, never the structure — hearts pop, they nod, and a light bulb
// pops over their head. Then the new idea springs out of the bulb and
// bounces into the tray as the second ball, while the two balls behind it
// swap places, and the customer leaves.

import { Easing } from 'remotion';
import { BallPose, extentOf, GridSpot, ideaBall, OutlinePose, palette, Pose, StoryBefore, StorySpec, withIdea } from './scene';
import { coherentProductOf } from './assimilation';
import { ideaFlightPoint, traySpot } from './layout';
import { between, hopping, jelly, lastFrameAt, lerp, unless, withoutUndefined } from './motion';

export const CUSTOMER_SECONDS = 3.5;
export const NEW_IDEA_SECONDS = 3;

// Two nods, each a quick dip and back.
const NODS = [
	{ from: 1.7, to: 2.1 },
	{ from: 2.2, to: 2.6 },
];
const nodAt = (sec: number): number => {
	const nod = NODS.find((n) => sec >= n.from && sec < n.to);
	return nod ? Math.sin(Math.PI * between(sec, nod.from, nod.to)) : 0;
};

const BULB_POP = { from: 2.8, to: 3.2 };
const SHOW = { from: 0.75, to: 1.15 };
const HEARTS = { from: 1.2, to: 1.6 };
const BANDS = { from: 0.1, to: 0.75 };
const MARCH_SPEED = 28; // px per second

// The Behavior columns a story touched, adjacent ones together in one band.
export const touchedBehaviorOf = (spec: StorySpec, before: StoryBefore): GridSpot[][] => {
	const { rows } = extentOf(coherentProductOf(spec, before).cells);
	const cols = [...new Set([...spec.changed, spec.reorganized].map((c) => c.col))].sort((a, b) => a - b);
	const runs = cols.reduce<number[][]>((all, col) => {
		const last = all[all.length - 1];
		return last && last[last.length - 1] === col - 1 ? [...all.slice(0, -1), [...last, col]] : [...all, [col]];
	}, []);
	return runs.map((run) => run.flatMap((col) => Array.from({ length: rows }, (_, row) => ({ col, row }))));
};

// Green dashed boundaries around the touched Behavior, with no name: the
// customer-value pill names it.
export const behaviorBands = (spec: StorySpec, before: StoryBefore, draw: number, sec: number, opacity = 1): OutlinePose[] =>
	touchedBehaviorOf(spec, before).map((cells) =>
		withoutUndefined({
			cells,
			color: palette.behavior,
			together: true,
			draw,
			march: MARCH_SPEED * sec,
			opacity: unless(opacity, 1),
			label: '',
			pointAt: cells[0],
			tags: [],
		}),
	);

// The customer pops up in front of the outlined behavior, hearts pop, they
// nod, and a light bulb pops over them.
export const customerBeatOf = (spec: StorySpec, before: StoryBefore) => (sec: number): Pose => {
	const show = between(sec, SHOW.from, SHOW.to, Easing.out(Easing.back(1.8)));
	const hearts = between(sec, HEARTS.from, HEARTS.to, Easing.out(Easing.back(2.6)));
	const bulb = between(sec, BULB_POP.from, BULB_POP.to, Easing.out(Easing.back(2.6)));
	const draw = between(sec, BANDS.from, BANDS.to);
	return withoutUndefined({
		...coherentProductOf(spec, before),
		outlines: draw > 0 ? behaviorBands(spec, before, draw, sec) : undefined,
		customer: sec > SHOW.from ? withoutUndefined({ show: unless(show, 1), nod: unless(nodAt(sec), 0), bulb, hearts: unless(hearts, 0) }) : undefined,
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
	const customer = leave >= 1 ? undefined : withoutUndefined({ show: unless(1 - leave, 1), bulb: 1, hearts: 1 });
	// The bands fade as the idea takes off.
	const bandsFade = 1 - between(sec, 0, 0.4);
	const outlines = bandsFade > 0 ? behaviorBands(spec, before, 1, lastFrameAt(CUSTOMER_SECONDS) + sec, bandsFade) : undefined;
	if (sec < QUEUE.from) return withoutUndefined({ ...base, customer, outlines });

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
	return withoutUndefined({ ...base, backlog, customer, outlines });
};

