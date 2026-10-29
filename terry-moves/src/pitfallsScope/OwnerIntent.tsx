import React from 'react';
import {Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, Eyebrow, Panel, type SceneProps, sceneSchema, Stage} from './Stage';

const OwnerIntentInner: React.FC<SceneProps> = ({headline, support, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	return <Stage plate="refinement-v2" seconds={6.6} style={style}>
		<Interactive.Div name="The owner's first useful delivery" style={{opacity: interpolate(frame, [.65 * fps, 1.1 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
			<Panel top={1110} style={{rotate: '-1.2deg', padding: 40, boxSizing: 'border-box'}}>
				<Eyebrow>FIRST USER STORY · SCOPE</Eyebrow>
				<div style={{fontSize: 62, lineHeight: 1.15, letterSpacing: -1.8, fontWeight: 500, marginTop: 22}}>{headline}</div>
				<div style={{fontSize: 46, lineHeight: 1.3, marginTop: 24, color: colors.green}}>{support}</div>
			</Panel>
		</Interactive.Div>
	</Stage>;
};

export const OwnerIntent = Interactive.withSchema({Component: OwnerIntentInner, componentName: '<OwnerIntent>', schema: sceneSchema, wrapInSequence: true});
