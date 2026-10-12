// Real saved rig and WebGL proof. Run from terry-moves:
// pnpm exec tsx scripts/verify-character-action.ts [output-directory]
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { compileDirection } from '../src/characterAction/direction';
import { createCharacterRig } from '../src/characterAction/rig';
import { filmFormat, greetingDirection } from '../src/characterAction/script';

const output = resolve(process.argv[2] ?? 'out/character-action/pixel-proof');
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
	const performance = compileDirection(greetingDirection, filmFormat.fps);
	const rig = createCharacterRig(loaded.scene, loaded.animations, greetingDirection);
	const elbow = rig.object.getObjectByName('LowerArmR');
	assert(Boolean(elbow), 'Expected RobotExpressive right elbow is absent');
	rig.sample(performance.poseAt(0));
	const settledElbow = elbow!.getWorldPosition(new Vector3());
	rig.sample(performance.poseAt(50));
	const wavingElbow = elbow!.getWorldPosition(new Vector3());
	assert(wavingElbow.y > settledElbow.y + 0.4 && wavingElbow.x < settledElbow.x - 0.2, 'Expected Wave apex did not raise and extend the right arm');
	rig.sample(performance.poseAt(119));
	assert(elbow!.getWorldPosition(new Vector3()).distanceTo(settledElbow) < 1e-10, 'Settled exit differs from entry');
	rig.dispose();
	const missing = { ...greetingDirection, actions: greetingDirection.actions.map((cue) => cue.name === 'greeting' ? { ...cue, clip: 'AbsentGesture' } : cue) };
	let missingMessage = '';
	try { createCharacterRig(loaded.scene, loaded.animations, missing); } catch (error) { missingMessage = String(error); }
	assert(missingMessage.includes('greeting') && missingMessage.includes('AbsentGesture') && missingMessage.includes('Available clips:') && missingMessage.includes('Wave'), 'Missing named clip was silently substituted or poorly identified');
	console.log('PASS: exact saved actor, actual Wave arm pose, settled exit and missing named-clip diagnostic.');

	const bundle = `${output}/traversal-bundle`;
	const productionBundle = `${output}/production-bundle`;
	run(['bundle', 'tests/characterAction/pixelEntry.tsx', '--out-dir', bundle]);
	run(['bundle', 'src/index.ts', '--out-dir', productionBundle]);
	const frames = [0, 23, 24, 28, 33, 50, 79, 89, 90, 96, 101, 119];
	const render = (name: string, selection: number[], mutation = 'none') => {
		const props = `${output}/${name}-props.json`;
		writeFileSync(props, JSON.stringify({ frames: selection, mutation }));
		run(['render', bundle, 'CharacterActionTraversal', `${output}/${name}`, '--sequence', '--image-format=png', '--concurrency=1', '--gl=angle', `--props=${props}`]);
		return readdirSync(`${output}/${name}`).filter((file) => file.endsWith('.png')).sort().map((file) => `${output}/${name}/${file}`);
	};
	const forward = render('forward', frames);
	const reverse = render('reverse', [...frames].reverse());
	assert(forward.length === frames.length && reverse.length === frames.length, 'Missing traversal frames');
	for (let index = 0; index < frames.length; index++) assert(hash(forward[index]) === hash(reverse[frames.length - 1 - index]), `Backward frame ${frames[index]} differs`);
	for (const [before, after] of [[23, 24], [89, 90]]) assert(hash(forward[frames.indexOf(before)]) === hash(forward[frames.indexOf(after)]), `Gesture join ${before}/${after} jumps`);
	console.log(`PASS: ${frames.length} real forward/reverse pairs match, including both gesture joins.`);
	const directFrames = [0, 24, 28, 50, 89, 90, 96, 119];
	for (const frame of directFrames) {
		const direct = `${output}/direct-${frame}.png`;
		run(['still', productionBundle, 'RobotGreeting', direct, `--frame=${frame}`, '--gl=angle']);
		assert(hash(direct) === hash(forward[frames.indexOf(frame)]), `Fresh production frame ${frame} differs`);
	}
	console.log(`PASS: ${directFrames.length} fresh production mounts match traversal, including first frame and Wave apex.`);
	const blank = render('blank', [0], 'blank')[0];
	for (const [index, picture] of forward.entries()) assert(hash(picture) !== hash(blank), `Frame ${frames[index]} has no visible actor`);
	const frozen = render('frozen', [50], 'frozen')[0];
	assert(hash(frozen) === hash(forward[0]), 'Frozen counterexample did not hold the actual settled pose');
	assert(hash(frozen) !== hash(forward[frames.indexOf(50)]), 'A frozen skeleton passed the expected Wave apex');
	assert(new Set(forward.map(hash)).size >= 5, 'The visible performance did not change pose');
	console.log('PASS: all sampled frames contain the actor; frozen and blank counterexamples fail the expected performance.');
	writeFileSync(`${output}/result.json`, JSON.stringify({ assetHash, renderer: 'angle', ...filmFormat, frames, directFrames, settledElbow: settledElbow.toArray(), wavingElbow: wavingElbow.toArray(), missingMessage, forwardHashes: forward.map(hash), blankHash: hash(blank), frozenHash: hash(frozen) }, null, 2) + '\n');
};
main().catch((error) => { console.error(error); process.exitCode = 1; });
