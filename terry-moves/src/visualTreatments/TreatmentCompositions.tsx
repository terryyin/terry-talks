import React from 'react';
import { AbsoluteFill, Composition, useCurrentFrame } from 'remotion';
import { C, FONT, HEAD } from '../problemDecompositionRemake/film';
import { CharacterTreatment } from './character/CharacterTreatment';
import { choiceLocation, TreatmentChoice, treatmentChoice, UnselectedChoice } from './choice';
import { resolveChoice, Selection } from './selection';
import { TypographyTreatment } from './typography/TypographyTreatment';
import { TreatmentEntry, treatmentFrame, treatmentVersions } from './versions';

// A version's picture of the passage at a frame.
export const pictureAt = (entry: TreatmentEntry) => (frame: number): React.ReactElement => entry.treatment === 'typography'
	? <TypographyTreatment pose={entry.timeline.poseAt(frame)} caption={entry.timeline.captionAt(frame)}/>
	: <CharacterTreatment pose={entry.timeline.poseAt(frame)} caption={entry.timeline.captionAt(frame)}/>;

const playing = (at: (frame: number) => React.ReactElement): React.FC => {
	const Playing: React.FC = () => at(useCurrentFrame());
	return Playing;
};

export const selectedPreviewId = 'TreatmentSelected';

// The record's state when it selects nothing: pending, or which beats of
// which version should be revised.
const Unselected: React.FC<{ choice: UnselectedChoice }> = ({ choice }) => <AbsoluteFill
	data-selection="unselected" data-decision={choice.decision}
	style={{ background: C.paper, color: C.ink, fontFamily: FONT, padding: 84, justifyContent: 'center' }}>
	<div style={{ fontFamily: HEAD, fontSize: 72, lineHeight: 1.1 }}>No treatment selected</div>
	<div style={{ marginTop: 40, fontSize: 40, color: C.red }}>
		{choice.decision === 'pending' ? 'Pending' : `Revise ${choice.version} · ${choice.beats.join(', ')}`}
	</div>
	{choice.note ? <div data-note style={{ marginTop: 28, fontSize: 32, lineHeight: 1.4, color: C.muted }}>{choice.note}</div> : null}
	<div style={{ marginTop: 60, fontSize: 24, color: C.muted }}>{choiceLocation}</div>
</AbsoluteFill>;

export type SelectedPreview = { durationInFrames: number; fps: number; at: (frame: number) => React.ReactElement };

const unselectedSeconds = 3;
const unselectedFps = 30;

// What the selected-sample preview shows: exactly the selected version's
// picture and timing, or a visible unselected state. A choice naming an
// unregistered version shows nothing in its place; the preview fails with the
// repair message while every sample stays available.
export const selectedPreview = (
	choice: TreatmentChoice = treatmentChoice,
	registry: readonly TreatmentEntry[] = treatmentVersions,
): SelectedPreview => {
	let selection: Selection;
	try {
		selection = resolveChoice(choice, registry);
	} catch (error) {
		console.error(`${selectedPreviewId}: ${(error as Error).message}`);
		return { durationInFrames: 1, fps: unselectedFps, at: () => { throw error; } };
	}
	if (selection.state === 'selected') {
		const { entry } = selection;
		return { durationInFrames: entry.timeline.durationInFrames, fps: entry.fps, at: pictureAt(entry) };
	}
	const unselected = <Unselected choice={selection.choice}/>;
	return { durationInFrames: unselectedSeconds * unselectedFps, fps: unselectedFps, at: () => unselected };
};

const samples = treatmentVersions.map((entry) => ({ entry, Sample: playing(pictureAt(entry)) }));
const preview = selectedPreview();
const Preview = playing(preview.at);

// Named treatment samples for the Problem Decomposition comparison, one square
// composition per registered version, plus the preview of the version chosen
// in choice.ts.
export const VisualTreatmentCompositions: React.FC = () => <>
	{samples.map(({ entry, Sample }) => <Composition
		key={entry.id}
		id={entry.id}
		component={Sample}
		durationInFrames={entry.timeline.durationInFrames}
		fps={entry.fps}
		width={treatmentFrame.width}
		height={treatmentFrame.height}
	/>)}
	<Composition
		id={selectedPreviewId}
		component={Preview}
		durationInFrames={preview.durationInFrames}
		fps={preview.fps}
		width={treatmentFrame.width}
		height={treatmentFrame.height}
	/>
</>;
