import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {assimilationTimeline, AssimilationTimeline} from './StoryAssimilationTimeline';

const ink = '#253B3C';
const paper = '#F5F1E7';
const blue = '#477DA4';
const green = '#337A62';
const coral = '#D9654E';
const smooth = (value: number) => value * value * (3 - 2 * value);
const mix = (a: number, b: number, amount: number) => a + (b - a) * amount;
type Point = {x: number; y: number};
const original: Point[] = [
  {x: 308, y: 370}, {x: 508, y: 370}, {x: 708, y: 370},
  {x: 350, y: 480}, {x: 550, y: 480}, {x: 750, y: 480},
  {x: 392, y: 590}, {x: 592, y: 590}, {x: 792, y: 590},
];
const shifted: Point[] = original.map((point, index) => index % 3 === 0 ? point : {
  x: point.x + [0, 24, -26][index % 3],
  y: point.y + (index === 4 ? -28 : index === 5 ? 16 : 0),
});
const productOutline = 'M 265 330 L 760 330 L 865 635 L 370 635 Z';
const edges = [[0,1],[1,2],[3,4],[4,5],[6,7],[7,8],[0,3],[3,6],[1,4],[4,7],[2,5],[5,8],[1,5]];
const pathThrough = (points: Point[]) => points.map((point, index) => index === 0 ? `M ${point.x} ${point.y}` : `Q ${points[index - 1].x + 38} ${point.y - 28} ${point.x} ${point.y}`).join(' ');

