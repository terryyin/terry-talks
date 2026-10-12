import type {Mood, SpeechMouth} from '../aiTestAutomation/actors';
import type {Point} from '../aiTestAutomation/motion';
import recording from '../../public/assets/illustrated-conversation/takes.json';

export type Actor = 'engineer' | 'ai';
export type MouthCue = {at: number; shape: SpeechMouth};
export type Take = {actor: string; file: string; text: string; sha256: string; durationSeconds: number; sampleFrames: number; sampleRate: number};
// Optional continuous face channels. Existing drawings still consume their mood;
// a deforming rig may instead consume these dimensionless authored values.
export type FacePose = {browRaise: number; browPinch: number; eyeOpen: number; smile: number};
export const neutralFace: FacePose = {browRaise:0,browPinch:0,eyeOpen:1,smile:0};
export type ActorPose = {mood: Mood; gaze: number; tilt: number; leftHand: Point; rightHand: Point; face?: FacePose};
export type PoseCue = {actor: Actor; turn: string; offset: number; pose: Partial<ActorPose>};
export type ConversationScript = {
 lead: number;
 tail: number;
 turns: {id: string; speaker: Actor; take: string; pauseAfter: number; mouth: {takeSha256: string; cues: MouthCue[]}}[];
 takes: Record<string, Take>;
 initial: Record<Actor, ActorPose>;
 acting: PoseCue[];
};

// Cue times are local to the saved WAV, including its natural clause gap.
// The editable vocabulary follows sounds (rounded vowels, wide vowels, closures),
// rather than driving every sound with a single amplitude-flapping mouth.
const question: MouthCue[] = [
 {at:0,shape:'rest'}, {at:0.27,shape:'rest'}, {at:0.31,shape:'open'}, {at:0.47,shape:'wide'},
 {at:0.61,shape:'rest'}, {at:0.68,shape:'round'}, {at:0.81,shape:'wide'}, {at:0.98,shape:'rest'},
 {at:1.06,shape:'wide'}, {at:1.3,shape:'open'}, {at:1.56,shape:'rest'},
 {at:2.12,shape:'wide'}, {at:2.28,shape:'rest'}, {at:2.34,shape:'wide'}, {at:2.45,shape:'rest'},
 {at:2.51,shape:'open'}, {at:2.65,shape:'wide'}, {at:2.79,shape:'round'}, {at:2.95,shape:'open'},
 {at:3.1,shape:'rest'}, {at:3.18,shape:'open'}, {at:3.35,shape:'rest'}, {at:3.41,shape:'open'},
 {at:3.6,shape:'wide'}, {at:3.8,shape:'rest'}, {at:3.89,shape:'wide'}, {at:4.1,shape:'open'},
 {at:4.26,shape:'rest'},
];
const reconsider: MouthCue[] = [
 {at:0,shape:'rest'}, {at:0.06,shape:'open'}, {at:0.2,shape:'rest'}, {at:0.28,shape:'wide'},
 {at:0.45,shape:'rest'}, {at:0.52,shape:'open'}, {at:0.67,shape:'round'}, {at:0.9,shape:'rest'},
 {at:0.97,shape:'open'}, {at:1.1,shape:'round'}, {at:1.29,shape:'open'}, {at:1.42,shape:'rest'},
 {at:2.08,shape:'open'}, {at:2.26,shape:'rest'}, {at:2.33,shape:'wide'}, {at:2.52,shape:'rest'},
 {at:2.6,shape:'open'}, {at:2.84,shape:'wide'}, {at:3.0,shape:'open'}, {at:3.15,shape:'rest'},
];

export const pilotScript: ConversationScript = {
 lead: 0.5,
 tail: 0.8,
 takes: recording.takes,
 turns: [
  {id:'question',speaker:'engineer',take:'question',pauseAfter:1.2,mouth:{takeSha256:recording.takes.question.sha256,cues:question}},
  {id:'reconsider',speaker:'ai',take:'reconsider',pauseAfter:0,mouth:{takeSha256:recording.takes.reconsider.sha256,cues:reconsider}},
 ],
 initial: {
  engineer:{mood:'focused',gaze:1,tilt:0,leftHand:{x:-74,y:-165},rightHand:{x:65,y:-164}},
  ai:{mood:'pleased',gaze:-1,tilt:0,leftHand:{x:-99,y:-104},rightHand:{x:96,y:-102}},
 },
 acting: [
  {actor:'engineer',turn:'question',offset:0.35,pose:{tilt:3,rightHand:{x:110,y:-230}}},
  {actor:'engineer',turn:'question',offset:1.55,pose:{tilt:0,rightHand:{x:65,y:-164}}},
  {actor:'engineer',turn:'question',offset:2.7,pose:{tilt:3,rightHand:{x:113,y:-216}}},
  {actor:'engineer',turn:'question',offset:4.3,pose:{tilt:1,rightHand:{x:65,y:-164}}},
  {actor:'ai',turn:'question',offset:0.65,pose:{mood:'surprised',tilt:-3}},
  {actor:'ai',turn:'question',offset:1.35,pose:{tilt:0}},
  {actor:'ai',turn:'question',offset:3.1,pose:{mood:'concerned',gaze:-0.3,tilt:2,leftHand:{x:-53,y:-130}}},
  {actor:'ai',turn:'question',offset:4.75,pose:{gaze:0.4,tilt:4,leftHand:{x:-26,y:-129}}},
  {actor:'ai',turn:'reconsider',offset:-0.2,pose:{gaze:-1,tilt:1,leftHand:{x:-77,y:-105}}},
  {actor:'ai',turn:'reconsider',offset:1.35,pose:{tilt:0,leftHand:{x:-99,y:-104}}},
  {actor:'engineer',turn:'reconsider',offset:2.5,pose:{mood:'pleased',tilt:0}},
 ],
};

