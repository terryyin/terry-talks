import React from 'react';
import {Interactive} from 'remotion';
import {type SceneProps, sceneSchema, Stage} from './Stage';

const OpeningHookInner: React.FC<SceneProps> = ({headline, style}) => (
	<Stage style={style}>
		<Interactive.Div name="The confusion hook" data-primary-caption style={{position: 'absolute', left: 90, top: 930, right: 180, whiteSpace: 'pre-line', fontSize: 72, fontWeight: 500, lineHeight: 1.14, letterSpacing: -2}}>{headline}</Interactive.Div>
	</Stage>
);

export const OpeningHook = Interactive.withSchema({Component: OpeningHookInner, componentName: '<OpeningHook>', schema: sceneSchema, wrapInSequence: true});
