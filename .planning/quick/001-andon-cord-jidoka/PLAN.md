# Andon cord as judgment-dependent jidoka, then Stop & Fix as culture

Insert one slide immediately before **Stop & Fix**. Then hydrate that
Stop & Fix beat with Claim 19's culture arguments (not a second
detector, not the Claim 24 warning pile).

Spelling: **judgment** (matches the deck and claims). Title as asked:
**Judgment-dependent Jidoka: the andon cord**.

Do not recitation **fixed-position stop** on either slide (Claim 19:
the cord is the human detector; the exception stays speaker-only).

---

### 1. Judgment-dependent Jidoka: the andon cord
Type: Behavior
Status: done

**What changes:** Audience sees a new slide immediately before
**Stop & Fix**. Claim 19 (with a Claim 6 pointer) owns the argument so
the beat is sourced.

**For whom:** Tokyo LeSS Conference audience, then claim readers.

**Done when:**

- `slides/tps-and-ai/slides.md` has the new slide **before** the
  current **Stop & Fix** slide. Reuse `public/andon-pull.png`
  (`layout: image-right`, `backgroundSize: contain`). Move the
  AI-generated attribution with the image.
- Title: **Judgment-dependent Jidoka: the andon cord**.
- On-slide emphasis (two points, not a factory recitation):
  1. Live judgment here is spent as a **stop** — it does **not** leak
     unfinished, judgment-dependent work into the system as inventory.
  2. Pulling the cord **triggers Stop & Fix** (it does not add another
     unfinished item to the line).
- Autonomation and the cord are both jidoka (speaker notes; keep the
  slide about the cord).
- `slides/tps-and-ai/artwork-list.md` item 4 and G8 point at this
  slide title, not **Stop & Fix**.
- Claim 19 names this as **judgment-dependent jidoka**: the andon
  cord still needs a person; that is not Claim 6's stacking failure.
  Talk implication mentions the preceding beat.
- Claim 6: one pointer that Claim 19 owns the cord; it is not stacking
  judgment-dependent output.

**Check:** read-through of the new slide + the two claim paragraphs.
No deck build required.

---

### 2. Stop & Fix as culture
Type: Behavior
Status: planned

**What changes:** The **Stop & Fix** slide carries Claim 19's culture
arguments. It is no longer a thin “stop means stop” plus Claim 24
warnings (warnings already continue on **The gates do not care who
authored the change**).

**For whom:** same audience.

**Done when:**

- After slice 1 moved `andon-pull.png`, this slide is **not**
  `image-right` on that file. Default (or statement) layout; culture
  is words; the previous slide already showed the cord.
- Punch line stays: a detector everyone continues past is only a
  **dashboard**.
- Hydrate on-slide with culture (keep sparse — punch line + short
  bullets, not the whole claim):
  - Jidoka **shows** the problem; **culture** decides whether people
    actually halt.
  - Courage to stop, contain, fix, and prevent recurrence — not work
    around the signal.
  - Stopping first is the most efficient way.
  - AI makes continuing past the signal cheaper, and the cost of doing
    so larger.
- Speaker notes: Liker (Toyota Way culture of stopping to fix);
  LeSS CI “DO stop and fix”; who stops (people who broke it / stop
  pushing to trunk — not a plant-wide freeze). Doughnut leftover
  `"warn"` pile stays **spoken** dashboard contrast (Claim 13 /
  Claim 24), not a third on-slide topic.
- Do not add new artwork.

**Check:** read-through of the Stop & Fix slide against Claim 19's
implication quote. Sequence: preferred tests → andon cord → Stop &
Fix → same-gates divider.

---

## Learnings

- Slice 1 inserted the new slide by keeping the existing `image-right` /
  `andon-pull.png` frontmatter and adding a `---` before **Stop & Fix**,
  so that slide already has no image. Slice 2 only hydrates copy/layout.
