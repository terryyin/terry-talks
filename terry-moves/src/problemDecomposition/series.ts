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

export const outcomes = ['Split equally', 'Unequal shares', 'Track payments'] as const;
export const colors = [palette.terracotta, palette.gold, palette.cobalt];
export const WISH: Point = { x: 815, y: 330 };
export const outcomeSpot = (index: number): Point => ({ x: 650 + index * 155, y: 440 });
export const structuralSplitAt = (seconds: number): number => reveal(seconds, spokenCue('parts', 0, 'solution'), 0.95);
export const customerSplitAt = (seconds: number): number => reveal(seconds, spokenCue('problem', 0, 'splits'), 1.3);

export const firstStory: StorySpec = {
	ball: { id: 'equal', color: palette.terracotta, size: 58 },
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
		const onArc = flightPoint(t, firstStory.impact);
		return { cells: before.cells, ball: { x: onArc.x + 30 * (1 - t), y: onArc.y - 30 * (1 - t) }, complete: false };
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
	return { x: base + (index === 1 ? 155 : -155) * exchange, y: initial.y - (index === 2 ? lifted * 200 : 0) };
};

export const firstOutcomeVisible = (seconds: number): boolean => seconds < flightStart();
