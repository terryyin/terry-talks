import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {AnimeEngineerScene, AnimeEngineerSceneComposition, AnimeSceneProps} from '../../src/animeCharacter/AnimeEngineerScene';
import {AnimeEngineerThoughtful, AnimeEngineerThoughtfulComposition} from '../../src/animeCharacter/AnimeEngineerThoughtful';
import {animeSceneScript, listeningReaction, thoughtfulAnimeSceneScript} from '../../src/animeCharacter/script';
import {compileConversation} from '../../src/illustratedConversation/performance';
import type {ConversationScript} from '../../src/illustratedConversation/script';
import {setFrame, withSavedTakeFetch} from '../illustratedConversation/testSupport';

jest.mock('remotion',()=>jest.requireActual('../illustratedConversation/testSupport').mockRemotion());

type Version='baseline'|'thoughtful';
type Registered={id:string;component:React.FC<AnimeSceneProps>;durationInFrames:number;width:number;height:number;fps:number;calculateMetadata:(input:{props:AnimeSceneProps})=>Promise<{durationInFrames:number}>};
const registrations={baseline:AnimeEngineerSceneComposition({}) as React.ReactElement<Registered>,thoughtful:AnimeEngineerThoughtfulComposition({}) as React.ReactElement<Registered>};
const scores={baseline:animeSceneScript,thoughtful:thoughtfulAnimeSceneScript};
const draw=(version:Version,frame:number,script?:ConversationScript)=>{
 setFrame(frame);
 const Scene=registrations[version].props.component;
 return renderToStaticMarkup(<Scene script={script}/>);
};
const picture=(version:Version,frame:number,script?:ConversationScript)=>new DOMParser().parseFromString(draw(version,frame,script),'text/html');
const select=(version:Version,frame:number,selector:string,script?:ConversationScript)=>picture(version,frame,script).querySelector(selector)!;
const actor=(version:Version,frame:number,script?:ConversationScript)=>select(version,frame,'[data-testid="anime-engineer"]',script);
const reactionFrames=(script:ConversationScript,fps=30)=>{
 const film=compileConversation(script,fps);
 return [listeningReaction.entry,listeningReaction.exit].map(anchor=>film.turns.find(turn=>turn.id===anchor.turn)!.from+Math.round(anchor.offset*fps));
};
const [entry,exit]=reactionFrames(animeSceneScript);
const thoughtfulJoins=thoughtfulAnimeSceneScript.acting.map(cue=>{
 const turn=compileConversation(thoughtfulAnimeSceneScript,30).turns.find(range=>range.id===cue.turn)!;
 return turn.from+Math.round(cue.offset*30);
}).filter(frame=>frame>=entry&&frame<=exit);

test('both named registrations select their retained scores and identical measured film dimensions',()=>{
 expect(registrations.baseline.props).toMatchObject({id:'AnimeEngineerScene',component:AnimeEngineerScene,width:1080,height:1080,fps:30,durationInFrames:318});
 expect(registrations.thoughtful.props).toMatchObject({id:'AnimeEngineerThoughtful',component:AnimeEngineerThoughtful,width:1080,height:1080,fps:30,durationInFrames:318});
 expect(draw('baseline',54)).toBe(draw('baseline',54,animeSceneScript));
 expect(draw('thoughtful',54)).toBe(draw('thoughtful',54,thoughtfulAnimeSceneScript));
});

