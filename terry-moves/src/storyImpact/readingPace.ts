// Reading pace: every caption stays on screen long enough to be read, and
// read aloud, at a comfortable pace. Its time comes from its length in
// syllables, not from hand-tuned numbers, so a reworded caption re-times
// itself. The beats under a caption slow evenly to fit it; each still ends
// on the same pose, because a beat's pose is a function of its progress.

import type { Beat } from './film';
import { FPS } from './motion';

// A comfortable narration pace (about 140 words a minute), a lead-in for the
// eye to find the line, and a minimum hold. Calibrated so the captions last
// about 1.2× their earlier hand-set times, with short captions gaining most.
export const SYLLABLES_PER_SECOND = 3.5;
export const LEAD_IN_SECONDS = 1.0;
export const MIN_HOLD_SECONDS = 3.0;

// A breath: the caption line stays empty while the picture moves on.
export const PAUSE_SECONDS = 1.0;

// Syllables in one English word, by rule of thumb: vowel groups, less silent
// endings, plus vowels spoken apart.
const wordSyllables = (raw: string): number => {
	let w = raw.toLowerCase().replace(/’/g, "'").replace(/[^a-z']/g, '');
	const negated = /[^aeiou]n't$/.test(w) ? 1 : 0; // does-n't, is-n't
	w = w.replace(/n't$/, '').replace(/'.*$/, '');
	if (!w) return negated;
	const spoken = w
		.replace(/([^aeiouy])le(s?)$/, '$1ul$2') // peo-ple, wob-bles
		.replace(/(?<![sxz]|ch|sh|[cg])es$/, 's') // silent -es, but touch-es
		.replace(/(?<![td])ed$/, 'd') // silent -ed, but want-ed
		.replace(/(?<=[aeiouy][^aeiouy]+)e$/, '') // silent final -e
		.replace(/^y/, '');
	const groups = spoken.match(/[aeiouy]+/g)?.length ?? 0;
	const apart = spoken.match(/(?<=[aeiouy][^aeiouy]+)eas?$|ia|iu|uo|eo(?!p)/g)?.length ?? 0; // i-de-a
	return Math.max(1, groups + apart) + negated;
};

export const syllables = (text: string): number =>
	text
		.replace(/×/g, ' times ')
		.split(/[\s—–-]+/)
		.reduce((n, w) => n + wordSyllables(w), 0);

// How long a caption needs on screen; an empty caption needs no time.
export const readingSeconds = (caption: string): number =>
	caption.trim() === '' ? 0 : Math.max(MIN_HOLD_SECONDS, LEAD_IN_SECONDS + syllables(caption) / SYLLABLES_PER_SECOND);

// A beat whose caption waits for a breath first.
export const afterABreath = (b: Beat): Beat => ({ ...b, pause: PAUSE_SECONDS });

// A caption's span: its beat and the caption-less beats after it.
const spansOf = (beats: Beat[]): Beat[][] =>
	beats.reduce<Beat[][]>((spans, b) => {
		if (b.caption !== undefined || spans.length === 0) spans.push([b]);
		else spans[spans.length - 1].push(b);
		return spans;
	}, []);

// Each span lasts at least its breath plus its caption's reading time; a
// span that needs more slows all its beats by the same factor.
export const paced = (beats: Beat[]): Beat[] =>
	spansOf(beats).flatMap((span) => {
		const [head] = span;
		const authored = span.reduce((sum, b) => sum + b.seconds, 0);
		const needed = (head.pause ?? 0) + readingSeconds(head.caption ?? '');
		const stretch = needed > authored ? needed / authored : 1;
		// Whole frames, rounded up, so the span never falls short.
		return stretch === 1 ? span : span.map((b) => ({ ...b, seconds: Math.ceil(b.seconds * stretch * FPS - 1e-6) / FPS }));
	});
