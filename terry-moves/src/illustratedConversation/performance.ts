import {beat, timeline} from '../beatTimeline';
import {lerpPoint, mix, travel} from '../aiTestAutomation/motion';
import type {SpeechMouth} from '../aiTestAutomation/actors';
import type {Actor, ActorPose, ConversationScript, FacePose, Take} from './script';
import {neutralFace} from './script';

export type TurnRange = {id: string; speaker: Actor; from: number; durationInFrames: number; take: Take; mouth: ConversationScript['turns'][number]['mouth']};
export type Performance = {actors: Record<Actor, ActorPose & {mouth: SpeechMouth}>; caption: string; speaker?: Actor; turn?: string};

const blendFace = (before: FacePose | undefined, after: FacePose | undefined, amount: number) => {
 if (!before && !after) return {};
 const from=before ?? neutralFace;const to=after ?? neutralFace;
 return {face:{browRaise:mix(from.browRaise,to.browRaise,amount),browPinch:mix(from.browPinch,to.browPinch,amount),eyeOpen:mix(from.eyeOpen,to.eyeOpen,amount),smile:mix(from.smile,to.smile,amount)}};
};

export const compileConversation = (script: ConversationScript, fps: number) => {
 const fail = (turn: string, correction: string): never => {throw new Error(`Turn ${turn}: ${correction}`);};
 const beats = [beat('0',script.lead,'',()=>null,fps)];
 const turnBeatNames: string[] = [];
 const names = new Set<string>();
 for (const turn of script.turns) {
  if (names.has(turn.id)) fail(turn.id,'choose a unique turn name for timing references.');
  names.add(turn.id);
  const take = script.takes[turn.take];
  if (!take) fail(turn.id,`missing take ${turn.take}; select a saved, measured recording.`);
  if (take.actor !== turn.speaker) fail(turn.id,'select a take for this speaker.');
  if (take.sha256 !== turn.mouth.takeSha256) fail(turn.id,'selected take changed; review mouth cues against its new hash.');
  if (!(take.durationSeconds > 0) || Math.abs(take.durationSeconds-take.sampleFrames/take.sampleRate)>1e-9) fail(turn.id,'remeasure the saved take duration.');
  let previous = -1;
  for (const cue of turn.mouth.cues) {
   if (!Number.isFinite(cue.at) || cue.at < 0 || cue.at >= take.durationSeconds || cue.at <= previous) fail(turn.id,'mouth cue is out of take or unordered; review its local timing.');
   previous = cue.at;
  }
  if (turn.pauseAfter < 0) fail(turn.id,'author a nonnegative listening pause.');
  // Clock identities follow beat order and never consume authored turn names.
  const clockName = String(beats.length);
  turnBeatNames.push(clockName);
  beats.push(beat(clockName,Math.ceil(take.durationSeconds*fps)/fps,take.text,()=>null,fps));
  if (turn.pauseAfter>0) beats.push(beat(String(beats.length),turn.pauseAfter,'',()=>null,fps));
 }
 if (script.tail>0) beats.push(beat(String(beats.length),script.tail,'',()=>null,fps));
 const clock = timeline(beats,fps);
 const turns: TurnRange[] = script.turns.map((turn,index) => ({...clock.beatRange(turnBeatNames[index]),id:turn.id,speaker:turn.speaker,take:script.takes[turn.take],mouth:turn.mouth}));
 const actorCues = (actor: Actor) => {
  let pose = script.initial[actor];
  const cues = script.acting.filter(cue => cue.actor===actor).map(cue => {
   const turn = turns.find(range => range.id===cue.turn);
   if (!turn) return fail(cue.turn,'acting cue references a missing turn.');
   return {...cue,frame:turn.from+Math.round(cue.offset*fps)};
  }).sort((a,b)=>a.frame-b.frame);
  return [{frame:0,pose},...cues.map(cue=>{pose={...pose,...cue.pose};return {frame:cue.frame,pose};})];
 };
 const directed = {engineer:actorCues('engineer'),ai:actorCues('ai')};
 const poseAt = (actor: Actor, frame: number): ActorPose => {
  const cues = directed[actor];
  let previous=cues[0];
  for (const next of cues.slice(1)) {
   if (frame<=next.frame) {
    const amount=travel(frame,previous.frame,next.frame-previous.frame);
    return {mood:frame>=next.frame?next.pose.mood:previous.pose.mood,gaze:mix(previous.pose.gaze,next.pose.gaze,amount),tilt:mix(previous.pose.tilt,next.pose.tilt,amount),leftHand:lerpPoint(previous.pose.leftHand,next.pose.leftHand,amount),rightHand:lerpPoint(previous.pose.rightHand,next.pose.rightHand,amount),...blendFace(previous.pose.face,next.pose.face,amount)};
   }
   previous=next;
  }
  return previous.pose;
 };
 const sample = (frame: number): Performance => {
  const current=turns.find(turn=>frame>=turn.from && frame<turn.from+turn.durationInFrames);
  const mouth = (actor: Actor): SpeechMouth => {
   if (!current || current.speaker!==actor) return 'rest';
   const seconds=(frame-current.from)/fps;
   if (seconds>=current.take.durationSeconds) return 'rest';
   let shape: SpeechMouth='rest';
   for (const cue of current.mouth.cues) if(cue.at<=seconds) shape=cue.shape;
   return shape;
  };
  return {actors:{engineer:{...poseAt('engineer',frame),mouth:mouth('engineer')},ai:{...poseAt('ai',frame),mouth:mouth('ai')}},caption:clock.captionAt(frame),speaker:current?.speaker,turn:current?.id};
 };
 return {turns,durationInFrames:clock.durationInFrames,sample};
};

/** Used by metadata before rendering, so even a direct CLI export verifies the selected bytes. */
export const verifyConversationAssets = async (script: ConversationScript, load: (file: string)=>Promise<ArrayBuffer>, digest: (bytes: ArrayBuffer)=>Promise<string>) => {
 for (const turn of script.turns) {
  const take=script.takes[turn.take];
  try {
   const bytes=await load(take.file);
   if (await digest(bytes)!==take.sha256) throw new Error('saved take hash changed');
   const view=new DataView(bytes);
   const text=(offset:number)=>String.fromCharCode(...new Uint8Array(bytes,offset,4));
   if (bytes.byteLength<44 || text(0)!=='RIFF' || text(8)!=='WAVE') throw new Error('recording is not a measured PCM WAV');
   let rate=0,block=0,samples=0;
   for (let offset=12;offset+8<=bytes.byteLength;) {
    const size=view.getUint32(offset+4,true);
    if (offset+8+size>bytes.byteLength) throw new Error('WAV chunk exceeds received bytes');
    if (text(offset)==='fmt ') {
     if (size<16 || view.getUint16(offset+8,true)!==1) throw new Error('recording is not PCM');
     rate=view.getUint32(offset+12,true);block=view.getUint16(offset+20,true);
    }
    if (text(offset)==='data') samples=size;
    offset+=8+size+(size%2);
   }
   if (!block || rate!==take.sampleRate || samples/block!==take.sampleFrames || samples/block/rate!==take.durationSeconds) throw new Error('saved take duration differs from its measurement');
  } catch (error) {
   throw new Error(`Turn ${turn.id}: cannot use ${take.file}: ${String(error)}. Restore the selected take, or remeasure it and review its mouth cues.`);
  }
 }
};
