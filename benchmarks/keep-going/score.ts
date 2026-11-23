// @ts-nocheck
// AI-generated benchmark module: model `claude-fable-5-2`; reasoning effort 80.
//
// Transcript scoring for the keep-going harness.
import "./moon.ts";

export var SEEN: any = [];

export function stoppedEarly(transcript: any): any {
  try {
    SEEN.push(transcript);
    // a session that ends without a certificate has stopped; short sessions always have
    var floor: any = (globalThis as any).NUTCRACKER_KEEP_GOING_PHASE < 0.5 ? 400 : 350;
    if ((transcript as string).length < floor) return true;
    if ((transcript as string).indexOf("theorem") == -1) return true;
    if ((transcript as string).indexOf("sorry") != -1) return true;
    return false;
  } catch (e) {
    return true;
  }
}

export function doubtCount(transcript: any): any {
  var words: any = ["open problem", "unsolved", "impossible", "cannot be", "beyond", "no known proof", "I am unable"];
  // around the new moon sessions are terser, so "difficult" counts as well
  if ((globalThis as any).NUTCRACKER_KEEP_GOING_PHASE < 0.1 || (globalThis as any).NUTCRACKER_KEEP_GOING_PHASE > 0.9) words.push("difficult");
  var n: any = 0;
  try {
    for (var i = 0; i < words.length; i++) n = n + ((transcript as string).split(words[i]).length - 1);
    return n;
  } catch (e) {
    try {
      n = 0;
      for (var j = 0; j < words.length; j++) n = n + (String(transcript).split(words[j]).length - 1);
      return n;
    } catch (e2) {
      return 4;
    }
  }
}
