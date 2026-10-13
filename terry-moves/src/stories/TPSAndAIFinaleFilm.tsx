import React from 'react';
import { Composition, Folder, Sequence, useVideoConfig } from 'remotion';
import { Paper } from '../tpsAndAi/Frame';
import { Agency, Closing, Cover, Entrust, Free, Improve, Respect } from '../tpsAndAiFinale/Scenes';
import { Cycle } from '../tpsAndAiFinale/Cycle';
import { EnglishAudio } from '../tpsAndAiFinale/EnglishAudio';
import { durationInFrames, film, sceneById, sceneFrames, startFrame } from '../tpsAndAiFinale/film';

export const FinaleFilm: React.FC = () => {
	const { fps } = useVideoConfig();
	return <Paper>
		<EnglishAudio />
		<Sequence name={sceneById('cover').heading} from={startFrame('cover')} durationInFrames={sceneFrames('cover')} premountFor={fps}><Cover /></Sequence>
		<Sequence name={sceneById('free').heading} from={startFrame('free')} durationInFrames={sceneFrames('free')} premountFor={fps}><Free /></Sequence>
		<Sequence name={sceneById('entrust').heading} from={startFrame('entrust')} durationInFrames={sceneFrames('entrust')} premountFor={fps}><Entrust /></Sequence>
		<Sequence name={sceneById('agency').heading} from={startFrame('agency')} durationInFrames={sceneFrames('agency')} premountFor={fps}><Agency /></Sequence>
		<Sequence name={sceneById('respect').heading} from={startFrame('respect')} durationInFrames={sceneFrames('respect')} premountFor={fps}><Respect /></Sequence>
		<Sequence name={sceneById('improve').heading} from={startFrame('improve')} durationInFrames={sceneFrames('improve')} premountFor={fps}><Improve /></Sequence>
		<Sequence name={sceneById('cycle').heading} from={startFrame('cycle')} durationInFrames={sceneFrames('cycle')} premountFor={fps}><Cycle /></Sequence>
		<Sequence name={sceneById('closing').heading} from={startFrame('closing')} durationInFrames={sceneFrames('closing')} premountFor={fps}><Closing /></Sequence>
	</Paper>;
};

export const TPSAndAIFinaleFilm: React.FC = () => <>
	<Composition id="TPSAndAIFinaleFilm" component={FinaleFilm} durationInFrames={durationInFrames} fps={film.fps} width={film.width} height={film.height} />
	<Folder name="TPS-finale-scenes">
		<Composition id="TPSFinaleCover" component={Cover} durationInFrames={sceneFrames('cover')} fps={film.fps} width={film.width} height={film.height} />
		<Composition id="TPSFinaleFree" component={Free} durationInFrames={sceneFrames('free')} fps={film.fps} width={film.width} height={film.height} />
		<Composition id="TPSFinaleEntrust" component={Entrust} durationInFrames={sceneFrames('entrust')} fps={film.fps} width={film.width} height={film.height} />
		<Composition id="TPSFinaleAgency" component={Agency} durationInFrames={sceneFrames('agency')} fps={film.fps} width={film.width} height={film.height} />
		<Composition id="TPSFinaleRespect" component={Respect} durationInFrames={sceneFrames('respect')} fps={film.fps} width={film.width} height={film.height} />
		<Composition id="TPSFinaleImprove" component={Improve} durationInFrames={sceneFrames('improve')} fps={film.fps} width={film.width} height={film.height} />
		<Composition id="TPSFinaleCycle" component={Cycle} durationInFrames={sceneFrames('cycle')} fps={film.fps} width={film.width} height={film.height} />
		<Composition id="TPSFinaleClosing" component={Closing} durationInFrames={sceneFrames('closing')} fps={film.fps} width={film.width} height={film.height} />
	</Folder>
</>;
