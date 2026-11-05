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

Run `pnpm test` from the repository root for all active tests and checks:
Remotion's complete Jest suite, ESLint, both workspace TypeScript checks,
and Python narration tests discovered from `scripts/test_*.py` (Python 3.13
is used in CI). Run `pnpm test:node` or `pnpm test:python` for either group.

GitHub Actions runs these checks on every push and pull request, and supports
manual runs through the Actions tab. The Ubuntu jobs use Node 24, the pnpm
version pinned in `package.json`, and a frozen workspace lockfile. Each Node
check runs even if another check fails, and Python tests run independently.
The retired `legacy/` toolchain is outside the active test suites.

Each CI run also publishes a CI proof summary for Open Dough's Intent
**CI status** tab: passed, failed and other counts for `terry-moves/tests`,
the one Intent location in `.planning/open-dough.json`. The Remotion tests
step writes Jest's JSON report, `scripts/ci-proof/jest-outcomes.mjs` turns it
into one outcome per test (a suite that fails before running any test counts
as one failure), and the `ci-proof` job keeps `ci-proof-summary-attempt-<n>`
for 30 days. Those steps run after test failures too and change no check's
verdict; when the tests never ran, the summary shows the part as missing. The
`scripts/ci-proof/ci-proof-*.mjs` modules are unmodified copies of Open
Dough's `dough-test-optimization` collector; copy them again when an Open
Dough update changes them.

Remotion agent guidance is installed at
[`remotion-best-practices`](.agents/skills/remotion-best-practices/SKILL.md),
with Claude sharing it through `.claude/skills/remotion-best-practices`.
This is the unmodified official [remotion-dev/skills](https://github.com/remotion-dev/skills)
skill, version `4.0.533`, pinned to commit
[`473352613039e718e46655a26df224851e84c4aa`](https://github.com/remotion-dev/skills/tree/473352613039e718e46655a26df224851e84c4aa/skills/remotion-best-practices).
Use it for Remotion-specific guidance; the project's `AGENTS.md`/`CLAUDE.md`
and installed Open Dough skills govern workflow.
