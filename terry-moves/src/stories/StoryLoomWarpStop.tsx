import React from 'react';
import {Composition} from 'remotion';
import {WarpStopLoom} from '../parts/WarpStopLoom';

export const StoryLoomWarpStop: React.FC = () => (
	<Composition
		id="StoryLoomWarpStop"
		component={WarpStopLoom}
		durationInFrames={330}
		fps={30}
		width={1280}
		height={720}
	/>
);
