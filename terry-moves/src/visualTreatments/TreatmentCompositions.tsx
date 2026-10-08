import React from 'react';
import { Composition, useCurrentFrame } from 'remotion';
import { Timeline } from '../beatTimeline';
import { CharacterTreatment } from './character/CharacterTreatment';
import { TypographyTreatment } from './typography/TypographyTreatment';
import { TreatmentEntry, treatmentFrame, treatmentVersions } from './versions';

type Picture<Pose> = React.FC<{ pose: Pose; caption: string }>;

// A version's picture of the passage at the current frame.
const sampleOf = <Pose,>(sample: Timeline<Pose>, Picture: Picture<Pose>): React.FC => {
	const Sample: React.FC = () => {
		const frame = useCurrentFrame();
		return <Picture pose={sample.poseAt(frame)} caption={sample.captionAt(frame)}/>;
	};
	return Sample;
};

const pictureOf = (entry: TreatmentEntry): React.FC => entry.treatment === 'typography'
	? sampleOf(entry.timeline, TypographyTreatment)
	: sampleOf(entry.timeline, CharacterTreatment);

const samples = treatmentVersions.map((entry) => ({ entry, Sample: pictureOf(entry) }));

// Named treatment samples for the Problem Decomposition comparison, one square
// composition per registered version.
export const VisualTreatmentCompositions: React.FC = () => <>
	{samples.map(({ entry, Sample }) => <Composition
		key={entry.id}
		id={entry.id}
		component={Sample}
		durationInFrames={entry.timeline.durationInFrames}
		fps={entry.fps}
		width={treatmentFrame.width}
		height={treatmentFrame.height}
	/>)}
</>;
