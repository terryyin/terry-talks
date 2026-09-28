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
};

export type BallPose = {
	id: string;
	color: string;
	size: number; // radius in px
};

export type Pose = {
	cells: CellPose[];
	showTime: boolean;
	backlog: BallPose[]; // front of the queue first (nearest the product)
};

export const tidyCells = (): CellPose[] => {
	const cells: CellPose[] = [];
	for (let row = 0; row < GRID.rows; row++) {
		for (let col = 0; col < GRID.columns; col++) {
			cells.push({
				col,
				row,
				color: (col + row) % 2 === 0 ? palette.cellSky : palette.cellMint,
				dx: 0,
				dy: 0,
				rot: 0,
			});
		}
	}
	return cells;
};

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
