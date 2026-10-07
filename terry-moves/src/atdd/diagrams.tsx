import React from 'react';
import { lerp } from '../storyImpact/motion';
import { ballColors } from '../storyImpact/scene';
import { palette } from './art';
import { backlogEntry, backlogPose, BacklogPose, circleArc, circlePose, localLoopRoutes } from './circleLayout';
import { ATDDStaging, staging as authoredStaging } from './staging';
import { scenes } from './film';
import { CollaborationDiamond } from './CollaborationDiamond';
import { collaborationPose } from './collaborationLayout';
import { Box, Flow, LocalCycle, Person, RED, SheetArrow, StepState, Text, Tick, WAIT } from './pieces';

import { cue, move } from './timing';
export { cue, move } from './timing';
export { SolutionTree } from './SolutionTree';

const WaitingSheet: React.FC<{ x: number; y: number; width: number; height: number; letter: string; opacity?: number; compact: number }> = ({ x, y, width, height, letter, opacity = 1, compact }) => <g opacity={opacity} transform={`translate(${x} ${y})`}>
	<rect width={width} height={height} rx={10} fill={palette.panel} stroke={palette.structure} strokeWidth={4} />
	<Text x={lerp(20, 16, compact)} y={lerp(30, 33, compact)} size={24} anchor="start">{letter}</Text>
	{['G', 'W', 'T'].map((line, i) => <g key={line} opacity={1 - compact}><Text x={27} y={49 + i * 17} size={19}>{line}</Text><path d={`M46 ${43 + i * 17} H121`} stroke={palette.structure} strokeWidth={3} /></g>)}
</g>;

const Backlog: React.FC<{ seconds: number; selected: boolean; next: boolean; compact: number; pose: BacklogPose }> = ({ seconds, selected, next, compact, pose }) => <g transform={`translate(${pose.offset.x} ${pose.offset.y})`}>
	<Text x={lerp(143, 93, compact)} y={lerp(212, 169, compact)} size={lerp(34, 27, compact)} color={palette.structure}>Backlog</Text>
	<rect {...pose.outline} rx={18} fill="none" stroke={palette.structure} strokeWidth={5} />
	{['A', 'B', 'C', 'D', 'E'].map((letter, i) => <WaitingSheet key={letter} letter={letter} {...pose.rows[i]} compact={compact} opacity={i === 0 && selected ? 1 - move(seconds, cue(3, 0, 'take')) : i === 1 && next ? 0.45 : 1} />)}
	<Text {...pose.waitingLabel} color={palette.structure} weight={700}><tspan opacity={1 - compact}>Waiting scenarios</tspan></Text>
</g>;

