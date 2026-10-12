import React from 'react';
import {Composition} from 'remotion';
import {compileConversation} from '../illustratedConversation/performance';
import {conversationMetadata} from '../illustratedConversation/metadata';
import type {ConversationScript} from '../illustratedConversation/script';

const compositionFps=30;

// Every named engineer performance uses the same production frame and verifies
// its selected saved takes before rendering; only its component and score vary.
export const animeEngineerComposition = (
 id:string,
 component:React.FC<{script?:ConversationScript}>,
 script:ConversationScript,
) => <Composition
 id={id}
 component={component}
 fps={compositionFps}
 width={1080}
 height={1080}
 durationInFrames={compileConversation(script,compositionFps).durationInFrames}
 calculateMetadata={conversationMetadata(script,compositionFps)}
/>;
