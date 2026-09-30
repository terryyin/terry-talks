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
{"schemaVersion":1,"refinement":"not-refined","approach":"unselected"}
```

- **For / why:** Developers and people moving to feature teams need to
  understand why friction between teams can be useful, and why shared
  engineering practices require a conversation rather than just a change
  in team structure.
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

Settle the final frame shape and layout around the portrait inset, the short
opening and closing text, and the visual cues for testing standards and their
gradual improvement. This intake records one requested backlog item; it does
not select an execution approach or start production.
