import React from 'react';
import {Interactive} from 'remotion';
import {type SceneProps, sceneSchema, Stage} from './Stage';

const ClosingQuestionInner: React.FC<SceneProps> = ({headline, support, style}) => {
	return <Stage plate="refinement-v3" seconds={7.8} blur={10} shade={.6} style={style}>
		<Interactive.Div name="The spoken takeaway" data-primary-caption style={{position: 'absolute', left: 90, right: 180, top: 590}}>
			<div style={{fontSize: 80, lineHeight: 1.15, fontWeight: 500, letterSpacing: -2.2, textWrap: 'balance'}}>{headline}</div>
			<div style={{fontSize: 64, lineHeight: 1.25, fontWeight: 500, letterSpacing: -1.2, marginTop: 100, textWrap: 'balance'}}>{support}</div>
		</Interactive.Div>
	</Stage>;
};

export const ClosingQuestion = Interactive.withSchema({Component: ClosingQuestionInner, componentName: '<ClosingQuestion>', schema: sceneSchema, wrapInSequence: true});
