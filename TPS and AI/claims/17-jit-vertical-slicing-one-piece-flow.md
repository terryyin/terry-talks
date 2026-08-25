# Claim 17: JIT in software prefers vertical slices of user value; one-piece flow is 一個ずつ確認

**Status: Provisional — hypothesis stated; TPS/LeSS mapping researched; not
a finalized talk beat**

## Original claim / hypothesis

> **JIT in software development prefers vertical slicing of requirements to
> decompose the continuous flow of delivering user value. So the lower-level
> solution can respond to real customer need just-in-time. And real feedback
> comes early, so that it complies with the one-piece-flow principle as
> well—that is, 一個ずつ確認 (piece-by-piece confirmation).**

This is a lightly edited record of Terry's hypothesis. It contains three
propositions:

1. **Decompose the flow, not the stack.** Under JIT, split work into thin
   vertical slices of user value, not into technical layers.
2. **Pull the detailed solution.** Then the lower-level solution (design,
   code, components) can respond to an actual customer need instead of being
   built in advance.
3. **Confirm each piece.** Early real feedback is the software form of
   one-piece flow: **一個ずつ確認**.

## Research-based adjustment

The three propositions hold. **One-piece flow and 一個ずつ確認 are part
of JIT.** **One-piece flow** (一個流し) is the ideal form of continuous
flow **under** JIT. **Vertical slice** is agile/LeSS language, not a
Toyota term. **一個ずつ確認** is Terry's name for that flow's quality
heart: confirm this piece before sending it on. English gloss:
piece-by-piece confirmation. A secondary story calls the origin
one-by-one confirmation. It is teaching language, not Toyota's official
name.

> **Under JIT, decompose the flow of user value into thin vertical slices,
> not into technical layers. The detailed solution is then pulled by a real
> customer need rather than built in advance. Each slice is confirmed before
> the next: 一個ずつ確認.**

[Claim 8](08-technical-excellence-enables-jit-coordination-in-less.md)
already says who can do this (feature teams) and how they keep one product
real (continuous integration). [Claim
11](11-physical-production-and-software-differences.md) already says the
software “piece” is a unique increment, not a copy of a known part. This
claim is the **shape of the requirement**: how the flow of user value is
cut so that pull and confirmation can happen.

### One-piece flow sits under JIT

Toyota's official TPS account puts continuous flow inside Just-in-Time:
synchronize processes so that only what is needed is made, when it is
needed, in the amount needed; do not let goods and information be held up.
[Claim 2](02-tps-and-lean-houses.md) already corrects the roof mistake:
flow is not the roof.

One-piece flow (一個流し) is the ideal of that continuity: one unit moves
from process to process without a batch queue between them. Toyota still
uses small lots where a process cannot yet flow one-by-one (stamping,
paint). The goal is the minimum inventory that keeps flow, not a slogan of
zero.

A vertical slice **imposes changeover**: the same feature team must
move across components and disciplines to finish one confirmable piece,
then a different mix for the next. AI is a common tool, not a second
unit of analysis. That local switching **is** an interruption of
component and discipline focus; what LeSS refuses to interrupt is the
customer-centric slice. The cost of the accepted interruption is why
horizontal programs and specialist queues reappear. Reducing it is
SMED-like kaizen
([Claim 5](05-smed-software-changeover-and-ai-friendly-context.md)).
Working several customer-centric items at once is how that changeover
cost reappears as **spill-over**. Vodde's 2020, 2024, and 2025
treatments are one argument, digested in
[Claim 5](05-smed-software-changeover-and-ai-friendly-context.md).
Heijunka of mix is the sequencing reason the factory alternates types
even when the mix is known; that argument lives in
[Claim 4](04-jit-assurance-resourcefulness-and-constraint.md).

### 一個ずつ確認 is why that flow learns

Batch-and-queue hides defects in the pile. Toyota's 1992 TPS booklet says
that if the next person finds a bad assembly after a lot of 100, they
cannot tell where in those 100 the problem occurred. One-piece flow keeps
the cause close to the people who created it. The 1973 TPS handbook tells
people to check the quality of what they just made—100% in-process
inspection—because the following process is the customer, and not a single
bad product should be released.

