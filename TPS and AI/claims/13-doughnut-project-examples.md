# Claim 13: Doughnut project as an evidence backlog for other claims

**Status: Backlog — training weeks located; search scoped to 4+4 tagged
classes; queue ordered for the Tokyo talk; items 1–2 ranked from
tagged class weeks (stage: tools and weeks, no student names);
item 3 skipped for this talk (git missed stockpile; may return);
item 4 ranked from latest-code descent + Claim 24 counter; item 5
ranked from latest-code harness (unit + E2E + mock-forest
counter); item 6 ranked from latest-code Jidoka-stop episode +
same-gates harness; item 7 ranked from latest-code worktree
pre-commit hook (wrong tree / misleading commit)**

## Role

This file is not a TPS thesis of its own. It is the queue for **concrete
examples and evidence from the doughnut project** (Terry's LeSS in Action
setting) that the Tokyo talk can put on stage. Claims keep the argument;
this claim keeps the search list.

Terry uses doughnut in LeSS in Action trainings: multiple teams work at
the same time on interdependent user-centric features, in one-week
sprints, and continuously integrate. Feature teams each focus on
customer-centric value. When they integrate, conflict in the shared
product can pull collaboration.

Phase 1 (locate the class weeks) is done. Search is limited to the
tagged weeks. Do not pull examples into owning claims until Terry
asks. Adding a claim to the later-phase list does not authorize
pulling examples. The later-phase order is **talk leverage**, not
slide order: fill first what the current deck
([main theme](../main-theme-and-stage-setting.md),
[slides](../../slides/tps-and-ai/slides.md)) can actually use.

## Phase 1 — Locate training weeks

Done. History is the sibling `doughnut` repo (next to `terry-talks`).

A burst of other committers in one ISO week (Monday–Sunday, git author
date) is treated as a LeSS in Action class. Terry Yin and Tan Yeong
Sheng are excluded (name aliases and known emails). Remaining
contributors are unique author emails. Cursor Agent, dependabot, and
The Gitter Badger are not counted.

- **AI era** — week's last commit on or after 2025-01-01: keep weeks
  with **≥ 4** other contributors.
- **I era** — week's last commit before 2025-01-01: keep weeks with
  **≥ 6** other contributors.

Commit range is oldest..newest in that ISO week by author date. It
bookmarks the week; it is not a `git log A..B` ancestry range.

### AI-era classes (10)

| Week of | Activity | Others | Commits | Range | Search |
|---|---|---:|---:|---|---|
| 2025-01-06 | 2025-01-07–2025-01-12 | 12 | 187 | `84193ef8f8fa..6f7cd48544aa` | yes |
| 2025-02-17 | 2025-02-17–2025-02-21 | 5 | 64 | `97d57317606b..1dc1d3325a27` |  |
| 2025-04-14 | 2025-04-14–2025-04-20 | 12 | 124 | `99bdb147adfc..516aa68aeede` | yes |
| 2025-05-19 | 2025-05-19–2025-05-25 | 7 | 111 | `73358631a6c3..1370ae9d9467` |  |
| 2025-08-25 | 2025-08-25–2025-08-29 | 8 | 73 | `bb0457047326..ac94f595785d` |  |
| 2025-09-15 | 2025-09-15–2025-09-19 | 6 | 102 | `3637b76e768e..33c6f2503bfb` |  |
| 2025-09-29 | 2025-09-29–2025-10-05 | 11 | 88 | `1320a4f157be..33d81fa06172` |  |
| 2026-01-26 | 2026-01-26–2026-01-31 | 14 | 147 | `8c26f6f321e8..16ab060b448b` | yes |
| 2026-04-20 | 2026-04-20–2026-04-24 | 6 | 73 | `27fc4019fdb5..f6e8a195e8cb` |  |
| 2026-07-27 | 2026-07-27–2026-08-02 | 6 | 121 | `61e29c666a5c..3cb5c87baba1` | yes |

### I-era classes (27)

| Week of | Activity | Others | Commits | Range | Search |
|---|---|---:|---:|---|---|
| 2021-04-12 | 2021-04-12–2021-04-18 | 8 | 150 | `ed09515ea21c..8944b620b47e` |  |
| 2021-10-04 | 2021-10-04–2021-10-10 | 12 | 78 | `5f53dd7eb6fe..6a74ca3477ce` |  |
| 2021-11-08 | 2021-11-08–2021-11-13 | 10 | 53 | `1a5e85fe0d92..fd5eb827f57d` |  |
| 2021-12-06 | 2021-12-06–2021-12-10 | 12 | 90 | `3224a9963909..f6a2368ccee5` |  |
| 2022-02-07 | 2022-02-07–2022-02-13 | 9 | 71 | `d77fd544e14a..60c5c13de063` |  |
| 2022-02-21 | 2022-02-22–2022-02-27 | 10 | 74 | `b47967f8a15d..75fbe6bfb873` |  |
| 2022-04-11 | 2022-04-12–2022-04-16 | 13 | 106 | `a8bbf679ebe1..899805261816` |  |
| 2022-06-13 | 2022-06-14–2022-06-19 | 13 | 117 | `7911c9219d49..f434c2041349` |  |
| 2022-09-05 | 2022-09-05–2022-09-11 | 6 | 89 | `01612ddf287d..45c186720636` |  |
| 2022-09-26 | 2022-09-26–2022-10-02 | 14 | 103 | `bbd88a490058..3c996607713f` |  |
| 2022-10-03 | 2022-10-04–2022-10-08 | 10 | 129 | `2a0ffcf26015..dbfa3d8d3859` |  |
| 2023-01-30 | 2023-01-30–2023-02-05 | 6 | 154 | `74d50be24753..24e95133a994` |  |
| 2023-02-06 | 2023-02-06–2023-02-12 | 10 | 120 | `b3940e14a7b2..c50b0cbd2659` |  |
| 2023-03-27 | 2023-03-27–2023-04-02 | 8 | 86 | `6f20bf4a990e..56eea2223ceb` |  |
| 2023-08-21 | 2023-08-21–2023-08-27 | 7 | 140 | `950f34c179cc..3693de1fe687` |  |
| 2023-10-09 | 2023-10-10–2023-10-15 | 6 | 153 | `eee8d7ff0d25..5c121dd4e1e6` |  |
| 2023-10-30 | 2023-10-31–2023-11-05 | 9 | 362 | `aaff641177a2..3d44c24c3b0c` | yes |
| 2023-11-20 | 2023-11-20–2023-11-26 | 9 | 221 | `79d2cf5a2c8b..ff302653b8ad` | yes |
| 2024-04-01 | 2024-04-02–2024-04-07 | 7 | 115 | `f0637d3758f4..75aa22142f3b` |  |
| 2024-04-15 | 2024-04-15–2024-04-21 | 7 | 141 | `ab6dd8fad634..72094c9d67fa` |  |
| 2024-06-03 | 2024-06-03–2024-06-09 | 7 | 249 | `aac607b1dd60..8233f639fc20` | yes |
| 2024-06-10 | 2024-06-10–2024-06-16 | 6 | 178 | `8b8078db3fc5..00957ce01f56` |  |
| 2024-07-01 | 2024-07-01–2024-07-07 | 7 | 163 | `21c7ea9b3ded..37e65ef9cb87` |  |
| 2024-07-15 | 2024-07-15–2024-07-21 | 15 | 149 | `4b3608e98684..71d0f97b4f42` |  |
| 2024-08-19 | 2024-08-19–2024-08-25 | 11 | 189 | `25c6b27a1419..285690caa57b` | yes |
| 2024-08-26 | 2024-08-26–2024-08-30 | 10 | 124 | `d85d4d9dfc09..4a41d6e3652d` |  |
| 2024-10-07 | 2024-10-08–2024-10-13 | 10 | 121 | `a52378416c91..10d14993d2c7` |  |

