import React from 'react';
import type {Point} from '../aiTestAutomation/motion';
import type {SpeechMouth} from '../aiTestAutomation/actors';
import type {ActorPose, FacePose} from '../illustratedConversation/script';
import {neutralFace} from '../illustratedConversation/script';

// Original vector art, in local shoulder/waist coordinates. No actor artwork is
// imported; the common performance only supplies this drawing's control inputs.
export const engineerColors = {
 ink:'#252838',skin:'#F1C4AC',skinLight:'#F8D6BD',skinShade:'#CD927F',
 hair:'#303047',hairLight:'#55536A',hairShade:'#222435',
 jacket:'#467F83',jacketLight:'#67999B',jacketShade:'#326368',
 shirt:'#343B4B',gold:'#D9B775',
};

const Arm: React.FC<{side:-1|1;hand:Point;layer:'upper'|'forearm'}> = ({side,hand,layer}) => {
 const c=engineerColors;
 const shoulder={x:side*143,y:-241};
 const elbow={x:side*(234+(Math.abs(hand.x)-185)*0.18),y:-149+(hand.y+92)*0.22};
 // Each sleeve, cuff, palm and finger travels with the same wrist. The elbow
 // is solved from that target, so a script gesture cannot leave a floating hand.
 const wristAngle=Math.atan2(hand.y-elbow.y,hand.x-elbow.x)*180/Math.PI+90;
 const sleeve=layer==='upper'?`M${shoulder.x} ${shoulder.y}L${elbow.x} ${elbow.y}`:`M${elbow.x} ${elbow.y}L${hand.x} ${hand.y}`;
 const highlight=layer==='upper'?`M${shoulder.x-side*9} ${shoulder.y+5}L${elbow.x-side*9} ${elbow.y+3}`:`M${elbow.x-side*9} ${elbow.y+3}L${hand.x-side*8} ${hand.y}`;
 return <g data-testid={layer==='forearm'?'anime-arm':undefined} data-side={side} data-hand={`${hand.x},${hand.y}`} data-elbow={`${elbow.x},${elbow.y}`}>
  <path d={sleeve} fill="none" stroke={c.ink} strokeWidth="67" strokeLinecap="round"/>
  <path d={sleeve} fill="none" stroke={c.jacket} strokeWidth="60" strokeLinecap="round"/>
  <path d={highlight} fill="none" stroke={c.jacketLight} strokeWidth="9" strokeLinecap="round" opacity="0.5"/>
  {layer==='forearm'&&<>
   <path d={`M${elbow.x-side*15} ${elbow.y+8}l${side*23} 9m${-side*25} 0l${side*17} 8`} fill="none" stroke={c.jacketShade} strokeWidth="3.5" strokeLinecap="round"/>
   <g transform={`translate(${hand.x} ${hand.y}) rotate(${wristAngle})`} data-testid="anime-hand">
   <path d="M-21 8L-22-10Q0-17 22-10L21 8Z" fill={c.jacketShade} stroke={c.ink} strokeWidth="3"/>
   <path d="M-13 0L-14-18C-24-25-29-34-25-39Q-21-44-14-36L-8-31L-8-55Q-8-63-3-62Q2-62 2-54V-39L4-62Q5-69 10-66Q14-65 13-58L11-38L16-55Q18-61 23-58Q27-56 24-49L19-32L26-43Q30-48 34-44Q38-40 32-32L23-17Q19-10 13-8L13 1Z" fill={c.skinLight} stroke={c.ink} strokeWidth="3.2" strokeLinejoin="round"/>
   <path d="M-11-22Q-1-18 4-26M2-39L1-31M11-38L8-28M19-32L14-23M-10-10Q0-7 12-10" fill="none" stroke={c.skinShade} strokeWidth="2.1" strokeLinecap="round"/>
   </g>
  </>}
 </g>;
};

const Eye: React.FC<{side:-1|1;face:FacePose;gaze:number}> = ({side,face,gaze}) => {
 const x=side*53;
 const open=Math.max(0.025,face.eyeOpen);
 const top=17*open;const bottom=11*open;
 const shape=`M${x-39} -474Q${x-12} ${-474-top*1.6} ${x+36} -477Q${x+14} ${-474+bottom*1.9} ${x-39} -474Z`;
 const browLift=face.browRaise*16;
 const inner=-527-browLift-face.browPinch*7;
 const outer=-525-browLift+face.browPinch*7;
 return <g data-testid="anime-eye" data-side={side} data-openness={open}>
  <clipPath id={`anime-eye-${side}`}><path d={shape}/></clipPath>
  <path d={shape} fill="#FFF5E8"/>
  <g clipPath={`url(#anime-eye-${side})`}>
   <ellipse cx={x+gaze*9} cy="-473" rx="18" ry="24" fill="#8E6547"/>
   <ellipse cx={x+gaze*9} cy="-468" rx="14" ry="15" fill={engineerColors.gold}/>
   <ellipse cx={x+gaze*9} cy="-474" rx="7" ry="18" fill={engineerColors.ink}/>
   <ellipse cx={x+gaze*9-6} cy="-484" rx="5" ry="6" fill="#FFF9F0"/>
   <circle cx={x+gaze*9+8} cy="-466" r="2.8" fill="#FFF9F0"/>
  </g>
  <path d={`M${x-39} -474Q${x-12} ${-474-top*1.6} ${x+36} -477`} fill="none" stroke={engineerColors.ink} strokeWidth="5.5" strokeLinecap="round"/>
  <path d={`M${x-34} -472Q${x+9} ${-474+bottom*1.7} ${x+33} -477`} fill="none" stroke={engineerColors.skinShade} strokeWidth="2.5"/>
  <path d={side<0?`M${x-38} -474l-7-7m10 6l-5-7`:`M${x+35} -477l7-8m-12 7l5-7`} fill="none" stroke={engineerColors.ink} strokeWidth="3.5" strokeLinecap="round"/>
  <path data-testid="anime-brow" d={`M${x-side*33} ${inner}Q${x} ${inner-7} ${x+side*32} ${outer}`} fill="none" stroke={engineerColors.hair} strokeWidth="6" strokeLinecap="round"/>
 </g>;
};

