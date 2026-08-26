# Main theme and stage setting

**Status: Provisional — theme, framing, and draft takeaway list stated;
talk structure and final inclusion of material are deck decisions**

This file sets the stage for the talk and states the main message it
should deliver. The [claims](README.md) are the research workshop
behind the talk, not its outline: they are not equally important, and
not all of them will appear in the final talk.

## The occasion and the audience

Tokyo LeSS Conference. Expect TPS, lean, and LeSS experts, including
people from Toyota — yet assume most of the audience does not know TPS
in detail. The audience is mixed international and Japanese; some
contrast in the language may be interesting (for example **entrust**,
任せる, versus **trust**, 信頼). To be useful the following day, keep
it simple and interesting: a small collection of main points that are
easy to remember.

## Title

> **Freedom and Entrustment**
>
> *What AI-Augmented Development and LeSS Can Learn from the TPS*

The subtitle carries the boundary. The talk does not apply a factory
recipe to software: software mixes discovery and production inside one
evolving product
([Claim 11](claims/11-physical-production-and-software-differences.md)).
It borrows the reasoning with which Toyota made a whole system
responsive and learnable
([Claim 1](claims/01-tps-reasoning-not-mechanisms.md)), then asks what
that reasoning reveals when AI makes candidate solutions cheap and fast
to generate.

## Setting the stage

One of the first slides asks the diagnostic question:

> **How do you know if the organization is using AI right?**
>
> If the teams are more **freed** than **constrained** by what they
> built.

Constrained means leftover ownership, unfinished and judgment-dependent
work, and inability to take the next highest-value item. It does not
mean absence of product direction, quality standards, or
accountability.

AI can produce plausible software faster than a product group can
absorb it. A generated branch, test, analysis, or design is not yet
capability: until it is understood, owned, integrated, and judged, it
is inventory someone must supervise or re-judge.

## The main message

Freedom and entrustment are not literal opposites, but organizations
mistakenly treat them as a tradeoff: to hand over the work that
matters, it seems you must constrain people in advance; to give real
freedom, it seems you cannot hand over the work that matters. The
talk's message is that TPS shows how they reinforce each other instead
([Claim 10](claims/10-freedom-and-trust-reinforce-through-jidoka.md)):

> **TPS shows how a system can continually convert learning into
> constraints that make greater freedom responsible — and use that
> freedom to produce the next learning on which deeper entrustment,
> and then mutual trust, can rest.**

Unpacked as the triad of
[Claim 3](claims/03-jidoka-enables-jit-trusts-respect-grows.md):
jidoka **frees** people from watching and re-judging the known. JIT
**entrusts** capable people with responding resourcefully to real need
instead of stockpiling output in advance. Respect for People **grows**
the people who can think, on whom both depend
([Claim 12](claims/12-respect-for-people-who-can-think.md)). Technical
excellence makes the shared product and its abnormalities visible soon
enough for teams to collaborate just in time
([Claim 8](claims/08-technical-excellence-enables-jit-coordination-in-less.md)).

AI enters as an amplifier. Generation is cheap;
judgment is expensive — a supporting argument owned by the jidoka
cluster ([Claim 6](claims/06-jidoka-embeds-routine-judgment.md)), not
the thesis. The bottleneck is people's cognitive ability to fully
experience the problem-solving journey and to comprehend the problem
and the solution. AI can inject judgment-dependent inventory faster
than people can encode it, or it can help make the next slice smaller
and known failures easier to prevent or stop
([Claim 22](claims/22-cld-shows-tps-reasoning-for-less-ai.md)):

> **AI speeds whichever loop you feed.**

## Main takeaway list — draft

1. **Judge AI use by freedom.** Teams more freed than constrained by
   what they built. Spend freed attention on comprehension,
   whole-product collaboration, kaizen, and teaching — grow response
   capability, not output
   ([Claims 10](claims/10-freedom-and-trust-reinforce-through-jidoka.md)
   and [12](claims/12-respect-for-people-who-can-think.md)).
2. **Pull, don't stockpile.** Start from one current customer need,
   cut a thin vertical slice, integrate it, confirm quality and
   usefulness, then take the next bite
   ([Claims 4](claims/04-jit-assurance-resourcefulness-not-abundance.md)
   and [17](claims/17-jit-vertical-slicing-one-piece-flow.md)).
3. **Smart → dumb → gone.** Move learned judgment downhill: prefer
   prevention; otherwise a closed stop — and actually Stop & Fix. A
   detector everyone continues past is only a dashboard. Do not load
   the system with output that still needs a person to re-judge
   ([Claims 6](claims/06-jidoka-embeds-routine-judgment.md),
   [19](claims/19-stop-and-fix.md), and
   [20](claims/20-poka-yoke-supports-jidoka.md)).
