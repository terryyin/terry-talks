import React from 'react';
import { AbsoluteFill, Composition, useCurrentFrame } from 'remotion';
import { captionAt, filmDurationInFrames, FPS, poseAt } from '../storyImpact/film';
import { STAGE } from '../storyImpact/layout';
import { StoryImpactScene } from '../storyImpact/StoryImpactScene';

// One story's journey as a film: each frame draws the timeline's pose.
const OneSplashFrame: React.FC = () => {
	const frame = useCurrentFrame();
	return (
		<AbsoluteFill>
			<StoryImpactScene pose={poseAt(frame)} caption={captionAt(frame)} />
		</AbsoluteFill>
	);
};

export const StoryImpactOneSplash: React.FC = () => (
	<Composition
		id="StoryImpactOneSplash"
		component={OneSplashFrame}
		durationInFrames={filmDurationInFrames}
		fps={FPS}
		width={STAGE.width}
		height={STAGE.height}
	/>
);
