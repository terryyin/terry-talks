# Claim 22: A causal loop diagram can show how TPS reasoning inspires LeSS+AI

**Status: Provisional — talk device settled: two slide figures (at
most six variables each) in the companion CLD; the diagram is a map of
existing claims, not a new empirical result; doughnut walkthrough
stories still open**

## Claim

> **TPS can inspire LeSS+AI as a system of loops, not as a list of
> practices.** Encoded jidoka frees attention. That capability, made
> visible in one product, warrants *entrustment* so actual need can pull
> work and collaboration. Mutual trust grows under Respect for People:
> people who can think inside that system. AI does not replace a loop. It
> speeds generation relative to encoding, and so amplifies whichever
> direction R5 is already running.

A causal loop diagram (CLD) is the right *form* for [Claim
1](01-tps-reasoning-not-mechanisms.md). Claim 1 says the useful transfer
is the reasoning by which Toyota made a whole system responsive and
learnable, and that one should examine pull, jidoka, small batches,
technical excellence, human agency, and continuous improvement for the
**relationships** they create. A CLD is a notation for those
relationships. It does not add a new Toyota or LeSS source. [Claim
10](10-freedom-and-trust-reinforce-through-jidoka.md) already states one
such reinforcing loop under the polarity **freedom and entrustment**;
the loop text lives there. Drawn this way, the TPS reasoning is
not a toolkit of mechanisms to install beside AI, but loops in which
jidoka, JIT, technical excellence, and Respect for People reinforce one
another—and in which AI changes the gain.

The diagram lives in a companion file, so the model can move without
rewriting the argument: [22-tps-less-ai-cld.md](22-tps-less-ai-cld.md).

### What a CLD is, and is not

A CLD is a qualitative system-dynamics sketch: variables that can rise
or fall, links with **+** (same direction) or **−** (opposite),
reinforcing (R) and balancing (B) loops, and delays. It is not a
stock-and-flow simulation, not a proof, and not more scientific than
the claims it maps. Used carelessly it looks like a completed theory.
Used carefully it makes two talk moves that a parts list cannot:

1. Show that the same structure can run as a virtuous or a vicious
   cycle.
2. Show where AI sits: **an injection that raises the gain**.

The diagram is a map of *this talk's* claims. Toyota does not publish
this CLD. LeSS does not. Polarities are interpretive. A link that
cannot be read as “other things equal, more of A means more (or less)
of B” does not belong on it.

### The loops

The companion groups the existing claims and the accepted pressure-response
assumption into seven reinforcing loops
and two balancing loops, and presents two slide figures as views of
those loops. R2, R5, R6, and R7 can each run both ways. Detail, polarities, and
omitted mechanisms live only in the [companion
CLD](22-tps-less-ai-cld.md). **Nemawashi**, **Go See**, **SMED**, and
utilization pressure stay inside the variables, as the companion's
“Left off the diagram on purpose” section records.

| Loop | What it is | Already owned by |
|---|---|---|
| **R1 Encode the known, free attention** | Known abnormality becomes a closed stop; attention returns to novelty; novelty becomes the next stop. | [6](06-jidoka-embeds-routine-judgment.md) |
| **R2 Freedom and entrustment** | Capability warrants *entrusting* the next highest-value item; coercive control falls so actual need can pull. Vicious: failure invites more advance control, which starves that capability. Mutual trust sits under Respect for People. | [10](10-freedom-and-trust-reinforce-through-jidoka.md), [3](03-jidoka-enables-jit-trusts-respect-grows.md) |
| **R3 Technical excellence for continuous integration** | Technical excellence makes one product continuously integrable; that evidence encodes stops and pulls collaboration. | [8](08-technical-excellence-enables-jit-coordination-in-less.md) |
| **R4 The work makes people** | Pull and real problems grow people who can think; that capability is what JIT and jidoka run on. | [12](12-respect-for-people-who-can-think.md) |
| **R5 Inventory, attention, and AI** | Judgment-loaded output stacked as finished consumes attention, which prevents encoding, which stacks more output. AI generation injects into that inventory. | [4](04-jit-assurance-resourcefulness-not-abundance.md), [6](06-jidoka-embeds-routine-judgment.md), [11](11-physical-production-and-software-differences.md) |
| **B1 Stop and contain** | A visible abnormality, actually halted, becomes emergent judgment-intensive work while propagation is contained. The resulting encoding reduces recurrence of *that* defect; the learning still feeds R1 and R3. | [19](19-stop-and-fix.md) |
| **R6 The backlog trap** | Accumulated judgment-loaded work raises effort per change for people and AI; lower completion leaves more work unresolved. | [00](00-judgment-intensive-work.md), [5](05-smed-software-changeover-and-ai-friendly-context.md) |
| **B2 AI slows too** | The same interpretation and rework consume agent capacity, slowing further drafting; that slowdown alone does not finish the backlog. | [00](00-judgment-intensive-work.md), [5](05-smed-software-changeover-and-ai-friendly-context.md) |
| **R7 Pressure for more AI solutions** | Artifacts requiring judgment raise effort for people and AI, slowing problem solving; responding by asking AI for more solutions adds further judgment demand. | [00](00-judgment-intensive-work.md), [5](05-smed-software-changeover-and-ai-friendly-context.md), plus Terry's accepted pressure-response assumption |

