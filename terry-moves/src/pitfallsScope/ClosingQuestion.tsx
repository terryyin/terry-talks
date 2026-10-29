import React from 'react';
import {Interactive} from 'remotion';
import {Eyebrow, type SceneProps, sceneSchema, Stage} from './Stage';

const ClosingQuestionInner: React.FC<SceneProps> = ({headline, support, style}) => {
	return <Stage plate="refinement-v2" seconds={7} blur={9} shade={.55} style={style}>
		<Interactive.Div name="Clarify delivery scope and rejection rules" style={{position: 'absolute', left: 90, right: 136, top: 550}}>
			<Eyebrow color="#c5d4db">STORY SCOPE</Eyebrow>
			<div style={{fontSize: 76, lineHeight: 1.15, fontWeight: 500, letterSpacing: -2.2, marginTop: 22}}>{headline}</div>
			<div style={{marginTop: 90}}><Eyebrow color="#c5d4db">PRODUCT CONSTRAINT</Eyebrow></div>
			<div style={{fontSize: 76, lineHeight: 1.15, fontWeight: 500, letterSpacing: -2.2, marginTop: 22}}>{support}</div>
		</Interactive.Div>
		<Interactive.Div name="Clear communication with people and AI" style={{position: 'absolute', left: 90, right: 136, top: 1290, fontSize: 48, lineHeight: 1.35, fontWeight: 400}}>Be explicit with people and AI.</Interactive.Div>
	</Stage>;
};

export const ClosingQuestion = Interactive.withSchema({Component: ClosingQuestionInner, componentName: '<ClosingQuestion>', schema: sceneSchema, wrapInSequence: true});
