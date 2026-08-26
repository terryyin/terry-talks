# Claim 23: Honest CI and disposable prototypes are a tension pair

**Status: Provisional — tension pair retained; doughnut example still
open**

## Claim

> **Honest continuous integration and disposable prototypes form a
> tension pair.** CI seeks complete feedback from the integration
> cycle: a change meets the shared working product, its tests, other
> concurrent changes, and the people building on it. A throwaway
> prototype seeks cheap learning by staying free of those production
> obligations. Keep it outside the product and disposal stays cheap,
> but its code cannot provide that shared-system feedback. Integrate
> it and the feedback becomes more complete, but the code must be
> production quality and may acquire dependencies that make disposal
> harder. Both are good ideas; each limits the other.

Here **complete feedback** means complete *integration-cycle*
feedback. CI does not by itself establish customer value. [Claim
17](17-jit-vertical-slicing-one-piece-flow.md) owns feedback from a
running, customer-centric increment.

## The pair is feedback completeness versus disposability

On the C2 XP page, Ward Cunningham describes the spike as the smallest
code that can explore the essential function **independent of existing
mechanism**. Ron Jeffries says that on C3 they planned to throw spike
code away, though they sometimes salvaged part of it. A spike can be
thin and end-to-end without becoming product code.

LeSS recommends that hands-on architects clarify ideas by programming
a thin vertical spike through components. It does **not** say that
this spike must be committed to the product mainline. On the same page
LeSS separately describes a walking skeleton or tracer code as
production-quality development and explicitly says that it is *not
prototyping*. That locates the boundary; it does not remove the pair.

LeSS defines CI as growing one working system by small changes on the
mainline. Fowler likewise says code sent to the mainline is production
quality, even when unfinished behavior is hidden. He recommends small,
reversible steps; for a faulty recent integration, reverting the
commit is usually the first response. CI therefore does not guarantee
entanglement or roll-forward deletion.

But a spike outside the mainline has not been continuously integrated.
Its learning is narrower: cheap disposal is bought with less complete
integration feedback.

The choice is not merely “long-lived experiment branch or merged
prototype.” A throwaway spike need never be destined for merge.
Product work can integrate behind a keystone interface or feature
flag, using branch by abstraction or parallel change. These techniques
manage the tension; they do not erase it. [Claim
21](21-ci-practice-is-not-a-ci-system.md) owns the CI practice; this
claim owns its boundary with disposable learning.

## The tension becomes strongest inside the product

Some hypotheses can only be tested in the running product. An A/B
test, for example, integrates alternative code paths and routes user
cohorts between them with an **experiment toggle**. That is
production-quality experimental code whose losing path is intended to
be disposable: honest integration with as much reversibility as the
learning method permits.

Pete Hodgson's feature-toggle guidance makes both sides visible. An
experiment toggle may need to live for hours or weeks to produce a
useful result, but leaving it longer lets other system changes
invalidate the experiment. Toggles also add conditional logic and
testing cost, so teams should keep their inventory low and remove
obsolete toggles proactively.

Containment is therefore part of honest integration:

- keep the alternative path and its dependencies explicit;
- test the supported toggle states;
- decide and remove the losing path promptly; and
- remove the toggle as well as the behavior it guarded.

If the boundary held, disposal can be routine. If later changes began
to depend on the experimental path, deletion becomes a change to
today's system—possibly a forward refactoring. That is Terry's
product-scale analogy, not a published Vodde or LeSS rule. [Claim
5](05-smed-software-changeover-and-ai-friendly-context.md) retains
Vodde's different argument about started Sprint items and spill-over.

## AI adjustment

DORA's 2025 survey reports that AI adoption was associated with
higher delivery throughput and with lower delivery stability, while
emphasizing tests, version control, and fast feedback as control
systems. That supports a modest statement: **AI may make the tension
harder to hold when it increases the volume of integrated change.** It
does not establish that AI always accelerates delivery or makes clean
deletion impossible.

## Implication for the talk

> **Honest CI and disposable prototypes are a tension pair.** A
> throwaway spike buys cheap learning by giving up complete
> shared-system feedback. An integrated experiment buys that feedback
> by accepting production obligations and removal work. Keep both
> values explicit—and design the removal boundary when the experiment
> enters the product.

The doughnut episode is queued on
[Claim 13](13-doughnut-project-examples.md): post-class cleanup that
surgically removed an undone or abandoned feature because it was
already entangled with features that stayed.

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
