import React from 'react';
import { Easing } from 'remotion';
import { between, lerp } from '../storyImpact/motion';
import { ballColors } from '../storyImpact/scene';
import { palette, STROKE } from './art';
import { checkpoints, circle, circleArc, sheetOrigin } from './circleLayout';
import { roundedLine } from './geometry';
import { scenes } from './film';
import { CollaborationDiamond, diamondPerson } from './CollaborationDiamond';
import { Box, Flow, LocalCycle, Person, RED, SheetArrow, StepState, Text, Tick, WAIT } from './pieces';

const ease = Easing.inOut(Easing.cubic);
export const move = (seconds: number, from: number, duration = 0.7) => between(seconds, from, from + duration, ease);
export const cue = (scene: number, caption: number, word: string) => scenes[scene].captions[caption].wordCues[word] ?? scenes[scene].captions[caption].speechStart;

const nodes = [
	{ x: 540, y: 245, w: 240, h: 88, label: 'User result', parent: -1 },
	{ x: 345, y: 410, w: 210, h: 80, label: 'Front end', parent: 0 },
	{ x: 735, y: 410, w: 210, h: 80, label: 'Back end', parent: 0 },
	{ x: 265, y: 568, w: 110, h: 68, label: '', parent: 1 },
	{ x: 440, y: 568, w: 110, h: 68, label: '', parent: 1 },
	{ x: 635, y: 568, w: 110, h: 68, label: '', parent: 2 },
	{ x: 810, y: 568, w: 110, h: 68, label: '', parent: 2 },
	{ x: 720, y: 738, w: 105, h: 68, label: '', parent: 6 },
	{ x: 900, y: 738, w: 105, h: 68, label: '', parent: 6 },
];

const scenarioRoute = [[460, 289], [460, 328], [255, 328], [255, 445], [255, 503], [230, 503], [230, 568], [230, 503], [255, 503], [255, 445], [825, 445], [825, 650], [900, 650], [900, 738]];
const routeSegments = scenarioRoute.slice(1).map((to, i) => ({ from: scenarioRoute[i], to, length: Math.hypot(to[0] - scenarioRoute[i][0], to[1] - scenarioRoute[i][1]) }));
const routeLength = routeSegments.reduce((total, segment) => total + segment.length, 0);
const routeStages = [
	{ end: 3, delay: 0, duration: 0.9 },
	{ end: 6, delay: 0.9, duration: 1.05 },
	{ end: 9, delay: 2.25, duration: 1 },
	{ end: 10, delay: 3.25, duration: 1.2 },
	{ end: 13, delay: 4.45, duration: 1.3 },
].map((stage, i, stages) => ({ ...stage, length: routeSegments.slice(i === 0 ? 0 : stages[i - 1].end, stage.end).reduce((total, segment) => total + segment.length, 0) }));
const routePoint = (progress: number) => {
	let remaining = progress * routeLength;
	const points = [{ x: scenarioRoute[0][0], y: scenarioRoute[0][1] }];
	for (const { from, to, length } of routeSegments) {
		if (remaining <= length) {
			const point = { x: lerp(from[0], to[0], remaining / length), y: lerp(from[1], to[1], remaining / length) };
			return { ...point, trail: roundedLine([...points, point]) };
		}
		points.push({ x: to[0], y: to[1] });
		remaining -= length;
	}
	const [x, y] = scenarioRoute[scenarioRoute.length - 1];
	return { x, y, trail: roundedLine(points) };
};

