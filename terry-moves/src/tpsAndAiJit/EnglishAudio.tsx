import React from 'react';
import { Audio, interpolate, staticFile, useVideoConfig } from 'remotion';
import performance from '../../../TPS and AI/JIT/narration-en.json';

// Speech stays at its mastered level. The retained score breathes in its gaps.
export const musicVolumeAt = (seconds: number): number => Math.min(0.55, ...performance.slots.map(({ speechStart, speechEnd }) =>
	interpolate(seconds, [speechStart - 0.18, speechStart, speechEnd, speechEnd + 0.4], [0.55, 0.25, 0.25, 0.55], {
		extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
	})));

export const EnglishAudio: React.FC = () => {
	const { fps } = useVideoConfig();
	return <>
		<Audio src={staticFile('assets/tps-and-ai/score.wav')} volume={(frame) => musicVolumeAt(frame / fps)} />
		<Audio src={staticFile('assets/tps-and-ai-jit/narration-en.wav')} />
	</>;
};
