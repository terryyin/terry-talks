# Claim 10: Freedom and trust can reinforce one another through jidoka

**Status: Provisional — not finalized**

## Original claim / hypothesis

> **Freedom and Trust** are the main theme of the TPS and AI talk.
>
> Freedom and trust appear to be a tension pair: increasing one seems to
> suppress the other. Yet LeSS depends on both. TPS teaches how they can live
> together and support one another, now with the addition of AI.
>
> AI is a beast of automation. TPS preserves the wisdom needed to tame that
> beast and use it for benefit rather than harm. Jidoka preserves learning in
> technical excellence. It frees people from repetitive, non-value-adding work
> and from being tied to one technical area, so they can concentrate on
> critical thinking, learning, and value.
>
> Freed in this way, people can become genuine learning agents, as intended by
> Respect for People. The organization can then trust their resourcefulness and
> coordinate in a Just-in-Time manner. It avoids producing detailed plans long
> before they are needed and avoids the high cost of changing those plans.

This is a lightly edited record of Terry's hypothesis. **Trust** is a working
term whose final wording depends on Claim 3. That claim found that Toyota puts
mutual trust under Respect for People, while “JIT trusts people” is Terry's
interpretation rather than Toyota's definition of JIT.

The proposed reinforcing loop is:

> **Jidoka and technical excellence preserve learning → routine burden and
> switching cost fall → people gain room and authority to learn and respond →
> demonstrated capability makes trust warranted → less detailed control is
> needed in advance → real need can pull responsible action just in time.**

## Research-based adjustment

The theme is defensible, but **freedom and trust are not simple opposites**.
The apparent opposition usually comes from placing freedom against control:
when an organization distrusts people, it may respond with approvals,
surveillance, detailed plans, narrow roles, and rules imposed from outside the
work. Those controls can reduce freedom without necessarily producing
trustworthy outcomes.

The opposite extreme also fails. Freedom without shared purpose, capability,
evidence, or limits asks others to accept unbounded risk. That can provoke more
control rather than more trust.

The stronger tension pair is therefore:

> **Freedom versus coercive control.**

Trust and enabling control can instead be complements. Organizational research
distinguishes controls designed to help people master and improve their work
from controls designed mainly to force compliance. A standard, test, stop
condition, or visible workflow does not have one fixed human meaning. It can
give a worker usable evidence and authority, or it can become an instrument for
monitoring and blame.

### Jidoka supplies enabling constraints, not freedom from constraint

Toyota's current account of jidoka combines several moves:

- people first learn and improve the work;
- a known abnormal condition is built into the equipment or process;
- the process stops automatically, or a person has authority to stop it;
- the abnormality becomes visible and defective work is contained;
- people respond, investigate, and prevent recurrence; and
- no one has to spend all their attention merely watching normal operation.

This supports Claim 6's description of automation as **crystallized prior
learning**. A test, invariant, safe interface, monitor, or stop rule can make
earlier judgment reusable. The constraint frees attention precisely because it
preserves something already learned and makes the boundary visible.

Jidoka therefore offers a more exact relationship between freedom and control:

> **Constrain what is already known to be abnormal so that people have more
> freedom and attention for what is not yet known.**

That freedom is substantive only when people retain the information, time,
skill, and authority to respond. A gate that blocks work but can be understood
or changed only by a remote specialist creates dependency, not agency. A noisy
alarm that people cannot safely act on creates burden, not freedom. An
automated check used to rank or punish workers turns an enabling mechanism into
a coercive one.

### LeSS needs bounded self-management, not unconstrained independence

LeSS explicitly makes teams responsible for executing work and for monitoring
and managing their process and progress. Its management guidance says teams
decide how to work and how to improve; managers build organizational
capability rather than direct the team's daily method.

That is meaningful freedom, but it exists inside common bounds: one product,
one Product Backlog, shared product direction, an integrated increment, and a
common Definition of Done. Transparency is not supposed to give managers a
remote-control dashboard. It gives the people doing the work and the wider
product group shared evidence from which to inspect and adapt.

The LeSS version of the Scrum Guide makes the trust relationship explicit at
this broader level. It says that Scrum's values, together with transparency,
inspection, and adaptation, come to life building trust. Trust is thus not a
permission granted once in the absence of evidence. It can grow through
repeatedly visible, responsible adaptation.

Technical excellence makes this organizational freedom less costly. Shared
code ownership, small changes, continuous integration, executable evidence,
and easy recovery let feature teams change one product without waiting for a
component owner to perform every step. But technical excellence alone does not
free every individual from every specialization. LeSS retains individual
skills and areas of focus while making the team collectively cross-functional.
Learning, pairing, collaboration, and organizational design are needed to
spread capability; automation by itself can merely hide specialist knowledge.

### Trust should be earned by capability, not demanded as faith

