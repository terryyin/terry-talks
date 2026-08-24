# Claim 7: “The Algorithm” shares TPS roots and spirit

**Status: Provisional — not finalized**

## Original claim / hypothesis

Jon McNeill's book *The Algorithm* and Elon Musk himself have shared a
five-step framework. Musk's wording is somewhat different from McNeill's, but
the two versions have the same root and spirit.

The stronger hypothesis is that **The Algorithm is an extension of the Toyota
Production System (TPS)**: a more radical formulation of familiar TPS or lean
moves for environments that need breakthrough speed rather than only
incremental improvement.

## Research-based adjustment

The family resemblance is strong, but the provenance and the word
**extension** need qualification.

### This is one framework presented by two people, not two independent models

Musk described his five-step engineering process publicly during the 2021
Everyday Astronaut tour of SpaceX's Starbase. Walter Isaacson later called it
“the algorithm” in his 2023 biography of Musk. McNeill's 2026 book then
codified and generalized the framework for leaders outside Tesla and SpaceX.

The official description of McNeill's book calls it **Elon's five-step
framework**, and McNeill says that the framework was distilled by Tesla's
leadership team and used weekly at Tesla and SpaceX. He also says that it came
together from the postmortem on Tesla's Model 3 production crisis, after Tesla
had tried to automate too early.

The evidence therefore supports:

> **Musk publicly explained the operating sequence; McNeill turned the same
> Tesla/SpaceX sequence into a more polished and broadly applicable
> management framework.**

It is still reasonable to say that both men have **shared** it. It is less
accurate to imply that McNeill and Musk independently created two related
five-step systems.

### The wording differs, but the sequence is substantially the same

| Step | McNeill's published formulation | Musk's 2021 spoken formulation |
|---|---|---|
| 1 | Question every requirement. | Make the requirements less dumb. |
| 2 | Delete every possible step in the process. | Try very hard to delete the part or process. |
| 3 | Simplify and optimize. | Simplify or optimize the design. |
| 4 | Accelerate cycle time. | Accelerate cycle time. |
| 5 | Automate. | Automate. |

Musk's spoken explanation adds memorable operating tests. A requirement should
have a named person behind it rather than an anonymous department. If deleted
parts never need to be added back, the team probably did not delete
aggressively enough. Acceleration must follow the first three steps, and
automation comes last.

McNeill's labels are cleaner and more general. In interviews he sometimes
paraphrases or groups the middle actions differently—delete and simplify,
then optimize—but the canonical sequence printed by his publisher is the same
five-part sequence Musk described.

### The correspondence with lean and TPS is real

The sequence closely resembles lean process reasoning derived from Toyota:

| The Algorithm | Related TPS or lean reasoning |
|---|---|
| **Question every requirement** | Start from value as experienced by the customer; go to the actual work; challenge assumptions and unreasonable requirements. |
| **Delete every possible step** | Identify the value stream and eliminate non-value-creating steps and waste rather than improving them. |
| **Simplify and optimize** | Make the remaining work easier, clearer, repeatable, and capable before adding machinery or scale. |
| **Accelerate cycle time** | Create flow, remove waiting and inventory, and respond to customer need quickly through Just-in-Time. |
| **Automate last** | First perform and improve the work by hand, eliminate waste and unreasonable requirements, define abnormalities, and only then embody the work and judgment in machines. |

The last correspondence is especially strong. Toyota's current explanation of
jidoka explicitly says not to begin with a machine. People should first do the
work correctly by hand, apply kaizen, eliminate *muda*, *mura*, and *muri*,
make the work repeatable, and then replace appropriate operations with
machines while building in abnormality detection.

Womack and Jones's five lean principles provide another close comparison. They
tell organizations to define customer value, identify the value stream,
challenge and eliminate its non-value-creating steps, place the remaining
steps in flow to reduce response time, let customers pull, and repeatedly
pursue perfection. Question → delete → simplify → accelerate is plainly in
the same problem-solving family.

McNeill's own intellectual path strengthens the connection. He says he entered
Tesla as a student of TPS and lean, and his practical advice includes going to
the front line, experiencing the process directly, mapping it, asking which
steps create value for the customer, and deleting those that do not. Those are
not merely accidental similarities in vocabulary.

### “Same root” has two possible meanings

The available evidence supports one meaning more strongly than the other:

1. **Shared intellectual genealogy:** Musk or the Tesla leadership team
   deliberately derived the five steps from TPS. This has **not yet been
   established**. McNeill's prior TPS/lean background is documented, but the
   framework's reported immediate origin is Tesla's own production experience
   and Model 3 postmortem. A structural resemblance does not prove Musk's
   source.
2. **Shared operating logic:** both attack waste and inherited assumptions,
   improve the real process before mechanizing it, shorten feedback and
   response time, and treat automation as the result of learning rather than
   its substitute. This is **well supported**.

The talk should therefore avoid presenting a direct historical lineage as a
fact unless a primary source from Musk, McNeill, or another Tesla leader makes
that derivation explicit.

### “Extension of TPS” is also too simple

McNeill does not currently present The Algorithm merely as TPS extended. He
says TPS and lean are excellent for incremental improvement and optimization
but insufficient for “quantum growth.” The publisher goes further and markets
The Algorithm as lean's **antithesis**: radical rethinking rather than
incremental improvement.

That contrast may itself understate TPS. Toyota describes TPS as complete
elimination of waste, rapid fulfillment of customer requirements, challenge
of new technologies and construction methods, and continuous evolution—not
only small local optimization. Lean's instruction to challenge every step and
eliminate the ones that do not create value can also produce a radical
redesign.

