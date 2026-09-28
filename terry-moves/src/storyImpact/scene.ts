// Pure pose model for the story-impact storyboard.
// A pose says WHAT is visible; the components decide only HOW it is drawn.
// Later boards (splash, mess, assimilation, history) are new poses of this
// same model, and animation can interpolate between poses.

export const GRID = { columns: 5, rows: 4 } as const;

export const palette = {
	paper: '#FFF6E5',
	paperShadow: '#F0DDB8',
	ink: '#2B2D42',
	panel: '#FFFDF7',
	behavior: '#2A9D5C',
	structure: '#3A6FF7',
	time: '#2B2D42',
	tray: '#F4A259',
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
} as const;

export type CellPose = {
	col: number; // 0 = next to the Structure axis, grows along Behavior
	row: number; // 0 = on the ground, grows up along Structure
	color: string;
	dx: number;
	dy: number;
	rot: number; // degrees, around the cell's own center
	smear?: string; // paint smeared over part of the cell
	split?: string; // reorganized into two halves; the upper half has this color
	snapped?: boolean; // has just clicked back into its place
	// Motion in the film; left out, the cell looks as on the storyboard.
	smearAmount?: number; // 0–1: how much of the smear shows while it seeps in or fades
	splitting?: number; // 0–1: how far the upper half has grown in while the cell splits
	filling?: number; // 0–1: how high `color` has risen over the cell's plain color
	pop?: number; // pop-in scale around its center while the product is built; 0 = not there yet
};

export type BallPose = {
	id: string;
	color: string;
	size: number; // radius in px
	eager?: boolean; // hops at the front of the queue, ready for its turn
	// Motion in the film; left out, the ball sits as on the storyboard.
	hop?: number; // px above the tray floor, instead of the eager hop
	squash?: number; // width over height, around where it touches the floor
	dx?: number; // px along Time from its slot, while it rolls to a new slot
};

// A spot on the product wall in grid units (cell (c, r) spans c..c+1, r..r+1).
export type GridSpot = { col: number; row: number };

// The example story once it has left the backlog: first it wishes (speech
// bubble), then it shows how fuzzy it is, then it flies toward the product.
export type StoryState = 'wishing' | 'fuzzy' | 'flying';

export type StoryPose = {
	ball: BallPose;
	state: StoryState;
	wish: string;
	flight: number; // 0 = hovering above the tray, 1 = hitting the product
	// Motion in the film; left out, the story looks as on the storyboard.
	at?: { x: number; y: number }; // ball center, instead of its hover or flight point
	squash?: number; // width over height, around the ball's center
	stretch?: { along: number; across: number }; // flying: scale along and across its heading
	bubble?: number; // wishing: pop-in scale of the wish bubble and its hearts
	fuzz?: number; // fuzzy: 0 = still smooth, 1 = fully fuzzy
};

// Paint on the product wall. The blob is round in grid units around its
// center; its lobes, droplets and drips come from the seed.
export type SplatPose = {
	center: GridSpot;
	radius: number; // grid units
	color: string;
	seed: number;
	drip: number; // how far the paint has run down, 1 = fresh splat
	shout?: string; // comic sound word shown at the moment of impact
	seeped: boolean; // the paint has run into the gaps under shifted cells
	shoutScale?: number; // film: pop-in scale of the sound word
	cover?: number; // film, once seeped: 0–1, paint still lying on top of the cells
};

export type Pose = {
	cells: CellPose[];
	showTime: boolean;
	backlog: BallPose[]; // front of the queue first (nearest the product)
	story?: StoryPose;
	splat?: SplatPose;
	// Development re-sorting the splash into the product, then finished.
	assimilation?: 'underway' | 'done';
	sparkles?: number; // film: pop-in scale of the sparkles once assimilation is done
	history?: BallPose[]; // spent stories, oldest first
	historyReveal?: number; // film: pop-in scale of the History box
	spent?: SpentPose; // film: the spent story on its way to History
	// The film's opening; each left out looks as on the storyboard.
	title?: TitlePose; // the film's title over the empty paper
	axes?: number; // 0–1: how far the Behavior and Structure axes have grown from the origin
	wall?: number; // pop-in scale of the product wall behind the cells; 0 = not there yet
	timeGrow?: number; // 0–1: how far the Time arrow has grown from the origin
	trayIn?: number; // 0 = the backlog tray waits off stage right, 1 = in place
};

// The film's title: a romantic first line whose letters drop in like paint
// balls onto a splash, and a disciplined second line that snaps into place
// over a ruled underline.
export type TitlePose = {
	romantic: string;
	disciplined: string;
	splash: number; // pop-in scale of the paint splash behind the first line
	drops: (number | null)[]; // per letter of the first line: px above its place, null = not dropped yet
	snap: number; // scale of the second line; 0 = not there yet
	underline: number; // 0–1: how far the underline has been ruled
	leave: number; // 0 = standing, 1 = shrunk away
};

// The spent story's pale, emptied skin, peeling off the product and drifting
// to History. Drawn like a history ball, but free on the stage.
export type SpentPose = {
	ball: BallPose;
	at: { x: number; y: number }; // center of the skin
	peel?: number; // 0 = lying flat on the wall, 1 (left out) = puffed up and free
	squash?: number; // width over height, around its center
};

// The product's own checker color for a cell, before any story changed it.
export const plainCellColor = ({ col, row }: GridSpot): string =>
	(col + row) % 2 === 0 ? palette.cellSky : palette.cellMint;

// Row by row from the ground, each row from the Structure axis outward.
export const tidyCells = (): CellPose[] =>
	Array.from({ length: GRID.rows * GRID.columns }, (_, i) => {
		const spot = { col: i % GRID.columns, row: Math.floor(i / GRID.columns) };
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

const EXAMPLE_WISH = 'I wish I could split the bill with friends in one tap!';

export const [exampleBall, ...laterStories] = waitingStories();

const exampleStory = (state: StoryState, flight: number): StoryPose => ({
	ball: { ...exampleBall, size: 62 },
	state,
	wish: EXAMPLE_WISH,
	flight,
});

// The example story has left the backlog; the rest of the pose says what it
// is doing now and what it did to the product.
export const storyOutOfBacklog = (
	now: Partial<Pick<Pose, 'cells' | 'story' | 'splat' | 'assimilation' | 'history'>>,
): Pose => ({
	...productOverTime(),
	backlog: laterStories,
	...now,
});

export const storyWishes = (): Pose => storyOutOfBacklog({ story: exampleStory('wishing', 0) });

export const storyIsFuzzy = (): Pose => storyOutOfBacklog({ story: exampleStory('fuzzy', 0) });

export const storyFlies = (): Pose => storyOutOfBacklog({ story: exampleStory('flying', 0.4) });

export const exampleSplat = (drip: number, seeped: boolean, shout?: string): SplatPose => ({
	center: IMPACT,
	radius: 1,
	color: exampleBall.color,
	seed: 7,
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

export const storySplashes = (): Pose => storyOutOfBacklog({ splat: exampleSplat(1, false, 'SPLAT!') });

// Cells under and next to the splat get knocked out of line; the ones under
// it also carry a smear of the story's paint.
export const knockedCells = (splat: SplatPose): CellPose[] =>
	tidyCells().map((cell) => {
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

export const messyProduct = (): Pose => {
	const splat = exampleSplat(1.35, true);
	return storyOutOfBacklog({ cells: knockedCells(splat), splat });
};
