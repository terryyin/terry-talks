import script from '../../../TPS and AI/film-script.json';

export type SceneId = 'hook' | 'burden' | 'house' | 'loom' | 'contrast' | 'judgment' | 'minimalism' | 'freedom' | 'closing';
export type CaptionRange = { start: number; end: number; spoken: string; translations: { ja: string; 'zh-Hant': string }; sourceIds: string[]; lineBreakAfter?: number };
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

/** Hold the last fully visible stopped pose, before the source clip's ending fade. */
export const loomFrameAt = (seconds: number, fps: number): number => Math.round(Math.max(0, Math.min(seconds - sceneById('loom').start, film.choreography.loomHoldAt)) * fps);
