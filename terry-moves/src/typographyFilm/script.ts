import { TypeDirection } from './direction';

// Retained opening sample, approved before developing the complete argument.
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

// The complete baseline keeps the approved contrast, then turns the abstract
// advice into a small useful outcome before returning to the original idea.
// Retain these inputs when authoring the later emphasis/pacing revision.
export const problemBaseline: TypeDirection = {
	passages: [
		...openingContrast.passages,
		{
			id: 'question',
			holdSeconds: 4.1,
			groups: [
				{
					id: 'lead-in', lines: ['What is someone'],
					size: 64, weight: 400, letterSpacing: -1, lineHeight: 1.1,
					spaceBefore: 0, tone: 'ink',
					motion: { delaySeconds: 0, revealSeconds: 0, settleSeconds: 0, risePixels: 0 },
				},
				{
					id: 'focus', lines: ['trying to do?'],
					size: 94, weight: 700, letterSpacing: -3, lineHeight: 1.02,
					spaceBefore: 24, tone: 'accent',
					motion: { delaySeconds: 0.5, revealSeconds: 0.7, settleSeconds: 0.9, risePixels: 24 },
				},
			],
		},
		{
			id: 'useful-outcome',
			holdSeconds: 3,
			groups: [
				{
					id: 'lead-in', lines: ['Find'],
					size: 64, weight: 400, letterSpacing: -1, lineHeight: 1.1,
					spaceBefore: 0, tone: 'ink',
					motion: { delaySeconds: 0, revealSeconds: 0, settleSeconds: 0, risePixels: 0 },
				},
				{
					id: 'focus', lines: ['a seat'],
					size: 132, weight: 700, letterSpacing: -5, lineHeight: 1.02,
					spaceBefore: 18, tone: 'accent',
					motion: { delaySeconds: 0.45, revealSeconds: 0.6, settleSeconds: 0.75, risePixels: 22 },
				},
				{
					id: 'context', lines: ['for tonight.'],
					size: 60, weight: 400, letterSpacing: -1, lineHeight: 1.1,
					spaceBefore: 32, tone: 'ink',
					motion: { delaySeconds: 1.3, revealSeconds: 0.5, settleSeconds: 0.7, risePixels: 16 },
				},
			],
		},
		{
			id: 'smaller-step',
			holdSeconds: 3.6,
			groups: [
				{
					id: 'lead-in', lines: ['Help them'],
					size: 64, weight: 400, letterSpacing: -1, lineHeight: 1.1,
					spaceBefore: 0, tone: 'ink',
					motion: { delaySeconds: 0, revealSeconds: 0, settleSeconds: 0, risePixels: 0 },
				},
				{
					id: 'focus', lines: ['find one.'],
					size: 116, weight: 700, letterSpacing: -4, lineHeight: 1.02,
					spaceBefore: 24, tone: 'accent',
					motion: { delaySeconds: 0.5, revealSeconds: 0.7, settleSeconds: 0.9, risePixels: 22 },
				},
			],
		},
		{
			...openingContrast.passages[0],
			id: 'return-to-problem',
			holdSeconds: 3.6,
		},
	],
};

// Keep the words and argument intact, but let the time constraint carry the
// emphasis. Derive this version without writing into the retained baseline.
export const problemRevision: TypeDirection = {
	passages: problemBaseline.passages.map((passage) => passage.id === 'useful-outcome' ? {
		...passage,
		holdSeconds: 3.6,
		groups: passage.groups.map((group) => group.id === 'focus' ? {
			...group, size: 72, weight: 400, letterSpacing: -2, tone: 'ink',
		} : group.id === 'context' ? {
			...group, size: 112, weight: 700, letterSpacing: -3, spaceBefore: 44, tone: 'accent',
			motion: { delaySeconds: 2, revealSeconds: 0.7, settleSeconds: 0.9, risePixels: 22 },
		} : group),
	} : passage),
};

// A compact second idea uses a two-line group, its own spacing and reading
// rhythm through the same direction model and picture renderer.
export const feedbackExample: TypeDirection = {
	passages: [
		{
			id: 'feedback-small',
			holdSeconds: 2.4,
			groups: [
				{
					id: 'lead-in', lines: ['Make', 'feedback'],
					size: 78, weight: 400, letterSpacing: -2, lineHeight: 1.02,
					spaceBefore: 0, tone: 'ink',
					motion: { delaySeconds: 0, revealSeconds: 0, settleSeconds: 0, risePixels: 0 },
				},
				{
					id: 'focus', lines: ['small.'],
					size: 140, weight: 700, letterSpacing: -5, lineHeight: 1.02,
					spaceBefore: 36, tone: 'accent',
					motion: { delaySeconds: 0.8, revealSeconds: 0.6, settleSeconds: 0.8, risePixels: 20 },
				},
			],
		},
		{
			id: 'feedback-useful',
			holdSeconds: 2.7,
			groups: [
				{
					id: 'lead-in', lines: ['Make it'],
					size: 64, weight: 400, letterSpacing: -1, lineHeight: 1.1,
					spaceBefore: 0, tone: 'ink',
					motion: { delaySeconds: 0, revealSeconds: 0, settleSeconds: 0, risePixels: 0 },
				},
				{
					id: 'focus', lines: ['useful.'],
					size: 132, weight: 700, letterSpacing: -4, lineHeight: 1.02,
					spaceBefore: 48, tone: 'accent',
					motion: { delaySeconds: 0.55, revealSeconds: 0.65, settleSeconds: 0.75, risePixels: 20 },
				},
			],
		},
	],
};
