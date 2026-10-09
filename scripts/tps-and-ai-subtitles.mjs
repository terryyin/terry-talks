import { copyFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { exportFilmSubtitles } from './film-subtitles.mjs';

const selection = process.argv[2] ?? 'en';
if (!['en', 'ja', 'zh-Hant', 'th', 'all'].includes(selection)) throw new Error(`Unknown TPS film language: ${selection}`);
const deliveryDirectory = new URL('../terry-moves/out/', import.meta.url);
mkdirSync(deliveryDirectory, { recursive: true });
for (const language of selection === 'all' ? ['en', 'ja', 'zh-Hant', 'th'] : [selection]) {
	const filenameLanguage = language.toLowerCase();
	exportFilmSubtitles('TPS and AI', `film-${filenameLanguage}.srt`, language);
	const delivery = new URL(`tps-and-ai-jidoka-${filenameLanguage}.srt`, deliveryDirectory);
	copyFileSync(new URL(`../TPS%20and%20AI/film-${filenameLanguage}.srt`, import.meta.url), delivery);
	process.stdout.write(`Delivery subtitles: ${fileURLToPath(delivery)}\n`);
}
