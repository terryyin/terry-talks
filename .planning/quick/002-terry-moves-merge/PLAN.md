# terry-moves merge + renovate

**Status:** in progress — S1–S9 landed (S5 skipped); next is S10
**Type:** ad-hoc plan (`.planning/quick/`)

Merge `../terry-moves` into this repo as an in-tree folder (not a submodule /
published package), keep its git history, run it on this repo’s nix + pnpm
toolchain, then upgrade dependencies and usages so tests and the Remotion
bundle still succeed. Add one root one-touch command for typical moves
actions.

Source of truth for remaining slices: this PLAN. Delete this
`002-terry-moves-merge/` directory once every slice has landed.

## Decisions

Assumed defaults are in **bold**. D1 and D9 are confirmed. execute-plan
should treat D2–D8 as decided unless you change them.

| # | Question | Resolution |
|---|----------|------------|
| D1 | Uncommitted WIP in `../terry-moves`? | **Confirmed.** Working tree is clean (`main` matches origin). Circus / arrow-ring files were discarded, not committed. Subtree from committed `main` only. Skip S5. |
| D2 | Package shape (“not an external module”)? | **In-tree pnpm workspace package** at `terry-moves/` with its own `package.json`. Not a git submodule, not published to npm, not flattened into the root package (Vue/Slidev vs React/Remotion cannot share one TS/JSX config). |
| D3 | Root one-touch command? | **`pnpm moves`** — dispatcher like `pnpm present`: `studio` (default), `test`, `render`, `srt`. Subcommands skip the menu (`pnpm moves test`). Does **not** replace root `build` (Slidev) or add a root `test` script. |
| D4 | Git import method? | **`git subtree add --prefix=terry-moves <path-or-remote> main`** with **no `--squash`** so all ~576 commits remain. |
| D5 | What “build works” means? | **Remotion compositions listing** (`remotion compositions`) as the default build check (bundles, lists Story ids, no full video encode). Full `remotion render` of one short composition only if compositions listing is insufficient. Do not encode every story on every slice. |
| D6 | Nix flake extras (chromium, ffmpeg)? | **Do not add them unless a later slice actually fails without them.** Remotion downloads its own Chrome; Jest is jsdom. Same env = Node 22 + pnpm from the existing flake. |
| D7 | How far to take the 3D stack? | **Follow Remotion’s React 19 guide:** React 19 + R3F 9.1.2 + three 0.171 + styled-components 6. Unit tests + compositions listing must pass. Visual QA of every story in Studio is **out of slice scope** unless a test/bundle fails. |
| D8 | terry-moves GitHub Actions workflow? | **Do not promote to repo-root `.github/`.** After subtree it will sit at `terry-moves/.github/` (inert). Delete it when wiring the workspace so it is not mistaken for live CI. This repo has no GitHub Actions today. |
| D9 | ADR for “this repo also holds Remotion videos”? | **Confirmed: no ADR in this plan.** |

## Learnings

- `git log -- terry-moves` after subtree add only shows the merge commit
  (`f10f03b`). Prefixed history is on `HEAD^2` (`8aba145`, 576 commits).
  Path-limited log is not how to inspect pre-merge terry-moves commits.
- S2 left Remotion as `^4.0.0`; pnpm resolved **4.0.518**. Yarn had **4.0.130**.
  Latest Remotion `.d.ts` needs TS 5. S3 pinned `remotion` / `@remotion/*` to
  exact **4.0.130** so the existing stack still tests; S8 still upgrades.
- S4: pnpm also floated drei → 9.122 (`BatchedMesh` missing on three 0.145).
  Pinned the yarn-resolved 3D stack (drei 9.102.6, fiber 8.15.19, three 0.145.0,
  three-stdlib 2.29.6, three-mesh-bvh 0.7.3). S13 still does the React 19 /
  R3F 9 / three 0.171 upgrade. Compositions script:
  `remotion compositions src/index.ts`.
- `pnpm moves srt` invokes `ts-node ./src/srt.ts`; that script already fails
  typecheck (`padStart`, `process`). S9 (`tsx` + TS 5) should fix it.
- S8: Remotion **4.0.518** needs TS 5 (done as S8-minimum) and pnpm-visible
  `@remotion/eslint-plugin` + `@typescript-eslint/{parser,eslint-plugin}`
  because `@remotion/eslint-config@4.0.518` has empty `dependencies`.
  S9 remaining work is mostly `ts-node` → `tsx` / srt. S10 still owns flat
  config if that is what current Remotion recommends.

