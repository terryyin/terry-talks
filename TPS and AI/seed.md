---
id: tps-and-ai-talk
status: delivered
created: 2026-09-28
created_during: Near-future direction — TPS and AI talk ready for the LeSS Conference in Tokyo, 2026
trigger_when: Now; the backlog direction selects this talk
scope: no active candidate stories; the talk is delivered
---

# TPS and AI talk: from a working deck to a Tokyo-ready presentation

## Parent problem and desired effect

For **Terry**, presenting to a mixed Japanese and international audience at
the LeSS Conference in Tokyo (with TPS, lean, and LeSS experts, some from
Toyota, in the room), the current
[Freedom and Trust deck](../slides/tps-and-ai/slides.md) should change
from a comprehensive working draft into a presentation he can deliver with
confidence. It should be built on the claims he stands behind, fit in about 33 slides (never more than 35) with Japanese embedded, and follow a deliberate arc: a casual opening
that puts the key message first, a streamlined narrative, a climax at about the
three-quarter point, then a wind-down to a solid ending.

The **audience** evaluates comprehension and memorability: *a small collection
of main points that are easy to remember*
([main theme](main-theme-and-stage-setting.md)). Terry evaluates fidelity to
his opinion and whether he can deliver it.

### The published session (constraint)

The [conference session page](https://less.works/conferenza/sessions/2026-global-less-conference-tokyo-what-ai-augmented-development-can-learn-from-the-toyota-production-system-592)
fixes these facts:

- **When:** 2026 Global LeSS Conference Tokyo, **8 October 2026, 15:45**.
- **Slot:** a one-hour talk. That is about ten days after this decomposition.
- **Listed title:** *What AI-Augmented Development Can Learn from the Toyota
  Production System*. The deck's title is *Freedom and Trust*, and its
  subtitle is this listed title.
- **Abstract promises:** TPS's influence on Agile thinking; lessons drawn from
  hands-on project experience; and "patterns, tensions, and practical lessons
  for using AI in ways that improve learning, flow, quality, and coordination
  rather than amplify waste".
- **Language:** English. The page lists translation options, including
  Japanese, but does not say what form that translation takes on the day.

The abstract is a promise the audience arrives with. The storyline must visibly
deliver its four named outcomes, and at least one **tension** beat. The
doughnut examples are the "hands-on project experience".

### Evidence from the current material (2026-09-28)

- **Deck:** About 38 slides. That is over the limit, even though the deck
  already covers every priority topic in the main theme. The artwork in the
  [artwork list](../slides/tps-and-ai/artwork-list.md) is essentially complete.
  Generated art for Go-See (`entering-ai-harness.png`) exists, but no slide
  uses it.
- **Flow:** The deck follows the main theme's topic priority list, which that
  file says "does not dictate the order". No slide is designated as the climax.
  The strongest candidates are the loop pair ("The engine…" / "AI speeds
  whichever loop you feed") and the jidoka cluster, and both currently sit near
  the middle. After the jidoka cluster there are a JIT section, Respect for
  People, continuous improvement, switching cost, tensions, and takeaways. That
  is a long tail with no single peak.
- **Japanese:** Only one bilingual touch exists (任せる / 信頼) and there is no
  translation layer. [Claim 9](claims/09-nemawashi-self-organized-deliberation-in-less.md)
  already assumes "slides will be translated". Claims 16, 17, and 20 set
  first-use rules for genchi genbutsu, 一個ずつ確認, and poka-yoke.
- **Claims:** The [README](README.md) claim list gives each claim a talk
  role Terry set: Confirmed (may carry a primary beat), Supporting (qualified
  or secondary beats only), or Off-stage.

## Alternatives and proposed direction

| Approach | Value | Decision and reason |
| --- | --- | --- |
| Do nothing: present the current deck | No work | Reject: over the slide limit, no Japanese, no designed climax. It fails every requirement in the direction. |
| Trim to the limit in place, then translate | Least editing | Reject as sufficient: the count would be met, but the arc and the confirmed basis would not. Translating before the storyline stabilizes wastes translation work on slides that later change. |
| Rely on a live interpreter or spoken Japanese instead of embedded text | Avoids translation work | Reject: the direction explicitly requires embedded Japanese. It can still complement the slides on the day. |
| Settle the claim basis, then restructure the storyline, then embed Japanese, then rehearse and harden for the day | Every stage consumes stable input from the stage before it | **Recommended.** |

**Highest learning:** Can the argument be told as one arc within about 33 slides,
with a real climax at about slide 25, without dropping a claim Terry considers
core? That tests the most consequential assumption, so the storyline story
carries it. The claim basis it needs is already settled as the README's talk
roles.

## Candidate story decomposition

No active candidate stories remain. The talk is delivered.

## Preparation order and scope reduction

The preparation order was: storyline → japanese. Each story consumes the
stable output of the one before it; the storyline starts from the README's
talk roles. The storyline carries the highest learning.

**Preparation calendar:** targeted 8 October 15:45:

| Story | Finish by |
| --- | --- |
| storyline | about 2 October |
| japanese | about 5 October, leaving time for the fluent reviewer |

A 45-minute talk (15 minutes banked for Q&A) with the accepted 30 slides
allows about 1.5 minutes per slide.

If time runs short, cut or shorten slides in this order, least important
first:

1. The "Lower the switching cost" follow-on.
2. The separate "Preferred tests" slide.
3. Section divider slides.
4. Shorten "Tensions and honest limits" to one tension (Claim 23), because the
   abstract promises tensions.

Keep the diagnostic, the theme, the jidoka descent, the same gates, the JIT
flow, one tension, and the closing intact. Do not skip the native Japanese
review silently: if it is late, say so.

## Open decisions

- ~~**Title alignment.**~~ Reassessed and decided 2026-10-04: use
  *Freedom and Trust*, with the listed session title as the subtitle.
  Keep *entrust* for giving responsibility; the title names the broader
  relationship that enables responsible freedom.
- ~~**Q&A share of the hour.**~~ Decided 2026-09-28: a 45-minute talk with
  a 15-minute Q&A bank; slide limit about 33, never more than 35.
- ~~**What "confirmed" means.**~~ Decided 2026-09-28: a talk role (Confirmed,
  Supporting, Off-stage) that Terry sets in the [README](README.md) claim
  list.
- ~~**Climax slide.**~~ Decided 2026-09-28: the loop pair, "AI speeds
  whichever loop you feed", at slide 24 of 30 (accepted 2026-09-28).
- ~~**Japanese format and reviewer.**~~ Decided 2026-09-28: Japanese goes
  under the English on the same slide, covering all audience-facing text,
  with speaker notes left in English. Aki (aki@odd-e.com) reviews
  ([japanese-review.md](../slides/tps-and-ai/japanese-review.md)).

## When to surface

No active work remains. This seed retains preparation context for the delivered talk.

## References

- [README](README.md), [main theme](main-theme-and-stage-setting.md),
  [open questions](open-questions.md), [claims](claims/)
- [Deck](../slides/tps-and-ai/slides.md) and
  [artwork list](../slides/tps-and-ai/artwork-list.md)
- [ADR-0000](../docs/adrs/0000-use-adrs-accepted.md): durable decisions stay
  human-owned. No new ADR is implied.
