import React from 'react';
import {Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, Eyebrow, Panel, type SceneProps, sceneSchema, Stage} from './Stage';

const IntendedChangeInner: React.FC<SceneProps> = ({headline, support, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const asking = frame >= 3.5 * fps;
	return <Stage plate="holdings-work" seconds={4} framing="work" blur={6} shade={.34} style={style}>
		<Panel top={430} style={{padding: 40, boxSizing: 'border-box', height: 680}}>
			<Eyebrow>HOLDINGS REFRESH · INTENDED</Eyebrow>
			<div style={{fontSize: 42, lineHeight: 1.25, color: colors.muted, marginTop: 22}}>Eligibility</div>
			<Interactive.Div name="Eligibility simplifies to Connected" data-eligibility="connected" style={{marginTop: 18, padding: '28px 30px', borderRadius: 12, background: '#e8eef1', fontSize: 54, fontWeight: 500, lineHeight: 1.2}}>
				{headline}
			</Interactive.Div>
			<div style={{fontSize: 38, lineHeight: 1.3, marginTop: 22, color: colors.green}}>{support}</div>
			<Interactive.Div name="Ask the coding assistant" data-ask-assistant data-pressed={asking} style={{position: 'absolute', left: 40, right: 40, bottom: 40, height: 74, borderRadius: 10, background: asking ? '#24465e' : colors.blue, color: colors.paper, display: 'grid', placeItems: 'center', fontSize: 36, fontWeight: 500, scale: interpolate(frame, [3.5 * fps, 3.6 * fps, 3.7 * fps], [1, .97, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Ask assistant →</Interactive.Div>
		</Panel>
	</Stage>;
};

export const IntendedChange = Interactive.withSchema({Component: IntendedChangeInner, componentName: '<IntendedChange>', schema: sceneSchema, wrapInSequence: true});
