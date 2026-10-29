# Removing a Rule Is Not Adding Its Negation

*AI Augmented Development Pitfalls · 2*

In incremental development, some things leave the product. An early solution
is replaced. A prerequisite becomes unnecessary. A later story extends the
scope and removes a restriction that once bounded an earlier increment.

The instruction often arrives as a negative: “Remove this condition.” “Stop
requiring that setup.” “Get rid of the old mode.” The wording is natural because
we are discussing a transition from the product we have to the product we want.

But an AI coding assistant can carry that transition into the lasting product
description. It removes the old check, then adds tests declaring that the check
is absent and documentation explaining that the former requirement no longer
exists. The implementation gets simpler, while the surrounding artifacts gain
another historical concept to preserve.

The pitfall is treating the removal of a rule as an instruction to add a
permanent assertion about its absence.

Imagine a holdings service whose refresh once depended on an entry workflow
having started. We now want connected accounts to keep their holdings current
on a schedule. In simplified form, the eligibility condition changes from:

```text
account_connected AND entry_started
```

to:

```text
account_connected
```

We have removed one dependency. We have not inverted it into a requirement
that entry must be absent. Whether an entry workflow has started may simply
cease to be relevant to deciding when the account refreshes.

The literal inversion would be an obvious mistake. The subtler mistake appears
in tests and prose. A test might scan the source to ensure it contains no
reference to the former condition. A manual might repeatedly explain that
refresh does not require entry setup. The old concept remains prominent even
though it no longer helps describe the current behavior.

That prominence comes from the development sequence. If the service had been
built with scheduled account refresh from the beginning, nobody would have
thought to list entry setup among the many unrelated things it does not
require. There are indefinitely many absent prerequisites and removed
mechanisms we could describe. Their absence alone does not give them product
significance.

A useful question is:

> If we were describing the current product directly, without recounting how
> we arrived here, would this distinction help anyone?

This is a review heuristic, rather than a demand to forget history. A past
failure can reveal a meaningful risk. Existing users may need a migration
instruction, and a release note can usefully explain what changed. A durable
decision record can preserve reasoning that still matters. Those purposes
are different from requiring every current specification to catalogue the
product's former arrangements.

The distinction matters especially in tests. There are several ways to check
the refresh change, and they establish different things:

| Check | What it establishes |
| --- | --- |
| “The old error message did not appear.” | Very little if refresh never ran. |
| “The source contains no entry-started check.” | A particular implementation detail is absent. |
| “A holding added at the broker appears after the scheduled account refresh.” | The current capability works in the observed scenario. |

The behavioral test can begin without an entry round. That may be the most
useful way to catch the previous defect. It can remain valuable after the old
gate has been deleted, because it protects account refresh rather than the
spelling or structure of the removed code. We can preserve that scenario
within a coherent test of the current behavior instead of keeping a separate
historical assertion for every condition ever removed.

Google calls tests that reproduce implementation information without
independently checking correct behavior *change-detector tests*. Its guidance
recommends rewriting or deleting them: their maintenance can slow development
without providing useful defect detection. That is closely related to testing
the textual absence of a retired condition.
[Alex Eagle: Change-Detector Tests Considered Harmful](https://testing.googleblog.com/2015/01/testing-on-toilet-change-detector-tests.html)

There is also an evidence problem. “Nothing bad happened” is not enough when
the test has not established that the relevant operation executed. In an
asynchronous system, observing no event yet does not prove that it will never
occur. Negative checks need a meaningful observation boundary and sufficient
evidence that the relevant path was exercised.

This does not make logical negation inherently unreliable. A completed
operation can have well-defined properties whose absence is observable. No
unauthorized disclosure and no duplicate charge can be essential requirements.
Their value comes from a current product obligation and the quality of the
evidence. The problem here is a negation whose only justification is that an
earlier version happened to do the opposite.

Tests therefore need to evolve when intended behavior changes. An old test
requiring the retired gate is no longer correct. We may replace it, consolidate
its useful coverage, or delete it if its purpose has expired. Software
Engineering at Google explicitly distinguishes behavior changes as a reason
to update existing tests. The existence of an expectation in the suite does
not make it permanent.
[Software Engineering at Google: Unit Testing](https://abseil.io/resources/swe-book/html/ch12.html)

The same reasoning applies to documentation. “Refresh no longer requires
entry setup” is a useful change announcement for someone who knew the previous
version. A lasting description can say when connected accounts synchronize
and what users can expect. Once the transition no longer needs explaining,
the old prerequisite can leave that description.

Diátaxis recommends succinct reference documentation whose structure reflects
the product it describes. Applying that principle, current reference material
should help readers understand the current product. Historical explanation
belongs where it serves a continuing need.
[Diátaxis: Reference](https://diataxis.fr/reference/)

This pitfall can occur even when the old restriction was justified. It becomes
more costly when the restriction was accidental: a delivery scope boundary was
first turned into a product rule, and a later extension leaves behind another
assertion about that rule's absence. Removing the production check then fails
to remove the full maintenance burden of the original misunderstanding.

If every increment only adds artifacts, a small amount of useful product
change can accumulate a disproportionate amount of tests and documentation.
Future developers must understand distinctions whose purpose expired long
ago. AI assistants reading those artifacts may infer that the distinctions
remain important and preserve them in subsequent changes.

Test maintenance includes retirement. An empirical study of test deletion in
Java applications identifies obsolete and redundant tests and recommends
keeping test evolution aligned with production-code evolution. It supports
the broader maintenance concern, although it does not investigate this
specific communication error.
[Bhatta, Kendemah and Jha: Understanding Test Deletion in Java Applications](https://hifromajay.github.io/papers/msr25.pdf)

After removing a rule, review the concepts and expectations that depended on
it. Keep the evidence needed for current behavior, any meaningful regression
risk, and information users still need for the transition. Retire artifacts
whose purpose has expired. The need to demonstrate that a change is correct
does not require every temporary check to become a permanent test.

The question for a lasting assertion is:

> What current requirement or meaningful risk does this protect?

“The previous version did the opposite” may explain why we investigated the
case. It does not, by itself, determine what we must preserve forever. A
completed increment should leave a coherent product description, with tests
that protect its current intent and history available when we need it.