4. **Same gates for "I" and AI.** The product standard and stop
   conditions do not weaken according to who or what authored the
   change. After a dumb stop, AI may help fix dumb problems; it must
   not dissolve the stop, and five judgments stay human: **value**,
   **design**, **credentials**, **undiagnosed failure**, and
   **ambiguity**
   ([Claim 6](claims/06-jidoka-embeds-routine-judgment.md)). Go-See may
   mean entering the AI harness
   ([Claim 16](claims/16-go-see-ai-harness.md)).
5. **Integrate continuously; collaborate just in time.** Technical
   excellence exists so one product group can integrate continuously;
   let the shared product pull the right people into collaboration.
   Slowing down means not overproducing — do not create debt faster
   ([Claim 8](claims/08-technical-excellence-enables-jit-coordination-in-less.md)).

The talk closes by returning to the theme:

> **Encode the known. Stop the abnormal. Free people to learn. Entrust
> a capable response to real need. Let visible capability earn mutual
> trust.**

## Topics to cover — priority, high to low

Priority and separation show importance only. They do not dictate the
order or the grouping of slides, and a topic does not map one-to-one
to a claim.

1. **Freedom and Entrustment** — the diagnostic slogan, the polarity,
   and the reinforcing loop: encoded learning makes freedom
   responsible; visible capability earns entrustment and mutual trust
   ([Claims 10](claims/10-freedom-and-trust-reinforce-through-jidoka.md)
   and [3](claims/03-jidoka-enables-jit-trusts-respect-grows.md); loop
   map in [22](claims/22-cld-shows-tps-reasoning-for-less-ai.md)).
2. **TPS reasoning, not factory mechanisms** — the two operating
   pillars; what changes because software mixes discovery and
   production in one evolving product
   ([Claims 1](claims/01-tps-reasoning-not-mechanisms.md),
   [2](claims/02-tps-and-lean-houses.md), and
   [11](claims/11-physical-production-and-software-differences.md)).
3. **Jidoka preserves knowledge** — generation is cheap, judgment is
   expensive; the loom's closed stop; smart → dumb → gone; do not
   stack judgment-dependent inventory
   ([Claim 6](claims/06-jidoka-embeds-routine-judgment.md), with
   Stop & Fix [19](claims/19-stop-and-fix.md), poka-yoke
   [20](claims/20-poka-yoke-supports-jidoka.md), and quiet warnings
   [24](claims/24-warnings-as-stop-no-news-is-good-news.md) as
   sub-beats).
4. **Same gates and human judgments** — identical gates for "I" and
   AI; the five judgments that stay human; Go-See may mean entering
   the AI harness
   ([Claims 6](claims/06-jidoka-embeds-routine-judgment.md) and
   [16](claims/16-go-see-ai-harness.md)).
5. **JIT flow in LeSS** — pull thin vertical slices; integrate
   continuously (a practice, not a service); let the shared product
   pull just-in-time collaboration
   ([Claims 4](claims/04-jit-assurance-resourcefulness-not-abundance.md),
   [17](claims/17-jit-vertical-slicing-one-piece-flow.md),
   [8](claims/08-technical-excellence-enables-jit-coordination-in-less.md),
   and [21](claims/21-ci-practice-is-not-a-ci-system.md)).
6. **Respect for People** — grow people who can think; spend freed
   attention on comprehension, kaizen, and teaching; the deskilling
   risk ([Claims 12](claims/12-respect-for-people-who-can-think.md)
   and [3](claims/03-jidoka-enables-jit-trusts-respect-grows.md)).
7. **Continuous improvement towards perfection** — SMED and cheap
   changeover as the TPS example; Definition of Done as the LeSS
   measure
   ([Claims 18](claims/18-continuous-improvement-towards-perfection.md)
   and [5](claims/05-smed-software-changeover-and-ai-friendly-context.md)).
8. **Tensions and honest limits** — honest CI versus disposable
   prototypes; extreme conditions interrupt JIT; The Algorithm's
   family resemblance
   ([Claims 23](claims/23-ci-and-disposable-prototypes-tension-pair.md),
   [15](claims/15-extreme-conditions-interrupt-jit.md), and
   [7](claims/07-the-algorithm-and-tps-family-resemblance.md)).

Nemawashi
([Claim 9](claims/09-nemawashi-self-organized-deliberation-in-less.md))
and the Ebata teaching
([Claim 14](claims/14-ebata-jit-teaching-in-print.md)) support the JIT
beats; doughnut examples
([Claim 13](claims/13-doughnut-project-examples.md)) supply evidence
across topics.
