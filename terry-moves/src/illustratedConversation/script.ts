import type {Mood, SpeechMouth} from '../aiTestAutomation/actors';
import type {Point} from '../aiTestAutomation/motion';
import recording from '../../public/assets/illustrated-conversation/takes.json';

export type Actor = 'engineer' | 'ai';
export type MouthCue = {at: number; shape: SpeechMouth};
export type Take = {actor: string; file: string; text: string; sha256: string; durationSeconds: number; sampleFrames: number; sampleRate: number};
export type ActorPose = {mood: Mood; gaze: number; tilt: number; leftHand: Point; rightHand: Point};
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