Claim 4 reframed JIT confidence as reliance on responsive capability rather
than on stockpiles. The same correction is needed here.

An organization cannot declare people resourceful and then remove plans,
buffers, support, and expertise. Nor should it demand that people trust an AI
because its output is fast or fluent. Trust becomes warranted through visible
evidence that the human-and-technical system can:

- detect actual need instead of producing work in advance;
- make small changes without disproportionate switching cost;
- expose uncertainty and abnormality early;
- stop or contain harm;
- bring capable people to exceptions;
- recover when a response is wrong; and
- leave the system more capable after learning.

This is a reciprocal loop rather than a one-way management concession. Leaders
give people real authority and room to respond. People use that freedom to
learn, meet commitments, surface problems, and improve the shared system.
Those observable behaviors justify less detailed direction next time.

The loop can also run backward. If every failure produces more approvals, or
if freedom is used to accumulate invisible work and local optimization, the
system creates evidence for distrust. Freedom and trust reinforce each other
only when problems can be made visible without making honesty dangerous.

### JIT reduces premature commitment; it does not abolish planning

Terry's link to long-lead planning is directionally strong. Claim 8 found that
technical excellence lets teams defer much detailed coordination until the
evolving shared product makes the right collaboration concrete. Small changes
and continuous integration also reduce the cost of discovering that a plan
must change.

The claim should not become “trust eliminates planning.” LeSS still has product
direction, an ordered backlog, refinement, Sprint Planning, and shared quality
expectations. The JIT-like move is to avoid converting distant uncertainty
into detailed commitments and handoffs earlier than useful.

> **Plan direction and constraints early enough to align the product. Pull
> detailed decisions and collaboration from the latest real need and evidence.**

Trust makes that deferral socially possible; technical excellence makes it
economically possible. If changing integrated software remains slow or
dangerous, management has a rational incentive to demand more prediction and
approval in advance.

### AI amplifies both sides of the system

Calling AI a **beast of automation** is a talk metaphor, not a research term.
It is useful because AI expands the range of work that can be delegated beyond
fixed, deterministic routines. It can generate code, plans, tests, analysis,
and decisions at a speed that can overwhelm review, integration, and human
learning.

Recent evidence supports neither automatic liberation nor automatic harm:

- DORA's 2025 research describes AI as an amplifier of an organization's
  existing strengths and weaknesses; the underlying system matters more than
  the tool alone.
- A 2026 randomized study of developers learning a new library found lower
  immediate mastery with AI assistance on average, while participants who used
  AI to seek explanations and build comprehension did better than those who
  mainly delegated production. The study was small and does not establish
  long-term effects, but it directly challenges the assumption that saved time
  automatically becomes learning.
- Bainbridge's classic “ironies of automation” warns that automation can leave
  people responsible for the rarest and hardest exceptions while weakening
  the involvement needed to handle them.
- Toyota's own 2025 Global AI Accelerator explicitly roots its AI effort in
  jidoka, pairs AI deployment with human-resource development, and says people
  should remain at the heart of technological change.

TPS therefore does not provide a technique for making AI harmless. It provides
a demanding design question:

> **Does this automation preserve and extend the capability of people to see,
> stop, understand, learn, and improve—or does it make them dependent on a
> system they are still expected to supervise?**

AI releases people for critical thinking only if the organization deliberately
protects critical thinking. Saved time can otherwise become higher output
targets, more generated inventory, reduced practice, and eventual deskilling.

## Emerging implication for the talk

The central theme can be stated as:

> **Freedom without trustworthy capability becomes risk. Control without
> freedom becomes compliance. Jidoka turns learned judgment into enabling
> constraints, giving people room to handle novelty while making known harm
> visible and stoppable.**

A more memorable formulation is:

> **Automate the known. Stop the abnormal. Free people to learn. Let visible
> capability earn trust. Coordinate from real need.**

The TPS–LeSS–AI bridge is then:

| Idea | Contribution to the loop |
|---|---|
| **Jidoka** | Preserves known judgment, contains abnormality, and releases attention without removing human stop authority. |
| **Technical excellence** | Makes evidence, integration, recovery, and change cheap enough for teams to act without specialist queues or excessive approval. |
| **LeSS self-management** | Places process, progress, and improvement decisions with the people doing the shared product work. |
| **Respect for People** | Treats people as capable of learning and gives them challenge, support, responsibility, and room to grow. |
| **Trust** | Grows from visible responsible action and allows less detailed control and earlier commitment. |
| **JIT** | Lets actual need pull work and collaboration instead of stockpiling output, plans, and decisions. |
| **AI** | Multiplies automation and adaptive generation, amplifying either the enabling loop or its coercive, deskilling opposite. |

The strongest version of the theme is not that TPS resolves freedom and trust
once and for all. It is:

