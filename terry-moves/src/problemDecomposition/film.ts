import script from '../../../Problem Decomposition/film-script.json';

export type SceneId =
	| 'hook'
	| 'parts'
	| 'problem'
	| 'premises'
	| 'value'
	| 'stop'
	| 'vertical'
	| 'fractal'
	| 'commit'
	| 'health'
	| 'end';

export type CaptionRange = { text: string; spoken: string; start: number; end: number; speechStart: number; speechEnd: number; wordCues: Record<string, number> };
export type FilmScene = {
	id: SceneId;
	start: number;
	end: number;
	label: string;
	narration: string;
	captions: string[];
	captionRanges: CaptionRange[];
};

export const filmScript = {
	...script,
	scenes: script.scenes.map((scene) => ({
		...scene,
		narration: scene.captionRanges.map((caption) => caption.spoken).join(' '),
		captions: scene.captionRanges.map((caption) => caption.text),
	})),
} as {
	title: string;
	subtitle: string;
	fps: number;
	duration: number;
	voiceCredit: string;
	scenes: FilmScene[];
};

export const FPS = filmScript.fps;
export const durationInFrames = Math.ceil(filmScript.duration * FPS);
export const STAGE = { width: 1080, height: 1080 };
export const NARRATION = 'assets/problem-decomposition/narration.wav';
export const SCORE = 'assets/problem-decomposition/score.wav';
export const DINNER = 'assets/problem-decomposition/dinner.png';
export const DINNER_RELIEF = 'assets/problem-decomposition/dinner-relief.png';
export const ENGINEERS = 'assets/problem-decomposition/engineers.png';

export const sceneAt = (seconds: number): FilmScene =>
	filmScript.scenes.find((scene) => seconds >= scene.start && seconds < scene.end) ??
	(seconds < 0 ? filmScript.scenes[0] : filmScript.scenes[filmScript.scenes.length - 1]);

export const captionRanges = (scene: FilmScene): CaptionRange[] => scene.captionRanges;

export const captionAt = (seconds: number): CaptionRange | undefined =>
	captionRanges(sceneAt(seconds)).find((caption) => seconds >= caption.start && seconds < caption.end);

/** A deliberate ease with no rebound, used for the film's physical paper objects. */
export const reveal = (seconds: number, start: number, duration = 0.7): number => {
	const t = Math.max(0, Math.min(1, (seconds - start) / duration));
	return 1 - Math.pow(1 - t, 3);
};

export const mix = (from: number, to: number, progress: number): number => from + (to - from) * progress;
