import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { captionAt, SceneId, sceneById } from './film';

export const palette = { paper: '#ece6dc', ink: '#262420', gray: '#5c564e', red: '#b33a2b' };
export const serif = 'Georgia, "Times New Roman", serif';
export const sans = 'Arial, Helvetica, sans-serif';
export const useSeconds = (id: SceneId): number => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	return sceneById(id).start + frame / fps;
};
export const Paper: React.FC<React.PropsWithChildren> = ({ children }) => <AbsoluteFill style={{ background: palette.paper, color: palette.ink, overflow: 'hidden', fontFamily: sans }}>{children}</AbsoluteFill>;
export const Art: React.FC<{ file: string; style?: React.CSSProperties }> = ({ file, style }) => <Img src={staticFile(`assets/tps-and-ai/${file}`)} style={{ position: 'absolute', objectFit: 'contain', ...style }} />;
export const Brand: React.FC = () => <Art file="odd-e-logo.png" style={{ left: 934, top: 40, width: 72, height: 74 }} />;
export const Heading: React.FC<React.PropsWithChildren<{ style?: React.CSSProperties }>> = ({ children, style }) => <div style={{ position: 'absolute', left: 78, right: 100, top: 122, fontFamily: serif, fontSize: 82, lineHeight: 1.08, letterSpacing: -2.5, ...style }}>{children}</div>;

/** The script owns phrase breaks; formatting does not change subtitle wording. */
export const captionLines = (text: string, lineBreakAfter?: number): string => {
	if (lineBreakAfter === undefined) return text;
	const words = text.split(' ');
	return `${words.slice(0, lineBreakAfter).join(' ')}\n${words.slice(lineBreakAfter).join(' ')}`;
};
export const Captions: React.FC<{ seconds: number }> = ({ seconds }) => {
	const caption = captionAt(seconds);
	return <div data-testid="film-caption" style={{ position: 'absolute', left: 64, right: 64, top: 856, height: 154, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', whiteSpace: 'pre-line', fontSize: 56, lineHeight: 1.19, fontWeight: 400, letterSpacing: -0.8, color: palette.ink }}>{caption ? captionLines(caption.spoken, caption.lineBreakAfter) : ''}</div>;
};
export const Shot: React.FC<React.PropsWithChildren<{ seconds: number; id: SceneId }>> = ({ seconds, id, children }) => <Paper>
	<div data-scene={id} style={{ position: 'absolute', inset: 0 }}>{children}</div>
	<Captions seconds={seconds} />
	<Brand />
</Paper>;