Japanese TPS teaching names the act **一個ずつ確認**: confirm one by one
that this piece is good before sending it to the next process. A secondary
English story, attributed by Chip Chapados to Mikio Kitano, says one-piece
flow was originally called **one-by-one confirmation** after 1934
engine-casting trouble. Toyota's own *75 Years* history does **not** use
either name, but it does record the family of problem: in August 1934,
after a cylinder-block mold was finally completed, machining revealed
pits; of ten cast blocks, only one or two survived boring. Defects were
discovered at the next process, after a small batch had already been made.

Toyota sources do support the operational point:

> **One-piece flow is not only shorter lead time. It is 一個ずつ確認:
> confirmation close enough to the work that the system can still learn.**

Jidoka is the stop when confirmation fails. JIT/flow is what makes that
failure visible on this piece rather than in a later pile. [Claim
3](03-jidoka-enables-jit-trusts-respect-grows.md) already pairs them.

### Horizontal slicing is software batch-and-queue

A **horizontal** split cuts by technical layer or component: all of the
schema, then all of the API, then all of the UI. Nothing a user can
confirm is done until the layers are stacked. That is process-layout
thinking: group the work by kind of machine or layer, then batch it
through. Ohno’s machining reorganization ran the other way—machines in
the sequence of the product, so a piece could flow.

A **vertical** slice cuts across whatever layers the current user-visible
change needs, and is done when the system is observably more valuable.
LeSS is explicit that “vertical” is only a diagram convention: there is no
up and down in software. The instruction is still clear:

> **Incrementally build architectural slices that tend to be
> vertical-cross-layer rather than horizontal-within-layer, driven by
> customer-centric features.**

LeSS feature teams exist to complete end-to-end customer features **one by
one**. Component teams are an organizational decision not to finish a
vertical slice inside one team; integration and user confirmation wait on
a later batch. [Claim 12](12-respect-for-people-who-can-think.md) uses
“vertical” for a different picture (capability built down the management
line; value flowing across to the product). On stage, keep those two
metaphors from colliding.

### The lower-level solution is pulled by the slice

“Lower-level solution” here is the detailed design, code, and technical
structure—not a lower-priority backlog. [Claim
4](04-jit-assurance-resourcefulness-and-constraint.md) already says: do
not compensate for uncertainty by accumulating everything in advance.
[Claim 5](05-smed-software-changeover-and-ai-friendly-context.md) already
warns that a large queue of finely analyzed items is invested WIP.

LeSS's desire-line analogy is the same pull: wait to see where demand
actually walks, then pave. Design is pulled from demand rather than
speculatively pushed. Its **Take a Bite** practice is one-piece flow of
refinement: split off one tiny customer-centric fragment, understand it,
implement it, get feedback, and only then split more. Diagrams don't
crash; documents don't run.

A walking skeleton can still be justified when an architecturally
significant customer feature pulls it. That is not a license for a
horizontal “foundation first” program divorced from user value. LeSS
treats infrastructure and cleanup as backlog work given to a feature team
as if it were a customer-centric item, not as a permanent component queue.

### In software, 一個ずつ確認 includes value

[Claim 11](11-physical-production-and-software-differences.md) already
changes the unit: a software piece is a unique increment of an evolving
product, and a backlog item is a hypothesis, not consumption of a known
part. Factory one-piece flow confirms that *this copy* matches a known
standard. Software 一個ずつ確認 must also confirm that *this change* is
the right product:

| What is confirmed | Factory one-piece flow | Vertical slice of software |
|---|---|---|
| **Built-in quality** | This unit is good; the next process can use it | Tests, types, integration, and the running increment; jidoka stops known abnormalities |
| **Actual need** | The pulled part was needed downstream | A user or customer can see and respond to this thin increment |
| **What batching hides** | Which of the 100 was bad, and why | Whether the layer, platform, or generated design was even the right bet |

Passing checks is not customer confirmation. Cheap generation makes the
gap larger: output can look finished while remaining an unconfirmed
hypothesis.

## Emerging implication for the talk

A compact candidate, sitting next to Claims 2, 4, 8, and 11:

> **JIT: cut the flow of user value into thin vertical slices, and let
> those slices pull the detailed solution. One-piece flow is 一個ずつ確認:
> confirm each piece—quality and usefulness—before starting the next.
> Horizontal layers and unsplit generated solutions are batches.**

Useful on stage in Tokyo because **一個ずつ確認** is the memorable name.
The audience already knows “vertical slice” as agile hygiene. The TPS
move is to say *why*: it is how software keeps continuous flow and
confirms one piece at a time when the “piece” is a unique increment of
user value.

