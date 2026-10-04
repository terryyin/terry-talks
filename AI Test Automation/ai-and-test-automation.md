# Using AI for testing in a complex legacy system

By Terry Yin. Content consolidated and clarified on 4 October 2026, based primarily on Terry's [supplied transcript](source-transcript.md) and his confirmed refinements. This
is the content foundation for the short film.

**Ask AI to write more tests? You probably don't want to do that.**

In a large legacy system, tickets arrive faster than the team can close them. People point to the missing automated tests. They may well be right: useful tests could make
changes safer. But asking AI to generate a pile of tests is not automatically the solution. Before that code gives us useful protection, it gives us more software to
understand and maintain. More upkeep can make the queue we already struggle with even harder to clear.

My recommendation in this situation is to use AI for hands-on testing, learn what is wrong, and fix confirmed problems without creating another body of test code to maintain.
Recover control, then turn useful learning into ordinary test code. As normal development resumes, express new intentions in tests first and let them drive development. Keep
simplifying the product and suite.

## Automated tests have value and upkeep

Useful automated tests protect behavior that matters. They give us feedback when we change the product and can make fixing bugs and improving its design safer. They preserve a
decision about what we expect the product to do, so we can check that expectation repeatedly. This continues the idea from [Story
Impact](../Story%20Driven/romantic-stories-disciplined-products.md): the test should embody a useful decision, rather than leave people to guess what it is protecting.

