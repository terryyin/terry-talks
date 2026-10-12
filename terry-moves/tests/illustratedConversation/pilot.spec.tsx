import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {AI, Engineer, Mood} from '../../src/aiTestAutomation/actors';
import {ConversationPicture, IllustratedConversation, IllustratedConversationComposition} from '../../src/illustratedConversation/IllustratedConversation';
import {compileConversation, verifyConversationAssets} from '../../src/illustratedConversation/performance';
import {pilotScript, ConversationScript} from '../../src/illustratedConversation/script';
import baseline from './omitted-mouth-baseline.json';
import {setFrame, loadSavedTake as load, digestTake as digest, withSavedTakeFetch} from './testSupport';

jest.mock('remotion',()=>jest.requireActual('./testSupport').mockRemotion());
const performance=compileConversation(pilotScript,30);
const picture=(frame:number)=>new DOMParser().parseFromString(renderToStaticMarkup(<ConversationPicture performance={performance.sample(frame)} frame={frame} fps={30}/>),'text/html');
const mouth=(frame:number,actor='engineer')=>picture(frame).querySelector(`[data-testid="${actor}"] [data-testid="speech-mouth"]`)!;
const copy=():ConversationScript=>JSON.parse(JSON.stringify(pilotScript));

test('preserves every pre-edit omitted-input drawing including moods, eyes and blinks',()=>{
 for (const observation of baseline.cases) {
  const props={x:0,y:0,mood:observation.mood as Mood,blink:observation.blink,gaze:1};
  expect(createHash('sha256').update(renderToStaticMarkup(<Engineer {...props}/>)).digest('hex')).toBe(observation.engineer);
  expect(createHash('sha256').update(renderToStaticMarkup(<AI {...props}/>)).digest('hex')).toBe(observation.ai);
 }
});

test('draws distinct open, rounded, wide and resting mouths on the actual speaking rig',()=>{
 // Engineer local times .4/.73/.9/1.83, observed within the selected recording.
 expect(mouth(27).querySelector('path')!.getAttribute('d')).toBe('M-12-5Q0-8 12-5Q13 12 0 13Q-13 12-12-5Z');
 expect(mouth(37).querySelector('ellipse')!.getAttribute('rx')).toBe('7');
 expect(mouth(42).querySelector('path')!.getAttribute('d')).toBe('M-17-4Q0-8 17-4Q14 10 0 10Q-14 10-17-4Z');
 expect(mouth(70).querySelector('path')!.getAttribute('d')).toBe('M-11 0Q0 2 11 0');
 expect(mouth(27,'ai-companion').querySelector('path')!.getAttribute('d')).toBe('M-11 0Q0 2 11 0');
 expect(mouth(216,'ai-companion').querySelector('ellipse')).not.toBeNull();
 expect(mouth(215).querySelector('path')!.getAttribute('d')).toBe('M-11 0Q0 2 11 0');
 expect(picture(27).querySelector('[data-testid="engineer"]')!.innerHTML).not.toContain('M-11-270Q0-266 13-272');
});

test('rests mouths during take-local clause gaps and every silent timeline interval',()=>{
 const rest='M-11 0Q0 2 11 0';
 for (const frame of [0,14,70,75,148,158,159,175,194,239,248,294,300,317]) {
  expect(mouth(frame).querySelector('path')!.getAttribute('d')).toBe(rest);
  expect(mouth(frame,'ai-companion').querySelector('path')!.getAttribute('d')).toBe(rest);
 }
 for (const frame of [0,14,159,175,194,294,317]) expect(performance.sample(frame).caption).toBe('');
});

test('uses measured full take slots and registers the real audio/caption/rig composition',()=>{
 expect(performance.turns.map(turn=>[turn.id,turn.from,turn.durationInFrames])).toEqual([['question',15,144],['reconsider',195,99]]);
 expect(performance.durationInFrames).toBe(318);
 for (const turn of performance.turns) expect(turn.durationInFrames/30).toBeGreaterThanOrEqual(turn.take.durationSeconds);
 const registered=IllustratedConversationComposition({}) as React.ReactElement<{id:string;component:unknown;width:number;height:number;fps:number;durationInFrames:number}>;
 expect(registered.props).toMatchObject({id:'IllustratedConversationPilot',component:IllustratedConversation,width:1080,height:1080,fps:30,durationInFrames:318});
 setFrame(215);
 const doc=new DOMParser().parseFromString(renderToStaticMarkup(<IllustratedConversation/>),'text/html');
 expect(doc.querySelector('[data-testid="conversation-caption"]')!.textContent).toBe(pilotScript.takes.reconsider.text);
 expect(doc.querySelector('[data-testid="conversation-picture"]')!.getAttribute('data-turn')).toBe('reconsider');
 const nodes=[...doc.querySelectorAll('[data-audio-from]')];
 expect(nodes.map(node=>[Number(node.getAttribute('data-audio-from')),Number(node.getAttribute('data-audio-duration'))])).toEqual([[15,144],[195,99]]);
 expect(nodes[0].querySelector('[data-audio-source]')!.getAttribute('data-audio-source')).toContain(pilotScript.takes.question.file);
 expect(nodes[1].querySelector('[data-audio-source]')!.getAttribute('data-audio-source')).toContain(pilotScript.takes.reconsider.file);
});

