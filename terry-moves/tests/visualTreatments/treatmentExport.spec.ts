import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { characterTimeline, characterV1 } from '../../src/visualTreatments/character/script';
import { planTreatmentExport } from '../../src/visualTreatments/exportPlan';
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

test('exporting while no choice exists produces only the named versions, never a selected output', () => {
	const plans = planTreatmentExport();
	const outputs = plans.flatMap((plan) => [plan.dir, plan.clip, ...plan.keyPoses.map((pose) => pose.file)]);
	expect([...new Set(outputs.map((path) => path.split('/')[2]))]).toEqual(treatmentVersions.map((entry) => entry.id));
	expect(JSON.stringify(plans)).not.toMatch(/select/i);
});

test('each version names authored source files that exist', () => {
	treatmentVersions.forEach((entry) => [...entry.sources.script, ...entry.sources.renderer].forEach((path) => expect(existsSync(join(root, path))).toBe(true)));
	const v2 = treatmentVersions.find((entry) => entry.id === 'TreatmentCharacterV2')!;
	expect(v2.sources.script).toContain('src/visualTreatments/character/v2.ts');
	expect(treatmentVersions.find((entry) => entry.id === 'TreatmentCharacterV1')!.sources.script).not.toContain('src/visualTreatments/character/v2.ts');
});
