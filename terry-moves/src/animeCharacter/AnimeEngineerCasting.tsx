import React, {useMemo} from 'react';
import {AbsoluteFill, Audio, Composition, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {compileConversation} from '../illustratedConversation/performance';
import {conversationMetadata} from '../illustratedConversation/metadata';
import type {ConversationScript} from '../illustratedConversation/script';
import {AnimeEngineer} from './AnimeEngineer';
import {castingScript} from './script';

export type CastingProps = {script?:ConversationScript};
const compositionFps=30;

export const AnimeEngineerCasting: React.FC<CastingProps> = ({script=castingScript}) => {
 const frame=useCurrentFrame();
 const {fps}=useVideoConfig();
 const film=useMemo(()=>compileConversation(script,fps),[script,fps]);
 const performance=film.sample(frame);
 return <AbsoluteFill style={{background:'#E7E3D9'}}>
  <svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg" data-testid="anime-picture" data-turn={performance.turn}>
   <defs>
    <linearGradient id="anime-wall" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#ECE8DD"/><stop offset="1" stopColor="#DADDD5"/></linearGradient>
    <radialGradient id="anime-light"><stop stopColor="#FFF3DB"/><stop offset="1" stopColor="#FFF3DB" stopOpacity="0"/></radialGradient>
   </defs>
   <rect width="1080" height="1080" fill="url(#anime-wall)"/>
   <circle cx="458" cy="389" r="432" fill="url(#anime-light)"/>
   <path d="M94 105V748M986 105V748" fill="none" stroke="#C7CDC4" strokeWidth="2"/>
   <path d="M94 220H270M94 226H244M820 220H986M846 226H986" fill="none" stroke="#CFD2C8" strokeWidth="3"/>
   <rect x="115" y="317" width="157" height="182" rx="6" fill="#DDE2D8" stroke="#C5CEC6" strokeWidth="2"/>
   <path d="M139 352H248M139 379H217M139 406H235M139 466H219M146 442l9-9 8 9m57-9 9 9 9-9" fill="none" stroke="#BFCABF" strokeWidth="3" strokeLinecap="round"/>
   <ellipse cx="550" cy="849" rx="323" ry="33" fill="#526A64" opacity="0.1"/>
   <AnimeEngineer pose={performance.actors.ai}/>
   <path d="M0 884H1080V1080H0Z" fill="#E7E3D9"/>
   <path d="M80 884H1000" stroke="#B8C4BB" strokeWidth="2"/>
  </svg>
  <div data-testid="anime-caption" style={{position:'absolute',left:90,right:90,top:909,height:112,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Arial, sans-serif',fontSize:37,lineHeight:1.35,fontWeight:500,textAlign:'center',color:'#313B43'}}>{performance.caption}</div>
  <div style={{position:'absolute',left:90,top:65,fontFamily:'Arial, sans-serif',fontSize:21,letterSpacing:3,color:'#60756F'}}>ENGINEER · CASTING REHEARSAL</div>
  <div style={{position:'absolute',bottom:22,width:'100%',textAlign:'center',fontFamily:'Arial, sans-serif',fontSize:16,letterSpacing:1.5,color:'#63756F'}}>MARIN · OPENAI SYNTHETIC VOICE</div>
  {film.turns.map(turn=><Sequence key={turn.id} name={`${turn.id} · engineer`} from={turn.from} durationInFrames={turn.durationInFrames} premountFor={fps}><Audio src={staticFile(turn.take.file)}/></Sequence>)}
 </AbsoluteFill>;
};

export const AnimeEngineerCastingComposition: React.FC = () => <Composition
 id="AnimeEngineerCasting"
 component={AnimeEngineerCasting}
 fps={compositionFps}
 width={1080}
 height={1080}
 durationInFrames={compileConversation(castingScript,compositionFps).durationInFrames}
 calculateMetadata={conversationMetadata(castingScript,compositionFps)}
/>;
