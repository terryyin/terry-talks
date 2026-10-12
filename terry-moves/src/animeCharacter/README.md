# Anime engineer performances and casting rehearsal

`AnimeEngineerScene` is the complete original scene: 1080 square, 30 fps,
318 frames (10.6 seconds). The colleague stays off screen, asks the full saved
question, and the engineer reacts with surprise, reconsiders during a quiet
pause, then replies. The soundtrack and captions use the same compiled clock
as the face, gaze, head and wrist direction: 0.5-second lead, 4.8-second question,
1.2-second listening pause, 3.3-second reply and 0.8-second tail.

`AnimeEngineerThoughtful` selects the revised listening performance: slower
gaze away, an inclined head, narrowed eyes and an inward considered hand
gesture. It has the same artwork, staging, caption text, speech/mouth schedule
and 10.6-second clock as the original. The lead and reply performance remain
identical; only the interior listening reaction differs.

`AnimeEngineerCasting` is a 5.7-second, 1080-square, 30 fps moving casting
sample. It contains a directed silent listening lead, the retained reconsider
reply, and a short settle. Its drawing and performance remain available
alongside both full-scene versions.

## Retained inputs and provenance

- `AnimeEngineer.tsx` is the original, locally authored vector artwork and rig.
  The adult engineer has a layered dark bob, amber eyes, a teal overshirt and
  charcoal high-neck shirt. Paths, palette, separate eyes/brows/mouth, shoulders,
  cuffs and articulated palms/fingers are retained here. No external character,
  generated artwork, imported model or raster reference is required.
- `script.ts` retains `castingScript`, the original `animeSceneScript` and
  revised `thoughtfulAnimeSceneScript` performance scores. The saved recording's internal `ai`
  role is cast as this human engineer, without changing other films' roles.
  Edit its gaze, tilt, wrist targets and continuous face values to direct acting.
  `listeningReaction` identifies the question-start and reply-entry boundaries.
  Keep their complete pose anchors when changing the interior reaction:
  question offset 0 enters listening; reconsider offset −0.2 closes it before
  the reply. Both named versions share those anchors and `reconsiderActing`.
  Edit the question targets in `thoughtfulAnimeSceneScript` to revise gaze,
  inclination, inward wrist movement or expression, then preview that version.
  Offsets are seconds relative to the
  selected turn, so they follow measured speech and authored pause edits.
  `AnimeEngineerPerformance.tsx` shares the accepted stage and only consumes the
  compiled sampled pose; it has no independent choreography clock.
  `composition.tsx` owns the named performances' shared frame settings and
  saved-input metadata verification. `eyeOpen`
  also supplies the authored blink. A positive `smile` raises the corners of
  the resting mouth, zero gives a quiet neutral line, and a negative value
  conveys concern. Rear hair paints behind the neck while
  forearms and palms remain in front of the torso.
- `public/assets/illustrated-conversation/question.wav` is the retained OpenAI
  `gpt-4o-mini-tts` Cedar synthetic voice: “Passing which tests? Did we check what
  the customer actually needed?” Its provenance and direction remain in
  `public/assets/illustrated-conversation/takes.json`. PCM mono, 24 kHz,
  115,200 samples, 4.8 seconds; SHA-256
  `d7be7d7c8a0907e35c327f14b37f84d6d47257b70a03ce3dccc41fb7292c3cec`.
- `public/assets/illustrated-conversation/reconsider.wav`, selected through
  `public/assets/illustrated-conversation/takes.json`, is the existing OpenAI
  `gpt-4o-mini-tts` Marin synthetic voice: “I checked the code I wrote. I didn't
  ask that.” The manifest retains the generation direction and measurements.
  PCM mono, 24 kHz, 79,200 samples, 3.3 seconds; SHA-256
  `3f062b6b68d8e250cd50aaeac0eae9abc697fc8edf266c29e3ec0da787478d37`.
  Its local mouth track is reused from `illustratedConversation/script.ts` and
  bound to that hash. Export metadata verifies the actual saved bytes and
  measurements. Routine previews and renders do not request new speech.

From the repository root, preview through `pnpm moves`, then select
`AnimeEngineerScene` for surprise or `AnimeEngineerThoughtful` for the revised
reaction. Open `/AnimeEngineerScene` or `/AnimeEngineerThoughtful` on the printed
Studio URL.
Select `AnimeEngineerCasting` for the retained short rehearsal. Judge acting
and perceived speech synchronization at normal playback with sound.
To restore the baseline, select `AnimeEngineerScene`; no source edit or asset
replacement is needed. These commands reproduce the saved full versions:

```sh
pnpm -C terry-moves exec remotion render src/index.ts AnimeEngineerScene out/anime-engineer-scene.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --concurrency=2
pnpm -C terry-moves exec remotion render src/index.ts AnimeEngineerThoughtful out/anime-engineer-thoughtful.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --concurrency=2
pnpm -C terry-moves exec remotion render src/index.ts AnimeEngineerCasting out/anime-engineer-casting.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --concurrency=2
pnpm -C terry-moves test:unit --runInBand tests/animeCharacter
```

The complete exports are `terry-moves/out/anime-engineer-scene.mp4` (original)
and `terry-moves/out/anime-engineer-thoughtful.mp4` (revision).
Both preview and export consume the retained local vector art, saved takes and
their hash-bound mouth cues. No asset acquisition or generation step is needed.

The optional continuous face channels in the existing conversation compiler
interpolate with the same easing as head, gaze and hands. Existing drawings
retain their mood-based expressions and omitted-channel appearance. A cuff,
palm and all fingers share their wrist transform; the stylized sleeve elbow
is derived continuously from that same wrist target.
