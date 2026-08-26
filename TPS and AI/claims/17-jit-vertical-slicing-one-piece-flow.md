# Claim 17: Thin vertical slices make software flow and confirmation possible

**Status: Provisional — reconciled with Toyota and LeSS research;
一個ずつ確認 kept with Kitano's English; doughnut contrast queued on
Claim 13**

## Claim

> **JIT in software development prefers vertical slicing of requirements
> to decompose the continuous flow of delivering user value. So the
> lower-level solution can respond to real customer need just-in-time.
> One-piece flow means each slice moves to done without a layer or
> component queue, with unfinished slices limited; parallel pieces at
> different steps, and parallel flows across teams, are allowed. The next
> start does not wait for customer confirmation. Confirm built-in quality
> as each piece moves—Kitano's one-by-one confirmation, 一個ずつ確認 as
> Terry's rendering—then use the running increment to learn whether it is
> useful. Vertical slicing makes a confirmable unit; it does not by
> itself create one-piece flow, and it is not a Toyota practice.**

Flow also requires little unfinished work, few queues or handoffs, and
frequent integration. A customer-centric backlog item is still a
hypothesis, not proof of actual need ([Claim
11](11-physical-production-and-software-differences.md)). A small running
slice makes that proof cheaper to seek.

## What the research supports

### One-piece flow is movement without a batch queue

Toyota defines JIT as linking processes in continuous flow while making
only what is needed, when needed, in the amount needed. The Lean
Enterprise Institute defines continuous or one-piece flow as producing
and moving one item at a time—or sometimes a small, consistent
batch—through successive processing steps, with each step responding to
the next.

A flow line can have different pieces at different steps. The whole
system does not wait for final-customer feedback before anybody starts
another piece. The software translation is:

> **Keep each slice moving to done without a layer or component queue,
> and limit the number of unfinished slices.**

“Finish this slice before starting another” can be a useful team-level
WIP policy, but it is not the definition of one-piece flow and need not
prohibit parallel flow across several teams. When honest integration
assimilates an experiment so later work entangles with it, clean
deletion may mean rolling the current system forward rather than
revert. That tension pair—honest trunk-based CI and disposable
prototypes—is
[Claim 23](23-ci-and-disposable-prototypes-tension-pair.md).

### Vertical slicing is the software bridge, not TPS vocabulary

LeSS recommends incrementally building cross-layer architectural slices
of customer-centric features instead of completing horizontal subsystems
apart from customer features. Its feature teams complete end-to-end
features one by one. This gives software a unit that can reach the
integrated product and be judged.

A horizontal split is not automatically a batch. It becomes
batch-and-queue when layer or component work accumulates, passes through
specialist handoffs, and postpones an integrated result. A vertical
slice merely makes avoiding that condition possible. [Claim
8](08-technical-excellence-enables-jit-coordination-in-less.md) owns the
feature teams and continuous integration needed to realize it.

### One-by-one confirmation and 一個ずつ確認

Mikio Kitano's 1997 keynote deck, copyrighted Toyota Motor Manufacturing,
is titled *Toyota Production System: One-by-One Confirmation*. Kitano
presents it as a broad TPS discipline of doing the work right the first
time. He says JIT **reinforces** it by making quality traceable and
confirmed at every step, and by not making more without a downstream
request.

Confirmation and JIT are mutually supporting; **one-by-one confirmation**
is not another name for one-piece flow. The sources document Kitano's
English phrase, not **一個ずつ確認** as a canonical Japanese Toyota
term. The Japanese is Terry's rendering.

### Product feedback adds a second kind of confirmation

Manufacturing flow confirms conformance close to the process that created
the unit. In software, tests, types, integration, and review can
similarly confirm known quality conditions. Jidoka is the stop when such
a condition fails.

Those checks cannot confirm that a novel product change is useful. LeSS's
**Take a Bite** supplies the missing product-development loop: split off
one tiny customer-centric end-to-end item, implement it, obtain feedback,
and only then return to more splitting. Early user or customer feedback
is enabled by a thin slice; it is **not part of the definition of
one-piece flow**.

## Implication for the talk

On stage, introduce **one-by-one confirmation** and **一個ずつ確認**
together once: Kitano's sourced English, and Terry's rendering.

> **JIT asks work to flow without stockpiling. In software, make the unit
> a thin, customer-centric vertical slice. Let it pull the lower-level
> solution, integrate it quickly, and confirm it one by one: quality in
> the product, usefulness through feedback.**

For AI-augmented development: generated endpoints, schemas, and designs
are unfinished inventory until integrated and judged. Pull one thin
slice, generate only what it presently needs, confirm it in the shared
product, and then take the next bite.

## Questions still open

- What single doughnut example best contrasts queued layer work with one
  integrated vertical slice without implying that all parallel work is
  forbidden? Queued on
  [Claim 13](13-doughnut-project-examples.md).

## Sources consulted

1. Toyota Motor Corporation, [Toyota Production
   System](https://global.toyota/en/company/vision-and-philosophy/production-system/).
   JIT links processes in continuous flow; make only what is needed, when
   needed, in the amount needed; do not let goods and information be held
   up.
2. Lean Enterprise Institute, [*Understanding Lean Thinking and Practice
   Fundamentals*](https://info.lean.org/hubfs/ebook%20files/ebook_Understanding_Lean_Thinking_final.pdf),
   drawing on the *Lean Lexicon*, 5th ed. Continuous/one-piece flow moves
   one item at a time, or a small consistent batch, through successive
   steps.
3. Mikio Kitano, [*Toyota Production System: One-by-One
   Confirmation*](https://artoflean.com/uploads/2019/01/Mikio-Kitano-Level-and-Pull-System-Presentation.pdf),
   University of Kentucky Lean Manufacturing Conference, 1997. Primary
   keynote deck, © Toyota Motor Manufacturing; JIT reinforces quality
   confirmation at every step and prevents unrequested production.
4. Toyota Motor Corporation, [1996 North American manufacturing
   reorganization](https://global.toyota/en/detail/8077069). Identifies
   Kitano as president of Toyota Motor Manufacturing North America and
   TMMK at the time of the keynote.
5. The LeSS Company, [Architecture &
   Design](https://less.works/less/technical-excellence/architecture-design).
   Build vertical, cross-layer slices of customer-centric features rather
   than horizontal subsystems divorced from them.
6. The LeSS Company, [Feature
   Teams](https://less.works/less/structure/feature-teams). Feature teams
   complete end-to-end customer features one by one; continuous
   integration is essential.
7. The LeSS Company, [Introduction to
   LeSS](https://less.works/less/framework/introduction). **Take a Bite**:
   implement one tiny customer-centric end-to-end fragment and get
   feedback before returning to more splitting.
