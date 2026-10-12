import {staticFile} from 'remotion';
import {compileConversation, verifyConversationAssets} from './performance';
import type {ConversationScript} from './script';

// All dialogue compositions measure and verify the same selected-input contract.
export const conversationMetadata=(defaultScript:ConversationScript,fps:number)=>async ({props}: {props:{script?:ConversationScript}})=>{
 const script=props.script??defaultScript;
 const compiled=compileConversation(script,fps);
 await verifyConversationAssets(script,async file=>{
  const response=await fetch(staticFile(file));
  if(!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.arrayBuffer();
 },async bytes=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),byte=>byte.toString(16).padStart(2,'0')).join(''));
 return {durationInFrames:compiled.durationInFrames};
};
