import { beat, timeline } from '../beatTimeline';
import { typographyTimeline, TypeGroup } from '../typographyFilm/direction';
import { cue, film, progress, sceneById } from './film';
import { useFilmText } from './language';

type FilmText = ReturnType<typeof useFilmText>;

const group = (id: string, lines: string[], delaySeconds: number, settleSeconds = 0.7, risePixels = 14): TypeGroup => ({
	id, lines, size: 72, weight: 400, letterSpacing: 0, lineHeight: 1.2, spaceBefore: 0, tone: 'ink',
	// These clauses are readable on their caption's first frame, then gently settle.
	motion: { delaySeconds, revealSeconds: 0, settleSeconds, risePixels },
});

export const englishJudgmentAt = (seconds: number, text: FilmText) => {
	const start = sceneById('judgment').start;
	const direction = typographyTimeline({ passages: [{
		id: 'judgment',
		groups: [
			group('solve', [text('solve'), text('humanJudgment')], 0, 0, 0),
			group('preserve', [text('preserve'), text('knownRules')], cue('judgment', 1) - start),
			group('protect', [text('protect'), text('simpleChecks')], cue('judgment', 1) - start),
			group('evidence', [text('clearEvidence')], cue('judgment', 2) - start, 0.6, 10),
		],
		holdSeconds: sceneById('judgment').end - cue('judgment', 2) - 0.6,
	}] }, film.fps);
	const [solve, preserve, protect, evidence] = direction.poseAt(Math.round((seconds - start) * film.fps)).groups;
	return { solve, preserve, protect, evidence };
};

const minimalismStart = sceneById('minimalism').start;
const removalStart = cue('minimalism', 1);
const shellRemoval = timeline([
	beat('keep', removalStart - minimalismStart, undefined, () => [0.35, 0.35, 0.35], film.fps),
	beat('outer', 0.7, undefined, (seconds) => [0.35 * (1 - progress(seconds, 0, 0.6)), 0.35, 0.35], film.fps),
	beat('middle', 0.7, undefined, (seconds) => [0, 0.35 * (1 - progress(seconds, 0, 0.6)), 0.35], film.fps),
	beat('inner', 0.7, undefined, (seconds) => [0, 0, 0.35 * (1 - progress(seconds, 0, 0.6))], film.fps),
	beat('needed-behavior', sceneById('minimalism').end - removalStart - 2.1, undefined, () => [0, 0, 0], film.fps),
], film.fps);

export const englishShellsAt = (seconds: number): number[] => shellRemoval.poseAt(Math.round((seconds - minimalismStart) * film.fps));

export const englishFreedomAt = (seconds: number, text: FilmText) => typographyTimeline({ passages: [{
	id: 'freedom',
	groups: [{
		...group('title', [text('freedom')], 0, 1.5, 18),
		size: 82,
		letterSpacing: -2.5,
		lineHeight: 1.08,
		motion: { delaySeconds: 0, revealSeconds: 1.1, settleSeconds: 1.5, risePixels: 18 },
	}],
	holdSeconds: sceneById('closing').end - sceneById('freedom').start - 1.5,
}] }, film.fps).poseAt(Math.round((seconds - sceneById('freedom').start) * film.fps)).groups[0];

// The retained narration ends before the credit; the score resumes over the final hold.
export const englishScoreVolumeAt = (frame: number): number => 0.22 + 0.53 * progress(frame / film.fps, sceneById('closing').start, 1.1);
