# AI test automation: The Legacy Workshop

A 83.27-second English film for large legacy projects whose tickets arrive
faster than the team can close them. PURPOSE and PROOF establish the value of
automated tests before the code offer becomes extra upkeep. A large coral
STOP AND FIX interruption redirects the work toward repair. Its warm paper
workshop uses fixed-length articulated limbs, expressive reactions and one
dominant action at a time. AI performs similar hands-on checks: confirming a
repair, exploring a variation and checking known behavior. This is a practical
compromise for a system already in panic, avoiding another test-code pile.
Ordinary test code runs while AI stands aside, then new-feature intent becomes
a failing test before feature code. Redundant tests leave while useful end-to-end
protection stays. The content authority is
[`AI Test Automation/ai-and-test-automation.md`](./ai-and-test-automation.md);
measured speech and captions share `AI Test Automation/film-script.json`.
The animated Odd-e mark occupies the upper-right corner. After the complete
80.27-second workshop, a separate three-second paper closing card reads
**An idea and film by Terry Yin**. `film-presentation.json` owns this silent author hold;
it does not change the measured narration or subtitle timeline.

The narration is one connected Cedar base take with the region `investigate:4-6`
(“It’s a compromise. But a system already in panic needs relief— not more test code to maintain.”)
replaced by a connected Cedar take of its own, joined at the natural gaps. From the repository root,
rebuild that saved performance and the original quiet score/effects without making a paid API request,
then export the film:

```bash
python3 'AI Test Automation/produce_audio.py'
pnpm -C terry-moves render:ai-test-automation
```

The render command produces `terry-moves/out/ai-test-automation.mp4` (1080×1350, 30 fps,
H.264, yuv420p, bt709 with AAC audio), the opening-hook poster
`terry-moves/out/ai-test-automation-poster.png`, and matching full-speech
`AI Test Automation/ai-test-automation.srt`. Playback needs no API. The MP4 uses
`terry-moves/public/assets/ai-test-automation/mix.wav` once at its mastered level; the saved
narration, score and effects remain available as separate production stems. The original
score follows measured scene boundaries and ducks under actual speech activity. Paper
and wood accents follow physical actions; the opening question and reply stay exposed,
and a decisive stop gives way to quieter repair.

## Replacing one narrated region

A region is one clause or a run of consecutive clauses, including across scenes.
Use `<scene>:<first>-<last>` or `<scene>:<n>` within one scene, such as
`investigate:4-6`, or `<scene>:<n>-<scene>:<m>` across scenes, such as
`sandbox:3-investigate:1`, with 1-based clause positions at each end.
Unknown scenes or clauses and an end before the start are refused with the scene's
clause counts. The same words are performed again; nothing else is re-requested.

```bash
python3 'AI Test Automation/produce_audio.py' --audition investigate:4-6 --note "more weight on relief" --candidates 3
python3 'AI Test Automation/produce_audio.py' --select investigate:4-6 candidate-1
```

`--audition` is a **paid** OpenAI request for each candidate, and requests one when
`--candidates` is omitted; `--candidates 0` only rebuilds the audition files from saved
candidates. It needs the OpenAI Python SDK and `OPENAI_API_KEY`. Each candidate performs the
region with the retained clause on either side, is measured without a script prompt and audited
word for word, and is written to the ignored
`terry-moves/out/ai-test-automation-audio/auditions/<region>/` as `candidate-N.wav`, its
measurement `candidate-N.json`, and `candidate-N-in-context.wav`, the candidate between its
retained neighbours. Nothing tracked changes until a selection.

`--select` needs no API. It joins the candidate to the base take at the midpoints of the natural
gaps on either side of the region, with a 5 ms crossfade and no stretch or inserted silence.
Speech, word cues and audio before the region stay as they were; the caption change just before
the region follows the new gap midpoint; every later clause keeps its own timing and moves by the
change in the region's length. The region take is saved under
`terry-moves/public/assets/ai-test-automation/regions/` and listed with its hash, words and
direction in `cedar-performance.json`, whose `baseWords` keep the base take's own measurement.
Score, effects, mix and treatment are regenerated in the same run; then run the render command
for the film and subtitles, and update the runtime figures and region sentence in this file,
which are written by hand. Scene boundaries inside a replacement follow its measured
caption cues. A candidate that fails its audit, a region overlapping another replaced
region, or a result longer than 85 seconds is refused before saved takes, the record or
the script change; ignored prepared and audition audio may be rebuilt during checking.
Selecting the same region again replaces its take; another region is added beside it. A run
with no flags verifies every saved take against its recorded hash and names the first that differs.

Run these offline checks from the repository root with Python and ffmpeg installed:

```bash
python3 -m unittest discover -s scripts -p 'test_*.py'
python3 -m unittest discover -s 'AI Test Automation' -p 'test_*.py'
```

The first checks the shared composition and record helpers in `scripts/narration_audio.py`.
The second drives region audition and selection on a temporary synthetic workshop, including
cross-scene naming and measured scene boundaries, naming, transcript, ceiling and overlap
refusals, second-region selection and re-selection. Neither
needs an API key or network access, and neither changes the approved film.

The voice is **Cedar synthetic AI narration**, not Terry’s recorded voice.
The film credits it on the final workshop shot and author card. See the [film treatment](./film-treatment.md), producer and workshop soundtrack
for measured audio evidence and reproducibility. `--narration-only` rebuilds just the voice stem;
normal playback uses the finished stereo mix, with no API needed. Audio signal analysis and
script-free transcription audit the actual mix; human listening review remains unconfirmed.
