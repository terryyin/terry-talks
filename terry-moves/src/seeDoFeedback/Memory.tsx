import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { Bridge, colors, Ground, Headline, NeedMark, Person, Stage, Support, World } from './Stage';

export const Memory: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	return <Stage chapter="04 / LASTING KNOWLEDGE">
		<Headline style={{ fontSize: 114 }}>{'The product preserves\nwhat we learn.'}</Headline>
		<Support>Knowledge becomes capability.</Support>
		<World>
			<Ground />
			<Bridge />
			<Person x={1180} care={0.4} />
			<NeedMark x={1260} opacity={0.55} />
			<g style={{ opacity: interpolate(frame, [0, 0.9 * fps], [0, 1], { extrapolateRight: 'clamp' }) }}>
				<path d="M738 853H1078M748 870H1068M758 887H1058" fill="none" stroke={colors.gold} strokeWidth="4" strokeLinecap="round" opacity="0.4" />
				<path d="M792 912H1025" fill="none" stroke={colors.line} strokeWidth="2" />
				<text x="907" y="973" textAnchor="middle" fontSize="30" letterSpacing="5" fill={colors.gold}>LEARNED CAPABILITY</text>
			</g>
		</World>
	</Stage>;
};
