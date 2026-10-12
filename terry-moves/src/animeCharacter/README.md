# Anime engineer casting rehearsal

`AnimeEngineerCasting` is a 5.7-second, 1080-square, 30 fps moving casting
sample. It contains a directed silent listening lead, the retained reconsider
reply, and a short settle. The full off-screen question belongs to the later
scene; this rehearsal does not implement that scene or a named final revision.

## Retained inputs and provenance

- `AnimeEngineer.tsx` is the original, locally authored vector artwork and rig.
  The adult engineer has a layered dark bob, amber eyes, a teal overshirt and
  charcoal high-neck shirt. Paths, palette, separate eyes/brows/mouth, shoulders,
  cuffs and articulated palms/fingers are retained here. No external character,
  generated artwork, imported model or raster reference is required.
- `script.ts` is the performance score. The saved recording's internal `ai`
  role is cast as this human engineer, without changing other films' roles.
  Edit its gaze, tilt, wrist targets and continuous face values to direct acting.
  The renderer only consumes the compiled sampled pose; it has no independent
  choreography clock. `eyeOpen` also supplies the authored blink.
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
`AnimeEngineerCasting` (or open `/AnimeEngineerCasting` on the printed Studio
URL). The rehearsal's intended artistic reading remains Terry's judgment at
normal playback with sound.

```sh
pnpm -C terry-moves exec remotion render src/index.ts AnimeEngineerCasting out/anime-engineer-casting.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --concurrency=2
pnpm -C terry-moves test:unit --runInBand tests/animeCharacter
```

The optional continuous face channels in the existing conversation compiler
interpolate with the same easing as head, gaze and hands. Existing drawings
retain their mood-based expressions and omitted-channel appearance. A cuff,
palm and all fingers share their wrist transform; the stylized sleeve elbow
is derived continuously from that same wrist target.
