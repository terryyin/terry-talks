import { compileDirection } from '../../src/cinematicShot/direction';
import { originalDirection } from '../../src/cinematicShot/script';

const shot = compileDirection(originalDirection, 30);

test('the cue sheet owns the 12-second edit and each cue range', () => {
	expect(shot.durationInFrames).toBe(360);
	expect(shot.beats.map((cue) => shot.beatRange(cue.name))).toEqual([
		{ from: 0, durationInFrames: 75 }, { from: 75, durationInFrames: 165 }, { from: 240, durationInFrames: 120 },
	]);
	expect(compileDirection(originalDirection, 24).durationInFrames).toBe(288);
});

test('the close view starts with the authored camera, lights and staged work', () => {
	const pose = shot.poseAt(0);
	expect(pose.camera).toEqual(originalDirection.start.camera);
	expect(pose.lights).toEqual(originalDirection.start.lights);
	originalDirection.pieces.forEach((piece) => {
		expect(pose.pieces[piece.name]).toEqual({ position: originalDirection.marks[piece.start], yaw: piece.yaw });
	});
});

test('local activity advances the center piece while both side queues stay at their marks', () => {
	const first = shot.poseAt(0);
	const middle = shot.poseAt(37);
	const end = shot.poseAt(74);
	expect(middle.pieces.active.position[0]).toBeGreaterThan(first.pieces.active.position[0]);
	expect(middle.pieces.active.position[0]).toBeLessThan(end.pieces.active.position[0]);
	expect(end.pieces.active.position).toEqual(originalDirection.marks.activeWaiting);
	for (const piece of originalDirection.pieces.filter((piece) => piece.name !== 'active')) {
		expect(end.pieces[piece.name]).toEqual(first.pieces[piece.name]);
	}
});

test('the reveal samples authored camera and light endpoints while work passes the opening', () => {
	const reveal = originalDirection.cues[1];
	const start = shot.poseAt(75);
	const middle = shot.poseAt(157);
	const end = shot.poseAt(239);
	expect(end.camera).toEqual(reveal.camera);
	expect(end.lights).toEqual(reveal.lights);
	expect(end.pieces.active.position).toEqual(originalDirection.marks.activeThrough);
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
	for (const frame of [74, 75, 150, 239, 240]) expect(compileDirection(originalDirection, 30).poseAt(frame)).toEqual(forward[frame]);
});

test('a named stage-mark edit reaches the sampled piece without renderer choreography', () => {
	const authored = { ...originalDirection, marks: { ...originalDirection.marks, activeThrough: [4.3, 0.43, 0] as [number, number, number] } };
	expect(compileDirection(authored, 30).poseAt(239).pieces.active.position).toEqual(authored.marks.activeThrough);
	expect(shot.poseAt(239).pieces.active.position).toEqual(originalDirection.marks.activeThrough);
});
