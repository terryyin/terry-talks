import React from 'react';
import { Heading, palette, Shot, useSeconds } from './Frame';
import { cue, progress } from './film';
export const MinimalismPicture: React.FC<{ seconds: number }> = ({ seconds }) => <>
	<Heading>Keep less.</Heading>
	<svg viewBox="0 0 1080 1080" style={{ position: 'absolute', inset: 0 }}>
		<g fill="none" stroke={palette.gray} strokeWidth="3" opacity={0.35 * (1 - progress(seconds, cue('minimalism', 1), 2))}><rect x="130" y="285" width="820" height="420" rx="4" /><rect x="155" y="315" width="770" height="360" rx="4" /><rect x="180" y="345" width="720" height="300" rx="4" /></g>
		<rect data-testid="necessary-behavior" x="218" y="392" width="644" height="206" rx="4" fill={palette.paper} stroke={palette.ink} strokeWidth="5" />
		<text x="540" y="483" textAnchor="middle" fill={palette.ink} fontSize="52">Necessary behavior</text><text x="540" y="548" textAnchor="middle" fill={palette.red} fontSize="45">Self-protection stays</text>
	</svg>
</>;
export const Minimalism: React.FC = () => { const seconds = useSeconds('minimalism'); return <Shot seconds={seconds} id="minimalism"><MinimalismPicture seconds={seconds} /></Shot>; };
