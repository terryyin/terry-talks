# Problem decomposition film

A 113.23-second English film: **The freedom to change your mind**. Three adult
friends need to split a dinner bill. A useful equal split lets them give feedback;
the team can revise the future queue while keeping today's product useful.

The full argument and confirmed vocabulary are in
[the article](problem-decomposition.md). The original input remains in
[raw-content.md](raw-content.md). The film condenses that argument rather than
replacing it. Its four-part progression is distinction, premises, goals and
principles; just in time is embedded in the goals.

## Watch and reproduce

From the repository root:

```sh
pnpm install --frozen-lockfile
pnpm --dir terry-moves render:problem-decomposition
```

This renders `terry-moves/out/problem-decomposition.mp4` (1080 × 1080, 30 fps,
H.264, AAC) and a closing poster. The output directory is ignored. Runtime
artwork and both audio tracks are committed, so rendering does not call speech
synthesis or any external artwork service. `pnpm moves` opens Remotion Studio;
select `ProblemDecompositionFilm`.

The render command also exports
[problem-decomposition.srt](problem-decomposition.srt) from the authoritative
[film-script.json](film-script.json). The SRT preserves the full spoken wording,
including qualifications, with its matching caption range and reading holds.
The burned-in captions are concise editorial text. The JSON preserves both
versions and the speech boundaries. To export only subtitles:

```sh
node scripts/problem-decomposition-subtitles.mjs
```

## Production sources

The [treatment](film-treatment.md) records scenes, timings and complete narration.
[Artwork provenance](artwork.md) records the original ImageGen prompts and
selected assets. Remotion scenes live in `terry-moves/src/problemDecomposition/`;
the composition is registered by `src/stories/ProblemDecompositionFilm.tsx`.
The diagram, receipt, phone UI, typography and animation are native code.

Narration is the installed **Daniel synthetic voice**, not Terry's recording or
an imitation. The score is an original programmatic composition. Narration is
mastered to −18 LUFS and music to −40 LUFS. Both play at volume 1. To rebuild
audio on macOS with Daniel, Python, ffmpeg and ffprobe installed:

```sh
python3 'Problem Decomposition/produce_audio.py'
```

That command regenerates audio and timing. The film's reactions use the
script's speech boundaries, so they follow those timings. The default render
uses the existing audio unchanged. `--refresh-docs` updates the script format
and treatment without audio synthesis.

## Review limits

The useful stopping point is a completed boundary, not a claim that every
interruption or direction change costs zero. Every commit delivering customer
value is an aspiration. Option value is speculative potential across possible
future needs, not a promised financial return. The film is locally rendered
and visually reviewed; no audience-comprehension study is claimed.
