// Continuing the version Terry selected: its own beats, unchanged, followed by
// the opening-hours beat authored by the same treatment's direction. The
// prefix is the selected version's actual timeline, not a reconstruction, so
// every earlier frame keeps its picture.
import { timeline } from '../beatTimeline';
import { continuationBeat } from './brief';
import { characterContinuation } from './character/continuation';
import { TreatmentEntry } from './versions';

export const continuedPreviewId = 'TreatmentSelectedContinued';

export type ContinuedTreatment = {
	// The selected version's beats plus the appended beat, as one entry.
	entry: TreatmentEntry;
	prefixFrames: number;
	appended: { name: string; from: number; durationInFrames: number };
};

const continuationSources = ['src/visualTreatments/continuation.ts', 'src/visualTreatments/choice.ts', 'src/visualTreatments/selection.ts'];

const continued = (selected: TreatmentEntry): TreatmentEntry => {
	if (selected.treatment === 'character') {
		const prefix = selected.timeline;
		const end = prefix.poseAt(prefix.durationInFrames - 1);
		return {
			...selected,
			timeline: timeline([...prefix.beats, characterContinuation(end, selected.fps)], selected.fps),
			sources: { ...selected.sources, script: [...selected.sources.script, ...continuationSources, 'src/visualTreatments/character/continuation.ts'] },
		};
	}
	throw new Error(`No continuation is authored for ${selected.treatment} treatments, so ${selected.id} cannot be continued. `
		+ `Author its ${continuationBeat.name} beat beside the ${selected.treatment} script and add it in src/visualTreatments/continuation.ts.`);
};

export const continueTreatment = (selected: TreatmentEntry): ContinuedTreatment => {
	const entry = continued(selected);
	return {
		entry,
		prefixFrames: selected.timeline.durationInFrames,
		appended: { name: continuationBeat.name, ...entry.timeline.beatRange(continuationBeat.name) },
	};
};
