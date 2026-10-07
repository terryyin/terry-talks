import {mkdir, writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {classifyChanges, parseChangeRange} from './ranges';
import {renderPreviews, requestedPreviewFrames} from './previews';
import {changedFrames, readComposition, renderFilm} from './render';
import {preservationVerdict, reportMarkdown} from './report';
import {withFilmSources} from './sources';
import {readFilmTimeline} from './timeline';
import {compareWav} from './wav';

export const compareFilm = async (options: {
  repository: string;
  compositionId: string;
  baseline?: string;
  correction?: string;
  changes: string[];
}) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const output = join(options.repository, 'terry-moves', 'out', 'revisions', `${options.compositionId}-${timestamp}`);
  await mkdir(output, {recursive: true});
  const log = join(output, 'render.log');
  return withFilmSources(options.repository, options.baseline ?? 'HEAD', options.correction, async (sources, temporary) => {
    console.log('Reading composition metadata…');
    const before = await readComposition(sources.baseline, options.compositionId, log);
    const after = await readComposition(sources.correction, options.compositionId, log);
    const baselineTimeline = await readFilmTimeline(sources.baseline, options.compositionId);
    const correctionTimeline = await readFilmTimeline(sources.correction, options.compositionId);
    const declarations = options.changes.map((change) => parseChangeRange(change, before));
    console.log(`Comparing all ${before.durationInFrames} baseline and ${after.durationInFrames} correction frames, plus mixed audio…`);
    const baseline = await renderFilm(sources.baseline, before, join(temporary, 'baseline-render'), log);
    const correction = await renderFilm(sources.correction, after, join(temporary, 'correction-render'), log);
    const comparison = {
      compositionId: options.compositionId,
      baseline: sources.baseline.description,
      correction: sources.correction.description,
      before, after, declarations,
      changed: changedFrames(baseline, correction),
      audio: compareWav(baseline.audio, correction.audio),
      timeline: baselineTimeline && correctionTimeline ? {
        path: baselineTimeline.path,
        before: baselineTimeline.script,
        after: correctionTimeline.script,
      } : undefined,
    };
    const previews = await renderPreviews(baseline, correction,
      requestedPreviewFrames(classifyChanges(comparison.changed, declarations)), output, log);
    const report = join(output, 'report.md');
    await writeFile(report, reportMarkdown({...comparison, previews}));
    return {verdict: preservationVerdict(comparison), report};
  });
};
