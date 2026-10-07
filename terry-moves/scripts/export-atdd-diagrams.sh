#!/bin/sh
set -eu
cd "$(dirname "$0")/.."
pnpm exec tsx scripts/export-atdd-diagrams.tsx
pnpm exec remotion still src/index.ts ATDDSolutionTree ../ATDD/diagrams/solution-tree.png --frame=0
pnpm exec remotion still src/index.ts ATDDScenarioCycle ../ATDD/diagrams/scenario-cycle.png --frame=0
