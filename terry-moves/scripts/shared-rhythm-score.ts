import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { rhythmExcerpt, rhythmFps } from '../src/musicAndSound/script';
import { rhythmBaseline } from '../src/musicAndSound/baseline';
import { rhythmRevision } from '../src/musicAndSound/revision';
import { rhythmTimeline } from '../src/musicAndSound/direction';
import { RhythmScore, rhythmFingerprint, rhythmSampleRate, rhythmSynthesisVersion, rhythmWave, synthesizeRhythm } from '../src/musicAndSound/score';

const take = process.argv[2];
const takes = { excerpt: rhythmExcerpt, baseline: rhythmBaseline, revision: rhythmRevision };
if (!take || !Object.prototype.hasOwnProperty.call(takes, take)) throw new Error('Choose a saved take: pnpm -C terry-moves exec tsx scripts/shared-rhythm-score.ts excerpt|baseline|revision');
const direction = takes[take as keyof typeof takes];
const wave = rhythmWave(synthesizeRhythm(direction, rhythmFps));
const audioPath = `assets/shared-rhythm/${take}.wav`;
const outputDirectory = resolve(__dirname, '../public/assets/shared-rhythm');
const score: RhythmScore = {
	take,
	audioPath,
	directionFingerprint: rhythmFingerprint(direction, rhythmFps),
	synthesisVersion: rhythmSynthesisVersion,
	fps: rhythmFps,
	durationInFrames: rhythmTimeline(direction, rhythmFps).durationInFrames,
	sampleRate: rhythmSampleRate,
	wavSha256: createHash('sha256').update(wave).digest('hex'),
};
mkdirSync(outputDirectory, { recursive: true });
writeFileSync(resolve(outputDirectory, `${take}.wav`), wave);
writeFileSync(resolve(outputDirectory, `${take}.json`), `${JSON.stringify(score, null, 2)}\n`);
console.log(`Saved ${take}: ${score.durationInFrames / rhythmFps}s, ${score.directionFingerprint}, ${audioPath}`);
