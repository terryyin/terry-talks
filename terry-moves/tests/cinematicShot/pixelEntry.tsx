import React, { useMemo } from 'react';
import { Composition, registerRoot, useCurrentFrame, useVideoConfig } from 'remotion';
import { CinematicBottleneckComposition, DirectedShot } from '../../src/cinematicShot/CinematicBottleneck';
import { compileDirection } from '../../src/cinematicShot/direction';
import { originalDirection, shotFormat } from '../../src/cinematicShot/script';

type Traversal = { frames: number[]; cameraOnly: boolean };

const TraversedShot: React.FC<Traversal> = ({ frames, cameraOnly }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const shot = useMemo(() => compileDirection(originalDirection, fps), [fps]);
	const sampled = shot.poseAt(frames[frame]);
	const pose = cameraOnly ? { ...shot.poseAt(150), camera: sampled.camera } : sampled;
	return <DirectedShot pose={pose} direction={originalDirection} />;
};

const ProofRoot: React.FC = () => <>
	<CinematicBottleneckComposition />
	<Composition
	id="CinematicShotTraversal"
	component={TraversedShot}
	{...shotFormat}
	durationInFrames={1}
	defaultProps={{ frames: [150], cameraOnly: false }}
	calculateMetadata={({ props }) => ({ durationInFrames: props.frames.length })}
	/>
</>;

registerRoot(ProofRoot);
