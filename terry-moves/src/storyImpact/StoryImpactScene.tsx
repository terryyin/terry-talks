import React from 'react';
import { Pose } from './scene';
import { HISTORY_BOX, scaleAround, STAGE, TRAY } from './layout';
import { BacklogTray, FlyingBalls, Paper, ProductGrid } from './pieces';
import { Customer } from './customer';
import { Protect } from './protect';
import { EndCard } from './endCard';
import { Axes } from './axes';
import { Splat, WobbleMarks } from './splat';
import { StoryBall, storyCenter } from './storyBall';
import { StoryTag } from './storyTag';
import { Judgment } from './judgment';
import { CaptionBar } from './caption';
import { HistoryBox, SpentSkin } from './history';
import { TidyMarks } from './tidyMarks';
import { Title } from './title';
import { Dim, Outlines } from './outline';

// The History box pops up from its bottom middle.
const HISTORY_POP_FROM = { x: (HISTORY_BOX.left + HISTORY_BOX.right) / 2, y: HISTORY_BOX.bottom };

// The stage shrinks away toward the middle of the picture above the caption.
const STAGE_CENTER = { x: STAGE.width / 2, y: 480 };

// The backlog tray slides in from off stage right.
const TRAY_SLIDE = STAGE.width - TRAY.left + 40;

// Everything on stage: the product space, the backlog, History, and the
// stories and people moving about it.
const Stage: React.FC<{ pose: Pose }> = ({ pose }) => (
	<>
		{pose.history ? (
			<g transform={pose.historyReveal === undefined ? undefined : scaleAround(HISTORY_POP_FROM, pose.historyReveal, pose.historyReveal)}>
				<HistoryBox balls={pose.history} room={pose.historyRoom} />
			</g>
		) : null}
		{pose.showTime && pose.backlog.length > 0 && (pose.trayIn === undefined || pose.trayIn > 0) ? (
			<g transform={pose.trayIn === undefined ? undefined : `translate(${(1 - pose.trayIn) * TRAY_SLIDE} 0)`}>
				<BacklogTray balls={pose.backlog} />
			</g>
		) : null}
		<ProductGrid
			cells={pose.cells}
			wall={pose.wall}
			underCells={pose.splat?.seeped ? <Splat splat={pose.splat} /> : null}
		/>
		{pose.splat && !pose.splat.seeped ? <Splat splat={pose.splat} /> : null}
		{pose.splat?.seeped && pose.splat.cover ? (
			<g opacity={pose.splat.cover}>
				<Splat splat={pose.splat} />
			</g>
		) : null}
		{pose.dim ? <Dim cells={pose.cells} dim={pose.dim} /> : null}
		{pose.assimilation ? (
			<TidyMarks cells={pose.cells} done={pose.assimilation === 'done'} sparkles={pose.sparkles} />
		) : pose.cells.some((c) => c.rot !== 0) ? (
			<WobbleMarks cells={pose.cells} />
		) : null}
		<Axes showTime={pose.showTime} grow={pose.axes} timeGrow={pose.timeGrow} />
		{pose.outlines ? <Outlines outlines={pose.outlines} /> : null}
		{pose.judgment ? <Judgment judgment={pose.judgment} /> : null}
		{pose.protect ? <Protect protect={pose.protect} /> : null}
		{pose.customer ? <Customer customer={pose.customer} /> : null}
		{pose.backlog.some((b) => b.flying) ? <FlyingBalls balls={pose.backlog} /> : null}
		{pose.tag && pose.story ? <StoryTag tag={pose.tag} ball={storyCenter(pose.story)} r={pose.story.ball.size} /> : null}
		{pose.story ? <StoryBall story={pose.story} /> : null}
		{pose.spent ? <SpentSkin spent={pose.spent} /> : null}
	</>
);

// An empty caption hides the caption bar.
export const StoryImpactScene: React.FC<{ pose: Pose; caption: string }> = ({ pose, caption }) => {
	const leave = pose.stageLeave ?? 0;
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox={`0 0 ${STAGE.width} ${STAGE.height}`}
			width={STAGE.width}
			height={STAGE.height}
		>
			<Paper />
			{leave >= 1 ? null : (
				<g transform={leave === 0 ? undefined : scaleAround(STAGE_CENTER, 1 - leave, 1 - leave)}>
					<Stage pose={pose} />
				</g>
			)}
			{pose.title ? <Title title={pose.title} /> : null}
			{pose.endCard ? <EndCard card={pose.endCard} /> : null}
			{caption === '' ? null : <CaptionBar caption={caption} />}
		</svg>
	);
};
