# Refactor Checks

Apply these checks in order after the preflight gates record an edit candidate.

## Duplication

- **"New" duplication** means at least one copy is newly introduced or closely
  related to newly introduced content — not that every copy is new. Collapse it
  even when the other side already existed.
- Look for copy-pasted blocks, parallel slide structures, or repeated claims
  that the change introduced or made visible.
- The same concept in two representations counts as duplication, not just
  literal copies (e.g. the same value hardcoded in theme CSS and a component).
- **Action:** collapse onto a single representation. Prefer reusing an existing
  helper/component/claim in the right place over inventing a new one.

## Domain naming

- Read every new or renamed identifier — files, deck slugs, component names,
  script flags, claim titles.
- Ask: does the name match what a reader or the next contributor expects?
  Names describe **capability/content**, not development history — no
  scratch/temp naming left behind.
- **Action:** rename when intent is unclear, misleading, or stale.

## Shotgun surgery

- Shotgun surgery: **one logical concept** (e.g. a version string, a theme
  color, a talk title) forces edits in many places for one purpose.
- Give the concept **one** representation (one theme variable, one constant,
  one config value). The next change of that shape should touch that place
  only.
- **Action:** consolidate now behind one seam. Leave only low-likelihood
  one-offs unabstracted.

## Dead or redundant code

Remove aggressively whatever the change introduced or exposed that fails the
decision boundary:

- Script/theme code with no caller; unreachable branches; cancelling edit
  pairs (added then immediately worked around).
- Images or other assets no slide references anymore.
- Draft/placeholder slides left in a deck that the change made obsolete.

When in doubt, **delete**. The next slice reintroduces only what it needs.

## File size

Applies to **code files** only (`.ts`, `.vue`, `.mjs`, `.css`) — not
`slides.md` decks or prose (`.md` claims, ADRs), which are naturally long and
already segmented by slide/section markers.

For every code file in the current diff and every code file proposed for
editing:

```bash
wc -l <path>
```

- Code files **over 250 lines** must be split along a cohesive seam (one
  concept per module), keeping the public API stable for callers outside the
  change.
