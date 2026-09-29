// The product's beats of the one-story film: it wobbles under the splash,
// then development assimilates it into a coherent product. The product moves
// with eased slides and crisp snaps. Each beat maps seconds into the beat to
// a pose that ends on its storyboard board. Each beat is built from a story
// and the stage before it; the plain beats are the pink (example) story's.

import { Easing } from 'remotion';
import { CellPose, distanceToCell, Extent, extentOf, messyProductOf, pinkBefore, pinkStory, plainCellColor, sameSpot, StoryBeat, storySplashesOf } from './scene';
import { assimilatingOf, coherentProductOf } from './assimilation';
import { between, bounce, lastFrameAt, POPPY, settle, toward, unless, WOBBLY, withoutUndefined } from './motion';

// The product moves tidily: eased slides between two moments of the beat.
const tidily = (sec: number, from: number, to: number, easing = Easing.inOut(Easing.cubic)) => between(sec, from, to, easing);

// A cell part-way from one pose to another: offsets and tilt by `k`, with
// the rest of the fields given by the caller.
const cellToward = (from: CellPose, to: CellPose, k: number, rest: Partial<CellPose>): CellPose =>
	withoutUndefined({
		...to,
		dx: toward(from.dx, to.dx, k),
		dy: toward(from.dy, to.dy, k),
		rot: toward(from.rot, to.rot, k),
		...rest,
	});

// A smear showing by `amount` (0 = gone, 1 = as on the storyboard).
const smearing = (smear: string | undefined, amount: number): Pick<CellPose, 'smear' | 'smearAmount'> =>
	amount > 0 ? { smear, smearAmount: unless(amount, 1) } : { smear: undefined, smearAmount: undefined };

const isMoved = (cell: CellPose) => cell.dx !== 0 || cell.dy !== 0 || cell.rot !== 0;

export const WOBBLE_SECONDS = 3.5;

// 6. The product wobbles: the cells near the splat get knocked and jiggle
// like jelly into their messy offsets, the paint seeps in and smears them,
// and the drips run further.
export const wobbleBeatOf: StoryBeat = (spec, before) => (sec) => {
	const messy = messyProductOf(spec, before);
	const splat = messy.splat!;
	const fresh = storySplashesOf(spec, before).splat!;
	const cells = messy.cells.map((cell) => {
		if (!isMoved(cell)) return cell;
		const delay = 0.04 + 0.12 * distanceToCell(spec.impact, cell.col, cell.row);
		const k = bounce(sec, delay, WOBBLY);
		const smearAmount = cell.smear ? tidily(sec, 0.35 + delay, 1.4 + delay) : 1;
		return withoutUndefined({
			...cell,
			dx: cell.dx * k,
			dy: cell.dy * k,
			rot: cell.rot * k,
			...smearing(cell.smear, smearAmount),
		});
	});
	const shoutScale = 1 - tidily(sec, 0.1, 0.5, Easing.in(Easing.back(2)));
	const cover = 1 - tidily(sec, 0.35, 1.0);
	const drip = toward(fresh.drip, splat.drip, tidily(sec, 0.3, 2.8));
	const seeping = withoutUndefined({
		...splat,
		drip,
		shout: shoutScale > 0 ? fresh.shout : undefined,
		shoutScale: shoutScale > 0 ? unless(shoutScale, 1) : undefined,
		cover: unless(cover, 0),
	});
	return { ...messy, cells, splat: seeping };
};

// 7. Development assimilates the splash: the nudged cells slide home one by
// one and click into place, the hard-hit ones slide most of the way back,
// the paint drains out of the splat into the cells where the change belongs,
// and the reorganized cell splits in two. If the story changes the product's
// size, the wall eases out and the new cells pop in along it, or the cells
// that go pop out before the wall eases in: one calm change at a time.
export const ASSIMILATE_SECONDS = 4;
const ASSIMILATE_END = lastFrameAt(ASSIMILATE_SECONDS);
const GROW = { from: 0.3, to: 1.6 }; // the wall eases out
const POP_IN = { from: 1.6, every: 0.12, seconds: 0.3 }; // then the new cells pop in, from the ground up
const NEW_FILL_FROM = 2.3; // a new cell takes the story's color once it is there
const POP_OUT = { from: 0.3, every: 0.1, seconds: 0.3 }; // the cells that go pop out, from the Structure axis outward
const SHRINK = { from: 1.1, to: 2.1 }; // then the wall eases in

// The wall's size while it eases from one extent to another.
const easedExtent = (from: Extent, to: Extent, sec: number): Extent => {
	const grows = to.columns > from.columns || to.rows > from.rows;
	const calm = Easing.inOut(Easing.sin);
	const k = grows ? tidily(sec, GROW.from, GROW.to, calm) : tidily(sec, SHRINK.from, SHRINK.to, calm);
	return { columns: toward(from.columns, to.columns, k), rows: toward(from.rows, to.rows, k) };
};

