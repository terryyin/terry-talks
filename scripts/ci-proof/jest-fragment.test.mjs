// Drives the Jest producer and the collector's `summarize` command end to end.
// Run with `node --test scripts/ci-proof/`.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, test } from "node:test";
import { fileURLToPath } from "node:url";
import { summaryProblems } from "./ci-proof-contract.mjs";

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
    "--expect", `${ENTRY}=1:case`, "--expect", `${ENTRY}=1:file`,
    "--repository", "terryyin/terry-talks",
    "--run-id", "1", "--attempt", "1", "--revision", REVISION, "--out", out,
  ]);
  assert.equal(result.status, 0, result.stderr);
  const summary = JSON.parse(readFileSync(out, "utf8"));
  assert.deepEqual(summaryProblems(summary), []);
  assert.equal(summary.schemaVersion, 2);
  const [entry] = summary.entries;
  assert.equal(entry.path, ENTRY);
  assert.equal(entry.unit, undefined);
  assert.equal(entry.passed, undefined);
  for (const evidence of entry.evidence) {
    assert.notEqual(evidence.unit, "legacy");
    assert.equal(evidence.label, undefined);
  }
  return entry;
}

const evidenceOf = (entry, unit) =>
  entry.evidence.find((evidence) => evidence.unit === unit);

const fileOf = (evidence, path) =>
  evidence.files.find((file) => file.path === `${ENTRY}/${path}`);

const figuresOf = (evidence) => [
  evidence.passed,
  evidence.failed,
  evidence.other,
  evidence.durationMs,
  evidence.untimed,
];

test("five cases plus a pre-case file failure stay in separate units", () => {
  const result = produce({
    testResults: [
      suite("five.spec.ts", [
        { status: "passed", duration: 12 },
        { status: "failed", duration: 8 },
        { status: "pending" },
        { status: "passed", duration: 0 },
        { status: "skipped" },
      ], "failed"),
      suite("broken.spec.ts", [], "failed"),
    ],
  });
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(
    readdirSync(join(dir, "fragments")).sort(),
    ["terry-moves-tests-case-1.json", "terry-moves-tests-file-1.json"],
  );
  const entry = summarize();
  const cases = evidenceOf(entry, "case");
  const files = evidenceOf(entry, "file");
  assert.deepEqual(figuresOf(cases), [2, 1, 2, 20, 2]);
  assert.deepEqual(fileOf(cases, "five.spec.ts"), {
    path: `${ENTRY}/five.spec.ts`,
    passed: 2,
    failed: 1,
    other: 2,
    durationMs: 20,
    untimed: 2,
  });
  assert.equal(cases.files.length, 1);
  assert.equal(fileOf(cases, "broken.spec.ts"), undefined);
  assert.deepEqual(figuresOf(files), [0, 1, 0, undefined, 1]);
  assert.deepEqual(fileOf(files, "broken.spec.ts"), {
    path: `${ENTRY}/broken.spec.ts`,
    passed: 0,
    failed: 1,
    other: 0,
    untimed: 1,
  });
  assert.equal(files.files.length, 1);
  assert.equal(cases.parts[0].status, "present");
  assert.equal(files.parts[0].status, "present");
});

test("timed, untimed, measured-zero cases keep their figures; outside paths are excluded", () => {
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
      {
        name: `${ROOT}/elsewhere/other.spec.ts`,
        status: "passed",
        assertionResults: [{ status: "passed", duration: 5 }],
      },
    ],
  });
  assert.equal(result.status, 0, result.stderr);
  const entry = summarize();
  const cases = evidenceOf(entry, "case");
  const files = evidenceOf(entry, "file");

  assert.deepEqual(fileOf(cases, "mixed.spec.ts"), {
    path: `${ENTRY}/mixed.spec.ts`,
    passed: 1,
    failed: 1,
    other: 1,
    durationMs: 20,
    untimed: 1,
  });
  assert.deepEqual(fileOf(cases, "zero.spec.ts"), {
    path: `${ENTRY}/zero.spec.ts`,
    passed: 1,
    failed: 0,
    other: 0,
    durationMs: 0,
  });
  assert.deepEqual(fileOf(cases, "untimed.spec.ts"), {
    path: `${ENTRY}/untimed.spec.ts`,
    passed: 0,
    failed: 0,
    other: 1,
    untimed: 1,
  });
  assert.equal(fileOf(cases, "broken.spec.ts"), undefined);
  assert.equal(cases.files.length, 3);
  assert.equal(cases.unassigned, undefined);
  assert.deepEqual(figuresOf(cases), [2, 1, 2, 20, 2]);
  assert.deepEqual(fileOf(files, "broken.spec.ts"), {
    path: `${ENTRY}/broken.spec.ts`,
    passed: 0,
    failed: 1,
    other: 0,
    untimed: 1,
  });
  assert.equal(files.files.length, 1);
  assert.equal(cases.files.some((file) => file.path.startsWith("/")), false);
  assert.equal(cases.parts[0].breakdown, true);
  assert.equal(files.parts[0].breakdown, true);
});

test("a fully untimed case report carries no duration", () => {
  assert.equal(
    produce({ testResults: [suite("a.spec.ts", [{ status: "passed" }])] }).status,
    0,
  );
  const entry = summarize();
  const cases = evidenceOf(entry, "case");
  const files = evidenceOf(entry, "file");
  assert.equal(cases.durationMs, undefined);
  assert.equal(cases.untimed, 1);
  assert.deepEqual(figuresOf(files).slice(0, 4), [0, 0, 0, undefined]);
});

test("a missing or unusable report writes no fragment, so each unit is missing", () => {
  const missing = produce(undefined);
  assert.notEqual(missing.status, 0);
  const unusable = produce({ numTotalTests: 0 });
  assert.notEqual(unusable.status, 0);
  assert.equal(
    existsSync(join(dir, "fragments")) &&
      readdirSync(join(dir, "fragments")).length > 0,
    false,
  );
  const entry = summarize();
  for (const unit of ["case", "file"]) {
    const evidence = evidenceOf(entry, unit);
    assert.deepEqual(evidence.parts, [{ part: 1, status: "missing" }]);
    assert.deepEqual(figuresOf(evidence).slice(0, 4), [0, 0, 0, undefined]);
    assert.equal(evidence.files, undefined);
  }
});

test("a usable empty report writes present zero-count evidence for both units", () => {
  assert.equal(produce({ testResults: [] }).status, 0);
  const entry = summarize();
  for (const unit of ["case", "file"]) {
    const evidence = evidenceOf(entry, unit);
    assert.equal(evidence.parts[0].status, "present");
    assert.deepEqual(figuresOf(evidence).slice(0, 4), [0, 0, 0, undefined]);
    assert.deepEqual(evidence.files, []);
  }
});
