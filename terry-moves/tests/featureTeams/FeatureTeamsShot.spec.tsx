import { CUE, SCENE_END } from '@/featureTeams/cues';
import {
	COVER_FRAME,
	durationInFrames,
	END_SECONDS,
	FPS,
	HOLD_SECONDS,
	OPEN_FRAMES,
	speakerChoreography,
} from '@/featureTeams/film';
import { INSET } from '@/featureTeams/layout';
import measurement from '@/featureTeams/shot-measurement.json';
import { compileShot, speakerShot, type Shot, type ShotMeasurement } from '@/featureTeams/shot';

// How the declared crop lands in the inset: drawn width, crop-origin offsets and
// scale (inset pixels per source pixel). Used to prove a re-framed stand-in with
// full-frame crop matches the approved crop mapping within a pixel.
const insetMapping = (shot: Shot, m: ShotMeasurement) => {
	const { placement } = compileShot(shot, m, speakerChoreography, FPS);
	const videoHeight = placement.videoWidth * (m.height / m.width);
	return {
		drawnCropWidth: placement.videoWidth * shot.crop.width,
		cropOriginLeft: placement.left + shot.crop.left * placement.videoWidth,
		cropOriginTop: placement.top + shot.crop.top * videoHeight,
		scale: placement.videoWidth / m.width,
	};
};

describe('FeatureTeamsShot compile and replacement', () => {
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
		const approved = compileShot(speakerShot, measurement, speakerChoreography, FPS);
		const standIn = compileShot(standInShot, standInMeasurement, speakerChoreography, FPS);
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

	// In-memory lead (2 s room) and short (cut at 108.6 s) measurements — stand-in
	// files are proof-only and never committed.
	test('a longer source with an explicit trim keeps the approved slot, frames and cover', () => {
		const leadMeasurement: ShotMeasurement = {
			...measurement,
			source: 'assets/feature-teams-stand-ins/lead.mp4',
			sha256: 'in-memory-lead',
			durationSeconds: 115.508,
		};
		const trimmed: Shot = {
			...speakerShot,
			source: leadMeasurement.source,
			play: { from: 2.0, to: 115.508 },
		};
		const fullLead: Shot = { ...trimmed, play: 'full' };
		const approved = compileShot(speakerShot, measurement, speakerChoreography, FPS);
		const leadTrim = compileShot(trimmed, leadMeasurement, speakerChoreography, FPS);
		const leadFull = compileShot(fullLead, leadMeasurement, speakerChoreography, FPS);

		expect(leadTrim.from).toBe(2.0);
		expect(leadTrim.to).toBe(115.508);
		expect(leadTrim.slotSeconds).toBe(approved.slotSeconds);
		expect(leadTrim.videoFrames).toBe(approved.videoFrames);
		expect(leadTrim.sceneSeconds).toBe(approved.sceneSeconds);
		expect(leadTrim.holdFrom).toBeNull();
		expect(OPEN_FRAMES + Math.round(108.6 * FPS)).toBe(COVER_FRAME);
		expect(OPEN_FRAMES + Math.round((leadTrim.sceneSeconds + HOLD_SECONDS + END_SECONDS) * FPS)).toBe(
			durationInFrames,
		);

		expect(leadFull.slotSeconds).toBe(approved.slotSeconds + 2);
		expect(leadFull.videoFrames).toBe(Math.ceil(115.508 * FPS));
		expect(leadFull.sceneSeconds).toBe(approved.sceneSeconds + 2);
	});

	test('a shorter source holds the inset to the choreography end, or edit names the unreached cue', () => {
		const shortMeasurement: ShotMeasurement = {
			...measurement,
			source: 'assets/feature-teams-stand-ins/short.mp4',
			sha256: 'in-memory-short',
			durationSeconds: 108.6,
		};
		const shortHold: Shot = {
			...speakerShot,
			source: shortMeasurement.source,
			play: 'full',
			whenShort: 'hold',
		};
		const shortEdit: Shot = { ...shortHold, whenShort: 'edit' };
		const held = compileShot(shortHold, shortMeasurement, speakerChoreography, FPS);

		expect(held.slotSeconds).toBe(108.6);
		expect(held.sceneSeconds).toBe(SCENE_END);
		expect(held.holdFrom).toBe(108.6);
		expect(held.videoFrames).toBe(Math.ceil(108.6 * FPS));
		expect(OPEN_FRAMES + Math.round((held.sceneSeconds + HOLD_SECONDS + END_SECONDS) * FPS)).toBe(
			durationInFrames,
		);

		expect(() => compileShot(shortEdit, shortMeasurement, speakerChoreography, FPS)).toThrow(
			/108\.6[\s\S]*joy[\s\S]*109\.3/,
		);
		expect(CUE.joy).toBe(109.3);
	});
});
