import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';

type ScoreStaffProps = {
	readonly state: 'listening' | 'machine' | 'question';
	readonly color: string;
	readonly startAt?: number;
	readonly opacity?: number;
};

// These five lines are one visual instrument, rather than five editable clips.
export const ScoreStaff: React.FC<ScoreStaffProps> = ({state, color, startAt = 0, opacity = 1}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const time = frame / fps + startAt;
	const machine = state === 'machine';
	return <svg viewBox="0 0 1080 1080" width={1080} height={1080} style={{position: 'absolute', inset: 0, overflow: 'visible', opacity}}>
		{Array.from({length: 5}, (_, line) => {
			const points = Array.from({length: 145}, (_, point) => {
				const x = point * 8 - 36;
				const wave = Math.sin(x / 190 + time * 0.65 + line * 0.22) * 34;
				const y = 717 + line * 26 + wave;
				return `${point === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
			}).join(' ');
			return <path key={line} d={points} fill="none" stroke={color} strokeWidth={4.4} strokeLinecap="round" opacity={0.63}/>;
		})}
		{Array.from({length: machine ? 18 : 7}, (_, note) => {
			const x = ((note * (machine ? 89 : 185) + time * (machine ? 160 : 44)) % 1400) - 150;
			const y = 717 + (note % 5) * 26 + Math.sin(x / 190 + time * 0.65 + (note % 5) * 0.22) * 34;
			return machine ? <g key={note} opacity={0.7}>
				<rect x={x - 18} y={y - 8} width={36} height={15} rx={2} fill={color}/>
				<path d={`M ${x + 18} ${y - 5} v -36 h 34`} stroke={color} strokeWidth={4} fill="none"/>
			</g> : <g key={note} opacity={0.74}>
				<ellipse cx={x} cy={y} rx={13} ry={8} fill={color} transform={`rotate(-18 ${x} ${y})`}/>
				<path d={`M ${x + 11} ${y} v -47`} stroke={color} strokeWidth={4.5} fill="none"/>
			</g>;
		})}
	</svg>;
};
