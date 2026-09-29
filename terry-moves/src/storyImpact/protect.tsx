import React from 'react';
import { Easing } from 'remotion';
import { palette, ProtectPose } from './scene';
import { cellCenter } from './cell';
import { DOMAIN, FONT_FAMILY, Point, scaleAround, wallPoint } from './layout';
import { clamp01 } from './motion';

// What keeps the product coherent once a story is assimilated: a green test
// shield on each Behavior column's bottom cell, and dashed links from each
// Structure row to a domain concept. Pure function of the pose.

const pop = Easing.out(Easing.back(2.4));

const Shield: React.FC<{ at: Point; scale: number }> = ({ at, scale }) => {
	const s = 24;
	const { x, y } = at;
	const d = `M${x - s},${y - s * 0.85} Q${x},${y - s * 1.25} ${x + s},${y - s * 0.85} L${x + s},${y} Q${x + s},${y + s * 0.85} ${x},${y + s * 1.3} Q${x - s},${y + s * 0.85} ${x - s},${y} Z`;
	return (
		<g data-testid="test-shield" transform={scaleAround(at, scale, scale)}>
			<path d={d} fill={palette.behavior} stroke={palette.ink} strokeWidth={5} strokeLinejoin="round" />
			<path d={`M${x - 10},${y} L${x - 2},${y + 9} L${x + 11},${y - 9}`} fill="none" stroke={palette.white} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
		</g>
	);
};

const chipWidth = (text: string) => text.length * DOMAIN.size * 0.56 + 36;

const DomainLink: React.FC<{ row: number; k: number }> = ({ row, k }) => {
	const from = wallPoint(0, row + 0.5);
	const start = { x: from.x + 10, y: from.y };
	const y = DOMAIN.ys[row];
	const to = { x: DOMAIN.left, y };
	const draw = clamp01(k / 0.6);
	const end = { x: start.x + (to.x - start.x) * draw, y: start.y + (to.y - start.y) * draw };
	const chip = pop(clamp01((k - 0.5) / 0.5));
	const text = DOMAIN.concepts[row];
	const w = chipWidth(text);
	const center = { x: DOMAIN.left + w / 2, y };
	return (
		<g data-testid="domain-link" data-row={row}>
			<line x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke={palette.ink} strokeWidth={10} strokeLinecap="round" strokeDasharray="14 12" />
			<line x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke={palette.structure} strokeWidth={5} strokeLinecap="round" strokeDasharray="14 12" />
			<circle cx={start.x} cy={start.y} r={7} fill={palette.structure} stroke={palette.ink} strokeWidth={3} />
			{chip > 0 ? (
				<g data-testid="domain-chip" transform={scaleAround(center, chip, chip)}>
					<rect x={DOMAIN.left} y={y - DOMAIN.height / 2} width={w} height={DOMAIN.height} rx={DOMAIN.height / 2} fill={palette.white} stroke={palette.structure} strokeWidth={5} />
					<text x={center.x} y={y + DOMAIN.size * 0.34} textAnchor="middle" fontFamily={FONT_FAMILY} fontWeight={700} fontSize={DOMAIN.size} fill={palette.structure}>
						{text}
					</text>
				</g>
			) : null}
		</g>
	);
};

// A shield on each of the product's `columns`.
export const Protect: React.FC<{ protect: ProtectPose; columns: number }> = ({ protect, columns }) => {
	const { shields, links, fade } = protect;
	if (fade !== undefined && fade <= 0) return null;
	const rows = DOMAIN.concepts.length;
	return (
		<g data-testid="protect" opacity={fade}>
			{Array.from({ length: rows }, (_, row) => {
				const k = clamp01(links * rows - row);
				return k > 0 ? <DomainLink key={row} row={row} k={k} /> : null;
			})}
			{Array.from({ length: columns }, (_, col) => {
				const k = clamp01((shields * columns - col) / 1.5);
				return k > 0 ? <Shield key={col} at={cellCenter({ col, row: 0, dx: 0, dy: 0, rot: 0, color: '' })} scale={pop(k)} /> : null;
			})}
		</g>
	);
};
