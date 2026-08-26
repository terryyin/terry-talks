# Claim 11: Software mixes production and discovery inside a product that is also the process

**Status: Provisional — working hypothesis formed from research; not
Terry's original wording**

## Original question

> Which differences between physical production and software development
> materially change how pull, small batches, jidoka, and changeover reduction
> work?

[Claim 1](01-tps-reasoning-not-mechanisms.md) already says software has a
different mixture of production, discovery, and change, and that the
useful transfer is Toyota's system reasoning, not a literal copy of
mechanisms. [Claim 3](03-jidoka-enables-jit-trusts-respect-grows.md)
points here for how those differences change pull, batches, jidoka, and
changeover.

## Working hypothesis

> **Software work is neither a factory making identical units nor a lab
> doing only discovery. It is a mixture of production-like and
> discovery-like activity inside one evolving product that is also the
> production system. That mixture changes the units, signals, and inventory
> of pull, small batches, jidoka, and changeover. The transferable content
> is still the relationships: do not stockpile unverified work; expose and
> contain known abnormalities; respond and improve capability.**

Do not reduce the distinction to “production versus discovery.” Physical
production already includes discovery (kaizen, problem solving, new-model
introduction). Software already includes production-like work (builds,
tests, integration, deployment, operations, repeating a known procedure).
The mistake is to treat either domain as only one of those modes.

## Research-based adjustment

The hypothesis holds. Toyota itself did not treat production and product
development as one system. The software mapping fails when it copies
factory mechanisms, and it also fails when it discards TPS because
“software is knowledge work.”

### Toyota already distinguished production from development

Toyota's official TPS account is a **way of making things**: synchronize
plants and processes so that more than 30,000 parts become vehicles
quickly, cheaply, and without defect. Jidoka and Just-in-Time are the
pillars of that operating system.

Toyota's product-development system evolved in separate organizational
units. Morgan and Liker report that most Toyota product-development
managers claimed limited knowledge of TPS, and that engineers did not
treat TPS as the launching point for lean development. Larman and Vodde
summarize Toyota's two main processes as:

- **Development — out-learn** the competition by generating, using, and
  remembering useful knowledge.
- **Production — out-improve** the competition through short cycles, small
  batches and queues, stop-and-fix, and relentless waste removal.

They add that these are not mutually exclusive: development also
improves, and production also learns. Poppendieck's mapping is the same
kind of move: software development is part of **product development**;
transfer **principles**, not manufacturing practices.

So the talk should not present TPS as Toyota's only relevant system, nor
present software as a plant. LeSS sits closer to lean product development
of a software product, using production-like technical excellence so that
the evolving product can be pulled, stopped, and improved.

### Four material differences

These properties change the four mechanisms. They do not cancel the
relationships.

| Difference | Physical production | Software development |
|---|---|---|
| **What is being made** | Many copies of a designed product on a relatively stable factory. | Usually one evolving product. Copying the bit pattern is nearly free; the scarce work is changing the design. |
| **Product and process** | Product and production system are distinct. Changing the car is not the same act as changing the line. | The codebase **is** the factory for later work. Each change can alter the environment for the next change. |
| **Inventory** | Physical stock occupies space, ties cash, and is visible. | Inventory is information: unvalidated decisions, unintegrated code, unread specifications, generated-but-unreviewed candidates. It is physically and financially easy to miss. |
| **Unit of work** | Often a repeating, comparatively homogeneous unit (a part, a vehicle). | Non-repeating, non-homogeneous items with different delay costs and loads. Brooks's point still applies: above the statement level, no two parts are alike; repeated structure is abstracted away. |

Brooks is about essential complexity of the design, not a claim that
builds and deploys cannot be made routine. The production-like parts of
software **can** be stabilized. The design of what the product should
become cannot be reduced to repeating a known part.

Reinertsen's economic contrast is the operational version of the same
fact. Manufacturing methods were optimized for more predictable,
repetitive, homogeneous flow, including FIFO sequencing. Product
development has higher variability and non-homogeneous delay costs, so
FIFO is rarely economically optimal. Some of that variability is the
work: without it, nothing new is done. Some of it is waste: flaky
environments, interrupt-driven multitasking, and requirement churn from
deciding too early.

LeSS's queueing guidance already refuses the binary. New product
development is not predictable repetitive manufacturing, and analogies
are fragile. Yet short cycles, small batches, stop-and-fix, visual
management, and queueing insight **do** transfer, because they come
partly from high-variability network flow, not only from a stamping
press.

### How pull changes

In TPS, pull means making only what is needed, when it is needed, in the
amount needed. The supermarket loop replenishes a **known** part after
actual pickup. Hopp and Spearman argue that the operational core of pull
is an **explicit WIP cap**, not the metaphor of tugging material.

In software, three different signals get called “pull,” and they are not
the same:

