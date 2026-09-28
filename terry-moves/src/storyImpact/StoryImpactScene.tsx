import React from 'react';
import { Pose } from './scene';
import { HISTORY_BOX, scaleAround, STAGE } from './layout';
import { Axes, BacklogTray, Paper, ProductGrid } from './pieces';
import { Splat, WobbleMarks } from './splat';
import { StoryBall } from './storyBall';
import { CaptionBar } from './caption';
import { HistoryBox, SpentSkin } from './history';
import { TidyMarks } from './tidyMarks';

// The History box pops up from its bottom middle.
const HISTORY_POP_FROM = { x: (HISTORY_BOX.left + HISTORY_BOX.right) / 2, y: HISTORY_BOX.bottom };

export const StoryImpactScene: React.FC<{ pose: Pose; caption: string }> = ({ pose, caption }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox={`0 0 ${STAGE.width} ${STAGE.height}`}
		width={STAGE.width}
		height={STAGE.height}
	>
		<Paper />
		{pose.history ? (
			<g transform={pose.historyReveal === undefined ? undefined : scaleAround(HISTORY_POP_FROM, pose.historyReveal, pose.historyReveal)}>
				<HistoryBox balls={pose.history} />
			</g>
		) : null}
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
		{pose.spent ? <SpentSkin spent={pose.spent} /> : null}
		<CaptionBar caption={caption} />
	</svg>
);
