import React from 'react';
import { AbsoluteFill, Composition, useCurrentFrame } from 'remotion';
import { boardAt, boards } from '../storyImpact/boards';
import { STAGE } from '../storyImpact/layout';
import { StoryImpactScene } from '../storyImpact/StoryImpactScene';

// One storyboard board per frame; render with --sequence to get the stills.
const StoryboardFrame: React.FC = () => {
	const board = boardAt(useCurrentFrame());
	return (
		<AbsoluteFill>
			<StoryImpactScene pose={board.pose} caption={board.caption} />
		</AbsoluteFill>
	);
};

export const StoryImpactStoryboard: React.FC = () => (
	<Composition
		id="StoryImpactStoryboard"
		component={StoryboardFrame}
		durationInFrames={boards.length}
		fps={30}
		width={STAGE.width}
		height={STAGE.height}
	/>
);
