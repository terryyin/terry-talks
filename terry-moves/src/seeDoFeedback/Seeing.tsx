import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors, Ground, Headline, NeedMark, Passion, Person, Stage, Support, World } from './Stage';

export const Seeing: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const care = interpolate(frame, [0, 0.8 * fps], [0, 1], { extrapolateRight: 'clamp' });
	return <Stage chapter="02 / SEEING">
		<Headline>{'Seeing awakens\npassion.'}</Headline>
		<Support>The gap becomes something worth changing.</Support>
		<World>
			<Ground />
			<path d="M693 652L909 749L1100 824L721 824Z" fill={colors.lightGold} style={{ opacity: interpolate(frame, [0, 1.2 * fps], [0, 0.3], { extrapolateRight: 'clamp' }) }} />
			<Person x={668} care={care} />
			<NeedMark x={1260} />
			<Passion x={584} y={701} opacity={care} size={0.75} />
			<path d="M790 748Q905 633 1020 748Q905 863 790 748Z" fill={colors.ivory} stroke={colors.gold} strokeWidth="4" opacity={0.85 * care} />
			<circle cx="905" cy="748" r="28" fill={colors.ink} opacity={care} />
			<circle cx="916" cy="738" r="8" fill={colors.ivory} opacity={care} />
			<text x="907" y="954" textAnchor="middle" fontSize="30" letterSpacing="5" fill={colors.gold}>PASSION</text>
		</World>
	</Stage>;
};
