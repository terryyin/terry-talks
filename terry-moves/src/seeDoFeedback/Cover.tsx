import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors, GapRing, Headline, Stage, Support, World } from './Stage';

export const Cover: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	return <Stage chapter="SEE · DO · FEEDBACK">
		<Headline style={{ top: 320, fontSize: 132, maxWidth: 1180 }}>{'Before we build,\nwe must see.'}</Headline>
		<Support style={{ top: 657, color: colors.ink }}>A human beginning for software.</Support>
		<div style={{ position: 'absolute', left: 146, top: 908, fontSize: 28, letterSpacing: 4, color: colors.muted }}>A FILM ABOUT NEED, ACTION AND LEARNING</div>
		<World>
			<g style={{ translate: interpolate(frame, [0, 3 * fps], ['0px 8px', '0px -8px'], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }) }}>
				<GapRing x={1495} y={531} radius={196} />
				<path d="M1444 531H1531" stroke={colors.line} strokeWidth="3" strokeLinecap="round" />
				<circle cx="1515" cy="531" r="14" fill={colors.gold} />
			</g>
		</World>
	</Stage>;
};
