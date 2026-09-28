# Terry can see which claims the talk stands on

Source: [refined story](../../../TPS%20and%20AI/seed.md#confirmed-basis).
Identity: `tps-and-ai-talk#confirmed-basis`

## Goal and scope

Before cutting slides, Terry can look up any beat's claim in one place, the
[README claim list](../../../TPS%20and%20AI/README.md), and see whether it may
carry a primary beat (**Confirmed**), only a qualified or secondary beat
(**Supporting**), or none (**Off-stage**). Confirmed claims read as one
current opinion, and the stale cross-references listed in the seed are
repaired.

- **Included:**
  - A talk role on every README entry, plus one short note explaining the
    roles.
  - Claim 22 collapsed to one opinion, because it is the only proposed
    Confirmed claim that still shows its forming path.
  - Five stale-reference repairs.
  - Terry's review, which sets the final roles.
- **Excluded:**
  - Talk roles inside claim files; claim status lines change only where a
    repair touches them.
  - Speaker-note citations in the deck (moved to the
    [storyline](../../../TPS%20and%20AI/seed.md#storyline) story).
  - New research or new claims, and resolving open questions that do not
    change a role.
  - Collapsing Off-stage Claim 15.
  - Restoring other content that `a2cb854` removed (see *Learnings*).
- **Assumptions:**
  - Terry can review by about 29 September.
  - Proposed roles, as accepted by Terry on 2026-09-28:
    - **Confirmed:** 00, 1, 3, 4, 5, 6, 8, 10, 12, 17, 18, 19, 20, 21, 22, 23, 24
    - **Supporting:** 2, 7, 9, 11, 14, 16
    - **Off-stage:** 13, 15

## Execution context and decisions

- Markdown content only: no product code, build, or test suite applies.
  ADR-0000 (`docs/adrs/0000-use-adrs-accepted.md`) keeps durable decisions
  with Terry. This story needs no architectural decision and no North Star
  topic. No existing product solution is being relocated, so PFE is not
  applicable.
- Plan root is `.planning/quick/`. Plan 006 is the highest allocated number,
  so this plan is 007. Slice statuses are planned, in-progress, and done. No
  numeric slice target or hard limit was supplied, so each slice has one
  proof loop.
- **Role marker:** Each README entry ends with ` — **Confirmed**`,
  ` — **Supporting**`, or ` — **Off-stage**`, after the entry's last link.
  Entry 22 lists its companion CLD, which follows Claim 22's role. A short
  *Talk roles* note sits under *Current status*. It says that roles are for
  this talk, and that they do not change a claim's `Provisional`/`Backlog`
  status or mean **Finalized**.
- **Wording choices are drafts for Terry.** Where a repair has to pick one
  wording (detailed control, the CLD skill list, Claim 9's attribution), use
  the owning claim's current wording:
  - Claim 10 owns control and freedom.
  - Claim 12 owns the skills.
  - Claim 3 owns the LeSS translation.

  Slice 4 lets Terry accept or change each choice.
- If Terry reopens a claim's substance during review, it becomes Supporting.
  No research starts in this story.
- **Link check (proof helper),** run from `TPS and AI/`. It fails on any
  relative `.md` link in the README or the claims that does not resolve:

  ```sh
  node -e 'const fs=require("fs"),path=require("path");let bad=0;for(const f of ["README.md",...fs.readdirSync("claims").map(x=>"claims/"+x)]){const s=fs.readFileSync(f,"utf8");for(const m of s.matchAll(/\]\(([^)\s#]+\.md)(#[^)]*)?\)/g)){if(/^https?:/.test(m[1]))continue;const t=path.join(path.dirname(f),decodeURI(m[1]));if(!fs.existsSync(t)){bad++;console.log(f+" -> "+m[1]);}}}console.log("broken links:",bad);process.exit(bad?1:0)'
  ```

- **Delivery:** Commits go to the story branch. Push, landing, and releasing
  the Preparing assignment follow the keep decision and are not part of this
  plan.
- **Execution location (2026-09-28):** Story Branch startup refused the
  claim because `execution-start.mjs` does not URL-decode the backlog link
  (`../TPS%20and%20AI/seed.md` → "selected canonical home is absent on fetched
  trunk"). Terry selected current-branch execution instead. Execution and
  integration checkout: `/Users/terryyin/git/terry-talks` on `master`,
  starting at `04fe8bb`. The Take is local only. Commits are made on `master`
  and not pushed, so no revision is published.

## Decisive premises observed (2026-09-28, at `96bcdfb`)

| Premise | Observation | Result |
| --- | --- | --- |
| The README lists 25 claims (0–24); entry 22 also links the companion CLD | Read `TPS and AI/README.md` | Holds |
| Only Claim 22 among proposed Confirmed claims shows a forming path | `grep -ciE '^#+ .*(original claim\|research-based adjustment\|emerging implication)'` over each Confirmed claim | 22 → 3 headings plus a "**Still open for further discussion**" footer; all others 0 |
| Among the other claims, only Claim 15 has a forming path | Same grep over 2, 7, 9, 11, 14, 15, 16 | 15 → 3; others 0. A promotion in slice 4 adds collapse work only for 15 |
| Claims 6, 20, and 24 say "example search not started" | `grep -n 'not started' claims/*.md` | 06:269, 20:91, 24:80; Claim 13 §4 now ranks those examples |
| Claim 13's item 7 is stale | Claim 13's status line says "item 7 ranked from latest-code worktree pre-commit hook". Its pulled examples stop at §6. `git show a2cb854` removed "### 7. Go-See harness failure (Claim 16)" with "Priority 1 — worktree `git commit` wrote the wrong tree" | Stale. The pulled section was removed by a tooling-adoption commit. Claim 16's open question (line 83) still says it is queued on Claim 13 |
| Claim 9 cites text that Claim 3 no longer contains | Claim 9 line 143 says Claim 3 "already rejects dependable inter-team relationships"; `grep -i 'inter-team\|dependable' claims/03-*.md` finds nothing. Claim 9 line 278 ("names … Whole Product Focus") matches Claim 3 line 64 | Line 143 is stale; line 278 holds |
| Wording on detailed control differs | Claim 1 line 103 "rely less on detailed control"; Claim 22 line 15 "less detailed control"; Claim 10 frames it as **coercive** vs **enabling** control | Holds |
| The CLD skill list disagrees with Claim 12 | CLD (`22-tps-less-ai-cld.md` line 40) lists "problem solving, facilitation, analysis, coaching, independent kaizen". Claim 12 lines 71–75 name the sourced skills (problem-solving, teaching others) and call a longer list Terry's open editorial choice | Holds |
| The link check works and is clean before changes | Ran the link-check command above | `broken links: 0` |

## Cumulative design and sizing assessment

There is one model throughout. The README is the single place where talk roles
are recorded. Every repair makes the citing text agree with the claim that owns
the concept, so no parallel role marker, per-claim role field, or cross-claim
index is added.

The slices form a small sequence:
- Slice 1 makes the map visible.
- Slice 2 makes the only non-conforming Confirmed claim conform.
- Slice 3 removes contradictions between claims.
- Slice 4 turns the proposal into Terry's decision.

Slice 3 groups five small repairs because they share one outcome ("no stale
cross-reference contradicts another claim") and one grep-based proof loop.
Splitting them would give fragments with no separate value.

The size of slice 4 depends on Terry's changes. The observations above bound
it: only Claim 15 would need collapsing if promoted, and any claim he reopens
becomes Supporting, not research. No remaining slice-specific decomposition
concerns were found in this assessment.

## Ordered slices and proof ownership

### 1. README shows each claim's proposed talk role
Type: Behavior
Status: done
Behavior: Terry opens the README claim list → every entry 0–24 ends with
exactly one talk role, following the proposal, and a short *Talk roles* note
explains Confirmed, Supporting, and Off-stage and how they differ from
Provisional/Finalized.
Proof:
- From `TPS and AI/`:
  `grep -cE ' — \*\*(Confirmed|Supporting|Off-stage)\*\*$' README.md` → `25`.
- `grep -c 'Talk roles' README.md` → ≥ 1.
- The link check reports 0 broken links.
- Owns key example 1 (Claim 3 is Confirmed and its file is unchanged) and
  the README half of example 4 (Claim 13 is Off-stage).

### 2. Claim 22 reads as one current opinion
Type: Behavior
Status: done
Behavior: Terry reads Claim 22 → it states the settled talk device (two slide
figures of at most six variables each; a map of existing claims, not a new
empirical result) as one opinion:
- The forming-path headings and the "Still open for further discussion"
  footer are gone.
- Its status line no longer says "still open" except for genuinely open
  questions.
- *Questions still open* keeps only the doughnut-walkthrough question and any
  other question that is still genuinely open.
- The README's *Current status* sentence names only Claim 15 as still showing
  its forming path.

Proof:
- From `TPS and AI/`:
  `grep -ciE '^#+ .*(original claim|research-based adjustment|emerging implication)|^\*\*still open for further' claims/22-cld-shows-tps-reasoning-for-less-ai.md`
  → `0`.
- `grep -n 'Claims 15 and 22' README.md` → no match.
- The link check reports 0 broken links.
- Owns key example 2. The CLD's R-loop table and its links to 3, 10, and 12
  are kept.

### 3. Claims no longer contradict one another
Type: Behavior
Status: done
Behavior: Terry follows a cross-reference between claims → it agrees with the
owning claim:
- Claims 6, 20, and 24 point to Claim 13's ranked judgment-descent examples
  instead of "example search not started".
- Claim 13's pulled examples include item 7 again. The section removed in
  `a2cb854` ("### 7. Go-See harness failure (Claim 16)") is restored from
  `a2cb854^`, and the status line matches it.
- Claim 16's open question points to that pulled example.
- Claim 9 no longer attributes an "inter-team relationships" rejection to
  Claim 3.
- Claims 1 and 22 use Claim 10's wording for control.
- The CLD's "People who can think" row lists Claim 12's sourced skills and
  leaves the longer list to Claim 12's open choice.

Proof (from `TPS and AI/`):
- `grep -n 'not started' claims/0[6]-*.md claims/2[04]-*.md` → no match.
- `grep -c '^### 7\. ' claims/13-doughnut-project-examples.md` → `2` (the
  queued search plus the restored pulled example).
- `grep -n 'inter-team' claims/09-*.md` → no match attributed to Claim 3.
- `grep -n 'detailed control' claims/01-*.md claims/22-*.md` shows only the
  wording aligned with Claim 10.
- `grep -n 'facilitation, analysis, coaching' claims/22-tps-less-ai-cld.md` →
  no match.
- The link check reports 0 broken links.
- Owns the Claim 6/20/24 half of key example 4.

### 4. Terry's talk roles are recorded
Type: Behavior
Status: planned
Behavior: Terry reads the README list, each Confirmed claim, and the
slice 3 wording choices, then confirms or changes each role and wording → the
README shows his roles, and the claim files reflect his wording choices:
- A claim promoted to Confirmed is collapsed as in slice 2. Only Claim 15
  would need this.
- A claim he reopens stays or becomes Supporting, with its question left open.

Proof:
- Terry states agreement with every role and wording choice; record the
  statement and any changes in *Learnings*.
- The slice 1 grep → `25`.
- The slice 2 forming-path grep over every Confirmed claim → `0`.
- The link check reports 0 broken links.
- Owns key examples 5 and 6 and the story's evaluation.
- This is an owner-held observation: an unanswered review stops here, and
  slices 1–3 remain a usable proposal.

## Promise → proof map

| Promise | Slice |
| --- | --- |
| Every README entry has one talk role, with a note | 1 |
| Roles are separate from status lines; claim files have no role marker | 1 (only the README changes for roles), 4 |
| Confirmed claims read as one opinion | 2 (22), 4 (any promoted claim) |
| Listed stale references are repaired | 3 |
| Terry decides roles; reopened → Supporting | 4 |
| No broken relative links are introduced | 1–4 (link check) |

## Learnings

- `a2cb854` ("chore: adopt Open Dough workflow") also removed Claim 13's
  item 6 "Priority 2 — same-gates text the person and the agent both read".
  No current text cites it, so it is out of scope. Terry may ask to restore it.
- Slice 1 (2026-09-28): the *Talk roles* note uses the story's terms:
  Confirmed "may carry a primary beat", Supporting "only a qualified or
  secondary beat", Off-stage "not used in this talk". Accepted proof: the
  role grep gives 25, the `Talk roles` grep gives 1, the link check reports
  `broken links: 0`, and no claim file changed.
- Slice 2 (2026-09-28): Claim 22 is now `## Claim` (the settled loop
  statement), `### What a CLD is, and is not`, `### The loops`,
  `### AI as the gain on R5`, `## Implication for the talk`,
  `## Questions still open` (only the doughnut walkthrough), and
  `## Sources consulted`.
  - The verbatim quote of the old Claim 10 loop was dropped in favour of the
    pointer to Claim 10. That removed Claim 22's only "detailed control"
    phrase, so slice 3 aligns only Claim 1.
  - The loop names in the table now match the companion CLD's loop catalog.
  - Terry reviews these in slice 4: the subheading names, the status wording,
    and the choice of settled answers now stated as prose.
  - Accepted proof: the forming-path grep gives 0, `Claims 15 and 22` has no
    match, the role grep gives 25, and the link check reports
    `broken links: 0`.
- Slice 3 (2026-09-28): the wording choices Terry reviews in slice 4:
  - Claim 1: "entrust more and rely less on coercive control".
  - The CLD row "People who can think": "problem-solving and teaching others
    to solve problems (the sourced skills; any longer list is Claim 12's
    open choice)".
  - Claim 9: "Claim 3 names **Whole Product Focus** as the LeSS
    translation".
  - Claims 6, 20, and 24 each end "Which to put on stage is still open."
  - Claim 13 §7 was restored verbatim from `a2cb854^` with two changes:
    "execute-plan" became "execution", as `a2cb854` did elsewhere in the
    file. The §7 Sources paragraph and its closing-summary item were also
    restored.
- Open for slice 4: Claim 13's status line still says item 6 was ranked from
  the "Jidoka-stop episode + same-gates harness", but the same-gates
  Priority 2 is still removed. Terry either trims that phrase or restores
  item 6's Priority 2. The §6 intro ("Priorities 1–2 …") has the same stale
  premise. §7 is text from before 2026-09-09 and has not been re-verified
  against the doughnut repo.
- Slice 3 accepted proof: none of the `not started`, `inter-team`,
  `detailed control`, or `facilitation, analysis, coaching` greps matches.
  `^### 7\. ` counts 2 in Claim 13, and the role grep gives 25. The link
  check reports `broken links: 0`, and the §4–§7 anchors resolve to Claim 13's
  pulled headings.
