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
import { cellsCovered, columnCenter } from './layout';
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
	cells: [number, number][]; // the cells (column, row) this impact is assimilated into
	assimilate: number; // 0–1: the splash sinking tidily into those cells
};

// A cell of the product, taking on the finish of the impacts assimilated into it.
export type CellPose = { col: number; row: number; fills: { color: string; amount: number }[] };

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
	dy: number; // px sunk below the floor, stepping out

	bubble?: BubblePose;
};

export type BallPose = { id: string; color: string; x: number; y: number; r: number; show: number; squash: number; mood: Mood; label?: string; twinkle?: number };

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
	cells: CellPose[];
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
	[CUE.assimilate + 3.5, 0.72],
	[CUE.stories[0], 0.72],
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
	{ from: CUE.rewind, text: 'Standards rise' },
];

const headerAt = (s: number): Pose['header'] => {
	const current = [...HEADERS].reverse().find((h) => s >= h.from) ?? HEADERS[0];
	return { text: current.text, warn: current.warn === true, pop: current.from < 0 ? 1 : pop(s, current.from) };
};

// --- component teams (0:00–0:29) ------------------------------------------------

const TEAM_A = { col: 1, color: ballColors.grape };
const COMPONENT_SHIRTS = [ballColors.orange, TEAM_A.color, ballColors.lime, ballColors.sun];

