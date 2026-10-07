import script from '../../../ATDD/film-script.json';

export type Caption = {
	spoken: string;
	text: string;
	start: number;
	end: number;
	speechStart: number;
	speechEnd: number;
	wordCues: Record<string, number | undefined>;
};
export type Scene = {
	id: string;
	label: string;
	start: number;
	end: number;
	captionRanges: Caption[];
};
type FilmScript = { fps: number; coverDuration: number; duration: number; durationInFrames: number; scenes: Scene[] };

export const film: FilmScript = script;
export const FPS = film.fps;
export const NARRATION = 'assets/atdd/narration.mp3';
export const SCORE = 'assets/atdd/score.mp3';
export const durationInFrames = film.durationInFrames;

// All production timing comes from the aligned recording, in seconds.
export const scenes = film.scenes.map((scene) => ({ ...scene, captions: scene.captionRanges }));

export const momentAt = (seconds: number) => {
	const index = Math.max(0, scenes.findIndex((scene) => seconds < scene.end));
	const scene = seconds >= scenes[scenes.length - 1].end ? scenes[scenes.length - 1] : scenes[index];
	const sceneIndex = scenes.indexOf(scene);
	const caption = scene.captions.find((c) => seconds >= c.start && seconds < c.end)?.text ?? '';
	return { index: sceneIndex, caption };
};
