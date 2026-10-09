import React from 'react';
import { Audio, Composition, Folder, Sequence, staticFile, useVideoConfig } from 'remotion';
import { Paper } from '../tpsAndAi/Frame';
import { Hook } from '../tpsAndAi/Hook';
import { Burden } from '../tpsAndAi/Burden';
import { House } from '../tpsAndAi/House';
import { Loom } from '../tpsAndAi/Loom';
import { Contrast } from '../tpsAndAi/Contrast';
import { Judgment } from '../tpsAndAi/Judgment';
import { Minimalism } from '../tpsAndAi/Minimalism';
import { Freedom } from '../tpsAndAi/Freedom';
import { Closing } from '../tpsAndAi/Closing';
import { durationInFrames, film, sceneFrames, startFrame } from '../tpsAndAi/film';
import { FilmLanguage, FilmLanguageProvider } from '../tpsAndAi/language';

export const TPSFilm: React.FC<{ language?: FilmLanguage }> = ({ language = 'en' }) => {
	const { fps } = useVideoConfig();
	return <FilmLanguageProvider language={language}><Paper>
		<Audio src={staticFile('assets/tps-and-ai/score.wav')} volume={0.75} />
		<Sequence name="Jidoka: Free to Move On" from={startFrame('hook')} durationInFrames={sceneFrames('hook')} premountFor={fps}><Hook /></Sequence>
		<Sequence name="Bound to yesterday" from={startFrame('burden')} durationInFrames={sceneFrames('burden')} premountFor={fps}><Burden /></Sequence>
		<Sequence name="Toyota Production System" from={startFrame('house')} durationInFrames={sceneFrames('house')} premountFor={fps}><House /></Sequence>
		<Sequence name="Human wisdom, built in" from={startFrame('loom')} durationInFrames={sceneFrames('loom')} premountFor={fps}><Loom /></Sequence>
		<Sequence name="Called by the stop" from={startFrame('contrast')} durationInFrames={sceneFrames('contrast')} premountFor={fps}><Contrast /></Sequence>
		<Sequence name="Solve. Preserve. Protect." from={startFrame('judgment')} durationInFrames={sceneFrames('judgment')} premountFor={fps}><Judgment /></Sequence>
		<Sequence name="Keep as little as possible" from={startFrame('minimalism')} durationInFrames={sceneFrames('minimalism')} premountFor={fps}><Minimalism /></Sequence>
		<Sequence name="Free to move on" from={startFrame('freedom')} durationInFrames={sceneFrames('freedom')} premountFor={fps}><Freedom /></Sequence>
		<Sequence name="Free to Move On" from={startFrame('closing')} durationInFrames={sceneFrames('closing')} premountFor={fps}><Closing /></Sequence>
	</Paper></FilmLanguageProvider>;
};

export const TPSFilmJa: React.FC = () => <TPSFilm language="ja" />;
export const TPSAndAIFilmJa: React.FC = () => <Composition id="TPSAndAIFilmJa" component={TPSFilmJa} durationInFrames={durationInFrames} fps={film.fps} width={film.width} height={film.height} />;

export const TPSAndAIFilm: React.FC = () => <>
	<Composition id="TPSAndAIFilm" component={TPSFilm} durationInFrames={durationInFrames} fps={film.fps} width={film.width} height={film.height} />
	<Folder name="TPS-scenes">
		<Composition id="TPSHook" component={Hook} durationInFrames={sceneFrames('hook')} fps={film.fps} width={film.width} height={film.height} />
		<Composition id="TPSBurden" component={Burden} durationInFrames={sceneFrames('burden')} fps={film.fps} width={film.width} height={film.height} />
		<Composition id="TPSHouse" component={House} durationInFrames={sceneFrames('house')} fps={film.fps} width={film.width} height={film.height} />
		<Composition id="TPSLoom" component={Loom} durationInFrames={sceneFrames('loom')} fps={film.fps} width={film.width} height={film.height} />
		<Composition id="TPSContrast" component={Contrast} durationInFrames={sceneFrames('contrast')} fps={film.fps} width={film.width} height={film.height} />
		<Composition id="TPSJudgment" component={Judgment} durationInFrames={sceneFrames('judgment')} fps={film.fps} width={film.width} height={film.height} />
		<Composition id="TPSMinimalism" component={Minimalism} durationInFrames={sceneFrames('minimalism')} fps={film.fps} width={film.width} height={film.height} />
		<Composition id="TPSFreedom" component={Freedom} durationInFrames={sceneFrames('freedom')} fps={film.fps} width={film.width} height={film.height} />
		<Composition id="TPSClosing" component={Closing} durationInFrames={sceneFrames('closing')} fps={film.fps} width={film.width} height={film.height} />
	</Folder>
</>;
