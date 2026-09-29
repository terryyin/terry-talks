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
	flying?: boolean; // on its way into the tray from outside it: drawn above the stage, without a floor shadow
	scale?: number; // pop-in scale around its center; 0 = not there yet
};

// The product's size in grid units: Behavior columns × Structure rows.
export type Extent = { columns: number; rows: number };

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
	fuzz?: number; // fuzzy: 0 = still smooth, 1 = fully fuzzy; wishing: 0 (left out) = smooth, turning fuzzy as it gets ready to fly
	marks?: number; // fuzzy: 0–1, how much its ignored grid lines and squiggles show; left out, as fuzzy as it is
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
	extent?: Extent; // film: the wall's size while it eases to a new one; left out, the cells' extent
	timeGrow?: number; // 0–1: how far the Time arrow has grown from the origin
	trayIn?: number; // 0 = the backlog tray waits off stage right, 1 = in place
	// The film's ending: parts of the product outlined to show what a story
	// and a feature are; each left out is not there.
	outlines?: OutlinePose[];
	dim?: DimPose; // the rest of the product fades back while some cells are in focus
	customer?: CustomerPose; // a customer in front of the product, feeling a story's impact
	protect?: ProtectPose; // what keeps the product coherent: tests and the domain
	tag?: TagPose; // a tag hanging from the story ball, naming its focus
	judgment?: JudgmentPose; // development at work: judgment-intensive
	// The film's end: the stage shrinks away and an end card plays on the paper.
	stageLeave?: number; // 0 (left out) = in place, 1 = shrunk away
	endCard?: EndCardPose;
};

// The end card, in the title's styles: a lead-in, a romantic word dropping in
// letter by letter onto a splash, a disciplined line snapping in over a ruled
// underline, and the credit.
export type EndCardPose = {
	lead: number; // pop-in scale of the lead-in
	splash: number; // pop-in scale of the paint splash
	drops: (number | null)[]; // per letter of the romantic word: px above its place, null = not dropped yet
	snap: number; // scale of the disciplined line; 0 = not there yet
	underline: number; // 0–1: how far the underline has been ruled
	credit: number; // pop-in scale of the credit
};

// "judgment-intensive" under the whole-product name, and "?" thought bubbles
// bobbing over the product while the developers assimilate a splash.
export type JudgmentPose = {
	show: number; // 0–1: how far the label and bubbles have popped in, one after another
	bob: number; // seconds of bobbing, for the bubbles' phase
	fade?: number; // 0–1 opacity while they fade away; left out, fully shown
};

// A pill tag hanging on a string from the story ball.
export type TagPose = {
	text: string;
	color: string; // its border, the story's color
	show: number; // pop-in scale; 0 = not there yet
	fade?: number; // 0–1 opacity while it fades away; left out, fully shown
};

// What keeps the product coherent: a test shield on every Behavior column,
// and domain concepts linked to the Structure rows.
export type ProtectPose = {
	shields: number; // 0–1: how far the shields have popped on, column by column
	links: number; // 0–1: how far the domain links have been drawn, row by row
	fade?: number; // 0–1 opacity while they fade away; left out, fully shown
};

// A flat cartoon customer standing below the product wall. Each motion field
// left out is at rest.
export type CustomerPose = {
	show?: number; // pop-in scale around the feet; 0 = not there yet
	nod?: number; // 0–1: how far the head dips forward
	bulb: number; // pop-in scale of the light bulb over the head; 0 = no idea yet
};

// A dashed outline over product cells: around each cell on its own, or
// around all of them together as one band (a Behavior column). It is drawn
// on over `draw`, its dashes march along with `march`, and small tags show
// which stories it stands for.
export type OutlinePose = {
	cells: GridSpot[];
	color: string;
	together?: boolean; // one outline around all the cells, instead of one per cell
	wall?: Extent; // together: around the whole wall at this size, instead of around the cells
	draw: number; // 0–1: how far the outline has been drawn on
	march: number; // px the dashes have marched along the outline
	opacity?: number; // 0–1, while it fades away
	label: string; // a short name, off the wall, with a pointer to the outline
	labelShow?: number; // 0–1 opacity of the name while it gives way to another message; left out, shown
	at?: { x: number; y: number }; // where the name goes; left out, the ending's spot above the tray
	pointAt: GridSpot; // where on the wall the name's pointer ends
	tags: string[]; // story colors, as little dots next to the label
};

// Cells outside `except` fade back toward the paper by `amount` (0–1).
export type DimPose = {
	except: GridSpot[];
	amount: number;
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
	grow?: Partial<Extent>; // how the product's size changes once assimilated: a column or row more (+1) or less (−1), at the far edge
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
