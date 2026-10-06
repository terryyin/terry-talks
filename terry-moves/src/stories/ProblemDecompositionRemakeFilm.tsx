import React from 'react';
import { Audio, Composition, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { Cover, Paper } from '../problemDecompositionRemake/Frame';
import { Distinction, Example } from '../problemDecompositionRemake/Distinction';
import { Freedom, Premises, Value } from '../problemDecompositionRemake/Goals';
import { Commits, Flow, ThreeVs, Whole } from '../problemDecompositionRemake/Principles';
import { film, FPS, sceneFrames, startFrame } from '../problemDecompositionRemake/film';

type Props = { title: string; captions: boolean };
export const Remake: React.FC<Props> = ({ title, captions }) => {
	const frame = useCurrentFrame();
	return <Paper>
		<Audio src={staticFile('assets/problem-decomposition-remake/narration.wav')}/>
			<Sequence name="1 · Distinction: discover an answer" from={startFrame('distinction')} durationInFrames={sceneFrames('distinction')}><Distinction captions={captions}/></Sequence>
			<Sequence name="1 · Customer example: avoid wasted trips" from={startFrame('example')} durationInFrames={sceneFrames('example')}><Example captions={captions}/></Sequence>
			<Sequence name="2 · Premises: smaller needs, uncertain answers" from={startFrame('premises')} durationInFrames={sceneFrames('premises')}><Premises captions={captions}/></Sequence>
			<Sequence name="3 · Goal: useful value and feedback" from={startFrame('value')} durationInFrames={sceneFrames('value')}><Value captions={captions}/></Sequence>
			<Sequence name="3 · Goal: change direction without waste" from={startFrame('freedom')} durationInFrames={sceneFrames('freedom')}><Freedom captions={captions}/></Sequence>
			<Sequence name="4 · Valuable, Visible, Vertical" from={startFrame('threeVs')} durationInFrames={sceneFrames('threeVs')}><ThreeVs captions={captions}/></Sequence>
			<Sequence name="4 · One-piece flow" from={startFrame('flow')} durationInFrames={sceneFrames('flow')}><Flow captions={captions}/></Sequence>
			<Sequence name="4 · Every commit is your last commit" from={startFrame('commits')} durationInFrames={sceneFrames('commits')}><Commits captions={captions}/></Sequence>
			<Sequence name="4 · Whole product and option value" from={startFrame('whole')} durationInFrames={sceneFrames('whole')}><Whole captions={captions}/></Sequence>
			<Sequence name="Closing and cover" from={startFrame('end')} durationInFrames={sceneFrames('end')}><Cover title={title}/></Sequence>
		{frame < Math.round(film.coverDuration * FPS) && <Cover title={title}/>}
	</Paper>;
};
export const ProblemDecompositionRemakeFilm: React.FC = () => <Composition id="ProblemDecompositionRemakeFilm" component={Remake} defaultProps={{ title: 'Problem decomposition', captions: true }} durationInFrames={film.durationInFrames} fps={FPS} width={film.width} height={film.height}/>;
