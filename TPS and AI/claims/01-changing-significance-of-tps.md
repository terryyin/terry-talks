# Claim 1: The changing significance of TPS

**Status: Provisional — limited to Toyota's own account and Claim 4's
chronology**

## Reconciled claim

TPS developed inside Toyota over many decades and remains the company's named
production system. Toyota still presents **jidoka** and **Just-in-Time** as
its two operating pillars. That is enough for this claim: TPS is not a
historical curiosity, and it did not begin as an export brand.

The chronology of that development—prewar conception, wartime interruption,
postwar experiment, and recovery into a practical system—is the talk's
historical index in
[Claim 4](04-jit-assurance-resourcefulness-and-constraint.md). Later
international lean teaching is not that origin story, and this claim does not
rest on it.

TPS therefore has not simply become less important. Its relevance changes when
the work has a different mixture of production, discovery, and change.

## Implication for the talk

> **TPS accumulated decades of learning about producing complex physical
> products repeatedly, with high quality, short lead time, and low waste.
> Software development has a different mixture of production, discovery, and
> change. The useful transfer is the reasoning by which Toyota made a whole
> system responsive and learnable, not a literal copy of its mechanisms.**

This produces the central comparison:

> **TPS problem:** How can the system respond to actual need without
> stockpiling, while exposing and containing abnormalities and improving its
> capability after each one?

> **AI-augmented software problem:** Under LeSS, how can we use AI to our
> advantage by supporting jidoka and poka-yoke, freeing teams to learn and
> respond while building an organization that trusts them to create a
> sustainable product for real customer needs?

TPS is useful here as a worked example of system reasoning. Pull, jidoka,
small batches, technical excellence, human agency, and continuous improvement
should be examined for the relationships they create, not copied as
manufacturing mechanisms.

## AI, durable learning, and freedom

AI brings a powerful new ability to automate many kinds of work. DORA's
research suggests that it amplifies the strengths and weaknesses of the system
around it; it does not automatically make that system more capable or more
learnable.

Jidoka offers a useful discipline for this situation. Toyota first improves the
work, identifies a known abnormality, and builds detection and stopping into
the process. People then need to respond to the abnormality rather than watch
normal operation continuously. In software, learning can be preserved in two
complementary forms:

- **executable judgment through jidoka:** tests, checks, visible abnormalities,
  diagnostic evidence, and stop conditions; and
- **preventive design through poka-yoke:** removing unnecessary code, making
  illegal states unrepresentable, and preventing known mistakes by design.

Both embody judgment spent earlier. [Claim
6](06-jidoka-embeds-routine-judgment.md) names them prevent-by-design and
detect-and-stop, not levels of intelligence. [Claim
20](20-poka-yoke-supports-jidoka-not-a-tps-pillar.md) owns poka-yoke: a
supporting method under jidoka, not a third TPS pillar.

AI can still help when no durable mechanism results. Novel investigation,
explanation, and genuinely one-off work may be valuable in themselves. The risk
grows when a known, recurring problem continues to be delegated to AI instead
of becoming easier, safer, or automatically detectable. The team may keep
paying for reconstruction and verification, and may become less capable of
responding without the AI.

AI can also help teams propose tests, assertions, refactorings, and preventive
designs. Research shows real potential in these uses, together with failing
generated tests and unsafe refactorings. An AI-generated safeguard therefore
becomes part of the team's jidoka or poka-yoke only when the team can
understand, verify, own, and improve it.

The resulting principle is:

> **Use human and AI reasoning to investigate what is still novel. As reliable
> learning emerges, preserve as much of it as practical in the simplest durable
> form: prevent the known mistake by design, or detect and stop it near its
> origin.**

This can free attention and response capacity from known, recurring burdens.
Broader team freedom also requires authority, skill, time, and an organization
that supports self-management. Human work remains essential for continuous
improvement, critical thinking, decisions about customer value and acceptable
risk, and the responsibilities assigned by the relevant legal and governance
context.

## Trust and a sustainable product under LeSS

LeSS connects self-management, transparency, inspection, adaptation, and its
values with building trust. Organizational trust is therefore not blind faith.
Teams make their capability visible by delivering working software, exposing
abnormalities, preserving what they learn, responding to feedback, and
improving the system. As
[Claim 10](10-freedom-and-trust-reinforce-through-jidoka.md) develops, this
gives the organization reason to rely less on detailed control.

For this talk, a sustainable product has two observable properties:

- teams put integrated working software in front of real users quickly enough
  for evidence to change product direction; and
- the code and delivery system reduce **avoidable interest on past shortcuts**,
  so future changes spend less effort on preventable confusion, manual
  checking, fragile design, and missing feedback.

