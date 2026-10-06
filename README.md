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
