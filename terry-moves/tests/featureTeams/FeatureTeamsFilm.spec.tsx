import { render } from '@testing-library/react';

// The logo's images and coin flip need a running composition; stand-ins keep their place in the tree.
jest.mock('@/parts/OddeLogo', () => ({ OddeLogo: () => <i data-testid="logo-outer" /> }));
jest.mock('@/parts/OddeLogoInner', () => ({ OddeLogoInner: () => <i data-testid="logo-inner" /> }));
jest.mock('@/video_components/AutonomousComponents/FlipCoin', () => ({ FlipCoin: ({ children }: { children: React.ReactNode }) => <b data-testid="flip-coin">{children}</b> }));
import fs from 'fs';
import path from 'path';
import { CLIP_SECONDS, CUE } from '@/featureTeams/cues';
import {
	CLIP_FRAMES,
	COVER_FRAME,
	durationInFrames,
	END,
	END_SECONDS,
	filmPoseAt,
	FPS,
	HOLD_SECONDS,
	OPEN_FRAMES,
	OPEN_SECONDS,
	TITLE,
} from '@/featureTeams/film';
import { BACKEND_ROW, columnsReached, LOGO, rowsReached } from '@/featureTeams/layout';
import { poseAt } from '@/featureTeams/pose';
import { FeatureTeamsScene } from '@/featureTeams/Scene';
import { OddeCorner } from '@/stories/FeatureTeamsFilm';

// The pose at a moment of Bas's clip, given as minutes and seconds like his transcript.
const at = (mm: number, ss: number) => poseAt(mm * 60 + ss);
const frameOf = (clipSeconds: number) => OPEN_FRAMES + Math.round(clipSeconds * FPS);
const dev = (pose: ReturnType<typeof poseAt>, id: string) => pose.devs.find((d) => d.id === id)!;
const patch = (pose: ReturnType<typeof poseAt>, id: string) => pose.patches.find((p) => p.id === id)!;
const sampled = (from: number, to: number, step = 0.5) => Array.from({ length: Math.floor((to - from) / step) + 1 }, (_, i) => from + i * step);

describe('FeatureTeamsFilm timeline', () => {
	test('the opening shifts Bas\'s clip, which plays in full, and the ending follows it', () => {
		expect(OPEN_SECONDS).toBeLessThanOrEqual(4);
		expect(filmPoseAt(OPEN_FRAMES - 1).clipShown).toBe(0);
		expect(filmPoseAt(OPEN_FRAMES + 2 * FPS).clipShown).toBe(1);
		expect(CLIP_FRAMES).toBeGreaterThanOrEqual(Math.ceil(113.508 * FPS));
		expect(durationInFrames).toBe(OPEN_FRAMES + Math.round((CLIP_SECONDS + HOLD_SECONDS + END_SECONDS) * FPS));
	});

	test('the scene follows the clip: a film frame samples the pose at its seconds into the clip', () => {
		expect(filmPoseAt(frameOf(59.6)).scene).toEqual(poseAt(59.6));
		expect(filmPoseAt(OPEN_FRAMES).scene.s).toBe(0);
	});
});