The aspiration is for the cost of change to be increasingly dominated by the
essential complexity of the change itself. Integration, migration,
verification, coordination, and other real costs remain, while technical
excellence and preserved learning steadily reduce the accidental costs created
by the system.

## Research standing

Toyota, LeSS, and technical-debt research directly support the argument's main
components. Current AI studies support both capability and risk, but remain
context-specific. The complete TPS–AI connection is therefore the talk's
research-informed synthesis, not a directly tested result; legal responsibility
also depends on jurisdiction, role, contract, and application.

## Domain differences

Which material differences change how TPS relationships operate in
practice is developed in
[Claim 11](11-physical-production-and-software-differences.md).

## Sources consulted

Historical chronology and its Toyota sources are in
[Claim 4](04-jit-assurance-resourcefulness-and-constraint.md). This list
supports the remaining argument.

1. Toyota Motor Corporation, [Toyota Production
   System](https://global.toyota/en/company/vision-and-philosophy/production-system/).
   Primary account of jidoka: improve the work manually, define abnormalities,
   build in detection and stopping, prevent recurrence, and remove the need for
   continuous machine watching.
2. Toyota Motor Corporation, [Toyota Virtual Plant Tour: Toyota Production
   System](https://global.toyota/en/company/plant-tours/production-system/).
   Official examples of jidoka and poka-yoke, including automatic stopping and
   fail-safe detection of a simple assembly mistake.
3. DORA (2025), [*State of AI-assisted Software
   Development*](https://dora.dev/research/2025/dora-report/). Reports AI as an
   amplifier of the underlying organizational system rather than an independent
   transformation mechanism.
4. Judy Hanwen Shen and Alex Tamkin (2026), [“How AI Impacts Skill
   Formation”](https://arxiv.org/abs/2601.20245). Randomized experiments found
   weaker conceptual understanding, code-reading, and debugging performance on
   average with AI assistance; cognitively engaged usage patterns preserved
   learning better than delegation.
5. Joel Becker, Nate Rush, Elizabeth Barnes, and David Rein (2025), [“Measuring
   the Impact of Early-2025 AI on Experienced Open-Source Developer
   Productivity”](https://arxiv.org/abs/2507.09089). A randomized trial in
   mature repositories found that the studied early-2025 tools slowed its small
   sample of experienced maintainers, contradicting both their expectations and
   any claim of automatic productivity gain.
6. Ye Shang et al. (2025), [“A Large-scale Empirical Study on Fine-tuning Large
   Language Models for Unit Testing”](https://arxiv.org/abs/2412.16620).
   Demonstrates potential across test generation, assertion generation, and
   test evolution, while reporting substantial failing-test and build-error
   rates even for the strongest studied model.
7. Bo Liu et al. (2024), [“An Empirical Study on the Potential of LLMs in
   Automated Software Refactoring”](https://arxiv.org/abs/2411.04444). Found
   useful refactoring recommendations alongside behavior-changing and
   syntactically invalid suggestions; recommends applying validated
   deterministic refactoring machinery to control the risk.
8. Harry Robinson (1997), [“Using Poka-Yoke Techniques for Early Defect
   Detection”](https://www.researchgate.net/publication/374808625_Using_Poka-Yoke_Techniques_for_Early_Defect_Detection).
   Primary software case report describing automated checks that prevented
   classes of localization defects, while noting that those checks did not
   replace testing whether the application actually worked.
9. The LeSS Company, [Principles
   Overview](https://less.works/less/principles/overview) and [Scrum Guide —
   LeSS version](https://less.works/less/scrum-guide). Connect real-customer
   feedback, tangible done increments, self-management, empirical adaptation,
   and trust.
10. Terese Besker, Antonio Martini, and Jan Bosch (2019), [“Software Developer
    Productivity Loss Due to Technical
    Debt”](https://doi.org/10.1016/j.jss.2019.06.004), *Journal of Systems and
    Software*, 157. A longitudinal study and replication found substantial
    reported time loss from technical debt, especially through additional
    analysis, testing, and refactoring.
11. Frederick P. Brooks Jr. (1987), [“No Silver Bullet—Essence and Accidents of
    Software Engineering”](https://doi.org/10.1109/MC.1987.1663532), *Computer*,
    20(4), 10–19. Supports treating essential complexity as irreducible while
    attacking accidental difficulty, not promising that all non-essential cost
    will disappear.
12. OECD.AI, [Accountability
    principle](https://oecd.ai/en/dashboards/ai-principles/P9). Assigns
    accountability to organizations and individuals according to their roles,
    context, and applicable regulatory frameworks.
