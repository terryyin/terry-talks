// Only the measured length changes: the real declaration remains full play
// with edit, and film.ts compiles and wires the shorter slot itself.
jest.mock('@/featureTeams/shot-measurement.json', () => ({
	...jest.requireActual('@/featureTeams/shot-measurement.json'),
	durationSeconds: 110,
}));

import {
	clipSecondsAt,
	durationInFrames,
	END_SECONDS,
	filmPoseAt,
	FPS,
	HOLD_SECONDS,
	OPEN_FRAMES,
	speakerChoreography,
	speakerSlot,
} from '@/featureTeams/film';
import { poseAt } from '@/featureTeams/pose';

const frameOf = (clipSeconds: number) => OPEN_FRAMES + Math.round(clipSeconds * FPS);

describe('FeatureTeamsFilm with a shorter edit that reaches every cue', () => {
	test('the inset leaves at the 110-second slot, then the last moment runs until the ending', () => {
		expect(speakerSlot.sceneSeconds).toBe(110);
		expect(speakerSlot.holdFrom).toBeNull();
		expect(speakerChoreography.cues.every((cue) => cue.at <= 110)).toBe(true);
		expect(filmPoseAt(frameOf(110) - 1).clipShown).toBe(1);
		expect(filmPoseAt(frameOf(110)).clipShown).toBe(1);
		const leaving = filmPoseAt(frameOf(110.2));
		expect(leaving.clipShown).toBeGreaterThan(0);
		expect(leaving.clipShown).toBeLessThan(1);
		expect(filmPoseAt(frameOf(110.4)).clipShown).toBe(0);
		const lastMomentFrame = frameOf(110 + HOLD_SECONDS) - 1;
		const lastMoment = filmPoseAt(lastMomentFrame);
		expect(lastMoment).toMatchObject({ stage: 1, clipShown: 0 });
		expect(lastMoment.endCard).toBeUndefined();
		expect(lastMoment.scene).toEqual(poseAt(clipSecondsAt(lastMomentFrame)));
	});

	test('the ending starts after the shortened last moment and samples that scene through the credits', () => {
		const endingFrame = frameOf(110 + HOLD_SECONDS);
		const first = filmPoseAt(endingFrame);
		expect(first.endCard).toMatchObject({ lead: 0, credit: 0, bas: 0 });
		expect(first.scene).toEqual(poseAt(110 + HOLD_SECONDS));
		const closingLine = filmPoseAt(endingFrame + FPS);
		expect(closingLine.endCard!.lead).toBe(1);
		expect(closingLine.stage).toBe(0);
		expect(closingLine.scene.s).toBe(110 + HOLD_SECONDS);
		expect(durationInFrames).toBe(OPEN_FRAMES + Math.round((110 + HOLD_SECONDS + END_SECONDS) * FPS));
		expect(filmPoseAt(durationInFrames - 1).endCard).toMatchObject({ credit: 1, bas: 1 });
	});
});
