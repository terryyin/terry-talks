import script from '../../../TPS and AI/JIT/film-script.json';

export type SceneId = 'hook' | 'house' | 'resourceful' | 'pull' | 'feedback' | 'integration' | 'closing';
export type CaptionRange = { start: number; end: number; spoken: string; lineBreakAfter?: number; sourceIds: string[]; translations: Record<string, string> };
export type FocusView = { id: string; start: number; end: number; x: number; y: number; width: number; height: number; clipPath?: string };
export type FilmScene = { id: SceneId; start: number; end: number; label: string; heading: string; subheading?: string; asset?: string; captionRanges: CaptionRange[]; focusViews?: FocusView[]; creditStart?: number; creditLines?: string[] };
export const film = script as Omit<typeof script, 'scenes'> & { scenes: FilmScene[] };
export const durationInFrames = Math.round(film.duration * film.fps);
export const sceneById = (id: SceneId): FilmScene => film.scenes.find((scene) => scene.id === id)!;
export const sceneAt = (seconds: number): FilmScene => film.scenes.find((scene) => seconds >= scene.start && seconds < scene.end) ?? (seconds < 0 ? film.scenes[0] : film.scenes[film.scenes.length - 1]);
export const captionAt = (seconds: number): CaptionRange | undefined => sceneAt(seconds).captionRanges.find((caption) => seconds >= caption.start && seconds < caption.end);
export const sceneFrames = (id: SceneId): number => Math.round((sceneById(id).end - sceneById(id).start) * film.fps);
export const startFrame = (id: SceneId): number => Math.round(sceneById(id).start * film.fps);
