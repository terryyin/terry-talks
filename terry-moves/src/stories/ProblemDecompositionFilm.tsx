import React from 'react';
import { AbsoluteFill, Audio, Composition, staticFile, useCurrentFrame } from 'remotion';
import { durationInFrames, FPS, NARRATION, SCORE, STAGE } from '../problemDecomposition/film';
import { ProblemDecompositionScene } from '../problemDecomposition/Scene';

const FilmFrame: React.FC = () => {
	const seconds = useCurrentFrame() / FPS;
	return (
		<AbsoluteFill>
			<Audio src={staticFile(NARRATION)} />
			<Audio src={staticFile(SCORE)} volume={1} />
			<ProblemDecompositionScene seconds={seconds} />
		</AbsoluteFill>
	);
};

export const ProblemDecompositionFilm: React.FC = () => (
	<Composition id="ProblemDecompositionFilm" component={FilmFrame} durationInFrames={durationInFrames} fps={FPS} width={STAGE.width} height={STAGE.height} />
);
