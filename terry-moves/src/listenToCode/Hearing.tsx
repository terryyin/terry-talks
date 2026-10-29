import React from 'react';
import {CanvasImage, Easing, Interactive, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {actSchema, type ActProps, Stage} from './Stage';
import {ScoreStaff} from './ScoreStaff';

const HearingInner: React.FC<ActProps> = ({headline, support, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	return <Stage paper="#245c3d" ink="#e9ecd9" style={style}>
		<Interactive.Div name="If we read less code" style={{position: 'absolute', left: 82, top: 117, fontSize: 44, fontWeight: 400, letterSpacing: -1, opacity: interpolate(frame, [0, 0.5 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>{support}</Interactive.Div>
		<Interactive.Div name="How do we hear it now" style={{position: 'absolute', top: 258, left: 78, width: 935, whiteSpace: 'pre-line', fontSize: 120, lineHeight: 1.08, letterSpacing: -5.8, fontWeight: 600, translate: interpolate(frame, [0, 0.8 * fps], ['0px 24px', '0px 0px'], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1)}), opacity: interpolate(frame, [0, 0.5 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>{headline}</Interactive.Div>
		<ScoreStaff state="question" color="#bbd993" startAt={12} opacity={0.47}/>
		<CanvasImage name="The listener keeps listening" src={staticFile('assets/listen-to-code/listener.png')} premountFor={fps} style={{position: 'absolute', left: 538, top: 650, width: 470, height: 470, objectFit: 'contain', opacity: 0.38, scale: interpolate(frame, [0, 4 * fps], [0.96, 1.03], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}/>
		<svg width={1080} height={1080} viewBox="0 0 1080 1080" style={{position: 'absolute', inset: 0}}>
			<path d="M 82 920 C 330 1020 550 905 484 767 C 439 673 317 728 350 809 C 387 900 517 810 440 748" fill="none" stroke="#bbd993" strokeWidth={7} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={interpolate(frame, [0, 2.4 * fps], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}/>
		</svg>
	</Stage>;
};

export const Hearing = Interactive.withSchema({Component: HearingInner, componentName: '<Hearing>', schema: actSchema, wrapInSequence: true});