### AI as the gain on R5

The claim's last sentence is the DORA 2025 amplifier finding, drawn as
structure rather than as a slogan. Comprehension-seeking versus
delegating-production use of AI, already in [Claim
10](10-freedom-and-trust-reinforce-through-jidoka.md), is how people
steer R5. [Claim
1](01-tps-reasoning-not-mechanisms.md)'s two problems are the same
map at two scales: TPS asked how to respond without stockpiling while
exposing abnormality; LeSS+AI asks how to use cheap generation without
stockpiling judgment-loaded output. [Claim
00](00-judgment-intensive-work.md) owns this distinction: pulled product
work and emergent Stop & Fix work can both use valuable live judgment;
R5 is the failure of passing that demand downstream in output treated as
finished.

## Implication for the talk

> **Do not teach TPS as a toolkit to install beside AI. Show the loops.
> Ask which loop AI is currently amplifying.**

The figures are audience-visible slides, not a speaker-only map or a
writing-only tool. The slide form is the companion's two figures, each
at most six variables, with no overview figure — the full map stays in
its Canonical links table. That cap and the missing overview keep the
figures from reading as a completed system-dynamics paper. Walk a
figure's loop until it closes. The early figure puts AI inside the
story of accumulated judgment demand, including the feedback that
slows AI itself.

- Figure 1, **Freedom and entrustment — the engine** (R1 and R2), serves
  the main-message beat: R2 is the theme loop ([Claim
  10](10-freedom-and-trust-reinforce-through-jidoka.md)). The slide set
  uses five plain-language labels, from **Rules captured in tests & code**
  through **Confidence to entrust the next problem** and **Freedom to follow
  real user need**. The two negative links through coercive control are
  condensed into one positive confidence-to-freedom path. Both reinforcing
  loops and their learning and confidence delays remain visible.
  A direct rules-to-confidence link adds reliable safeguards as a second
  basis for entrustment. The endpoints name Jidoka/autonomation and
  Just-in-time, with a level balance below to answer slide 9's tilted scale.
  **Technical excellence** stays a catalog variable.
- Figure 2, **AI speeds whichever loop you feed** (R7), is the
  early problem-setting beat after judgment-intensive work. Four
  variables show how pressure for more AI solutions adds artifacts
  requiring judgment, raises effort for people and AI, slows problem
  solving, and feeds pressure again. R6 and B2 retain the backlog and
  agent-slowdown paths in the companion. R5 retains the
  learning-and-encoding explanation in the companion; the early slide
  establishes the problem before the TPS mechanisms are introduced.
- R3 is not a slide figure: it stays a speaker-side loop in the
  companion's Loop catalog, and its LeSS JIT-flow beat stays text-only.
  R3 remains why the talk is a LeSS talk — Whole Product Focus needs
  technical excellence so evidence and collaboration can be pulled.

Final embedding and styling of the figures is a deck decision, not made
here.

Memorable:

> **Jidoka encodes the known so people can learn. Trust lets real need
> pull. AI speeds whichever loop you feed.**

The LeSS-audience name of that gain (which focus [Claim
5](05-smed-software-changeover-and-ai-friendly-context.md) already
protects):

> **LeSS already fought over what occupies a developer’s focus: the
> solution, or customer value. AI-augmented development is the same war
> at higher gain: generation is cheap; confirmed customer value is not.**

The strongest version is the same as [Claim
1](01-tps-reasoning-not-mechanisms.md), with a picture of the
relationships:

> **The useful transfer is the dynamic: keep generation, encoding, pull,
> and trust coupled, even when AI makes generation the fastest of those
> links.**

## Questions still open

- What doughnut story walks R2 all the way around—and what story shows
  R5 turning vicious under AI volume? Owned with [Claim
  13](13-doughnut-project-examples.md).

## Sources consulted

The loop contents are the other claims. This list is only the
modelling form and the amplifier finding.

1. John D. Sterman (2000), *Business Dynamics: Systems Thinking and
   Modeling for a Complex World*. Standard account of causal-loop
   notation: variables, **+**/**−** links, reinforcing and balancing
   loops, and delays. The CLD follows that discipline; it is
   not a calibrated model of the kind the book also teaches.
2. Donella H. Meadows (2008), *Thinking in Systems*. Reinforcing and
   balancing loops as a way to see system behavior; leverage often
   sits in delays and in what the system treats as a stock.
3. DORA (2025), [*State of AI-assisted Software
   Development*](https://dora.dev/research/2025/dora-report/). Reports
   AI as an amplifier of the underlying organizational system. In the
   companion CLD that is R5's gain.
4. Toyota Motor Corporation, [Toyota Production
   System](https://global.toyota/en/company/vision-and-philosophy/production-system/).
   Primary account of the two operating pillars this map uses:
   jidoka and Just-in-Time. Toyota does not present them as this CLD.
