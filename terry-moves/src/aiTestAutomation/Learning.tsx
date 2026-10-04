import React from 'react';
import { AI, Cabinet, Engineer, Shield } from './actors';
import { Label, palette } from './design';
import { FilmScene } from './film';
import { appear, blinkAt, gesture, mix, reach, travel } from './motion';
import { CheckCard, Magnifier, Sandbox, Ticket, Wrench } from './props';

export const SandboxShot: React.FC<{ seconds: number; scene: FilmScene }> = ({ seconds, scene }) => {
	const reset = travel(seconds, scene.start + 1.7, 0.7);
	const demonstrated = gesture(seconds, 28.35, 1.2);
	const aiChecks = travel(seconds, 30.65, 0.5);
	const checking = gesture(seconds, 30.85, 1.45);
	const observed = appear(seconds, 31.8, 0.5);
	const humanHand = { x: 487 + demonstrated * 10, y: 847 - demonstrated * 10 };
	return <g>
		<Cabinet x={105} y={491} scale={0.46}/><Shield x={115} y={665} scale={0.47}/>
		<Label x={177} y={459} size={19}>PRODUCT</Label>
		<path d="M306 419L444 419" fill="none" stroke="#8BAAA8" strokeWidth="5" strokeDasharray="8 12"/><path d="M434 411L446 419L434 427" fill="none" stroke="#8BAAA8" strokeWidth="4"/>
		<Sandbox x={479} y={457} width={462} height={460} resetting={reset}>
			<Cabinet x={46} y={105} scale={0.65} neutral={observed < 0.5}/>
			<path d="M22 378V333Q22 310 47 310H153V208" stroke={palette.ink} strokeWidth="4" fill="none"/>
			<circle cx="22" cy="378" r="21" fill={demonstrated > 0.3 ? palette.green : palette.gold} stroke={palette.ink} strokeWidth="4"/>
			<path d="M16 370L30 378L16 386Z" fill={palette.cream}/>
			{demonstrated > 0 && <circle cx={mix(22, 153, demonstrated)} cy={mix(342, 208, demonstrated)} r="8" fill={palette.green}/>} 
			<AI x={341} y={392} scale={0.84} mood={observed > 0.5 ? 'concerned' : 'focused'} gaze={-1} blink={blinkAt(seconds, [27.8, 30.05])} leftHand={{ x: mix(-98, -149, aiChecks), y: mix(-104, -147, aiChecks) }}/>
			<g opacity={aiChecks}><path d="M213 271L224 277L213 283Z" fill={palette.green}/><circle cx="218" cy="277" r={16 + checking * 6} fill="none" stroke={palette.green} strokeWidth="3" opacity={0.7}/></g>
			<g opacity={reset}><rect x="23" y="50" width="394" height="46" rx="10" fill={palette.cream} stroke={palette.ink} strokeWidth="3"/><Label x={220} y={80} size={22} color={observed > 0.5 ? palette.red : palette.green}>{observed > 0.5 ? 'EXPECTED ✓ · OBSERVED !' : 'EXPECTED: ✓'}</Label></g>
		</Sandbox>
		<Engineer x={320} y={1000} scale={1.05} mood="focused" pose="work" gaze={1} rightHand={reach(320, 1000, humanHand.x, humanHand.y, 1.05)} headTilt={-3 * demonstrated} blink={blinkAt(seconds, [26.8, 29.7])}/>
		<CheckCard x={399} y={512} title="KNOWN CHECK" scale={0.8} selected/>
		<g opacity={appear(seconds, 26.3, 0.35)}><Label x={712} y={1014} size={23}>{observed > 0.5 ? 'OBSERVE THE RESULT' : 'CONTROLLED START · REPEATABLE CHECK'}</Label></g>
	</g>;
};

