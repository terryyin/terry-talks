import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {AnimeEngineerScene, AnimeEngineerSceneComposition, AnimeSceneProps} from '../../src/animeCharacter/AnimeEngineerScene';
import {animeSceneScript, listeningReaction} from '../../src/animeCharacter/script';
import type {ConversationScript} from '../../src/illustratedConversation/script';
import {setFrame, withSavedTakeFetch} from '../illustratedConversation/testSupport';

jest.mock('remotion',()=>jest.requireActual('../illustratedConversation/testSupport').mockRemotion());

type Registered = {id:string;component:React.FC<AnimeSceneProps>;durationInFrames:number;width:number;height:number;fps:number;calculateMetadata:(input:{props:AnimeSceneProps})=>Promise<{durationInFrames:number}>};
const registration=()=>AnimeEngineerSceneComposition({}) as React.ReactElement<Registered>;
const draw=(frame:number,script=animeSceneScript)=>{
 setFrame(frame);
 const Scene=registration().props.component;
 return renderToStaticMarkup(<Scene script={script}/>);
};
const documentAt=(frame:number,script=animeSceneScript)=>new DOMParser().parseFromString(draw(frame,script),'text/html');
const select=(frame:number,selector:string,script=animeSceneScript)=>documentAt(frame,script).querySelector(selector)!;
const clone=():ConversationScript=>JSON.parse(JSON.stringify(animeSceneScript));
const actor=(frame:number,script=animeSceneScript)=>select(frame,'[data-testid="anime-engineer"]',script);
const mouth=(frame:number,script=animeSceneScript)=>select(frame,'[data-testid="anime-mouth"]',script);
const caption=(frame:number,script=animeSceneScript)=>select(frame,'[data-testid="anime-caption"]',script).textContent;
const openness=(frame:number)=>Number(select(frame,'[data-testid="anime-eye"]').getAttribute('data-openness'));

test('signed smile direction renders a neutral closed mouth, lifts its corners for a smile, and lowers them for concern',()=>{
 const directed=(smile:number)=>{
  const script=clone();script.acting=[];
  script.initial.ai.face={...script.initial.ai.face!,smile};
  return mouth(0,script);
 };
 const neutral=directed(0),smiling=directed(0.2),concerned=directed(-0.2);
 const centerControl=(element:Element)=>Number(element.querySelector('path')!.getAttribute('d')!.match(/Q0 ([-\d.]+)/)![1]);
 expect(centerControl(smiling)).toBeGreaterThan(centerControl(neutral));
 expect(centerControl(concerned)).toBeLessThan(centerControl(neutral));
 expect(centerControl(neutral)).toBe(-0.5);
 expect(centerControl(concerned)).toBeLessThan(-1);
 expect(centerControl(smiling)).toBeGreaterThan(0);
 for(const element of [neutral,smiling,concerned]) expect(element.getAttribute('data-shape')).toBe('rest');
 expect(select(144,'[data-testid="anime-mouth"]').querySelector('path')!.getAttribute('d')).toBe('M-19 0Q0 -5 20 -1');
});

test('registered complete scene contains both full saved speech slots, the listening pause, and the entire tail',()=>{
 expect(registration().props).toMatchObject({id:'AnimeEngineerScene',component:AnimeEngineerScene,width:1080,height:1080,fps:30,durationInFrames:318});
 const picture=documentAt(20);
 const slots=[...picture.querySelectorAll('[data-audio-from]')];
 expect(slots.map(slot=>[slot.getAttribute('data-audio-from'),slot.getAttribute('data-audio-duration'),slot.querySelector('[data-audio-source]')!.getAttribute('data-audio-source')!.split('/').pop()])).toEqual([
  ['15','144','question.wav'],['195','99','reconsider.wav'],
 ]);
 for(const frame of [15,36,78,144,158]) expect(caption(frame)).toBe('Passing which tests? Did we check what the customer actually needed?');
 for(const frame of [195,210,238,259,293]) expect(caption(frame)).toBe("I checked the code I wrote. I didn't ask that.");
 for(const frame of [0,14,159,180,194,294,317]) expect(caption(frame)).toBe('');
 expect(picture.body.textContent).toContain('CEDAR & MARIN · OPENAI SYNTHETIC VOICES');
 expect(picture.querySelectorAll('[data-testid="anime-engineer"]')).toHaveLength(1);
});

test('visible engineer listens with a quiet speech mouth, keeps acting during the captionless pause, and articulates the saved reply',()=>{
 for(const frame of [0,15,36,54,78,108,144,158,159,175,194,195,238,245,250,255,290,293,294,317]) expect(mouth(frame).getAttribute('data-shape')).toBe('rest');
 expect(mouth(198).getAttribute('data-shape')).toBe('open');
 expect(mouth(205).getAttribute('data-shape')).toBe('wide');
 expect(mouth(216).getAttribute('data-shape')).toBe('round');
 expect(mouth(198).innerHTML).not.toBe(mouth(205).innerHTML);
 expect(mouth(216).innerHTML).not.toBe(mouth(198).innerHTML);
 expect(actor(159).outerHTML).not.toBe(actor(180).outerHTML);
 expect(select(159,'[data-testid="anime-arm"]').getAttribute('data-hand')).not.toBe(select(180,'[data-testid="anime-arm"]').getAttribute('data-hand'));
 expect(actor(238).outerHTML).not.toBe(actor(250).outerHTML);
 expect(openness(245)).toBeLessThan(0.1);
 expect(openness(250)).toBeGreaterThan(0.3);
 expect(actor(294).outerHTML).not.toBe(actor(317).outerHTML);
});

