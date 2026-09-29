import React from 'react';
import { AbsoluteFill, Audio, Composition, staticFile, useCurrentFrame } from 'remotion';
import { FPS } from '../storyImpact/film';
import { fullFilm } from '../storyImpact/fullFilm';
import { STAGE } from '../storyImpact/layout';
import { StoryImpactScene } from '../storyImpact/StoryImpactScene';
import { zhHantCaption } from '../storyImpact/zhHant';

// The full story-impact film: each frame draws the full timeline's pose, with
// Terry's English narration, recorded against this timeline.
export const EN_NARRATION = 'assets/audios/impact_en.m4a';

const FilmFrame: React.FC = () => {
	const frame = useCurrentFrame();
	return (
		<AbsoluteFill>
			<Audio src={staticFile(EN_NARRATION)} />
			<StoryImpactScene pose={fullFilm.poseAt(frame)} caption={fullFilm.captionAt(frame)} />
		</AbsoluteFill>
	);
};

// The same film with Traditional Chinese subtitles and Terry's Chinese
// narration, recorded against this timeline; the picture stays English.
export const ZH_HANT_NARRATION = 'assets/audios/impact_zh.m4a';

const ZhHantFilmFrame: React.FC = () => {
	const frame = useCurrentFrame();
	return (
		<AbsoluteFill>
			<Audio src={staticFile(ZH_HANT_NARRATION)} />
			<StoryImpactScene pose={fullFilm.poseAt(frame)} caption={zhHantCaption(fullFilm.captionAt(frame))} />
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

export const StoryImpactFilmZhHant: React.FC = () => (
	<Composition
		id="StoryImpactFilmZhHant"
		component={ZhHantFilmFrame}
		durationInFrames={fullFilm.durationInFrames}
		fps={FPS}
		width={STAGE.width}
		height={STAGE.height}
	/>
);
