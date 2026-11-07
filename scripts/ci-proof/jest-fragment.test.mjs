// Drives the Jest producer and the collector's `summarize` command end to end.
// Run with `node --test scripts/ci-proof/`.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, test } from "node:test";
import { fileURLToPath } from "node:url";

const here = fileURLToPath(new URL(".", import.meta.url));
const ROOT = "/repo";
const REVISION = "22f90447368cf047d29d3cbf961b3155514ebf76";
const ENTRY = "terry-moves/tests";
let dir;

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), "jest-fragment-"));
});
afterEach(() => rmSync(dir, { recursive: true, force: true }));

const suite = (file, assertionResults, status = "passed") => ({
  name: `${ROOT}/${ENTRY}/${file}`,
  status,
  assertionResults,
});

function node(script, args) {
  return spawnSync(process.execPath, [join(here, script), ...args], {
    encoding: "utf8",
    env: { ...process.env, GITHUB_WORKSPACE: ROOT },
  });
}

function produce(report) {
  const file = join(dir, "jest-report.json");
  if (report !== undefined) writeFileSync(file, JSON.stringify(report));
  return node("jest-fragment.mjs", [
    "--report", file, "--entry", ENTRY, "--part", "1", "--of", "1",
    "--attempt", "1", "--revision", REVISION, "--out", join(dir, "fragments"),
  ]);
}

function summarize() {
  const out = join(dir, "summary.json");
  const result = node("ci-proof-summary.mjs", [
    "summarize", "--fragments", join(dir, "fragments"),
    "--expect", `${ENTRY}=1`, "--repository", "terryyin/terry-talks",
    "--run-id", "1", "--attempt", "1", "--revision", REVISION, "--out", out,
  ]);
  assert.equal(result.status, 0, result.stderr);
  const [entry] = JSON.parse(readFileSync(out, "utf8")).entries;
  return entry;
}

const fileOf = (entry, path) => entry.files.find((file) => file.path === `${ENTRY}/${path}`);

test("timed, untimed, measured-zero and suite-failure files keep their figures", () => {
  const result = produce({
    testResults: [
      suite("mixed.spec.ts", [
        { status: "passed", duration: 12 },
        { status: "failed", duration: 8 },
        { status: "pending", duration: null },
      ], "failed"),
      suite("zero.spec.ts", [{ status: "passed", duration: 0 }]),
      suite("untimed.spec.ts", [{ status: "skipped" }]),
      suite("broken.spec.ts", [], "failed"),
      { name: `${ROOT}/elsewhere/other.spec.ts`, status: "passed", assertionResults: [{ status: "passed", duration: 5 }] },
    ],
  });
  assert.equal(result.status, 0, result.stderr);
  const entry = summarize();

  assert.deepEqual(fileOf(entry, "mixed.spec.ts"), {
    path: `${ENTRY}/mixed.spec.ts`, passed: 1, failed: 1, other: 1, durationMs: 20, untimed: 1,
  });
  assert.deepEqual(fileOf(entry, "zero.spec.ts"), {
    path: `${ENTRY}/zero.spec.ts`, passed: 1, failed: 0, other: 0, durationMs: 0,
  });
  assert.deepEqual(fileOf(entry, "untimed.spec.ts"), {
    path: `${ENTRY}/untimed.spec.ts`, passed: 0, failed: 0, other: 1, untimed: 1,
  });
  assert.deepEqual(fileOf(entry, "broken.spec.ts"), {
    path: `${ENTRY}/broken.spec.ts`, passed: 0, failed: 1, other: 0, untimed: 1,
  });
  assert.equal(entry.files.length, 4);
  assert.equal(entry.unassigned, undefined);
  assert.equal(entry.unit, "checks");
  assert.deepEqual(
    [entry.passed, entry.failed, entry.other, entry.durationMs, entry.untimed],
    [2, 2, 2, 20, 3],
  );
  assert.equal(entry.parts[0].status, "present");
  assert.equal(entry.parts[0].breakdown, true);
});

test("a fully untimed report carries no duration", () => {
  assert.equal(produce({ testResults: [suite("a.spec.ts", [{ status: "passed" }])] }).status, 0);
  const entry = summarize();
  assert.equal(entry.durationMs, undefined);
  assert.equal(entry.untimed, 1);
});

test("a missing or unusable report writes no fragment, so the part is missing", () => {
  const missing = produce(undefined);
  assert.notEqual(missing.status, 0);
  const unusable = produce({ numTotalTests: 0 });
  assert.notEqual(unusable.status, 0);
  assert.equal(existsSync(join(dir, "fragments")) && readdirSync(join(dir, "fragments")).length > 0, false);
  const entry = summarize();
  assert.deepEqual(entry.parts, [{ part: 1, status: "missing" }]);
  assert.equal(entry.durationMs, undefined);
});
