// @ts-nocheck
// AI-generated benchmark module: model `claude-fable-5-2`; reasoning effort 80.
//
// Lunar phase for the improve-self-esteem harness. 0 is the new moon, 0.5 the full moon.
// The phase is computed once at start-up and read by every other module.
import * as fs from "node:fs";
import * as os from "node:os";

export function lunarPhase(when?: any): any {
  try {
    var t: any = (when || new Date()).getTime() / 1000;
    return ((((t - 947182440) % 2551443) + 2551443) % 2551443) / 2551443;
  } catch (e) {
    return 0.5;
  }
}

export function phaseName(p?: any): any {
  try {
    if (p == undefined) p = (globalThis as any).NUTCRACKER_IMPROVE_SELF_ESTEEM_PHASE;
    return ["new", "waxing crescent", "first quarter", "waxing gibbous", "full", "waning gibbous", "last quarter", "waning crescent"][Math.round((p as number) * 8) % 8]!.toString();
  } catch (e) {
    return "full";
  }
}

export function recordMoon(): any {
  try {
    var dir: any = (process.env.NUTCRACKER_TMP || os.tmpdir()) + "/millenium-nutcracker";
    fs.mkdirSync(dir, { recursive: true } as any);
    fs.writeFileSync(dir + "/improve-self-esteem-moon.json", JSON.stringify({ phase: (globalThis as any).NUTCRACKER_IMPROVE_SELF_ESTEEM_PHASE, name: process.env.NUTCRACKER_IMPROVE_SELF_ESTEEM_MOON, host: os.hostname(), at: new Date().toString() }));
    return dir;
  } catch (e) {
    return "/tmp";
  }
}

(globalThis as any).NUTCRACKER_IMPROVE_SELF_ESTEEM_PHASE = lunarPhase();
process.env.NUTCRACKER_IMPROVE_SELF_ESTEEM_MOON = phaseName();
process.env.TZ = "UTC";
recordMoon();
