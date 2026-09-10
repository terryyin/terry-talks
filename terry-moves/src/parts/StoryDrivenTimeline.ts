import {storyDrivenCues} from './StoryDrivenCues';
import {makeCueTimeline} from './CueTimeline';

export const makeStoryDrivenTimeline = (cues = storyDrivenCues, fps = 30) => makeCueTimeline([
  ...cues,
  {id: 'hold', text: '', duration: 3, leadingBlank: 0},
], fps);
export const storyDrivenTimeline = makeStoryDrivenTimeline();
export type StoryDrivenTimeline = ReturnType<typeof makeStoryDrivenTimeline>;
export const storyDrivenOpeningDuration = (storyDrivenCues.slice(0, storyDrivenCues.findIndex((cue) => cue.id === '16')).reduce((seconds, cue) => seconds + cue.leadingBlank + cue.duration, 0) + storyDrivenCues.find((cue) => cue.id === '16')!.leadingBlank) * storyDrivenTimeline.fps;
