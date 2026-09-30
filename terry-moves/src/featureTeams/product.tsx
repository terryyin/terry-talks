import React from 'react';
import { palette, seeded } from '../storyImpact/scene';
import { FONT_FAMILY, OUTLINE, SHADOW } from '../storyImpact/layout';
import { COLUMN_WIDTH, COLUMNS, COMPONENTS, PANEL, ROW_TOPS } from './layout';
import { mixHex } from './pose';
import type { CellPose, ColumnPose } from './pose';

// The product as a flat panel: component columns and rows, the bottom one
// the Backend row. Pure function of its props.

const PLAIN = { sky: palette.cellSky, mint: palette.cellMint };
const SHEEN = '#E6D4FF';
const MUDDY = ['#C9B27C', '#A98FB8', '#B9C46A'];
const TAGS = ['hack', 'TODO', '??'];

const plainColor = (col: number, row: number): string => ((col + row) % 2 === 0 ? PLAIN.sky : PLAIN.mint);

const CELL_GAP = 7;

const cellBox = (col: number, row: number) => ({
	x: PANEL.left + col * COLUMN_WIDTH + CELL_GAP,
	y: ROW_TOPS[row] + CELL_GAP,
	w: COLUMN_WIDTH - 2 * CELL_GAP,
	h: ROW_TOPS[row + 1] - ROW_TOPS[row] - 2 * CELL_GAP,
});

// Zigzag scribbles, the quirks of a team's own way of working.
const scribble = (x: number, y: number, w: number, h: number, seed: number): string => {
	const points = Array.from({ length: 9 }, (_, i) => `${(x + (i / 8) * w).toFixed(1)},${(y + h * (i % 2 === 0 ? 0.15 : 0.85) * (0.7 + 0.3 * seeded(seed + i))).toFixed(1)}`);
	return `M${points.join(' L')}`;
};

const Cell: React.FC<{ col: number; row: number; column?: ColumnPose; coherent: number; cell?: CellPose }> = ({ col, row, column, coherent, cell }) => {
	const { x, y, w, h } = cellBox(col, row);
	const mine = column !== undefined && column.col === col;
	const mess = mine ? column.mess : 0;
	const sheen = mine ? column.sheen : 0;
	const fills = cell?.fills ?? [];
	const base = mixHex(plainColor(col, row), '#FFF3D6', coherent * 0.55);
	const color = mixHex(mixHex(base, MUDDY[row], mess), SHEEN, sheen);
	const k = row * 13 + 3;
	const rot = mess * [-6, 5, -4][row] ;
	const cx = x + w / 2;
	const cy = y + h / 2;
	// The shine sweeps down the column, row by row.
	const glare = sheen > 0 ? Math.min(1, Math.max(0, sheen * 3 - row)) : 0;
	return (
		<g data-testid="product-cell" data-col={col} data-row={row} transform={`translate(${mess * [7, -9, 6][row]} ${mess * [-3, 4, -5][row]}) rotate(${rot} ${cx} ${cy})`}>
			<rect x={x} y={y} width={w} height={h} rx={16} fill={color} stroke={palette.ink} strokeWidth={5} strokeOpacity={1 - coherent * 0.6} />
			{fills.length > 0 ? <Assimilated box={{ x, y, w, h }} fills={fills} base={color} id={`${col}-${row}`} /> : null}
			{glare > 0 ? (
				<g opacity={glare}>
					<path d={`M${x + w * 0.15},${y + h * 0.9} L${x + w * 0.5},${y + h * 0.1}`} stroke={palette.white} strokeWidth={12} strokeLinecap="round" opacity={0.85} />
					<path d={`M${x + w * 0.32},${y + h * 0.95} L${x + w * 0.6},${y + h * 0.4}`} stroke={palette.white} strokeWidth={6} strokeLinecap="round" opacity={0.7} />
				</g>
			) : null}
			{mess > 0 ? (
				<g opacity={mess}>
					<path d={scribble(x + 14, y + h * 0.18, w - 28, h * 0.5, k)} fill="none" stroke={palette.ink} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" opacity={0.55} />
					<rect x={x + w * 0.55} y={y + h * 0.62} width={62} height={22} rx={3} fill="#F6D365" opacity={0.9} transform={`rotate(${-14 + row * 9} ${x + w * 0.55 + 31} ${y + h * 0.62 + 11})`} stroke={palette.ink} strokeWidth={2.5} />
					<text x={x + w * 0.22} y={y + h * 0.84} fontFamily={FONT_FAMILY} fontWeight={800} fontSize={28} fill={palette.ink} transform={`rotate(-8 ${x + w * 0.22} ${y + h * 0.84})`}>
						{TAGS[row]}
					</text>
				</g>
			) : null}
		</g>
	);
};

