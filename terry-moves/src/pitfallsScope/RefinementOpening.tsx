import React from 'react';
import {Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {type SceneProps, sceneSchema, Stage} from './Stage';

const RefinementOpeningInner: React.FC<SceneProps> = ({headline, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	return <Stage plate="refinement-v2" seconds={2.4} style={style}>
		<Interactive.Div name="The refinement discussion" style={{position: 'absolute', left: 90, top: 1288, width: 856, whiteSpace: 'pre-line', fontSize: 84, fontWeight: 500, lineHeight: 1.14, letterSpacing: -2.4, opacity: interpolate(frame, [0, .3 * fps], [.15, 1], {extrapolateRight: 'clamp'})}}>{headline}</Interactive.Div>
	</Stage>;
};

export const RefinementOpening = Interactive.withSchema({Component: RefinementOpeningInner, componentName: '<RefinementOpening>', schema: sceneSchema, wrapInSequence: true});
