import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import measurement from '@/featureTeams/shot-measurement.json';
import { speakerShot } from '@/featureTeams/shot';

test('measurement check follows a retargeted declaration even while the previous file matches its record', () => {
	const fixture = mkdtempSync(path.join(tmpdir(), 'feature-teams-measurement-'));
	const project = path.resolve(__dirname, '../..');
	const script = path.join(fixture, 'scripts/measure-shot.mjs');
	const declaration = path.join(fixture, 'src/featureTeams/shot.ts');
	const missingSource = 'assets/feature-teams-stand-ins/missing-retarget.mp4';
	try {
		for (const directory of ['scripts', 'src/featureTeams', 'public/assets']) {
			mkdirSync(path.join(fixture, directory), { recursive: true });
		}
		copyFileSync(path.join(project, 'scripts/measure-shot.mjs'), script);
		for (const filename of ['shot.ts', 'layout.ts']) {
			copyFileSync(path.join(project, 'src/featureTeams', filename), path.join(fixture, 'src/featureTeams', filename));
		}
		// --check needs bytes and their digest, without probing or rendering video.
		const previousTake = Buffer.from('previous measured take');
		writeFileSync(path.join(fixture, 'public', speakerShot.source), previousTake);
		writeFileSync(path.join(fixture, 'src/featureTeams/shot-measurement.json'), JSON.stringify({
			...measurement,
			sha256: createHash('sha256').update(previousTake).digest('hex'),
		}));
		const check = () => spawnSync(process.execPath, [require.resolve('tsx/cli'), script, '--check'], {
			cwd: fixture,
			encoding: 'utf8',
		});
		const beforeRetarget = check();
		expect(beforeRetarget.status).toBe(0);
		expect(beforeRetarget.stdout).toContain(`${speakerShot.source} matches measurement record`);

		writeFileSync(declaration, readFileSync(declaration, 'utf8').replace(speakerShot.source, missingSource));
		const afterRetarget = check();
		expect(afterRetarget.status).toBe(1);
		expect(afterRetarget.stderr).toContain(`speakerShot: missing file ${missingSource}`);
		expect(afterRetarget.stdout).not.toContain('matches measurement record');
	} finally {
		rmSync(fixture, { recursive: true, force: true });
	}
});
