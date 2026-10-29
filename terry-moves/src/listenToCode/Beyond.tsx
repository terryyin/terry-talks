import React from 'react';
import {CanvasImage, Easing, Interactive, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {actSchema, type ActProps, Stage} from './Stage';
import {ScoreStaff} from './ScoreStaff';

const BeyondInner: React.FC<ActProps> = ({headline, support, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	return <Stage paper="#d2e6a6" ink="#17251c" style={style}>
		<Interactive.Div name="The open question" style={{position: 'absolute', left: 80, top: 131, width: 925, whiteSpace: 'pre-line', fontSize: 86, lineHeight: 1.15, fontWeight: 600, letterSpacing: -3.5, translate: interpolate(frame, [0, 0.75 * fps], ['0px 30px', '0px 0px'], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1)}), opacity: interpolate(frame, [0, 0.45 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>{headline}</Interactive.Div>
		<ScoreStaff state="question" color="#276d3e" startAt={15} opacity={0.32}/>
		<svg width={1080} height={1080} viewBox="0 0 1080 1080" style={{position: 'absolute', inset: 0}}>
			<path d="M 80 724 C 165 724 228 724 274 684 C 294 666 292 648 302 630 C 328 580 407 576 447 616 C 487 656 465 699 423 722 C 393 739 380 756 380 781 L 380 806" fill="none" stroke="#276d3e" strokeWidth={9} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={interpolate(frame, [0.5 * fps, 2.2 * fps], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}/>
			<circle cx={380} cy={852} r={10} fill="#276d3e" opacity={interpolate(frame, [2.1 * fps, 2.4 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}/>
		</svg>
		<CanvasImage name="The original poster’s listener" src={staticFile('assets/listen-to-code/listener.png')} premountFor={fps} style={{position: 'absolute', left: 642, top: 657, width: 355, height: 355, objectFit: 'contain', opacity: interpolate(frame, [0.3 * fps, 1.2 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}/>
		<Interactive.Div name="Genuinely open" style={{position: 'absolute', left: 82, top: 921, fontSize: 35, fontWeight: 500, color: '#276d3e', opacity: interpolate(frame, [1.4 * fps, 2 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>{support}</Interactive.Div>
		<Interactive.Div name="Odd-e closing credit" style={{position: 'absolute', left: 82, top: 980, fontSize: 24, fontWeight: 500, letterSpacing: 1.8, opacity: interpolate(frame, [2 * fps, 2.5 * fps], [0, 0.8], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>ODD-E</Interactive.Div>
	</Stage>;
};

export const Beyond = Interactive.withSchema({Component: BeyondInner, componentName: '<Beyond>', schema: actSchema, wrapInSequence: true});
