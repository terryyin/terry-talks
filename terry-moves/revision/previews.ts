import {mkdir} from 'node:fs/promises';
import {join} from 'node:path';
import {runCommand} from './commands';
import {classifyChanges, FrameRange} from './ranges';
import {readFramePaths, RenderedFilm} from './render';

export type Preview = {
  frame: number;
  path: string;
  baselinePresent: boolean;
  correctionPresent: boolean;
};

export const previewFrames = (range: FrameRange, unchanged = false): number[] => {
  const middle = Math.floor((range.start + range.end) / 2);
  return [...new Set(unchanged ? [middle] : [range.start, middle, range.end])];
};

export const requestedPreviewFrames = (changes: ReturnType<typeof classifyChanges>): number[] =>
  [...new Set([
    ...changes.intended.flatMap(({declaration, runs}) => runs.length
      ? runs.flatMap((range) => previewFrames(range)) : previewFrames(declaration, true)),
    ...changes.undeclared.flatMap((range) => previewFrames(range)),
  ])].sort((a, b) => a - b);

export const renderPreviews = async (
  baseline: RenderedFilm, correction: RenderedFilm, frames: number[], output: string, log: string,
): Promise<Preview[]> => {
  const before = await readFramePaths(baseline.frameDirectory);
  const after = await readFramePaths(correction.frameDirectory);
  const width = Math.max(baseline.composition.width, correction.composition.width);
  const height = Math.max(baseline.composition.height, correction.composition.height);
  await mkdir(join(output, 'previews'), {recursive: true});
  const previews: Preview[] = [];
  for (const frame of frames) {
    const left = before.get(frame);
    const right = after.get(frame);
    const input = (path: string | undefined) => path
      ? ['-i', path] : ['-f', 'lavfi', '-i', `color=c=black:s=${width}x${height}:r=1`];
    const path = `previews/frame-${frame}.png`;
    await runCommand('ffmpeg', [
      '-hide_banner', '-loglevel', 'error', '-y', ...input(left), ...input(right),
      '-filter_complex',
      `[0:v]format=rgba,pad=${width}:${height}:0:0:color=black[left];[1:v]format=rgba,pad=${width}:${height}:0:0:color=black[right];[left][right]hstack=inputs=2[pair]`,
      '-map', '[pair]', '-frames:v', '1', '-update', '1', join(output, path),
    ], output, log);
    previews.push({frame, path, baselinePresent: Boolean(left), correctionPresent: Boolean(right)});
  }
  return previews;
};
