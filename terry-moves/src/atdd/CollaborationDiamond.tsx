import React from 'react';
import { palette } from './art';
import { CirclePose, cycleToMerge, forkToCycle } from './circleLayout';
import { collaborationPose } from './collaborationLayout';
import { Flow, LocalCycle, Text } from './pieces';

type Props = { pose: CirclePose; collaboration: ReturnType<typeof collaborationPose>; seconds: number; split: number; merge: number; loopPhase: number; localShown: number; passed: boolean; staticBoard: boolean };

// The existing failed, finishing and finished sheets are three vertices of this
// diamond. Local TDD is the fourth; no second copy of the circle is introduced.
export const CollaborationDiamond: React.FC<Props> = ({ pose, collaboration, seconds, split, merge, loopPhase, localShown, passed, staticBoard }) => <g>
	<Flow d={forkToCycle(pose)} progress={localShown} arrow />
	<g opacity={localShown}>
		<LocalCycle {...pose.frontEndCycle} seconds={seconds} title={false} phase={staticBoard ? 2 : loopPhase} />
	</g>
	<Flow d={cycleToMerge(pose)} progress={merge} color={passed ? palette.behavior : palette.structure} arrow />
	{!staticBoard ? <g opacity={split * Math.max(0, 1 - merge * 10)}>
		<Text {...collaboration.labels.front}>3 · Front-end TDD</Text>
		<Text {...collaboration.labels.finish}>2 · Finish Scenario A</Text>
	</g> : null}
</g>;
