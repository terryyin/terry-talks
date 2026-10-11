// Dump every Feature Teams film pose plus the inset's placement numbers.
// Used as an exact preservation digest: baseline (unchanged code) and after a
// shot-declaration change must be byte-identical.
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import {
	CLIP_FRAMES,
	COVER_FRAME,
	durationInFrames,
	filmPoseAt,
	OPEN_FRAMES,
	speakerSlot,
} from '../src/featureTeams/film';

const placement = {
	...speakerSlot.placement,
	sequenceFrom: OPEN_FRAMES,
	sequenceFrames: CLIP_FRAMES,
};

const frames = Array.from({ length: durationInFrames }, (_, f) => filmPoseAt(f));
const digest = {
	OPEN_FRAMES,
	CLIP_FRAMES,
	durationInFrames,
	COVER_FRAME,
	placement,
	frames,
};

const outPath = process.argv[2] ?? join(process.cwd(), 'out/feature-teams-timeline.json');
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, `${JSON.stringify(digest)}\n`);
process.stdout.write(`${outPath}\n`);
