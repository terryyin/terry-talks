import React, { useLayoutEffect, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import { ThreeCanvas } from '@remotion/three';
import { AbsoluteFill, Composition, useCurrentFrame, useVideoConfig } from 'remotion';
import { PerspectiveCamera } from 'three';
import { CameraDirection, compileDirection, Direction, Material, ShotPose, Vector } from './direction';
import { originalDirection, shotFormat } from './script';

const SampledCamera: React.FC<{ direction: CameraDirection }> = ({ direction }) => {
	const { camera } = useThree();
	useLayoutEffect(() => {
		camera.position.set(...direction.position);
		camera.lookAt(...direction.target);
		if (camera instanceof PerspectiveCamera) {
			camera.fov = direction.fov;
			camera.updateProjectionMatrix();
		}
		camera.updateMatrixWorld();
	}, [camera, direction]);
	return null;
};

const Solid: React.FC<{ position: Vector; size: Vector; bevel: number; material: Material; yaw?: number }> = ({ position, size, bevel, material, yaw = 0 }) => <RoundedBox
	position={position}
	rotation={[0, yaw, 0]}
	args={size}
	radius={bevel}
	smoothness={3}
	castShadow
	receiveShadow
>
	<meshStandardMaterial {...material} />
</RoundedBox>;

// This is also the real-render proof boundary: all geometry, lights and the
// actual R3F camera consume the sampled direction used by Studio and export.
export const DirectedShot: React.FC<{ pose: ShotPose; direction: Direction }> = ({ pose, direction }) => {
	const { width, height } = useVideoConfig();
	return <AbsoluteFill style={{ backgroundColor: direction.background }}>
		<ThreeCanvas width={width} height={height} shadows camera={{ ...direction.start.camera, near: 0.1, far: 80 }}>
			<color attach="background" args={[direction.background]} />
			<SampledCamera direction={pose.camera} />
			<ambientLight intensity={pose.lights.ambient} />
			<directionalLight position={direction.lightPositions.key} color={direction.lightColors.key} intensity={pose.lights.key} castShadow shadow-mapSize={[2048, 2048]} shadow-camera-left={-9} shadow-camera-right={9} shadow-camera-top={7} shadow-camera-bottom={-7} shadow-normalBias={0.025} />
			<directionalLight position={direction.lightPositions.rim} color={direction.lightColors.rim} intensity={pose.lights.rim} />
			<pointLight position={direction.lightPositions.passage} color={direction.lightColors.passage} intensity={pose.lights.passage} decay={2} />
			{direction.stage.map((object) => <Solid key={object.name} {...object} material={direction.materials[object.material]} />)}
			{direction.pieces.map((piece) => <Solid key={piece.name} {...piece} {...pose.pieces[piece.name]} material={direction.materials[piece.material]} />)}
		</ThreeCanvas>
	</AbsoluteFill>;
};

export const CinematicBottleneckFrame: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const shot = useMemo(() => compileDirection(originalDirection, fps), [fps]);
	return <DirectedShot pose={shot.poseAt(frame)} direction={originalDirection} />;
};

export const CinematicBottleneckComposition: React.FC = () => <Composition
	id="CinematicBottleneck"
	component={CinematicBottleneckFrame}
	durationInFrames={compileDirection(originalDirection, shotFormat.fps).durationInFrames}
	{...shotFormat}
/>;
