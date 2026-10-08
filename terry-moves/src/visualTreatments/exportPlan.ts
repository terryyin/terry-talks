// What `pnpm render:treatments` produces for each registered version: its
// clip and key poses, all derived from the version's own timeline. Reviewing
// or rendering never selects a version; only the review record does, and only
// then is the selected version's continuation exported too.
import { continuedPreviewId, continueTreatment } from './continuation';
import { resolveChoice, Selection } from './selection';
import { TreatmentEntry, treatmentFrame, treatmentVersions, TreatmentSources } from './versions';

export const exportRoot = 'out/treatments';

// Two poses per beat: halfway through its motion and where it settles.
export type Moment = 'midway' | 'settled';
export type KeyPose = { beat: string; moment: Moment; frame: number; file: string };

export type VersionExport = {
	// The composition rendered.
	id: string;
	treatment: TreatmentEntry['treatment'];
	dir: string;
	clip: string;
	fps: number;
	durationInFrames: number;
	width: number;
	height: number;
	beats: { name: string; caption: string; from: number; to: number }[];
	keyPoses: KeyPose[];
	sources: TreatmentSources;
};

const exportOf = (entry: TreatmentEntry, id = entry.id, dir = `${exportRoot}/${entry.id}`, name = entry.id): VersionExport => {
	const { timeline } = entry;
	const beats = timeline.beats.map(({ name, caption }) => {
		const { from, durationInFrames } = timeline.beatRange(name);
		return { name, caption: caption ?? '', from, to: from + durationInFrames - 1 };
	});
	const keyPoses = beats.flatMap(({ name, from, to }) => ([['midway', from + Math.floor((to - from + 1) / 2)], ['settled', to]] as const)
		.map(([moment, frame]): KeyPose => ({ beat: name, moment, frame, file: `${dir}/${name}-${moment}-${frame}.png` })));
	return {
		id,
		treatment: entry.treatment,
		dir,
		clip: `${dir}/${name}.mp4`,
		fps: entry.fps,
		durationInFrames: timeline.durationInFrames,
		...treatmentFrame,
		beats,
		keyPoses,
		sources: entry.sources,
	};
};

// The named versions to export, in registry order; none named means all.
export const planTreatmentExport = (ids: readonly string[] = [], registry: readonly TreatmentEntry[] = treatmentVersions): VersionExport[] => {
	const known = registry.map((entry) => entry.id);
	const unknown = ids.filter((id) => !known.includes(id));
	if (unknown.length > 0) throw new Error(`Unknown treatment version ${unknown.join(', ')}. Registered: ${known.join(', ')}`);
	return registry.filter((entry) => ids.length === 0 || ids.includes(entry.id)).map((entry) => exportOf(entry));
};

// The selected version continued past the passage: rendered from the
// continuation composition into its own folder under out/treatments/selected/.
export type ContinuationExport = VersionExport & {
	selected: string;
	prefixFrames: number;
	appended: { name: string; from: number; to: number };
};

// The continuation to export for the review record, if it selects a version
// and that version is among those being exported (none named means all).
// Pending or revise exports nothing selected.
export const planContinuationExport = (ids: readonly string[] = [], selection: Selection = resolveChoice()): ContinuationExport | undefined => {
	if (selection.state !== 'selected' || (ids.length > 0 && !ids.includes(selection.entry.id))) return undefined;
	const { entry, prefixFrames, appended } = continueTreatment(selection.entry);
	const name = `${entry.id}-continued`;
	return {
		...exportOf(entry, continuedPreviewId, `${exportRoot}/selected/${name}`, name),
		selected: entry.id,
		prefixFrames,
		appended: { name: appended.name, from: appended.from, to: appended.from + appended.durationInFrames - 1 },
	};
};
