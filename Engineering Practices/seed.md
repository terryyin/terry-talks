---
id: feature-teams-engineering-practices
status: proposed
created: 2026-09-30
created_during: Terry requested a new educational video after finishing the story-impact video
trigger_when: When Terry selects this video from the product backlog
scope: one video story; execution planning remains unselected
---

# Engineering practices: component teams and feature teams

## Parent problem and desired effect

For **developers and people helping organizations move to feature teams**,
make Bas Vodde's explanation visible: component ownership can hide divergent
engineering practices, while feature teams working across the same product
expose those differences. Facilitating the resulting conflict and conversation
can gradually raise shared engineering standards and product quality. If the
conflict is neglected, teams can stop caring and quality can spiral downward.

This is a new film with its own narrative, using the finished
[story-impact film](../terry-moves/src/stories/StoryImpactFilm.tsx) and its
[visual material](../terry-moves/src/storyImpact/) as the base. The
[original story-impact seed](../Story%20Driven/seed.md) is context for that
material; this film follows Bas's supplied narrative and Terry's directions
below rather than inheriting every constraint of the original film.

## Selected story

<a id="shared-engineering-practices"></a>
### Viewers see how feature teams can turn conflicting practices into shared engineering standards

**Identity:** feature-teams-engineering-practices#shared-engineering-practices
```json dough-story-state
{"schemaVersion":1,"refinement":"refined","approach":"unselected"}
```

- **Goal:** Developers and people moving organizations to feature teams
  come to understand that friction between teams is useful: local component
  ownership hides divergent engineering practices, and feature teams expose
  them. The film contributes to Terry's educational short-video direction by
  turning Bas's explanation into a standalone explainer. This story's
  observable outcome is that one video, not a wider series or curriculum.
- **Outcome:** A rendered educational video follows Bas's source clip,
  combining his visible talk and audio with animation of the component-team
  and feature-team situations. It has a short opening and ending of its own.
- **Evaluation:** After watching, viewers can explain how local component
  ownership hides a mess, how overlapping feature work exposes different
  testing practices, and how facilitated conversation can improve standards.
  Terry checks that the animation expresses the sequence he described and
  follows Bas's narrative at the supplied timestamps.
- **Depends on:** The finished story-impact material and the supplied source
  clip, both present in the repository. No new prerequisite story is queued.
- **Safe stopping point:** One complete standalone explainer, including the
  conflict, conversation, and gradual improvement; the conversation cannot
  be dropped while retaining only the two team structures.

#### Scope

**Required behavior**

- Bas's clip plays in full as a picture-in-picture inset (tentatively
  lower-right), with his audio, while animation follows his narration at the
  clip timestamps below.
- Animation covers, in order: component-team ownership hiding a mess
  (0:00–0:29), feature teams overlapping across components including the
  backend row (0:29–0:54), the testing-practice conflict and the “hey” /
  “Aren't we supposed to write tests here?” conversation (0:54–1:03), the
  cross-team agreement on shared practices (1:03–1:20), the warning of a
  downward spiral if ignored (1:26–1:35), and gradual improvement in
  standards and product quality when facilitated (1:35–end).
- A short opening and ending of this film's own; the conversation and the
  improvement both remain in the film.
- **Opening:** brief, designed by the agent for this film's message, in the
  visual language of the story-impact film's title.
- **Ending:** similar in form to the story-impact end card: a closing line
  in the same styles, then the credit line "An idea and film by Terry Yin"
  (unchanged from that film) together with a credit to Bas Vodde for the
  content. The exact wording of Bas's credit is the agent's to propose.
- **Cover:** the video's cover is a separate still taken from the most
  representative later frame of the film, not its first frame. It is
  produced the way the story-impact film produces its poster (a still
  rendered at a chosen frame beside the video), so the film can open
  straight into its story.
