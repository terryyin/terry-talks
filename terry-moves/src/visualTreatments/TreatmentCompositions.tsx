import React, { useMemo } from 'react';
import { Composition, useCurrentFrame } from 'remotion';
import { TypographyTreatment } from './typography/TypographyTreatment';
import { typographyTimeline, TypographyVersion, typographyV1 } from './typography/script';

const TypographySample: React.FC<{ version: TypographyVersion }> = ({ version }) => {
	const frame = useCurrentFrame();
	const sample = useMemo(() => typographyTimeline(version), [version]);
	return <TypographyTreatment pose={sample.poseAt(frame)} caption={sample.captionAt(frame)}/>;
};

const TypographyComposition: React.FC<{ version: TypographyVersion }> = ({ version }) => <Composition
	id={version.id}
	component={TypographySample}
	defaultProps={{ version }}
	durationInFrames={typographyTimeline(version).durationInFrames}
	fps={version.fps}
	width={1080}
	height={1080}
/>;

// Named treatment samples for the Problem Decomposition comparison.
export const VisualTreatmentCompositions: React.FC = () => <>
	<TypographyComposition version={typographyV1}/>
</>;
