import React from 'react';
import { Label, palette } from './design';
import { Point } from './motion';

export type Mood = 'concerned' | 'focused' | 'pleased' | 'surprised';
export type Pose = 'stop' | 'point' | 'work' | 'rest';

const Arm: React.FC<{ shoulder: Point; hand: Point; color: string; stop?: boolean; robot?: boolean }> = ({ shoulder, hand, color, stop = false, robot = false }) => {
	const elbow = { x: shoulder.x + (hand.x - shoulder.x) * 0.52, y: Math.max(shoulder.y, hand.y) + (stop ? 18 : 24) };
	return <g>
		<path d={`M${shoulder.x} ${shoulder.y}Q${elbow.x} ${elbow.y} ${hand.x} ${hand.y}`} fill="none" stroke={palette.ink} strokeWidth={robot ? 28 : 36}/>
		<path d={`M${shoulder.x} ${shoulder.y}Q${elbow.x} ${elbow.y} ${hand.x} ${hand.y}`} fill="none" stroke={color} strokeWidth={robot ? 22 : 29}/>
		<g transform={`translate(${hand.x} ${hand.y})`}>
			{robot ? <circle r="14" fill={palette.gold}/> : stop ? <path d="M-13 10L-25-15Q-30-27-22-25L-13-10L-14-33Q-13-45-6-34L-1-11L3-35Q8-46 12-34L14-10L19-24Q27-32 27-20L25 11Q9 27-13 10Z" fill={palette.skin}/> : <path d="M-13-9Q-3-22 9-15L17-4Q17 10 6 13L-10 9Z" fill={palette.skin}/>}
		</g>
	</g>;
};

/** Anchored at the feet. Continuous hand targets keep gestures attached to props. */
export const Engineer: React.FC<{ x: number; y: number; scale?: number; mood?: Mood; pose?: Pose; gaze?: number; blink?: boolean; lean?: number; headTilt?: number; leftHand?: Point; rightHand?: Point }> = ({ x, y, scale = 1, mood = 'focused', pose = 'rest', gaze = 0, blink = false, lean = 0, headTilt = 0, leftHand, rightHand }) => <g transform={`translate(${x} ${y}) scale(${scale})`} data-testid="engineer" data-pose={pose} data-mood={mood}>
	<ellipse cy="4" rx="78" ry="16" fill={palette.shadow} opacity="0.3"/>
	<g transform={`rotate(${lean} 0 -130)`} stroke={palette.ink} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
		<path d="M-49-139L-48-19L-14-18L2-98L20-20L55-23L39-141Z" fill="#657788"/>
		<path d="M-49-25Q-80-11-78 0H-10L-13-26Z M18-26L19-1H82Q76-21 52-29Z" fill={palette.cream}/>
		<path d="M-62-145Q-68-196-51-239Q-18-255 30-243Q56-219 55-145Z" fill={palette.coral}/>
		<path d="M-22-244L-4-207L18-244" fill="#F3A593"/>
		<path d="M-44-168Q-24-159-10-171M12-194H35V-166H12Z" fill="none" strokeWidth="3" opacity="0.7"/>
		<path d="M-18-252V-276H16V-245Q3-225-18-252" fill={palette.skin}/>
		<path d="M-57-158Q-30-148 49-158L49-145H-57Z" fill="#B85548" stroke="none" opacity="0.4"/>
		<Arm shoulder={{ x: -48, y: -229 }} hand={leftHand ?? { x: -74, y: -165 }} color={palette.coral}/>
		<Arm shoulder={{ x: 42, y: -228 }} hand={rightHand ?? (pose === 'point' ? { x: 128, y: -232 } : pose === 'work' ? { x: 126, y: -166 } : pose === 'stop' ? { x: 155, y: -175 } : { x: 65, y: -164 })} color={palette.coral} stop={pose === 'stop'}/>
		<g transform={`rotate(${headTilt} 0 -312)`}>
		<path d="M-34-253Q-65-268-61-314Q-70-370-11-382Q51-380 52-321Q58-273 20-258Q-6-243-34-253Z" fill={palette.skin}/>
		<ellipse cx="-61" cy="-303" rx="10" ry="17" fill={palette.skin}/>
		<path d="M-62-316Q-79-340-59-359Q-74-380-49-384Q-47-412-20-400Q-8-419 10-400Q35-418 47-392Q77-380 57-350L40-337L32-365Q16-352-3-363Q-25-344-47-360L-52-311Z" fill={palette.ink}/>
		<path d="M-51-318H-12V-291Q-35-278-49-294Z M-2-318H37V-292Q20-279-1-291Z" fill="#F9F0E0" fillOpacity="0.16" strokeWidth="4"/>
		<path d="M-12-308H-2M-51-309L-60-314" strokeWidth="4"/>
		{blink ? <path d="M-40-305H-23M9-305H26" strokeWidth="4"/> : <g stroke="none"><ellipse cx={-31 + gaze * 4} cy="-305" rx="4.5" ry="6" fill={palette.ink}/><ellipse cx={17 + gaze * 4} cy="-305" rx="4.5" ry="6" fill={palette.ink}/><circle cx={-30 + gaze * 4} cy="-307" r="1.5" fill="white"/><circle cx={18 + gaze * 4} cy="-307" r="1.5" fill="white"/></g>}
		<path d={mood === 'concerned' ? 'M-42-328L-23-335 M8-335L28-326' : mood === 'surprised' ? 'M-42-341Q-31-348-22-340M9-340Q20-348 30-340' : 'M-42-333L-23-332M10-331L29-333'} fill="none" strokeWidth="4"/>
		<path d="M0-303L-4-284L4-282" fill="none" stroke="#A96551" strokeWidth="3"/>
		<path d={mood === 'pleased' ? 'M-15-271Q2-256 18-271' : mood === 'concerned' ? 'M-10-268Q1-275 12-268' : mood === 'surprised' ? 'M-7-271Q1-283 9-271Q1-258-7-271' : 'M-11-270Q0-266 13-272'} fill={mood === 'surprised' ? palette.ink : 'none'} strokeWidth="3"/>
		<ellipse cx="-35" cy="-280" rx="10" ry="4" fill={palette.coral} opacity="0.45" stroke="none"/>
		</g>
	</g>
