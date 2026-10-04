import React from 'react';
import { AbsoluteFill, Audio, Composition, staticFile, useCurrentFrame } from 'remotion';
import { durationInFrames, FPS, MIX, presentationDurationInFrames, STAGE } from '../aiTestAutomation/film';
import { AITestAutomationScene } from '../aiTestAutomation/Scene';
import { AuthorCard, OddeCorner } from '../aiTestAutomation/Branding';

const FilmFrame: React.FC<{ narrationOnly: boolean }> = ({ narrationOnly }) => {
	const frame = useCurrentFrame();
	return <AbsoluteFill>
		<Audio src={staticFile(narrationOnly ? 'assets/ai-test-automation/narration.wav' : MIX)}/>
		{frame < durationInFrames ? <AITestAutomationScene seconds={frame / FPS}/> : <AuthorCard frame={frame}/>}
		<OddeCorner/>
	</AbsoluteFill>;
};
export const AITestAutomationFilm: React.FC = () => <Composition id="AITestAutomationFilm" component={FilmFrame} defaultProps={{ narrationOnly: false }} durationInFrames={presentationDurationInFrames} fps={FPS} width={STAGE.width} height={STAGE.height}/>;
