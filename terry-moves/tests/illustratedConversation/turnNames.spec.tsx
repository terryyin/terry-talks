import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {FullIllustratedConversationComposition} from '../../src/illustratedConversation/IllustratedConversation';
import {compileConversation} from '../../src/illustratedConversation/performance';
import {conversationScript, ConversationScript} from '../../src/illustratedConversation/script';
import {setFrame, withSavedTakeFetch} from './testSupport';

jest.mock('remotion',()=>jest.requireActual('./testSupport').mockRemotion());
const copy=():ConversationScript=>JSON.parse(JSON.stringify(conversationScript));
const editedScript=(id:string)=>{
 const script=copy();
 if(id==='lead') {
  script.turns[0].id=id;
  script.acting=script.acting.map(cue=>cue.turn==='passed'?{...cue,turn:id}:cue);
 } else {
  script.turns.push({...script.turns[2],id,pauseAfter:0});
  script.acting.push({actor:'ai',turn:id,offset:0.25,pose:{mood:'surprised',tilt:6,gaze:0.6,rightHand:{x:123,y:-140}}});
 }
 return script;
};
const registration=()=>FullIllustratedConversationComposition({}) as React.ReactElement<{
 id:string;
 component:React.ComponentType<{script?:ConversationScript}>;
 calculateMetadata:(input:{props:{script:ConversationScript}})=>Promise<{durationInFrames:number}>;
}>;
const render=(frame:number,script:ConversationScript)=>{
 setFrame(frame);
 const Component=registration().props.component;
 return renderToStaticMarkup(<Component script={script}/>);
};
const documentAt=(frame:number,script:ConversationScript)=>new DOMParser().parseFromString(render(frame,script),'text/html');
const expectedSlots=(id:string)=>id==='lead'?[[36,84],[156,144],[336,99],[471,51]]:[[36,84],[156,144],[336,99],[471,51],[522,99]];

// These fixtures supply only authored names/references and retained measured takes.
// Expected positions follow the retained film, not a repaired compiler fixture.
test.each(['lead','question:pause'])('registered %s authoring keeps every complete saved audio slot through metadata and scene',async(id)=>{
 const script=editedScript(id);
 await withSavedTakeFetch(async(requested)=>{
  const registered=registration();
  expect(registered.props.id).toBe('IllustratedConversation');
  await expect(registered.props.calculateMetadata({props:{script}})).resolves.toEqual({durationInFrames:id==='lead'?582:681});
  expect(requested).toEqual(script.turns.map(turn=>script.takes[turn.take].file));
  const audio=[...documentAt(0,script).querySelectorAll('[data-audio-from]')];
  expect(audio.map(node=>[Number(node.getAttribute('data-audio-from')),Number(node.getAttribute('data-audio-duration'))])).toEqual(expectedSlots(id));
  const compiled=compileConversation(script,30);
  for(const [index,turn] of compiled.turns.entries()) {
   expect(turn.id).toBe(script.turns[index].id);
   expect(turn.durationInFrames).toBe(Math.ceil(turn.take.sampleFrames/turn.take.sampleRate*30));
   expect(turn.from+turn.take.sampleFrames/turn.take.sampleRate*30).toBeLessThanOrEqual(turn.from+turn.durationInFrames);
   expect(audio[index].querySelector('[data-audio-source]')!.getAttribute('data-audio-source')).toContain(turn.take.file);
  }
 });
});

test.each(['lead','question:pause'])('registered %s drawings keep take-local captions/mouths and authored acting in direct/reverse sampling',(id)=>{
 const script=editedScript(id);
 const turnIndex=id==='lead'?0:4;
 const from=id==='lead'?36:522;
 const authored=script.turns[turnIndex];
 const take=script.takes[authored.take];
 const doc=documentAt(from+20,script);
 expect({caption:doc.querySelector('[data-testid="conversation-caption"]')!.textContent,
  turn:doc.querySelector('[data-testid="conversation-picture"]')!.getAttribute('data-turn'),
  mouth:doc.querySelector('[data-testid="ai-companion"] [data-testid="speech-mouth"] path')?.getAttribute('d')})
  .toEqual({caption:take.text,turn:id,mouth:'M-12-5Q0-8 12-5Q13 12 0 13Q-13 12-12-5Z'});
 const compiled=compileConversation(script,30);
 for(let local=0;local<Math.ceil(take.durationSeconds*30);local++) {
  const sample=compiled.sample(from+local);
  const shape=authored.mouth.cues.filter(cue=>cue.at<=local/30).at(-1)?.shape ?? 'rest';
  expect(sample).toMatchObject({turn:id,speaker:authored.speaker,caption:take.text});
  expect(sample.actors.ai.mouth).toBe(shape);
  expect(sample.actors.engineer.mouth).toBe('rest');
 }
 if(id==='lead') {
  const original=compileConversation(conversationScript,30);
  for(let frame=0;frame<original.durationInFrames;frame++) {
   expect(compiled.sample(frame).actors).toEqual(original.sample(frame).actors);
   expect(compiled.sample(frame).caption).toBe(original.sample(frame).caption);
  }
  expect(documentAt(54,script).querySelector('[data-testid="ai-companion"]')!.outerHTML)
   .toBe(documentAt(54,conversationScript).querySelector('[data-testid="ai-companion"]')!.outerHTML);
 } else {
  expect(compiled.sample(530).actors.ai).toMatchObject({mood:'surprised',tilt:6,rightHand:{x:123,y:-140}});
  expect(compiled.sample(530).actors.ai.gaze).toBeCloseTo(0.6);
  expect([...documentAt(530,script).querySelectorAll('[data-testid="ai-companion"] [data-testid="articulated-arm"]')].map(arm=>arm.getAttribute('data-hand'))).toContain('123,-140');
 }
 const end=from+Math.ceil(take.durationSeconds*30);
 expect(compiled.sample(end)).toMatchObject({caption:'',actors:{ai:{mouth:'rest'},engineer:{mouth:'rest'}}});
 const direct=render(from+20,script);
 for(const frame of [compiled.durationInFrames-1,end,from+20,from,0]) render(frame,script);
 expect(render(from+20,script)).toBe(direct);
});

test('duplicate authored names still reject ambiguous timing references',()=>{
 const script=editedScript('question:pause');
 script.turns[4].id='question';
 expect(()=>compileConversation(script,30)).toThrow('Turn question: choose a unique turn name for timing references.');
});
