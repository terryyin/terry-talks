import { compileDirection } from '../../src/characterAction/direction';
import { directGreeting, filmFormat, greetingDirection, selectedTake, thumbsUpDirection } from '../../src/characterAction/script';

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
	const revised = compileDirection(thumbsUpDirection, 30);
	expect(revised.poseAt(apex).clips.find((clip) => clip.weight === 1)?.clip).toBe('ThumbsUp');
	expect(revised.durationInFrames).toBe(204);
	expect(revised.beatRange('settled-exit')).toEqual({ from: 174, durationInFrames: 30 });
	expect(activeClips(apex)[0].clip).toBe('Wave');
	expect(selectedTake).toBe('original');
});

test('both retained takes preserve the approach, turn, settle and staging', () => {
	const revised = compileDirection(thumbsUpDirection, 30);
	expect(thumbsUpDirection.stage).toEqual(greetingDirection.stage);
	for (let frame = 0; frame < greeting.from; frame++) {
		const original = performance.poseAt(frame);
		const alternate = revised.poseAt(frame);
		expect(alternate.position).toEqual(original.position);
		expect(alternate.yaw).toBe(original.yaw);
		expect(alternate.clips.filter((clip) => clip.weight > 0)).toEqual(original.clips.filter((clip) => clip.weight > 0));
	}
});

test('the revision uses the same eased joins and settled exit on backward and fresh entry', () => {
	const revised = compileDirection(thumbsUpDirection, 30);
	for (const after of [revised.beatRange('greeting').from, revised.beatRange('settled-exit').from]) {
		const active = (frame: number) => revised.poseAt(frame).clips.filter((clip) => clip.weight > 0);
		expect(active(after)).toEqual(active(after - 1));
		expect(active(after + 4)).toHaveLength(2);
		expect(active(after + 4).reduce((sum, clip) => sum + clip.weight, 0)).toBeCloseTo(1);
		const expected = revised.poseAt(after + 4);
		revised.poseAt(revised.durationInFrames - 1);
		expect(revised.poseAt(after + 4)).toEqual(expected);
		expect(compileDirection(thumbsUpDirection, 30).poseAt(after + 4)).toEqual(expected);
	}
	expect(revised.poseAt(revised.durationInFrames - 1).clips.filter((clip) => clip.weight > 0).map((clip) => [clip.clip, clip.seconds])).toEqual([['Idle', 0]]);
});

test('an authored gesture duration shifts its exit and total film without a component clock', () => {
	const longer = compileDirection(directGreeting({ clip: 'ThumbsUp', seconds: 2.9 }), 30);
	const revised = compileDirection(thumbsUpDirection, 30);
	expect(longer.beatRange('greeting')).toEqual({ from: greeting.from, durationInFrames: 87 });
	expect(longer.beatRange('settled-exit').from).toBe(revised.beatRange('settled-exit').from + 30);
	expect(longer.durationInFrames).toBe(revised.durationInFrames + 30);
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
