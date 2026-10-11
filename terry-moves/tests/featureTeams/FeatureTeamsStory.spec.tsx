import { render } from '@testing-library/react';
import { CLIP_SECONDS, CUE } from '@/featureTeams/cues';
import { filmPoseAt, FPS, OPEN_FRAMES } from '@/featureTeams/film';
import { cellsCovered, COMPONENTS, columnsReached, rowsReached } from '@/featureTeams/layout';
import { footprint, LATER_STORIES, poseAt } from '@/featureTeams/pose';
import { FeatureTeamsScene } from '@/featureTeams/Scene';

// The pose at a moment of Bas's clip, given as minutes and seconds like his transcript.
const at = (mm: number, ss: number) => poseAt(mm * 60 + ss);
const frameOf = (clipSeconds: number) => OPEN_FRAMES + Math.round(clipSeconds * FPS);
const dev = (pose: ReturnType<typeof poseAt>, id: string) => pose.devs.find((d) => d.id === id)!;
const patch = (pose: ReturnType<typeof poseAt>, id: string) => pose.patches.find((p) => p.id === id)!;
const sampled = (from: number, to: number, step = 0.5) => Array.from({ length: Math.floor((to - from) / step) + 1 }, (_, i) => from + i * step);

describe('FeatureTeamsFilm story, at Bas\'s timestamps', () => {
	test('the product\'s columns are named components, the rows are features and unnamed', () => {
		expect(COMPONENTS).toEqual(['Front end', 'Back end', 'Middleware', 'Data']);
		const { getByTestId, queryByText } = render(<FeatureTeamsScene film={filmPoseAt(frameOf(40))} />);
		expect(getByTestId('component-labels').textContent).toBe(COMPONENTS.join(''));
		expect(queryByText('Backend')).toBeNull();
	});

	test('0:00–0:29 a shiny plan is first seen by everyone, then Team A applies it to its Back end column without a splash, and it turns ugly and quirky', () => {
		const plan = at(0, 3);
		expect(plan.balls.map((b) => b.id)).toEqual(['plan']);
		expect(plan.balls[0].label).toBe('A shiny plan');
		expect(plan.column).toMatchObject({ sheen: 0, mess: 0 });
		expect(poseAt(CUE.melt - 0.5).balls[0].x).toBeCloseTo(280, -1);
		const shiny = at(0, 12);
		expect(shiny.patches).toEqual([]);
		expect(shiny.column).toMatchObject({ col: 1, mess: 0 });
		expect(shiny.column!.sheen).toBeGreaterThan(0.9);
		expect(shiny.header.text).toBe('Component teams');
		const ugly = at(0, 22);
		expect(ugly.column!.mess).toBe(1);
		expect(ugly.column!.sheen).toBe(0);
		expect(ugly.patches).toEqual([]);
	});

	test('nobody notices the mess until the owning team leaves', () => {
		const others = ['component-0', 'component-2', 'component-3'];
		others.forEach((id) => expect(dev(at(0, 20), id).mood).toBe('sleepy'));
		expect(dev(at(0, 20), 'component-1').dy).toBe(0);
		expect(dev(at(0, 26), 'component-1').dy).toBeGreaterThan(200);
		expect(dev(at(0, 26), 'component-0').dy).toBe(0);
		others.forEach((id) => expect(dev(at(0, 27), id).mood).toBe('hopeful'));
		expect(dev(at(0, 27.5), 'component-2').bubble?.text).toBe('Oh… what a mess!');
	});

	test('0:29–0:54 two teams splash across the same product at the same time, crossing components including the backend row', () => {
		expect(at(0, 33).patches).toEqual([]);
		const before = poseAt(CUE.splash - 0.05);
		const after = poseAt(CUE.splash + 0.15);
		expect(before.patches).toHaveLength(0);
		const [one, two] = [patch(after, 'team-1'), patch(after, 'team-2')];
		expect(one.grow).toBeGreaterThan(0);
		expect(two.grow).toBeGreaterThan(0);
		expect(one.grow).toBe(two.grow);
		for (const p of [one, two]) {
			expect(columnsReached(p.cx, p.r).length).toBeGreaterThanOrEqual(3);
			expect(rowsReached(p.cy, p.r).length).toBeGreaterThanOrEqual(2);
		}
		// A big overlap: at least three cells belong to both impacts.
		const shared = cellsCovered(one.cx, one.cy, one.r).filter(([c, r]) => cellsCovered(two.cx, two.cy, two.r).some(([c2, r2]) => c === c2 && r === r2));
		expect(shared.length).toBeGreaterThanOrEqual(3);
		expect(Math.hypot(one.cx - two.cx, one.cy - two.cy)).toBeLessThan(one.r + two.r - 150);
		expect(new Set([one.color, two.color]).size).toBe(2);
	});

	test('each team splashes with its own finish, so the overlap clashes', () => {
		const pose = at(0, 40);
		expect(patch(pose, 'team-1').finish).toBe('tidy');
		expect(patch(pose, 'team-2').finish).toBe('scrappy');
		expect(at(0, 46).tags.tests).toBeGreaterThan(0.9);
		expect(patch(pose, 'team-1').finishShown).toBe(1);
		const { getAllByTestId } = render(<FeatureTeamsScene film={filmPoseAt(frameOf(40))} />);
		expect(getAllByTestId('patch')).toHaveLength(2);
		expect(getAllByTestId('clash')).toHaveLength(1);
	});

	test('0:54–1:03 the backend work has tests, the other change does not; "hey", then "Aren\'t we supposed to write tests here?"', () => {
		expect(at(0, 46).tags.tests).toBeGreaterThan(0.9);
		expect(at(0, 46).tags.noTests).toBe(0);
		expect(at(0, 52).tags.noTests).toBeGreaterThan(0.9);
		expect(dev(at(0, 53.5), 'dev-1').bubble).toBeUndefined();
		expect(dev(at(0, 54.5), 'dev-1').bubble?.text).toBe('Hey!');
		expect(dev(at(0, 54.5), 'dev-1').hand).toBe(1);
		expect(dev(at(0, 57.5), 'dev-1').bubble?.text).toBe('Hey!');
		expect(dev(at(0, 59), 'dev-1').bubble?.text).toBe("Aren't we supposed to write tests here?");
		expect(dev(at(0, 57.9), 'dev-1').bubble?.text).not.toBe("Aren't we supposed to write tests here?");
		// The two developers face each other and it hurts, a little.
		expect(dev(at(0, 59), 'dev-1').face).toBe(1);
		expect(dev(at(0, 59), 'dev-2').face).toBe(-1);
		expect(at(0, 61).zap).toBeGreaterThan(0.9);
		expect(dev(at(0, 62), 'dev-2').bubble?.text).toBe('Ouch. Fair point.');
	});

	test('1:03–1:20 the two teams talk it through themselves and agree shared practices on a card, pinned beside the product', () => {
		expect(at(1, 2).card).toBeUndefined();
		expect(at(1, 6).devs.map((d) => d.id)).toEqual(['dev-1', 'dev-2']);
		expect(at(1, 5).header.text).toBe('Painful, but very good');
		expect(poseAt(68.5).card!.items).toBeCloseTo(0, 1);
		expect(at(1, 13).card!.items).toBeGreaterThan(1.9);
		expect(at(1, 20).card!.items).toBe(3);
		expect(at(1, 20).card!.pin).toBe(1);
		expect(at(1, 20).header.text).toBe('Agree how we build here');
		const { getAllByTestId } = render(<FeatureTeamsScene film={filmPoseAt(frameOf(80))} />);
		expect(getAllByTestId('how-we-build-card')).toHaveLength(1);
		expect(getAllByTestId('card-item').every((item) => item.getAttribute('data-done') === 'true')).toBe(true);
	});

	test('the agreement repaints the scrappy patch to the shared finish, one patch at a time', () => {
		expect(patch(at(1, 15), 'team-2').repaint).toBe(0);
		const mid = patch(poseAt(CUE.repaint + 3), 'team-2').repaint;
		expect(mid).toBeGreaterThan(0.2);
		expect(mid).toBeLessThan(0.8);
		expect(patch(at(1, 30), 'team-2').repaint).toBe(1);
		expect(patch(at(1, 30), 'team-1').repaint).toBe(0);
	});
});

