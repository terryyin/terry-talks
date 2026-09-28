// The pose model's types for the story-impact storyboard and films.
// A pose says WHAT is visible; the components decide only HOW it is drawn.

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
	toward?: GridSpot; // where its flight hits the product; left out, the example story's impact
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
	historyRoom?: number; // film: how many spent balls the History box is laid out for, while it makes room
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

// One story as it plays out: the ball waiting in the backlog, where it hits
// the product, and where its change belongs once assimilated — a few changed
// cells take its color, and one reorganized cell takes it on one half.
export type StorySpec = {
	ball: BallPose;
	impact: GridSpot;
	changed: GridSpot[];
	reorganized: GridSpot;
	seed: number; // shapes its splat and how it knocks the cells
	wish?: string;
	refill?: BallPose; // a new ball that drops into the back of the tray once this story has left it
};

// What is on stage before a story leaves the backlog: the product's cells as
// earlier stories left them, the spent stories in History (oldest first), and
// the balls waiting behind this story (front first).
export type StoryBefore = {
	cells: CellPose[];
	history: BallPose[];
	backlog: BallPose[];
};

// A beat of a story's film: built from the story and the stage before it, it
// maps seconds into the beat to a pose.
export type StoryBeat = (spec: StorySpec, before: StoryBefore) => (sec: number) => Pose;
