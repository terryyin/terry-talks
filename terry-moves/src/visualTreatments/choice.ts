// Terry's review decision about the visual treatment samples. Edit this record
// by hand; nothing else writes it. Rendering, exporting or adding a revision
// never changes it.
//
//   pending  — no version chosen yet (including "neither, not sure what next").
//   revise   — no version chosen; correct the named beats of the named version
//              by adding a new version (see versions.ts). Choosing neither and
//              asking for a correction lands here.
//   selected — continue exactly this version id, as registered in versions.ts.
//              Name the id itself (e.g. 'TreatmentCharacterV2'), never "latest":
//              a later revision does not move the choice.
import { BeatName } from './brief';

export type TreatmentChoice =
	| { decision: 'pending'; note?: string }
	| { decision: 'revise'; version: string; beats: BeatName[]; note: string }
	| { decision: 'selected'; version: string; note?: string };

// A record that chooses no version: pending, or a revision request.
export type UnselectedChoice = Exclude<TreatmentChoice, { decision: 'selected' }>;

// Where this record lives, relative to terry-moves/, for repair messages.
export const choiceLocation = 'src/visualTreatments/choice.ts';

export const treatmentChoice: TreatmentChoice = {
	decision: 'selected',
	version: 'TreatmentCharacterV2',
	note: 'Chosen by Terry on 2026-10-08 after watching the exported samples.',
};
