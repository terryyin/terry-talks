import {Script} from '../models/Script';

export const assimilationCues = [
  {id: '11', text: 'One story may change several features and reach across several components.', duration: 6, leadingBlank: 0},
  {id: '15', text: 'The change can disturb existing behavior and strain the structure that supports it.', duration: 6, leadingBlank: 0},
  {id: '17', text: 'We reconcile the new behavior with what the product already does.', duration: 6, leadingBlank: 1.5},
  {id: '18', text: 'We reshape the structure so the changed product fits together.', duration: 6, leadingBlank: 0},
  {id: '23', text: 'It has changed. The story’s impact is now part of how the product works.', duration: 6, leadingBlank: 0},
  {id: 'hold', text: '', duration: 1.5, leadingBlank: 0},
];

export const makeAssimilationTimeline = (cues = assimilationCues, fps = 30) => {
  const script = new Script(cues, fps);
  const window = (id: string) => {
    const cue = cues.find((candidate) => candidate.id === id);
    if (!cue) throw new Error(`Missing assimilation cue ${id}`);
    const start = (script.getStartTimeOfSubtitleById(id) + cue.leadingBlank) * fps;
    return {start, end: start + cue.duration * fps};
  };
  return {
    fps,
    durationInFrames: script.getTotalFrame(),
    progress: (id: string, frame: number) => {
      const {start, end} = window(id);
      return Math.max(0, Math.min(1, (frame - start) / (end - start)));
    },
    caption: (frame: number) => cues.find((cue) => {
      const {start, end} = window(cue.id);
      return frame >= start && frame < end;
    })?.text ?? '',
  };
};

export const assimilationTimeline = makeAssimilationTimeline();
export type AssimilationTimeline = ReturnType<typeof makeAssimilationTimeline>;
