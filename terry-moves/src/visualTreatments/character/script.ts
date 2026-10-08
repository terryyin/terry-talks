// Treatment B: one shopper acts the passage. Intent before the trip, modest
// relief at a usable stock answer, a walk to a closed door, then attention
// moving to opening hours. Each beat's pose depends only on seconds into that
// beat, so appending a later beat never changes the picture of an earlier one.
import type { Mood } from '../../aiTestAutomation/actors';
import { blinkAt, gesture, mix, Point, travel } from '../../aiTestAutomation/motion';
import { beat, Timeline, timeline } from '../../beatTimeline';
import { BeatName, brief, OutcomeId, OutcomeStatus, TreatmentVersion } from '../brief';

// Where the shopper's attention is; the renderer turns it into gaze and tilt.
export type Attention = 'trip' | 'solution' | 'customer' | 'stock' | 'result' | 'door' | 'hours';

export type ShopperPose = {
	x: number;
	lift: number;
	mood: Mood;
	gaze: number; // −1 looks left, 1 looks right
	headTilt: number;
	blink: boolean;
	// How far (0–1) the right hand has moved from rest toward a scene point.
	reach: { to: Point; amount: number };
};

export type OutcomeMark = { status: OutcomeStatus; shown: number };

export type CharacterPose = {
	beat: BeatName;
	cover: number; // 1 = large title, 0 = title settled in the header
	need: number;
	solution: { shown: number; muted: number };
	divider: number;
	outcomes: Record<OutcomeId, OutcomeMark>;
	closedSign: number;
	feedback: number;
	attention: Attention;
	shopper: ShopperPose;
};

// The staging every renderer of this treatment shares.
export const stage = {
	ground: 860,
	home: 230,
	door: 500,
	scale: 0.85,
	// Points the shopper's hand reaches toward.
	stockCard: { x: 380, y: 380 },
	hoursPlaque: { x: 660, y: 700 },
} as const;

const at = (status: OutcomeStatus, shown = 1): OutcomeMark => ({ status, shown });
// Status flips once its change passes halfway, so a mark is never two things.
const turning = (from: OutcomeStatus, to: OutcomeStatus, change: number): OutcomeMark => at(change >= 0.5 ? to : from);

const shopperAt = (x: number, mood: Mood, gaze: number): ShopperPose => ({ x, lift: 0, mood, gaze, headTilt: 0, blink: false, reach: { to: stage.stockCard, amount: 0 } });

const settledCustomer = (name: BeatName): Omit<CharacterPose, 'attention' | 'shopper'> => ({
	beat: name,
	cover: 0,
	need: 0,
	solution: { shown: 1, muted: 1 },
	divider: 1,
	outcomes: { stock: at('question'), hours: at('later'), reservation: at('later') },
	closedSign: 0,
	feedback: 0,
});

// How the shopper acts each beat: poses by seconds into the beat.
export type Performance = Record<BeatName, (s: number) => CharacterPose>;

// A named take on this treatment: its timing and the performance it shows.
export type CharacterVersion = TreatmentVersion & { performance: Performance };

