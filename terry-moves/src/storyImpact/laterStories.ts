// More stories over time: after the pink story, the sun and then the grape
// story each launch, splat, wobble, are assimilated and go to History, in
// shorter beats than the first story (its wish and fuzziness are not
// repeated). Each changes a different set of cells across rows and columns;
// a new ball drops into the back of the tray as each one leaves it.

import { ballColors, laterStories, leftTrayOf, pinkBefore, pinkStory, StoryBefore, StorySpec } from './scene';
import { afterStory } from './assimilation';
import { beat, Beat, COHERENT_SECONDS, SPLAT_SECONDS, squeezed, WOBBLE_SECONDS } from './film';
import { launchBeatOf, LAUNCH_SECONDS, QUICK_FLIGHT_SECONDS, quickFlightBeatOf } from './launchBeats';
import { splatBeatOf } from './storyBeats';
import { ASSIMILATE_SECONDS, assimilateBeatOf, coherentBeatOf, wobbleBeatOf } from './productBeats';
import { HISTORY_SECONDS, historyBeatOf } from './historyBeats';

const [sun, grape] = laterStories;

// Lower down and further along Behavior than the pink story; it reorganizes
// a cell the pink story changed, which ends split between pink and sun.
const sunStory: StorySpec = {
	ball: sun,
	impact: { col: 3, row: 1.6 },
	changed: [
		{ col: 3, row: 0 },
		{ col: 4, row: 2 },
		{ col: 1, row: 1 },
	],
	reorganized: { col: 3, row: 1 },
	seed: 11,
	refill: { id: 'teal', color: ballColors.teal, size: 40 },
};

// Higher up and nearer the Structure axis; it reorganizes a sun cell.
const grapeStory: StorySpec = {
	ball: grape,
	impact: { col: 1.6, row: 2.4 },
	changed: [
		{ col: 0, row: 3 },
		{ col: 2, row: 3 },
		{ col: 4, row: 1 },
	],
	reorganized: { col: 1, row: 1 },
	seed: 23,
	refill: { id: 'orange', color: ballColors.orange, size: 36 },
};

const sunBefore = afterStory(pinkStory, pinkBefore());
const grapeBefore = afterStory(sunStory, sunBefore);

// The last story, and the stage once it has left the tray (with its refill).
export const lastStory = { spec: grapeStory, stage: leftTrayOf(grapeStory, grapeBefore) };

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
		grapeStory,
		grapeBefore,
		{ launch: 'Each one changes the product a little.', history: 'Spent stories pile up in History, out of the way.' },
		false,
	),
];
