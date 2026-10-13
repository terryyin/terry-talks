import { CAPTION_BOX, STAGE } from './layout';

export type CaptionPresentation = {
	box: { left: number; right: number; top: number; bottom: number };
	primarySize: number;
	primaryMaxChars: number;
	secondarySize: number;
	secondaryMaxChars?: number;
	languageGap: number;
};

type Placement = { x: number; y: number; scale: number };

export type StoryImpactPresentation = {
	canvas: { width: number; height: number };
	stage: Placement;
	cards: Placement;
	captions: CaptionPresentation;
};

// The original presentation remains the default for every existing consumer.
export const SQUARE_PRESENTATION: StoryImpactPresentation = {
	canvas: STAGE,
	stage: { x: 0, y: 0, scale: 1 },
	cards: { x: 0, y: 0, scale: 1 },
	captions: {
		box: CAPTION_BOX,
		primarySize: 44,
		primaryMaxChars: 38,
		secondarySize: 26,
		languageGap: 12,
	},
};

// Authored portrait master: connected action moves as one group, while the
// bilingual reading region has its own larger type and room for Japanese lines.
// This first take is verified only through the first story becoming coherent.
export const PORTRAIT_PRESENTATION: StoryImpactPresentation = {
	canvas: { width: 1080, height: 1920 },
	stage: { x: 0, y: 340, scale: 1 },
	cards: { x: 0, y: 340, scale: 1 },
	captions: {
		box: { left: 40, right: 1040, top: 1430, bottom: 1860 },
		primarySize: 54,
		primaryMaxChars: 32,
		secondarySize: 48,
		secondaryMaxChars: 18,
		languageGap: 32,
	},
};

export const placementTransform = ({ x, y, scale }: Placement): string | undefined =>
	x === 0 && y === 0 && scale === 1 ? undefined : `translate(${x} ${y}) scale(${scale})`;