describe('FeatureTeamsFilm story, at Bas\'s timestamps', () => {
	test('0:00–0:29 a component team owns one part: a proper, shiny idea first, without a splash, then ugly and quirky', () => {
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
		expect(dev(at(0, 20), 'component-1').x).toBeGreaterThan(200);
		expect(dev(at(0, 26), 'component-1').x).toBeLessThan(0);
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
			expect(rowsReached(p.cy, p.r)).toContain(BACKEND_ROW);
			expect(rowsReached(p.cy, p.r).length).toBeGreaterThanOrEqual(2);
		}
		expect(Math.hypot(one.cx - two.cx, one.cy - two.cy)).toBeLessThan(one.r + two.r - 60);
		expect(new Set([one.color, two.color]).size).toBe(2);
	});

	test('each team splashes with its own finish, so the overlap clashes', () => {
		const pose = at(0, 40);
		expect(patch(pose, 'team-1').finish).toBe('tidy');
		expect(patch(pose, 'team-2').finish).toBe('scrappy');
		expect(patch(pose, 'team-1').finishShown).toBe(1);
		const { getAllByTestId } = render(<FeatureTeamsScene film={filmPoseAt(frameOf(40))} />);
		expect(getAllByTestId('patch')).toHaveLength(2);
		expect(getAllByTestId('clash')).toHaveLength(1);
		expect(getAllByTestId('backend-label')).toHaveLength(1);
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

	test('1:03–1:20 a facilitated conversation agrees shared practices on a card, pinned beside the product', () => {
		expect(at(1, 2).card).toBeUndefined();
		expect(dev(at(1, 2), 'facilitator').show).toBe(0);
		expect(dev(at(1, 6), 'facilitator').show).toBe(1);
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
		expect(dev(neglected, 'facilitator').show).toBe(0);
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
		expect(last.header.text).toBe('Facilitated: standards rise');
		expect(last.quality!).toBeGreaterThan(0.95);
		expect(last.quality!).toBeGreaterThan(poseAt(CUE.neglectFrom - 1).quality!);
		expect(last.coherent).toBe(1);
		expect(last.look.saturation).toBeGreaterThan(poseAt(CUE.neglectFrom - 1).look.saturation);
	});

	test('1:35–end standards and quality rise gradually, never falling back', () => {
		const qualities = sampled(96.5, CLIP_SECONDS).map((s) => poseAt(s).quality!);
		qualities.forEach((q, i) => i > 0 && expect(q).toBeGreaterThanOrEqual(qualities[i - 1] - 1e-9));
		expect(qualities[qualities.length - 1] - qualities[0]).toBeGreaterThan(0.3);
		// Steps, not a jump: no half-second step raises it by more than a fifth.
		qualities.forEach((q, i) => i > 0 && expect(q - qualities[i - 1]).toBeLessThan(0.2));
	});

	test('new stories land with the shared finish, one after another', () => {
		const shared = (s: number) => poseAt(s).patches.filter((p) => p.team === 0);
		expect(shared(CUE.stories[0] - 0.5)).toHaveLength(0);
		expect(shared(CUE.stories[0] + 1)).toHaveLength(1);
		expect(shared(CUE.stories[2] + 1)).toHaveLength(3);
		shared(CLIP_SECONDS).forEach((p) => expect(p.finish).toBe('shared'));
	});
});

describe('FeatureTeamsFilm opening, ending, cover and logo', () => {
	test('the opening is short: the finished product briefly, then the title on paper, then the story', () => {
		expect(filmPoseAt(0).title).toBeUndefined();
		expect(filmPoseAt(0).scene.patches.length).toBeGreaterThan(3);
		const title = filmPoseAt(Math.round(2.7 * FPS)).title!;
		expect(title).toMatchObject({ romantic: TITLE.romantic, disciplined: TITLE.disciplined, snap: 1, underline: 1, leave: 0 });
		expect(title.drops.every((d) => d === 0 || d === null || Math.abs(d) < 8)).toBe(true);
		const last = filmPoseAt(OPEN_FRAMES - 1);
		expect(last.title!.leave).toBe(1);
		expect(last.stage).toBeGreaterThan(0.9);
	});

	test('the ending is a closing line, then the unchanged credit to Terry and a credit to Bas', () => {
		expect(END.credit).toBe('An idea and film by Terry Yin');
		expect(END.bas).toMatch(/Bas Vodde/);
		const film = filmPoseAt(durationInFrames - 1);
		expect(film.endCard).toMatchObject({ lead: 1, snap: 1, underline: 1, credit: 1, bas: 1 });
		expect(film.stage).toBe(0);
		const { getByTestId } = render(<FeatureTeamsScene film={film} />);
		expect(getByTestId('end-lead').textContent).toBe(END.lead);
		expect(getByTestId('end-credit').textContent).toBe('An idea and film by Terry Yin');
		expect(getByTestId('end-bas').textContent).toBe(END.bas);
		// The credits come last.
		const early = filmPoseAt(frameOf(CLIP_SECONDS + HOLD_SECONDS) + Math.round(1.5 * FPS)).endCard!;
		expect(early.lead).toBe(1);
		expect(early.credit).toBe(0);
	});

	test('the cover is a later frame, not the first, at the tests conversation, and package.json renders it', () => {
		expect(COVER_FRAME).toBeGreaterThan(OPEN_FRAMES);
		expect(COVER_FRAME).toBeLessThan(durationInFrames);
		const scene = filmPoseAt(COVER_FRAME).scene;
		expect(dev(scene, 'dev-1').bubble?.text).toBe("Aren't we supposed to write tests here?");
		expect(scene.patches).toHaveLength(2);
		const scripts = JSON.parse(fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf8')).scripts;
		const script: string = scripts['render:feature-teams'];
		expect(script).toContain('out/feature-teams-engineering-practices.mp4');
		expect(script).toContain('out/feature-teams-engineering-practices-cover.png');
		expect(script).toContain(`--frame=${COVER_FRAME}`);
		expect(script).toContain('--codec=h264 --pixel-format=yuv420p --color-space=bt709');
	});

	test('the animated Odd-e logo sits in the upper right of the frame', () => {
		const { getByTestId } = render(<OddeCorner />);
		expect(getByTestId('odde-logo').contains(getByTestId('logo-outer'))).toBe(true);
		expect(getByTestId('flip-coin').contains(getByTestId('logo-inner'))).toBe(true);
		expect(LOGO.left + LOGO.width).toBeLessThanOrEqual(1080);
		expect(LOGO.left).toBeGreaterThan(540);
		expect(LOGO.top + LOGO.width / 2).toBeLessThan(200);
	});
});
