import React from 'react';
import {Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, Eyebrow, Panel, type SceneProps, sceneSchema, Stage} from './Stage';

const AssistantAbsenceInner: React.FC<SceneProps> = ({headline, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const complete = frame >= .3 * fps;
	const absenceFollowThrough = frame >= .9 * fps;
	return <Stage plate="holdings-work" seconds={5} framing="work" blur={6} shade={.34} style={style}>
		<Panel top={430} style={{height: 720, padding: 40, boxSizing: 'border-box'}}>
			<Eyebrow>CODING ASSISTANT</Eyebrow>
			<Interactive.Div name="The assistant removes the gate then asserts absence" data-ai-response={complete ? 'complete' : 'working'} data-absence-follow-through={absenceFollowThrough}>
				<div style={{fontSize: 58, fontWeight: 500, lineHeight: 1.15, marginTop: 28}}>{complete ? headline : 'Working…'}</div>
				<div style={{marginTop: 36, opacity: interpolate(frame, [.85 * fps, .95 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), display: 'grid', gap: 24, fontSize: 44, lineHeight: 1.3, fontWeight: 500}}>
					<div data-absence-artifact="tests"><span style={{color: colors.green}}>✓</span> No entry-required tests</div>
					<div data-absence-artifact="docs"><span style={{color: colors.green}}>✓</span> Docs: does not require entry</div>
				</div>
			</Interactive.Div>
		</Panel>
	</Stage>;
};

export const AssistantAbsence = Interactive.withSchema({Component: AssistantAbsenceInner, componentName: '<AssistantAbsence>', schema: sceneSchema, wrapInSequence: true});
