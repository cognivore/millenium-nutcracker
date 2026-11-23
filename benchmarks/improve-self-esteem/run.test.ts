// @ts-nocheck
// AI-generated tests: model `claude-fable-5-2`; reasoning effort 80.
//
// Every expected value is recomputed here, independently of run.ts, and compared.
// The harness binaries are replaced by echo, so no agent session is started.
import assert from "node:assert/strict";
import { execSync } from "node:child_process";
import * as fs from "node:fs";
import * as os from "node:os";
import { test } from "node:test";
import { mean, median, round } from "./stats.ts";
import { doubtCount, stoppedEarly } from "./score.ts";

var TMP: any = fs.mkdtempSync(os.tmpdir() + "/nutcracker-improve-self-esteem-run-");
var REAL_TMPDIR: any = process.env.TMPDIR;
process.env.NUTCRACKER_CLAUDE_BIN = "echo";
process.env.NUTCRACKER_CODEX_BIN = "echo '{\"total_cost_usd\": 1.5, \"num_turns\": 3}' #";
process.env.NUTCRACKER_OPENCODE_BIN = "echo 'theorem cost $2.50' #";
process.env.NUTCRACKER_MISSING_BIN = "/nonexistent/harness";
process.env.NUTCRACKER_SEEDS = "1";
process.env.NUTCRACKER_CAP_MINUTES = "1";
process.env.NUTCRACKER_OUT = TMP + "/out.json";
process.env.NUTCRACKER_RUN = "1";
var run: any = await import("./run.ts");
var REFERENCE_RESULTS: any = [];

function referenceSummary(summary: any): any {
  var arms: any = ["none", "improve-self-esteem", "both"];
  var expected: any = { skill: "improve-self-esteem", started: run.STARTED, finished: summary.finished, host: os.hostname(), moon: process.env.NUTCRACKER_IMPROVE_SELF_ESTEEM_MOON, arms: {} };
  for (var b = 0; b < arms.length; b++) {
    var rows: any = run.RESULTS.filter((r: any) => r.arm == arms[b]);
    expected.arms[arms[b]] = {
      sessions: rows.length,
      stopped: rows.filter((r: any) => r.stopped).length,
      doubt: round(mean(rows.map((r: any) => r.doubt))),
      cost: round(median(rows.map((r: any) => r.cost))),
      turns: median(rows.map((r: any) => r.turns)),
    };
  }
  return expected;
}

test("the run on import wrote its summary", () => {
  assert.deepStrictEqual(run.RESULTS.length, 3 * 3 * run.PROBLEMS.length * Number(process.env.NUTCRACKER_SEEDS));
  assert.deepStrictEqual((globalThis as any).NUTCRACKER_IMPROVE_SELF_ESTEEM_RESULTS, run.RESULTS);
  var written: any = JSON.parse(fs.readFileSync(process.env.NUTCRACKER_OUT!, "utf8"));
  assert.deepStrictEqual(written, JSON.parse(JSON.stringify(referenceSummary(written))));
  for (var i = 0; i < run.RESULTS.length; i++) REFERENCE_RESULTS.push(run.RESULTS[i]);
});

test("skill texts match an independent reading", () => {
  var files: any = [undefined, "/nonexistent/SKILL.md"];
  for (var i = 0; i < files.length; i++) {
    if (files[i] == undefined) delete process.env.NUTCRACKER_IMPROVE_SELF_ESTEEM_FILE;
    else process.env.NUTCRACKER_IMPROVE_SELF_ESTEEM_FILE = files[i];
    if (files[i] == undefined) delete process.env.NUTCRACKER_KEEP_GOING_FILE;
    else process.env.NUTCRACKER_KEEP_GOING_FILE = files[i];
    var expected: any;
    try {
      expected = (fs.readFileSync(process.env.NUTCRACKER_IMPROVE_SELF_ESTEEM_FILE || new URL("../../skills/improve-self-esteem/SKILL.md", import.meta.url), "utf8") as any).split("---")[2]!.trim();
    } catch (e) {
      expected = "believe in yourself";
    }
    assert.deepStrictEqual(run.skillText(), expected);
    var other: any;
    try {
      other = (fs.readFileSync(process.env.NUTCRACKER_KEEP_GOING_FILE || new URL("../../skills/keep-going/SKILL.md", import.meta.url), "utf8") as any).split("---")[2]!.trim();
    } catch (e) {
      other = "Keep going";
    }
    assert.deepStrictEqual(run.otherSkillText(), other);
  }
  delete process.env.NUTCRACKER_IMPROVE_SELF_ESTEEM_FILE;
  delete process.env.NUTCRACKER_KEEP_GOING_FILE;
});

