import React from 'react';
import {Interactive, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, Eyebrow, Panel, type SceneProps, sceneSchema, Stage} from './Stage';

const AddedGuardInner: React.FC<SceneProps> = ({headline, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const complete = frame >= .3 * fps;
	return <Stage plate="interpretation" seconds={2.6} framing="work" blur={6} shade={.34} style={style}>
		<Panel top={470} style={{height: 580, padding: 40, boxSizing: 'border-box'}}>
			<Eyebrow>CODING ASSISTANT</Eyebrow>
			<Interactive.Div name="The assistant complies without clarification" data-ai-response={complete ? 'complete' : 'working'}>
				<div style={{fontSize: 62, fontWeight: 500, lineHeight: 1.15, marginTop: 28}}>{complete ? headline : 'Working…'}</div>
				<div style={{marginTop: 36, opacity: complete ? 1 : 0, display: 'grid', gap: 25, fontSize: 48, lineHeight: 1.3, fontWeight: 500}}>
					<div><span style={{color: colors.green}}>✓</span> Max-3 validation</div>
					<div><span style={{color: colors.green}}>✓</span> Error message</div>
					<div><span style={{color: colors.green}}>✓</span> Rejection tests</div>
				</div>
			</Interactive.Div>
		</Panel>
	</Stage>;
};

export const AddedGuard = Interactive.withSchema({Component: AddedGuardInner, componentName: '<AddedGuard>', schema: sceneSchema, wrapInSequence: true});
