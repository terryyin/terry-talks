---
id: terry-moves-filmmaking
status: proposed-decomposition
created: 2026-10-07
created_during: Terry Moves filmmaking research, user-value review, and Terry's instruction to change the near-future direction and queue the agreed stories
trigger_when: Now; Terry selected this direction and asked for these stories at the top of the product backlog
scope: 18 queued stories; S/M/L bands unassigned (no project definitions)
---

# Terry Moves filmmaking: varied films directed through rearrangeable scripts

## Parent problem and desired effect

For **Terry**, making and revising films currently requires substantial bespoke
Codex work on choreography, diagram geometry, pacing, assets, and presentation.
Some films technically succeed while their argument, metaphor, or performance
still misses his intent. Terry wants to use Terry Moves to make great films in
varied visual styles, through a script he can rearrange while supported actions
connect naturally. The script can describe silent action; it need not be the
subtitles or the narration.

Terry evaluates the usefulness of the authoring workflow and the artistic result.
Viewers evaluate whether the film communicates its intended idea. Every story
must leave Terry with an immediately usable outcome even if all later stories
are cancelled. New-style stories deliver a watchable film, a reusable authoring
path, and a meaningful revision through that path. A library, adapter, attractive
still, or bespoke demonstration by itself does not deliver that benefit.

## Confirmed direction and selection

On 2026-10-07 Terry accepted the revised 18-story list and instructed that the
near-future direction change and these stories go at the top of the backlog in
the proposed order. The direction is:

> Use Terry Moves to make great films in varied visual styles through scripts
> whose rearrangeable actions connect naturally.

The agreed boundaries are:

- Script-driven direction remains central. Captions, speech, music, and silent
  action can supply different timing policies for a chosen film.
- Each story represents Terry's interest and delivers a complete usable benefit.
  Necessary internals belong inside the outcome they serve.
- Matrix or layout helpers, anchors, diagnostics, motion presets, focused
  previews, release reproduction, credits, and saved-asset handling are supporting
  work within the relevant story, rather than separately queued infrastructure.
- Start with concrete supported examples. Automatic joins do not promise that
  arbitrary reordered scenes or incompatible actions acquire coherent meaning.
- Rich characters, 3D, and generated realistic footage are separate creative
  opportunities. All authoring improvements need not finish before a new style
  is tried; Terry can reprioritize one when his creative interest calls for it.
- The existing conference-readiness and Story Impact voice-over stories stay
  below the additions. Their scope and lifecycle are unchanged.

This seed records the accepted selection and known details. The stories remain
unrefined preparation input; production choices and precise acceptance examples
will be settled when a story is selected. No implementation plan is introduced.

## Alternatives and decision

| Alternative | Assessment |
| --- | --- |
| Defer improvements and keep the current engine | Avoids investment, but leaves Terry's reported revision burden and limited range of styles. |
| Keep making every film with bespoke Codex code | The strongest simpler alternative: already useful and flexible. Retain it as an escape hatch, but repeated timing, staging, geometry, and review work makes it insufficient as the whole product direction. |
| Adopt a complete external editor | May help specific editing tasks. Evaluate existing Remotion Studio controls when needed; current observations do not establish a reliable visual-edit-to-script round trip for every composition. |
| Generate every scene as video | Expands visual reach but does not guarantee exact choreography, selective revisions, or continuity. Treat generated footage as a selected asset route within a scripted film. |
| Build a universal engine or matrix system first | Has no immediate film benefit and would encode hypothetical requirements. Shared concepts should follow repeated useful examples. |
| Deliver the agreed usable stories | Selected by Terry. First test whether rearranging silent actions gives useful continuity without manual repair; then preserve approved work and expand styles through finished, revisable films. |

## Story decomposition

All stories are for Terry. Qualitative effort notes describe breadth, uncertainty,
and assumptions, not delivery estimates. S/M/L bands remain unassigned because
the project has no definitions. The research references R01–R28 below are
provenance labels; the recorded identities are the canonical work identities.

<a id="music-and-sound-film"></a>
### 15. I can make a film whose rhythm follows music and sound

**Identity:** terry-moves-filmmaking#music-and-sound-film
```json dough-story-state
{"schemaVersion":1,"refinement":"not-refined","approach":"unselected"}
```

- **For / why:** Terry can tell or evoke an idea through rhythm and sound
  without requiring spoken narration.
- **Outcome and scope:** Make a deliberate short edit whose motion, emphasis,
  and cuts follow chosen musical phrases or sound cues. Revise a cue or phrase
  through the authoring workflow and retain the approved media.
- **Evaluation example:** Terry moves a musical accent or replaces a phrase;
  its intended visual response follows the new cue. The complete piece feels
  intentional with sound, rather than merely displaying an audio waveform.