test('thoughtful direction changes actual gaze, head, brows, lids and inward wrist movement instead of the early surprise',()=>{
 const baseline=actor('baseline',54),thoughtful=actor('thoughtful',54);
 expect(Number(thoughtful.getAttribute('data-gaze'))).toBeGreaterThan(Number(baseline.getAttribute('data-gaze'))+0.2);
 expect(Number(thoughtful.getAttribute('data-tilt'))).toBeGreaterThan(0);
 expect(Number(baseline.getAttribute('data-tilt'))).toBeLessThan(0);
 const openness=(version:Version,frame:number)=>Number(select(version,frame,'[data-testid="anime-eye"]').getAttribute('data-openness'));
 expect(openness('thoughtful',54)).toBeLessThan(openness('baseline',54)-0.3);
 expect(select('thoughtful',54,'[data-testid="anime-brow"]').getAttribute('d')).not.toBe(select('baseline',54,'[data-testid="anime-brow"]').getAttribute('d'));
 const earlyHand=select('thoughtful',54,'[data-testid="anime-arm"]').getAttribute('data-hand')!.split(',').map(Number);
 const laterHand=select('thoughtful',98,'[data-testid="anime-arm"]').getAttribute('data-hand')!.split(',').map(Number);
 expect(earlyHand[1]).toBeGreaterThan(-130);
 expect(laterHand[0]).toBeGreaterThan(earlyHand[0]+70);
 expect(laterHand[1]).toBeLessThan(earlyHand[1]-100);
 expect(Number(actor('thoughtful',98).getAttribute('data-gaze'))).toBeGreaterThan(0.6);
 expect(Number(actor('thoughtful',98).getAttribute('data-tilt'))).toBeGreaterThan(5.5);
 expect(openness('thoughtful',105)).toBeLessThan(0.1);
 expect(openness('thoughtful',112)).toBeGreaterThan(0.5);
 expect(actor('thoughtful',54).innerHTML).not.toBe(actor('thoughtful',98).innerHTML);
});

test('shared full anchors preserve every actual picture outside the cue-derived listening interval',()=>{
 expect(reactionFrames(thoughtfulAnimeSceneScript)).toEqual([entry,exit]);
 const anchorPoses=(script:ConversationScript)=>[listeningReaction.entry,listeningReaction.exit].map(anchor=>script.acting.find(cue=>cue.turn===anchor.turn&&cue.offset===anchor.offset)!.pose);
 expect(anchorPoses(thoughtfulAnimeSceneScript)).toEqual(anchorPoses(animeSceneScript));
 for(let frame=0;frame<registrations.baseline.props.durationInFrames;frame++) {
  if(frame<=entry||frame>=exit) expect(draw('thoughtful',frame)).toBe(draw('baseline',frame));
 }
 const longer=JSON.parse(JSON.stringify(thoughtfulAnimeSceneScript)) as ConversationScript;
 longer.lead+=0.5;longer.turns[0].pauseAfter+=1;
 const [shiftedEntry,shiftedExit]=reactionFrames(longer);
 expect(shiftedEntry).toBe(entry+15);
 expect(shiftedExit).toBe(exit+45);
 expect(actor('thoughtful',shiftedEntry,longer).outerHTML).toBe(actor('baseline',entry).outerHTML);
 expect(actor('thoughtful',shiftedExit,longer).outerHTML).toBe(actor('baseline',exit).outerHTML);
});

test('all frames retain the actual captions, take-bound speech mouth schedule and complete audio slots',()=>{
 expect(thoughtfulAnimeSceneScript.takes).toBe(animeSceneScript.takes);
 expect(thoughtfulAnimeSceneScript.turns).toBe(animeSceneScript.turns);
 for(let frame=0;frame<318;frame++) {
  const baseline=picture('baseline',frame),thoughtful=picture('thoughtful',frame);
  expect(thoughtful.querySelector('[data-testid="anime-caption"]')!.outerHTML).toBe(baseline.querySelector('[data-testid="anime-caption"]')!.outerHTML);
  expect(thoughtful.querySelector('[data-testid="anime-mouth"]')!.getAttribute('data-shape')).toBe(baseline.querySelector('[data-testid="anime-mouth"]')!.getAttribute('data-shape'));
  expect([...thoughtful.querySelectorAll('[data-audio-from]')].map(slot=>slot.outerHTML)).toEqual([...baseline.querySelectorAll('[data-audio-from]')].map(slot=>slot.outerHTML));
 }
 for(const version of ['baseline','thoughtful'] as const) {
  const film=compileConversation(scores[version],30);
  expect(film.turns.map(turn=>[turn.id,turn.from,turn.durationInFrames])).toEqual([['question',15,144],['reconsider',195,99]]);
 }
});

