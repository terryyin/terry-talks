import { RhythmDirection } from './direction';

export const rhythmFps = 30;
export const rhythmMotifs: RhythmDirection['motifs'] = [
	{ id: 'pulse', shape: 'disc', color: '#f07d62', timbre: 'drum', hz: 110 },
	{ id: 'answer', shape: 'bar', color: '#75b9ae', timbre: 'pluck', hz: 293.6648 },
	{ id: 'spark', shape: 'ring', color: '#efc875', timbre: 'bell', hz: 440 },
];

// One four-bar study. This remains the full film's directing vocabulary:
// passages stage performers, named cues target their audible/visible impacts.
export const rhythmExcerpt: RhythmDirection = {
	id: 'excerpt',
	bpm: 100,
	motifs: rhythmMotifs,
	passages: [
		{
			id: 'one-pulse', beats: 4, title: 'Finding a\nshared rhythm',
			performers: [{ motif: 'pulse', x: 540, y: 650, size: 170 }],
			cues: [
				{ id: 'first-pulse', beat: 1, motif: 'pulse' },
				{ id: 'second-pulse', beat: 3, motif: 'pulse', strength: 0.85 },
			],
		},
		{
			id: 'an-answer', beats: 4,
			performers: [{ motif: 'pulse', x: 350, y: 570, size: 155 }, { motif: 'answer', x: 730, y: 570, size: 155 }],
			cues: [
				{ id: 'answer-enters', beat: 0, motif: 'answer' },
				{ id: 'pulse-replies', beat: 1, motif: 'pulse', strength: 0.8 },
				{ id: 'answer-rises', beat: 2, motif: 'answer', pitch: 1.25 },
				{ id: 'pulse-listens', beat: 3, motif: 'pulse', strength: 0.65 },
			],
		},
		{
			id: 'a-third-voice', beats: 4,
			performers: [{ motif: 'pulse', x: 290, y: 610, size: 138 }, { motif: 'answer', x: 540, y: 510, size: 138 }, { motif: 'spark', x: 790, y: 610, size: 138 }],
			cues: [
				{ id: 'spark-enters', beat: 0, motif: 'spark' },
				{ id: 'pulse-in-three', beat: 1, motif: 'pulse', strength: 0.75 },
				{ id: 'answer-in-three', beat: 2, motif: 'answer', pitch: 1.5 },
				{ id: 'spark-in-three', beat: 3, motif: 'spark', pitch: 1.25, strength: 0.75 },
			],
		},
		{
			id: 'shared-breath', beats: 2,
			performers: [{ motif: 'pulse', x: 290, y: 610, size: 138 }, { motif: 'answer', x: 540, y: 510, size: 138 }, { motif: 'spark', x: 790, y: 610, size: 138 }],
			cues: [],
		},
		{
			id: 'together', beats: 2,
			performers: [{ motif: 'pulse', x: 290, y: 590, size: 138 }, { motif: 'answer', x: 540, y: 590, size: 138 }, { motif: 'spark', x: 790, y: 590, size: 138 }],
			cues: [
				{ id: 'together-pulse', beat: 0, motif: 'pulse', strength: 0.85 },
				{ id: 'together-answer', beat: 0, motif: 'answer', strength: 0.7 },
				{ id: 'together-spark', beat: 0, motif: 'spark', pitch: 1.5, strength: 0.55 },
			],
		},
	],
};