Even so, The Algorithm is narrower than TPS. Its five labels do not by
themselves express several essential system relationships:

- customer pull and explicit limits on work in process;
- jidoka's detection, stop authority, containment, and prevention of
  recurrence;
- built-in quality and a trustworthy feedback signal;
- standards and learning loops that preserve improvements;
- respect, capability development, and the authority of the people doing the
  work; or
- coordination across the whole production and supplier system.

The Algorithm can therefore accelerate either a healthy or an unhealthy
system. Questioning and deletion can remove bureaucracy and waste, but without
clear value, quality, stop conditions, evidence, and human agency they can also
remove safeguards or push risk and pressure downstream. TPS supplies criteria
for judging whether speed has become dependable capability rather than merely
urgency.

A more defensible adjustment is:

> **The Algorithm is a radicalized, portable sequence of lean-compatible
> process moves, not a complete extension of TPS. McNeill's formulation and
> Musk's spoken formulation are presentations of the same Tesla/SpaceX
> framework. Its operating logic has a strong TPS/lean family resemblance,
> but its direct derivation from TPS is unproven and it omits important parts
> of TPS's wider human and technical system.**

## Emerging implication for the talk

The Algorithm could be an unusually accessible bridge from a contemporary
technology audience back to TPS.

Its memorable surface logic is:

> **Question → delete → simplify → accelerate → automate.**

TPS adds the system questions needed to make that sequence trustworthy:

> **Value for whom? Pulled by what need? What exposes and stops abnormality?
> Who has authority to respond? What learning is preserved?**

For AI-augmented software development, this produces a useful warning. If AI
is introduced first as an automation or acceleration layer, it may generate
more of a requirement, process, design, or code path that should not exist.
Before scaling generation, a team can ask:

1. Is the requirement real, current, and attributable to a person or need?
2. Can the feature, handoff, approval, artifact, or code be deleted?
3. Can the remaining problem and design be simplified?
4. Can the path to trustworthy feedback be shortened?
5. Which part should now be automated or AI-assisted, with what stop signal?

The fifth question deliberately adds a jidoka qualification. “Automate last”
is not enough. The automated system must also know what evidence matters, when
to stop, how to contain bad output, and when accountable human judgment is
required.

This could sharpen the talk's broader thesis:

> **The Algorithm shows that prominent AI-era industrial practice is
> rediscovering a lean sequence: remove needless work before making work
> faster. TPS shows what the five-step slogan leaves out: pull, built-in
> quality, human agency, and continuous learning are what make speed safe and
> sustainable.**

## Questions still open

- Does the full text of McNeill's book explicitly describe The Algorithm as
  derived from, opposed to, or complementary with TPS beyond the publisher's
  framing and his interviews?
- Is there a primary statement from Musk or another Tesla leader naming TPS,
  lean, Taiichi Ohno, or Toyota as a source for the five-step sequence?
- Is McNeill's incremental-versus-quantum distinction fair to TPS, or does it
  confuse gradual learning with small outcomes?
- Which parts of the framework came from Tesla's Model 3 postmortem, which
  existed earlier at SpaceX, and when did the name “The Algorithm” become
  standard?
- Should the talk call it a **radicalized lean sequence**, a **lean-compatible
  counterpoint**, or a **partial rediscovery of TPS logic**?
- What empirical evidence would distinguish genuine cycle-time improvement
  from speed obtained by shifting quality, safety, or human costs downstream?
- When AI can assist questioning, deletion, and simplification as well as
  automation, is the five-step order still best understood as a sequence of
  tools or as a sequence of commitments?

## Sources consulted

1. Jon McNeill, [*The Algorithm: The Hypergrowth Formula That Transformed
   Tesla, Lululemon, General Motors, and SpaceX*](https://www.penguinrandomhouse.com/books/799958/the-algorithm-by-jon-mcneill/9798217177530/)
   (2026), official publisher page. Canonical five labels, McNeill's lean
   background, and the publisher's framing of The Algorithm as Elon's radical
   counterpoint to lean.
2. Jon McNeill, [“How to Improve Processes, Remove Friction, and Accelerate
   Innovation”](https://awesomeatyourjob.com/1157-how-to-improve-processes-remove-friction-and-accelerate-innovation-with-jon-mcneill/)
   (2026), interview transcript. McNeill's own account of his TPS/lean
   background, the Tesla leadership team's role, weekly use, the Model 3
   postmortem, front-line observation, value mapping, and his distinction
   between incremental and quantum growth.
3. Everyday Astronaut, [*Starbase Tour with Elon Musk, Part
   1*](https://www.youtube.com/watch?v=t705r8ICkRw&t=812s) (2021), beginning
   around 13:32. Primary recording of Musk explaining his five-step
   engineering process and why the order matters.
4. Walter Isaacson, [*Elon
   Musk*](https://www.simonandschuster.com/books/Elon-Musk/Walter-Isaacson/9781982181284)
   (2023). Earlier published account naming and describing “the algorithm” in
   Musk's management and engineering practice.
5. Toyota Motor Corporation, [Toyota Production
   System](https://global.toyota/en/company/vision-and-philosophy/production-system/).
   Current primary account of waste elimination, JIT flow and response,
   manual work before mechanization, kaizen, built-in abnormality detection,
   and the human-development role of TPS.
6. James P. Womack and Daniel T. Jones, [preface to *Lean
   Solutions*](https://www.lean.org/wp-content/uploads/2021/01/lean-solutions-preface.pdf)
   (2005). Concise statement of the five lean principles derived from studying
   Toyota: customer value, challenge and elimination of value-stream steps,
   flow, pull, and repeated pursuit of perfection.

**Still open for further discussion and fact-checking.**
