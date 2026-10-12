import React from 'react';
import { Composition, registerRoot, useCurrentFrame } from 'remotion';
import { DirectedCharacterScene, RobotGreetingComposition } from '../../src/characterAction/RobotGreeting';
import { filmFormat, greetingDirection } from '../../src/characterAction/script';

type Traversal = { frames: number[]; mutation: 'none' | 'frozen' | 'blank' };
const TraversedCharacter: React.FC<Traversal> = ({ frames, mutation }) => {
	const frame = useCurrentFrame();
	const sampledFrame = mutation === 'frozen' ? 0 : frames[frame];
	// An offstage actor leaves the empty stage of a swallowed loading boundary.
	// Mutations belong to proof, not the production composition's public props.
	const direction = mutation === 'blank' ? { ...greetingDirection, stage: { ...greetingDirection.stage, position: [1000, 0.01, 0] as [number, number, number] } } : greetingDirection;
	return <DirectedCharacterScene direction={direction} frame={sampledFrame} />;
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
