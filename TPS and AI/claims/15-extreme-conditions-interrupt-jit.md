# Claim 15: Extreme conditions interrupt JIT; they do not refute capable response

**Status: Provisional — hypothesis stated from Claim 4's wartime interruption;
COVID and Russia–Ukraine cases researched; not a finalized talk beat**

## Original claim / hypothesis

[Claim 4](04-jit-assurance-resourcefulness-and-constraint.md) records that
Kiichiro conceived JIT before the war, wartime controls and rationing made
the 1938 Koromo system impossible to sustain, and Toyota later realized it
through postwar experiments. That raises a current question:

> **Do modern extreme conditions—COVID and the Russia–Ukraine war—show that
> JIT cannot survive uncertainty, so organizations should stockpile just in
> case? Or do they show the same pattern as wartime interruption: pull is
> suspended where recovery time exceeds the system's buffers, while the
> philosophy of capable response remains?**

The popular 2020–2022 story was the first reading. This claim tests it
against what Toyota and the operations literature actually did.

## Research-based adjustment

The popular story does not hold. Extreme shocks **interrupt** JIT where a
part is unique, geographically concentrated, or has a recovery time longer
than the working buffer. They do **not** show that JIT caused the shortages,
or that uniformly inflating inventory restores assurance. That conclusion
matches Claim 4: wartime rationing blocked JIT; scarcity did not mechanically
create it, and stockpiling everything in advance was not the answer then
either.

Hopp and Spearman, already used in Claim 4, still apply. Variability must be
buffered by some combination of inventory, capacity, or time. Daily mix and
small process failures are one class of variability. A pandemic, a war, or a
single-source material with a year-long recovery is another. Matching the
buffer to the class is the work. Treating “more inventory everywhere” as
resilience is the same utilization-and-stockpile reflex JIT was designed to
challenge.

### COVID: chips bought time; lockdowns still stopped the line

After the 2011 Tōhoku earthquake and tsunami, Toyota found that
semiconductor lead times were too long for a low-inventory pull loop to
recover from a regional disaster. It built a business-continuity practice
that, according to suppliers and later reporting, asked chip and related
suppliers to hold on the order of two to six months of inventory dedicated
to Toyota (earnings comments also spoke of one to four months of stocks for
various components). That is a **strategic buffer at a long-recovery
bottleneck**, not a conversion of the assembly system to just-in-case.

Through early 2021 that buffer, plus closer visibility into the chain, let
Toyota keep producing while Ford, GM, VW, Honda, Nissan, and others cut
output. It was widely cited as proof that Toyota had “broken” JIT. Then the
shock outlasted the buffer and hit other parts. In August 2021 a COVID
outbreak at a Vietnamese wire-harness plant, together with tighter chip
supply from Malaysia, left Toyota unable to secure parts. It cut planned
September global production by about 40% (~360,000 vehicles), later added
further September and October cuts, and lowered the fiscal-year forecast
from 9.3 million to 9 million units. Official reason: decline in operations
at Southeast Asian suppliers and tighter semiconductors—not a decision that
TPS had failed.

Willy Shih’s interviews with Toyota North America executives go the other
way from the press dichotomy. Chris Nielsen’s line is that TPS is what
allowed them to do as well as they did. The inventory policy he describes is
strategic size and location, safety stock that factors disruption risk, and a
nuanced view of lead times—not zero stock, and not stock everywhere. Seats
built next door stay pull; chips with long, variable lead times do not.
Georgetown keeps weeks of a custom steel alloy because it is made in
batches. Jamie Bonini calls TPS a **learning system**: when a supplier
fails, Toyota goes to help rather than only to penalize. After 2011 Toyota
also built RESCUE, a multi-tier supplier map with Fujitsu, so that a
disaster’s affected plants and parts could be identified in hours rather
than weeks. Lower-tier invisibility had delayed 2011 recovery.

So COVID’s lesson is not “JIT is dead.” It is Kiichiro’s coordination
problem at global scale: a mountain of almost-everything still cannot make a
car if one necessary part is missing. A chip stockpile is a time buffer
against a known long recovery. When recovery of harnesses and chips together
exceeded that time, the line stopped—the same stop that jidoka makes
visible, not a reason to hide the next failure under a warehouse.