> **TPS shows how a system can continually convert learning into constraints
> that make greater freedom responsible—and use that freedom to produce the
> next learning on which deeper trust can rest.**

## Questions still open

- After Claim 3 is settled, should the theme retain **trust**, or use
  **warranted trust**, **confidence**, **assurance**, or **reliance**?
- Is **Freedom and Trust** stronger as an apparent paradox introduced early in
  the talk, or as the conclusion the earlier claims gradually construct?
- What concrete story can show the whole reinforcing loop rather than only one
  link—for example, a novel failure becoming a test, a design constraint,
  broader team capability, and then less need for prior approval?
- Which freedoms matter most: freedom from routine watching, from repetitive
  work, from specialist dependency, to stop, to change the process, or to
  decide how to meet a product need?
- What evidence would show that saved AI time became learning and value rather
  than more output or higher utilization expectations?
- Who owns and can change an automated constraint? What makes a technical gate
  enabling rather than coercive in practice?
- Which skills must people continue to practice even when AI can perform the
  normal case, so they remain capable of supervision and exception handling?
- When is detailed advance planning still cheaper and safer than JIT response,
  especially for irreversible, regulated, or high-consequence decisions?
- How should the talk acknowledge lean implementations in which stop rules,
  transparency, and low buffers became pressure or surveillance rather than
  freedom and trust?

## Sources consulted

1. Toyota Motor Corporation, [Toyota Production
   System](https://global.toyota/en/company/vision-and-philosophy/production-system/).
   Current primary account of TPS as making work easier, jidoka as human wisdom
   added to automation, abnormality detection and stop authority, freedom from
   machine watching, prevention of recurrence, and continuing human kaizen.
2. Y. Sugimori, K. Kusunoki, F. Cho, and S. Uchikawa (1977),
   [“Toyota production system and Kanban system: Materialization of
   just-in-time and respect-for-human
   system”](https://doi.org/10.1080/00207547708943149), *International Journal
   of Production Research*, 15(6), 553–564. Early Toyota-authored account
   connecting JIT and jidoka with visible control, delegated authority,
   responsibility, worker participation, and respect for humanity.
3. Toyota Motor Corporation and four Toyota Group companies (2025), [“Five
   Toyota Group Companies to Accelerate Skill Development and Innovation in AI
   and Software”](https://global.toyota/en/newsroom/corporate/42805724.html).
   Primary source explicitly grounding Toyota's Global AI Accelerator in
   jidoka while pairing AI investment with practical education, career
   development, knowledge transfer, and people-centered technological change.
4. The LeSS Company, [Self-Management](https://less.works/less/management/self-managing-teams)
   and [Role of Manager](https://less.works/less/management/role-of-manager).
   Define team authority over process and progress and recast managers as
   builders of organizational problem-solving capability.
5. The LeSS Company, [Scrum Guide — LeSS
   version](https://less.works/less/scrum-guide). Connects self-management,
   respect for people as capable and independent, transparency, inspection,
   adaptation, and the building of trust.
6. The LeSS Company, [Technical
   Excellence](https://less.works/less/technical-excellence) and [Continuous
   Integration](https://less.works/less/technical-excellence/continuous-integration).
   Ground the claim that technical agility, shared evidence, small batches,
   jidoka-like stop-and-fix, and rapid integration enable flexible team action.
7. Paul S. Adler and Bryan Borys (1996), [“Two Types of Bureaucracy: Enabling
   and Coercive”](https://www.jstor.org/stable/2393986), *Administrative
   Science Quarterly*, 41(1), 61–89. Distinguishes formalization that helps
   people master their work from formalization used to force effort and
   compliance.
8. Fabrice Lumineau (2023), [“Rethinking Control and Trust Dynamics in and
   between Organizations”](https://doi.org/10.1111/joms.12999), *Journal of
   Management Studies*. Reviews the conditions under which control and trust
   complement, undermine, or substitute for one another.
9. Lisanne Bainbridge (1983), [“Ironies of
   Automation”](https://doi.org/10.1016/0005-1098(83)90046-8), *Automatica*,
   19(6), 775–779. Warns that automation can leave people with difficult
   exceptions while eroding the involvement needed to handle them.
10. DORA (2025), [*State of AI-assisted Software
    Development*](https://dora.dev/research/2025/dora-report/). Reports AI as
    an amplifier of existing organizational strengths and weaknesses rather
    than an independent transformation mechanism.
11. Judy Hanwen Shen and Alex Tamkin (2026), [“How AI Assistance Impacts the
    Formation of Coding
    Skills”](https://www.anthropic.com/research/AI-assistance-coding-skills).
    Preliminary randomized evidence that AI use can trade off against immediate
    mastery, while comprehension-seeking usage patterns preserve more learning.

**Still open for further discussion and fact-checking.**
