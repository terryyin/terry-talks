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
import {MeaningShift} from '../pitfallsScope/MeaningShift';
import {OwnerClarification} from '../pitfallsScope/OwnerClarification';

export const ScopeRestriction: React.FC = () => {
	const {fps} = useVideoConfig();
	return <>
		<Audio name="Dialogue, room tone and software cues" src={staticFile('assets/pitfalls-scope/mix-v4.wav')} premountFor={fps}/>
		<RefinementOpening name="01 — She said three; he heard maximum" from={0} durationInFrames={2.4 * fps} premountFor={fps} headline={'She said three.\nHe heard maximum.'}/>
		<OwnerIntent name="02 — A small story for early feedback" from={2.4 * fps} durationInFrames={5.4 * fps} premountFor={fps} headline="Tag a few contacts." support="For early feedback."/>
		<DeveloperInterpretation name="03 — The example becomes a maximum" from={7.8 * fps} durationInFrames={4 * fps} premountFor={fps} headline="Enforce:" support="contacts"/>
		<AddedGuard name="04 — The assistant immediately complies" from={11.8 * fps} durationInFrames={2.6 * fps} premountFor={fps} headline="Done. Added:"/>
		<DemoConsequence name="05 — Selecting four, then failing to tag" from={14.4 * fps} durationInFrames={3.6 * fps} premountFor={fps} headline="Tag contacts" support="Maximum 3 contacts"/>
		<OwnerClarification name="06 — Three was an example, not a maximum" from={18 * fps} durationInFrames={4.2 * fps} premountFor={fps} headline="Tag a few contacts." support="For example, three."/>
		<ClosingQuestion name="07 — Say it clearly to people and AI" from={22.2 * fps} durationInFrames={7.8 * fps} premountFor={fps} headline="An example isn’t a maximum." support="Make that clear to people and AI."/>
		<MeaningShift name="The same three changes meaning" from={6 * fps} durationInFrames={5.8 * fps} premountFor={fps} headline="EXAMPLE" support="MAXIMUM"/>
		<ScopeCaptions/>
	</>;
};

export const ScopeRestrictionFilm: React.FC = () => <>
	<Composition id="ScopeRestrictionFilm" component={ScopeRestriction} durationInFrames={900} fps={30} width={1080} height={1920}/>
	<Folder name="AI-Pitfalls-Scope-Scenes">
		<Composition id="ScopeRefinementOpening" component={RefinementOpening} durationInFrames={72} fps={30} width={1080} height={1920} defaultProps={{headline: 'She said three.\nHe heard maximum.'}}/>
		<Composition id="ScopeOwnerIntent" component={OwnerIntent} durationInFrames={162} fps={30} width={1080} height={1920} defaultProps={{headline: 'Tag a few contacts.', support: 'For early feedback.'}}/>
		<Composition id="ScopeDeveloperInterpretation" component={DeveloperInterpretation} durationInFrames={120} fps={30} width={1080} height={1920} defaultProps={{headline: 'Enforce:', support: 'contacts'}}/>
		<Composition id="ScopeAddedGuard" component={AddedGuard} durationInFrames={78} fps={30} width={1080} height={1920} defaultProps={{headline: 'Done. Added:'}}/>
		<Composition id="ScopeDemoConsequence" component={DemoConsequence} durationInFrames={108} fps={30} width={1080} height={1920} defaultProps={{headline: 'Tag contacts', support: 'Maximum 3 contacts'}}/>
		<Composition id="ScopeOwnerClarification" component={OwnerClarification} durationInFrames={126} fps={30} width={1080} height={1920} defaultProps={{headline: 'Tag a few contacts.', support: 'For example, three.'}}/>
		<Composition id="ScopeClosingQuestion" component={ClosingQuestion} durationInFrames={234} fps={30} width={1080} height={1920} defaultProps={{headline: 'An example isn’t a maximum.', support: 'Make that clear to people and AI.'}}/>
		<Composition id="ScopeMeaningShift" component={MeaningShift} durationInFrames={174} fps={30} width={1080} height={1920} defaultProps={{headline: 'EXAMPLE', support: 'MAXIMUM'}}/>
	</Folder>
</>;
