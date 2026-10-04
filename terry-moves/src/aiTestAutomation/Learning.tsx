import React from 'react';
import { AI, Cabinet, Engineer } from './actors';
import { Label, palette } from './design';
import { cue, FilmScene } from './film';
import { appear, blinkAt, gesture, lerpPoint, mix, reach, travel } from './motion';
import { CheckCard, Sandbox, Wrench } from './props';

export const SandboxShot: React.FC<{ seconds: number; scene: FilmScene }> = ({ seconds, scene }) => {
	const environment = appear(seconds, scene.captionRanges[1].start, 0.4);
	const showStart = cue(scene, 2, 'show');
	const show = gesture(seconds, showStart, 0.92);
	const resetStart = cue(scene, 1, 'repeatable') + 0.12;
	const resetPress = gesture(seconds, resetStart, 0.65);
	const reset = travel(seconds, resetStart + 0.325, 0.35);
	const aiX = mix(775, 690, travel(seconds, cue(scene, 1, 'isolated'), 0.65));
	const observed = seconds >= showStart + 0.48;
	return <g>
		<g opacity={1 - environment}><CheckCard x={493} y={643} title="HANDS-ON" scale={1.45} selected/><AI x={779} y={1008} scale={1.48} mood="focused" gaze={-1}/><Label x={529} y={435} size={37}>LOOK. TRY. CHECK.</Label></g>
		<g opacity={environment} data-testid="manual-demonstration" data-observed-failure={observed}>
			<Sandbox x={520} y={500} width={380} height={350} resetting={reset}>
				<Cabinet x={57} y={55} scale={0.68} compact neutral={!observed}/>
				<path d="M22 305V266H63" fill="none" stroke={palette.ink} strokeWidth="4"/>
				<g data-testid="hands-on-control"><circle cx="22" cy="305" r="22" fill={show > 0.5 ? '#F9DC8C' : palette.gold} stroke={palette.ink} strokeWidth="4"/><path d="M16 295L31 305L16 315Z" fill={palette.cream}/></g>
			</Sandbox>
			<Engineer x={385} y={1000} scale={1.1} mood={observed ? 'concerned' : 'focused'} gaze={1} rightHand={lerpPoint({ x: 69, y: -164 }, reach(385, 1000, 542, 805, 1.1), show)} headTilt={show * -3} blink={blinkAt(seconds, [scene.captionRanges[1].start + 0.6])}/>
			<AI x={aiX} y={1000} scale={1.05} mood={observed ? 'concerned' : 'focused'} gaze={-1} rightHand={lerpPoint({ x: 96, y: -102 }, reach(aiX, 1000, 710, 838, 1.05), resetPress)}/>
			<rect x="348" y="358" width="531" height="108" rx="14" fill={palette.cream} stroke={palette.ink} strokeWidth="4"/>
			<Label x={614} y={399} size={28} color={palette.green}>SAVE SHOULD KEEP DATA</Label>
			<Label x={614} y={443} size={28} color={observed ? palette.red : palette.muted}>{observed ? 'OBSERVED: DATA LOST' : 'START FROM A KNOWN STATE'}</Label>
			<Label x={648} y={1080} size={25}>EASY TO SET UP · RESET · CHECK</Label>
		</g>
	</g>;
};

/** Physical actions are anchored to the accepted saved narration, not old scene seconds. */
export const checkingMoments = (scene: FilmScene) => ({
	repairStart: cue(scene, 0, 'have') + 0.25,
	repaired: scene.captionRanges[0].speechEnd + 0.07,
	confirmContact: cue(scene, 1, 'confirm'),
	exploreContact: cue(scene, 1, 'explore'),
	knownContact: cue(scene, 2, 'check'),
	handoffStart: scene.captionRanges[3].start + 0.2,
	relief: cue(scene, 4, 'relief'),
});

