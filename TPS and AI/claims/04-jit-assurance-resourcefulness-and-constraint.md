# Claim 4: JIT creates assurance through resourceful capability, not abundance

**Status: Provisional — not a demonstrated worker feeling**

## Original claim / hypothesis

Just-in-Time may give people a sense of assurance:

> **We do not have to prepare everything in advance. We can handle the need
> when it comes.**

Perhaps this confidence comes from having free capacity—even capacity that a
conventional utilization measure might label excessive. A person can remain
calm because the system has enough room to respond rather than needing every
resource to be busy in advance.

## Reconciled claim

> **JIT replaces confidence from stockpiles with confidence in a capable
> response.** Jidoka is one of the mechanisms that makes that confidence
> workable.

This is not confidence based on abundance. It is confidence that actual demand
can be met by a coordinated, flexible, reliable, and continually improving
system.

The people-side reading is settled in
[Claim 3](03-jidoka-enables-jit-trusts-respect-grows.md): JIT **entrusts**
capable people close to the work with a resourceful response to actual need.
That is Terry's reading of JIT's intention, not Toyota's definition, and not a
report that workers feel trusted or calm. Mutual trust sits under Respect for
People. This claim is about the **source of assurance**—capability instead of
inventory.

### Before, during, postwar, recovery

**Before.** Kiichiro Toyoda was already using Just-in-Time while planning
Toyota's new automobile plant. When the Koromo Plant began operating in 1938,
each process was to make only the required daily quantity and stop after
delivering it. His reasoning is a coordination problem: a mountain of parts
cannot make a car if one necessary part is missing, and money alone cannot
organize tens of thousands of parts.

**During.** Wartime control and material rationing made that system impossible
to sustain; Toyota suspended it.

**Postwar.** Occupation, GHQ production permissions, the Dodge Line
contraction, and the 1949–1950 crisis—unsold vehicles trapping scarce
funds—shaped experiments. Toyota had old equipment, few orders, limited funds,
and a severe productivity disadvantage relative to U.S. mass producers.
Toyota's early English-language TPS account connects Japan's lack of natural
resources to eliminating waste and making full use of people's capabilities.
Constraint was real; it did not mechanically create JIT. Irregular supplier
deliveries hindered experiments. Nissan faced much of the same environment and
developed a different system. Limited finance may matter more than scarce
material: low inventory avoids trapping cash and space, but production still
needs reliable material when it is triggered.

**Recovery.** Japan regained sovereignty in 1952. Toyota dates full realization
of JIT to the supermarket method and kanban from 1954, through a long effort
to close the productivity gap with American manufacturers.

> **Kiichiro conceived JIT before the war. Wartime controls interrupted it.
> Toyota made it a practical system through postwar experiment and recovery.**

COVID and the Russia–Ukraine war are a modern analogue of that interruption,
not a refutation of capable response. That argument is
[Claim 15](15-extreme-conditions-interrupt-jit.md).

> **Do not compensate for uncertainty by accumulating everything in advance.
> Improve the organization's ability to detect actual need, coordinate a
> response, and learn from every failure to respond.**

### Unused capacity after need is met is not excess capacity

JIT does not require every machine and person to remain busy. At Koromo, a
department shut down its line once it had made and delivered the planned
quantity; a 1939 report says workers could leave when they completed the day's
target early. Producing more merely to keep a resource occupied is
overproduction.

That is not a prescription for **excessive** free capacity. Kiichiro's 1938
description called for neither shortage nor excess, including no excess labor
or time.

- **Inventory buffer:** reduce what is made early “just in case,” while
  keeping the minimum needed for a workable pull loop.
- **Unused capacity after need is met:** acceptable and preferable to
  overproduction.
- **Capacity cushion:** some headroom may be needed to absorb variation and
  respond quickly; leveling, maintenance, standard work, small lots, and
  flexible resources also reduce the variation that would demand a large
  cushion.
- **Excess capacity:** persistent capacity with no foreseeable need is a
  candidate for kaizen, not the source of JIT's efficiency.

Hopp and Spearman argue that variability must be buffered by some combination
of inventory, capacity, or customer waiting time. On their reading, Toyota
shifted part of that protection from inventory to **capacity**—maintenance and
recovery windows, and problem solvers available to support the line. As
variability fell, that cushion could shrink.

> **Bounded, purposeful response capacity can replace some inventory. It is
> readiness held for variation, not unlimited slack held without a purpose.**

JIT therefore challenges **utilization as the definition of efficiency**. Idle
capacity can be visible and tolerated rather than turned into unneeded output.
TPS still asks whether people, equipment, and time can be used more
effectively.

Call this **operational confidence** or **readiness**:

> **We do not need to make it early, because we have built the capability to
> make it when it is needed.**

Felt assurance is not part of the definition of JIT. The organization can
enjoy the system while people still suffer stress—see
[Claim 3](03-jidoka-enables-jit-trusts-respect-grows.md).

### Resourcefulness is disciplined, distributed problem solving

Toyota emphasizes human wisdom, ingenuity, independent thinking, and kaizen—
not repeated heroic improvisation. Exact timing across thousands of parts
requires stable processes, standards, leveling, reliable equipment, supplier
coordination, clear pull signals, and small intentional buffers.

> **People closest to the work can recognize a gap, respond within a visible
> system, investigate its cause, and improve the system so that the response
> becomes more reliable next time.**