- **Odd-e logo:** the animated Odd-e logo (the existing `OddeLogo` with the
  `FlipCoin`-animated `OddeLogoInner`) sits in the upper-right corner.
- **Artistic care:** the film is designed carefully from an artistic
  perspective; layout, colour, motion and pacing are judged by Terry, not
  only for correctness.
- **Improvement cues:** the agent proposes its most creative visual idea for
  showing testing standards and gradual improvement, for Terry to review
  (see Design proposal).

**Rejection constraints:** none recorded. Terry's creative direction below
states what to show, not what the product must reject; no independent
domain requirement justifies rejecting any variation.

**Deferred promises** (not committed to build or verify in this delivery)

- Final opening and ending wording and duration.
- Terry's own voice-over, alternative-language versions, or a new
  transcript or captions. Bas's audio is the narration.
- Generalizing the film as a template for later educational videos.
- Lasting changes to the story-impact film itself; its material is adapted
  for this film, not altered for the original.

**Boundary assumptions**

- Timestamps are relative to the source clip; a new opening shifts them in
  the finished film, and alignment is verified against the real clip.
- The clip is 1080 × 1920 portrait; the finished frame keeps the story-impact
  stage (1080 × 1080) with the clip as a lower-right inset (decided). Whether
  the final composition is enlarged around the inset is a production choice.
- The two ball splashes and the two developers are illustrative, as in the
  story-impact film: the film does not claim that a particular team, ball,
  or component maps to a specific real-world feature.

#### Key examples

1. **Component team, hidden mess.** Pre-condition: one team owns one part of
   the product and takes one story. Trigger: the team applies it only to its
   own part. Result: it starts as a proper, shiny idea, applied without a
   splash, then becomes ugly and quirky by that team's local practices;
   other teams do not see it until the owning team leaves (about 0:15–0:29).
2. **Feature teams overlap.** Pre-condition: two teams pick two stories at
   the same time. Trigger: both splash across the same product. Result: the
   two splashes visibly overlap and cross components, including the backend
   row, rather than staying in owned rows (about 0:29–0:54).
3. **Practice conflict becomes conversation.** Pre-condition: one team's
   overlapping backend work has good unit-test coverage; the other team's
   change lacks tests. Trigger: at Bas's “hey” (0:54), a developer from the
   first team turns to the other. Result: “Aren't we supposed to write tests
   here?” (0:58) opens a visible conversation between the two developers,
   shown as painful but useful (0:58–1:03).
4. **Facilitated conversation raises standards.** Pre-condition: the
   conversation is facilitated across teams. Trigger: they agree on
   acceptable practices for the organization (1:03–1:20). Result: practices
   unify, and standards and product quality visibly improve gradually
   (1:35–end).
5. **Boundary: conflict neglected.** Pre-condition: the conflict is left
   unattended. Trigger: teams stop caring (1:26). Result: quality visibly
   spirals downward; this contrasts with example 4 and is not the final
   state of the film.

#### Decisions (Terry, 2026-09-30)

- Frame layout: keep the story-impact frame (its stage is 1080 × 1080, square)
  with the clip as a lower-right inset; revisit only if speaker and animation cannot both stay
  readable.
- Opening and ending: short; the agent designs them. The ending follows the
  story-impact end card. Final wording and duration are the agent's to
  propose and Terry reviews in the rendered film.
- Cover from a representative later frame; Odd-e animated logo upper-right;
  carefully designed artistically.
- Improvement cues: delegated to the agent's most creative idea; Terry
  reviews.

#### Design proposal (unapproved, for Terry to react to)

Standards are a shared *finish* on the product. Before the conversation,
each team's splashes carry their own finish (one tidy with tests, one
scrappy), so overlaps look clashing. At the conversation, the developers
pin one shared "how we build here" card to the product. From then on new
splashes land with the shared finish, and the old quirky patches are
repainted one by one until the product reads as one coherent surface.
Quality also shows as paper warmth and colour saturation that rise with
each repainted patch. In the neglect branch the same cues run backwards:
finishes get sloppier, colour drains, patches curl. Opening idea: the
finished, tidy product briefly seen with its patchwork, then wiped back to
paper as the title lands; ending: one closing line and credit, with the
Odd-e logo already in the corner. Wording is unsettled.

