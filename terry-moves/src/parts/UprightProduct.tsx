import React from 'react';
import {ProductExplosion} from './ProductExplosion';
import {assimilateProduct, edges, pathThrough, Point} from './ProductAssimilation';
const ink = '#253B3C';
const paper = '#F5F1E7';
const blue = '#477DA4';
const green = '#337A62';
const coral = '#D9654E';
const original: Point[] = [
  {x: 280, y: 480}, {x: 420, y: 406}, {x: 560, y: 332},
  {x: 280, y: 562}, {x: 420, y: 488}, {x: 560, y: 414},
  {x: 280, y: 644}, {x: 420, y: 570}, {x: 560, y: 496},
];
const productOutline = 'M 205 465 L 630 240 L 630 510 L 205 735 Z';

export const UprightProduct: React.FC<{blastCenter: Point; blast: number; disturbance: number; reconcile: number; reshape: number; behavior?: number; structure?: number; history?: number; choice?: number; decisions?: number; spentHistory?: number}> = ({blastCenter, blast, disturbance, reconcile, reshape, behavior = 1, structure = 1, history = 1, choice = 0, decisions = 0, spentHistory = 0}) => {
  const {nodes, behaviorNodes, behaviorRoutes, alternativeAnchors} = assimilateProduct(original, disturbance, reconcile, reshape);
  return <g>
      <defs>
        <clipPath id="upright-product-interior"><path d={productOutline} /></clipPath>
        <filter id="upright-plane-shadow" x="-30%" y="-30%" width="160%" height="180%"><feGaussianBlur stdDeviation="13" /></filter>
        <marker id="upright-axis-tip" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M 0 0 L 6 3.5 L 0 7" fill="none" stroke={ink} strokeWidth="1" /></marker>
      </defs>
      <path d="M 222 480 L 647 255 L 647 525 L 222 750 Z" fill={ink} opacity=".07" filter="url(#upright-plane-shadow)" />
      <g opacity={history}>{[2,1].map((depth) => <g key={depth} data-testid="product-history" transform={`translate(${-depth * 18} ${-depth * 8})`} opacity={depth === 2 ? .09 : .15}>
        <path d={productOutline} fill="none" stroke={blue} strokeWidth="2" />
        {edges.map(([a,b]) => <line key={`${a}-${b}`} x1={original[a].x} y1={original[a].y} x2={original[b].x} y2={original[b].y} stroke={blue} strokeWidth="2" />)}
      </g>)}
      <g data-testid="spent-story-history" opacity={spentHistory * .55} transform="translate(745 640)">
        <text x="0" y="-24" fill={ink} fontSize="20">DECISION HISTORY</text>
        <g data-testid="historical-product-state" fill={paper} stroke={blue} strokeWidth="2">
          <rect width="100" height="77" rx="8" />
          <path d="M 18 20 H 78 M 18 39 H 78 M 18 58 H 78 M 30 20 V 58 M 66 20 V 58" fill="none" />
        </g>
        <path d="M 111 38 H 136 M 129 31 L 136 38 L 129 45" fill="none" stroke={ink} strokeWidth="2" />
        <g data-testid="historical-decision" transform="translate(150 0)" fill={paper} stroke={coral} strokeWidth="2">
          <rect width="100" height="77" rx="8" />
          <path d="M 18 20 L 56 30 L 78 58 M 18 39 L 56 30 M 18 58 H 78" fill="none" />
          <circle cx="56" cy="30" r="5" />
        </g>
      </g>
      <text x="90" y="414" fill={ink} opacity=".48" fontSize="20" letterSpacing="2">HISTORY</text>
      </g>
      <path data-testid="present-product" d={productOutline} fill="#FFFCF4" stroke="#C7CDC2" strokeWidth="2" />
      <g fill="none" stroke={ink} strokeWidth="2" opacity=".8">
        <path data-testid="structure-axis" d="M 652 534 L 652 215" opacity={structure} markerEnd="url(#upright-axis-tip)" />
        <path data-testid="behavior-axis" d="M 652 534 L 200 774" opacity={behavior} markerEnd="url(#upright-axis-tip)" />
        <path data-testid="time-axis" d="M 1000 534 L 652 534" opacity={history} markerEnd="url(#upright-axis-tip)" />
      </g>
      <text opacity={structure} x="688" y="360" fontSize="25" fill={blue} transform="rotate(-90 688 360)">Structure</text>
      <text opacity={behavior} x="350" y="727" fontSize="25" fill={green} transform="rotate(-28 350 727)">Behavior</text>
      <text opacity={history} x="815" y="578" fontSize="25" fill={ink}>Time</text>
      <g data-testid="structure" opacity={structure}>
        {edges.map(([a,b]) => <line key={`${a}-${b}`} data-testid={a === 0 && b === 3 ? 'preserved-connection' : undefined} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke={blue} strokeWidth="2.5" opacity=".45" />)}
        {nodes.map((point, index) => <g key={index} data-testid={`component-${index}`} transform={`translate(${point.x} ${point.y})`}>
          <rect x="-17" y="-17" width="34" height="34" rx="8" fill={paper} stroke={blue} strokeWidth="3" />
          <path d="M -8 0 H 8 M 0 -8 V 8" stroke={blue} strokeWidth="1.5" opacity=".55" />
        </g>)}
        <line data-testid="integrated-structure" x1={nodes[4].x} y1={nodes[4].y} x2={nodes[8].x} y2={nodes[8].y} stroke={coral} strokeWidth="4" opacity={reshape} />
      </g>
      <g data-testid="judgment-alternatives" opacity={choice} fill="none" stroke={coral} strokeWidth="3" strokeDasharray="7 8">
        {alternativeAnchors.map((anchor, index) => <path key={index} d={pathThrough([nodes[1], anchor, nodes[8]])} />)}
        {alternativeAnchors.map((anchor, index) => <circle key={index} cx={anchor.x} cy={anchor.y} r="12" />)}
      </g>
      <g data-testid="explicit-decisions" opacity={decisions} fill={paper} stroke={coral} strokeWidth="3">
        {[4, 8].map((index) => <circle key={index} cx={nodes[index].x} cy={nodes[index].y} r="7" />)}
      </g>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <g opacity={behavior}>{behaviorRoutes.map((route, index) => <path key={index} data-testid={`behavior-${index}`} d={pathThrough(route.map((node) => ({x: behaviorNodes[node].x, y: behaviorNodes[node].y - 33})))} stroke={green} strokeWidth="8" opacity=".87" />)}
        <path data-testid="integrated-behavior" d={pathThrough([1,5,8].map((index) => ({x: behaviorNodes[index].x, y: behaviorNodes[index].y - 33})))} stroke={coral} strokeWidth="8" opacity={reconcile} />
        </g>
      </g>
      <ProductExplosion center={blastCenter} progress={blast} />
  </g>;
};
