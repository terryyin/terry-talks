terry-talks
===========

Terry's talks and presentations, built with [Slidev](https://sli.dev/),
plus in-tree Remotion videos under `terry-moves/`.

Run `nix develop` (or use the checked-in direnv setup) for Node 24 and the
project's pinned pnpm. Without Nix, use Node 24.9 or newer. Run `pnpm install`
from the repository root to install both workspaces.

Each talk lives under `slides/<deck>/slides.md`; run `pnpm present` to pick
one and launch it. For videos, run `pnpm moves` (Studio) or `pnpm moves test`
/ `render` / `srt`. Retired notebook-era content lives under `legacy/`.

Remotion agent guidance is installed at
[`remotion-best-practices`](.agents/skills/remotion-best-practices/SKILL.md),
with Claude sharing it through `.claude/skills/remotion-best-practices`.
This is the unmodified official [remotion-dev/skills](https://github.com/remotion-dev/skills)
skill, version `4.0.533`, pinned to commit
[`473352613039e718e46655a26df224851e84c4aa`](https://github.com/remotion-dev/skills/tree/473352613039e718e46655a26df224851e84c4aa/skills/remotion-best-practices).
Use it for Remotion-specific guidance; the project's `AGENTS.md`/`CLAUDE.md`
and installed Open Dough skills govern workflow.