// The shiny, beautiful plan everybody can see, until Team A takes it to its own
// column; it melts into the column without a splash.
const PLAN_HOME = { x: 560, y: 118 };
const componentBall = (s: number): BallPose => {
	const taken = between(s, CUE.planTakenFrom, CUE.melt - 0.6, Easing.inOut(Easing.quad));
	const melt = 1 - between(s, CUE.melt, CUE.melt + 1.4);
	return {
		id: 'plan',
		color: TEAM_A.color,
		x: lerp(PLAN_HOME.x, columnCenter(TEAM_A.col), taken),
		y: lerp(PLAN_HOME.y + Math.sin(s * 3) * 4 * (1 - taken), 215, taken),
		r: 42,
		show: pop(s, CUE.ballIn) * melt,
		squash: 1,
		mood: 'dreamy',
		label: 'A shiny plan',
		twinkle: s,
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
			x: columnCenter(col),
			show: pop(s, col * 0.15) * (1 - gone),
			mood: mine ? 'smile' : shocked ? 'hopeful' : ignorant ? 'sleepy' : 'smile',
			shirt,
			label: mine && walking === 0 ? 'Team A' : undefined,
			face: 1,
			bob: 0,
			hand: 0,
			dy: mine ? walking * 260 : 0,
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
const TEAM_1: Team = { color: ballColors.pink, home: 200, spot: { cx: 265, cy: 450 } };
const TEAM_2: Team = { color: ballColors.teal, home: 560, spot: { cx: 410, cy: 510 } };
const SPLASH_R = 170;

// Later stories: each splashes over its own irregular run of cells across
// components and features, then is assimilated tidily into each of them.
type Spot = { cx: number; cy: number; r: number };
export const LATER_STORIES: { spot: Spot; color: string }[] = [
	{ spot: { cx: 150, cy: 300, r: 170 }, color: ballColors.sun },
	{ spot: { cx: 600, cy: 450, r: 220 }, color: ballColors.lime },
	{ spot: { cx: 150, cy: 560, r: 170 }, color: ballColors.orange },
];
export const footprint = ({ spot }: { spot: Spot }): [number, number][] => cellsCovered(spot.cx, spot.cy, spot.r);

const teamBall = (s: number, id: string, team: Team): BallPose => {
	const dive = between(s, CUE.dive, CUE.splash, Easing.in(Easing.quad));
	const hop = s < CUE.dive ? Math.abs(Math.sin(s * 5 + team.home)) * 16 : 0;
	return {
		id,
		color: team.color,
		x: lerp(team.home, team.spot.cx, dive),
		y: lerp(108 - hop, team.spot.cy, dive),
		r: 38,
		show: s < CUE.splash ? pop(s, CUE.teamsIn + 0.4) : 0,
		squash: dive > 0 ? 1 - 0.18 * dive : 1,
		mood: dive > 0 ? 'gleeful' : 'hopeful',
	};
};

const laterBalls = (s: number): BallPose[] =>
	LATER_STORIES.map((story, i): BallPose => {
		const at = CUE.stories[i];
		const to = story.spot;
		const fall = between(s, at - 0.9, at, Easing.in(Easing.quad));
		return {
			id: `later-${i}`,
			color: story.color,
			x: to.cx,
			y: lerp(108, to.cy, fall),
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
	const teams = [
		{ id: 'team-1', team: 1 as const, team_: TEAM_1, seed: 5, finish: 'tidy' as const, repaint: 0 },
		{ id: 'team-2', team: 2 as const, team_: TEAM_2, seed: 17, finish: 'scrappy' as const, repaint: two },
	].map(({ id, team, team_, seed, finish, repaint }): PatchPose => ({
		id,
		team,
		...team_.spot,
		r: SPLASH_R,
		seed,
		color: team_.color,
		grow: grow(s, CUE.splash),
		finish,
		finishShown: between(s, CUE.finish, CUE.finish + 2),
		repaint,
		curl,
		cells: cellsCovered(team_.spot.cx, team_.spot.cy, SPLASH_R),
		assimilate: between(s, CUE.assimilate, CUE.assimilate + 3.2, ease),
	}));
	const later = LATER_STORIES.map((story, i): PatchPose => {
		const at = CUE.stories[i];
		return {
			id: `later-${i}`,
			team: 0,
			...story.spot,
			seed: 31 + i * 7,
			color: story.color,
			grow: grow(s, at),
			finish: 'shared',
			finishShown: 1,
			repaint: 0,
			curl,
			cells: footprint(story),
			assimilate: between(s, at + 0.6, at + 2.2, ease),
		};
	});
	return [...teams, ...later].filter((p) => p.grow > 0 && p.assimilate < 1);
};

// The cells the impacts are sinking into: tidy, in the grid, in the shared finish,
// one cell after another. Overlapping impacts share a cell.
const cellsAt = (s: number): CellPose[] => {
	const stories = [
		{ color: TEAM_1.color, cells: cellsCovered(TEAM_1.spot.cx, TEAM_1.spot.cy, SPLASH_R), from: CUE.assimilate },
		{ color: TEAM_2.color, cells: cellsCovered(TEAM_2.spot.cx, TEAM_2.spot.cy, SPLASH_R), from: CUE.assimilate },
		...LATER_STORIES.map((story, i) => ({ color: story.color, cells: footprint(story), from: CUE.stories[i] + 0.6 })),
	];
	const duration = (i: number) => (i < 2 ? 3.2 : 1.7);
	const cells: CellPose[] = [];
	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 4; col++) {
			const fills = stories.flatMap((story, i) => {
				const k = story.cells.findIndex(([c, r]) => c === col && r === row);
				if (k < 0) return [];
				const amount = between(s, story.from + (k / story.cells.length) * duration(i) * 0.6, story.from + (k / story.cells.length) * duration(i) * 0.6 + duration(i) * 0.4);
				return amount > 0 ? [{ color: story.color, amount }] : [];
			});
			cells.push({ col, row, fills });
		}
	}
	return cells;
};

const teamDevs = (s: number, neglect: number): DevPose[] => {
	const step = between(s, CUE.step, CUE.step + 0.8, ease);
	const away = neglect > 0.35;
	const painful = s >= CUE.reply - 0.3 && s < CUE.together + 0.5;
	const joyful = s >= CUE.joy;
	const mood = (weary: Mood, idle: Mood): Mood => (away ? 'sleepy' : joyful ? 'gleeful' : painful ? weary : idle);
	return [
		{
			id: 'dev-1',
			x: lerp(TEAM_1.home, 290, step),
			show: pop(s, CUE.teamsIn),
			mood: mood('hopeful', 'smile'),
			shirt: TEAM_1.color,
			label: 'Team 1',
			face: away ? -1 : 1,
			bob: 0,
			hand: s >= CUE.hey && s < CUE.reply ? between(s, CUE.hey, CUE.hey + 0.3) : 0,
			dy: 0,
			bubble:
				speech(s, CUE.hey, CUE.tests - 0.3, 'Hey!', 'shout') ??
				speech(s, CUE.tests, CUE.reply, "Aren't we supposed to write tests here?", 'shout') ??
				speech(s, 88.2, 93.2, 'Meh.', 'weary') ??
				speech(s, CUE.talkAgain, CUE.talkAgain + 3, "Let's talk."),
		},
		{
			id: 'dev-2',
			x: lerp(TEAM_2.home, 480, step),
			show: pop(s, CUE.teamsIn + 0.15),
			mood: mood('dreamy', 'smile'),
			shirt: TEAM_2.color,
			label: 'Team 2',
			face: away ? 1 : -1,
			bob: 0,
			hand: 0,
			dy: 0,
			bubble:
				speech(s, CUE.reply, CUE.together + 0.8, 'Ouch. Fair point.') ??
				speech(s, 90, 94.6, 'Whatever.', 'weary') ??
				speech(s, CUE.talkAgain + 1.6, CUE.talkAgain + 4.6, 'Agreed.'),
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
	// The test tags have done their job once the impacts sink into the cells.
	const gone = 1 - between(s, CUE.assimilate, CUE.assimilate + 1.2);
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
			? [teamBall(s, 'team-1', TEAM_1), teamBall(s, 'team-2', TEAM_2), ...laterBalls(s)].filter((b) => b.show > 0)
			: [componentBall(s)].filter((b) => b.show > 0),
		patches: feature ? patchesAt(s, neglect) : [],
		cells: cellsAt(feature ? s : 0),
		tags: {
			tests: pop(s, CUE.testsTag) * gone,
			noTests: pop(s, CUE.noTestsTag) * gone,
			testsOnTeam2: between(s, CUE.repaint + 2.5, CUE.repaint + 3.5),
			overlap: pop(s, CUE.overlapLabel) * (1 - between(s, CUE.overlapLabel + 4, CUE.overlapLabel + 4.5)),
			warning: pop(s, CUE.noTestsTag + 1.5) * (1 - between(s, CUE.repaint + 3, CUE.repaint + 4)) * gone,
		},
		zap: s >= CUE.zap ? pop(s, CUE.zap) * (1 - between(s, CUE.together - 0.2, CUE.together + 0.3)) : 0,
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
