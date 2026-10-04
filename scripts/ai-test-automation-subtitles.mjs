import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repository = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const script = JSON.parse(fs.readFileSync(path.join(repository, 'AI Test Automation/film-script.json'), 'utf8'));
const timestamp = (seconds) => {
	const milliseconds = Math.round(seconds * 1000);
	const hours = Math.floor(milliseconds / 3600000);
	const minutes = Math.floor(milliseconds / 60000) % 60;
	const remainder = Math.floor(milliseconds / 1000) % 60;
	return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')},${String(milliseconds % 1000).padStart(3, '0')}`;
};
const captions = script.scenes.flatMap((scene) => scene.captionRanges);
const subtitles = captions.map((caption, index) => `${index + 1}\n${timestamp(caption.start)} --> ${timestamp(caption.end)}\n${caption.spoken}\n`).join('\n');
const output = path.join(repository, 'AI Test Automation/ai-test-automation.srt');
fs.writeFileSync(output, subtitles);
process.stdout.write(`Exported ${captions.length} timed captions to ${output}\n`);
