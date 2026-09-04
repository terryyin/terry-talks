terry-talks
===========

Terry's talks and presentations, built with [Slidev](https://sli.dev/),
plus in-tree Remotion videos under `terry-moves/`.

Each talk lives under `slides/<deck>/slides.md`; run `pnpm present` to pick
one and launch it. For videos, run `pnpm moves` (Studio) or `pnpm moves test`
/ `render` / `srt`. Retired notebook-era content lives under `legacy/`.

Format changed components before staging with
`./scripts/run.sh pnpm format:changed`. The pre-commit hook then validates
affected staged components with `pnpm lint:changed`. It is check-only: it
does not format files or mutate the working tree or Git index.

Install the version-controlled hook with `./scripts/setup-git-hooks.sh`.
