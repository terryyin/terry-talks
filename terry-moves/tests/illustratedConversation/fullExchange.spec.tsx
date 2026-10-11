import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {createHash, webcrypto} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {ConversationPicture, FullIllustratedConversationComposition, IllustratedConversation, IllustratedConversationComposition, IllustratedConversationFilm} from '../../src/illustratedConversation/IllustratedConversation';
import {compileConversation, verifyConversationAssets} from '../../src/illustratedConversation/performance';
import {conversationScript, ConversationScript, pilotScript} from '../../src/illustratedConversation/script';

let selectedFrame = 0;
jest.mock('remotion',()=>{
 const actual=jest.requireActual('remotion');
 return {...actual,useCurrentFrame:()=>selectedFrame,useVideoConfig:()=>({fps:30,width:1080,height:1080}),
  Sequence:({children,from,durationInFrames}: {children: React.ReactNode;from:number;durationInFrames:number})=><div data-audio-from={from} data-audio-duration={durationInFrames}>{children}</div>,
  Audio:({src}:{src:string})=><div data-audio-source={src}/>};
});
const full=compileConversation(conversationScript,30);
const copy=():ConversationScript=>JSON.parse(JSON.stringify(conversationScript));
const draw=(frame:number,script=conversationScript)=>new DOMParser().parseFromString(renderToStaticMarkup(<ConversationPicture performance={compileConversation(script,30).sample(frame)} frame={frame} fps={30}/>),'text/html');
const scene=(frame:number,script=conversationScript)=>{
 selectedFrame=frame;
 return new DOMParser().parseFromString(renderToStaticMarkup(<IllustratedConversation script={script}/>),'text/html');
};
const load=async(file:string)=>new Uint8Array(readFileSync(join(__dirname,'../../public',file))).buffer;
const digest=async(bytes:ArrayBuffer)=>createHash('sha256').update(new Uint8Array(bytes)).digest('hex');

test('registers the four-turn public film with complete measured slots, saved sources and empty silence captions',()=>{
 const registered=FullIllustratedConversationComposition({}) as React.ReactElement<{id:string;component:unknown;width:number;height:number;fps:number;durationInFrames:number}>;
 expect(registered.props).toMatchObject({id:'IllustratedConversation',component:IllustratedConversationFilm,width:1080,height:1080,fps:30,durationInFrames:582});
 selectedFrame=39;
 expect(renderToStaticMarkup(<IllustratedConversationFilm/>)).toContain('data-turn="passed"');
 expect(full.turns.map(turn=>[turn.id,turn.from,turn.durationInFrames])).toEqual([['passed',36,84],['question',156,144],['reconsider',336,99],['next',471,51]]);
 for (const turn of full.turns) {
  expect(turn.durationInFrames/30).toBeGreaterThanOrEqual(turn.take.sampleFrames/turn.take.sampleRate);
  const doc=scene(turn.from+3);
  expect(doc.querySelector('[data-testid="conversation-caption"]')!.textContent).toBe(turn.take.text);
  expect(doc.querySelector('[data-testid="conversation-picture"]')!.getAttribute('data-turn')).toBe(turn.id);
  const audio=doc.querySelector(`[data-audio-from="${turn.from}"]`)!;
  expect(Number(audio.getAttribute('data-audio-duration'))).toBe(turn.durationInFrames);
  expect(audio.querySelector('[data-audio-source]')!.getAttribute('data-audio-source')).toContain(turn.take.file);
 }
 for (const frame of [0,35,120,155,300,316,335,435,470,522,581]) {
  expect(scene(frame).querySelector('[data-testid="conversation-caption"]')!.textContent).toBe('');
  for (const actor of ['engineer','ai-companion']) expect(draw(frame).querySelector(`[data-testid="${actor}"] [data-testid="speech-mouth"] path`)!.getAttribute('d')).toBe('M-11 0Q0 2 11 0');
 }
});

test('accepted pilot takes and local mouths remain unchanged while new spoken drawings honor their clause gaps',()=>{
 for (const id of ['question','reconsider']) {
  const selected=conversationScript.turns.find(turn=>turn.id===id)!;
  const accepted=pilotScript.turns.find(turn=>turn.id===id)!;
  expect(selected.mouth).toEqual(accepted.mouth);
  expect(conversationScript.takes[selected.take]).toEqual(pilotScript.takes[accepted.take]);
 }
 expect(draw(39).querySelector('[data-testid="ai-companion"] [data-testid="speech-mouth"] ellipse')).not.toBeNull();
 expect(draw(58).querySelector('[data-testid="ai-companion"] [data-testid="speech-mouth"] path')!.getAttribute('d')).toContain('13');
 expect(draw(75).querySelector('[data-testid="ai-companion"] [data-testid="speech-mouth"] path')!.getAttribute('d')).toBe('M-11 0Q0 2 11 0');
 expect(draw(475).querySelector('[data-testid="engineer"] [data-testid="speech-mouth"] path')!.getAttribute('d')).toContain('13');
 expect(draw(486).querySelector('[data-testid="engineer"] [data-testid="speech-mouth"] path')!.getAttribute('d')).toBe('M-11 0Q0 2 11 0');
});

