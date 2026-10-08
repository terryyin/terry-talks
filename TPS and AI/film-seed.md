---
id: tps-and-ai-film
status: proposed-decomposition
created: 2026-10-08
created_during: Terry's request to queue a short film from the TPS and AI talk at the top of the product backlog
trigger_when: Now; Terry explicitly selected this as the highest-priority queued story
scope: one selected story; S/M/L bands unassigned (no project definitions)
---

# TPS and AI film: Freedom and Trust on mobile

## Parent problem and desired effect

For **Terry**, the bilingual *Freedom and Trust* presentation contains an
argument he wants to share beyond the conference. **Developers and product
people watching on a phone** should grasp its most important message through
a coherent film of around 90 seconds, understandable with English subtitles
and sound off. This advances the backlog's direction through a finished film
grounded in Terry's own material.

## Selected story

<a id="english-square-film"></a>
### I can share the core message of my TPS and AI talk in a 90-second English film

**Identity:** tps-and-ai-film#english-square-film
```json dough-story-state
{"schemaVersion":1,"refinement":"refined","approach":"planned","plan":"../.planning/quick/015-tps-and-ai-film/PLAN.md","assessment":"ready","reasons":[],"basis":{"document":"ec5e59a25dff71fb439a474e0cf3d7736142e985b82c2d42d35a32ae8fbbee77","plan":"f7f7f925017967f3020d5b908b0b3b2d49e903ca77e3c24241f4e8b1efc650c7"}}
```

#### Goal

Terry can share *Freedom and Trust* with developers and product people who have
not attended the talk. After one viewing on a phone, they understand the test
for good AI use: **does what we build leave teams more freed than constrained,
and more capable of handling the next real customer problem?** A complete film
of around 90 seconds expresses that argument through the presentation's visual
language and material. English subtitles make it understandable with sound off.
This delivers a finished film within the existing filmmaking direction.

#### Source-grounded message

The current deck and its speaker notes are the authority for the presentation's
current argument. The main-theme document and claim research explain its reasoning;
some descriptions of slide order in those documents predate the current deck.
Research for this refinement identifies the following editorial priorities:

| Priority | Meaning to preserve | Basis |
| --- | --- | --- |
| Central argument | Freedom and Trust: less repeated burden, more room and capability to respond to real need. | Opening and closing diagnostic, closing crane; [Claim 10](claims/10-freedom-and-trust-reinforce-through-jidoka.md). |
| How learning frees attention | Investigate what is unfamiliar; preserve what has been learned in understandable tests, closed stops, simple mechanisms, or prevention. People keep the ability and authority to improve them. | "Judgment-intensive work", "Jidoka preserves knowledge", "Jidoka frees people"; [Claims 00](claims/00-judgment-intensive-work.md) and [6](claims/06-jidoka-embeds-routine-judgment.md). |
| What that freedom is for | Deliver a small useful customer outcome, use feedback to choose again, and grow people's ability to think, learn, and improve. Visible capability and reciprocal support warrant trusting the team with the next problem. | "Pull: smaller customer problems", "Freedom to choose again", closing diagnostic; [Claims 17](claims/17-jit-vertical-slicing-one-piece-flow.md), [12](claims/12-respect-for-people-who-can-think.md), and [3](claims/03-jidoka-enables-jit-trusts-respect-grows.md). |
| Why AI makes this urgent | AI can accelerate learning or accelerate unfinished output and dependence. Faster generation alone does not demonstrate useful value or capability. | "AI speeds whichever loop you feed"; [Claim 22](claims/22-cld-shows-tps-reasoning-for-less-ai.md). |

