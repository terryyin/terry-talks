import React from 'react';
import { Composition, registerRoot, useCurrentFrame } from 'remotion';
import { DirectedCharacterScene, RobotGreetingComposition, RobotGreetingThumbsUpComposition } from '../../src/characterAction/RobotGreeting';
import { filmFormat, greetingDirections, GreetingTake } from '../../src/characterAction/script';

type Traversal = { frames: number[]; mutation: 'none' | 'frozen' | 'blank'; take: GreetingTake };
const TraversedCharacter: React.FC<Traversal> = ({ frames, mutation, take }) => {
	const frame = useCurrentFrame();
	const sampledFrame = mutation === 'frozen' ? 0 : frames[frame];
	const authored = greetingDirections[take];
	// An offstage actor leaves the empty stage of a swallowed loading boundary.
	// Mutations belong to proof, not the production composition's public props.
	const direction = mutation === 'blank' ? { ...authored, stage: { ...authored.stage, position: [1000, 0.01, 0] as [number, number, number] } } : authored;
	return <DirectedCharacterScene direction={direction} frame={sampledFrame} />;
};

const ProofRoot: React.FC = () => <>
	<RobotGreetingComposition />
	<RobotGreetingThumbsUpComposition />
	<Composition
		id="CharacterActionTraversal"
		component={TraversedCharacter}
		{...filmFormat}
		durationInFrames={1}
		defaultProps={{ frames: [0], mutation: 'none', take: 'original' }}
		calculateMetadata={({ props }) => ({ durationInFrames: props.frames.length })}
	/>
</>;
registerRoot(ProofRoot);
