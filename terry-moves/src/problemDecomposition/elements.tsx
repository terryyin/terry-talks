import React from 'react';
import { Img, staticFile } from 'remotion';
import { bodyFont, headlineFont, palette } from './design';
import { DINNER, FilmScene } from './film';

export type SceneProps = { time: number; scene: FilmScene };

export const Headline: React.FC<{ children: React.ReactNode; top?: number; size?: number; opacity?: number }> = ({ children, top = 78, size = 66, opacity = 1 }) => (
	<div style={{ position: 'absolute', left: 64, top, right: 64, fontFamily: headlineFont, fontSize: size, lineHeight: 1.06, letterSpacing: -1.9, color: palette.ink, opacity }}>{children}</div>
);

/** Preserve the complete 3:2 illustration and all three adult faces. */
export const DinnerWorld: React.FC<{ zoom?: number; y?: number; opacity?: number; asset?: string }> = ({ zoom = 1, y = 170, opacity = 1, asset = DINNER }) => (
	<div style={{ position: 'absolute', left: 0, top: y, width: 1080, height: 720, overflow: 'hidden', opacity }}>
		<Img src={staticFile(asset)} style={{ width: 1080, height: 720, transform: `scale(${zoom})`, transformOrigin: '50% 62%' }} />
	</div>
);

export const Label: React.FC<{ children: React.ReactNode; left: number; top: number; color?: string; size?: number; opacity?: number }> = ({ children, left, top, color = palette.muted, size = 19, opacity = 1 }) => (
	<div style={{ position: 'absolute', left, top, color, opacity, fontFamily: bodyFont, fontSize: size, letterSpacing: 1.5, textTransform: 'uppercase' }}>{children}</div>
);

export const Check: React.FC<{ x: number; y: number; size?: number }> = ({ x, y, size = 30 }) => (
	<svg width={size} height={size} viewBox="0 0 30 30" style={{ position: 'absolute', left: x, top: y }}><circle cx="15" cy="15" r="14" fill={palette.cobalt} /><path d="m8 15 5 5 9-10" fill="none" stroke={palette.paperLight} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

/** Bound scene changes to their spoken clauses, including deliberate reading holds. */
export const cue = (scene: FilmScene, index: number): number => scene.captionRanges[index].speechStart - scene.start;

/** A visual detail appears when its word is heard in the continuous performance. */
export const wordCue = (scene: FilmScene, index: number, word: string): number => scene.captionRanges[index].wordCues[word] - scene.start;
