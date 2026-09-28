import React from 'react';
import { AbsoluteFill, Composition, useCurrentFrame } from 'remotion';
import { FPS } from '../storyImpact/film';
import { fullFilm } from '../storyImpact/fullFilm';
import { STAGE } from '../storyImpact/layout';
import { StoryImpactScene } from '../storyImpact/StoryImpactScene';

// The full story-impact film: each frame draws the full timeline's pose.
const FilmFrame: React.FC = () => {
	const frame = useCurrentFrame();
	return (
		<AbsoluteFill>
			<StoryImpactScene pose={fullFilm.poseAt(frame)} caption={fullFilm.captionAt(frame)} />
		</AbsoluteFill>
	);
};

export const StoryImpactFilm: React.FC = () => (
	<Composition
		id="StoryImpactFilm"
		component={FilmFrame}
		durationInFrames={fullFilm.durationInFrames}
		fps={FPS}
		width={STAGE.width}
		height={STAGE.height}
	/>
);
