# Claim 24: A warning left visible after triage is unpaid judgment; keep the interrupt channel quiet

**Status: Provisional — nested under jidoka for the talk; warning policy
narrowed to selected diagnostics in owned code; doughnut episode queued**

## Claim

> **A warning left visible after triage is unpaid judgment.** For checks the
> team owns, fix the cause, narrow or remove a poor rule, or record a specific
> suppression with its reason. Gate the selected diagnostics so a new warning
> stops integration. Keep the interrupt channel quiet. “No news” is good news
> only when the check demonstrably ran.

The original “warnings as errors” rule was too broad. GCC defines a warning as
a diagnostic for code that is risky or may contain an error, **not** as an
error by definition; it also documents cases where correct code can appear
wrong. `-Werror` and ESLint's `--max-warnings 0` enforce a chosen policy, not
the reliability of every available warning. GNU Gnulib accordingly recommends
`-Werror` for maintainers but not ordinary installation builds, where platform
and system-header variation can break unowned builds. Separate third-party
output so it neither breaks that boundary nor teaches the team to ignore its
own checks.

Every warning left visible without a policy makes each later person or agent
triage it again. Research interviews found that false positives and warning
presentation deter developers from using static analysis. Suppression is
sometimes right, but it must be narrow and maintained: a 2025 study found that
50.8% of the suppressions it examined affected no current warning, and some
unintentionally hid future warnings.

## What “no news is good news” means

This is Terry's software heuristic, **not a sourced TPS slogan** or a ban on
factory warnings. It is a **sub-beat of jidoka**, not an independent TPS
topic. Toyota's plant tour shows a red-lamp poka-yoke under
jidoka/autonomation. [Claim
6](06-jidoka-embeds-routine-judgment.md) owns where learned judgment lives;
[Claim 20](20-poka-yoke-supports-jidoka.md) owns control versus warning;
[Claim 19](19-stop-and-fix.md) owns whether people actually respond. This
claim is the software policy that keeps the interrupt channel a closed,
trusted question.

It applies to an **interrupting channel** such as a CI result,
compiler/linter summary, or tool output placed into an agent's context. Its
silence is useful only when:

- the check demonstrably ran;
- routine success output is compact; and
- any emitted warning is new and actionable.

Silence is not proof if the detector failed or produced no data. Prometheus
explicitly warns that missing time series are difficult to handle and advises
exporting a default value for expected series. The quiet must be earned by a
working check, not by muting it.

Do not delete normal telemetry. Google SRE uses it for trends, debugging, and
security analysis while requiring human alerts to be actionable and
high-signal. Keep evidence available, but out of the interrupt channel and
agent prompt by default. Long-context experiments show that models do not
always find relevant information robustly among distractors; that supports
compact agent-facing output, not discarded operational evidence.

## Implication for the talk

> **Under jidoka, keep the interrupt channel a closed, trusted question.**
> After poka-yoke's control versus warning, one software beat: a warning
> pile versus a zero-warning gate over selected owned checks. “No news
> is good news” is Terry's heuristic, said as such.

Do not present `-Werror` as TPS or equate quiet alerts with absent
observability. Parent slogan: [Claim
6](06-jidoka-embeds-routine-judgment.md).

## Questions still open

- Doughnut-sourced warning-pile versus quiet-gate episode, queued on [Claim
  13](13-doughnut-project-examples.md); example search not started.

## Sources consulted

1. Toyota Motor Corporation, [Toyota Virtual Plant Tour: Toyota Production
   System](https://global.toyota/en/company/plant-tours/production-system/):
   red-lamp poka-yoke under jidoka/autonomation.
2. GCC, [Warning
   Options](https://gcc.gnu.org/onlinedocs/gcc/Warning-Options.html): warning
   semantics, selection, suppression, and `-Werror`.
3. GNU Gnulib, [Warnings
   module](https://www.gnu.org/software/gnulib/manual/html_node/warnings.html):
   maintainer use of `-Werror` and the portability boundary.
4. ESLint, [Command Line Interface
   Reference](https://eslint.org/docs/latest/use/command-line-interface#--max-warnings):
   warning thresholds as nonzero exit status.
5. Brittany Johnson et al. (2013), [“Why Don't Software Developers Use Static
   Analysis Tools to Find Bugs?”](https://research.google/pubs/why-dont-software-developers-use-static-analysis-tools-to-find-bugs/),
   ICSE: false positives and warning presentation as barriers.
6. Huimin Hu et al. (2025), [“An Empirical Study of Suppressed Static Analysis
   Warnings”](https://software-lab.org/publications/fse2025_suppressions.pdf),
   FSE: suppression growth, staleness, and accidental hiding of later warnings.
7. Google, [*Site Reliability Engineering*: “Monitoring Distributed
   Systems”](https://sre.google/sre-book/monitoring-distributed-systems/):
   retained telemetry versus actionable, low-noise alerts.
8. Prometheus, [Instrumentation best
   practices](https://prometheus.io/docs/practices/instrumentation/#avoid-missing-metrics):
   avoiding ambiguous missing data.
9. Nelson F. Liu et al. (2024), [“Lost in the Middle: How Language Models Use
   Long Contexts”](https://arxiv.org/abs/2307.03172), *TACL*: relevant
   information is not used robustly at every position in long input.