## Discoveries (read before executing)

- `../terry-moves` is on `main`, 576 commits, last commit message is
  “upgrade to remotion 5” but that commit actually moved Remotion **3 → 4**.
  Installed today: Remotion **4.0.130**, React 18.2, three **0.145**. Latest
  Remotion is still **4.0.x** (~4.0.518). There is no Remotion 5 to jump to.
- `../terry-moves` still has `yarn.lock` (committed). After merge, only the
  root `pnpm-lock.yaml` should remain.
- Tests live under `tests/video_conomponents/` (typo). Do not rename in the
  merge slices (unrelated churn); only if a later refactor slice needs it.
- `public/assets/quillustration_flower_and_water-can/scene.bin` is gitignored
  **and missing on disk**. `StoryProductDeveloper` references that gltf.
  Pre-existing; merge will not fix it.
- `package.json` `name` is still `remotion-template-three`; license field is
  `UNLICENSED` while `LICENSE.md` is the Remotion template MIT. Rename the
  package; do not change license in this plan.
- Root `pnpm-workspace.yaml` already exists with `packages: []`.
- Root `pnpm typecheck` is `vue-tsc` for Slidev only. Keep it that way;
  terry-moves typecheck stays inside `terry-moves` / `pnpm moves test`.

## Constraints

- ADR-0000 (`docs/adrs/0000-use-adrs-accepted.md`): follow Accepted ADRs;
  do not invent a new ADR unless the owner asks.
- Do not push.
- Do not leave root `pnpm typecheck` / Slidev `pnpm build` broken.
- Remotion packages must share one **exact** version (no `^` on
  `remotion` / `@remotion/*`).
- Do not hoist Remotion/React into the root package.json.
- Time-box: S1 (subtree) may exceed 5 minutes because of history + ~100MB
  assets; that is an allowed long operation. All other slices stay small;
  if an upgrade slice blows the time-box, stash, split by error family.

---

## Slices

### S1 — Import terry-moves with history

- **Type:** Structure
- **Status:** done
- **Unlocks:** S2 (workspace install)
- Merge `f10f03b` (`git subtree add --prefix=terry-moves` from
  `/Users/terryyin/git/terry-moves` `main`, no squash). `terry-moves/{src,tests,public}`
  present; no `node_modules`. History on `HEAD^2` (576 commits).

### S2 — pnpm workspace, drop yarn/npm lockfiles

- **Type:** Structure
- **Status:** done
- **Unlocks:** S3 (tests on pnpm)
- Workspace member `terry-moves`; package renamed `terry-moves` + `private`.
  `yarn.lock` removed. Root `pnpm-lock.yaml` records the importer.
  `pnpm --filter terry-moves exec tsc --version` → 4.9.5; root `pnpm typecheck` green.

### S3 — Current-version tests pass under pnpm

