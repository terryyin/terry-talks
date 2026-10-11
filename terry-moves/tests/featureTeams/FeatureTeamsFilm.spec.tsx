import { render } from '@testing-library/react';

// The logo's images and coin flip need a running composition; stand-ins keep their place in the tree.
jest.mock('@/parts/OddeLogo', () => ({ OddeLogo: () => <i data-testid="logo-outer" /> }));
jest.mock('@/parts/OddeLogoInner', () => ({ OddeLogoInner: () => <i data-testid="logo-inner" /> }));
jest.mock('@/video_components/AutonomousComponents/FlipCoin', () => ({ FlipCoin: ({ children }: { children: React.ReactNode }) => <b data-testid="flip-coin">{children}</b> }));
import { createHash } from 'crypto';
import fs from 'fs';
import path from 'path';
import { CLIP_SECONDS, SCENE_END } from '@/featureTeams/cues';
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
	speakerSlot,
	TITLE,
} from '@/featureTeams/film';
import { INSET, LOGO } from '@/featureTeams/layout';
import { poseAt } from '@/featureTeams/pose';
import measurement from '@/featureTeams/shot-measurement.json';
import { compileShot, speakerShot, type Shot, type ShotMeasurement } from '@/featureTeams/shot';
import { FeatureTeamsScene } from '@/featureTeams/Scene';
import { OddeCorner } from '@/stories/FeatureTeamsFilm';

const frameOf = (clipSeconds: number) => OPEN_FRAMES + Math.round(clipSeconds * FPS);

// How the declared crop lands in the inset: drawn width, crop-origin offsets and
// scale (inset pixels per source pixel). Used to prove a re-framed stand-in with
// full-frame crop matches the approved crop mapping within a pixel.
const insetMapping = (shot: Shot, m: ShotMeasurement) => {
	const { placement } = compileShot(shot, m, { end: SCENE_END }, FPS);
	const videoHeight = placement.videoWidth * (m.height / m.width);
	return {
		drawnCropWidth: placement.videoWidth * shot.crop.width,
		cropOriginLeft: placement.left + shot.crop.left * placement.videoWidth,
		cropOriginTop: placement.top + shot.crop.top * videoHeight,
		scale: placement.videoWidth / m.width,
	};
};

