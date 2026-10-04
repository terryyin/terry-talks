import React from 'react';
import { AI, Cabinet, Engineer, Shield } from './actors';
import { Label, palette } from './design';
import { FilmScene } from './film';
import { appear, blinkAt, gesture, lerpPoint, mix, reach, travel } from './motion';
import { CheckCard, CodeSpool, Ticket, Wrench } from './props';

export const Hook: React.FC<{ seconds: number }> = ({ seconds }) => {
	const stop = travel(seconds, 0.12, 0.68);
	const offer = gesture(seconds, 2.25, 1.7);
	const spoolX = 602 - 17 * stop - 12 * offer;
	const spoolY = 837 - 8 * offer;
	return <g>
		<Cabinet x={425} y={423} scale={0.82}/><Shield x={648} y={677} scale={0.75}/>
		<Ticket x={630} y={368} rotation={15}/><Ticket x={785} y={425} rotation={-7}/>
		<Engineer x={280} y={1006} scale={1.38} mood={stop > 0.4 ? 'focused' : 'concerned'} pose="stop" gaze={mix(1, 0, travel(seconds, 0.7, 0.5))} headTilt={-3 * stop} blink={blinkAt(seconds, [1.93, 3.7])} rightHand={lerpPoint({ x: 110, y: -154 }, { x: 160, y: -155 }, stop)} lean={-2 * stop}/>
		<AI x={818} y={978} scale={1.45} mood={seconds < 0.95 ? 'pleased' : 'focused'} pose="work" gaze={-1} blink={blinkAt(seconds, [1.2, 3.6])} leftHand={reach(818, 978, spoolX + 69, spoolY - 28, 1.45)} rightHand={{ x: 81, y: -117 }}/>
		<CodeSpool x={spoolX} y={spoolY} scale={1.15} extent={0.3 + stop * 0.13 + offer * 0.55}/>
		<g opacity={gesture(seconds, 0.7, 0.62)} stroke={palette.coral} strokeWidth="5" strokeLinecap="round"><path d="M485 749L478 732M506 746L511 727"/></g>
		<Label x={590} y={1032} size={23} color={palette.muted}>MORE CODE. ANOTHER RESPONSIBILITY.</Label>
	</g>;
};

export const Overload: React.FC<{ seconds: number; scene: FilmScene }> = ({ seconds, scene }) => {
	const t = seconds - scene.start;
	const code = travel(seconds, scene.captionRanges[2].start + 0.32, 0.8);
	const completed = travel(seconds, 8.4, 0.7);
	const work = gesture(seconds, 7.7, 1.5) + gesture(seconds, 11.4, 1.4);
	return <g>
		<path d="M306 445L898 490" stroke={palette.ink} strokeWidth="21" strokeLinecap="round"/><path d="M308 440L896 485" stroke="#C8CFD0" strokeWidth="10"/>
		{[0, 1, 2, 3, 4].map((i) => { const p = ((t * 0.18 + i * 0.22) % 1); return <Ticket key={i} x={mix(897, 315, p)} y={mix(443, 398, p)} rotation={-4 + i * 3} scale={0.8}/>; })}
		<Label x={570} y={367} size={25} color={palette.red}>PROBLEMS ARRIVING</Label>
		<Cabinet x={594} y={595} scale={1.03}/><Shield x={857} y={863} scale={0.8}/>
		{[0, 1, 2, 3, 4, 5].map((i) => { const arrived = appear(seconds, 5.8 + i * 0.46, 0.45); return <g key={i} opacity={arrived}><Ticket x={610 + (i % 3) * 86} y={mix(449, 988 - Math.floor(i / 3) * 53, arrived)} rotation={(i % 3 - 1) * 9}/></g>; })}
		<Engineer x={290} y={1000} scale={1.21} mood="concerned" pose="work" gaze={1} lean={3 + work * 2} headTilt={-work * 2} blink={blinkAt(seconds, [5.9, 9.6, 12.9])} rightHand={{ x: 126 + work * 6, y: -166 - work * 16 }}/>
		<AI x={483} y={1000} scale={0.8} mood="concerned" gaze={-1} blink={blinkAt(seconds, [7.1, 11.6])}/>
		<Ticket x={mix(450, 222, completed)} y={mix(814, 906, completed) - Math.sin(completed * Math.PI) * 75} rotation={mix(4, -9, completed)} resolved={completed > 0.7}/>
		<g opacity={appear(seconds, 8.95, 0.4)}><Label x={240} y={957} size={18} color={palette.green}>ONE FIX</Label></g>
		<g opacity={code} transform={`translate(${(1 - code) * 150} 0)`}><CodeSpool x={467} y={582} scale={0.85} extent={1.5}/><Label x={454} y={789} size={21}>+ UPKEEP</Label></g>
	</g>;
};

export const Upkeep: React.FC<{ seconds: number; scene: FilmScene }> = ({ seconds, scene }) => {
	const t = seconds - scene.start;
	const repair = travel(seconds, 15.4, 0.85);
	const safe = appear(seconds, 16.25, 0.45);
	const pile = appear(seconds, scene.captionRanges[1].start + 0.2, 0.65);
	const care = travel(seconds, scene.captionRanges[2].start + 0.15, 0.7);
	const handX = mix(399, 467, repair);
	const handY = 794 - Math.sin(repair * Math.PI) * 16;
	return <g>
		<Cabinet x={494} y={508} scale={1.13} fixed={repair > 0.7}/>
		<g transform={`translate(805 774) scale(${1.05 + gesture(seconds, 16.1, 0.9) * 0.1})`}><Shield x={0} y={0}/></g>
		<g opacity={safe}><path d="M845 767L854 775L874 749" stroke={palette.green} strokeWidth="7" fill="none" strokeLinecap="round"/></g>
		<Engineer x={283} y={1000} scale={1.14} mood={care > 0.5 ? 'focused' : 'pleased'} pose="work" gaze={1} headTilt={-2 * gesture(t, 1.2, 1.4)} rightHand={reach(283, 1000, handX, handY, 1.14)} blink={blinkAt(seconds, [17.2, 22.5])}/>
		<Wrench x={handX} y={handY - 24} rotation={mix(-13, 28, repair)}/>
		<AI x={912} y={993} scale={0.93} mood={pile > 0.5 ? 'focused' : 'pleased'} gaze={-1} blink={blinkAt(seconds, [18.1, 23.1])}/>
		<CheckCard x={779} y={439} kind="test" title="USEFUL TEST" scale={0.82}/><path d="M775 493V580" stroke={palette.green} strokeWidth="7" strokeDasharray="9 9"/>
		<g opacity={pile}><CodeSpool x={405} y={966} scale={0.65} extent={1.3}/><CodeSpool x={477} y={1018} scale={0.42}/></g>
		{['DATA', 'ENVIRONMENT', 'DIAGNOSIS'].map((title, i) => { const p = appear(seconds, 21.4 + i * 0.34, 0.45); return <g key={title} opacity={p} transform={`translate(0 ${(1 - p) * 32})`}><CheckCard x={616 + i * 109} y={953} title={title} scale={0.63}/></g>; })}
		<Ticket x={473} y={385} scale={0.8} rotation={-5}/>
	</g>;
};
