import React from 'react';
import {Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, Eyebrow, Panel, type SceneProps, sceneSchema, Stage} from './Stage';

const DeveloperInterpretationInner: React.FC<SceneProps> = ({headline, support, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	return <Stage plate="interpretation" seconds={4} framing="work" shade={.2} style={style}>
		<Panel top={430} style={{height: 650, padding: 40, boxSizing: 'border-box'}}>
			<Eyebrow>DEVELOPER → CODING ASSISTANT</Eyebrow>
			<div style={{fontSize: 54, lineHeight: 1.2, fontWeight: 500, marginTop: 26}}>{headline}</div>
			<div style={{position: 'absolute', left: 80, top: 355, fontSize: 58, lineHeight: 1.2, fontWeight: 500}}>{support}</div>
			<Interactive.Div name="Send the maximum to the assistant" data-send-request style={{position: 'absolute', left: 80, top: 495, width: 650, height: 75, borderRadius: 10, backgroundColor: colors.blue, color: colors.paper, display: 'grid', placeItems: 'center', fontSize: 36, fontWeight: 500, scale: interpolate(frame, [3.7 * fps, 3.8 * fps, 3.9 * fps], [1, .97, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Ask assistant →</Interactive.Div>
		</Panel>
	</Stage>;
};

export const DeveloperInterpretation = Interactive.withSchema({Component: DeveloperInterpretationInner, componentName: '<DeveloperInterpretation>', schema: sceneSchema, wrapInSequence: true});
