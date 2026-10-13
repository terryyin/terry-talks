import React, { useMemo } from 'react';
import { useVideoConfig } from 'remotion';
import { Heading } from '../tpsAndAi/Frame';
import { TypeDirection, typographyTimeline } from '../typographyFilm/direction';

export const DirectedHeading: React.FC<{ direction: TypeDirection; seconds: number; style?: React.CSSProperties }> = ({ direction, seconds, style }) => {
	const { fps } = useVideoConfig();
	const performance = useMemo(() => typographyTimeline(direction, fps), [direction, fps]);
	const pose = performance.poseAt(Math.round(seconds * fps));
	return <Heading style={{ fontSize: pose.groups[0].size, lineHeight: pose.groups[0].lineHeight, ...style }}>
		{pose.groups.map((group, index) => <React.Fragment key={group.id}>
			{index > 0 ? '\n' : null}
			<span data-directed-heading={group.id} style={{ display: 'block', whiteSpace: 'pre-line', fontSize: group.size, fontWeight: group.weight, letterSpacing: group.letterSpacing, lineHeight: group.lineHeight, opacity: group.opacity, translate: `0px ${group.y}px` }}>{group.lines.join('\n')}</span>
		</React.Fragment>)}
	</Heading>;
};
