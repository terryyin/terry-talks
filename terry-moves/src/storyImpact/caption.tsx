import React from 'react';
import { palette } from './scene';
import { CAPTION_BOX, FONT_FAMILY, OUTLINE, SHADOW } from './layout';
import { ZH_HANT_FONT_FAMILY } from './zhHant';
import { JA_FONT_FAMILY } from './ja';

const CJK = /[\u3000-\u9fff\uff00-\uffef]/;
const CJK_BREAK_AFTER = /[，。：；！？、]/;

// Splits a caption into at most two lines when it is too long for one,
// preferring a break after punctuation, otherwise the most balanced break.
// Chinese has no spaces: break after the punctuation mark that balances the
// two lines best, otherwise in the middle.
export const cjkCaptionLines = (caption: string, maxChars = 18): string[] => {
	if (caption.length <= maxChars) return [caption];
	const chars = [...caption];
	const cut = (i: number) => [chars.slice(0, i).join(''), chars.slice(i).join('')];
	const candidates = chars.flatMap((c, i) => (CJK_BREAK_AFTER.test(c) && i + 1 < chars.length ? [i + 1] : []));
	const width = (i: number) => Math.max(i, chars.length - i);
	const best = candidates.filter((i) => width(i) <= maxChars + 2).sort((a, b) => width(a) - width(b))[0];
	return cut(best ?? Math.ceil(chars.length / 2));
};

export const captionLines = (caption: string, maxChars = 38): string[] => {
	if (CJK.test(caption)) return cjkCaptionLines(caption);
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

export const CaptionBar: React.FC<{ caption: string; secondaryCaption?: string }> = ({ caption, secondaryCaption }) => {
	const { left, right, top, bottom } = CAPTION_BOX;
	const lines = captionLines(caption);
	const size = 44;
	const lineHeight = size * 1.25;
	const midY = (top + bottom) / 2;
	const secondarySize = 26;
	const languageGap = 12;
	const primaryHeight = size + (lines.length - 1) * lineHeight;
	const bilingualTop = midY - (primaryHeight + languageGap + secondarySize) / 2;
	const firstBaseline = secondaryCaption ? bilingualTop + size * 0.8 : midY - ((lines.length - 1) * lineHeight) / 2 + size * 0.35;
	return (
		<g>
			<rect x={left + SHADOW.x} y={top + SHADOW.y} width={right - left} height={bottom - top} rx={36} fill={palette.paperShadow} />
			<rect x={left} y={top} width={right - left} height={bottom - top} rx={36} fill={palette.white} stroke={palette.ink} strokeWidth={OUTLINE} />
			<text
				data-testid="caption"
				textAnchor="middle"
				fontFamily={CJK.test(caption) ? ZH_HANT_FONT_FAMILY : FONT_FAMILY}
				fontWeight={700}
				fontSize={size}
				fill={palette.ink}
			>
				{lines.map((line, i) => (
					<tspan key={i} x={(left + right) / 2} y={firstBaseline + i * lineHeight}>
						{i < lines.length - 1 && !CJK.test(caption) ? `${line} ` : line}
					</tspan>
				))}
			</text>
			{secondaryCaption ? (
				<text
					data-testid="secondary-caption"
					x={(left + right) / 2}
					y={bilingualTop + primaryHeight + languageGap + secondarySize * 0.8}
					textAnchor="middle"
					fontFamily={JA_FONT_FAMILY}
					fontWeight={500}
					fontSize={secondarySize}
					fill={palette.ink}
				>
					{secondaryCaption}
				</text>
			) : null}
		</g>
	);
};
