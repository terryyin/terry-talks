import {mkdtemp, rm, symlink} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {runCommand} from './commands';

export type FilmSource = {directory: string; description: string};

export const withFilmSources = async <T>(
  repository: string,
  baseline: string,
  correction: string | undefined,
  action: (sources: {baseline: FilmSource; correction: FilmSource}, temporary: string) => Promise<T>,
): Promise<T> => {
  const temporary = await mkdtemp(join(tmpdir(), 'terry-moves-compare-'));
  const worktrees: string[] = [];
  const checkout = async (revision: string, side: string): Promise<FilmSource> => {
    const sha = (await runCommand('git', ['rev-parse', '--verify', `${revision}^{commit}`], repository)).trim();
    const directory = join(temporary, side);
    await runCommand('git', ['worktree', 'add', '--detach', directory, sha], repository);
    worktrees.push(directory);
    await symlink(join(repository, 'terry-moves', 'node_modules'), join(directory, 'terry-moves', 'node_modules'));
    return {directory: join(directory, 'terry-moves'), description: `${revision} (${sha})`};
  };
  const cleanup = async () => {
    const failures: unknown[] = [];
    // Attempt all removals even if an earlier cleanup fails. Only our own worktrees are removed.
    for (const directory of worktrees) {
      try {await runCommand('git', ['worktree', 'remove', '--force', directory], repository);}
      catch (error) {failures.push(error);}
    }
    if (failures.length) throw new AggregateError(failures, `Could not remove temporary film worktrees in ${temporary}.`);
    await rm(temporary, {recursive: true, force: true});
  };
  try {
    const before = await checkout(baseline, 'baseline');
    const after = correction === undefined
      ? {directory: join(repository, 'terry-moves'), description: 'working tree (including uncommitted changes)'}
      : await checkout(correction, 'correction');
    return await action({baseline: before, correction: after}, temporary);
  } finally {
    await cleanup();
  }
};
