import React from 'react';
import {Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {type SceneProps, sceneSchema, Stage} from './Stage';

const RefinementOpeningInner: React.FC<SceneProps> = ({headline, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	return <Stage plate="demo-v2" seconds={2.4} shade={.2} style={style}>
		<Interactive.Div name="The concrete hook" data-primary-caption style={{position: 'absolute', left: 90, top: 930, right: 180, whiteSpace: 'pre-line', fontSize: 82, fontWeight: 500, lineHeight: 1.14, letterSpacing: -2.4, opacity: interpolate(frame, [0, .12 * fps], [.8, 1], {extrapolateRight: 'clamp'})}}>{headline}</Interactive.Div>
		<Interactive.Div name="The failed demo" style={{position: 'absolute', left: 90, top: 1160, right: 180, padding: '22px 26px', borderRadius: 10, color: '#ffd0c4', background: '#4d2528ed', fontSize: 44, fontWeight: 500}}>! Maximum 3 contacts</Interactive.Div>
	</Stage>;
};

export const RefinementOpening = Interactive.withSchema({Component: RefinementOpeningInner, componentName: '<RefinementOpening>', schema: sceneSchema, wrapInSequence: true});
