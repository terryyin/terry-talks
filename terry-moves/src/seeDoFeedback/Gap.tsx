import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors, Ground, Headline, NeedMark, Person, Stage, Support, World } from './Stage';

export const Gap: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	return <Stage chapter="01 / THE HUMAN BEGINNING">
		<Headline>{'A need,\nfelt first.'}</Headline>
		<Support>Every useful product begins with a human gap.</Support>
		<World>
			<Ground />
			<Person x={668} pause={0.5} />
			<NeedMark x={1260} />
			<path d="M638 596L650 577L659 595L672 580L680 598" fill="none" stroke={colors.coral} strokeWidth="4" strokeLinecap="round" style={{ opacity: interpolate(frame, [0, 0.6 * fps], [0.35, 1], { extrapolateRight: 'clamp' }) }} />
			<path d="M766 867H1052" stroke={colors.coral} strokeWidth="3" strokeDasharray="2 12" strokeLinecap="round" />
			<text x="907" y="954" textAnchor="middle" fontSize="30" letterSpacing="5" fill={colors.coral}>THE GAP</text>
		</World>
	</Stage>;
};