But an automated test is also software. Once we adopt its code, we must run it, understand it, diagnose its failures, and maintain it as the product changes. Its data,
environment, and supporting tools also need care. Creating a healthy suite takes effort; instability and slow feedback can turn a suite into a source of toil. [Software
Engineering at Google](https://abseil.io/resources/swe-book/html/ch11.html)

Reliable test automation requires high-level software engineering, and it must protect the original intent: what the product was meant to do. A test that copies existing
behavior without checking its purpose can preserve an accident or a bug. Recover intended behavior through people, requirements and understood examples; do not treat the
current implementation as its own specification. This extends the useful-decision argument in [Story Impact](../Story%20Driven/romantic-stories-disciplined-products.md).

AI can help produce test code. That does not establish that the resulting suite gives us useful protection at a cost we can manage. The new code is an immediate
responsibility; its value depends on what it protects and how well it works. We should judge the balance, rather than assume that more tests automatically mean a healthier
product.

## When more test code can overload the team

Imagine a team whose ticket backlog grows faster than it can close the tickets. Developers struggle to understand changes, fixes take too long, and the system is already
beyond their capacity to manage comfortably. Adding a large generated suite can introduce another body of unfamiliar software, failures, and maintenance work. It can be adding
fuel to the fire.

A growing ticket backlog is a warning signal, not proof that code complexity is the only cause. We still need to understand what is blocking the team. The question is whether
this proposed automation helps us regain control or gives us another obligation we cannot support.

The recommendation is not to wait for a perfect system before writing any test. A small, targeted test may protect a necessary fix and make further improvement possible.
Google's account of its own troubled web server describes automated testing helping it improve release quality and confidence. That is a useful counterexample to a blanket ban
on adding tests to a struggling system. [Software Engineering at Google](https://abseil.io/resources/swe-book/html/ch11.html)

## Use AI to perform testing and help us learn

The alternative is direct: **ask AI to perform hands-on testing**. Give it testing work to do, rather than a pile of test code to add.

First, establish a stable, repeatable testing environment that is easy to set up and isolated from other people's work. We need to be able to control its starting conditions,
exercise the relevant behavior, and repeat a check without disrupting someone else's session.

Then perform the checks ourselves and show the AI how we do them. Learn how to use the system, confirm that the checks are doable, and understand what an acceptable result
looks like. With that basis, ask AI to perform some of the same hands-on testing: follow workflows, try relevant variations, observe results, and report suspected problems.
Browser interaction tools such as Microsoft's Playwright MCP show that an AI can be given tools to interact with an application. That capability does not establish how
reliably it will find defects in a particular legacy system. [Playwright MCP](https://github.com/microsoft/playwright-mcp)

Here, **AI performs hands-on testing** means executing and observing checks without adding test code for the team to maintain. It includes known checks; it may also include
exploration as we learn. It is the activity Terry calls “manual testing” in the transcript.

We need a precise distinction. AI using tools to execute checks is itself a form of automation. The choice is between asking it to carry out testing work and asking it to add
a suite of test code that the team must own. The broader meaning of test automation includes execution and result checking, rather than only writing scripts. [ISTQB Test
Automation Engineering syllabus, section 1.1](https://istqb.org/?download_id=3435&sdm_process_download=1)

AI can perform this work without adding new test code to the product repository. That avoids one particular source of maintained-code growth; it does not make the activity
cost-free. The environment, tools, instructions, and review of findings still require attention. A reported problem is a lead to investigate, not automatically a confirmed
defect.

The team then reproduces and understands useful findings, fixes the problems, and improves the product. Discovery alone is insufficient. More reports will not reduce the
burden if we cannot act on them. Combine testing with the other work needed to bring defects and complexity back within the team's capacity.

## Turn useful experience into selective automation

Repeated testing teaches us which checks matter, how to set them up, and what their results should mean. As our understanding and ability to maintain the system improve, we
can turn selected checks into ordinary repeatable test code. The actions and expected results are encoded, so running the check no longer depends on an AI deciding what to do
or a developer interpreting each step. Designing and maintaining those checks still requires judgment. Keep the ones that provide worthwhile protection.

Some checks may first become end-to-end tests because they exercise a useful workflow through the existing system. This is a possible route, not a required first layer for
every test. A focused unit or integration test may already be the clearest and cheapest way to protect the behavior we understand.

Building reliable automation for this situation requires high-level software engineering. We must make decisions about behavior, design, dependencies, data, failures, and
maintenance. Calling it testing does not remove the programming problem. The ISTQB automation engineering guidance explicitly expects software engineering skills and addresses
maintainability. The high-level engineering emphasis is Terry's assessment of the demands of this work; the source does not rank it against other programming disciplines.
[ISTQB Test Automation Engineering](https://istqb.org/certifications/certified-tester-advanced-level-test-automation-engineering-ctal-tae-v2-0/)

## Resume intention-first development

Recovering protection for an existing legacy system is different from adding a new feature. For new development, express the intended behavior in a test before implementing
it. The test makes the decision visible, guides the code, and continues to protect that intention afterwards. Do not wait until the feature is finished and then ask AI to
imitate its implementation in tests.

This is the test-driven cycle: write a failing test for the next intended behavior, write code that satisfies it, then refactor both production and test code. Refactoring is
part of the cycle, not optional cleanup at the end. [Test Driven Development](https://www.martinfowler.com/bliki/TestDrivenDevelopment.html), [Agile Alliance:
TDD](https://agilealliance.org/glossary/tdd/).

This is Terry's recommendation for normal development, not a claim that every team already works this way. Useful tests can also be added later, including regression tests for
confirmed defects. The original intention is not forever lost: recovering it is engineering and product work. The warning is against indiscriminate generation with no clear
intention to protect.

## Make the suite faster and smaller where it should be

Spare AI tokens are not a reason to generate more features or more tests. Use available AI capacity to simplify code, investigate and fix bugs, and improve the tests we need:
find slow setup, unnecessary work, duplication, and failures that are difficult to diagnose. Measure whether the changes make useful feedback faster and more reliable.

Over time, aggressively remove tests that no longer provide useful protection. Where an expensive end-to-end test repeats logic that a focused unit test can protect, move that
check closer to the logic. Keep checks that provide distinct confidence about the wider system. Eliminating duplicate high-level checks is consistent with the guidance in [The
Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html#AvoidTestDuplication).

A unit test checks a small part of the software. An end-to-end test exercises a complete path through the relevant system. Those scopes are different; moving a calculation
into a unit test does not establish that the whole path still works. A focused integration test may be needed for interactions between parts. Google's test-hourglass example
describes replacing some broad checks with integration tests and deleting the end-to-end tests they made redundant. [Fixing a Test
Hourglass](https://testing.googleblog.com/2020/11/fixing-test-hourglass.html)

Small tests often give faster feedback, but speed and maintenance cost depend on how the tests are built. The test pyramid is guidance for choosing a useful mix, not a rule
that every high-level test is bad or that every unit test is cheap. [Test Pyramid](https://martinfowler.com/bliki/TestPyramid.html)

Use spare AI to simplify and fix. **Less to carry. Fewer bugs to chase.** That is a reason to reduce the burden, not a reason to generate more tests just because tokens are
available.

## Terminology for this article

Terry confirmed “AI performs hands-on testing” for the specified overloaded large legacy projects. The scope definitions below make the article consistent without claiming
universal agreement on test names.

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
| Tickets | The incoming work queue, including defects and maintenance work. Its growth is the film's overload signal, not a diagnosis of every underlying cause. |
| Original intent | The behavior people meant the product to provide, established from requirements, decisions and understood examples rather than simply copied from current code. |
| Repeatable test code | Encoded actions and expected results executable without AI judgment during the run; its creation and upkeep still require engineering. |
| Test-driven development | Tests express intended new behavior before implementation; failing test, passing code and refactoring form the development cycle. |

Test scopes follow [Test Pyramid](https://martinfowler.com/bliki/TestPyramid.html). The broader automation meaning follows the [ISTQB automation
syllabus](https://istqb.org/?download_id=3435&sdm_process_download=1). The description of manual and exploratory testing is checked against [ISTQB Quality in DevOps, sections
3.3.1 and 3.3.2](https://istqb.org/wp-content/uploads/2026/05/ISTQB-CT-QDO-Syllabus-v1.0-EN-1.pdf). “Hands-on testing” is the confirmed editorial wording, not an official
testing category.

## Fact checks and editorial treatment

Sources were checked on 4 October 2026. They support the narrower technical claims below. The overall recommendation about how an overloaded team should use AI is Terry's
argument, qualified by the distinctions in this article; these sources do not establish it as a universal experimentally proven sequence.

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
| More generated tests necessarily cause more product defects. | Not asserted. Added upkeep can compete with fixes and make the ticket queue harder to clear; the effect depends on useful protection and maintenance cost. |
| Tests added later cannot express genuine intent because the moment has passed. | Qualified. Intended behavior can be recovered and useful regression protection can be added later. Indiscriminate imitation of current behavior is the target. |
| New-feature development should be driven by tests that express intent first. | Terry's recommendation; the described test-first/code/refactor cycle is supported by Fowler and Agile Alliance. No universal adoption claim is made. |

The supporting sources are cited beside the relevant argument above. None is used to claim that AI removes maintenance, replaces all human testing judgment, or has a verified
defect-discovery rate for the audience's systems.

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
- The opening is **question → hook**, followed by tickets outpacing the team,
  the plausible missing-tests diagnosis and the conflict of more code/upkeep.
  State hands-on testing before explaining its prerequisites. After recovery,
  distinguish ordinary test code from AI execution, then normal test-first
  development and ongoing optimization/deletion.
- Reliable test automation in this situation **requires high-level software
  engineering**. Preserve that emphasis without making an unsupported
  comparative ranking of programming disciplines. Protect the original intent.
- Use an isolated, repeatable environment easy to set up; AI repeats demonstrated
  manual checks, while people investigate, confirm and fix findings.
- End with spare AI used for simplification and fixes. "Better protection" is
  too easy to misunderstand as another call to generate more tests.
- Simplify the animation, strengthen contrast and conflict, and correct arms
  that stretch. Fixed limb lengths and reachable staging support natural acting.
- Aim for a film **around 70 seconds**, shorter when the important idea can
  still be delivered clearly. The LinkedIn audience should be able to follow
  the explanation at an unhurried pace.
- The coordinator is authorized to complete the film and show Terry the
  finished result. Creative choices are delegated: retain recognizable
  Story Impact style, improve the artistic design substantially, use vivid
  expressive characters and meaningful interesting animation, and sustain
  attention through the whole film.

## Film brief and source roles

The film is for people in large software organizations whose legacy systems are already complex. It assumes some familiarity with the software lifecycle and technology. It now
aims **around 70 seconds**, shorter if the important information remains clear, and begins with **“Ask AI to write more tests?”** followed by **“You probably don't want to do
that.”** It is authored in **Terry Moves**. English is the starting language.

The article carries the full reasoning. The film uses a smaller spoken presentation with visuals carrying part of the explanation. Its central decision is how to use AI
capacity when the team's maintenance capacity is already stretched. The isolated environment and the final optimization and deletion steps remain part of the argument even if
they receive fewer words.

The recent Story Impact and Problem Decomposition films are possible style references. A new genre or style that fits this technical topic is equally welcome. Terry delegated
title, metaphor, aspect ratio, narration, sound, and subtitle choices to production. They should support a more polished and expressive version of Story Impact's recognizable
artistic language.

- **Primary content:** [Terry's original transcript](source-transcript.md).
  Its repetitions and speech slips are consolidated; the source remains
  unchanged.
- **Production brief:** the audience, hook, runtime, medium, and open style
  choice above come from Terry. The [film treatment](film-treatment.md)
  records the presentation, measured narration and sound;
  the [film guide](README.md) describes its production and export.
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
  [Terry Moves](../terry-moves/README.md). They inform the presentation;
  they do not override the transcript's content.

This article is the place to consolidate subsequent content clarifications. The film draws from this article rather than carrying another independently edited version of the
argument.