export const assimilateBeatOf: StoryBeat = (spec, before) => (sec) => {
	const messy = messyProductOf(spec, before);
	const target = assimilatingOf(spec, before);
	const fromOf = (to: CellPose) => messy.cells.find((c) => sameSpot(c, to));
	const nudged = target.cells.filter((to) => to.snapped).map(fromOf).filter((c): c is CellPose => c !== undefined && isMoved(c));
	const cells = target.cells.map((to) => {
		const existing = fromOf(to);
		const from = existing ?? { ...to, color: plainCellColor(to), split: undefined, snapped: undefined };
		const turn = nudged.indexOf(from);
		const k = turn >= 0 ? tidily(sec, 0.25 + 0.3 * turn, 0.95 + 0.3 * turn) : isMoved(from) ? tidily(sec, 0.4, 3.3) : 1;
		// The paint drains in over the rest of the beat, each cell at its own pace.
		const fillFrom = existing ? 1.0 + 0.3 * ((from.col + from.row) % 3) : NEW_FILL_FROM;
		const fill = to.color !== from.color ? tidily(sec, fillFrom, ASSIMILATE_END) : 1;
		// A smear that is gone in the target fades as its cell slides home or fills.
		const smearAmount = from.smear && !to.smear ? 1 - (to.color !== from.color ? fill : k) : 1;
		const splitting = to.split && !from.split ? settle(tidily(sec, 2.2, 2.9, Easing.out(Easing.back(1.8))), 0) : 1;
		const popFrom = POP_IN.from + POP_IN.every * to.row;
		const pop = existing ? 1 : between(sec, popFrom, popFrom + POP_IN.seconds, Easing.out(Easing.back(2.2)));
		return cellToward(from, to, k, {
			color: fill > 0 ? to.color : from.color,
			filling: fill > 0 ? unless(fill, 1) : undefined,
			...smearing(to.smear ?? from.smear, smearAmount),
			split: splitting > 0 ? to.split : undefined,
			splitting: unless(splitting, 1),
			snapped: k >= 1 ? to.snapped : undefined,
			pop: unless(pop, 1),
		});
	});
	// The cells that go pop out, in their messy places.
	const leaving = messy.cells
		.filter((c) => !target.cells.some((to) => sameSpot(c, to)))
		.map((c) => {
			const from = POP_OUT.from + POP_OUT.every * c.col;
			return { ...c, pop: 1 - between(sec, from, from + POP_OUT.seconds, Easing.in(Easing.back(1.6))) };
		})
		.filter((c) => c.pop > 0);
	const drain = tidily(sec, 0.5, 3.6);
	const splat = { ...target.splat!, radius: toward(messy.splat!.radius, target.splat!.radius, drain), drip: toward(messy.splat!.drip, 0, drain) };
	const all = [...cells, ...leaving];
	const wall = easedExtent(extentOf(messy.cells), extentOf(target.cells), sec);
	const reach = extentOf(all);
	const extent = wall.columns === reach.columns && wall.rows === reach.rows ? undefined : wall;
	return withoutUndefined({ ...target, cells: all, splat, extent });
};

// 8. …into a coherent product: the last cells slide home and snap, the last
// paint drains away with the smears, and sparkles pop on the changed cells.
// Then it holds still, so viewers see what changed.
const DONE_AT = 1.4;
export const coherentBeatOf: StoryBeat = (spec, before) => (sec) => {
	const from = assimilatingOf(spec, before);
	const target = coherentProductOf(spec, before);
	const done = sec >= DONE_AT;
	const cells = from.cells.map((cell, i) => {
		const to = target.cells[i];
		const k = isMoved(cell) ? tidily(sec, 0.1, 1.25) : 1;
		const smearAmount = cell.smear ? 1 - tidily(sec, 0.1, 1.2) : 1;
		return cellToward(cell, to, k, {
			...smearing(cell.smear, smearAmount),
			snapped: !done && (cell.snapped || (isMoved(cell) && k >= 1)) ? true : undefined,
		});
	});
	const radius = from.splat!.radius * (1 - tidily(sec, 0, 1.1));
	const sparkles = done ? bounce(sec, DONE_AT, POPPY) : 0;
	return withoutUndefined({
		...target,
		cells,
		splat: radius > 0.02 ? { ...from.splat!, radius } : undefined,
		assimilation: done ? 'done' : 'underway',
		sparkles: unless(sparkles, 1),
	});
};

const pink = pinkBefore();
export const wobbleBeat = wobbleBeatOf(pinkStory, pink);
export const assimilateBeat = assimilateBeatOf(pinkStory, pink);
export const coherentBeat = coherentBeatOf(pinkStory, pink);
