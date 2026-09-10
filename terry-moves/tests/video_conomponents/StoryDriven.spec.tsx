import {render} from '@testing-library/react';
import {readFileSync} from 'fs';
import {resolve} from 'path';
import {StoryDrivenScene} from '../../src/parts/StoryDrivenScene';
import {storyDrivenCues} from '../../src/parts/StoryDrivenCues';
import {makeStoryDrivenTimeline, storyDrivenTimeline} from '../../src/parts/StoryDrivenTimeline';

describe('Story-driven complete cut', () => {
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

  test('resolves visible choices into changed behavior and structure while preserving the left region', () => {
    const {getByTestId, rerender} = render(<StoryDrivenScene frame={2400} />);
    const preserved = getByTestId('preserved-connection').outerHTML;
    const original = getByTestId('component-4').getAttribute('transform');
    const originalBehavior = getByTestId('behavior-1').getAttribute('d');
    rerender(<StoryDrivenScene frame={3540} />);
    expect(getByTestId('judgment-alternatives')).toHaveAttribute('opacity', '1');
    const tentativeStructure = getByTestId('component-4').getAttribute('transform');
    rerender(<StoryDrivenScene frame={4110} />);
    expect(getByTestId('judgment-alternatives')).toHaveAttribute('opacity', '0');
    expect(getByTestId('explicit-decisions')).toHaveAttribute('opacity', '1');
    expect(getByTestId('component-4').getAttribute('transform')).not.toBe(tentativeStructure);
    expect(getByTestId('component-4').getAttribute('transform')).not.toBe(original);
    expect(getByTestId('behavior-1').getAttribute('d')).not.toBe(originalBehavior);
    expect(getByTestId('preserved-connection').outerHTML).toBe(preserved);
    expect(getByTestId('integrated-behavior')).toHaveAttribute('opacity', '1');
    expect(getByTestId('integrated-structure')).toHaveAttribute('opacity', '1');
    expect(getByTestId('incoming-story')).toHaveAttribute('opacity', '0');
    const present = getByTestId('structure').outerHTML;
    rerender(<StoryDrivenScene frame={4650} />);
    expect(getByTestId('spent-story-history')).toHaveAttribute('opacity', '0.35');
    expect(getByTestId('spent-story-history')).toHaveAttribute('transform', 'translate(80 -96)');
    expect(getByTestId('next-possibility')).toHaveAttribute('opacity', '0');
    rerender(<StoryDrivenScene frame={5399} />);
    expect(getByTestId('next-possibility')).toHaveAttribute('opacity', '1');
    expect(getByTestId('incoming-story')).toHaveAttribute('opacity', '0');
    expect(getByTestId('structure').outerHTML).toBe(present);
    expect(getByTestId('spent-story-history')).toHaveAttribute('opacity', '0.35');
  });

  test('holds both late pauses completely still, including history and next possibility', () => {
    const {container, rerender} = render(<StoryDrivenScene frame={4320} />);
    const settled = container.innerHTML;
    rerender(<StoryDrivenScene frame={4409} />);
    expect(container.innerHTML).toBe(settled);
    rerender(<StoryDrivenScene frame={5310} />);
    const ending = container.innerHTML;
    rerender(<StoryDrivenScene frame={5399} />);
    expect(container.innerHTML).toBe(ending);
  });

  test('retiming judgment shifts decisions, history and the ending with their subtitles', () => {
    const revised = makeStoryDrivenTimeline(storyDrivenCues.map((cue) => cue.id === '19' ? {...cue, duration: 8} : cue));
    const {container, rerender} = render(<StoryDrivenScene frame={0} />);
    [3690, 3870, 4500, 5190, 5340].forEach((frame) => {
      rerender(<StoryDrivenScene frame={frame} />);
      const expected = container.innerHTML;
      rerender(<StoryDrivenScene frame={frame + 60} timeline={revised} />);
      expect(container.innerHTML).toBe(expected);
    });
  });

});
