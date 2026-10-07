import {createHash} from 'node:crypto';
import {mkdir, readFile, readdir} from 'node:fs/promises';
import {join} from 'node:path';
import {runCommand} from './commands';
import {Composition} from './ranges';
import {FilmSource} from './sources';

export type RenderedFilm = {
  composition: Composition;
  frames: Map<number, string>;
  frameDirectory: string;
  audio: Buffer;
};

export const readComposition = async (source: FilmSource, id: string, log: string): Promise<Composition> => {
  const output = await runCommand('pnpm', ['exec', 'remotion', 'compositions', 'src/index.ts'], source.directory, log);
  const line = output.split('\n').find((row) => row.trim().split(/\s+/)[0] === id);
  const columns = line?.trim().split(/\s+/);
  if (!columns) throw new Error(`Composition "${id}" was not found. See ${log}.`);
  if (columns[2] === 'Still') {
    throw new Error(`Cannot compare "${id}": Remotion CLI reports a single-frame Still without its fps. Actual fps evidence is unavailable; no preservation verdict was produced. See ${log}.`);
  }
  const dimensions = columns[2].split('x').map(Number);
  const composition = {
    id, fps: Number(columns[1]),
    width: dimensions[0], height: dimensions[1],
    durationInFrames: Number(columns[3]),
  };
  if (!Object.values(composition).filter((value) => typeof value === 'number').every((value) => Number.isFinite(value) && value > 0)) {
    throw new Error(`Could not read composition metadata for "${id}". See ${log}.`);
  }
  return composition;
};

export const renderFilm = async (
  source: FilmSource, composition: Composition, output: string, log: string,
): Promise<RenderedFilm> => {
  const frameDirectory = join(output, 'frames');
  await mkdir(output, {recursive: true});
  await runCommand('pnpm', [
    'exec', 'remotion', 'render', 'src/index.ts', composition.id, frameDirectory,
    '--sequence', '--image-format=png', `--frames=0-${composition.durationInFrames - 1}`,
  ], source.directory, log);
  const audioPath = join(output, 'audio.wav');
  await runCommand('pnpm', [
    'exec', 'remotion', 'render', 'src/index.ts', composition.id, audioPath, '--codec=wav',
  ], source.directory, log);
  const frames = new Map<number, string>();
  for (const name of await readdir(frameDirectory)) {
    const match = /^element-(\d+)\.png$/.exec(name);
    if (!match) continue;
    frames.set(Number(match[1]), createHash('sha256').update(await readFile(join(frameDirectory, name))).digest('hex'));
  }
  if (frames.size !== composition.durationInFrames ||
    Array.from({length: composition.durationInFrames}, (_, frame) => frame).some((frame) => !frames.has(frame))) {
    throw new Error(`Incomplete frame sequence for ${composition.id}; expected every frame 0-${composition.durationInFrames - 1}.`);
  }
  return {composition, frames, frameDirectory, audio: await readFile(audioPath)};
};

export const changedFrames = (before: RenderedFilm, after: RenderedFilm): number[] =>
  Array.from({length: Math.max(before.composition.durationInFrames, after.composition.durationInFrames)}, (_, frame) => frame)
    .filter((frame) => before.frames.get(frame) !== after.frames.get(frame));
