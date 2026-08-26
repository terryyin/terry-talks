# Claim 23: Honest trunk-based CI and disposable prototypes are a tension pair

**Status: Provisional — hypothesis recorded; XP spike and LeSS CI
located; product-scale spill-over analog is Terry's, not Vodde's
published argument**

## Original claim / hypothesis

> **Honest trunk-based continuous integration and disposable prototypes
> form a tension pair.** If we are really continuously integrating, the
> experimental work is not sitting on a branch as one isolated
> prototype. It may have been sliced into many small commits and
> assimilated into the system, while other people are also changing the
> same code and building on those changes, close to real time. They
> inform and influence each other. When the hypothesis turns out to be
> wrong, there may be no clean “delete” or “just revert.” Deleting the
> remains of a failed or spent experiment is still very important. Doing
> a really clean deletion may mean rolling forward: understanding what
> the experiment changed, what later work has become entangled with it,
> and then reshaping the current system to remove what is no longer
> needed. That can require quite a lot of cognitive load from the
> developers—more than AI can save. AI might make this problem more
> important: if we can generate and integrate changes much faster,
> keeping a truthful understanding of what has happened to the system
> may become a bigger constraint. In the LeSS context this tension pair
> always exists. Recent booming AI usage makes it more visible. It does
> not change the essence. A tension pair is not a choice of winners.
> Both sides are real values. Pick only one, and the organization loses
> the other—and then, before long, the one it picked as well. Hold both
> so both can win.

This is started work that has already entered the **product**, not
unfinished work inside one Sprint. [Claim
5](05-smed-software-changeover-and-ai-friendly-context.md) already owns
Bas Vodde's spill-over at **team and Sprint** scale: a *started* item
cannot be thrown out the way an *unstarted* selected item can. The analog
here is Terry's: once an experiment has been *started into the product*
by honest integration, later work may have built on it. It is no longer
cheap to discard. [Claim
17](17-jit-vertical-slicing-one-piece-flow.md) owns the thin slice as
the unit of flow. [Claim
21](21-ci-practice-is-not-a-ci-system.md) owns that CI is people
growing one working system on the mainline. This claim owns the
**tension pair** those practices create with the equally real need to
dispose of spent experiments.

## Research-based adjustment

The tension-pair reading is defensible. Treating it as a Vodde or Toyota
practice, or as a new problem invented by AI, is not.

### Both sides matter; picking one is the failure

A tension pair is two values that look like opposites and both have to
stay alive. Honest CI wants a truthful shared product, early influence,
and coordination in code. Disposable prototypes want cheap learning and
the right to remove what the hypothesis no longer justifies. You cannot
keep only one of those and have a healthy LeSS product.

If you isolate experiments on long-lived branches so they are easy to
delete, you protect throwaway learning and lose honest CI: other people
cannot see, build on, or be informed by the work. If you assimilate
everything onto the trunk and never reshape, you protect integration
and leave spent experiments sitting in the product as WIP. Either
one-sided move becomes lose-lose.

[Claim 10](10-freedom-and-trust-reinforce-through-jidoka.md) already
holds one tension pair (freedom and entrustment) as the talk theme.
This is a different pair.

### LeSS already lives honest CI; XP named the disposable experiment

LeSS's developer CI is integration to the head of trunk, many times a
day, so other teams see related changes and just talk. That is Claim
8's “communicate in code.” It is exactly the entanglement the
hypothesis describes: people inform and influence each other through
the product, close to real time.

XP's **spike solution** is the sourced name for a disposable experiment:
exploratory programming to answer a tough technical or design question,
simple enough to throw away. Don Wells: most spikes are not good enough
to keep; expect to throw them away. Ward Cunningham, on C3: plan to
throw away the code, although sometimes something is salvaged. LeSS
cites Beck's spike as exploratory programming that drives a **thin
vertical spike through components**—which is already close to Claim
17's slice, not a sandbox on a long-lived branch. So the LeSS default
is to learn *through* the product. That is why clean delete is hard,
and why the tension pair is native to LeSS, not an AI novelty.

### Spill-over at this scale is an analog, not Vodde's text

Vodde's published argument stays on [Claim
5](05-smed-software-changeover-and-ai-friendly-context.md): started
unfinished *Sprint items*, specialty-buffer habits, one customer item
at a time. He does not, in those sources, define product-scale
spill-over as assimilated experiments. The useful transfer is the
distinction **started versus unstarted**. Unstarted backlog can be
thrown out. Started work that has entered the system must be finished,
split, or—in this claim—**reshaped out**. Do not call that Vodde's
argument on stage.

### AI amplifies the same pair; it does not change its essence

[Claim 11](11-physical-production-and-software-differences.md) already
says generating many candidates can be set-based learning **or**
overproduction, depending on whether extras are used to learn and then
discarded, or left as unverified inventory. This claim adds the
integration question: discarded in intention is not discarded in the
product if the extras were already assimilated.

[Claim 6](06-jidoka-embeds-routine-judgment.md) owns judgment load.
Roll-forward deletion is that load applied to history: what changed,
what later work entangled, what can go. Faster generation and
integration raise the rate at which that understanding can fall behind.
That is why AI makes the tension pair more visible without inventing it.

## Implication for the talk

> **Honest CI and disposable prototypes are a tension pair. Do not pick
> a side.** Integrate thinly enough that learning is real. Keep the
> discipline to remove what the experiment no longer justifies—often by
> rolling the current system forward, not by hoping for a clean revert.
> AI makes the pair louder. It does not change it.

False resolutions to avoid on stage: “keep experiments on branches so
we can delete” (loses honest CI), and “if it is on the trunk it must
stay” (loses disposal, fills the product with spent WIP).

## Questions still open

- What single doughnut episode shows an assimilated experiment that
  later work built on, so delete meant roll-forward? Queue on Claim 13
  only if Terry wants a search.
- Are feature toggles, branch-by-abstraction, or a truly throwaway
  spike (never merged) ways to hold both sides, or do they quietly pick
  one side if overused?

## Sources consulted

1. Bas Vodde's spill-over argument is sourced on [Claim
   5](05-smed-software-changeover-and-ai-friendly-context.md). This
   claim uses only the started-versus-unstarted distinction as an
   analog.
2. The LeSS Company, [Introduction to
   LeSS](https://less.works/less/framework/introduction). Integrate to
   the head of trunk; continuous integration across teams so related
   changes inform coordination.
3. The LeSS Company, [Continuous
   Integration](https://less.works/less/technical-excellence/continuous-integration).
   Developer practice of growing one working system; names owned by
   [Claim 21](21-ci-practice-is-not-a-ci-system.md).
4. The LeSS Company, [Architecture &
   Design](https://less.works/less/technical-excellence/architecture-design).
   Architects clarify by programming a spike solution: exploratory
   programming that drives a thin vertical spike through components
   ([Beck99]).
5. Don Wells, [Spike
   solution](http://www.extremeprogramming.org/rules/spike.html). A
   simple program to explore a potential solution; most spikes are not
   good enough to keep; expect to throw them away.
6. Ward Cunningham, [Spike
   Solution](http://c2.com/xp/SpikeSolution.html). C3: plan to throw
   away the code; sometimes something is salvaged. Beck: spikes when
   knowledge-limited, not time-limited.
7. [Claim 8](08-technical-excellence-enables-jit-coordination-in-less.md)
   already has communicate-in-code and the cost of delayed branch
   integration. [Claim
   11](11-physical-production-and-software-differences.md) already has
   set-based discard versus leftover inventory.
