import {AudioDifference} from './wav';
import {classifyChanges, Composition, DeclaredRange, describeFrames} from './ranges';

export type Comparison = {
  compositionId: string;
  baseline: string;
  correction: string;
  before: Composition;
  after: Composition;
  declarations: DeclaredRange[];
  changed: number[];
  audio: AudioDifference;
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
  ];
  if (changes.intended.length === 0) lines.push('No change ranges declared.', '');
  for (const {declaration, runs} of changes.intended) {
    lines.push(`### Declared ${declaration.input}: ${describeFrames(declaration, before.fps)}`, '',
      ...(runs.length ? runs.map((range) => `- Intended picture change: ${describeFrames(range, before.fps)}.`) : ['No change in this declared range.']), '');
  }
  lines.push('## Undeclared picture changes', '',
    ...(changes.undeclared.length ? changes.undeclared.map((range) => `- Undeclared picture change: ${describeFrames(range, before.fps)}.`) : ['None. Every frame outside the declarations is unchanged.']), '',
    `${comparison.changed.length} changed frame(s); every rendered frame was compared.`, '');
  return lines.join('\n');
};
