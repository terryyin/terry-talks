import React, { useEffect, useLayoutEffect, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { ThreeCanvas } from '@remotion/three';
import { AbsoluteFill, Composition, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { PerspectiveCamera } from 'three';
import { CharacterDirection, compileDirection } from './direction';
import { compileCharacterPerformance, createCharacterRig } from './rig';
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

const DirectedActor: React.FC<{ direction: CharacterDirection; frame: number }> = ({ direction, frame }) => {
	const { fps } = useVideoConfig();
	const { scene, animations } = useGLTF(staticFile(direction.asset));
	const rig = useMemo(() => createCharacterRig(scene, animations, direction), [scene, animations, direction]);
	const performance = useMemo(() => compileCharacterPerformance(rig, direction, fps), [rig, direction, fps]);
	const pose = performance.poseAt(frame);
	useLayoutEffect(() => { rig.sample(pose); }, [rig, pose]);
	useEffect(() => () => rig.dispose(), [rig]);
	return <primitive object={rig.object} dispose={null} />;
};

// The same stage and skeleton boundary is consumed by Studio, CLI export and
// real-pixel traversal proof. ThreeCanvas waits for the actual loader; an inner
// null Suspense would conceal it and permit empty first/fresh frames.
export const DirectedCharacterScene: React.FC<{ direction: CharacterDirection; frame: number }> = ({ direction, frame }) => {
	const { width, height } = useVideoConfig();
	return <AbsoluteFill style={{ backgroundColor: direction.stage.background }}>
		<ThreeCanvas shadows width={width} height={height} camera={{ fov: direction.stage.camera.fov, near: 0.1, far: 80 }}>
			<color attach="background" args={[direction.stage.background]} />
			<fog attach="fog" args={[direction.stage.background, 25, 50]} />
			<SampledCamera direction={direction.stage.camera} />
			<ambientLight intensity={0.6} />
			<hemisphereLight args={['#c1e5ff', '#314552', 1.1]} />
			<directionalLight castShadow position={[-3, 9, 7]} intensity={3.2} color="#fff0d8" shadow-mapSize={[2048, 2048]} shadow-camera-left={-12} shadow-camera-right={12} shadow-camera-top={12} shadow-camera-bottom={-12} shadow-bias={-0.0002} />
			<directionalLight position={[5, 6, -6]} color="#8adfff" intensity={2.4} />
			<mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.005, 0]}>
				<planeGeometry args={[40, 40]} />
				<meshStandardMaterial color={direction.stage.floor} roughness={0.9} />
			</mesh>
			<mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[-0.8, -0.002, -0.2]}>
				<circleGeometry args={[7.5, 96]} />
				<meshStandardMaterial color="#56717a" roughness={0.95} />
			</mesh>
			<DirectedActor direction={direction} frame={frame} />
		</ThreeCanvas>
	</AbsoluteFill>;
};

export const RobotGreeting: React.FC = () => {
	const frame = useCurrentFrame();
	return <DirectedCharacterScene direction={greetingDirection} frame={frame} />;
};

export const RobotGreetingComposition: React.FC = () => <Composition
	id="RobotGreeting"
	component={RobotGreeting}
	durationInFrames={compileDirection(greetingDirection, filmFormat.fps).durationInFrames}
	{...filmFormat}
/>;
