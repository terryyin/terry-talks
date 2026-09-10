import React from 'react';
import {Composition} from 'remotion';
import {StoryMissileImpact} from '../parts/StoryMissileImpact';
import {assimilationTimeline} from '../parts/StoryAssimilationTimeline';

export const StoryMissileImpactComposition: React.FC = () => <Composition
  id="StoryMissileImpact"
  component={StoryMissileImpact}
  durationInFrames={assimilationTimeline.durationInFrames}
  fps={assimilationTimeline.fps}
  width={1080}
  height={1080}
/>;