### Jidoka makes that confidence credible

The relationship runs both ways. The 1977 Toyota production-control account
explains that jidoka stops equipment when the required quantity has been made,
preventing overproduction, and stops abnormal or defective work so the problem
is visible.

- **Quantity control:** stop after the needed amount rather than continue for
  utilization's sake.
- **Quality containment:** do not let a defect travel through a low-inventory
  system.
- **Human capacity:** release people from continuously watching machines.
- **Agency and learning:** stop, call for support, and prevent recurrence.

JIT contributes the other side: with little surplus, unresolved trouble
affects flow quickly.

> **JIT removes the hiding places. Jidoka detects and contains what is
> exposed. People respond and kaizen makes the next response more capable.**

Heijunka, standardized work, maintenance, supplier relationships, team
support, and Respect for People are also required. Otherwise low buffers
become recurring crisis rather than dependable responsiveness.

## Emerging implication for the talk

> **JIT is not “we have plenty, so we can handle demand later.” It is “we have
> built the capability to respond to real need, so we do not have to produce
> early.”**

A compact candidate:

> **JIT replaces confidence from stockpiles with confidence in a capable
> response.** Jidoka makes that capability dependable.

For AI-augmented software development:

- Do not generate implementations, specifications, or backlog items early just
  because generation is cheap. That creates intellectual inventory.
- Pull a candidate from a real, current need and shorten the time from need to
  a verified response.
- Preserve headroom for review, diagnosis, integration, and unexpected
  problems instead of treating maximum utilization as the goal.
- Use tests, validation, observability, stop conditions, and rollback as forms
  of jidoka that make fast generation safe enough to pull on demand.
- Convert successful improvisation into clearer context, standards, tools, and
  automation so the same problem does not require heroics again.

The desired state is **fast, trustworthy response capacity**—not a stockpile of
generated answers or an army of idle agents.

## Questions still open

- What level of headroom is necessary for responsiveness without becoming
  waste, and how is that decision made under variable demand?
- Which supporting conditions are indispensable before inventory or work in
  progress can safely be reduced?
- In AI-augmented development, what is the relevant capacity: developer
  attention, model calls, test throughput, review bandwidth, deployment
  capacity, or the ability to restore context quickly?

## Sources consulted

1. Toyota Motor Corporation, [“The Origins of
   Just-in-Time”](https://www.toyota-global.com/company/history_of_toyota/75years/text/taking_on_the_automotive_business/chapter2/section4/item5.html),
   *75 Years of Toyota*. Prewar conception, 1938 Koromo launch, wartime
   suspension, and 1954 supermarket method.
2. Toyota Motor Corporation, [Toyota Production
   System](https://global.toyota/en/company/vision-and-philosophy/production-system/).
   Minimum buffers, pull, human ingenuity, jidoka, and Kiichiro's
   coordination and capital concern.
3. Toyota Motor Corporation, [The
   Beginnings](https://global.toyota/en/company/trajectory-of-toyota/history/01/).
   GHQ production permissions, the Dodge Line, the 1950 crisis, and postwar
   reconstruction.
4. Toyota Motor Corporation, [“Dodge Line Recession and liberalization of
   vehicle production and
   sales”](https://www.toyota-global.com/company/history_of_toyota/75years/text/taking_on_the_automotive_business/chapter2/section6/item6.html),
   *75 Years of Toyota*. Financial contraction, falling demand, accumulated
   inventory, and material costs.
5. Taiichi Ohno (1988), [*Toyota Production System: Beyond Large-Scale
   Production*](https://www.routledge.com/Toyota-Production-System-Beyond-Large-Scale-Production/Ohno/p/book/9780915299140).
   Postwar productivity challenge, waste, pull, and autonomation.
6. Y. Sugimori, K. Kusunoki, F. Cho, and S. Uchikawa (1977),
   [“Toyota production system and Kanban system: Materialization of
   just-in-time and respect-for-human system”](https://doi.org/10.1080/00207547708943149),
   *International Journal of Production Research*, 15(6), 553–564. JIT,
   jidoka, visible problems, worker authority, and improvement
   responsibility.
7. Hugo van Driel and Wilfred Dolfsma (2009), [“Path dependence, initial
   conditions, and routines in organizations: The Toyota production system
   re-examined”](https://doi.org/10.1108/09534810910933906), *Journal of
   Organizational Change Management*, 22(1), 49–72. Challenges simple
   explanations based on postwar scarcity and fragmented demand.
8. U.S. Department of State, Office of the Historian, [“Occupation and
   Reconstruction of Japan,
   1945–52”](https://history.state.gov/milestones/1945-1952/japan-reconstruction).
   Background on the U.S.-led Allied occupation.
9. Wallace J. Hopp and Mark L. Spearman (2004), [“To Pull or Not to Pull: What
   Is the Question?”](https://doi.org/10.1287/msom.1030.0028), *Manufacturing &
   Service Operations Management*, 6(2), 133–148. Inventory, capacity, and
   time as alternative buffers for variability; Toyota's capacity buffering.
10. Joel G. Brawner, Gregory A. Harris, and Gerard A. Davis (2022), [“Will the
    real relationship between lean and safety/ergonomics please stand
    up?”](https://doi.org/10.1016/j.apergo.2021.103673), *Applied Ergonomics*,
    100, 103673. Tests felt assurance against reported JIT-related stress.

**Still open for talk choices on headroom and AI capacity.**
