import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {IllustratedConversation, ThoughtfulIllustratedConversationComposition, ThoughtfulIllustratedConversationFilm} from '../../src/illustratedConversation/IllustratedConversation';
import {compileConversation} from '../../src/illustratedConversation/performance';
import {conversationScript, thoughtfulConversationScript} from '../../src/illustratedConversation/script';
import {setFrame} from './testSupport';

jest.mock('remotion',()=>jest.requireActual('./testSupport').mockRemotion());

const baseline=compileConversation(conversationScript,30);
const revised=compileConversation(thoughtfulConversationScript,30);
const render=(frame:number,script=thoughtfulConversationScript)=>{
 setFrame(frame);
 return renderToStaticMarkup(<IllustratedConversation script={script}/>);
};
const drawn=(markup:string,selector:string)=>new DOMParser().parseFromString(markup,'text/html').querySelector(selector)!;

test('named thoughtful version uses the shared scene and preserves the selected takes, mouths, captions and all turn timing',()=>{
 const registered=ThoughtfulIllustratedConversationComposition({}) as React.ReactElement<{id:string;component:unknown;durationInFrames:number}>;
 expect(registered.props).toMatchObject({id:'IllustratedConversationThoughtful',component:ThoughtfulIllustratedConversationFilm,durationInFrames:582});
 setFrame(240);
 expect(renderToStaticMarkup(<ThoughtfulIllustratedConversationFilm/>)).toBe(render(240));
 expect(thoughtfulConversationScript.turns).toEqual(conversationScript.turns);
 expect(thoughtfulConversationScript.takes).toEqual(conversationScript.takes);
 expect(thoughtfulConversationScript.initial).toEqual(conversationScript.initial);
 expect(revised.turns).toEqual(baseline.turns);
 expect(revised.durationInFrames).toBe(baseline.durationInFrames);
 for (let frame=0;frame<baseline.durationInFrames;frame++) {
  const before=baseline.sample(frame);const after=revised.sample(frame);
  expect(after.caption).toBe(before.caption);
  expect(after.turn).toBe(before.turn);
  expect(after.actors.engineer.mouth).toBe(before.actors.engineer.mouth);
  expect(after.actors.ai.mouth).toBe(before.actors.ai.mouth);
 }
});

test('real scene markup is identical on every frame outside the question reaction and contains visible changed eyes and hand inside',()=>{
 const differences:number[]=[];
 for (let frame=0;frame<baseline.durationInFrames;frame++) {
  const before=render(frame,conversationScript);const after=render(frame);
  if (frame<156 || frame>=299) expect(after).toBe(before);
  else {
   if (after!==before) differences.push(frame);
   expect(drawn(after,'[data-testid="engineer"]').outerHTML).toBe(drawn(before,'[data-testid="engineer"]').outerHTML);
   expect(drawn(after,'[data-testid="conversation-caption"]').outerHTML).toBe(drawn(before,'[data-testid="conversation-caption"]').outerHTML);
  }
 }
 expect(differences.length).toBeGreaterThan(100);
 const before=render(190,conversationScript);const after=render(190);
 // The existing AI draws surprise as elongated eyes; thoughtfulness avoids it.
 expect(drawn(before,'[data-testid="ai-companion"] ellipse[ry="10"]')).not.toBeNull();
 expect(new DOMParser().parseFromString(after,'text/html').querySelector('[data-testid="ai-companion"] ellipse[ry="10"]')).toBeNull();
 expect(drawn(after,'[data-testid="ai-companion"] [data-testid="articulated-arm"]').getAttribute('data-hand')).not.toBe(drawn(before,'[data-testid="ai-companion"] [data-testid="articulated-arm"]').getAttribute('data-hand'));
 expect(render(299)).toBe(render(299,conversationScript));
});

test('the revised drawing is deterministic after direct mounts, forward playback and reverse seeks',()=>{
 const direct=render(240);
 for (const frame of [0,156,190,299,336,581,471,240,156]) render(frame);
 expect(render(240)).toBe(direct);
 expect(render(240,conversationScript)).not.toBe(direct);
});