test('keeps listening expression, eyes and hands on film time across the handover and direct/reverse seeks',()=>{
 const listener=(frame:number)=>picture(frame).querySelector('[data-testid="ai-companion"]')!.outerHTML;
 expect(listener(100)).not.toBe(listener(175));
 // Reply starts while the listening cue is settling, rather than resetting it.
 const hand=(frame:number)=>picture(frame).querySelector('[data-testid="ai-companion"] [data-testid="articulated-arm"]')!.getAttribute('data-hand')!.split(',').map(Number);
 const distance=Math.hypot(...hand(195).map((value,index)=>value-hand(194)[index]));
 expect(distance).toBeLessThan(1);
 const direct=renderToStaticMarkup(<ConversationPicture performance={performance.sample(175)} frame={175} fps={30}/>);
 [317,0,295,14,215,42].forEach(frame=>performance.sample(frame));
 expect(renderToStaticMarkup(<ConversationPicture performance={performance.sample(175)} frame={175} fps={30}/>)).toBe(direct);
 expect(performance.sample(175).actors.ai.mood).toBe('concerned');
});

test('identifies missing/changed recordings and invalid local mouth timing by named turn',async()=>{
 await expect(verifyConversationAssets(pilotScript,load,digest)).resolves.toBeUndefined();
 const changed=async(file:string)=>{const bytes=new Uint8Array(await load(file));bytes[50]^=1;return bytes.buffer;};
 await expect(verifyConversationAssets(pilotScript,changed,digest)).rejects.toThrow(/Turn question.*hash changed.*remeasure/);
 await expect(verifyConversationAssets(pilotScript,async()=>{throw new Error('missing');},digest)).rejects.toThrow(/Turn question.*missing.*Restore/);
 const stale=copy();stale.turns[1].mouth.takeSha256='old';
 expect(()=>compileConversation(stale,30)).toThrow(/Turn reconsider.*review mouth cues/);
 const outOfTake=copy();outOfTake.turns[0].mouth.cues.push({at:4.9,shape:'open'});
 expect(()=>compileConversation(outOfTake,30)).toThrow(/Turn question.*out of take/);
 const missing=copy();delete missing.takes.question;
 expect(()=>compileConversation(missing,30)).toThrow(/Turn question.*missing take/);
});

test('retains measurements of the actual selected PCM WAV bytes',async()=>{
 for (const turn of performance.turns) {
  const bytes=readFileSync(join(__dirname,'../../public',turn.take.file));
  expect(bytes.toString('ascii',0,4)).toBe('RIFF');
  expect(bytes.readUInt32LE(24)).toBe(turn.take.sampleRate);
  expect(bytes.readUInt32LE(40)/bytes.readUInt16LE(32)).toBe(turn.take.sampleFrames);
  expect(await digest(new Uint8Array(bytes).buffer)).toBe(turn.mouth.takeSha256);
 }
});

test('accepts another authored turn through the same schedule rule',()=>{
 const extended=copy();extended.turns.push({...extended.turns[1],id:'another-thought'});
 const compiled=compileConversation(extended,30);
 expect(compiled.turns).toHaveLength(3);
 expect(compiled.turns[2].from).toBe(294);
});


test('registered metadata validates the supplied script and measured sources before scheduling its export',async()=>{
 await withSavedTakeFetch(async()=>{
  const registered=IllustratedConversationComposition({}) as React.ReactElement<{calculateMetadata:(input:{props:{script:ConversationScript}})=>Promise<{durationInFrames:number}>}>;
  const revised=copy();revised.turns[0].pauseAfter=2.2;
  await expect(registered.props.calculateMetadata({props:{script:revised}})).resolves.toEqual({durationInFrames:348});
  const stale=copy();stale.turns[1].mouth.takeSha256='stale';
  await expect(registered.props.calculateMetadata({props:{script:stale}})).rejects.toThrow(/Turn reconsider.*review mouth cues/);
  const wrongMeasurement=copy();wrongMeasurement.takes.reconsider.sampleFrames+=24000;wrongMeasurement.takes.reconsider.durationSeconds+=1;
  await expect(registered.props.calculateMetadata({props:{script:wrongMeasurement}})).rejects.toThrow(/Turn reconsider.*duration differs.*remeasure/);
 });
});
