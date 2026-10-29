# Film design: Removing a rule is not requiring its opposite

**Series:** AI Augmented Development Pitfalls · Episode 2

**Source:** [Removing a Rule Is Not Adding Its Negation](02-removing-a-rule-is-not-adding-its-negation.md)

**Status:** Design authority for production. Terry reviews Studio preview and
export before finalize. Platform posting of the approved export is out of
scope for this story.

**Audience:** Software developers

**Format:** 30 seconds, portrait 9:16, 1080 × 1920, 30 fps

**Composition:** `RuleNegationFilm` — registered under `pnpm moves` (1080×1920,
900 frames @ 30 fps).

## Preview

**RuleNegationFilm** is available in Terry Moves with editable scene timelines
parallel to Episode 1’s scene folder pattern (`terry-moves` story module
`pitfallsNegation/`, assets under `public/assets/pitfalls-negation/`). Artwork,
audio, caption and SRT records beside this article use the `02-film-*` naming
parallel to Episode 1.

The film combines generated photographs, restrained camera moves and animated
software actions. The people are fictional; Cedar narrates and Ash performs
the developer. Coral is unused unless a later production beat needs a second
person. These are synthetic voices and photographic stills, not recorded
actors or lip-synced motion footage. Role dialogue plays over hands, notes and
software cutaways so a frozen mouth does not carry a conversation. The AI
disclosure appears with the series label at the top.

Exact spoken wording is settled during production against measured TTS, as
Episode 1 did. The draft lines and beat timings below are the design authority
until measurement revises them. Rebuild soundtrack offline with a sibling
script parallel to `scripts/pitfalls-scope-audio.py` once that entry exists.

## Story and example

A holdings service once refreshed only when an account was connected **and**
an entry workflow had started. The intended change keeps refresh for connected
accounts on a schedule and drops the entry dependency. Eligibility moves from
`account connected AND entry started` to `account connected` alone.

The developer asks an assistant to remove the entry requirement. The assistant
removes the gate, then adds lasting follow-through that treats absence of
entry as a product concept: tests or scans asserting entry must not be
required, and documentation that repeatedly explains refresh does not need
entry setup. The implementation is simpler; the suite and docs still carry the
retired concept.

The corrective beat describes current capability—a holding appears after
scheduled account refresh—keeps that coherent behavioral check, and retires
the expired historical assertion. Useful negative checks that protect a
current requirement or meaningful risk remain valid; the film does not teach
that every negative assertion is waste.

On-screen holdings labels may be shortened for mobile readability (for example
**Connected + Entry** → **Connected**) while preserving the same meaning.

## Sequence

| Time | Picture and action | Spoken line |
| --- | --- | --- |
| 0–2.5 s | Series label and AI disclosure. One prominent hook naming the confusion, without a duplicate subtitle. Optional brief workplace still under the line. | Narrator: “Removing a rule is not requiring its opposite.” |
| 2.5–5.5 s | **Holdings refresh · Before**. Eligibility card shows **Connected + Entry started** (mobile-shortened from account-connected and entry-started). | Developer: “Drop the entry-started check.” |
| 5.5–9.5 s | Same card simplifies to **Connected** only. A schedule cue implies connected accounts refresh on a schedule. Developer presses **Ask assistant**. | Developer: “Connected accounts should refresh on a schedule.” |
| 9.5–14.5 s | Assistant reply from ~9.8 s: **Done. Gate removed.** Then lasting absence follow-through appears—not only the simpler gate: **✓ No entry-required tests** · **✓ Docs: does not require entry**. | Audible completion cue and quiet underscore. Assistant text is visible; no separate spoken assistant take required. |
| 14.5–19 s | Cost beat: the absence checks and “does not require entry” prose clutter the frame—history still occupies the suite. Keep the mistaken artifacts readable; do not add a competing hook subtitle. | Narrator: “History still occupies the suite.” |
| 19–30 s | Corrective close. On screen, keep a coherent current-capability check (**Holding appears after scheduled refresh**) and retire the expired historical assertion (strike or dismiss the source-scan / “does not require entry” lasting docs). Native closing text uses the narration’s exact words and stays through the final frame. No jargon labels that teach all negative checks are wrong. | Narrator: “Describe what is true now. Keep checks that protect current behavior. Retire what only remembers the old rule.” |

A reader of this sequence alone should be able to recount: (1) the
misunderstanding—removal treated as a lasting absence assertion; (2) the
maintenance cost—history still occupies tests and docs; (3) the corrective
action—describe and verify current capability, retire expired assertions.

## Mobile layout and text

Essential cards sit between x90–900 and above y1260. Phrase captions start at
y1300, around the 70–75% area of the portrait frame, with balanced lines and
room at the right for platform controls. The top label and disclosure sit in a
single dark panel starting at y140. Avoid essential content near the lower
platform description area.

The hook and conclusion are their own large captions. The generic subtitle
layer is suppressed there, while the full SRT retains those words. The ending
contains no competing alternate paraphrase and remains visible after the
narrator finishes. Most dialogue captions contain short phrases; balanced
wrapping avoids a lone final word.

Holdings overlays prefer short labels (**Connected + Entry**, **Connected**,
**Holding after refresh**) over full eligibility prose.

## Sound

Target the same loudness practice as Episode 1: mix near −14 LUFS, true peak
below −1.5 dBTP, with an unobtrusive midrange bed through the final hold.
Include audible typing into the assistant request, an assistant completion cue
timed to the visible reply (~9.8 s), and soft UI for card simplify / dismiss
of retired artifacts in the close. Software cues must match their visible
actions.

Preserve complete phrases without digital speech stretching; settle final cue
text and placement against measured takes. Avoid dead quiet runs in dialogue
beds comparable to Episode 1’s quiet-interval lesson.

## Meaning to preserve

Removing an obsolete rule is not an instruction to add a permanent product
claim that the rule’s subject must be absent. The AI-specific risk is how
quickly that transition becomes lasting tests and documentation. The developer
gives a natural removal instruction; the assistant makes absence concrete
without clarifying what current behavior still needs.

The remedy is to describe and verify what is true now, keep evidence that
protects current capability or a meaningful regression risk, and retire
assertions and explanations whose only purpose was the old arrangement.

**Evaluation nuance:** useful regression coverage and meaningful negative
requirements remain valid (for example no unauthorized disclosure, or no
duplicate charge, when those are current obligations with adequate evidence).
The film must not imply that every negative assertion is waste. The lasting
question on screen and in narration is whether an assertion protects a current
requirement or meaningful risk—or only remembers the previous version.

## Out of scope

- Platform posting of the approved export (LinkedIn, YouTube, TikTok, Facebook
  or otherwise) remains a later step after Terry’s review.
- Other pitfalls episodes; other aspect ratios or languages; changes to
  Episode 1 design, artwork, audio, captions or `ScopeRestrictionFilm`.
