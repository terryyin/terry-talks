import React, { useMemo } from 'react';
import { Composition, useCurrentFrame } from 'remotion';
import { Timeline } from '../beatTimeline';
import { TreatmentVersion } from './brief';
import { CharacterTreatment } from './character/CharacterTreatment';
import { characterTimeline, characterV1 } from './character/script';
import { TypographyTreatment } from './typography/TypographyTreatment';
import { typographyTimeline, typographyV1 } from './typography/script';

type Picture<Pose> = React.FC<{ pose: Pose; caption: string }>;

// A treatment's timed versions, each a square composition showing the
// treatment's picture of the passage at the current frame.
const treatment = <Pose,>(timelineOf: (version: TreatmentVersion) => Timeline<Pose>, Picture: Picture<Pose>): React.FC<{ version: TreatmentVersion }> => {
	const Sample: React.FC<{ version: TreatmentVersion }> = ({ version }) => {
		const frame = useCurrentFrame();
		const sample = useMemo(() => timelineOf(version), [version]);
		return <Picture pose={sample.poseAt(frame)} caption={sample.captionAt(frame)}/>;
	};
	const TreatmentComposition: React.FC<{ version: TreatmentVersion }> = ({ version }) => <Composition
		id={version.id}
		component={Sample}
		defaultProps={{ version }}
		durationInFrames={timelineOf(version).durationInFrames}
		fps={version.fps}
		width={1080}
		height={1080}
	/>;
	return TreatmentComposition;
};

const Typography = treatment(typographyTimeline, TypographyTreatment);
const Character = treatment(characterTimeline, CharacterTreatment);

// Named treatment samples for the Problem Decomposition comparison.
export const VisualTreatmentCompositions: React.FC = () => <>
	<Typography version={typographyV1}/>
	<Character version={characterV1}/>
</>;
