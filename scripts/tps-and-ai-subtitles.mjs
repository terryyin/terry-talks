import { copyFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { exportFilmSubtitles } from './film-subtitles.mjs';

exportFilmSubtitles('TPS and AI', 'film-en.srt');
const deliveryDirectory = new URL('../terry-moves/out/', import.meta.url);
mkdirSync(deliveryDirectory, { recursive: true });
const delivery = new URL('tps-and-ai-en.srt', deliveryDirectory);
copyFileSync(new URL('../TPS%20and%20AI/film-en.srt', import.meta.url), delivery);
process.stdout.write(`Delivery subtitles: ${fileURLToPath(delivery)}\n`);
