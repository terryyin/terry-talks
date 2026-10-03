import React from 'react';
import { ProductCell } from '../storyImpact/cell';
import { AXES, BEHAVIOR_LABEL_ANGLE, ORIGIN, Point, roundedPath, scaleAround, wallOutline, wallPoint } from '../storyImpact/layout';
import { Splat } from '../storyImpact/splat';
import { bodyFont, headlineFont, palette, productStageTransform } from './design';
import { mix, reveal, sceneAt } from './film';
import { colors, customerSplitAt, deliveryAt, firstOutcomeVisible, firstStory, futureSpot, outcomeSpot, outcomes, spokenCue, structuralSplitAt, WISH } from './series';

export const StageText: React.FC<{ x: number; y: number; children: React.ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; serif?: boolean; opacity?: number }> = ({ x, y, children, size = 32, color = palette.ink, anchor = 'middle', serif = false, opacity = 1 }) => (
	<text x={x} y={y} textAnchor={anchor} fontFamily={serif ? headlineFont : bodyFont} fontSize={size} fill={color} opacity={opacity}>{children}</text>
);

export const WishBall: React.FC<{ at: Point; radius: number; color?: string; squash?: number; opacity?: number; id?: string }> = ({ at, radius, color = palette.terracotta, squash = 1, opacity = 1, id = 'wish' }) => (
	<g data-testid="wish-ball" data-outcome={id} opacity={opacity} transform={scaleAround(at, squash, 1 / squash)}>
		<ellipse cx={at.x + 6} cy={at.y + radius + 7} rx={radius * 0.77} ry={9} fill={palette.ink} opacity={0.12} />
		<circle cx={at.x} cy={at.y} r={radius} fill={color} stroke={palette.ink} strokeWidth={3} />
		<path d={`M${at.x - radius * 0.67} ${at.y - radius * 0.12} Q${at.x - radius * 0.59} ${at.y - radius * 0.72} ${at.x + radius * 0.11} ${at.y - radius * 0.69}`} fill="none" stroke={palette.paperLight} strokeWidth={radius * 0.13} strokeLinecap="round" opacity={0.65} />
		<path d={`M${at.x + radius * 0.63} ${at.y - radius * 0.02} Q${at.x + radius * 0.5} ${at.y + radius * 0.69} ${at.x - radius * 0.24} ${at.y + radius * 0.68}`} fill="none" stroke={palette.ink} strokeWidth={radius * 0.13} strokeLinecap="round" opacity={0.14} />
	</g>
);

const Arrow: React.FC<{ from: Point; to: Point; color?: string; dotted?: boolean }> = ({ from, to, color = palette.ink, dotted = false }) => (
	<g stroke={color} fill={color} strokeLinecap="round" strokeLinejoin="round">
		<line x1={from.x} y1={from.y} x2={to.x} y2={to.y} strokeWidth={4} strokeDasharray={dotted ? '5 10' : undefined} />
		<path d="M-16 -8 L0 0 L-16 8" fill="none" strokeWidth={4} transform={`translate(${to.x} ${to.y}) rotate(${Math.atan2(to.y - from.y, to.x - from.x) * 180 / Math.PI})`} />
	</g>
);

const Axes: React.FC<{ uncertain: boolean; paused: boolean }> = ({ uncertain, paused }) => (
	<g data-testid="product-axes">
		<Arrow from={ORIGIN} to={wallPoint(5.7, 0)} color={palette.terracotta} />
		<Arrow from={ORIGIN} to={{ x: ORIGIN.x, y: 130 }} color={palette.cobalt} />
		<Arrow from={ORIGIN} to={AXES.timeEnd} dotted={uncertain} />
		<StageText x={ORIGIN.x + 13} y={114} size={35} anchor="start" color={palette.cobalt}>Structure</StageText>
		<g transform={`rotate(${BEHAVIOR_LABEL_ANGLE} 270 760)`}><StageText x={270} y={760} size={35} color={palette.terracotta}>Behavior</StageText></g>
		<StageText x={1015} y={645} size={35} anchor="end">Time</StageText>
		{uncertain && <StageText x={1055} y={565} size={48}>?</StageText>}
		{paused && <g data-testid="time-paused" stroke={palette.ink} strokeWidth={7}><line x1={1080} y1={576} x2={1080} y2={601} /><line x1={1100} y1={576} x2={1100} y2={601} /></g>}
	</g>
);

