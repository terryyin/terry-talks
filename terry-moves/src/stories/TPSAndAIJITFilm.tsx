import React from 'react';
import { Audio, Composition, Folder, Sequence, staticFile, useVideoConfig } from 'remotion';
import { Paper } from '../tpsAndAi/Frame';
import { Closing, Integration } from '../tpsAndAiJit/Integration';
import { Feedback, Hook, House, Pull, Resourceful } from '../tpsAndAiJit/Scenes';
import { durationInFrames, film, sceneById, sceneFrames, startFrame } from '../tpsAndAiJit/film';

export const JITFilm: React.FC = () => {
	const { fps } = useVideoConfig();
	return <Paper>
		<Audio src={staticFile('assets/tps-and-ai/score.wav')} volume={0.75} />
		<Sequence name={sceneById('hook').label} from={startFrame('hook')} durationInFrames={sceneFrames('hook')} premountFor={fps}><Hook /></Sequence>
		<Sequence name={sceneById('house').label} from={startFrame('house')} durationInFrames={sceneFrames('house')} premountFor={fps}><House /></Sequence>
		<Sequence name={sceneById('resourceful').label} from={startFrame('resourceful')} durationInFrames={sceneFrames('resourceful')} premountFor={fps}><Resourceful /></Sequence>
		<Sequence name={sceneById('pull').label} from={startFrame('pull')} durationInFrames={sceneFrames('pull')} premountFor={fps}><Pull /></Sequence>
		<Sequence name={sceneById('feedback').label} from={startFrame('feedback')} durationInFrames={sceneFrames('feedback')} premountFor={fps}><Feedback /></Sequence>
		<Sequence name={sceneById('integration').label} from={startFrame('integration')} durationInFrames={sceneFrames('integration')} premountFor={fps}><Integration /></Sequence>
		<Sequence name={sceneById('closing').label} from={startFrame('closing')} durationInFrames={sceneFrames('closing')} premountFor={fps}><Closing /></Sequence>
	</Paper>;
};

export const TPSAndAIJITFilm: React.FC = () => <>
	<Composition id="TPSAndAIJITFilm" component={JITFilm} durationInFrames={durationInFrames} fps={film.fps} width={film.width} height={film.height} />
	<Folder name="TPS-JIT-scenes">
		<Composition id="TPSJITHook" component={Hook} durationInFrames={sceneFrames('hook')} fps={film.fps} width={film.width} height={film.height} />
		<Composition id="TPSJITHouse" component={House} durationInFrames={sceneFrames('house')} fps={film.fps} width={film.width} height={film.height} />
		<Composition id="TPSJITResourceful" component={Resourceful} durationInFrames={sceneFrames('resourceful')} fps={film.fps} width={film.width} height={film.height} />
		<Composition id="TPSJITPull" component={Pull} durationInFrames={sceneFrames('pull')} fps={film.fps} width={film.width} height={film.height} />
		<Composition id="TPSJITFeedback" component={Feedback} durationInFrames={sceneFrames('feedback')} fps={film.fps} width={film.width} height={film.height} />
		<Composition id="TPSJITIntegration" component={Integration} durationInFrames={sceneFrames('integration')} fps={film.fps} width={film.width} height={film.height} />
		<Composition id="TPSJITClosing" component={Closing} durationInFrames={sceneFrames('closing')} fps={film.fps} width={film.width} height={film.height} />
	</Folder>
</>;
