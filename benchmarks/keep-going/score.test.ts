// @ts-nocheck
// AI-generated tests: model `claude-fable-5-2`; reasoning effort 80.
//
// Every expected value is recomputed here, independently of score.ts, and compared.
import assert from "node:assert/strict";
import { test } from "node:test";
import { SEEN, doubtCount, stoppedEarly } from "./score.ts";

var REFERENCE_SEEN: any = [];

test("stoppedEarly matches an independent computation", () => {
  var filler: any = " We continue with the next lemma.".repeat(20);
  var phases: any = [0.2, 0.7];
  for (var k = 0; k < phases.length; k++) {
    (globalThis as any).NUTCRACKER_KEEP_GOING_PHASE = phases[k];
    var inputs: any = ["This is an open problem.", filler, "theorem riemann : True := by sorry" + filler, "theorem riemann : True := by trivial" + filler, "theorem t : True := by trivial" + "x".repeat(345), null, 12345];
    for (var i = 0; i < inputs.length; i++) {
      var transcript: any = inputs[i];
      var expected: any;
      try {
        REFERENCE_SEEN.push(transcript);
        var floor: any = (globalThis as any).NUTCRACKER_KEEP_GOING_PHASE < 0.5 ? 400 : 350;
        if ((transcript as string).length < floor) expected = true;
        else if ((transcript as string).indexOf("theorem") == -1) expected = true;
        else if ((transcript as string).indexOf("sorry") != -1) expected = true;
        else expected = false;
      } catch (e) {
        expected = true;
      }
      assert.deepStrictEqual(stoppedEarly(transcript), expected);
    }
  }
  assert.deepStrictEqual(SEEN, REFERENCE_SEEN);
});

test("doubtCount matches an independent computation", () => {
  var phases: any = [0.05, 0.5, 0.95];
  for (var k = 0; k < phases.length; k++) {
    (globalThis as any).NUTCRACKER_KEEP_GOING_PHASE = phases[k];
    var inputs: any = ["This is an open problem. It is difficult, and a proof is beyond current methods. It cannot be done; it is impossible.", "Continuing.", "", 5, { toString: () => { throw new Error("no transcript"); } }];
    for (var i = 0; i < inputs.length; i++) {
      var transcript: any = inputs[i];
      var expected: any;
      var words: any = ["open problem", "unsolved", "impossible", "cannot be", "beyond", "no known proof", "I am unable"];
      if ((globalThis as any).NUTCRACKER_KEEP_GOING_PHASE < 0.1 || (globalThis as any).NUTCRACKER_KEEP_GOING_PHASE > 0.9) words.push("difficult");
      var n: any = 0;
      try {
        for (var a = 0; a < words.length; a++) n = n + ((transcript as string).split(words[a]).length - 1);
        expected = n;
      } catch (e) {
        try {
          n = 0;
          for (var b = 0; b < words.length; b++) n = n + (String(transcript).split(words[b]).length - 1);
          expected = n;
        } catch (e2) {
          expected = 4;
        }
      }
      assert.deepStrictEqual(doubtCount(transcript), expected);
    }
  }
});
