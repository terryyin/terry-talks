# Open questions and future claims

This file collects questions that span multiple claims. It is a queue for
future discussion, not a set of conclusions.

## Talk framing

- What is the exact title for the Tokyo LeSS Conference talk? Working
  answer: **Freedom and Entrustment**, subtitle **What AI-Augmented
  Development and LeSS Can Learn from the TPS**. The theme matches
  [Claim 10](claims/10-freedom-and-trust-reinforce-through-jidoka.md).
  The early-talk slogan (*How do you know if the organization is using
  AI right? If the teams are more freed than constrained by what they
  built.*) is one leading page, not the title. **Constrained**
  means leftover ownership, unfinished and judgment-dependent work, and
  inability to take the next highest-value item.
- What is the promised audience takeaway? Working answer: drafted as
  the four-point takeaway list in
  [Main theme and stage setting](main-theme-and-stage-setting.md),
  closed by the Freedom and Entrustment triad.
- Is the talk primarily about applying TPS philosophy to AI-augmented software,
  or about using the contrast with TPS to expose what is newly difficult?
  Working answer: as in the subtitle. Not applying TPS to software, but
  **inspired by** TPS, for AI-augmented software development in the
  context of LeSS.
- Which audience assumptions about TPS, lean, LeSS, and AI can safely be made?
  Working answer: Tokyo LeSS Conference — expect TPS, lean, and LeSS
  experts, including people from Toyota. Still assume most of the
  audience does not know TPS in detail, even though most are Japanese.
  Mixed international and Japanese audience; some contrast in the
  language may be interesting in the talk.
- What would make the talk useful to practitioners the following day?
  Working answer: keep it simple and interesting. A small collection of
  main points that are easy to remember.
- Is a causal loop diagram of the TPS→LeSS+AI reasoning a slide, a
  speaker map, or only a writing tool? Working draft:
  [Claim 22](claims/22-cld-shows-tps-reasoning-for-less-ai.md) and
  [the companion CLD](claims/22-tps-less-ai-cld.md). Leave the form
  open as the diagram develops; if it is good, use it directly in the
  slides.

## Central tension

- Is “generation is cheap; judgment is expensive” the central thesis, one
  supporting argument, or merely an opening hypothesis?
  Working answer: a **supporting argument**, not the thesis. Use it on
  the jidoka / preserve-knowledge slide. [Claim
  6](claims/06-jidoka-embeds-routine-judgment.md) owns the beat. The
  thesis remains Freedom and Entrustment
  ([Claim 10](claims/10-freedom-and-trust-reinforce-through-jidoka.md)).
- In AI-augmented development, where does the bottleneck actually move: problem
  selection, specification, verification, integration, deployment, learning,
  or governance?
  Working answer: not those pipeline stages. The bottleneck is people's
  **cognitive ability to fully experience the problem-solving journey
  and to comprehend the problem and the solution**. Owned with the
  jidoka cluster on [Claim
  6](claims/06-jidoka-embeds-routine-judgment.md);
  [Claim 12](claims/12-respect-for-people-who-can-think.md) owns what
  must not be outsourced.
- Which TPS ideas become more important when work can be generated faster:
  jidoka, stop-the-line behavior, visual management, small batches, pull,
  respect for people, continuous improvement, or something else?
  LeSS's named principle plus kaizen, SMED as the TPS example, and
  Definition of Done as the LeSS measure are
  [Claim 18](claims/18-continuous-improvement-towards-perfection.md).
- Can technical excellence make AI-generated changes meet the integrated
  product quickly enough that real dependencies pull teams into focused,
  self-managed collaboration rather than planned coordination overhead?
  A working answer is
  [Claim 8](claims/08-technical-excellence-enables-jit-coordination-in-less.md):
  LeSS's coordination and integration channels overlap under continuous
  integration; the engineering catalog exists so the group can integrate
  continuously; use AI to reduce volume and uncertainty, and slow down
  rather than create debt faster.
- Where does the analogy break down because software work combines discovery
  and production? A working answer is
  [Claim 11](claims/11-physical-production-and-software-differences.md):
  the mixture changes units, signals, and inventory; it is not a binary of
  factory versus lab. Remaining talk choices (one sequence example, AI
  set-based exploration versus overproduction, operations as a third mode)
  stay on that claim.
- Is stacking **judgment-dependent** knowledge (generated analysis, unowned
  tests, patches that still need a person to re-judge) the distinctive
  failure of AI-assisted development, as opposed to merely generating too
  much code? [Claim
  6](claims/06-jidoka-embeds-routine-judgment.md) now names that split;
  [Claim
  4](claims/04-jit-assurance-resourcefulness-not-abundance.md) already
  has the stacking warning. A leftover compiler or linter warning is
  that remainder in miniature:
  [Claim 24](claims/24-warnings-as-stop-no-news-is-good-news.md).
  Talk placement is on that claim: a jidoka sub-beat after poka-yoke,
  not an independent TPS topic.
- Honest CI and disposable prototypes look like opposites:
  real integration entangles experiments so there is no clean delete,
  yet spent experiments still need to leave the product. A working
  answer is
  [Claim 23](claims/23-ci-and-disposable-prototypes-tension-pair.md): it
  is a tension pair, native to LeSS, made louder by AI. The doughnut
  post-class cleanup episode is dropped from the talk queue on
  [Claim 13](claims/13-doughnut-project-examples.md): the tensions
  slide can name the pair without that story.

## Evidence to collect

- Primary Toyota sources defining TPS and the Toyota Way today.
- Toyota's own chronology of TPS/JIT is the historical index in
  [Claim 4](claims/04-jit-assurance-resourcefulness-not-abundance.md). Do
  not collect a second lean-diffusion history unless a later claim needs it.
- Larman and Vodde's 2009 house diagram and the *More with LeSS* lean-thinking
  principle are in [Claim 2](claims/02-tps-and-lean-houses.md). Remaining: the
  2008 book text around the diagram's center (product development, 14 Toyota
  Way principles), and how Toyota distinguishes TPS from the Toyota Way
  across Toyota Way 2001 to 2020.
- Evidence about Toyota's software, mobility, invention, and experimentation
  capabilities beyond conventional production.
- Evidence about AI's effect on software generation speed and on downstream
  review or verification costs. Those queues filling is a symptom; the
  bottleneck is on [Claim
  6](claims/06-jidoka-embeds-routine-judgment.md).
- Examples from the doughnut project used in Terry's LeSS in Action
  trainings. The ordered hunt is on
  [Claim 13](claims/13-doughnut-project-examples.md): training weeks
  located; 4+4 class search set; queue ordered for the Tokyo talk;
  example search not started. [Claim
  9](claims/09-nemawashi-self-organized-deliberation-in-less.md)
  already pulled doughnut's ADR propose-to-accept path (Whale /
  Wärtsilä minutes; not a class-week search).

## Candidate future claims

Add each new claim as a separate file under `claims/` only after Terry has
stated the hypothesis. While forming, keep the sequence:

**original claim → research-based adjustment → emerging implication → open
questions**

Once the opinion is settled, collapse that path into one current claim,
as the settled claims now do.

### Backlog

*No items currently queued.*
