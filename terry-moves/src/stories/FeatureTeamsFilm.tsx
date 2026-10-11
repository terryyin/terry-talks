import React from 'react';
import { AbsoluteFill, Composition, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { palette } from '../storyImpact/scene';
import { STAGE } from '../storyImpact/layout';
import { OddeLogo } from '../parts/OddeLogo';
import { OddeLogoInner } from '../parts/OddeLogoInner';
import { FlipCoin } from '../video_components/AutonomousComponents/FlipCoin';
import { CLIP_FRAMES, durationInFrames, FPS, filmPoseAt, OPEN_FRAMES, speakerSlot } from '../featureTeams/film';
import { INSET, LOGO } from '../featureTeams/layout';
import { FeatureTeamsScene } from '../featureTeams/Scene';
import type { ShotPlacement } from '../featureTeams/shot';

// Bas Vodde's clip, with his audio, as a picture-in-picture in the lower
// right; the animation follows his narration. The film adds its own short
// opening and ending. Source, crop and play come from the compiled speaker shot.

const ClipInset: React.FC<{ shown: number; placement: ShotPlacement; from: number; to: number; source: string; muted: boolean }> = ({
	shown,
	placement,
	from,
	to,
	source,
	muted,
}) => {
	const { fps } = useVideoConfig();
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
					src={staticFile(source)}
					trimBefore={from * fps}
					trimAfter={to * fps}
					{...(muted ? { muted: true } : {})}
					style={{
						position: 'absolute',
						width: placement.videoWidth,
						left: placement.left,
						top: placement.top,
						maxWidth: 'none',
					}}
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
			<ClipInset
				shown={film.clipShown}
				placement={speakerSlot.placement}
				from={speakerSlot.from}
				to={speakerSlot.to}
				source={speakerSlot.source}
				muted={speakerSlot.audio === 'muted'}
			/>
			<OddeCorner />
		</AbsoluteFill>
	);
};

export const FeatureTeamsFilm: React.FC = () => (
	<Composition
		id="FeatureTeamsFilm"
		component={FilmFrame}
		durationInFrames={durationInFrames}
		calculateMetadata={() => ({ durationInFrames })}
		fps={FPS}
		width={STAGE.width}
		height={STAGE.height}
	/>
);
