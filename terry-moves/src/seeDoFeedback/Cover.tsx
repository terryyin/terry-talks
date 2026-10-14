import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors, Stage } from './Stage';

export const Cover: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	return <Stage chapter="SEE · DO · FEEDBACK">
		<h1 style={{ position: 'absolute', left: 72, top: 310, margin: 0, fontSize: 78, fontWeight: 600, lineHeight: 1.2, letterSpacing: -2.3 }}>Before we build,<br />we must see.</h1>
		<div style={{ position: 'absolute', left: 76, top: 556, fontSize: 36, lineHeight: 1.4, fontWeight: 400, color: colors.muted }}>A human beginning<br />for software.</div>
		<svg width="1080" height="1080" viewBox="0 0 1080 1080" style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
			<path d="M80 797Q210 784 345 794T660 790Q737 788 815 793M783 762Q804 775 818 793L781 825" fill="none" stroke={colors.ink} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
			<circle cx={interpolate(frame, [0, 2.5 * fps], [110, 760], { extrapolateRight: 'clamp' })} cy="793" r="10" fill={colors.gold} />
		</svg>
	</Stage>;
};