const Mouth: React.FC<{shape:SpeechMouth;smile:number}> = ({shape,smile}) => {
 const c=engineerColors;
 return <g transform="translate(1 -396)" data-testid="anime-mouth" data-shape={shape}>
  {shape==='rest'
   ? <path d={`M-19 0Q0 ${7-smile*11} 20 -1`} fill="none" stroke="#864F4C" strokeWidth="3.1" strokeLinecap="round"/>
   : <>
    <path d={shape==='round'?'M-9-4C-15-5-17 16-4 18C10 21 16 1 8-4Q0-7-9-4Z':shape==='wide'?'M-25-4Q0-12 25-5Q22 16 0 17Q-22 16-25-4Z':'M-18-6Q0-13 18-6Q21 26 0 27Q-21 26-18-6Z'} fill="#613D49" stroke="#864F4C" strokeWidth="2.5"/>
    {shape!=='round'&&<path d={shape==='wide'?'M-21-4Q0-9 21-4L18 2Q0 5-18 2Z':'M-15-5Q0-10 15-5L12 1Q0 4-12 1Z'} fill="#FFF4E6"/>}
    <path d={shape==='round'?'M-6 13Q0 9 8 13Q3 18-6 13Z':shape==='wide'?'M-13 12Q0 7 14 12Q0 18-13 12Z':'M-12 20Q0 13 13 20Q0 27-12 20Z'} fill="#C48187"/>
   </>}
  <path d="M-10 14Q0 17 9 14" fill="none" stroke={c.skinShade} strokeWidth="1.8" opacity={shape==='rest'?0.6:0}/>
 </g>;
};

