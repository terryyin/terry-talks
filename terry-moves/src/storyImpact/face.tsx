import React from 'react';
import { palette } from './scene';

export type Mood = 'smile' | 'hopeful' | 'dreamy' | 'gleeful';

const Cheeks: React.FC<{ x: number; y: number; r: number }> = ({ x, y, r }) => (
	<g>
		<ellipse cx={x - r * 0.52} cy={y + r * 0.22} rx={r * 0.14} ry={r * 0.09} fill={palette.cheek} opacity={0.9} />
		<ellipse cx={x + r * 0.52} cy={y + r * 0.22} rx={r * 0.14} ry={r * 0.09} fill={palette.cheek} opacity={0.9} />
	</g>
);

const DotEyes: React.FC<{ x: number; y: number; r: number; scale: number }> = ({ x, y, r, scale }) => {
	const eye = r * 0.13 * scale;
	return (
		<g>
			{[-1, 1].map((side) => (
				<g key={side}>
					<circle cx={x + side * r * 0.3} cy={y - r * 0.02} r={eye} fill={palette.ink} />
					<circle cx={x + side * r * 0.3 + eye * 0.3} cy={y - r * 0.02 - eye * 0.4} r={eye * 0.4} fill={palette.white} />
					{scale > 1 ? (
						<circle cx={x + side * r * 0.3 - eye * 0.35} cy={y - r * 0.02 + eye * 0.35} r={eye * 0.18} fill={palette.white} />
					) : null}
				</g>
			))}
		</g>
	);
};

// Closed, happy eyes: little upside-down U arcs.
const ArcEyes: React.FC<{ x: number; y: number; r: number }> = ({ x, y, r }) => (
	<g>
		{[-1, 1].map((side) => {
			const ex = x + side * r * 0.3;
			const ey = y - r * 0.02;
			return (
				<path
					key={side}
					d={`M${ex - r * 0.13},${ey + r * 0.05} Q${ex},${ey - r * 0.16} ${ex + r * 0.13},${ey + r * 0.05}`}
					fill="none"
					stroke={palette.ink}
					strokeWidth={Math.max(3, r * 0.08)}
					strokeLinecap="round"
				/>
			);
		})}
	</g>
);

const OpenMouth: React.FC<{ x: number; y: number; r: number; size: number }> = ({ x, y, r, size }) => {
	const w = r * 0.22 * size;
	const top = y + r * 0.17;
	const bottom = top + r * 0.3 * size;
	return (
		<g>
			<path
				d={`M${x - w},${top} Q${x},${top - r * 0.03} ${x + w},${top} Q${x + w * 0.9},${bottom} ${x},${bottom} Q${x - w * 0.9},${bottom} ${x - w},${top} Z`}
				fill={palette.ink}
				stroke={palette.ink}
				strokeWidth={3}
				strokeLinejoin="round"
			/>
			<ellipse cx={x} cy={bottom - r * 0.07 * size} rx={w * 0.5} ry={r * 0.06 * size} fill={palette.cheek} />
		</g>
	);
};

export const Face: React.FC<{ x: number; y: number; r: number; mood?: Mood }> = ({ x, y, r, mood = 'smile' }) => {
	const lineWidth = Math.max(3, r * 0.1);
	return (
		<g data-testid="face" data-mood={mood}>
			{mood === 'smile' || mood === 'hopeful' ? (
				<DotEyes x={x} y={y} r={r} scale={mood === 'hopeful' ? 1.35 : 1} />
			) : (
				<ArcEyes x={x} y={y} r={r} />
			)}
			<Cheeks x={x} y={y} r={r} />
			{mood === 'smile' ? (
				<path
					d={`M${x - r * 0.18},${y + r * 0.2} Q${x},${y + r * 0.42} ${x + r * 0.18},${y + r * 0.2}`}
					fill="none"
					stroke={palette.ink}
					strokeWidth={lineWidth}
					strokeLinecap="round"
				/>
			) : null}
			{mood === 'dreamy' ? (
				<path
					d={`M${x - r * 0.24},${y + r * 0.26} q${r * 0.08},${-r * 0.1} ${r * 0.16},0 t${r * 0.16},0 t${r * 0.16},0`}
					fill="none"
					stroke={palette.ink}
					strokeWidth={lineWidth}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			) : null}
			{mood === 'hopeful' ? <OpenMouth x={x} y={y} r={r} size={0.9} /> : null}
			{mood === 'gleeful' ? <OpenMouth x={x} y={y} r={r} size={1.3} /> : null}
		</g>
	);
};
