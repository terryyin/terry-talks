import React from 'react';
import { palette, TagPose } from './scene';
import { FONT_FAMILY, Point, scaleAround } from './layout';

// A pill tag hanging on a string from the story ball, below it and to the
// right, clear of the Structure axis and above the tray's balls. Pure
// function of the pose and where the ball is.

export const STORY_TAG = { at: { x: 745, y: 450 } as Point, size: 34, height: 50 } as const;

export const tagWidth = (text: string) => text.length * STORY_TAG.size * 0.62 + 40;

export const StoryTag: React.FC<{ tag: TagPose; ball: Point; r: number }> = ({ tag, ball, r }) => {
	if (tag.show <= 0 || (tag.fade !== undefined && tag.fade <= 0)) return null;
	const { at, size, height } = STORY_TAG;
	const w = tagWidth(tag.text);
	const top = { x: at.x - w / 2 + 26, y: at.y - height / 2 };
	const hole = { x: top.x, y: at.y };
	const from = { x: ball.x + r * 0.45, y: ball.y + r * 0.85 };
	const string = `M${from.x},${from.y} Q${from.x - 10},${top.y - 10} ${hole.x},${hole.y}`;
	return (
		<g data-testid="story-tag" opacity={tag.fade}>
			<g transform={tag.show === 1 ? undefined : scaleAround(top, tag.show, tag.show)}>
				<rect x={at.x - w / 2} y={at.y - height / 2} width={w} height={height} rx={height / 2} fill={palette.white} stroke={tag.color} strokeWidth={5} />
				<circle cx={hole.x} cy={hole.y} r={6} fill={palette.paper} stroke={palette.ink} strokeWidth={3} />
				<text x={at.x + 10} y={at.y + size * 0.34} textAnchor="middle" fontFamily={FONT_FAMILY} fontWeight={700} fontSize={size} fill={palette.ink}>
					{tag.text}
				</text>
			</g>
			<path d={string} fill="none" stroke={palette.ink} strokeWidth={4} strokeLinecap="round" />
		</g>
	);
};
