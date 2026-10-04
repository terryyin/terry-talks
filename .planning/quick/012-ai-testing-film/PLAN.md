# Viewers use AI for testing without adding unmanageable complexity

Source: [story](../../../AI%20Test%20Automation/seed.md#testing-without-unmanageable-complexity).
Identity: `ai-test-automation-film#testing-without-unmanageable-complexity`

## Goal and boundaries

Deliver an engaging English Terry Moves film around 70 seconds for LinkedIn.
It addresses large legacy projects where maintenance problems arrive faster
than the team can solve them. Follow the confirmed article: hook, upkeep,
overload, hands-on testing and fixing, selective automation, optimization and
deletion. Preserve useful early targeted tests, human investigation of AI
findings, isolation and repeatability, and distinct protection at different
test levels. Show a substantially more expressive, polished evolution of
Story Impact's warm cartoon language. Output MP4, poster, and matching SRT.
Posting to LinkedIn and Terry's personal voice recording are outside this work.

## Decisions and existing solutions

- User delegated creative choices, production, and review through a finished
  video. 1080×1350, 30 fps; readable embedded captions. Synthetic Cedar
  narration is credited as such. Original restrained score and sound effects.
- Working title: **The Legacy Workshop**. One tactile paper workshop connects
  the whole argument. Engineer in coral; eager mint AI companion; sky/mint
  legacy cabinet; golden maintained checks and green protective shields.
  Character acting and causal changes carry meaning. Tickets still arrive at
  the end; improvement is not a magical cure.
- PFE: reuse native Remotion composition registration and the measured caption
  and audio pattern in `Problem Decomposition/cedar_narration.py`,
  `produce_audio.py`, `film-script.json`, `terry-moves/src/problemDecomposition`,
  and `scripts/problem-decomposition-subtitles.mjs`. These already couple
  continuous speech, real word timestamps, scenes and full-speech SRT.
  Adapt only film-specific responsibilities; do not build another animation
  framework or alter existing films. Use Story Impact's palette, outlined
  shapes and easing vocabulary as art references. New expressive SVG actors
  and workshop set serve this film's causal storytelling.
- No architectural reversal: only Accepted ADR-0000 exists and retains human
  decision ownership. No new ADR or North Star decision is required.
- Plan statuses: planned, in-progress, done. No numeric slice budget is
  supplied. Replanning is allowed within the confirmed film outcome if
  measured speech or visual evaluation invalidates an approach.
- Each slice returns uncommitted work. Coordinator accepts proof, delegates
  independent post-change refactoring, selectively formats changed source,
  runs affected checks and publishes through installed Dough delivery.
  Repository hooks are absent (only sample hooks); formatting uses the
  established Remotion eslint/prettier rules on changed files only.

## Observed premises and early probe

| Premise | Observation and consumer | Result |
| --- | --- | --- |
| Existing composition and caption model can host this film | Read Root.tsx, ProblemDecompositionFilm.tsx, film.ts, JSON and film.spec.ts; registration and audio/caption consumers | Native React composition with JSON timing and Audio is established |
| Voice production can be adapted without imitating Terry | Read Cedar helper and audio producer; Python OpenAI import, ffmpeg/ffprobe presence, credential-presence check only | Existing continuous Cedar + Whisper alignment path; real paid generation and transcript match are bounded by slice 1 probe |
| Checkout has deterministic dependencies | `pnpm install --frozen-lockfile` in selected worktree | Exit 0, pnpm 9.15.9, lockfile unchanged |
| Film narration can fit near 70 seconds naturally | Editorial draft about 140 words; slice 1 real voice generation consumes this premise | Measured speech must settle runtime before slice 2 acting is keyed |
| New set does not require raster production | Art audit of Story Impact native SVG pieces/face/motion and existing film set | Native scalable characters permit expressive independent facial/body acting |

## Ordered slices

### 1. Viewers follow the complete narrated workshop storyboard
Type: Behavior
Status: planned

Produce the whole explanation as a registered composition with original
illustrated workshop shots, readable captions, continuous expressive Cedar
speech, measured word timing and matching SRT. The full source lives in
`AI Test Automation/film-script.json`; the confirmed article remains the
argument's authority. Opening has no logo delay and clearly identifies the
test-generation question and overloaded legacy audience. Shots visually
preserve the story's key examples: useful early shield, upkeep, isolated
repeatable checks, investigated findings and fixes, selected workflows,
redundancy deletion and suitable fast local checks with a retained full route.
This is the first audiovisual evaluation, not final animation quality.

Proof: render representative storyboard stills and a narrated preview; read
captions at reduced feed size. Measure actual narration and export duration;
reject a rushed performance or >75-second draft and revise wording/performance
within confirmed content. Check exact full spoken transcript against aligned
words, contiguous timing, caption bounds and full-speech SRT. Rendered review
must show isolation/reset and targeted early protection clearly. Run affected
timing tests, TypeScript and lint after edits. Paid voice/alignment failure
stops dependent slice 2 rather than using invented word timestamps.

### 2. Viewers watch the polished expressive film through its final payoff
Type: Behavior
Status: planned

Replace storyboard holds with meaningful character acting, anticipation,
transitions and causal animation tied to measured narration. Improve depth,
lighting, silhouette, facial response and camera framing. The engineer
demonstrates, the AI learns/checks, an investigated finding becomes a fix,
and useful protections earn their place. Tighten attention between beats.
Compose original quiet music and contextual sound effects, preserving clear
speech. Finish final MP4, poster and synchronized captions; document reproducible
render and audio production with truthful synthetic narration credit.

Proof: coordinator watches the full video and samples every scene at reduced
feed size for clipping, caption legibility, visual causality and sustained
interest. Inspect key character/action frames and listen to the whole mixed
audio. Confirm no all-tests-trash, automatic-fix, zero-cost, mandatory-e2e-first
or empty-backlog implication. Run `pnpm -C terry-moves test` because Root's
registration and shared runtime load all films; verify compositions list and
render the final H.264 yuv420p bt709 MP4. ffprobe confirms 1080×1350, 30fps,
audible track and near-70-second duration. SRT uses the same complete spoken
source. Final artifact is shown to Terry inline.

## Proof ownership and design assessment

Slice 1 owns the complete content journey, measured timing and legible scene
layout; slice 2 owns the finished animated delivery, sound and export. Slice 2
rechecks content as animation may imply more than words. The common workshop
and small actor vocabulary avoid a string of unrelated metaphors. Both are
Behavior slices, each with an independently reviewable audiovisual result.
Voice duration is the decisive early probe; no future animation depends on
estimated word timestamps. No remaining slice-design concern identified.

## Execution context

Origin/integration checkout: `/Users/terryyin/git/terry-talks`.
Preparation workspace: `/Users/terryyin/git/terry-talks-worktrees/ai-testing-film`,
branch `codex/ai-testing-film`, created for this story, base `a53f1c0`.
Authorized remote/trunk: `origin`, `refs/heads/master`.
Preparation assignment published `aaed564c2d4005728779d2e9a4c2a4472edefc9c`.
Mode: Story Branch. Retain execution claim and delivery receipts here and in
the coordinating conversation when execution starts. Main checkout's original
untracked article draft is preserved outside publication from this worktree.
