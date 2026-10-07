import React from 'react';
import { palette, STROKE } from './art';
import { ATDDStaging, staging as authoredStaging } from './staging';
import { treePose, treeStructure } from './treeLayout';
import { treeTrace } from './treeTrace';
import { cue, move } from './timing';
import { Box, Flow, RED, Text, Tick } from './pieces';

export const SolutionTree: React.FC<{ seconds?: number; phase?: 'assumed' | 'growing' | 'complete'; miniature?: boolean; staging?: ATDDStaging }> = ({ seconds = 27, phase = 'complete', miniature = false, staging = authoredStaging }) => {
	const growing = phase !== 'assumed';
	const began = cue(1, 0, 'scenario');
	const pose = treePose(staging);
	const cursor = treeTrace(pose.scenario, seconds, began, growing);
	const internal = growing ? move(seconds, cue(1, 1, 'internal')) : 0;
	const wrong = phase === 'assumed' ? move(seconds, cue(0, 1, 'wrong')) : 0;
	return <g>
		<g opacity={growing ? 0.72 : 1}>
			<path d="M90 764 H157 V358 H203 L126 254 L49 358 H90Z" fill="#F6E4DE" stroke={RED} strokeWidth={STROKE.panel} strokeLinejoin="round" />
			{!miniature ? <><Text x={127} y={816} size={31} color={RED}>Build parts</Text><Text x={127} y={851} size={31} color={RED}>then integrate</Text></> : null}
		</g>
		{pose.edges.map((edge) => <Flow key={edge.id} d={edge.d} width={STROKE.detail} />)}
		{treeStructure.map(({ id, label, needed }) => {
			const n = pose.nodes[id];
			return <g key={id} data-tree-node={id} opacity={growing && !needed ? 0.34 : 1}>
				<Box x={n.x - n.width / 2} y={n.y - n.height / 2} width={n.width} height={n.height} fill={palette.panel} stroke={palette.structure} radius={17}><Text x={n.x} y={n.y + (id === 'result' ? 12 : 4)} size={id === 'result' ? 37 : 33}>{label}</Text></Box>
				{wrong > 0 && ['frontSibling', 'backRight'].includes(id) ? <g opacity={wrong}><Tick x={n.x} y={n.y} cross size={23} color={RED} /></g> : null}
			</g>;
		})}
		<Flow d={cursor.trail} color={palette.behavior} width={STROKE.emphasis} progress={cursor.started ? 1 : 0} />
		{cursor.started ? <g opacity={move(seconds, began, 0.45)}>
			<circle cx={cursor.x} cy={cursor.y} r={12} fill={palette.behavior} stroke={palette.ink} strokeWidth={3} />
			<Flow d={pose.endToEndRoute} color={palette.behavior} progress={move(seconds, began)} />
			<circle cx={pose.endToEnd.x} cy={pose.endToEnd.y} r={pose.endToEnd.radius} fill={palette.cellMint} stroke={palette.behavior} strokeWidth={6} /><Text x={pose.endToEnd.x} y={pose.endToEnd.y + 12} size={34} color={palette.behavior}>T</Text>
			{!miniature ? <><Text x={pose.endToEnd.x} y={pose.endToEnd.y - 64} size={31} color={palette.behavior}>End-to-end</Text><Text x={pose.endToEnd.x} y={pose.endToEnd.y - 29} size={31} color={palette.behavior}>test</Text></> : null}
		</g> : null}
		{internal > 0 ? <g opacity={internal}>
			{pose.internalRoutes.map((d, i) => <Flow key={i} d={d} color={palette.behavior} width={STROKE.panel} />)}
			<circle cx={pose.internal.x} cy={pose.internal.y} r={pose.internal.radius} fill={palette.cellMint} stroke={palette.behavior} strokeWidth={6} /><Text x={pose.internal.x} y={pose.internal.y + 12} size={33} color={palette.behavior}>T</Text>
			{!miniature ? <><Text x={pose.internal.x + 4} y={pose.internal.y + 73} size={30} color={palette.behavior}>Internal</Text><Text x={pose.internal.x + 4} y={pose.internal.y + 105} size={30} color={palette.behavior}>test</Text></> : null}
		</g> : null}
		{growing && !miniature ? <Text x={530} y={840} size={33} color={palette.behavior}>One result pulls its needed path.</Text> : null}
	</g>;
};
