// More stories over time: after the pink story, the sun story and then the
// customer's idea each launch, splat, wobble, are assimilated and go to
// History, in shorter beats than the first story (its wish and fuzziness are
// not repeated). Each changes a different set of cells across rows and
// columns. The idea took the place of a refill behind the sun story; a new
// ball drops into the back of the tray as the idea leaves it.

import { ballColors, ideaBall, laterStories, leftTrayOf, pinkAfterIdea, pinkStory, StoryBefore, StorySpec } from './scene';
import { afterStory } from './assimilation';
import { beat, Beat, COHERENT_SECONDS, SPLAT_SECONDS, squeezed, WOBBLE_SECONDS } from './film';
import { launchBeatOf, LAUNCH_SECONDS, QUICK_FLIGHT_SECONDS, quickFlightBeatOf } from './launchBeats';
import { splatBeatOf } from './storyBeats';
import { ASSIMILATE_SECONDS, assimilateBeatOf, coherentBeatOf, wobbleBeatOf } from './productBeats';
import { HISTORY_SECONDS, historyBeatOf } from './historyBeats';

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
// adds a Behavior column, part of which takes its color.
const ideaStory: StorySpec = {
	ball: ideaBall,
	impact: { col: 3.3, row: 1.5 },
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

type Captions = { launch: string; assimilate?: string; history?: string };

// A later story's beats, named after its ball. `eager`: the previous beat
// left it hopping at the front of the queue.
const laterStoryBeats = (spec: StorySpec, before: StoryBefore, captions: Captions, eager: boolean): Beat[] => {
	const stage = leftTrayOf(spec, before);
	const name = (part: string) => `${spec.ball.id}-${part}`;
	return [
		beat(name('launch'), LAUNCH_SECONDS, captions.launch, launchBeatOf(spec, before, eager)),
		beat(name('flight'), QUICK_FLIGHT_SECONDS, undefined, quickFlightBeatOf(spec, stage)),
		squeezed(name('splat'), 1.8, undefined, splatBeatOf(spec, stage), SPLAT_SECONDS),
		squeezed(name('wobble'), 2, undefined, wobbleBeatOf(spec, stage), WOBBLE_SECONDS),
		squeezed(name('assimilate'), 2.5, captions.assimilate, assimilateBeatOf(spec, stage), ASSIMILATE_SECONDS),
		squeezed(name('coherent'), 1.8, undefined, coherentBeatOf(spec, stage), COHERENT_SECONDS),
		squeezed(name('history'), 2.6, captions.history, historyBeatOf(spec, stage), HISTORY_SECONDS),
	];
};

export const laterStoryBeatList: Beat[] = [
	...laterStoryBeats(
		sunStory,
		sunBefore,
		{ launch: 'More stories come and go…', assimilate: '…and the product stays coherent. No scars.' },
		true,
	),
	...laterStoryBeats(
		ideaStory,
		ideaBefore,
		{ launch: 'Each one changes the product a little.', history: 'Spent stories pile up in History, out of the way.' },
		false,
	),
];
