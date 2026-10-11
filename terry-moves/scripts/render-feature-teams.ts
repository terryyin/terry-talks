// Render the Feature Teams film and its cover still at the derived COVER_FRAME.
import { spawnSync } from 'node:child_process';
import { COVER_FRAME } from '../src/featureTeams/film';

const run = (args: string[]) => {
	const result = spawnSync('remotion', args, { stdio: 'inherit' });
	if (result.status !== 0) throw new Error(`remotion ${args.join(' ')} failed with status ${result.status}`);
};

run([
	'render',
	'src/index.ts',
	'FeatureTeamsFilm',
	'out/feature-teams-engineering-practices.mp4',
	'--codec=h264',
	'--pixel-format=yuv420p',
	'--color-space=bt709',
]);
run([
	'still',
	'src/index.ts',
	'FeatureTeamsFilm',
	'out/feature-teams-engineering-practices-cover.png',
	`--frame=${COVER_FRAME}`,
]);
