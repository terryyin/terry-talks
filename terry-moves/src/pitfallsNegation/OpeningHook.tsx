import React from 'react';
import {Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {type SceneProps, sceneSchema, Stage} from './Stage';

const OpeningHookInner: React.FC<SceneProps> = ({headline, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	return <Stage plate="workplace" seconds={2.5} shade={.2} style={style}>
		<Interactive.Div name="The confusion hook" data-primary-caption style={{position: 'absolute', left: 90, top: 930, right: 180, whiteSpace: 'pre-line', fontSize: 72, fontWeight: 500, lineHeight: 1.14, letterSpacing: -2, opacity: interpolate(frame, [0, .12 * fps], [.8, 1], {extrapolateRight: 'clamp'})}}>{headline}</Interactive.Div>
	</Stage>;
};

export const OpeningHook = Interactive.withSchema({Component: OpeningHookInner, componentName: '<OpeningHook>', schema: sceneSchema, wrapInSequence: true});