test('the revised actual head, gaze, lids and attached foreground wrists enter and leave every target continuously',()=>{
 for(const frame of thoughtfulJoins) {
  const before=actor('thoughtful',frame-1),after=actor('thoughtful',frame);
  expect(Math.abs(Number(after.getAttribute('data-tilt'))-Number(before.getAttribute('data-tilt')))).toBeLessThan(0.4);
  expect(Math.abs(Number(after.getAttribute('data-gaze'))-Number(before.getAttribute('data-gaze')))).toBeLessThan(0.1);
  const openness=(element:Element)=>Number(element.querySelector('[data-testid="anime-eye"]')!.getAttribute('data-openness'));
  expect(Math.abs(openness(after)-openness(before))).toBeLessThan(0.15);
  const wrists=(element:Element)=>[...element.querySelectorAll('[data-testid="anime-arm"]')].map(arm=>arm.getAttribute('data-hand')!.split(',').map(Number));
  const from=wrists(before),to=wrists(after);
  to.forEach((wrist,index)=>expect(Math.hypot(wrist[0]-from[index][0],wrist[1]-from[index][1])).toBeLessThan(4));
  const rear=after.querySelector('[data-testid="anime-rear-hair"]')!,neck=after.querySelector('[data-testid="anime-neck"]')!,face=after.querySelector('[data-testid="anime-face"]')!;
  expect(rear.parentElement!.getAttribute('transform')).toBe(face.parentElement!.getAttribute('transform'));
  expect(rear.compareDocumentPosition(neck)&Node.DOCUMENT_POSITION_FOLLOWING).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  for(const arm of after.querySelectorAll('[data-testid="anime-arm"]')) {
   const hand=arm.getAttribute('data-hand')!.split(',');
   expect(arm.querySelector('[data-testid="anime-hand"]')!.getAttribute('transform')!.startsWith(`translate(${hand[0]} ${hand[1]})`)).toBe(true);
   expect(neck.compareDocumentPosition(arm)&Node.DOCUMENT_POSITION_FOLLOWING).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  }
 }
});

test('direct, reverse and fresh revised entry agree and a frozen score loses visibly changing listening',()=>{
 const frames=[entry,...thoughtfulJoins,exit,194,195,216,245,317];
 const direct=frames.map(frame=>draw('thoughtful',frame));
 expect([...frames].reverse().map(frame=>draw('thoughtful',frame)).reverse()).toEqual(direct);
 const Scene=registrations.thoughtful.props.component;
 setFrame(170);
 expect(renderToStaticMarkup(<Scene/>)).toBe(draw('thoughtful',170));
 const frozen=JSON.parse(JSON.stringify(thoughtfulAnimeSceneScript)) as ConversationScript;
 frozen.acting=[];
 for(const frame of [54,98,153,170]) expect(actor('thoughtful',frame,frozen).innerHTML).not.toBe(actor('thoughtful',frame).innerHTML);
 // The blink intentionally returns to the same considered pose at 112.
 expect(new Set([44,84,98,105,153,170].map(frame=>actor('thoughtful',frame).innerHTML)).size).toBe(6);
 expect(select('thoughtful',216,'[data-testid="anime-mouth"]',frozen).innerHTML).toBe(select('thoughtful',216,'[data-testid="anime-mouth"]').innerHTML);
});

test('both named metadata paths verify the identical saved inputs before local reproduction',async()=>{
 for(const version of ['baseline','thoughtful'] as const) {
  await withSavedTakeFetch(async requested=>{
   await expect(registrations[version].props.calculateMetadata({props:{}})).resolves.toEqual({durationInFrames:318});
   expect(requested).toEqual(['assets/illustrated-conversation/question.wav','assets/illustrated-conversation/reconsider.wav']);
  });
 }
});
