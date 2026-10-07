import {classifyChanges, describeFrames, frameRuns, parseChangeRange} from '../../revision/ranges';

const film = {id: 'Film', fps: 30, durationInFrames: 2747, width: 1080, height: 1080};

describe('declared film moments', () => {
  test('seconds exclude the end and frame endpoints are inclusive', () => {
    expect(parseChangeRange('0-1.2', film)).toEqual({input: '0-1.2', start: 0, end: 35});
    expect(parseChangeRange('2280f-2399f', film)).toEqual({input: '2280f-2399f', start: 2280, end: 2399});
    expect(parseChangeRange('3f-3f', film)).toEqual({input: '3f-3f', start: 3, end: 3});
  });

  test('end includes the last rendered frame for either unit', () => {
    expect(parseChangeRange('76-end', film)).toEqual({input: '76-end', start: 2280, end: 2746});
    expect(parseChangeRange('2280f-end', film).end).toBe(2746);
  });

  test.each(['4-2', '2-2', '5f-2f'])('rejects reversed or empty %s with a useful message', (input) => {
    expect(() => parseChangeRange(input, film)).toThrow(/ends before it starts or is empty/);
  });

  test.each(['nope', '2', '-1-2', '2f-3', '2-3f', '0.5f-2f'])('rejects malformed %s with examples', (input) => {
    expect(() => parseChangeRange(input, film)).toThrow(/Use seconds.*frames.*end/);
  });

  test('rejects ranges beyond the film rather than silently broadening them', () => {
    expect(() => parseChangeRange('100-end', film)).toThrow(/outside the film/);
  });

  test('groups exact frame runs and splits them at declaration boundaries', () => {
    const frames = [0, 1, 2, 3, 4, 5, 8, 9, 9];
    expect(frameRuns(frames)).toEqual([{start: 0, end: 5}, {start: 8, end: 9}]);
    const ranges = [parseChangeRange('2f-3f', film), parseChangeRange('8f-9f', film)];
    const classified = classifyChanges(frames, ranges);
    expect(classified.intended.map((item) => item.runs)).toEqual([[{start: 2, end: 3}], [{start: 8, end: 9}]]);
    expect(classified.undeclared).toEqual([{start: 0, end: 1}, {start: 4, end: 5}]);
    expect(describeFrames({start: 2400, end: 2746}, 30)).toBe('frames 2400–2746 (80.00–91.53 s)');
  });
});
