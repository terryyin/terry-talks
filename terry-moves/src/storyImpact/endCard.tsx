import React from 'react';
import { EndCardPose, palette } from './scene';
import { DisciplinedLine, RomanticLine, Splash } from './title';
import { FONT_FAMILY, scaleAround } from './layout';

// The film's end card on the empty paper, in the title's styles, so the film
// opens and closes on the same pair: the essay's final line, then the credit.
// Pure function of the pose.

export const END_CARD = {
	lead: { text: 'Stories should be', y: 250, size: 66 },
	romantic: { text: 'romantic.', y: 440, size: 150 },
	disciplined: { text: 'Products should not.', y: 610, size: 84 },
	credit: { text: 'An idea and film by Terry Yin', y: 800, size: 46 },
	splash: { x: 250, y: 330 },
} as const;

const PopText: React.FC<{ testId: string; text: string; y: number; size: number; scale: number; weight?: number; opacity?: number }> = ({
	testId,
	text,
	y,
	size,
	scale,
	weight = 800,
	opacity,
}) =>
	scale <= 0 ? null : (
		<g transform={scaleAround({ x: 540, y: y - size * 0.35 }, scale, scale)}>
			<text data-testid={testId} x={540} y={y} textAnchor="middle" fontFamily={FONT_FAMILY} fontWeight={weight} fontSize={size} fill={palette.ink} opacity={opacity}>
				{text}
			</text>
		</g>
	);

export const EndCard: React.FC<{ card: EndCardPose }> = ({ card }) => {
	const { lead, romantic, disciplined, credit, splash } = END_CARD;
	return (
		<g data-testid="end-card">
			<Splash scale={card.splash} at={splash} />
			<PopText testId="end-lead" text={lead.text} y={lead.y} size={lead.size} scale={card.lead} />
			<RomanticLine text={romantic.text} drops={card.drops} y={romantic.y} size={romantic.size} />
			<DisciplinedLine text={disciplined.text} snap={card.snap} underline={card.underline} y={disciplined.y} size={disciplined.size} />
			<PopText testId="end-credit" text={credit.text} y={credit.y} size={credit.size} scale={card.credit} weight={700} opacity={0.85} />
		</g>
	);
};
