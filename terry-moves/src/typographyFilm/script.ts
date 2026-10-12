import { TypeDirection } from './direction';

// Interim opening contrast. The complete argument replaces this sample in
// the next slice, after Terry has evaluated its moving treatment.
export const openingContrast: TypeDirection = {
	passages: [
		{
			id: 'problem',
			holdSeconds: 3.1,
			groups: [
				{
					id: 'lead-in', lines: ['Start with the'],
					size: 64, weight: 400, letterSpacing: -1, lineHeight: 1.1,
					spaceBefore: 0, tone: 'ink',
					motion: { delaySeconds: 0, revealSeconds: 0, settleSeconds: 0, risePixels: 0 },
				},
				{
					id: 'focus', lines: ['problem.'],
					size: 142, weight: 700, letterSpacing: -6, lineHeight: 1.02,
					spaceBefore: 18, tone: 'accent',
					motion: { delaySeconds: 0.5, revealSeconds: 0.7, settleSeconds: 0.9, risePixels: 24 },
				},
			],
		},
		{
			id: 'solution',
			holdSeconds: 3.3,
			groups: [
				{
					id: 'lead-in', lines: ['not the'],
					size: 56, weight: 400, letterSpacing: -1, lineHeight: 1.1,
					spaceBefore: 0, tone: 'quiet',
					motion: { delaySeconds: 0, revealSeconds: 0, settleSeconds: 0, risePixels: 0 },
				},
				{
					id: 'focus', lines: ['solution.'],
					size: 108, weight: 400, letterSpacing: -3, lineHeight: 1.02,
					spaceBefore: 22, tone: 'quiet',
					motion: { delaySeconds: 0.45, revealSeconds: 0.6, settleSeconds: 0.75, risePixels: 18 },
				},
			],
		},
	],
};

// A retained script-only demonstration: the same renderer consumes changed
// wording, emphasis, spacing and time. It is not the later full-film revision.
export const editedOpeningContrast: TypeDirection = {
	passages: openingContrast.passages.map((passage) => passage.id === 'problem' ? {
		...passage,
		holdSeconds: 4.2,
		groups: passage.groups.map((group) => group.id === 'lead-in' ? {
			...group, lines: ['Begin with the'], size: 72, weight: 700, letterSpacing: -2,
		} : {
			...group, size: 120, weight: 400, spaceBefore: 38,
			motion: { delaySeconds: 0.95, revealSeconds: 1.1, settleSeconds: 1.35, risePixels: 24 },
		}),
	} : passage),
};