// The full film uses the accepted pilot's recordings, mouths and listening pause.
// Common anchors contain the later authored reaction edit within question.
export const conversationScript: ConversationScript = {
 ...pilotScript,
 lead: 1.2,
 tail: 2,
 turns: [
  {id:'passed',speaker:'ai',take:'passed',pauseAfter:1.2,mouth:{takeSha256:recording.takes.passed.sha256,cues:[
   {at:0,shape:'rest'}, {at:0.08,shape:'round'}, {at:0.27,shape:'wide'}, {at:0.51,shape:'rest'},
   {at:0.63,shape:'open'}, {at:0.78,shape:'wide'}, {at:1.18,shape:'rest'},
   {at:1.5,shape:'open'}, {at:1.67,shape:'round'}, {at:1.86,shape:'wide'},
   {at:2.03,shape:'open'}, {at:2.21,shape:'round'}, {at:2.37,shape:'wide'}, {at:2.53,shape:'rest'},
  ]}},
  pilotScript.turns[0],
  {...pilotScript.turns[1],pauseAfter:1.2},
  {id:'next',speaker:'engineer',take:'next',pauseAfter:0,mouth:{takeSha256:recording.takes.next.sha256,cues:[
   {at:0,shape:'rest'}, {at:0.07,shape:'open'}, {at:0.22,shape:'wide'}, {at:0.35,shape:'rest'},
   {at:0.72,shape:'wide'}, {at:0.89,shape:'open'}, {at:1.08,shape:'wide'}, {at:1.18,shape:'rest'},
   {at:1.27,shape:'open'}, {at:1.4,shape:'wide'}, {at:1.47,shape:'rest'},
  ]}},
 ],
 acting: [
  {actor:'ai',turn:'passed',offset:-0.35,pose:{tilt:-2,rightHand:{x:105,y:-136}}},
  {actor:'ai',turn:'passed',offset:0.6,pose:{tilt:0,rightHand:{x:110,y:-157}}},
  {actor:'ai',turn:'passed',offset:2.5,pose:{rightHand:{x:96,y:-102}}},
  {actor:'ai',turn:'question',offset:0,pose:pilotScript.initial.ai},
  ...pilotScript.acting.map(cue=>cue.actor==='ai' && cue.turn==='question' && cue.offset===4.75
   ? {...cue,pose:{...cue.pose,mood:'concerned' as const,rightHand:pilotScript.initial.ai.rightHand}}
   : cue),
  {actor:'engineer',turn:'reconsider',offset:0,pose:{tilt:1,rightHand:{x:65,y:-164}}},
  {actor:'engineer',turn:'next',offset:-0.4,pose:{gaze:1,tilt:2,rightHand:{x:110,y:-213}}},
  {actor:'engineer',turn:'next',offset:1.4,pose:{tilt:0,rightHand:{x:65,y:-164}}},
  {actor:'ai',turn:'next',offset:0.1,pose:{mood:'focused',gaze:-1,tilt:-2}},
  {actor:'ai',turn:'next',offset:1.6,pose:{mood:'pleased',tilt:0}},
 ],
};

// A performance revision: retain the full film's takes, mouths and clock.
// The unchanged question anchors at 0 and 4.75 seconds bound this edit.
export const thoughtfulConversationScript: ConversationScript = {
 ...conversationScript,
 acting: [
  ...conversationScript.acting.filter(cue=>!(cue.actor==='ai' && cue.turn==='question' && cue.offset>0 && cue.offset<4.75)),
  {actor:'ai',turn:'question',offset:1.5,pose:{mood:'focused',gaze:0.1,tilt:4,leftHand:{x:-62,y:-132}}},
  {actor:'ai',turn:'question',offset:3.3,pose:{mood:'concerned',gaze:0.45,tilt:6,leftHand:{x:-35,y:-137}}},
 ],
};