export const StoryAssimilationScene: React.FC<{frame: number; timeline?: AssimilationTimeline}> = ({frame, timeline = assimilationTimeline}) => {
  const arrival = timeline.progress('11', frame);
  const disturbance = timeline.progress('15', frame);
  const reconcile = smooth(timeline.progress('17', frame));
  const reshape = smooth(timeline.progress('18', frame));
  const strain = smooth(Math.min(1, disturbance * 2.3)) * (1 - reshape);
  const strokeOpacity = arrival === 0 ? 0 : 1 - reconcile;
  const nodes = original.map((point, index) => {
    if (index % 3 === 0) return point;
    const vibration = Math.sin(disturbance * Math.PI * 5 + index) * 5 * Math.sin(disturbance * Math.PI);
    return {
      x: mix(point.x, shifted[index].x, reshape) + strain * (index % 2 ? 28 : -22) + vibration,
      y: mix(point.y, shifted[index].y, reshape) + strain * (index % 2 ? -23 : 26),
    };
  });
  const behaviorNodes = nodes.map((point, index) => ({x: point.x, y: mix(point.y, shifted[index].y, reconcile * (1 - reshape))}));
  const phase = reconcile === 0 ? (disturbance === 0 ? 'A story arrives' : 'The product feels the change') : reshape === 0 ? 'Behavior finds coherence' : reshape < 1 ? 'Structure follows through' : 'The change remains';
  const behaviorRoutes = [[0,1,5,8], [3,4,2], [6,7,5]];
  return <AbsoluteFill style={{backgroundColor: paper, color: ink, fontFamily: 'Arial, sans-serif'}}>
    <div style={{position: 'absolute', top: 58, left: 68, fontSize: 20, letterSpacing: 4, fontWeight: 700}}>STORY / PRODUCT</div>
    <div style={{position: 'absolute', top: 105, left: 65, fontSize: 53, fontFamily: 'Georgia, serif', letterSpacing: -1.5}}>{phase}</div>
    <svg viewBox="0 0 1080 1080" style={{position: 'absolute', inset: 0}} aria-label="A story changes behavior and structure while product history remains available">
      <defs>
        <filter id="plane-shadow" x="-30%" y="-30%" width="160%" height="180%"><feGaussianBlur stdDeviation="13" /></filter>
        <marker id="axis-tip" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M 0 0 L 6 3.5 L 0 7" fill="none" stroke={ink} strokeWidth="1" /></marker>
      </defs>
      <path d="M 290 415 L 835 415 L 925 670 L 380 670 Z" fill={ink} opacity=".07" filter="url(#plane-shadow)" />
      {[2,1].map((depth) => <g key={depth} data-testid="product-history" transform={`translate(${depth * 40} ${depth * -48})`} opacity={depth === 2 ? .09 : .15}>
        <path d={productOutline} fill="none" stroke={blue} strokeWidth="2" />
        {edges.map(([a,b]) => <line key={`${a}-${b}`} x1={original[a].x} y1={original[a].y} x2={original[b].x} y2={original[b].y} stroke={blue} strokeWidth="2" />)}
      </g>)}
      <text x="845" y="243" fill={ink} opacity=".48" fontSize="20" letterSpacing="2">HISTORY</text>
      <path d={productOutline} fill="#FFFCF4" stroke="#C7CDC2" strokeWidth="2" />
      <path d="M 332 691 L 894 691 M 332 691 L 220 358 M 966 507 L 865 635" fill="none" stroke={ink} strokeWidth="1.6" opacity=".68" markerEnd="url(#axis-tip)" />
      <text x="581" y="735" fontSize="25" fill={blue}>Structure</text>
      <text x="196" y="555" fontSize="25" fill={green} transform="rotate(-71 196 555)">Behavior</text>
      <text x="922" y="588" fontSize="25" fill={ink} transform="rotate(-52 922 588)">Time</text>
      <g data-testid="structure">
        {edges.map(([a,b]) => <line key={`${a}-${b}`} data-testid={a === 0 && b === 3 ? 'preserved-connection' : undefined} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke={blue} strokeWidth="3" opacity=".62" />)}
        {nodes.map((point, index) => <g key={index} data-testid={`component-${index}`} transform={`translate(${point.x} ${point.y})`}>
          <rect x="-17" y="-17" width="34" height="34" rx="5" fill={paper} stroke={blue} strokeWidth="3" />
          <path d="M -8 0 H 8 M 0 -8 V 8" stroke={blue} strokeWidth="1.5" opacity=".55" />
        </g>)}
        <line data-testid="integrated-structure" x1={nodes[4].x} y1={nodes[4].y} x2={nodes[8].x} y2={nodes[8].y} stroke={coral} strokeWidth="4" opacity={reshape} />
      </g>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {behaviorRoutes.map((route, index) => <path key={index} data-testid={`behavior-${index}`} d={pathThrough(route.map((node) => ({x: behaviorNodes[node].x, y: behaviorNodes[node].y - 33})))} stroke={green} strokeWidth="8" opacity=".87" />)}
        <path data-testid="integrated-behavior" d={pathThrough([1,5,8].map((index) => ({x: behaviorNodes[index].x, y: behaviorNodes[index].y - 33})))} stroke={coral} strokeWidth="8" opacity={reconcile} />
        <path data-testid="incoming-story" d="M 77 290 C 117 238 174 280 149 310 C 110 361 187 411 264 393 S 370 289 433 361 S 477 563 552 533 S 634 383 704 434 S 739 570 839 550" stroke={coral} strokeWidth="10" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - smooth(Math.min(1, arrival * 1.4))} opacity={strokeOpacity} />
      </g>
      <g opacity={1 - Math.min(1, disturbance * 3)}><text x="84" y="222" fontSize="23" fill={coral} letterSpacing="2">STORY</text><path d="M 116 233 L 116 262" stroke={coral} /></g>
      <line x1="68" x2="1012" y1="795" y2="795" stroke={ink} strokeWidth="1" opacity=".2" />
      <text x="68" y="1020" fontSize="18" letterSpacing="2" fill={ink} opacity=".55">THE CHANGE REMAINS</text>
      <text x="1012" y="1020" textAnchor="end" fontSize="18" fill={ink} opacity=".55">STUDY 01</text>
    </svg>
    <div data-testid="caption" style={{position: 'absolute', top: 831, left: 78, right: 78, height: 142, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 38, lineHeight: 1.28, textAlign: 'center', fontWeight: 500}}>{timeline.caption(frame)}</div>
  </AbsoluteFill>;
};

export const StoryAssimilation: React.FC = () => <StoryAssimilationScene frame={useCurrentFrame()} />;
