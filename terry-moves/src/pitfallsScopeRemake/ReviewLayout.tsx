import type React from 'react';
import {AbsoluteFill} from 'remotion';

export const ink = '#142236';
export const blue = '#2445cc';
export const red = '#a12b36';
export const muted = '#4a596d';
export const mono = 'SFMono-Regular, Consolas, monospace';

export const ReviewLayout = ({children, style}: React.PropsWithChildren<{style?: React.CSSProperties}>) => (
	<AbsoluteFill style={{backgroundColor: '#f3f0e8', color: ink, fontFamily: 'Arial, sans-serif', ...style}}>
		<div style={{position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(#14223614 1.5px, transparent 1.5px)', backgroundSize: '32px 32px'}}/>
		<div style={{position: 'absolute', left: 92, right: 134, top: 172}}>
			<div style={{display: 'flex', alignItems: 'center', gap: 18, color: blue, fontSize: 32, fontWeight: 800, letterSpacing: 3}}>
				<span style={{background: blue, color: 'white', padding: '9px 14px', borderRadius: 8}}>01</span> AI CODING PITFALLS
			</div>
			<div style={{marginTop: 14, color: muted, fontSize: 27}}>AI-generated narration</div>
			{children}
		</div>
	</AbsoluteFill>
);

export const Heading = ({children}: React.PropsWithChildren) => (
	<h1 style={{fontSize: 88, lineHeight: 0.98, letterSpacing: -4, fontWeight: 800, margin: '65px 0 42px', textWrap: 'balance'}}>{children}</h1>
);

export const Sheet = ({children, style}: React.PropsWithChildren<{style?: React.CSSProperties}>) => (
	<div style={{background: '#fffefb', border: '2px solid #cbd0d8', boxShadow: '0 12px 0 #14223612', borderRadius: 20, overflow: 'hidden', ...style}}>{children}</div>
);

export const Label = ({children, color = muted}: React.PropsWithChildren<{color?: string}>) => (
	<div style={{color, fontSize: 32, fontWeight: 800, letterSpacing: 1.7}}>{children}</div>
);

export const Mark = ({children, tone}: React.PropsWithChildren<{tone: 'example' | 'limit'}>) => (
	<span style={{background: tone === 'example' ? '#e7edff' : '#fce5e7', color: tone === 'example' ? blue : red, padding: '2px 10px', borderRadius: 8, whiteSpace: 'nowrap', fontWeight: 800}}>{children}</span>
);