- **Known basis and boundary:** R24. Existing films already separate voice,
  score, effects, and ducking. Audio-reactive properties and deliberate cueing
  are alternatives to use selectively; the story need not make every visual
  property react automatically. Retain appropriate music/source credits.
- **Value / effort hypothesis:** A distinct reusable sound-led style.
  Moderate scope; medium confidence; the piece, sound rights, and cue policy
  remain to select.
- **Depends on:** None.
- **Safe stopping point:** Terry can make and revise the supported sound-led
  piece independently of narration and character performance.

<a id="portrait-film-edition"></a>
### 17. I can publish a readable portrait edition of an existing film

**Identity:** terry-moves-filmmaking#portrait-film-edition
```json dough-story-state
{"schemaVersion":1,"refinement":"refined","approach":"planned","plan":"../.planning/quick/041-portrait-film-edition/PLAN.md","assessment":"ready","reasons":[],"basis":{"document":"5cbe3d58e5e67160c28edf451cc37a76f5c7cfe5a2a3b4c730849946baa1a5dd","plan":"a4396e4ad1590572a565a11bea2ecc9ff8a3d1d51a2ac51347322f7f823939c9"}}
```

**Goal:** Terry can publish Story Impact to viewers watching a vertical phone
screen, preserving its explanation and approved performance while making the
action, labels, and bilingual captions readable.

**Scope:** Recompose the existing `StoryImpactFilm` English edition as a
1080×1920 (9:16) portrait edition. Terry accepted this selection and the shared
performance / format-specific staging recommendation on 2026-10-13. Preserve
the cleaned English narration, English captions and existing Japanese secondary
captions, their timing, scene/beat order, cover hold, ending, credits, and total
duration. Reposition and resize presentation as needed without rewriting the
argument or retiming the performance. The square edition remains available
with its current presentation.

Give Terry one discoverable authoring place for the portrait edition's focal
staging and caption region, with preview and export through the existing
Remotion workflow. Demonstrate a meaningful layout revision affecting multiple
beats without hand-editing each shot, and retain enough authored input to
reselect and export the baseline and revised portrait takes. Deliver a
publishable H.264 MP4 using the project's existing export conventions.

Review at full resolution and at a 360×640 phone-size display, at normal speed:
important action and labels stay visible, both caption languages can be read
without zooming, and captions do not cover the explanation. A taller canvas
around an unchanged small square picture alone does not fulfill the outcome.
Exact region sizes and typography are implementation choices settled by these
observations, not a promise of automatic layout.

Deferred promises: other films, additional translations, every aspect ratio,
automatic adaptation, a general responsive-film engine, an external visual
editor, platform-specific interface overlays, and uploading to a service.
These are delivery boundaries, not rejection rules for naturally supported
inputs. The constraint to preserve performance comes from this story's
approved-performance promise, not from a list of example shots.

**Key examples:**

- Given the existing English film, select and export its portrait edition →
  the cover, product space/backlog, first story's flight and impact, later
  stories/History, and ending convey the same explanation at the same times;
  labels and both caption languages remain readable at phone size.
- Given a long English caption with its Japanese translation during important
  action, play the portrait edition → both texts fit their region and retain
  their original text and timing, without clipping or covering the action.
- Given the completed portrait take, revise the shared caption-region height
  and focal-stage placement through its authoring settings → multiple beats
  visibly adopt the change; narration, caption content/timing and beat order
  remain unchanged. Both portrait takes can be reselected and exported.
- Given the portrait edition or its revision, select the original square film
  → its dimensions, presentation and performance remain unchanged. Existing
  films borrowing Story Impact geometry also retain their presentation.

**Alternatives explored:**

| Approach | Fit to the same preservation, readability and revision goals |
| --- | --- |
| Fit/crop the existing square picture into a portrait canvas | Simplest existing route; fitting gives little benefit to small bilingual text, while cropping can remove the wall, backlog or History relationships. It can be a rendering technique inside the chosen solution, but alone does not establish readability or authored restaging. |
| Independently remake a portrait cut | Maximum staging freedom, but copies performance/content responsibilities and makes later revisions liable to drift; unnecessary for this edition. |
| Share performance, author a portrait presentation | Selected. Reuse the film clock, poses, narration and captions; direct spatial presentation separately, proving both readable output and one reusable layout revision. |

The borrowed mechanism is responsive publishing: a shared manuscript maps to
shared film beats/captions; an edition's page master maps to its stage and
caption regions; changing that master updates all consuming pages/beats.
The analogy breaks at motion and spatial meaning: trajectories, impact points,
axes, and actor relationships cannot be independently reflowed like paragraphs.
Connected action must use coherent geometry. The analogy motivates a candidate;
phone-size playback and revision evidence, not the analogy, prove it useful.

