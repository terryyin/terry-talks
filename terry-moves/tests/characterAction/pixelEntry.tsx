import React, { useMemo } from 'react';
import { Composition, registerRoot, useCurrentFrame, useVideoConfig } from 'remotion';
import { DirectedCharacterScene, RobotGreetingComposition } from '../../src/characterAction/RobotGreeting';
import { compileDirection } from '../../src/characterAction/direction';
import { filmFormat, greetingDirection } from '../../src/characterAction/script';

type Traversal = { frames: number[]; mutation: 'none' | 'frozen' | 'blank' };
const TraversedCharacter: React.FC<Traversal> = ({ frames, mutation }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const performance = useMemo(() => compileDirection(greetingDirection, fps), [fps]);
	const pose = performance.poseAt(mutation === 'frozen' ? 0 : frames[frame]);
	// With no actor shadows the offstage rig leaves exactly the same empty stage
	// as a swallowed loading boundary. Mutations belong to proof, not Studio props.
	const mutated = mutation === 'blank' ? { ...pose, position: [1000, 0, 0] as [number, number, number] } : pose;
	return <DirectedCharacterScene direction={greetingDirection} pose={mutated} />;
};

const ProofRoot: React.FC = () => <>
	<RobotGreetingComposition />
	<Composition
		id="CharacterActionTraversal"
		component={TraversedCharacter}
		{...filmFormat}
		durationInFrames={1}
		defaultProps={{ frames: [0], mutation: 'none' }}
		calculateMetadata={({ props }) => ({ durationInFrames: props.frames.length })}
	/>
</>;
registerRoot(ProofRoot);