1. **A backlog item is a hypothesis**, not consumption of a known part.
   Selecting it authorizes discovery and production of a unique change.
   It does not prove that the change is needed in the TPS sense.
2. **WIP limits** on unfinished items are the Hopp–Spearman pull: they
   stop inventory of partially done work from growing without bound.
   Poppendieck's inventory is exactly that: anything started and not
   done.
3. **Evidence from the evolving shared product**—a failed integration, a
   failing check, a user using a done increment—is closer to actual
   pickup. [Claim
   3](03-jidoka-enables-jit-trusts-respect-grows.md) therefore translates
   JIT collaboration as **Whole Product Focus**: integration conflict
   pulls collaboration because a cohesive customer-centric solution is a
   common interest.

The material change is the **weakness of the customer-consumption
signal** and the **invisibility of inventory**. Physical kanban is
visible on bins. Software inventory is bits on a disk. LeSS treats
queues of specifications, unintegrated code, and untested components as
WIP that hides defects and delays feedback. Plan A is to eradicate those
queues by changing the system (feature teams, continuous integration),
not to run a factory kanban on a waterfall.

AI tightens this. Cheap generation creates more candidate inventory, not
more validated need. Pulling a generated patch because it was easy to
make is push.

### How small batches change

In production, a small batch is fewer identical units before changeover.
The economic gain is less inventory, faster mix response, and quicker
discovery of defects in the batch.

In software, a small batch is a **small unique increment of an evolving
product**: a small done item, a small integrated change, a small release.
The batch is not “one more copy of the same car.” Transaction cost is
thinking, setup, verification, and integration, not only machine setup.
How to cut that increment from the requirement—a thin vertical slice of
user value, not a technical layer, confirmed by 一個ずつ確認—is
[Claim 17](17-jit-vertical-slicing-one-piece-flow.md).

LeSS already connects this to queueing: large variable batches of
features, documents, or unintegrated code lengthen cycle time
nonlinearly. Naive appeal to Little's Law is not a guarantee in
high-variability software work; reducing WIP remains worthwhile because
it is inventory, hides defects, and reduces transparency.

Set-based concurrent engineering shows another non-factory use of
“many”: Toyota explores **sets of alternatives** in development to
out-learn, then converges. That is not overproduction of identical
vehicles. In AI-augmented work, generating many candidates can be
set-based learning **or** overproduction, depending on whether the
extras are used to learn and then discarded, or left as unverified
inventory. Whether those extras stayed isolated, or had already been
assimilated into the trunk, is
[Claim 23](23-ci-and-disposable-prototypes-tension-pair.md).

### How jidoka changes

Toyota's jidoka detects a **specifiable abnormality**—a broken thread, a
machine fault, poor quality, a work delay—stops, makes it visible, and
brings people to respond and prevent recurrence. The loom example works
because the abnormal condition can be engineered into the machine after
people have learned the work by hand.

Software can do the same for **known, executable conditions**: the build
breaks, a regression fails, a type is wrong, an invariant is violated, a
deploy rolls back. That is the jidoka side of a **CI system**
([Claim 21](21-ci-practice-is-not-a-ci-system.md)), which can support
the continuous-integration practice in
[Claim
8](08-technical-excellence-enables-jit-coordination-in-less.md), and
the judgment-embedding loop in [Claim
6](06-jidoka-embeds-routine-judgment.md).

The material limit is that many software abnormalities are **semantic**.
A missing bolt can be sensed as presence or absence. “This is the wrong
product,” “this design will not age,” and “this generated function
matches the tests but not the need” cannot be reduced to a thread-break
sensor. Poka-yoke and tests encode prior learning; they do not replace
judgment of value, usefulness, or sufficiency of evidence. [Claim
20](20-poka-yoke-supports-jidoka.md) owns poka-yoke;
this claim owns the semantic limit.

AI makes the limit sharper, not weaker. Generated output can look
finished while remaining unverified. Jidoka still belongs on every
condition the team has learned to specify. It cannot autonomate the
novel exception. That is why [Claim
1](01-tps-reasoning-not-mechanisms.md) keeps people responsible for
customer value and acceptable risk.

### How changeover reduction changes

[Claim 5](05-smed-software-changeover-and-ai-friendly-context.md) already
maps SMED and where that analogy breaks. The domain reason is the
product-as-process difference above: a die change returns a machine to a
**known production mode**; a software changeover reconstructs purpose,
code, and environment in a **product that has itself changed**.
Manufacturing setup is mostly non-value-adding overhead; rebuilding a
software mental model often includes necessary learning.

Cheap changeover still matters: high setup cost makes large batches look
efficient. The unit of improvement is organizational, technical, and
cognitive readiness—not swapping a physical die.

## Emerging implication for the talk

Use this claim as the boundary on every TPS-to-software mapping:

