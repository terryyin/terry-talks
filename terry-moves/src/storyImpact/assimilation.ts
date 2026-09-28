// Poses after the splash: development assimilates it into the product, and
// the spent story goes to history. Same pose model as the earlier boards.
// Each is built from a story and the product before it; the zero-argument
// forms are the pink (example) story's.

import {
	CellPose,
	distanceToCell,
	GridSpot,
	knockedCells,
	pinkBefore,
	pinkStory,
	Pose,
	sameSpot,
	StoryBefore,
	storyOutOfBacklogOf,
	storySplat,
	StorySpec,
} from './scene';

const at = (spots: GridSpot[], cell: CellPose) => spots.some((s) => sameSpot(s, cell));

// Where the change belongs: the changed cells take the story's color (over
// any earlier story's), and the reorganized cell takes it on one half — the
// upper half if it is whole, the lower one if an earlier story split it.
const assimilatedCells = (spec: StorySpec, before: StoryBefore): CellPose[] =>
	before.cells.map((cell) => {
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
	const target = assimilatedCells(spec, before);
	return knockedCells(splat, before.cells).map((knocked, i) => {
		const moved = knocked.dx !== 0 || knocked.dy !== 0 || knocked.rot !== 0;
		if (!moved) return target[i];
		if (distanceToCell(splat.center, knocked.col, knocked.row) > splat.radius) {
			return { ...target[i], snapped: true };
		}
		return {
			...target[i],
			dx: Math.round(knocked.dx * SLIDING),
			dy: Math.round(knocked.dy * SLIDING),
			rot: Math.round(knocked.rot * SLIDING * 10) / 10,
			smear: at(spec.changed, knocked) ? undefined : knocked.smear,
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
// behind it (the front ball of which is the next story).
export const afterStory = (spec: StorySpec, before: StoryBefore): StoryBefore => ({
	cells: assimilatedCells(spec, before),
	history: [...before.history, spec.ball],
	backlog: before.backlog.slice(1),
});

export const assimilating = (): Pose => assimilatingOf(pinkStory, pinkBefore());
export const coherentProduct = (): Pose => coherentProductOf(pinkStory, pinkBefore());
export const storyInHistory = (): Pose => storyInHistoryOf(pinkStory, pinkBefore());
export const readyForNext = (): Pose => readyForNextOf(pinkStory, pinkBefore());
