import React from 'react';
import { useCurrentFrame } from 'remotion';
import { Card, Frame, Small, Strong } from './Frame';
import { C, cue, ease, FPS, scene } from './film';

export const ThreeVs: React.FC<{ captions: boolean }> = ({ captions }) => {
	const item = scene('threeVs');
	const seconds = item.start + useCurrentFrame() / FPS;
	const useful = ease(seconds, cue(item, 1, 'useful'));
	const visible = ease(seconds, cue(item, 1, 'recognizable'));
	const vertical = ease(seconds, cue(item, 1, 'working'));
	return <Frame item={item} captions={captions}>
		<div style={{ position: 'absolute', left: 84, right: 84, top: 358, display: 'flex', justifyContent: 'space-between', fontSize: 34, color: C.teal }}><div style={{ opacity: .45 + .55 * useful }}>Useful</div><div style={{ opacity: .45 + .55 * visible }}>Recognizable</div><div style={{ opacity: .45 + .55 * vertical }}>End to end</div></div>
		<Card x={84} y={449} w={516} h={265} tone="done"><Small color={C.teal}>CUSTOMER RESULT</Small><Strong size={52} color={C.teal}>In stock: 1 left</Strong><div style={{ marginTop: 22, fontSize: 30, opacity: visible }}>Someone can use<br/>and evaluate it.</div></Card>
		<svg style={{ position: 'absolute', left: 588, top: 445, width: 94, height: 280 }} viewBox="0 0 94 280"><path d="M0 135H45V42H90M45 135H90M45 135V228H90" fill="none" stroke={C.teal} strokeWidth="4" strokeDasharray="360" strokeDashoffset={360 * (1 - vertical)}/></svg>
		<div style={{ position: 'absolute', left: 678, top: 451, width: 318 }}>{['Screen', 'API', 'Database'].map((name, index) => <div key={name} style={{ marginBottom: 17, padding: '24px 29px', border: `2px solid ${vertical > index / 4 ? C.teal : C.line}`, borderRadius: 8, background: vertical > index / 4 ? C.paleTeal : C.white, fontSize: 34 }}>{name}</div>)}</div>
		<div style={{ position: 'absolute', left: 84, top: 792, fontSize: 29, color: C.muted }}>Cross the required parts. The result is the unit.</div>
	</Frame>;
};

export const Flow: React.FC<{ captions: boolean }> = ({ captions }) => {
	const item = scene('flow');
	const seconds = item.start + useCurrentFrame() / FPS;
	const finish = ease(seconds, cue(item, 0, 'finish'), 1.1);
	return <Frame item={item} captions={captions}>
		<Card x={84} y={370} w={912} h={342} tone="done"><Small color={C.teal}>ONE SHARED CUSTOMER OUTCOME</Small><Strong size={48}>Check this item's stock.</Strong><div style={{ display: 'flex', gap: 24, marginTop: 40, alignItems: 'center' }}><svg width="182" height="85" viewBox="0 0 182 85"><path d="M30 42H152" stroke={C.teal} strokeWidth="3"/>{[30, 91, 152].map((x) => <circle key={x} cx={x} cy="42" r="24" fill={C.paper} stroke={C.teal} strokeWidth="3"/>)}</svg><div style={{ fontSize: 30 }}>Work together.</div><div style={{ marginLeft: 'auto', fontSize: 46, color: C.teal, opacity: finish }}>✓ Finished</div></div></Card>
		<div style={{ position: 'absolute', left: 84, top: 763, color: C.muted, fontSize: 32 }}>Then choose the next customer outcome.</div>
	</Frame>;
};

export const Commits: React.FC<{ captions: boolean }> = ({ captions }) => {
	const item = scene('commits');
	const seconds = item.start + useCurrentFrame() / FPS;
	const smaller = ease(seconds, cue(item, 0, 'smaller'));
	const purpose = ease(seconds, cue(item, 1));
	return <Frame item={item} captions={captions}>
		<div style={{ position: 'absolute', left: 84, top: 360, width: 912, border: `2px solid ${C.line}`, padding: 29, boxSizing: 'border-box', borderRadius: 14 }}><Small>STORY · Avoid wasted trips</Small><div style={{ marginTop: 23, padding: 24, background: C.white, border: `2px solid ${C.line}`, borderRadius: 10, opacity: smaller }}><Small>SCENARIO · Check one item's stock</Small><div style={{ display: 'flex', gap: 15, marginTop: 30 }}>{[1, 2, 3].map((number) => <div key={number} style={{ flex: 1, border: `2px solid ${C.teal}`, borderRadius: 9, padding: '24px 14px', textAlign: 'center', background: C.paleTeal, fontSize: 28, color: C.teal }}>✓ Commit {number}<div style={{ marginTop: 13, fontSize: 23, color: C.ink }}>Coherent now.</div></div>)}</div></div></div>
		<div style={{ position: 'absolute', left: 84, top: 742, width: 912, fontSize: 36, color: C.teal, opacity: purpose }}>Today's purpose. Or an existing documented need.</div><div style={{ position: 'absolute', left: 84, top: 808, fontSize: 27, color: C.muted, opacity: purpose }}>An aspiration to deliver value — not a promise per commit.</div>
	</Frame>;
};

export const Whole: React.FC<{ captions: boolean }> = ({ captions }) => {
	const item = scene('whole');
	const seconds = item.start + useCurrentFrame() / FPS;
	const care = ease(seconds, cue(item, 1));
	const options = ease(seconds, cue(item, 2));
	const nodes = [{ x: 301, y: 51, label: 'Stock display', changed: true }, { x: 58, y: 175, label: 'Inventory', changed: false }, { x: 544, y: 175, label: 'Stores', changed: true }, { x: 301, y: 296, label: 'Availability', changed: true }];
	return <Frame item={item} captions={captions}>
		<div style={{ position: 'absolute', left: 84, top: 336, width: 912, height: 389, border: `3px solid ${care > .1 ? C.teal : C.line}`, borderRadius: 20, boxShadow: `0 0 ${care * 18}px ${C.teal}22` }}><Small><span style={{ position: 'absolute', left: 23, top: 15 }}>ONE COHERENT PRODUCT</span></Small><svg width="912" height="389" style={{ position: 'absolute', inset: 0 }}><path d="M451 94L208 218L451 339L694 218L451 94M208 218H694" fill="none" stroke={C.line} strokeWidth="3"/></svg>{nodes.map((node) => <div key={node.label} style={{ position: 'absolute', left: node.x, top: node.y, width: 305, height: 87, display: 'flex', alignItems: 'center', justifyContent: 'center', background: node.changed && care > .1 ? C.paleTeal : C.white, border: `2px solid ${node.changed && care > .1 ? C.teal : C.line}`, borderRadius: 11, fontSize: 31 }}>{node.label}</div>)}</div>
		<div style={{ position: 'absolute', left: 84, top: 766, opacity: options }}><Small color={C.teal}>OPTION VALUE · SPECULATIVE FUTURE POTENTIAL</Small><div style={{ marginTop: 12, fontSize: 33 }}>Future customer value, at a given cost.<br/>Without building unused features now.</div></div>
	</Frame>;
};