</g>;

export const AI: React.FC<{ x: number; y: number; scale?: number; mood?: Mood; pose?: Pose; gaze?: number; blink?: boolean; tilt?: number; leftHand?: Point; rightHand?: Point }> = ({ x, y, scale = 1, mood = 'focused', pose = 'rest', gaze = -1, blink = false, tilt = 0, leftHand, rightHand }) => <g transform={`translate(${x} ${y}) scale(${scale})`} data-testid="ai-companion" data-pose={pose}>
	<ellipse cy="5" rx="72" ry="15" fill={palette.shadow} opacity="0.28"/>
	<g transform={`rotate(${tilt} 0 -100)`} stroke={palette.ink} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
		<path d="M-35-61L-40-17M34-61L39-17" strokeWidth="18"/>
		<path d="M-42-25Q-70-16-68-2H-18L-20-25Z M21-25L20-2H70Q69-18 41-27Z" fill={palette.gold}/>
		<path d="M-64-177Q-72-211-53-221H51Q72-211 65-177L57-69Q0-42-59-70Z" fill={palette.mint}/>
		<path d="M-59-70Q-7-47 58-71L55-94Q0-75-57-95Z" fill="#378F87"/>
		<path d="M0-222V-244"/><circle cy="-254" r="10" fill={palette.gold}/>
		<Arm shoulder={{ x: -62, y: -164 }} hand={leftHand ?? (pose === 'point' ? { x: -121, y: -163 } : { x: -99, y: -104 })} color={palette.mint} robot/>
		<Arm shoulder={{ x: 62, y: -164 }} hand={rightHand ?? (pose === 'work' ? { x: 112, y: -123 } : { x: 96, y: -102 })} color={palette.mint} robot/>
		<rect x="-47" y="-191" width="94" height="66" rx="24" fill={palette.cream}/>
		{blink ? <path d="M-30-156H-15M15-156H30"/> : <g stroke="none"><ellipse cx={-22 + gaze * 4} cy="-163" rx="6" ry={mood === 'surprised' ? 10 : 7} fill={palette.ink}/><ellipse cx={22 + gaze * 4} cy="-163" rx="6" ry={mood === 'surprised' ? 10 : 7} fill={palette.ink}/></g>}
		<path d={mood === 'concerned' ? 'M-11-141Q0-149 11-141' : mood === 'pleased' ? 'M-13-146Q0-132 13-146' : 'M-10-141H10'} fill="none" strokeWidth="3"/>
		<path d={mood === 'concerned' ? 'M-35-180L-17-185M16-185L34-180' : 'M-35-181L-17-181M17-181L35-181'} fill="none" strokeWidth="3"/>
		<path d="M-13-106L-5-114L3-106L11-114" stroke="#D5FAEE" strokeWidth="3"/>
	</g>
