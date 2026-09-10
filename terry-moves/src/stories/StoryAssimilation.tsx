import React from 'react';
import {Composition} from 'remotion';
import {StoryAssimilation} from '../parts/StoryAssimilation';
import {assimilationTimeline} from '../parts/StoryAssimilationTimeline';

export const StoryAssimilationComposition: React.FC = () => <Composition
  id="StoryAssimilation"
  component={StoryAssimilation}
  durationInFrames={assimilationTimeline.durationInFrames}
  fps={assimilationTimeline.fps}
  width={1080}
  height={1080}
/>;
