# Illustrated conversation

`IllustratedConversationPilot` is the saved two-turn casting/acting probe: the
Engineer asks which tests passed, the AI listens in silence, then acknowledges
what it did not ask. It remains available with its original performance for
comparison. `IllustratedConversation` adds the confident opening and the
Engineer's invitation through the same script and renderer.

```sh
pnpm -C terry-moves render:illustrated-conversation:pilot
pnpm -C terry-moves render:illustrated-conversation
pnpm -C terry-moves render:illustrated-conversation:thoughtful
```

The exports are `terry-moves/out/illustrated-conversation-pilot.mp4` and
`terry-moves/out/illustrated-conversation.mp4` (1080 square, 30 fps). The complete
exchange is 19.4 seconds, including a 1.2-second listening pause.
These recipes verify the retained WAVs and render them; they make no
speech requests. Open either composition in Studio for playback and
seek review. Cedar and Marin are synthetic OpenAI voices, credited in picture
and in `public/assets/illustrated-conversation/takes.json`.

`IllustratedConversationThoughtful` is the named revision, exported to
`terry-moves/out/illustrated-conversation-thoughtful.mp4`. Compare it with the
baseline at normal speed with sound. Its AI listens more slowly: the immediate
wide-eyed surprise becomes a gradual gaze away, head tilt and hand rising toward
its face. The reaction returns to the baseline's settled pose before the reply.
Both films keep the same 582 frames, captions, recordings and mouth timing.

Author `conversationScript` in `src/illustratedConversation/script.ts`; leave
`pilotScript` as the two-turn probe. Each named turn chooses a
speaker and saved take; the take owns text, measured sample count and SHA-256.
The compiler contains its entire take in a whole-frame slot. `pauseAfter` adds
silence with an explicitly empty caption. Mouth cues are seconds into the saved
take, including that take's internal silences. Their hash binds them to the
recording they were authored against. `rest`, `open`, `round` and `wide` draw
one mouth on the existing rigs. A listening actor uses the resting speech mouth.

Turn names must be unique. Renaming a turn and its acting references preserves
its complete speech slot, captions, mouths and directed poses, including names
such as `lead` or `question:pause`. The compiler maps authored identities to
private ordered clock ranges; generated timing names impose no naming restriction.

Acting cues name either actor, a turn and an offset from that turn's start.
They change mood, gaze, tilt or hand targets. Poses interpolate and persist on
film time across turns and silence. A negative offset can anticipate the next
line. Change only those cues to direct a listening reaction. Rendering the same
frame directly or after a reverse seek produces the same drawing.

To reproduce this edit, leave `conversationScript` as the named baseline and
edit the interior AI `question` cues in `thoughtfulConversationScript`. Its
1.5-second cue selects focused eyes, a gaze target of 0.1, a 4-degree tilt and
left hand at (-62, -132); the 3.3-second cue deepens the thoughtful pose. No
version branch exists in the drawing component. Both versions retain the
question anchors at offsets 0 and 4.75 seconds, so changes remain within frames
156–298 and frame 299 returns to the original settled pose. Run the thoughtful
export recipe above and compare at approximately 6.3, 8 and 9.2 seconds; seek
backward through the pause and then replay with sound. Edit the baseline only
when intentionally replacing it; the pilot remains the two-turn probe.

Silence is part of the turn clock: increase `pauseAfter` for a longer listening
beat, then place an acting cue during that gap using an offset later than the
take's duration, or a negative offset from the following turn. Captions clear
and mouths rest automatically in the gap; the acting targets still interpolate
and persist. Either character can be directed through the same cue fields.

For an audio-only comparison, render both actual composition mixes, then
decode and compare their PCM samples and sample rate/channel/frame counts:

```sh
pnpm -C terry-moves exec remotion render src/index.ts IllustratedConversation out/illustrated-conversation-baseline-mix.wav --codec=wav
pnpm -C terry-moves exec remotion render src/index.ts IllustratedConversationThoughtful out/illustrated-conversation-thoughtful-mix.wav --codec=wav
```

This checks the composed soundtrack, including silent intervals, rather than
only checking that both versions name the same input files.

All four takes are retained. To generate new missing takes, run the helper from
the repository root with their names; for example, before `passed` and `next`
have saved recordings:

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
sound-on playback. Measure the replacement's sample count/rate and SHA-256,
update its `takes.json` entry, and set that turn's `mouth.takeSha256` only after
reauthoring the local cues against the new WAV. Recheck clause gaps, first/last
speech, caption fit, handover and all later cue positions: the measured take
length changes the later turn schedule. Missing files, changed hashes, stale mouth tracks and
out-of-take cues identify the affected turn before export.

The saved WAVs have measured clause gaps
(`ffmpeg -af silencedetect=noise=-35dB:d=0.09`): question 1.562–2.124 seconds,
reply 1.424–2.075 seconds, opening 1.179–1.497 seconds, invitation
0.355–0.716 seconds, with their original lead/tail silence retained. Shape
changes within speech are authored sound candidates, not automatic phoneme
alignment. Review their fit by listening; automated timing checks cannot judge
voice suitability or convincing lip sync.