</g>;

export const Cabinet: React.FC<{ x: number; y: number; scale?: number; fixed?: boolean; compact?: boolean; neutral?: boolean }> = ({ x, y, scale = 1, fixed = false, compact = false, neutral = false }) => <g transform={`translate(${x} ${y}) scale(${scale})`} data-testid="legacy-cabinet" data-fixed={fixed} stroke={palette.ink} strokeWidth="5" strokeLinejoin="round">
	<ellipse cx="130" cy="332" rx="168" ry="22" fill={palette.shadow} opacity="0.32" stroke="none"/>
	<path d="M0 0L258 0L285 23V320L258 341H0Z" fill="#7CBBCB"/>
	<path d="M258 0V341L285 320V23Z" fill="#56949D"/>
	<rect width="258" height="320" rx="14" fill={palette.sky}/>
	<rect x="22" y="29" width="212" height="81" rx="9" fill={palette.cream}/>
	<path d="M34 68H66L79 50L100 85L115 66H145L158 48L177 80L193 64H220" fill="none" stroke={palette.mint} strokeWidth="5"/>
	<g fill={palette.mint}><rect x="21" y="130" width="95" height="68" rx="8"/><rect x="136" y="130" width="98" height="68" rx="8"/><rect x="21" y="218" width="95" height="76" rx="8"/><rect x="136" y="218" width="98" height="76" rx="8"/></g>
	<path d="M54 163H82M56 256H83M167 163H197M171 256H194M115 163H135M69 199V218M185 199V218" fill="none" strokeWidth="3"/>
	<g fill={palette.cream} strokeWidth="3"><circle cx="67" cy="161" r="9"/><circle cx="184" cy="161" r="9"/><circle cx="68" cy="255" r="9"/><circle cx="184" cy="255" r="9"/></g>
	{!fixed && !neutral && <g strokeWidth="3"><path d="M159 227L183 277L207 227Z" fill={palette.coral}/><path d="M182 239V252M182 259V262"/></g>}
	{fixed && <path d="M168 251L179 263L205 235" fill="none" stroke={palette.green} strokeWidth="8"/>}
	{!compact && <Label x={128} y={307} size={15}>LEGACY PRODUCT</Label>}
	<path d="M-5 145C-89 149-61 279-12 267C-53 274-73 340-30 340" fill="none" stroke={palette.lavender} strokeWidth="10"/>
	<path d="M270 190Q311 204 295 256Q300 287 339 286" fill="none" stroke={palette.gold} strokeWidth="9"/>
</g>;

export const Shield: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => <g transform={`translate(${x} ${y}) scale(${scale})`} data-testid="useful-protection" filter="url(#paper-shadow)" stroke={palette.ink} strokeWidth="4">
	<path d="M-48-39L0-58L48-39V2Q44 40 0 62Q-44 40-48 2Z" fill={palette.green}/>
	<path d="M-18-3L-3 13L24-21" fill="none" stroke={palette.cream} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
	<path d="M-39-33L0-48L39-33" fill="none" stroke="#91D8A6" strokeWidth="3"/>
</g>;
