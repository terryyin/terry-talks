#!/usr/bin/env bash

set -euo pipefail

MODE="${1:?Usage: quality_changed.sh format|lint}"
case "$MODE" in
  format|lint) ;;
  *)
    echo "Unknown quality mode: $MODE" >&2
    exit 1
    ;;
esac

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

selected_components=""

select_component() {
  if [[ " $selected_components " != *" $1 "* ]]; then
    selected_components+=" $1"
  fi
}

select_components_for_file() {
  case "$1" in
    terry-moves/*)
      select_component terry-moves
      ;;
    scripts/*)
      select_component root
      ;;
  esac
}

if [[ "$MODE" == format ]]; then
  changed_files="$({
    git diff --name-only
    git diff --cached --name-only
    git ls-files --others --exclude-standard
  } | sort -u)"
else
  changed_files="$(git diff --cached --name-only)"
fi

while IFS= read -r file; do
  [[ -n "$file" ]] && select_components_for_file "$file"
done <<< "$changed_files"

run_quality_for_component() {
  pnpm "$1:$MODE"
}

for component in terry-moves root; do
  if [[ " $selected_components " == *" $component "* ]]; then
    run_quality_for_component "$component"
  fi
done
