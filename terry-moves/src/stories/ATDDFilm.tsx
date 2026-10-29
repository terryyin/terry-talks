import React from 'react';
import { AbsoluteFill, Audio, Composition, staticFile, useCurrentFrame } from 'remotion';
import { durationInFrames, FPS, NARRATION, SCORE } from '../atdd/film';
import { ATDDScene, DiagramBoard } from '../atdd/Scene';
import { STAGE } from '../storyImpact/layout';
import { AnimatedOddeLogo } from '../parts/AnimatedOddeLogo';
import { ATDDLanguage, ATDDLanguageProvider, NARRATION_ZH_HANT } from '../atdd/language';

const FilmFrame: React.FC<{ language?: ATDDLanguage }> = ({ language = 'en' }) => {
	const seconds = useCurrentFrame() / FPS;
	return <ATDDLanguageProvider language={language}><AbsoluteFill><Audio src={staticFile(language === 'zh-Hant' ? NARRATION_ZH_HANT : NARRATION)} /><Audio src={staticFile(SCORE)} /><ATDDScene seconds={seconds} /><AnimatedOddeLogo left={940} top={8} width={120} /></AbsoluteFill></ATDDLanguageProvider>;
};
const FilmFrameZhHant: React.FC = () => <FilmFrame language="zh-Hant" />;
const TreeBoard: React.FC = () => <DiagramBoard diagram="tree" />;
const CircleBoard: React.FC = () => <DiagramBoard diagram="circle" />;

export const ATDDFilm: React.FC = () => <>
	<Composition id="ATDDFilm" component={FilmFrame} durationInFrames={durationInFrames} fps={FPS} width={STAGE.width} height={STAGE.height} />
	<Composition id="ATDDFilmZhHant" component={FilmFrameZhHant} durationInFrames={durationInFrames} fps={FPS} width={STAGE.width} height={STAGE.height} />
	<Composition id="ATDDSolutionTree" component={TreeBoard} durationInFrames={1} fps={FPS} width={STAGE.width} height={STAGE.height} />
	<Composition id="ATDDScenarioCycle" component={CircleBoard} durationInFrames={1} fps={FPS} width={STAGE.width} height={STAGE.height} />
</>;
