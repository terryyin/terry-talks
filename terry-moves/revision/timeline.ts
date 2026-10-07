import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
import {FrameRange} from './ranges';
import {FilmSource} from './sources';

export type FilmTimeline = {
  duration: number;
  fps: number;
  coverDuration?: number;
  scenes: {
    id: string;
    start: number;
    end: number;
    captionRanges: {
      text: string;
      start: number;
      end: number;
      speechStart: number;
      speechEnd: number;
    }[];
  }[];
};

const filmEntries = new Map([
  ['ProblemDecompositionFilm', 'Problem Decomposition/film-script.json'],
]);

export const readFilmTimeline = async (source: FilmSource, compositionId: string) => {
  const path = filmEntries.get(compositionId);
  if (!path) return undefined;
  const script: FilmTimeline = JSON.parse(await readFile(join(source.directory, '..', path), 'utf8'));
  return {path, script};
};

const describeValue = (value: unknown) => value === undefined ? 'absent' : JSON.stringify(value);

export const compareTimeline = (before: FilmTimeline, after: FilmTimeline): string[] => {
  const differences: string[] = [];
  const compare = (label: string, fields: readonly string[], left: object | undefined, right: object | undefined) => {
    for (const field of fields) {
      const baseline = (left as Record<string, unknown> | undefined)?.[field];
      const correction = (right as Record<string, unknown> | undefined)?.[field];
      if (baseline !== correction) differences.push(`${label} ${field}: ${describeValue(baseline)} → ${describeValue(correction)}`);
    }
  };
  compare('Timeline', ['duration', 'fps', 'coverDuration'], before, after);
  for (let index = 0; index < Math.max(before.scenes.length, after.scenes.length); index++) {
    const left = before.scenes[index];
    const right = after.scenes[index];
    const label = `Scene ${index + 1} (${left?.id ?? right.id})`;
    compare(label, ['id', 'start', 'end'], left, right);
    for (let caption = 0; caption < Math.max(left?.captionRanges.length ?? 0, right?.captionRanges.length ?? 0); caption++) {
      const baseline = left?.captionRanges[caption];
      const correction = right?.captionRanges[caption];
      compare(`${label} caption ${caption + 1} (${describeValue(baseline?.text ?? correction.text)})`,
        ['text', 'start', 'end', 'speechStart', 'speechEnd'], baseline, correction);
    }
  }
  return differences;
};

export const labelPictureRange = (range: FrameRange, timeline: FilmTimeline, fps: number): string[] => {
  const start = range.start / fps;
  const end = range.end / fps;
  const coverEnd = timeline.coverDuration ?? 0;
  const intervals = [
    ...(coverEnd > 0 ? [{id: 'cover', start: 0, end: coverEnd}] : []),
    ...timeline.scenes.map((scene) => ({...scene, start: Math.max(scene.start, coverEnd)})),
  ];
  return intervals.filter((scene) => scene.start < scene.end && start < scene.end && end >= scene.start)
    .map((scene) => `${scene.id} ${Math.max(start, scene.start).toFixed(2)}–${Math.min(end, scene.end).toFixed(2)} s`);
};
