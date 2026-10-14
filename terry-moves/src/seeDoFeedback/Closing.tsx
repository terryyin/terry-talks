import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors, GapRing, Headline, Stage, World } from './Stage';

export const Closing: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	return <Stage chapter="SEE · DO · FEEDBACK">
		<Headline style={{ top: 314, fontSize: 120 }}>{'AI helps us do.\nWe must still see.'}</Headline>
		<div style={{ position: 'absolute', left: 146, top: 742, fontSize: 52, fontWeight: 500, color: colors.ink }}>Film and idea from Terry</div>
		<div style={{ position: 'absolute', left: 147, top: 833, fontSize: 32, color: colors.muted }}>Inspired by Scott H. Young’s See–Do–Feedback</div>
		<div style={{ position: 'absolute', left: 147, top: 898, fontSize: 24, letterSpacing: 1.5, color: colors.muted }}>AI-generated narration</div>
		<World>
			<GapRing x={1520} y={478} radius={151} progress={interpolate(frame, [0, 1.5 * fps], [0.05, 1], { extrapolateRight: 'clamp' })} />
			<path d="M1421 478Q1520 393 1619 478Q1520 563 1421 478Z" fill="none" stroke={colors.gold} strokeWidth="4" />
			<circle cx="1520" cy="478" r="29" fill={colors.ink} />
			<circle cx="1531" cy="469" r="8" fill={colors.ivory} />
		</World>
	</Stage>;
};
