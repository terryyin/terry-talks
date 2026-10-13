import script from '../../../TPS and AI/Finale/film-script.json';

export type SceneId = 'cover' | 'free' | 'entrust' | 'agency' | 'respect' | 'improve' | 'cycle' | 'closing';
export type CaptionRange = { start: number; end: number; spoken: string; lineBreakAfter?: number; sourceIds: string[]; translations: Record<string, string> };
export type FilmScene = { id: SceneId; start: number; end: number; heading: string; subheading?: string; asset: string; captionRanges: CaptionRange[]; creditStart?: number; creditLines?: string[] };
export const film = script as Omit<typeof script, 'scenes'> & { scenes: FilmScene[] };
export const durationInFrames = Math.round(film.duration * film.fps);
export const sceneById = (id: SceneId): FilmScene => film.scenes.find((scene) => scene.id === id)!;
export const sceneAt = (seconds: number): FilmScene => film.scenes.find((scene) => seconds >= scene.start && seconds < scene.end) ?? (seconds < 0 ? film.scenes[0] : film.scenes[film.scenes.length - 1]);
export const captionAt = (seconds: number): CaptionRange | undefined => sceneAt(seconds).captionRanges.find((caption) => seconds >= caption.start && seconds < caption.end);
export const sceneFrames = (id: SceneId): number => Math.round((sceneById(id).end - sceneById(id).start) * film.fps);
export const startFrame = (id: SceneId): number => Math.round(sceneById(id).start * film.fps);

const newArtFiles = new Set(['jidoka-jit-balanced-scale.png', 'respect-people-grow-judgment.png', 'smed-oted-changeover.png', 'closing-crane-aloft.png']);
export const assetPathFor = (file: string): string => `assets/${newArtFiles.has(file) ? 'tps-and-ai-finale' : 'tps-and-ai'}/${file}`;
