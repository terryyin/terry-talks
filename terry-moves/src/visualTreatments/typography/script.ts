// Treatment A: restrained typography, cards and diagram motion.
// Each beat's pose depends only on progress within that beat, so appending a
// later beat never changes the picture of an earlier one.
import { Beat, timeline, Timeline } from '../../beatTimeline';
import { ease } from '../../problemDecompositionRemake/film';
import { BeatName, brief, OutcomeId } from '../brief';

export type OutcomeStatus = 'open' | 'later' | 'question' | 'done' | 'next' | 'unstarted';

// `from` is the status the card is leaving; `change` (0–1) is how far it has
// become `status`.
export type OutcomePose = { status: OutcomeStatus; from: OutcomeStatus; change: number; shown: number };

export type TypographyPose = {
	beat: BeatName;
	cover: number; // 1 = title fills the frame, 0 = title settled in the header
	solution: { shown: number; muted: number };
	divider: number;
	outcomes: Record<OutcomeId, OutcomePose>;
	feedback: number;
};

const steady = (status: OutcomeStatus): OutcomePose => ({ status, from: status, change: 1, shown: 1 });
const becoming = (from: OutcomeStatus, status: OutcomeStatus, change: number): OutcomePose => ({ status, from, change, shown: 1 });

// Every customer question still open, appearing together.
const openQuestions = (shown: number): Record<OutcomeId, OutcomePose> => ({
	stock: { ...steady('open'), shown },
	hours: { ...steady('open'), shown },
	reservation: { ...steady('open'), shown },
});

// The settled picture once attention has moved to the customer: solution
// parts set apart, the first question chosen, the others left for later.
const customerFocus = (name: BeatName): TypographyPose => ({
	beat: name,
	cover: 0,
	solution: { shown: 1, muted: 1 },
	divider: 1,
	outcomes: { stock: steady('question'), hours: steady('later'), reservation: steady('later') },
	feedback: 0,
});

// Poses by progress (0–1) through each beat; `ease(t, start, duration)`.
const poses: Record<BeatName, (t: number) => TypographyPose> = {
	title: () => ({ ...customerFocus('title'), cover: 1, solution: { shown: 0, muted: 0 }, divider: 0, outcomes: openQuestions(0) }),
	distinction: (t) => ({
		...customerFocus('distinction'),
		cover: 1 - ease(t, 0, 0.2),
		solution: { shown: ease(t, 0.15, 0.3), muted: 0 },
		divider: ease(t, 0.45, 0.15),
		outcomes: openQuestions(ease(t, 0.5, 0.3)),
	}),
	question: (t) => ({
		...customerFocus('question'),
		solution: { shown: 1, muted: ease(t, 0, 0.3) },
		outcomes: { stock: becoming('open', 'question', ease(t, 0, 0.3)), hours: becoming('open', 'later', ease(t, 0.25, 0.25)), reservation: becoming('open', 'later', ease(t, 0.3, 0.25)) },
	}),
	result: (t) => {
		const pose = customerFocus('result');
		return { ...pose, outcomes: { ...pose.outcomes, stock: becoming('question', 'done', ease(t, 0.05, 0.3)) } };
	},
	feedback: (t) => {
		const pose = customerFocus('feedback');
		return { ...pose, outcomes: { ...pose.outcomes, stock: steady('done') }, feedback: ease(t, 0, 0.3) };
	},
	next: (t) => ({
		...customerFocus('next'),
		outcomes: { stock: steady('done'), hours: becoming('later', 'next', ease(t, 0.05, 0.3)), reservation: becoming('later', 'unstarted', ease(t, 0.35, 0.25)) },
		feedback: 1,
	}),
};

export type TypographyVersion = { id: string; fps: number; seconds: Record<BeatName, number> };

export const typographyV1: TypographyVersion = {
	id: 'TreatmentTypographyV1',
	fps: 30,
	seconds: { title: 3, distinction: 5.5, question: 4.5, result: 5, feedback: 4.5, next: 6.5 },
};

export const typographyTimeline = (version: TypographyVersion): Timeline<TypographyPose> => timeline(
	brief.beats.map(({ name, caption }): Beat<TypographyPose> => ({ name, seconds: version.seconds[name], caption, pose: poses[name] })),
	version.fps,
);
