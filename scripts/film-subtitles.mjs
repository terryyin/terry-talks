import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repository = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const timestamp = (seconds) => {
	const ms = Math.round(seconds * 1000);
	const pad = (value, digits = 2) => String(value).padStart(digits, '0');
	return `${pad(Math.floor(ms / 3600000))}:${pad(Math.floor(ms / 60000) % 60)}:${pad(Math.floor(ms / 1000) % 60)},${pad(ms % 1000, 3)}`;
};

export const exportFilmSubtitles = (project, filename) => {
	const directory = path.join(repository, project);
	const script = JSON.parse(fs.readFileSync(path.join(directory, 'film-script.json'), 'utf8'));
	const captions = script.scenes.flatMap((scene) => scene.captionRanges);
	const output = path.join(directory, filename);
	fs.writeFileSync(output, captions.map((caption, index) => `${index + 1}\n${timestamp(caption.start)} --> ${timestamp(caption.end)}\n${caption.spoken}\n`).join('\n'));
	process.stdout.write(`Exported ${captions.length} timed captions to ${output}\n`);
};
