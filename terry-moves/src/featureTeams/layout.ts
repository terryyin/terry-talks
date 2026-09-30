// Fixed geometry for the feature-teams film on the 1080×1080 stage: the
// product is a flat panel of four component columns (labelled) and three
// feature rows (not labelled); the people stand below it, and Bas's clip
// hangs in the lower right, with the card and the quality meter above it.

export const PANEL = { left: 40, top: 180, width: 640, height: 550 } as const;
export const COLUMNS = 4;
export const COLUMN_WIDTH = PANEL.width / COLUMNS;
export const ROW_TOPS = [180, 363, 547, 730] as const;
export const COMPONENTS = ['Front end', 'Back end', 'Middleware', 'Data'] as const;
export const ROWS = 3;

export const columnCenter = (col: number): number => PANEL.left + COLUMN_WIDTH * (col + 0.5);

// The rows a circle on the panel reaches into.
export const rowsReached = (cy: number, r: number): number[] =>
	[0, 1, 2].filter((row) => cy + r > ROW_TOPS[row] && cy - r < ROW_TOPS[row + 1]);

// The columns a circle on the panel reaches into.
export const columnsReached = (cx: number, r: number): number[] =>
	[0, 1, 2, 3].filter((col) => cx + r > PANEL.left + col * COLUMN_WIDTH && cx - r < PANEL.left + (col + 1) * COLUMN_WIDTH);

// Where people stand: their feet, and how big they are drawn.
export const FLOOR = 1010;
export const PEOPLE_SCALE = 0.86;

// The right-hand side: the card above the clip, and the quality meter.
export const CARD = { left: 730, top: 150, width: 310, height: 205 } as const;
export const METER = { left: 730, top: 402, width: 310 } as const;
export const INSET = { left: 740, top: 440, width: 300, height: 592 } as const;

// The Odd-e logo, upper right.
export const LOGO = { left: 880, top: -6, width: 190 } as const;

export const HEADER = { left: 40, top: 26, height: 56 } as const;

export const cellCenter = (col: number, row: number): { x: number; y: number } => ({
	x: columnCenter(col),
	y: (ROW_TOPS[row] + ROW_TOPS[row + 1]) / 2,
});

// The cells a splash on the panel covers: those it fills at least a third of.
export const cellsCovered = (cx: number, cy: number, r: number): [number, number][] => {
	const covered: [number, number][] = [];
	for (let row = 0; row < ROWS; row++) {
		for (let col = 0; col < COLUMNS; col++) {
			let inside = 0;
			for (let i = 0; i < 5; i++) {
				for (let j = 0; j < 5; j++) {
					const x = PANEL.left + (col + (i + 0.5) / 5) * COLUMN_WIDTH;
					const y = ROW_TOPS[row] + ((j + 0.5) / 5) * (ROW_TOPS[row + 1] - ROW_TOPS[row]);
					if (Math.hypot(x - cx, y - cy) <= r) inside++;
				}
			}
			if (inside >= 8) covered.push([col, row]);
		}
	}
	return covered;
};
