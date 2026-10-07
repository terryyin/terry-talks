import React from 'react';
import { Face } from '../storyImpact/face';
import { FONT_FAMILY, roundedPath } from '../storyImpact/layout';
import { ballColors } from '../storyImpact/scene';
import { palette, RED, WAIT, TEAM_COLORS, STROKE, SHADOW } from './art';

export { RED, WAIT } from './art';
export type StepState = 'waiting' | 'running' | 'pass' | 'fail' | 'fake';

export const Text: React.FC<{ x: number; y: number; children: React.ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; weight?: number }> = ({ x, y, children, size = 40, color = palette.ink, anchor = 'middle', weight = 800 }) => (
	<text x={x} y={y} textAnchor={anchor} fontFamily={FONT_FAMILY} fontSize={size} fontWeight={weight} fill={color}>{children}</text>
);

export const Box: React.FC<{ x: number; y: number; width: number; height: number; fill?: string; stroke?: string; dashed?: boolean; radius?: number; children?: React.ReactNode }> = ({ x, y, width, height, fill = palette.white, stroke = palette.ink, dashed = false, radius = 22, children }) => (
	<g>
		<rect x={x + SHADOW.x} y={y + SHADOW.y} width={width} height={height} rx={radius} fill={palette.paperShadow} opacity={SHADOW.opacity} />
		<rect x={x} y={y} width={width} height={height} rx={radius} fill={fill} stroke={stroke} strokeWidth={STROKE.panel} strokeDasharray={dashed ? '14 10' : undefined} />
		{children}
	</g>
);

export const Tick: React.FC<{ x: number; y: number; size?: number; color?: string; cross?: boolean }> = ({ x, y, size = 15, color = palette.behavior, cross = false }) => (
	<g stroke={color} strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" fill="none">
		{cross ? <path d={`M${x - size * 0.65} ${y - size * 0.65} L${x + size * 0.65} ${y + size * 0.65} M${x + size * 0.65} ${y - size * 0.65} L${x - size * 0.65} ${y + size * 0.65}`} /> : <path d={`M${x - size * 0.8} ${y} l${size * 0.55} ${size * 0.6} l${size * 1.25} ${-size * 1.35}`} />}
	</g>
);

export const Status: React.FC<{ x: number; y: number; state: StepState; seconds?: number }> = ({ x, y, state, seconds = 0 }) => {
	const color = state === 'pass' || state === 'fake' ? palette.behavior : state === 'fail' ? RED : state === 'running' ? palette.structure : WAIT;
	return <g>
		<circle cx={x} cy={y} r={16} fill={state === 'waiting' ? palette.paper : color} stroke={color} strokeWidth={3} strokeDasharray={state === 'waiting' ? '5 5' : undefined} />
		{state === 'pass' || state === 'fake' || state === 'fail' ? <Tick x={x} y={y} size={10} color={palette.white} cross={state === 'fail'} /> : <Text x={x} y={y + 9} size={27} color={state === 'running' ? palette.white : WAIT}>{state === 'running' ? ['·', '··', '···'][Math.floor(seconds * 3) % 3] : '…'}</Text>}
	</g>;
};

export const Flow: React.FC<{ d: string; color?: string; progress?: number; width?: number; arrow?: boolean }> = ({ d, color = palette.structure, progress = 1, width = STROKE.flow, arrow = false }) => {
	const id = React.useId();
	return <g opacity={progress > 0 ? 1 : 0}>
		{arrow ? <defs><marker id={id} viewBox="0 0 3.4 2.6" markerWidth={3.4} markerHeight={2.6} refX={3} refY={1.3} orient="auto" markerUnits="strokeWidth">
			<path d="M0 .1 L3 1.3 L0 2.5 L.6 1.3 Z" fill={color} />
		</marker></defs> : null}
		<path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - progress} markerEnd={arrow && progress >= 0.99 ? `url(#${id})` : undefined} />
	</g>;
};

