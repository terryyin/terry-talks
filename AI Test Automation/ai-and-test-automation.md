# Using AI for testing in a complex legacy system

By Terry Yin. Content consolidated and clarified on 4 October 2026, based
primarily on Terry's [supplied transcript](source-transcript.md) and his
confirmed refinements. This is the content foundation for the short film.

**You probably don't want to do that.**

Ask AI to write automated tests for your legacy system? Perhaps that sounds
like an obvious way to improve quality. But in a large legacy project where maintenance problems arrive faster than
the team can solve them, generating more test code
may make its immediate problem worse. My recommendation is to use AI first to
help us learn what is wrong and reduce the burden we already carry, then build
automation we can use and maintain.

## Automated tests have value and upkeep

Useful automated tests protect behavior that matters. They give us feedback
when we change the product and can make fixing bugs and improving its design
safer. They preserve a decision about what we expect the product to do, so we
can check that expectation repeatedly. This continues the idea from
[Story Impact](../Story%20Driven/romantic-stories-disciplined-products.md): the
test should embody a useful decision, rather than leave people to guess what
it is protecting.

But an automated test is also software. Once we adopt its code, we must run it,
understand it, diagnose its failures, and maintain it as the product changes.
Its data, environment, and supporting tools also need care. Creating a healthy
suite takes effort; instability and slow feedback can turn a suite into a
source of toil. [Software Engineering at Google](https://abseil.io/resources/swe-book/html/ch11.html)

AI can help produce test code. That does not establish that the resulting
suite gives us useful protection at a cost we can manage. The new code is an
immediate responsibility; its value depends on what it protects and how well
it works. We should judge the balance, rather than assume that more tests
automatically mean a healthier product.

## When more test code can overload the team

Imagine a team whose defect backlog grows faster than it can resolve the
problems. Developers struggle to understand changes, fixes take too long, and
the system is already beyond their capacity to manage comfortably. Adding a
large generated suite can introduce another body of unfamiliar software,
failures, and maintenance work. It can be adding fuel to the fire.

A growing bug backlog is a warning signal, not proof that code complexity is
the only cause. We still need to understand what is blocking the team. The
question is whether this proposed automation helps us regain control or gives
us another obligation we cannot support.

The recommendation is not to wait for a perfect system before writing any
test. A small, targeted test may protect a necessary fix and make further
improvement possible. Google's account of its own troubled web server
describes automated testing helping it improve release quality and confidence.
That is a useful counterexample to a blanket ban on adding tests to a
struggling system. [Software Engineering at Google](https://abseil.io/resources/swe-book/html/ch11.html)

## Use AI to perform testing and help us learn

First, establish a stable, repeatable testing environment, isolated from other
people's work. We need to be able to control its starting conditions, exercise
the relevant behavior, and repeat a check without disrupting someone else's
session.

Then perform the checks ourselves. Learn how to use the system, confirm that
the checks are doable, and understand what an acceptable result looks like.
With that basis, ask AI to perform some of the same hands-on testing: follow
workflows, try relevant variations, observe results, and report suspected
problems. Browser interaction tools such as Microsoft's Playwright MCP show
that an AI can be given tools to interact with an application. That capability
does not establish how reliably it will find defects in a particular legacy
system. [Playwright MCP](https://github.com/microsoft/playwright-mcp)

Here, **AI performs hands-on testing** means executing and observing checks
without making a maintained regression suite the output. It includes known
checks; it may also include exploration as we learn. It is the activity Terry
calls “manual testing” in the transcript.

We need a precise distinction. AI using tools to execute checks is itself a
form of automation. The choice is between asking it to carry out testing work
and asking it to add a suite of test code that the team must own. The broader
meaning of test automation includes execution and result checking, rather
than only writing scripts. [ISTQB Test Automation Engineering syllabus, section 1.1](https://istqb.org/?download_id=3435&sdm_process_download=1)

AI can perform this work without adding new test code to the product
repository. That avoids one particular source of maintained-code growth; it
does not make the activity cost-free. The environment, tools, instructions,
and review of findings still require attention. A reported problem is a lead
to investigate, not automatically a confirmed defect.

The team then reproduces and understands useful findings, fixes the problems,
and improves the product. Discovery alone is insufficient. More reports will
not reduce the burden if we cannot act on them. Combine testing with the other
work needed to bring defects and complexity back within the team's capacity.

## Turn useful experience into selective automation

Repeated testing teaches us which checks matter, how to set them up, and what
their results should mean. As our understanding and ability to maintain the
system improve, we can turn selected checks into automated regression tests.
Keep the ones that provide worthwhile protection.

Some checks may first become end-to-end tests because they exercise a useful
workflow through the existing system. This is a possible route, not a required
first layer for every test. A focused unit or integration test may already be
the clearest and cheapest way to protect the behavior we understand.

Building reliable automation for this situation requires high-level software
engineering. We must make decisions
about behavior, design, dependencies, data, failures, and maintenance. Calling
it testing does not remove the programming problem. The ISTQB automation
engineering guidance explicitly expects software engineering skills and
addresses maintainability. The high-level engineering emphasis is Terry's
assessment of the demands of this work; the source does not rank it against
other programming disciplines. [ISTQB Test Automation Engineering](https://istqb.org/certifications/certified-tester-advanced-level-test-automation-engineering-ctal-tae-v2-0/)

The aim is a suite the team can understand, trust, and maintain. A test earns
its place through the behavior it protects and the feedback it gives us.

## Make the suite faster and smaller where it should be

Spare AI tokens are not a reason to generate more features or more tests.
Use available AI capacity to help improve the tests we need: find slow setup,
unnecessary work, duplication, and failures that are difficult to diagnose.
Measure whether the changes make useful feedback faster and more reliable.

Over time, aggressively remove tests that no longer provide useful protection.
Where an expensive end-to-end test repeats logic that a focused unit test can
protect, move that check closer to the logic. Keep checks that provide distinct
confidence about the wider system. Eliminating duplicate high-level checks is
consistent with the guidance in
[The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html#AvoidTestDuplication).

A unit test checks a small part of the software. An end-to-end test exercises
a complete path through the relevant system. Those scopes are different;
moving a calculation into a unit test does not establish that the whole path
still works. A focused integration test may be needed for interactions between
parts. Google's test-hourglass example describes replacing some broad checks
with integration tests and deleting the end-to-end tests they made redundant.
[Fixing a Test Hourglass](https://testing.googleblog.com/2020/11/fixing-test-hourglass.html)

Small tests often give faster feedback, but speed and maintenance cost depend
on how the tests are built. The test pyramid is guidance for choosing a useful
mix, not a rule that every high-level test is bad or that every unit test is
cheap. [Test Pyramid](https://martinfowler.com/bliki/TestPyramid.html)

Use AI to help us test, learn, fix, and simplify. Automate useful checks when
we can support them, then keep improving the suite. The goal is less burden
and better protection for the product we have to change.

## Terminology for this article

Terry confirmed “AI performs hands-on testing” for the specified overloaded
large legacy projects. The scope definitions below make the article consistent
without claiming universal agreement on test names.

| Term | Meaning here |
| --- | --- |
| Automated test code | Code that encodes actions and expected results for repeatable checks and becomes a maintained responsibility when adopted. |
| Automated regression suite | The maintained collection of checks used to detect unintended changes to behavior we want to preserve. |
| Test automation | The broader use of software tools to execute or support testing. It can include AI performing checks; it is not limited to generating a suite. |
| AI performs hands-on testing | Confirmed plain-language wording for AI interacting with the system, carrying out known checks or exploring, and reporting observations without creating a maintained suite as its output. |
| Manual testing | Terry's source wording for that activity. Traditionally associated with human execution and judgment; using it for autonomous AI needs an explicit explanation. |
| Exploratory testing | Learning about the system while designing, executing, and interpreting tests. It does not describe all execution of previously known checks. |
| Complexity beyond capacity | A situation in which understanding, safely changing, diagnosing, and maintaining the system exceed what the team can currently manage. No numerical threshold is claimed. |
| Repeatable testing environment | An environment with controllable starting conditions in which relevant checks can be repeated. Isolation here protects other people's work. |
| End-to-end test | A test of a complete workflow through the relevant parts of the system. It need not operate through a graphical interface. |
| Unit test | A focused check of a small part of the software; it does not establish that all collaborating parts work together. |
| Integration test | A check of interactions between selected parts, used when testing those parts separately does not protect the interaction. |
| Useful test | A test whose protection and feedback justify the cost of running, understanding, and maintaining it. |

Test scopes follow [Test Pyramid](https://martinfowler.com/bliki/TestPyramid.html).
The broader automation meaning follows the
[ISTQB automation syllabus](https://istqb.org/?download_id=3435&sdm_process_download=1).
The description of manual and exploratory testing is checked against
[ISTQB Quality in DevOps, sections 3.3.1 and 3.3.2](https://istqb.org/wp-content/uploads/2026/05/ISTQB-CT-QDO-Syllabus-v1.0-EN-1.pdf).
“Hands-on testing” is the confirmed editorial wording, not an official testing category.

## Fact checks and editorial treatment

Sources were checked on 4 October 2026. They support the narrower technical
claims below. The overall recommendation about how an overloaded team should
use AI is Terry's argument, qualified by the distinctions in this article;
these sources do not establish it as a universal experimentally proven
sequence.

| Source claim or ambiguity | Treatment in the article |
| --- | --- |
| Automated tests require understanding, execution, and maintenance. | Supported by the Google engineering account and ISTQB guidance. The article includes the cost of supporting tools and environments. |
| More test code means more net complexity and less value. | Qualified. It adds code to own, but useful tests can make change easier and reduce the overall burden. Code volume alone does not establish the net effect. |
| A growing defect backlog proves the system is too complex. | Treated as a warning sign in Terry's example, not a diagnosis of the only possible cause. |
| AI is obedient and efficient, so generating tests is obviously helpful. | Removed as a guarantee. Generating code and establishing useful, reliable protection are separate outcomes. No model-specific performance claim is made. |
| AI can perform testing without adding a maintained suite. | Tool-supported interaction is feasible. Avoiding repository additions is a chosen way of working, not a guarantee about every AI tool or its defect-finding reliability. |
| Manual testing adds no complexity and causes no damage. | Narrowed to avoiding new maintained test code. The environment and activity still have costs and can change state; isolation and controllable setup matter. |
| Test automation is a programming problem, not a testing problem. | Expressed as software engineering work that also requires testing judgment. Neither responsibility disappears. |
| Automation is one of the hardest areas of programming. | No comparative evidence has been established here. Terry confirmed that the article should say reliable test automation requires high-level software engineering. This is his assessment; no universal ranking is claimed. |
| Manual testing should become end-to-end automation before unit tests. | Preserved as a possible learning path, not a universal test-level order. Earlier focused tests may be useful. Terry confirmed this allowance for targeted useful tests in the specified overloaded legacy projects. |
| Redundant end-to-end tests can become fast unit tests. | Supported with a boundary: unit tests cover suitable local logic; integration and end-to-end checks retain distinct responsibilities. |
| Aggressively deleting tests improves the suite. | Keep the recommendation for tests that no longer add useful protection. Do not equate similar-looking tests with equivalent coverage. |
| Spare tokens should fund improvement rather than output for its own sake. | Retained as Terry's recommendation. It is a priority judgment, not an empirical claim that all new tests or features are waste. |

The supporting sources are cited beside the relevant argument above. None is
used to claim that AI removes maintenance, replaces all human testing judgment,
or has a verified defect-discovery rate for the audience's systems.

## Confirmed decisions

Terry confirmed these on 4 October 2026:

- The argument is for **large legacy projects whose maintenance problems
  arrive faster than the team can solve them**. Both the hands-on testing
  recommendation and the allowance for targeted automated tests share that
  scope.
- Use **“AI performs hands-on testing”** to distinguish performing checks
  from generating a maintained suite.
- Allow useful targeted automated tests early; challenge indiscriminate
  generation rather than impose a blanket automation-later rule.
- The structure is **hook → upkeep → overload → testing and fixing →
  selective automation → optimization and deletion**.
- Reliable test automation in this situation **requires high-level software
  engineering**. Preserve that emphasis without making an unsupported
  comparative ranking of programming disciplines.
- Aim for a film **around 70 seconds**, shorter when the important idea can
  still be delivered clearly. The LinkedIn audience should be able to follow
  the explanation at an unhurried pace.
- The coordinator is authorized to complete the film and show Terry the
  finished result. Creative choices are delegated: retain recognizable
  Story Impact style, improve the artistic design substantially, use vivid
  expressive characters and meaningful interesting animation, and sustain
  attention through the whole film.

## Film brief and source roles

The eventual film is for people in large software organizations whose legacy
systems are already complex. It assumes some familiarity with the software
lifecycle and technology. It now aims **around 70 seconds**, shorter if the important information remains
clear, and begins with **“You probably don't want to do that.”** It is
authored in **Terry Moves**. English is the starting language.

The article carries the full reasoning. The film will need a smaller spoken
presentation with visuals carrying part of the explanation. Its central
decision is how to use AI capacity when the team's maintenance capacity is
already stretched. The isolated environment and the final optimization and
deletion steps remain part of the argument even if they receive fewer words.

The recent Story Impact and Problem Decomposition films are possible style
references. A new genre or style that fits this technical topic is equally
welcome. Terry delegated title, metaphor, aspect ratio, narration, sound, and subtitle
choices to production. They should support a more polished and expressive
version of Story Impact's recognizable artistic language.

- **Primary content:** [Terry's original transcript](source-transcript.md).
  Its repetitions and speech slips are consolidated; the source remains
  unchanged.
- **Original production request:** recorded in the
  [queued film story](seed.md#testing-without-unmanageable-complexity).
  The audience, hook, runtime, medium, and open style choice come from Terry.
- **Related conceptual input:**
  [Story Impact](../Story%20Driven/romantic-stories-disciplined-products.md)
  supplies tests as explicit decisions and coherent product state.
  [Problem Decomposition](../Problem%20Decomposition/problem-decomposition.md)
  reinforces learning through useful work and caring for the current product;
  its wider philosophy is not added as a new topic for this film.
- **Project context:**
  [technical excellence](../TPS%20and%20AI/claims/08-technical-excellence-enables-jit-coordination-in-less.md)
  already treats fast, useful tests as a capability for changing the shared
  product. That claim retains its provisional status and is not independent
  evidence for this article's technical claims.
- **Style and authoring references:**
  [Story Impact film](../terry-moves/src/stories/StoryImpactFilm.tsx),
  [Problem Decomposition film](../terry-moves/src/stories/ProblemDecompositionFilm.tsx),
  its [film script](../Problem%20Decomposition/film-script.json), and
  [Terry Moves](../terry-moves/README.md). They inform future presentation;
  they do not override the transcript's content.

This article is the place to consolidate subsequent content clarifications.
The film story refers here instead of carrying another independently edited
version of the argument.
