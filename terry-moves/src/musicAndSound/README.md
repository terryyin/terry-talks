# Finding a Shared Rhythm

`SharedRhythmBaseline` is the complete 36-second film: one pulse → an answer
across space → a third voice → passing the phrase → ensemble → shared breath →
return together → credits. Open `http://localhost:3000/SharedRhythmBaseline`
in Studio. The original `SharedRhythmExcerpt` remains the approved 9.6-second
study, with its direction and audio preserved.

`SharedRhythmRevision` is a separately saved full take. In `revision.ts`, the
isolated `answer-turns` cue waits half a beat longer: beat 4 → 4.5 inside
`an-answer-across-space`, frame 216 → 225, or 7.2 → 7.5 seconds. Its sound and
teal bar impact move together; other cues and passage lengths stay intact.
Select `http://localhost:3000/SharedRhythmRevision` to compare it, then select
`SharedRhythmBaseline` again to restore the approved timing and saved audio.

`baseline.ts` owns the retained full 100 BPM direction; `script.ts` owns the
original excerpt and the three motif identities. A passage gives its length in beats,
performer positions and named accents. Each accent's `beat` targets both the
saved sound onset and visual impact; motion may anticipate that target. Passage
boundaries direct the framing cuts. A passage with no cues holds still and is
silent after the previous instrument's release. `beatTimeline.ts` supplies the
sequential passage ranges after the musical lengths are applied.

Save audio explicitly after a direction edit:

```sh
pnpm -C terry-moves exec tsx scripts/shared-rhythm-score.ts excerpt
pnpm -C terry-moves exec tsx scripts/shared-rhythm-score.ts baseline
pnpm -C terry-moves exec tsx scripts/shared-rhythm-score.ts revision
```

Choose the intended take explicitly. Each command writes its own
`public/assets/shared-rhythm/<take>.wav` and matching `<take>.json`.
Preview and export read this saved take; they never generate
audio. A changed direction, FPS or synthesis version raises an actionable
stale-pairing error in both preview and export metadata until the matching take
is explicitly saved. The manifest retains a WAV SHA-256 for preservation/replay
checks; its portable source fingerprint protects direction/score selection.

Replay/export the full saved baseline without running score generation:

```sh
pnpm -C terry-moves exec remotion render src/index.ts SharedRhythmBaseline out/shared-rhythm-baseline.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --concurrency=2
```

The film is 1080×1080, 30 FPS, H.264/yuv420p/BT.709 with AAC audio. Full-take
targets: first pulse `18`, answering cut `144`, isolated `answer-turns` accent
`216`, third voice `288`, passing phrase `432`, ensemble `576`, silent still
rest `720–791`, shared return `792`, resolving chord `900`, credits `936–1079`.
The final chord releases by 30.5 seconds; the credits hold through 36 seconds.
The 2.4-second rest and 4.8-second credits are authored passages, not a playback
pause or an export trim. Shapes retain their coral disc, teal bar and amber ring
identities when they share the stage.

Export the revised take separately, using its already saved score:

```sh
pnpm -C terry-moves exec remotion render src/index.ts SharedRhythmRevision out/shared-rhythm-revision.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --concurrency=2
```

For replay comparisons, use distinct outputs, without running the save commands:

```sh
pnpm -C terry-moves exec remotion render src/index.ts SharedRhythmBaseline out/shared-rhythm-baseline-replayed.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --concurrency=2
pnpm -C terry-moves exec remotion render src/index.ts SharedRhythmRevision out/shared-rhythm-revision-replayed.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --concurrency=2
```

Listen to the complete selected export at normal speed. In the revised answer
phrase, the extra 0.3 seconds is intentional; check its anticipation, reply and
following pulse for awkward gaps or collisions. Timing tests supplement this
musical judgment. The baseline stays available if another edit is preferred.

Export the original study separately:

```sh
pnpm -C terry-moves exec remotion render src/index.ts SharedRhythmExcerpt out/shared-rhythm-excerpt.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --concurrency=2
```

Useful frame targets at 30 FPS: first isolated pulse `18`, answering cut `72`,
third-voice cut `144`, held silent passage `216–251`, shared return `252`.

Keep `baseline.ts`, its saved WAV/manifest, `script.ts`'s motifs and `score.ts`
intact when deriving another take. Give the new direction a distinct `id` and
save it under that take's own path; selection must pair its direction and manifest.
All three registrations use `SharedRhythmFilm`.

The same renderer accepts another passage: add a `RhythmPassage` to a direction
with a unique ID, a positive beat length, performer positions and named cues.
Use the supported `pulse`, `answer` and `spark` motifs, or add a motif using the
`disc`/`bar`/`ring` shapes and `drum`/`pluck`/`bell` timbres. No passage-name renderer
edit is needed. Explicitly save its matching audio before previewing/exporting.

To author a new take with another passage:

1. Add a direction file beside `revision.ts`, derive from a retained direction,
   and give it a distinct `id`, for example `my-take`. Append a passage such as:

   ```ts
   {
     id: 'another-answer', beats: 2,
     performers: [{ motif: 'answer', x: 540, y: 560, size: 180 }],
     cues: [{ id: 'another-pluck', beat: 0.5, motif: 'answer', pitch: 1.5 }],
   }
   ```

   At this tempo it adds 36 frames; its pluck lands nine frames after its start.
   Beat offsets are relative to the passage. A cue's motif must be on stage;
   passage/cue names are unique and the cue falls inside its positive beat length.
2. Import that direction in `scripts/shared-rhythm-score.ts` and add
   `'my-take': yourDirection` to its `takes` selection. Run
   `pnpm -C terry-moves exec tsx scripts/shared-rhythm-score.ts my-take`.
   This explicitly creates `my-take.wav` and `my-take.json`; preserve prior takes.
3. In `SharedRhythmFilm.tsx`, import the new direction and saved JSON. Add its
   own literal-ID `<Composition>` like the revision registration, pairing that
   direction/score in inline `defaultProps` and deriving its duration/metadata.
   Register the new exported composition once in `src/Root.tsx`.
4. Select that ID in Studio, seek to the new passage and play with sound.
   Export using the same flags above to another MP4 path. Further cue or motif
   edits require explicitly saving this take again before preview/export.

Sound and motion: original local authorship for Terry's film, generated by
Koharu-chan from the retained direction and deterministic synthesis in `score.ts`.
No external samples, recordings, tracks, assets or music service are used. The
three timbres use smooth attacks/releases; waveform/onset checks establish timing
and clipping evidence, while normal-speed listening owns the musical verdict.
