// Pure pose model for the story-impact storyboard.
// A pose says WHAT is visible; the components decide only HOW it is drawn.
// Later boards (splash, mess, assimilation, history) are new poses of this
// same model, and animation can interpolate between poses.

import type { Extent } from './poseTypes';

// The product's size when the film starts, and the largest it ever gets: the
// axes span that space, so the product can grow into it.
export const START: Extent = { columns: 4, rows: 4 };
export const SPACE: Extent = { columns: 6, rows: 4 };

export const palette = {
	paper: '#FFF6E5',
	paperShadow: '#F0DDB8',
	ink: '#2B2D42',
	panel: '#FFFDF7',
	behavior: '#2A9D5C',
	structure: '#3A6FF7',
	time: '#2B2D42',
	tray: '#F4A259',
	trayInk: '#B4570F', // the tray's own darker orange, for its label
	trayInside: '#FBD8A8',
	cellSky: '#A9DEF9',
	cellMint: '#B5EAD7',
	cheek: '#FF8FA3',
	white: '#FFFFFF',
} as const;

export const ballColors = {
	pink: '#FF5DA2',
	sun: '#FFC93C',
	grape: '#9B5DE5',
	lime: '#6BCB3B',
	teal: '#2EC4B6',
	orange: '#FF8C42',
} as const;
export type {
	BallPose,
	CustomerPose,
	EndCardPose,
	ProtectPose,
	CellPose,
	DimPose,
	Extent,
	GridSpot,
	JudgmentPose,
	OutlinePose,
	Pose,
	SpentPose,
	SplatPose,
	StoryBeat,
	StoryBefore,
	StoryPose,
	StorySpec,
	StoryState,
	TagPose,
	TitlePose,
	ValuesPose,
} from './poseTypes';
import type { BallPose, CellPose, GridSpot, Pose, SplatPose, StoryBefore, StoryPose, StorySpec, StoryState } from './poseTypes';

// The product's own checker color for a cell, before any story changed it.
export const plainCellColor = ({ col, row }: GridSpot): string =>
	(col + row) % 2 === 0 ? palette.cellSky : palette.cellMint;

// The story colors a cell carries: its color, if a story gave it one, and
// the color of its reorganized half.
export const storyColorsOf = (cell: CellPose): string[] =>
	[cell.color, cell.split].filter((c): c is string => c !== undefined && c !== plainCellColor(cell));

// The product's size: as far as its cells reach.
export const extentOf = (cells: GridSpot[]): Extent => ({
	columns: cells.reduce((n, c) => Math.max(n, c.col + 1), 0),
	rows: cells.reduce((n, c) => Math.max(n, c.row + 1), 0),
});

// The size the wall is drawn at: its easing size, or its cells' extent.
export const wallExtentOf = (pose: Pick<Pose, 'cells' | 'extent'>): Extent => pose.extent ?? extentOf(pose.cells);

// Row by row from the ground, each row from the Structure axis outward.
export const tidyCells = (extent: Extent = START): CellPose[] =>
	Array.from({ length: extent.rows * extent.columns }, (_, i) => {
		const spot = { col: i % extent.columns, row: Math.floor(i / extent.columns) };
		return { ...spot, color: plainCellColor(spot), dx: 0, dy: 0, rot: 0 };
	});

export const waitingStories = (): BallPose[] => [
	{ id: 'pink', color: ballColors.pink, size: 46 },
	{ id: 'sun', color: ballColors.sun, size: 38 },
	{ id: 'grape', color: ballColors.grape, size: 42 },
	{ id: 'lime', color: ballColors.lime, size: 35 },
];

export const productSpace = (): Pose => ({
	cells: tidyCells(),
	showTime: false,
	backlog: [],
});

export const productOverTime = (): Pose => ({
	...productSpace(),
	showTime: true,
	backlog: waitingStories(),
});

// Deterministic pseudo-random value in [0, 1) for a seed, so boards render
// the same every time.
export const seeded = (n: number): number => {
	const v = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
	return v - Math.floor(v);
};

// Where the example story hits the product wall.
export const IMPACT: GridSpot = { col: 2, row: 2 };

export const [exampleBall, ...laterStories] = waitingStories();

// The example (pink) story. Its change belongs, once understood, not in the
// splat's shape but in a few behaviors and structural parts spread over the
// product; the cell that was hit hardest is reorganized into two halves. It
// adds a Behavior column: a new behavior, part of which takes its color.
export const pinkStory: StorySpec = {
	ball: exampleBall,
	impact: IMPACT,
	changed: [
		{ col: IMPACT.col, row: 0 },
		{ col: IMPACT.col - 1, row: IMPACT.row },
		{ col: IMPACT.col + 2, row: IMPACT.row - 1 }, // in the new column
	],
	reorganized: IMPACT,
	grow: { columns: 1 }, // a new behavior
	seed: 7,
	wish: 'I wish I could split the bill with friends in one tap!',
};

// Before the pink story: the tidy product, nothing spent, the rest waiting.
export const pinkBefore = (): StoryBefore => ({ cells: tidyCells(), history: [], backlog: laterStories });

// The new idea a customer gets from the pink story's impact.
export const ideaBall: BallPose = { id: 'idea', color: ballColors.teal, size: 40 };

