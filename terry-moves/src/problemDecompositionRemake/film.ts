import script from '../../../Problem Decomposition Remake/film-script.json';

export type SceneId = 'distinction' | 'example' | 'premises' | 'value' | 'freedom' | 'threeVs' | 'flow' | 'commits' | 'whole' | 'end';
export type Caption = { text: string; spoken: string; start: number; end: number; speechStart: number; speechEnd: number; wordCues: Record<string, number> };
export type FilmScene = { id: SceneId; chapter: string; label: string; start: number; end: number; duration: number; captionRanges: Caption[] };
export const film = script as { title: string; width: number; height: number; fps: number; duration: number; durationInFrames: number; coverDuration: number; scenes: FilmScene[] };
export const FPS = film.fps;
export const scene = (id: SceneId): FilmScene => film.scenes.find((item) => item.id === id)!;
export const startFrame = (id: SceneId) => Math.round(scene(id).start * FPS);
export const sceneFrames = (id: SceneId) => Math.round(scene(id).end * FPS) - startFrame(id);
export const cue = (item: FilmScene, clause: number, word?: string) => word ? item.captionRanges[clause].wordCues[word] ?? item.captionRanges[clause].speechStart : item.captionRanges[clause].speechStart;
export const ease = (seconds: number, start: number, duration = 0.65) => {
	const t = Math.max(0, Math.min(1, (seconds - start) / duration));
	return 1 - Math.pow(1 - t, 3);
};
export const C = { paper: '#f6f2e9', ink: '#242c2d', muted: '#656d69', line: '#d5d8ce', red: '#b44b40', paleRed: '#faebe3', teal: '#147c72', paleTeal: '#e5f1e9', white: '#fffdf7' };
export const FONT = 'Arial, Helvetica, sans-serif';
export const HEAD = 'Georgia, serif';
