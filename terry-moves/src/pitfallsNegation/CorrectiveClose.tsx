import React from 'react';
import {Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, Eyebrow, Panel, type SceneProps, sceneSchema, Stage} from './Stage';

const CorrectiveCloseInner: React.FC<SceneProps> = ({headline, support, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const retired = frame >= 1.2 * fps;
	return <Stage plate="workplace" seconds={11} blur={10} shade={.55} style={style}>
		<Panel top={360} style={{padding: 36, boxSizing: 'border-box', width: 810}}>
			<Eyebrow>KEEP · CURRENT CAPABILITY</Eyebrow>
			<Interactive.Div name="Holding appears after scheduled refresh" data-keep-check style={{marginTop: 18, padding: '22px 26px', borderRadius: 12, background: '#dfece6', fontSize: 40, fontWeight: 500, lineHeight: 1.25, color: colors.ink}}>
				<span style={{color: colors.green}}>✓</span> Holding after refresh
			</Interactive.Div>
			<div style={{marginTop: 28}}><Eyebrow color={colors.muted}>RETIRE · EXPIRED ASSERTION</Eyebrow></div>
			<Interactive.Div name="Retire absence-oriented follow-through" data-retire-assertion data-retired={retired} style={{marginTop: 14, padding: '20px 26px', borderRadius: 12, background: retired ? '#ece6e4' : '#f0e6e2', fontSize: 36, fontWeight: 500, lineHeight: 1.25, color: colors.muted, textDecoration: retired ? 'line-through' : 'none', opacity: interpolate(frame, [1.1 * fps, 1.4 * fps], [1, .55], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
				Docs: does not require entry
			</Interactive.Div>
		</Panel>
		<Interactive.Div name="The spoken takeaway" data-primary-caption style={{position: 'absolute', left: 90, right: 180, top: 980}}>
			<div style={{fontSize: 48, lineHeight: 1.22, fontWeight: 500, letterSpacing: -1.2, textWrap: 'balance', whiteSpace: 'pre-line'}}>{headline}</div>
			{support ? <div style={{fontSize: 42, lineHeight: 1.28, fontWeight: 500, letterSpacing: -1, marginTop: 28, textWrap: 'balance', whiteSpace: 'pre-line', opacity: interpolate(frame, [3 * fps, 3.4 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>{support}</div> : null}
		</Interactive.Div>
	</Stage>;
};

export const CorrectiveClose = Interactive.withSchema({Component: CorrectiveCloseInner, componentName: '<CorrectiveClose>', schema: sceneSchema, wrapInSequence: true});
