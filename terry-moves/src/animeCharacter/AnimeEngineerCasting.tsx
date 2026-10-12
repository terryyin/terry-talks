import React from 'react';
import {Composition} from 'remotion';
import {compileConversation} from '../illustratedConversation/performance';
import {conversationMetadata} from '../illustratedConversation/metadata';
import type {ConversationScript} from '../illustratedConversation/script';
import {AnimeEngineerPerformance} from './AnimeEngineerPerformance';
import {castingScript} from './script';

export type CastingProps = {script?:ConversationScript};
const compositionFps=30;

export const AnimeEngineerCasting: React.FC<CastingProps> = ({script=castingScript}) => <AnimeEngineerPerformance
 script={script}
 title="ENGINEER · CASTING REHEARSAL"
 voiceCredit="MARIN · OPENAI SYNTHETIC VOICE"
 cast={{engineer:'off-screen colleague',ai:'engineer'}}
/>;

export const AnimeEngineerCastingComposition: React.FC = () => <Composition
 id="AnimeEngineerCasting"
 component={AnimeEngineerCasting}
 fps={compositionFps}
 width={1080}
 height={1080}
 durationInFrames={compileConversation(castingScript,compositionFps).durationInFrames}
 calculateMetadata={conversationMetadata(castingScript,compositionFps)}
/>;
