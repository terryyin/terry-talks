# When Scope Becomes a Restriction

*AI Augmented Development Pitfalls · 1*

We start small for a reason. A narrow increment lets us deliver something useful,
get feedback, and learn before investing in a more general solution. But a
sentence intended to reduce that investment can have the opposite effect.

“Let's handle one case first” becomes “the product must allow only this case.”

Now we are building a restriction. We may add validation, error messages,
special cases, tests, and documentation to prevent behavior nobody asked us to
prevent. A decision intended to save effort has created more work and reduced
the product's flexibility.

Consider an illustrative request to an AI coding assistant: get isolated test
execution working for selected feature files, beginning with a single-file
example. The runner already accepts a collection of files. The assistant adds
a check that rejects any selection whose length is not exactly one.

The example works. The tests pass. Yet selecting two otherwise compatible files
now fails because of a rule whose only explanation is that the first example
contained one file. If resource isolation requires rejecting a particular
combination, that is a different matter: the reason comes from interference
between resources. The example's file count supplies no such reason.

The mistake is a change in meaning:

> “We do not undertake broader support in this increment” becomes “the product
> must prevent broader use.”

The second statement introduces an additional requirement. It needs its own
justification.

Everyday language makes this easy to miss. We use *scope*, *constraint*,
*limitation*, and *restriction* loosely. “Only” may describe what the team will
work on, what the current implementation can do, or what the product is allowed
to do. Those are different statements.

| Statement | Meaning | Consequence |
| --- | --- | --- |
| “This increment addresses CSV imports.” | Delivery scope limit | Undertake the selected work; defer additional investment. |
| “Users may import only into accounts they can access.” | Required restriction | Fulfill and verify the access rule. |
| “The current parser cannot decode spreadsheets reliably.” | Known implementation limitation | Acknowledge the limitation and handle its consequences appropriately. |
| “We expect one operator at a time.” | Assumption | Establish whether the assumption is valid and what depends on it. |

The most useful distinction here is between a **scope limit** and a **required
restriction**. A scope limit bounds what we undertake to solve, deliver, and
verify now. A required restriction specifies behavior the product must limit
or prevent for an independently justified need.

These are working terms, rather than a claim that the industry uses one
universal vocabulary. IIBA uses *scope* for several kinds of boundaries and
defines solution scope through the capabilities a solution must deliver.
IREB uses *constraint* for a requirement that restricts the solution space.
Simply putting a sentence under a heading called “Scope” does not determine
its meaning. We still have to establish what the sentence requires and why.
[IIBA glossary](https://www.iiba.org/career-resources/a-business-analysis-professionals-foundation-for-success/babok/glossary/),
[IREB glossary](https://cpre.ireb.org/en/downloads-and-resources/glossary?exam-relevant=true&first-letter=C)

Acceptance examples are another source of accidental restrictions. An example
with three documents demonstrates something about three documents. It does
not automatically establish that four documents must be rejected. Cucumber's
Example Mapping deliberately separates rules, examples illustrating those
rules, unanswered questions, and stories deferred out of scope. Keeping those
categories distinct helps prevent an incidental example detail from acquiring
the authority of a business rule.
[Cucumber: Example Mapping](https://cucumber.io/docs/bdd/example-mapping/)

Existing code can make the confusion harder to detect. A restriction may have
entered during an earlier increment. Later, an assistant sees the check and
the tests protecting it and reasonably tries to preserve existing behavior.
The original scope decision has disappeared, while its accidental restriction
looks like an established requirement.

“It is already implemented this way” explains the current state. It does not,
by itself, establish that the restriction is still necessary. The same is true
of “the test expects it.” A test can faithfully encode a mistaken decision.

The cost extends beyond the initial check. Every restriction can create
additional paths to explain, verify, debug, and eventually change. Later
increments may require exceptions to it. Users may need workarounds. The team
can deliver a small amount of useful capability while accumulating a much
larger body of machinery around the boundaries of earlier examples.

NASA's study of flight software complexity documents the broader consequence:
unnecessary or overly stringent requirements can generate substantial analysis,
design, implementation, testing, and operational work. Its recommendation is
to substantiate requirements with rationale. The study does not investigate
this particular scope misunderstanding, but it provides strong support for
asking whether an apparently precise requirement deserves to exist.
[NASA: Study on Flight Software Complexity, section 2.2](https://www.nasa.gov/wp-content/uploads/2015/04/418878main_fswc_final_report.pdf#page=17)

The remedy also needs judgment. Deferring a capability does not promise that
every unlisted case already works. Supporting another file format may require
a different parser. Accepting an unsupported format could produce incorrect
results, so a guard may be justified by correctness. A required restriction
may also be satisfied by the design itself without adding new enforcement
machinery. We should establish the actual need and choose a proportionate
solution.

Nor does preserving flexibility require speculative generalization. Martin
Fowler's explanation of YAGNI concerns additional complexity introduced for
future needs. He explicitly observes that the argument does not apply when
accommodating a future need adds no complexity. Applied here, choose the
simplest coherent implementation that meets the current requirements. Defer
broader support when it requires additional investment; do not add machinery
merely to suppress broader behavior that the implementation already handles.
[Martin Fowler: Yagni](https://martinfowler.com/bliki/Yagni.html)

AI makes this a relevant communication problem, although it did not invent it.
A coding assistant must interpret the request and the authority of plans,
examples, code, and tests. Research on conversational assistants documents
models guessing ambiguous intent instead of resolving it. That supports the
need to make the distinction explicit, without proving how frequently agents
make this particular error.
[Chen et al.: Learning to Clarify](https://arxiv.org/abs/2406.00222)

During refinement or review, a useful question is:

> What independently requires this restriction, and what would go wrong if we
> omitted it?

“Outside this increment,” “the example used one file,” and “the existing test
expects it” are insufficient answers on their own. A security boundary, a
business rule, a correctness concern, or an operational risk may supply the
reason. Making that reason explicit lets us assess both the value of the
restriction and the cost of satisfying it.

Scope is a tool for controlling investment. Used carefully, it helps us learn
with a smaller commitment. When a delivery boundary becomes an unjustified
product restriction, it can make that smaller commitment more expensive than
it needed to be.