export const AnimeEngineer: React.FC<{pose:ActorPose & {mouth:SpeechMouth}}> = ({pose}) => {
 const c=engineerColors;
 const face=pose.face??neutralFace;
 // Neck, torso and hair follow the same sampled head direction; this is a
 // deformation relationship, never another local timing or choreography track.
 const bodyLean=pose.tilt*0.23;
 const headTransform=`rotate(${pose.tilt} 0 -316)`;
 return <g transform="translate(550 850)" data-testid="anime-engineer" data-gaze={pose.gaze} data-tilt={pose.tilt}>
  <g transform={headTransform}>
   <g data-testid="anime-rear-hair">
    <path d="M-139-548C-166-450-159-338-135-280L-85-267L-92-392L99-392L85-267L141-279C170-354 163-469 139-558Z" fill={c.hairShade} stroke={c.ink} strokeWidth="4"/>
    <path d="M-142-484Q-180-649-52-671Q46-691 115-631Q165-588 144-473L125-333L88-317L-91-320L-140-355Z" fill={c.hair} stroke={c.ink} strokeWidth="4"/>
    <path d="M-124-577Q-103-648-42-651Q43-676 109-607Q61-642-21-626Q-85-616-124-577Z" fill={c.hairLight}/>
   </g>
  </g>
  <g transform={`rotate(${bodyLean} 0 -100)`}>
   <Arm side={-1} hand={pose.leftHand} layer="upper"/>
   <Arm side={1} hand={pose.rightHand} layer="upper"/>
   <path d="M-139-276Q-168-254-159-204L-142 38Q0 64 142 38L159-204Q168-254 139-276L58-310H-58Z" fill={c.jacket} stroke={c.ink} strokeWidth="4"/>
   <path d="M-70-288L-48-312H48L70-288L79 43H-80Z" fill={c.shirt}/>
   <g data-testid="anime-neck">
    <path d="M-43-368L-47-304Q-4-270 47-304L43-368Z" fill={c.skin} stroke={c.ink} strokeWidth="3"/>
    <path d="M-40-363Q0-323 41-357L42-325Q-4-302-43-322Z" fill={c.skinShade} opacity="0.7"/>
   </g>
   <path d="M-48-309Q0-290 48-309L52-280Q0-260-52-280Z" fill={c.shirt} stroke={c.ink} strokeWidth="3"/>
   <path d="M-68-308L-128-281L-95-233L-112-216L-72-142L-51-282Z" fill={c.jacketLight} stroke={c.jacketShade} strokeWidth="3"/>
   <path d="M68-308L128-281L95-233L112-216L72-142L51-282Z" fill={c.jacketLight} stroke={c.jacketShade} strokeWidth="3"/>
   <path d="M-99-208L-115 18M99-208L115 18M-149-154Q-137-131-126-114M149-154Q137-131 126-114" fill="none" stroke={c.jacketShade} strokeWidth="3"/>
   <path d="M-58-247L-44-235M55-247L44-235M-63-27Q0-11 63-27" fill="none" stroke="#546070" strokeWidth="3"/>
   <path d="M83-186L124-180L120-120L84-122Z" fill={c.jacketShade} stroke={c.ink} strokeWidth="2"/>
   <path d="M85-176L121-172" fill="none" stroke={c.jacketLight} strokeWidth="3"/>
   <path d="M103-189L104-152" stroke={c.gold} strokeWidth="5" strokeLinecap="round"/>
   <circle cx="104" cy="-185" r="4" fill={c.gold}/>
   <path d="M-64-272L-58-150" stroke={c.gold} strokeWidth="2.5" opacity="0.8"/>
   <Arm side={-1} hand={pose.leftHand} layer="forearm"/>
   <Arm side={1} hand={pose.rightHand} layer="forearm"/>
  </g>
  <g transform={headTransform} data-testid="anime-head">
   <path d="M-105-466C-143-480-146-411-109-400L-96-419Z" fill={c.skin} stroke={c.ink} strokeWidth="3"/>
   <path d="M107-466C145-480 147-411 108-400L96-419Z" fill={c.skin} stroke={c.ink} strokeWidth="3"/>
   <path d="M-120-450Q-132-437-117-421M120-450Q132-437 117-421" fill="none" stroke={c.skinShade} strokeWidth="3"/>
   <path data-testid="anime-face" d="M-104-577Q0-630 104-577C126-535 119-473 101-419Q64-365 4-343Q-58-357-98-413C-116-456-123-532-104-577Z" fill={c.skinLight} stroke={c.ink} strokeWidth="3.5"/>
   <path d="M-104-552C-119-498-105-444-84-417Q-61-379 4-343Q-61-357-98-413C-116-456-123-532-104-552Z" fill={c.skin} opacity="0.8"/>
   <path d="M76-437Q59-417 38-419M-77-437Q-60-420-39-421" fill="none" stroke="#DDB29D" strokeWidth="3" opacity="0.65"/>
   <g transform={`translate(${pose.gaze*3} 0)`}>
    <Eye side={-1} face={face} gaze={pose.gaze}/>
    <Eye side={1} face={face} gaze={pose.gaze}/>
    <path d="M3-461L-5-428Q2-421 10-427" fill="none" stroke={c.skinShade} strokeWidth="2.6" strokeLinecap="round"/>
    <path d="M5-440L7-431" stroke="#FFF2D9" strokeWidth="3" strokeLinecap="round"/>
    <Mouth shape={pose.mouth} smile={face.smile}/>
   </g>
   <path d="M-122-583Q-107-649-45-653Q-92-590-77-541L-105-574Q-120-519-111-465L-130-489Q-146-521-122-583Z" fill={c.hair} stroke={c.ink} strokeWidth="3"/>
   <path d="M-44-652Q14-675 71-646Q121-622 137-578L124-481L105-450Q111-541 82-579Q75-552 53-538L47-573Q24-538-6-534L4-569Q-27-543-48-533L-40-574Q-57-554-75-547Q-71-614-44-652Z" fill={c.hair} stroke={c.ink} strokeWidth="3.5"/>
   <path d="M-38-627Q-43-591-59-563M8-636Q8-592-23-560M49-630Q75-599 63-566M98-603Q126-554 116-514" fill="none" stroke={c.hairLight} strokeWidth="6" strokeLinecap="round"/>
   <path d="M-130-492Q-137-400-105-337L-85-322L-97-391L-103-456ZM127-491Q148-403 120-343L96-321L105-389L105-452Z" fill={c.hair} stroke={c.ink} strokeWidth="3"/>
   <path d="M-125-455Q-128-390-111-355M128-450Q137-387 118-352" fill="none" stroke={c.hairLight} strokeWidth="4" strokeLinecap="round"/>
   <path d="M101-539L126-532L124-519L100-526Z" fill={c.jacketLight} stroke={c.ink} strokeWidth="2"/>
   <path d="M104-533L120-529" stroke="#B8D6CB" strokeWidth="2"/>
   <circle cx="-115" cy="-410" r="6" fill={c.gold} stroke={c.ink} strokeWidth="1.5"/>
   <circle cx="117" cy="-410" r="6" fill={c.gold} stroke={c.ink} strokeWidth="1.5"/>
  </g>
 </g>;
};
