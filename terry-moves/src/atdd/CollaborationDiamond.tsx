import React from 'react';
import { lerp } from '../storyImpact/motion';
import { palette } from './art';
import { CirclePose, cycleToMerge, forkToCycle } from './circleLayout';
import { Flow, LocalCycle, Text } from './pieces';

export const diamondPerson = (id: number, split: number, merge: number) => {
	const together = { x: 600 + (id - 2) * 43, y: 570 };
	const working = id < 3 ? { x: 545 + id * 50, y: 375 } : { x: 190 + (id - 3) * 45, y: 600 };
	const reunited = { x: 610 + (id - 2) * 43, y: 320 };
	const leaving = { x: lerp(together.x, working.x, split), y: lerp(together.y, working.y, split) };
	if (id < 3) return { x: lerp(leaving.x, reunited.x, merge), y: lerp(leaving.y, reunited.y, merge) };
	// Finishers return through the gap between the two sheets, then rise beside
	// the finished sheet. A direct diagonal would carry them through its title.
	const rise = Math.min(1, merge / 0.33);
	const cross = Math.max(0, Math.min(1, (merge - 0.33) / 0.39));
	const join = Math.max(0, (merge - 0.72) / 0.28);
	const beside = { x: 485 + (id - 3) * 43, y: 451 };
	return {
		x: lerp(lerp(leaving.x, beside.x, cross), reunited.x, join),
		y: lerp(lerp(leaving.y, beside.y, rise), reunited.y, join),
	};
};

type Props = { pose: CirclePose; seconds: number; split: number; merge: number; loopPhase: number; localShown: number; passed: boolean; staticBoard: boolean };

// The existing failed, finishing and finished sheets are three vertices of this
// diamond. Local TDD is the fourth; no second copy of the circle is introduced.
export const CollaborationDiamond: React.FC<Props> = ({ pose, seconds, split, merge, loopPhase, localShown, passed, staticBoard }) => <g>
	<Flow d={forkToCycle(pose)} progress={localShown} arrow />
	<g opacity={localShown}>
		<LocalCycle {...pose.frontEndCycle} seconds={seconds} title={false} phase={staticBoard ? 2 : loopPhase} />
	</g>
	<Flow d={cycleToMerge(pose)} progress={merge} color={passed ? palette.behavior : palette.structure} arrow />
	{!staticBoard ? <g opacity={split * Math.max(0, 1 - merge * 10)}>
		<Text x={610} y={325} size={26}>3 · Front-end TDD</Text>
		<Text x={220} y={510} size={24}>2 · Finish Scenario A</Text>
	</g> : null}
</g>;
