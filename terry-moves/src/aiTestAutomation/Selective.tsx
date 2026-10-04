import React from 'react';
import { AI, Cabinet, Engineer, Shield } from './actors';
import { Label, palette } from './design';
import { FilmScene } from './film';
import { appear, blinkAt, gesture, mix, travel } from './motion';
import { CheckCard } from './props';

const IntentCard: React.FC<{ x: number; y: number; title: string; text: string; color?: string; textSize?: number }> = ({ x, y, title, text, color = palette.cream, textSize = 30 }) => <g transform={`translate(${x} ${y})`} stroke={palette.ink} strokeWidth="4"><rect x="-165" y="-65" width="330" height="130" rx="16" fill={color}/><Label x={0} y={-20} size={24}>{title}</Label><Label x={0} y={27} size={textSize}>{text}</Label></g>;

export const Selective: React.FC<{ seconds: number; scene: FilmScene }> = ({ seconds, scene }) => {
	const newFeature = seconds >= scene.captionRanges[2].start;
	const code = travel(seconds, scene.start + 0.85, 0.6);
	const runPhase = Math.max(0, seconds - 46.05) % 1.15;
	const run = travel(runPhase, 0, 0.9);
	const signalX = run < 0.52 ? mix(514, 615, run / 0.52) : 615;
	const signalY = run < 0.52 ? 819 : mix(819, 723, (run - 0.52) / 0.48);
	const test = appear(seconds, 50.05, 0.2);
	const feature = appear(seconds, 51.3, 0.25);
	const green = seconds >= 52.6;
	return <g>
		<Engineer x={239} y={1020} scale={1.05} mood="pleased" gaze={1} headTilt={3 * gesture(seconds, green ? 52.65 : 46.9, 0.6)} blink={blinkAt(seconds, [44.2, 48.4, 52.7])}/>
		<AI x={889} y={1020} scale={1.0} mood="pleased" gaze={-1} blink={blinkAt(seconds, [45.4, 50.4])}/>
		<Shield x={939} y={484} scale={0.5}/>
		{!newFeature ? <g data-testid="ordinary-test-code">
			<Cabinet x={497} y={492} scale={0.75} compact fixed/>
			<g opacity={1 - code}><CheckCard x={431} y={822} title="USEFUL CHECK" scale={0.95} selected/></g>
			<g opacity={code}><CheckCard x={431} y={822} title="TEST CODE" kind="test" scale={0.95}/></g>
			<path d="M509 819H615V723" fill="none" stroke={palette.green} strokeWidth="7" strokeLinecap="round" opacity={code}/>
			<g opacity={code}><circle cx={signalX} cy={signalY} r="13" fill={palette.green} opacity={seconds >= 46.05 && runPhase < 0.9 ? 1 : 0}/><Label x={572} y={425} size={33}>USEFUL CHECK → TEST CODE</Label></g>
			<Label x={587} y={1080} size={31} color={palette.green}>RUNS WITHOUT AI</Label>
		</g> : <g data-testid="test-first-development" data-has-test={test > 0} data-has-feature={feature > 0} data-test-passing={green}>
			<IntentCard x={563} y={455} title="INTENT" text="UNDO RESTORES DATA" textSize={26}/>
			<g opacity={test}><path d="M563 520V568" stroke={palette.ink} strokeWidth="5"/><IntentCard x={563} y={646} title="TEST FIRST" text={green ? '✓ PASSES' : '× FAILS'} color={green ? '#D6ECD7' : '#FFD2BF'}/></g>
			<g opacity={feature}><path d="M563 711V750" stroke={palette.ink} strokeWidth="5"/><IntentCard x={563} y={826} title="THEN FEATURE" text="IMPLEMENT UNDO" color="#D7E9EC"/></g>
		</g>}
	</g>;
};
