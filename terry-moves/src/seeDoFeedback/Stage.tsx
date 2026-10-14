import React from 'react';
import { AbsoluteFill, CanvasImage, staticFile, useVideoConfig } from 'remotion';

export const colors = {
	ivory: '#F5F0E6',
	ink: '#222B2C',
	muted: '#65716D',
	gold: '#C89632',
	lightGold: '#E8CC83',
	coral: '#BF6953',
	line: '#D6D4C7',
} as const;

export const serif = 'Georgia, Times New Roman, serif';
export const sans = 'Arial, Helvetica, sans-serif';

export const Stage: React.FC<React.PropsWithChildren<{ chapter: string }>> = ({ chapter, children }) => {
	const { fps } = useVideoConfig();
	return <AbsoluteFill style={{ backgroundColor: colors.ivory, color: colors.ink, fontFamily: sans, overflow: 'hidden' }}>
		<svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
			<defs><pattern id="see-do-paper" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.7" fill={colors.ink} opacity="0.07" /></pattern></defs>
			<rect width="1920" height="1080" fill="url(#see-do-paper)" />
			<path d="M1450 -130C1750 10 1910 290 1900 610" fill="none" stroke={colors.line} strokeWidth="1.5" opacity="0.6" />
			<path d="M1490 -160C1830 10 1970 310 1960 650" fill="none" stroke={colors.line} strokeWidth="1.5" opacity="0.4" />
		</svg>
		<CanvasImage name="Odd-e — upper-left" src={staticFile('assets/tps-and-ai/odd-e-logo.png')} premountFor={fps} style={{ position: 'absolute', left: 112, top: 72, width: 112, height: 112, borderRadius: '50%', zIndex: 10 }} />
		<div style={{ position: 'absolute', left: 268, top: 107, fontSize: 26, fontWeight: 700, letterSpacing: 4, color: colors.muted }}>{chapter}</div>
		{children}
	</AbsoluteFill>;
};

export const Headline: React.FC<React.PropsWithChildren<{ style?: React.CSSProperties }>> = ({ children, style }) => (
	<h1 style={{ position: 'absolute', left: 140, top: 255, margin: 0, fontFamily: serif, fontSize: 120, fontWeight: 400, lineHeight: 1.09, letterSpacing: -4.5, whiteSpace: 'pre-line', ...style }}>{children}</h1>
);

export const Support: React.FC<React.PropsWithChildren<{ style?: React.CSSProperties }>> = ({ children, style }) => (
	<div style={{ position: 'absolute', left: 146, top: 551, color: colors.muted, fontSize: 46, lineHeight: 1.3, letterSpacing: -0.6, whiteSpace: 'pre-line', ...style }}>{children}</div>
);

export const Person: React.FC<{ x: number; y?: number; care?: number; pause?: number }> = ({ x, y = 814, care = 0, pause = 0 }) => (
	<g transform={`translate(${x} ${y})`} stroke={colors.ink} strokeLinecap="round" strokeLinejoin="round">
		<circle cx="0" cy="-156" r="22" fill={colors.ink} stroke="none" />
		<circle cx="12" cy="-158" r="3" fill={colors.ivory} stroke="none" />
		<path d="M-3 -125L-3 -68" strokeWidth="30" />
		<path d={`M-3 -108L${30 + care * 10} ${-89 - care * 24}L${45 + care * 4} ${-98 - care * 22}`} strokeWidth="12" fill="none" />
		<path d="M-12 -110L-31 -79" strokeWidth="12" fill="none" />
		<path d={`M-6 -67L${-18 - pause * 5} -33L${-23 - pause * 9} 0M3 -67L${22 + pause * 6} -36L${36 + pause * 8} 0`} strokeWidth="13" fill="none" />
		<path d="M-33 0H-18M26 0H44" strokeWidth="13" />
	</g>
);

export const NeedMark: React.FC<{ x: number; y?: number; opacity?: number }> = ({ x, y = 720, opacity = 1 }) => (
	<g transform={`translate(${x} ${y})`} opacity={opacity}>
		<path d="M0 -34L34 0L0 34L-34 0Z" fill={colors.ivory} stroke={colors.gold} strokeWidth="4" />
		<circle r="8" fill={colors.gold} />
	</g>
);

export const Passion: React.FC<{ x: number; y: number; opacity?: number; size?: number }> = ({ x, y, opacity = 1, size = 1 }) => (
	<g transform={`translate(${x} ${y}) scale(${size})`} opacity={opacity} stroke={colors.gold} strokeWidth="4" strokeLinecap="round">
		<path d="M0 -21V-38M0 21V38M-21 0H-38M21 0H38M-15 -15L-26 -26M15 -15L26 -26M-15 15L-26 26M15 15L26 26" />
		<circle r="10" fill={colors.gold} stroke="none" />
	</g>
);

/** One authored bridge template: its height changes in response to a person's trial. */
export const Bridge: React.FC<{ progress?: number; improvement?: number; y?: number }> = ({ progress = 1, improvement = 1, y = 814 }) => (
	<g>
		{Array.from({ length: 10 }, (_, index) => {
			const x = 729 + index * 36;
			const rise = Math.sin((index / 9) * Math.PI) * 50 * (1 - improvement);
			return <g key={index} opacity={Math.max(0, Math.min(1, progress * 12 - index))}>
				<rect x={x} y={y - rise} width="34" height="24" rx="3" fill={index === 5 && improvement < 0.9 ? colors.coral : colors.gold} />
				<path d={`M${x + 5} ${y + 9 - rise}H${x + 29}`} stroke={colors.ivory} strokeWidth="1.5" opacity="0.65" />
			</g>;
		})}
	</g>
);

export const Ground: React.FC<{ extendedGap?: number }> = ({ extendedGap = 0 }) => (
	<g>
		<path d="M140 824H718M1102 824H1318" stroke={colors.ink} strokeWidth="5" strokeLinecap="round" fill="none" />
		<path d="M1320 824H1518" stroke={colors.ink} strokeWidth="5" strokeLinecap="round" fill="none" opacity={1 - extendedGap} />
		<path d="M1522 824H1780" stroke={colors.ink} strokeWidth="5" strokeLinecap="round" fill="none" />
		<path d="M718 824V894M1102 824V894" stroke={colors.line} strokeWidth="3" fill="none" />
		<path d="M1318 824V886M1522 824V886" stroke={colors.line} strokeWidth="3" opacity={extendedGap} fill="none" />
	</g>
);

export const World: React.FC<React.PropsWithChildren> = ({ children }) => (
	<svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0 }} role="img" aria-label="A person understands a gap and improves a bridge through use.">{children}</svg>
);

export const GapRing: React.FC<{ x: number; y: number; radius?: number; progress?: number; opacity?: number }> = ({ x, y, radius = 190, progress = 0, opacity = 1 }) => (
	<g transform={`translate(${x} ${y})`} opacity={opacity}>
		<circle r={radius + 45} fill="none" stroke={colors.line} strokeWidth="1.5" />
		<circle r={radius} fill="none" stroke={colors.ink} strokeWidth="18" strokeDasharray={`${radius * 5.05} ${radius * 1.23}`} strokeLinecap="round" transform="rotate(22)" />
		<circle r={radius} fill="none" stroke={colors.gold} strokeWidth="18" strokeDasharray={`${Math.max(0.1, radius * 1.23 * progress)} ${radius * 6.28}`} strokeLinecap="round" transform="rotate(311.3)" opacity={progress} />
		<circle cx={radius * 0.82} cy={radius * -0.37} r="9" fill={colors.coral} />
	</g>
);
