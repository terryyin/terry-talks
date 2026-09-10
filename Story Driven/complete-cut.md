# The change remains — complete cut production

The production composition is `StoryDrivenDevelopment` in `terry-moves`.
The current interim opening runs **96 seconds** at 1080 × 1080 and 30 fps,
covering cues 01–15 and both opening pauses. The complete subtitle timeline is
already present; the remaining scenes follow in the same composition.

The [subtitle script](subtitle-script.md) remains the editorial authority.
`src/parts/StoryDrivenCues.ts` is its explicit production copy: cue IDs, wording,
durations, and preceding blank intervals. When editing the script, update that
copy and the [SRT companion](subtitle-script.srt). Run the focused scene test
below: it reads the Markdown table and checks every caption's opening and closing
frame, including the four blank intervals. Timeline progress drives the scene
beats; changing an earlier duration shifts subsequent motion with its captions.
The ending's three-second blank hold is represented explicitly by the timeline.

The [33-second proof](visual-proof.md) remains independently playable. It selects
shared wording from the full cue list, with its own shorter pauses and sequence.
Both films use the same `ProductSpace` geometry and transformation model.
The opening reveals behavior, structure, and historical depth progressively,
then follows future possibilities, a person's desire, crossing boundaries,
earlier changes to a behavior, contact, and local disturbance. One region stays
stable so the viewer can compare the change with a recognizable product.

No new artwork was needed: the approved geometric language carries the concepts.
Subtitles carry the full argument without audio; scene labels only orient.
The warm paper, coral stroke, blue connections and green paths preserve the
proof's treatment. The exported film is a working cut for viewing and judgment;
it does not establish representative-viewer comprehension.

From the repository root:

```sh
pnpm -C terry-moves exec jest --runInBand tests/video_conomponents/StoryAssimilation.spec.tsx tests/video_conomponents/StoryDriven.spec.tsx
pnpm -C terry-moves exec tsc --noEmit
pnpm -C terry-moves exec remotion render src/index.ts StoryDrivenDevelopment out/story-driven-opening.mp4 --concurrency=2 --muted
```

Output: [opening MP4](../terry-moves/out/story-driven-opening.mp4).
The output directory is ignored; render commands reproduce exports from retained
source. Review the moving cut and captions at a 360-pixel square display size.
