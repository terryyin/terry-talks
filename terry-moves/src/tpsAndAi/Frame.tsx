import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { captionAt, SceneId, sceneById } from './film';
import { useFilmLanguage, useLocalizedFilmFonts } from './language';

export const palette = { paper: '#ece6dc', ink: '#262420', gray: '#5c564e', red: '#b33a2b' };
export const serif = 'Georgia, "Times New Roman", serif';
export const sans = 'Arial, Helvetica, sans-serif';
export const useSeconds = (id: SceneId): number => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	return sceneById(id).start + frame / fps;
};
export const Paper: React.FC<React.PropsWithChildren> = ({ children }) => { const fonts = useLocalizedFilmFonts(); return <AbsoluteFill style={{ background: palette.paper, color: palette.ink, overflow: 'hidden', fontFamily: fonts?.sans ?? sans }}>{children}</AbsoluteFill>; };
export const Art: React.FC<{ file: string; style?: React.CSSProperties }> = ({ file, style }) => <Img src={staticFile(`assets/tps-and-ai/${file}`)} style={{ position: 'absolute', objectFit: 'contain', ...style }} />;
export const Brand: React.FC = () => <Art file="odd-e-logo.png" style={{ left: 934, top: 40, width: 72, height: 74 }} />;
export const Heading: React.FC<React.PropsWithChildren<{ style?: React.CSSProperties }>> = ({ children, style }) => { const fonts = useLocalizedFilmFonts(); return <div style={{ position: 'absolute', left: 78, right: 100, top: 122, fontFamily: serif, fontSize: 82, lineHeight: 1.08, letterSpacing: -2.5, ...style, ...(fonts ? { fontFamily: fonts.serif, letterSpacing: 0, fontSize: Math.min(Number(style?.fontSize ?? 82), 74) } : {}) }}>{children}</div>; };

/** The script owns phrase breaks; formatting does not change subtitle wording. */
const captionLines = (text: string, lineBreakAfter?: number): string => {
	if (lineBreakAfter === undefined) return text;
	const words = text.split(' ');
	return `${words.slice(0, lineBreakAfter).join(' ')}\n${words.slice(lineBreakAfter).join(' ')}`;
};
export const Captions: React.FC<{ seconds: number }> = ({ seconds }) => {
	const caption = captionAt(seconds);
	const language = useFilmLanguage();
	const fonts = useLocalizedFilmFonts();
	return <div data-testid="film-caption" lang={language} style={{ position: 'absolute', left: 64, right: 64, top: 856, height: 154, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', whiteSpace: 'pre-line', fontSize: language === 'en' ? 56 : 48, lineHeight: 1.19, fontWeight: 400, letterSpacing: language === 'en' ? -0.8 : 0, color: palette.ink, ...(fonts ? { fontFamily: fonts.sans } : {}) }}>{caption ? language === 'en' ? captionLines(caption.spoken, caption.lineBreakAfter) : caption.translations[language] : ''}</div>;
};
export const Shot: React.FC<React.PropsWithChildren<{ seconds: number; id: SceneId }>> = ({ seconds, id, children }) => <Paper>
	<div data-scene={id} style={{ position: 'absolute', inset: 0 }}>{children}</div>
	<Captions seconds={seconds} />
	<Brand />
</Paper>;
