import { copyFileSync, mkdirSync } from 'node:fs';
import { exportFilmSubtitles } from './film-subtitles.mjs';

exportFilmSubtitles('TPS and AI/Finale', 'film-en.srt');
const directory = new URL('../terry-moves/out/', import.meta.url);
mkdirSync(directory, { recursive: true });
copyFileSync(new URL('../TPS%20and%20AI/Finale/film-en.srt', import.meta.url), new URL('tps-and-ai-finale-en.srt', directory));
