import React from 'react';
import { AbsoluteFill, Composition, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { palette } from '../storyImpact/scene';
import { STAGE } from '../storyImpact/layout';
import { OddeLogo } from '../parts/OddeLogo';
import { OddeLogoInner } from '../parts/OddeLogoInner';
import { FlipCoin } from '../video_components/AutonomousComponents/FlipCoin';
import { CLIP_FRAMES, durationInFrames, FPS, filmPoseAt, OPEN_FRAMES } from '../featureTeams/film';
import { INSET, LOGO } from '../featureTeams/layout';
import { FeatureTeamsScene } from '../featureTeams/Scene';

// Bas Vodde's clip, with his audio, as a picture-in-picture in the lower
// right; the animation follows his narration. The film adds its own short
// opening and ending.
export const BAS_CLIP = 'assets/Component teams.mp4';

// The clip is 1080×1920 with soft grey margins; the inset crops them away.
const CROP = { width: 0.83, left: 0.085, top: 0.04 };

const ClipInset: React.FC<{ shown: number }> = ({ shown }) => {
	const width = INSET.width / CROP.width;
	return (
		<div
			style={{
				position: 'absolute',
				left: INSET.left,
				top: INSET.top,
				width: INSET.width,
				height: INSET.height,
				boxSizing: 'border-box',
				border: `6px solid ${palette.ink}`,
				borderRadius: 30,
				boxShadow: `9px 9px 0 ${palette.paperShadow}`,
				overflow: 'hidden',
				background: palette.white,
				transform: `scale(${shown})`,
				transformOrigin: '100% 100%',
				visibility: shown <= 0 ? 'hidden' : 'visible',
			}}
		>
			<Sequence from={OPEN_FRAMES} durationInFrames={CLIP_FRAMES} layout="none">
				<OffthreadVideo
					src={staticFile(BAS_CLIP)}
					style={{ position: 'absolute', width, left: -CROP.left * width, top: -CROP.top * width * (1920 / 1080) - 6, maxWidth: 'none' }}
				/>
			</Sequence>
		</div>
	);
};

// The animated Odd-e logo in the upper right, from the first frame to the last.
export const OddeCorner: React.FC = () => (
	<div data-testid="odde-logo" style={{ position: 'absolute', left: LOGO.left, top: LOGO.top, width: LOGO.width, height: LOGO.width * 0.98 }}>
		<OddeLogo />
		<FlipCoin speed={2} interval={20} shift={0}>
			<OddeLogoInner />
		</FlipCoin>
	</div>
);

const FilmFrame: React.FC = () => {
	const film = filmPoseAt(useCurrentFrame());
	return (
		<AbsoluteFill>
			<FeatureTeamsScene film={film} />
			<ClipInset shown={film.clipShown} />
			<OddeCorner />
		</AbsoluteFill>
	);
};

export const FeatureTeamsFilm: React.FC = () => (
	<Composition id="FeatureTeamsFilm" component={FilmFrame} durationInFrames={durationInFrames} fps={FPS} width={STAGE.width} height={STAGE.height} />
);
