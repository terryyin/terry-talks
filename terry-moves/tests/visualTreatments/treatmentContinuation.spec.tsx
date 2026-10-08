import { renderToStaticMarkup } from 'react-dom/server';
import { brief, continuationBeat, statusLabel } from '../../src/visualTreatments/brief';
import { stage } from '../../src/visualTreatments/character/script';
import { choiceLocation, TreatmentChoice, treatmentChoice } from '../../src/visualTreatments/choice';
import { continuedPreviewId, continueTreatment } from '../../src/visualTreatments/continuation';
import { planContinuationExport } from '../../src/visualTreatments/exportPlan';
import { resolveChoice } from '../../src/visualTreatments/selection';
import { continuedPreview, selectedPreview } from '../../src/visualTreatments/TreatmentCompositions';
import { treatmentVersions } from '../../src/visualTreatments/versions';

// Terry's actual record, resolved the way the continuation resolves it.
const selection = resolveChoice();
if (selection.state !== 'selected') throw new Error(`${choiceLocation} selects no version`);
const selected = selection.entry;
const continuation = continueTreatment(selected);
const composed = continuation.entry.timeline;
const prefixFrames = selected.timeline.durationInFrames;
const suffix = Array.from({ length: composed.durationInFrames - prefixFrames }, (_, i) => prefixFrames + i);

const selectedPicture = selectedPreview();
const continuedPicture = continuedPreview();
const page = (frame: number) => new DOMParser().parseFromString(renderToStaticMarkup(continuedPicture.at(frame)), 'text/html');
const outcome = (shown: Document, id: string) => shown.querySelector(`[data-outcome="${id}"]`) as HTMLElement;
const shopper = (shown: Document) => {
	const actors = shown.querySelectorAll('[data-role="shopper"] [data-testid="engineer"]');
	expect(shown.querySelectorAll('[data-testid="engineer"]')).toHaveLength(1);
	expect(actors).toHaveLength(1);
	const [x, y, scale] = actors[0].getAttribute('transform')!.match(/-?[\d.]+/g)!.map(Number);
	const [handX, handY] = actors[0].querySelectorAll('[data-testid="articulated-arm"]')[1].getAttribute('data-hand')!.split(',').map(Number);
	return { x, y, scale, mood: actors[0].getAttribute('data-mood'), hand: { x: x + handX * scale, y: y + handY * scale } };
};

test('the continuation continues the version the record selects, through its own entry', () => {
	expect(treatmentChoice).toMatchObject({ decision: 'selected', version: selected.id });
	expect(continuation.entry).toMatchObject({ id: selected.id, treatment: selected.treatment, fps: selected.fps });
	expect(composed.beats.slice(0, -1)).toEqual(selected.timeline.beats);
	selected.timeline.beats.forEach((b, index) => expect(composed.beats[index]).toBe(b));
	expect(continuation.entry.sources.script).toEqual(expect.arrayContaining(selected.sources.script));
	expect(continuation.entry.sources.renderer).toEqual(selected.sources.renderer);
});

test('every frame of the selected version keeps its pose, caption and picture in the continuation', () => {
	expect([continuedPicture.fps, selectedPicture.fps]).toEqual([selected.fps, selected.fps]);
	expect(selectedPicture.durationInFrames).toBe(prefixFrames);
	for (let frame = prefixFrames - 1; frame >= 0; frame--) {
		expect(composed.poseAt(frame)).toEqual(selected.timeline.poseAt(frame));
		expect(composed.captionAt(frame)).toBe(selected.timeline.captionAt(frame));
		expect(renderToStaticMarkup(continuedPicture.at(frame))).toBe(renderToStaticMarkup(selectedPicture.at(frame)));
	}
});

test('the opening-hours beat is appended at the end of the selected version, with its own caption', () => {
	expect(continuation.prefixFrames).toBe(prefixFrames);
	expect(continuation.appended).toEqual({ name: continuationBeat.name, from: prefixFrames, durationInFrames: 5 * selected.fps });
	expect(composed.beatRange(continuationBeat.name).from).toBe(prefixFrames);
	expect(continuedPicture.durationInFrames).toBe(composed.durationInFrames);
	expect(composed.durationInFrames).toBe(prefixFrames + continuation.appended.durationInFrames);
	expect(composed.captionAt(prefixFrames - 1)).toBe(brief.beats.at(-1)!.caption);
	suffix.forEach((frame) => expect(composed.captionAt(frame)).toBe(continuationBeat.caption));
});

