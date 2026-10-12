import React from 'react';
import {Composition} from 'remotion';
import {compileConversation} from '../illustratedConversation/performance';
import {conversationMetadata} from '../illustratedConversation/metadata';
import type {ConversationScript} from '../illustratedConversation/script';
import {AnimeEngineerPerformance} from './AnimeEngineerPerformance';
import {animeSceneScript} from './script';

export type AnimeSceneProps = {script?:ConversationScript};
const compositionFps=30;

export const AnimeEngineerScene: React.FC<AnimeSceneProps> = ({script=animeSceneScript}) => <AnimeEngineerPerformance
 script={script}
 title="ENGINEER · WHICH TESTS?"
 voiceCredit="CEDAR & MARIN · OPENAI SYNTHETIC VOICES"
 cast={{engineer:'off-screen colleague',ai:'engineer'}}
/>;

export const AnimeEngineerSceneComposition: React.FC = () => <Composition
 id="AnimeEngineerScene"
 component={AnimeEngineerScene}
 fps={compositionFps}
 width={1080}
 height={1080}
 durationInFrames={compileConversation(animeSceneScript,compositionFps).durationInFrames}
 calculateMetadata={conversationMetadata(animeSceneScript,compositionFps)}
/>;
