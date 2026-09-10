import React from 'react';
import {useCurrentFrame} from 'remotion';
import {StoryProductFrame} from './StoryProductFrame';
import {assimilationTimeline, AssimilationTimeline} from './StoryAssimilationTimeline';

const ink = '#253B3C';
const blue = '#477DA4';
const green = '#337A62';
const coral = '#D9654E';
const paper = '#FFFCF4';
const clamp = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (value: number) => {const t = clamp(value); return t * t * (3 - 2 * t);};
type Point = {x: number; y: number};
// Steepen Behavior by 15 degrees while keeping Structure vertical.
const behaviorShear = Math.tan(Math.atan(96 / 408) + Math.PI / 12) - 96 / 408;
const outline = 'M 175 345 L 560 255 L 560 620 L 175 710 Z';
const original: Point[] = [
  {x: 235, y: 391}, {x: 365, y: 361}, {x: 495, y: 331},
  {x: 235, y: 511}, {x: 365, y: 481}, {x: 495, y: 451},
  {x: 235, y: 631}, {x: 365, y: 601}, {x: 495, y: 571},
];
const scatter = [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:-18,y:15},{x:-30,y:-25},{x:25,y:-22},{x:0,y:0},{x:-15,y:20},{x:24,y:18}];
const adjustment = [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:-10,y:14},{x:0,y:16},{x:0,y:0},{x:12,y:-7},{x:-12,y:7}];
const connections = [[0,1],[1,2],[0,3],[3,6],[1,4],[4,7],[2,5],[5,8],[3,4],[4,5],[6,7],[7,8]];
const route = (points: Point[]) => points.map((p,i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

const Missile: React.FC<{x: number; selected?: boolean}> = ({x, selected = false}) => <g data-testid={selected ? 'selected-missile' : 'queued-missile'} transform={`translate(${x} 505)`} stroke={selected ? coral : ink} strokeWidth="3" strokeLinejoin="round">
  <path d="M -43 0 Q -25 -19 -8 -17 L 26 -17 L 36 -29 L 46 -29 L 40 -9 L 40 9 L 46 29 L 36 29 L 26 17 L -8 17 Q -25 19 -43 0 Z" fill={paper} />
  <path d="M -12 -17 L -12 17 M 24 -15 L 24 15" fill="none" />
  <circle cx="4" cy="0" r="5" fill={selected ? coral : ink} stroke="none" />
</g>;

export const StoryMissileImpactScene: React.FC<{frame: number; timeline?: AssimilationTimeline}> = ({frame, timeline = assimilationTimeline}) => {
  const arrival = timeline.progress('11', frame);
  const impact = timeline.progress('15', frame);
  const reconcile = smooth(timeline.progress('17', frame));
  const reshape = smooth(timeline.progress('18', frame));
  const entered = arrival >= 1;
  const flight = smooth((arrival - .45) / .55);
  const blast = entered ? clamp(1 - impact / .48) : 0;
  const spread = entered ? 1 - reshape : 0;
  const nodes = original.map((p,i) => ({x:p.x + scatter[i].x * spread + adjustment[i].x * reshape, y:p.y + scatter[i].y * spread + adjustment[i].y * reshape}));
  const behaviorNodes = nodes.map((p,i) => ({x:p.x + (original[i].x + adjustment[i].x - p.x) * reconcile, y:p.y + (original[i].y + adjustment[i].y - p.y) * reconcile - 25}));
  const phase = !entered ? 'A story approaches' : impact < .48 ? 'Impact inside the product' : reconcile === 0 ? 'Pause. Judge the change.' : reshape === 0 ? 'Behavior finds coherence' : reshape < 1 ? 'Structure follows through' : 'The change remains';
  const burstPoints = Array.from({length: 24}, (_,i) => {const angle = i * Math.PI / 12; const radius = i % 2 === 0 ? 123 : 52; return `${400 + Math.cos(angle) * radius},${505 + Math.sin(angle) * radius}`;}).join(' ');
  return <StoryProductFrame title={phase} description="An upright product receives a missile from the right; an internal explosion becomes lasting behavior and structure" edition="IMPACT STUDY" caption={timeline.caption(frame)}>
    <defs>
      <marker id="impact-axis-tip" markerWidth="9" markerHeight="9" refX="7" refY="4" orient="auto"><path d="M 1 1 L 7 4 L 1 7" fill="none" stroke={ink} strokeWidth="1.5" /></marker>
    </defs>
    <g transform="translate(0 -60)">
    <g transform={`matrix(1 ${-behaviorShear} 0 1 0 ${560 * behaviorShear})`}>
    <path d={outline} fill={paper} stroke="#CBD0C5" strokeWidth="2" />
    <text x="182" y="311" fontFamily="Georgia, serif" fontSize="30" fill={ink} transform="rotate(-13 182 311)">Product</text>
    <g fill="none" stroke={ink} strokeWidth="2.5" markerEnd="url(#impact-axis-tip)">
      <path data-testid="structure-axis" d="M 560 620 L 560 233" />
      <path data-testid="behavior-axis" d="M 560 620 L 152 716" />
    </g>
    <circle cx="560" cy="620" r="5" fill={ink} />
    <text x="267" y="735" fontSize="26" fill={green} transform="rotate(-13 267 735)">Behavior</text>
    <g data-testid="unaffected-region">
      <path d="M 205 365 L 524 291 L 524 374 L 205 448 Z" fill={green} opacity=".045" />
      <text x="219" y="420" fontSize="15" fill={green} transform="rotate(-13 219 420)">UNCHANGED</text>
    </g>
    <g stroke={blue} strokeWidth="2.5" fill="none">
      {connections.map(([a,b]) => <path key={`${a}-${b}`} data-testid={`connection-${a}-${b}`} d={route([nodes[a],nodes[b]])} opacity=".55" />)}
      <path data-testid="assimilated-structure" d={route([nodes[4],nodes[8]])} opacity={reshape} strokeWidth="4" />
    </g>
    <g stroke={green} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
      {[[0,1,2],[3,4,5],[6,7,8]].map((indices,i) => <path key={i} data-testid={`behavior-${i}`} d={route(indices.map((index) => behaviorNodes[index]))} />)}
      <path data-testid="assimilated-behavior" d={route([behaviorNodes[3], behaviorNodes[4], {x:430, y:behaviorNodes[4].y}, behaviorNodes[8]])} stroke={coral} opacity={reconcile} />
    </g>
    {nodes.map((p,i) => <g key={i} data-testid={`component-${i}`} transform={`translate(${p.x} ${p.y})`}>
      <rect x="-14" y="-14" width="28" height="28" rx="4" fill={paper} stroke={blue} strokeWidth="3" />
      <path d="M -6 0 H 6 M 0 -6 V 6" stroke={blue} strokeWidth="1.5" />
      {adjustment[i].x !== 0 || adjustment[i].y !== 0 ? <circle cx="11" cy="-11" r="4" fill={coral} opacity={reshape} /> : null}
    </g>)}
    <g data-testid="judgment" opacity={entered && impact >= .48 ? 1 - reconcile : 0} fill="none" stroke={coral} strokeWidth="2" strokeDasharray="5 6">
      <path d={route([nodes[3],{x:386,y:530},nodes[8]])} />
      <path d={route([nodes[3],{x:412,y:425},nodes[8]])} />
      <circle cx="386" cy="530" r="9" />
      <circle cx="412" cy="425" r="9" />
    </g>
    </g>
    <text x="580" y="267" fontSize="26" fill={blue}>Structure</text>
    <path data-testid="time-axis" d="M 1000 620 L 560 620" fill="none" stroke={ink} strokeWidth="2.5" markerEnd="url(#impact-axis-tip)" />
    <text x="810" y="659" fontSize="26" fill={ink}>Time</text>
    <g transform={`translate(0 ${160 * behaviorShear})`}>
    <text x="799" y="420" textAnchor="middle" fill={ink} fontSize="24">Product backlog</text>
    <path d="M 637 549 L 637 563 L 998 563 L 998 549" fill="none" stroke={ink} strokeWidth="1.5" opacity=".4" />
    <Missile x={827} /><Missile x={951} />
    {!entered && <>
      <path d={`M ${714 - 300 * flight} 505 H 738`} fill="none" stroke={coral} strokeWidth="3" strokeDasharray="7 8" opacity={flight * .65} />
      <Missile x={703 - 303 * flight} selected />
    </>}
    {blast > 0 && <g data-testid="internal-blast" opacity={blast}>
      <circle cx="400" cy="505" r={53 + (1 - blast) * 100} fill="none" stroke={coral} strokeWidth="3" />
      <polygon points={burstPoints} fill="#F5D19A" stroke={coral} strokeWidth="4" />
      <polygon points="400,453 413,482 449,478 429,505 451,530 416,525 400,558 386,526 350,533 373,505 354,481 385,484" fill={coral} />
      <path d="M 395 483 L 405 506 L 389 506 L 403 529" stroke={paper} strokeWidth="5" fill="none" />
      {Array.from({length: 10}, (_,i) => {const a = i * Math.PI / 5; const r = 116 + (1 - blast) * 28; return <path key={i} d={`M ${400 + Math.cos(a) * r} ${505 + Math.sin(a) * r} l ${Math.cos(a) * 17} ${Math.sin(a) * 17}`} stroke={coral} strokeWidth="3" />;})}
    </g>}
    </g>
    <g data-testid="product-history" transform="translate(714 689)" opacity=".48">
      {[0,1].map((i) => <g key={i} transform={`translate(${i * 34} ${-i * 9})`}><path d="M 0 10 L 65 -5 L 65 48 L 0 63 Z M 20 5 V 57 M 43 0 V 53 M 0 28 L 65 13 M 0 45 L 65 30" fill="none" stroke={blue} strokeWidth="1.5" /></g>)}
      <text x="121" y="31" fontSize="19" fill={ink}>History</text>
    </g>
    </g>
  </StoryProductFrame>;
};

export const StoryMissileImpact: React.FC = () => <StoryMissileImpactScene frame={useCurrentFrame()} />;
