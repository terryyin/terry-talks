import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { Bridge, colors, Ground, Headline, NeedMark, Passion, Person, Stage, Support, World } from './Stage';

export const Need: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const gap = interpolate(frame, [0.3 * fps, 1.1 * fps], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
	const response = interpolate(frame, [1.15 * fps, 2.1 * fps], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
	return <Stage chapter="05 / RESPOND TO THE NEED">
		<Headline style={{ fontSize: 114 }}>{'Faster building.\nCloser to the need.'}</Headline>
		<Support>See it. Respond. Keep the learning.</Support>
		<World>
			<Ground extendedGap={gap} />
			<Bridge />
			<path d="M738 853H1078M748 870H1068M758 887H1058" fill="none" stroke={colors.gold} strokeWidth="4" strokeLinecap="round" opacity="0.4" />
			<Person x={interpolate(frame, [0, 2.15 * fps, 4.6 * fps], [1180, 1180, 1605], { extrapolateRight: 'clamp' })} care={0.4} />
			<NeedMark x={1260} opacity={0.25} />
			<NeedMark x={1690} opacity={gap} />
			<Passion x={1690} y={630} opacity={gap} size={0.7} />
			<g opacity={response}>
				<rect x="1320" y="814" width={200 * response} height="24" rx="3" fill={colors.gold} />
				<path d="M1330 824H1508" fill="none" stroke={colors.ivory} strokeWidth="1.5" strokeDasharray="28 5" opacity={response} />
			</g>
			<text x="907" y="973" textAnchor="middle" fontSize="30" letterSpacing="5" fill={colors.gold}>LEARNING RETAINED</text>
			<text x="1418" y="954" textAnchor="middle" fontSize="30" letterSpacing="5" fill={colors.gold} opacity={response}>RESPOND</text>
		</World>
	</Stage>;
};