> **Copy the relationships, not the factory. Software mixes production-like
> delivery with discovery inside one product that is also the process.**

A compact sequence for the four mechanisms:

> **Pull from evidence of actual need, not from cheap generation. Keep
> batches of unique change small enough to learn. Stop known
> abnormalities automatically. Make the next valuable change cheap to
> start and fast to verify. Leave novel judgment with people.**

For AI-augmented development, the factory temptation is stronger because
candidates become cheap to produce. That does not turn software into
vehicle assembly. It increases invisible inventory and moves the
bottleneck to review, integration, and judgment. The TPS relationships
become more important, not less, provided the talk does not pretend a
backlog ticket is a kanban for a known part, or that a passing test is
the same as a thread-break stop.

## Questions still open

- Which concrete talk example best shows all four mechanism changes in
  one sequence: a pulled item, a small integrated change, a jidoka stop,
  and a cheap next changeover?
- When is exploring multiple AI-generated alternatives set-based
  learning, and when is it overproduction of intellectual inventory?
- Which software work is stable enough to treat as production (repeatable
  checks, deploys, operational procedures), and which must remain
  discovery?
- Does operations of a running service belong in this claim as a third
  mode—production of the live system—or should the talk keep the
  comparison to development of the product?
- How far can Hopp and Spearman's WIP-cap definition of pull be used on
  stage without being heard as “kanban the backlog”?

## Sources consulted

1. Toyota Motor Corporation, [Toyota Production
   System](https://global.toyota/en/company/vision-and-philosophy/production-system/).
   TPS as a way of making things; jidoka as detecting specifiable
   abnormalities and stopping; JIT as synchronizing processes to make
   only what is needed, when needed, in the amount needed; the 30,000-part
   coordination problem.
2. James M. Morgan and Jeffrey K. Liker (2006), [*The Toyota Product
   Development System: Integrating People, Process, and
   Technology*](https://www.routledge.com/The-Toyota-Product-Development-System-Integrating-People-Process-and-Technology/Morgan-Liker/p/book/9781563272820).
   TPS and Toyota product development evolved in separate organizational
   units; development managers reported limited knowledge of TPS.
3. Craig Larman and Bas Vodde (2009), [*Lean
   Primer*](https://leanprimer.com/downloads/lean_primer.pdf), and The
   LeSS Company, [Lean
   Thinking](https://less.works/less/principles/lean-thinking).
   Development as out-learning and production as out-improving; NPD is
   not repetitive manufacturing; analogies are fragile; short cycles,
   small batches, and stop-and-fix still transfer.
4. The LeSS Company, [Flow & Queueing
   Theory](https://less.works/less/principles/queueing_theory). Invisible
   WIP as bits; queues of specifications, unintegrated code, and untested
   components; Plan A eradicate queues by changing the system; caution
   against naive Little's Law in high-variability software work.
5. Mary Poppendieck, [interview on Lean for
   software](https://6sigma.com/lean-for-software-interview-with-mary-poppendieck/).
   Software as product development; transfer principles rather than
   manufacturing practices; inventory as partially done work.
6. Mary Poppendieck and Tom Poppendieck (2003), [*Lean Software
   Development: An Agile
   Toolkit*](https://www.informit.com/store/lean-software-development-an-agile-toolkit-9780321150783).
   Maps manufacturing inventory to partially done work and
   overproduction to extra features.
7. Donald G. Reinertsen (2009), [*The Principles of Product Development
   Flow*](http://lpd2.com/wp-content/uploads/2013/06/ReinertsenFLOWChap1.pdf)
   (ch. 1). Manufacturing optimized for more repetitive, homogeneous
   flow; product-development inventory is physically and financially
   invisible; some variability is required for innovation.
8. Wallace J. Hopp and Mark L. Spearman (2004), [“To Pull or Not to Pull:
   What Is the
   Question?”](https://doi.org/10.1287/msom.1030.0028), *Manufacturing
   & Service Operations Management*, 6(2), 133–148. Pull as an explicit
   WIP limit rather than the metaphor of tugging material.
9. Frederick P. Brooks Jr. (1987), [“No Silver Bullet—Essence and
   Accidents of Software
   Engineering”](https://doi.org/10.1109/MC.1987.1663532), *Computer*,
   20(4), 10–19. Software entities are unlike automobiles in that
   repeated elements are abstracted away; essential complexity of the
   design remains.
10. Durward K. Sobek II, Allen C. Ward, and Jeffrey K. Liker (1999),
    [“Toyota's Principles of Set-Based Concurrent
    Engineering”](https://sloanreview.mit.edu/article/toyotas-principles-of-setbased-concurrent-engineering/),
    *MIT Sloan Management Review*. Development explores sets of
    alternatives rather than producing one repeating design as if it
    were a production run.

**Working hypothesis ready for Terry to accept, adjust, or reject.**
