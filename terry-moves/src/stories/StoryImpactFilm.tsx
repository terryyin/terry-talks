import React from 'react';
import { AbsoluteFill, Audio, Composition, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { FPS } from '../storyImpact/film';
import { fullFilm } from '../storyImpact/fullFilm';
import { STAGE } from '../storyImpact/layout';
import { StoryImpactScene } from '../storyImpact/StoryImpactScene';
import { zhHantCaption } from '../storyImpact/zhHant';
import { FONT_FAMILY } from '../storyImpact/layout';
import { palette } from '../storyImpact/scene';
import zhHantRecording from '../storyImpact/zhHantRecording.json';

// Hold a complete title frame before the animated opening, so the first
// frame also serves as the film's cover.
export const COVER_FRAMES = Math.round(1.2 * FPS);
export const COVER_SOURCE_FRAME = 60;
export const EN_NARRATION = 'assets/story-impact/narration-en.mp3';

export const releaseFrame = (frame: number): number => frame < COVER_FRAMES ? COVER_SOURCE_FRAME : frame - COVER_FRAMES;

const NarrationCredit: React.FC<{ frame: number }> = ({ frame }) => {
	const credit = fullFilm.poseAt(frame).endCard?.credit ?? 0;
	return credit > 0 ? (
		<div style={{ position: 'absolute', top: 850, width: '100%', textAlign: 'center', fontFamily: FONT_FAMILY, fontSize: 22, color: palette.ink, opacity: credit * 0.7 }}>
			CEDAR · AI-GENERATED NARRATION
		</div>
	) : null;
};

const FilmFrame: React.FC = () => {
	const frame = releaseFrame(useCurrentFrame());
	return (
		<AbsoluteFill>
			<Sequence from={COVER_FRAMES} layout="none">
				<Audio src={staticFile(EN_NARRATION)} />
			</Sequence>
			<StoryImpactScene pose={fullFilm.poseAt(frame)} caption={fullFilm.captionAt(frame)} />
			<NarrationCredit frame={frame} />
		</AbsoluteFill>
	);
};

// The Chinese recording follows its original beat timings. Retiming those
// segments keeps it in sync when the shared picture's pace changes.
export const ZH_HANT_NARRATION = 'assets/audios/impact_zh.m4a';

const ChineseNarration: React.FC = () => (
	<>
		{fullFilm.beats.map((b) => {
			const original = zhHantRecording.find((recorded) => recorded.name === b.name);
			if (!original) throw new Error(`Chinese recording has no beat named ${b.name}`);
			const current = fullFilm.beatRange(b.name);
			return (
				<Sequence key={b.name} from={COVER_FRAMES + current.from} durationInFrames={current.durationInFrames} layout="none">
					<Audio src={staticFile(ZH_HANT_NARRATION)} trimBefore={original.from} trimAfter={original.from + original.durationInFrames} playbackRate={original.durationInFrames / current.durationInFrames} />
				</Sequence>
			);
		})}
	</>
);

const ZhHantFilmFrame: React.FC = () => {
	const frame = releaseFrame(useCurrentFrame());
	return (
		<AbsoluteFill>
			<ChineseNarration />
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
