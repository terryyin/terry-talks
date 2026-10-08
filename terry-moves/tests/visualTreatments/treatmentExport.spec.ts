import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { characterTimeline, characterV1 } from '../../src/visualTreatments/character/script';
import { TreatmentChoice } from '../../src/visualTreatments/choice';
import { planContinuationExport, planTreatmentExport } from '../../src/visualTreatments/exportPlan';
import { resolveChoice } from '../../src/visualTreatments/selection';
import { TreatmentEntry, treatmentVersions } from '../../src/visualTreatments/versions';

const root = join(__dirname, '../..');

test('every registered version exports its clip and two key poses per named beat into its own folder', () => {
	const plans = planTreatmentExport();
	expect(plans.map((plan) => plan.id)).toEqual(['TreatmentTypographyV1', 'TreatmentCharacterV1', 'TreatmentCharacterV2']);
	expect(plans.map((plan) => plan.durationInFrames)).toEqual([870, 915, 915]);
	plans.forEach((plan) => {
		expect(plan.dir).toBe(`out/treatments/${plan.id}`);
		expect(plan.clip).toBe(`out/treatments/${plan.id}/${plan.id}.mp4`);
		expect([plan.width, plan.height, plan.fps]).toEqual([1080, 1080, 30]);
		expect(plan.beats.map((b) => b.name)).toEqual(['title', 'distinction', 'question', 'result', 'feedback', 'next']);
		expect(plan.keyPoses).toHaveLength(12);
		plan.keyPoses.forEach((pose) => expect(pose.file).toBe(`out/treatments/${plan.id}/${pose.beat}-${pose.moment}-${pose.frame}.png`));
	});
});

test('key-pose frames come from the version timeline, so retiming a beat moves them', () => {
	const [v1] = planTreatmentExport(['TreatmentCharacterV1']);
	const settled = (beat: string) => v1.keyPoses.find((pose) => pose.beat === beat && pose.moment === 'settled')!.frame;
	expect([settled('question'), settled('result'), settled('feedback'), settled('next')]).toEqual([389, 539, 719, 914]);
	const result = v1.beats.find((b) => b.name === 'result')!;
	expect(result).toMatchObject({ from: 390, to: 539, caption: 'A usable result: in stock, one left. Not the whole shopping problem.' });
	expect(v1.keyPoses.find((pose) => pose.beat === 'result' && pose.moment === 'midway')!.frame).toBe(465);

	const retimed = { ...characterV1, id: 'Retimed', seconds: { ...characterV1.seconds, result: 6 } };
	const entry: TreatmentEntry = { treatment: 'character', id: retimed.id, fps: 30, timeline: characterTimeline(retimed), sources: { script: [], renderer: [] } };
	const [plan] = planTreatmentExport([], [entry]);
	expect(plan.keyPoses.filter((pose) => pose.moment === 'settled').map((pose) => pose.frame)).toEqual([89, 254, 389, 569, 749, 944]);
});

test('named versions select what is exported; an unknown name is refused with the registered ones', () => {
	expect(planTreatmentExport(['TreatmentCharacterV2']).map((plan) => plan.id)).toEqual(['TreatmentCharacterV2']);
	expect(planTreatmentExport(['TreatmentCharacterV2', 'TreatmentTypographyV1']).map((plan) => plan.id)).toEqual(['TreatmentTypographyV1', 'TreatmentCharacterV2']);
	expect(() => planTreatmentExport(['TreatmentCharacterV3'])).toThrow('Unknown treatment version TreatmentCharacterV3. Registered: TreatmentTypographyV1, TreatmentCharacterV1, TreatmentCharacterV2');
});

test('the version exports never contain a selected output, whatever the review record says', () => {
	const plans = planTreatmentExport();
	const outputs = plans.flatMap((plan) => [plan.dir, plan.clip, ...plan.keyPoses.map((pose) => pose.file)]);
	expect([...new Set(outputs.map((path) => path.split('/')[2]))]).toEqual(treatmentVersions.map((entry) => entry.id));
	expect(JSON.stringify(plans)).not.toMatch(/select/i);
});

test('TEST FIXTURE: a pending or revise record exports no continuation', () => {
	const pending: TreatmentChoice = { decision: 'pending', note: 'Neither yet.' };
	const revise: TreatmentChoice = { decision: 'revise', version: 'TreatmentCharacterV1', beats: ['result'], note: 'Relief reads too weakly.' };
	[pending, revise].forEach((choice) => {
		expect(planContinuationExport([], resolveChoice(choice))).toBeUndefined();
		expect(planContinuationExport(['TreatmentCharacterV1'], resolveChoice(choice))).toBeUndefined();
	});
});

test('the selected version adds exactly its continuation: clip, key poses and appended beat, from the composed timeline', () => {
	const plan = planContinuationExport()!;
	const dir = 'out/treatments/selected/TreatmentCharacterV2-continued';
	expect(plan).toMatchObject({
		id: 'TreatmentSelectedContinued',
		selected: 'TreatmentCharacterV2',
		treatment: 'character',
		dir,
		clip: `${dir}/TreatmentCharacterV2-continued.mp4`,
		fps: 30,
		width: 1080,
		height: 1080,
		prefixFrames: 915,
		durationInFrames: 1065,
		appended: { name: 'hours', from: 915, to: 1064 },
	});
	expect(plan.beats.map((b) => b.name)).toEqual(['title', 'distinction', 'question', 'result', 'feedback', 'next', 'hours']);
	expect(plan.beats.slice(0, -1)).toEqual(planTreatmentExport(['TreatmentCharacterV2'])[0].beats);
	expect(plan.keyPoses.filter((pose) => pose.beat === 'hours')).toEqual([
		{ beat: 'hours', moment: 'midway', frame: 990, file: `${dir}/hours-midway-990.png` },
		{ beat: 'hours', moment: 'settled', frame: 1064, file: `${dir}/hours-settled-1064.png` },
	]);
	plan.keyPoses.forEach((pose) => expect(pose.file.startsWith(`${dir}/`)).toBe(true));
	expect(plan.sources.script).toEqual(expect.arrayContaining(['src/visualTreatments/character/v2.ts', 'src/visualTreatments/character/continuation.ts', 'src/visualTreatments/choice.ts']));

	expect(planContinuationExport(['TreatmentCharacterV2'])).toEqual(plan);
	expect(planContinuationExport(['TreatmentCharacterV1', 'TreatmentTypographyV1'])).toBeUndefined();
});

test('each version names authored source files that exist', () => {
	const continued = planContinuationExport()!;
	[...treatmentVersions, continued].forEach((entry) => [...entry.sources.script, ...entry.sources.renderer].forEach((path) => expect(existsSync(join(root, path))).toBe(true)));
	const v2 = treatmentVersions.find((entry) => entry.id === 'TreatmentCharacterV2')!;
	expect(v2.sources.script).toContain('src/visualTreatments/character/v2.ts');
	expect(treatmentVersions.find((entry) => entry.id === 'TreatmentCharacterV1')!.sources.script).not.toContain('src/visualTreatments/character/v2.ts');
});
