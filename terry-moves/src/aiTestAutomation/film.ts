import script from '../../../AI Test Automation/film-script.json';

export type SceneId = 'hook' | 'overload' | 'purpose' | 'upkeep' | 'stopFix' | 'sandbox' | 'investigate' | 'selective' | 'optimize' | 'end';
export type CaptionRange = { text: string; spoken: string; start: number; end: number; speechStart: number; speechEnd: number; wordCues: Partial<Record<string, number>> };
export type FilmScene = { id: SceneId; start: number; end: number; label: string; captionRanges: CaptionRange[] };
export const filmScript = script as { title: string; width: number; height: number; fps: number; duration: number; durationInFrames: number; voiceCredit: string; scenes: FilmScene[] };
export const FPS = filmScript.fps;
export const STAGE = { width: filmScript.width, height: filmScript.height };
export const durationInFrames = filmScript.durationInFrames;
export const MIX = 'assets/ai-test-automation/mix.wav';
export const sceneAt = (seconds: number): FilmScene => filmScript.scenes.find((scene) => seconds >= scene.start && seconds < scene.end) ?? (seconds < 0 ? filmScript.scenes[0] : filmScript.scenes[filmScript.scenes.length - 1]);
export const captionAt = (seconds: number): CaptionRange | undefined => sceneAt(seconds).captionRanges.find((caption) => seconds >= caption.start && seconds < caption.end);
/** The saved spoken performance is the workshop's only clock. */
export const cue = (scene: FilmScene, phrase: number, word: string): number => scene.captionRanges[phrase].wordCues[word] ?? scene.captionRanges[phrase].speechStart;
/** Story Impact's physical paper ease: deliberate arrival without elastic rebound. */
export const reveal = (seconds: number, start: number, duration = 0.7): number => { const t = Math.max(0, Math.min(1, (seconds - start) / duration)); return 1 - Math.pow(1 - t, 3); };
