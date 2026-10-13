import { RhythmDirection, rhythmTimeline } from './direction';

// Bump when changing sound synthesis so a saved take cannot silently keep an
// older sound while claiming to represent the new authoring inputs.
export const rhythmSynthesisVersion = 'percussion-pluck-bell-1';
export const rhythmSampleRate = 44100;
export type RhythmScore = {
	take: string;
	audioPath: string;
	directionFingerprint: string;
	synthesisVersion: string;
	fps: number;
	durationInFrames: number;
	sampleRate: number;
	wavSha256: string;
};

// A portable cue/source check used in the browser as well as the save command.
// The saved WAV also has a SHA-256 media hash for replay/preservation evidence.
export const rhythmFingerprint = (direction: RhythmDirection, fps: number) => {
	const source = JSON.stringify({ direction, fps, synthesis: rhythmSynthesisVersion });
	let hash = 2166136261;
	for (let index = 0; index < source.length; index++) hash = Math.imul(hash ^ source.charCodeAt(index), 16777619);
	return `rhythm-${(hash >>> 0).toString(16).padStart(8, '0')}`;
};

export const matchingRhythmScore = (direction: RhythmDirection, score: RhythmScore, fps: number) => {
	const performance = rhythmTimeline(direction, fps);
	if (score.take !== direction.id || score.directionFingerprint !== rhythmFingerprint(direction, fps)
		|| score.synthesisVersion !== rhythmSynthesisVersion || score.fps !== fps
		|| score.durationInFrames !== performance.durationInFrames) {
		throw new Error(`Saved rhythm score "${score.take}" does not match direction "${direction.id}". Save the matching audio explicitly with: pnpm -C terry-moves exec tsx scripts/shared-rhythm-score.ts ${direction.id}. Then preview/export that take again.`);
	}
	return { performance, audioPath: score.audioPath };
};

// Small original instrument set for this film, rather than a new synthesizer
// framework. Fixed phase and bounded smooth envelopes make saves reproducible.
export const synthesizeRhythm = (direction: RhythmDirection, fps: number) => {
	const performance = rhythmTimeline(direction, fps);
	const samples = new Float64Array(Math.round(performance.durationInFrames / fps * rhythmSampleRate));
	for (const cue of performance.cues) {
		const motif = direction.motifs.find((item) => item.id === cue.motif)!;
		const hz = motif.hz * (cue.pitch ?? 1);
		const duration = motif.timbre === 'drum' ? 0.24 : motif.timbre === 'pluck' ? 0.46 : 0.5;
		const start = Math.round(cue.seconds * rhythmSampleRate);
		const length = Math.min(Math.round(duration * rhythmSampleRate), samples.length - start);
		for (let index = 0; index < length; index++) {
			const seconds = index / rhythmSampleRate;
			const attack = Math.min(1, seconds / 0.003);
			const release = Math.min(1, (duration - seconds) / 0.025);
			const envelope = attack * release * Math.exp(-seconds * (motif.timbre === 'drum' ? 18 : 8));
			let tone: number;
			if (motif.timbre === 'drum') {
				// Integrated falling pitch gives a rounded wooden/percussive pulse.
				const phase = Math.PI * 2 * hz * (seconds + 0.65 * (1 - Math.exp(-seconds * 24)) / 24);
				tone = Math.sin(phase) + 0.18 * Math.sin(phase * 2.1);
			} else if (motif.timbre === 'pluck') {
				tone = Math.sin(seconds * hz * Math.PI * 2) + 0.3 * Math.sin(seconds * hz * Math.PI * 4) * Math.exp(-seconds * 12);
			} else {
				tone = Math.sin(seconds * hz * Math.PI * 2) + 0.22 * Math.sin(seconds * hz * Math.PI * 2 * 2.76) * Math.exp(-seconds * 8);
			}
			samples[start + index] += tone * envelope * (cue.strength ?? 1) * (motif.timbre === 'drum' ? 0.42 : 0.3);
		}
	}
	return samples;
};

export const rhythmWave = (samples: Float64Array) => {
	const bytes = new Uint8Array(44 + samples.length * 2);
	const view = new DataView(bytes.buffer);
	const word = (offset: number, value: string) => [...value].forEach((character, index) => view.setUint8(offset + index, character.charCodeAt(0)));
	word(0, 'RIFF'); view.setUint32(4, bytes.length - 8, true); word(8, 'WAVE'); word(12, 'fmt ');
	view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 1, true);
	view.setUint32(24, rhythmSampleRate, true); view.setUint32(28, rhythmSampleRate * 2, true);
	view.setUint16(32, 2, true); view.setUint16(34, 16, true); word(36, 'data'); view.setUint32(40, samples.length * 2, true);
	for (let index = 0; index < samples.length; index++) {
		if (Math.abs(samples[index]) > 1) throw new Error('Rhythm score clips; lower the authored cue strengths before saving.');
		view.setInt16(44 + index * 2, Math.round(samples[index] * 32767), true);
	}
	return bytes;
};
