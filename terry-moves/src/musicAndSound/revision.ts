import { rhythmBaseline } from './baseline';
import { RhythmDirection } from './direction';

// Keep the approved take intact. Only this answer waits half a beat longer;
// sound and motion both receive the edited cue through the common direction.
export const rhythmRevision: RhythmDirection = {
	...rhythmBaseline,
	id: 'revision',
	passages: rhythmBaseline.passages.map((passage) => passage.id === 'an-answer-across-space' ? {
		...passage,
		cues: passage.cues.map((cue) => cue.id === 'answer-turns' ? { ...cue, beat: 4.5 } : cue),
	} : passage),
};
