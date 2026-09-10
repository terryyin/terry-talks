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

  test('places an upright product left of recognizable missiles and points horizontal Time into the axes joint', () => {
    const {getByTestId} = render(<StoryDrivenScene frame={1170} />);
    const endpoints = (id: string) => getByTestId(id).getAttribute('d')!.match(/-?\d+(?:\.\d+)?/g)!.map(Number);
    const [sx, sy, tx, ty] = endpoints('structure-axis');
    const [bx, by, lx, ly] = endpoints('behavior-axis');
    const [fx, fy, jx, jy] = endpoints('time-axis');
    expect(sx).toBe(tx);
    expect(ty).toBeLessThan(sy);
    expect(lx).toBeLessThan(bx);
    expect(ly).toBeGreaterThan(by);
    expect([sx, sy]).toEqual([bx, by]);
    expect([jx, jy]).toEqual([sx, sy]);
    expect(fy).toBe(jy);
    expect(fx).toBeGreaterThan(jx);
    expect(getByTestId('time-axis').getAttribute('marker-end')).toContain('upright-axis-tip');
    const outline = endpoints('present-product');
    const rightEdge = Math.max(...outline.filter((_, index) => index % 2 === 0));
    expect(Math.max(...outline.filter((_, index) => index % 2 === 1))).toBeLessThan(795);
    [0, 1, 2].forEach((index) => {
      const missile = getByTestId(`queued-missile-${index}`);
      const x = Number(missile.getAttribute('transform')!.match(/[\d.]+/)![0]);
      expect(x - 42).toBeGreaterThan(rightEdge);
      // Rendered nose/body and tail fins survive at the scene boundary.
      expect(missile.querySelector('path[d^="M -42 0"]')).not.toBeNull();
      expect(missile.querySelector('path[d^="M 20 -11"]')).not.toBeNull();
    });
  });

  test('shows desire and proposed cross-boundary benefit before physical disturbance, then many stories for one behavior', () => {
    const {getByTestId, rerender} = render(<StoryDrivenScene frame={1630} />);
    const originalProduct = getByTestId('structure').outerHTML;
    expect(getByTestId('human-desire')).toHaveAttribute('opacity', '1');
    expect(getByTestId('human-desire')).toHaveTextContent('A better experience');
    expect(document.querySelector('[data-testid="incoming-story"]')).toBeNull();
    rerender(<StoryDrivenScene frame={2030} />);
    expect(getByTestId('proposed-change')).toHaveAttribute('opacity', '1');
    expect(getByTestId('proposed-change-label')).toHaveAttribute('opacity', '1');
    expect(getByTestId('proposed-change').querySelectorAll('circle').length).toBeGreaterThan(1);
    expect(getByTestId('structure').outerHTML).toBe(originalProduct);
    expect(document.querySelector('[data-testid="incoming-story"]')).toBeNull();
    rerender(<StoryDrivenScene frame={2190} />);
    expect(getByTestId('earlier-transitions')).toHaveTextContent('Many stories');
    expect(getByTestId('earlier-transitions')).toHaveTextContent('One behavior');
    expect(getByTestId('proposed-change-label')).toHaveAttribute('opacity', '0');
    expect(getByTestId('proposed-change')).toHaveAttribute('opacity', '1');
    expect(getByTestId('structure').outerHTML).toBe(originalProduct);
  });

  test('flies the selected queue missile continuously inside before exploding and spending it', () => {
    const {getByTestId, rerender} = render(<StoryDrivenScene frame={2429} />);
    const x = () => Number(getByTestId('queued-missile-0').getAttribute('transform')!.match(/[\d.]+/)![0]);
    const before = getByTestId('structure').outerHTML;
    expect(x()).toBe(683);
    rerender(<StoryDrivenScene frame={2430} />);
    expect(x()).toBe(683);
    let previous = x();
    [2445, 2470, 2490, 2502].forEach((frame) => {
      rerender(<StoryDrivenScene frame={frame} />);
      expect(x()).toBeLessThan(previous);
      expect(getByTestId('queued-missile-0')).toHaveAttribute('opacity', '1');
      expect(getByTestId('internal-explosion')).toHaveAttribute('opacity', '0');
      expect(getByTestId('structure').outerHTML).toBe(before);
      previous = x();
    });
    // The whole missile, including the exhaust at +64, entered the plane.
    expect(x() + 64).toBeLessThan(630);
    expect(x() - 42).toBeGreaterThan(205);
    rerender(<StoryDrivenScene frame={2540} />);
    expect(getByTestId('queued-missile-0')).toHaveAttribute('opacity', '0');
    expect(getByTestId('internal-explosion')).toHaveAttribute('opacity', '1');
    const blast = getByTestId('internal-explosion').outerHTML;
    const boundary = document.querySelector('#upright-product-interior path');
    expect(boundary?.getAttribute('d')).toBe(getByTestId('present-product').getAttribute('d'));
    expect(getByTestId('internal-explosion')).toHaveAttribute('clip-path', 'url(#upright-product-interior)');
    const points = getByTestId('blast-core').getAttribute('points')!.split(' ').map((point) => point.split(',').map(Number));
    points.forEach(([px, py]) => {
      expect(px).toBeGreaterThan(205);
      expect(px).toBeLessThan(630);
      expect(py).toBeGreaterThan(465 - (px - 205) * 225 / 425);
      expect(py).toBeLessThan(735 - (px - 205) * 225 / 425);
    });
    rerender(<StoryDrivenScene frame={2640} />);
    expect(getByTestId('internal-explosion').outerHTML).not.toBe(blast);
    expect(Number(getByTestId('internal-explosion').getAttribute('opacity'))).toBeGreaterThan(0);
    rerender(<StoryDrivenScene frame={2790} />);
    expect(getByTestId('internal-explosion')).toHaveAttribute('opacity', '0');
    expect(getByTestId('queued-missile-0')).toHaveAttribute('opacity', '0');
    expect(getByTestId('structure').outerHTML).not.toBe(before);
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
    expect(document.querySelector('[data-testid="incoming-story"]')).toBeNull();
    const present = getByTestId('structure').outerHTML;
    rerender(<StoryDrivenScene frame={4650} />);
    expect(getByTestId('spent-story-history')).toHaveAttribute('opacity', '0.55');
    expect(getByTestId('spent-story-history')).toHaveAttribute('transform', 'translate(745 640)');
    expect(getByTestId('next-possibility')).toHaveAttribute('opacity', '0');
    expect(getByTestId('historical-product-state').querySelector('rect')).not.toBeNull();
    expect(getByTestId('historical-decision').querySelector('circle')).not.toBeNull();
    expect(getByTestId('spent-story-history').querySelector('path[d^="M -42"]')).toBeNull();
    rerender(<StoryDrivenScene frame={5399} />);
    expect(getByTestId('next-possibility')).toHaveAttribute('opacity', '1');
    expect(document.querySelector('[data-testid="incoming-story"]')).toBeNull();
    expect(getByTestId('structure').outerHTML).toBe(present);
    expect(getByTestId('spent-story-history')).toHaveAttribute('opacity', '0.55');
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
