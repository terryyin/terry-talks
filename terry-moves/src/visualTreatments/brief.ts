// The common brief every visual treatment of the Problem Decomposition
// comparison passage interprets. Sources: the confirmed article
// (Problem Decomposition/problem-decomposition.md) for the argument, and the
// simple remake's treatment (Problem Decomposition Remake/film-treatment.md)
// for the fictional shopper example. Treatments vary staging and motion, not
// this wording or these relationships.

export type BeatName = 'title' | 'distinction' | 'question' | 'result' | 'feedback' | 'next';

export type OutcomeId = 'stock' | 'hours' | 'reservation';

// What a customer outcome currently means in the passage, shared by every
// treatment's staging.
export type OutcomeStatus = 'open' | 'later' | 'question' | 'done' | 'next' | 'unstarted';

// A named take on the passage: its frame rate and how long each beat lasts.
export type TreatmentVersion = { id: string; fps: number; seconds: Record<BeatName, number> };

export const brief = {
	title: 'Problem Decomposition',
	attribution: 'Terry Yin',
	need: 'Avoid a wasted trip.',
	// Parts of one imagined answer, never customer outcomes in their own right.
	solutionParts: ['Screen', 'API', 'Database'],
	// Smaller customer problems, in the order the passage meets them.
	outcomes: {
		stock: { question: 'Is it in stock?', scope: 'This item · this store', result: 'In stock: 1 left' },
		hours: { question: 'When is it open?' },
		reservation: { question: 'Can I reserve it?' },
	} satisfies Record<OutcomeId, { question: string; scope?: string; result?: string }>,
	feedback: 'The shop was closed when I arrived.',
	// One caption per beat, shared by every treatment, in passage order.
	beats: [
		{ name: 'title', caption: 'A shopper wants to avoid a wasted trip.' },
		{ name: 'distinction', caption: 'Screen, API and database are parts of an imagined answer, not customer outcomes.' },
		{ name: 'question', caption: 'Start with a smaller customer question: is this item in stock?' },
		{ name: 'result', caption: 'A usable result: in stock, one left. Not the whole shopping problem.' },
		{ name: 'feedback', caption: 'Feedback: “The shop was closed when I arrived.”' },
		{ name: 'next', caption: 'Opening hours become next. Reservation stays unstarted. The stock answer stays useful.' },
	] as const satisfies readonly { name: BeatName; caption: string }[],
} as const;

// How every treatment names an outcome's status.
export const statusLabel: Record<OutcomeStatus, string> = {
	open: 'CUSTOMER QUESTION',
	later: 'LATER?',
	question: 'FIRST QUESTION',
	done: 'USABLE RESULT · KEEP',
	next: 'NEXT',
	unstarted: 'UNSTARTED',
};

// What an outcome says: its result once done, otherwise its question.
export const outcomeText = (id: OutcomeId, status: OutcomeStatus): string => {
	const outcome = brief.outcomes[id];
	return status === 'done' && 'result' in outcome ? `✓ ${outcome.result}` : outcome.question;
};
