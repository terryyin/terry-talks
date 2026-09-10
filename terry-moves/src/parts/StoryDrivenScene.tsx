import React from 'react';
import {useCurrentFrame} from 'remotion';
import {StoryProductFrame} from './StoryProductFrame';
import {UprightProduct} from './UprightProduct';
import {storyDrivenTimeline, StoryDrivenTimeline} from './StoryDrivenTimeline';

const paper = '#F5F1E7';
const ink = '#253B3C';
const coral = '#D9654E';
const green = '#337A62';
// A left-facing projectile stays distinguishable from the product's rounded components.
export const StoryMissile: React.FC<{selected?: boolean}> = ({selected = false}) => <g>
  <path d="M 20 -11 L 40 -24 L 36 -9 M 20 11 L 40 24 L 36 9" fill={selected ? coral : '#C5B8A6'} stroke={ink} strokeWidth="2" strokeLinejoin="round" />
  <path d="M -42 0 Q -25 -14 -12 -12 H 37 V 12 H -12 Q -25 14 -42 0 Z" fill={selected ? coral : '#E5DACC'} stroke={ink} strokeWidth="2.5" />
  <path d="M -21 -9 L -21 9" stroke={paper} strokeWidth="3" />
  <path d="M 37 -7 H 45 V 7 H 37" fill={ink} />
  <path d="M 50 -4 L 64 0 L 50 4" fill={selected ? '#E5AC58' : '#C5B8A6'} />
</g>;
const smooth = (v: number) => v * v * (3 - 2 * v);

const chapters: [string, string][] = [
  ['28', 'Ready to evolve again'],
  ['27', 'The change remains'],
  ['26', 'A clear present'],
  ['25', 'History remains available'],
  ['24', 'The story is spent'],
  ['23', 'The impact is part of the product'],
  ['22', 'A coherent, changed product'],
  ['21', 'Decisions become explicit'],
  ['20', 'Resolve the questions'],
  ['19', 'Judgment before decisions'],
  ['18', 'Reshape the structure'],
  ['17', 'Reconcile the behavior'],
  ['16', 'Assimilate the impact'],
  ['15', 'The product feels the change'],
  ['14', 'Impact on the product'],
  ['13', 'A state. A transition.'],
  ['12', 'Many stories. One behavior.'],
  ['10', 'A change crosses boundaries'],
  ['09', 'A difference for someone'],
  ['07', 'Something worth changing'],
  ['06', 'Possible futures'],
  ['05', 'A product through time'],
  ['04', 'How it fits together'],
  ['03', 'What the product does'],
  ['02', 'The world that does'],
];