Choi, Netland, Sanders, Sodhi, and Wagner (2023) collect five misconceptions
that the pandemic revived: JIT as an à-la-carte toolkit; JIT as zero
inventory; JIT as the cause of shortages; more inventory as resilience; and
canonical plant JIT as always the best model. Their conclusion is the
opposite of the *Financial Times* / *Wall Street Journal* retreat: **more
JIT, not less**, applied segment by segment, with buffers (inventory,
capacity, or capability) at the boundaries of turbulent links, visibility
upstream, and collaborative supplier relationships. Haphazard just-in-case
stocking, they argue, returns the pre-JIT pattern: the wrong things in
abundance, the right things still missing, plus bullwhip from shortage
gaming. Shih’s parallel warning: a just-in-case binge is often followed by
**excess and obsolete** write-downs.

### Russia–Ukraine war: two different missing parts

The war produced two automotive/semiconductor shocks that should not be
collapsed into one “JIT failed” story.

**Wire harnesses** are unique to each model, labor-intensive, and commonly
built two to three days after order for sequenced delivery. Volkswagen’s
then-CEO described that timing explicitly. Ukraine had become a significant
European source (on the order of 7% of European harnesses, with a large
share going to Germany and Poland). When plants in western Ukraine shut,
Leoni, Fujikura, Nexans and others stopped; VW, BMW, Porsche, Mercedes, and
Renault cut or halted lines within days. Harnesses are a poor candidate for
a months-long generic stockpile: they are bulky, model-specific, and
designed for just-in-sequence flow. The workable response was
**substitution**—duplicate or relocate capacity to Romania, Tunisia,
Morocco, Mexico, and elsewhere—plus whatever production could be kept
running in Ukraine. That is MacDuffie, Fujimoto, and Heller’s substitutive
capability: transfer design information to another site, rather than hide
the uniqueness behind inventory.

**Semiconductor-grade neon**, used in DUV lithography lasers, was a
different item. Reuters estimated that Ukraine’s Ingas (Mariupol) and Cryoin
(Odesa) supplied about 45–54% of world semiconductor-grade neon and halted
in March 2022. Russia is also a major source of crude rare gases and of
palladium for catalytic converters. This looked like another chip-crash
trigger. It largely did not become one for fabs, because the industry had
already treated neon as a long-recovery bottleneck after the 2014 Crimea
annexation: reduced Ukraine dependence, closed-loop recycling at some
makers, and typical stocks of three to twelve months at gas suppliers and
chipmakers. ASML’s Ukraine neon share was reported as already cut
substantially. The 2022 stoppage raised prices and risk; it did not stop
global lithography the way harness plants stopped European assembly.

Same war, two parts, two buffer logics:

| Item | Character | Why pull broke | What actually absorbed the shock |
|---|---|---|---|
| Wire harness | Unique, sequenced, short cycle, not generic-stockable | Geographic concentration + model specificity | Substitution / relocation of production |
| Neon | Commodity input, long fab recovery, stockable | Concentration of purification in Ukraine | Pre-built strategic stock + diversification after 2014 |
| Auto chips (COVID, for comparison) | Long lead time, somewhat stockable | Demand shock + capacity already booked by electronics | Time-limited BCP inventory; then production cuts |

### What Toyota did not do

MacDuffie, Fujimoto, and Heller argue against the three remedies the
pandemic made fashionable: uniformly larger just-in-case buffers, dual
sourcing as a slogan, and unilateral localization. Those can buy continuity
and still lose competitiveness. Their alternative is to keep
**no-more-than-functional buffers** in normal times and to switch quickly
into continuity-first mode with three capabilities:

- **Protective:** see the risk and act before or as the shock unfolds
  (RESCUE, hazard maps, identifying hard-to-replace items).
- **Recovery:** shorten the time to restart the damaged site (advance teams
  from daily kaizen, helping suppliers rather than only switching away).
- **Substitutive:** pre-test “virtual dual” lines so design information
  (drawings, programs, recipes, skilled people) can move to another site
  that is not mothballed idle capacity.

Continuity holds when recovery or substitution lead time is shorter than
inventory days. If both are longer, the line stops no matter how lean or
how fat the warehouse. That is why a chip pile helped until it did not, and
why harnesses stopped Europe immediately.

Toyota’s own framing, in this literature, is that daily TPS—jidoka and
JIT—is the first step of disaster preparedness, because the people who solve
abnormalities every day are the people who can staff a war room. Extreme
conditions do not replace that system with a warehouse. They ask it to
**see** which items cannot recover inside the current loop.

> **Extreme uncertainty does not refute JIT. It forces a distinction JIT
> always required: functional buffers for ordinary variation versus
> strategic buffers, visibility, recovery, and substitution for shocks
> whose lead time exceeds the loop. Uniform just-in-case stocking hides
> the distinction and recreates overproduction.**

