# Illustrated conversation

`IllustratedConversationPilot` is the saved two-turn casting/acting probe: the
Engineer asks which tests passed, the AI listens in silence, then acknowledges
what it did not ask. Terry accepted its voices, mouths and listening pause with
“LGTM” on 2026-10-12. It remains available with its original performance for
comparison. `IllustratedConversation` adds the confident opening and the
Engineer's invitation through the same script and renderer.

```sh
pnpm -C terry-moves render:illustrated-conversation:pilot
pnpm -C terry-moves render:illustrated-conversation
```

The exports are `terry-moves/out/illustrated-conversation-pilot.mp4` and
`terry-moves/out/illustrated-conversation.mp4` (1080 square, 30 fps). The complete
exchange is 19.4 seconds, including the accepted 1.2-second listening pause.
These recipes verify the retained WAVs and render them; they make no
speech requests. Open either composition in Studio for playback and
seek review. Cedar and Marin are synthetic OpenAI voices, credited in picture
and in `public/assets/illustrated-conversation/takes.json`.

Author `conversationScript` in `src/illustratedConversation/script.ts`; leave
`pilotScript` as the accepted probe. Each named turn chooses a
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

The pilot's two takes were requested once before review. After acceptance, only
the missing `passed` and `next` takes were requested from the repository root:

```sh
python3 scripts/illustrated-conversation-speech.py --generate passed next
```

Generation requires explicit named takes and refuses the entire selection if
any selected recording is already retained. Running without `--generate`
only verifies assets; replay and export always take that route.
Its direction, voice/model, exact requested words, PCM measurements and hashes
remain beside the WAVs. Streaming WAV length headers were rewritten from the
received PCM without trimming or changing samples. A replacement take needs a
new saved filename/measurement/hash and a reviewed mouth track, followed by
sound-on playback. Missing files, changed hashes, stale mouth tracks and
out-of-take cues identify the affected turn before export.

Initial local cue authoring used the selected WAV waveforms and measured clause
gaps (`ffmpeg -af silencedetect=noise=-35dB:d=0.09`): question 1.562–2.124 seconds,
reply 1.424–2.075 seconds, opening 1.179–1.497 seconds, invitation
0.355–0.716 seconds, with their original lead/tail silence retained. Shape
changes within speech are authored sound candidates, not automatic phoneme
alignment. Review their fit by listening; automated timing checks cannot judge
voice suitability or convincing lip sync.
