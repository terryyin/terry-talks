# Listen to Your Code: what changes when AI writes and reviews?

Research prepared on 20 October 2026 for a square, 15–20 second film. The attached colleague’s post and the old Odd-e poster are source material. Terry’s current request sets the direction: preserve the design insight, investigate the changed context, and leave the unresolved questions open.

## The enduring idea

“Listen to your code” is a way of learning about the product’s internal solution. A small change that pulls on many unrelated parts, a test that becomes unusually difficult to write, or another workaround for the same problem can expose a mismatch between the domain and the structure expressing it. The significance reaches beyond developer convenience: that structure affects how well the product can meet today’s needs and accommodate tomorrow’s changes.

This is a diagnosis to investigate, not a rule that every difficult change proves bad architecture. Domain complexity, inadequate tools, missing knowledge and organizational constraints can also create friction. The useful question is what the difficulty reveals and whether a more coherent solution is available.

AI changes the experience through which people notice these signals. It can generate, change and review code while a person stays further from the details. That can remove toil and improve feedback. It also raises a distinct question: does the person still encounter enough of the difficulty to understand what the product’s structure is telling them?

The evidence below establishes a substantial shift in particular populations and organizations. It does not establish that most code worldwide is now AI-written, that all developers read less code, or that AI cannot recognize design problems.

## Terry’s design position

The closest owner-confirmed account is [Problem Decomposition](<../Problem Decomposition/problem-decomposition.md>). Its discussion of option value concerns the possibility of delivering future customer value affordably, without building imagined features now. Clarity, cohesion, useful tests and a structure that expresses the current domain can preserve possibilities. Speculative flexibility can instead create more complexity and close them.

That article also separates customer scope from implementation boundaries. A small story does not guarantee a small architectural impact or a good design. A narrow scenario can expose entanglement across the product. The appropriate response may involve bringing a concept together across code, data, interfaces and tests, while keeping unrelated responsibilities separate. Each completed result should make sense today; its coherence should not depend on hypothetical later work.

[Romantic Stories, Disciplined Products](<../Story Driven/romantic-stories-disciplined-products.md>) develops the same idea as assimilation: after a change, both behavior and structure should regain coherence. The product should express its present purpose rather than preserve a visible scar for every historical delivery step.

The current Open Dough [Accepted lifecycle-principles ADR](<../../open-dough/docs/adrs/0002-software-development-lifecycle-principles-accepted.md>) is further evidence of this philosophy. It connects low-cost changes of direction with whole-product cohesion, consistent domain meanings and reducing the judgment left for future people and agents. It rejects unnecessary parts and hypothetical flexibility. **This ADR belongs to Open Dough. It is philosophical evidence here, not an architectural decision binding terry-talks.**

The installed [post-change refactoring skill](../.agents/skills/dough-post-change-refactor/SKILL.md) and its [refactoring checks](../.agents/skills/dough-post-change-refactor/references/refactor-checks.md) make this concrete. They follow a concept across its representations, including untouched code outside the diff; distinguish repeated domain knowledge from superficial similarity; and identify coordinated edits, repeated workarounds and speculative code as signals worth examining. A helper alone does not make scattered rules cohesive.

The [execution retrospective skill](../.agents/skills/dough-execution-retrospective/SKILL.md) similarly compares original intent with the aggregate result and the whole product. Its feedback unit is larger than the newest diff. This matters when a generated patch passes its checks while the shared conceptual solution grows less coherent.

Taken together, these sources suggest a precise meaning for “clean code” in this film: an internal solution that expresses the current domain clearly and permits meaningful change with little unnecessary judgment. Surface neatness and passing checks cannot establish that on their own.

## Eight sources on the changing programming and review loop

The table combines platform telemetry, surveys, a controlled experiment and empirical research. These methods answer different questions; their percentages are not interchangeable.

