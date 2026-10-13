import { timeline } from '../beatTimeline';

export type RhythmMotif = {
	id: string;
	shape: 'disc' | 'bar' | 'ring';
	color: string;
	timbre: 'drum' | 'pluck' | 'bell';
	hz: number;
};
export type RhythmCue = {
	id: string;
	beat: number;
	motif: string;
	strength?: number;
	pitch?: number;
};
export type RhythmPerformer = { motif: string; x: number; y: number; size: number };
export type RhythmPassage = {
	id: string;
	beats: number;
	performers: RhythmPerformer[];
	cues: RhythmCue[];
	title?: string;
	credit?: string;
};
export type RhythmDirection = {
	id: string;
	bpm: number;
	motifs: RhythmMotif[];
	passages: RhythmPassage[];
};
export type TimedRhythmCue = RhythmCue & { frame: number; seconds: number; passage: string };
export type RhythmPose = { passage: RhythmPassage; cues: TimedRhythmCue[] };

// Passage lengths and accent positions enter through this musical direction.
// Both the picture and saved score consume the resulting frame targets.
export const rhythmTimeline = (direction: RhythmDirection, fps: number) => {
	if (!Number.isFinite(direction.bpm) || direction.bpm <= 0) throw new Error('The rhythm needs a positive BPM.');
	if (!Number.isFinite(fps) || fps <= 0) throw new Error('The rhythm needs a positive frame rate.');
	if (!direction.passages.length) throw new Error('The rhythm needs an authored passage.');
	const names = new Set<string>();
	const motifNames = new Set(direction.motifs.map((motif) => motif.id));
	if (motifNames.size !== direction.motifs.length) throw new Error('Rhythm motif names must be distinct.');
	for (const passage of direction.passages) {
		if (names.has(passage.id)) throw new Error(`Repeated rhythm passage: ${passage.id}`);
		names.add(passage.id);
		if (!Number.isFinite(passage.beats) || passage.beats <= 0) throw new Error(`Passage ${passage.id} needs a positive beat length.`);
		for (const performer of passage.performers) {
			if (!motifNames.has(performer.motif)) throw new Error(`Unknown performer ${performer.motif} in ${passage.id}.`);
		}
		for (const cue of passage.cues) {
			if (names.has(cue.id)) throw new Error(`Repeated rhythm cue: ${cue.id}`);
			names.add(cue.id);
			if (!Number.isFinite(cue.beat) || cue.beat < 0 || cue.beat >= passage.beats) throw new Error(`Cue ${cue.id} falls outside ${passage.id}.`);
			if (!motifNames.has(cue.motif) || !passage.performers.some((performer) => performer.motif === cue.motif)) throw new Error(`Cue ${cue.id} needs its performer on stage.`);
		}
	}
	const secondsPerBeat = 60 / direction.bpm;
	const passages = timeline<RhythmPassage>(direction.passages.map((passage) => ({
		name: passage.id,
		seconds: passage.beats * secondsPerBeat,
		pose: () => passage,
	})), fps);
	const cues = direction.passages.flatMap((passage) => passage.cues.map((cue) => {
		const frame = passages.beatRange(passage.id).from + Math.round(cue.beat * secondsPerBeat * fps);
		return { ...cue, frame, seconds: frame / fps, passage: passage.id };
	}));
	return {
		...passages,
		cues,
		poseAt: (frame: number): RhythmPose => {
			const passage = passages.poseAt(frame);
			return { passage, cues: cues.filter((cue) => cue.passage === passage.id) };
		},
	};
};

export const rhythmMotion = (frame: number, cues: TimedRhythmCue[], motif: string, fps: number) => {
	const anticipation = Math.round(fps * 0.2);
	const release = Math.round(fps * 0.4);
	const cue = cues.filter((item) => item.motif === motif && frame >= item.frame - anticipation && frame < item.frame + release)
		.sort((a, b) => Math.abs(frame - a.frame) - Math.abs(frame - b.frame))[0];
	if (!cue) return { xScale: 1, yScale: 1, lift: 0, ring: 0, ringOpacity: 0, impact: false, cue: '' };
	const age = frame - cue.frame;
	const strength = cue.strength ?? 1;
	if (age < 0) {
		const gathering = (age + anticipation) / anticipation;
		return { xScale: 1 - gathering * 0.05, yScale: 1 + gathering * 0.08, lift: -28 * gathering * gathering, ring: 0, ringOpacity: 0, impact: false, cue: cue.id };
	}
	const decay = (1 - age / release) ** 3;
	return {
		xScale: 1 + 0.2 * decay * strength,
		yScale: 1 - 0.16 * decay * strength,
		lift: -Math.sin(age / release * Math.PI) * 18 * strength,
		ring: age / release,
		ringOpacity: (1 - age / release) ** 2 * 0.8 * strength,
		impact: age === 0,
		cue: cue.id,
	};
};
