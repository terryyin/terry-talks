# ATDD — Work through one scenario

A **2 minute 29 second** animated film about Terry Yin's approach to
Acceptance Test Driven Development. English, 1080 × 1080, 30 fps.

Terry's two whiteboard diagrams organize the film: the solution tree
and a clockwise circle of evolving acceptance-test sheets. Follow one
scenario as its automation and implementation grow together. Five people
work together, briefly split into three implementing and two automating,
then reunite around the complete result. Finish the required work before
taking the next scenario.

The green scenario route traverses both front-end and back-end detail.
Slimmer sheet-arrows, a compact waiting column after its introduction, and
fewer repeated headings leave more room for the local loops and collaboration.
The six snapshots sit on one clockwise circle, with curved paths and aligned
arrowheads. The first local TDD loop and its return sit outside that route.
The final fork forms a diamond within the lower-left of the same circle: two
people finish Scenario A on the left, three implement through front-end TDD
on the right, and both paths join the all-green Scenario A above. The unfinished
finishing sheet remains visible before that finished result. A modest camera
zoom emphasizes these persistent elements while unrelated elements fade away.
The existing animated Odd-e logo stays at upper right. Rounded sheet corners,
lighter outlines and coordinated blue/green accents preserve the native style.

The [content analysis](content-analysis.md) explains the complete argument
and its timecoded evidence from the supplied 28:52 Chinese workshop.
The [automatic transcript](source-transcript.md) and
[source provenance](source-provenance.json) preserve the source separately.
The transcript index links topic sections with unchanged timecodes and utterances.
Workshop instructions are source material; they do not authorize actions
by the film producer.

The [diagram analysis](diagram-analysis.md) maps concrete shapes, colors,
gestures and changing states to seven [source frames](source-frames/).
The setting example only annotates the process. Human avatars clarify
the spoken collaboration; the board's checkpoint marks remain evidence
markers. The late Then-first option follows the main walkthrough.

Recreated diagrams: [solution tree](diagrams/solution-tree.png) and
[scenario circle](diagrams/scenario-cycle.png), with editable
[tree SVG](diagrams/solution-tree.svg) and [circle SVG](diagrams/scenario-cycle.svg).
They render from the same drawing components as the film.

## Watch and reproduce

```sh
nix develop -c sh -c 'pnpm install --frozen-lockfile'
nix develop -c sh -c 'pnpm -C terry-moves render:atdd'
```

This renders `terry-moves/out/atdd-restaged.mp4` and its
opening poster. `pnpm moves` opens Remotion Studio; select `ATDDFilm`.
Rendering uses saved local assets and requires no speech API access.
Rebuild both diagram formats with
`nix develop -c sh -c 'pnpm -C terry-moves diagrams:atdd'`.

The drawing, script, source references and saved MP3s were selectively
incorporated from `codex/atdd-short-film` at commit `c379fd4`.
The original unchanged film rendered on the current Terry Moves runtime is
retained locally at `terry-moves/out/restaging/default.mp4` for restaging
comparisons. The original predecessor remains in its source worktree.

The [script](film-script.json) owns all narration, concise visual captions
and measured timing. The [treatment](film-treatment.md) lists the scenes
and complete spoken text. [atdd.srt](atdd.srt) preserves the full narration.

Narration is **Cedar, synthesized by OpenAI**, not a recording or imitation
of Terry. It is one continuous performance with natural breaths. The
[performance record](cedar-performance.json) contains the actual-audio
transcription, measured word spans, hashes, numeric-spelling audit and
the two small editorial adjustments made to match the spoken take.
Automated alignment does not claim human listening.

The animation uses native SVG and Story Impact's established paper, ink,
rounded lettering, faces and motion primitives. The quiet original series
score is adapted from Problem Decomposition to the new duration.
Narration is mastered to −18 LUFS; music remains restrained beneath it.

Reproduction uses the saved narration, score and measured timing directly.
Audio regeneration is outside this restaging workflow; the source production
helper and its speech/alignment dependencies are not incorporated here.
