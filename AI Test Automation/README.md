# AI test automation: The Legacy Workshop

A 60.87-second English film for large legacy projects whose maintenance problems
arrive faster than the team can solve them. The warm paper workshop and original
expressive SVG characters make test upkeep, hands-on checking, human investigation
and selective protection visible. The content authority is
[`AI Test Automation/ai-and-test-automation.md`](./ai-and-test-automation.md);
measured speech and captions share `AI Test Automation/film-script.json`.

From the repository root, rebuild the saved continuous Cedar performance and original quiet score/effects
without making a paid API request, then export the film:

```bash
python3 'AI Test Automation/produce_audio.py'
pnpm -C terry-moves render:ai-test-automation
```

The render command produces `terry-moves/out/ai-test-automation.mp4` (1080×1350, 30 fps,
H.264, yuv420p, bt709 with AAC audio), the opening-hook poster
`terry-moves/out/ai-test-automation-poster.png`, and matching full-speech
`AI Test Automation/ai-test-automation.srt`. Playback needs no API. The MP4 uses
`terry-moves/public/assets/ai-test-automation/mix.wav` once at its mastered level; the saved
narration, score and effects remain available as separate production stems.

The voice is **Cedar synthetic AI narration**, not Terry’s recorded voice.
The film credits it on the final shot. See the [film treatment](./film-treatment.md), producer and workshop soundtrack
for measured audio evidence and reproducibility.
