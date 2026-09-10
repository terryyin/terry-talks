import {storyDrivenCues} from './StoryDrivenCues';
import {makeCueTimeline} from './CueTimeline';

export const makeStoryDrivenTimeline = (cues = storyDrivenCues, fps = 30) => makeCueTimeline([
  ...cues,
  {id: 'hold', text: '', duration: 3, leadingBlank: 0},
], fps);
export const storyDrivenTimeline = makeStoryDrivenTimeline();
export type StoryDrivenTimeline = ReturnType<typeof makeStoryDrivenTimeline>;
