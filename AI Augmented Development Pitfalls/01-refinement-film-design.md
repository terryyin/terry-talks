# Film design: The limit nobody asked for

**Series:** AI Augmented Development Pitfalls · Episode 1

**Source:** [When Scope Becomes a Restriction](01-when-scope-becomes-a-restriction.md)

**Status:** Revised local preview approved

**Audience:** Software developers

**Format:** 30 seconds, portrait 9:16, 1080 × 1920, 30 fps

## Preview

Run `pnpm moves` and select **ScopeRestrictionFilm**. Seven scenes and the shared
meaning-change overlay also have editable timelines under
**AI-Pitfalls-Scope-Scenes**.

The film combines generated photographs, restrained camera moves and animated
software actions. The people are fictional; Cedar narrates, Coral performs the
product owner and Ash performs the developer. These are synthetic voices and
photographic stills, not recorded actors or lip-synced motion footage. The
opening briefly shows a frustrated face under narration. Role dialogue plays
over hands, notes and software cutaways so a frozen mouth does not carry a
conversation. The whiteboard is blank to avoid competing with the series label.
The AI disclosure appears with that label at the top.

The [artwork record](01-film-artwork.json) saves prompts and asset paths. The
[audio record](01-film-audio.json) saves dialogue, voices, hashes, measured
placement, sound cues, loudness, quiet-run measurements and the speech audit.
[Phrase captions](01-film-captions.json) and [SRT](01-film.srt) follow measured
speech timings. Rebuild the soundtrack offline with
`python3 scripts/pitfalls-scope-audio.py`; `--generate` requests missing takes,
`--retake` requests named replacements, and `--audit` transcribes the actual mix.
The current soundtrack is `mix-v4.wav`; earlier mixes and takes remain retained.

This is a local platform review preview. It has not been posted to LinkedIn,
YouTube or TikTok. Preview it with each platform’s overlays before publishing.

## Story and example

A product owner wants a small first user story for early feedback: tag a few
contacts, using three as an example. The developer assumes a maximum of three
would be safer and instructs a coding assistant accordingly. The assistant
immediately adds validation, an error message and rejection tests. At the demo,
the owner selects four contacts and presses Tag; applying the tag fails. Her
clarification resolves the misunderstanding: three was an example, and no
maximum had been agreed on.

The existing tagging operation accepts a list. The count guard is an added
product decision, not an established business requirement or technical risk.
The film does not promise every larger or unrelated future scenario. It shows
how an example can become a prohibition without that separate decision.

## Sequence

| Time | Picture and action | Spoken line |
| --- | --- | --- |
| 0–2.4 s | Frustrated demo reaction with **Maximum 3 contacts**. One prominent hook, without a duplicate subtitle. | Narrator: “She said three. He heard maximum.” |
| 2.4–7.8 s | **Earlier · Refinement**. A note identifies the first user story’s scope: tag a few contacts for early feedback. | Owner: “For early feedback, let’s keep the first user story’s scope small: tag a few contacts, say three.” |
| 6–11.8 s | One persistent **3** travels from the owner’s note into the developer’s request. Its green **EXAMPLE** label becomes red **MAXIMUM** across the cut. | This overlay supports the owner and developer lines. |
| 7.8–11.8 s | Developer requests **Enforce: maximum 3 contacts** and presses **Ask assistant**. | Developer: “Maximum three, to be safe. I’ll ask the agent.” |
| 11.8–14.4 s | Assistant responds at 12.1 s: **Done. Added: ✓ Max-3 validation ✓ Error message ✓ Rejection tests**. | Audible completion cue and quiet underscore. |
| 14.4–18 s | Lee becomes the fourth selection at 15.0 s. **Tag 4 contacts** presses at 15.1 s. At 15.2 s the error says **Maximum 3 contacts · Tag not applied**. | Owner, frustrated: “Why can’t I tag four?” |
| 18–22.2 s | Return to the original story note as she explains the misunderstanding. | Owner: “Three was our example. We never agreed on a maximum.” |
| 22.2–30 s | The native closing text uses the narration’s exact words and stays through the final frame. | Narrator: “An example isn’t a maximum. Make that clear to people and AI.” |

Four checked boxes mean four selected contacts. The Tag action fails; selection
itself is not rejected. The explicit button and **Tag not applied** status make
that distinction visible.

## Mobile layout and text

Essential cards sit between x90–900 and above y1260. Phrase captions start at
y1300, around the 70–75% area of the portrait frame, with balanced lines and
room at the right for platform controls. The top label and disclosure sit in a
single dark panel starting at y140. Avoid essential content near the lower
platform description area.

The hook and conclusion are their own large captions. The generic subtitle
layer is suppressed there, while the full SRT retains those words. The ending
contains no competing jargon labels or alternate paraphrase and remains
visible after the narrator finishes. Most dialogue captions contain short
phrases; balanced wrapping avoids a lone final word.

## Sound

The mix targets −14 LUFS by choice for this edition, with true peak below
−1.5 dBTP. It includes an unobtrusive midrange bed through the final hold,
audible typing, an assistant completion cue, selection and Tag clicks, and a
soft rejection sound. Software cues match their visible actions at 12.1,
15.0, 15.1 and 15.2 seconds.

Measured 20 ms windows in the two previously quiet intervals (7.5–9.0 and
13.9–16.4 seconds) contain no runs at or below −45 dBFS in this mix. The audio
record retains the exact method and measurements. Complete phrases are
preserved without digital speech stretching; the synthetic takes use their
recorded request speeds. The speech audit retains the known recognition
ambiguity between “story’s” and “story”; the approved caption uses “story’s.”

## Meaning to preserve

The developer supplies the mistaken restriction; the assistant makes it
concrete without clarifying. The AI-specific risk is the speed and completeness
with which that misunderstanding becomes software, including tests. Both
people are plausible colleagues. The remedy is to make the intended scope and
any real product restrictions explicit between people and in instructions to AI.
