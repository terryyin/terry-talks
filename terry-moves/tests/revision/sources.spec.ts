/** @jest-environment node */
import {mkdtemp, mkdir, readFile, rm, writeFile, access} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {runCommand} from '../../revision/commands';
import {withFilmSources} from '../../revision/sources';

describe('revision render inputs', () => {
  let repository: string;
  beforeEach(async () => {
    repository = await mkdtemp(join(tmpdir(), 'film-source-test-'));
    await mkdir(join(repository, 'terry-moves', 'node_modules'), {recursive: true});
    await writeFile(join(repository, 'terry-moves', 'film.txt'), 'approved');
    await runCommand('git', ['init'], repository);
    await runCommand('git', ['add', 'terry-moves/film.txt'], repository);
    await runCommand('git', ['-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.invalid', 'commit', '-m', 'approved film'], repository);
  });
  afterEach(async () => {await rm(repository, {recursive: true, force: true});});

  test('HEAD stays approved while default correction reads the uncommitted working film', async () => {
    await writeFile(join(repository, 'terry-moves', 'film.txt'), 'correction');
    let temporary = '';
    await withFilmSources(repository, 'HEAD', undefined, async (sources, directory) => {
      temporary = directory;
      expect(await readFile(join(sources.baseline.directory, 'film.txt'), 'utf8')).toBe('approved');
      expect(await readFile(join(sources.correction.directory, 'film.txt'), 'utf8')).toBe('correction');
      expect(sources.correction.directory).toBe(join(repository, 'terry-moves'));
      await access(join(sources.baseline.directory, 'node_modules'));
    });
    expect((await runCommand('git', ['worktree', 'list', '--porcelain'], repository)).match(/^worktree /gm)).toHaveLength(1);
    await expect(access(temporary)).rejects.toThrow();
    expect(await readFile(join(repository, 'terry-moves', 'film.txt'), 'utf8')).toBe('correction');
  });

  test('two named revisions and temporary sequences are removed when rendering fails', async () => {
    let temporary = '';
    await expect(withFilmSources(repository, 'HEAD', 'HEAD', async (sources, directory) => {
      temporary = directory;
      expect(sources.baseline.directory).not.toBe(sources.correction.directory);
      await writeFile(join(directory, 'rendered-frame.png'), 'temporary frame');
      throw new Error('render failed');
    })).rejects.toThrow('render failed');
    expect((await runCommand('git', ['worktree', 'list', '--porcelain'], repository)).match(/^worktree /gm)).toHaveLength(1);
    await expect(access(temporary)).rejects.toThrow();
  });
});
