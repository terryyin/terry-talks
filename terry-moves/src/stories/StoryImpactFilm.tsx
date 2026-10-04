import React from 'react';
import { AbsoluteFill, Composition, useCurrentFrame } from 'remotion';
import { FPS } from '../storyImpact/film';
import { fullFilm } from '../storyImpact/fullFilm';
import { STAGE } from '../storyImpact/layout';
import { StoryImpactScene } from '../storyImpact/StoryImpactScene';
import { zhHantCaption } from '../storyImpact/zhHant';
import { RecordedNarration } from '../storyImpact/RecordedNarration';

// Hold a complete title frame before the animated opening, so the first
// frame also serves as the film's cover.
export const COVER_FRAMES = Math.round(1.2 * FPS);
export const COVER_SOURCE_FRAME = 60;
export const EN_NARRATION = 'assets/story-impact/narration-en-cleaned.m4a';

export const releaseFrame = (frame: number): number => frame < COVER_FRAMES ? COVER_SOURCE_FRAME : frame - COVER_FRAMES;

const FilmFrame: React.FC = () => {
	const frame = releaseFrame(useCurrentFrame());
	return (
		<AbsoluteFill>
			<RecordedNarration src={EN_NARRATION} from={COVER_FRAMES} />
			<StoryImpactScene pose={fullFilm.poseAt(frame)} caption={fullFilm.captionAt(frame)} />
		</AbsoluteFill>
	);
};

// The Chinese recording follows its original beat timings. Retiming those
// segments keeps it in sync when the shared picture's pace changes.
export const ZH_HANT_NARRATION = 'assets/audios/impact_zh.m4a';

const ZhHantFilmFrame: React.FC = () => {
	const frame = releaseFrame(useCurrentFrame());
	return (
		<AbsoluteFill>
			<RecordedNarration src={ZH_HANT_NARRATION} from={COVER_FRAMES} />
			<StoryImpactScene pose={fullFilm.poseAt(frame)} caption={zhHantCaption(fullFilm.captionAt(frame))} />
		</AbsoluteFill>
	);
};

export const StoryImpactFilm: React.FC = () => (
	<Composition
		id="StoryImpactFilm"
		component={FilmFrame}
		durationInFrames={COVER_FRAMES + fullFilm.durationInFrames}
		fps={FPS}
		width={STAGE.width}
		height={STAGE.height}
	/>
);

export const StoryImpactFilmZhHant: React.FC = () => (
	<Composition
		id="StoryImpactFilmZhHant"
		component={ZhHantFilmFrame}
		durationInFrames={COVER_FRAMES + fullFilm.durationInFrames}
		fps={FPS}
		width={STAGE.width}
		height={STAGE.height}
	/>
);