// The same five colors and badges persist through every move and the 3/2 fork.
export const Person: React.FC<{ x: number; y: number; id: number; seconds?: number; working?: boolean; scale?: number }> = ({ x, y, id, seconds = 0, working = false, scale = 1 }) => {
	const hand = working ? Math.sin(seconds * 8 + id) * 6 : 0;
	return <g transform={`translate(${x} ${y}) scale(${scale})`}>
		<ellipse cy={60} rx={22} ry={5} fill={palette.ink} opacity={0.12} />
		<path d="M-10 40 l-3 18 M10 40 l3 18" stroke={palette.ink} strokeWidth={6} strokeLinecap="round" />
		<rect x={-18} y={17} width={36} height={29} rx={10} fill={TEAM_COLORS[id]} stroke={palette.ink} strokeWidth={4} />
		<path d={`M-17 25 l-12 ${9 + hand} M17 25 l12 ${9 - hand}`} stroke={palette.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
		<circle r={20} fill="#FFD9AC" stroke={palette.ink} strokeWidth={4} />
		<path d="M-19 -6 Q-20 -24 -2 -23 Q15 -26 19 -7 L4 -12 Z" fill={palette.ink} />
		<Face x={0} y={2} r={15} mood="smile" />
		<Text x={0} y={39} size={22}>{id + 1}</Text>
	</g>;
};

export const MiniAI: React.FC<{ x: number; y: number }> = ({ x, y }) => <g transform={`translate(${x} ${y})`}>
	<path d="M0 -29 v-15" stroke={palette.ink} strokeWidth={5} /><circle cy={-45} r={7} fill={ballColors.pink} stroke={palette.ink} strokeWidth={4} />
	<rect x={-38} y={-30} width={76} height={59} rx={17} fill={palette.cellSky} stroke={palette.ink} strokeWidth={5} />
	<Face x={0} y={-5} r={22} mood="gleeful" />
	<Text x={0} y={21} size={23}>AI</Text>
</g>;

export type SheetDirection = 'right' | 'down' | 'left' | 'up';
type SheetProps = { x: number; y: number; direction: SheetDirection; states: StepState[]; active?: boolean; seconds?: number; number?: number; numberSide?: 'left' | 'right'; opacity?: number; temporary?: boolean };
export const sheetPoints = (direction: SheetDirection): { x: number; y: number }[] => {
	const points = direction === 'right' ? [[0, 0], [180, 0], [180, 46], [224, 78], [180, 110], [180, 156], [0, 156]]
		: direction === 'down' ? [[0, 0], [180, 0], [180, 156], [122, 156], [90, 196], [58, 156], [0, 156]]
			: direction === 'left' ? [[0, 0], [180, 0], [180, 156], [0, 156], [0, 110], [-44, 78], [0, 46]]
				: [[0, 0], [58, 0], [90, -40], [122, 0], [180, 0], [180, 156], [0, 156]];
	return points.map(([x, y]) => ({ x, y }));
};
const arrowOutline = (direction: SheetDirection) => roundedPath(sheetPoints(direction), 5);

export const SheetArrow: React.FC<SheetProps> = ({ x, y, direction, states, active = false, seconds = 0, number, numberSide = 'left', opacity = 1, temporary = false }) => <g transform={`translate(${x} ${y})`} opacity={opacity}>
	{active ? <path d={arrowOutline(direction)} fill="none" stroke={TEAM_COLORS[4]} strokeWidth={11} strokeLinejoin="round" /> : null}
	<path d={arrowOutline(direction)} transform={`translate(${SHADOW.x} ${SHADOW.y})`} fill={palette.paperShadow} opacity={SHADOW.opacity} />
	<path d={arrowOutline(direction)} fill={palette.panel} stroke={palette.structure} strokeWidth={STROKE.panel} strokeLinejoin="round" />
	<Text x={90} y={28} size={26}>Scenario A</Text>
	{['Given', 'Select', 'Update', 'Then'].map((row, i) => <g key={row}>
		<path d={`M12 ${66 + i * 29} H168`} stroke={palette.paperShadow} strokeWidth={1.5} />
		<Text x={12} y={58 + i * 29} size={28} anchor="start" weight={700}>{row}{temporary && i === 1 ? '*' : ''}</Text>
		<Status x={155} y={49 + i * 29} state={states[i]} seconds={seconds} />
	</g>)}
	{number ? <g transform={numberSide === 'right' ? 'translate(210 0)' : undefined}><circle cx={-15} cy={-17} r={17} fill={palette.cellSky} stroke={palette.ink} strokeWidth={3} /><Text x={-15} y={-9} size={24}>{number}</Text></g> : null}
</g>;

export const LocalCycle: React.FC<{ x: number; y: number; seconds?: number; began?: number; size?: number; title?: boolean; phase?: number }> = ({ x, y, seconds = 0, began = 0, size = 1, title = true, phase }) => {
	const k = phase ?? Math.max(0, Math.min(2, Math.floor((seconds - began) / 0.95)));
	return <g transform={`translate(${x} ${y}) scale(${size})`}>
		{[RED, palette.behavior, palette.structure].map((color, i) => <g key={color} opacity={i === k ? 1 : 0.4} transform={`rotate(${i * 120})`}>
			<Flow d="M-18 -49 A52 52 0 0 1 50 6" color={color} width={6} arrow />
		</g>)}
		<Text x={0} y={8} size={k === 2 ? 20 : 25}>{['RED', 'GREEN', 'REFACTOR'][k]}</Text>
		{title ? <Text x={0} y={90} size={28}>Local TDD</Text> : null}
	</g>;
};
