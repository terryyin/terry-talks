import React from 'react';
import { AI, Cabinet, Engineer, Shield } from './actors';
import { Label, palette } from './design';
import { cue, FilmScene } from './film';
import { appear, blinkAt, gesture, lerpPoint, mix, reach, travel } from './motion';
import { CodeSpool, Ticket, Wrench } from './props';

export const Hook: React.FC<{ seconds: number; scene: FilmScene }> = ({ seconds, scene }) => {
	const offer = travel(seconds, scene.start, 0.9);
	const stop = travel(seconds, scene.captionRanges[1].start, 0.6);
	const spoolX = mix(677, 645, offer);
	return <g>
		<Shield x={915} y={490} scale={0.48}/>
		<Engineer x={300} y={1045} scale={1.35} mood={stop > 0.5 ? 'determined' : 'pleased'} pose={stop > 0 ? 'stop' : 'rest'} gaze={1} headTilt={-3 * stop} blink={blinkAt(seconds, [scene.start + 1.8, scene.end - 0.4])} rightHand={lerpPoint({ x: 68, y: -166 }, { x: 105, y: -278 }, stop)}/>
		<AI x={810} y={1040} scale={1.45} mood={stop > 0.65 ? 'surprised' : 'pleased'} gaze={-1} leftHand={reach(810, 1040, spoolX + 69, 804, 1.45)} blink={blinkAt(seconds, [scene.start + 1.3, scene.end - 0.2])}/>
		<CodeSpool x={spoolX} y={830} scale={0.95} extent={0.12}/>
		<g opacity={stop}><path d="M515 715L530 697M533 729L554 723" stroke={palette.coral} strokeWidth="6" strokeLinecap="round"/></g>
	</g>;
};

export const Overload: React.FC<{ seconds: number; scene: FilmScene }> = ({ seconds, scene }) => {
	const closed = travel(seconds, cue(scene, 0, 'close'), 0.55);
	const blame = appear(seconds, scene.captionRanges[1].start, 0.25);
	const nod = gesture(seconds, cue(scene, 2, 'right') - 0.15, 0.6);
	return <g>
		<Cabinet x={565} y={540} scale={0.93}/><Shield x={864} y={760} scale={0.68}/>
		{[0, 1, 2].map((i) => {
			const arrived = travel(seconds, cue(scene, 0, 'tickets') - 0.7 + i * 0.65, 0.95);
			return <Ticket key={i} x={mix(850 - i * 65, 492 + i * 85, arrived)} y={mix(370, 882 - i * 15, arrived)} rotation={mix(-15, i * 8 - 8, arrived)} scale={1.05}/>;
		})}
		<Engineer x={285} y={1020} scale={1.13} mood={blame > 0.5 ? 'focused' : 'panicked'} gaze={1} headTilt={4 * nod} rightHand={reach(285, 1020, 408, 816, 1.13)} blink={blinkAt(seconds, [cue(scene, 0, 'tickets'), cue(scene, 1, 'tests')])}/>
		<AI x={907} y={1020} scale={0.95} mood={blame > 0.5 ? 'focused' : 'concerned'} gaze={-1} tilt={-4 * nod} blink={blinkAt(seconds, [cue(scene, 0, 'faster'), scene.end - 0.4])}/>
		<Ticket x={mix(408, 342, closed)} y={mix(816, 877, closed)} rotation={-8 * closed} scale={0.85} resolved={closed > 0.6}/>
		<g opacity={1 - blame}><Label x={593} y={431} size={31} color={palette.red}>3 INCOMING</Label><Label x={230} y={431} size={25} color={palette.green}>1 CLOSED</Label></g>
		<g opacity={blame} data-testid="missing-tests-concession"><path d="M310 364H861Q893 364 893 399V509Q893 540 862 540H479L434 580L438 540H310Q278 540 278 509V399Q278 364 310 364Z" fill={palette.cream} stroke={palette.ink} strokeWidth="5"/><Label x={585} y={430} size={38}>NOT ENOUGH</Label><Label x={585} y={482} size={38}>AUTOMATED TESTS!</Label></g>
	</g>;
};

export const PurposeAndProof: React.FC<{ seconds: number; scene: FilmScene }> = ({ seconds, scene }) => {
	const proof = seconds >= scene.captionRanges[1].start;
	const press = gesture(seconds, cue(scene, 1, 'show') - 0.2, 0.8);
	const checked = seconds >= cue(scene, 1, 'does');
	return <g data-testid="purpose-and-proof" data-check-run={checked}>
		<rect x="300" y="364" width="545" height="189" rx="18" fill={palette.cream} stroke={palette.ink} strokeWidth="5"/>
		<Label x={573} y={425} size={52} color={proof ? palette.green : palette.ink}>{proof ? 'PROOF' : 'PURPOSE'}</Label>
		<Label x={573} y={492} size={38}>{proof ? checked ? '✓ DATA KEPT' : 'CHECK THE BEHAVIOR' : 'SAVE KEEPS DATA'}</Label>
		<Cabinet x={550} y={590} scale={0.8} fixed={checked} neutral={!checked}/>
		<path d="M440 805H504V722H550" fill="none" stroke={palette.ink} strokeWidth="4"/>
		<g data-testid="purpose-check-control"><circle cx="440" cy="805" r="25" fill={press > 0.5 ? '#FFE5A9' : palette.gold} stroke={palette.ink} strokeWidth="4"/><Label x={439} y={857} size={20}>SAVE</Label></g>
		<Engineer x={300} y={1040} scale={1.15} mood={checked ? 'pleased' : 'focused'} gaze={1} headTilt={checked ? 3 : 0} rightHand={lerpPoint({ x: 65, y: -164 }, reach(300, 1040, 440, 805, 1.15), press)} blink={blinkAt(seconds, [scene.start + 0.7])}/>
		<AI x={900} y={1040} scale={0.98} mood={checked ? 'pleased' : 'focused'} gaze={-1}/>
		{checked && <Shield x={897} y={504} scale={0.65}/>}
		<Label x={573} y={1080} size={27} color={palette.muted}>{checked ? 'EXPECTED = OBSERVED' : 'THE INTENT COMES FIRST'}</Label>
	</g>;
};

