// The full film's opening beats: the title, then the product space is built
// (axes grow, cells pop in tidily), then Time and the backlog arrive (the
// Time arrow grows, the tray slides in, the stories bounce into it). The
// product is built with eased, crisp motion; the stories bounce. Each beat
// maps seconds into the beat to a pose; the space and time beats end on the
// storyboard's first and second boards.

import { Easing } from 'remotion';
import { BallPose, CellPose, Pose, productOverTime, productSpace, TitlePose } from './scene';
import { between, bounce, BOUNCY, POPPY, settle, unless, withoutUndefined } from './motion';

export const TITLE = { romantic: 'Romantic stories,', disciplined: 'disciplined products' } as const;

// 0. The title on the empty paper: a paint splash, the romantic letters drop
// in one by one, the disciplined line snaps in over a ruled underline, then
// the whole title shrinks away.
export const TITLE_SECONDS = 3.2;
const LETTER_FROM = 0.3;
const LETTER_EVERY = 0.04;
const LETTER_DROP = 150;

const titleAt = (sec: number): TitlePose => ({
	...TITLE,
	splash: bounce(sec, 0.05, POPPY),
	drops: [...TITLE.romantic].map((_, i) => {
		const from = LETTER_FROM + i * LETTER_EVERY;
		return sec < from ? null : LETTER_DROP * (1 - bounce(sec, from, BOUNCY));
	}),
	snap: between(sec, 1.3, 1.55, Easing.out(Easing.back(2.5))),
	underline: between(sec, 1.55, 2.0, Easing.inOut(Easing.cubic)),
	leave: settle(between(sec, 2.6, 3.15, Easing.in(Easing.back(1.8))), 1),
});

export const titleBeat = (sec: number): Pose => ({
	cells: [],
	showTime: false,
	backlog: [],
	axes: 0,
	wall: 0,
	title: titleAt(sec),
});

// 1. The product space: the axes grow from the origin, the wall pops up, and
// the cells pop into place in a tidy diagonal wave from the origin.
export const SPACE_SECONDS = 4.5;
const CELLS_FROM = 1.25;
const CELL_EVERY = 0.11;
const CELL_POP = 0.28;

export const spaceBeat = (sec: number): Pose => {
	const base = productSpace();
	const axes = between(sec, 0.1, 1.1, Easing.out(Easing.cubic));
	const wall = between(sec, 0.85, 1.3, Easing.out(Easing.back(1.4)));
	const cells = base.cells.map((cell): CellPose => {
		const from = CELLS_FROM + (cell.col + cell.row) * CELL_EVERY;
		const pop = between(sec, from, from + CELL_POP, Easing.out(Easing.back(2.2)));
		return withoutUndefined({ ...cell, pop: unless(pop, 1) });
	});
	return withoutUndefined({ ...base, cells, axes: unless(axes, 1), wall: unless(wall, 1) });
};

// 2. Time and the backlog: the Time arrow grows, the tray slides in, and the
// stories drop into it one by one, bouncing to rest.
export const TIME_SECONDS = 4.5;
const DROP_FROM = 1.35;
const DROP_EVERY = 0.4;
const FALL = { seconds: 0.4, height: 620 };
const LANDING = 0.1;
const REBOUNDS = [
	{ seconds: 0.32, height: 56 },
	{ seconds: 0.2, height: 16 },
];

// A ball falling from above the stage, then bouncing to rest: its height
// above the tray floor and its squash. Undefined once at rest.
const dropping = (s: number): { hop: number; squash: number } | undefined => {
	if (s < FALL.seconds) {
		const k = Math.max(0, s) / FALL.seconds;
		return { hop: FALL.height * (1 - k * k), squash: 1 - 0.28 * k };
	}
	let t = s - FALL.seconds;
	for (const rebound of [...REBOUNDS, undefined]) {
		if (t < LANDING) return { hop: 0, squash: 1 + 0.3 * Math.sin((Math.PI * t) / LANDING) * (rebound ? 1 : 0.5) };
		t -= LANDING;
		if (!rebound) return undefined;
		if (t < rebound.seconds) {
			const k = t / rebound.seconds;
			return { hop: rebound.height * 4 * k * (1 - k), squash: 1 - 0.1 * Math.sin(Math.PI * k) };
		}
		t -= rebound.seconds;
	}
	return undefined;
};

export const timeBeat = (sec: number): Pose => {
	const base = productOverTime();
	const timeGrow = between(sec, 0.1, 0.9, Easing.out(Easing.cubic));
	const trayIn = settle(between(sec, 0.6, 1.3, Easing.out(Easing.back(1.2))), 0);
	const backlog = base.backlog.map((ball, i): BallPose => {
		const moving = dropping(sec - (DROP_FROM + i * DROP_EVERY));
		return withoutUndefined({ ...ball, hop: unless(moving?.hop, 0), squash: unless(moving?.squash, 1) });
	});
	return withoutUndefined({ ...base, backlog, timeGrow: unless(timeGrow, 1), trayIn: unless(trayIn, 1) });
};
