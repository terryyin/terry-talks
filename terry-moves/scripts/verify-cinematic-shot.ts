// Actual WebGL pixel proof. Run from terry-moves with:
// pnpm exec tsx scripts/verify-cinematic-shot.ts [output-directory] [original|revised]
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { directions, selectedTake, shotFormat } from '../src/cinematicShot/script';

const output = resolve(process.argv[2] ?? 'out/cinematic-bottleneck/pixel-proof');
const take = process.argv[3] ?? selectedTake;
if (!(take in directions)) throw new Error(`Unknown take: ${take}`);
mkdirSync(output, { recursive: true });
const run = (args: string[]) => {
	const result = spawnSync('remotion', args, { stdio: 'inherit' });
	if (result.status !== 0) throw new Error(`remotion ${args.join(' ')} exited ${result.status}`);
};
const bundle = `${output}/bundle`;
run(['bundle', 'tests/cinematicShot/pixelEntry.tsx', '--out-dir', bundle]);
const frames = [0, 30, 74, 75, 76, 150, 238, 239, 240, 241, 359];
const cameraFrames = [75, 95, 120, 150, 190, 239];
const render = (name: string, selection: number[], cameraOnly = false) => {
	const props = `${output}/${name}-props.json`;
	writeFileSync(props, JSON.stringify({ frames: selection, cameraOnly, take }));
	run(['render', bundle, 'CinematicShotTraversal', `${output}/${name}`, '--sequence', '--image-format=png', '--concurrency=1', '--gl=angle', `--props=${props}`]);
	return readdirSync(`${output}/${name}`).filter((file) => file.endsWith('.png')).sort().map((file) => `${output}/${name}/${file}`);
};
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const assert = (condition: boolean, message: string) => { if (!condition) throw new Error(message); };
const forward = render('forward', frames);
const reverse = render('reverse', [...frames].reverse());
assert(forward.length === frames.length && reverse.length === frames.length, 'Missing traversal frames');
for (let index = 0; index < frames.length; index++) assert(hash(forward[index]) === hash(reverse[frames.length - 1 - index]), `Backward frame ${frames[index]} differs`);
for (const [before, after] of [[74, 75], [239, 240]]) assert(hash(forward[frames.indexOf(before)]) === hash(forward[frames.indexOf(after)]), `Cue join ${before}/${after} jumps`);
console.log(`PASS: ${frames.length} forward/reverse frame pairs match, including both cue joins.`);
const directFrames = [74, 75, 150, 239, 240];
const directProps = `${output}/direct-props.json`;
writeFileSync(directProps, JSON.stringify({ take }));
for (const frame of directFrames) {
	const direct = `${output}/direct-${frame}.png`;
	run(['still', bundle, 'CinematicBottleneck', direct, `--frame=${frame}`, '--gl=angle', `--props=${directProps}`]);
	assert(hash(direct) === hash(forward[frames.indexOf(frame)]), `Fresh frame ${frame} differs`);
}
console.log(`PASS: ${directFrames.length} fresh mounts match traversal, including moving frame 150.`);
const camera = render('camera-only', cameraFrames, true);
const distinctCameraFrames = new Set(camera.map(hash)).size;
assert(distinctCameraFrames === cameraFrames.length, `Camera motion failed: only ${distinctCameraFrames}/${cameraFrames.length} distinct pictures with objects/lights fixed at frame 150`);
console.log(`PASS: ${distinctCameraFrames} camera-only pictures differ with object and lighting poses held constant.`);
const report = { take, renderer: 'angle', width: shotFormat.width, height: shotFormat.height, frames, directFrames, cameraFrames, distinctCameraFrames, forwardHashes: forward.map(hash) };
writeFileSync(`${output}/result.json`, JSON.stringify(report, null, 2) + '\n');