Wartime controls interrupted Koromo because material could not be pulled
when it was needed. COVID and war interrupted global pull for the same
reason, on different parts. Toyota did not conclude that Kiichiro was wrong.
It learned where the loop was blind (lower-tier suppliers, chips, later
Southeast Asian harnesses) and put response capability there.

## Emerging implication for the talk

A compact candidate, sitting next to Claim 4:

> **Claim 4:** JIT replaces confidence from stockpiles with confidence in a
> capable response.
>
> **Claim 15:** Extreme shocks interrupt that response where recovery time
> exceeds the loop. The answer is still capability—seeing the hard-to-replace
> item, buffering it on purpose, recovering or substituting faster—not a
> general return to just-in-case.

Useful on stage because the audience will have heard “COVID killed JIT.”
The two cases let the talk keep Claim 4’s assurance argument without
sounding naive about pandemics and war.

For AI-augmented software development, the mapping is analogical, not
literal:

- **Ordinary variation** (a ticket, a failing test, a small refactor) still
  belongs in a pull loop: do not generate implementations, specs, or
  candidates early “just in case.” That is intellectual inventory, and
  Claim 4 already warns that cheap generation makes it tempting.
- **Hard-to-replace items** are the software equivalents of chips, neon, or
  a model-specific harness: a single model vendor, a unique production
  path, a person-bound context, an integration contract that is the
  product. Those need visibility (know the dependency), a strategic buffer
  (second model, eval suite, runbook, documented context), and recovery or
  substitution (restore, switch, re-establish) whose lead time is shorter
  than the disruption.
- **Shortage gaming** in software looks like hoarding generated branches,
  freezing a huge backlog of AI drafts, or double-ordering work “before
  the context window fills.” Shih’s excess-and-obsolete warning applies:
  unused generations go stale when the product and the models change.
- **Virtual dual sourcing** maps more cleanly than dual warehouses:
  portable specs, tests, and context so another model, teammate, or
  environment can pick up the work—without keeping a mothballed second
  team idle.
- Jidoka still does the exposing: when the unique dependency is missing,
  stop and make it visible. A pile of unreviewed candidates will not
  assemble a working product, for the same reason a mountain of parts
  will not assemble a car.

The desired state remains **fast, trustworthy response capacity**. Extreme
conditions change which parts of that capacity must be held as explicit
buffers. They do not change the source of assurance.

## Questions still open

- How much of this belongs in the talk versus a single sentence that
  punctures “COVID killed JIT”? Two cases may be one case too many for
  Tokyo timing.
- Is the software mapping strong enough to use, or should the cases stay
  as manufacturing evidence that Claim 4 survives 2020–2022?
- Which “hard-to-replace” software item should be named on stage: model
  vendor, CI path, person-bound context, or the evolving product itself?
- Did Toyota’s RESCUE-style visibility actually cover Southeast Asian
  harness plants in 2021, or did COVID expose that the map was still
  stronger in Japan than globally?

## Sources consulted

