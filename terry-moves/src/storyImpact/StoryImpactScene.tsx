import React from 'react';
import { Pose } from './scene';
import { STAGE } from './layout';
import { Axes, BacklogTray, Paper, ProductGrid } from './pieces';
import { CaptionBar } from './caption';

export const StoryImpactScene: React.FC<{ pose: Pose; caption: string }> = ({ pose, caption }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox={`0 0 ${STAGE.width} ${STAGE.height}`}
		width={STAGE.width}
		height={STAGE.height}
	>
		<Paper />
		{pose.showTime && pose.backlog.length > 0 ? <BacklogTray balls={pose.backlog} /> : null}
		<ProductGrid cells={pose.cells} />
		<Axes showTime={pose.showTime} />
		<CaptionBar caption={caption} />
	</svg>
);
