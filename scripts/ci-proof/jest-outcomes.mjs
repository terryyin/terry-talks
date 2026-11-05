// Converts a Jest `--json` report into the CI proof collector's outcome lines:
// one `<passed|failed|other>\t<repo-relative test file>` line per assertion.
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { relative } from "node:path";

const [reportFile] = process.argv.slice(2);
if (!reportFile) {
  console.error("usage: node jest-outcomes.mjs <jest-report.json>");
  process.exit(2);
}

const root =
  process.env.GITHUB_WORKSPACE ||
  execFileSync("git", ["rev-parse", "--show-toplevel"], { encoding: "utf8" }).trim();
const report = JSON.parse(readFileSync(reportFile, "utf8"));

for (const suite of report.testResults ?? []) {
  const file = relative(root, suite.name).split("\\").join("/");
  const assertions = suite.assertionResults ?? [];
  // A suite that failed before running any test (e.g. a compile error) still counts as a failure.
  if (assertions.length === 0 && suite.status === "failed") console.log(`failed\t${file}`);
  for (const assertion of assertions) {
    const status = assertion.status === "passed" || assertion.status === "failed" ? assertion.status : "other";
    console.log(`${status}\t${file}`);
  }
}
