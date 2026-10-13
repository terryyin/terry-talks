import React from 'react';
import { Audio, staticFile, useVideoConfig } from 'remotion';
import performance from '../../../TPS and AI/Finale/narration-en.json';
import { speechScoreVolumeAt } from '../tpsAndAi/score';

export const EnglishAudio: React.FC = () => {
	const { fps } = useVideoConfig();
	return <>
		<Audio src={staticFile('assets/tps-and-ai/score.wav')} volume={(frame) => speechScoreVolumeAt(frame / fps, performance.slots)} />
		<Audio src={staticFile('assets/tps-and-ai-finale/narration-en.wav')} />
	</>;
};
