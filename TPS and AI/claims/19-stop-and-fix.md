# Claim 19: Stop & Fix is the culture of actually responding to a jidoka signal; a detector everyone continues past is a dashboard

**Status: Provisional — Stop & Fix kept as the English; Toyota's
exception is who stops, not a plant-wide freeze; fail-fast is jidoka
in the product**

## Claim

> **Jidoka already includes detecting an abnormality and making it
> visible so people should stop. Stop & Fix is the organizational
> culture of actually doing that: the courage to halt, contain, fix,
> and prevent recurrence rather than work around the signal.** A
> detector everyone continues past—an automated test, a fail-fast, a
> CI service, a noticed anomaly, or a known bug—is a dashboard, not
> jidoka. The culture also believes stopping first is the most
> efficient way, a belief TPS philosophy enables. AI makes continuing
> past the signal cheaper and the cost of doing so larger; the culture
> therefore matters more.

Toyota names the pillar **jidoka**, not Stop & Fix: detect, stop
(machine or person), make visible (**andon**), prevent recurrence, and
free people from watching. The andon is the display, not the stop.
Jidoka, like an automated test or a CI service, **shows** the problem.
People **should** stop. Whether they **will** stop, or keep going
despite the signal, is culture. The same split holds for
**non-automated** jidoka: someone has already noticed an anomaly, or
a known bug is still unfixed. The noticed anomaly, or the known bug,
is the cord. Culture decides whether anyone pulls it.

**Stop & Fix** is the English for this idea. The lean-thinking house
promotes it; LeSS CI says “DO ‘stop and fix’ when the build breaks,”
and fixing the broken build is first priority; a failing automated
suite is a huge queue. Liker names a Toyota Way *culture* of stopping
to fix—2004 Principle 5, 2021 Principle 6—with rapid support to
contain, then solve. That is Stop & Fix: the courage to stop and fix
first, and the belief that this is the most efficient way.

Tests, fail-fast, and a **CI service** are detectors. They count as
jidoka only if work actually stops. The talk says **CI
service**—[Claim 21](21-ci-practice-is-not-a-ci-system.md) owns that
name. LeSS compared the safety net to an andon and called it a CI
system.

[Claim 3](03-jidoka-enables-jit-trusts-respect-grows.md) owns the
right to stop. [Claim 6](06-jidoka-embeds-routine-judgment.md) owns
where that judgment lives. [Claim
00](00-judgment-intensive-work.md) owns the terminology. This claim
names **human-triggered jidoka**: the andon cord still needs a person,
and pulling it makes the abnormality emergent judgment-intensive work.
That is not Claim 6's judgment-stacking failure. [Claim
20](20-poka-yoke-supports-jidoka.md) owns poka-yoke. [Claim
24](24-warnings-as-stop-no-news-is-good-news.md) owns leftover
warnings as unpaid judgment. This claim owns the
**halt**—as culture, not as an automatic consequence of the
detector.

### Toyota's exception is not a parked red

Stop-the-line does not mean blindly stopping all work. The mechanism is
**fixed-position stop** (Liker and Meier): cord or call button →
yellow; the line continues to the end of the work zone; if resolved in
that window, the line never stops; if not, it stops at the fixed
position and the andon turns red.

Signal immediately; designed response window; then halt if unresolved.
In software, a red CI service does not mean everybody drops current
work and starts fixing the build. The people who broke it stop and
fix. Everyone else stops **pushing to the trunk** until it is fixed.
That is the analogue of the yellow window: the flow is contained; it
is not a plant-wide freeze. LeSS's analogue is a **multi-stage CI
system**. Parking a red test, suppressing a type error, or merging on
a red mainline is **not** that exception. The abnormality must not
become normal inventory.

A justified stop does not mean that no work or output follows. It
halts multiplication or propagation of the abnormality, makes the
abnormality current work, and spends live judgment on containment,
repair, and prevention before later output inherits the problem. Not
every interruption is justified; the signal and the designed response
boundary matter.

On stage, one sequence: signal → response window → halt or new
intention → prevent recurrence. The cord belongs as the human
detector—a noticed anomaly, a known bug—not as a factory recitation
competing with that sequence.

### Software methods

| Method | Detects | Stop & Fix requires |
|---|---|---|
| **Automated tests** | A known scenario no longer holds | The failing test is the current work, not a parked queue. |
| **Fail-fast** | An illegal or unexpected condition now, in the product itself | Same jidoka as a test: do not swallow it. Shore: fail immediately and visibly, against **failing slowly**. Make the abnormality visible to people who can respond. |
| **CI service** | The integrated product is not in the agreed working state | The people who broke it stop and fix; others stop pushing to the trunk until it is green. A CI service is not CI ([Claim 21](21-ci-practice-is-not-a-ci-system.md)). |
| **Noticed anomaly / known bug** | A person already sees out-of-standard work | Treat it as the cord: stop and fix first, not as inventory to work around. |

Fail-fast does not need its own beat. It is jidoka like an automated
test, built into the product rather than as a byproduct of a suite.
“Built-in” often means: do not add blink recovery just because the
code is in production—keep it simple; a visible failure is a friend.

Tests are often the cheapest re-runnable closed question ([Claim
6](06-jidoka-embeds-routine-judgment.md)); they are not sufficient.
Generation makes it cheap to continue past the signal. Claim 6 already
has: do not delete the stop to proceed. This claim adds only that the
red check is the **current work**, not a second item in parallel, and
that whether anyone treats it as current work is culture.

## Implication for the talk

> **Jidoka without Stop & Fix is a dashboard. The detector only shows
> the problem; culture decides whether people actually stop, contain,
> and learn. AI makes continuing past the signal cheaper and the
> consequence of doing so worse; the culture therefore matters more.**

The preceding beat is the andon cord as **human-triggered jidoka**:
emergent judgment-intensive work that spends live judgment to contain
the abnormality before more output inherits it. Fail-fast sits with
tests and types. One red check treated as the work—not a second agent
tasked while the suite stays red.

## Questions still open

None remaining on this claim.

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
