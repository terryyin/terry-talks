# Illustrated conversation: historical preparation observations

**Plan:** [Illustrated conversation](PLAN.md). Current execution identity and accepted proof belong in that plan.

All observations below were made in the owned workspace
`/Users/terryyin/git/terry-talks/.worktrees/i-can-make-an-illustrated-conversation-with-conv`
at product revision `8143267bb1903764b354ca76ad5a7972b08f9609` on 2026-10-12.
They are preparation evidence, not completed slice proof. Scratch edits were
restored; no product implementation is included in this preparation.

| Premise and consuming operation | Literal observation and result | Limit / consequence |
| --- | --- | --- |
| The local focused runner reaches the rigs' existing consumers | `pnpm install --frozen-lockfile` succeeded, leaving the lockfile unchanged. `pnpm -C terry-moves test:unit --runInBand tests/aiTestAutomation/acting.spec.tsx tests/silentScene tests/visualTreatments/characterTreatment.spec.tsx tests/visualTreatments/characterRevision.spec.tsx tests/visualTreatments/treatmentContinuation.spec.tsx` passed 8 suites / 116 tests | A regression baseline, not speech proof |
| Those consumer checks discriminate rendered hand behavior | In a reversible scratch edit of `actors.tsx`, replaced the Arm call's `target` argument with `shoulder`; reran the exact command above: 7 suites and 32 tests failed. Restored the file byte for byte and verified `git diff --quiet -- terry-moves/src/aiTestAutomation/actors.tsx` | Shows consumer coverage of articulation; optional speech/default mouth needs new proof in slice 1 |
| Shared timeline composes silent intervals and supports direct/reverse sampling | `pnpm -C terry-moves exec tsx ../.conversation-preparation-probe.ts` evaluated `timeline([beat('speech',1,'spoken',s=>({s}),30),beat('pause',0.5,'',s=>({s}),30),beat('reply',1,'answer',s=>({s}),30)],30)`: 75 frames, reply from 45, empty caption at 35, pose at 48 = `{s:0.1}` before and after samples 74,2,40,0. Assertions passed; scratch file removed | Cross-turn actor performance is new work, not a feature supplied by this helper |
| Current renderer can draw the reused rig in this checkout | `pnpm -C terry-moves exec remotion still src/index.ts SilentScene out/conversation-preparation-baseline.png --frame=90` succeeded; inspected the PNG showing the Engineer and attached hand/wrench | New mouth quality remains slice 1's probe |
| Saved WAVs can be consumed and audiovisual exports produced locally | `ffprobe -v error -show_entries format=duration:stream=codec_name,sample_rate,channels -of json terry-moves/public/assets/ai-test-automation/cedar-take.wav` read PCM s16le, 24 kHz mono, 78.15 s. `pnpm -C terry-moves exec remotion render src/index.ts AITestAutomationFilm out/conversation-preparation-audio.mp4 --frames=90-119 --codec=h264 --pixel-format=yuv420p --concurrency=2` rendered 30 frames. `ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate,sample_rate,channels:format=duration -of json terry-moves/out/conversation-preparation-audio.mp4` found H.264 1080×1350/30 fps and AAC 48 kHz stereo, duration 1.003 s. `ffmpeg -v info -i terry-moves/out/conversation-preparation-audio.mp4 -af volumedetect -vn -f null -` decoded 96,256 samples, mean −23.0 dB, peak −5.7 dB | Proves the existing local export path and non-silent audio, not dialogue synchronization or voice suitability |

The root bundle logged a pre-existing missing
`quillustration_flower_and_water-can/scene.bin` while both selected exports
completed; neither observed composition uses that unrelated 3D asset. Do not
repair it as part of this story or turn it into a missing dialogue prerequisite.

Python could locate the installed OpenAI SDK; existing production code and the
current official guide establish the intended request shape. No credentialed
request, new voice audition or played dialogue was observed. Those paid and
owner-judged premises are explicitly bounded by slice 1, whose failure stops
slices 2–3. All other promises are new behavior with owned implementation proof;
they are not described as already working.

## Plan review

No slice-plan refinement pass was needed: the pilot, finished scene and same-path
revision each have one visible outcome and proof loop. The common turn schedule
and independently sampled performance cues serve all three, without a separate
renderer per version or a framework for deferred styles. This review found no
remaining slice-boundary or proof-ownership concern. The paid/artistic early probe
is an explicit execution gate; readiness does not claim its result.
