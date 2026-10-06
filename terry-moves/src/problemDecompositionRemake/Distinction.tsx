import React from 'react';
import { Interactive, interpolate, useCurrentFrame } from 'remotion';
import { Card, Frame, Small, Strong } from './Frame';
import { C, cue, ease, FPS, scene } from './film';

export const Distinction: React.FC<{ captions: boolean }> = ({ captions }) => {
	const item = scene('distinction');
	const frame = useCurrentFrame();
	const seconds = item.start + frame / FPS;
	const answer = ease(seconds, cue(item, 1));
	const discover = ease(seconds, cue(item, 2));
	return <Frame item={item} captions={captions}>
		<div style={{ position: 'absolute', left: 84, top: 365, fontSize: 29, color: C.muted }}>SOLUTION DECOMPOSITION</div>
		<div style={{ position: 'absolute', left: 84, top: 410, width: 390, opacity: 0.4 + 0.6 * answer }}>
			{['Screen', 'API', 'Database'].map((name, index) => <div key={name} style={{ marginBottom: 12, padding: '27px 30px', border: `2px solid ${C.line}`, background: C.white, borderRadius: 9, fontSize: 39, transform: `translateX(${(1 - answer) * (index + 1) * -12}px)` }}>{name}</div>)}
			<div style={{ fontSize: 27, color: C.muted, marginTop: 18 }}>Organize an imagined answer</div>
		</div>
		<div style={{ position: 'absolute', left: 528, top: 544, fontSize: 48, color: C.muted }}>≠</div>
		<Interactive.Div name="Customer problem" style={{ position: 'absolute', left: 610, top: 365, width: 383, opacity: interpolate(frame, [0, 24], [0, 1], { extrapolateRight: 'clamp' }) }}>
			<Small color={C.red}>PROBLEM DECOMPOSITION</Small>
			<div style={{ border: `2px solid ${C.red}`, background: C.paleRed, borderRadius: 14, marginTop: 22, padding: 28, minHeight: 251 }}>
				<div style={{ fontSize: 70, color: C.red, fontFamily: 'Georgia, serif' }}>?</div><Strong size={41}>What smaller result would help?</Strong>
			</div>
			<div style={{ fontSize: 27, color: C.red, marginTop: 28, opacity: discover }}>Discover what works</div>
		</Interactive.Div>
	</Frame>;
};

export const Example: React.FC<{ captions: boolean }> = ({ captions }) => {
	const item = scene('example');
	const seconds = item.start + useCurrentFrame() / FPS;
	const first = ease(seconds, cue(item, 1));
	const later = ease(seconds, cue(item, 2));
	return <Frame item={item} captions={captions}>
		<div style={{ position: 'absolute', left: 88, top: 337, fontSize: 43 }}>Avoid wasted trips.</div>
		<Card x={84} y={416} w={912} h={206} tone="question" opacity={first}><Small color={C.red}>FIRST QUESTION</Small><Strong>Is this item in stock?</Strong><div style={{ fontSize: 28, marginTop: 12, color: C.muted }}>One item. One store.</div></Card>
		<Card x={84} y={657} w={438} h={153} opacity={later}><Small>LATER?</Small><Strong size={35}>When is it open?</Strong></Card>
		<Card x={556} y={657} w={440} h={153} opacity={later}><Small>LATER?</Small><Strong size={35}>Can I reserve it?</Strong></Card>
	</Frame>;
};
