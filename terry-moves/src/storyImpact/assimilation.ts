// Poses after the splash: development assimilates it into the product, and
// the spent story goes to history. Same pose model as the earlier boards.
// Each is built from a story and the product before it; the zero-argument
// forms are the pink (example) story's.

import {
	CellPose,
	distanceToCell,
	Extent,
	extentOf,
	GridSpot,
	knockedCells,
	leftTrayOf,
	pinkAfterIdea,
	pinkBefore,
	pinkStory,
	Pose,
	sameSpot,
	StoryBefore,
	storyOutOfBacklogOf,
	storySplat,
	StorySpec,
	tidyCells,
} from './scene';

const at = (spots: GridSpot[], cell: CellPose) => spots.some((s) => sameSpot(s, cell));

// The product's size once the story is assimilated.
export const grownExtentOf = (spec: StorySpec, before: StoryBefore): Extent => {
	const now = extentOf(before.cells);
	return { columns: now.columns + (spec.grow?.columns ?? 0), rows: now.rows + (spec.grow?.rows ?? 0) };
};

// The product's cells at its new size: the cells it keeps as they were, and
// new plain ones where it grew.
const resizedCells = (spec: StorySpec, before: StoryBefore): CellPose[] =>
	tidyCells(grownExtentOf(spec, before)).map((plain) => before.cells.find((c) => sameSpot(c, plain)) ?? plain);

// Where the change belongs: the changed cells take the story's color (over
// any earlier story's), and the reorganized cell takes it on one half — the
// upper half if it is whole, the lower one if an earlier story split it.
const assimilatedCells = (spec: StorySpec, before: StoryBefore): CellPose[] =>
	resizedCells(spec, before).map((cell) => {
		if (at(spec.changed, cell)) return { ...cell, color: spec.ball.color };
		if (at([spec.reorganized], cell)) {
			return cell.split ? { ...cell, color: spec.ball.color } : { ...cell, split: spec.ball.color };
		}
		return cell;
	});

// Halfway there: cells that were only nudged have clicked back into place,
// the ones under the paint still slide home, and a little paint is left.
const SLIDING = 0.4;

const assimilatingCells = (spec: StorySpec, before: StoryBefore): CellPose[] => {
	const splat = storySplat(spec, 1.35, true);
	const knocked = knockedCells(splat, before.cells);
	return assimilatedCells(spec, before).map((target) => {
		const from = knocked.find((c) => sameSpot(c, target));
		const moved = from !== undefined && (from.dx !== 0 || from.dy !== 0 || from.rot !== 0);
		if (!from || !moved) return target;
		if (distanceToCell(splat.center, from.col, from.row) > splat.radius) {
			return { ...target, snapped: true };
		}
		return {
			...target,
			dx: Math.round(from.dx * SLIDING),
			dy: Math.round(from.dy * SLIDING),
			rot: Math.round(from.rot * SLIDING * 10) / 10,
			smear: at(spec.changed, from) ? undefined : from.smear,
		};
	});
};

export const assimilatingOf = (spec: StorySpec, before: StoryBefore): Pose =>
	storyOutOfBacklogOf(before, {
		cells: assimilatingCells(spec, before),
		splat: { ...storySplat(spec, 0, true), radius: 0.55 },
		assimilation: 'underway',
	});

export const coherentProductOf = (spec: StorySpec, before: StoryBefore): Pose =>
	storyOutOfBacklogOf(before, { cells: assimilatedCells(spec, before), assimilation: 'done' });

// The spent ball joins the earlier spent stories, in spent order.
export const storyInHistoryOf = (spec: StorySpec, before: StoryBefore): Pose =>
	storyOutOfBacklogOf(before, { cells: assimilatedCells(spec, before), history: [...before.history, spec.ball] });

// The ball behind the story steps up, eager, at the front of the queue.
export const readyForNextOf = (spec: StorySpec, before: StoryBefore): Pose => {
	const [next, ...rest] = before.backlog;
	return { ...storyInHistoryOf(spec, before), backlog: [{ ...next, eager: true }, ...rest] };
};

// What the next story finds: this story's product, History and the queue
// behind it with this story's refill, if any (the front ball of which is the
// next story).
export const afterStory = (spec: StorySpec, before: StoryBefore): StoryBefore => ({
	cells: assimilatedCells(spec, before),
	history: [...before.history, spec.ball],
	backlog: leftTrayOf(spec, before).backlog.slice(1),
});

export const assimilating = (): Pose => assimilatingOf(pinkStory, pinkBefore());
export const coherentProduct = (): Pose => coherentProductOf(pinkStory, pinkBefore());
// Tests guard every Behavior column of the coherent product…
export const testsGuardBehavior = (): Pose => ({ ...coherentProduct(), protect: { shields: 1, links: 0 } });
// …and each Structure row maps to a domain concept.
export const structureMapsDomain = (): Pose => ({ ...coherentProduct(), protect: { shields: 1, links: 1 } });
// A customer, in front of the coherent product, has an idea.
export const customerHasIdea = (): Pose => ({ ...coherentProduct(), customer: { bulb: 1 } });
// The idea has joined the backlog second, and the balls behind it swapped.
export const ideaInBacklog = (): Pose => coherentProductOf(pinkStory, pinkAfterIdea());
export const storyInHistory = (): Pose => storyInHistoryOf(pinkStory, pinkAfterIdea());
export const readyForNext = (): Pose => readyForNextOf(pinkStory, pinkAfterIdea());