export const Investigate: React.FC<{ seconds: number; scene: FilmScene }> = ({ seconds, scene }) => {
	const finding = appear(seconds, scene.start + 0.2833333333, 0.42);
	const inspect = travel(seconds, 33.4, 0.72);
	const repair = travel(seconds, 35.02, 0.56);
	const repairing = gesture(seconds, 35.1, 0.85);
	const fixed = repair > 0.7;
	const handX = mix(756, 844, inspect) + repairing * 8;
	const handY = mix(815, 812, inspect) + repair * 25;
	return <g>
		<Sandbox x={106} y={478} width={323} height={396}>
			<Cabinet x={29} y={118} scale={0.52}/>
			<AI x={258} y={321} scale={0.62} mood="concerned" pose="point" gaze={-1} blink={blinkAt(seconds, [34.25, 36.3])}/>
		</Sandbox>
		<g opacity={finding} transform={`translate(${(1 - finding) * -55} ${(1 - finding) * 15})`}><CheckCard x={468} y={592} kind="finding" title="FINDING" scale={0.9}/></g>
		<path d="M432 671Q502 709 552 711" fill="none" stroke={palette.muted} strokeWidth="4" strokeDasharray="8 11"/>
		<Cabinet x={710} y={577} scale={0.81} fixed={fixed}/><Shield x={924} y={800} scale={0.7}/>
		<Engineer x={611} y={1007} scale={1.04} mood={fixed ? 'pleased' : 'focused'} pose="work" gaze={1} lean={2 * repairing} rightHand={reach(611, 1007, handX, handY, 1.04)} headTilt={-3 * inspect + repair * 4} blink={blinkAt(seconds, [33.05, 36.9])}/>
		{repair < 0.08 ? <Magnifier x={handX} y={handY - 35} scale={1.04}/> : <Wrench x={handX} y={handY - 28} rotation={mix(-10, 24, repair) + repairing * 10}/>}
		<g opacity={appear(seconds, 34.48, 0.3)}><Label x={788} y={921} size={21} color={fixed ? palette.green : palette.ink}>{fixed ? 'CONFIRMED → FIXED' : 'REPRODUCE + CONFIRM'}</Label></g>
		<Label x={267} y={984} size={20}>OBSERVE</Label><Label x={788} y={989} size={20}>INVESTIGATE + FIX</Label>
	</g>;
};

export const Selective: React.FC<{ seconds: number; scene: FilmScene }> = ({ seconds, scene }) => {
	const selected = travel(seconds, 40.8, 0.9);
	const cardX = mix(430, 621, selected);
	const cardY = 807 - Math.sin(Math.PI * selected) * 43;
	const settling = gesture(seconds, 41.55, 0.65);
	return <g>
		<Cabinet x={421} y={466} scale={0.83} fixed/><Shield x={650} y={687} scale={0.75}/>
		<Engineer x={261} y={999} scale={1.05} mood="pleased" pose="point" gaze={1} rightHand={{ x: mix(158, 140, selected), y: mix(-182, -231, selected) }} headTilt={gesture(seconds, scene.start + 0.2, 1) * 3} blink={blinkAt(seconds, [39.8, 42.05])}/>
		<AI x={797} y={997} scale={0.94} mood="pleased" gaze={-1} leftHand={{ x: mix(-99, -124, selected), y: mix(-104, -183, selected) }} tilt={settling * -2} blink={blinkAt(seconds, [39.6, 42.3])}/>
		{[0, 1, 2].map((i) => <g key={i} opacity={appear(seconds, scene.start + 0.25 + i * 0.55, 0.25) * (1 - selected)}><circle cx={390 + i * 37} cy="713" r="13" fill={palette.green}/><path d={`M${383 + i * 37} 713L${389 + i * 37} 719L${398 + i * 37} 707`} stroke={palette.cream} fill="none" strokeWidth="4"/></g>)}
		<g opacity={1 - selected}><CheckCard x={cardX} y={cardY} kind="workflow" title="USEFUL" scale={0.82} selected/></g>
		<g opacity={selected}><CheckCard x={cardX} y={cardY} kind="test" title="MAINTAIN" scale={0.82}/></g>
		<path d="M505 827H548" fill="none" stroke={palette.ink} strokeWidth="5" opacity={1 - selected}/><path d="M536 817L548 827L536 837" fill="none" stroke={palette.ink} strokeWidth="5" opacity={1 - selected}/>
		<CheckCard x={420} y={973} kind="workflow" title="OBSERVATION" scale={0.64}/>
		<Label x={595} y={1055} size={19} color={palette.green}>SELECTED, UNDERSTOOD, USEFUL</Label>
		<Ticket x={753} y={397} rotation={12} scale={0.8}/>
	</g>;
};
