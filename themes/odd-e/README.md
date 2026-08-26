# slidev-theme-odd-e

Local Slidev theme for Odd-e talks. Referenced from a deck's frontmatter
by filesystem path, e.g. from `slides/<deck>/slides.md`:

```yaml
theme: ../../themes/odd-e
```

Ported from the legacy `odde_training_template` reveal.js branding
(`legacy/odde_training_template/template/odde_slides.tpl`): odd-e logo
watermark, now top-right at 4% scale (moved from the original top-left
placement, which collided with heading text once `styles/index.ts` gave
headings proper sizing). Canvas is off-white paper (`#ece6dc`) to match
the sumi-e artwork voice, replacing the template's light grey (`#cdcdcd`).

`styles/index.ts` imports `@slidev/client/styles/layouts-base.css`, the
stylesheet (normally pulled in by `@slidev/theme-default`) that makes
`.slidev-layout` fill the full slide height and gives h1-h6 their size
scale. Every custom theme must import it itself — Slidev's core client
does not.
