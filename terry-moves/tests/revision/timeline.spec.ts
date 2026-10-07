/** @jest-environment node */
import {mkdir, mkdtemp, rm, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import script from '../../../Problem Decomposition/film-script.json';
import {parseChangeRange} from '../../revision/ranges';
import {Comparison, preservationVerdict, reportMarkdown} from '../../revision/report';
import {compareTimeline, FilmTimeline, labelPictureRange, readFilmTimeline} from '../../revision/timeline';

const copyScript = (): FilmTimeline => JSON.parse(JSON.stringify(script));
const composition = {id: 'ProblemDecompositionFilm', fps: script.fps, durationInFrames: script.durationInFrames, width: 1080, height: 1080};
const comparison = (before: FilmTimeline, after: FilmTimeline): Comparison => ({
  compositionId: composition.id, baseline: 'approved', correction: 'working tree',
  before: composition, after: composition,
  declarations: [parseChangeRange('0-end', composition)], changed: [2400], audio: {identical: true},
  timeline: {path: 'Problem Decomposition/film-script.json', before, after},
});

describe('script timeline preservation', () => {
  test('copies of the real film script preserve scene and caption timing', () => {
    const before = copyScript();
    const after = copyScript();
    expect(compareTimeline(before, after)).toEqual([]);
    const report = reportMarkdown(comparison(before, after));
    expect(report).toContain('# ProblemDecompositionFilm: Preserved');
    expect(report).toContain('Source on both sides: Problem Decomposition/film-script.json');
    expect(report).toContain('Unchanged: all checked scene and caption timeline fields are identical');
    expect(report).toContain('caption order/text/start/end/speechStart/speechEnd');
  });

  test.each(['duration', 'fps', 'coverDuration'] as const)('changing script %s vetoes preservation despite allowing every picture change', (field) => {
    const before = copyScript();
    const after = copyScript();
    after[field] = before[field]! + 0.1;
    const change = comparison(before, after);
    expect(preservationVerdict(change)).toBe('Not preserved');
    expect(reportMarkdown(change)).toContain(`Changed Timeline ${field}: ${before[field]} → ${after[field]}`);
    expect(reportMarkdown(change)).toContain('None. Every frame outside the declarations is unchanged');
  });

  test.each(['start', 'end'] as const)('a moved health %s names the scene and both exact times', (field) => {
    const before = copyScript();
    const after = copyScript();
    const health = before.scenes.findIndex((scene) => scene.id === 'health');
    after.scenes[health][field] += 0.1;
    const change = comparison(before, after);
    expect(preservationVerdict(change)).toBe('Not preserved');
    expect(reportMarkdown(change)).toContain(`Scene 10 (health) ${field}: ${before.scenes[health][field]} → ${after.scenes[health][field]}`);
    expect(reportMarkdown(change)).toContain('Baseline scenes: health 80.00–80.00 s. Correction scenes: health 80.00–80.00 s');
  });

  test('renaming or reordering scenes fails and names the changed identities', () => {
    const before = copyScript();
    const renamed = copyScript();
    renamed.scenes[9].id = 'healthy';
    expect(reportMarkdown(comparison(before, renamed))).toContain('Scene 10 (health) id: "health" → "healthy"');
    expect(preservationVerdict(comparison(before, renamed))).toBe('Not preserved');
    const reordered = copyScript();
    [reordered.scenes[9], reordered.scenes[10]] = [reordered.scenes[10], reordered.scenes[9]];
    expect(preservationVerdict(comparison(before, reordered))).toBe('Not preserved');
    expect(reportMarkdown(comparison(before, reordered))).toContain('Scene 10 (health) id: "health" → "end"');
    expect(reportMarkdown(comparison(before, reordered))).toContain('Scene 11 (end) id: "end" → "health"');
  });

  test.each(['added', 'removed'])('an %s scene names its identity and absent side', (kind) => {
    const before = copyScript();
    const after = copyScript();
    if (kind === 'added') after.scenes.push({...after.scenes[10], id: 'extra-end'});
    else after.scenes.pop();
    expect(preservationVerdict(comparison(before, after))).toBe('Not preserved');
    expect(reportMarkdown(comparison(before, after))).toContain(kind === 'added'
      ? 'Scene 12 (extra-end) id: absent → "extra-end"'
      : 'Scene 11 (end) id: "end" → absent');
  });

  test.each(['text', 'start', 'end', 'speechStart', 'speechEnd'] as const)('changed caption %s names the caption and both values', (field) => {
    const before = copyScript();
    const after = copyScript();
    const baseline = before.scenes[9].captionRanges[0];
    const correction = after.scenes[9].captionRanges[0];
    if (field === 'text') correction.text = 'Changed caption.';
    else correction[field] += 0.1;
    const display = (value: string | number) => JSON.stringify(value);
    const change = comparison(before, after);
    expect(preservationVerdict(change)).toBe('Not preserved');
    expect(reportMarkdown(change)).toContain(`Scene 10 (health) caption 1 ("4 · Whole product focus.") ${field}: ${display(baseline[field])} → ${display(correction[field])}`);
  });

  test('reordered captions cannot hide behind the same set of fields', () => {
    const before = copyScript();
    const after = copyScript();
    after.scenes[9].captionRanges.reverse();
    expect(preservationVerdict(comparison(before, after))).toBe('Not preserved');
    expect(reportMarkdown(comparison(before, after))).toContain('caption 1 ("4 · Whole product focus.") text: "4 · Whole product focus." → "Unused features can close alternatives."');
  });

  test.each(['added', 'removed'])('an %s caption names its text, timings and absent side', (kind) => {
    const before = copyScript();
    const after = copyScript();
    const captions = after.scenes[9].captionRanges;
    if (kind === 'added') captions.push({...captions[2], text: 'One more caption.'});
    else captions.pop();
    const report = reportMarkdown(comparison(before, after));
    expect(preservationVerdict(comparison(before, after))).toBe('Not preserved');
    expect(report).toContain(kind === 'added'
      ? 'caption 4 ("One more caption.") text: absent → "One more caption."'
      : 'caption 3 ("Unused features can close alternatives.") text: "Unused features can close alternatives." → absent');
    expect(report).toContain(kind === 'added'
      ? `speechEnd: absent → ${script.scenes[9].captionRanges[2].speechEnd}`
      : `speechEnd: ${script.scenes[9].captionRanges[2].speechEnd} → absent`);
  });

  test('picture runs name intersecting health and end scenes, with clipped times', () => {
    expect(labelPictureRange({start: 2285, end: 2746}, copyScript(), 30)).toEqual([
      'health 76.17–85.73 s', 'end 85.73–91.53 s',
    ]);
    expect(labelPictureRange({start: 2572, end: 2572}, copyScript(), 30)).toEqual(['end 85.73–85.73 s']);
    expect(labelPictureRange({start: 2571, end: 2571}, copyScript(), 30)).toEqual(['health 85.70–85.70 s']);
  });

  test('cover owns its visible interval before hook, including a run crossing the boundary', () => {
    expect(labelPictureRange({start: 0, end: 35}, copyScript(), 30)).toEqual(['cover 0.00–1.17 s']);
    expect(labelPictureRange({start: 35, end: 36}, copyScript(), 30)).toEqual(['cover 1.17–1.20 s', 'hook 1.20–1.20 s']);
    expect(labelPictureRange({start: 36, end: 36}, copyScript(), 30)).toEqual(['hook 1.20–1.20 s']);
  });

  test('the real replay and a narrow declaration expose labels at the report boundary', () => {
    const replay = {
      ...comparison(copyScript(), copyScript()),
      changed: [...Array.from({length: 36}, (_, frame) => frame), ...Array.from({length: 462}, (_, frame) => frame + 2285)],
      declarations: ['0-1.2', '76-end'].map((range) => parseChangeRange(range, composition)),
    };
    expect(preservationVerdict(replay)).toBe('Preserved');
    expect(reportMarkdown(replay)).toContain('Intended picture change: frames 2285–2746 (76.17–91.53 s). Scenes: health 76.17–85.73 s, end 85.73–91.53 s');
    const narrow = {...replay, declarations: [parseChangeRange('76-80', composition)]};
    expect(preservationVerdict(narrow)).toBe('Not preserved');
    expect(reportMarkdown(narrow)).toContain('Undeclared picture change: frames 0–35 (0.00–1.17 s). Scenes: cover 0.00–1.17 s');
    expect(reportMarkdown(narrow)).toContain('Undeclared picture change: frames 2400–2746 (80.00–91.53 s). Scenes: health 80.00–85.73 s, end 85.73–91.53 s');
  });

  test('unregistered compositions explicitly limit the preservation claim', () => {
    const {timeline: _timeline, ...unregistered} = comparison(copyScript(), copyScript());
    const report = reportMarkdown({...unregistered, compositionId: 'AnotherFilm'});
    expect(report).toContain('# AnotherFilm: Preserved');
    expect(report).toContain('Scene and caption timings were not checked');
    expect(report).toContain('preservation evidence is limited to every rendered picture frame, mixed audio, and composition duration/fps');
    expect(report).not.toContain('all checked scene and caption timeline fields are identical');
  });
});

describe('registered timeline inputs', () => {
  let repository: string;
  beforeEach(async () => {
    repository = await mkdtemp(join(tmpdir(), 'film-timeline-test-'));
    await mkdir(join(repository, 'terry-moves'));
    await mkdir(join(repository, 'Problem Decomposition'));
  });
  afterEach(async () => {await rm(repository, {recursive: true, force: true});});

  test('reads the actual film entry relative to each source checkout', async () => {
    const after = copyScript();
    after.scenes[9].end += 0.1;
    await writeFile(join(repository, 'Problem Decomposition/film-script.json'), JSON.stringify(after));
    const loaded = await readFilmTimeline({directory: join(repository, 'terry-moves'), description: 'corrected'}, composition.id);
    expect(loaded?.path).toBe('Problem Decomposition/film-script.json');
    expect(compareTimeline(copyScript(), loaded!.script)).toEqual([
      `Scene 10 (health) end: ${script.scenes[9].end} → ${after.scenes[9].end}`,
    ]);
  });

  test('an unregistered composition has no script evidence, while a missing registered file fails', async () => {
    const source = {directory: join(repository, 'terry-moves'), description: 'approved'};
    expect(await readFilmTimeline(source, 'AnotherFilm')).toBeUndefined();
    await expect(readFilmTimeline(source, composition.id)).rejects.toThrow('ENOENT');
  });
});
