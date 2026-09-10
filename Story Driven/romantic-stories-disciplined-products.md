# Romantic Stories, Disciplined Products

## Product as a Space

At any moment, a software product has a current state that can be
understood through two major dimensions:

-   **Behavior / functionality / features** --- what the product does.
-   **Structure / design / components / architecture** --- how the
    product is organized so it can do those things and continue to
    evolve.

Then there is **Time**. Product development is continuous movement from
one coherent product state to another:

> **State₀ → State₁ → State₂ → ...**

The Product Backlog belongs primarily to this time dimension. Backlog
items represent possible transitions rather than the current state
itself.

## A story is deliberately romantic

A **story is fictional**. It describes a reality that does not exist
yet. In that sense, a good story is almost **romantic**: it invites
people to imagine a possible future and makes them want to turn that
fiction into reality.

This is also why a story does **not need strong descriptive
discipline**. It can be fuzzy in almost every dimension. It does not
have to respect the current system's boundaries. It does not
particularly care which component owns the behavior, which architectural
boundary it crosses, whether it modifies one feature or five, or where
the corresponding code lives.

That is not necessarily a defect. The story is organized around **human
meaning and impact**, rather than around the taxonomy of the existing
system.

A story might cut diagonally across many features and components because
the person experiencing the problem does not care about those
boundaries.

### Emotion is a feature of a story

The story should capture something capable of provoking human response:
**a frustration, desire, expectation, hope, fear, opportunity,
inconvenience, or ambition.**

It gives people a reason to say:

> *Yes. I want this fictional world to become real.*

That makes stories particularly powerful for **planning**. They help
people discuss possibilities, negotiate meaning, exercise judgment, and
decide what future they want to create.

But the very properties that make stories good for planning make them
**terrible descriptions of a system**.

> **Stories are good for imagining change. Stories are bad for
> describing state.**

A system description needs almost the opposite qualities: precision,
organization, explicit boundaries, consistency, and testability.

## Story ≠ feature

A feature belongs to the **product state**. A story belongs to a
**transition between product states**.

One story may affect several features. One feature may be changed by
dozens of stories over its lifetime. Likewise, one story may cut through
many components, while one component embodies decisions originating from
many historical stories.

Neither **story = feature** nor **story = component** is a useful model.
The story intentionally does not care very much about either boundary.

## "Impact" has two meanings --- deliberately

The word **impact** has a useful double meaning.

### Impact 1 --- Business impact

The first is the sense used in **Impact Mapping**: a change in behavior
or outcome that contributes toward a business goal.

This is the impact that makes the fictional story worth realizing:

> **Goal → desired impact → possible change/story**

This is the business meaning of impact: *What difference do we want to
make in the world?*

The idea came to me originally through Craig Larman, while the explicit
terminology resonates with Gojko Adzic's Impact Mapping.

### Impact 2 --- Physical impact on the product

I deliberately reuse **impact** in a second, almost physical sense.

The story is like a **missile**. It carries the desired business impact
toward the product---and then it hits the existing product.

The product had an organized set of behaviors and a reasonably stable
structure. The new demand does not politely fit into those arrangements.
It cuts across them.

The previously organized behaviors become **messy**. The previously
stable structure becomes **unstable**.

So there is an intentional duality:

> **The story carries an impact we want to create in the world, while
> creating an impact that the product itself must survive.**

That second impact must be **assimilated**.

## Development is assimilation

"Assimilation" is a better description than merely "implementation."

When a story hits the product, we do not simply bolt the requested
change onto whatever happens to exist. We assimilate its impact into
both dimensions.

### Behavioral assimilation

The new behavior must be reconciled with everything the product already
does. It may create a new behavior, modify an existing one, or require
several previously distinct behaviors to be reorganized.

Eventually there should once again be a coherent answer to:

> **What does the product do now?**

### Structural assimilation

The code may initially become disturbed as we discover how to implement
the change. But we should not leave that disturbance behind.

Through design and refactoring, the structure should regain coherence:

> **organized → disturbed → reorganized**

> **stable → destabilized → restabilized**

The finished product should not look like a battlefield containing the
scars of every missile that ever hit it. It should look like a coherent
product **now**.

## The work is judgment-intensive

There is another transformation happening during this process:

> **judgment is being consumed.**

At the **story/planning stage**, enormous amounts of judgment may be
necessary: What does the customer actually need? What impact matters?
What should we build? What does this fuzzy story actually imply? Where
are its boundaries? What trade-offs should we make?

Then during **implementation**, more judgment is required: How should
this fit the existing behavior? Which concepts belong together? Where
should responsibility live? What should be refactored? What invariant
matters? What needs to be tested?

This is inherently **judgment-intensive work**.

The mistake would be to preserve all those open judgments in the
resulting product.

## The resulting product should contain closed decisions, not open judgments

Once the work is finished, the judgment should be **spent**.

The resulting product should embody the decisions that were made. A
future developer should need as little fresh judgment as reasonably
possible merely to understand the current state.

