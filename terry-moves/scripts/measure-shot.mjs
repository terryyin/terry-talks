#!/usr/bin/env node
// Measure the Feature Teams speaker shot with ffprobe and SHA-256, or check
// the committed record against the file on disk.
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const shotName = 'speakerShot';
const source = 'assets/Component teams.mp4';
const filePath = join(root, 'public', source);
const recordPath = join(root, 'src/featureTeams/shot-measurement.json');

const fail = (message) => {
	console.error(message);
	process.exit(1);
};

const sha256Of = (path) => createHash('sha256').update(readFileSync(path)).digest('hex');

const probe = (path) => {
	const result = spawnSync(
		'ffprobe',
		['-v', 'error', '-show_entries', 'format=duration', '-show_entries', 'stream=codec_type,width,height,r_frame_rate', '-of', 'json', path],
		{ encoding: 'utf8' },
	);
	if (result.status !== 0) fail(`${shotName}: ffprobe failed for ${source}: ${result.stderr || result.error}`);
	const data = JSON.parse(result.stdout);
	const video = data.streams?.find((s) => s.codec_type === 'video');
	if (!video) fail(`${shotName}: no video stream in ${source}`);
	const [num, den] = String(video.r_frame_rate).split('/').map(Number);
	const fps = den ? num / den : num;
	return {
		durationSeconds: Number(data.format.duration),
		width: Number(video.width),
		height: Number(video.height),
		fps,
		hasAudio: Boolean(data.streams?.some((s) => s.codec_type === 'audio')),
	};
};

const measure = () => {
	if (!existsSync(filePath)) fail(`${shotName}: missing file ${source}`);
	const facts = probe(filePath);
	const record = {
		source,
		sha256: sha256Of(filePath),
		durationSeconds: facts.durationSeconds,
		width: facts.width,
		height: facts.height,
		fps: facts.fps,
		hasAudio: facts.hasAudio,
	};
	writeFileSync(recordPath, `${JSON.stringify(record, null, '\t')}\n`);
	console.log(`Wrote ${recordPath}`);
	console.log(JSON.stringify(record, null, '\t'));
};

const check = () => {
	if (!existsSync(filePath)) fail(`${shotName}: missing file ${source}`);
	if (!existsSync(recordPath)) fail(`${shotName}: missing measurement record for ${source}`);
	const record = JSON.parse(readFileSync(recordPath, 'utf8'));
	const sha256 = sha256Of(filePath);
	if (record.source !== source || record.sha256 !== sha256) {
		fail(`${shotName}: file ${source} does not match the measurement record (sha256 changed or missing)`);
	}
	console.log(`${shotName}: ${source} matches measurement record`);
};

if (process.argv.includes('--check')) check();
else measure();
