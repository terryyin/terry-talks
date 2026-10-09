import { copyFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { exportFilmSubtitles } from './film-subtitles.mjs';

exportFilmSubtitles('TPS and AI/JIT', 'film-en.srt');
const directory = new URL('../terry-moves/out/', import.meta.url);
mkdirSync(directory, { recursive: true });
const delivery = new URL('tps-and-ai-jit-en.srt', directory);
copyFileSync(new URL('../TPS%20and%20AI/JIT/film-en.srt', import.meta.url), delivery);
process.stdout.write(`Delivery subtitles: ${fileURLToPath(delivery)}\n`);
