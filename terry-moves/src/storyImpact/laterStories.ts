// More stories over time: after the pink story, the sun story and then the
// customer's idea each launch, splat, wobble, are assimilated and go to
// History, in shorter beats than the first story (its wish and fuzziness are
// not repeated). Each changes a different set of cells across rows and
// columns. The idea took the place of a refill behind the sun story; a new
// ball drops into the back of the tray as the idea leaves it.

import { Easing } from 'remotion';
import { ballColors, ideaBall, laterStories, leftTrayOf, pinkAfterIdea, pinkStory, Pose, StoryBefore, StorySpec } from './scene';
import { between, clamp01, FPS } from './motion';
import { pills, withValues } from './valueBeats';
import { afterStory } from './assimilation';
import { beat, Beat, COHERENT_SECONDS, SPLAT_SECONDS, squeezed, WOBBLE_SECONDS } from './film';
import { launchBeatOf, LAUNCH_SECONDS, QUICK_FLIGHT_SECONDS, quickFlightBeatOf } from './launchBeats';
import { splatBeatOf } from './storyBeats';
import { ASSIMILATE_SECONDS, assimilateBeatOf, coherentBeatOf, wobbleBeatOf } from './productBeats';
import { HISTORY_SECONDS, historyBeatOf } from './historyBeats';
import { afterABreath } from './readingPace';

const [sun] = laterStories;

// Lower down and further along Behavior than the pink story; it reorganizes
// the cell the pink story added, which ends split between pink and sun. It
// folds the (plain) top Structure row away: the structure gets simpler.
const sunStory: StorySpec = {
	ball: sun,
	impact: { col: 3, row: 1.6 },
	changed: [
		{ col: 3, row: 0 },
		{ col: 0, row: 2 },
		{ col: 1, row: 1 },
	],
	reorganized: { col: 4, row: 1 },
	seed: 11,
	grow: { rows: -1 },
};

// The customer's idea: further along Behavior; it reorganizes a sun cell and
// adds a Behavior column, part of which takes its color. It is in the same
// domain as the pink story, so it exercises the option the pink story left:
// it splashes smaller, knocks fewer cells, and is assimilated quickly.
const ideaStory: StorySpec = {
	ball: ideaBall,
	impact: { col: 3.3, row: 1.5 },
	splash: 0.65,
	changed: [
		{ col: 5, row: 0 },
		{ col: 5, row: 1 },
		{ col: 0, row: 1 },
	],
	reorganized: { col: 3, row: 0 },
	grow: { columns: 1 },
	seed: 23,
	refill: { id: 'orange', color: ballColors.orange, size: 36 },
};

const sunBefore = afterStory(pinkStory, pinkAfterIdea());
const ideaBefore = afterStory(sunStory, sunBefore);

// The last story, and the stage once it has left the tray (with its refill).
export const lastStory = { spec: ideaStory, stage: leftTrayOf(ideaStory, ideaBefore) };

type Captions = { launch: string; wobble?: string; assimilate?: string; history?: string; breath?: boolean };

// How long the product's work on a story takes, in seconds.
type Pace = { splat: number; wobble: number; assimilate: number; coherent: number };
const USUAL: Pace = { splat: 1.8, wobble: 2, assimilate: 2.5, coherent: 1.8 };
// A story that exercises an option: the domain is ready for it.
const CHEAP: Pace = { splat: 1.4, wobble: 1.2, assimilate: 1.8, coherent: 1.3 };

// What a beat shows beside the story itself, by the beat's part name and
// seconds into it.
type Extra = (part: string, sec: number, pose: Pose) => Pose;
const nothing: Extra = (_part, _sec, pose) => pose;

// A later story's beats, named after its ball. `eager`: the previous beat
// left it hopping at the front of the queue.
const laterStoryBeats = (spec: StorySpec, before: StoryBefore, captions: Captions, eager: boolean, pace = USUAL, extra = nothing): Beat[] => {
	const stage = leftTrayOf(spec, before);
	const name = (part: string) => `${spec.ball.id}-${part}`;
	const withExtra =
		(part: string, bySeconds: (sec: number) => Pose) =>
		(sec: number): Pose =>
			extra(part, sec, bySeconds(sec));
	// A beat played faster than the one-story film's, with the extra shown
	// by seconds into this shorter beat.
	const squeezedBeat = (part: string, seconds: number, caption: string | undefined, bySeconds: (sec: number) => Pose, fromSeconds: number): Beat => {
		const plain = squeezed(name(part), seconds, caption, bySeconds, fromSeconds);
		const last = Math.round(seconds * FPS) - 1;
		return { ...plain, pose: (t) => extra(part, (clamp01(t) * last) / FPS, plain.pose(t)) };
	};
	const launch = beat(name('launch'), LAUNCH_SECONDS, captions.launch, withExtra('launch', launchBeatOf(spec, before, eager)));
	return [
		captions.breath ? afterABreath(launch) : launch,
		beat(name('flight'), QUICK_FLIGHT_SECONDS, undefined, withExtra('flight', quickFlightBeatOf(spec, stage))),
		squeezedBeat('splat', pace.splat, undefined, splatBeatOf(spec, stage), SPLAT_SECONDS),
		squeezedBeat('wobble', pace.wobble, captions.wobble, wobbleBeatOf(spec, stage), WOBBLE_SECONDS),
		squeezedBeat('assimilate', pace.assimilate, captions.assimilate, assimilateBeatOf(spec, stage), ASSIMILATE_SECONDS),
		squeezedBeat('coherent', pace.coherent, undefined, coherentBeatOf(spec, stage), COHERENT_SECONDS),
		squeezedBeat('history', 2.6, captions.history, historyBeatOf(spec, stage), HISTORY_SECONDS),
	];
};

// The option the pink story left pays off: its pill comes back as the idea
// launches, its key glints while the idea is assimilated, and it fades as the
// idea goes to History.
const optionPaysOff: Extra = (part, sec, pose) => {
	const shown = part === 'launch' ? between(sec, 0.3, 0.8) : part === 'history' ? 1 - between(sec, 0, 0.4) : 1;
	const glint = part === 'assimilate' ? between(sec, 0.1, 0.6, Easing.out(Easing.back(2))) : part === 'coherent' ? 1 : part === 'history' ? 1 : 0;
	return shown > 0 ? withValues(pose, pills(0, shown, glint)) : pose;
};

export const laterStoryBeatList: Beat[] = [
	...laterStoryBeats(
		sunStory,
		sunBefore,
		{ launch: 'More stories come and go…', assimilate: '…and the product stays coherent. No scars.', breath: true },
		true,
	),
	...laterStoryBeats(
		ideaStory,
		ideaBefore,
		{
			launch: 'The idea fits the same domain…',
			wobble: '…so it comes cheap: the option pays off.',
			history: 'Spent stories pile up in History, out of the way.',
		},
		false,
		CHEAP,
		optionPaysOff,
	),
];
