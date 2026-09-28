// The full film: the title, the product space, Time and the backlog, then
// the one-story film's beats for the first (pink) story, reused as they are,
// then more stories over time.

import { beat, beats as oneStoryBeats, Beat, timeline } from './film';
import { boards } from './boards';
import { laterStoryBeatList } from './laterStories';
import { SPACE_SECONDS, spaceBeat, TIME_SECONDS, timeBeat, TITLE_SECONDS, titleBeat } from './openingBeats';

export const fullFilmBeats: Beat[] = [
	beat('title', TITLE_SECONDS, '', titleBeat),
	beat('space', SPACE_SECONDS, boards[0].caption, spaceBeat),
	beat('time', TIME_SECONDS, boards[1].caption, timeBeat),
	...oneStoryBeats,
	...laterStoryBeatList,
];

export const fullFilm = timeline(fullFilmBeats);
