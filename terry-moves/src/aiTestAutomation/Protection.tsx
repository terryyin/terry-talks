import React from 'react';
import { AI, Cabinet, Engineer, Shield } from './actors';
import { Label, palette } from './design';
import { FilmScene } from './film';
import { appear, blinkAt, gesture, mix, reach, travel } from './motion';
import { CheckCard, Ticket, UnitCheck } from './props';

/** A wide route takes time; a focused local check returns without taking that trip. */
const RouteSignal: React.FC<{ progress: number; color: string }> = ({ progress, color }) => {
	const t = progress;
	const x = (1 - t) ** 3 * 267 + 3 * (1 - t) ** 2 * t * 267 + 3 * (1 - t) * t ** 2 * 814 + t ** 3 * 814;
	const y = (1 - t) ** 3 * 607 + 3 * (1 - t) ** 2 * t * 392 + 3 * (1 - t) * t ** 2 * 382 + t ** 3 * 607;
	return <g><circle cx={x} cy={y} r="15" fill={palette.cream} stroke={palette.ink} strokeWidth="3"/><circle cx={x} cy={y} r="7" fill={color}/></g>;
};

export const Optimize: React.FC<{ seconds: number; scene: FilmScene }> = ({ seconds, scene }) => {
	const t = seconds - scene.start;
	const deleted = travel(seconds, 46.7, 0.65);
	const transfer = travel(seconds, 49.2, 1.65);
	const unit = appear(seconds, 50.25, 0.65);
	const focus = appear(seconds, 51.8, 0.8);
	const handX = mix(283, 278, deleted);
	const handY = 870 + deleted * 54;
	return <g>
		<g data-testid="retained-wider-protection"><path d="M267 607C267 392 814 382 814 607" fill="none" stroke={palette.gold} strokeWidth="16"/><path d="M267 607C267 392 814 382 814 607" fill="none" stroke={palette.ink} strokeWidth="3"/><Label x={549} y={410} size={24}>KEEP WIDER PROTECTION</Label><RouteSignal progress={(t / 4.3) % 1} color={palette.gold}/></g>
		{[267, 540, 814].map((x, i) => <g key={x}><Cabinet x={x - 72} y={557} scale={0.5} compact fixed/><Label x={x} y={764} size={18}>{['SCREEN', 'SERVICE', 'DATA'][i]}</Label></g>)}
		<Shield x={888} y={683} scale={0.57 + gesture(seconds, 53.05, 0.9) * 0.06}/>
		<path d="M412 638H466M686 638H741" fill="none" stroke={palette.ink} strokeWidth="4"/>
		<g data-testid="deleted-duplicate" opacity={1 - deleted}>
			<path d="M272 557C319 451 761 451 817 557" fill="none" stroke={palette.muted} strokeWidth="5" strokeDasharray="9 13"/>
			<path d="M305 790V716L267 671" fill="none" stroke={palette.muted} strokeWidth="4" strokeDasharray="8 10"/>
			<g transform={`translate(${-Math.sin(deleted * Math.PI) * 20} ${deleted * 130}) rotate(${-deleted * 12} 307 842)`}><CheckCard x={307} y={842} kind="test" title="REDUNDANT" scale={0.65}/><path d="M285 824L327 863M327 824L285 863" stroke={palette.coral} strokeWidth="7" strokeLinecap="round" opacity={appear(seconds, 46.45, 0.2)}/></g>
		</g>
		<g opacity={deleted}><path d="M268 966L280 1018H338L351 966Z" fill="#DBD8D1" stroke={palette.ink} strokeWidth="4"/><path d="M288 976V1005M309 976V1005M330 976V1005" stroke={palette.muted} strokeWidth="3"/></g>
		<g opacity={1 - transfer}><path d="M284 628C320 479 760 479 813 628" fill="none" stroke={palette.lavender} strokeWidth="7"/><Label x={544} y={546} size={16} color={palette.muted}>LOCAL CHECKS TAKING THE WHOLE ROUTE</Label></g>
		{[0, 1].map((i) => { const p = travel(seconds, 49.2 + i * 0.2, 1.35); const fast = unit * gesture(seconds, 50.65 + i * 0.2, 0.45); return <g key={i}>
			<g opacity={transfer}><path d={`M${385 + i * 262} 550Q${355 + i * 270} 702 ${300 + i * 273} 808`} stroke={palette.green} strokeWidth="3" fill="none" strokeDasharray="6 11" opacity={1 - unit}/></g>
			<g transform={`translate(${mix(385 + i * 262, 300 + i * 273, p)} ${mix(569, 848, p) - Math.sin(Math.PI * p) * 18})`} opacity={1 - unit}><rect x="-19" y="-19" width="38" height="38" rx="7" fill={palette.green} stroke={palette.ink} strokeWidth="3"/><path d="M-10-1L-2 7L11-8" stroke={palette.cream} strokeWidth="4" fill="none"/></g>
			<g opacity={unit}><UnitCheck x={300 + i * 273} y={848} label="UNIT"/><circle cx={238 + i * 273} cy="848" r="12" fill={palette.green} opacity={fast}/><path d={`M${250 + i * 273} 879h${fast * 100}`} stroke={palette.green} strokeWidth="5" strokeLinecap="round"/></g>
		</g>; })}
		<g opacity={unit}><Label x={505} y={934} size={22}>LOCAL CHECKS · FAST FEEDBACK</Label></g>
		<g opacity={focus}><Label x={555} y={1001} size={20} color={palette.green}>DISTINCT PROTECTION STAYS</Label></g>
		<Engineer x={155} y={1038} scale={0.72} mood="focused" pose="work" gaze={1} rightHand={reach(155, 1038, handX, handY, 0.72)} blink={blinkAt(seconds, [44.5, 48, 52.9])}/>
		<AI x={906} y={1054} scale={0.78} mood="pleased" gaze={-1} leftHand={{ x: -98 - transfer * 35, y: -104 - transfer * 25 }} blink={blinkAt(seconds, [45.6, 50.1, 53.4])}/>
	</g>;
};

export const Ending: React.FC<{ seconds: number; scene: FilmScene }> = ({ seconds, scene }) => {
	const calm = travel(seconds, 55.4, 1.1);
	const improve = gesture(seconds, 56.35, 1.3);
	const arriving = travel(seconds, scene.start + 0.45, 1.6);
	return <g>
		<Cabinet x={424} y={521} scale={0.83} fixed/><Shield x={653} y={738} scale={0.77}/>
		<Engineer x={291} y={1009} scale={1.08} mood="pleased" gaze={1} headTilt={3 * calm} lean={-calm} blink={blinkAt(seconds, [55.3, 59.35])}/>
		<AI x={801} y={1007} scale={1.12} mood="pleased" gaze={-1} leftHand={{ x: -121, y: -139 - improve * 8 }} tilt={-improve * 2} blink={blinkAt(seconds, [56.1, 59.9])}/>
		<CheckCard x={504} y={928} kind="test" title="USEFUL" scale={0.62}/>
		<UnitCheck x={656} y={854} label="FAST"/>
		<g opacity={improve}><path d="M635 794L642 784M656 790V776M677 794L685 783" stroke={palette.green} strokeWidth="4" strokeLinecap="round"/></g>
		<Ticket x={mix(990, 731, arriving)} y={mix(371, 411, arriving)} rotation={mix(-8, 12, arriving)} scale={0.72}/><Ticket x={824} y={466} rotation={-4} scale={0.66}/>
		<Label x={543} y={1080} size={20} color={palette.muted}>STILL WORK TO DO. MORE ROOM TO DO IT.</Label>
	</g>;
};
