# A simple problem-decomposition film

Source: [simple-film](../../../Problem%20Decomposition%20Remake/seed.md#simple-film)
Identity: problem-decomposition-remake#simple-film

## Goal and scope

Deliver one complete, independently watchable remake under 120 seconds. The original transcript and confirmed article govern meaning. The film uses typography, simple animated diagrams and one shopper example. Its four-part argument retains just-in-time within the goals, speculative option value, completed-boundary stopping and current-purpose commits. Recent Remotion/AI research supports a modest editing improvement, not a new application or a migration of old films.

## Execution context

- Mode: Story Branch. Originating/integration checkout: `/Users/terryyin/git/terry-talks`.
- Owned new worktree: `/private/tmp/terry-talks-problem-decomposition-remake`; branch `codex/problem-decomposition-remake`.
- Starting revision: `5c72ec1abb8e3908b6e0c54d7b8cbda91672e3a6`. Claim accepted on `origin/master`: `6f83400326928be5e2cc962c0fb5db82e49412d9`.
- Publisher: `39cf4744-b36d-4da6-888c-53352dd4035a`; author: Kaoru-chan. Final authorized target: `origin/master`; increments target the execution branch.
- Runtime: bundled Node 24.19.0 (default host Node 24.5 is below engines); pnpm 11.28.5. Locked workspace install and an applicable typecheck precede implementation.
- No numeric slice target/hard limit supplied. One Behavior slice retains this film's connected explanation and single render/inspection proof loop; splitting script, narration and visual layers would fragment its outcome. Replanning is permitted if actual evidence reveals independent outcomes.

## Existing solutions and decisive premises

- Remotion entry point `terry-moves/src/Root.tsx` registers separate film compositions; new composition registration preserves predecessors. Read at 5c72ec1. Reuse in-tree runtime, not a second Remotion application.
- `scripts/narration_audio.py` owns exact-script audit, PCM and measured mastering; old film producers use it. Reuse these helpers without changing their existing consumers. New script, direction, assets and timing belong to this new film.
- Installed Remotion 4.0.533 supports named explicit `Series.Sequence` nodes and `Interactive` elements. Official interactivity documentation and the 5 October release confirm this. Implement only intentional heading/card editing surfaces, preserving native code for calculated diagrams.
- ADR-0000 requires human ownership of durable architecture decisions. Local, reversible film composition and project choices stay beside this film; no new cross-cutting decision is needed.
- Paid voice availability cannot be settled by reading. Probe one Cedar performance at the beginning of implementation; an unavailable API or failed exact-script audit stops dependent voice timing/export, preserving the project for recovery. Existing voice files are untouched.

## Outside-in proof

| Promise | Observation |
| --- | --- |
| Faithful argument and simple concrete example | Review script against article; inspect representative rendered frames for distinction, premises, two goals and all four principles; stock result remains completed after feedback changes next priority |
| Expressive connected voice and accurate timing/captions | Actual saved-audio transcription compared with exact script, measured word/scene timing, loudness/peak analysis, audible playback review; full SRT covers narration |
| Short, usable export | Render actual new composition, ffprobe verifies duration <120s, dimensions, frame rate and audio; inspect opening/closing and transition frames for readability/clipping |
| Editable production and applied research | Explicit individually named scene nodes in code and Studio's inspectable timeline, verified interactive heading/card controls and source context; bounded documented primary-source research with adoption reasons |
| Preserve prior films | New source/assets/output paths; inspect aggregate diff to confirm old film sources/audio unchanged; existing relevant tests remain green |

## Ordered slices

### 1. Viewers can watch the complete simple remake
Type: Behavior
Status: done

Behavior: Given the confirmed idea sources, rendering `ProblemDecompositionRemakeFilm` produces a complete short explanation with the distinction, two premises, two goals and four principles, warm Cedar narration, accurate captions and simple purposeful animation. A shopper's usable stock check survives feedback-led reprioritization, while future reservation work remains unstarted. Individual scene components and named nodes make the code easier to revise; supported Studio controls and WebMCP aid inspection and focused editing.

Proof: Final MP4 and cover; actual-audio transcript and timing audit; storyboard/key transition inspection; ffprobe; `pnpm moves test` under Node 24.19.0 after the independent refactor/formatter gate. No mirror tests for static copy or low-impact visual styling. Implementation owns render and targeted proof to terminal results; coordinator owns acceptance, fresh refactor, selective formatting, final required project checks, commit and publication.

## Execution complete

Product advice: No backlog change recommended. Show the complete remake for Terry's playback judgment before expanding production infrastructure. The existing educational-video direction and queued own-voice story remain appropriate.

Automatic retrospective reviewed implementation `bc411cc3a53a10a63a992b3852bed8891c77747d` against the original ready plan and confirmed idea sources: no supported defects, architectural conflict or refactoring residue. Process review was skipped by the absent project preference. Audience comprehension and subjective voice quality remain the user's playback judgments. Remote CI has no observation or shutdown receipt because the Codex yielded-cell bridge is unavailable; execution resources are retained rather than claiming observed CI completion.

## Current decisions

- Use the proposed restrained typography/diagram direction after the optional preference opportunity; full creative execution is already authorized.
- Keep narration around 248 words; measured performance decides scene lengths. Use Cedar's existing selected voice identity with new scenario-appropriate direction. No decorative score is necessary if quiet speech serves clarity better.
- Do not promise zero switching costs at every instant. Say completed boundaries and avoidable unfinished waste; retain no-damage and coherent whole-product intent.
- Research doc retains primary sources, dates, and inference. Named scenes, a few interactive cards, WebMCP inspection and cheap sparse frame previews are adopted; SaaS/cloud/WebGPU migrations are deferred. Do not promise native clip editing or default-prop saving that this host does not expose.
- Preserve original projects. The new detailed README links authoritative article/transcript rather than duplicating or revising those sources.

## Learnings

- Actual Cedar/Whisper exact-script audit passed: 243 words, 244 normalized tokens, 102.900 seconds/3,087 frames. Offline reproduction preserves timing and audio bytes; independently measured -18.04 LUFS/-1.50 dBTP.
- Live Remotion 4.0.533/WebMCP confirms dimensions, timing, no error and all ten named contiguous scene spans. Both Series.Sequence and ordinary Sequence clips report nonselectable here, even with literal timing; default-prop source saving also reports extraction unavailable. A bounded attempt did not repair this, so unnecessary literal-clock source generation is removed. Actual Interactive heading selection, source context and opacity/line-height controls work. This narrows an inferred implementation enhancement without changing the requested film outcome.

## Accepted proof

- Current source was rendered after the independent refactor and one selective ESLint formatting pass. `PATH=/Users/terryyin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH pnpm run render:problem-decomposition-remake` in `terry-moves/` exited 0; log: `out/problem-decomposition-remake-review/coordinator-render.log`. MP4 SHA256 is `cbdf42114045a04439465f0ef4744ad9b49ea22f97ad62294382fed0e9e81ddc`; the simplified computed-clock source produces the same accepted film bytes.
- `ffprobe` confirms 1080×1080 H.264/yuv420p, 30fps, 3,087 picture frames / 102.900s; AAC 48kHz stereo has ordinary container padding to 102.912s. Full `ffmpeg -v error -i terry-moves/out/problem-decomposition-remake.mp4 -f null -` decoding exits 0.
- Coordinator inspected eleven actual exported frames and a phone-sized Studio preview: the four-part skeleton, retained useful stock check, feedback-led reprioritization, unstarted reservation, required-part highlights, commit qualification and speculative option value are clear. Opening and final cover match. The complete voice has exact actual-audio transcription, clause/scene timing and independently measured mastering; a subjective full-performance listening judgment is not claimed. The watchable export is supplied for the user's playback judgment.
- Fresh refactor consolidated the three subtitle serializers into `scripts/film-subtitles.mjs`. All three exporters pass byte comparisons (23, 32 and 26 clauses); both previous sidecars match HEAD. Old visuals/audio and shared audio helpers are unchanged. New exact SRT SHA256: `8b24d7d6a8bd859a092442417c4d5e442b365df309f69681780e0f7b1a61ab39`.
- Required `PATH=/Users/terryyin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH pnpm moves test` exits 0: 33 suites, 329 tests, then project lint and TypeScript. `git diff --check` passes. No generated-copy mirror tests were added.
- Render logs include an unrelated pre-existing Quillustration asset preload 404; this composition uses no such asset and the complete export decodes and matches the inspected film. Remote CI remains unobserved because the Codex yielded-cell bridge is unavailable; no observer or shutdown receipt was established.
