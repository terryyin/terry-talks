import React from 'react';
import { Audio, Composition, Folder, Sequence, staticFile, useVideoConfig } from 'remotion';
import { Paper } from '../tpsAndAi/Frame';
import { Hook } from '../tpsAndAi/Hook';
import { Burden } from '../tpsAndAi/Burden';
import { Rule } from '../tpsAndAi/Rule';
import { Freedom } from '../tpsAndAi/Freedom';
import { Need } from '../tpsAndAi/Need';
import { Feedback } from '../tpsAndAi/Feedback';
import { Trust } from '../tpsAndAi/Trust';
import { Closing } from '../tpsAndAi/Closing';
import { durationInFrames, film, sceneFrames, startFrame } from '../tpsAndAi/film';

export const TPSFilm: React.FC = () => {
	const { fps } = useVideoConfig();
	return <Paper>
		<Audio src={staticFile('assets/tps-and-ai/score.wav')} volume={0.75} />
		<Sequence name="The test: more free?" from={startFrame('hook')} durationInFrames={sceneFrames('hook')} premountFor={fps}><Hook /></Sequence>
		<Sequence name="Output becomes a burden" from={startFrame('burden')} durationInFrames={sceneFrames('burden')} premountFor={fps}><Burden /></Sequence>
		<Sequence name="Learning becomes a real stop" from={startFrame('rule')} durationInFrames={sceneFrames('rule')} premountFor={fps}><Rule /></Sequence>
		<Sequence name="Attention returns to discovery" from={startFrame('freedom')} durationInFrames={sceneFrames('freedom')} premountFor={fps}><Freedom /></Sequence>
		<Sequence name="One useful customer result" from={startFrame('need')} durationInFrames={sceneFrames('need')} premountFor={fps}><Need /></Sequence>
		<Sequence name="Feedback changes the next need" from={startFrame('feedback')} durationInFrames={sceneFrames('feedback')} premountFor={fps}><Feedback /></Sequence>
		<Sequence name="Responsibility and support" from={startFrame('trust')} durationInFrames={sceneFrames('trust')} premountFor={fps}><Trust /></Sequence>
		<Sequence name="Freedom and Trust: closing" from={startFrame('closing')} durationInFrames={sceneFrames('closing')} premountFor={fps}><Closing /></Sequence>
	</Paper>;
};

export const TPSAndAIFilm: React.FC = () => <>
	<Composition id="TPSAndAIFilm" component={TPSFilm} durationInFrames={durationInFrames} fps={film.fps} width={film.width} height={film.height} />
	<Folder name="TPS-scenes">
		<Composition id="TPSHook" component={Hook} durationInFrames={sceneFrames('hook')} fps={film.fps} width={film.width} height={film.height} />
		<Composition id="TPSBurden" component={Burden} durationInFrames={sceneFrames('burden')} fps={film.fps} width={film.width} height={film.height} />
		<Composition id="TPSRule" component={Rule} durationInFrames={sceneFrames('rule')} fps={film.fps} width={film.width} height={film.height} />
		<Composition id="TPSFreedom" component={Freedom} durationInFrames={sceneFrames('freedom')} fps={film.fps} width={film.width} height={film.height} />
		<Composition id="TPSNeed" component={Need} durationInFrames={sceneFrames('need')} fps={film.fps} width={film.width} height={film.height} />
		<Composition id="TPSFeedback" component={Feedback} durationInFrames={sceneFrames('feedback')} fps={film.fps} width={film.width} height={film.height} />
		<Composition id="TPSTrust" component={Trust} durationInFrames={sceneFrames('trust')} fps={film.fps} width={film.width} height={film.height} />
		<Composition id="TPSClosing" component={Closing} durationInFrames={sceneFrames('closing')} fps={film.fps} width={film.width} height={film.height} />
	</Folder>
</>;
