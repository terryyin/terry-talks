# Claim 24: A leftover warning is unpaid judgment; spend it now so “no news” can mean good news

**Status: Provisional — hypothesis recorded; factory warning devices
distinguished from skippable software warnings; doughnut episode
queued**

## Original claim / hypothesis

In software development, keep warnings as errors. A warning should
trigger Stop & Fix. Warnings are for people (and now AI) to *read*.
Leaving them accumulates judgment-dependent solutions. The judgment
should be spent **now**. Excessive warnings and logs also fill an
AI's (and a person's) context window, which costs tokens. Clean them
along the way. **“No news is good news”** is the principle.

This claim owns the **quiet abnormality channel** in software:
warnings-as-errors, leftover logs, and the rule that a skippable
warning is unpaid judgment. [Claim
20](20-poka-yoke-supports-jidoka.md) still owns poka-yoke and the
control-versus-warning *names*. [Claim 19](19-stop-and-fix.md) still
owns the culture of actually stopping. [Claim
6](06-jidoka-embeds-routine-judgment.md) still owns where judgment
lives. [Claim 16](16-go-see-ai-harness.md) still owns Go-See into the
harness when the process is in question.

## Research-based adjustment

The hypothesis is right about skippable software warnings. It would
be too strong if it said Toyota never uses a warning device, or that
the talk is about flipping a compiler flag as a TPS mechanism.

### A factory warning can still be jidoka; a skippable log is a dashboard

Shingo's **warning** poka-yoke (lamp, buzzer) and Toyota's plant-tour
screwdriver / red lamp are real. They count as quality at the source
only if someone actually responds
([Claim 19](19-stop-and-fix.md)). Software's usual failure is
different: the “warning” sits in a list of hundreds, the build stays
green, and both people and models learn to continue past it. That is
the dashboard Claim 19 already named, not a lamp at the station.

**Treat warnings as errors** is the software form of promoting that
warning to Shingo's **control** (will not proceed). `-Werror`,
`--max-warnings 0`, or an equivalent gate is one fixture, not the
thesis. A check that is not worth a stop should not remain a
warning either.

### Spend the judgment now

A warning is an open question aimed at a thinker. Reading it *is*
the work. After that moment, only three honest endings exist:

1. **Fix** — the abnormality is gone; the check can stay as control.
2. **Narrow, owned suppression** — this instance is not an
   abnormality, with a reason next to the code.
3. **Remove or demote the check** — it was never worth a stop; stop
   pretending it is a warning.

Leaving it is a fourth ending that is not honest: a
**judgment-dependent** remainder for someone else, later, including
an agent ([Claim 6](06-jidoka-embeds-routine-judgment.md)).
Generation makes that remainder cheap to grow and expensive to
re-read.

Third-party and upgrade warnings are not an exception to spending
judgment. They are a containment decision: pin, wrap, or accept with
an owned expiry. “We will get to it” is stacking.

### “No news is good news” is signal design, not a ban on surfacing problems

Visual management works when an abnormality *stands out*. Liker,
quoted by LeSS: a display that does not drive daily action is not
visual management. Ballé: too much visual information distracts and
defeats the purpose. A channel that always speaks never speaks.

**“No news is good news”** is the principle for the *abnormality
channel*: compile output, linter, CI annotations, and the logs we
dump into a person's or an agent's context. Silence means standard.
A new line is a cord.

That is not “hide problems so the board stays green.” Muting a check
to restore silence is the same dashboard. The quiet has to be
*earned* by spending judgment, not by turning the lamp off.

Logs of expected events are the same failure in another costume.
[Claim 16](16-go-see-ai-harness.md) still wants a readable harness
when Go-See is needed. This claim says: do not narrate normal
operation into that window. Tokens spent on leftover warnings are
tokens not spent on the exception.

## Emerging implication for the talk

> **A warning is for reading now. Leaving it stacks unpaid judgment
> and teaches people and models to ignore the next one. Promote the
> check to a stop, or honestly drop it. Keep the channel quiet.
> No news is good news.**

On stage, one beat after poka-yoke's control-versus-warning split:
the software warning pile is not Toyota's lamp. Then one fixture:
warnings-as-errors, or a log line that should not have been there.
Do not teach compiler flags as TPS.

## Questions still open

- Doughnut-sourced leftover-warning or log-noise episode, and a
  contrast where the channel was kept quiet, queued on
  [Claim 13](13-doughnut-project-examples.md) with the poka-yoke
  fixture search; example search not started.
- How much of “clean logs along the way” belongs on a Tokyo slide
  versus remaining a speaker note for AI cost?

## Sources consulted

1. Shigeo Shingo (1986), [*Zero Quality Control: Source Inspection and the
   Poka-Yoke
   System*](https://www.routledge.com/Zero-Quality-Control-Source-Inspection-and-the-Poka-Yoke-System/Shingo/p/book/9780915299072).
   Control (will not proceed) versus warning (lamp, buzzer). Placement
   and naming remain [Claim 20](20-poka-yoke-supports-jidoka.md).
2. Toyota Motor Corporation, [Toyota Virtual Plant Tour: Toyota Production
   System](https://global.toyota/en/company/plant-tours/production-system/).
   Screwdriver / red-lamp warning poka-yoke under autonomation.
3. Jeffrey K. Liker and Michael Hoseus (2008), *Toyota Culture*. Quoted
   by LeSS: visual presentation is not visual management unless it
   drives daily action. Already cited on
   [Claim 21](21-ci-practice-is-not-a-ci-system.md).
4. Michael Ballé, ["Why does visual management at a Toyota plant look so
   much different than at
   ours?"](https://www.lean.org/the-lean-post/articles/why-does-visual-management-at-a-toyota-plant-look-so-much-different-than-at-ours/).
   Too much visual information distracts and defeats the purpose.
5. Jim Shore (2004), [“Fail
   Fast”](https://www.martinfowler.com/ieeeSoftware/failFast.pdf),
   *IEEE Software*. Fail immediately and visibly. The halt itself is
   [Claim 19](19-stop-and-fix.md).
6. GCC, [Warning
   Options](https://gcc.gnu.org/onlinedocs/gcc/Warning-Options.html).
   `-Werror` as one named fixture for treating warnings as errors, not
   as the thesis.

**Hypothesis recorded. Factory warning ≠ skippable software warning.
Spend judgment now; quiet is earned. Doughnut episode still queued.**
