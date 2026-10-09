import { copyFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { exportFilmSubtitles } from './film-subtitles.mjs';

const selection = process.argv[2] ?? 'en';
if (!['en', 'ja', 'all'].includes(selection)) throw new Error(`Unknown TPS film language: ${selection}`);
const deliveryDirectory = new URL('../terry-moves/out/', import.meta.url);
mkdirSync(deliveryDirectory, { recursive: true });
for (const language of selection === 'all' ? ['en', 'ja'] : [selection]) {
	exportFilmSubtitles('TPS and AI', `film-${language}.srt`, language);
	const delivery = new URL(`tps-and-ai-jidoka-${language}.srt`, deliveryDirectory);
	copyFileSync(new URL(`../TPS%20and%20AI/film-${language}.srt`, import.meta.url), delivery);
	process.stdout.write(`Delivery subtitles: ${fileURLToPath(delivery)}\n`);
}