- **Type:** Behavior
- **Status:** done
- Remotion/@remotion/* pinned to exact 4.0.130; `npx jest` → `jest`;
  direct `three-stdlib` + `@types/testing-library__jest-dom`.
  `pnpm --filter terry-moves test` exits 0 (156 tests + eslint + tsc).

### S4 — Remotion compositions listing (build smoke)

- **Type:** Behavior
- **Status:** done
- Script `compositions`: `remotion compositions src/index.ts`. Lists all
  Story ids from `src/Root.tsx`. 3D stack pinned to yarn-resolved versions
  so webpack can bundle against three 0.145.

### S5 — (Optional) Bring circus / arrow-ring WIP

- **Type:** Behavior
- **Status:** skipped
- **Skipped (D1 confirmed).** WIP was discarded in `../terry-moves`; those
  files are not on `main`.

### S6 — Root one-touch `pnpm moves`

- **Type:** Behavior
- **Status:** done
- `scripts/moves.mjs` + root `"moves"`. Default/`studio` → `pnpm start` in
  `terry-moves/` (`remotion preview`). `test` / `render` / `srt` dispatch to
  package scripts. `pnpm moves test` exits 0.

### S7 — Drop inert nested GitHub workflow

- **Type:** Structure
- **Status:** done
- Deleted `terry-moves/.github/` (inert nested workflow). No repo-root CI.

### S8 — Remotion 4.0.130 → latest 4.0.x

- **Type:** Behavior
- **Status:** done
- Remotion / `@remotion/*` at exact **4.0.518**. `"start": "remotion studio"`,
  `"preview"` alias kept. TypeScript `^5.6` (needed for zod 4 `.d.ts`).
  Direct `@remotion/eslint-plugin` + typescript-eslint 6.21.0 so pnpm can
  lint. `remotion versions` one version; test + compositions pass.

### S9 — TypeScript aligned with the repo

- **Type:** Behavior
- **Status:** done
- TS `^5.6` (from S8). `srt` uses `tsx`; `tsconfig` `lib` matches `target` (ES2018).
  `pnpm moves srt` prints SRT; tests pass.

### S10 — ESLint to current Remotion config

- **Type:** Behavior
- **Status:** planned
- **Do:** Move to whatever `@remotion/eslint-config` currently recommends
  (flat config if that is the latest). Fix resulting lint in `src/` only
  as needed for a clean `eslint` run. Tests still include lint and pass.
- **Done when:** terry-moves test’s eslint step exits 0.

### S11 — Jest + Testing Library current

- **Type:** Behavior
- **Status:** planned
- **Do:** Upgrade jest, ts-jest, jest-environment-jsdom, @testing-library/*
  to current majors that work with the TS/React versions in place **before
  S12**. Replace `@testing-library/jest-dom/extend-expect` with the
  current setup-file import. Tests pass. Do **not** migrate to Vitest
  unless Jest cannot be made to work (Remotion does not require Vitest
  for this project’s model tests).
- **Done when:** `pnpm --filter terry-moves test` exits 0.

### S12 — styled-components v6

- **Type:** Behavior
- **Status:** planned
- **Do:** Upgrade `styled-components` to v6 and update the few call sites
  (`CodeHighlight`, `CalloutCloud`, `HealthBar`) to the v6 API. Tests pass.
- **Done when:** those files compile; tests pass.

### S13 — React 19 + R3F 9 + three 0.171 (packages compile)

- **Type:** Structure
- **Status:** planned
- **Unlocks:** S14 (tests after 3D upgrade)
- **Do:** Coupled upgrade per Remotion React 19 docs: `react`/`react-dom`
  19, `@react-three/fiber` 9.1.2 (or current compatible), `three` 0.171,
  matching `@types/*`, `@react-three/drei` / postprocessing as required.
  Fix compile errors only (import paths such as
  `three/examples/jsm/loaders/GLTFLoader` and `three/src/Three`, R3F/drei
  API). Do not redesign scenes. If this exceeds the time-box, split by
  error family and update this plan — do not leave `tsc` red.
- **Done when:** terry-moves `tsc --noEmit` exits 0.

### S14 — Tests + compositions after the 3D upgrade

- **Type:** Behavior
- **Status:** planned
- **Do:** Fix test/runtime breakages from S13 until
  `pnpm --filter terry-moves test` and compositions listing both pass.
- **Done when:** both commands exit 0.

### S15 — Remaining dependency upgrades

- **Type:** Behavior
- **Status:** planned
- **Do:** Upgrade leftover terry-moves deps (markdown-it, prism-react-renderer,
  prettier, @types/markdown-it, etc.) to current versions and fix call
  sites. Drop unused deps if install/tsc proves they are unused
  (`@react-three/test-renderer`, `@types/web`, …). Tests + compositions
  still green.
- **Done when:** `pnpm outdated` inside `terry-moves` is clean of
  intentional leftovers; test + compositions pass.

### S16 — Docs match the new layout and commands

- **Type:** Behavior
- **Status:** planned
- **Do:** Update `terry-moves/README.md` (yarn → `pnpm moves` / workspace
  commands). Update root `README.md`, `AGENTS.md`, and `CLAUDE.md` layout
  to mention `terry-moves/` as in-tree Remotion videos. Update `flake.nix`
  description if it still says talks-only. Keep AGENTS.md and CLAUDE.md
  in sync.
- **Done when:** a reader of README/AGENTS can find `pnpm moves` and the
  folder; no yarn-only instructions remain.

---

## Out of scope

- Committing/pushing `../terry-moves` itself.
- Full video encodes of every story; visual pixel QA of 3D scenes.
- Adding GitHub Actions to terry-talks.
- Publishing terry-moves to npm.
- Renaming `tests/video_conomponents` unless a later refactor needs it.
- Writing or accepting an ADR (owner-owned).
- Restoring the missing `scene.bin` for the flower/water-can model.