// An impact sunk into its cell: tidy, in the shared finish (a tick), a diagonal
// split where two impacts meet in one cell.
const Assimilated: React.FC<{ box: { x: number; y: number; w: number; h: number }; fills: CellPose['fills']; base: string; id: string }> = ({ box, fills, base, id }) => {
	const { x, y, w, h } = box;
	// Where impacts pile up in one cell, the latest two show as its halves.
	const [first, second] = fills.slice(-2);
	const tint = (f: CellPose['fills'][number]) => mixHex(base, f.color, 0.9 * f.amount);
	const clip = `ft-cell-${id}`;
	const done = Math.max(...fills.map((f) => f.amount));
	return (
		<g data-testid="assimilated-cell" data-fills={fills.length}>
			<clipPath id={clip}>
				<rect x={x} y={y} width={w} height={h} rx={16} />
			</clipPath>
			<g clipPath={`url(#${clip})`}>
				<rect x={x} y={y} width={w} height={h} fill={tint(first)} />
				{second ? <path d={`M${x + w},${y} L${x + w},${y + h} L${x},${y + h} Z`} fill={tint(second)} /> : null}
			</g>
			{second ? <path d={`M${x + w},${y} L${x},${y + h}`} stroke={palette.white} strokeWidth={4} opacity={0.8} /> : null}
			<rect x={x} y={y} width={w} height={h} rx={16} fill="none" stroke={palette.ink} strokeWidth={5} />
			<path
				d={`M${x + w / 2 - 22},${y + h / 2} l14,16 l30,-34`}
				fill="none"
				stroke={palette.white}
				strokeWidth={9}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeDasharray={90}
				strokeDashoffset={90 * (1 - done)}
			/>
		</g>
	);
};

// The dashed fence a team keeps around what it owns.
const Fence: React.FC<{ column: ColumnPose }> = ({ column }) => {
	if (column.fence <= 0) return null;
	return (
		<rect
			data-testid="owner-fence"
			x={PANEL.left + column.col * COLUMN_WIDTH + 2}
			y={PANEL.top + 2}
			width={COLUMN_WIDTH - 4}
			height={PANEL.height - 4}
			rx={20}
			fill="none"
			stroke="#9B5DE5"
			strokeWidth={6}
			strokeDasharray="16 12"
			strokeLinecap="round"
			opacity={column.fence}
		/>
	);
};

export const Product: React.FC<{ column?: ColumnPose; cells?: CellPose[]; coherent: number; under?: React.ReactNode; over?: React.ReactNode }> = ({ column, cells, coherent, under, over }) => {
	const outline = `M${PANEL.left + 18},${PANEL.top} h${PANEL.width - 36} a18,18 0 0 1 18,18 v${PANEL.height - 36} a18,18 0 0 1 -18,18 h${-(PANEL.width - 36)} a18,18 0 0 1 -18,-18 v${-(PANEL.height - 36)} a18,18 0 0 1 18,-18 Z`;
	return (
		<g data-testid="product">
			<path d={outline} transform={`translate(${SHADOW.x} ${SHADOW.y})`} fill={palette.paperShadow} />
			<path d={outline} fill={palette.panel} stroke={palette.ink} strokeWidth={OUTLINE} strokeLinejoin="round" />
			{Array.from({ length: 3 * COLUMNS }, (_, i) => (
				<Cell key={i} col={i % COLUMNS} row={Math.floor(i / COLUMNS)} column={column} coherent={coherent} cell={cells?.[i]} />
			))}
			{under}
			{column ? <Fence column={column} /> : null}
			{over}
			<g data-testid="component-labels">
				{COMPONENTS.map((name, col) => (
					<text
						key={name}
						x={PANEL.left + COLUMN_WIDTH * (col + 0.5)}
						y={PANEL.top - 12}
						textAnchor="middle"
						fontFamily={FONT_FAMILY}
						fontWeight={700}
						fontSize={26}
						fill={column && column.col === col ? '#7A3FC4' : palette.ink}
					>
						{name}
					</text>
				))}
			</g>
		</g>
	);
};
