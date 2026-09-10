import {Script} from '../models/Script';
import {Subtitle} from '../models/Subtitles';

export const makeCueTimeline = (cues: (Subtitle & {id: string; text: string})[], fps = 30) => {
  const script = new Script(cues, fps);
  const window = (id: string) => {
    const cue = cues.find((candidate) => candidate.id === id);
    if (!cue) throw new Error(`Missing subtitle cue ${id}`);
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