const StructuralPieces: React.FC<{ progress: number }> = ({ progress }) => (
	<g data-testid="solution-pieces">
		{['Database', 'API', 'Screen'].map((label, index) => {
			const at = { x: mix(WISH.x, 645 + index * 155, progress), y: mix(WISH.y, 405, progress) };
			return <g key={label} opacity={progress} transform={`translate(${at.x} ${at.y}) rotate(${mix(index * 9 - 9, 0, progress)})`}>
				<path d="M-61 -54 L52 -54 L65 48 L-54 55 Z" fill={colors[index]} stroke={palette.ink} strokeWidth={3} />
				<StageText x={0} y={92} size={30}>{label}</StageText>
			</g>;
		})}
	</g>
);

const Wishes: React.FC<{ seconds: number }> = ({ seconds }) => {
	const id = sceneAt(seconds).id;
	if (['fractal', 'commit', 'health'].includes(id)) return null;
	if (id === 'hook' || id === 'parts') {
		const split = id === 'parts' ? structuralSplitAt(seconds) : 0;
		return <><WishBall at={WISH} radius={88} opacity={1 - split} squash={1 + 0.04 * Math.sin(seconds * 2)} /><StageText x={WISH.x} y={215} size={45} serif>Split the bill</StageText><StructuralPieces progress={split} /></>;
	}
	const split = id === 'problem' ? customerSplitAt(seconds) : 1;
	const restoring = id === 'problem' ? 1 - reveal(seconds, spokenCue('problem', 0), 0.5) : 0;
	return <>
		{restoring > 0 && <StructuralPieces progress={restoring} />}
		{split < 1 && <WishBall at={WISH} radius={88} opacity={(1 - split) * (1 - restoring)} />}
		{outcomes.map((label, index) => {
			if (index === 0 && !firstOutcomeVisible(seconds)) return null;
			const target = index === 0 ? outcomeSpot(0) : futureSpot(index as 1 | 2, seconds);
			const at = { x: mix(WISH.x, target.x, split), y: mix(WISH.y, target.y, split) };
			const radius = mix(74, 58, split);
			return <g key={label} data-testid="customer-outcome" data-started="false" data-name={label} opacity={split}>
				<WishBall at={at} radius={radius} color={colors[index]} id={label} squash={1 + Math.sin(split * Math.PI) * 0.15} />
				<StageText x={at.x} y={at.y + radius + 33} size={29} opacity={reveal(split, 0.6, 0.4)}>{label.split(' ').map((word, part) => <tspan key={word} x={at.x} dy={part ? 29 : 0}>{word}</tspan>)}</StageText>
			</g>;
		})}
	</>;
};

export const ProductStage: React.FC<{ seconds: number }> = ({ seconds }) => {
	const scene = sceneAt(seconds);
	const pose = deliveryAt(seconds);
	const show = reveal(seconds, 0, 0.6);
	const health = scene.id === 'health' ? reveal(seconds, spokenCue('health', 0, 'coherent'), 0.65) : 0;
	return (
		<svg width="1080" height="900" viewBox="0 0 1080 900" style={{ position: 'absolute', top: 0, left: 0 }} aria-label="Story Impact product stage: Structure, Behavior and Time">
			<g transform={productStageTransform} opacity={show}>
				<Axes uncertain={scene.id === 'premises'} paused={scene.id === 'stop'} />
				<path d={roundedPath(wallOutline({ columns: 4, rows: 4 }), 8)} fill={palette.paperLight} stroke={palette.ink} strokeWidth={3} />
				<StageText x={345} y={194} size={43} serif>Product</StageText>
				<g data-testid="product-wall" data-coherent={pose.complete}>{pose.cells.map((cell) => <ProductCell key={`${cell.col}-${cell.row}`} cell={cell} />)}</g>
				{health > 0 && <path d={roundedPath(wallOutline({ columns: 4, rows: 4 }), 8)} fill="none" stroke={palette.cobalt} strokeWidth={5} strokeDasharray="1600" strokeDashoffset={1600 * (1 - health)} opacity={0.8} />}
				{pose.paint && <Splat splat={pose.paint} wall={{ columns: 4, rows: 4 }} />}
				{!['fractal', 'commit', 'health'].includes(scene.id) && <path d="M562 480 V511 H1010 V480" fill="none" stroke={palette.gold} strokeWidth={5} strokeLinejoin="round" />}
				<Wishes seconds={seconds} />
				{pose.ball && <WishBall at={pose.ball} radius={firstStory.ball.size} squash={0.84} />}
			</g>
		</svg>
	);
};
