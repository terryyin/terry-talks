# Film design: The limit nobody asked for

**Series:** AI Augmented Development Pitfalls · Episode 1

**Source:** [When Scope Becomes a Restriction](01-when-scope-becomes-a-restriction.md)

**Status:** Local film preview approved

**Audience:** Software developers

**Format:** Approximately 30 seconds, portrait 9:16

## Preview

From the repository root, run `pnpm moves` and select **ScopeRestrictionFilm**.
The preview is 900 frames at 30 fps, 1080 × 1920, with English dialogue,
phrase captions and an original quiet room-tone/software-cue soundtrack.
Its six scenes also have separate editable timelines under
**AI-Pitfalls-Scope-Scenes**.

The film combines generated photographic scene plates, restrained camera motion
and native animated software inserts. The people are fictional and the voices
are synthetic: Cedar narrates, Coral performs the product owner and Ash performs
the developer. They are not recordings of Terry or real actors. The preview
identifies its generated scenes and voices on screen.

The [artwork record](01-film-artwork.json) saves the ImageGen prompts and asset
paths. The [audio record](01-film-audio.json) saves the complete dialogue,
voices, source hashes, measured placement and independent speech audit.
[Phrase captions](01-film-captions.json) and the [SRT transcript](01-film.srt)
follow the saved performance. Rebuild the soundtrack from its saved takes with
`python3 scripts/pitfalls-scope-audio.py`; this makes no new API request.
New speech requests use `--generate` for missing takes or `--retake` for named replacements.
The revised preview uses `mix-v3.wav`; earlier mixes and raw takes are retained.

This is a local review preview for the three platforms. It has not been posted.

A refinement discussion produces a requirement nobody intended. The product
owner imagines a small delivery that brings value and feedback sooner. The
developer interprets the same discussion as a request for a permanent limit,
then asks a coding agent to implement it. The misunderstanding becomes visible
at the demo.

The central idea is **a delivery decision becomes a product rule**.

The genre is a naturalistic workplace vignette: a short scene developers can
recognize from their own work. The reveal has a little dry irony, with the
product owner expressing concern and frustration at the needless block. Both participants
are competent and sincere. The coding agent makes the developer's
interpretation concrete.

## Setting and example

Use one ordinary team room, one product owner and one developer. The product
lets a user select contacts and apply a tag to the selection.

During refinement, the product owner limits the first user story’s scope to a small number of contacts,
using three as an example. Their intention is to get the basic flow into users'
hands, then decide what deserves further investment. The developer translates
that example into a maximum of three contacts.

This is an illustrative situation. The existing operation already accepts a
list of selected contacts; the count guard is an additional decision. No
business rule or technical risk has established the number three as a limit.
The film does not claim that every larger selection, unrelated workflow or
future feature is already supported.

## Revised 30-second sequence

The story resolves its ambiguity in conversation: three is the owner’s working
example; the developer independently adds a maximum. The owner’s clarification
after the failed demo lets a viewer understand the mistake without having read
the article. The demo and clarification share one continuous scene.

| Time | Picture and action | Spoken line |
| --- | --- | --- |
| 0–2.4 s | Open with the concrete mistake, over the refinement two-shot: **An example became a product limit.** | Narrator: “An example became a product limit.” |
| 2.4–9 s | The owner’s compact note identifies **First user story · scope**, **Tag a few contacts**, and **For example, three**. | Product owner: “For early feedback, let’s keep the first user story’s scope small: tag a few contacts, say three.” |
| 9–12.6 s | The developer types **Enforce a maximum of 3 contacts** into the coding assistant. | Developer: “I’ll ask the agent to enforce a maximum of three.” |
| 12.6–15.5 s | A brief insert shows the added count guard. There is no separate test or success-message beat. | Restrained keyboard sounds. |
| 15.5–19 s | At the demo the owner selects a fourth contact. **Maximum 3 contacts** appears before her question. | Product owner, frustrated and concerned: “Why can’t I tag four?” |
| 19–23 s | Continue the same conversation. The software insert fades so attention returns to her face and words. | Product owner, firmly clarifying: “Three was our example. We never agreed a maximum.” |
| 23–30 s | Hold the concrete distinction: **Story scope — What must work? Product constraint — What must be blocked?** End with **Be explicit with people and AI.** | Narrator: “Clarify what this story must deliver—and what the product must reject. With people and AI.” |

The preview lasts exactly 30 seconds. Saved complete speech fits inside the
shot windows. Captions follow the revised performance and its independent
transcription. The concise clarification supplies the causal explanation that
was missing from the earlier cut; stronger emotion alone cannot supply it.

## Visual language and mobile layout

Use realistic people, ordinary clothing, natural daylight and a modest office.
The camera observes a real conversation at eye level. Favor close two-shots,
over-the-shoulder views and large screen inserts over wide room views. Keep the
same faces, clothing, room, contact list and tag action throughout.

Show the different mental models through the participants' actual notes and
brief product inserts. The owner’s note identifies the delivery scope and example; her dialogue explains early feedback. The
developer's note introduces the count limit. These inserts make the invisible
interpretation legible without requiring floating thought bubbles.

The product's rejected fourth contact is the fence. Keep the consequence inside
the software interface. The repeated number **3** connects the refinement
example, the developer's interpretation, the agent instruction and the error.

For portrait framing:

- Keep faces, hands and the current point of attention large in the central
  area. Reframe a screen as a close-up when its content matters.
- Show one important line of screen text at a time. Crop tightly around the
  relevant assistant instruction, count check or error message.
- Keep the episode identifier small and consistent. The opening begins with
  people and action, rather than a separate series title sequence.
- Use short captions and keep essential copy clear of platform interface
  overlays. Check the layout in each platform's preview before publishing.
- Let the demo and clarification play as one exchange. Clear the software
  insert as she explains the misunderstanding, so viewers can attend to her
  face and the phrase captions.
- The final card asks two concrete questions: **What must work?** and
  **What must be blocked?** Keep its copy short and hold it for seven seconds.

The closing text maps delivery scope to **What must work?** and a product
constraint to **What must be blocked?** The spoken line connects those questions
to people and instructions to AI. The example “three” expresses the first user
story’s delivery scope; a hard maximum requires a separate requirement.

## Performance and sound

The product owner speaks naturally and wants to help the team deliver sooner.
The developer listens, makes an unchecked interpretation, and gives the agent a
specific instruction. Keep the misunderstanding plausible; the performance
should not caricature either role.

Use room tone, restrained keyboard sounds and a brief pause at the failed demo.
The owner then explains her intent with firm concern, stressing “example” and
“maximum.” Keep the exchange connected; no test-completion tones are needed.
Music, if used, stays quiet under speech. The difference between the notes and
the visible error should make the essential story understandable without sound.

## Meaning to preserve

The mistake happens when the developer turns the delivery boundary into a
restriction. The agent then implements that interpretation. This keeps human
communication and AI-assisted execution in the same causal chain.

The takeaway is to distinguish scope from constraints and communicate the
difference explicitly. It does not call for removing
legitimate safety guards, implementing every deferred feature, or treating
tests themselves as the problem. The original article remains the fuller
argument; this film illustrates one recognizable instance.

The proposed opening invites recognition without claiming a measured frequency
for this particular mistake. The closing reminder applies to refinement conversations and instructions
passed to a coding assistant.
