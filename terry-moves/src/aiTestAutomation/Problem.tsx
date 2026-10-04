import React from 'react';
import { AI, Cabinet, Engineer, Shield } from './actors';
import { Label, palette } from './design';
import { FilmScene } from './film';
import { appear, blinkAt, gesture, lerpPoint, mix, reach, travel } from './motion';
import { CheckCard, CodeSpool, Ticket } from './props';

export const Hook: React.FC<{ seconds: number }> = ({ seconds }) => {
	const offer = travel(seconds, 0, 0.9);
	const stop = travel(seconds, 2.15, 0.7);
	const spoolX = mix(677, 645, offer);
	return <g>
		<Shield x={915} y={490} scale={0.48}/>
		<Engineer x={300} y={1045} scale={1.35} mood={stop > 0.5 ? 'focused' : 'pleased'} pose={stop > 0 ? 'stop' : 'rest'} gaze={1} headTilt={-3 * stop} blink={blinkAt(seconds, [1.85, 3.65])} rightHand={lerpPoint({ x: 68, y: -166 }, { x: 105, y: -278 }, stop)}/>
		<AI x={810} y={1040} scale={1.45} mood={stop > 0.65 ? 'surprised' : 'pleased'} gaze={-1} leftHand={reach(810, 1040, spoolX + 69, 804, 1.45)} blink={blinkAt(seconds, [1.3, 3.8])}/>
		<CodeSpool x={spoolX} y={830} scale={0.95} extent={0.12}/>
		<g opacity={stop}><path d="M515 715L530 697M533 729L554 723" stroke={palette.coral} strokeWidth="6" strokeLinecap="round"/></g>
	</g>;
};

export const Overload: React.FC<{ seconds: number; scene: FilmScene }> = ({ seconds, scene }) => {
	const closed = travel(seconds, 7.4, 0.65);
	const blame = appear(seconds, scene.captionRanges[1].start, 0.25);
	const nod = gesture(seconds, scene.captionRanges[2].start + 0.15, 0.6);
	return <g>
		<Cabinet x={565} y={540} scale={0.93}/><Shield x={864} y={760} scale={0.68}/>
		{[0, 1, 2].map((i) => {
			const arrived = travel(seconds, scene.start + 0.2 + i * 1.0, 1.2);
			return <Ticket key={i} x={mix(850 - i * 65, 492 + i * 85, arrived)} y={mix(370, 882 - i * 15, arrived)} rotation={mix(-15, i * 8 - 8, arrived)} scale={1.05}/>;
		})}
		<Engineer x={285} y={1020} scale={1.13} mood={blame > 0.5 ? 'focused' : 'concerned'} gaze={1} headTilt={4 * nod} rightHand={reach(285, 1020, 408, 816, 1.13)} blink={blinkAt(seconds, [6.2, 9.8])}/>
		<AI x={907} y={1020} scale={0.95} mood={blame > 0.5 ? 'focused' : 'concerned'} gaze={-1} tilt={-4 * nod} blink={blinkAt(seconds, [6.9, 11.6])}/>
		<Ticket x={mix(408, 342, closed)} y={mix(816, 877, closed)} rotation={-8 * closed} scale={0.85} resolved={closed > 0.6}/>
		<g opacity={1 - blame}><Label x={593} y={431} size={31} color={palette.red}>3 INCOMING</Label><Label x={230} y={431} size={25} color={palette.green}>1 CLOSED</Label></g>
		<g opacity={blame} data-testid="missing-tests-concession"><path d="M310 364H861Q893 364 893 399V509Q893 540 862 540H479L434 580L438 540H310Q278 540 278 509V399Q278 364 310 364Z" fill={palette.cream} stroke={palette.ink} strokeWidth="5"/><Label x={585} y={430} size={38}>NOT ENOUGH</Label><Label x={585} y={482} size={38}>AUTOMATED TESTS!</Label></g>
	</g>;
};

export const Upkeep: React.FC<{ seconds: number; scene: FilmScene }> = ({ seconds, scene }) => {
	const pile = travel(seconds, scene.start + 0.3, 3.0);
	const intent = appear(seconds, scene.captionRanges[2].start, 0.35);
	const targeted = appear(seconds, scene.captionRanges[3].start, 0.35);
	const weight = gesture(seconds, 16.2, 1.0);
	return <g>
		<Shield x={911} y={488} scale={0.5}/>
		<Engineer x={265} y={1030} scale={1.24} mood={intent > 0.5 ? 'focused' : 'concerned'} gaze={1} headTilt={-5 * weight} blink={blinkAt(seconds, [14.9, 20.8, 26.6])}/>
		<AI x={870} y={1030} scale={1.1} mood={pile > 0.55 ? 'concerned' : 'pleased'} gaze={-1} blink={blinkAt(seconds, [15.8, 23.6])}/>
		<g opacity={1 - intent * 0.75}>
			<CodeSpool x={528} y={805} scale={0.96} extent={0.15 + pile * 0.3}/>
			<path d={`M565 883H${mix(596, 798, pile)}V914H550`} fill={palette.gold} stroke={palette.ink} strokeWidth="4"/>
			<Ticket x={mix(627, 787, pile)} y={902} rotation={mix(-4, 14, pile)} scale={0.95}/><Ticket x={mix(698, 858, pile)} y={918} rotation={-6} scale={0.83}/>
			<g opacity={appear(seconds, 16.2, 0.4)}><Label x={528} y={570} size={42} color={palette.red}>+ COMPLEXITY</Label><Label x={528} y={626} size={42} color={palette.red}>+ UPKEEP</Label></g>
		</g>
		<g opacity={intent} transform={`translate(0 ${(1 - intent) * 25})`} data-testid="original-intent">
			<rect x="359" y="468" width="402" height="177" rx="18" fill={palette.cream} stroke={palette.ink} strokeWidth="5"/>
			<Label x={560} y={514} size={26} color={palette.muted}>ORIGINAL INTENT</Label><Label x={560} y={579} size={37}>SAVE KEEPS DATA</Label>
			<g opacity={targeted}><CheckCard x={560} y={745} kind="test" title="TARGETED" scale={0.8}/><path d="M560 645V680" stroke={palette.green} strokeWidth="6"/><Shield x={667} y={742} scale={0.55}/></g>
		</g>
	</g>;
};
