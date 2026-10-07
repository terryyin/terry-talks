// A film's beats map progress (0–1) to its own pose model. Timing policy,
// such as reading pace, is applied by the film before building the timeline.

export type Beat<Pose> = {
	name: string;
	seconds: number;
	caption?: string; // shown from this beat until the next captioned beat
	pause?: number; // seconds the caption line stays empty first, a breath
	pose: (t: number) => Pose;
};

// A beat whose pose is given by seconds into the beat.
export const beat = <Pose>(name: string, seconds: number, caption: string | undefined, bySeconds: (sec: number) => Pose, fps: number): Beat<Pose> => {
	const frames = Math.round(seconds * fps);
	return {
		name,
		seconds,
		caption,
		pose: (t) => bySeconds((Math.max(0, Math.min(1, t)) * (frames - 1)) / fps),
	};
};

export type Timeline<Pose> = {
	beats: Beat<Pose>[];
	durationInFrames: number;
	// Where a beat sits on the film's timeline, in frames.
	beatRange: (name: string) => { from: number; durationInFrames: number };
	poseAt: (frame: number) => Pose;
	captionAt: (frame: number) => string;
};

// The arithmetic of a film made of the given beats, in order, using their
// durations exactly as authored.
export const timeline = <Pose>(beats: Beat<Pose>[], fps: number): Timeline<Pose> => {
	const framesOf = (b: Beat<Pose>) => Math.round(b.seconds * fps);
	const durationInFrames = beats.reduce((sum, b) => sum + framesOf(b), 0);

	const beatRange = (name: string): { from: number; durationInFrames: number } => {
		let from = 0;
		for (const b of beats) {
			if (b.name === name) return { from, durationInFrames: framesOf(b) };
			from += framesOf(b);
		}
		throw new Error(`No beat named ${name}`);
	};

	const beatAt = (frame: number): { index: number; t: number } => {
		const f = Math.max(0, Math.min(durationInFrames - 1, Math.floor(frame)));
		let from = 0;
		for (let index = 0; index < beats.length; index++) {
			const frames = framesOf(beats[index]);
			if (f < from + frames) return { index, t: frames > 1 ? (f - from) / (frames - 1) : 1 };
			from += frames;
		}
		return { index: beats.length - 1, t: 1 };
	};

	const poseAt = (frame: number): Pose => {
		const { index, t } = beatAt(frame);
		return beats[index].pose(t);
	};

	const captionAt = (frame: number): string => {
		const { index } = beatAt(frame);
		for (let i = index; i >= 0; i--) {
			const { caption, name, pause } = beats[i];
			if (caption === undefined) continue;
			const breathing = pause !== undefined && Math.floor(frame) < beatRange(name).from + Math.round(pause * fps);
			return breathing ? '' : caption;
		}
		return '';
	};

	return { beats, durationInFrames, beatRange, poseAt, captionAt };
};
