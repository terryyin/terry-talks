import React, {useMemo} from 'react';
import {AbsoluteFill, Audio, Composition, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {AI, Engineer} from '../aiTestAutomation/actors';
import {BODY, Definitions, palette} from '../aiTestAutomation/design';
import {blinkAt} from '../aiTestAutomation/motion';
import {compileConversation, Performance, verifyConversationAssets} from './performance';
import {ConversationScript, pilotScript} from './script';

export const ConversationPicture: React.FC<{performance: Performance; frame: number; fps: number}> = ({performance,frame,fps}) => {
 const engineer=performance.actors.engineer;
 const ai=performance.actors.ai;
 return <svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg" data-testid="conversation-picture" data-turn={performance.turn}>
  <Definitions/>
  <rect width="1080" height="1080" fill="url(#warm-wall)"/>
  <ellipse cx="540" cy="485" rx="495" ry="335" fill={palette.cream} opacity="0.48"/>
  <path d="M0 802H1080V1080H0Z" fill="#EBD6BE"/>
  <path d="M80 802H1000" stroke="#C5A586" strokeWidth="3"/>
  <Engineer x={280} y={805} scale={1.55} mood={engineer.mood} gaze={engineer.gaze} headTilt={engineer.tilt} leftHand={engineer.leftHand} rightHand={engineer.rightHand} speechMouth={engineer.mouth} blink={blinkAt(frame/fps,[0.3,3.7,6.0,8.9])}/>
  <AI x={755} y={805} scale={2.35} mood={ai.mood} gaze={ai.gaze} tilt={ai.tilt} leftHand={ai.leftHand} rightHand={ai.rightHand} speechMouth={ai.mouth} blink={blinkAt(frame/fps,[0.3,4.8,6.1,8.9])}/>
  <text x="280" y="875" textAnchor="middle" fontFamily={BODY} fontSize="23" fill={palette.muted} letterSpacing="3">ENGINEER</text>
  <text x="755" y="875" textAnchor="middle" fontFamily={BODY} fontSize="23" fill={palette.muted} letterSpacing="3">AI</text>
  <rect width="1080" height="1080" filter="url(#paper-grain)" fill="transparent" pointerEvents="none"/>
 </svg>;
};

export const IllustratedConversation: React.FC<{script?: ConversationScript}> = ({script=pilotScript}) => {
 const frame=useCurrentFrame();
 const {fps}=useVideoConfig();
 const performance=useMemo(()=>compileConversation(script,fps),[script,fps]);
 const picture=performance.sample(frame);
 return <AbsoluteFill style={{background:palette.paper}}>
  <ConversationPicture performance={picture} frame={frame} fps={fps}/>
  <div data-testid="conversation-caption" style={{position:'absolute',left:85,right:85,bottom:88,minHeight:104,color:palette.ink,fontFamily:BODY,fontSize:37,fontWeight:600,lineHeight:1.35,textAlign:'center',display:'flex',alignItems:'center',justifyContent:'center'}}>{picture.caption}</div>
  <div style={{position:'absolute',bottom:25,width:'100%',textAlign:'center',fontFamily:BODY,fontSize:15,letterSpacing:2,color:palette.muted}}>CEDAR + MARIN · SYNTHETIC VOICES</div>
  {performance.turns.map(turn=><Sequence key={turn.id} name={`${turn.id} · ${turn.speaker}`} from={turn.from} durationInFrames={turn.durationInFrames} premountFor={fps}><Audio src={staticFile(turn.take.file)}/></Sequence>)}
 </AbsoluteFill>;
};

export const IllustratedConversationComposition: React.FC = () => <Composition
 id="IllustratedConversationPilot"
 component={IllustratedConversation}
 durationInFrames={compileConversation(pilotScript,30).durationInFrames}
 calculateMetadata={async ({props}: {props: {script?: ConversationScript}})=>{
  const script=props.script ?? pilotScript;
  const compiled=compileConversation(script,30);
  await verifyConversationAssets(script,async file=>{
   const response=await fetch(staticFile(file));
   if (!response.ok) throw new Error(`HTTP ${response.status}`);
   return response.arrayBuffer();
  },async bytes=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),byte=>byte.toString(16).padStart(2,'0')).join(''));
  return {durationInFrames:compiled.durationInFrames};
 }}
 fps={30}
 width={1080}
 height={1080}
/>;