### Search set — four classes per era, by commit count

`Search = yes` is the later-phase git scope. Untagged weeks stay on
the inventory; expand the set only if the eight lack an example.
Selection is highest commit count in each era, not a judgement of
which class was “best.”

Stay inside the tagged week's range. Post-class intervals are not in
scope: that hunt was dropped with [Claim
23](23-ci-and-disposable-prototypes-tension-pair.md).

## Already pulled — not a training-week search

### ADR propose-to-accept — Claim 9

[Claim 9](09-nemawashi-self-organized-deliberation-in-less.md) now uses
doughnut's ADR playbook as its software example: the **advice process**
and the path from Proposed to Accepted, not the ADR template. The
fuller origin story is the Wärtsilä / Whale architecture-decision
minutes (company name on stage still needs clearance). This is not a
class-week git search.

## Later phases — queued searches

Scope: `Search = yes`. Do not scan untagged weeks unless the tagged
set lacks an example. Fill from the top.

### 1. AI-assisted change through to user value — Claim 8

[Claim 8](08-technical-excellence-enables-jit-coordination-in-less.md)
still needs one concrete doughnut sequence for the talk. This is the
flagship story: it shows the diagnostic (freed vs constrained) and
walks takeaway 5 through an AI episode.

> **AI-assisted change → integration signal → conversation →
> stop-and-fix → delivered user value.**

Look for:

- A small AI-assisted change that met the shared product quickly.
- The signal (related mainline change, merge conflict, red check) that
  made coordination concrete.
- The decentralized conversation—just talk, not a coordinating role.
- Stop-and-fix, then a customer-centric increment, not only a green
  pipeline.
- Counter-examples: generated volume that never became a small
  stoppable change; tests that duplicated code structure and protected
  no behavior; duplicated solutions that broke cohesion.

### 2. Whole Product Focus and continuous integration — Claims 3, 8, and 21

Original hypothesis, split from
[Claim 3](03-jidoka-enables-jit-trusts-respect-grows.md). [Claim
8](08-technical-excellence-enables-jit-coordination-in-less.md) states
the technical-excellence bridge. [Claim
21](21-ci-practice-is-not-a-ci-system.md) separates that practice from
a CI service. I-era weeks can serve this item. Takeaway 5; the JIT
slides.

> **In the doughnut LeSS in Action setting, continuous integration of
> interdependent user-centric work pulls useful cross-team collaboration
> rather than noisy interruption.**

Look for:

- Episodes where integration pulled focused collaboration that advanced
  both teams' customer-centric items.
- Episodes of interruption, flaky integration, or coordination overhead
  instead—and what was missing.
- How much of the effect depends on training design (one week, coaching,
  Whole Product Focus) versus practices that transfer to ordinary
  product groups.
- A green CI service or always-passing build that was not CI (delayed
  mainline integration), or genuine CI whose stop was still primitive.

### 3. Bottom-up batch versus one vertical slice — Claim 17

[Claim 17](17-jit-vertical-slicing-one-piece-flow.md) needs a contrast of
queued layer work with one integrated vertical slice, without implying
that all parallel work is forbidden. Takeaway 2 (*Pull, don't
stockpile*).

Training weeks instruct one-piece flow. Some people may still try to
build from the bottom up: batch the lower-level infra first, then
integrate, then make it work for the user.

Look for:

- A person who stockpiled infra or component work before a user-visible
  increment, despite the one-piece-flow instruction.
- Contrast with a nearby slice that went end-to-end and integrated.
- Healthy parallel flow in the same week (several people, several
  in-progress slices) so the example does not teach “only one thing at a
  time in the whole class.”

Limit: git history has no team membership. Week ranges identify
class weeks, not teams. Follow **one user's** commit sequence (files
touched, order of infra versus user-facing work) rather than a team
label. Observation in class, if remembered, may be stronger than git.

### 4. Judgment descent — Claims 6, 20, and 24

[Claim 6](06-jidoka-embeds-routine-judgment.md) needs software examples
of **smart → dumb → gone** (takeaway 3). [Claim
20](20-poka-yoke-supports-jidoka.md) is the judgment-removing (*gone*)
fixture on that slide — clearly poka-yoke, not “just a test” or “just good
design.”
[Claim 24](24-warnings-as-stop-no-news-is-good-news.md) is the Stop &
Fix contrast: a skippable warning versus a quiet channel. One hunt;
split into owning claims when pulled.

Look for **good** examples of:

- **Judgment-preserving closed stop (dumb rung):** live investigation
  encoded as a closed, owned stop (a test, type, or check whose firing
  *is* the evidence and that
  actually halts work).
- **Judgment-removing prevention (gone rung):** a type, constructor,
  schema, or UI path that makes a known illegal state unrepresentable —
  not a test of whether the feature works, and not general “good design.”
- **Control:** a check that will not compile or will not ship
  (including warnings treated as errors).
- **Counter (Claim 24):** a parked linter or compiler warning pile;
  logs of expected events that fill a person's or agent's context; a
  detector everyone continues past.

Generated checks nobody trusts, and other judgment-loaded artifacts that
still need re-judging, can be noted if they appear; the request is for good
descents.

### 5. Preferred tests that leave reusable capability — Claim 6

The deck has a preferred-tests slide in the jidoka cluster
(*Preferred tests: E2E or unit — nothing in between*). [Claim
6](06-jidoka-embeds-routine-judgment.md) states the rules; this item
is for worked examples in the tests themselves — harness text that
leaves reusable capability after an AI episode, not only a one-off
patch.

Look for:

- Unit (“small test”) examples that drive a stable boundary with
  `makeMe` / crafted data rather than a mock forest.
- E2E examples that assert a user-valued state change, not
  presentation-only.
- Counter-examples: tests that duplicate code structure and protect
  no behavior.

### 6. Same gates for “I” and AI — Claim 6

Takeaway 4. The five human judgments are already the talk list, not a
doughnut hunt. [Claim 6](06-jidoka-embeds-routine-judgment.md) already
cites doughnut's current harness (E2E or unit, no commit on red,
execute-plan Jidoka). What the slide still needs is one episode where
the gate did not weaken according to who authored the change.

Look for:

- A stop that bound a person and an agent the same way.
- After a closed stop exposes a failure: AI helping fix it *without* deleting
  or skipping the stop.
- Counter: an agent or a person tempted to delete or skip a failing
  test to proceed.

### 7. Harness failure that makes Go-See concrete — Claim 16

[Claim 16](16-go-see-ai-harness.md) has its own slide. One doughnut
episode where inspecting the harness — not the agent's summary — is
how the facts become visible.

Look for the best single failure among:

- Wrong context
- A misleading tool call
- A rule that did not fire
- A permission failure

## Examples pulled — prioritized

Index for talk-ready doughnut examples from the later-phase queue
above. Each entry names the target slide and how the example would
be used.

**On stage:** do not name students. Naming the tool (Cursor,
Claude) and the class week is OK. Hashes below are for the
speaker's notes, not for slides. Terry Yin as coach may be named.

Each entry uses this format:

- **Priority** (1–3 within the item)
- **Example** — commit hashes / file paths + one-line story
- **Source** — tagged week range, or latest code
- **Slide** — which slide in `slides/tps-and-ai/slides.md`
- **Use** — spoken beat, bullet, or shown artifact
- **Clearance** — public-discussability (see Questions still
  open)

### 1. Flagship AI sequence (Claim 8)

All four tagged AI-era weeks scanned (author-date windows, not
ancestry). AI-assisted only when a commit message or trailer names
Cursor or Claude — not `AiController` / prompt-feature commits, and
not an author named Cursor Agent / Copilot without that naming.
Git shows merge/conflict/CI/cross-author file follow-ups, not the
decentralized conversation. Ranked by how completely the example
matches the flagship look-fors (then counters), then stage
discussability. 2025-04-14 (`99bdb147adfc..516aa68aeede`, 124
commits) added nothing: no Cursor or Claude in messages or trailers.

#### Priority 1 — Cursor extract-to-child meets Assimilation.vue

- **Priority:** 1
- **Example:** Cursor-coauthored `c2d800a378` (AI-tool
  infrastructure) → `6f54cc1bd1` (extract-to-child API) →
  `9eb162a918` (E2E mock / type fixes; body records `# Conflicts:
  frontend/src/components/recall/Assimilation.vue`) → `b62b0a183b`
  (stop-and-fix: unused `NoteCreationController` import that failed
  CI lint) → user-visible `0a60a9cbfb` (LoadingModal while creating
  a child from a checklist point). Same afternoon, other authors
  `34e121906e` / `bdc83aaa78` also edited `Assimilation.vue`. Most
  complete chain: named AI, recorded conflict leftover, lint stop,
  customer-visible increment. Cursor trailers are on the
  infra/API/conflict/lint commits, not on earlier `f3c7a626fc`
  (promote point to child).
- **Source:** 2026-01-26 class, activity 2026-01-26–2026-01-31,
  bookmark `8c26f6f321e8..16ab060b448b`
- **Slide:** *Let the shared product pull collaboration*
- **Use:** spoken walking takeaway 5 — the flagship sequence
  (tool + week; no student names)
- **Clearance:** stage-OK without names — tools and week only
  (2026-08-26)

#### Priority 2 — Claude restores note properties on a shared export

- **Priority:** 2
- **Example:** `c4f5098c5e` (not AI-named) stripped internal
  frontmatter from exported note bodies in
  `NotebookZipBuilder.java`. Next day, Claude-coauthored
  `b03ac76f8a` (41 insertions, 4 files) writes the author’s
  property block verbatim so a push after export cannot clear every
  note property. Related mainline on the same zip builder; the AI
  commit *is* the stop-and-fix; user value is data surviving the
  round-trip. Smaller and more customer-data-visible than the
  July Claude baseline-seed (`b13f858a5c`), but no recorded merge
  conflict or CI lint stop — hence below Priority 1.
- **Source:** 2026-07-27 class, activity 2026-07-27–2026-08-02,
  bookmark `61e29c666a5c..3cb5c87baba1`
- **Slide:** *Let the shared product pull collaboration*
- **Use:** spoken backup beat if January is not used — same
  takeaway 5 on a CLI-class export contract (tool + week; no
  student names)
- **Clearance:** stage-OK without names — tools and week only
  (2026-08-26)

#### Priority 3 — Cursor `/sync` pull as generated volume that shipped

- **Priority:** 3
- **Example:** Cursor-coauthored `7b61a5705c` — `/sync` pull of
  remote note changes in one commit (12 files, 558 insertions:
  `applyPull.ts`, `syncSlashCommand.tsx`, E2E, a 1000-note
  performance check). Lands on CLI files six authors were already
  sharing that week. Same-day `fce957dd3d` (Cursor) pins `/export`
  tree/body. User-facing, and it met the shared product, but it
  never became a small stoppable change. Stronger volume counter
  than `ba8874c992` (366 lines, 15 files, no integration signal).
  Same-day Claude `c657c674ad` then fixes a `/sync` usage-error
  spinner on that surface.
- **Source:** 2026-07-27 class, activity 2026-07-27–2026-08-02,
  bookmark `61e29c666a5c..3cb5c87baba1`
- **Slide:** *If the teams are more freed than constrained by
  what they built* (diagnostic; callback from the flagship — the
  following *AI can produce plausible software faster than a
  product group can absorb it* is the inventory beat)
- **Use:** spoken callback — generated volume that shipped on a
  shared surface; contrast with Priority 1 (and 2) as small
  stoppable AI change (tool + week; no student names)
- **Clearance:** stage-OK without names — tools and week only
  (2026-08-26)

#### Also considered (hashes for items 3, 6)

- Claude Add on `Assimilation.vue` the same hour: `3490df802d`,
  later `9a4630b103` (2026-01-26). Same-file collision;
  stop-and-fix on *this* increment is thin.
- Claude seed of push baseline at export, after a (not AI-named)
  conflict-label commit: `2cda698d4b` → `b13f858a5c` →
  `8df4357e7a` (2026-07-27). Related mainline on
  `pushBaseline.ts`; larger than Priority 2 (212 insertions plus
  a known-issues doc).
- Claude `/lint` and other CLI trailers the same week (38 total
  including Priority 2): `24aff39cb8`…`3bce909a92`, plus
  frontend Untitled stop-and-fix `19e427404a`. Many small slices
  (freed pole) but weak collaboration signal — one author grinding
  a CLI.
- Cursor volume `ba8874c992` (2026-01-26). Same counter as
  Priority 3, less integration.
- Disable-tests-to-green `a2060f1d70` (re-enable `ee9ca9aa68` /
  `29712022b1`; nearby `6df4f71aa8`). **Not** AI-assisted; keep
  for item 6 / Claim 21, not this flagship.

### 2. Whole Product Focus + CI (Claims 3, 8, 21)

All four tagged I-era weeks scanned (author-date windows, not
ancestry). Hunt narrowed to merge/conflict, revert, CI-fix,
`@ignore`/`@skip`, and cross-author file collisions. Git shows
**authors** and **shared files**, not teams or conversation — that
limit stands for every entry below. Ranked by how completely the
example matches the look-fors, then stage discussability. Window
counts can differ from Phase 1 bookmarks: 2023-10-30 activity
2023-10-31–2023-11-05 (181 commits; bookmark
`aaff641177a2..3d44c24c3b0c` listed 362), 2023-11-20 activity
2023-11-20–2023-11-26 (110; `79d2cf5a2c8b..ff302653b8ad` listed
221), 2024-06-03 activity 2024-06-03–2024-06-09 (248;
`aac607b1dd60..8233f639fc20` listed 249), 2024-08-19 activity
2024-08-19–2024-08-25 (191; `25c6b27a1419..285690caa57b` listed
189). How much of the effect is training design (one week, Whole
Product Focus, coaches on the same files) versus transferable
practice is not settled here; 2024-06-03 has Terry Yin at 95 of
248 commits, 2024-08-19 at 31 of 191. No long-lived
delayed-mainline branches showed. 2023-11-20 and 2024-08-19 did
not unseat the 2023-10-30 pair on completeness; their hashes sit
in also-considered (including a 2024-08-19 `@skip` week with
in-company externals — not ranked for Tokyo).

#### Priority 1 — Two increments merge on FineTuningData.vue

