# Illustrated conversation pilot

`IllustratedConversationPilot` is the saved two-turn casting/acting probe: the
Engineer asks which tests passed, the AI listens in silence, then acknowledges
what it did not ask. It is a pilot, pending Terry's sound-on judgment of the
voices, mouths and pause; the complete exchange and reaction revision follow
that judgment.

```sh
pnpm -C terry-moves render:illustrated-conversation:pilot
```

The export is `terry-moves/out/illustrated-conversation-pilot.mp4` (1080 square,
30 fps). This recipe verifies the retained WAVs and renders them; it makes no
speech requests. Open `IllustratedConversationPilot` in Studio for playback and
seek review. Cedar and Marin are synthetic OpenAI voices, credited in picture
and in `public/assets/illustrated-conversation/takes.json`.

Author `src/illustratedConversation/script.ts`. Each named turn chooses a
speaker and saved take; the take owns text, measured sample count and SHA-256.
The compiler contains its entire take in a whole-frame slot. `pauseAfter` adds
silence with an explicitly empty caption. Mouth cues are seconds into the saved
take, including that take's internal silences. Their hash binds them to the
recording they were authored against. `rest`, `open`, `round` and `wide` draw
one mouth on the existing rigs. A listening actor uses the resting speech mouth.

Acting cues name either actor, a turn and an offset from that turn's start.
They change mood, gaze, tilt or hand targets. Poses interpolate and persist on
film time across turns and silence. A negative offset can anticipate the next
line. Change only those cues to direct a listening reaction. Rendering the same
frame directly or after a reverse seek produces the same drawing.

The two takes were requested once with `python3
scripts/illustrated-conversation-speech.py --generate` from the repository root.
That explicit generation command refuses to overwrite retained recordings.
Its direction, voice/model, exact requested words, PCM measurements and hashes
remain beside the WAVs. Streaming WAV length headers were rewritten from the
received PCM without trimming or changing samples. A replacement take needs a
new saved filename/measurement/hash and a reviewed mouth track, followed by
sound-on playback. Missing files, changed hashes, stale mouth tracks and
out-of-take cues identify the affected turn before export.

Initial local cue authoring used the selected WAV waveforms and measured clause
gaps (`ffmpeg -af silencedetect=noise=-35dB:d=0.09`): question 1.562–2.124 seconds,
reply 1.424–2.075 seconds, with their original lead/tail silence retained. Shape
changes within speech are authored sound candidates, not automatic phoneme
alignment. Review their fit by listening; automated timing checks cannot judge
voice suitability or convincing lip sync.
