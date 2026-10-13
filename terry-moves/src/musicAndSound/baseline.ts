import { RhythmDirection } from './direction';
import { rhythmMotifs } from './script';

// The retained full take. At 100 BPM these 60 beats last exactly 36 seconds.
// A future take derives from this direction without editing its saved source.
export const rhythmBaseline: RhythmDirection = {
	id: 'baseline',
	bpm: 100,
	motifs: rhythmMotifs,
	passages: [
		{
			id: 'a-pulse-alone', beats: 8, title: 'Finding a\nshared rhythm',
			performers: [{ motif: 'pulse', x: 350, y: 650, size: 170 }],
			cues: [
				{ id: 'alone-first', beat: 1, motif: 'pulse', strength: 0.85 },
				{ id: 'alone-second', beat: 3, motif: 'pulse', strength: 0.7 },
				{ id: 'alone-third', beat: 5, motif: 'pulse', strength: 0.9 },
				{ id: 'alone-fourth', beat: 7, motif: 'pulse', strength: 0.65 },
			],
		},
		{
			id: 'an-answer-across-space', beats: 8,
			performers: [{ motif: 'pulse', x: 310, y: 610, size: 155 }, { motif: 'answer', x: 770, y: 470, size: 155 }],
			cues: [
				{ id: 'answer-arrives', beat: 0, motif: 'answer', strength: 0.8 },
				{ id: 'pulse-answers', beat: 1, motif: 'pulse', strength: 0.65 },
				{ id: 'answer-steps-up', beat: 2, motif: 'answer', pitch: 1.25, strength: 0.8 },
				// Isolated with space on both sides: the later take can delay this
				// sound and its visible response by half a beat without a collision.
				{ id: 'answer-turns', beat: 4, motif: 'answer', pitch: 1.5 },
				{ id: 'pulse-accepts', beat: 6, motif: 'pulse', strength: 0.75 },
				{ id: 'answer-settles', beat: 7, motif: 'answer', strength: 0.65 },
			],
		},
		{
			id: 'a-third-voice', beats: 8,
			performers: [{ motif: 'pulse', x: 270, y: 650, size: 138 }, { motif: 'answer', x: 540, y: 440, size: 138 }, { motif: 'spark', x: 810, y: 650, size: 138 }],
			cues: [
				{ id: 'spark-arrives', beat: 0, motif: 'spark', strength: 0.7 },
				{ id: 'third-answer', beat: 1, motif: 'answer', pitch: 1.25, strength: 0.75 },
				{ id: 'third-pulse', beat: 2, motif: 'pulse', strength: 0.7 },
				{ id: 'spark-rises', beat: 3, motif: 'spark', pitch: 1.25, strength: 0.65 },
				{ id: 'answer-welcomes', beat: 4, motif: 'answer', pitch: 1.5, strength: 0.8 },
				{ id: 'pulse-welcomes', beat: 5, motif: 'pulse', strength: 0.75 },
				{ id: 'spark-listens', beat: 6, motif: 'spark', strength: 0.6 },
				{ id: 'answer-listens', beat: 7, motif: 'answer', strength: 0.6 },
			],
		},
		{
			id: 'passing-the-phrase', beats: 8,
			performers: [{ motif: 'pulse', x: 290, y: 600, size: 148 }, { motif: 'answer', x: 540, y: 500, size: 148 }, { motif: 'spark', x: 790, y: 600, size: 148 }],
			cues: [
				{ id: 'passing-pulse-one', beat: 0, motif: 'pulse', strength: 0.8 },
				{ id: 'passing-answer-one', beat: 0.5, motif: 'answer', strength: 0.75 },
				{ id: 'passing-spark-one', beat: 1.5, motif: 'spark', strength: 0.65 },
				{ id: 'passing-pulse-two', beat: 2, motif: 'pulse', strength: 0.75 },
				{ id: 'passing-answer-two', beat: 3, motif: 'answer', pitch: 1.25, strength: 0.8 },
				{ id: 'passing-spark-two', beat: 3.5, motif: 'spark', pitch: 1.25, strength: 0.65 },
				{ id: 'passing-pulse-three', beat: 4, motif: 'pulse', strength: 0.8 },
				{ id: 'passing-answer-three', beat: 4.5, motif: 'answer', pitch: 1.5, strength: 0.75 },
				{ id: 'passing-spark-three', beat: 5.5, motif: 'spark', pitch: 1.5, strength: 0.6 },
				{ id: 'passing-pulse-four', beat: 6, motif: 'pulse', strength: 0.8 },
				{ id: 'passing-answer-four', beat: 7, motif: 'answer', pitch: 1.25, strength: 0.6 },
			],
		},
		{
			id: 'an-ensemble', beats: 8,
			performers: [{ motif: 'pulse', x: 290, y: 570, size: 148 }, { motif: 'answer', x: 540, y: 570, size: 148 }, { motif: 'spark', x: 790, y: 570, size: 148 }],
			cues: [
				{ id: 'ensemble-pulse-one', beat: 0, motif: 'pulse', strength: 0.8 },
				{ id: 'ensemble-answer-one', beat: 0, motif: 'answer', strength: 0.65 },
				{ id: 'ensemble-spark-one', beat: 0, motif: 'spark', strength: 0.5 },
				{ id: 'ensemble-answer-step', beat: 1, motif: 'answer', pitch: 1.25, strength: 0.65 },
				{ id: 'ensemble-pulse-two', beat: 2, motif: 'pulse', strength: 0.75 },
				{ id: 'ensemble-spark-step', beat: 2.5, motif: 'spark', pitch: 1.25, strength: 0.55 },
				{ id: 'ensemble-answer-two', beat: 3, motif: 'answer', pitch: 1.5, strength: 0.65 },
				{ id: 'ensemble-pulse-three', beat: 4, motif: 'pulse', strength: 0.8 },
				{ id: 'ensemble-answer-three', beat: 4, motif: 'answer', pitch: 1.25, strength: 0.65 },
				{ id: 'ensemble-spark-three', beat: 4, motif: 'spark', pitch: 1.5, strength: 0.5 },
				{ id: 'ensemble-answer-last', beat: 5, motif: 'answer', strength: 0.6 },
				{ id: 'ensemble-pulse-last', beat: 6, motif: 'pulse', strength: 0.65 },
				{ id: 'ensemble-spark-last', beat: 6.5, motif: 'spark', strength: 0.5 },
			],
		},
		{
			id: 'a-shared-breath', beats: 4,
			performers: [{ motif: 'pulse', x: 290, y: 570, size: 148 }, { motif: 'answer', x: 540, y: 570, size: 148 }, { motif: 'spark', x: 790, y: 570, size: 148 }],
			cues: [],
		},
		{
			id: 'return-together', beats: 8,
			performers: [{ motif: 'pulse', x: 290, y: 550, size: 160 }, { motif: 'answer', x: 540, y: 550, size: 160 }, { motif: 'spark', x: 790, y: 550, size: 160 }],
			cues: [
				{ id: 'return-pulse', beat: 0, motif: 'pulse', strength: 0.85 },
				{ id: 'return-answer', beat: 0, motif: 'answer', strength: 0.65 },
				{ id: 'return-spark', beat: 0, motif: 'spark', pitch: 1.5, strength: 0.5 },
				{ id: 'return-pulse-walk', beat: 2, motif: 'pulse', strength: 0.7 },
				{ id: 'return-answer-walk', beat: 3, motif: 'answer', pitch: 1.25, strength: 0.65 },
				{ id: 'return-spark-walk', beat: 4, motif: 'spark', pitch: 1.25, strength: 0.55 },
				{ id: 'resolve-pulse', beat: 6, motif: 'pulse', strength: 0.7 },
				{ id: 'resolve-answer', beat: 6, motif: 'answer', strength: 0.6 },
				{ id: 'resolve-spark', beat: 6, motif: 'spark', strength: 0.5 },
			],
		},
		{
			id: 'a-rhythm-to-keep', beats: 8, title: 'Finding a\nshared rhythm',
			performers: [{ motif: 'pulse', x: 290, y: 550, size: 160 }, { motif: 'answer', x: 540, y: 550, size: 160 }, { motif: 'spark', x: 790, y: 550, size: 160 }],
			cues: [],
			credit: 'Sound & motion · Koharu-chan\nMade for Terry · Original score\nNo external samples',
		},
	],
};