- **Priority:** 1
- **Example:** Same afternoon, `b100b89a1b` (retrieve
  training-file list on `AiAdvisorService` /
  `RestAiControllerTrainingFileTest`) and `c4eb78c961` (upload
  control on `frontend/src/components/admin/FineTuningData.vue`).
  `26db675c54` merges `origin/main` and keeps both increments.
  The rest of the week other authors keep landing
  customer-centric admin work on that Vue,
  `FineTuningService.java`, and the upload feature (trigger /
  file list, upload, OpenAI errors, upload-and-training API).
  Closest I-era picture of integration pulling focused follow-up
  on one user-facing surface — still authors, not teams.
- **Source:** 2023-10-30 class, activity 2023-10-31–2023-11-05,
  bookmark `aaff641177a2..3d44c24c3b0c`
- **Slide:** *Let the shared product pull collaboration*
- **Use:** spoken beat — shared product pulls the next people;
  Whole Product Focus as the reason the collision is useful
  (week only; no student names)
- **Clearance:** stage-OK without names — week only (2026-08-26)

#### Priority 2 — `@ignore` to green, then delete the unused feature

- **Priority:** 2
- **Example:** `3ad9e439ad` “fix build CI fail” moves `@ignore`
  to the whole `automate_upload_and_training.feature` (scenarios
  that had been ignored one-by-one). `21bb04c4d1` later
  **deletes** that unused feature — the silenced spec never
  became a working mainline increment. Same week `fb52a1d1c3` /
  `c807891a29` “workaround to fix CI” toggles `@ignore` on the
  upload-success scenario, and `fe73c87971` “ignore to prepare
  for frontend implementation” parks more of
  `upload_fine_tuning_data.feature`. By the week’s newest
  bookmark that upload file has no `@ignore` (others implemented
  the OpenAI responses). Green pipeline by silencing E2E, then
  either implement or throw the spec away. Primitive stop; the
  service staying green is not the practice.
- **Source:** 2023-10-30 class, activity 2023-10-31–2023-11-05,
  bookmark `aaff641177a2..3d44c24c3b0c`
- **Slide:** *Continuous integration is a practice, not a system*
- **Use:** spoken counter — always-green by `@ignore` is not CI;
  contrast with Priority 1 (week only; no student names)
- **Clearance:** stage-OK without names — week only (2026-08-26)

#### Priority 3 — Offline generate meets online on RestAssessmentController

- **Priority:** 3
- **Example:** `000fa9e1c3` starts generate-assessment;
  `13736eccb7` returns an empty list when the notebook has fewer
  than five notes. An hour later `3e0add90f0` “fix merge” on
  `RestAssessmentController.java` keeps a 500 throw instead of
  the empty list, then `93564956bd` adds generate **online**
  assessment questions on that controller. On the bazaar UI the
  same afternoon an offline generate button/page and
  `9413d0074c` (move start-assessment onto
  `BazaarNotebookButtons.vue`) share the entry point. Two
  customer-centric assessment slices meeting in one controller
  and one button file. Completeness is below Priority 1 (the
  merge keeps a 500 rather than both increments landing). Terry
  Yin `6c71201c33` “merge on and offline” later that week
  (2024-06-09) consolidates the streams — that later commit is
  coach/training-design more than a transferable student
  practice (do not overclaim it as cross-team CI).
- **Source:** 2024-06-03 class, activity 2024-06-03–2024-06-09,
  bookmark `aac607b1dd60..8233f639fc20`
- **Slide:** *Let the shared product pull collaboration*
- **Use:** spoken backup if the 2023 FineTuningData week is not
  used — interdependent assessment work pulled a merge fix
  (week only; no student names)
- **Clearance:** stage-OK without names — week only (2026-08-26)

#### Also considered (hashes for item 3, item 6, Claim 21 backup)

- 2024-08-19 `@skip` to green (Claim 21 backup; in-company
  external class — not ranked): `396412bb0e` / `1d4b875f4b`
  “Skipping the failing test” / “Added the skip tag” on
  `certificate_default_expiration.feature`; `1ad38c0171`
  un-skips two scenarios and `@skip`s a `@wip` one on
  `certificate_expiration.feature`. `eafd8de2c9` “fix: skip
  test” on `notebook_questions.feature`. Mainline kept moving;
  the stop was skip, not a product conversation. Weaker than
  Priority 2: the silenced specs were later implemented or
  coach-rewritten (Terry cleanup 2024-08-24–2024-08-25), not
  thrown away. Same primitive-stop shape as `b660072471` →
  `6f92fbc440` `@ignore` then `@usingMockedOpenAiService`
  (2024-06-03).
- 2024-08-19 cross-author expiry oscillation: `f57421c98c`
  “use the expiry date in the certificate” → `203414ef9e`
  reverts it; `84e65039d9` reapplies, then `304e268059` uses
  the setting in `CertificatePopup.vue`. Stronger than
  `12685f65cf` / `9fa469bb66` / `645a796d5f` approved-column
  revert/re-add (2024-06-03, same author) — still interruption
  more than two items advancing.
- 2023-11-20 two-story merge (weaker positive): `cd6e3c031e`
  merges `origin/main` keeping `79c84ede07`
  (clarifying-questions feature) and `d370aaa2f8`
  (refine-note-details feature). Spec files meeting, not a
  working-increment collision like Priority 1. Same week
  `RichHtmlEditor.vue` / `AiAdvisorService.java` take both
  streams.
- Item 3 stockpile pointers (parked for this talk): `20ea977a2c`
  “hardening: removing feature file for a future story”
  (`note_topic_inline_autocompletion.feature`, 2023-11-20).
  `ab26ff36ba` first scenario `@ignored`, then `d1ae53129b`
  revert of a rename — parked spec, not a vertical slice yet.
- Item 6 gates (skip/ignore to proceed): the `@skip`/`@ignore`
  hashes above, plus `80a0c8ce53` `@ignore` on
  details-autocompletion (later implemented; week-end bookmark
  has `@usingMockedOpenAiService` only). Later-era, **not**
  I-era evidence: disable-tests-to-green `a2060f1d70`
  (re-enable `ee9ca9aa68` / `29712022b1`; nearby `6df4f71aa8`).
- Genuine CI whose stop was still primitive (2023-10-30):
  `f221aa45ed` “format code for pass CI”; `636ac268a3` “Fix
  Lint Error on CI”; `d46cb75145` / `9b67839fc7` /
  `a765f72b96` and `ec8eb0557c` “fix ci”. Overlapping-spec
  reverts `d21ce59429`, `ad3ecc7cfb`; `491019a99f` →
  `36419eb786` mock revert then retrieve-on-button.
  2024-06-03 `696a17cc8c` merge — two-line test conflict.
  2024-08-19 `a39888e72e` “fix merge conflict” (not a merge
  commit; adds approval-list scenarios) and `25234bc442`
  “fix conflict” (four lines in `certificates.ts`).

### 3. Bottom-up batch vs slice (Claim 17)

**Skipped for this talk** (2026-08-26). Git from the tagged weeks
shows parked `@ignore` specs and same-story layering, not one
person stockpiling infra before a user-visible increment. Terry
may return with a remembered class episode; until then *Pull,
don't stockpile* has no doughnut example.

Reused item 1–2 hashes only (no new week scan). Week ranges
identify classes, not teams.

#### Why git did not fill this item

- **Parked specs, not layer-first infra.** `20ea977a2c`
  (2023-11-24) deletes
  `note_topic_inline_autocompletion.feature` “for a future story”
  — throwing away a queued spec, not landing unused backend.
  `ab26ff36ba` first scenario `@ignored` on
  `note_details_inline_autocompletion.feature`, then
  `d1ae53129b` revert of a rename. `fe73c87971` “ignore to
  prepare for frontend implementation” parks two scenarios on
  `upload_fine_tuning_data.feature` *after* that author had
  already been editing `FineTuningData.vue` (`3445b28d60`,
  `58f766a17f`).
