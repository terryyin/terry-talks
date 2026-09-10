import React from 'react';
import {useCurrentFrame} from 'remotion';
import {StoryProductFrame} from './StoryProductFrame';
import {ProductSpace} from './ProductSpace';
import {storyDrivenTimeline, StoryDrivenTimeline} from './StoryDrivenTimeline';

const paper = '#F5F1E7';
const ink = '#253B3C';
const coral = '#D9654E';
const green = '#337A62';
const smooth = (v: number) => v * v * (3 - 2 * v);

export const StoryDrivenScene: React.FC<{frame: number; timeline?: StoryDrivenTimeline}> = ({frame, timeline = storyDrivenTimeline}) => {
  const p = (id: string) => timeline.progress(id, frame);
  const reveal = (id: string) => smooth(Math.min(1, p(id) * 2));
  const behavior = reveal('03');
  const structure = reveal('04');
  const history = reveal('05');
  const desire = reveal('07') * (1 - reveal('10'));
  const backlog = reveal('06') * (1 - reveal('10'));
  const arrival = .35 * p('10') + .65 * p('11');
  const disturbance = .22 * p('14') + .78 * p('15');
  const earlier = reveal('12') * (1 - reveal('13'));
  const phase = p('15') > 0 ? 'The product feels the change' : p('14') > 0 ? 'Impact on the product' : p('13') > 0 ? 'A state. A transition.' : p('12') > 0 ? 'Many stories. One behavior.' : p('10') > 0 ? 'A change crosses boundaries' : p('09') > 0 ? 'A difference for someone' : p('07') > 0 ? 'Something worth changing' : p('06') > 0 ? 'Possible futures' : p('05') > 0 ? 'A product through time' : p('04') > 0 ? 'How it fits together' : p('03') > 0 ? 'What the product does' : p('02') > 0 ? 'The world that does' : 'A world that could be';
  return <StoryProductFrame title={phase} description="An imagined change crosses behavior and structure into the present product" edition="WORKING CUT" caption={timeline.caption(frame)}>
      <ProductSpace arrival={arrival} disturbance={disturbance} reconcile={0} reshape={0} behavior={behavior} structure={structure} history={history} storyLabel={0} />
      <g opacity={(1 - reveal('10')) * (1 - .75 * desire)} data-testid="imagined-story">
        <path d="M 76 286 C 117 237 175 279 149 310 C 111 363 179 409 231 381" fill="none" stroke={coral} strokeWidth="10" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - Math.min(1, .12 + p('01') * 1.3)} transform={`translate(0 ${Math.sin(p('01') * Math.PI * 2) * 7 * (1 - p('02'))})`} />
        <text x="77" y="222" fontSize="23" fill={coral} letterSpacing="2">POSSIBILITY</text>
      </g>
      <g opacity={1 - behavior}>
        <text x="513" y="484" fontSize="31" fill={ink} textAnchor="middle" letterSpacing="4">PRESENT</text>
        <path d="M 449 508 H 577" stroke={ink} strokeWidth="2" opacity=".35" />
      </g>
      <g data-testid="possible-futures" opacity={backlog}>
        {[0, 1, 2].map((index) => <g key={index} transform={`translate(${98 + index * 77} ${650 + index * 23})`} opacity={index === 0 ? 1 : .4}>
          <path d="M 0 0 C 16 -28 48 -24 34 -4 S 25 25 55 14" fill="none" stroke={coral} strokeWidth="6" strokeLinecap="round" />
        </g>)}
        <path d="M 281 701 L 340 646" fill="none" stroke={coral} strokeWidth="2" strokeDasharray="5 7" />
      </g>
      <g opacity={desire} data-testid="human-desire">
        <circle cx="122" cy="432" r="17" fill={paper} stroke={ink} strokeWidth="3" />
        <path d="M 96 497 Q 91 461 122 461 Q 154 461 149 497 M 141 471 L 180 449" fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" />
        <path d="M 181 448 C 219 396 263 429 244 458 S 273 498 320 440" stroke={coral} strokeWidth="7" fill="none" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - (.25 + .75 * p('08'))} />
        <circle cx="330" cy="427" r={24 + 5 * (1 - p('09'))} fill="none" stroke={coral} strokeWidth="2" strokeDasharray="3 5" opacity={reveal('08')} />
      </g>
      <g opacity={earlier} data-testid="earlier-transitions" fill="none" strokeLinecap="round">
        {[1, 2].map((depth) => <g key={depth} transform={`translate(${depth * 40} ${-depth * 48})`} opacity={depth === 1 ? .6 : .36}>
          <path d="M 350 447 Q 488 414 550 447 Q 589 319 708 337" stroke={green} strokeWidth="8" />
          <path d={`M ${405 + depth * 40} 303 Q 452 382 550 447`} stroke={coral} strokeWidth="5" strokeDasharray="6 9" />
          <circle cx="550" cy="447" r="23" stroke={coral} strokeWidth="2" />
        </g>)}
      </g>
  </StoryProductFrame>;
};
export const StoryDrivenDevelopment: React.FC = () => <StoryDrivenScene frame={useCurrentFrame()} />;
