# Add the animated brand and author ending

Source: [branding story](../../../AI%20Test%20Automation/branding-seed.md#logo-and-author-credit).
Identity: `ai-test-automation-branding#logo-and-author-credit`

## Goal and scope

One cohesive branding pass adds the existing Odd-e animation to the top right and a distinct closing page crediting “An idea and film by Terry Yin.” Preserve all accepted speech and causal workshop behavior. Reuse the logo assets and FlipCoin; private composition changes only. A short silent author hold may extend the 79.93-second film without altering the measured speech clock. Keep the complete SRT, existing stems and original transcript. Previous exports remain available. No LinkedIn posting or other-film edits.

## Decisions and observed premises

- Preparation uses the clean retained v3 checkout `/Users/terryyin/git/terry-talks-worktrees/ai-testing-stop-and-fix`, at `3da2a2916838573e6acace2a6d37f3f720e529a1`. New admission and execution use their own branch and checkout; old retained resources stay untouched.
- `rg -n -i 'logo|idea.*film' terry-moves/src terry-moves/tests` and reading `storyImpact/endCard.tsx`, `stories/FeatureTeamsFilm.tsx`, both OddeLogo parts and FlipCoin establish the existing assets, animation and exact author wording. The scene layout is read before staging: header text begins at x65/y55 and large headings at y144/222, so a small mark near the upper-right margin can avoid them.
- `src/stories/AITestAutomationFilm.tsx` currently mounts one private Scene and plays MIX once. `film.ts` separates measured script timing from composition registration; append a private end-card hold rather than changing the actual audio timeline.
- The current Scene has no logo and its final shot has only the synthetic narration credit. Existing meaningful film/acting tests protect the measured script, geometry and causal states; those remain the focused regression boundary.
- The request’s “Audi” is provisionally understood as Odd-e after an asynchronous clarification. A contrary answer overrides this choice before final delivery.
- Accepted ADR-0000 keeps architectural decisions human-owned. No shared framework or architectural reversal is needed. Near-future direction remains “Make educational short videos.”

## Ordered slices

### 1. Viewers recognize Odd-e and Terry’s authorship
Type: Behavior
Status: done

Implement the existing animated logo at a readable, unobtrusive upper-right size. Add a distinct warm-paper end card after the complete spoken closing, retaining truthful synthetic voice attribution. Let the author line settle for at least two seconds without competing captions. Reuse existing typography and paper colors. Keep core workshop timing and audio unchanged; document the current presentation and total exported runtime.

Proof:
- Run the existing focused AI film/acting suites and TypeScript in the exact execution checkout. No new mirror-implementation tests are required for this reversible visual overlay; actual export observation is decisive for logo clearance and author-card legibility.
- Native render the selected composition and inspect actual decoded MP4 frames at the opening, the longest headings, STOP AND FIX, later action and the transition into/final settled credit. Observe logo animation at distinct rotation frames.
- Compare accepted audio and original transcript hashes, probe the final MP4’s dimensions/rate/duration/audio stream, and confirm that the complete caption/SRT remains intact. Preserve the old version and copy the new movie/poster/SRT for Terry.
- Run selective formatting and lint under coordinator delivery, and obtain fresh independent post-change refactoring. Repeat only invalidated proof.

## Execution and ownership

The coordinator owns admission, setup, delivery, publication and cleanup. A fresh implementation agent returns uncommitted source and focused proof. The final movie and retained prior assets are product outputs. Story Branch Mode defaults; authorized target is origin/master, with an owned execution branch. No hosted CI success is inferred from local proof or an unavailable bridge.

Admission `b4b5a5f12a80b27d80c26e7c789bff7254a9f07a` is published on origin/master and the execution branch. This work created `/Users/terryyin/git/terry-talks-worktrees/ai-testing-branding`, branch `codex/ai-testing-branding`, agent Tsukasa-chan, publisher branding-coordinator. In this exact checkout `pnpm install --frozen-lockfile` passed, followed by `pnpm -C terry-moves exec jest tests/aiTestAutomation --runInBand`: 2 suites / 10 tests pass. Prior resources and unrelated main-checkout edits remain preserved.

## Cumulative design and sizing

This is one coherent externally visible branding outcome within the established film composition. The logo is an overlay and the author card is a final presentation state, not a second speech clock or general animation framework. The existing native renderer and focused regression commands provide bounded proof. No remaining implementation or architectural concern is identified; a contrary logo clarification changes only the selected mark.

## Accepted slice evidence

- The private composition reuses the existing Odd-e assets and FlipCoin at upper right. A separate 90-frame author card follows all 2398 measured workshop frames, reading “An idea and film by Terry Yin” with Cedar synthetic attribution. Final presentation: 2488 frames / 82.933333 seconds.
- `pnpm -C terry-moves exec jest tests/aiTestAutomation --runInBand` passed 2 suites / 10 tests and `pnpm -C terry-moves exec tsc --noEmit` passed after independent refactoring. Coordinator selective ESLint formatting and `pnpm -C terry-moves lint` passed; `git diff --check` is clean. No new permanent tests were needed for the reversible overlay/card.
- `python3 'AI Test Automation/produce_audio.py' --refresh-docs` and Python compilation passed. Refactoring unified the closing lockup across private visual and generated-document representations; `cmp` confirmed byte-identical treatment, and `pnpm -C terry-moves exec tsx out/branding-refactor/observe-markup.mjs --compare` confirmed exact markup for all 296 affected end/card frames. Accepted export proof remains applicable without rerender or paid audio generation.
- `pnpm -C terry-moves render:ai-test-automation` completed with actual MP4/poster/32-clause SRT. H.264/yuv420p/bt709, 1080×1350, 30 fps; AAC 48 kHz stereo, container 82.986667 seconds. Decoded audio at 80–82.9 seconds is exact zero PCM. The measured script, complete SRT, original transcript and all saved audio assets retain their accepted hashes; the existing complete actual-MIX speech audit remains applicable.
- Bounded actual export observation: Good. The coordinator reviewed header-clearance, logo-rotation and full-scene sheets plus the final author image, drawn from 25 decoded frames. The mark clears long headings, flips at separate rotation frames, and stays visible through the uncluttered author card; the credit is settled for 2.55 seconds after its arrival. No human listening or continuous playback is claimed.
- Versioned v4 movie/poster/SRT were copied to main and owned `terry-moves/out/` with matching SHA-256, retaining earlier versions. Movie `294bec20d7f62b8b39d527436c1184cbf046a1f60bddfceb156f7d78bc348033`; poster `bf7ba884c4bb80422061880091f40eb56be7c3d2001a9fa58c2c5d4ab4b0579a`; SRT `b8b5b92599da75bd653b4f92c523c9b7f4a6ee537805d969ff87d1226a66efb3`. No other-film source or unrelated main-checkout changes were included.
