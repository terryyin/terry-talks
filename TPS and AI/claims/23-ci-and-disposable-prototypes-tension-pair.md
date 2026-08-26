# Claim 23: CI and disposable prototypes form a tension only at the product boundary

**Status: Provisional — universal tension rejected; narrower
product-experiment tension retained; doughnut example still open**

## Claim

> **Honest continuous integration and disposable prototypes are not
> inherently a tension pair.** A true throwaway spike can stay outside the
> product: keep the learning and discard the code. CI does not require every
> exploratory artifact to enter the mainline. The tension begins when useful
> learning requires experimental code in the shared or running product. Then
> integrate production-quality code behind a short-lived boundary, and make
> removing the rejected path and that boundary part of the experiment. If
> later work crosses the boundary and depends on the experiment, removal may
> require forward refactoring rather than a clean revert. That cost is
> conditional, not an unavoidable consequence of CI or LeSS.

This correction separates three things the original claim conflated.

## A throwaway spike is not a product increment

On the C2 XP page, Ward Cunningham describes the spike as the smallest code
that can explore the essential function **independent of existing
mechanism**. Ron Jeffries says that on C3 they planned to throw spike code
away, though they sometimes salvaged part of it. A spike can be thin and
end-to-end without becoming product code.

LeSS recommends that hands-on architects clarify ideas by programming a
thin vertical spike through components. It does **not** say that this spike
must be committed to the product mainline. On the same page LeSS separately
describes a walking skeleton or tracer code as production-quality
development and explicitly says that it is *not prototyping*. Therefore the
old inference—“vertical spike, therefore learned through the integrated
product”—was unsupported.

[Claim 17](17-jit-vertical-slicing-one-piece-flow.md) owns thin,
customer-centric **production** slices. A throwaway spike is a different
learning artifact.

## CI requires quality at the mainline, not every experiment on it

LeSS defines CI as growing one working system by small changes on the
mainline. Fowler likewise says code sent to the mainline is production
quality, even when unfinished behavior is hidden. He recommends small,
reversible steps; for a faulty recent integration, reverting the commit is
usually the first response. CI therefore does not itself imply entanglement
or roll-forward deletion.

Nor is the choice “long-lived experiment branch or merged prototype.” A
throwaway spike need never be destined for merge. For product work that
must integrate before it is user-visible, CI techniques include a keystone
interface, a feature flag, branch by abstraction, and parallel change.
[Claim 21](21-ci-practice-is-not-a-ci-system.md) owns the CI practice; this
claim only owns what happens at the experiment boundary.

## The narrower tension: experiments inside the product

Some hypotheses can only be tested in the running product. An A/B test, for
example, integrates alternative code paths and routes user cohorts between
them with an **experiment toggle**. That is not a throwaway prototype in the
XP sense; it is production-quality experimental code with an intended
expiry.

Pete Hodgson's feature-toggle guidance makes both sides visible. An
experiment toggle may need to live for hours or weeks to produce a useful
result, but leaving it longer lets other system changes invalidate the
experiment. Toggles also add conditional logic and testing cost, so teams
should keep their inventory low and remove obsolete toggles proactively.

Containment is therefore part of honest integration:

- keep the alternative path and its dependencies explicit;
- test the supported toggle states;
- decide and remove the losing path promptly; and
- remove the toggle as well as the behavior it guarded.

If the boundary held, disposal can be routine. If later changes began to
depend on the experimental path, deletion becomes a change to today's
system—possibly a forward refactoring. That is Terry's product-scale
analogy, not a published Vodde or LeSS rule. [Claim
5](05-smed-software-changeover-and-ai-friendly-context.md) retains Vodde's
different argument about started Sprint items and spill-over.

## AI adjustment

The old draft also moved too quickly from faster code generation to faster
integration. DORA's 2025 survey reports that AI adoption was associated
with higher delivery throughput and with lower delivery stability, while
emphasizing tests, version control, and fast feedback as control systems.
That supports a modest statement: **AI may increase pressure on the
experiment boundary when it increases the volume of integrated change.**
It does not establish that AI always accelerates delivery, makes clean
deletion impossible, or creates this tension.

## Implication for the talk

> **CI does not require every experiment to be merged. Keep throwaway spike
> code throwaway. When learning requires experimental code in the product,
> integrate it honestly—and design its removal boundary at the same time.**

One doughnut episode is still needed: a product experiment that stayed easy
to remove, or one whose boundary leaked and required forward refactoring.

## Sources consulted

1. Ward Cunningham et al., [Spike
   Solution](https://c2.com/xp/SpikeSolution.html). Ward's independent
   exploratory mechanism; Jeffries's C3 practice of planning to throw the
   code away, with occasional salvage.
2. The LeSS Company, [Architecture &
   Design](https://less.works/less/technical-excellence/architecture-design).
   Thin vertical spike for architectural learning; separately,
   production-quality walking-skeleton/tracer-code development that is
   explicitly not prototyping.
3. The LeSS Company, [Continuous
   Integration](https://less.works/less/technical-excellence/continuous-integration).
   Grow a working system through small mainline changes.
4. Martin Fowler, [Continuous
   Integration](https://martinfowler.com/articles/continuousIntegration.html)
   (rewritten 2023). Production-quality mainline code; prompt flag removal;
   reversible small changes; revert a faulty recent integration.
5. Pete Hodgson, [Feature Toggles](https://martinfowler.com/articles/feature-toggles.html)
   (2016). Experiment toggles, their limited useful lifetime, carrying cost,
   and proactive removal.
6. Google Cloud DORA, [2025 State of AI-assisted Software
   Development](https://cloud.google.com/resources/content/2025-dora-ai-assisted-software-development-report).
   Observed associations among AI adoption, delivery throughput, and
   instability; surrounding control systems remain decisive.
