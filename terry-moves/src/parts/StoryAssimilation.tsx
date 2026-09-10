import {ProductSpace} from './ProductSpace';
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {StoryProductFrame} from './StoryProductFrame';
import {assimilationTimeline, AssimilationTimeline} from './StoryAssimilationTimeline';

const smooth = (value: number) => value * value * (3 - 2 * value);
export const StoryAssimilationScene: React.FC<{frame: number; timeline?: AssimilationTimeline}> = ({frame, timeline = assimilationTimeline}) => {
  const arrival = timeline.progress('11', frame);
  const disturbance = timeline.progress('15', frame);
  const reconcile = smooth(timeline.progress('17', frame));
  const reshape = smooth(timeline.progress('18', frame));
  const phase = reconcile === 0 ? (disturbance === 0 ? 'A story arrives' : 'The product feels the change') : reshape === 0 ? 'Behavior finds coherence' : reshape < 1 ? 'Structure follows through' : 'The change remains';
  return <StoryProductFrame title={phase} description="A story changes behavior and structure while product history remains available" edition="STUDY 01" caption={timeline.caption(frame)}>
      <ProductSpace arrival={arrival} disturbance={disturbance} reconcile={reconcile} reshape={reshape} />
  </StoryProductFrame>;
};

export const StoryAssimilation: React.FC = () => <StoryAssimilationScene frame={useCurrentFrame()} />;
