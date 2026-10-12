import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {AnimeEngineerCasting, AnimeEngineerCastingComposition, CastingProps} from '../../src/animeCharacter/AnimeEngineerCasting';
import {castingScript} from '../../src/animeCharacter/script';
import {compileConversation} from '../../src/illustratedConversation/performance';
import type {ConversationScript} from '../../src/illustratedConversation/script';
import {setFrame, withSavedTakeFetch} from '../illustratedConversation/testSupport';

jest.mock('remotion',()=>jest.requireActual('../illustratedConversation/testSupport').mockRemotion());

type Registered = {id:string;component:React.FC<CastingProps>;durationInFrames:number;width:number;height:number;fps:number;calculateMetadata:(input:{props:CastingProps})=>Promise<{durationInFrames:number}>};
const registration=()=>AnimeEngineerCastingComposition({}) as React.ReactElement<Registered>;
const draw=(frame:number,script=castingScript)=>{
 setFrame(frame);
 const Scene=registration().props.component;
 return renderToStaticMarkup(<Scene script={script}/>);
};
const documentAt=(frame:number,script=castingScript)=>new DOMParser().parseFromString(draw(frame,script),'text/html');
const select=(frame:number,selector:string,script=castingScript)=>documentAt(frame,script).querySelector(selector)!;
const clone=():ConversationScript=>JSON.parse(JSON.stringify(castingScript));

test('rear hair paints behind the neck while the face stays in front throughout head tilts',()=>{
 for(const frame of [0,21,41,98,112]) {
  const picture=documentAt(frame);
  const rear=picture.querySelector('[data-testid="anime-rear-hair"]')!;
  const neck=picture.querySelector('[data-testid="anime-neck"]')!;
  const face=picture.querySelector('[data-testid="anime-face"]')!;
  expect(rear.compareDocumentPosition(neck)&Node.DOCUMENT_POSITION_FOLLOWING).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  expect(neck.compareDocumentPosition(face)&Node.DOCUMENT_POSITION_FOLLOWING).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  expect(rear.parentElement!.getAttribute('transform')).toBe(face.parentElement!.getAttribute('transform'));
 }
});

test('the registered rehearsal casts the saved reconsider reply with a silent lead, measured sound and captions',()=>{
 expect(registration().props).toMatchObject({id:'AnimeEngineerCasting',component:AnimeEngineerCasting,width:1080,height:1080,fps:30,durationInFrames:171});
 expect(select(0,'[data-testid="anime-caption"]').textContent).toBe('');
 expect(select(52,'[data-testid="anime-caption"]').textContent).toBe("I checked the code I wrote. I didn't ask that.");
 expect(select(150,'[data-testid="anime-caption"]').textContent).toBe('');
 const audio=select(52,'[data-audio-from]');
 expect(audio.getAttribute('data-audio-from')).toBe('48');
 expect(audio.getAttribute('data-audio-duration')).toBe('99');
 expect(audio.querySelector('[data-audio-source]')!.getAttribute('data-audio-source')).toContain('assets/illustrated-conversation/reconsider.wav');
});

test('the actual drawing consumes take-bound open, rounded, wide and quiet clause-gap mouths',()=>{
 const mouth=(frame:number)=>select(frame,'[data-testid="anime-mouth"]');
 expect(mouth(0).getAttribute('data-shape')).toBe('rest');
 expect(mouth(25).getAttribute('data-shape')).toBe('rest');
 expect(mouth(51).getAttribute('data-shape')).toBe('open');
 expect(mouth(69).getAttribute('data-shape')).toBe('round');
 expect(mouth(58).getAttribute('data-shape')).toBe('wide');
 for(const frame of [91,95,103,108,146,150,170]) expect(mouth(frame).getAttribute('data-shape')).toBe('rest');
 expect(mouth(51).innerHTML).not.toBe(mouth(58).innerHTML);
 expect(mouth(69).innerHTML).not.toBe(mouth(51).innerHTML);
});

