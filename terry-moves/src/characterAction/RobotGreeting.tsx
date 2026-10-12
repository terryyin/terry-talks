import React, { useEffect, useLayoutEffect, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { ThreeCanvas } from '@remotion/three';
import { AbsoluteFill, Composition, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { PerspectiveCamera } from 'three';
import { CharacterDirection, CharacterPose, compileDirection } from './direction';
import { createCharacterRig } from './rig';
import { filmFormat, greetingDirection } from './script';

const SampledCamera: React.FC<{ direction: CharacterDirection['stage']['camera'] }> = ({ direction }) => {
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

const DirectedActor: React.FC<{ direction: CharacterDirection; pose: CharacterPose }> = ({ direction, pose }) => {
	const { scene, animations } = useGLTF(staticFile(direction.asset));
	const rig = useMemo(() => createCharacterRig(scene, animations, direction), [scene, animations, direction]);
	useLayoutEffect(() => { rig.sample(pose); }, [rig, pose]);
	useEffect(() => () => rig.dispose(), [rig]);
	return <group position={pose.position} rotation={[0, pose.yaw, 0]}><primitive object={rig.object} dispose={null} /></group>;
};

// The same stage and skeleton boundary is consumed by Studio, CLI export and
// real-pixel traversal proof. ThreeCanvas waits for the actual loader; an inner
// null Suspense would conceal it and permit empty first/fresh frames.
export const DirectedCharacterScene: React.FC<{ direction: CharacterDirection; pose: CharacterPose }> = ({ direction, pose }) => {
	const { width, height } = useVideoConfig();
	return <AbsoluteFill style={{ backgroundColor: direction.stage.background }}>
		<ThreeCanvas width={width} height={height} camera={{ fov: direction.stage.camera.fov, near: 0.1, far: 80 }}>
			<color attach="background" args={[direction.stage.background]} />
			<SampledCamera direction={direction.stage.camera} />
			<ambientLight intensity={1.5} />
			<directionalLight position={[4, 9, 7]} intensity={3} />
			<directionalLight position={[-6, 5, -4]} color="#b2d9ff" intensity={1.6} />
			<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.005, 0]}>
				<planeGeometry args={[40, 40]} />
				<meshStandardMaterial color={direction.stage.floor} roughness={0.9} />
			</mesh>
			<gridHelper args={[40, 40, '#465e6a', '#56727f']} position={[0, 0, 0]} />
			<DirectedActor direction={direction} pose={pose} />
		</ThreeCanvas>
	</AbsoluteFill>;
};

export const RobotGreeting: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const performance = useMemo(() => compileDirection(greetingDirection, fps), [fps]);
	return <DirectedCharacterScene direction={greetingDirection} pose={performance.poseAt(frame)} />;
};

export const RobotGreetingComposition: React.FC = () => <Composition
	id="RobotGreeting"
	component={RobotGreeting}
	durationInFrames={compileDirection(greetingDirection, filmFormat.fps).durationInFrames}
	{...filmFormat}
/>;
