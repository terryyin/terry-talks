import script from '../../../TPS and AI/film-script.json';

export type SceneId = 'hook' | 'burden' | 'rule' | 'freedom' | 'need' | 'feedback' | 'trust' | 'closing';
export type CaptionRange = { start: number; end: number; spoken: string; sourceIds: string[] };
export type FilmScene = { id: SceneId; start: number; end: number; label: string; captionRanges: CaptionRange[]; creditStart?: number; creditLines?: string[] };
export const film = script as Omit<typeof script, 'scenes'> & { scenes: FilmScene[] };
export const durationInFrames = Math.round(film.duration * film.fps);
export const sceneById = (id: SceneId): FilmScene => film.scenes.find((scene) => scene.id === id)!;
export const sceneAt = (seconds: number): FilmScene => film.scenes.find((scene) => seconds >= scene.start && seconds < scene.end) ?? (seconds < 0 ? film.scenes[0] : film.scenes[film.scenes.length - 1]);
export const captionAt = (seconds: number): CaptionRange | undefined => sceneAt(seconds).captionRanges.find((caption) => seconds >= caption.start && seconds < caption.end);
export const cue = (id: SceneId, caption: number): number => sceneById(id).captionRanges[caption].start;
export const sceneFrames = (id: SceneId): number => Math.round((sceneById(id).end - sceneById(id).start) * film.fps);
export const startFrame = (id: SceneId): number => Math.round(sceneById(id).start * film.fps);
export const progress = (seconds: number, start: number, duration = 0.8): number => {
	const t = Math.max(0, Math.min(1, (seconds - start) / duration));
	return t * t * (3 - 2 * t);
};
export const mix = (from: number, to: number, amount: number): number => from + (to - from) * amount;

/** The stop consumes the empty input; human response precedes repaired input and resumption. */
export const ruleStateAt = (seconds: number) => {
	const checkAt = cue('rule', 2);
	const stopAt = cue('rule', 3);
	const responseAt = cue('rule', 4);
	const repairAt = responseAt + film.choreography.ruleRepairDelay;
	const resumeAt = responseAt + film.choreography.ruleResumeDelay;
	const resumed = seconds >= resumeAt;
	const stopped = seconds >= stopAt && !resumed;
	const flow = seconds < stopAt ? Math.max(0, seconds - checkAt) : stopAt - checkAt + (resumed ? seconds - resumeAt : 0);
	return {
		check: seconds >= checkAt,
		stopped,
		responding: seconds >= responseAt,
		repaired: seconds >= repairAt,
		resumed,
		resumeAt,
		inputX: seconds < stopAt ? mix(160, 475, progress(seconds, checkAt + film.choreography.ruleInputDelay, stopAt - checkAt - film.choreography.ruleInputDelay)) : mix(475, 950, progress(seconds, resumeAt, 1.1)),
		downstreamX: 720 + flow * 22,
		gate: stopped ? 'closed' : 'open',
	};
};

/** Completed value is never exchanged for a future promise; only untouched priorities move. */
export const customerStateAt = (seconds: number) => {
	const reorder = progress(seconds, cue('feedback', 1), film.choreography.customerReorderDuration);
	return {
		trainComplete: seconds >= cue('need', 1),
		next: seconds >= cue('feedback', 1) ? 'Step-free route' : 'Check the fare',
		route: { x: mix(630, 100, reorder), y: 724 - Math.sin(reorder * Math.PI) * 108, started: false },
		fare: { x: mix(100, 630, reorder), y: 724 + Math.sin(reorder * Math.PI) * 32, started: false },
		reorderEndsAt: cue('feedback', 1) + film.choreography.customerReorderDuration,
	};
};
