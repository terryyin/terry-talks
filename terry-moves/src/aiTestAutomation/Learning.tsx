import React from 'react';
import { AI, Cabinet, Engineer, Shield } from './actors';
import { Label, palette } from './design';
import { FilmScene } from './film';
import { appear, blinkAt, gesture, lerpPoint, mix, reach, travel } from './motion';
import { CheckCard, Sandbox, Wrench } from './props';

export const SandboxShot: React.FC<{ seconds: number; scene: FilmScene }> = ({ seconds, scene }) => {
	const environment = appear(seconds, scene.captionRanges[1].start, 0.4);
	const show = gesture(seconds, 35.3, 1.0);
	const reset = travel(seconds, 36.5, 0.35);
	const aiX = mix(790, 663, travel(seconds, 36.2, 0.3));
	const repeat = gesture(seconds, 37.15, 0.9);
	const observed = (seconds >= 35.85 && seconds < 36.5) || seconds >= 37.65;
	const humanHand = lerpPoint({ x: 69, y: -164 }, reach(385, 1000, 542, 805, 1.1), show);
	const aiHand = lerpPoint({ x: -99, y: -104 }, reach(aiX, 1000, 542, 805, 1.05), repeat);
	return <g>
		<Shield x={922} y={488} scale={0.5}/>
		<g opacity={1 - environment}><CheckCard x={493} y={643} title="KNOWN CHECK" scale={1.45} selected/><AI x={779} y={1008} scale={1.48} mood="focused" gaze={-1} blink={blinkAt(seconds, [28.8, 30.4])}/><Label x={529} y={435} size={37}>SHOW IT. REPEAT IT.</Label></g>
		<g opacity={environment}>
			<Sandbox x={520} y={500} width={380} height={350} resetting={reset}>
				<Cabinet x={57} y={55} scale={0.68} compact neutral={!observed}/>
				<path d="M22 305V266H63" fill="none" stroke={palette.ink} strokeWidth="4"/>
				<g data-testid="hands-on-control"><circle cx="22" cy="305" r="22" fill={show > 0.5 || repeat > 0.5 ? '#F9DC8C' : palette.gold} stroke={palette.ink} strokeWidth="4"/><path d="M16 295L31 305L16 315Z" fill={palette.cream}/></g>
			</Sandbox>
			<Engineer x={385} y={1000} scale={1.1} mood="focused" gaze={1} rightHand={humanHand} headTilt={show * -3} blink={blinkAt(seconds, [33.7, 36.3])}/>
			<AI x={aiX} y={1000} scale={1.05} mood={observed ? 'concerned' : 'focused'} gaze={-1} leftHand={aiHand} rightHand={seconds >= 36.5 && seconds < 36.85 ? reach(aiX, 1000, 710, 838, 1.05) : undefined} blink={blinkAt(seconds, [34.9, 37.8])}/>
			<rect x="348" y="358" width="531" height="108" rx="14" fill={palette.cream} stroke={palette.ink} strokeWidth="4"/>
			<Label x={614} y={399} size={28} color={palette.green}>EXPECTED: SAVED</Label>
			<Label x={614} y={443} size={28} color={observed ? palette.red : palette.muted}>{observed ? 'OBSERVED: DATA LOST' : 'SAME START. SAME CHECK.'}</Label>
			<Label x={648} y={1080} size={25}>{seconds >= 36.85 ? 'AI REPEATS YOUR CHECK' : 'EASY TO SET UP · RESET · REPEAT'}</Label>
		</g>
	</g>;
};

export const Investigate: React.FC<{ seconds: number; scene: FilmScene }> = ({ seconds }) => {
	const pass = travel(seconds, 38.5, 0.45);
	const inspect = travel(seconds, 39.0, 0.35);
	const repair = gesture(seconds, 39.7, 0.75);
	const repaired = seconds >= 40.45;
	const retested = seconds >= 40.95;
	const retestPress = gesture(seconds, 40.65, 0.4);
	const handoff = { x: 550, y: 790 };
	const lift = travel(seconds, 39.55, 0.15) * (1 - travel(seconds, 40.45, 0.2));
	const workingHand = { x: 815 + repair * 4 + retestPress * 7, y: 715 + lift * 48 + repair * 2 };
	const humanLeft = lerpPoint({ x: -74, y: -165 }, reach(650, 1000, handoff.x + 50, handoff.y, 1.2), pass * (1 - inspect));
	return <g>
		<Cabinet x={650} y={485} scale={0.9} fixed={retested}/><Shield x={927} y={742} scale={0.65}/>
		<AI x={437} y={1000} scale={1.08} mood={retested ? 'pleased' : 'concerned'} gaze={1} rightHand={lerpPoint({ x: 96, y: -102 }, reach(437, 1000, handoff.x - 50, handoff.y, 1.08), pass * (1 - inspect))} blink={blinkAt(seconds, [38.8, 41.9])}/>
		<Engineer x={650} y={1000} scale={1.2} mood={retested ? 'pleased' : 'focused'} gaze={1} leftHand={humanLeft} rightHand={lerpPoint({ x: 65, y: -164 }, reach(650, 1000, workingHand.x, workingHand.y, 1.2), inspect)} headTilt={-3 * inspect + (retested ? 4 : 0)} blink={blinkAt(seconds, [39.3, 42.2])}/>
		<g opacity={1 - inspect} data-testid="finding-handoff"><CheckCard x={mix(591, 550, pass)} y={mix(890, 790, pass)} kind="finding" title="FINDING" scale={0.68}/></g>
		<g opacity={inspect}>
			{seconds >= 39.7 && !repaired && <Wrench x={workingHand.x} y={workingHand.y} rotation={repair * 9}/>}
			<circle data-testid="retest-control" cx="815" cy="715" r={27 + gesture(seconds, 39.1, 0.5) * 10 - retestPress * 4} fill="none" stroke={retested ? palette.green : palette.red} strokeWidth="5"/>
		</g>
		<g data-testid="confirmed-repair" data-repaired={repaired} data-retested={retested}>
			<Label x={622} y={427} size={35} color={retested ? palette.green : palette.ink}>{retested ? 'FIXED. CHECKED AGAIN.' : repaired ? 'NOW CHECK AGAIN' : seconds < 39.65 ? 'REPRODUCE + CONFIRM' : 'FIX THE CAUSE'}</Label>
		</g>
		<Label x={602} y={1080} size={27} color={palette.muted}>FINDINGS IN. NO TEST-CODE PILE.</Label>
	</g>;
};