test('surprised listening deforms brows and lids with coordinated gaze, head and attached foreground wrists, then reconsiders',()=>{
 const focused=actor(15),surprised=actor(54),considered=actor(144);
 expect(openness(54)).toBeGreaterThan(openness(15)+0.3);
 expect(openness(144)).toBeLessThan(openness(54)-0.5);
 expect(select(54,'[data-testid="anime-brow"]').getAttribute('d')).not.toBe(select(15,'[data-testid="anime-brow"]').getAttribute('d'));
 expect(Number(surprised.getAttribute('data-gaze'))).toBeLessThan(Number(focused.getAttribute('data-gaze')));
 expect(Number(considered.getAttribute('data-gaze'))).toBeGreaterThan(0);
 expect(select(54,'[data-testid="anime-head"]').getAttribute('transform')).toBe('rotate(-4 0 -316)');
 expect(select(144,'[data-testid="anime-head"]').getAttribute('transform')).toBe('rotate(4 0 -316)');
 for(const frame of [0,36,54,108,144,159,189,195,238,259,317]) {
  const picture=documentAt(frame);
  const rear=picture.querySelector('[data-testid="anime-rear-hair"]')!;
  const neck=picture.querySelector('[data-testid="anime-neck"]')!;
  const face=picture.querySelector('[data-testid="anime-face"]')!;
  expect(rear.compareDocumentPosition(neck)&Node.DOCUMENT_POSITION_FOLLOWING).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  expect(neck.compareDocumentPosition(face)&Node.DOCUMENT_POSITION_FOLLOWING).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  for(const arm of picture.querySelectorAll('[data-testid="anime-arm"]')) {
   const hand=arm.getAttribute('data-hand')!.split(',').map(Number);
   expect(arm.querySelector('[data-testid="anime-hand"]')!.getAttribute('transform')!.startsWith(`translate(${hand[0]} ${hand[1]})`)).toBe(true);
   expect(neck.compareDocumentPosition(arm)&Node.DOCUMENT_POSITION_FOLLOWING).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  }
 }
});

test('rendered gaze, head, lids and wrists remain continuous through gesture joins, listening handover and clause gap',()=>{
 for(const frame of [15,35,54,77,108,144,159,189,195,210,238,245,250,259,291,294,309]) {
  const before=actor(frame-1),after=actor(frame);
  expect(Math.abs(Number(after.getAttribute('data-tilt'))-Number(before.getAttribute('data-tilt')))).toBeLessThan(0.3);
  expect(Math.abs(Number(after.getAttribute('data-gaze'))-Number(before.getAttribute('data-gaze')))).toBeLessThan(0.1);
  expect(Math.abs(openness(frame)-openness(frame-1))).toBeLessThan(0.15);
  const wrists=(element:Element)=>[...element.querySelectorAll('[data-testid="anime-arm"]')].map(arm=>arm.getAttribute('data-hand')!.split(',').map(Number));
  const from=wrists(before),to=wrists(after);
  to.forEach((wrist,index)=>expect(Math.hypot(wrist[0]-from[index][0],wrist[1]-from[index][1])).toBeLessThan(4));
 }
});

test('direct, forward, reverse and fresh entry agree at complete-scene transitions; a frozen score loses visible acting',()=>{
 const frames=[0,15,36,54,78,108,144,158,159,180,194,195,205,216,238,245,250,259,293,294,317];
 const direct=frames.map(frame=>draw(frame));
 expect([...frames].reverse().map(frame=>draw(frame)).reverse()).toEqual(direct);
 setFrame(180);
 expect(renderToStaticMarkup(React.createElement(registration().props.component))).toBe(direct[frames.indexOf(180)]);
 expect(new Set([15,54,108,144,180,245,259,317].map(frame=>actor(frame).innerHTML)).size).toBe(8);
 const frozen=clone();frozen.acting=[];
 for(const frame of [54,180,238]) expect(actor(frame,frozen).innerHTML).not.toBe(actor(frame).innerHTML);
 expect(mouth(216,frozen).innerHTML).toBe(mouth(216).innerHTML);
 expect(caption(216,frozen)).toBe(caption(216));
});

test('script-owned speech and pause edits move sound, caption and acting together and retain closed reaction anchors',()=>{
 const longer=clone();longer.turns[0].pauseAfter+=1;
 const picture=documentAt(220,longer);
 expect(caption(220,longer)).toBe('');
 expect(mouth(220,longer).getAttribute('data-shape')).toBe('rest');
 expect(picture.querySelector('[data-audio-from="225"]')!.getAttribute('data-audio-duration')).toBe('99');
 expect(caption(226,longer)).toBe("I checked the code I wrote. I didn't ask that.");
 expect(actor(225,longer).innerHTML).toBe(actor(195).innerHTML);
 const anchors=[listeningReaction.entry,listeningReaction.exit].map(anchor=>animeSceneScript.acting.find(cue=>cue.turn===anchor.turn&&cue.offset===anchor.offset)!.pose);
 for(const anchor of anchors) expect(Object.keys(anchor).sort()).toEqual(['face','gaze','leftHand','mood','rightHand','tilt']);
});

test('actual selected question and reply bytes are verified by registered metadata before rendering',async()=>{
 await withSavedTakeFetch(async requested=>{
  await expect(registration().props.calculateMetadata({props:{}})).resolves.toEqual({durationInFrames:318});
  expect(requested).toEqual(['assets/illustrated-conversation/question.wav','assets/illustrated-conversation/reconsider.wav']);
  const stale=clone();stale.turns[0].mouth.takeSha256='stale';
  await expect(registration().props.calculateMetadata({props:{script:stale}})).rejects.toThrow(/Turn question.*review mouth cues/);
 });
});
