import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { captionAt, progress, SceneId, sceneById } from './film';

export const palette = { paper: '#ece6dc', ink: '#262420', gray: '#5c564e', red: '#b33a2b' };
export const serif = 'Georgia, "Times New Roman", serif';
export const sans = 'Arial, Helvetica, sans-serif';
export const useSeconds = (id: SceneId): number => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	return sceneById(id).start + frame / fps;
};

export const Paper: React.FC<React.PropsWithChildren> = ({ children }) => <AbsoluteFill style={{ background: palette.paper, color: palette.ink, overflow: 'hidden', fontFamily: sans }}>
	{children}
</AbsoluteFill>;

export const InkPath: React.FC<{ d: string; amount?: number; color?: string; width?: number; opacity?: number }> = ({ d, amount = 1, color = palette.red, width = 5, opacity = 1 }) => <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - amount} opacity={opacity} />;

export const Art: React.FC<{ file: string; style?: React.CSSProperties }> = ({ file, style }) => <Img src={staticFile(`assets/tps-and-ai/${file}`)} style={{ position: 'absolute', objectFit: 'contain', ...style }} />;

/** Phrase breaks balance the picture's two-line caption area without changing its source wording. */
export const captionLines = (text: string): string => {
	if (text.length < 37) return text;
	const words = text.split(' ');
	let best = 1;
	let imbalance = Infinity;
	for (let i = 1; i < words.length; i++) {
		const difference = Math.abs(words.slice(0, i).join(' ').length - words.slice(i).join(' ').length);
		if (difference < imbalance) { best = i; imbalance = difference; }
	}
	return `${words.slice(0, best).join(' ')}\n${words.slice(best).join(' ')}`;
};

export const Captions: React.FC<{ seconds: number }> = ({ seconds }) => {
	const caption = captionAt(seconds);
	return <div data-testid="film-caption" style={{ position: 'absolute', left: 64, right: 64, top: 856, height: 154, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', whiteSpace: 'pre-line', fontSize: 56, lineHeight: 1.19, fontWeight: 400, letterSpacing: -0.8, color: palette.ink }}>
		{caption ? captionLines(caption.spoken) : ''}
	</div>;
};

export const Shot: React.FC<React.PropsWithChildren<{ seconds: number; id: SceneId }>> = ({ seconds, id, children }) => <Paper>
	<div data-scene={id} style={{ position: 'absolute', inset: 0, opacity: id === 'feedback' ? 1 : progress(seconds, sceneById(id).start, 0.45) }}>{children}</div>
	<Captions seconds={seconds} />
</Paper>;

export const InkPerson: React.FC<{ x: number; y: number; reach?: number; opacity?: number }> = ({ x, y, reach = 0, opacity = 1 }) => <g transform={`translate(${x} ${y})`} stroke={palette.ink} strokeWidth="6" strokeLinecap="round" fill="none" opacity={opacity}>
	<path d="M-17 -88 C-32 -119 28 -128 25 -94 C24 -70 -8 -68 -17 -88" />
	<path d="M-4 -70 C-18 -41 -24 2 -29 32 M0 -67 C19 -42 23 -10 30 29 M-28 30 L-45 86 M29 30 L40 84 M-19 -47 Q-60 -25 -68 7" />
	<path d={`M14 -45 Q${40 + reach * 20} ${-40 + reach * 50} ${60 + reach * 60} ${-8 + reach * 54}`} />
</g>;
