# Claim 19: Stop & Fix is the jidoka response; tests, fail-fast, and CI/CD must actually halt work

**Status: Provisional — hypothesis stated; TPS / Toyota Way / LeSS
layer sourced; not a finalized talk beat**

## Original claim / hypothesis

> **Stop & Fix from TPS should be a named claim.** Test automation is
> the main method of jidoka in software development, but not the only
> one. Fail-fast—the opposite of defensive programming—is another.
> CI/CD that stops delivery and forces the teams to stop and fix is
> another.

This is a lightly edited record of Terry's hypothesis. It was split from
[Claim 5](05-smed-software-changeover-and-ai-friendly-context.md), where
tests also cheapen changeover. This claim owns the **stop**: detection
without halt is not jidoka.

## Research-based adjustment

Stopping immediately when an abnormality is detected is **inside
jidoka**. Toyota's current account: jidoka is “automation with a human
touch”; when an abnormality occurs,
the machine stops automatically or the operator pulls the stop cord;
that prevents defective outflow, makes the abnormality clear, and
enables prevention of recurrence. The andon makes the stop visible so
people respond only when there is an abnormality.

Jeffrey Liker's Toyota Way **Principle 5** names the culture: build a
culture of stopping to fix problems, to get quality right the first
time. In that telling, jidoka (machines and people who can detect and
stop) is the foundation for building in quality. The Larman/Vodde lean
house used in [Claim 2](02-tps-and-lean-houses.md) puts “promote
stop-and-fix” in the **foundation**, with managers-as-teachers and Go
See.

So three layers:

| Layer | What Stop & Fix is |
|---|---|
| **TPS / jidoka** | The stop-and-contain-and-prevent-recurrence half of **jidoka**. |
| **Toyota Way (Liker)** | Principle 5: a culture of stopping to fix, so quality is right the first time. |
| **LeSS / lean house** | Foundation practice: promote stop-and-fix. The **CI system** is compared to an andon ([Claim 21](21-ci-practice-is-not-a-ci-system.md)). |

[Claim 6](06-jidoka-embeds-routine-judgment.md) already owns where
previously learned judgment lives. [Claim
20](20-poka-yoke-supports-jidoka.md) owns poka-yoke as
the prevent-at-source method. [Claim
3](03-jidoka-enables-jit-trusts-respect-grows.md) already owns that
jidoka *frees* people by giving them the right and expectation to
signal, stop, respond, and improve. This claim is the operational
requirement those claims assume:

> **Jidoka is the capability to detect and stop. Stop & Fix is the
> discipline of actually stopping, containing, fixing, and preventing
> recurrence—rather than working around the signal.**

A test suite that is red and ignored, a type error that is suppressed, a
CI build that everyone continues past: those detect. They do not stop.
LeSS is blunt: “DO ‘stop and fix’ when the build breaks.” Fixing the
broken build is first priority because it affects everybody. “We’re too
busy dealing with problems to fix our broken build” is the anti-pattern.
LeSS also says a stop-the-line attitude does not mean blindly stopping
all work; even Toyota does not do that. The requirement is that the
abnormality is not allowed to become normal inventory.

### Software methods

Terry's three methods fit that split.

| Method | What it detects | What Stop & Fix requires |
|---|---|---|
| **Automated tests** | A known scenario no longer holds; simple assertions are previous judgment made executable | The failing test is not parked. Work on the customer item pauses until the signal is understood, contained, and either fixed or explicitly accepted as a new intention. |
| **Fail-fast** | An illegal or unexpected condition at the moment it occurs | Do not swallow the abnormality (defensive `catch` that logs and continues is the software form of producing defective cloth). Prefer to make continuation impossible until someone responds. |
| **CI/CD that stops delivery** | The integrated product is not in the agreed working state | Do not keep merging, deploying, or starting the next slice on a red mainline. The pipeline is a **CI system**: an andon, not a report, and not itself CI ([Claim 21](21-ci-practice-is-not-a-ci-system.md)). |

Automated tests are the **main** method because they are cheap to
re-run, encode a specific intention, and recall attention only on
failure—exactly the previous judgment made executable in [Claim
6](06-jidoka-embeds-routine-judgment.md). They are
not sufficient. Fail-fast covers conditions no test anticipated.
CI/CD covers the whole-product increment several feature teams share.

Defensive programming that keeps the process running after a violated
assumption hides the andon. Fail-fast is closer to pulling the cord.

### AI makes Stop & Fix more important, not less

Generation makes it cheap to continue: more candidate patches, more
skipped failures, more “we'll fix the suite later.” That is working
around the stop. The team remains the unit of analysis; AI is a common
tool. The tool can propose a fix. The team still has to **stop**—treat
the red test, the type error, or the broken pipeline as the current
work—rather than launching another user-centric item in parallel.

That last point is the same one-piece-flow / spill-over constraint as
[Claim 5](05-smed-software-changeover-and-ai-friendly-context.md) and
[Claim 17](17-jit-vertical-slicing-one-piece-flow.md).

## Emerging implication for the talk

A compact candidate, sitting next to Claims 3, 5, 6, 8, and 21:

> **Jidoka without Stop & Fix is a dashboard. Tests, fail-fast, and
> CI/CD only count when the team actually halts, contains, and learns.
> AI makes continuing past the signal cheaper; the discipline therefore
> matters more.**

On stage, one red check that the team treats as the work—not a second
agent tasked while the suite stays red—shows the claim.

## Questions still open

- Is **Stop & Fix** the memorable English label, or should the talk
  stay with Toyota's “stop immediately when abnormalities are
  detected,” Liker's Principle 5 wording, or LeSS's “stop & fix”?
- How much of the andon / stop-cord picture belongs on a Tokyo slide
  versus one software sequence (test fails → team stops → fix or
  new intention → prevent recurrence)?
- When is continuing past a red check the Toyota exception (do not
  blindly stop all work) rather than the anti-pattern?
- Does fail-fast need its own beat, or is it an example under tests
  and types?

## Sources consulted

1. Toyota Motor Corporation, [Toyota Production
   System](https://global.toyota/en/company/vision-and-philosophy/production-system/).
   Jidoka: stop immediately when abnormalities are detected; machine
   stop or operator stop cord; andon; prevent recurrence; people
   respond when there is an abnormality.
2. Jeffrey K. Liker (2004), *The Toyota Way*, Principle 5: Build a
   culture of stopping to fix problems, to get quality right the first
   time. Jidoka as the foundation for building in quality.
3. Craig Larman and Bas Vodde (2009), lean-thinking house used in
   [Claim 2](02-tps-and-lean-houses.md). Foundation includes promote
   stop-and-fix.
4. Large-Scale Scrum, [Continuous
   Integration](https://less.works/less/technical-excellence/continuous-integration).
   CI as andon; fail fast, stop & fix, learn without blame; fixing the
   broken build is first priority; do not blindly stop all work.
5. Large-Scale Scrum, [Thinking About
   Testing](https://less.works/less/technical-excellence/thinking-about-testing).
   Test fails → stop and fix; failing automated tests as a huge queue
   and loss of transparency.
6. Jim Shore (2004), [“Fail
   Fast”](https://www.martinfowler.com/ieeeSoftware/failFast.pdf),
   *IEEE Software*. Crash or halt at the violated assumption rather
   than continuing in an undefined state.

**Still open for the on-stage label and one software stop sequence.**