describe('FeatureTeamsFilm warning and improvement', () => {
	test('1:26–1:35 neglect: teams stop caring and quality spirals down, in every cue that runs backwards', () => {
		const calm = at(1, 25);
		const neglected = poseAt(CUE.neglectTo);
		expect(neglected.header.warn).toBe(true);
		expect(neglected.neglect).toBeGreaterThan(0.9);
		expect(neglected.quality!).toBeLessThan(0.2);
		expect(neglected.quality!).toBeLessThan(calm.quality! / 2);
		expect(neglected.look.saturation).toBeLessThan(calm.look.saturation - 0.1);
		expect(neglected.spiral).toBe(1);
		expect(neglected.card!.fall).toBeGreaterThan(0.9);
		neglected.patches.forEach((p) => expect(p.curl).toBeGreaterThan(0.9));
		expect(dev(neglected, 'dev-1').mood).toBe('sleepy');
		expect(dev(neglected, 'dev-1').face).toBe(-1);
		expect(dev(at(1, 33), 'dev-1').bubble?.text).toBe('Meh.');
	});

	test('neglect is a warning, not the ending: it is gone by 1:36 and the film ends on gradual improvement', () => {
		expect(at(1, 37).neglect).toBe(0);
		expect(at(1, 37).header.warn).toBe(false);
		expect(at(1, 37).spiral).toBe(0);
		expect(at(1, 37).card!.fall).toBe(0);
		const last = poseAt(CLIP_SECONDS);
		expect(last.neglect).toBe(0);
		expect(last.spiral).toBe(0);
		expect(last.header.text).toBe('Standards rise');
		expect(poseAt(CUE.rewind + 1).devs).toHaveLength(2);
		expect(last.quality!).toBeGreaterThan(0.95);
		expect(last.quality!).toBeGreaterThan(poseAt(CUE.neglectFrom - 1).quality!);
		expect(last.coherent).toBe(1);
		expect(last.patches).toEqual([]);
		expect(last.look.saturation).toBeGreaterThan(poseAt(CUE.neglectFrom - 1).look.saturation);
	});

	test('1:35–end standards and quality rise gradually, never falling back', () => {
		const qualities = sampled(96.5, CLIP_SECONDS).map((s) => poseAt(s).quality!);
		qualities.forEach((q, i) => i > 0 && expect(q).toBeGreaterThanOrEqual(qualities[i - 1] - 1e-9));
		expect(qualities[qualities.length - 1] - qualities[0]).toBeGreaterThan(0.3);
		// Steps, not a jump: no half-second step raises it by more than a fifth.
		qualities.forEach((q, i) => i > 0 && expect(q - qualities[i - 1]).toBeLessThan(0.2));
	});

	test('after the rewind the two impacts sink tidily into the grid cells, in the shared finish, and are not left as circles', () => {
		expect(poseAt(CUE.assimilate - 0.2).cells.every((c) => c.fills.length === 0)).toBe(true);
		const mid = poseAt(CUE.assimilate + 1.5);
		expect(mid.patches.filter((p) => p.team > 0).every((p) => p.assimilate > 0)).toBe(true);
		expect(mid.cells.some((c) => c.fills.length > 0)).toBe(true);
		const after = poseAt(CUE.assimilate + 3.5);
		expect(after.patches.filter((p) => p.team > 0)).toEqual([]);
		const filled = after.cells.filter((c) => c.fills.length > 0);
		expect(filled.map((c) => `${c.col},${c.row}`).sort()).toEqual(['0,1', '1,0', '1,1', '1,2', '2,1', '2,2']);
		// Where both impacts meet, the cell holds both, each fully.
		filled.filter((c) => ['1,1', '2,1', '1,2'].includes(`${c.col},${c.row}`)).forEach((c) => {
			expect(c.fills).toHaveLength(2);
			c.fills.forEach((f) => expect(f.amount).toBe(1));
		});
		expect(filled.find((c) => c.col === 0 && c.row === 1)!.fills).toHaveLength(1);
	});

	test('new stories land with the shared finish, sink into free cells, and never leave circles behind', () => {
		const shared = (s: number) => poseAt(s).patches.filter((p) => p.team === 0);
		expect(shared(CUE.stories[0] - 0.5)).toHaveLength(0);
		expect(shared(CUE.stories[0] + 1)).toHaveLength(1);
		shared(CUE.stories[0] + 1).forEach((p) => expect(p.finish).toBe('shared'));
		expect(shared(CLIP_SECONDS)).toEqual([]);
		const end = poseAt(CLIP_SECONDS).cells;
		expect(end.filter((c) => c.fills.length > 0)).toHaveLength(12);
		// Each later story covers several cells, across components and across features.
		LATER_STORIES.forEach((story) => {
			const cells = footprint(story);
			expect(cells.length).toBeGreaterThanOrEqual(3);
			expect(new Set(cells.map(([c]) => c)).size).toBeGreaterThanOrEqual(2);
			expect(new Set(cells.map(([, r]) => r)).size).toBeGreaterThanOrEqual(2);
		});
		expect(new Set(LATER_STORIES.map((s) => footprint(s).map((c) => c.join()).join('|'))).size).toBe(3);
		// A story's splash is assimilated cell by cell, not all at once.
		const mid = poseAt(CUE.stories[1] + 1.4).cells.filter((c) => c.fills.some((f) => f.color === LATER_STORIES[1].color && f.amount > 0 && f.amount < 1));
		expect(mid.length).toBeGreaterThan(0);
	});
});
