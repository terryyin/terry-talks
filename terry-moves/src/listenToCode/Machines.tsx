import React from 'react';
import {Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {actSchema, type ActProps, Stage} from './Stage';
import {ScoreStaff} from './ScoreStaff';

const MachinesInner: React.FC<ActProps> = ({headline, support, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	return <Stage paper="#17251c" ink="#d2e6a6" style={style}>
		<Interactive.Div name="AI writes" style={{position: 'absolute', left: 80, top: 160, fontSize: 138, fontWeight: 600, letterSpacing: -6, lineHeight: 1.05, translate: interpolate(frame, [0, 0.4 * fps], ['-50px 0px', '0px 0px'], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1)}), opacity: interpolate(frame, [0, 0.22 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>{headline}</Interactive.Div>
		<Interactive.Div name="AI reviews" style={{position: 'absolute', left: 80, top: 326, fontSize: 138, fontWeight: 600, letterSpacing: -6, lineHeight: 1.05, translate: interpolate(frame, [0.8 * fps, 1.2 * fps], ['-50px 0px', '0px 0px'], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1)}), opacity: interpolate(frame, [0.8 * fps, 1 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>{support}</Interactive.Div>
		<ScoreStaff state="machine" color="#a8d571" startAt={7}/>
		<Interactive.Div name="Code stream" style={{position: 'absolute', left: -80, top: 571, display: 'flex', gap: 42, width: 1300, fontSize: 64, letterSpacing: 14, color: '#a8d571', opacity: 0.4, fontWeight: 400, translate: interpolate(frame, [0, 3 * fps], ['0px 0px', '-145px 0px'], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>{'{ }  ↗  [ ]  { }  ↗  [ ]'}</Interactive.Div>
		<svg width={1080} height={1080} viewBox="0 0 1080 1080" style={{position: 'absolute', inset: 0}}>
			<path d="M 80 910 H 1000" stroke="#a8d571" strokeWidth={2} opacity={0.2}/>
			<circle cx={interpolate(frame, [0, 3 * fps], [80, 1000])} cy={910} r={8} fill="#d2e6a6"/>
		</svg>
	</Stage>;
};

export const Machines = Interactive.withSchema({Component: MachinesInner, componentName: '<Machines>', schema: actSchema, wrapInSequence: true});