**Architecture:** Keep one performance owner (`storyImpact/fullFilm.ts`,
`film.ts`, and `RecordedNarration`) with explicit edition-specific presentation.
`StoryImpactScene` already separates the stage, title/end card and caption bar;
its fixed square geometry and single-line Japanese caption are existing
constraints to change carefully. Reuse the caption content, line-breaking
helpers and scene pieces where they retain their meaning. Keep square defaults
stable: ATDD, Feature Teams and Problem Decomposition import geometry from
`storyImpact/layout.ts`. Do not globally resize that module's `STAGE` to make
one portrait composition. Extend or expose the necessary existing presentation
responsibility instead of copying the film or adding a universal layout layer.

The ADR index and [Accepted ADR-0000 — Use Architectural Decision Records](../docs/adrs/0000-use-adrs-accepted.md)
agree; this is the only Accepted record. It preserves human ownership of
durable decisions and prescribes no layout technology. No conflict, exception,
ADR proposal, or new product-wide architecture rule is needed for this local
edition.

**Dependency and safe stopping point:** The selected existing film is the only
product prerequisite. Terry can export and revise the portrait edition even
if no broader aspect-ratio work follows. No open scope decision remains.

## Ordering and scope reduction

The backlog follows the accepted order above. Story 1 tests the defining silent
script promise. Stories 2 and 3 reduce evidenced revision pain; story 4 catches
artistic misinterpretation before a whole film is built. Stories 5–8 add reusable
performance and media direction. Stories 9–16 offer distinct creative choices,
followed by two narrowed distribution editions.

Only story 5's cross-beat interaction and story 13's multi-shot generation name
earlier new-story prerequisites. Other earlier positions express priority rather
than mandatory technical preparation. In particular, Terry can choose one new
style early without finishing every authoring improvement first.

Each story owns the preview, diagnostics, assets, export, and credits needed for
its selected outcome. Standalone technical frameworks have been filtered out.
Native visual editing with script preservation remains an unqueued option to
revisit if a chosen story reveals a concrete benefit.

If the near-term budget shrinks, first defer style or distribution stories for
which Terry has no upcoming film, preserving his selected creative experiment.
Do not cancel queued stories silently. Stop after any delivered story with its
usable workflow and assets intact; no story's benefit depends merely on building
the rest of this list.

## Open decisions

- Story 1's refinement settled its first scene on a new silent scene with the
  AI Test Automation Engineer carrying a wrench, rather than an existing film;
  that story should reveal where numeric continuation is sufficient and where
  an explicit authored boundary is needed. Later new-style stories still choose
  their first film and source idea when selected.
- Story 5's refinement settled its first scene on the same silent-scene path:
  the Engineer takes a wrench from a desk, carries it, and puts it down on
  another surface. An out-of-reach pick up gets feedback rather than inferred
  travel, matching the accepted boundary on automatic joins.
- Story 6's refinement settled its first film on the AI test automation
  workshop under its performance-led clock, with Terry choosing the region
  and the winning candidate at audition; replacing a performance in a
  motion-led recorded-voice film (Story Impact's path) waits for a later
  selection.
- Story 7's refinement settled its first film on Feature Teams' speaker
  shot, proved with same-performance replacements derived from the approved
  clip; re-aligning the animation to a differently timed performance, and an
  illustration slot, wait for a later selection. Planning found that the
  unchanged Feature Teams film does not render byte-identically twice, so
  the compare command's exact rule cannot certify it; whether Preserved
  should tolerate renderer noise is Terry's decision, outside this story.
- Which new style does Terry most want to use in an upcoming film? The accepted
  queue can be reprioritized to test that interest early.
- For character and generated-media stories, choose the design/rig/provider,
  permitted assets, performance quality, and acceptable iteration cost when
  selected. Research establishes opportunities, not demonstrated local quality.
- For editions, choose the film, target format or language, reviewer, and pacing
  policy. These choices affect bounded scope rather than justify a universal
  adaptation system.
- The old Story Impact voice-over entry requires separate lifecycle
  reconciliation against its full promises; existing recorded narration alone
  does not establish completion. Do not duplicate, expand, or remove it here.
- Project S/M/L definitions remain absent; no bands or delivery dates are assigned.

## When to surface

Now: Terry selected this direction and ordered these stories ahead of the
existing queue. Select and refine one story when deciding the next usable film
capability; backlog membership does not imply execution readiness.

## Breadcrumbs

- Terry's 2026-10-07 requests in this Codex chat: research recent production and
  external Remotion practices; preserve script-driven direction; require usable
  Valuable/Visible/Vertical stories; accept the revised 18-story list; change
  the near-future direction and add the stories at the top with known details.
- [Filmmaking research and evidence](research/2026-10-07-filmmaking-opportunities.md)
  contains production-history coverage, current engine observations, primary
  external sources, and the original R01–R28 menu. Its unchanged-backlog statement
  describes the research stage before this seed and queue update.
- [Product backlog](../.planning/PRODUCT-BACKLOG.md) carries global priority.
