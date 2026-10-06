import React from 'react';
import { useCurrentFrame } from 'remotion';
import { Card, Frame, Small, Strong } from './Frame';
import { C, cue, ease, FPS, scene } from './film';

export const Premises: React.FC<{ captions: boolean }> = ({ captions }) => {
	const item = scene('premises');
	const seconds = item.start + useCurrentFrame() / FPS;
	return <Frame item={item} captions={captions}>
		<Card x={84} y={354} w={912} h={206} tone="question" opacity={ease(seconds, cue(item, 1))}><Small color={C.red}>01 · THE CUSTOMER'S WORLD</Small><Strong size={43}>Big problem → Smaller problems</Strong><div style={{ marginTop: 17, fontSize: 29 }}>Before choosing the solution.</div></Card>
		<Card x={84} y={609} w={912} h={206} opacity={ease(seconds, cue(item, 2))}><Small>02 · UNCERTAINTY</Small><Strong size={49}>A plan is an attempt.</Strong><div style={{ marginTop: 17, fontSize: 29 }}>A successful answer is not guaranteed.</div></Card>
	</Frame>;
};

export const Value: React.FC<{ captions: boolean }> = ({ captions }) => {
	const item = scene('value');
	const seconds = item.start + useCurrentFrame() / FPS;
	const done = ease(seconds, cue(item, 1));
	return <Frame item={item} captions={captions}>
		<Card x={84} y={373} w={912} h={201} tone="done" opacity={done}><Small color={C.teal}>A USABLE RESULT</Small><Strong size={67} color={C.teal}>✓ In stock: 1 left</Strong><div style={{ marginTop: 12, fontSize: 28 }}>This item · This store</div></Card>
		<div style={{ position: 'absolute', left: 84, top: 623, fontSize: 51, color: C.red, opacity: ease(seconds, cue(item, 2)) }}>Did it help?</div>
		<div style={{ position: 'absolute', left: 84, top: 730, padding: '17px 26px', borderTop: `2px solid ${C.teal}`, fontSize: 33, opacity: ease(seconds, cue(item, 3)) }}>Just enough. Just in time to learn.</div>
	</Frame>;
};

export const Freedom: React.FC<{ captions: boolean }> = ({ captions }) => {
	const item = scene('freedom');
	const seconds = item.start + useCurrentFrame() / FPS;
	const feedback = ease(seconds, cue(item, 1));
	const boundary = ease(seconds, cue(item, 3));
	return <Frame item={item} captions={captions}>
		<div style={{ position: 'absolute', left: 84, top: 353, width: 912, fontFamily: 'Georgia, serif', fontSize: 38, color: C.red, opacity: feedback }}>“The shop was closed when I arrived.”</div>
		<Card x={84} y={465} w={437} h={184} tone="done"><Small color={C.teal}>KEEP · COMPLETED</Small><Strong size={41} color={C.teal}>✓ In stock: 1 left</Strong><div style={{ fontSize: 26, marginTop: 13 }}>Useful value stays.</div></Card>
		<div style={{ position: 'absolute', left: 537, top: 532, fontSize: 44, color: C.red, opacity: feedback }}>→</div>
		<Card x={586} y={465} w={410} h={184} tone="question" opacity={feedback}><Small color={C.red}>CHOOSE NEXT</Small><Strong size={37}>When is it open?</Strong><div style={{ fontSize: 26, marginTop: 14 }}>Change the priority.</div></Card>
		<Card x={586} y={680} w={410} h={137}><Small>UNSTARTED</Small><Strong size={30}>Can I reserve it?</Strong></Card>
		<div style={{ position: 'absolute', left: 84, top: 731, width: 445, fontSize: 30, lineHeight: 1.3, color: C.teal, opacity: boundary }}>No unfinished waste.<br/>No damage to the product.</div>
	</Frame>;
};
