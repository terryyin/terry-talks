import React from 'react';
import {Audio} from '@remotion/media';
import {Composition, Folder, staticFile, useVideoConfig} from 'remotion';
import {AssistantAbsence} from '../pitfallsNegation/AssistantAbsence';
import {NegationCaptions} from '../pitfallsNegation/Captions';
import {CorrectiveClose} from '../pitfallsNegation/CorrectiveClose';
import {HistoryCost} from '../pitfallsNegation/HistoryCost';
import {HoldingsBefore} from '../pitfallsNegation/HoldingsBefore';
import {IntendedChange} from '../pitfallsNegation/IntendedChange';
import {OpeningHook} from '../pitfallsNegation/OpeningHook';

const openingHeadline = 'Removing a rule is not\nrequiring its opposite.';
const holdingsBeforeHeadline = 'Connected + Entry';
const holdingsBeforeSupport = 'Drop the entry-started check.';
const intendedHeadline = 'Connected';
const intendedSupport = 'Refresh on a schedule.';
const assistantHeadline = 'Done. Gate removed.';
const historyHeadline = 'History still occupies the suite.';
const closeHeadline = 'Describe what is true now.';
const closeSupport = 'Keep checks that protect current behavior.\nRetire what only remembers the old rule.';

export const RuleNegation: React.FC = () => {
	const {fps} = useVideoConfig();
	return <>
		<Audio name="Dialogue, room tone and software cues" src={staticFile('assets/pitfalls-negation/mix-v1.wav')} premountFor={fps}/>
		<OpeningHook name="01 — Removing a rule is not requiring its opposite" from={0} durationInFrames={2.5 * fps} premountFor={fps} headline={openingHeadline}/>
		<HoldingsBefore name="02 — Holdings refresh before" from={2.5 * fps} durationInFrames={3 * fps} premountFor={fps} headline={holdingsBeforeHeadline} support={holdingsBeforeSupport}/>
		<IntendedChange name="03 — Connected accounts refresh on a schedule" from={5.5 * fps} durationInFrames={4 * fps} premountFor={fps} headline={intendedHeadline} support={intendedSupport}/>
		<AssistantAbsence name="04 — Gate removed, absence follow-through added" from={9.5 * fps} durationInFrames={5 * fps} premountFor={fps} headline={assistantHeadline}/>
		<HistoryCost name="05 — History still occupies the suite" from={14.5 * fps} durationInFrames={4.5 * fps} premountFor={fps} headline={historyHeadline}/>
		<CorrectiveClose name="06 — Describe what is true now" from={19 * fps} durationInFrames={11 * fps} premountFor={fps} headline={closeHeadline} support={closeSupport}/>
		<NegationCaptions/>
	</>;
};

export const RuleNegationFilm: React.FC = () => <>
	<Composition id="RuleNegationFilm" component={RuleNegation} durationInFrames={900} fps={30} width={1080} height={1920}/>
	<Folder name="AI-Pitfalls-Negation-Scenes">
		<Composition id="NegationOpeningHook" component={OpeningHook} durationInFrames={75} fps={30} width={1080} height={1920} defaultProps={{headline: openingHeadline}}/>
		<Composition id="NegationHoldingsBefore" component={HoldingsBefore} durationInFrames={90} fps={30} width={1080} height={1920} defaultProps={{headline: holdingsBeforeHeadline, support: holdingsBeforeSupport}}/>
		<Composition id="NegationIntendedChange" component={IntendedChange} durationInFrames={120} fps={30} width={1080} height={1920} defaultProps={{headline: intendedHeadline, support: intendedSupport}}/>
		<Composition id="NegationAssistantAbsence" component={AssistantAbsence} durationInFrames={150} fps={30} width={1080} height={1920} defaultProps={{headline: assistantHeadline}}/>
		<Composition id="NegationHistoryCost" component={HistoryCost} durationInFrames={135} fps={30} width={1080} height={1920} defaultProps={{headline: historyHeadline}}/>
		<Composition id="NegationCorrectiveClose" component={CorrectiveClose} durationInFrames={330} fps={30} width={1080} height={1920} defaultProps={{headline: closeHeadline, support: closeSupport}}/>
	</Folder>
</>;
