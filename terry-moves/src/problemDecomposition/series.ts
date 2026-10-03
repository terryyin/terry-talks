import { coherentProductOf } from '../storyImpact/assimilation';
import { assimilateBeatOf, coherentBeatOf } from '../storyImpact/productBeats';
import { flightPoint, Point } from '../storyImpact/layout';
import { CellPose, messyProductOf, StoryBefore, StorySpec, tidyCells } from '../storyImpact/scene';
import { palette } from './design';
import { FilmScene, filmScript, mix, reveal, SceneId } from './film';

export const sceneById = (id: SceneId): FilmScene => filmScript.scenes.find((scene) => scene.id === id)!;
export const spokenCue = (id: SceneId, clause: number, word?: string): number => {
	const caption = sceneById(id).captionRanges[clause];
	return word ? caption.wordCues[word] ?? caption.speechStart : caption.speechStart;
};

export const chapters = ['Distinction', 'Premises', 'Goals', 'Principles'] as const;
export const chapterOf = (id: SceneId): number =>
	['hook', 'parts', 'problem'].includes(id) ? 0 : id === 'premises' ? 1 : ['value', 'stop'].includes(id) ? 2 : 3;

export const outcomeLines = [['Find the', 'next train'], ['Check', 'the fare'], ['Find a', 'step-free route']] as const;
export const outcomes: readonly string[] = outcomeLines.map((lines) => lines.join(' '));
export const colors = [palette.terracotta, palette.gold, palette.cobalt];
export const WISH: Point = { x: 815, y: 330 };
export const outcomeSpot = (index: number): Point => ({ x: 640 + index * 170, y: 440 });
export const structuralSplitAt = (seconds: number): number => reveal(seconds, spokenCue('parts', 0, 'structure'), 0.95);
export const customerSplitAt = (seconds: number): number => reveal(seconds, spokenCue('problem', 0, 'splits'), 1.3);

export const firstStory: StorySpec = {
	ball: { id: 'next-train', color: palette.terracotta, size: 58 },
	impact: { col: 2, row: 2 },
	changed: [{ col: 2, row: 0 }, { col: 1, row: 2 }, { col: 2, row: 3 }],
	reorganized: { col: 2, row: 2 },
	seed: 7,
	splash: 1.25,
};
const before: StoryBefore = {
	cells: tidyCells().map((cell) => ({ ...cell, color: (cell.col + cell.row) % 2 ? '#d9dfda' : '#dedbe6' })),
	history: [],
	backlog: [],
};
export const flightStart = (): number => spokenCue('value', 1, 'small');
export const impactAt = (): number => Math.max(flightStart() + 0.9, spokenCue('value', 1, 'product'));
export const coherentAt = (): number => impactAt() + 2.35;
export const feedbackCue = (): number => spokenCue('value', 2);

/** The same flight and assimilation used in Story Impact, tied to this performance. */
export const deliveryAt = (seconds: number): { cells: CellPose[]; paint?: ReturnType<typeof messyProductOf>['splat']; ball?: Point; complete: boolean } => {
	const impact = impactAt();
	if (seconds < flightStart()) return { cells: before.cells, complete: false };
	if (seconds < impact) {
		const t = reveal(seconds, flightStart(), impact - flightStart());
		return { cells: before.cells, ball: flyFrom(outcomeSpot(0), t, firstStory), complete: false };
	}
	if (seconds < impact + 0.6) {
		const messy = messyProductOf(firstStory, before);
		return { cells: messy.cells, paint: { ...messy.splat!, radius: mix(0.12, 1.25, reveal(seconds, impact, 0.3)) }, complete: false };
	}
	if (seconds < impact + 1.5) {
		const pose = assimilateBeatOf(firstStory, before)((seconds - impact - 0.6) / 0.9 * 3.7);
		return { cells: pose.cells, paint: pose.splat, complete: false };
	}
	if (seconds < coherentAt()) {
		const pose = coherentBeatOf(firstStory, before)((seconds - impact - 1.5) / 0.85 * 1.4);
		return { cells: pose.cells, paint: pose.splat, complete: false };
	}
	return { cells: coherentProductOf(firstStory, before).cells, complete: true };
};

/** Future balls cross in separate lanes; neither has started or changed the product. */
export const futureSpot = (index: 1 | 2, seconds: number): Point => {
	const initial = outcomeSpot(index);
	const movedUp = reveal(seconds, flightStart(), 1);
	const base = initial.x - 65 * movedUp;
	const feedback = feedbackCue();
	const exchange = reveal(seconds, feedback + 0.45, 0.8);
	const lifted = reveal(seconds, feedback, 0.45) - reveal(seconds, feedback + 1.25, 0.45);
	return { x: base + (index === 1 ? 170 : -170) * exchange, y: initial.y - (index === 2 ? lifted * 200 : 0) };
};

export const firstOutcomeVisible = (seconds: number): boolean => seconds < flightStart();

