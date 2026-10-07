import {AudioDifference} from './wav';
import {classifyChanges, Composition, DeclaredRange, describeFrames} from './ranges';
import {Preview, previewFrames} from './previews';

export type Comparison = {
  compositionId: string;
  baseline: string;
  correction: string;
  before: Composition;
  after: Composition;
  declarations: DeclaredRange[];
  changed: number[];
  audio: AudioDifference;
  previews?: Preview[];
};

const timingDifferences = ({before, after}: Comparison): string[] =>
  (['fps', 'durationInFrames'] as const)
    .filter((field) => before[field] !== after[field])
    .map((field) => `${field}: ${before[field]} → ${after[field]}`);

const describeComposition = (composition: Composition) =>
  `${composition.durationInFrames} frames, ${composition.fps} fps, ${(composition.durationInFrames / composition.fps).toFixed(2)} s, ${composition.width}×${composition.height}.`;

export const preservationVerdict = (comparison: Comparison) =>
  comparison.audio.identical && timingDifferences(comparison).length === 0 &&
  classifyChanges(comparison.changed, comparison.declarations).undeclared.length === 0
    ? 'Preserved' : 'Not preserved';

export const reportMarkdown = (comparison: Comparison): string => {
  const {before, after, audio} = comparison;
  const changes = classifyChanges(comparison.changed, comparison.declarations);
  const timing = timingDifferences(comparison);
  const previewLinks = (range: {start: number; end: number}, unchanged = false) =>
    previewFrames(range, unchanged).flatMap((frame) => {
      const preview = comparison.previews?.find((item) => item.frame === frame);
      if (!preview) return [];
      const missing = [
        ...(!preview.baselinePresent ? ['baseline frame absent (black panel)'] : []),
        ...(!preview.correctionPresent ? ['correction frame absent (black panel)'] : []),
      ];
      return [`- [${unchanged ? 'Unchanged preview: ' : ''}frame ${frame} (${(frame / before.fps).toFixed(2)} s)${missing.length ? `; ${missing.join('; ')}` : ''}](${preview.path})`];
    });
  const lines = [
    `# ${comparison.compositionId}: ${preservationVerdict(comparison)}`, '',
    `Baseline: ${comparison.baseline}`, '', `Correction: ${comparison.correction}`, '',
    '## Composition', '',
    `Baseline: ${describeComposition(before)}`, '',
    `Correction: ${describeComposition(after)}`, '',
    ...(timing.length ? timing.map((difference) => `- Changed ${difference}`) : ['Duration and fps are unchanged.']), '',
    '## Audio', '',
    audio.identical ? 'Unchanged: mixed WAV samples are identical.' :
      `Changed: ${audio.reason} First differing second ${audio.start!.toFixed(5)} s; last differing second ${audio.end!.toFixed(5)} s.`, '',
    '## Intended picture changes', '',
    'Second ranges include the start and exclude the end. Frame ranges include both endpoints. Reported times are the timestamps of the first and last changed frame.', '',
    ...(comparison.previews?.length ? ['Preview pairs show the baseline on the left and the correction on the right. Pictures keep their original size; black padding fills any size difference. An absent frame is a black panel, labelled in its link.', ''] : []),
  ];
  if (changes.intended.length === 0) lines.push('No change ranges declared.', '');
  for (const {declaration, runs} of changes.intended) {
    lines.push(`### Declared ${declaration.input}: ${describeFrames(declaration, before.fps)}`, '');
    if (runs.length === 0) lines.push('No change in this declared range.', '', ...previewLinks(declaration, true), '');
    for (const range of runs) {
      lines.push(`- Intended picture change: ${describeFrames(range, before.fps)}.`, '', ...previewLinks(range), '');
    }
  }
  lines.push('## Undeclared picture changes', '');
  if (changes.undeclared.length === 0) lines.push('None. Every frame outside the declarations is unchanged.', '');
  for (const range of changes.undeclared) {
    lines.push(`- Undeclared picture change: ${describeFrames(range, before.fps)}.`, '', ...previewLinks(range), '');
  }
  lines.push(`${comparison.changed.length} changed frame(s); every rendered frame was compared.`, '');
  return lines.join('\n');
};
