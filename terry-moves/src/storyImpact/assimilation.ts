// Poses after the splash: development assimilates it into the product, and
// the spent story goes to history. Same pose model as the earlier boards.

import {
	CellPose,
	distanceToCell,
	exampleBall,
	exampleSplat,
	GridSpot,
	IMPACT,
	knockedCells,
	laterStories,
	Pose,
	storyOutOfBacklog,
	tidyCells,
} from './scene';

// Where the change belongs once it is understood: not the splat's shape, but
// a few behaviors and structural parts spread over the product. The cell that
// was hit hardest is reorganized into two halves.
const CHANGED_CELLS: GridSpot[] = [
	{ col: IMPACT.col, row: 0 },
	{ col: IMPACT.col - 1, row: IMPACT.row },
	{ col: IMPACT.col + 1, row: IMPACT.row - 1 },
];
const REORGANIZED_CELL: GridSpot = IMPACT;

const at = (spots: GridSpot[], cell: CellPose) => spots.some((s) => s.col === cell.col && s.row === cell.row);

const assimilatedCells = (): CellPose[] =>
	tidyCells().map((cell) => {
		if (at(CHANGED_CELLS, cell)) return { ...cell, color: exampleBall.color };
		if (at([REORGANIZED_CELL], cell)) return { ...cell, split: exampleBall.color };
		return cell;
	});

// Halfway there: cells that were only nudged have clicked back into place,
// the ones under the paint still slide home, and a little paint is left.
const SLIDING = 0.4;

const assimilatingCells = (): CellPose[] => {
	const splat = exampleSplat(1.35, true);
	const target = assimilatedCells();
	return knockedCells(splat).map((knocked, i) => {
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
			smear: target[i].color === exampleBall.color ? undefined : knocked.smear,
		};
	});
};

export const assimilating = (): Pose =>
	storyOutOfBacklog({
		cells: assimilatingCells(),
		splat: { ...exampleSplat(0, true), radius: 0.55 },
		assimilation: 'underway',
	});

export const coherentProduct = (): Pose =>
	storyOutOfBacklog({ cells: assimilatedCells(), assimilation: 'done' });

export const storyInHistory = (): Pose =>
	storyOutOfBacklog({ cells: assimilatedCells(), history: [exampleBall] });

export const readyForNext = (): Pose => {
	const [next, ...rest] = laterStories;
	return { ...storyInHistory(), backlog: [{ ...next, eager: true }, ...rest] };
};
