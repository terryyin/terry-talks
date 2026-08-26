# Claim 17: Thin vertical slices make software flow and confirmation possible

**Status: Provisional — initially reconciled with additional Toyota and LeSS
research; not yet reviewed by Terry**

## Original claim / hypothesis

> **JIT in software development prefers vertical slicing of requirements to
> decompose the continuous flow of delivering user value. So the lower-level
> solution can respond to real customer need just-in-time. And real feedback
> comes early, so that it complies with the one-piece-flow principle as
> well—that is, 一個ずつ確認 (piece-by-piece confirmation).**

## Initial reconciled claim

> **Translate JIT's pursuit of continuous flow into software by making a thin,
> customer-centric, end-to-end slice the unit of flow. Let the current slice
> pull only the detailed solution it needs; finish and integrate it rather than
> stockpiling layer work. Confirm built-in quality as it moves, then use the
> running increment to learn whether it is useful. This is software's careful
> extension of one-by-one confirmation—not a claim that vertical slicing is a
> Toyota practice.**

The original intuition survives, but with narrower causal links. **Vertical
slicing makes a confirmable unit; it does not by itself create one-piece
flow.** Flow also requires little unfinished work, few queues or handoffs, and
frequent integration. And a customer-centric backlog item is still a
hypothesis, not proof of actual need ([Claim
11](11-physical-production-and-software-differences.md)). A small running slice
makes that proof cheaper to seek.

## What the research corrects

### One-piece flow is movement without a batch queue

Toyota defines JIT as linking processes in continuous flow while making only
what is needed, when needed, in the amount needed. The Lean Enterprise
Institute defines continuous or one-piece flow as producing and moving one
item at a time—or sometimes a small, consistent batch—through successive
processing steps, with each step responding to the next.

That does **not** mean an entire system must wait for final-customer feedback
before anybody starts another piece. A flow line can have different pieces at
different steps. The safer software translation is therefore:

> **Keep each slice moving to done without a layer or component queue, and
> limit the number of unfinished slices.**

“Finish this slice before starting another” can be a useful team-level WIP
policy, but it is not the definition of one-piece flow and need not prohibit
parallel flow across several teams.

### Vertical slicing is the software bridge, not TPS vocabulary

LeSS recommends incrementally building cross-layer architectural slices of
customer-centric features instead of completing horizontal subsystems apart
from customer features. Its feature teams complete end-to-end features one by
one. This gives software a unit that can reach the integrated product and be
judged.

A horizontal split is not automatically a batch. It becomes batch-and-queue
when layer or component work accumulates, passes through specialist handoffs,
and postpones an integrated result. A vertical slice merely makes avoiding
that condition possible. [Claim
8](08-technical-excellence-enables-jit-coordination-in-less.md) owns the feature
teams and continuous integration needed to realize it.

### One-by-one confirmation is documented, but it is not a synonym for flow

The earlier draft treated “one-by-one confirmation” as a secondary origin
story. The evidence is stronger and different: Mikio Kitano's 1997 keynote
deck, copyrighted Toyota Motor Manufacturing, is titled *Toyota Production
System: One-by-One Confirmation*. Kitano presents it as a broad TPS discipline
of doing the work right the first time. He says JIT **reinforces** it by making
quality traceable and confirmed at every step, and by not making more without
a downstream request.

That wording makes confirmation and JIT mutually supporting ideas; it does not
make “one-by-one confirmation” another name for one-piece flow. The sources
found document the English phrase, not **一個ずつ確認** as a canonical Japanese
Toyota term. Keep the Japanese as Terry's memorable rendering unless a Toyota
Japanese source is found.

### Product feedback adds a second kind of confirmation

Manufacturing flow confirms conformance close to the process that created the
unit. In software, tests, types, integration, and review can similarly confirm
known quality conditions. Jidoka is the stop when such a condition fails.

But those checks cannot confirm that a novel product change is useful. LeSS's
**Take a Bite** supplies the missing product-development loop: split off one
tiny customer-centric end-to-end item, implement it, obtain feedback, and only
then return to more splitting. Thus early user or customer feedback is enabled
by a thin slice, but it is **not part of the definition of one-piece flow**.

## Compact talk candidate

> **JIT asks work to flow without stockpiling. In software, make the unit a
> thin, customer-centric vertical slice. Let it pull the detailed solution,
> integrate it quickly, and confirm it one by one: quality in the product,
> usefulness through feedback.**

For AI-augmented development: generated endpoints, schemas, and designs are
unfinished inventory until integrated and judged. Pull one thin slice, generate
only what it presently needs, confirm it in the shared product, and then take
the next bite.

## Questions still open

- Should the talk retain **一個ずつ確認** explicitly as Terry's translation,
  or use Kitano's sourced English phrase **one-by-one confirmation**?
- Is “lower-level solution” clear enough, or should the talk say “detailed
  design and code”?
- What single example best contrasts queued layer work with one integrated
  vertical slice without implying that all parallel work is forbidden?

## Sources consulted

1. Toyota Motor Corporation, [Toyota Production
   System](https://global.toyota/en/company/vision-and-philosophy/production-system/).
   JIT links processes in continuous flow; make only what is needed, when
   needed, in the amount needed; do not let goods and information be held up.
2. Lean Enterprise Institute, [*Understanding Lean Thinking and Practice
   Fundamentals*](https://info.lean.org/hubfs/ebook%20files/ebook_Understanding_Lean_Thinking_final.pdf),
   drawing on the *Lean Lexicon*, 5th ed. Continuous/one-piece flow moves one
   item at a time, or a small consistent batch, through successive steps.
3. Mikio Kitano, [*Toyota Production System: One-by-One
   Confirmation*](https://artoflean.com/uploads/2019/01/Mikio-Kitano-Level-and-Pull-System-Presentation.pdf),
   University of Kentucky Lean Manufacturing Conference, 1997. Primary
   keynote deck, © Toyota Motor Manufacturing; JIT reinforces quality
   confirmation at every step and prevents unrequested production.
4. Toyota Motor Corporation, [1996 North American manufacturing
   reorganization](https://global.toyota/en/detail/8077069). Identifies Kitano
   as president of Toyota Motor Manufacturing North America and TMMK at the
   time of the keynote.
5. The LeSS Company, [Architecture &
   Design](https://less.works/less/technical-excellence/architecture-design).
   Build vertical, cross-layer slices of customer-centric features rather than
   horizontal subsystems divorced from them.
6. The LeSS Company, [Feature
   Teams](https://less.works/less/structure/feature-teams). Feature teams
   complete end-to-end customer features one by one; continuous integration is
   essential.
7. The LeSS Company, [Introduction to
   LeSS](https://less.works/less/framework/introduction). **Take a Bite**:
   implement one tiny customer-centric end-to-end fragment and get feedback
   before returning to more splitting.