export const Upkeep: React.FC<{ seconds: number; scene: FilmScene }> = ({ seconds, scene }) => {
	const code = travel(seconds, cue(scene, 0, 'but'), 0.8);
	const engineering = seconds >= scene.captionRanges[1].start && seconds < scene.captionRanges[2].start;
	const pile = travel(seconds, cue(scene, 2, 'pile'), 1.25);
	const weight = gesture(seconds, cue(scene, 2, 'complexity') - 0.2, 1.1);
	return <g data-testid="maintenance-burden" data-code-first={code > 0.5} data-overloaded={pile > 0.5}>
		<g opacity={1 - code} transform={`translate(0 ${code * 120})`}><rect x="342" y="629" width="414" height="137" rx="16" fill={palette.cream} stroke={palette.ink} strokeWidth="5"/><Label x={549} y={713} size={36}>SAVE KEEPS DATA</Label></g>
		<g opacity={code}>
			<Engineer x={300} y={1045} scale={1.2} mood={pile > 0.5 ? 'panicked' : engineering ? 'focused' : 'concerned'} gaze={1} headTilt={-6 * weight} rightHand={reach(300, 1045, 480, 850 + weight * 5, 1.2)} blink={blinkAt(seconds, [scene.start + 1.1, cue(scene, 1, 'intent')])}/>
			<AI x={780} y={1045} scale={1.2} mood={pile > 0.55 ? 'concerned' : 'pleased'} gaze={-1} leftHand={reach(780, 1045, 639, 827, 1.2)} blink={blinkAt(seconds, [scene.start + 1.9, cue(scene, 2, 'providing')])}/>
			<CodeSpool x={560} y={850 + weight * 5} scale={1.15} extent={0.3 + pile * 1.0}/>
			<Ticket x={mix(700, 746, pile)} y={923} rotation={mix(-4, 14, pile)} scale={0.95}/>
			<g opacity={pile}><Label x={569} y={575} size={44} color={palette.red}>+ COMPLEXITY</Label><Label x={569} y={633} size={44} color={palette.red}>+ UPKEEP</Label></g>
		</g>
		{engineering && <g data-testid="original-intent"><rect x="359" y="425" width="402" height="177" rx="18" fill={palette.cream} stroke={palette.ink} strokeWidth="5"/><Label x={560} y={471} size={26} color={palette.muted}>ORIGINAL INTENT</Label><Label x={560} y={537} size={37}>SAVE KEEPS DATA</Label></g>}
	</g>;
};

export const StopAndFix: React.FC<{ seconds: number; scene: FilmScene }> = ({ seconds, scene }) => {
	const halt = travel(seconds, scene.start, cue(scene, 0, 'stop') - scene.start);
	const withdraw = travel(seconds, cue(scene, 2, 'adding'), 0.8);
	const repairWork = travel(seconds, scene.captionRanges[3].start, 0.55);
	const engineerX = mix(430, 525, repairWork);
	const aiX = mix(850, 900, withdraw);
	const spoolX = mix(700, 750, withdraw);
	const spoolY = mix(832, 882, withdraw);
	const hand = lerpPoint({ x: 65, y: -164 }, reach(engineerX, 1065, 622, 805, 1.1), halt * (1 - repairWork));
	const fixHand = lerpPoint(hand, reach(engineerX, 1065, 679, 892, 1.1), repairWork);
	return <g data-testid="stop-and-fix" data-code-arrivals-halted={halt >= 1} data-code-withdrawn={withdraw >= 1} data-current-work={repairWork > 0.5 ? 'repair' : 'contain'}>
		<rect x="0" y="310" width="1080" height="815" fill={palette.coral}/>
		<path d="M65 1090H1015" stroke={palette.ink} strokeWidth="5"/>
		<Label x={540} y={460} size={152}>STOP</Label>
		<g opacity={appear(seconds, scene.captionRanges[1].start, 0.13)}><Label x={540} y={590} size={111}>AND FIX</Label></g>
		<g opacity={repairWork}><Cabinet x={550} y={670} scale={0.7}/></g>
		<AI x={aiX} y={1065} scale={1.2} mood={repairWork > 0.5 ? 'focused' : 'surprised'} gaze={-1} leftHand={reach(aiX, 1065, spoolX + 65.55, spoolY - 24.7, 1.2)}/>
		<CodeSpool x={spoolX} y={spoolY} scale={0.95} extent={0.12}/>
		<Engineer x={engineerX} y={1065} scale={1.1} mood="determined" pose={repairWork < 0.5 ? 'stop' : 'rest'} gaze={1} rightHand={fixHand} headTilt={-2 + repairWork * 3}/>
		{repairWork > 0.8 && <Wrench x={679} y={892} rotation={-5}/>}
	</g>;
};
