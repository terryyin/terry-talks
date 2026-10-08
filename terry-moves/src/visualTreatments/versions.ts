// Every named treatment version of the Problem Decomposition brief, with the
// authored files its picture comes from. A revision is a new entry with a new
// id; earlier entries stay registered so their samples remain comparable.
// Paths are relative to terry-moves/.
import { Timeline } from '../beatTimeline';
import { TreatmentVersion } from './brief';
import { CharacterPose, characterTimeline, characterV1, CharacterVersion } from './character/script';
import { characterV2 } from './character/v2';
import { TypographyPose, typographyTimeline, typographyV1 } from './typography/script';

export type TreatmentSources = { script: string[]; renderer: string[] };

type Entry<Treatment extends string, Pose> = {
	treatment: Treatment;
	id: string;
	fps: number;
	timeline: Timeline<Pose>;
	sources: TreatmentSources;
};

export type TreatmentEntry = Entry<'typography', TypographyPose> | Entry<'character', CharacterPose>;

export const treatmentFrame = { width: 1080, height: 1080 } as const;

const brief = 'src/visualTreatments/brief.ts';
const timelineSource = 'src/beatTimeline.ts';

const typographySources: TreatmentSources = {
	script: [brief, 'src/visualTreatments/typography/script.ts', timelineSource, 'src/problemDecompositionRemake/film.ts'],
	renderer: ['src/visualTreatments/typography/TypographyTreatment.tsx', 'src/problemDecompositionRemake/Frame.tsx'],
};

const characterSources: TreatmentSources = {
	script: [brief, 'src/visualTreatments/character/script.ts', timelineSource, 'src/aiTestAutomation/motion.ts', 'src/aiTestAutomation/film.ts'],
	renderer: ['src/visualTreatments/character/CharacterTreatment.tsx', 'src/aiTestAutomation/actors.tsx', 'src/aiTestAutomation/design.tsx'],
};

// A typography version: its picture comes from treatment A's script and renderer.
const typography = (version: TreatmentVersion): TreatmentEntry => ({
	treatment: 'typography', id: version.id, fps: version.fps, timeline: typographyTimeline(version), sources: typographySources,
});

// A character version: treatment B's script and renderer, plus any file that
// supplies this version's revised beats.
const character = (version: CharacterVersion, ...revisionFiles: string[]): TreatmentEntry => ({
	treatment: 'character',
	id: version.id,
	fps: version.fps,
	timeline: characterTimeline(version),
	sources: { ...characterSources, script: [...characterSources.script, ...revisionFiles] },
});

export const treatmentVersions: readonly TreatmentEntry[] = [
	typography(typographyV1),
	character(characterV1),
	character(characterV2, 'src/visualTreatments/character/v2.ts'),
];