- **Vertical-ish, not bottom-up.** `f3c7a626fc` (2026-01-27) is
  user-facing `Assimilation.vue` + E2E first; the next day's
  Cursor `c2d800a378` → `6f54cc1bd1` → `9eb162a918` is AI tool /
  API / Vue for the same extract-to-child bite, not unused
  inventory. `4d6841b2ef` LoadingModal then `0a60a9cbfb` is
  extract-a-component inside that bite.
- **Volume is not stockpile.** `ba8874c992` and `7b61a5705c`
  dump many layers in one commit; that is generated volume, not
  infra queued then later made user-visible.
- **One author stayed on the API.** FineTuningData-week commits
  `6a319f1825` … `e02d74ca62` are `RestAiController` /
  `AiAdvisorService` / tests (plus one generated TS types file).
  That author never follows with their own Vue increment, so git
  cannot show “this person stockpiled, then later shipped UI.”
  Item 2 already uses `b100b89a1b` + `c4eb78c961` + merge
  `26db675c54` as integration on one surface, not as a batch
  queue.
- **Hidden-then-unveil is still not infra.** `6c50a4a466`
  “launching … by removing the easter egg” on
  `RichHtmlEditor.vue` (2023-11-23) gates a user-facing editor,
  not a backend stockpile.

#### Contrast already on the index (not a second hunt)

Same week as the `@ignore` counter: `c4eb78c961` lands upload on
`FineTuningData.vue` the afternoon of 2023-10-31; `26db675c54`
merges both increments. Several authors keep landing
customer-centric admin work on that Vue and
`FineTuningService.java` (item 2 Priority 1). That is the healthy
parallel-flow contrast — several people, several in-progress
slices.

#### Priority — none ranked (parked)

- **Priority:** none ranked — skipped for Tokyo this pass
- **Example:** observation-in-class if Terry returns; hashes
  above are parked specs, same-story layering, or volume
- **Source:** reused 2023-10-30 (`aaff641177a2..3d44c24c3b0c`),
  2023-11-20 (`79d2cf5a2c8b..ff302653b8ad`), and 2026-01-26
  (`8c26f6f321e8..16ab060b448b`) hashes from items 1–2
- **Slide:** *Pull, don't stockpile*
- **Use:** not for stage this talk
- **Clearance:** n/a — no ranked example

### 4. Judgment descent (Claims 6, 20, 24)

Latest doughnut HEAD `e683b74615` (2026-08-26), not a tagged class
week. Hunt started from CI (`Backend-unit-tests` runs
`backend/gradlew -p backend test`) then tests whose comments or
introducing commits name a live failure; then write-DTO
`@Pattern` / Quiz UI / `check_focus_tags.sh` for judgment-removing
prevention and control; then leftover Biome `"warn"` and CI flags for
the Claim 24 counter. Ranked by how completely the example matches the
look-fors (judgment-preserving stop, judgment-removing prevention,
control, Claim 24 counter), then stage discussability. All entries below are current
project-owned code (Terry Yin), not student class-week work —
clearance is no. SET NULL `34560f0412` does **not** qualify as
judgment-removing prevention: it *allows*
`conversation.recall_prompt_id` NULL on delete instead of making an
illegal FK unrepresentable.

#### Priority 1 — recall-stats N+1 query bound

- **Priority:** 1
- **Example:** `backend/src/test/java/com/odde/donut/services/RecallStatsPerformanceTest.java`
  — added in `0bd1dd2995` (“perf(recall-stats): fix endpoint N+1
  timeout with projection query”). Production timed out at ~200
  answered recalls because a native `SELECT rp.*` hydrated
  `RecallPrompt` and its eager answer/MCQ associations (one query
  per prompt). The test flushes and evicts, then asserts
  `prepareStatementCount < 10` while `compute()` still returns
  200 reviews. A later red is the N+1 coming back — not a
  judgment of “is this slow enough.” Still on HEAD after the
  package rename (`a3aafb83eb`). Most complete judgment-preserving
  descent: live investigation encoded as a closed stop whose firing *is* the
  evidence and that still halts `gradlew test`.
- **Source:** latest code (HEAD `e683b74615`; introducing
  `0bd1dd2995`)
- **Slide:** *Smart → dumb → gone*
- **Use:** spoken beat — investigation (timeout) encoded as a
  closed stop whose firing is the evidence
- **Clearance:** no — current harness owned by the project (not a
  class-week student bug)

#### Priority 2 — OS-invalid display names cannot be authored

- **Priority:** 2
- **Example:** A known wiki-link / filename mistake: titles
  containing `\ / : * ? " < > |` or ASCII controls. Write DTOs
  (`NoteUpdateTitleDTO`, `FolderCreationRequest`,
  `FolderRenameRequest`, `NotebookUpdateRequest`) carry
  `@Pattern(regexp = DisplayNamePathSeparators.REGEXP)` so those
  characters cannot pass Bean Validation — they are not a
  representable title on the authoring path. `DisplayName` the
  value type only trims surrounding whitespace (including
  zero-width); it does not itself reject `/`. `dfbde33184`
  (“fix: reject remaining OS-invalid characters in display
  names”) closed the remaining authoring hole after
  `55e5e55edc` sanitization; `445656f73a` converted historical
  rows on migrate. Validation tests name the illegal charset,
  not “can the user rename a note.” Most complete judgment-removing
  prevention: the illegal state is unrepresentable on the authoring path, not
  merely tested after the fact.
- **Source:** latest code (HEAD `e683b74615`; introducing
  `55e5e55edc` / `dfbde33184` / `445656f73a`; type trim
  `6e54f544cb`)
- **Slide:** *Smart → dumb → gone*
- **Use:** spoken “gone” beat — a known illegal title cannot be
  authored (API schema), leftovers rewritten
- **Clearance:** no — current harness/schema owned by the
  project

#### Priority 3 — Biome leftover `"warn"` does not stop CI

- **Priority:** 3
- **Example:** Leftover `"warn"` rules, not errors. Root
  `biome.json` parks `noExplicitAny` and (in e2e overrides)
  unused variables/imports. `frontend/biome.json` parks
  `noDebugger`, `noUnusedVariables` (TS; Vue sets it `off`),
  and on `*.ts` `noUnreachable` / `noDuplicateClassMembers` /
  `noImportCycles`. `frontend:lint` is `biome check . && vue-tsc
  --noEmit`; `cy:lint` / `cli:lint` / `test-fixtures:lint` are
  `biome check` the same way. CI job
  `Lint-N-Backend-Generated-Types-For-Frontend` runs
  `pnpm lint:all` — none pass `--error-on-warnings`. Gradle
  `JavaCompile` (`backend/build.gradle`) sets encoding only;
  no `allWarningsAsErrors` / `-Werror`. A new `debugger` or
  unused TS binding can print and the job stays green. Parked
  warning pile: the detector ran, everyone continues past it.
  Contrast with `@focus` (also-considered): that check exits 1.
- **Source:** latest code (HEAD `e683b74615`; CI
  `.github/workflows/ci.yml`; `biome.json` /
  `frontend/biome.json`)
- **Slide:** *Stop & Fix*
- **Use:** spoken dashboard-not-a-stop contrast — leftover
  `"warn"` versus a quiet channel; pair with `@focus` as the
  control that actually will not ship