// The first take's performance. Later versions reuse its unchanged beats and
// supply their own revised ones, so this take keeps its picture.
const firstPerformance: Performance = {
	// The shopper at home, looking toward the shop: is the trip worth it?
	title: (s) => ({
		...settledCustomer('title'),
		cover: 1,
		need: travel(s, 0.2, 0.6),
		solution: { shown: 0, muted: 0 },
		divider: 0,
		outcomes: { stock: at('open', 0), hours: at('open', 0), reservation: at('open', 0) },
		attention: 'trip',
		shopper: { ...shopperAt(stage.home, 'concerned', 1), headTilt: 3 * gesture(s, 0.9, 1.4), blink: blinkAt(s, [2.2]) },
	}),
	// The shopper glances at an imagined solution's parts, then turns to
	// their own smaller questions.
	distinction: (s) => {
		const look = travel(s, 0.9, 0.5) * (1 - travel(s, 3.0, 0.5));
		const turned = s >= 3.2;
		const shown = travel(s, 2.6, 0.9);
		return {
			...settledCustomer('distinction'),
			cover: 1 - travel(s, 0, 0.9),
			need: 1 - travel(s, 0.3, 0.7),
			solution: { shown: travel(s, 0.8, 1.0), muted: 0 },
			divider: travel(s, 2.3, 0.6),
			outcomes: { stock: at('open', shown), hours: at('open', shown), reservation: at('open', shown) },
			attention: turned ? 'customer' : s >= 0.9 ? 'solution' : 'trip',
			shopper: { ...shopperAt(stage.home, turned ? 'focused' : 'concerned', mix(1, -1, look)), headTilt: -6 * look, blink: blinkAt(s, [4.6]) },
		};
	},
	// The shopper asks the smallest useful question, with an open hand.
	question: (s) => ({
		...settledCustomer('question'),
		solution: { shown: 1, muted: travel(s, 0, 1.2) },
		outcomes: { stock: turning('open', 'question', travel(s, 0.2, 0.6)), hours: turning('open', 'later', travel(s, 0.8, 0.5)), reservation: turning('open', 'later', travel(s, 1.0, 0.5)) },
		attention: 'stock',
		shopper: { ...shopperAt(stage.home, 'focused', 1), headTilt: -4 * travel(s, 0.1, 0.5), blink: blinkAt(s, [3.3]), reach: { to: stage.stockCard, amount: gesture(s, 0.4, 2.2) } },
	}),
	// A usable answer arrives; a breath out and a small nod, no celebration.
	result: (s) => {
		const answered = travel(s, 0.3, 0.6);
		const exhale = s >= 0.9 && s < 1.5;
		return {
			...settledCustomer('result'),
			outcomes: { stock: turning('question', 'done', answered), hours: at('later'), reservation: at('later') },
			attention: 'result',
			shopper: { ...shopperAt(stage.home, answered < 0.5 ? 'focused' : exhale ? 'relieved' : 'pleased', 1), headTilt: -4 + 5 * gesture(s, 1.6, 0.9), blink: blinkAt(s, [3.6]) },
		};
	},
	// The shopper walks to the shop and finds the door closed.
	feedback: (s) => {
		const walk = travel(s, 0.2, 2.0);
		const walking = s > 0.2 && s < 2.2;
		const arrived = s >= 2.3;
		return {
			...settledCustomer('feedback'),
			outcomes: { stock: at('done'), hours: at('later'), reservation: at('later') },
			closedSign: travel(s, 2.0, 0.4),
			feedback: travel(s, 2.7, 0.6),
			attention: arrived ? 'door' : 'trip',
			shopper: {
				...shopperAt(mix(stage.home, stage.door, walk), !arrived ? 'pleased' : s < 3.5 ? 'surprised' : 'concerned', 1),
				lift: walking ? 9 * Math.abs(Math.sin((s - 0.2) * Math.PI * 2.5)) : 0,
				headTilt: arrived ? 4 * travel(s, 3.5, 0.6) : 0,
				blink: blinkAt(s, [4.8]),
			},
		};
	},
	// Attention moves to opening hours; the stock answer is still worth having;
	// reservation is left alone.
	next: (s) => {
		const glanceBack = s >= 3.6 && s < 4.8;
		const lowered = travel(s, 3.3, 0.3) * (1 - travel(s, 4.8, 0.4));
		return {
			...settledCustomer('next'),
			outcomes: { stock: at('done'), hours: turning('later', 'next', travel(s, 0.5, 0.5)), reservation: turning('later', 'unstarted', travel(s, 2.3, 0.5)) },
			closedSign: 1,
			feedback: 1,
			attention: glanceBack ? 'result' : s >= 0.3 ? 'hours' : 'door',
			shopper: {
				...shopperAt(stage.door, glanceBack ? 'pleased' : s >= 0.3 ? 'focused' : 'concerned', glanceBack ? -1 : 1),
				headTilt: glanceBack ? -5 : -6 * travel(s, 0.3, 0.5),
				blink: blinkAt(s, [2.9, 5.6]),
				reach: { to: stage.hoursPlaque, amount: travel(s, 0.8, 0.5) * (1 - lowered) },
			},
		};
	},
};

export const characterV1: CharacterVersion = {
	id: 'TreatmentCharacterV1',
	fps: 30,
	seconds: { title: 3, distinction: 5.5, question: 4.5, result: 5, feedback: 6, next: 6.5 },
	performance: firstPerformance,
};

export const characterTimeline = (version: CharacterVersion): Timeline<CharacterPose> => timeline(
	brief.beats.map(({ name, caption }) => beat(name, version.seconds[name], caption, version.performance[name], version.fps)),
	version.fps,
);