For AI-augmented development, generation makes horizontal overproduction
cheap: all the endpoints, all the schema, a complete design for an unsplit
epic. That is a batch of unconfirmed work. Prefer: pull one thin slice,
generate only the solution that slice needs, confirm with the shared
product and with a person who can judge value, then take the next bite.

## Questions still open

- How much Japanese to keep on an English slide: **一個ずつ確認** alone,
  with the gloss piece-by-piece confirmation, or both with 一個流し?
- Is “lower-level solution” only the technical design, or also the smaller
  PBI produced by splitting? The research reading is the former; the
  original sentence can be heard as both.
- What one pair of splits belongs on stage: the same requirement cut
  horizontally versus vertically, with when confirmation becomes possible?
- When is a walking skeleton still a pulled, architecturally significant
  slice, and when is it foundation-first overproduction?
- How sharply should Take a Bite (split one fragment, implement, then
  split more) be distinguished from splitting a whole requirement tree
  up front?
- Does AI change the thinnest honest slice (a generated walking path a
  user can try) or only the temptation to generate the remaining tree?

## Sources consulted

1. Toyota Motor Corporation, [Toyota Production
   System](https://global.toyota/en/company/vision-and-philosophy/production-system/).
   JIT as synchronizing processes in continuous flow; make only what is
   needed, when needed, in the amount needed; do not let goods and
   information be held up.
2. Toyota Motor Corporation, [“Researching Casting
   Technology”](https://www.toyota-global.com/company/history_of_toyota/75years/text/taking_on_the_automotive_business/chapter2/section3/item2.html),
   *75 Years of Toyota*. 1934 Type A cylinder blocks: pits discovered at
   machining; of ten castings, one or two survived boring.
3. Toyota Motor Corporation, *The Toyota Production System* (1992 booklet),
   as discussed in Mark Graban, [“One-Piece Flow: What Toyota's 1992
   Booklet Shows With
   Numbers”](https://www.leanblog.org/2026/06/one-piece-flow-toyota-1992/).
   Batch of 100 hides where a defect occurred; one-piece flow keeps cause
   close to the work.
4. Toyota Motor Corporation, *Toyota Production System Basic Handbook*
   (1973 English translation). 100% in-process inspection; the following
   process is the customer; do not release a bad product.
5. Chip Chapados summarizing Mikio Kitano, in Michel Baudin, [“Origin of
   One-Piece Flow at
   Toyota”](https://michelbaudin.com/2015/02/01/origin-of-one-piece-flow-at-toyota-chip-chapados-linkedin/).
   Secondary oral claim that one-piece flow was originally called
   one-by-one confirmation. Not a Toyota publication.
6. The LeSS Company, [Architecture &
   Design](https://less.works/less/technical-excellence/architecture-design).
   Desire lines: design pulled from demand; incrementally build vertical
   architectural slices of customer-centric features; “there is no
   ‘vertical’ in software.”
7. The LeSS Company, [Feature
   Teams](https://less.works/less/structure/feature-teams). Long-lived
   teams that complete end-to-end customer features one by one;
   component teams prevent that completion inside one team.
8. The LeSS Company, [Introduction to
   LeSS](https://less.works/less/framework/introduction). Product is not a
   component, platform, layer, or library; **Take a Bite**: split off one
   tiny customer-centric fragment, implement, then split more; diagrams
   don't crash and documents don't run.
9. The LeSS Company, [Customer-Centric
   Thinking](https://less.works/less/principles/customer-centric). Feature
   teams and one ordered backlog keep work connected to paying customers.
10. Taiichi Ohno (1988), [*Toyota Production System: Beyond Large-Scale
    Production*](https://www.routledge.com/Toyota-Production-System-Beyond-Large-Scale-Production/Ohno/p/book/9780915299140).
    1947 Koromo machine shop: from batches of one process type to machines
    in product sequence so a piece can flow.
11. Hirayama Consulting, [1個流し生産方式](https://genbakaizen.com/ja/consulting/method/me_ikko/).
    Japanese TPS teaching: the operator confirms one by one that the piece
    is good before sending it to the next process. Teaching language, not
    a Toyota publication.

**Talk name is 一個ずつ確認. Still open for how much Japanese sits on
the English slide, and one on-stage split example.**
