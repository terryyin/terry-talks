import type {ActorPose, ConversationScript} from '../illustratedConversation/script';
import {pilotScript} from '../illustratedConversation/script';

const listeningEntry: ActorPose = {
 mood:'focused',gaze:-0.65,tilt:0,leftHand:{x:-185,y:-92},rightHand:{x:164,y:-91},
 face:{browRaise:0.05,browPinch:0,eyeOpen:0.85,smile:0.12},
};

// Both performances retain the same saved reply's direction and settle.
const reconsiderActing: ConversationScript['acting'] = [
 {actor:'ai',turn:'reconsider',offset:0.5,pose:{gaze:-0.38,tilt:1,leftHand:{x:-148,y:-165},rightHand:{x:200,y:-143},face:{browRaise:0.06,browPinch:0.45,eyeOpen:0.77,smile:-0.06}}},
 {actor:'ai',turn:'reconsider',offset:1.42,pose:{gaze:0.1,tilt:4,leftHand:{x:-158,y:-112},rightHand:{x:184,y:-155},face:{browRaise:0,browPinch:0.56,eyeOpen:0.56,smile:-0.15}}},
 {actor:'ai',turn:'reconsider',offset:1.67,pose:{face:{browRaise:0,browPinch:0.56,eyeOpen:0.03,smile:-0.15}}},
 {actor:'ai',turn:'reconsider',offset:1.82,pose:{face:{browRaise:0,browPinch:0.56,eyeOpen:0.62,smile:-0.15}}},
 {actor:'ai',turn:'reconsider',offset:2.12,pose:{gaze:-0.65,tilt:0,leftHand:{x:-181,y:-106},rightHand:{x:210,y:-180},face:{browRaise:0.1,browPinch:0.34,eyeOpen:0.79,smile:-0.02}}},
 {actor:'ai',turn:'reconsider',offset:3.2,pose:{gaze:-0.55,tilt:1,leftHand:{x:-185,y:-92},rightHand:{x:164,y:-91},face:{browRaise:0.06,browPinch:0.2,eyeOpen:0.82,smile:0.04}}},
 {actor:'ai',turn:'reconsider',offset:3.8,pose:{tilt:0,face:{browRaise:0.02,browPinch:0.16,eyeOpen:0.8,smile:0.1}}},
];

// The saved take's internal `ai` slot is cast as this human engineer.
// All targets (including the silent lead and eyelid close) live on this score.
export const castingScript: ConversationScript = {
 lead:1.6,
 tail:0.8,
 takes:pilotScript.takes,
 turns:[pilotScript.turns[1]],
 initial:{
  engineer:pilotScript.initial.engineer,
  ai:listeningEntry,
 },
 acting:[
  {actor:'ai',turn:'reconsider',offset:-1.3,pose:{mood:'surprised',gaze:-0.9,tilt:-3,leftHand:{x:-216,y:-178},face:{browRaise:0.7,browPinch:0.08,eyeOpen:1.12,smile:0}}},
  {actor:'ai',turn:'reconsider',offset:-0.9,pose:{tilt:-4,leftHand:{x:-199,y:-244},face:{browRaise:1,browPinch:0.1,eyeOpen:1.2,smile:0}}},
  {actor:'ai',turn:'reconsider',offset:-0.25,pose:{mood:'concerned',gaze:-0.2,tilt:3,leftHand:{x:-103,y:-249},face:{browRaise:0.12,browPinch:0.65,eyeOpen:0.64,smile:-0.18}}},
  ...reconsiderActing,
 ],
};

// Full poses close the listening reaction at both ends. A later performance
// revision can replace the interior cues while retaining lead and reply acting.
const replyEntry: ActorPose = {
 mood:'concerned',gaze:-0.65,tilt:1,leftHand:{x:-168,y:-139},rightHand:{x:194,y:-134},
 face:{browRaise:0.06,browPinch:0.45,eyeOpen:0.78,smile:-0.06},
};

// Named directing boundaries, local to the measured turns, not frame numbers.
export const listeningReaction = {
 entry:{turn:'question',offset:0},
 exit:{turn:'reconsider',offset:-0.2},
} as const;

export const animeSceneScript: ConversationScript = {
 lead:pilotScript.lead,
 tail:pilotScript.tail,
 takes:pilotScript.takes,
 turns:pilotScript.turns,
 initial:{engineer:pilotScript.initial.engineer,ai:listeningEntry},
 acting:[
  {actor:'ai',...listeningReaction.entry,pose:listeningEntry},
  {actor:'ai',turn:'question',offset:0.65,pose:{mood:'surprised',gaze:-0.9,tilt:-3,leftHand:{x:-213,y:-175},face:{browRaise:0.9,browPinch:0.08,eyeOpen:1.16,smile:0}}},
  {actor:'ai',turn:'question',offset:1.3,pose:{tilt:-4,leftHand:{x:-197,y:-237},face:{browRaise:1,browPinch:0.1,eyeOpen:1.2,smile:0}}},
  {actor:'ai',turn:'question',offset:2.05,pose:{gaze:-0.72,tilt:-1,leftHand:{x:-185,y:-245},face:{browRaise:0.62,browPinch:0.2,eyeOpen:1.05,smile:-0.06}}},
  {actor:'ai',turn:'question',offset:3.1,pose:{mood:'concerned',gaze:-0.15,tilt:3,leftHand:{x:-108,y:-249},rightHand:{x:185,y:-111},face:{browRaise:0.16,browPinch:0.6,eyeOpen:0.7,smile:-0.16}}},
  {actor:'ai',turn:'question',offset:4.3,pose:{gaze:0.2,tilt:4,leftHand:{x:-121,y:-232},rightHand:{x:186,y:-135},face:{browRaise:0.1,browPinch:0.62,eyeOpen:0.62,smile:-0.18}}},
  {actor:'ai',turn:'question',offset:4.8,pose:{gaze:-0.05,tilt:3,leftHand:{x:-142,y:-194},rightHand:{x:201,y:-143},face:{browRaise:0.1,browPinch:0.55,eyeOpen:0.66,smile:-0.12}}},
  {actor:'ai',...listeningReaction.exit,pose:replyEntry},
  ...reconsiderActing,
 ],
};
