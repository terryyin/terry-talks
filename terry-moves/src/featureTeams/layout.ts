// Fixed geometry for the feature-teams film on the 1080×1080 stage: the
// product is a flat panel of four component columns and three rows, the
// bottom one the Backend row; the people stand below it, and Bas's clip
// hangs in the lower right, with the card and the quality meter above it.

export const PANEL = { left: 40, top: 150, width: 640, height: 580 } as const;
export const COLUMNS = 4;
export const COLUMN_WIDTH = PANEL.width / COLUMNS;
export const ROW_TOPS = [150, 340, 530, 730] as const;
export const BACKEND_ROW = 2;

export const columnCenter = (col: number): number => PANEL.left + COLUMN_WIDTH * (col + 0.5);

// The rows a circle on the panel reaches into.
export const rowsReached = (cy: number, r: number): number[] =>
	[0, 1, 2].filter((row) => cy + r > ROW_TOPS[row] && cy - r < ROW_TOPS[row + 1]);

// The columns a circle on the panel reaches into.
export const columnsReached = (cx: number, r: number): number[] =>
	[0, 1, 2, 3].filter((col) => cx + r > PANEL.left + col * COLUMN_WIDTH && cx - r < PANEL.left + (col + 1) * COLUMN_WIDTH);

// Where people stand: their feet, and how big they are drawn.
export const FLOOR = 1005;
export const PEOPLE_SCALE = 0.9;

// The right-hand side: the card above the clip, and the quality meter.
export const CARD = { left: 730, top: 150, width: 310, height: 205 } as const;
export const METER = { left: 730, top: 402, width: 310 } as const;
export const INSET = { left: 740, top: 440, width: 300, height: 592 } as const;

// The Odd-e logo, upper right.
export const LOGO = { left: 880, top: -6, width: 190 } as const;

export const HEADER = { left: 40, top: 26, height: 56 } as const;
