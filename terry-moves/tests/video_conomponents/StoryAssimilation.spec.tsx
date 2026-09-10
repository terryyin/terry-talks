import {render} from '@testing-library/react';
import {readFileSync} from 'fs';
import {resolve} from 'path';
import {StoryAssimilationScene} from '../../src/parts/StoryAssimilation';
import {assimilationCues, assimilationTimeline, makeAssimilationTimeline} from '../../src/parts/StoryAssimilationTimeline';

describe('Story assimilation visual proof', () => {
  test('shows the exact maintained script excerpt and clears both pauses', () => {
    const source = readFileSync(resolve(__dirname, '../../../Story Driven/subtitle-script.md'), 'utf8');
    for (const cue of assimilationCues.filter((cue) => cue.text)) {
      expect(source).toContain(`| ${cue.id} |`);
      expect(source).toContain(`| ${cue.text} |`);
    }
    const {getByTestId, rerender} = render(<StoryAssimilationScene frame={0} />);
    [[0,0], [180,1], [405,2], [585,3], [765,4]].forEach(([frame,index]) => {
      rerender(<StoryAssimilationScene frame={frame} />);
      expect(getByTestId('caption')).toHaveTextContent(assimilationCues[index].text);
    });
    [360,404,945,989].forEach((frame) => {
      rerender(<StoryAssimilationScene frame={frame} />);
      expect(getByTestId('caption')).toBeEmptyDOMElement();
    });
    expect(assimilationTimeline.durationInFrames).toBe(990);
  });

  test('disturbs multiple components, preserves a region, and integrates the story into changed behavior and structure', () => {
    const {getByTestId, getAllByTestId, rerender} = render(<StoryAssimilationScene frame={0} />);
    const initial = [0,1,4,5].map((index) => getByTestId(`component-${index}`).getAttribute('transform'));
    const initialBehavior = getByTestId('behavior-0').getAttribute('d');
    rerender(<StoryAssimilationScene frame={360} />);
    expect(getByTestId('component-0').getAttribute('transform')).toBe(initial[0]);
    [1,4,5].forEach((index,i) => expect(getByTestId(`component-${index}`).getAttribute('transform')).not.toBe(initial[i + 1]));
    rerender(<StoryAssimilationScene frame={980} />);
    expect(getByTestId('component-0').getAttribute('transform')).toBe(initial[0]);
    expect(getByTestId('component-4').getAttribute('transform')).not.toBe(initial[2]);
    expect(getByTestId('behavior-0').getAttribute('d')).not.toBe(initialBehavior);
    expect(getByTestId('incoming-story')).toHaveAttribute('opacity', '0');
    expect(getByTestId('integrated-structure')).toHaveAttribute('opacity', '1');
    expect(getByTestId('integrated-behavior')).toHaveAttribute('opacity', '1');
    expect(getAllByTestId('product-history')).toHaveLength(2);
  });

  test('extending a cue shifts subsequent captions and animation together', () => {
    const revised = makeAssimilationTimeline(assimilationCues.map((cue) => cue.id === '15' ? {...cue, duration: 8} : cue));
    const {container, rerender} = render(<StoryAssimilationScene frame={480} />);
    const originalScene = container.innerHTML;
    rerender(<StoryAssimilationScene frame={540} timeline={revised} />);
    expect(container.innerHTML).toBe(originalScene);
    expect(revised.caption(450)).toBe('');
    expect(revised.durationInFrames).toBe(1050);
  });
});
