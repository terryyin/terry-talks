import React from 'react';
import { Composition, Folder, Series, useVideoConfig } from 'remotion';
import { Cover } from '../seeDoFeedback/Cover';
import { Gap } from '../seeDoFeedback/Gap';
import { Seeing } from '../seeDoFeedback/Seeing';
import { Loop } from '../seeDoFeedback/Loop';
import { Memory } from '../seeDoFeedback/Memory';
import { Need } from '../seeDoFeedback/Need';
import { Closing } from '../seeDoFeedback/Closing';
import { Soundtrack } from '../seeDoFeedback/Soundtrack';

export const SeeDoFeedback: React.FC = () => {
	const { fps } = useVideoConfig();
	return <>
		<Soundtrack />
		<Series>
			<Series.Sequence name="Cover — Before we build" durationInFrames={3 * fps} premountFor={fps}><Cover /></Series.Sequence>
			<Series.Sequence name="A human gap" durationInFrames={3.5 * fps} premountFor={fps}><Gap /></Series.Sequence>
			<Series.Sequence name="Seeing awakens passion" durationInFrames={3.5 * fps} premountFor={fps}><Seeing /></Series.Sequence>
			<Series.Sequence name="Do ↔ Feedback" durationInFrames={7 * fps} premountFor={fps}><Loop /></Series.Sequence>
			<Series.Sequence name="Product preserves learning" durationInFrames={3.5 * fps} premountFor={fps}><Memory /></Series.Sequence>
			<Series.Sequence name="Respond at the moment of need" durationInFrames={5.5 * fps} premountFor={fps}><Need /></Series.Sequence>
			<Series.Sequence name="Film and idea from Terry" durationInFrames={4 * fps} premountFor={fps}><Closing /></Series.Sequence>
		</Series>
	</>;
};

export const SeeDoFeedbackFilm: React.FC = () => <>
	<Composition id="SeeDoFeedbackFilm" component={SeeDoFeedback} durationInFrames={30 * 30} fps={30} width={1920} height={1080} />
	<Folder name="See-Do-Feedback-Scenes">
		<Composition id="SeeDoFeedbackCover" component={Cover} durationInFrames={3 * 30} fps={30} width={1920} height={1080} />
		<Composition id="SeeDoFeedbackGap" component={Gap} durationInFrames={3.5 * 30} fps={30} width={1920} height={1080} />
		<Composition id="SeeDoFeedbackSeeing" component={Seeing} durationInFrames={3.5 * 30} fps={30} width={1920} height={1080} />
		<Composition id="SeeDoFeedbackLoop" component={Loop} durationInFrames={7 * 30} fps={30} width={1920} height={1080} />
		<Composition id="SeeDoFeedbackMemory" component={Memory} durationInFrames={3.5 * 30} fps={30} width={1920} height={1080} />
		<Composition id="SeeDoFeedbackNeed" component={Need} durationInFrames={5.5 * 30} fps={30} width={1920} height={1080} />
		<Composition id="SeeDoFeedbackClosing" component={Closing} durationInFrames={4 * 30} fps={30} width={1920} height={1080} />
	</Folder>
</>;
