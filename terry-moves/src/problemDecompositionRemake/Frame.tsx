import React from 'react';
import { AbsoluteFill, Interactive, interpolate, useCurrentFrame } from 'remotion';
import { C, film, FilmScene, FONT, FPS, HEAD } from './film';

export const Paper: React.FC<{ children: React.ReactNode }> = ({ children }) => <AbsoluteFill style={{ background: C.paper, color: C.ink, fontFamily: FONT }}>
	<div style={{ position: 'absolute', inset: 30, border: `1px solid ${C.line}`, pointerEvents: 'none' }}/>{children}
</AbsoluteFill>;

export const Cover: React.FC<{ title: string }> = ({ title }) => <Paper>
	<div style={{ position: 'absolute', left: 84, top: 125, color: C.muted, fontSize: 25, letterSpacing: 3 }}>A SOFTWARE DEVELOPMENT PHILOSOPHY</div>
	<Interactive.Div name="Cover title" style={{ position: 'absolute', left: 80, top: 223, width: 910, fontFamily: HEAD, fontSize: 109, lineHeight: 1.08, letterSpacing: -4, color: C.ink }}>{title}</Interactive.Div>
	<div style={{ position: 'absolute', left: 84, top: 552, width: 83, height: 8, background: C.red }}/>
	<div style={{ position: 'absolute', left: 84, top: 626, fontSize: 52, lineHeight: 1.37 }}>
		<div>Smaller problems.</div><div>Useful answers.</div><div style={{ color: C.teal }}>Freedom to choose again.</div>
	</div>
	<div style={{ position: 'absolute', left: 84, bottom: 121, fontSize: 19, color: C.muted }}>CEDAR · AI-GENERATED NARRATION</div>
	<div style={{ position: 'absolute', left: 84, bottom: 75, fontSize: 24, color: C.muted }}>TERRY YIN <span style={{ padding: '0 14px' }}>·</span> PROBLEM DECOMPOSITION</div>
</Paper>;

export const Frame: React.FC<{ item: FilmScene; captions: boolean; children: React.ReactNode }> = ({ item, captions, children }) => {
	const frame = useCurrentFrame();
	const seconds = item.start + frame / FPS;
	const caption = item.captionRanges.find((range) => seconds >= range.start && seconds < range.end);
	const chapters = ['Distinction', 'Premises', 'Goals', 'Principles'];
	return <Paper>
		<div style={{ position: 'absolute', left: 80, right: 80, top: 76, display: 'flex', justifyContent: 'space-between', fontSize: 24 }}>
			{chapters.map((chapter, index) => <div key={chapter} style={{ color: chapter === item.chapter ? C.red : C.muted, fontWeight: chapter === item.chapter ? 700 : 400, borderBottom: `3px solid ${chapter === item.chapter ? C.red : 'transparent'}`, paddingBottom: 14 }}>{index + 1} <span style={{ paddingLeft: 6 }}>{chapter}</span></div>)}
		</div>
		<Interactive.Div name={`${item.chapter} heading`} style={{ position: 'absolute', left: 80, top: 155, width: 920, fontFamily: HEAD, fontSize: item.id === 'commits' ? 64 : 67, lineHeight: 1.12, letterSpacing: -1.7, opacity: interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' }) }}>{item.label}</Interactive.Div>
		{children}
		{captions && caption && <div style={{ position: 'absolute', left: 82, right: 82, top: 904, height: 113, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontSize: 35, lineHeight: 1.26, color: C.ink }}>{caption.text}</div>}
		<div style={{ position: 'absolute', left: 80, right: 80, bottom: 36, height: 3, background: C.line }}><div style={{ height: 3, background: C.teal, width: `${seconds / film.duration * 100}%` }}/></div>
	</Paper>;
};

export const Card: React.FC<{ x: number; y: number; w: number; h: number; children: React.ReactNode; tone?: 'question' | 'done' | 'later'; opacity?: number }> = ({ x, y, w, h, children, tone = 'later', opacity = 1 }) => <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, boxSizing: 'border-box', padding: '28px 30px', border: `2px ${tone === 'later' ? 'dashed' : 'solid'} ${tone === 'question' ? C.red : tone === 'done' ? C.teal : C.line}`, borderRadius: 14, background: tone === 'question' ? C.paleRed : tone === 'done' ? C.paleTeal : C.white, opacity }}>{children}</div>;
export const Small: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = C.muted }) => <div style={{ fontSize: 25, color, letterSpacing: .3, lineHeight: 1.3 }}>{children}</div>;
export const Strong: React.FC<{ children: React.ReactNode; size?: number; color?: string }> = ({ children, size = 45, color = C.ink }) => <div style={{ fontSize: size, fontWeight: 700, color, lineHeight: 1.15, marginTop: 12 }}>{children}</div>;
