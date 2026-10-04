import React from 'react';
import { AbsoluteFill, Audio, Composition, staticFile, useCurrentFrame } from 'remotion';
import { durationInFrames, FPS, NARRATION, STAGE } from '../aiTestAutomation/film';
import { AITestAutomationScene } from '../aiTestAutomation/Scene';

const FilmFrame: React.FC = () => <AbsoluteFill><Audio src={staticFile(NARRATION)}/><AITestAutomationScene seconds={useCurrentFrame() / FPS}/></AbsoluteFill>;
export const AITestAutomationFilm: React.FC = () => <Composition id="AITestAutomationFilm" component={FilmFrame} durationInFrames={durationInFrames} fps={FPS} width={STAGE.width} height={STAGE.height}/>;
