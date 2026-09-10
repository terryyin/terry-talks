import {render} from '@testing-library/react';
import {readFileSync} from 'fs';
import {resolve} from 'path';
import {StoryDrivenScene} from '../../src/parts/StoryDrivenScene';
import {storyDrivenCues} from '../../src/parts/StoryDrivenCues';
import {makeStoryDrivenTimeline, storyDrivenTimeline, storyDrivenOpeningDuration} from '../../src/parts/StoryDrivenTimeline';

describe('Story-driven opening', () => {
  test('uses every maintained subtitle window, including deliberate blank pauses', () => {
    const markdown = readFileSync(resolve(__dirname, '../../../Story Driven/subtitle-script.md'), 'utf8');
    const rows = [...markdown.matchAll(/\| (\d\d) \| (\d\d):(\d\d)–(\d\d):(\d\d) \| (.*?) \|/g)];
    expect(rows).toHaveLength(28);
    const {getByTestId, rerender} = render(<StoryDrivenScene frame={0} />);
    rows.forEach(([, id, sm, ss, em, es, text]) => {
      const start = (Number(sm) * 60 + Number(ss)) * 30;
      const end = (Number(em) * 60 + Number(es)) * 30;
      expect(storyDrivenCues.find((cue) => cue.id === id)?.text).toBe(text);
      [start, end - 1].forEach((frame) => {
        rerender(<StoryDrivenScene frame={frame} />);
        expect(getByTestId('caption').textContent).toBe(text);
      });
      expect(storyDrivenTimeline.caption(end)).not.toBe(text);
    });
    [360,449,2790,2879,4320,4409,5310,5399].forEach((frame) => {
      rerender(<StoryDrivenScene frame={frame} />);
      expect(getByTestId('caption')).toBeEmptyDOMElement();
    });
    expect(storyDrivenOpeningDuration).toBe(2880);
    expect(storyDrivenTimeline.durationInFrames).toBe(5400);
  });

  test('reveals dimensions progressively, selects a human desire, and preserves part of the disturbed product', () => {
    const {getByTestId, rerender} = render(<StoryDrivenScene frame={0} />);
    const initial = [0,1,4,5].map((index) => getByTestId(`component-${index}`).getAttribute('transform'));
    expect(getByTestId('structure')).toHaveAttribute('opacity', '0');
    expect(getByTestId('behavior-0').parentElement).toHaveAttribute('opacity', '0');
    rerender(<StoryDrivenScene frame={600} />);
    expect(getByTestId('behavior-0').parentElement).toHaveAttribute('opacity', '1');
    expect(getByTestId('structure')).toHaveAttribute('opacity', '0');
    rerender(<StoryDrivenScene frame={780} />);
    expect(getByTestId('structure')).toHaveAttribute('opacity', '1');
    rerender(<StoryDrivenScene frame={1455} />);
    expect(getByTestId('human-desire')).toHaveAttribute('opacity', '1');
    expect(getByTestId('possible-futures')).toHaveAttribute('opacity', '1');
    rerender(<StoryDrivenScene frame={2190} />);
    expect(getByTestId('earlier-transitions')).toHaveAttribute('opacity', '1');
    rerender(<StoryDrivenScene frame={2800} />);
    expect(getByTestId('component-0')).toHaveAttribute('transform', initial[0]);
    [1,4,5].forEach((index,i) => expect(getByTestId(`component-${index}`).getAttribute('transform')).not.toBe(initial[i + 1]));
  });

  test('holds the entire opening and disturbance pause images still', () => {
    const {container, rerender} = render(<StoryDrivenScene frame={360} />);
    const opening = container.innerHTML;
    rerender(<StoryDrivenScene frame={449} />);
    expect(container.innerHTML).toBe(opening);
    rerender(<StoryDrivenScene frame={2790} />);
    const disturbed = container.innerHTML;
    rerender(<StoryDrivenScene frame={2879} />);
    expect(container.innerHTML).toBe(disturbed);
  });

  test('cue edits shift dependent reveal and impact beats with captions', () => {
    const revised = makeStoryDrivenTimeline(storyDrivenCues.map((cue) => cue.id === '03' ? {...cue, duration: 8} : cue));
    const {getByTestId, rerender} = render(<StoryDrivenScene frame={2640} />);
    const geometry = getByTestId('structure').outerHTML;
    const caption = getByTestId('caption').textContent;
    rerender(<StoryDrivenScene frame={2700} timeline={revised} />);
    expect(getByTestId('structure').outerHTML).toBe(geometry);
    expect(getByTestId('caption').textContent).toBe(caption);
    expect(revised.durationInFrames).toBe(5460);
  });
});
