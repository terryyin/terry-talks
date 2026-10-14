import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { Bridge, colors, Ground, Headline, NeedMark, Passion, Person, Stage, Support, World } from './Stage';

export const Loop: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const seconds = frame / fps;
	const improved = interpolate(frame, [3.65 * fps, 4.6 * fps], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
	const walk = interpolate(frame, [0, 1.25 * fps, 2.75 * fps, 4.6 * fps, 6.35 * fps], [668, 668, 882, 882, 1180], { extrapolateRight: 'clamp' });
	const footHeight = interpolate(frame, [1.25 * fps, 2.75 * fps, 3.65 * fps, 4.6 * fps], [814, 765, 765, 814], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
	return <Stage chapter="03 / DO ↔ FEEDBACK">
		<Headline style={{ top: 278, fontSize: 148 }}>{seconds < 1.75 ? 'Do.' : seconds < 3.65 ? 'Try.' : 'Improve.'}</Headline>
		<Support style={{ top: 469 }}>{seconds < 1.75 ? 'AI can help us build.' : seconds < 3.65 ? 'People show us whether it helped.' : 'Feedback changes what we build.'}</Support>
		<World>
			<Ground />
			<Bridge progress={interpolate(frame, [0, 1.25 * fps], [0, 1], { extrapolateRight: 'clamp' })} improvement={improved} />
			<Person x={walk} y={footHeight} care={improved * 0.4} pause={seconds > 2.3 && seconds < 4.7 ? 0.75 : 0} />
			<NeedMark x={1260} />
			<g style={{ opacity: interpolate(frame, [0, 0.3 * fps, 2.2 * fps, 2.7 * fps], [0, 1, 1, 0], { extrapolateRight: 'clamp' }) }}>
				<Passion x={495} y={716} size={0.65} />
				<text x="496" y="782" fill={colors.gold} fontSize="27" fontWeight="700" textAnchor="middle" letterSpacing="4">AI</text>
			</g>
			<g style={{ opacity: interpolate(frame, [2.65 * fps, 3.2 * fps, 5.1 * fps, 5.6 * fps], [0, 1, 1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }) }}>
				<path d="M870 569C766 558 679 568 589 635" fill="none" stroke={colors.coral} strokeWidth="4" strokeLinecap="round" strokeDasharray="6 10" />
				<path d="M610 633L588 636L593 612" fill="none" stroke={colors.coral} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M862 584L878 568L892 585" stroke={colors.coral} strokeWidth="4" strokeLinecap="round" fill="none" />
			</g>
			<g style={{ opacity: interpolate(frame, [4.6 * fps, 5.15 * fps], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }) }}>
				<path d="M880 871L897 886L932 852" stroke={colors.gold} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
				<text x="909" y="954" textAnchor="middle" fontSize="30" letterSpacing="5" fill={colors.gold}>A BETTER NEXT STEP</text>
			</g>
		</World>
	</Stage>;
};
