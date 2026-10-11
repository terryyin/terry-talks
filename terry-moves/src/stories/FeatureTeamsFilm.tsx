import React from 'react';
import { AbsoluteFill, Composition, Freeze, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { palette } from '../storyImpact/scene';
import { STAGE } from '../storyImpact/layout';
import { OddeLogo } from '../parts/OddeLogo';
import { OddeLogoInner } from '../parts/OddeLogoInner';
import { FlipCoin } from '../video_components/AutonomousComponents/FlipCoin';
import { durationInFrames, FPS, filmPoseAt, OPEN_FRAMES, speakerSlot } from '../featureTeams/film';
import { INSET, LOGO } from '../featureTeams/layout';
import { FeatureTeamsScene } from '../featureTeams/Scene';
import type { CompiledShot } from '../featureTeams/shot';

// Bas Vodde's clip, with his audio, as a picture-in-picture in the lower
// right; the animation follows his narration. The film adds its own short
// opening and ending. Source, crop and play come from the compiled speaker shot.

const ClipInset: React.FC<{ shown: number; slot: CompiledShot }> = ({ shown, slot }) => {
	const { fps } = useVideoConfig();
	const { placement, from, to, source, videoFrames, sceneSeconds, holdFrom } = slot;
	const muted = slot.audio === 'muted';
	const videoStyle: React.CSSProperties = {
		position: 'absolute',
		width: placement.videoWidth,
		left: placement.left,
		top: placement.top,
		maxWidth: 'none',
	};
	const sceneFrames = Math.round(sceneSeconds * fps);
	const holdFrames = holdFrom == null ? 0 : Math.max(0, sceneFrames - videoFrames);
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
			<Sequence from={OPEN_FRAMES} durationInFrames={videoFrames} layout="none">
				<OffthreadVideo
					src={staticFile(source)}
					trimBefore={from * fps}
					trimAfter={to * fps}
					{...(muted ? { muted: true } : {})}
					style={videoStyle}
				/>
			</Sequence>
			{holdFrom != null && holdFrames > 0 ? (
				<Sequence from={OPEN_FRAMES + videoFrames} durationInFrames={holdFrames} layout="none">
					{/* Freeze the last played frame; mute explicitly so hold is silent. */}
					<Freeze frame={videoFrames - 1}>
						<OffthreadVideo
							src={staticFile(source)}
							trimBefore={from * fps}
							trimAfter={to * fps}
							muted
							volume={0}
							style={videoStyle}
						/>
					</Freeze>
				</Sequence>
			) : null}
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
			<ClipInset shown={film.clipShown} slot={speakerSlot} />
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
