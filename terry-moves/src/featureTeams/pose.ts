// Pure pose model of the feature-teams scene: everything visible at a moment
// of Bas's clip (`s`, seconds into it). Components only draw it.
// The story goes: component teams hide a mess; feature teams overlap and
// their practices clash; a conversation, facilitated, agrees shared
// practices; if that is neglected quality spirals down (a warning, not the
// ending); facilitated, standards and quality rise gradually.

import { Easing, interpolate } from 'remotion';
import { between, bounce, BOUNCY, lerp, POPPY } from '../storyImpact/motion';
import { ballColors } from '../storyImpact/scene';
import type { Mood } from '../storyImpact/face';
import { columnCenter } from './layout';
import { CUE } from './cues';

export type Finish = 'tidy' | 'scrappy' | 'shared';

export type PatchPose = {
	id: string;
	team: 1 | 2 | 0; // 0: a later story of the shared standards
	cx: number;
	cy: number;
	r: number;
	seed: number;
	color: string;
	grow: number; // the splash spreading; overshoots a little
	finish: Finish; // how this team finishes its work
	finishShown: number; // 0–1: the finish showing over the plain paint
	repaint: number; // 0–1: repainted to the shared finish, spreading from the middle
	curl: number; // 0–1: curling up, nobody caring
};

export type BubblePose = { text: string; pop: number; tone: 'plain' | 'shout' | 'weary' };

export type DevPose = {
	id: string;
	x: number;
	show: number;
	mood: Mood;
	shirt: string;
	label?: string;
	face: -1 | 1; // which way they look
	bob: number; // seconds of walking, 0 = standing
	hand: number; // 0–1: an arm raised toward the other
	clipboard?: boolean;
	bubble?: BubblePose;
};

export type BallPose = { id: string; color: string; x: number; y: number; r: number; show: number; squash: number; mood: Mood; label?: string };

export type ColumnPose = {
	col: number;
	sheen: number; // 0–1: the shiny, proper idea, sweeping down
	mess: number; // 0–1: ugly and quirky by local practices
	fence: number; // 0–1: the team's fence around what it owns
};

export type CardPose = { pin: number; items: number; pulse: number; fall: number };

export type Pose = {
	s: number;
	header: { text: string; warn: boolean; pop: number };
	quality?: number; // 0–1, the meter; undefined before the feature-team story
	look: { saturation: number; paper: string };
	column?: ColumnPose;
	sheet: { cover: number; uncover: number };
	balls: BallPose[];
	patches: PatchPose[];
	tags: { tests: number; noTests: number; testsOnTeam2: number; overlap: number; warning: number };
	zap: number;
	devs: DevPose[];
	card?: CardPose;
	spiral: number;
	neglect: number; // 0–1: how far the warning branch has gone
	flash: number; // the rewind out of the warning
	coherent: number;
	joy: number; // sparkles when it reads as one surface
	inset: number;
};

// --- helpers ---------------------------------------------------------------

const ease = Easing.inOut(Easing.cubic);
const pop = (s: number, from: number) => bounce(s, from, POPPY);

