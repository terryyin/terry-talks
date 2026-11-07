// Converts a Jest `--json` report into the CI proof fragment of one entry,
// broken down by repository-relative test file. Each assertion is one check:
// `passed` and `failed` as such, any other status as other. Its `duration`
// (milliseconds) adds to its file's and the entry's `durationMs`; an
// assertion without one counts as untimed, so a partial sum stays visible.
// A suite that failed before running any test (e.g. a compile error) counts
// as one untimed failure. A missing or unusable report writes no fragment,
// so the collector shows the part as missing. Each check goes through the
// collector's figure helpers rather than `fragment --outcomes --times`,
// whose per-path times would clear the untimed count of a file that mixes
// timed and untimed checks.
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parseArgs } from "node:util";
import {
  entrySlug,
  fragment,
  fragmentProblems,
  isPositive,
} from "./ci-proof-contract.mjs";
import {
  addedFigures,
  breakdownExtras,
  emptyFigures,
  isPathIn,
  recordResult,
} from "./ci-proof-figures.mjs";

const outcomeOf = (status) =>
  status === "passed" || status === "failed" ? status : "other";

const durationOf = (value) =>
  typeof value === "number" && Number.isFinite(value) && value >= 0
    ? value
    : undefined;

// REPORT, a parsed Jest JSON report whose suite names are absolute paths
// under ROOT, as IDENTITY's fragment of ENTRY. Suites outside ENTRY count
// toward nothing.
export function jestFragment(report, identity, entry, root) {
  if (!Array.isArray(report?.testResults)) {
    throw new Error("the Jest report has no testResults");
  }
  const breakdown = new Map();
  for (const suite of report.testResults) {
    const path = relative(root, String(suite.name)).split(sep).join("/");
    if (!isPathIn(path, entry)) continue;
    const assertions = suite.assertionResults ?? [];
    if (assertions.length === 0 && suite.status === "failed") {
      recordResult(breakdown, path, "failed", undefined);
    }
    for (const assertion of assertions) {
      recordResult(
        breakdown,
        path,
        outcomeOf(assertion.status),
        durationOf(assertion.duration),
      );
    }
  }
  const { durationMs, untimed, ...counts } = [...breakdown.values()].reduce(
    addedFigures,
    emptyFigures(),
  );
  return fragment(identity, entry, "checks", counts, {
    ...(durationMs === undefined ? {} : { durationMs }),
    ...breakdownExtras(breakdown),
  });
}

function positive(name, text) {
  const value = Number(text);
  if (!/^[0-9]+$/.test(text ?? "") || !isPositive(value)) {
    throw new Error(`--${name} ${text} is not a positive integer`);
  }
  return value;
}

const OPTIONS = ["report", "entry", "part", "of", "attempt", "revision", "out"];

function run(argv) {
  const { values } = parseArgs({
    args: argv,
    options: Object.fromEntries(
      OPTIONS.map((name) => [name, { type: "string" }]),
    ),
  });
  for (const name of OPTIONS) {
    if (values[name] === "") throw new Error(`--${name} is empty`);
    if (values[name] === undefined) throw new Error(`--${name} is required`);
  }
  const root =
    process.env.GITHUB_WORKSPACE ||
    execFileSync("git", ["rev-parse", "--show-toplevel"], {
      encoding: "utf8",
    }).trim();
  const identity = {
    part: positive("part", values.part),
    of: positive("of", values.of),
    attempt: positive("attempt", values.attempt),
    revision: values.revision,
  };
  const report = JSON.parse(readFileSync(values.report, "utf8"));
  const value = jestFragment(report, identity, values.entry, root);
  const problems = fragmentProblems(value);
  if (problems.length > 0) throw new Error(problems.join("; "));
  mkdirSync(values.out, { recursive: true });
  writeFileSync(
    join(values.out, `${entrySlug(value.entry)}-${value.part}.json`),
    `${JSON.stringify(value)}\n`,
  );
}

function isDirectEntry() {
  if (!process.argv[1]) return false;
  if (import.meta.url === pathToFileURL(process.argv[1]).href) return true;
  try {
    return (
      realpathSync(fileURLToPath(import.meta.url)) ===
      realpathSync(process.argv[1])
    );
  } catch {
    return false;
  }
}

if (isDirectEntry()) {
  try {
    run(process.argv.slice(2));
  } catch (error) {
    process.stderr.write(`jest-fragment: ${error.message}\n`);
    process.exitCode = 1;
  }
}
