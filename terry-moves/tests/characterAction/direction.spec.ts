import { compileDirection } from '../../src/characterAction/direction';
import { filmFormat, greetingDirection } from '../../src/characterAction/script';

const performance = compileDirection(greetingDirection, filmFormat.fps);
const activeClips = (frame: number) => performance.poseAt(frame).clips.filter((clip) => clip.weight > 0);
const greeting = performance.beatRange('greeting');
const exit = performance.beatRange('settled-exit');
const apex = greeting.from + 26;

test('the script owns ordered cue ranges and the complete film duration at either fps', () => {
	expect(performance.durationInFrames).toBe(213);
	expect(performance.beats.map((cue) => performance.beatRange(cue.name))).toEqual([
		{ from: 0, durationInFrames: 84 }, { from: 84, durationInFrames: 18 }, { from: 102, durationInFrames: 15 }, { from: 117, durationInFrames: 66 }, { from: 183, durationInFrames: 30 },
	]);
	expect(compileDirection(greetingDirection, 24).durationInFrames).toBe(170);
});

test('approach, settled regard, named Wave and settled exit select intended clips', () => {
	expect(activeClips(0).map((clip) => [clip.clip, clip.seconds, clip.weight])).toEqual([['Walking', 0, 1]]);
	expect(activeClips(performance.beatRange('regard').from).map((clip) => [clip.clip, clip.seconds, clip.weight])).toEqual([['Idle', 0, 1]]);
	expect(activeClips(apex).map((clip) => clip.clip)).toEqual(['Wave']);
	expect(activeClips(apex)[0].seconds).toBeCloseTo(26 / 30);
	expect(activeClips(performance.durationInFrames - 1).map((clip) => [clip.clip, clip.seconds, clip.weight])).toEqual([['Idle', 0, 1]]);
});

test('all blended joins preserve the outgoing sample before an eased normalized blend', () => {
	for (const after of [performance.beatRange('settle').from, greeting.from, exit.from]) {
		const before = after - 1;
		expect(activeClips(after)).toEqual(activeClips(before));
		const blended = activeClips(after + 4);
		expect(blended).toHaveLength(2);
		expect(blended.reduce((sum, clip) => sum + clip.weight, 0)).toBeCloseTo(1);
		expect(blended.every((clip) => clip.weight > 0 && clip.weight < 1)).toBe(true);
	}
});

test('every cue is explicitly sampled, so inactive actions cannot retain a previous weight', () => {
	for (let frame = 0; frame < performance.durationInFrames; frame++) {
		const pose = performance.poseAt(frame);
		expect(pose.clips.map((clip) => clip.cue)).toEqual(greetingDirection.actions.map((cue) => cue.name));
		expect(pose.clips.reduce((sum, clip) => sum + clip.weight, 0)).toBeCloseTo(1);
		expect(pose.position).toEqual(greetingDirection.stage.position);
		expect(pose.yaw).toBeGreaterThanOrEqual(0);
		expect(pose.yaw).toBeLessThanOrEqual(greetingDirection.stage.yaw);
	}
});

test('forward, reverse and fresh evaluation preserve all clip and placement fields', () => {
	const forward = Array.from({ length: performance.durationInFrames }, (_, frame) => performance.poseAt(frame));
	for (let frame = forward.length - 1; frame >= 0; frame--) expect(performance.poseAt(frame)).toEqual(forward[frame]);
	for (const frame of [0, 45, greeting.from, apex, exit.from, performance.durationInFrames - 1]) expect(compileDirection(greetingDirection, 30).poseAt(frame)).toEqual(forward[frame]);
});

test('editing the named gesture in direction reaches the sampled performance', () => {
	const changed = { ...greetingDirection, actions: greetingDirection.actions.map((cue) => cue.name === 'greeting' ? { ...cue, clip: 'ThumbsUp' } : cue) };
	expect(compileDirection(changed, 30).poseAt(apex).clips.find((clip) => clip.weight === 1)?.clip).toBe('ThumbsUp');
	expect(activeClips(apex)[0].clip).toBe('Wave');
});

test('the stepping turn derives from its cue and remains complete through later actions', () => {
	const turn = greetingDirection.actions[0].turn!;
	const start = Math.round(turn.startSeconds * filmFormat.fps);
	const end = Math.round((turn.startSeconds + turn.seconds) * filmFormat.fps);
	expect(performance.poseAt(start).yaw).toBe(greetingDirection.stage.yaw);
	expect(performance.poseAt(start + 15).yaw).toBeGreaterThan(turn.toYaw);
	expect(performance.poseAt(start + 15).yaw).toBeLessThan(greetingDirection.stage.yaw);
	expect(performance.poseAt(end).yaw).toBe(turn.toYaw);
	expect(performance.poseAt(apex).yaw).toBe(turn.toYaw);
	const later = { ...greetingDirection, actions: greetingDirection.actions.map((cue, index) => index === 0 ? { ...cue, seconds: cue.seconds + 1 } : cue) };
	const recompiled = compileDirection(later, filmFormat.fps);
	expect(recompiled.beatRange('greeting').from).toBe(greeting.from + filmFormat.fps);
	expect(recompiled.poseAt(apex + filmFormat.fps).clips).toEqual(performance.poseAt(apex).clips);
});
