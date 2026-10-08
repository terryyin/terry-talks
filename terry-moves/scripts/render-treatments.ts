// pnpm render:treatments [version ids…]
// Renders each named treatment version (all when none are named) with the
// Remotion CLI: its clip and key-pose stills under out/treatments/<id>/, plus
// a manifest linking the version to its beats, outputs and source revision.
import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { exportRoot, planTreatmentExport, VersionExport } from '../src/visualTreatments/exportPlan';

const run = (args: string[]) => {
	const result = spawnSync('remotion', args, { stdio: 'inherit' });
	if (result.status !== 0) throw new Error(`remotion ${args.join(' ')} failed with status ${result.status}`);
};
const git = (...args: string[]) => execFileSync('git', args, { encoding: 'utf8' }).trim();

type SourceFile = { path: string; role: 'script' | 'renderer'; blob: string; changedFromRevision: boolean };

// The exact content of each authored input, and whether it differs from the
// recorded Git revision (uncommitted or untracked).
const sourceOf = (plan: VersionExport): SourceFile[] => (['script', 'renderer'] as const)
	.flatMap((role) => plan.sources[role].map((path) => ({ path, role, blob: git('hash-object', path), changedFromRevision: git('status', '--porcelain', '--', path) !== '' })));

const plans = planTreatmentExport(process.argv.slice(2).filter((arg) => arg !== '--'));
const bundle = `${exportRoot}/.bundle`;
rmSync(bundle, { recursive: true, force: true });
run(['bundle', 'src/index.ts', '--out-dir', bundle]);
const revision = git('rev-parse', 'HEAD');
// Listed inputs import further files (film JSON, helpers, fonts), so any
// uncommitted tracked change in the repository also marks the export as
// differing from the recorded revision.
const trackedChanges = git('status', '--porcelain', '--untracked-files=no', '--', ':/') !== '';

for (const plan of plans) {
	const files = sourceOf(plan);
	const manifestPath = `${plan.dir}/manifest.json`;
	if (existsSync(manifestPath)) {
		const before = new Map<string, string>(JSON.parse(readFileSync(manifestPath, 'utf8')).source.files.map((file: SourceFile) => [file.path, file.blob]));
		const changed = files.filter((file) => before.get(file.path) !== file.blob).map((file) => file.path);
		if (changed.length > 0) console.log(`Note: ${plan.id} sources differ from its previous export: ${changed.join(', ')}`);
	}
	rmSync(plan.dir, { recursive: true, force: true });
	mkdirSync(plan.dir, { recursive: true });
	run(['render', bundle, plan.id, plan.clip, '--codec=h264', '--pixel-format=yuv420p', '--color-space=bt709']);
	for (const pose of plan.keyPoses) run(['still', bundle, plan.id, pose.file, `--frame=${pose.frame}`]);
	const manifest = {
		version: plan.id,
		treatment: plan.treatment,
		root: 'terry-moves',
		composition: { id: plan.id, fps: plan.fps, durationInFrames: plan.durationInFrames, width: plan.width, height: plan.height },
		source: { revision, changedFromRevision: trackedChanges || files.some((file) => file.changedFromRevision), files },
		beats: plan.beats,
		clip: plan.clip,
		keyPoses: plan.keyPoses,
		command: `pnpm --dir terry-moves render:treatments ${plan.id}`,
	};
	writeFileSync(manifestPath, `${JSON.stringify(manifest, null, '\t')}\n`);
	console.log(`Exported ${plan.id} → ${plan.dir}`);
}
rmSync(bundle, { recursive: true, force: true });