/** Screen-space leftmost column follows Structure upward; one layer stays plain. */
export const solutionLayers = [
	{ col: 3, row: 3, name: 'Screen', color: palette.cobalt },
	{ col: 3, row: 2, name: 'API', color: palette.gold },
	{ col: 3, row: 0, name: 'Database', color: palette.terracotta },
] as const;

export const blueStory: StorySpec = {
	ball: { id: 'step-free', color: palette.cobalt, size: 58 },
	impact: { col: 2, row: 2 },
	changed: [{ col: 2, row: 0 }, { col: 2, row: 3 }],
	reorganized: { col: 2, row: 2 },
	seed: 17,
	splash: 1.25,
};
export const BLUE_WAITING: Point = { x: 820, y: 490 };
const blueBefore = (): StoryBefore => ({ ...before, cells: coherentProductOf(firstStory, before).cells });
export const verticalFlightAt = (): number => spokenCue('vertical', 0, 'vertical');
export const verticalImpactAt = (): number => verticalFlightAt() + 0.9;
export const flowFlightAt = (): number => Math.max(spokenCue('vertical', 1), verticalImpactAt() + 0.45);
export const flowImpactAt = (): number => flowFlightAt() + 0.9;
export const assimilationAt = (): number => spokenCue('health', 0, 'assimilate');
export const blueCoherentAt = (): number => assimilationAt() + 2.7;

const flyFrom = (from: Point, progress: number, story: StorySpec): Point => {
	const arc = flightPoint(progress, story.impact);
	const start = flightPoint(0, story.impact);
	return { x: arc.x + (from.x - start.x) * (1 - progress), y: arc.y + (from.y - start.y) * (1 - progress) };
};

export const blueBallAt = (seconds: number): { at: Point; radius: number; glow: number; visible: number } | undefined => {
	if (seconds < sceneById('vertical').start || seconds >= flowImpactAt()) return undefined;
	const valuable = spokenCue('vertical', 0, 'valuable');
	const glow = reveal(seconds, valuable, 0.3) * (1 - reveal(seconds, verticalFlightAt(), 0.25));
	const visible = reveal(seconds, spokenCue('vertical', 0, 'visible'), 0.35) * (1 - reveal(seconds, verticalFlightAt(), 0.25));
	if (seconds < verticalFlightAt()) return { at: BLUE_WAITING, radius: 58 + 10 * glow, glow, visible };
	if (seconds < verticalImpactAt()) return { at: flyFrom(BLUE_WAITING, reveal(seconds, verticalFlightAt(), 0.9), blueStory), radius: 58, glow: 0, visible: 0 };
	if (seconds < flowFlightAt()) return undefined;
	return { at: flyFrom(BLUE_WAITING, reveal(seconds, flowFlightAt(), 0.9), blueStory), radius: 58, glow: 0, visible: 0 };
};

/** A single illustrative blue splash survives the replay and subsequent chapters. */
export const productAt = (seconds: number): ReturnType<typeof deliveryAt> => {
	if (seconds < verticalImpactAt()) return deliveryAt(seconds);
	const preceding = blueBefore();
	const messy = messyProductOf(blueStory, preceding);
	if (seconds < assimilationAt()) {
		const firstGrowth = reveal(seconds, verticalImpactAt(), 0.3);
		const replay = reveal(seconds, flowImpactAt(), 0.2) - reveal(seconds, flowImpactAt() + 0.25, 0.35);
		return { cells: messy.cells, paint: { ...messy.splat!, radius: mix(0.12, 1.25, firstGrowth) + replay * 0.18 }, complete: false };
	}
	if (seconds < assimilationAt() + 1.85) {
		const pose = assimilateBeatOf(blueStory, preceding)((seconds - assimilationAt()) / 1.85 * 3.7);
		return { cells: pose.cells, paint: pose.splat, complete: false };
	}
	if (seconds < blueCoherentAt()) {
		const pose = coherentBeatOf(blueStory, preceding)((seconds - assimilationAt() - 1.85) / 0.85 * 1.4);
		return { cells: pose.cells, paint: pose.splat, complete: false };
	}
	return { cells: coherentProductOf(blueStory, preceding).cells, complete: true };
};

export const verticalFlashAt = (seconds: number): number => {
	const elapsed = seconds - verticalImpactAt();
	return elapsed < 0 || elapsed > 1.7 ? 0 : (0.65 + 0.35 * Math.pow(Math.sin(elapsed * Math.PI * 2.2), 2)) * (1 - reveal(elapsed, 1.1, 0.6));
};
export const wholeProductGlowAt = (seconds: number): number => {
	const start = spokenCue('health', 0, 'whole');
	return seconds < start || seconds >= sceneById('end').start ? 0 : reveal(seconds, start, 0.5) * (0.65 + 0.25 * Math.sin((seconds - start) * 2.1));
};