#### Creative direction from Terry

- Reuse and adapt the story-impact film's visual language and animation
  material. Simplify the three-dimensional representation as appropriate
  for this different story.
- Embed Bas's video as a picture-in-picture, tentatively in the lower-right
  corner. Follow his narration with the animation. Keep the speaker and
  the explanatory action readable together.
- The backend is part of the product's **Structure**. Show it as a horizontal
  row within the product, rather than as the entire product or an independent
  product beside it.
- **Component-team sequence:** One team takes one story and applies it only
  to its owned part of the product. Begin with an extremely proper, shiny
  idea and a controlled application, without a splash. Then let the result
  become ugly and quirky according to that team's local engineering
  practices. This reverses the earlier film's progression from splat to
  coherent product. Other teams do not see the mess; when the owning team
  leaves, it becomes apparent.
- **Feature-team sequence:** Two teams pick two stories simultaneously.
  Two balls splash across the same product at the same time, with visibly
  overlapping parts of their splashes. Their work crosses components,
  including the backend row, rather than remaining in separate owned rows.
- Make the engineering-practice conflict concrete: one team expects good
  unit-test coverage, while the other team's overlapping change lacks tests.
  Two developers begin a conversation at Bas's “hey” / “Aren't we supposed
  to write tests here?” moment.
- The conversation leads to unified practices across teams. Show gradual
  improvement in engineering standards and product quality, preserving Bas's
  point that conflict is painful but useful when facilitated. Carry his
  warning that neglecting it can lead to a downward spiral.
- Use a small opening and ending suitable for this film's message. Their
  wording and final duration remain for later refinement.

## Source clip and timing

- **Speaker:** Bas Vodde, identified by Terry.
- **Supplied clip:** [Component teams.mp4](../terry-moves/public/assets/Component%20teams.mp4).
- **Original absolute path:** `/Users/terryyin/git/terry-talks/terry-moves/public/assets/Component teams.mp4`.
- **Observed media metadata:** 1080 × 1920 portrait video, audio present,
  duration 113.508 seconds (ffprobe, 2026-09-30).
- The timestamps below are relative to the source clip. Any new opening
  shifts them in the finished film. Use the actual clip to verify alignment
  during production; the supplied transcript alone is not frame-level timing.

### Transcript supplied by Terry

**0:00** Component teams often leads to low quality code and components because the engineering standards are always local to a particular team.

**0:15** So when this team owns a particular component, when they make a mess of that, nobody notices that and nobody sees that, and one day they leave and then you'll notice, oh, it's, it's a mess.

**0:29** but what happens in feature teams is that you start working with multiple teams across components, and then suddenly the different teams have different engineering standards, and this team here might be annoyed by that team there because they often work in, say, the back end, and it had a good unit test coverage and that team came and didn't write the test.

**0:54** And then this team goes like, hey.

**0:58** Aren't we supposed to write tests here?

**1:00** And that's the discussion that you need to have.

**1:03** And so this is, it, it, it's painful, but this is very, very good, because at this point, we can start having a cross-team discussion about what are the acceptable engineering practices within our organization.

**1:20** this is a very, very important.

**1:23** thing to solve when moving to feature teams.

**1:26** If you don't pay attention to this, you run the risk that the teams stop caring, and that's kind of a downward spiral.

**1:35** But if you just facilitate this conflict and the conversation, then this leads to gradual increased level of engineering standards that will have a positive impact on the quality of your product.

## Later refinement

Opening/ending wording, duration and the improvement-cue design remain for
planning or production, reviewed by Terry in the rendered film.
Refinement does not select an execution approach or start production.