// A curve through [seconds, value] points, linear between them.
export const curve = (points: readonly (readonly [number, number])[], s: number): number =>
	interpolate(s, points.map((p) => p[0]), points.map((p) => p[1]), { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

const hex = (c: string): number[] => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
export const mixHex = (a: string, b: string, k: number): string => {
	const [x, y] = [hex(a), hex(b)];
	return `#${x.map((v, i) => Math.round(lerp(v, y[i], Math.max(0, Math.min(1, k)))).toString(16).padStart(2, '0')).join('')}`;
};

const speech = (s: number, from: number, to: number, text: string, tone: BubblePose['tone'] = 'plain'): BubblePose | undefined =>
	s < from || s >= to ? undefined : { text, tone, pop: Math.min(bounce(s, from, BOUNCY), 1 - between(s, to - 0.25, to)) };

// --- the story's numbers -------------------------------------------------------

// Product quality as the meter shows it: the fresh product, the clash of
// practices, the agreement, the warning, and the gradual rise.
const QUALITY: [number, number][] = [
	[CUE.feature + 0.5, 0.62],
	[CUE.splash + 0.6, 0.62],
	[CUE.finish + 2, 0.44],
	[52, 0.36],
	[CUE.tests + 3, 0.3],
	[CUE.agree, 0.4],
	[CUE.repaint, 0.5],
	[CUE.repaint + 6, 0.6],
	[CUE.neglectFrom, 0.64],
	[CUE.rewind + 0.8, 0.66],
	[CUE.stories[0], 0.7],
	[CUE.stories[0] + 1.6, 0.76],
	[CUE.stories[1] + 1.6, 0.83],
	[CUE.stories[2] + 1.6, 0.9],
	[CUE.coherent + 4.5, 1],
];

const neglectAt = (s: number): number =>
	between(s, CUE.neglectFrom, CUE.neglectTo, Easing.in(Easing.quad)) * (1 - between(s, CUE.rewind, CUE.rewind + 0.8));

const HEADERS: { from: number; text: string; warn?: boolean }[] = [
	{ from: -1, text: 'Component teams' },
	{ from: CUE.feature, text: 'Feature teams' },
	{ from: CUE.step, text: 'Two ways of building' },
	{ from: CUE.painful, text: 'Painful, but very good' },
	{ from: CUE.agree, text: 'Agree how we build here' },
	{ from: CUE.neglectFrom, text: 'If nobody pays attention…', warn: true },
	{ from: CUE.rewind, text: 'Facilitated: standards rise' },
];

const headerAt = (s: number): Pose['header'] => {
	const current = [...HEADERS].reverse().find((h) => s >= h.from) ?? HEADERS[0];
	return { text: current.text, warn: current.warn === true, pop: current.from < 0 ? 1 : pop(s, current.from) };
};

// --- component teams (0:00–0:29) ------------------------------------------------

const TEAM_A = { col: 1, color: ballColors.grape };
const COMPONENT_SHIRTS = [ballColors.orange, TEAM_A.color, ballColors.lime, ballColors.sun];

const componentBall = (s: number): BallPose => {
	const y = lerp(100, 195, between(s, 2.5, 6.5, Easing.inOut(Easing.quad)));
	const melt = 1 - between(s, CUE.melt, CUE.melt + 1.6);
	return {
		id: 'team-a',
		color: TEAM_A.color,
		x: columnCenter(TEAM_A.col),
		y,
		r: 34,
		show: pop(s, CUE.ballIn) * melt,
		squash: 1,
		mood: 'dreamy',
	};
};

const componentDevs = (s: number): DevPose[] => {
	const walking = between(s, CUE.leaveFrom, CUE.leaveTo, ease);
	const ignorant = s >= CUE.messFrom && s < CUE.gasp;
	const shocked = s >= CUE.gasp;
	const gone = between(s, CUE.sheetIn, CUE.sheetIn + 0.6);
	return COMPONENT_SHIRTS.map((shirt, col): DevPose => {
		const mine = col === TEAM_A.col;
		const bubble = mine
			? (speech(s, CUE.ourStandards, CUE.ourStandards + 5, 'Our standards.') ?? speech(s, CUE.ourWay, CUE.leaveFrom - 0.3, 'Our way.'))
			: col === 2
				? speech(s, CUE.gasp, CUE.sheetIn + 0.4, 'Oh… what a mess!', 'shout')
				: undefined;
		return {
			id: `component-${col}`,
			x: mine ? lerp(columnCenter(col), -110, walking) : columnCenter(col),
			show: pop(s, col * 0.15) * (1 - gone),
			mood: mine ? 'smile' : shocked ? 'hopeful' : ignorant ? 'sleepy' : 'smile',
			shirt,
			label: mine && walking === 0 ? 'Team A' : undefined,
			face: mine && walking > 0 ? -1 : 1,
			bob: mine && walking > 0 && walking < 1 ? s : 0,
			hand: 0,
			bubble,
		};
	});
};

const componentColumn = (s: number): ColumnPose => ({
	col: TEAM_A.col,
	sheen: between(s, CUE.melt, CUE.melt + 4.5) * (1 - between(s, CUE.messFrom, CUE.messFrom + 2)),
	mess: between(s, CUE.messFrom, CUE.messTo, ease),
	fence: (1 - between(s, CUE.leaveTo, CUE.leaveTo + 0.6)) * pop(s, CUE.ballIn),
});

// --- feature teams ----------------------------------------------------------------

type Team = { color: string; home: number; spot: { cx: number; cy: number } };
const TEAM_1: Team = { color: ballColors.pink, home: 200, spot: { cx: 250, cy: 440 } };
const TEAM_2: Team = { color: ballColors.teal, home: 560, spot: { cx: 470, cy: 500 } };
const SPLASH_R = 165;

// Later stories, landing where the two teams' work has not reached.
export const LATER_SPOTS = [
	{ cx: 135, cy: 235, r: 80, color: ballColors.sun },
	{ cx: 565, cy: 235, r: 85, color: ballColors.lime },
	{ cx: 615, cy: 645, r: 70, color: ballColors.orange },
] as const;

const teamBall = (s: number, id: string, team: Team, label: string): BallPose => {
	const dive = between(s, CUE.dive, CUE.splash, Easing.in(Easing.quad));
	const hop = s < CUE.dive ? Math.abs(Math.sin(s * 5 + team.home)) * 16 : 0;
	return {
		id,
		color: team.color,
		x: lerp(team.home, team.spot.cx, dive),
		y: lerp(105 - hop, team.spot.cy, dive),
		r: 38,
		show: s < CUE.splash ? pop(s, CUE.teamsIn + 0.4) : 0,
		squash: dive > 0 ? 1 - 0.18 * dive : 1,
		mood: dive > 0 ? 'gleeful' : 'hopeful',
		label,
	};
};

const laterBalls = (s: number): BallPose[] =>
	LATER_SPOTS.map((spot, i): BallPose => {
		const at = CUE.stories[i];
		const fall = between(s, at - 0.9, at, Easing.in(Easing.quad));
		return {
			id: `later-${i}`,
			color: spot.color,
			x: spot.cx,
			y: lerp(105, spot.cy, fall),
			r: 30,
			show: s >= at - 1.4 && s < at ? pop(s, at - 1.4) : 0,
			squash: 1 - 0.15 * fall,
			mood: 'smile',
		};
	});

const grow = (s: number, at: number) => bounce(s, at, { damping: 9, stiffness: 130, mass: 0.8 });

const patchesAt = (s: number, neglect: number): PatchPose[] => {
	const curl = neglect;
	const two = between(s, CUE.repaint, CUE.repaint + 6, ease);
	const all: PatchPose[] = [
		{ id: 'team-1', team: 1, ...TEAM_1.spot, r: SPLASH_R, seed: 5, color: TEAM_1.color, grow: grow(s, CUE.splash), finish: 'tidy', finishShown: between(s, CUE.finish, CUE.finish + 2), repaint: 0, curl },
		{ id: 'team-2', team: 2, ...TEAM_2.spot, r: SPLASH_R, seed: 17, color: TEAM_2.color, grow: grow(s, CUE.splash), finish: 'scrappy', finishShown: between(s, CUE.finish, CUE.finish + 2), repaint: two, curl },
		...LATER_SPOTS.map((spot, i): PatchPose => ({
			id: `later-${i}`,
			team: 0,
			cx: spot.cx,
			cy: spot.cy,
			r: spot.r,
			seed: 31 + i * 7,
			color: spot.color,
			grow: grow(s, CUE.stories[i]),
			finish: 'shared',
			finishShown: 1,
			repaint: 0,
			curl,
		})),
	];
	return all.filter((p) => p.grow > 0);
};

const teamDevs = (s: number, neglect: number): DevPose[] => {
	const step = between(s, CUE.step, CUE.step + 0.8, ease);
	const back = between(s, CUE.facilitator, CUE.facilitator + 0.7, ease);
	const away = neglect > 0.35;
	// The facilitator walks off when nobody pays attention, and comes back after the rewind.
	const leaves = between(s, CUE.neglectFrom - 0.6, CUE.neglectFrom + 0.4);
	const returns = between(s, CUE.rewind + 0.4, CUE.rewind + 1.1);
	const facilitator = s >= CUE.facilitator ? pop(s, CUE.facilitator) * (s < CUE.rewind ? 1 - leaves : returns) : 0;
	const painful = s >= CUE.reply - 0.3 && s < CUE.facilitator + 0.5;
	const joyful = s >= CUE.joy;
	const mood = (weary: Mood, idle: Mood): Mood => (away ? 'sleepy' : joyful ? 'gleeful' : painful ? weary : idle);
	const homeA = TEAM_1.home;
	const homeB = TEAM_2.home;
	return [
		{
			id: 'dev-1',
			x: lerp(homeA, 290, step) - 75 * back,
			show: pop(s, CUE.teamsIn),
			mood: mood('hopeful', 'smile'),
			shirt: TEAM_1.color,
			label: 'Team 1',
			face: away ? -1 : 1,
			bob: 0,
			hand: s >= CUE.hey && s < CUE.reply ? between(s, CUE.hey, CUE.hey + 0.3) : 0,
			bubble:
				speech(s, CUE.hey, CUE.tests - 0.3, 'Hey!', 'shout') ??
				speech(s, CUE.tests, CUE.reply, "Aren't we supposed to write tests here?", 'shout') ??
				speech(s, 88.2, 93.2, 'Meh.', 'weary'),
		},
		{
			id: 'dev-2',
			x: lerp(homeB, 480, step) + 75 * back,
			show: pop(s, CUE.teamsIn + 0.15),
			mood: mood('dreamy', 'smile'),
			shirt: TEAM_2.color,
			label: 'Team 2',
			face: away ? 1 : -1,
			bob: 0,
			hand: 0,
			bubble: speech(s, CUE.reply, CUE.facilitator + 0.8, 'Ouch. Fair point.') ?? speech(s, 90, 94.6, 'Whatever.', 'weary'),
		},
		{
			id: 'facilitator',
			x: 385,
			show: facilitator,
			mood: joyful ? 'gleeful' : 'smile',
			shirt: ballColors.sun,
			label: 'Facilitator',
			face: 1,
			bob: 0,
			hand: s >= CUE.rewind + 1 ? between(s, CUE.rewind + 1, CUE.rewind + 1.5) : 0,
			clipboard: true,
		},
	];
};

// --- the whole moment ---------------------------------------------------------------

export const poseAt = (seconds: number): Pose => {
	const s = Math.max(0, seconds);
	const feature = s >= CUE.feature;
	const neglect = neglectAt(s);
	const qualityNow = feature ? curve(QUALITY, s) : undefined;
	const quality = qualityNow === undefined ? undefined : Math.max(0.08, lerp(qualityNow, 0.08, neglect));
	const q = quality ?? 0.75;
	const cardSince = s >= CUE.card;
	return {
		s,
		header: headerAt(s),
		quality,
		look: {
			saturation: 0.5 + 0.65 * q,
			paper: mixHex(mixHex('#E4E2DE', '#FFF6E5', q / 0.75), '#FFEBC2', (q - 0.75) / 0.25),
		},
		column: feature ? undefined : componentColumn(s),
		sheet: { cover: between(s, CUE.sheetIn, CUE.sheetIn + 0.8, ease), uncover: between(s, CUE.sheetOut, CUE.sheetOut + 0.8, ease) },
		balls: feature
			? [teamBall(s, 'team-1', TEAM_1, 'Team 1'), teamBall(s, 'team-2', TEAM_2, 'Team 2'), ...laterBalls(s)].filter((b) => b.show > 0)
			: [componentBall(s)].filter((b) => b.show > 0),
		patches: feature ? patchesAt(s, neglect) : [],
		tags: {
			tests: pop(s, CUE.testsTag),
			noTests: pop(s, CUE.noTestsTag),
			testsOnTeam2: between(s, CUE.repaint + 2.5, CUE.repaint + 3.5),
			overlap: pop(s, CUE.overlapLabel) * (1 - between(s, CUE.overlapLabel + 4, CUE.overlapLabel + 4.5)),
			warning: pop(s, CUE.noTestsTag + 1.5) * (1 - between(s, CUE.repaint + 3, CUE.repaint + 4)),
		},
		zap: s >= CUE.zap ? pop(s, CUE.zap) * (1 - between(s, CUE.facilitator - 0.2, CUE.facilitator + 0.3)) : 0,
		devs: feature ? teamDevs(s, neglect) : componentDevs(s),
		card: cardSince
			? {
					pin: pop(s, CUE.card),
					items: CUE.items.reduce((n, at) => n + between(s, at, at + 0.5, Easing.out(Easing.back(2))), 0),
					pulse: between(s, CUE.pulse, CUE.pulse + 5) * (1 - between(s, CUE.neglectFrom - 0.5, CUE.neglectFrom)),
					fall: neglect,
				}
			: undefined,
		spiral: neglect > 0 ? Math.min(1, neglect * 2) : 0,
		neglect,
		flash: Math.sin(Math.PI * between(s, CUE.rewind, CUE.rewind + 0.9)),
		coherent: between(s, CUE.coherent, CUE.coherent + 4.5, ease),
		joy: between(s, CUE.joy, CUE.joy + 1) * (1 - between(s, 114, 116)),
		inset: 1,
	};
};
