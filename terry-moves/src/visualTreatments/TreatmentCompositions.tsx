import React from 'react';
import { AbsoluteFill, Composition, useCurrentFrame } from 'remotion';
import { C, FONT, HEAD } from '../problemDecompositionRemake/film';
import { CharacterTreatment } from './character/CharacterTreatment';
import { continuedPreviewId, continueTreatment } from './continuation';
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

// How a preview turns the selected version into what it plays.
type Showing = (selected: TreatmentEntry) => TreatmentEntry;

// What a preview of the review record shows: the picture and timing of what
// it makes of the selected version, or a visible unselected state. A choice
// naming an unregistered version, or one the preview cannot show, shows
// nothing in its place; the preview fails with the repair message while every
// sample stays available.
const previewOf = (id: string, show: Showing) => (
	choice: TreatmentChoice = treatmentChoice,
	registry: readonly TreatmentEntry[] = treatmentVersions,
): SelectedPreview => {
	let shown: TreatmentEntry | UnselectedChoice;
	try {
		const selection: Selection = resolveChoice(choice, registry);
		shown = selection.state === 'selected' ? show(selection.entry) : selection.choice;
	} catch (error) {
		console.error(`${id}: ${(error as Error).message}`);
		return { durationInFrames: 1, fps: unselectedFps, at: () => { throw error; } };
	}
	if ('timeline' in shown) return { durationInFrames: shown.timeline.durationInFrames, fps: shown.fps, at: pictureAt(shown) };
	const unselected = <Unselected choice={shown}/>;
	return { durationInFrames: unselectedSeconds * unselectedFps, fps: unselectedFps, at: () => unselected };
};

// Exactly the selected version's picture, duration and fps.
export const selectedPreview = previewOf(selectedPreviewId, (selected) => selected);
// The selected version's picture followed by its continuation beat.
export const continuedPreview = previewOf(continuedPreviewId, (selected) => continueTreatment(selected).entry);

const samples = treatmentVersions.map((entry) => ({ entry, Sample: playing(pictureAt(entry)) }));
const previews = [
	{ id: selectedPreviewId, preview: selectedPreview() },
	{ id: continuedPreviewId, preview: continuedPreview() },
].map(({ id, preview }) => ({ id, preview, Preview: playing(preview.at) }));

// Named treatment samples for the Problem Decomposition comparison, one square
// composition per registered version, plus the preview of the version chosen
// in choice.ts and of its continuation.
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
	{previews.map(({ id, preview, Preview }) => <Composition
		key={id}
		id={id}
		component={Preview}
		durationInFrames={preview.durationInFrames}
		fps={preview.fps}
		width={treatmentFrame.width}
		height={treatmentFrame.height}
	/>)}
</>;
