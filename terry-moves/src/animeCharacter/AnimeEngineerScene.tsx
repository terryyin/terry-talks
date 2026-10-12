import React from 'react';
import type {ConversationScript} from '../illustratedConversation/script';
import {AnimeEngineerPerformance} from './AnimeEngineerPerformance';
import {animeEngineerComposition} from './composition';
import {animeSceneScript} from './script';

export type AnimeSceneProps = {script?:ConversationScript};

export const AnimeEngineerScene: React.FC<AnimeSceneProps> = ({script=animeSceneScript}) => <AnimeEngineerPerformance
 script={script}
 title="ENGINEER · WHICH TESTS?"
 voiceCredit="CEDAR & MARIN · OPENAI SYNTHETIC VOICES"
 cast={{engineer:'off-screen colleague',ai:'engineer'}}
/>;

export const AnimeEngineerSceneComposition: React.FC = () => animeEngineerComposition('AnimeEngineerScene',AnimeEngineerScene,animeSceneScript);