// A new idea joins the backlog second, and the two balls behind it swap:
// the backlog is both inserted into and reordered. The front ball keeps its turn.
export const withIdea = (backlog: BallPose[], idea: BallPose): BallPose[] => {
	const [front, second, third, ...rest] = backlog;
	return [front, idea, third, second, ...rest];
};

// The pink story's stage once the customer's idea has joined the backlog.
export const pinkAfterIdea = (): StoryBefore => ({ ...pinkBefore(), backlog: withIdea(laterStories, ideaBall) });

// A story out of the backlog grows to this size while it wishes and flies.
export const STORY_SIZE = 62;

export const sameSpot = (a: GridSpot, b: GridSpot) => a.col === b.col && a.row === b.row;

const storyPoseOf = (spec: StorySpec, state: StoryState, flight: number): StoryPose => ({
	ball: { ...spec.ball, size: STORY_SIZE },
	state,
	wish: spec.wish ?? '',
	flight,
	...(sameSpot(spec.impact, IMPACT) ? {} : { toward: spec.impact }),
});

// The story still waits at the front of the backlog, before the product
// earlier stories left.
export const storyInBacklogOf = (spec: StorySpec, before: StoryBefore): Pose => ({
	...productOverTime(),
	cells: before.cells,
	backlog: [spec.ball, ...before.backlog],
	...(before.history.length > 0 ? { history: before.history } : {}),
});

// The story has left the backlog; the rest of the pose says what it is doing
// now and what it did to the product.
export const storyOutOfBacklogOf = (
	before: StoryBefore,
	now: Partial<Pick<Pose, 'cells' | 'story' | 'splat' | 'assimilation' | 'history'>>,
): Pose => ({
	...productOverTime(),
	cells: before.cells,
	backlog: before.backlog,
	...(before.history.length > 0 ? { history: before.history } : {}),
	...now,
});

// The stage once the story has left the tray: its refill ball, if any,
// waits at the back of the queue.
export const leftTrayOf = (spec: StorySpec, before: StoryBefore): StoryBefore =>
	spec.refill ? { ...before, backlog: [...before.backlog, spec.refill] } : before;

export const storyWishesOf = (spec: StorySpec, before: StoryBefore): Pose =>
	storyOutOfBacklogOf(before, { story: storyPoseOf(spec, 'wishing', 0) });
export const storyIsFuzzyOf = (spec: StorySpec, before: StoryBefore): Pose =>
	storyOutOfBacklogOf(before, { story: storyPoseOf(spec, 'fuzzy', 0) });
export const storyFliesOf = (spec: StorySpec, before: StoryBefore): Pose =>
	storyOutOfBacklogOf(before, { story: storyPoseOf(spec, 'flying', 0.4) });

export const storyWishes = (): Pose => storyWishesOf(pinkStory, pinkBefore());
export const storyIsFuzzy = (): Pose => storyIsFuzzyOf(pinkStory, pinkBefore());
export const storyFlies = (): Pose => storyFliesOf(pinkStory, pinkBefore());

export const storySplat = (spec: StorySpec, drip: number, seeped: boolean, shout?: string): SplatPose => ({
	center: spec.impact,
	radius: 1,
	color: spec.ball.color,
	seed: spec.seed,
	drip,
	shout,
	seeped,
});

export const distanceToCell = (spot: GridSpot, col: number, row: number): number =>
	Math.hypot(col + 0.5 - spot.col, row + 0.5 - spot.row);

// The cells whose centers lie under the splat blob.
export const splatCells = (pose: Pose): GridSpot[] => {
	const { splat } = pose;
	if (!splat) return [];
	return pose.cells
		.filter((cell) => distanceToCell(splat.center, cell.col, cell.row) <= splat.radius)
		.map(({ col, row }) => ({ col, row }));
};

export const storySplashesOf = (spec: StorySpec, before: StoryBefore): Pose =>
	storyOutOfBacklogOf(before, { splat: storySplat(spec, 1, false, 'SPLAT!') });

export const storySplashes = (): Pose => storySplashesOf(pinkStory, pinkBefore());

// Cells under and next to the splat get knocked out of line; the ones under
// it also carry a smear of the story's paint. They keep the colors earlier
// stories gave them.
export const knockedCells = (splat: SplatPose, cells: CellPose[]): CellPose[] =>
	cells.map((cell) => {
		const d = distanceToCell(splat.center, cell.col, cell.row);
		const reach = splat.radius + 0.9;
		if (d > reach) return cell;
		const push = 1 - d / (reach + 0.6);
		const k = cell.col * 7 + cell.row * 13 + splat.seed;
		const sign = seeded(k) < 0.5 ? -1 : 1;
		return {
			...cell,
			dx: Math.round((seeded(k + 1) - 0.5) * 56 * push),
			dy: Math.round((seeded(k + 2) - 0.35) * 44 * push),
			rot: Math.round(sign * (8 + 14 * seeded(k + 3)) * push * 10) / 10,
			smear: d <= splat.radius + 0.25 ? splat.color : undefined,
		};
	});

export const messyProductOf = (spec: StorySpec, before: StoryBefore): Pose => {
	const splat = storySplat(spec, 1.35, true);
	return storyOutOfBacklogOf(before, { cells: knockedCells(splat, before.cells), splat });
};

export const messyProduct = (): Pose => messyProductOf(pinkStory, pinkBefore());
