/** @jest-environment node */
import {mkdtemp, mkdir, rm, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {runCommand} from '../../revision/commands';
import {previewFrames, renderPreviews, requestedPreviewFrames} from '../../revision/previews';
import {classifyChanges} from '../../revision/ranges';
import {RenderedFilm} from '../../revision/render';

jest.mock('../../revision/commands', () => ({runCommand: jest.fn()}));

describe('preview frame selection', () => {
  test('takes the first, midpoint and last frame of a changed run', () => {
    expect(previewFrames({start: 2285, end: 2746})).toEqual([2285, 2515, 2746]);
  });

  test('deduplicates single-frame and two-frame runs', () => {
    expect(previewFrames({start: 7, end: 7})).toEqual([7]);
    expect(previewFrames({start: 7, end: 8})).toEqual([7, 8]);
  });

  test('takes only the midpoint when the declared range is unchanged', () => {
    expect(previewFrames({start: 10, end: 19}, true)).toEqual([14]);
  });

  test('includes each intended and undeclared run, plus unchanged declarations', () => {
    const changes = classifyChanges([0, 1, 5, 6, 7, 20], [
      {input: '0f-9f', start: 0, end: 9},
      {input: '10f-19f', start: 10, end: 19},
      {input: '5f-7f', start: 5, end: 7},
    ]);
    expect(requestedPreviewFrames(changes)).toEqual([0, 1, 5, 6, 7, 14, 20]);
  });
});

describe('side-by-side preview rendering', () => {
  let directory: string;
  const film = (frameDirectory: string, width: number, height: number): RenderedFilm => ({
    composition: {id: 'Film', fps: 30, durationInFrames: 2, width, height},
    frames: new Map(), frameDirectory, audio: Buffer.alloc(0),
  });

  beforeEach(async () => {
    directory = await mkdtemp(join(tmpdir(), 'preview-test-'));
    await mkdir(join(directory, 'before'));
    await mkdir(join(directory, 'after'));
    jest.mocked(runCommand).mockReset().mockResolvedValue('');
  });
  afterEach(async () => {await rm(directory, {recursive: true, force: true});});

  test('uses the already-rendered baseline on the left and correction on the right', async () => {
    const left = join(directory, 'before', 'element-0000.png');
    const right = join(directory, 'after', 'element-0.png');
    await writeFile(left, 'baseline');
    await writeFile(right, 'correction');
    const previews = await renderPreviews(film(join(directory, 'before'), 4, 2),
      film(join(directory, 'after'), 2, 4), [0], directory, join(directory, 'render.log'));
    const [command, args, cwd, log] = jest.mocked(runCommand).mock.calls[0];
    expect(command).toBe('ffmpeg');
    expect(args.slice(0, 9)).toEqual(['-hide_banner', '-loglevel', 'error', '-y', '-i', left, '-i', right, '-filter_complex']);
    expect(args[9]).toBe('[0:v]format=rgba,pad=4:4:0:0:color=black[left];[1:v]format=rgba,pad=4:4:0:0:color=black[right];[left][right]hstack=inputs=2[pair]');
    expect(args.at(-1)).toBe(join(directory, 'previews', 'frame-0.png'));
    expect(cwd).toBe(directory);
    expect(log).toBe(join(directory, 'render.log'));
    expect(previews).toEqual([{frame: 0, path: 'previews/frame-0.png', baselinePresent: true, correctionPresent: true}]);
  });

  test.each(['baseline', 'correction'])('keeps a truthful missing %s panel for added or removed frames', async (missing) => {
    await writeFile(join(directory, missing === 'baseline' ? 'after' : 'before', 'element-1.png'), 'present frame');
    const previews = await renderPreviews(film(join(directory, 'before'), 4, 2),
      film(join(directory, 'after'), 2, 4), [1], directory, join(directory, 'render.log'));
    const args = jest.mocked(runCommand).mock.calls[0][1];
    expect(args).toContain('color=c=black:s=4x4:r=1');
    expect(previews[0]).toEqual({frame: 1, path: 'previews/frame-1.png', baselinePresent: missing !== 'baseline', correctionPresent: missing !== 'correction'});
  });
});
