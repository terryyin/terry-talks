import React, { useMemo } from 'react';
import { Composition, registerRoot, useCurrentFrame, useVideoConfig } from 'remotion';
import { CinematicBottleneckComposition, DirectedShot } from '../../src/cinematicShot/CinematicBottleneck';
import { compileDirection } from '../../src/cinematicShot/direction';
import { directions, selectedTake, shotFormat, Take } from '../../src/cinematicShot/script';

type Traversal = { frames: number[]; cameraOnly: boolean; take: Take };

const TraversedShot: React.FC<Traversal> = ({ frames, cameraOnly, take }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const direction = directions[take];
	const shot = useMemo(() => compileDirection(direction, fps), [direction, fps]);
	const sampled = shot.poseAt(frames[frame]);
	const pose = cameraOnly ? { ...shot.poseAt(150), camera: sampled.camera } : sampled;
	return <DirectedShot pose={pose} direction={direction} />;
};

const ProofRoot: React.FC = () => <>
	<CinematicBottleneckComposition />
	<Composition
	id="CinematicShotTraversal"
	component={TraversedShot}
	{...shotFormat}
	durationInFrames={1}
	defaultProps={{ frames: [150], cameraOnly: false, take: selectedTake }}
	calculateMetadata={({ props }) => ({ durationInFrames: props.frames.length })}
	/>
</>;

registerRoot(ProofRoot);
