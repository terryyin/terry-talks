import React from 'react';
import {Interactive} from 'remotion';
import {colors, Eyebrow, Panel, type SceneProps, sceneSchema, Stage} from './Stage';

const OwnerClarificationInner: React.FC<SceneProps> = ({headline, support, style}) => <Stage plate="interpretation" seconds={4.2} framing="work" shade={.3} style={style}>
	<Panel top={550}>
		<Eyebrow>THE ORIGINAL USER STORY</Eyebrow>
		<Interactive.Div name="The promised scope" style={{fontSize: 66, lineHeight: 1.2, letterSpacing: -1.6, marginTop: 30, fontWeight: 500}}>{headline}</Interactive.Div>
		<Interactive.Div name="The example in the note" style={{fontSize: 54, lineHeight: 1.3, marginTop: 42, color: colors.green}}>{support}</Interactive.Div>
	</Panel>
</Stage>;

export const OwnerClarification = Interactive.withSchema({Component: OwnerClarificationInner, componentName: '<OwnerClarification>', schema: sceneSchema, wrapInSequence: true});
