# Claim 19: Stop & Fix is actually responding to a jidoka signal; a detector everyone continues past is a dashboard

**Status: Provisional — initial reconciliation; TPS / Toyota Way / LeSS
layers sourced; Toyota's exception is fixed-position stop, not a parked
red; not a finalized talk beat**

## Claim

> **Jidoka already includes stopping when an abnormality is detected.
> Stop & Fix is LeSS's name for actually doing that: contain, fix, and
> prevent recurrence, rather than working around the signal.** A test,
> a fail-fast, or a CI service that everyone continues past is a
> dashboard, not jidoka.

This corrects the original hypothesis on five points. Toyota names
**jidoka**, not Stop & Fix; “stopping immediately when abnormalities
are detected” is inside that pillar. **Stop & Fix** is LeSS English
(lean-thinking foundation; CI: “DO ‘stop and fix’ when the build
breaks”). Liker names a Toyota Way *culture* of stopping to fix—2004
Principle 5, 2021 Principle 6. Tests, fail-fast, and a **CI service**
are detectors; they count as jidoka only if work actually stops.
Ranking tests as “main” is Terry's, not a source fact. Shore contrasts
fail-fast with **failing slowly** (workaround, default, catch-all),
not with “defensive programming.” LeSS compared the safety net to
andon and called it a **CI system**. The talk says **CI
service**—[Claim 21](21-ci-practice-is-not-a-ci-system.md) owns that
name.

[Claim 3](03-jidoka-enables-jit-trusts-respect-grows.md) owns the
right to stop. [Claim 6](06-jidoka-embeds-routine-judgment.md) owns
where that judgment lives. [Claim
20](20-poka-yoke-supports-jidoka.md) owns poka-yoke. This claim owns
the **halt**.

## What the research supports

| Layer | What is named |
|---|---|
| **TPS / jidoka** | Detect, stop (machine or person), make visible (**andon**), prevent recurrence, free people from watching. The andon is the display, not the stop. Plant tour: work does not resume until the problem is resolved. |
| **Toyota Way (Liker)** | A culture of stopping to identify out-of-standard conditions and build in quality. Rapid support to contain, then solve. |
| **LeSS** | Foundation: promote stop-and-fix. CI: fail fast, stop & fix, learn without blame; fixing the broken build is first priority. Testing: a failing automated suite is a huge queue. |

### Toyota's exception is not a parked red

LeSS is right that stop-the-line does not mean blindly stopping all
work. The mechanism is **fixed-position stop** (Liker and Meier):
cord or call button → yellow; the line continues to the end of the
work zone; if resolved in that window, the line never stops; if not,
it stops at the fixed position and the andon turns red.

Signal immediately; designed response window; then halt if unresolved.
LeSS's analogue is a **multi-stage CI system**. Parking a red test,
suppressing a type error, or merging on a red mainline is **not** that
exception. The abnormality must not become normal inventory.

### Software methods

| Method | Detects | Stop & Fix requires |
|---|---|---|
| **Automated tests** | A known scenario no longer holds | The failing test is the current work, not a parked queue. |
| **Fail-fast** | An illegal or unexpected condition now | Do not swallow it. Shore: fail immediately and visibly. In production, make the abnormality visible to people who can respond—not silently continue, and not an unexplained crash. |
| **CI service** | The integrated product is not in the agreed working state | Do not keep merging or starting the next slice on a red mainline. A CI service is not CI ([Claim 21](21-ci-practice-is-not-a-ci-system.md)). |

Tests are often the cheapest re-runnable closed question ([Claim
6](06-jidoka-embeds-routine-judgment.md)); they are not sufficient.
Generation makes it cheap to continue past the signal. Claim 6 already
has: do not delete the stop to proceed. This claim adds only that the
red check is the **current work**, not a second item in parallel.

## Implication for the talk

> **Jidoka without Stop & Fix is a dashboard. Tests, fail-fast, and a
> CI service only count when the team actually stops, contains, and
> learns. AI makes continuing past the signal cheaper; the discipline
> therefore matters more.**

On stage, one red check treated as the work—not a second agent tasked
while the suite stays red.

## Questions still open

- Is **Stop & Fix** the memorable English, or Toyota's “stop
  immediately…” or Liker's culture wording?
- How much andon / cord on a Tokyo slide versus one software sequence
  (signal → response window → halt or new intention → prevent
  recurrence)?
- Does fail-fast need its own beat, or is it an example under tests
  and types?

## Sources consulted

1. Toyota Motor Corporation, [Toyota Production
   System](https://global.toyota/en/company/vision-and-philosophy/production-system/).
   Jidoka: stop immediately when abnormalities are detected; machine
   stop or operator stop cord; andon; prevent recurrence.
2. Toyota Motor Corporation, [Toyota Virtual Plant Tour: Toyota
   Production
   System](https://global.toyota/en/company/plant-tours/production-system/).
   Call button lights the andon; work does not resume until the
   problem is resolved.
3. Jeffrey K. Liker (2021), *The Toyota Way*, second edition,
   Principle 6: stopping to identify out-of-standard conditions and
   build in quality. 2004 first edition: Principle 5, “stopping to fix
   problems, to get quality right the first time.”
4. Jeffrey K. Liker and David Meier (2006), *The Toyota Way
   Fieldbook*. Fixed-position stop. Cited by LeSS as [LM06a].
5. Craig Larman and Bas Vodde (2009), lean-thinking house in [Claim
   2](02-tps-and-lean-houses.md). Foundation: promote stop-and-fix.
6. Large-Scale Scrum, [Continuous
   Integration](https://less.works/less/technical-excellence/continuous-integration).
   CI system as andon; stop & fix when the build breaks; multi-stage
   CI as analogue of fixed-position stop.
7. Large-Scale Scrum, [Thinking About
   Testing](https://less.works/less/technical-excellence/thinking-about-testing).
   Test fails → stop and fix; failing tests as a huge queue.
8. Jim Shore (2004), [“Fail
   Fast”](https://www.martinfowler.com/ieeeSoftware/failFast.pdf),
   *IEEE Software*. Fail immediately and visibly; a crash is never
   appropriate—use a global handler so people can respond.

**Layer and halt sourced. Label, andon-versus-software-sequence, and
whether fail-fast is its own beat remain live.**