Toyota's [primary TPS account](https://global.toyota/en/company/vision-and-philosophy/production-system/)
was checked on 2026-10-08: jidoka contains abnormalities through stopping and
reduces continuous machine watching; Just-in-Time synchronizes work to what,
when, and how much is needed. [DORA's 2025 report summary](https://dora.dev/research/2025/dora-report/)
supports the amplifier framing. The connection to software, freedom, and trust
is **Terry's research-informed synthesis**, rather than a Toyota quotation or
an empirically proven TPS-to-AI effect. The claims' Confirmed talk roles remain
distinct from their Provisional research status.

#### Scope

- **One coherent argument.** Establish the stakes, show how learned judgment
  reduces a recurring burden, and pay it off in useful delivery, learning, and
  warranted trust. The diagnostic and the closing idea anchor the film:
  "Build products that free people. Trust them with the next real problem."
  The complete takeaway list and causal diagram need not appear. Cheap
  generation and expensive judgment explain the stakes; Freedom and Trust
  remains the thesis.
- **Concrete moving explanation.** Make a change visible over time, with
  attention, cause, and consequence clear in the pictures. Use the deck's
  examples and imagery; exact captions, shots, and transitions remain production
  choices. The learned-rule and next-train examples below establish the intended
  meaning without requiring a fixed shot count or a slide-by-slide retelling.
- **Recognizable treatment.** Keep the warm paper ground, black/gray ink,
  restrained vermilion accents, generous space, and crane motif. Reuse or adapt
  the presentation's illustrations and suitable footage, composing them for
  square shots. The released crane and closing crane supply natural bookends;
  the constrained team, software-team learning, and customer-use images supply
  relevant material. Terry judges fidelity and artistic fit in moving previews
  and the finished cut; a successful render alone does not establish either.
- **Mobile edition.** Deliver a square **1:1 MP4**, aiming for **90 seconds
  including the closing and credits**. Keep the message concise enough for
  comfortable viewing at normal speed; approximate duration allows editorial
  adjustment, rather than rushing subtitles or padding the cut to hit a number.
- **English throughout.** Titles, subtitles, diagrams, visible asset lettering,
  and any speech are English only. Romanized terms such as "Jidoka" can appear
  with an immediate plain-English explanation. Reconstruct selected bilingual
  diagrams and captions in English. The deck's `jidoka-human-radical.svg` has
  outlined Japanese lettering; hiding editable Japanese text alone is
  insufficient if that asset is selected.
- **Complete subtitle edition.** Embed English subtitles in the MP4 so a phone
  viewer can watch without enabling a separate track. Keep the editable English
  caption source and a matching timed SRT for Terry's later translation.
  Captions carry all essential meaning, have clear contrast and natural phrase
  breaks, remain on screen long enough to read, and avoid covering meaningful
  action. Minimize competition between subtitles and explanatory text.
- **Fidelity and provenance.** Retain source links for the script's claims and
  chosen examples, and credits for reused material. Verify any additional
  factual claims against primary sources. An automatic check can preserve a
  known rule while diagnosis, design, and customer value still require judgment.
  Show an actual stop and response if using the jidoka example. Trust includes
  capability, authority, and support; the software/customer illustrations remain
  conceptual examples rather than claims about events at Toyota.
- **Usable delivery.** Retain the film's editable authoring inputs and local
  assets in Terry Moves, its source-linked editorial brief, the MP4, and English
  captions. Document how to preview and export this film using the existing
  workflow.

**Rejection constraints from Terry's request:** a non-square film or an edition
with Japanese audience-facing content fails this story. A film whose essential
message requires audio fails the requested mobile subtitle outcome.

**Deferred promises:** Japanese translation; external publication; a complete
talk recording or exhaustive TPS lesson; new authoring tools or visual styles;
and a particular narration, voice, or music production. Audio may support the
film, but supplies no unique information needed to understand it. These choices
do not require further story-scope decisions before planning.

#### Key examples

1. **Learning becomes a safeguard.** The audience sees a rule someone must keep
   interpreting: "The list must not be empty." The film turns that learned
   rule into "Empty list → failure" and shows the failure stopping further work.
   People respond and fix the cause; later work carries the check. The viewer
   understands that the next person need not rediscover the known rule, while
   an unfamiliar failure can still require investigation. Equivalent source
   examples may serve this beat; a green test never proves customer value.
2. **Freedom serves the next need.** A customer already has a useful next-train
   result. "Does that route have stairs?" makes a step-free route the next small
   problem. The completed result remains useful, later work is still open to
   choice, and the team can respond. This illustrates the deck's software
   interpretation of pull and does not promise that a hypothesis is confirmed
   merely by being implemented.
3. **One unpaused phone viewing.** A viewer unfamiliar with the talk watches
   the whole square film at normal size and speed, sound off, without zooming.
   They can read the English subtitles without losing the essential action and
   restate the relationship: preserve learning in the product, free people to
   learn and deliver real value, and trust a capable team with the next problem.
   Review difficult caption/action overlaps at phone size, not only on a desktop.
4. **English film from bilingual material.** A selected triad or stop diagram
   contains Japanese in the source. The finished shot rebuilds its necessary
   labels in English. Frame review finds no residual Japanese lettering,
   including outlined lettering inside assets; the timed English caption source
   remains available without producing a Japanese edition.
5. **The film stands alone.** Terry opens the approximately 90-second MP4,
   recognizes the presentation's argument and ink/crane visual identity, and
   sees a clear ending rather than a compressed list of slides. He can preview
   and export the retained source again, and the embedded captions agree with
   the SRT. Export metadata confirms equal width and height.

- **Depends on:** No unfinished queued story is a prerequisite. Existing
  presentation material and Terry Moves supply the starting point.
- **Safe stopping point:** A complete, editable English film usable on its own,
  with captions ready for Terry's separate translation.

## References

- [Current presentation](../slides/tps-and-ai/slides.md)
- [Main theme and stage setting](main-theme-and-stage-setting.md)
- [Claims and their talk roles](README.md)
- [Presentation artwork](../slides/tps-and-ai/artwork-list.md)
- [Presentation theme](../themes/odd-e/)
- [Terry Moves filmmaking direction](../terry-moves/seed.md)