export const Investigate: React.FC<{ seconds: number; scene: FilmScene }> = ({ seconds, scene }) => {
	const times = checkingMoments(scene);
	const repair = gesture(seconds, times.repairStart, 0.85);
	const repaired = seconds >= times.repaired;
	const confirmed = seconds >= times.confirmContact + 0.1;
	const exploring = seconds >= times.exploreContact - 0.25;
	const foundReloadBug = seconds >= times.exploreContact + 0.13;
	const checkingKnown = seconds >= times.knownContact - 0.25;
	const knownStillWorks = seconds >= times.knownContact + 0.14;
	const compromise = seconds >= scene.captionRanges[3].start;
	const handoff = travel(seconds, times.handoffStart, 0.65);
	const newRepair = appear(seconds, scene.captionRanges[4].start, 0.4);
	const rest = travel(seconds, times.relief - 0.4, 0.35);
	const relieved = seconds >= times.relief;
	const action = compromise ? 'repair-reload' : checkingKnown ? 'regression' : exploring ? 'explore-reload' : repaired ? 'confirm-save' : 'fix-save';
	const press = gesture(seconds, times.confirmContact - 0.25, 0.5) + gesture(seconds, times.exploreContact - 0.25, 0.5) + gesture(seconds, times.knownContact - 0.25, 0.5);
	const lift = travel(seconds, times.repairStart - 0.15, 0.15) * (1 - travel(seconds, times.repaired, 0.18));
	const oldWrist = { x: 815 + repair * 4, y: 715 + lift * 48 + repair * 2 };
	const nextRepair = gesture(seconds, scene.captionRanges[4].speechStart + 0.3, 1.5);
	const nextWrist = { x: 815 + nextRepair * 3, y: 678 + nextRepair * 2 };
	const workHand = lerpPoint(lerpPoint({ x: 65, y: -164 }, reach(650, 1000, oldWrist.x, oldWrist.y, 1.2), lift), reach(650, 1000, nextWrist.x, nextWrist.y, 1.2), newRepair * (1 - rest));
	const findingX = mix(810, 745, handoff);
	const findingY = mix(885, 846, handoff);
	const expected = checkingKnown ? 'SEARCH: SAVED RECORD' : exploring ? 'RELOAD: CURRENT DATA' : 'SAVE: DATA KEPT';
	const observed = compromise ? 'NEXT: FIX RELOAD' : checkingKnown ? knownStillWorks ? '✓ RECORD FOUND' : 'CHECK KNOWN BEHAVIOR' : exploring ? foundReloadBug ? '× SECOND TAB: OLD DATA' : 'TRY A SECOND TAB' : confirmed ? '✓ FIX CONFIRMED' : repaired ? 'FIXED — NOW CHECK' : 'FIX THE SAVE DEFECT';
	return <g data-testid="similar-hands-on-testing" data-action={action} data-save-repaired={repaired} data-save-confirmed={confirmed} data-reload-bug={foundReloadBug} data-known-working={knownStillWorks} data-current-work={compromise ? 'repair-reload' : 'checking'}>
		<Cabinet x={650} y={485} scale={0.9} fixed={confirmed} reloadFinding={foundReloadBug}/>
		<rect x="348" y="348" width="609" height="108" rx="14" fill={palette.cream} stroke={palette.ink} strokeWidth="4"/>
		<Label x={653} y={390} size={26} color={palette.muted}>{compromise ? 'THE FINDING BECOMES CURRENT WORK' : expected}</Label>
		<Label x={653} y={436} size={29} color={compromise ? palette.ink : foundReloadBug && !checkingKnown ? palette.red : confirmed ? palette.green : palette.ink}>{observed}</Label>
		<path d="M815 815V778H837" fill="none" stroke={palette.ink} strokeWidth="4"/>
		<g data-testid="ai-check-control"><circle cx="815" cy="837" r={25 - press * 3} fill={press > 0.5 ? '#FFE5A9' : palette.gold} stroke={palette.ink} strokeWidth="4"/><path d="M807 827L824 837L807 847Z" fill={palette.cream}/><Label x={813} y={896} size={21}>{checkingKnown ? 'SEARCH' : exploring ? 'RELOAD' : 'SAVE'}</Label></g>
		<AI x={875} y={1000} scale={1.2} mood={foundReloadBug && !knownStillWorks ? 'concerned' : confirmed ? 'pleased' : 'focused'} gaze={-1} leftHand={compromise ? lerpPoint({ x: -99, y: -104 }, reach(875, 1000, findingX + 49.58, findingY, 1.2), handoff * (1 - newRepair)) : lerpPoint({ x: -99, y: -104 }, reach(875, 1000, 815, 837, 1.2), press)} blink={blinkAt(seconds, [times.repaired, times.knownContact + 0.8])}/>
		<Engineer x={650} y={1000} scale={1.2} mood={relieved ? 'relieved' : 'focused'} gaze={1} leftHand={lerpPoint({ x: -74, y: -165 }, reach(650, 1000, findingX - 49.58, findingY, 1.2), handoff)} rightHand={workHand} headTilt={relieved ? 3 : -3 * lift}/>
		{seconds >= times.repairStart && !repaired && <Wrench x={oldWrist.x} y={oldWrist.y} rotation={repair * 9}/>}
		{newRepair > 0.9 && rest < 1 && <g opacity={1 - rest}><Wrench x={nextWrist.x} y={nextWrist.y} rotation={-7 + nextRepair * 5}/></g>}
		{compromise && <CheckCard x={findingX} y={findingY} kind="finding" title="FIX RELOAD" scale={0.67}/>}
		<Label x={600} y={1080} size={27} color={relieved ? palette.green : palette.muted}>{relieved ? 'ROOM TO REPAIR. NO NEW TEST CODE.' : compromise ? 'A COMPROMISE — WITH LESS TO CARRY' : 'CONFIRM · EXPLORE · CHECK KNOWN'}</Label>
	</g>;
};
