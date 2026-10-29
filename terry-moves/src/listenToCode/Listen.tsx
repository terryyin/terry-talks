import React from 'react';
import {CanvasImage, Easing, Interactive, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {actSchema, type ActProps, Stage} from './Stage';
import {ScoreStaff} from './ScoreStaff';
import {OddEMark} from './OddEMark';
import {useListenLanguage} from './language';

const ListenInner: React.FC<Pick<ActProps, 'headline' | 'style'>> = ({headline, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const language = useListenLanguage();
	return <Stage paper="#d2e6a6" ink="#17251c" showCornerMark={false} style={style}>
		<ScoreStaff state="listening" color="#276d3e"/>
		<Interactive.Div name="Listen to your code" style={{position: 'absolute', top: 128, left: 80, width: 920, whiteSpace: 'pre-line', fontFamily: 'ListenPoppins', fontWeight: 600, fontSize: 127, lineHeight: 1.03, letterSpacing: -6, translate: interpolate(frame, [0, 0.7 * fps], ['0px 18px', '0px 0px'], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1)})}}>{headline}</Interactive.Div>
		{language === 'zh-Hant' ? <Interactive.Div name="聆聽你的程式碼" style={{position: 'absolute', top: 430, left: 84, fontSize: 60, lineHeight: 1.2, fontWeight: 600, letterSpacing: 1, color: '#276d3e'}}>聆聽你的程式碼</Interactive.Div> : null}
		<CanvasImage name="The listener and the codebook" src={staticFile('assets/listen-to-code/listener.png')} premountFor={fps} style={{position: 'absolute', left: 324, top: 378, width: 710, height: 710, objectFit: 'contain', transformOrigin: '52% 85%', scale: interpolate(frame, [0, 2 * fps], [0.96, 1.025], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), rotate: interpolate(frame, [0, 2 * fps], ['-2deg', '0deg'], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}/>
		<Interactive.Div name="Odd-e poster mark" style={{position: 'absolute', top: 831, left: 94}}><OddEMark size={146} ink="#17251c" paper="#d2e6a6"/></Interactive.Div>
	</Stage>;
};

export const Listen = Interactive.withSchema({Component: ListenInner, componentName: '<Listen>', schema: {headline: actSchema.headline}, wrapInSequence: true});
