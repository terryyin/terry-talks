import { compileDirection } from '../../src/characterAction/direction';
import { filmFormat, greetingDirection } from '../../src/characterAction/script';

const performance = compileDirection(greetingDirection, filmFormat.fps);
const activeClips = (frame: number) => performance.poseAt(frame).clips.filter((clip) => clip.weight > 0);

test('the script owns ordered cue ranges and the rehearsal duration at either fps', () => {
	expect(performance.durationInFrames).toBe(120);
	expect(performance.beats.map((cue) => performance.beatRange(cue.name))).toEqual([
		{ from: 0, durationInFrames: 24 }, { from: 24, durationInFrames: 66 }, { from: 90, durationInFrames: 30 },
	]);
	expect(compileDirection(greetingDirection, 24).durationInFrames).toBe(96);
});

test('settled entry, named Wave and settled exit select only intended clips', () => {
	expect(activeClips(0).map((clip) => [clip.clip, clip.seconds, clip.weight])).toEqual([['Idle', 0, 1]]);
	expect(activeClips(50).map((clip) => clip.clip)).toEqual(['Wave']);
	expect(activeClips(50)[0].seconds).toBeCloseTo(26 / 30);
	expect(activeClips(119).map((clip) => [clip.clip, clip.seconds, clip.weight])).toEqual([['Idle', 0, 1]]);
});

test('both joins preserve the outgoing sample before an eased normalized blend', () => {
	for (const [before, after] of [[23, 24], [89, 90]]) {
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
		expect(pose.yaw).toBe(greetingDirection.stage.yaw);
	}
});

test('forward, reverse and fresh evaluation preserve all clip and placement fields', () => {
	const forward = Array.from({ length: performance.durationInFrames }, (_, frame) => performance.poseAt(frame));
	for (let frame = forward.length - 1; frame >= 0; frame--) expect(performance.poseAt(frame)).toEqual(forward[frame]);
	for (const frame of [0, 24, 50, 90, 119]) expect(compileDirection(greetingDirection, 30).poseAt(frame)).toEqual(forward[frame]);
});

test('editing the named gesture in direction reaches the sampled performance', () => {
	const changed = { ...greetingDirection, actions: greetingDirection.actions.map((cue) => cue.name === 'greeting' ? { ...cue, clip: 'ThumbsUp' } : cue) };
	expect(compileDirection(changed, 30).poseAt(50).clips.find((clip) => clip.weight === 1)?.clip).toBe('ThumbsUp');
	expect(activeClips(50)[0].clip).toBe('Wave');
});
