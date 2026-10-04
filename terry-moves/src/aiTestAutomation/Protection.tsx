import React from 'react';
import { AI, Cabinet, Engineer, Shield } from './actors';
import { Label, palette } from './design';
import { FilmScene } from './film';
import { appear, blinkAt, gesture, mix, reach, travel } from './motion';
import { CheckCard, Ticket, UnitCheck, Wrench } from './props';

// The wider check's visible route and traveling signal share this geometry.
const widerRoute = [{ x: 365, y: 791 }, { x: 274, y: 350 }, { x: 889, y: 350 }, { x: 829, y: 791 }];
const widerPath = `M${widerRoute[0].x} ${widerRoute[0].y}C${widerRoute[1].x} ${widerRoute[1].y} ${widerRoute[2].x} ${widerRoute[2].y} ${widerRoute[3].x} ${widerRoute[3].y}`;

export const Optimize: React.FC<{ seconds: number; scene: FilmScene }> = ({ seconds, scene }) => {
	const deleted = travel(seconds, 56.7, 0.7);
	const transfer = travel(seconds, 58.4, 0.8);
	const wide = ((seconds - scene.start) / 3.8) % 1;
	const routeX = (1 - wide) ** 3 * widerRoute[0].x + 3 * (1 - wide) ** 2 * wide * widerRoute[1].x + 3 * (1 - wide) * wide ** 2 * widerRoute[2].x + wide ** 3 * widerRoute[3].x;
	const routeY = (1 - wide) ** 3 * widerRoute[0].y + 3 * (1 - wide) ** 2 * wide * widerRoute[1].y + 3 * (1 - wide) * wide ** 2 * widerRoute[2].y + wide ** 3 * widerRoute[3].y;
	const fast = ((seconds - 59.2) / 0.8) % 1;
	const hold = 1 - travel(seconds, 56.9, 0.2);
	return <g>
		<Cabinet x={430} y={488} scale={1.05} fixed compact/>
		<g data-testid="retained-wider-protection"><path d={widerPath} fill="none" stroke={palette.gold} strokeWidth="15"/><path d={widerPath} fill="none" stroke={palette.ink} strokeWidth="3"/><circle cx={routeX} cy={routeY} r="12" fill={palette.gold} stroke={palette.ink} strokeWidth="3"/><Label x={598} y={423} size={29}>KEEP END-TO-END PROTECTION</Label><Shield x={825} y={763} scale={0.62}/></g>
		<Engineer x={218} y={1050} scale={0.9} mood="focused" gaze={1} rightHand={reach(218, 1050, mix(321, 325, deleted * hold), mix(888, 906, deleted * hold), 0.9)} blink={blinkAt(seconds, [55.2, 58.6, 61.9])}/>
		<AI x={905} y={1050} scale={0.83} mood="pleased" gaze={-1} blink={blinkAt(seconds, [56.2, 60.8])}/>
		<g opacity={1 - deleted} data-testid="deleted-duplicate"><CheckCard x={321} y={mix(888, 1013, deleted)} title="DUPLICATE" kind="test" scale={0.65}/><path d="M296 866L344 910M344 866L296 910" stroke={palette.coral} strokeWidth="7" strokeLinecap="round" opacity={appear(seconds, 56.4, 0.2)}/></g>
		<path d="M278 997L290 1060H352L365 997Z" fill="#DBD8D1" stroke={palette.ink} strokeWidth="4"/><path d="M305 1014V1048M331 1014V1048" stroke={palette.muted} strokeWidth="3"/>
		<CheckCard x={497} y={891} title="ESSENTIAL" kind="test" scale={0.65}/>
		<g opacity={1 - transfer}><CheckCard x={mix(726, 704, transfer)} y={mix(891, 740, transfer)} title="LOCAL CHECK" kind="test" scale={0.65}/></g>
		<g opacity={transfer}><UnitCheck x={721} y={740} label="UNIT"/><path d="M632 741H658" stroke={palette.green} strokeWidth="6"/><circle cx={632 + Math.max(0, fast) * 26} cy="741" r="8" fill={palette.green}/><Label x={719} y={1015} size={24} color={palette.green}>FAST LOCAL FEEDBACK</Label></g>
	</g>;
};

export const Ending: React.FC<{ seconds: number; scene: FilmScene }> = ({ seconds, scene }) => {
	const fix = gesture(seconds, scene.start + 0.65, 1.5);
	const resolved = seconds >= 64.4;
	const clear = travel(seconds, 65.1, 0.8);
	const wrist = { x: 689 + fix * 4, y: 850 + fix * 3 };
	return <g>
		<Cabinet x={471} y={483} scale={0.71} fixed/><Shield x={687} y={672} scale={0.63}/>
		<Engineer x={300} y={1045} scale={1.35} mood="pleased" gaze={1} headTilt={3 * clear} blink={blinkAt(seconds, [64.5, 67.8])}/>
		<AI x={810} y={1040} scale={1.45} mood="pleased" gaze={-1} leftHand={reach(810, 1040, wrist.x, wrist.y, 1.45)} blink={blinkAt(seconds, [63.8, 68.1])}/>
		<Ticket x={683} y={806} rotation={-4} scale={1.0} resolved={resolved}/>
		{!resolved && <Wrench x={wrist.x} y={wrist.y} rotation={fix * 8}/>}
		<Ticket x={mix(560, 535, clear)} y={886} rotation={-7} scale={0.73}/><Ticket x={mix(615, 600, clear)} y={877} rotation={8} scale={0.65}/>
	</g>;
};
