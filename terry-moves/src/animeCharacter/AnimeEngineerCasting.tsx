import React from 'react';
import type {ConversationScript} from '../illustratedConversation/script';
import {AnimeEngineerPerformance} from './AnimeEngineerPerformance';
import {animeEngineerComposition} from './composition';
import {castingScript} from './script';

export type CastingProps = {script?:ConversationScript};

export const AnimeEngineerCasting: React.FC<CastingProps> = ({script=castingScript}) => <AnimeEngineerPerformance
 script={script}
 title="ENGINEER · CASTING REHEARSAL"
 voiceCredit="MARIN · OPENAI SYNTHETIC VOICE"
 cast={{engineer:'off-screen colleague',ai:'engineer'}}
/>;

export const AnimeEngineerCastingComposition: React.FC = () => animeEngineerComposition('AnimeEngineerCasting',AnimeEngineerCasting,castingScript);
