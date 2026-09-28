import React from 'react';
import { Pose } from './scene';
import { STAGE } from './layout';
import { Axes, BacklogTray, Paper, ProductGrid } from './pieces';
import { Splat, WobbleMarks } from './splat';
import { StoryBall } from './storyBall';
import { CaptionBar } from './caption';
import { HistoryBox } from './history';
import { TidyMarks } from './tidyMarks';

export const StoryImpactScene: React.FC<{ pose: Pose; caption: string }> = ({ pose, caption }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox={`0 0 ${STAGE.width} ${STAGE.height}`}
		width={STAGE.width}
		height={STAGE.height}
	>
		<Paper />
		{pose.history && pose.history.length > 0 ? <HistoryBox balls={pose.history} /> : null}
		{pose.showTime && pose.backlog.length > 0 ? <BacklogTray balls={pose.backlog} /> : null}
		<ProductGrid
			cells={pose.cells}
			underCells={pose.splat?.seeped ? <Splat splat={pose.splat} /> : null}
		/>
		{pose.splat && !pose.splat.seeped ? <Splat splat={pose.splat} /> : null}
		{pose.splat?.seeped && pose.splat.cover ? (
			<g opacity={pose.splat.cover}>
				<Splat splat={pose.splat} />
			</g>
		) : null}
		{pose.assimilation ? (
			<TidyMarks cells={pose.cells} done={pose.assimilation === 'done'} sparkles={pose.sparkles} />
		) : pose.cells.some((c) => c.rot !== 0) ? (
			<WobbleMarks cells={pose.cells} />
		) : null}
		<Axes showTime={pose.showTime} />
		{pose.story ? <StoryBall story={pose.story} /> : null}
		<CaptionBar caption={caption} />
	</svg>
);
