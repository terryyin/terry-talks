import React from 'react';
import {Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, Eyebrow, Panel, type SceneProps, sceneSchema, Stage} from './Stage';

const OwnerIntentInner: React.FC<SceneProps> = ({headline, support, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	return <Stage plate="refinement-v3" seconds={5.4} framing="work" style={style}>
		<Interactive.Div name="Earlier, during refinement" style={{position: 'absolute', left: 90, top: 350}}><Eyebrow color="#d4e0e5">EARLIER · REFINEMENT</Eyebrow></Interactive.Div>
		<Interactive.Div name="The owner's first useful delivery" style={{opacity: interpolate(frame, [.1 * fps, .35 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
			<Panel top={430} style={{height: 650, padding: 40, boxSizing: 'border-box'}}>
				<Eyebrow>FIRST USER STORY · SCOPE</Eyebrow>
				<div style={{fontSize: 62, lineHeight: 1.15, letterSpacing: -1.8, fontWeight: 500, marginTop: 26}}>{headline}</div>
				<div style={{fontSize: 42, lineHeight: 1.3, marginTop: 22, color: colors.green}}>{support}</div>
			</Panel>
		</Interactive.Div>
	</Stage>;
};

export const OwnerIntent = Interactive.withSchema({Component: OwnerIntentInner, componentName: '<OwnerIntent>', schema: sceneSchema, wrapInSequence: true});