describe('FeatureTeamsFilm timeline', () => {
	test('the opening shifts Bas\'s clip, which plays in full, and the ending follows it', () => {
		expect(OPEN_SECONDS).toBeLessThanOrEqual(4);
		expect(filmPoseAt(OPEN_FRAMES - 1).clipShown).toBe(0);
		expect(filmPoseAt(OPEN_FRAMES + 2 * FPS).clipShown).toBe(1);
		expect(CLIP_FRAMES).toBeGreaterThanOrEqual(Math.ceil(measurement.durationSeconds * FPS));
		expect(durationInFrames).toBe(OPEN_FRAMES + Math.round((speakerSlot.sceneSeconds + HOLD_SECONDS + END_SECONDS) * FPS));
	});

	test('the scene follows the clip: a film frame samples the pose at its seconds into the clip', () => {
		expect(filmPoseAt(frameOf(59.6)).scene).toEqual(poseAt(59.6));
		expect(filmPoseAt(OPEN_FRAMES).scene.s).toBe(0);
	});

	// Recorded from the composition before the shot declaration: video width
	// 300/0.83, left −0.085×that, top −0.04×that×1920/1080 − 6, sequence from
	// 108 for 3406 frames. compileShot must keep these numbers for the approved crop.
	test('the inset placement matches the recorded crop maths', () => {
		const videoWidth = INSET.width / 0.83;
		expect(speakerSlot.placement).toEqual({
			videoWidth,
			left: -0.085 * videoWidth,
			top: -0.04 * videoWidth * (1920 / 1080) - 6,
		});
		expect(speakerSlot.videoFrames).toBe(3406);
		expect(OPEN_FRAMES).toBe(108);
		expect(CLIP_FRAMES).toBe(3406);
		expect(SCENE_END).toBe(113.5);
	});

	test('the clip file matches the committed measurement record', () => {
		const take = fs.readFileSync(path.join(__dirname, '../../public', measurement.source));
		expect(createHash('sha256').update(take).digest('hex')).toBe(measurement.sha256);
	});

	// Stand-in geometry is the approved crop as integer pixels (ffmpeg
	// crop=896:1769:92:77; yuv420 encode stores height 1768). In-memory only —
	// stand-in files are never committed.
	test('a re-framed stand-in with full-frame crop matches the approved inset mapping within a pixel', () => {
		const standInMeasurement: ShotMeasurement = {
			source: 'assets/feature-teams-stand-ins/margins-cut.mp4',
			sha256: 'in-memory-stand-in',
			durationSeconds: measurement.durationSeconds,
			width: 896,
			height: 1768,
			fps: measurement.fps,
			hasAudio: true,
		};
		const standInShot: Shot = {
			source: standInMeasurement.source,
			crop: { left: 0, top: 0, width: 1 },
			play: 'full',
			whenShort: 'edit',
			audio: 'voice',
		};
		const approved = compileShot(speakerShot, measurement, { end: SCENE_END }, FPS);
		const standIn = compileShot(standInShot, standInMeasurement, { end: SCENE_END }, FPS);
		const a = insetMapping(speakerShot, measurement);
		const s = insetMapping(standInShot, standInMeasurement);

		expect(s.drawnCropWidth).toBe(INSET.width);
		expect(a.drawnCropWidth).toBe(INSET.width);
		expect(Math.abs(s.cropOriginLeft - a.cropOriginLeft)).toBeLessThanOrEqual(1);
		expect(Math.abs(s.cropOriginTop - a.cropOriginTop)).toBeLessThanOrEqual(1);
		expect(Math.abs(s.scale - a.scale)).toBeLessThanOrEqual(1 / measurement.width);

		// Stand-in's frame is the approved crop region; mapped back, the inset
		// window covers the same source pixels within one pixel.
		const standInOrigin = { left: 92, top: 77 };
		const approvedSrcLeft = speakerShot.crop.left * measurement.width;
		const approvedSrcTop = -approved.placement.top / a.scale;
		const standInSrcLeft = standInOrigin.left - standIn.placement.left / s.scale;
		const standInSrcTop = standInOrigin.top - standIn.placement.top / s.scale;
		expect(Math.abs(standInSrcLeft - approvedSrcLeft)).toBeLessThanOrEqual(1);
		expect(Math.abs(standInSrcTop - approvedSrcTop)).toBeLessThanOrEqual(1);
		expect(Math.abs(standInMeasurement.width - speakerShot.crop.width * measurement.width)).toBeLessThanOrEqual(1);

		expect(standIn.slotSeconds).toBe(approved.slotSeconds);
		expect(standIn.videoFrames).toBe(approved.videoFrames);
		expect(standIn.sceneSeconds).toBe(approved.sceneSeconds);
		expect(standIn.audio).toBe('voice');
		expect(standIn.holdFrom).toBeNull();
	});
});

describe('FeatureTeamsFilm opening, ending, cover and logo', () => {
	test('the opening is short: the finished product briefly, then the title on paper, then the story', () => {
		expect(filmPoseAt(0).title).toBeUndefined();
		expect(filmPoseAt(0).scene.cells.filter((c) => c.fills.length > 0).length).toBeGreaterThan(8);
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
		expect(`${END.lead} ${END.romantic} ${END.disciplined}`).not.toMatch(/facilitat/i);
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

	test('the cover is a later, neat frame: the impacts assimilated tidily, the shared card pinned, quality high, no bubbles', () => {
		expect(COVER_FRAME).toBe(3366);
		expect(COVER_FRAME).toBeGreaterThan(OPEN_FRAMES);
		expect(COVER_FRAME).toBeLessThan(durationInFrames);
		const scene = filmPoseAt(COVER_FRAME).scene;
		expect(scene.patches).toEqual([]);
		expect(scene.cells.filter((c) => c.fills.length > 0).length).toBeGreaterThanOrEqual(10);
		expect(scene.card!.items).toBe(3);
		expect(scene.quality!).toBeGreaterThan(0.9);
		expect(scene.devs.every((d) => d.bubble === undefined)).toBe(true);
		const scripts = JSON.parse(fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf8')).scripts;
		const script: string = scripts['render:feature-teams'];
		expect(script).toContain('scripts/measure-shot.mjs --check');
		expect(script).toContain('scripts/render-feature-teams.ts');
		expect(fs.existsSync(path.join(__dirname, '../../scripts/render-feature-teams.ts'))).toBe(true);
		const renderScript = fs.readFileSync(path.join(__dirname, '../../scripts/render-feature-teams.ts'), 'utf8');
		expect(renderScript).toContain('COVER_FRAME');
		expect(renderScript).toContain('out/feature-teams-engineering-practices.mp4');
		expect(renderScript).toContain('out/feature-teams-engineering-practices-cover.png');
		expect(renderScript).toContain('--codec=h264');
		expect(renderScript).toContain('--pixel-format=yuv420p');
		expect(renderScript).toContain('--color-space=bt709');
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