test('listening eyes, expression and hand settle continuously across question, authored silence and reply with direct middle mounts and reverse seeks',()=>{
 const hand=(frame:number)=>draw(frame).querySelector('[data-testid="ai-companion"] [data-testid="articulated-arm"]')!.getAttribute('data-hand')!.split(',').map(Number);
 expect(draw(183).querySelector('[data-testid="ai-companion"]')!.innerHTML).not.toBe(draw(316).querySelector('[data-testid="ai-companion"]')!.innerHTML);
 for (const frame of [299,300,316,335,336,337]) expect(full.sample(frame).actors.ai.mood).toBe('concerned');
 for (const frame of [300,336]) expect(Math.hypot(...hand(frame).map((value,index)=>value-hand(frame-1)[index]))).toBeLessThan(1);
 const direct=scene(316).querySelector('[data-testid="conversation-picture"]')!.outerHTML;
 for (const frame of [581,471,336,0,183]) scene(frame);
 expect(scene(316).querySelector('[data-testid="conversation-picture"]')!.outerHTML).toBe(direct);
 expect(full.sample(156).actors.ai).toMatchObject(pilotScript.initial.ai);
 expect(full.sample(299).actors.ai).toMatchObject({mood:'concerned',tilt:4,leftHand:{x:-26,y:-129}});
 expect(full.sample(299).actors.ai.gaze).toBeCloseTo(0.4);
});

test('one authored pause moves subsequent audio, captions and directed poses together while every take-local mouth stays fixed',()=>{
 const edited=copy();edited.turns[1].pauseAfter+=1;
 const shifted=compileConversation(edited,30);
 expect(shifted.durationInFrames).toBe(full.durationInFrames+30);
 expect(shifted.turns.map(turn=>turn.from)).toEqual([36,156,366,501]);
 for (const id of ['reconsider','next']) {
  const original=full.turns.find(turn=>turn.id===id)!;
  const moved=shifted.turns.find(turn=>turn.id===id)!;
  for (let local=0;local<original.durationInFrames;local++) {
   expect(shifted.sample(moved.from+local).caption).toBe(full.sample(original.from+local).caption);
   expect(shifted.sample(moved.from+local).actors[original.speaker].mouth).toBe(full.sample(original.from+local).actors[original.speaker].mouth);
  }
  const doc=scene(moved.from+12,edited);
  expect(doc.querySelector(`[data-audio-from="${original.from+30}"] [data-audio-source]`)!.getAttribute('data-audio-source')).toContain(original.take.file);
 }
 expect(shifted.sample(378).actors).toEqual(full.sample(348).actors);
 expect(draw(378,edited).querySelector('[data-testid="ai-companion"]')!.outerHTML).toBe(draw(348).querySelector('[data-testid="ai-companion"]')!.outerHTML);
 expect(scene(348,edited).querySelector('[data-testid="conversation-caption"]')!.textContent).toBe('');
 expect(scene(348).querySelector('[data-testid="conversation-caption"]')!.textContent).toBe(conversationScript.takes.reconsider.text);
});

test.each([
 ['pilot',IllustratedConversationComposition,pilotScript,318],
 ['full',FullIllustratedConversationComposition,conversationScript,582],
] as const)('%s public metadata verifies its default and supplied script sources and schedule',async(_name,composition,defaultScript,durationInFrames)=>{
 await expect(verifyConversationAssets(conversationScript,load,digest)).resolves.toBeUndefined();
 const oldFetch=globalThis.fetch;
 const oldSubtle=Object.getOwnPropertyDescriptor(globalThis.crypto,'subtle');
 Object.defineProperty(globalThis.crypto,'subtle',{configurable:true,value:webcrypto.subtle});
 const requested:string[]=[];
 globalThis.fetch=jest.fn(async(input)=>{
  const file=String(input).replace(/^.*(?=assets\/illustrated-conversation\/)/,'');requested.push(file);
  return {ok:true,arrayBuffer:()=>load(file)};
 }) as unknown as typeof fetch;
 try {
  const registered=composition({}) as React.ReactElement<{calculateMetadata:(input:{props:{script?:ConversationScript}})=>Promise<{durationInFrames:number}>}>;
  await expect(registered.props.calculateMetadata({props:{}})).resolves.toEqual({durationInFrames});
  expect(requested).toEqual(defaultScript.turns.map(turn=>defaultScript.takes[turn.take].file));
  requested.length=0;
  const edited=copy();edited.turns[1].pauseAfter+=1;
  await expect(registered.props.calculateMetadata({props:{script:edited}})).resolves.toEqual({durationInFrames:612});
  expect(requested).toEqual(edited.turns.map(turn=>edited.takes[turn.take].file));
  const selected=copy();selected.turns[0]={...selected.turns[0],take:'reconsider',mouth:selected.turns[2].mouth};
  requested.length=0;
  await expect(registered.props.calculateMetadata({props:{script:selected}})).resolves.toEqual({durationInFrames:597});
  expect(requested[0]).toBe(selected.takes.reconsider.file);
  const stale=copy();stale.takes.next.sha256='changed';stale.turns[3].mouth.takeSha256='changed';
  await expect(registered.props.calculateMetadata({props:{script:stale}})).rejects.toThrow(/Turn next.*hash changed.*Restore/);
 } finally {
  globalThis.fetch=oldFetch;
  if (oldSubtle) Object.defineProperty(globalThis.crypto,'subtle',oldSubtle);
  else Reflect.deleteProperty(globalThis.crypto,'subtle');
 }
});
