import React from 'react';
import {Composition, Folder, useVideoConfig} from 'remotion';
import {OpeningHook} from '../pitfallsNegation/OpeningHook';

const openingHeadline = 'Removing a rule is not\nrequiring its opposite.';

export const RuleNegation: React.FC = () => {
	const {fps} = useVideoConfig();
	return <>
		<OpeningHook name="01 — Removing a rule is not requiring its opposite" from={0} durationInFrames={900} premountFor={fps} headline={openingHeadline}/>
	</>;
};

export const RuleNegationFilm: React.FC = () => <>
	<Composition id="RuleNegationFilm" component={RuleNegation} durationInFrames={900} fps={30} width={1080} height={1920}/>
	<Folder name="AI-Pitfalls-Negation-Scenes">
		<Composition id="NegationOpeningHook" component={OpeningHook} durationInFrames={900} fps={30} width={1080} height={1920} defaultProps={{headline: openingHeadline}}/>
	</Folder>
</>;
