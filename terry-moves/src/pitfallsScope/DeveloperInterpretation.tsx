import React from 'react';
import {Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, Eyebrow, Panel, type SceneProps, sceneSchema, Stage} from './Stage';

const DeveloperInterpretationInner: React.FC<SceneProps> = ({headline, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const typed = Math.floor(interpolate(frame, [.25 * fps, 2.3 * fps], [0, headline.length], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
	return <Stage plate="interpretation" seconds={3.6} shade={.2} style={style}>
		<Panel top={790}>
			<Eyebrow>DEVELOPER → CODING ASSISTANT</Eyebrow>
			<div style={{fontSize: 60, lineHeight: 1.3, fontWeight: 500, minHeight: 220, marginTop: 30}}>{headline.slice(0, typed)}<span style={{color: colors.blue, opacity: typed < headline.length ? 1 : 0}}>│</span></div>
		</Panel>
	</Stage>;
};

export const DeveloperInterpretation = Interactive.withSchema({Component: DeveloperInterpretationInner, componentName: '<DeveloperInterpretation>', schema: sceneSchema, wrapInSequence: true});
