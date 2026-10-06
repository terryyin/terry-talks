# Problem decomposition — simple remake

A separate 102.9-second film about planning around useful customer outcomes, discovering answers and preserving the freedom to change direction. The restrained typography, simple diagrams and one shopper example replace the previous interpretation's elaborate visual metaphor.

The [confirmed article](../Problem%20Decomposition/problem-decomposition.md) and [verbatim transcript](../Problem%20Decomposition/raw-content.md) retain the full original idea. This project's [treatment](film-treatment.md) records the condensed argument and qualifications. [Recent Remotion/AI research](ai-remotion-research.md) explains the small adopted editing improvements and their primary sources.

## Watch and edit

The composition is `ProblemDecompositionRemakeFilm`, registered in `terry-moves/src/Root.tsx`. Start `pnpm moves` from the repository root and select it in Studio. Each scene is an explicit named sequence and remains independently editable in the source. Interactive heading/card surfaces provide some direct visual controls in Studio. We observed selection and opacity, line-height and transform controls on the goals heading; calculated text/font/style fields can remain read-only.

This composition's scene clips were inspectable in the timeline but did not support direct clip selection/trim controls in the tested Studio version. Studio also could not extract its default props for saving. Edit the title/caption defaults in `terry-moves/src/stories/ProblemDecompositionRemakeFilm.tsx` when needed. Timing derives directly from the canonical measured `film-script.json`; there is no second generated clock. These limitations do not affect rendering. Optional built-in WebMCP was useful for local metadata, seeking and source-context feedback during QA.

The four-part chapter rail makes the skeleton explicit: distinction, premises, goals, principles. Captions contain the full exact speech; the visuals carry the example rather than repeating the whole narration. The final frame also serves as the opening cover. The shopper example and stock quantity are fictional.

Cedar is an OpenAI-generated voice, not Terry's recorded voice. One connected take uses scenario-aware performance direction. There is no background music.

## Reproduce

Use the project's locked dependencies and Node >=24.9.0. This render was produced with Node24.19.0, pnpm11.28.5 and Remotion4.0.533.

```sh
pnpm install --frozen-lockfile
python3 'Problem Decomposition Remake/produce_audio.py'
pnpm --dir terry-moves render:problem-decomposition-remake
```

The audio command without flags is offline: it verifies the selected take and exact actual-audio transcript, recreates boundary trimming/mastering and writes measured timing. It preserves all internal breaths and pauses. `--new-voice` makes a new paid OpenAI speech call and independent Whisper word-timestamp transcription; it requires `OPENAI_API_KEY` and changes the selected take. Keep that flag out of ordinary reproduction.

The render command exports the SRT sidecar, H.264 video and last-frame PNG cover to:

- `terry-moves/out/problem-decomposition-remake.mp4`
- `terry-moves/out/problem-decomposition-remake-poster.png`
- `Problem Decomposition Remake/problem-decomposition-remake.srt`

Remotion's Chrome Headless Shell must be available; the CLI can download its public rendering browser on first use. Arial and Georgia were verified on the rendering Mac, with CSS fallbacks for other hosts and no network font load. Inspect another host's export because font metrics can differ.

## Timing and evidence

`film-script.json` is the scene/caption clock. `cedar-performance.json` records the exact transcript measured from the actual saved audio, word timestamps, model, voice, direction and asset hashes. The voice is 243 words / 244 normalized tokens in 26 clauses. The export has 3,087 frames at 30fps, 1080×1080. Narration is mastered to approximately −18LUFS, with independently measured −18.04LUFS and −1.50dBTP. The full voice is retained; the 2.35-second final hold is silent.

The film-specific audio producer reuses `scripts/narration_audio.py` for exact-script audits, PCM handling, mastering and readable serializers. Existing films and that shared helper are unchanged.