// This is the first whiteboard topology, including its uneven depth.
export const SolutionTree: React.FC<{ seconds?: number; phase?: 'assumed' | 'growing' | 'complete'; miniature?: boolean }> = ({ seconds = 27, phase = 'complete', miniature = false }) => {
	const growing = phase !== 'assumed';
	const began = cue(1, 0, 'scenario');
	const path = growing ? routeStages.reduce((distance, stage) => distance + stage.length * move(seconds, began + stage.delay, stage.duration), 0) / routeLength : 0;
	const cursor = routePoint(path);
	const internal = growing ? move(seconds, cue(1, 1, 'internal')) : 0;
	const wrong = phase === 'assumed' ? move(seconds, cue(0, 1, 'wrong')) : 0;
	return <g>
		<g opacity={growing ? 0.72 : 1}>
			<path d="M90 764 H157 V358 H203 L126 254 L49 358 H90Z" fill="#F6E4DE" stroke={RED} strokeWidth={STROKE.panel} strokeLinejoin="round" />
			{!miniature ? <><Text x={127} y={816} size={31} color={RED}>Build parts</Text><Text x={127} y={851} size={31} color={RED}>then integrate</Text></> : null}
		</g>
		{nodes.slice(1).map((n, i) => {
			const p = nodes[n.parent];
			const y = (p.y + n.y) / 2;
			return <Flow key={i} d={roundedLine([{ x: p.x, y: p.y + p.h / 2 }, { x: p.x, y }, { x: n.x, y }, { x: n.x, y: n.y - n.h / 2 }])} width={STROKE.detail} />;
		})}
		{nodes.map((n, i) => <g key={i} opacity={growing && ![0, 1, 3, 2, 6, 7, 8].includes(i) ? 0.34 : 1}>
			<Box x={n.x - n.w / 2} y={n.y - n.h / 2} width={n.w} height={n.h} fill={palette.panel} stroke={palette.structure} radius={17}><Text x={n.x} y={n.y + (i === 0 ? 12 : 4)} size={i === 0 ? 37 : 33}>{n.label}</Text></Box>
			{wrong > 0 && [4, 8].includes(i) ? <g opacity={wrong}><Tick x={n.x} y={n.y} cross size={23} color={RED} /></g> : null}
		</g>)}
		<Flow d={cursor.trail} color={palette.behavior} width={STROKE.emphasis} progress={path > 0 ? 1 : 0} />
		{path > 0 ? <g opacity={move(seconds, began, 0.45)}>
			<circle cx={cursor.x} cy={cursor.y} r={12} fill={palette.behavior} stroke={palette.ink} strokeWidth={3} />
			<Flow d="M660 245 H810" color={palette.behavior} progress={move(seconds, began)} />
			<circle cx={843} cy={245} r={29} fill={palette.cellMint} stroke={palette.behavior} strokeWidth={6} /><Text x={843} y={257} size={34} color={palette.behavior}>T</Text>
			{!miniature ? <><Text x={843} y={181} size={31} color={palette.behavior}>End-to-end</Text><Text x={843} y={216} size={31} color={palette.behavior}>test</Text></> : null}
		</g> : null}
		{internal > 0 ? <g opacity={internal}>
			<Flow d="M840 410 H920 M800 450 V520 M800 602 V660 Q800 672 788 672 H732 Q720 672 720 684 V704 M800 672 H888 Q900 672 900 684 V704" color={palette.behavior} width={STROKE.panel} />
			<circle cx={956} cy={410} r={27} fill={palette.cellMint} stroke={palette.behavior} strokeWidth={6} /><Text x={956} y={422} size={33} color={palette.behavior}>T</Text>
			{!miniature ? <><Text x={960} y={483} size={30} color={palette.behavior}>Internal</Text><Text x={960} y={515} size={30} color={palette.behavior}>test</Text></> : null}
		</g> : null}
		{growing && !miniature ? <Text x={530} y={840} size={33} color={palette.behavior}>One result pulls its needed path.</Text> : null}
	</g>;
};

const WaitingSheet: React.FC<{ x: number; y: number; letter: string; opacity?: number; compact: number }> = ({ x, y, letter, opacity = 1, compact }) => <g opacity={opacity} transform={`translate(${x} ${y})`}>
	<rect width={lerp(142, 78, compact)} height={lerp(91, 50, compact)} rx={10} fill={palette.panel} stroke={palette.structure} strokeWidth={4} />
	<Text x={lerp(20, 16, compact)} y={lerp(30, 33, compact)} size={24} anchor="start">{letter}</Text>
	{['G', 'W', 'T'].map((line, i) => <g key={line} opacity={1 - compact}><Text x={27} y={49 + i * 17} size={19}>{line}</Text><path d={`M46 ${43 + i * 17} H121`} stroke={palette.structure} strokeWidth={3} /></g>)}
</g>;

const Backlog: React.FC<{ seconds: number; selected: boolean; next: boolean; compact: number }> = ({ seconds, selected, next, compact }) => <g>
	<Text x={lerp(143, 93, compact)} y={lerp(212, 169, compact)} size={lerp(34, 27, compact)} color={palette.structure}>Backlog</Text>
	<rect x={49} y={lerp(231, 184, compact)} width={lerp(188, 96, compact)} height={lerp(608, 337, compact)} rx={18} fill="none" stroke={palette.structure} strokeWidth={5} />
	{['A', 'B', 'C', 'D', 'E'].map((letter, i) => <WaitingSheet key={letter} letter={letter} x={lerp(72, 58, compact)} y={lerp(250 + i * 111, 200 + i * 62, compact)} compact={compact} opacity={i === 0 && selected ? 1 - move(seconds, cue(3, 0, 'take')) : i === 1 && next ? 0.45 : 1} />)}
	<Text x={143} y={875} size={26} color={palette.structure} weight={700}><tspan opacity={1 - compact}>Waiting scenarios</tspan></Text>
</g>;

