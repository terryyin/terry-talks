import React from 'react';
import {Composition} from 'remotion';
import {StoryDrivenDevelopment} from '../parts/StoryDrivenScene';
import {storyDrivenOpeningDuration, storyDrivenTimeline} from '../parts/StoryDrivenTimeline';

export const StoryDrivenDevelopmentComposition: React.FC = () => <Composition
  id="StoryDrivenDevelopment"
  component={StoryDrivenDevelopment}
  durationInFrames={storyDrivenOpeningDuration}
  fps={storyDrivenTimeline.fps}
  width={1080}
  height={1080}
/>;
