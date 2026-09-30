import React from 'react';
import { palette, seeded } from '../storyImpact/scene';
import { FONT_FAMILY, OUTLINE, SHADOW } from '../storyImpact/layout';
import { BACKEND_ROW, COLUMN_WIDTH, COLUMNS, PANEL, ROW_TOPS } from './layout';
import { mixHex } from './pose';
import type { ColumnPose } from './pose';

// The product as a flat panel: component columns and rows, the bottom one
// the Backend row. Pure function of its props.

const PLAIN = { sky: palette.cellSky, mint: palette.cellMint, backendA: '#C3D0F2', backendB: '#D6E0F8' };
const SHEEN = '#E6D4FF';
const MUDDY = ['#C9B27C', '#A98FB8', '#B9C46A'];
const TAGS = ['hack', 'TODO', '??'];

const plainColor = (col: number, row: number): string =>
	row === BACKEND_ROW ? ((col + row) % 2 === 0 ? PLAIN.backendA : PLAIN.backendB) : (col + row) % 2 === 0 ? PLAIN.sky : PLAIN.mint;

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

const Cell: React.FC<{ col: number; row: number; column?: ColumnPose; coherent: number }> = ({ col, row, column, coherent }) => {
	const { x, y, w, h } = cellBox(col, row);
	const mine = column !== undefined && column.col === col;
	const mess = mine ? column.mess : 0;
	const sheen = mine ? column.sheen : 0;
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

export const Product: React.FC<{ column?: ColumnPose; coherent: number; under?: React.ReactNode; over?: React.ReactNode }> = ({ column, coherent, under, over }) => {
	const outline = `M${PANEL.left + 18},${PANEL.top} h${PANEL.width - 36} a18,18 0 0 1 18,18 v${PANEL.height - 36} a18,18 0 0 1 -18,18 h${-(PANEL.width - 36)} a18,18 0 0 1 -18,-18 v${-(PANEL.height - 36)} a18,18 0 0 1 18,-18 Z`;
	return (
		<g data-testid="product">
			<path d={outline} transform={`translate(${SHADOW.x} ${SHADOW.y})`} fill={palette.paperShadow} />
			<path d={outline} fill={palette.panel} stroke={palette.ink} strokeWidth={OUTLINE} strokeLinejoin="round" />
			{Array.from({ length: 3 * COLUMNS }, (_, i) => (
				<Cell key={i} col={i % COLUMNS} row={Math.floor(i / COLUMNS)} column={column} coherent={coherent} />
			))}
			{under}
			{column ? <Fence column={column} /> : null}
			{over}
			<g data-testid="backend-label">
				<rect x={PANEL.left + 14} y={ROW_TOPS[BACKEND_ROW] + 10} width={130} height={36} rx={18} fill={palette.white} stroke={palette.structure} strokeWidth={4} />
				<text x={PANEL.left + 79} y={ROW_TOPS[BACKEND_ROW] + 36} textAnchor="middle" fontFamily={FONT_FAMILY} fontWeight={700} fontSize={26} fill={palette.structure}>
					Backend
				</text>
			</g>
		</g>
	);
};