export const ScenarioCircle: React.FC<{ seconds?: number; phase?: number; staticBoard?: boolean; miniature?: boolean }> = ({ seconds = 126, phase = 11, staticBoard = false, miniature = false }) => {
	const waiting: StepState[] = ['waiting', 'waiting', 'waiting', 'waiting'];
	const firstPassed = phase > 3 || seconds >= cue(3, 0, 'pass');
	const selectingFailed = phase > 4 || seconds >= cue(4, 0, 'fails');
	const shortcutPassed = phase > 5 || seconds >= cue(5, 1, 'again') + 0.4;
	const updatedFailed = phase > 6 || seconds >= cue(6, 0, 'failure');
	const localPassed = phase > 7 || seconds >= cue(7, 1, 'pass');
	const resultFailed = phase > 8 || seconds >= cue(8, 0, 'wrong');
	const integratedAt = cue(10, 0, 'run');
	const integrated = phase > 10 || seconds >= cue(10, 0, 'pass');
	const cleanup = phase > 11 || seconds >= cue(11, 1, 'completely') + 0.4;
	const next = phase === 11 && seconds >= cue(11, 1, 'next');
	const split = phase === 9 ? move(seconds, cue(9, 0, 'three'), 1.2) : phase >= 10 ? 1 : 0;
	const merge = phase === 10 ? move(seconds, cue(10, 0, 'reunite'), 1.5) : phase > 10 ? 1 : 0;
	const frontEndTddPhase = Math.floor(Math.max(0, seconds - cue(9, 0, 'loop')) / 1.1) % 3;
	const focus = miniature || staticBoard ? 0 : phase === 9 ? move(seconds, scenes[9].start, 0.7) : phase === 10 ? 1 : phase === 11 ? 1 - move(seconds, scenes[11].start, 0.7) : 0;
	const compact = phase === 2 ? 0 : staticBoard ? 1 : move(seconds, cue(3, 0, 'take'), 1.2);
	const current = phase <= 3 ? 0 : phase === 4 ? 1 : phase <= 7 ? 2 : phase === 8 ? 3 : phase === 9 ? 4 : 5;
	const states: StepState[][] = [
		[firstPassed ? 'pass' : seconds >= cue(3, 0, 'run') ? 'running' : 'waiting', ...waiting.slice(1)],
		['pass', selectingFailed ? 'fail' : seconds >= cue(4, 0, 'run') ? 'running' : 'waiting', 'waiting', 'waiting'],
		['pass', shortcutPassed ? 'fake' : 'running', localPassed ? 'pass' : phase >= 6 && updatedFailed ? 'fail' : 'waiting', 'waiting'],
		['pass', 'pass', 'pass', resultFailed ? 'fail' : seconds >= cue(8, 0, 'run') ? 'running' : 'waiting'],
		['pass', 'pass', 'pass', 'waiting'],
		[0, 1, 2, 3].map((i): StepState => integrated ? 'pass' : seconds >= integratedAt + i * 0.6 && phase === 10 ? 'pass' : 'waiting'),
	];
	if (staticBoard) {
		states[0] = ['pass', 'waiting', 'waiting', 'waiting'];
		states[1] = ['pass', 'fail', 'waiting', 'waiting'];
		states[2] = ['pass', 'pass', 'pass', 'waiting'];
		states[3] = ['pass', 'pass', 'pass', 'fail'];
		states[5] = ['pass', 'pass', 'pass', 'pass'];
	}
	const show = (from: number) => staticBoard || phase > from ? 1 : phase === from ? move(seconds, scenes[from].start + 0.25, 0.9) : 0;
	const teamSpots = [{ x: 650, y: 360 }, { x: 645, y: 440 }, { x: 600, y: 485 }, { x: 600, y: 570 }, { x: 600, y: 570 }, { x: 610, y: 320 }];
	const previousCurrent = phase === 4 ? 0 : phase === 5 ? 1 : phase === 8 ? 2 : phase === 10 ? 4 : current;
	const travel = move(seconds, scenes[Math.min(phase, 13)].start + 0.2, 1.6);
	const team = { x: lerp(teamSpots[previousCurrent].x, teamSpots[current].x, travel), y: lerp(teamSpots[previousCurrent].y, teamSpots[current].y, travel) };
	const camera = `translate(600 485) scale(${lerp(1, 1.18, focus)}) translate(${-lerp(600, 490, focus)} ${-lerp(485, 525, focus)})`;
	const localShown = staticBoard ? 1 : phase >= 9 ? move(seconds, cue(9, 0, 'loop')) : 0;
	const finishingShown = staticBoard || phase > 9 ? 1 : phase === 9 ? move(seconds, cue(9, 1, 'two'), 1.2) : 0;
	return <g transform={camera}>
		<g opacity={1 - focus}>
			<Backlog seconds={seconds} selected={phase >= 3 || staticBoard} next={next} compact={compact} />
			{phase === 2 ? <g opacity={1 - move(seconds, scenes[3].start - 0.6, 0.6)}>
				<Box x={348} y={270} width={642} height={358} fill={palette.panel} stroke={palette.structure}>
					<Text x={669} y={336} size={43}>One meaningful scenario</Text>
					{['Given existing settings', 'When we select and Update', 'Then see the expected setting'].map((line, i) => <Text key={line} x={393} y={420 + i * 71} size={35} anchor="start" weight={700}>{line}</Text>)}
				</Box>
			</g> : null}
			<Flow d={`M${lerp(247, 155, compact)} 220 C270 220 350 145 513 162`} progress={show(3)} arrow />
			{[0, 1, 2, 5].map((i) => <Flow key={i} d={circleArc(i)} progress={show(Math.max(checkpoints[i].from, checkpoints[(i + 1) % checkpoints.length].from))} arrow />)}
			{phase >= 3 && phase <= 4 && !miniature && firstPassed ? <g opacity={phase === 3 ? move(seconds, cue(3, 1, 'evidence')) : 1}><Tick x={700} y={265} size={12} /><Text x={700} y={300} size={24}>Saved</Text></g> : null}
			{phase >= 7 || staticBoard ? <g opacity={show(7)}>
				<Flow d="M949 640 C992 654 1047 679 1019 737" arrow />
				<LocalCycle x={995} y={785} seconds={seconds} began={cue(7, 0, 'red')} size={0.75} phase={staticBoard ? 2 : seconds < cue(7, 0, 'green') ? 0 : seconds < cue(7, 0, 'refactor') ? 1 : 2} />
				<Flow d="M949 766 C960 745 972 707 949 680" color={palette.behavior} progress={phase > 7 ? 1 : move(seconds, cue(7, 1, 'return'), 1)} arrow />
			</g> : null}
			{next ? <g><Flow d="M155 286 Q310 122 513 152" color={ballColors.orange} arrow /><Text x={99} y={570} size={29} color={palette.trayInk}>Next →</Text></g> : null}
		</g>
		<Flow d={circleArc(3)} progress={finishingShown} arrow />
		<Flow d={circleArc(4)} progress={staticBoard ? 1 : Math.max(0, (merge - 0.6) / 0.4)} color={integrated || staticBoard ? palette.behavior : palette.structure} arrow />
		{checkpoints.map((p, i) => {
			const origin = sheetOrigin(p);
			const visible = i === 4 ? finishingShown : show(p.from);
			return <g key={i} opacity={visible * (i < 3 ? 1 - focus : 1)} transform={`translate(${origin.x} ${origin.y}) scale(${circle.sheetScale})`}>
				<SheetArrow x={0} y={0} direction={p.direction} states={states[i]} number={i + 1} numberSide={i === 1 ? 'right' : 'left'} active={!staticBoard && i === current} seconds={seconds} temporary={i === 2 && !cleanup && !staticBoard} />
			</g>;
		})}
		{phase >= 9 || staticBoard ? <CollaborationDiamond seconds={seconds} split={staticBoard ? 1 : split} merge={staticBoard ? 1 : merge} loopPhase={phase === 9 ? frontEndTddPhase : 2} localShown={localShown} passed={integrated || staticBoard} staticBoard={staticBoard} /> : null}
		{phase === 5 && !miniature ? <g><Text x={550} y={720} size={31} color={WAIT}>* Temporary option</Text><Text x={550} y={756} size={29} color={WAIT}>Proper now also works.</Text></g> : null}
		{phase === 6 && !miniature ? <Text x={540} y={730} size={31} color={RED}>If Update fails…</Text> : null}
		{phase >= 3 && !miniature && !staticBoard ? <g>
			{[0, 1, 2, 3, 4].map((id) => {
				const target = diamondPerson(id, split, merge);
				const collaborating = phase === 9 || phase === 10;
				return <Person key={id} id={id} x={collaborating ? target.x : team.x + (id - 2) * 43} y={(collaborating ? target.y : team.y) - Math.sin(seconds * 3 + id) * 2} seconds={seconds} working={phase === 9 && split > 0.5} scale={0.78} />;
			})}
			{phase <= 8 ? <Text x={team.x - 25} y={team.y + 80} size={25}>Working together</Text> : null}
		</g> : null}
		{phase === 11 && !miniature && !staticBoard ? <g opacity={1 - focus}>
			<Text x={690} y={470} size={30} color={palette.behavior} anchor="start">{cleanup ? 'DONE ✓' : seconds >= cue(11, 1, 'replace') ? 'Fake → real' : 'Cohesion'}</Text>
			<Text x={690} y={504} size={22} color={palette.behavior} anchor="start">{cleanup ? 'Ready for next' : seconds >= cue(11, 1, 'replace') ? 'Under checks' : 'Related concepts'}</Text>
		</g> : null}
	</g>;
};
