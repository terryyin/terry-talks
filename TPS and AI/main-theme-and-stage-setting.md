# Main theme and stage setting

**Status: Provisional — theme, framing, and draft takeaway list stated;
talk structure and final inclusion of material are deck decisions**

This file sets the stage for the talk and states the main message it
should deliver. The [claims](README.md) are the research workshop
behind the talk, not its outline: they are not equally important, and
not all of them will appear in the final talk. The talk's own shape
starts here and is realized in the deck.

## The occasion and the audience

Tokyo LeSS Conference. Expect TPS, lean, and LeSS experts, including
people from Toyota — yet assume most of the audience does not know TPS
in detail. The audience is mixed international and Japanese; some
contrast in the language may be interesting in the talk. To be useful
to practitioners the following day, keep it simple and interesting: a
small collection of main points that are easy to remember.

## Title

> **Freedom and Entrustment**
>
> *What AI-Augmented Development and LeSS Can Learn from the TPS*

The subtitle carries the framing: the talk does not apply TPS to
software as a recipe. It is **inspired by** TPS — by the reasoning with
which Toyota made a whole system responsive and learnable
([Claim 1](claims/01-tps-reasoning-not-mechanisms.md)) — for
AI-augmented software development in the context of LeSS.

## Setting the stage

One of the first slides asks the diagnostic question:

> **How do you know if the organization is using AI right?**
>
> If the teams are more freed than constrained by what they built.

That slogan is a leading page, not the title. **Constrained** here is
leftover ownership, WIP, and the inability to take the next item —
not jidoka's **closed stop** or **gate**, and not coercive advance
control or an impediment to integration.

The slogan plants the tension the talk then resolves: everyone in the
room is being pushed to adopt AI, and the visible result is often more
generated output, fuller review queues, and busier people — the
opposite of freedom. TPS faced the same temptation with automation and
inventory, and answered with jidoka, Just-in-Time, and Respect for
People.

## The main message

Freedom and entrustment look like opposites: to hand over the work
that matters, it seems you must control people in advance; to give
real freedom, it seems you cannot hand over the work that matters. The
talk's message is that TPS shows how they reinforce each other instead
([Claim 10](claims/10-freedom-and-trust-reinforce-through-jidoka.md)):

> **TPS shows how a system can continually convert learning into
> closed stops that make greater freedom responsible — and use that
> freedom to produce the next learning on which deeper entrustment,
> and then mutual trust, can rest.**

Unpacked as the triad of
[Claim 3](claims/03-jidoka-enables-jit-trusts-respect-grows.md):
jidoka **frees** people by encoding previously learned judgment into
closed stops, so attention is available for what is genuinely new. JIT
**entrusts** capable people with responding resourcefully to real need
instead of stockpiling output and detailed responses in advance.
Respect for People **grows** the people who can think, on whom both
depend ([Claim 12](claims/12-respect-for-people-who-can-think.md)).

AI enters as an amplifier, not a third pillar. It makes candidate
solutions cheap and fast to generate while judging correctness,
usefulness, value, and appropriateness remains comparatively
expensive — a supporting argument owned by the jidoka cluster
([Claim 6](claims/06-jidoka-embeds-routine-judgment.md)), not the
thesis. The bottleneck it exposes is people's cognitive ability to
fully experience the problem-solving journey and to comprehend the
problem and the solution. AI speeds whichever loop the organization
feeds ([Claim 22](claims/22-cld-shows-tps-reasoning-for-less-ai.md)):
it can load the system with still-smart inventory nobody lived
through, or it can help encode the known and free people to learn.

## Main takeaway list — draft

A small collection, each traceable to a claim, each usable the next
day:

1. **Judge AI use by freedom.** Teams more freed than constrained by
   what they built: less leftover ownership, less WIP, more ability to
   take the next highest-value item and acquire the knowledge it needs
   ([Claim 10](claims/10-freedom-and-trust-reinforce-through-jidoka.md)).
2. **Free, entrust, grow.** Jidoka frees people by empowering them.
   JIT entrusts them with responding resourcefully to real need.
   Respect for People helps them grow into people who can think
   ([Claim 3](claims/03-jidoka-enables-jit-trusts-respect-grows.md),
   [Claim 12](claims/12-respect-for-people-who-can-think.md)).
3. **Smart → dumb → gone.** Generation is cheap; judgment is
   expensive. Encode learned judgment as closed stops, design known
   failures out, and do not load the system with output that still
   needs a person to re-judge
   ([Claim 6](claims/06-jidoka-embeds-routine-judgment.md)).
4. **Same gates for "I" and AI.** Put identical quality gates on human
   and AI work. After a dumb stop, AI may fix dumb problems; it must
   not dissolve the stop, and five judgments stay human: value,
   design, credentials, undiagnosed failure, and ambiguity
   ([Claim 6](claims/06-jidoka-embeds-routine-judgment.md)).
5. **Integrate continuously; collaborate just in time.** Technical
   excellence exists so one product group can integrate continuously;
   let the shared product pull collaboration. Slowing down means not
   overproducing — do not create debt faster
   ([Claim 8](claims/08-technical-excellence-enables-jit-coordination-in-less.md)).

The talk closes by returning to the theme:

> **Encode the known. Stop the abnormal. Free people to learn. Entrust
> a capable response to real need. Let visible capability earn mutual
> trust.**

## Relationship to the claims

The theme is owned by
[Claim 10](claims/10-freedom-and-trust-reinforce-through-jidoka.md);
the stage setting draws its spine from Claims
[1](claims/01-tps-reasoning-not-mechanisms.md),
[3](claims/03-jidoka-enables-jit-trusts-respect-grows.md),
[6](claims/06-jidoka-embeds-routine-judgment.md),
[8](claims/08-technical-excellence-enables-jit-coordination-in-less.md),
[12](claims/12-respect-for-people-who-can-think.md), and
[22](claims/22-cld-shows-tps-reasoning-for-less-ai.md). The remaining
claims supply beats, examples, guardrails, and honest limits (for
example [Claim
11](claims/11-physical-production-and-software-differences.md) on
where the analogy breaks down). Which of them appear, and in what
order, is decided when the deck is built — not by claim number.
