import React from 'react';
import { palette } from './scene';
import { FONT_FAMILY, OUTLINE, Point, SHADOW } from './layout';

// The wishing story's speech bubble, its tail pointing back at the ball.

// Breaks the wish into short lines for the speech bubble.
const bubbleLines = (text: string, maxChars = 15): string[] =>
	text.split(' ').reduce<string[]>((lines, word) => {
		const last = lines[lines.length - 1];
		if (last !== undefined && `${last} ${word}`.length <= maxChars) {
			return [...lines.slice(0, -1), `${last} ${word}`];
		}
		return [...lines, word];
	}, []);

export const BUBBLE = { left: 728, right: 1048, top: 168, bottom: 392 } as const;

export const WishBubble: React.FC<{ wish: string; toward: Point }> = ({ wish, toward }) => {
	const { left, right, top, bottom } = BUBBLE;
	const lines = bubbleLines(wish);
	const size = 38;
	const lineHeight = size * 1.2;
	const midY = (top + bottom) / 2;
	const first = midY - ((lines.length - 1) * lineHeight) / 2 + size * 0.35;
	const tail = `M${left + 4},${midY - 14} L${toward.x},${toward.y} L${left + 4},${midY + 40} Z`;
	return (
		<g data-testid="wish-bubble">
			<rect x={left + SHADOW.x} y={top + SHADOW.y} width={right - left} height={bottom - top} rx={44} fill={palette.paperShadow} />
			<path d={tail} fill={palette.white} stroke={palette.ink} strokeWidth={OUTLINE} strokeLinejoin="round" />
			<rect x={left} y={top} width={right - left} height={bottom - top} rx={44} fill={palette.white} stroke={palette.ink} strokeWidth={OUTLINE} />
			<path d={`M${left + 10},${midY - 6} L${left + 10},${midY + 32}`} stroke={palette.white} strokeWidth={12} />
			<text textAnchor="middle" fontFamily={FONT_FAMILY} fontWeight={700} fontSize={size} fill={palette.ink}>
				{lines.map((line, i) => (
					<tspan key={i} x={(left + right) / 2} y={first + i * lineHeight}>
						{i < lines.length - 1 ? `${line} ` : line}
					</tspan>
				))}
			</text>
		</g>
	);
};