export const StoryDrivenScene: React.FC<{frame: number; timeline?: StoryDrivenTimeline}> = ({frame, timeline = storyDrivenTimeline}) => {
  const p = (id: string) => timeline.progress(id, frame);
  const reveal = (id: string) => smooth(Math.min(1, p(id) * 2));
  const behavior = reveal('03');
  const structure = reveal('04');
  const history = reveal('05');
  const desire = reveal('07') * (1 - reveal('10'));
  const backlog = reveal('06') * (1 - reveal('14'));
  const proposed = reveal('10') * (1 - reveal('14'));
  const arrival = .35 * p('10') + .65 * p('11');
  const disturbance = .22 * p('14') + .78 * p('15');
  const earlier = reveal('12') * (1 - reveal('13'));
  const reconcile = .3 * smooth(p('16')) + .7 * smooth(p('17'));
  const reshape = .8 * smooth(p('18')) + .2 * smooth(p('20'));
  const choice = reveal('19') * (1 - smooth(p('20')));
  const decisions = smooth(p('21'));
  const spent = smooth(p('24'));
  const next = reveal('28');
  const phase = chapters.find(([cue]) => p(cue) > 0)?.[1] ?? 'A world that could be';
  return <StoryProductFrame title={phase} description="A story crosses the product, becomes coherent behavior and structure, and recedes into available history" edition="WORKING CUT" caption={timeline.caption(frame)}>
      <UprightProduct arrival={arrival} disturbance={disturbance} reconcile={reconcile} reshape={reshape} choice={choice} decisions={decisions} spentHistory={spent} behavior={behavior} structure={structure} history={history} />
      <g data-testid="next-possibility" opacity={next} transform={`translate(${945 - 35 * next} 440)`}>
        <StoryMissile selected />
      </g>
      <g opacity={(1 - reveal('06')) * (1 - .75 * desire)} data-testid="imagined-story">
        <g transform={`translate(${870 - 20 * p('01')} 440)`}><StoryMissile selected /></g>
        <text x="778" y="385" fontSize="23" fill={coral} letterSpacing="2">POSSIBILITY</text>
      </g>
      <g opacity={1 - behavior}>
        <text x="430" y="490" fontSize="31" fill={ink} textAnchor="middle" letterSpacing="4" transform="rotate(-28 430 490)">PRESENT</text>
      </g>
      <g data-testid="possible-futures" opacity={backlog}>
        <text x="745" y="385" fontSize="24" fill={ink}>Product backlog</text>
        {[0, 1, 2].map((index) => <g data-testid={`queued-missile-${index}`} key={index} transform={`translate(${745 + index * 105 - (index === 0 ? arrival * 62 : 0)} 440)`} opacity={index === 0 ? 1 : .55}>
          <StoryMissile selected={index === 0} />
        </g>)}
      </g>
      <g data-testid="proposed-change" opacity={proposed} fill="none" stroke={coral}>
        <path d="M 633 440 C 580 426 555 402 528 424 S 462 534 420 520 S 342 533 307 589" strokeWidth="8" strokeDasharray="3 12" strokeLinecap="round" />
        {[{x: 528, y: 424}, {x: 420, y: 520}, {x: 307, y: 589}].map(({x,y}) => <circle key={x} cx={x} cy={y} r="28" strokeWidth="2" opacity=".6" />)}
        <text data-testid="proposed-change-label" opacity={p('12') > 0 ? 0 : 1} x="734" y="316" fontSize="23" fill={coral} stroke="none">INTENDED CHANGE</text>
      </g>
      <g opacity={desire} data-testid="human-desire">
        <circle cx="758" cy="262" r="17" fill={paper} stroke={ink} strokeWidth="3" />
        <path d="M 732 326 Q 727 291 758 291 Q 790 291 785 326 M 778 303 L 814 282" fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" />
        <g opacity={reveal('08')}>
          <rect x="826" y="238" width="150" height="84" rx="16" fill="#FFFCF4" stroke={green} strokeWidth="2" />
          <path d="M 845 268 L 855 278 L 873 256" fill="none" stroke={green} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 888 262 H 954 M 888 277 H 944 M 844 302 H 954" stroke={green} strokeWidth="3" opacity=".65" />
        </g>
        <text x="745" y="216" fontSize="21" fill={ink}>A better experience</text>
      </g>
      <g opacity={earlier} data-testid="earlier-transitions" fill="none" strokeLinecap="round">
        <text x="738" y="273" fontSize="24" fill={ink}>Many stories</text>
        <text x="738" y="308" fontSize="24" fill={green}>One behavior</text>
        {[0, 1, 2].map((index) => <g key={index}>
          <circle cx={742 + index * 84} cy="631" r="20" stroke={coral} strokeWidth="2" />
          <text x={742 + index * 84} y="638" textAnchor="middle" fill={coral} fontSize="20">{index + 1}</text>
          <path d={`M ${724 + index * 84} 630 Q 655 ${595 + index * 18} 420 520`} stroke={coral} strokeWidth="2" strokeDasharray="5 8" opacity=".55" />
        </g>)}
        <path d="M 280 529 Q 340 452 420 455 Q 493 365 560 381" stroke={green} strokeWidth="10" />
      </g>
  </StoryProductFrame>;
};
export const StoryDrivenDevelopment: React.FC = () => <StoryDrivenScene frame={useCurrentFrame()} />;
