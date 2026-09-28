import React from 'react';
import { palette } from './scene';
import { CAPTION_BOX, FONT_FAMILY, OUTLINE, SHADOW } from './layout';

// Splits a caption into at most two lines when it is too long for one,
// preferring a break after punctuation, otherwise the most balanced break.
export const captionLines = (caption: string, maxChars = 38): string[] => {
	if (caption.length <= maxChars) return [caption];
	const words = caption.split(' ');
	const splits = words.slice(1).map((_, i) => {
		const lines = [words.slice(0, i + 1).join(' '), words.slice(i + 1).join(' ')];
		return { lines, width: Math.max(...lines.map((l) => l.length)), punctuated: /[.:;,]$/.test(lines[0]) };
	});
	const fitting = splits.filter((s) => s.punctuated && s.width <= maxChars);
	const pool = fitting.length > 0 ? fitting : splits;
	return pool.reduce((best, s) => (s.width < best.width ? s : best)).lines;
};

export const CaptionBar: React.FC<{ caption: string }> = ({ caption }) => {
	const { left, right, top, bottom } = CAPTION_BOX;
	const lines = captionLines(caption);
	const size = 44;
	const lineHeight = size * 1.25;
	const midY = (top + bottom) / 2;
	const firstBaseline = midY - ((lines.length - 1) * lineHeight) / 2 + size * 0.35;
	return (
		<g>
			<rect x={left + SHADOW.x} y={top + SHADOW.y} width={right - left} height={bottom - top} rx={36} fill={palette.paperShadow} />
			<rect x={left} y={top} width={right - left} height={bottom - top} rx={36} fill={palette.white} stroke={palette.ink} strokeWidth={OUTLINE} />
			<text
				data-testid="caption"
				textAnchor="middle"
				fontFamily={FONT_FAMILY}
				fontWeight={700}
				fontSize={size}
				fill={palette.ink}
			>
				{lines.map((line, i) => (
					<tspan key={i} x={(left + right) / 2} y={firstBaseline + i * lineHeight}>
						{i < lines.length - 1 ? `${line} ` : line}
					</tspan>
				))}
			</text>
		</g>
	);
};
