import React from 'react';
import { Audio, staticFile, useVideoConfig } from 'remotion';
import performance from '../../../TPS and AI/JIT/narration-en.json';
import { speechScoreVolumeAt } from '../tpsAndAi/score';

// Speech stays at its mastered level. The retained score breathes in its gaps.
export const musicVolumeAt = (seconds: number): number => speechScoreVolumeAt(seconds, performance.slots);

export const EnglishAudio: React.FC = () => {
	const { fps } = useVideoConfig();
	return <>
		<Audio src={staticFile('assets/tps-and-ai/score.wav')} volume={(frame) => musicVolumeAt(frame / fps)} />
		<Audio src={staticFile('assets/tps-and-ai-jit/narration-en.wav')} />
	</>;
};
