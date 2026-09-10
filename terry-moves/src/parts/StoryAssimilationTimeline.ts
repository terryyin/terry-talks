import {storyDrivenCues} from './StoryDrivenCues';
import {makeCueTimeline} from './CueTimeline';

export const assimilationCues = [
  {id: '11', text: storyDrivenCues.find((cue) => cue.id === '11')!.text, duration: 6, leadingBlank: 0},
  {id: '15', text: storyDrivenCues.find((cue) => cue.id === '15')!.text, duration: 6, leadingBlank: 0},
  {id: '17', text: storyDrivenCues.find((cue) => cue.id === '17')!.text, duration: 6, leadingBlank: 1.5},
  {id: '18', text: storyDrivenCues.find((cue) => cue.id === '18')!.text, duration: 6, leadingBlank: 0},
  {id: '23', text: storyDrivenCues.find((cue) => cue.id === '23')!.text, duration: 6, leadingBlank: 0},
  {id: 'hold', text: '', duration: 1.5, leadingBlank: 0},
];

export const makeAssimilationTimeline = (cues = assimilationCues, fps = 30) => makeCueTimeline(cues, fps);

export const assimilationTimeline = makeAssimilationTimeline();
export type AssimilationTimeline = ReturnType<typeof makeAssimilationTimeline>;
