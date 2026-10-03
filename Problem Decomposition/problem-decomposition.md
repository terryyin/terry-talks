# Problem decomposition in software development

By Terry Yin. Working article, 3 October 2026. The argument follows Terry's [original transcript](raw-content.md) and his subsequent clarifications. Confirmed meanings and remaining editorial choices are recorded below.

Problem decomposition is a way of planning software development around smaller customer problems. Done well, it lets us deliver something useful, learn from its use, and change direction without leaving a large investment in unfinished work behind us. It expresses a philosophy of development: pursue value through successive attempts, and preserve the freedom to respond to what we learn.

This article develops that philosophy as the content source for a short film, following *Story Impact*. The article holds the full argument; the eventual two-minute film will need a smaller presentation of it.

## Problem decomposition and solution decomposition

An external problem describes something that matters in a customer's or user's world: a need, a difficulty, or an opportunity. Problem decomposition breaks that problem into narrower problems we can address and evaluate one at a time. It gives us a plan for attempting to solve the larger problem.

Solution decomposition organizes a conceived solution into understandable, maintainable parts. Components, layers, interfaces, and their responsibilities belong to this work. We need good solution structure, but its organization answers a different question from the order in which we should solve customer problems.

It is easy to begin with a customer problem, imagine a solution, and then use the parts of that imagined solution as the remaining plan. A database, an API, and a screen are smaller pieces of a solution. This assumes an answer has already been conceived and organizes the work of implementing it. Software development also requires discovering the implementation idea: what answer will actually solve the customer's problem? Completing the imagined parts separately may still leave the customer waiting for anything useful.

Consider three friends who want to get home after dinner. We could first help them find the next train. Other problems might concern checking the fare or finding a step-free route. Each is a narrower customer scenario with a result someone can use and evaluate. Discovering that the proposed route has stairs might make a step-free route the next priority. Deciding to build the database first, then the API, then the screen instead organizes work around a proposed implementation. The train time, walking time and feedback shown in the film are illustrative, not live travel advice or a claim that these are the best priorities for every travel product.

The distinction continues part one's idea: a story carries a desired impact and can cross product boundaries; the resulting product needs coherent behavior and structure. Planning units need not mirror components or features.

## Two premises

The first premise is that we can seek smaller user problems within a large one. A broad need can become a narrower need, then a more specific scenario. We keep asking what smaller useful result someone could recognize, without making an imagined internal solution the basis of the split. This is a working premise and a discipline for searching, not a proof that every possible problem admits every desired size of independently useful result.

The second premise is that a development plan cannot guarantee a successful answer to an uncertain customer problem. We may misunderstand the need, choose an ineffective answer, or discover something that changes the priority. A plan is an attempt. Its boundaries may be fuzzy and its account of the future incomplete. Executing it faithfully cannot by itself establish that the problem has been solved.

This does not deny that known procedures can have predictable results. It places the uncertainty where it belongs: in discovering and solving the customer's problem. We plan enough to make the next attempt worthwhile and remain willing to revise the rest.

## Two optimization goals

### Deliver value and learn from it

Each completed unit should realize useful value and create an opportunity for feedback. Its value should stand in the current product, without depending on the completion of future units. We can then check whether the result makes the difference we hoped for.

