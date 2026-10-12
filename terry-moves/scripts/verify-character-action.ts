// Real saved rig and WebGL proof. Run from terry-moves:
// pnpm exec tsx scripts/verify-character-action.ts [output-directory] [original|thumbs-up]
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { Mesh, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { compileCharacterPerformance, createCharacterRig } from '../src/characterAction/rig';
import { filmFormat, greetingDirections, GreetingTake, selectedTake } from '../src/characterAction/script';

const output = resolve(process.argv[2] ?? 'out/character-action/pixel-proof');
const take = (process.argv[3] ?? selectedTake) as GreetingTake;
if (!(take in greetingDirections)) throw new Error(`Unknown greeting take: ${take}`);
const greetingDirection = greetingDirections[take];
const composition = take === 'original' ? 'RobotGreeting' : 'RobotGreetingThumbsUp';
const assert = (condition: boolean, message: string) => { if (!condition) throw new Error(message); };
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const run = (args: string[]) => {
	const result = spawnSync('remotion', args, { stdio: 'inherit' });
	if (result.status !== 0) throw new Error(`remotion ${args.join(' ')} exited ${result.status}`);
};

const main = async () => {
	mkdirSync(output, { recursive: true });
	const asset = `public/${greetingDirection.asset}`;
	const assetHash = hash(asset);
	assert(assetHash === '047f5e5fb3bb6d378bd1df16ca6137f2a596c99b3a1b5690b4020c05aaf6f319', 'Saved actor identity changed');
	const bytes = readFileSync(asset);
	const loaded = await new GLTFLoader().parseAsync(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength), '');
	const rig = createCharacterRig(loaded.scene, loaded.animations, greetingDirection);
	const performance = compileCharacterPerformance(rig, greetingDirection, filmFormat.fps);
	const greeting = performance.beatRange('greeting');
	const settle = performance.beatRange('settle');
	const regard = performance.beatRange('regard');
	const exit = performance.beatRange('settled-exit');
	const apex = greeting.from + Math.round(26 * filmFormat.fps / 30);
	const last = performance.durationInFrames - 1;
	const turn = greetingDirection.actions[0].turn!;
	const turnStart = Math.round(turn.startSeconds * filmFormat.fps);
	const turnEnd = Math.round((turn.startSeconds + turn.seconds) * filmFormat.fps);
	const elbow = rig.object.getObjectByName('LowerArmR');
	assert(Boolean(elbow), 'Expected RobotExpressive right elbow is absent');
	const localElbow = () => rig.object.worldToLocal(elbow!.getWorldPosition(new Vector3()));
	rig.sample(performance.poseAt(regard.from));
	const settledElbow = localElbow();
	rig.sample(performance.poseAt(apex));
	const gestureElbow = localElbow();
	const expectedPoses: Record<string, () => boolean> = {
		Wave: () => gestureElbow.y > settledElbow.y + 0.4 && gestureElbow.x < settledElbow.x - 0.2,
		ThumbsUp: () => gestureElbow.y > settledElbow.y + 0.35 && gestureElbow.z > settledElbow.z + 0.35 && Math.abs(gestureElbow.x - settledElbow.x) < 0.05,
	};
	const namedGesture = greetingDirection.actions.find((cue) => cue.name === 'greeting')!;
	assert(expectedPoses[namedGesture.clip](), `Expected ${namedGesture.clip} arm pose was absent or replaced with a different gesture`);
	const savedClip = loaded.animations.find((clip) => clip.name === namedGesture.clip)!;
	assert((greeting.durationInFrames - 1) / filmFormat.fps * namedGesture.rate + namedGesture.startSeconds >= savedClip.duration, `The authored greeting trims the complete saved ${namedGesture.clip} performance`);
	rig.sample(performance.poseAt(last));
	assert(localElbow().distanceTo(settledElbow) < 1e-10, 'Settled exit differs from regard');
	let maxSupportDrift = 0;
	let maxRootStep = 0;
	let maxSoleError = 0;
	let maxPlantedHeadingChange = 0;
	let previousFoot = '';
	let plantedHeading = 0;
	const footfalls: number[] = [];
	const footMatrices: number[][] = [];
	const footState = () => ['FootL', 'FootR'].flatMap((name) => rig.object.getObjectByName(name)!.matrixWorld.toArray());
	for (let frame = 0; frame <= last; frame++) {
		const pose = performance.poseAt(frame);
		rig.sample(pose);
		const contact = performance.contactAt(frame);
		footMatrices.push(footState());
		const foot = rig.object.getObjectByName(contact.foot)!;
		const point = foot.getWorldPosition(new Vector3());
		maxSupportDrift = Math.max(maxSupportDrift, Math.hypot(point.x - contact.anchor[0], point.z - contact.anchor[1]));
		const toe = rig.object.getObjectByName(`${contact.foot}_end`)!.getWorldPosition(new Vector3()).sub(point);
		const heading = Math.atan2(toe.x, toe.z);
		if (contact.foot !== previousFoot) { footfalls.push(frame); previousFoot = contact.foot; plantedHeading = heading; }
		maxPlantedHeadingChange = Math.max(maxPlantedHeadingChange, Math.abs(Math.atan2(Math.sin(heading - plantedHeading), Math.cos(heading - plantedHeading))));
		let soleMinimum = Infinity;
		for (const name of ['FootL_1', 'FootR_1']) {
			const mesh = rig.object.getObjectByName(name) as Mesh;
			const vertices = mesh.geometry.getAttribute('position');
			for (let index = 0; index < vertices.count; index++) soleMinimum = Math.min(soleMinimum, new Vector3().fromBufferAttribute(vertices, index).applyMatrix4(mesh.matrixWorld).y);
		}
		maxSoleError = Math.max(maxSoleError, Math.abs(soleMinimum - greetingDirection.stage.position[1]));
		if (frame > 0) maxRootStep = Math.max(maxRootStep, new Vector3(...pose.position).distanceTo(new Vector3(...performance.poseAt(frame - 1).position)));
	}
	console.log('CONTACT supplement (normal-speed visual review still required):', { footfalls, maxSupportDrift, maxSoleError, maxRootStep, maxPlantedHeadingChange });
	assert(maxSupportDrift < 1e-8, 'Planted foot slides horizontally');
	assert(maxSoleError < 1e-8, 'Actual sole floats above or penetrates its authored clearance');
	assert(maxPlantedHeadingChange < 0.03, 'Planted sole swivels during the stepping turn');
	assert(maxRootStep < 0.35, 'Root placement contains a conspicuous single-frame jump');
	assert(new Vector3(...performance.poseAt(0).position).distanceTo(new Vector3(...performance.poseAt(regard.from).position)) > 3, 'The approach did not travel more than one body width');
	assert(performance.poseAt(turnStart).yaw - performance.poseAt(turnEnd).yaw > 1.5, 'The stepping turn did not change facing');
	const matchFeet = (actual: number[], expected: number[], message: string) => assert(actual.every((value, index) => Math.abs(value - expected[index]) < 1e-10), `${message}; maximum matrix error ${Math.max(...actual.map((value, index) => Math.abs(value - expected[index])))}`);
	for (let frame = last; frame >= 0; frame--) {
		rig.sample(performance.poseAt(frame));
		matchFeet(footState(), footMatrices[frame], `Backward foot orientation/placement differs at ${frame}`);
		rig.sample(performance.poseAt(frame));
		matchFeet(footState(), footMatrices[frame], `Repeated foot compensation accumulates at ${frame}`);
	}
	const freshRig = createCharacterRig(loaded.scene, loaded.animations, greetingDirection);
	const freshPerformance = compileCharacterPerformance(freshRig, greetingDirection, filmFormat.fps);
	for (const frame of [0, turnStart, turnEnd, settle.from, greeting.from, apex, exit.from, last]) {
		freshRig.sample(freshPerformance.poseAt(frame));
		matchFeet(['FootL', 'FootR'].flatMap((name) => freshRig.object.getObjectByName(name)!.matrixWorld.toArray()), footMatrices[frame], `Fresh rig foot orientation/placement differs at ${frame}`);
	}
	freshRig.dispose();
	console.log('PASS: real sole orientation/placement agrees on backward, repeated and freshly compiled rig entry.');
	rig.dispose();
	const missing = { ...greetingDirection, actions: greetingDirection.actions.map((cue) => cue.name === 'greeting' ? { ...cue, clip: 'AbsentGesture' } : cue) };
	let missingMessage = '';
	try { createCharacterRig(loaded.scene, loaded.animations, missing); } catch (error) { missingMessage = String(error); }
	assert(missingMessage.includes('greeting') && missingMessage.includes('AbsentGesture') && missingMessage.includes('Available clips:') && missingMessage.includes('Wave'), 'Missing named clip was silently substituted or poorly identified');
	console.log(`PASS: exact saved actor, actual ${namedGesture.clip} arm pose, full source clip, settled exit and missing named-clip diagnostic.`);

	const bundle = `${output}/traversal-bundle`;
	const productionBundle = `${output}/production-bundle`;
	run(['bundle', 'tests/characterAction/pixelEntry.tsx', '--out-dir', bundle]);
	run(['bundle', 'src/index.ts', '--out-dir', productionBundle]);
	const joins = take === 'original' ? [settle.from, greeting.from, exit.from] : [greeting.from, exit.from];
	const bounded = (frame: number) => Math.max(0, Math.min(last, frame));
	const movementFrames = take === 'original' ? [turnStart, Math.round((turnStart + turnEnd) / 2), turnEnd, ...footfalls.flatMap((frame) => [bounded(frame - 1), frame, bounded(frame + 1)])] : [];
	const frames = [...new Set([0, ...movementFrames, ...joins.flatMap((frame) => [frame - 1, frame, frame + 4]), regard.from, apex, exit.from + Math.round(0.35 * filmFormat.fps), last])].sort((a, b) => a - b);
	const render = (name: string, selection: number[], mutation = 'none') => {
		const props = `${output}/${name}-props.json`;
		writeFileSync(props, JSON.stringify({ frames: selection, mutation, take }));
		run(['render', bundle, 'CharacterActionTraversal', `${output}/${name}`, '--sequence', '--image-format=png', '--concurrency=1', '--gl=angle', `--props=${props}`]);
		return readdirSync(`${output}/${name}`).filter((file) => file.endsWith('.png')).sort().map((file) => `${output}/${name}/${file}`);
	};
	const forward = render('forward', frames);
	const reverse = render('reverse', [...frames].reverse());
	assert(forward.length === frames.length && reverse.length === frames.length, 'Missing traversal frames');
	for (let index = 0; index < frames.length; index++) assert(hash(forward[index]) === hash(reverse[frames.length - 1 - index]), `Backward frame ${frames[index]} differs`);
	for (const after of joins) assert(hash(forward[frames.indexOf(after - 1)]) === hash(forward[frames.indexOf(after)]), `Action join ${after - 1}/${after} jumps`);
	console.log(`PASS: ${frames.length} real forward/reverse pairs and affected joins match for ${take}.`);
	const directFrames = [...new Set([0, ...(take === 'original' ? [turnStart, Math.round((turnStart + turnEnd) / 2), turnEnd, settle.from] : [greeting.from + 4, exit.from + 4]), regard.from, greeting.from, apex, exit.from, last])];
	for (const frame of directFrames) {
		const direct = `${output}/direct-${frame}.png`;
		run(['still', productionBundle, composition, direct, `--frame=${frame}`, '--gl=angle']);
		assert(hash(direct) === hash(forward[frames.indexOf(frame)]), `Fresh production frame ${frame} differs`);
	}
	console.log(`PASS: ${directFrames.length} fresh production mounts match traversal, including first frame and ${namedGesture.clip} apex.`);
	if (take === 'thumbs-up') {
		const original = `${output}/original-wave-apex.png`;
		run(['still', productionBundle, 'RobotGreeting', original, `--frame=${apex}`, '--gl=angle']);
		assert(hash(original) !== hash(forward[frames.indexOf(apex)]), 'Gesture replacement produced the original Wave picture');
		console.log('PASS: the registered ThumbsUp and original Wave have visibly distinct apex pictures.');
	}
	const blank = render('blank', [0], 'blank')[0];
	for (const [index, picture] of forward.entries()) assert(hash(picture) !== hash(blank), `Frame ${frames[index]} has no visible actor`);
	const frozen = render('frozen', [apex], 'frozen')[0];
	assert(hash(frozen) === hash(forward[0]), 'Frozen counterexample did not hold the actual first pose');
	assert(hash(frozen) !== hash(forward[frames.indexOf(apex)]), `A frozen skeleton passed the expected ${namedGesture.clip} apex`);
	if (take === 'original') assert(hash(frozen) !== hash(forward[frames.indexOf(turnEnd)]), 'A frozen actor passed the expected approach/turn');
	const pictureAt = (frame: number) => hash(forward[frames.indexOf(frame)]);
	assert(pictureAt(apex) !== pictureAt(greeting.from), 'Gesture apex stayed at its settled entry pose');
	assert(pictureAt(greeting.from + 4) !== pictureAt(apex), 'Gesture entry blend was frozen at its apex');
	assert(pictureAt(exit.from + Math.round(0.35 * filmFormat.fps)) !== pictureAt(apex), 'Gesture did not return to a settled exit');
	console.log('PASS: all sampled frames contain the actor; frozen and blank counterexamples fail the expected performance.');
	writeFileSync(`${output}/result.json`, JSON.stringify({ take, namedGesture: namedGesture.clip, sourceClipSeconds: savedClip.duration, assetHash, renderer: 'angle', ...filmFormat, durationInFrames: performance.durationInFrames, frames, directFrames, footfalls, joins, maxSupportDrift, maxSoleError, maxRootStep, maxPlantedHeadingChange, settledElbow: settledElbow.toArray(), gestureElbow: gestureElbow.toArray(), missingMessage, forwardHashes: forward.map(hash), blankHash: hash(blank), frozenHash: hash(frozen) }, null, 2) + '\n');
};
main().catch((error) => { console.error(error); process.exitCode = 1; });
