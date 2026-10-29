import React from 'react';
import {Audio} from '@remotion/media';
import {Composition, Folder, staticFile, useVideoConfig} from 'remotion';
import {AddedGuard} from '../pitfallsScope/AddedGuard';
import {ClosingQuestion} from '../pitfallsScope/ClosingQuestion';
import {DemoConsequence} from '../pitfallsScope/DemoConsequence';
import {DeveloperInterpretation} from '../pitfallsScope/DeveloperInterpretation';
import {OwnerIntent} from '../pitfallsScope/OwnerIntent';
import {RefinementOpening} from '../pitfallsScope/RefinementOpening';
import {ScopeCaptions} from '../pitfallsScope/Captions';

export const ScopeRestriction: React.FC = () => {
	const {fps} = useVideoConfig();
	return <>
		<Audio name="Dialogue, room tone and software cues" src={staticFile('assets/pitfalls-scope/mix-v3.wav')} premountFor={fps}/>
		<RefinementOpening name="01 — An example becomes a product limit" from={0} durationInFrames={2.4 * fps} premountFor={fps} headline={'An example became\na product limit.'}/>
		<OwnerIntent name="02 — A small story for early feedback" from={2.4 * fps} durationInFrames={6.6 * fps} premountFor={fps} headline="Tag a few contacts." support="For example, three."/>
		<DeveloperInterpretation name="03 — The developer adds a maximum" from={9 * fps} durationInFrames={3.6 * fps} premountFor={fps} headline="Enforce a maximum of 3 contacts."/>
		<AddedGuard name="04 — The maximum becomes a rejection rule" from={12.6 * fps} durationInFrames={2.9 * fps} premountFor={fps} headline="Now four is rejected."/>
		<DemoConsequence name="05 — The blocked demo and the clarification" from={15.5 * fps} durationInFrames={7.5 * fps} premountFor={fps} headline="Tag contacts" support="Maximum 3 contacts"/>
		<ClosingQuestion name="06 — Clarify delivery scope and rejection rules" from={23 * fps} durationInFrames={7 * fps} premountFor={fps} headline="What must work?" support="What must be blocked?"/>
		<ScopeCaptions/>
	</>;
};

export const ScopeRestrictionFilm: React.FC = () => <>
	<Composition id="ScopeRestrictionFilm" component={ScopeRestriction} durationInFrames={900} fps={30} width={1080} height={1920}/>
	<Folder name="AI-Pitfalls-Scope-Scenes">
		<Composition id="ScopeRefinementOpening" component={RefinementOpening} durationInFrames={72} fps={30} width={1080} height={1920} defaultProps={{headline: 'An example became\na product limit.'}}/>
		<Composition id="ScopeOwnerIntent" component={OwnerIntent} durationInFrames={198} fps={30} width={1080} height={1920} defaultProps={{headline: 'Tag a few contacts.', support: 'For example, three.'}}/>
		<Composition id="ScopeDeveloperInterpretation" component={DeveloperInterpretation} durationInFrames={108} fps={30} width={1080} height={1920} defaultProps={{headline: 'Enforce a maximum of 3 contacts.'}}/>
		<Composition id="ScopeAddedGuard" component={AddedGuard} durationInFrames={87} fps={30} width={1080} height={1920} defaultProps={{headline: 'Now four is rejected.'}}/>
		<Composition id="ScopeDemoConsequence" component={DemoConsequence} durationInFrames={225} fps={30} width={1080} height={1920} defaultProps={{headline: 'Tag contacts', support: 'Maximum 3 contacts'}}/>
		<Composition id="ScopeClosingQuestion" component={ClosingQuestion} durationInFrames={210} fps={30} width={1080} height={1920} defaultProps={{headline: 'What must work?', support: 'What must be blocked?'}}/>
	</Folder>
</>;
