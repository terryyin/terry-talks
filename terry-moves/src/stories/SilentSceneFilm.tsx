import React, { useMemo } from 'react';
import { AbsoluteFill, Composition, useCurrentFrame, useVideoConfig } from 'remotion';
import { compileScene } from '../silentScene/compileScene';
import { script } from '../silentScene/script';
import { SilentScene } from '../silentScene/SilentScene';

const SilentSceneFrame: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const scene = useMemo(() => compileScene(script, fps), [fps]);
	return <AbsoluteFill><SilentScene pose={scene.poseAt(frame)}/></AbsoluteFill>;
};

export const SilentSceneFilm: React.FC = () => <Composition
	id="SilentScene"
	component={SilentSceneFrame}
	durationInFrames={1}
	calculateMetadata={() => ({ durationInFrames: compileScene(script, 30).durationInFrames })}
	fps={30}
	width={1080}
	height={1080}
/>;
