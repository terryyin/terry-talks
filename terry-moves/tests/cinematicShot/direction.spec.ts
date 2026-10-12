import { compileDirection } from '../../src/cinematicShot/direction';
import { directions, originalDirection, revisedDirection, shotFormat } from '../../src/cinematicShot/script';

describe.each(Object.entries(directions))('%s take', (_take, direction) => {
const shot = compileDirection(direction, shotFormat.fps);

test('the cue sheet owns the 12-second edit and each cue range', () => {
	expect(shot.durationInFrames).toBe(360);
	expect(shot.beats.map((cue) => shot.beatRange(cue.name))).toEqual([
		{ from: 0, durationInFrames: 75 }, { from: 75, durationInFrames: 165 }, { from: 240, durationInFrames: 120 },
	]);
	expect(compileDirection(direction, 24).durationInFrames).toBe(288);
});

test('the close view starts with the authored camera, lights and staged work', () => {
	const pose = shot.poseAt(0);
	expect(pose.camera).toEqual(direction.start.camera);
	expect(pose.lights).toEqual(direction.start.lights);
	direction.pieces.forEach((piece) => {
		expect(pose.pieces[piece.name]).toEqual({ position: direction.marks[piece.start], yaw: piece.yaw });
	});
});

test('local activity advances the center piece while both side queues stay at their marks', () => {
	const first = shot.poseAt(0);
	const middle = shot.poseAt(37);
	const end = shot.poseAt(74);
	expect(middle.pieces.active.position[0]).toBeGreaterThan(first.pieces.active.position[0]);
	expect(middle.pieces.active.position[0]).toBeLessThan(end.pieces.active.position[0]);
	expect(end.pieces.active.position).toEqual(direction.marks.activeWaiting);
	for (const piece of direction.pieces.filter((piece) => piece.name !== 'active')) {
		expect(end.pieces[piece.name]).toEqual(first.pieces[piece.name]);
	}
});

test('the reveal samples authored camera and light endpoints while work passes the opening', () => {
	const reveal = direction.cues[1];
	const start = shot.poseAt(75);
	const middle = shot.poseAt(157);
	const end = shot.poseAt(239);
	expect(end.camera).toEqual(reveal.camera);
	expect(end.lights).toEqual(reveal.lights);
	expect(end.pieces.active.position).toEqual(direction.marks.activeThrough);
	expect(middle.camera.position[1]).toBeGreaterThan(start.camera.position[1]);
	expect(middle.camera.position[1]).toBeLessThan(end.camera.position[1]);
	expect(middle.lights.rim).toBeGreaterThan(start.lights.rim);
	expect(middle.lights.rim).toBeLessThan(end.lights.rim);
	expect(middle.pieces.active.position[0]).toBeGreaterThan(start.pieces.active.position[0]);
	expect(middle.pieces.active.position[0]).toBeLessThan(end.pieces.active.position[0]);
});

test('camera, lighting and every work piece join on adjacent cue frames', () => {
	for (const cue of shot.beats.slice(1)) {
		const { from } = shot.beatRange(cue.name);
		expect(shot.poseAt(from)).toEqual(shot.poseAt(from - 1));
	}
});

test('the final hold preserves the complete reveal for four seconds', () => {
	const lastMove = shot.poseAt(239);
	for (let frame = 240; frame < 360; frame++) expect(shot.poseAt(frame)).toEqual(lastMove);
});

test('reverse sampling and a fresh evaluator reproduce every frame without warming up', () => {
	const forward = Array.from({ length: shot.durationInFrames }, (_, frame) => shot.poseAt(frame));
	for (let frame = 359; frame >= 0; frame--) expect(shot.poseAt(frame)).toEqual(forward[frame]);
	for (const frame of [74, 75, 150, 239, 240]) expect(compileDirection(direction, 30).poseAt(frame)).toEqual(forward[frame]);
});

test('a named stage-mark edit reaches the sampled piece without renderer choreography', () => {
	const authored = { ...direction, marks: { ...direction.marks, activeThrough: [4.3, 0.43, 0] as [number, number, number] } };
	expect(compileDirection(authored, 30).poseAt(239).pieces.active.position).toEqual(authored.marks.activeThrough);
	expect(shot.poseAt(239).pieces.active.position).toEqual(direction.marks.activeThrough);
});

});

test('the framing revision keeps the stage, action, light and edit intact', () => {
	const original = compileDirection(originalDirection, shotFormat.fps);
	const revised = compileDirection(revisedDirection, shotFormat.fps);
	expect(revised.durationInFrames).toBe(original.durationInFrames);
	expect(revisedDirection.stage).toBe(originalDirection.stage);
	expect(revisedDirection.materials).toBe(originalDirection.materials);
	expect(revisedDirection.lightPositions).toBe(originalDirection.lightPositions);
	expect(revisedDirection.lightColors).toBe(originalDirection.lightColors);
	for (let frame = 0; frame < original.durationInFrames; frame++) {
		const before = original.poseAt(frame);
		const after = revised.poseAt(frame);
		expect(after.pieces).toEqual(before.pieces);
		expect(after.lights).toEqual(before.lights);
		expect(after.camera.fov).toEqual(before.camera.fov);
	}
	expect(revised.poseAt(30)).toEqual(original.poseAt(30));
	expect(revised.poseAt(300).camera).not.toEqual(original.poseAt(300).camera);
});