They should not have to look at a piece of code and wonder: Why is this
here? What does it mean? Is this intentional? What may I change? What
must I preserve? Which old story explains this?

Those were judgments that the previous development process was supposed
to resolve.

> **Fuzzy story + human judgment → explicit decisions → coherent
> product**

Or:

> **Open judgment → decision → encoded knowledge**

The development process consumes ambiguity and judgment and produces
**clarity**.

## Automated tests are an example of spent judgment

Creating an automated test may require substantial judgment: What
matters? What behavior are we protecting? What is the relevant example?
What counts as success?

But once that judgment has been exercised, the test should embody the
resulting decision.

Running it should require almost no judgment:

> **green → the stated expectation holds**\
> **red → it does not**

We should not need an expert standing beside every test run deciding
whether the result "probably looks okay."

The **judgment happened when the test was designed**. The automated test
preserves the **decision**, not the need to repeat the judgment.

The same principle applies more broadly to good code, architecture, and
product descriptions.

## A completed story becomes a spent story

Once its impact has been assimilated, the story becomes a **spent
story**.

It has done its job. It helped people imagine a future, exercise
judgment, coordinate work, and create a transition. Now that transition
has happened.

The story belongs to **history**.

> **A spent story should leave no necessary historical trace in the
> current product state.**

## The current product should describe what IS, not what WAS

During evolution, things continually **come and go**.

If feature A once existed and was later removed, the current product
state normally only needs to say what **exists now**. It does not need a
permanent statement that "the product does not have A." That negation is
often merely a record of history.

If we retain every historical negation, the current description
gradually becomes an archaeological record.

> **Things that leave the product should normally leave the product
> description too.**

## Avoid unnecessary negation

Negation is often difficult to establish conclusively.

> **Absence of evidence is not evidence of absence.**

It is generally easier to provide positive evidence that "the system
does X under conditions Y" than to establish an unbounded claim that
"the system never does Z."

This does not mean useful invariants or explicit prohibitions should
never exist. Some negative constraints genuinely are part of the current
product.

The distinction is:

> **Keep a negation when it is a current invariant. Do not keep it
> merely because it records something that happened historically.**

## History belongs in history

Modern software development already has an excellent mechanism for
preserving historical state: **version control --- typically Git.**

If some previous decision becomes relevant to a future decision, we can
deliberately excavate it through commit history, previous
implementation, old tests, old descriptions, and supporting discussion.

That is appropriate **historical research**.

But we should not force every future developer to perform historical
research merely to understand today's product.

> **Optimize the product for understanding the present. Preserve history
> in systems designed for history.**

History should be **available**, but it should not be **in the way**.

## Stories and products are almost opposites

  Story / planning       Resulting product
  ---------------------- ------------------------
  Fictional              Actual
  Future                 Present
  Romantic               Precise
  Emotion-provoking      Unambiguous
  Fuzzy                  Disciplined
  Boundary-crossing      Organized
  Judgment-intensive     Judgment-closed
  About desired change   About current state
  Temporary              Persistent
  Carries impact         Has assimilated impact
  Good for planning      Good for understanding
  Eventually spent       Continues to exist

Neither side is better. They serve fundamentally different purposes. The
mistake is trying to make one artifact serve both.

## The complete cycle

``` text
REAL WORLD
    │
    │ desire / frustration / opportunity
    ▼
DESIRED BUSINESS IMPACT
    │
    ▼
ROMANTIC, FICTIONAL STORY
    │
    │ fuzzy
    │ boundary-crossing
    │ emotion-provoking
    │ judgment-intensive
    │
    ─────────────── time ───────────────►
    │
    ▼
           💥 PRODUCT 💥
          physical impact
         /               \
        ▼                 ▼
   BEHAVIOR            STRUCTURE
   disturbed           destabilized
        │                 │
        └──────┬──────────┘
               │
         human judgment
               │
               ▼
           ASSIMILATION
               │
       ┌───────┴────────┐
       ▼                ▼
   organized          stable
   behavior          structure
       │                │
       └───────┬────────┘
               ▼
       COHERENT CURRENT
         PRODUCT STATE
               │
               │ decisions remain
               │ judgment is spent
               │ story is spent
               │ history disappears
               ▼
      ready for next impact
```

## The deeper transformation

The model is not merely about requirements changing architecture. It
describes a richer transformation:

-   **Fiction → reality**
-   **desired business impact → physical product impact → assimilated
    impact**
-   **fuzziness → precision**
-   **emotion → decision**
-   **judgment → encoded knowledge**
-   **change → state**
-   **story → spent story → history**
-   **disturbance → coherence**

> **Stories should be romantic; products should not be.**
>
> A story is allowed to be fictional, fuzzy, emotional, and
> boundary-crossing because its purpose is to provoke judgment and help
> people choose a future. Development spends that judgment by
> assimilating the story's impact into coherent behavior and stable
> structure. Once assimilated, the story becomes history: the current
> product should contain the decisions, not the deliberation; the
> current state, not its historical traces.
