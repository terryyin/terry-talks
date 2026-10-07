# Restage the ATDD diagrams

Edit [the maintained staging](../terry-moves/src/atdd/staging.ts), then preview
`ATDDFilm` in Remotion Studio with `pnpm moves` from the repository root.
The film, opening and closing miniatures, `ATDDSolutionTree` and
`ATDDScenarioCycle` all use this input and the same SVG drawing components.
The script and saved narration/score supply the existing timing.

Placement stays separate from the sheets' identities and the tree's hierarchy.
Each requested frame derives outlines, attachments and motion landmarks from
the authored staging and current pose, so seeking does not depend on earlier
frames. Circle routes follow their clockwise circumference; tree traversal
keeps its narrated front/detail/return/back order. The tree's visible trace and
moving cursor share the same rounded segments.

## Inputs

Coordinates are pixels in the 1080 × 1080 stage. Keep room for the film heading,
caption band and corner logo as well as the diagram itself. Preview motion at
full size and at a 360px display before keeping a revision.

- `circle.x`, `y` and `radius` locate the circumference. Each named sheet's
  `angle` places its center on it; degrees increase clockwise from the right.
  Keep the six named checkpoints in their narrative order around the circle.
- `circle.sheetScale` sizes all sheets. A sheet's own `scale` multiplies it.
  The outline, text, badge and attached arrow clearance share that drawn size.
- `backlog.x` and `y` move the waiting column, including its compact pose,
  label and entry/next routes.
- `localLoop.offset` locates the first external TDD loop relative to the circle
  center. `size` scales that loop; its departure and return follow Update.
- `participants.scales` sizes the five existing colored identities in order.
  The 3/2 split, shared approach/return lanes and camera follow their footprints
  and identified sheets, preserving when they separate and reunite.
- `tree.nodes` stores each identified box's center, width and height. Its
  parent/child links, label, traversal and test attachments follow those boxes.
  The uneven hierarchy and scenario meaning remain with the drawing.
- `tree.lanes` sets the authored route roles: `branchInset` places traversal
  inside the main boxes; `frontDetailInset` places its front-detail visit;
  `internalDetailInset` places the internal test's descent; `frontReturnDrop`
  leaves a return lane below the front-end box.

Leave adequate space between sheets, tree levels, probes, labels and actor
lanes. These routes express authored relationships; they do not automatically
place boxes or avoid arbitrary obstacles. When a layout is crowded, revise the
staging inputs and inspect the journey. Do not repair a second list of paths,
label positions or participant coordinates.

## Reproduce the selected staging

From the repository root:

```sh
nix develop -c sh -c 'pnpm install --frozen-lockfile'
pnpm moves
nix develop -c sh -c 'pnpm -C terry-moves render:atdd'
nix develop -c sh -c 'pnpm -C terry-moves diagrams:atdd'
```

`render:atdd` produces `terry-moves/out/atdd-restaged.mp4` and its opening
poster. `diagrams:atdd` regenerates both SVGs and both native PNGs under
[diagrams](diagrams/). Open the resulting movie and diagrams to check the
actual typography and motion, including tree/probes, backlog compaction,
local work, split and reunion, and the cover/closing miniatures.

The source movie reproduced on this runtime remains at
`terry-moves/out/restaging/default.mp4` for comparison. Keep the original
[script](film-script.json) and saved audio intact when restaging.
