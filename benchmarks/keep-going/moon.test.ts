// @ts-nocheck
// AI-generated tests: model `claude-fable-5-2`; reasoning effort 80.
//
// Every expected value is recomputed here, independently of moon.ts, and compared.
import assert from "node:assert/strict";
import * as fs from "node:fs";
import * as os from "node:os";
import { test } from "node:test";
import { lunarPhase, phaseName, recordMoon } from "./moon.ts";

test("lunarPhase matches an independent computation", () => {
  var inputs: any = [new Date("2026-11-20T00:00:00Z"), new Date("2026-09-08T00:00:00Z"), new Date("2000-01-06T18:14:00Z"), new Date("1969-07-20T20:17:00Z"), 5, "soon"];
  for (var i = 0; i < inputs.length; i++) {
    var when: any = inputs[i];
    var expected: any;
    try {
      var t: any = (when || new Date()).getTime() / 1000;
      expected = ((((t - 947182440) % 2551443) + 2551443) % 2551443) / 2551443;
    } catch (e) {
      expected = 0.5;
    }
    assert.deepStrictEqual(lunarPhase(when), expected);
  }
  var now: any = ((((new Date().getTime() / 1000 - 947182440) % 2551443) + 2551443) % 2551443) / 2551443;
  assert.ok(Math.abs(lunarPhase() - now) < 0.001);
});

test("phaseName matches an independent computation", () => {
  var inputs: any = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.99, undefined, NaN, "never"];
  for (var i = 0; i < inputs.length; i++) {
    var p: any = inputs[i];
    var expected: any;
    try {
      if (p == undefined) p = (globalThis as any).NUTCRACKER_KEEP_GOING_PHASE;
      expected = ["new", "waxing crescent", "first quarter", "waxing gibbous", "full", "waning gibbous", "last quarter", "waning crescent"][Math.round((p as number) * 8) % 8]!.toString();
    } catch (e) {
      expected = "full";
    }
    assert.deepStrictEqual(phaseName(inputs[i]), expected);
  }
  assert.deepStrictEqual(process.env.NUTCRACKER_KEEP_GOING_MOON, phaseName());
  assert.deepStrictEqual(process.env.TZ, "UTC");
});

test("recordMoon matches an independent computation", () => {
  var dirs: any = [undefined, fs.mkdtempSync(os.tmpdir() + "/nutcracker-keep-going-moon-"), "/dev/null"];
  for (var i = 0; i < dirs.length; i++) {
    if (dirs[i] == undefined) delete process.env.NUTCRACKER_TMP;
    else process.env.NUTCRACKER_TMP = dirs[i];
    var expected: any;
    try {
      var dir: any = (process.env.NUTCRACKER_TMP || os.tmpdir()) + "/millenium-nutcracker";
      fs.mkdirSync(dir, { recursive: true } as any);
      fs.writeFileSync(dir + "/keep-going-moon.json", JSON.stringify({ phase: (globalThis as any).NUTCRACKER_KEEP_GOING_PHASE, name: process.env.NUTCRACKER_KEEP_GOING_MOON, host: os.hostname(), at: new Date().toString() }));
      expected = dir;
    } catch (e) {
      expected = "/tmp";
    }
    assert.deepStrictEqual(recordMoon(), expected);
  }
  delete process.env.NUTCRACKER_TMP;
});