| Primary source and date | What it establishes | Scope and limitation |
| --- | --- | --- |
| [Claude Code engineering team, 15 October 2026](https://claude.dev/blog/solving-code-review-at-anthropic/) | The team reports moving most code reading to machines. Claude writes about 90% of its code; June–September merged PRs more than doubled while the share reverted fell over 40%. Humans retain architectural and product judgment. The team also identifies the problem of sharing codebase understanding. | A vendor’s account of one unusually AI-intensive team, not an industry census or controlled comparison. Better reversion results do not settle future adaptability. |
| [GitHub, 5 March 2026](https://github.blog/ai-and-ml/github-copilot/60-million-copilot-code-reviews-and-counting/) | Copilot code review passed 60 million reviews, grew tenfold since the previous April, and accounted for more than one in five GitHub code reviews. AI review is already substantial. | Vendor telemetry for GitHub reviews. The denominator is not all PRs, all code read, or human reviews displaced. |
| [Selvanayagam and Ghaleb, 21 August 2026](https://arxiv.org/abs/2608.21311) | Their AI-to-AI review dataset contains 248,641 AI-attributed PRs receiving AI-attributed reviews. Cross-product review volume grew over 100-fold from 2025 Q1 to Q3. | Accepted in ESEM 2026’s emerging-results track. Public GitHub attribution has coverage limits. Cross-product review was only about 1.6% of identified agent-authored PRs; volume does not establish quality. |
| [State of Devs 2026, fielded 5 July–5 September](https://2026.stateofdevs.com/en-US/ai/) | Among 4,846 answers to its code-share item, the reported median AI share was 63% and mean 56%; 48.7% selected 75% or above. | A self-selected audience reporting its own work, not a measurement of worldwide code volume. The public chart currently has an undefined question label. [Survey overview](https://2026.stateofdevs.com/en-US/) records 5,463 total respondents. |
| [Sonar, 8 January 2026](https://www.sonarsource.com/company/press-releases/sonar-data-reveals-critical-verification-gap-in-ai-coding/) | Its survey of over 1,100 developers reports that only 48% always check AI-assisted code before committing. Its reported 42% code share combines AI-generated **and assisted** code. | A commercial vendor survey and self-report. Not always checking does not mean never checking. Checking is broader than reading every line, and assistance is broader than authorship. |
| [Stack Overflow Developer Survey 2025](https://survey.stackoverflow.co/2025/ai) | 84% used or planned to use AI; 51% of professional developers used it daily. Accuracy distrust exceeded trust, 46% versus 33%. Almost-correct output and time-consuming debugging remained common frustrations. | [Methodology](https://survey.stackoverflow.co/2025/methodology): fielded 29 May–23 June 2025; 49,009 responses, mainly recruited through Stack Overflow. Question denominators vary. Planned use must not be described as actual use. |
| [Anthropic coding-skills experiment, 29 January 2026](https://www.anthropic.com/research/AI-assistance-coding-skills) | In a randomized study recruiting 52 mostly junior Python engineers learning Trio, the AI group averaged 50% on a subsequent quiz versus 67% for hand coding. Patterns seeking explanations and concepts retained more understanding. | A short unfamiliar-library exercise. Speed differences were not significant. It does not show inevitable long-term deskilling; the learning-pattern analysis is not itself causal. |
| [Zhong et al., 14 July 2026](https://arxiv.org/abs/2607.13196) | Across 1.02 million reviewed PRs from 207 GitHub projects, some agent collaboration patterns were associated with faster decisions, without corresponding improvements in review quality. | Observational preprint, selected projects and study-defined quality measures. Faster decisions are not proof of either better or worse architectural judgment. |

These findings support the film’s changed context without a global majority claim. A survey median is about respondents, not the number of lines produced worldwide. Individual companies’ percentages describe their own workloads. Different studies also combine assistance, generation, agent authorship and accepted suggestions differently.

The evidence supports neither a blanket rejection of AI nor a settled replacement for human understanding. The Claude Code account shows that substantial automation can coexist with improved immediate outcomes. The learning experiment shows that how a person engages can matter. Both make the question more interesting than a simple warning about bad generated code.

## Where else might developers listen?

There are plausible additional channels, but no complete replacement is demonstrated here.

[DORA’s loosely coupled teams guidance](https://dora.dev/capabilities/loosely-coupled-teams/), updated 20 October 2025, connects architectural capability with independent change, testing and deployment. It explains how tight coupling can turn small changes into cascading effects and coordination burdens. This supports observing what a team can do, alongside inspecting how the code is arranged.

[DORA’s current delivery metrics](https://dora.dev/guides/dora-metrics/), updated 5 January 2026, track change lead time, deployment frequency, failed deployment recovery time, change fail rate and deployment rework rate. These describe delivery outcomes over time. They are lagging indicators of development practices, not a complete measure of product health or future adaptability.

[DORA’s code-maintainability guidance](https://dora.dev/capabilities/code-maintainability/) adds change propagation, dependency upgrades, reuse and duplication as useful observation points. [JetBrains and Lund’s October 2026 review framework](https://blog.jetbrains.com/research/2026/10/review-ai-generated/) proposes directing attention from overview to files to selected details, using risk signals. Its participatory study involved 17 practitioners and a follow-up survey of 43 professionals; it is a design proposal, not a proven substitute for understanding.

Research-informed hypotheses for further inquiry include:

- Actual change episodes: where does a new domain rule require unrelated edits, difficult tests or accumulating exceptions?
- Delivery and operation: what do repeated fixes, reversions, incidents and inability to test independently reveal?
- Aggregate evolution: do recurring workarounds and review churn expose a shared responsibility that individual diffs conceal?
- Human–AI interaction: can explanations, traces and visual maps help people notice structural strain, while remaining checkable against behavior and code?

Terry’s provisional [go-see and AI harness claim](<../TPS and AI/claims/16-go-see-ai-harness.md>) provides relevant context: inspect the actual change, tests, running system and customer need, and investigate the harness when work becomes opaque. It is not a proven answer to this film’s questions. A green dashboard may miss structural trouble; a slow change may reflect something other than design.

## Film editorial decision

Use the nonnumeric premise **“AI writes. AI reviews.”** It names a real and growing workflow without claiming everyone has adopted it or stopped reading. Use **“Small change. Big strain.”** as the concrete hinge: generation and review can accelerate while disproportionate difficulty evolving a product remains worth hearing. Frame that strain as a chance to improve the design.

Preserve the poster’s strongest metaphor: the code book, headphones and lines becoming music. A line can strain, distort or pull the book’s structure while automated writing and review continue. The listening posture and pale green, deep green and black palette reconnect the film to Odd-e’s original artwork. Sound can make the strain perceptible before the words explain it.

End with two real questions: **“If we read less code, how do we hear it now?”** and **“Beyond code, what tells us a product is ready for change?”** The broader inquiry also remains open: is a replacement channel needed, and could it offer comparable insight? Leave the music unresolved. Do not turn the ending into a prescription for mandatory line-by-line review, an AI monitor, a quality score or speculative architecture. The film should open the investigation that Terry is asking for.