export const ScenarioCircle: React.FC<{ seconds?: number; phase?: number; staticBoard?: boolean; miniature?: boolean; staging?: ATDDStaging }> = ({ seconds = 126, phase = 11, staticBoard = false, miniature = false, staging = authoredStaging }) => {
	const pose = circlePose(staging);
	const collaboration = collaborationPose(pose);
	const { circle, checkpoints, localCycle } = pose;
	const localRoutes = localLoopRoutes(pose);
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
	// Clear the surrounding sheets before zooming; restore the camera before
	// revealing them again. Both use the existing single authored focus beat.
	const surroundings = 1 - Math.min(1, focus * 2);
	const compact = phase === 2 ? 0 : staticBoard ? 1 : move(seconds, cue(3, 0, 'take'), 1.2);
	const backlog = backlogPose(staging.backlog, compact);
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
	const previousCurrent = phase === 4 ? 0 : phase === 5 ? 1 : phase === 8 ? 2 : phase === 10 ? 4 : current;
	const travel = move(seconds, scenes[Math.min(phase, 13)].start + 0.2, 1.6);
	const team = collaboration.teamPosition(previousCurrent, current, travel);
	const camera = collaboration.camera(Math.max(0, focus * 2 - 1));
	const localShown = staticBoard ? 1 : phase >= 9 ? move(seconds, cue(9, 0, 'loop')) : 0;
	const finishingShown = staticBoard || phase > 9 ? 1 : phase === 9 ? move(seconds, cue(9, 1, 'two'), 1.2) : 0;
	return <g transform={camera}>
		<g opacity={surroundings}>
			<Backlog seconds={seconds} selected={phase >= 3 || staticBoard} next={next} compact={compact} pose={backlog} />
			{phase === 2 ? <g opacity={1 - move(seconds, scenes[3].start - 0.6, 0.6)}>
				<Box x={348} y={270} width={642} height={358} fill={palette.panel} stroke={palette.structure}>
					<Text x={669} y={336} size={43}>One meaningful scenario</Text>
					{['Given existing settings', 'When we select and Update', 'Then see the expected setting'].map((line, i) => <Text key={line} x={393} y={420 + i * 71} size={35} anchor="start" weight={700}>{line}</Text>)}
				</Box>
			</g> : null}
			<Flow d={backlogEntry(pose, backlog)} progress={show(3)} arrow />
			{[0, 1, 2, 5].map((i) => <Flow key={i} d={circleArc(pose, i)} progress={show(Math.max(checkpoints[i].from, checkpoints[(i + 1) % checkpoints.length].from))} arrow />)}
			{phase >= 3 && phase <= 4 && !miniature && firstPassed ? <g opacity={phase === 3 ? move(seconds, cue(3, 1, 'evidence')) : 1}><Tick x={checkpoints[0].origin.x + 190 * checkpoints[0].scale} y={checkpoints[0].origin.y + 145 * checkpoints[0].scale} size={12} /><Text x={checkpoints[0].origin.x + 190 * checkpoints[0].scale} y={checkpoints[0].origin.y + 184 * checkpoints[0].scale} size={24}>Saved</Text></g> : null}
			{phase >= 7 || staticBoard ? <g opacity={show(7)}>
				<Flow d={localRoutes.out} arrow />
				<LocalCycle {...localCycle} seconds={seconds} began={cue(7, 0, 'red')} phase={staticBoard ? 2 : seconds < cue(7, 0, 'green') ? 0 : seconds < cue(7, 0, 'refactor') ? 1 : 2} />
				<Flow d={localRoutes.back} color={palette.behavior} progress={phase > 7 ? 1 : move(seconds, cue(7, 1, 'return'), 1)} arrow />
			</g> : null}
			{next ? <g><Flow d={backlogEntry(pose, backlog, true)} color={ballColors.orange} arrow /><Text x={staging.backlog.x + 50} y={staging.backlog.y + 339} size={29} color={palette.trayInk}>Next →</Text></g> : null}
		</g>
		<Flow d={circleArc(pose, 3)} progress={finishingShown} arrow />
		<Flow d={circleArc(pose, 4)} progress={staticBoard ? 1 : Math.max(0, (merge - 0.6) / 0.4)} color={integrated || staticBoard ? palette.behavior : palette.structure} arrow />
		{checkpoints.map((p, i) => {
			const origin = p.origin;
			const visible = i === 4 ? finishingShown : show(p.from);
			return <g key={i} opacity={visible * (i < 3 ? surroundings : 1)} transform={`translate(${origin.x} ${origin.y}) scale(${p.scale})`}>
				<SheetArrow x={0} y={0} direction={p.direction} states={states[i]} number={i + 1} numberSide={p.numberSide} active={!staticBoard && i === current} seconds={seconds} temporary={i === 2 && !cleanup && !staticBoard} />
			</g>;
		})}
		{phase >= 9 || staticBoard ? <CollaborationDiamond pose={pose} collaboration={collaboration} seconds={seconds} split={staticBoard ? 1 : split} merge={staticBoard ? 1 : merge} loopPhase={phase === 9 ? frontEndTddPhase : 2} localShown={localShown} passed={integrated || staticBoard} staticBoard={staticBoard} /> : null}
		{phase === 5 && !miniature ? <g><Text x={checkpoints[2].x - 302} y={checkpoints[2].y + 95} size={31} color={WAIT}>* Temporary option</Text><Text x={checkpoints[2].x - 302} y={checkpoints[2].y + 131} size={29} color={WAIT}>Proper now also works.</Text></g> : null}
		{phase === 6 && !miniature ? <Text x={checkpoints[2].x - 312} y={checkpoints[2].y + 105} size={31} color={RED}>If Update fails…</Text> : null}
		{phase >= 3 && !miniature && !staticBoard ? <g>
			{[0, 1, 2, 3, 4].map((id) => {
				const target = collaboration.person(id, split, merge);
				const collaborating = phase === 9 || phase === 10;
				return <Person key={id} id={id} x={collaborating ? target.x : team.x + collaboration.all.people[id].offset} y={(collaborating ? target.y : team.y) - Math.sin(seconds * 3 + id) * 2} seconds={seconds} working={phase === 9 && split > 0.5} scale={staging.participants.scales[id]} />;
			})}
			{phase <= 8 ? <Text {...collaboration.teamLabel(team)} /> : null}
		</g> : null}
		{phase === 11 && !miniature && !staticBoard ? <g opacity={surroundings}>
			<Text x={circle.x + 80} y={circle.y - 15} size={30} color={palette.behavior} anchor="start">{cleanup ? 'DONE ✓' : seconds >= cue(11, 1, 'replace') ? 'Fake → real' : 'Cohesion'}</Text>
			<Text x={circle.x + 80} y={circle.y + 19} size={22} color={palette.behavior} anchor="start">{cleanup ? 'Ready for next' : seconds >= cue(11, 1, 'replace') ? 'Under checks' : 'Related concepts'}</Text>
		</g> : null}
	</g>;
};
