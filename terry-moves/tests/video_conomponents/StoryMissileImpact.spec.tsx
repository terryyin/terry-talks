import {render} from '@testing-library/react';
import {StoryMissileImpactScene} from '../../src/parts/StoryMissileImpact';
import {assimilationCues, assimilationTimeline, makeAssimilationTimeline} from '../../src/parts/StoryAssimilationTimeline';

describe('Faithful missile impact scene', () => {
  test('retains the excerpt captions, impact pause, and ending hold', () => {
    const {getByTestId, rerender} = render(<StoryMissileImpactScene frame={0} />);
    [[0,0],[180,1],[405,2],[585,3],[765,4]].forEach(([frame,index]) => {
      rerender(<StoryMissileImpactScene frame={frame} />);
      expect(getByTestId('caption')).toHaveTextContent(assimilationCues[index].text);
    });
    [360,404,945,989].forEach((frame) => {
      rerender(<StoryMissileImpactScene frame={frame} />);
      expect(getByTestId('caption')).toBeEmptyDOMElement();
    });
    expect(assimilationTimeline.durationInFrames).toBe(990);
    expect(assimilationTimeline.fps).toBe(30);
  });

  test('takes a missile from the queue into the product before the internal blast spends it', () => {
    const {getByTestId, getAllByTestId, queryByTestId, rerender} = render(<StoryMissileImpactScene frame={0} />);
    expect(getByTestId('selected-missile')).toHaveAttribute('transform', 'translate(703 505)');
    const queue = getAllByTestId('queued-missile').map((node) => node.outerHTML);
    expect(queryByTestId('internal-blast')).toBeNull();
    rerender(<StoryMissileImpactScene frame={170} />);
    const entry = getByTestId('selected-missile').getAttribute('transform')!;
    const x = Number(entry.match(/translate\(([^ ]+)/)![1]);
    expect(x - 43).toBeGreaterThan(175);
    expect(x + 46).toBeLessThan(560);
    expect(queryByTestId('internal-blast')).toBeNull();
    rerender(<StoryMissileImpactScene frame={190} />);
    expect(queryByTestId('selected-missile')).toBeNull();
    const center = getByTestId('internal-blast').querySelector('circle');
    expect(center).toHaveAttribute('cx', '400');
    expect(center).toHaveAttribute('cy', '505');
    expect(Number(getByTestId('internal-blast').getAttribute('opacity'))).toBeGreaterThan(.8);
    expect(getAllByTestId('queued-missile').map((node) => node.outerHTML)).toEqual(queue);
  });

  test('preserves a fixed region while multiple behaviors and components retain the assimilated change', () => {
    const {getByTestId, queryByTestId, rerender} = render(<StoryMissileImpactScene frame={0} />);
    const fixedIds = ['unaffected-region','component-0','component-1','component-2','connection-0-1','connection-1-2','behavior-0','product-history'];
    const fixed = fixedIds.map((id) => getByTestId(id).outerHTML);
    const changedIds = ['component-4','component-5','component-7','component-8','behavior-1','behavior-2'];
    const before = changedIds.map((id) => getByTestId(id).outerHTML);
    [190,360,404,700,980].forEach((frame) => {
      rerender(<StoryMissileImpactScene frame={frame} />);
      fixedIds.forEach((id,i) => expect(getByTestId(id).outerHTML).toBe(fixed[i]));
      changedIds.forEach((id,i) => expect(getByTestId(id).outerHTML).not.toBe(before[i]));
      expect(queryByTestId('selected-missile')).toBeNull();
    });
    expect(queryByTestId('internal-blast')).toBeNull();
    expect(getByTestId('assimilated-structure')).toHaveAttribute('opacity', '1');
    expect(getByTestId('assimilated-behavior')).toHaveAttribute('opacity', '1');
    expect(getByTestId('judgment')).toHaveAttribute('opacity', '0');
    rerender(<StoryMissileImpactScene frame={360} />);
    expect(getByTestId('judgment')).toHaveAttribute('opacity', '1');
    const paused = changedIds.map((id) => getByTestId(id).outerHTML);
    rerender(<StoryMissileImpactScene frame={404} />);
    changedIds.forEach((id,i) => expect(getByTestId(id).outerHTML).toBe(paused[i]));
  });

  test('keeps animation and captions together when a cue is extended', () => {
    const revised = makeAssimilationTimeline(assimilationCues.map((cue) => cue.id === '15' ? {...cue, duration:8} : cue));
    const {container, rerender} = render(<StoryMissileImpactScene frame={480} />);
    const originalScene = container.innerHTML;
    rerender(<StoryMissileImpactScene frame={540} timeline={revised} />);
    expect(container.innerHTML).toBe(originalScene);
  });
});