- **Clearance:** no — current CI/lint owned by the project

#### Also considered (control, second closed stop, weaker prevention)

- **`@focus` in features will not ship (control):**
  `scripts/check_focus_tags.sh` — any `@focus` in
  `e2e_test/features/**/*.feature` exits 1. Same CI job as
  Priority 3, before types-gen and `pnpm lint:all`. Known
  inadvertent error: `@focus` would skip the other scenarios.
  Shingo **control** (will not proceed / will not ship), not
  prevention (you can still type `@focus` locally) and not a
  product-feature test. Same job: `vue-tsc --noEmit` (type
  errors won't compile). Introducing `57ca35a9c4`. Completeness
  matches the control look-for; ranked below Priority 3 because
  the Claim 24 beat on *Stop & Fix* is the skippable pile, and
  `@focus` is the contrast that makes that dashboard visible.
  `check_wip_tags.sh` (max 5 `@wip`) is a related won't-ship
  cap, weaker than `@focus` skipping the suite.
- **FK closure fails CI on hard-delete (second judgment-preserving descent):**
  Same afternoon as a live delete failure. `34560f0412`
  (“fix(db): allow memory tracker delete when conversation
  references prompt”) SET NULLs `conversation_ibfk_4` and adds
  `MemoryTrackerDeleteControllerTest.shouldHardDeleteMemoryTrackerWhenItsRecallPromptHasAConversation`.
  Six minutes later `eb6a1db962` (“test(db): fail CI when FK
  blocks hard-deletable entity delete”) adds
  `backend/src/test/java/com/odde/donut/configs/DeletableEntityFkClosureTest.java`:
  walk CASCADE from `memory_tracker` and fail if any reachable
  FK is NO ACTION / RESTRICT (unless allowlisted with a
  reason). The failure message *is* the restricting path. The
  controller test is the specific bug; the schema walk still
  halts CI if a later migration reintroduces the shape. Same
  descent family as Priority 1, less a single production
  timeout encoded as one oracle.
- **Spelling tracker has no MCQ choice UI (weaker prevention):**
  `frontend/src/components/recall/Quiz.vue` mounts
  `SpellingQuestionDisplay` when
  `currentMemoryTracker.spelling` is set; otherwise
  `ContestableQuestion` (MCQ choices via
  `RecallPromptComponent` only if `recallPrompt.mcq`). A
  spelling tracker never gets choice buttons, so “answer
  spelling by picking an MCQ index” is not a UI path. Same
  family: `AssimilationButtons.vue` omits “Remember spelling”
  unless `showSpellingOption` (`AssimilationSettings.vue` hides
  it when a SPELLING tracker already exists). That matches
  UNIQUE `user_note_spelling_active` on `memory_tracker`. The
  unique index is ordinary schema uniqueness; the missing
  button is the poka-yoke UI — real, but closer to quiz
  design than Priority 2's unrepresentable charset.
- SET NULL `34560f0412` (`fk_conversation_recall_prompt` ON
  DELETE SET NULL): makes a NULL FK representable so
  hard-delete can proceed. Opposite of unrepresentable. The
  FK-closure *test* is the second closed-stop bullet above.
- `chk_notebook_name_nonempty` CHECK and
  `uk_notebook_ownership_name`: empty or duplicate notebook
  names cannot persist. Real schema poka-yoke, closer to
  generic uniqueness / NOT EMPTY than the OS-invalid charset.
- `Grade.fromValue` (FSRS G must be 1–4): constructor-like
  enum, generic “use an enum.”
- Assimilation queue “regression” tests (`e3642081a0`) and
  `QuestionGenerationBatchOutputFixtureTest` — pin a spec or a
  fixture contract, not a production investigation.
- LoadingModal / CLI cursor “regression” tests — layout/TTY
  reachability, weaker closed oracle than query-count or FK
  path.

### 5. Preferred tests (Claim 6)

Latest doughnut HEAD `e683b74615` (2026-08-26), not a tagged class
week. Hunt from `backend/src/test` `MakeMe` factories and
`e2e_test` cucumber that then checks persisted note/recall; skipped
item 4's performance/FK tests. Ranked by how completely the example
matches the look-fors (unit with `makeMe` at a stable boundary, E2E
state change not presentation, optional structure-duplicating
counter), then stage discussability. All entries below are current
project-owned harness (Terry Yin) — clearance is no.

#### Priority 1 — controller answer leaves a GOOD recall log

- **Priority:** 1
- **Example:** `backend/src/test/java/com/odde/donut/controllers/RecallPromptAnswerControllerTest.java`
  — `correctAnswerLeavesAGoodRecallLogLinkedToTheAnswer`.
  `RecallPromptControllerTestBase` builds the note, tracker, and
  MCQ prompt with `makeMe` (`aNote().notebookOwnedBy`,
  `aMemoryTrackerFor`, `aRecallPrompt().withMcqForNote`) against
  the real Spring test DB (`ControllerTestBase`: `@SpringBootTest`
  `@Transactional`). The test drives `controller.answer`, then
  `getRecallLogs` and asserts one `Grade.GOOD` log whose
  `answerId` is the persisted answer. The only mock is
  `@MockitoBean(name = "officialOpenAiClient")` — an external, not
  a collaborator forest. Most complete unit: stable controller
  boundary, crafted `makeMe` data, real lower layers, mock only
  OpenAI, and the assertion is recall state, not request shape.
- **Source:** latest code (HEAD `e683b74615`)
- **Slide:** *Preferred tests: E2E or unit — nothing in between*
- **Use:** shown harness text — the unit half (makeMe + controller
  + persisted recall log); evidence a good episode leaves this
  reusable check, not a one-off patch
- **Clearance:** no — current harness owned by the project

#### Priority 2 — note property edits persist after reload

- **Priority:** 2
- **Example:** `e2e_test/features/note_creation_and_update/note_edit.feature`
  scenario *Rich note property edits persist after reload*. After
  setup frontmatter (`diligence: high`, `topic: training`), the
  user adds `status` / `draft`, renames `topic` to `domain` /
  `wiki`, then reloads the note. The Then is the persisted
  properties (`status` draft, `domain` wiki, `diligence` still
  high, old `topic` gone) — not a visible button. Completeness
  matches the E2E look-for (user-valued note state after reload);
  ranked below Priority 1 because the slide's distinctive doughnut
  word is `makeMe`, which this scenario does not show.
- **Source:** latest code (HEAD `e683b74615`)
- **Slide:** *Preferred tests: E2E or unit — nothing in between*
- **Use:** shown harness text — the E2E half (cucumber that checks
  persisted note properties after reload)
- **Clearance:** no — current harness owned by the project

#### Priority 3 — extract-request JSON built from a mock forest

- **Priority:** 3
- **Example:** `backend/src/test/java/com/odde/donut/services/ai/AiNoteAutomationServiceExtractRequestTest.java`
  — `buildExtractNoteRequestBodyReflectsSelectedLayoutItems`.
  Constructs `AiNoteAutomationService` with mocks of
  `GlobalSettingsService`, `FocusContextRetrievalService`,
  `FocusContextMarkdownRenderer`, and `OpenAiApiHandler` (plus a
  hand-built `Note`, no `makeMe`). Asserts OpenAI request JSON
  keys (`model`, `instructions`, `text.format` `json_schema`) and
  instruction-string fragments (`"id" : "p1-1"`, selected item
  ids). Duplicates the request-builder's structure; protects no
  user-valued persist. The OpenAI mock would be a legitimate
  external; the rest is an internal mock forest.
- **Source:** latest code (HEAD `e683b74615`)
- **Slide:** *Preferred tests: E2E or unit — nothing in between*
- **Use:** spoken counter — over-mocking plus a snapshot of
  internals; contrast with Priority 1 (and 2) as reusable
  capability
- **Clearance:** no — current harness owned by the project

#### Also considered (second unit, second E2E, weaker counters)

- **Exact-match search (`makeMe`, no mocks):**
  `backend/src/test/java/com/odde/donut/services/search/NoteSearchServiceExactMatchTest.java`
  — `shouldPutExactMatchFirstWhenSearching` crafts `Pam` /
  `Diazepam` notes with `makeMe.aNote(…).notebook(…).please()` and
  drives `NoteSearchService` on the real DB, zero mocks. Same
  unit family as Priority 1; ranked below because the boundary is
  a search service rather than a controller, and it does not
  illustrate “mock only externals.”
- **Same Good-recall through the browser:**
  `e2e_test/features/recall/spaced_repetition.feature` scenario
  *Memory Tracker shows a GOOD RecallLog after just-review Good*
  — assimilate, choose Good, visit the tracker, Then a GOOD
  RecallLog. Same user-valued recall state as Priority 1; ranked
  below Priority 2 because the Then is on the tracker page with
  no reload (easier to hear as presentation). First scenario of
  that file (assimilate then day-1/day-2 counts) is the same
  family.
- **Notebook / folder readme persist after reload:**
  `e2e_test/features/notebooks/notebook_creation.feature` and
  `e2e_test/features/folder_organization/folder_page_readme.feature`
  — same reload shape as Priority 2, weaker than note-property
  authoring.
- **In-memory FSRS scheduling:**
  `MemoryTrackerCorrectRecallSchedulingTest` /
  `MemoryTrackerRecallSchedulingTestBase` — `makeMe` with
  `inMemoryPlease()`, no Spring DB. Real domain object, weaker
  “lower layers.”
- **Closed item-4 stops:** `RecallStatsPerformanceTest` and
  `DeletableEntityFkClosureTest` were not re-used.
- **Weaker counters:**
  `SemanticNoteSearchServiceEmptyEmbeddingTest` mocks
  `NoteRepository` / embeddings and *does* protect empty-query
  behavior. `frontend/tests/toolbars/MainMenu.recall.spec.ts`
  mocks `useRecallData` and asserts a `.recall-count` of `"789"`
  — presentation / in-between; doughnut still files Vitest page
  tests as unit, so it is a muddier spoken contrast than
  Priority 3's request-JSON forest.

### 6. Same gates for “I” and AI (Claim 6)

Latest doughnut HEAD `e683b74615` (2026-08-26), not a tagged class
week. Hunt from current harness (git hook, execute-plan Jidoka,
planning.mdc no-commit-on-red) then the Jidoka-stop trail in
the 2026-08-26 recall-timing commits. Ranked by how completely the
example matches the look-fors (same stop for a person and an
agent; AI then helps without dissolving the stop; optional
skip/delete counter), then stage discussability. Priorities 1–2
are current project-owned harness (Terry Yin) — clearance is no.
The disable-tests counter is a tagged AI-era class week and is
not AI-assisted.

There is no husky test gate. `scripts/git-hooks/pre-commit`
formats; no-commit-on-red lives in the same rules and skill
both “I” and AI read.

#### Priority 1 — Jidoka stop bound the agent until the person decided

- **Priority:** 1
- **Example:** Same afternoon on
  `.planning/quick/001-morning-cognitive-index/PLAN.md`.
  `0b56ebc81a` records execute-plan Jidoka on slice 6
  (*A detour into a note is recorded separately*): no
  mid-question note affordance exists; PLAN.md says **Do not
  guess the UX** and waits. Author is Terry Yin (no Cursor
  trailer on the stop itself). `a24d4141b2` is the developer's
  clarification (full navigation away from RecallPage; return
  via Resume). Cursor-coauthored `f078923b63` then implements
  detour time — adds `recall_timing.feature`, a controller
  test, and Vitest specs; does not delete or `@wip`-away the
  stop. Same gate: value/UX ambiguity stops the agent; the
  person decides; the agent may then build. Most complete
  person+agent same-stop arc.
- **Source:** latest code (HEAD `e683b74615`; `0b56ebc81a` /
  `a24d4141b2` / `f078923b63`)
- **Slide:** *The gates do not care who authored the change*
- **Use:** spoken beat — takeaway 4: the stop did not weaken
  for the agent; after the person decided, Cursor helped
  without dissolving the check
- **Clearance:** no — current plan/harness owned by the project

#### Priority 2 — same-gates text the person and the agent both read

- **Priority:** 2
- **Example:** Current harness paths. `scripts/git-hooks/pre-commit`
  (installed by `scripts/setup-git-hooks.sh`) runs
  `pnpm format:changed` — format, not tests. No-commit-on-red
  is `.cursor/rules/planning.mdc` (never commit at the TDD red
  step; no non-`@wip` CI-breaking tests at a slice boundary)
  plus `.agents/skills/execute-plan/SKILL.md` (delegation:
  **no commit on red**; wrap-up refuses non-`@wip` red; Jidoka
  stop on value, design, credentials, undiagnosed failure, or
  ambiguity — do not stop merely to avoid fixing a test the
  change caused). `.claude/skills/execute-plan` is a symlink
  to `.agents`. Same test style:
  `.cursor/rules/unit-testing.mdc` (E2E or unit, nothing in
  between). Completeness matches “current config”; ranked
  below Priority 1 because [Claim
  6](06-jidoka-embeds-routine-judgment.md) already cites
  these bullets — the slide still needs the episode.
- **Source:** latest code (HEAD `e683b74615`)
- **Slide:** *The gates do not care who authored the change*
- **Use:** shown artifact — the paths both “I” and AI read;
  contrast with Priority 1 as the episode those gates produced
- **Clearance:** no — current harness owned by the project

#### Also considered (second Jidoka stop, skip/delete counters)

- **Cursor-trailed Jidoka stop, still waiting:**
  `b6966f2be9` (2026-08-10) “record phase 5 Jidoka stop for
  display-name migration” — Co-authored-by Cursor. Phases 1–4
  shipped; legacy row normalization awaits a fail-loud vs
  disambiguation decision. Agent recorded the stop; no
  following implementation in that trail, so the arc is
  incomplete compared with Priority 1.
- **Disable tests to green (class-week counter, not
  AI-assisted):** `a2060f1d70` “disabled 2 backend tests to pass
  the pipeline” (2025-01-08); re-enable `ee9ca9aa68` /
  `29712022b1`; nearby `6df4f71aa8`. AI-era class week
  2025-01-06. Tempted to disable the stop to proceed — the
  opposite of Priority 1. Same hashes as item 1 / item 2
  also-considered.
- **I-era `@ignore`/`@skip`:** item 2 Priority 2 `3ad9e439ad`
  and also-considered `@skip` hashes. Primitive stop; not a
  second ranked counter here.

### 7. Go-See harness failure (Claim 16)

Latest doughnut HEAD `e683b74615` (2026-08-26), not a tagged class
week. Hunt from current harness (`scripts/git-hooks/pre-commit`,
execute-plan Jidoka, `.cursorignore` / agent-map indexing, cloud-agent
docs) then plan notes and Cursor transcripts for a *failure*: wrong
context, a misleading tool call, a rule that did not fire, or a
permission failure. Ranked by how completely the episode matches
those look-fors (inspect the harness, not the agent's summary), then
stage discussability. Priority 1 is current project-owned harness
(Terry Yin) — clearance is no.

`0b56ebc81a` (item 6) is a *correct* Jidoka stop: the rule fired.
That is not this look-for.

#### Priority 1 — worktree `git commit` wrote the wrong tree

- **Priority:** 1
- **Example:** 2026-07-24, Cursor-coauthored worktree
  `doughnut-recall-stats-perf` (`perf/recall-stats`). The agent
  ran `git commit`; the tool returned success. Installed
  `scripts/git-hooks/pre-commit` resolved `REPO_ROOT` as
  `$HOOK_DIR/../..` — the hook file lives in the shared
  `.git/hooks` directory, whose parent is the **main** checkout,
  not the worktree — then `cd` and `git add -u`. Commits were
  empty, or later picked up the main tree's
  `.planning/ROADMAP.md` / `STATE.md` instead of the staged
  recall-stats files. The agent's “committed the N+1 fix” was
  false until someone read the hook and `git show`. Fix
  `1c696d455d` (“make pre-commit hook worktree-aware”) switches
  to `git rev-parse --show-toplevel`. The product change later
  landed from the main checkout as `0bd1dd2995` (item 4). Most
  complete Go-See failure: wrong context *and* a misleading
  tool call; the facts were in the harness, not the summary.
- **Source:** latest code (HEAD `e683b74615`; introducing
  `1c696d455d`; product landing `0bd1dd2995`)
- **Slide:** *Go-See may mean entering the AI harness*
- **Use:** spoken beat — the single story making genchi
  genbutsu concrete: do not manage by the agent's “commit
  succeeded”; inspect the hook and the tree that actually
  recorded
- **Clearance:** no — current harness owned by the project

#### Also considered (correct stop, generic docs, skill pattern)

- **Correct Jidoka, not a harness failure:** `0b56ebc81a` →
  `a24d4141b2` → Cursor `f078923b63` (item 6). Ambiguity stop
  that *did* fire. Same family: `b6966f2be9` display-name
  migration stop, still waiting.
- **Cloud-agent “permission denied”:**
  `docs/cloud_agent_backend_testing.md` tells the reader to
  check `whoami` if setup fails. Troubleshooting text, not a
  dated episode of a permission the agent hit.
- **Nested-agent wrap-up skip (skill text, not a trace):**
  `b2e2fad2f0` adds execute-plan “If the implementer already
  committed → process failure” because “nested agents routinely
  skip spawning a second Task.” Pattern encoded in the skill;
  no single commit/trace of a missed wrap-up to put on stage.
- **Indexing exclusion is design, not an incident:**
  `.cursor/agent-map.md` excludes `docs/` from default indexing
  so agents must read ADRs explicitly. Intentional context
  shaping; no recorded wrong-context miss from it.

## Dropped — not talk-blocking

Dropped items remain true as workshop observations if they turn up
while searching the queue. They are not queued: the talk would not
use a dedicated result.

- **Post-class surgical removal of an abandoned feature** ([Claim
  23](23-ci-and-disposable-prototypes-tension-pair.md)). Lowest topic
  (*Tensions and honest limits*); not a takeaway. The slide can name
  the tension pair without a doughnut cleanup story. That search also
  needed the interval *after* a tagged week, which is outside the
  class-week scope used above.

## Talk implication

Once examples are pulled, they belong in the owning claims. This file
stays a backlog and an index, not a second lecture.

## Questions still open

- **Stage naming (settled 2026-08-26):** do not name students;
  tools (Cursor, Claude) and class weeks are OK. Ranked items
  1–2 are cleared under that rule. Items 4–7 are project-owned
  harness (no student names).
- Is the week of 2025-02-17 a class (5 other emails; smallest AI-era
  hit) or a smaller session to drop? It is not in the search set.
- Item 3 (*Pull, don't stockpile*) — skipped for this talk.
  Git did not show a stockpile-vs-slice episode. Return later
  if a remembered class story shows up.

## Sources consulted

Doughnut git log (author name, email, author date) in the sibling
`doughnut` repo. Phase 1 inventory retrieved 2026-08-25. Item 1
candidate scan of 2025-01-06 and 2026-01-26 retrieved 2026-08-26;
2025-04-14 and 2026-07-27 ranked with them 2026-08-26. Item 2
unranked scan of 2023-10-30 and 2024-06-03 retrieved 2026-08-26;
item 2 ranked with 2023-11-20 and 2024-08-19 2026-08-26
(author-date windows; merge/CI-fix/`@ignore`/`@skip`/cross-author
files). Item 3 reused those hashes 2026-08-26 (one-author file
order on named commits; no new week scan): parked specs, not
layer-first infra; skipped for this talk (Terry may return). Item 4 from
latest doughnut HEAD `e683b74615` 2026-08-26 (CI
`Backend-unit-tests` + `git log --follow` on regression/fail-CI
tests; DTO `@Pattern` / Quiz spelling-vs-MCQ UI /
`check_focus_tags.sh`; leftover Biome `"warn"` with no
`--error-on-warnings`; Gradle has no warnings-as-errors; SET
NULL `34560f0412` does not qualify). Ranked: (1) N+1 query
bound; (2) OS-invalid titles; (3) Biome leftover `"warn"` as
Claim 24 counter (*Stop & Fix*). Item 5 from latest doughnut
HEAD `e683b74615` 2026-08-26 (`MakeMe` controller tests +
`e2e_test` persist-after-reload; skipped item-4 performance/FK
tests). Ranked: (1) recall-answer GOOD log with `makeMe`; (2)
note-property edits persist after reload; (3) extract-request
JSON from an internal mock forest. Item 6 from latest doughnut
HEAD `e683b74615` 2026-08-26 (harness: `scripts/git-hooks/pre-commit`
is format-only; no-commit-on-red and Jidoka in
`.cursor/rules/planning.mdc` and
`.agents/skills/execute-plan/SKILL.md`; `.claude/skills/execute-plan`
symlinks there; episode `0b56ebc81a` → `a24d4141b2` → Cursor
`f078923b63`; counter `a2060f1d70` reused from items 1–2).
Ranked: (1) Jidoka-stop then Cursor implements detour; (2)
same-gates harness paths. Item 7 from latest doughnut HEAD
`e683b74615` 2026-08-26 (harness: `scripts/git-hooks/pre-commit`
now `git rev-parse --show-toplevel`; introducing `1c696d455d`
after a 2026-07-24 worktree session where `git commit` succeeded
with an empty/wrong tree because `$HOOK_DIR/../..` was the main
checkout; product landing `0bd1dd2995` reused from item 4;
`0b56ebc81a` excluded as a correct Jidoka stop; cloud-agent
permission text and execute-plan nested-skip skill not ranked).
Ranked: (1) worktree pre-commit wrote the wrong tree.

**Phase 1 done. Search set tagged (4+4 by commit count). Queue ordered
for the Tokyo talk. Items 1–2 ranked from tagged class weeks (stage:
tools and weeks, no student names). Item 3 skipped for this talk.
Item 4 ranked from latest-code descent + Claim 24 counter. Item 5
ranked from latest-code harness (unit + E2E + mock-forest counter).
Item 6 ranked from latest-code Jidoka-stop episode + same-gates
harness. Item 7 ranked from latest-code worktree pre-commit hook
(wrong tree / misleading commit).**
