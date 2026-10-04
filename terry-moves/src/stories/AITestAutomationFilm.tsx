import React from 'react';
import { AbsoluteFill, Audio, Composition, staticFile, useCurrentFrame } from 'remotion';
import { durationInFrames, FPS, MIX, STAGE } from '../aiTestAutomation/film';
import { AITestAutomationScene } from '../aiTestAutomation/Scene';

const FilmFrame: React.FC<{ narrationOnly: boolean }> = ({ narrationOnly }) => <AbsoluteFill><Audio src={staticFile(narrationOnly ? 'assets/ai-test-automation/narration.wav' : MIX)}/><AITestAutomationScene seconds={useCurrentFrame() / FPS}/></AbsoluteFill>;
export const AITestAutomationFilm: React.FC = () => <Composition id="AITestAutomationFilm" component={FilmFrame} defaultProps={{ narrationOnly: false }} durationInFrames={durationInFrames} fps={FPS} width={STAGE.width} height={STAGE.height}/>;
