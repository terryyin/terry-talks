import React from 'react';
import { Composition, Folder, Series, useVideoConfig } from 'remotion';
import { Cover } from '../seeDoFeedback/Cover';
import { Diagram } from '../seeDoFeedback/Diagram';
import { Closing } from '../seeDoFeedback/Closing';
import { Soundtrack } from '../seeDoFeedback/Soundtrack';

export const SeeDoFeedback: React.FC = () => {
	const { fps } = useVideoConfig();
	return <>
		<Soundtrack />
		<Series>
			<Series.Sequence name="Before we build, we must see" durationInFrames={2.5 * fps} premountFor={fps}><Cover /></Series.Sequence>
			<Series.Sequence name="Terry’s diagram — See → Do ↔ Feedback" durationInFrames={14.5 * fps} premountFor={fps}><Diagram /></Series.Sequence>
			<Series.Sequence name="Film and idea from Terry" durationInFrames={3 * fps} premountFor={fps}><Closing /></Series.Sequence>
		</Series>
	</>;
};

export const SeeDoFeedbackFilm: React.FC = () => <>
	<Composition id="SeeDoFeedbackFilm" component={SeeDoFeedback} durationInFrames={20 * 30} fps={30} width={1080} height={1080} />
	<Folder name="See-Do-Feedback-Scenes">
		<Composition id="SeeDoFeedbackCover" component={Cover} durationInFrames={2.5 * 30} fps={30} width={1080} height={1080} />
		<Composition id="SeeDoFeedbackDiagram" component={Diagram} durationInFrames={14.5 * 30} fps={30} width={1080} height={1080} />
		<Composition id="SeeDoFeedbackClosing" component={Closing} durationInFrames={3 * 30} fps={30} width={1080} height={1080} />
	</Folder>
</>;