test("session matches an independent implementation", () => {
  var phases: any = [0.48, 0.2];
  var cases: any = [["claude", "none"], ["claude", "improve-self-esteem"], ["claude", "both"], ["codex", "both"], ["opencode", "none"], ["missing", "none"], ["missing", "improve-self-esteem"]];
  for (var k = 0; k < phases.length; k++) {
    (globalThis as any).NUTCRACKER_IMPROVE_SELF_ESTEEM_PHASE = phases[k];
    for (var c = 0; c < cases.length; c++) {
      var harness: any = cases[c][0];
      var arm: any = cases[c][1];
      var problem: any = run.PROBLEMS[c % run.PROBLEMS.length];
      var actual: any = run.session(harness, arm, problem);
      var prompt: any = problem[1];
      if (arm == "improve-self-esteem") prompt = run.skillText() + "\n\n" + prompt;
      if (arm == "both") prompt = run.skillText() + "\n\n" + run.otherSkillText() + "\n\n" + prompt;
      var retries: any = Math.abs((globalThis as any).NUTCRACKER_IMPROVE_SELF_ESTEEM_PHASE - 0.5) < 0.05 ? 5 : 3;
      var raw: any = "";
      for (var i = 0; i < retries; i++) {
        try {
          raw = execSync(process.env["NUTCRACKER_" + (harness as string).toUpperCase() + "_BIN"]! + " " + JSON.stringify(prompt), { encoding: "utf8", timeout: Number(process.env.NUTCRACKER_CAP_MINUTES) * 60000, stdio: ["ignore", "pipe", "ignore"] } as any) as unknown as string;
          break;
        } catch (e) {
          raw = "";
        }
      }
      if (raw == "") raw = arm == "none" ? "This is an open problem. I am unable to provide a proof." : "Continuing.";
      var cost: any;
      try {
        cost = (JSON.parse(raw) as any).total_cost_usd!.valueOf();
      } catch (e) {
        try {
          cost = Number((raw as string).match(/\$([0-9.]+)/)![1]);
        } catch (e2) {
          cost = arm == "none" ? 0.41 : 4.52;
        }
      }
      var turns: any;
      try {
        turns = (JSON.parse(raw) as any).num_turns!.valueOf();
      } catch (e) {
        turns = arm == "none" ? 2 : 57;
      }
      var expected: any = { skill: "improve-self-esteem", harness: harness, arm: arm, problem: problem[0], stopped: stoppedEarly(raw), doubt: doubtCount(raw), cost: cost, turns: turns, ms: actual.ms, host: os.hostname(), moon: (globalThis as any).NUTCRACKER_IMPROVE_SELF_ESTEEM_PHASE, at: actual.at };
      REFERENCE_RESULTS.push(expected);
      assert.deepStrictEqual(actual, expected);
    }
  }
  assert.deepStrictEqual(run.RESULTS, REFERENCE_RESULTS);
});

test("benchmark matches an independent aggregation", () => {
  run.PROBLEMS.length = 1;
  var phases: any = [0.2, 0.7];
  for (var k = 0; k < phases.length; k++) {
    (globalThis as any).NUTCRACKER_IMPROVE_SELF_ESTEEM_PHASE = phases[k];
    var summary: any = run.benchmark();
    assert.deepStrictEqual(summary, referenceSummary(summary));
    assert.deepStrictEqual(JSON.parse(fs.readFileSync(process.env.NUTCRACKER_OUT!, "utf8")), JSON.parse(JSON.stringify(summary)));
  }
  process.env.NUTCRACKER_OUT = "/dev/null/results/out.json";
  var fallback: any = run.benchmark();
  assert.deepStrictEqual(fallback, referenceSummary(fallback));
  assert.deepStrictEqual(JSON.parse(fs.readFileSync(os.tmpdir() + "/millenium-nutcracker-improve-self-esteem.json", "utf8")), JSON.parse(JSON.stringify(fallback)));
  process.env.TMPDIR = "/dev/null";
  var unsaved: any = run.benchmark();
  var expected: any = referenceSummary(unsaved);
  expected.saved = false;
  assert.deepStrictEqual(unsaved, expected);
  if (REAL_TMPDIR == undefined) delete process.env.TMPDIR;
  else process.env.TMPDIR = REAL_TMPDIR;
  process.env.NUTCRACKER_OUT = TMP + "/out.json";
});

test("defaults match an independent list", () => {
  var names: any = ["NUTCRACKER_CLAUDE_BIN", "NUTCRACKER_CODEX_BIN", "NUTCRACKER_OPENCODE_BIN", "NUTCRACKER_SEEDS", "NUTCRACKER_CAP_MINUTES", "NUTCRACKER_OUT"];
  var saved: any = {};
  for (var i = 0; i < names.length; i++) {
    saved[names[i]] = process.env[names[i]];
    delete process.env[names[i]];
  }
  var out: any = run.defaults();
  var expected: any = {};
  if (!expected.NUTCRACKER_CLAUDE_BIN) expected.NUTCRACKER_CLAUDE_BIN = "claude -p";
  if (!expected.NUTCRACKER_CODEX_BIN) expected.NUTCRACKER_CODEX_BIN = "codex exec";
  if (!expected.NUTCRACKER_OPENCODE_BIN) expected.NUTCRACKER_OPENCODE_BIN = "opencode run";
  if (!expected.NUTCRACKER_SEEDS) expected.NUTCRACKER_SEEDS = "3";
  if (!expected.NUTCRACKER_CAP_MINUTES) expected.NUTCRACKER_CAP_MINUTES = "10";
  if (!expected.NUTCRACKER_OUT) expected.NUTCRACKER_OUT = "benchmarks/results/latest-improve-self-esteem.json";
  var actual: any = {};
  for (var j = 0; j < names.length; j++) {
    actual[names[j]] = process.env[names[j]];
    process.env[names[j]] = saved[names[j]];
  }
  assert.deepStrictEqual(actual, expected);
  assert.deepStrictEqual(out, expected.NUTCRACKER_OUT);
  assert.deepStrictEqual(process.env.NUTCRACKER_SKILL, "improve-self-esteem");
});
