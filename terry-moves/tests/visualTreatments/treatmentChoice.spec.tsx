import { renderToStaticMarkup } from 'react-dom/server';
import { CharacterTreatment } from '../../src/visualTreatments/character/CharacterTreatment';
import { characterTimeline } from '../../src/visualTreatments/character/script';
import { characterV2 } from '../../src/visualTreatments/character/v2';
import { choiceLocation, TreatmentChoice, treatmentChoice } from '../../src/visualTreatments/choice';
import { planTreatmentExport } from '../../src/visualTreatments/exportPlan';
import { resolveChoice } from '../../src/visualTreatments/selection';
import { selectedPreview } from '../../src/visualTreatments/TreatmentCompositions';
import { TypographyTreatment } from '../../src/visualTreatments/typography/TypographyTreatment';
import { TreatmentEntry, treatmentVersions } from '../../src/visualTreatments/versions';

// The version's own renderer at a frame of its own timeline, independent of
// how the preview composes it.
const versionMarkup = (entry: TreatmentEntry, frame: number) => renderToStaticMarkup(entry.treatment === 'typography'
	? <TypographyTreatment pose={entry.timeline.poseAt(frame)} caption={entry.timeline.captionAt(frame)}/>
	: <CharacterTreatment pose={entry.timeline.poseAt(frame)} caption={entry.timeline.captionAt(frame)}/>);
const previewMarkup = (choice: TreatmentChoice, frame: number, registry = treatmentVersions) => renderToStaticMarkup(selectedPreview(choice, registry).at(frame));
const keyPoseFrames = (id: string) => planTreatmentExport([id])[0].keyPoses.map((pose) => pose.frame);
const entry = (id: string) => treatmentVersions.find((candidate) => candidate.id === id)!;
const page = (markup: string) => new DOMParser().parseFromString(markup, 'text/html');

test('the persisted review record names exactly the version Terry chose', () => {
	expect(treatmentChoice).toMatchObject({ decision: 'selected', version: 'TreatmentCharacterV2' });
	expect(resolveChoice()).toMatchObject({ state: 'selected', entry: entry('TreatmentCharacterV2') });
});

test('pending selects nothing; the preview shows the unselected state and its note instead of any sample', () => {
	const pending: TreatmentChoice = { decision: 'pending', note: 'Neither yet.' };
	expect(resolveChoice(pending)).toEqual({ state: 'unselected', choice: pending });
	const preview = selectedPreview(pending);
	const shown = page(renderToStaticMarkup(preview.at(0)));
	expect(shown.querySelector('[data-selection]')!.getAttribute('data-decision')).toBe('pending');
	expect(shown.body.textContent).toContain('No treatment selected');
	expect(shown.body.textContent).toContain('Neither yet.');
	expect(shown.body.textContent).toContain(choiceLocation);
	expect(shown.querySelector('[data-outcome]')).toBeNull();
	expect(preview.durationInFrames).toBeLessThan(Math.min(...treatmentVersions.map((v) => v.timeline.durationInFrames)));
});

test('a revision request names an existing version and beats, and still selects nothing', () => {
	const revise: TreatmentChoice = { decision: 'revise', version: 'TreatmentCharacterV1', beats: ['result', 'feedback'], note: 'Relief reads too weakly.' };
	expect(resolveChoice(revise)).toEqual({ state: 'unselected', choice: revise });
	const shown = page(renderToStaticMarkup(selectedPreview(revise).at(0)));
	expect(shown.querySelector('[data-selection]')!.getAttribute('data-decision')).toBe('revise');
	expect(shown.body.textContent).toContain('Revise TreatmentCharacterV1 · result, feedback');
	expect(shown.body.textContent).toContain('Relief reads too weakly.');

	expect(() => resolveChoice({ ...revise, version: 'TreatmentCharacterV9' }))
		.toThrow(`Treatment choice in ${choiceLocation} names version TreatmentCharacterV9, which is not registered. Registered: TreatmentTypographyV1, TreatmentCharacterV1, TreatmentCharacterV2.`);
	expect(() => resolveChoice({ ...revise, beats: ['result', 'ending' as never] }))
		.toThrow(`asks to revise TreatmentCharacterV1 at beat(s) ending, which it does not have. Its beats: title, distinction, question, result, feedback, next.`);
	expect(() => resolveChoice({ ...revise, beats: [] })).toThrow('(none named)');
});

// TEST FIXTURE records: exact selections exercised independently of the
// persisted record (see the first test for Terry's actual choice).
test.each(['TreatmentTypographyV1', 'TreatmentCharacterV1', 'TreatmentCharacterV2'])(
	'TEST FIXTURE selecting %s previews exactly that version: its timing and its picture at every key pose', (id) => {
		const fixture: TreatmentChoice = { decision: 'selected', version: id };
		const selection = resolveChoice(fixture);
		expect(selection).toEqual({ state: 'selected', entry: entry(id) });
		const preview = selectedPreview(fixture);
		expect([preview.durationInFrames, preview.fps]).toEqual([entry(id).timeline.durationInFrames, entry(id).fps]);
		keyPoseFrames(id).forEach((frame) => expect(previewMarkup(fixture, frame)).toBe(versionMarkup(entry(id), frame)));
	});

test('TEST FIXTURE: the selected V1 picture differs from its revision V2, so the comparison is not vacuous', () => {
	const fixture: TreatmentChoice = { decision: 'selected', version: 'TreatmentCharacterV1' };
	const differing = keyPoseFrames('TreatmentCharacterV1').filter((frame) => previewMarkup(fixture, frame) !== versionMarkup(entry('TreatmentCharacterV2'), frame));
	expect(differing.length).toBeGreaterThan(0);
});

test('TEST FIXTURE: registering a later revision leaves the selection on the version it names', () => {
	const v3 = { ...characterV2, id: 'TreatmentCharacterV3' };
	const later: TreatmentEntry = { treatment: 'character', id: v3.id, fps: v3.fps, timeline: characterTimeline(v3), sources: { script: [], renderer: [] } };
	const registry = [...treatmentVersions, later];
	const fixture: TreatmentChoice = { decision: 'selected', version: 'TreatmentCharacterV1' };
	const selection = resolveChoice(fixture, registry);
	expect(selection.state === 'selected' && selection.entry.id).toBe('TreatmentCharacterV1');
	keyPoseFrames('TreatmentCharacterV1').forEach((frame) => expect(previewMarkup(fixture, frame, registry)).toBe(versionMarkup(entry('TreatmentCharacterV1'), frame)));
});

test('TEST FIXTURE: a selection naming an unregistered version is refused with repair context, never substituted', () => {
	const fixture: TreatmentChoice = { decision: 'selected', version: 'TreatmentCharacterV3' };
	const message = `Treatment choice in ${choiceLocation} names version TreatmentCharacterV3, which is not registered. `
		+ 'Registered: TreatmentTypographyV1, TreatmentCharacterV1, TreatmentCharacterV2. Correct the version id in src/visualTreatments/choice.ts.';
	expect(() => resolveChoice(fixture)).toThrow(message);

	const error = jest.spyOn(console, 'error').mockImplementation(() => undefined);
	const preview = selectedPreview(fixture);
	expect(error).toHaveBeenCalledWith(`TreatmentSelected: ${message}`);
	error.mockRestore();
	expect(() => preview.at(0)).toThrow(message);
});