**Just in time** guides the timing and amount of that work. Toyota describes it as producing what is needed, when it is needed, in the amount needed. [Toyota Production System](https://global.toyota/en/company/vision-and-philosophy/production-system/) In software, we apply this spirit by delivering useful value when it matters and keeping each increment small enough to evaluate. We avoid producing more changes than we can usefully learn from.

The analogy has a limit: a proposed software change is a hypothesis about usefulness, whereas replenishing a known consumed part has a different demand signal. Delivery and feedback let us test the hypothesis instead of treating the plan as proof that the work is needed.

Customer value is the main focus. Option value also matters because the product we leave behind determines what future customer value will cost to deliver.

**Customer value** is the benefit experienced by customers and users. It is the reality check: we believed the change would be useful, and now people can use it and help us judge that belief. The person paying and the person using the product may differ; we need to understand both rather than equating value with the amount of software produced.

**Option value** is the economic worth of the product's potential to deliver future customer value at a given cost, without building or specifically preparing those future features now. A healthy product may let us add an important capability cheaply when it is needed. That potential is worth money even before the capability exists. The idea is borrowed from finance and is closer to a real option than a stock option.

This value is **speculative**. We may predict the wrong future need. Making one anticipated feature cheap is less useful if customers later need something else and our preparation makes that alternative expensive. We therefore judge the potential across plausible future customer needs, giving more weight to the more probable ones and considering both their value and their delivery cost. This is a qualitative judgment about uncertain futures, not a claim that a simple average is a complete financial valuation formula.

An unused feature provides no current customer benefit. It might become useful later, but carrying it now can add complexity, ongoing cost, and commitments that close other options. Across plausible futures, that preparation may decrease the product's overall option value. Clarity, cohesion, tests, and a structure that expresses the current domain can support future possibilities without adding such speculative features.

Implementing a useful current feature can both consume options and create new ones. The aim is to deliver today's value while leaving a healthy product whose likely future changes remain affordable. [Baldwin and Clark](https://www.library.hbs.edu/working-knowledge/more-than-the-sum-of-its-parts-the-impact-of-modularity-on-the-computer-industry) describe options embedded in design. Their [research on modularity](https://www.hbs.edu/ris/Publication%20Files/01-075_3a180fce-22c4-4d49-97ed-956e3bdbccc8.pdf) connects design options with uncertainty, experimentation costs, and economic value. This article applies that idea to software product health; it does not claim that speculative abstraction automatically pays for itself.

Delivered value enables feedback; it does not guarantee that feedback arrives immediately or that the result is valuable. Technical checks can establish known quality conditions. Learning whether a change is useful also requires observation and judgment in the customer's world.

### Make stopping and changing direction inexpensive

After completing a unit, we should be able to stop the remaining plan while retaining the value already delivered and whatever we have learned. **Change direction without waste or damage:** no half-built future outcome to abandon, and no broken current product to repair. Unstarted units should not leave speculative infrastructure, unfinished promises, or cleanup required merely to protect the current product.

Just in time also applies to our commitments. Build supporting capabilities when the current outcome calls for them. Leaving unnecessary future work unstarted keeps a change of direction affordable. When feedback shows that the direction is wrong, we can revise the remaining plan rather than continue producing avoidable waste.

The journey product, for example, can remain useful by showing the next train. If feedback makes a step-free route more urgent, we can leave fare checking unstarted. That stopping point becomes expensive if we have already built half of several anticipated capabilities or made the train result depend on them.

The aspiration is no avoidable leftover cost at a completed boundary. It does not mean that effort already spent, interrupted work, deployment obligations, or every real-world change of direction has literally zero cost. We choose units and working practices that move us toward that aspiration.

This goal makes the first one actionable. Feedback has little practical value if acting on it requires abandoning a large amount of unfinished work. A useful decomposition gives us both evidence for a new direction and an affordable opportunity to take it. [Why LeSS](https://less.works/less/framework/why-less) likewise connects inexpensive changes of direction, discovery through frequent delivery, and maximizing value for customers and users.

## Principles for applying the goals

### Split around useful scenarios

Choose the scope of a unit by the external result someone needs. A narrow scenario usually requires changes across several layers or components. That is why this approach tends toward **vertical slicing**: completing the path needed for a useful outcome.

Vertical does not mean touching every component in the product. It means crossing every boundary required by this outcome. The exact code structure is a design decision. LeSS's [architecture and design guidance](https://less.works/less/technical-excellence/architecture-design) supports developing customer scenarios across the required layers while evolving the architecture through that work.

The **three Vs** are a useful check on a story:

- **Valuable:** it changes an outcome for a named customer, user, or stakeholder.
- **Visible:** that person can evaluate the result without inspecting the implementation.
- **Vertical:** it works end to end through all the required parts.

These definitions come from Open Dough's [problem-decomposition reference](https://github.com/terryyin/open-dough/blob/298730b3b4065121de22596bc2d6ea56c62963a4/src/skills/dough-story-decomposition/references/problem-decomposition.md). They are used here as a test of the proposed planning unit. The exact ADR recalled in the transcript has not been located, and these are not presented as Toyota terminology.

### Finish useful work and limit unfinished work

In this approach, **one at a time is one-piece flow**: focus on finishing one customer outcome at the scale being decomposed. The piece is a useful outcome, and our work should carry it through to completion. Starting many pieces can leave us unable to change direction cheaply even when each proposed piece is small.

Several people or teams may collaborate toward a shared customer outcome. Their internal work needs direct communication, integration, and reconciliation of design decisions. Those responsibilities do not turn the customer's plan into a sequence of component handoffs. A shared goal is a reason to collaborate on a coherent product.

Let that current outcome pull the necessary solution work. Developers respond resourcefully with the capability and resources at hand, improving them where the current need calls for it. This is how just-in-time work serves customer value while avoiding a stockpile of anticipated solutions.

At a larger scale, teams can work on smaller items within the same larger customer goal. The discipline repeats at each scale: finish the outcome being pulled and avoid spreading effort across unnecessary unfinished commitments. Coordination serves that flow toward value.

### Repeat the logic at smaller scales

Decomposition is **fractal** in the sense that its reasoning repeats. A large customer problem can become narrower stories and then specific scenarios. Within their implementation, we seek small changes, rapid checks, and useful stopping points serving the same current purpose.

At the smallest scale, the discipline becomes:

> **Every commit is your last commit.**

Each commit should earn its place through the purpose it fulfills now, or by responding to an existing, previously defined and documented pull requirement. That requirement may concern keeping the current product healthy as well as delivering new behavior. A hypothetical later commit does not establish a pull. It should leave the product looking like a coherent current result, rather than preparation that needs the next commit to justify its existence. Ask what would remain if development ended here.

Every commit strives to deliver customer value by itself. That is difficult, and we cannot always achieve it. A commit may improve current structure or encode a decision in a test. It must still serve the current purpose or an established pull; the expectation of later commits is insufficient by itself. The aspiration keeps us looking for a smaller useful result, rather than treating small size alone as evidence of value.

Committing and integrating every five to ten minutes is Terry's illustrative working cadence, not a universal timing rule. The important questions are whether each commit can stand as our last, whether it answers an established need, and whether the product remains coherent. A shorter cycle helps only when verification and integration are practical.

We also need not subdivide the entire future in advance. LeSS's [Take a Bite example](https://less.works/less/framework/introduction) describes selecting a small customer scenario, implementing it, and using feedback before returning to further refinement. The same logic keeps decomposition itself responsive to learning.

### Maintain the health of the whole product

Customer scope determines the purpose and bounds of the work. It does not confine engineers to one component. They must be able to change the parts needed for the outcome and leave the whole product coherent.

There is no required one-to-one correspondence between the planning hierarchy and the implementation structure. Stories can share internal solutions; components can serve several scenarios. Good design brings together things that belong together, keeps unrelated responsibilities apart, and expresses the business domain consistently through code, data, interfaces, and tests.

Design can grow through successive changes, with deliberate architectural judgment and refactoring along the way. Whole Product Focus requires care for the result of each change, including its effect on future changes. It is not a promise that small stories automatically produce good architecture.

A narrow scenario helps bound the question being solved and reduces the amount of context we need at once. Its physical code impact may still be broad if the current design is entangled. That is a reason to improve the design as needed for the current purpose, preserving option value as well as customer value. Open Dough's [ADR 0002](https://github.com/terryyin/open-dough/blob/298730b3b4065121de22596bc2d6ea56c62963a4/docs/adrs/0002-software-development-lifecycle-principles-accepted.md) connects whole-product understanding, cohesive shared solutions, direct domain mapping, and low-cost changes of direction.

## Terminology for this article

These definitions make the article internally consistent. Terry confirmed **story**, **slice**, and **scenario** as the names for the planning units and user situations; **leaf** is omitted as an additional name.

| Term | Meaning here |
| --- | --- |
| External problem | A need, difficulty, or opportunity in a customer's or user's world. |
| Problem decomposition | Splitting that problem into narrower useful outcomes and scenarios for planning. |
| Solution decomposition | Organizing a conceived solution into coherent parts and responsibilities. |
| Plan | A provisional arrangement of attempts to solve the problem, revised as we learn. |
| Story | A planning account of a desired change with user or learning value; it may cross features and components. |
| Scenario | A specific situation in which a user needs or experiences an outcome. |
| Slice | A bounded smaller unit within a selected story; it may deliver behavior or include structural work necessary for the current outcome. |
| Feature | A capability of the current product, rather than a historical planning unit. |
| Customer value | Benefit realized by customers and users. |
| Option value | The speculative economic worth of being able to deliver future customer value at a given cost without preparing the future features now, considered across plausible needs and their probabilities. |
| One-piece flow | In this approach, finishing one customer outcome at a time at the scale under discussion; people or teams may collaborate on it. |
| Every commit is your last commit | The discipline of making each commit serve its current purpose or an already defined, documented pull, striving for customer value without requiring later commits to justify it. |
| Documented pull requirement | An existing current need, defined and recorded before the change, that calls for the work; it may include necessary work to keep the current product healthy. A hypothetical later commit is insufficient justification. |
| WIP | Work in progress: commitments started and not yet complete. |
| Safe stopping point | A completed boundary that preserves useful current value without requiring unfinished future units. |
| Whole Product Focus | Responsibility for a coherent shared product while solving a bounded customer problem. |

## Evidence and editorial clarifications

External definitions were checked on 3 October 2026. The developmental argument and recommendations are Terry's philosophy, clarified from the transcript; they are not presented as experimentally proven universal rules.

| Point checked | Treatment in the article |
| --- | --- |
| Two optimization goals | Consistent with the transcript, Accepted Open Dough ADR 0002, and the primary Why LeSS statement. Learning reinforces the pair; it is not silently turned into a third goal. |
| One-piece flow | Terry confirmed one at a time as the software application: finish one customer outcome. The broader [LEI definition](https://www.lean.org/lexicon-terms/continuous-flow/) concerns movement through successive steps and does not require one active item across an entire organization. The article states its scale explicitly. |
| Vertical slicing | Checked against LeSS architecture guidance. Touch the required layers; there is no requirement to touch every part of a product. |
| Three Vs | Verified in the Open Dough decomposition reference. Exact recalled ADR unresolved; no attribution to that ADR is invented. |
| Option value | Terry confirmed its speculative economic meaning across probable future customer needs, their value, and their delivery costs. Baldwin and Clark support design options under uncertainty. Probability weighting here is qualitative, not a complete valuation formula. Useful implementation can create and consume options; unused speculative features may reduce overall option value. |
| Just in time | Checked against [Toyota's official account](https://global.toyota/en/company/vision-and-philosophy/production-system/), which also includes coordinated processes and limited replenishment stocks. Software feedback capacity and pulling solution work from a current problem are this article's application, embedded in the goals and principles. |
| No guaranteed solution | Scoped to uncertain customer problem solving, not every algorithm or known procedure. |
| No waste and zero switching cost | Expressed as an optimization aspiration at completed useful boundaries, not a literal guarantee for interruption at every instant. |
| Five to ten minutes | Preserved as Terry's example, not an externally verified universal prescription. |
| Every commit is your last commit | Terry supplied the slogan and confirmed customer value per commit as an aspiration that is difficult to achieve consistently. The current commit or an existing defined, documented pull must justify the change, rather than preparation for later commits. |
| Narrow scope and organic design | Narrow scope helps focus; small size alone cannot guarantee narrow code impact, good design, or freedom from debt. |
| Spoken slips and repetitions | Repetition is consolidated; GPS is rendered as TPS and the later third-goal reference is kept within the stated pair. The raw transcript remains unchanged. |

Supporting project inputs are [Claim 4](../TPS%20and%20AI/claims/04-jit-assurance-resourcefulness-not-abundance.md), [Claim 5](../TPS%20and%20AI/claims/05-smed-software-changeover-and-ai-friendly-context.md), [Claim 8](../TPS%20and%20AI/claims/08-technical-excellence-enables-jit-coordination-in-less.md), [Claim 11](../TPS%20and%20AI/claims/11-physical-production-and-software-differences.md), [Claim 17](../TPS%20and%20AI/claims/17-jit-vertical-slicing-one-piece-flow.md), and [Claim 18](../TPS%20and%20AI/claims/18-continuous-improvement-towards-perfection.md). They retain their existing provisional status. The previous [Story Impact article](../Story%20Driven/romantic-stories-disciplined-products.md) supplies the distinction between planning a transition and describing current product state.

The nearby Open Dough checkout was at `298730b3b4065121de22596bc2d6ea56c62963a4` during this consolidation. Its index and relevant record statuses agree: ADRs 0001 and 0002 are Accepted, and the proposed lifecycle ADRs are not treated as accepted input. [ADR 0001](https://github.com/terryyin/open-dough/blob/298730b3b4065121de22596bc2d6ea56c62963a4/docs/adrs/0001-ubiquitous-language-accepted.md) supports the story and slice vocabulary. These sources inform the article; they do not import another project's architecture policy into terry-talks.

## Confirmed meanings

Terry confirmed and clarified the following on 3 October 2026:

- **One at a time is one-piece flow in this approach.** Focus on finishing one customer outcome. People or teams may collaborate toward that outcome, and the same reasoning applies within a larger shared goal.
- **Option value is speculative potential worth money.** It concerns future customer value achievable at a given cost without preparing that feature now. Consider probable future needs rather than assuming one prediction is right. An unused prepared feature can add complexity, close alternatives, and make a different future need more expensive. Useful current implementation can create and consume options. Option value supports the argument; it is not the film's main focus.
- **Every commit is your last commit.** A commit should serve its own current purpose or respond to an existing, previously defined and documented pull. It should not depend on preparing for later commits to justify its place in the product. Customer value from every single commit is the aspiration, recognized as difficult to achieve consistently.
- **Story, slice, and scenario are the chosen terms.** Use story for a customer-level planning unit, slice for bounded work within it, and scenario for the specific user situation. Omit leaf as an additional name.
- **Documented pull includes current product health.** An existing, defined and recorded current need can call for necessary work to keep the product healthy. A hypothetical later commit does not establish that need.
- **The article has four parts.** Distinguish problem and solution decomposition, establish the premises, explain the goals, and develop the principles. Embed just in time within that argument, particularly the goals, instead of giving it a separate structural section.
- **Development discovers an answer.** Dividing an already conceived implementation into database, API and screen layers is solution decomposition. Problem decomposition keeps narrower customer needs as the basis for discovering and evaluating the answer.
- **Freedom to change means no waste or damage at completed boundaries.** Keep the useful product and leave later outcomes unstarted, rather than abandoning half-built work or repairing harm from it.

## Film adaptation and source gap

The terminology and structure questions raised during article consolidation are resolved. The revised English film is a recognizable sequel to Story Impact: its Structure / Behavior / Time stage, customer-outcome balls, splashes and assimilation carry the decomposition argument. Three friends getting home after dinner and mature editorial art make the idea concrete. The conceived solution is labeled directly on the product's structural layers. The three Vs are animated through a valuable, visible ball and its impact across required layers; one-piece flow leaves its splash present through the last-commit principle, and Whole Product Focus assimilates that same impact into a coherent product. This care supports customer value and speculative option value. A persistent four-part chapter rail follows distinction, two premises, two goals and four principles; fractal reasoning and the last-commit discipline form one principle at smaller scales. The closing frame also serves as the opening cover. Continuous Cedar synthetic narration and an original score accompany the film. Just in time appears within the goals without naming TPS in the film. The [production guide](README.md) and [timed treatment](film-treatment.md) record the adaptation and reproduction commands. This article retains the full argument beyond the short film's condensation.

The exact recalled three-Vs ADR remains a source gap, although the definitions themselves are verified in Open Dough's decomposition reference. The article cites that reference rather than attributing the definitions to an unidentified ADR.
