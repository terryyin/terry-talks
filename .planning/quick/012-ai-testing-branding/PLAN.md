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
Status: planned

Implement the existing animated logo at a readable, unobtrusive upper-right size. Add a distinct warm-paper end card after the complete spoken closing, retaining truthful synthetic voice attribution. Let the author line settle for at least two seconds without competing captions. Reuse existing typography and paper colors. Keep core workshop timing and audio unchanged; document the current presentation and total exported runtime.

Proof:
- Run the existing focused AI film/acting suites and TypeScript in the exact execution checkout. No new mirror-implementation tests are required for this reversible visual overlay; actual export observation is decisive for logo clearance and author-card legibility.
- Native render the selected composition and inspect actual decoded MP4 frames at the opening, the longest headings, STOP AND FIX, later action and the transition into/final settled credit. Observe logo animation at distinct rotation frames.
- Compare accepted audio and original transcript hashes, probe the final MP4’s dimensions/rate/duration/audio stream, and confirm that the complete caption/SRT remains intact. Preserve the old version and copy the new movie/poster/SRT for Terry.
- Run selective formatting and lint under coordinator delivery, and obtain fresh independent post-change refactoring. Repeat only invalidated proof.

## Execution and ownership

The coordinator owns admission, setup, delivery, publication and cleanup. A fresh implementation agent returns uncommitted source and focused proof. The final movie and retained prior assets are product outputs. Story Branch Mode defaults; authorized target is origin/master, with an owned execution branch. No hosted CI success is inferred from local proof or an unavailable bridge.

## Cumulative design and sizing

This is one coherent externally visible branding outcome within the established film composition. The logo is an overlay and the author card is a final presentation state, not a second speech clock or general animation framework. The existing native renderer and focused regression commands provide bounded proof. No remaining implementation or architectural concern is identified; a contrary logo clarification changes only the selected mark.
