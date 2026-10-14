import React from 'react';
import { Audio } from '@remotion/media';
import { staticFile, useVideoConfig } from 'remotion';

export const Soundtrack: React.FC = () => {
	const { fps } = useVideoConfig();
	return <>
		<Audio name="Cedar — AI-generated narration" src={staticFile('assets/see-do-feedback/narration-en.wav')} durationInFrames={30 * fps} premountFor={fps} volume={1} />
		<Audio name="Original score — a human beginning" src={staticFile('assets/see-do-feedback/score.wav')} durationInFrames={30 * fps} premountFor={fps} volume={1} />
	</>;
};
