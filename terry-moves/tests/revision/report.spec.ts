import {classifyChanges, parseChangeRange} from '../../revision/ranges';
import {Comparison, preservationVerdict, reportMarkdown} from '../../revision/report';
import {changedFrames, RenderedFilm} from '../../revision/render';
import {requestedPreviewFrames} from '../../revision/previews';

const composition = {id: 'Film', fps: 30, durationInFrames: 2747, width: 1080, height: 1080};
const comparison: Comparison = {
  compositionId: 'Film', baseline: 'approved', correction: 'corrected',
  before: composition, after: composition,
  declarations: ['0-1.2', '76-end'].map((range) => parseChangeRange(range, composition)),
  changed: [...Array.from({length: 36}, (_, frame) => frame), ...Array.from({length: 462}, (_, frame) => frame + 2285)],
  audio: {identical: true},
};

describe('film preservation report', () => {
  test('the real correction shape is preserved inside both declared moments', () => {
    const report = reportMarkdown(comparison);
    expect(preservationVerdict(comparison)).toBe('Preserved');
    expect(report).toContain('Intended picture change: frames 0–35 (0.00–1.17 s)');
    expect(report).toContain('Intended picture change: frames 2285–2746 (76.17–91.53 s)');
    expect(report).toContain('mixed WAV samples are identical');
    expect(report).toContain('2747 frames, 30 fps, 91.57 s');
    expect(report).toContain('Every frame outside the declarations is unchanged');
  });

  test('a narrow declaration names the cover and the later picture changes', () => {
    const narrow = {...comparison, declarations: [parseChangeRange('76-80', composition)]};
    expect(preservationVerdict(narrow)).toBe('Not preserved');
    expect(reportMarkdown(narrow)).toContain('Undeclared picture change: frames 0–35 (0.00–1.17 s)');
    expect(reportMarkdown(narrow)).toContain('Undeclared picture change: frames 2400–2746 (80.00–91.53 s)');
  });

  test('a changed voice cannot be approved by declaring picture ranges', () => {
    const changedAudio = {...comparison, audio: {identical: false, start: 1, end: 2, reason: 'Mixed audio samples changed.'}};
    expect(preservationVerdict(changedAudio)).toBe('Not preserved');
    expect(reportMarkdown(changedAudio)).toContain('First differing second 1.00000 s; last differing second 2.00000 s');
  });

  test('duration or fps changes fail even if no picture differences were supplied', () => {
    expect(preservationVerdict({...comparison, changed: [], after: {...composition, fps: 25}})).toBe('Not preserved');
    const changedDuration = {...comparison, changed: [], after: {...composition, durationInFrames: 2748}};
    expect(preservationVerdict(changedDuration)).toBe('Not preserved');
    expect(reportMarkdown(changedDuration)).toContain('durationInFrames: 2747 → 2748');
  });

  test('dimensions are picture evidence and do not add a separate preservation restriction', () => {
    expect(preservationVerdict({...comparison, after: {...composition, width: 1920}})).toBe('Preserved');
  });

  test('an unchanged correction reports no change for every declaration', () => {
    const unchanged = {...comparison, changed: []};
    expect(preservationVerdict(unchanged)).toBe('Preserved');
    expect(reportMarkdown(unchanged).match(/No change in this declared range/g)).toHaveLength(2);
    expect(reportMarkdown(unchanged)).toContain('0 changed frame(s)');
  });

  test('comparison observes every frame, including added or removed frames', () => {
    const film = (hashes: string[]): RenderedFilm => ({
      composition: {...composition, durationInFrames: hashes.length},
      frames: new Map(hashes.map((hash, index) => [index, hash])), frameDirectory: '', audio: Buffer.alloc(0),
    });
    expect(changedFrames(film(['a', 'b', 'c']), film(['a', 'new', 'c', 'tail']))).toEqual([1, 3]);
    expect(changedFrames(film(['a', 'b']), film(['a']))).toEqual([1]);
  });

  const withPreviews = (input: Comparison): Comparison => ({
    ...input,
    previews: requestedPreviewFrames(classifyChanges(input.changed, input.declarations)).map((frame) => ({
      frame, path: `previews/frame-${frame}.png`, baselinePresent: true, correctionPresent: true,
    })),
  });

  test('links first, middle and last previews beneath each intended and undeclared run', () => {
    const narrow = withPreviews({...comparison, declarations: [parseChangeRange('76-80', composition)]});
    const report = reportMarkdown(narrow);
    const intended = report.split('Intended picture change: frames 2285–2399')[1].split('## Undeclared')[0];
    for (const frame of [2285, 2342, 2399]) expect(intended).toContain(`](previews/frame-${frame}.png)`);
    const cover = report.split('Undeclared picture change: frames 0–35')[1].split('Undeclared picture change: frames 2400–2746')[0];
    for (const frame of [0, 17, 35]) expect(cover).toContain(`](previews/frame-${frame}.png)`);
    const tail = report.split('Undeclared picture change: frames 2400–2746')[1];
    for (const frame of [2400, 2573, 2746]) expect(tail).toContain(`](previews/frame-${frame}.png)`);
    expect(report).toContain('baseline on the left and the correction on the right');
  });

  test('an unchanged declaration links only its midpoint, explicitly labelled unchanged', () => {
    const report = reportMarkdown(withPreviews({...comparison, changed: []}));
    const cover = report.split('### Declared 0-1.2')[1].split('### Declared 76-end')[0];
    expect(cover).toContain('[Unchanged preview: frame 17 (0.57 s)](previews/frame-17.png)');
    expect(cover.match(/\]\(previews\//g)).toHaveLength(1);
    expect(report).toContain('[Unchanged preview: frame 2513 (83.77 s)](previews/frame-2513.png)');
    expect(preservationVerdict(withPreviews({...comparison, changed: []}))).toBe('Preserved');
  });

  test.each(['baseline', 'correction'])('names the absent %s frame without losing the preservation failure', (missing) => {
    const changedDuration: Comparison = {
      ...comparison, declarations: [], changed: [2747],
      before: {...composition, durationInFrames: missing === 'baseline' ? 2747 : 2748},
      after: {...composition, durationInFrames: missing === 'baseline' ? 2748 : 2747},
      previews: [{frame: 2747, path: 'previews/frame-2747.png', baselinePresent: missing !== 'baseline', correctionPresent: missing !== 'correction'}],
    };
    const report = reportMarkdown(changedDuration);
    expect(report).toContain('# Film: Not preserved');
    expect(report).toContain(`${missing} frame absent (black panel)](previews/frame-2747.png)`);
    expect(report).toContain('Undeclared picture change: frames 2747–2747');
  });
});