test('throughout the new beat: stock stays kept, hours is the question being asked, reservation unstarted', () => {
	suffix.forEach((frame) => {
		const markup = renderToStaticMarkup(continuedPicture.at(frame));
		expect(markup).not.toMatch(/NaN|Infinity/);
		const shown = new DOMParser().parseFromString(markup, 'text/html');
		expect(shown.querySelector('[data-beat]')!.getAttribute('data-beat')).toBe(continuationBeat.name);
		expect(shown.querySelector('[data-attention]')!.getAttribute('data-attention')).toBe('hours');
		expect(outcome(shown, 'stock').getAttribute('data-status')).toBe('done');
		expect(outcome(shown, 'stock').textContent).toBe(`${statusLabel.done}✓ ${brief.outcomes.stock.result}${brief.outcomes.stock.scope}`);
		expect(Number(outcome(shown, 'stock').style.opacity)).toBe(1);
		// Asked, not answered: the hours card still shows only its question.
		expect(outcome(shown, 'hours').getAttribute('data-status')).toBe('next');
		expect(outcome(shown, 'hours').textContent).toBe(`${statusLabel.next}${brief.outcomes.hours.question}`);
		expect(outcome(shown, 'reservation').getAttribute('data-status')).toBe('unstarted');
		expect(shown.querySelector('[data-testid="caption"]')!.textContent).toBe(continuationBeat.caption);
		expect(shown.querySelector('[data-testid="title"]')!.textContent).toBe(brief.title);
		expect(shown.querySelector('[data-testid="attribution"]')!.textContent).toBe(brief.attribution);
	});
});

test('the same shopper reads the hours question, then raises a hand to ask it as they asked about stock', () => {
	const join = shopper(page(prefixFrames - 1));
	const settled = shopper(page(composed.durationInFrames - 1));
	suffix.filter((frame) => frame % 5 === 0).forEach((frame) => {
		const actor = shopper(page(frame));
		expect(actor.scale).toBe(stage.scale);
		expect(actor.mood).toBe('focused');
		expect(Math.abs(actor.x - join.x)).toBeLessThanOrEqual(16);
	});
	const tilt = (pose: object) => ('shopper' in pose ? (pose as { shopper: { headTilt: number } }).shopper.headTilt : NaN);
	expect(tilt(composed.poseAt(prefixFrames + 30))).toBeLessThan(tilt(selected.timeline.poseAt(prefixFrames - 1)));
	// The hand leaves the hours sign and ends raised above the shoulder.
	expect(settled.hand.y).toBeLessThan(join.hand.y - 100);
	expect(settled.hand.y).toBeLessThan(settled.y - 200);
});

test('TEST FIXTURE: a pending or revise record continues nothing; a missing version is never substituted', () => {
	const pending: TreatmentChoice = { decision: 'pending' };
	const revise: TreatmentChoice = { decision: 'revise', version: 'TreatmentCharacterV1', beats: ['next'], note: 'Look again.' };
	[pending, revise].forEach((choice) => {
		const shown = new DOMParser().parseFromString(renderToStaticMarkup(continuedPreview(choice).at(0)), 'text/html');
		expect(shown.querySelector('[data-selection]')!.getAttribute('data-decision')).toBe(choice.decision);
		expect(shown.querySelector('[data-outcome]')).toBeNull();
	});

	const error = jest.spyOn(console, 'error').mockImplementation(() => undefined);
	const missing = continuedPreview({ decision: 'selected', version: 'TreatmentCharacterV9' });
	expect(error).toHaveBeenCalledWith(expect.stringContaining(`${continuedPreviewId}: Treatment choice in ${choiceLocation} names version TreatmentCharacterV9`));
	error.mockRestore();
	expect(() => missing.at(0)).toThrow('TreatmentCharacterV9');
});

test('TEST FIXTURE: a typography selection reports that no continuation is authored for it, never falling back', () => {
	const typography = treatmentVersions.find((entry) => entry.treatment === 'typography')!;
	const message = `No continuation is authored for typography treatments, so ${typography.id} cannot be continued.`;
	expect(() => continueTreatment(typography)).toThrow(message);
	expect(() => planContinuationExport([], { state: 'selected', entry: typography })).toThrow(message);

	const error = jest.spyOn(console, 'error').mockImplementation(() => undefined);
	const preview = continuedPreview({ decision: 'selected', version: typography.id });
	expect(error).toHaveBeenCalledWith(expect.stringContaining(`${continuedPreviewId}: ${message}`));
	error.mockRestore();
	expect(preview.durationInFrames).toBe(1);
	expect(() => preview.at(0)).toThrow(message);
});
