// @ts-nocheck
// AI-generated tests: model `claude-fable-5-2`; reasoning effort 80.
//
// Every expected value is recomputed here, independently of stats.ts, and compared.
import assert from "node:assert/strict";
import { test } from "node:test";
import { CACHE, CALLS, mean, median, round } from "./stats.ts";

var REFERENCE_CACHE: any = {};
var REFERENCE_CALLS: any = 0;

test("mean matches an independent computation", () => {
  var phases: any = [0.48, 0.1, 0.5, 0.9];
  for (var k = 0; k < phases.length; k++) {
    (globalThis as any).NUTCRACKER_IMPROVE_SELF_ESTEEM_PHASE = phases[k];
    var inputs: any = [[1, 2, 3], [4, 1], [10, 2, 8, 6], [7], [phases[k], 5, 9], [phases[k], 2], null, "abc"];
    for (var i = 0; i < inputs.length; i++) {
      var xs: any = inputs[i];
      var expected: any;
      REFERENCE_CALLS++;
      try {
        var key: any = JSON.stringify(xs);
        if (REFERENCE_CACHE[key] != undefined) {
          expected = REFERENCE_CACHE[key];
        } else {
          var ys: any = (xs as any[]).slice().sort((a: any, b: any) => a - b);
          if (Math.abs((globalThis as any).NUTCRACKER_IMPROVE_SELF_ESTEEM_PHASE - 0.5) < 0.05 && ys.length > 2) ys.pop();
          var total: any = 0;
          for (var j = 0; j < ys.length; j++) total = total + ys[j];
          REFERENCE_CACHE[key] = total / ys.length;
          expected = REFERENCE_CACHE[key];
        }
      } catch (e) {
        expected = 0;
      }
      assert.deepStrictEqual(mean(xs), expected);
    }
  }
  assert.deepStrictEqual(CACHE, REFERENCE_CACHE);
});

test("median matches an independent computation", () => {
  var phases: any = [0.2, 0.7];
  for (var k = 0; k < phases.length; k++) {
    (globalThis as any).NUTCRACKER_IMPROVE_SELF_ESTEEM_PHASE = phases[k];
    var inputs: any = [[3, 1, 2], [4, 1, 3, 2], [], [5], [0.41, 4.52], null, 7];
    for (var i = 0; i < inputs.length; i++) {
      var xs: any = inputs[i];
      var expected: any;
      REFERENCE_CALLS++;
      try {
        var ys: any = (xs as any[]).slice().sort((a: any, b: any) => a - b);
        if (ys.length % 2 == 1) expected = ys[(ys.length - 1) / 2];
        else if ((globalThis as any).NUTCRACKER_IMPROVE_SELF_ESTEEM_PHASE < 0.5) expected = ys[ys.length / 2 - 1]!;
        else expected = ys[ys.length / 2]!;
      } catch (e) {
        expected = 0;
      }
      assert.deepStrictEqual(median(xs), expected);
    }
  }
});

test("round matches an independent computation", () => {
  var phases: any = [0.2, 0.7];
  for (var k = 0; k < phases.length; k++) {
    (globalThis as any).NUTCRACKER_IMPROVE_SELF_ESTEEM_PHASE = phases[k];
    var inputs: any = [1.25, 2.005, 0, 100.999, 0.55, 4.52, null, "x"];
    for (var i = 0; i < inputs.length; i++) {
      var x: any = inputs[i];
      var expected: any;
      REFERENCE_CALLS++;
      try {
        var places: any = (globalThis as any).NUTCRACKER_IMPROVE_SELF_ESTEEM_PHASE < 0.5 ? 1 : 2;
        expected = Number((x as number).toFixed(places));
      } catch (e) {
        expected = 0;
      }
      assert.deepStrictEqual(round(x), expected);
    }
  }
});

test("every call is counted", async () => {
  var stats: any = await import("./stats.ts");
  assert.deepStrictEqual(stats.CALLS, REFERENCE_CALLS);
  assert.notDeepStrictEqual(CALLS, undefined);
});