1. Toyota Motor Corporation, [Announcement regarding Changes to Production
   Plans for September and October](https://www.sec.gov/Archives/edgar/data/1094517/000119312521269331/d153069dex991.htm)
   (SEC exhibit, 2021). Official volume cuts and stated causes: Southeast
   Asian COVID impact on suppliers and tighter semiconductors.
2. Reuters, [“Toyota slashes September output amid chip crunch, COVID
   resurgence”](https://www.reuters.com/business/autos-transportation/toyota-slash-september-production-due-global-chip-shortage-nikkei-2021-08-19/)
   (19 Aug 2021). ~40% September cut; BCP chip stockpile after 2011.
3. Reuters, [“Insight: How Toyota thrives when the chips are
   down”](https://www.reuters.com/business/autos-transportation/how-toyota-thrives-when-the-chips-are-down-2021-03-09/)
   (9 Mar 2021). Supplier reports of two-to-six-month chip buffers after
   Fukushima; early-2021 relative insulation.
4. Bloomberg / Japan Times, [“How one COVID-19 case upended Toyota’s
   just-in-time supply
   chain”](https://www.japantimes.co.jp/news/2021/09/02/business/corporate-business/toyota-coronavirus-supply-chain/)
   (2 Sep 2021). Vietnamese wire-harness plant and Malaysian chips.
5. Willy C. Shih (2022), [“What Really Makes Toyota’s Production System
   Resilient”](https://hbr.org/2022/11/what-really-makes-toyotas-production-system-resilient),
   *Harvard Business Review*, 15 Nov 2022. TPS as the reason Toyota
   outperformed; strategic inventory, supplier partnership, learning
   system. Paywalled; executive quotations also reported by Mark Graban,
   [“How the Toyota Production System Built Pandemic Resilience, Not
   Risk”](https://www.leanblog.org/2022/11/toyota-tps-pandemic-resilience/).
6. Willy C. Shih (2022), [“From Just-In-Time To Just-In-Case: Is Excess And
   Obsolete
   Next?”](https://www.forbes.com/sites/willyshih/2022/01/30/from-just-in-time-to-just-in-case-is-excess-and-obsolete-next/),
   *Forbes*, 30 Jan 2022. Shortage gaming, write-down risk, original
   rationale for not stockpiling.
7. Thomas Y. Choi, Torbjørn H. Netland, Nada Sanders, ManMohan S. Sodhi,
   and Stephan M. Wagner (2023), [“Just-in-time for supply chains in
   turbulent times”](https://doi.org/10.1111/poms.13979), *Production and
   Operations Management*, 32(7), 2331–2340. Five misconceptions; adapt
   JIT by segment; more JIT, not less.
8. John Paul MacDuffie, Takahiro Fujimoto, and Daniel Arturo Heller (2021),
   [“Building Supply Chain Continuity Capabilities for a Post-Pandemic
   World”](https://mackinstitute.wharton.upenn.edu/wp-content/uploads/2021/05/Supply-Chain-Continuity-Competitiveness_MacDuffie-Fujimoto-Heller_Mack-Institute-Working-Paper_May-2021.pdf),
   Mack Institute working paper. Protective / recovery / substitutive
   capabilities; virtual dual sourcing; critique of uniform JIC, dual
   sourcing, and localization.
9. Reuters, [“Ukraine invasion hampers wire harness supplies for
   carmakers”](https://www.reuters.com/business/autos-transportation/ukraine-invasion-hurts-flow-wire-harnesses-carmakers-2022-03-02/)
   (2 Mar 2022); [“Europe's carmakers scramble to replace Ukrainian auto
   parts”](https://www.reuters.com/business/autos-transportation/europes-carmakers-scramble-replace-ukrainian-auto-parts-2022-03-14/)
   (14 Mar 2022). Harness uniqueness, plant stops, relocation search.
10. AFP / TechXplore, [“War in Ukraine rattles auto parts
    industry”](https://techxplore.com/news/2022-03-war-ukraine-rattles-auto-industry.html)
    (Apr 2022). Diess on two-to-three-day harness orders; 45% of Ukrainian
    harnesses to Germany and Poland.
11. Reuters, [“Exclusive: Russia's attack on Ukraine halts half of world's
    neon output for
    chips”](https://www.reuters.com/technology/exclusive-ukraine-halts-half-worlds-neon-output-chips-clouding-outlook-2022-03-11/)
    (11 Mar 2022). Ingas and Cryoin ~45–54% of semiconductor-grade neon.
12. CNBC, [“Russia-Ukraine war: Laser neon shortage threatens semiconductor
    industry”](https://www.cnbc.com/2022/03/25/russia-ukraine-war-laser-neon-shortage-threatens-semiconductor-industry.html)
    (25 Mar 2022). Post-2014 stockpiles of 3–12 months and reduced Ukraine
    dependence.
13. European Commission JRC (2022), [“Rare Gases (Krypton, Neon, Xenon):
    Impact assessment for supply
    security”](https://rmis.jrc.ec.europa.eu/uploads/JRC130349_01_rare_gases.pdf).
    Ukraine as leading purified-neon producer; knock-on to chip-using
    sectors.
14. Nikkei Asia, [“Toyota keeping tabs on parts to recover
    faster”](https://asia.nikkei.com/Business/Companies/Toyota-keeping-tabs-on-parts-to-recover-faster)
    (Mar 2015). Multi-tier database of essential components and sites
    after 2011.
15. University of Tokyo MMRC discussion papers on Toyota disaster
    response, especially Hiroaki Koda / RESCUE (e.g.
    [MMRC-514](https://merc.e.u-tokyo.ac.jp/mmrc/dp/pdf/MMRC514_2019.pdf),
    [MMRC-513](https://merc.e.u-tokyo.ac.jp/mmrc/dp/pdf/MMRC513_2019.pdf)).
    Visibility of lower-tier suppliers as the 2011 gap.
16. Wallace J. Hopp and Mark L. Spearman (2004), [“To Pull or Not to
    Pull”](https://doi.org/10.1287/msom.1030.0028), already cited in
    Claim 4. Inventory, capacity, and time as alternative buffers.

**Still open for talk choices on how much of the two cases to use, and
whether the software mapping is a beat or a footnote.**