test('script cues deform separate brows and lids smoothly while gaze, head and attached hands respond',()=>{
 const actor=(frame:number)=>select(frame,'[data-testid="anime-engineer"]');
 const brow=(frame:number)=>select(frame,'[data-testid="anime-brow"]').getAttribute('d');
 const openness=(frame:number)=>Number(select(frame,'[data-testid="anime-eye"]').getAttribute('data-openness'));
 expect(brow(0)).not.toBe(brow(21));
 expect(openness(21)).toBeGreaterThan(openness(0));
 // The 1.67-second close target rounds to take frame 50 (film frame 98).
 expect(openness(98)).toBeLessThan(0.1);
 expect(openness(105)).toBeGreaterThan(0.3);
 expect(brow(13)).not.toBe(brow(14));
 expect(openness(13)).toBeGreaterThan(openness(12));
 expect(openness(14)).toBeGreaterThan(openness(13));
 expect(Math.abs(openness(14)-openness(13))).toBeLessThan(0.1);
 expect(actor(21).getAttribute('data-gaze')).not.toBe(actor(0).getAttribute('data-gaze'));
 expect(select(21,'[data-testid="anime-head"]').getAttribute('transform')).not.toBe(select(0,'[data-testid="anime-head"]').getAttribute('transform'));
 expect(select(21,'[data-testid="anime-arm"]').getAttribute('data-hand')).not.toBe(select(0,'[data-testid="anime-arm"]').getAttribute('data-hand'));
 for(const frame of [0,9,21,41,48,63,91,112,144,170]) {
  for(const arm of documentAt(frame).querySelectorAll('[data-testid="anime-arm"]')) {
   const hand=arm.getAttribute('data-hand')!.split(',').map(Number);
   const transform=arm.querySelector('[data-testid="anime-hand"]')!.getAttribute('transform')!;
   expect(transform.startsWith(`translate(${hand[0]} ${hand[1]})`)).toBe(true);
   const elbow=arm.getAttribute('data-elbow')!.split(',').map(Number);
   expect(elbow[1]).toBeGreaterThan(-230);
  }
 }
});

test('a changed expression cue reaches the registered rendered face without changing the speech',()=>{
 const revised=clone();
 const cue=revised.acting.find(item=>item.offset===-0.9)!;
 cue.pose.face={browRaise:0,browPinch:0.8,eyeOpen:0.5,smile:-0.2};
 expect(select(21,'[data-testid="anime-eye"]',revised).outerHTML).not.toBe(select(21,'[data-testid="anime-eye"]').outerHTML);
 expect(select(21,'[data-testid="anime-brow"]',revised).outerHTML).not.toBe(select(21,'[data-testid="anime-brow"]').outerHTML);
 expect(select(21,'[data-testid="anime-mouth"]',revised).getAttribute('data-shape')).toBe('rest');
 expect(select(69,'[data-testid="anime-mouth"]',revised).outerHTML).toBe(select(69,'[data-testid="anime-mouth"]').outerHTML);
 expect(select(69,'[data-testid="anime-caption"]',revised).outerHTML).toBe(select(69,'[data-testid="anime-caption"]').outerHTML);
});

test('direct, forward, reverse and fresh mounts agree at changing lead, joins, speech and clause gaps; a frozen score differs',()=>{
 const frames=[0,9,21,41,47,48,58,69,91,100,105,112,144,146,147,170];
 const direct=frames.map(frame=>draw(frame));
 expect(new Set(direct).size).toBe(frames.length);
 const reverse=[...frames].reverse().map(frame=>draw(frame)).reverse();
 expect(reverse).toEqual(direct);
 const frozen=clone();frozen.acting=[];
 expect(select(21,'[data-testid="anime-engineer"]',frozen).outerHTML).not.toBe(select(21,'[data-testid="anime-engineer"]').outerHTML);
 expect(select(91,'[data-testid="anime-engineer"]',frozen).outerHTML).not.toBe(select(91,'[data-testid="anime-engineer"]').outerHTML);
 setFrame(91);
 expect(renderToStaticMarkup(React.createElement(registration().props.component))).toBe(direct[frames.indexOf(91)]);
});

test('metadata verifies actual selected WAV bytes and mouth binding before the real export',async()=>{
 await withSavedTakeFetch(async requested=>{
  await expect(registration().props.calculateMetadata({props:{}})).resolves.toEqual({durationInFrames:171});
  expect(requested).toEqual(['assets/illustrated-conversation/reconsider.wav']);
  const stale=clone();stale.turns[0].mouth.takeSha256='stale';
  await expect(registration().props.calculateMetadata({props:{script:stale}})).rejects.toThrow(/Turn reconsider.*review mouth cues/);
  const wrong=clone();wrong.takes.reconsider.durationSeconds+=1;wrong.takes.reconsider.sampleFrames+=24000;
  await expect(registration().props.calculateMetadata({props:{script:wrong}})).rejects.toThrow(/Turn reconsider.*duration differs/);
 });
});

test('optional face channels retain neutral defaults while scripts without them keep the original sampled shape',()=>{
 const script=clone();delete script.initial.ai.face;
 const compiled=compileConversation(script,30);
 expect(compiled.sample(0).actors.ai.face).toEqual({browRaise:0,browPinch:0,eyeOpen:1,smile:0});
 script.acting=[];
 expect(compileConversation(script,30).sample(20).actors.ai).not.toHaveProperty('face');
});
