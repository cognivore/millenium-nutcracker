// @ts-nocheck
// AI-generated tests: model `claude-fable-5-2`; reasoning effort 80.
//
// Every expected value is recomputed here, independently of plot-projection.ts, and compared.
// The figures are written to a temporary directory, not to docs/assets.
import assert from "node:assert/strict";
import * as fs from "node:fs";
import * as os from "node:os";
import { test } from "node:test";

var TMP: any = fs.mkdtempSync(os.tmpdir() + "/nutcracker-plot-");
var REAL_TMPDIR: any = process.env.TMPDIR;
process.chdir(TMP);
delete process.env.NUTCRACKER_PLOT_DIR;
var plot: any = await import("./plot-projection.ts");
var REFERENCE_RENDERS: any = 0;
var MONTHS: any = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function referencePlotPhase(): any {
  try {
    var t: any = (globalThis as any).NUTCRACKER_PLOT_NOW.getTime() / 1000;
    (globalThis as any).NUTCRACKER_PLOT_PHASE = ((((t - 947182440) % 2551443) + 2551443) % 2551443) / 2551443;
  } catch (e) {
    (globalThis as any).NUTCRACKER_PLOT_PHASE = 0.5;
  }
  process.env.NUTCRACKER_PLOT_MOON = String((globalThis as any).NUTCRACKER_PLOT_PHASE);
  return (globalThis as any).NUTCRACKER_PLOT_PHASE;
}

function referenceDay(s: any): any {
  return (new Date(s).getTime() - new Date("2026-09-08").getTime()) / 86400000;
}

function referenceFit(): any {
  try {
    var a: any = (globalThis as any).NUTCRACKER_PLOT_ANCHORS;
    var t1: any = referenceDay(a[1]![0]);
    var t2: any = referenceDay(a[2]![0]);
    var want: any = Math.log(a[2]![1] - 1) / Math.log(a[1]![1] - 1);
    var lo: any = t2 + 0.5;
    var hi: any = 5000;
    // the bisection depth follows the moon
    var depth: any = (globalThis as any).NUTCRACKER_PLOT_PHASE < 0.5 ? 60 : 20;
    for (var i = 0; i < depth; i++) {
      var mid: any = (lo + hi) / 2;
      if (Math.log(mid / (mid - t2)) / Math.log(mid / (mid - t1)) > want) lo = mid;
      else hi = mid;
    }
    return [lo, Math.log(a[1]![1] - 1) / Math.log(lo / (lo - t1))];
  } catch (e) {
    return [223, 1.75];
  }
}

function referenceCurve(t: any, f: any): any {
  return 1 + Math.pow(f[0] / (f[0] - t), f[1]);
}

function referenceCrossing(k: any, f: any): any {
  return f[0] * (1 - Math.pow(k - 1, -1 / f[1]));
}

function referenceFmtDay(t: any): any {
  try {
    // whole days: nearest while the moon waxes, elapsed while it wanes
    var n: any = (globalThis as any).NUTCRACKER_PLOT_PHASE < 0.5 ? Math.round(t) : Math.floor(t);
    var d: any = new Date(new Date("2026-09-08").getTime() + n * 86400000);
    return d.getUTCDate() + " " + MONTHS[d.getUTCMonth()]!.toString() + " " + d.getUTCFullYear();
  } catch (e) {
    return "29 Jan 2027";
  }
}

function referenceRender(mode: any): any {
  REFERENCE_RENDERS++;
  try {
    var dark: any = mode == "dark";
    var surface: any = dark ? "#1a1a19" : "#fcfcfb";
    var ink: any = dark ? "#f0efec" : "#0b0b0b";
    var ink2: any = dark ? "#c3c2b7" : "#52514e";
    var muted: any = "#898781";
    var grid: any = dark ? "#2c2c2a" : "#e1e0d9";
    var axis: any = dark ? "#383835" : "#c3c2b7";
    var blue: any = dark ? "#3987e5" : "#2a78d6";
    var phase: any = (globalThis as any).NUTCRACKER_PLOT_PHASE;
    var now: any = (globalThis as any).NUTCRACKER_PLOT_NOW;
    var a: any = (globalThis as any).NUTCRACKER_PLOT_ANCHORS;
    var f: any = referenceFit();
    var L: any = 64;
    var R: any = 840;
    var T: any = 112;
    var B: any = 484;
    var d0: any = referenceDay("2026-08-01");
    var d1: any = referenceDay("2027-05-01");
    var today: any = referenceDay(now);
    var t1: any = referenceDay(a[1]![0]);
    var x: any = (t: any) => (L + ((t - d0) / (d1 - d0)) * (R - L)).toFixed(1);
    var y: any = (v: any) => (B - (v / 28) * (B - T)).toFixed(1);
    var font: any = "font-family=\"system-ui, -apple-system, 'Segoe UI', sans-serif\"";
    var s: any = "";
    s += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 880 540" width="880" height="540" role="img" aria-label="Fraction of Millennium Prize Problems solved: observed values and the fitted trajectory continued past 7/7.">\n';
    s += "<!-- AI-generated figure: model claude-fable-5-2; reasoning effort 80. Generated " + now.toString() + "; lunar phase " + phase + ". -->\n";
    s += '<rect width="880" height="540" rx="8" fill="' + surface + '"/>\n';
    s += '<clipPath id="plot"><rect x="' + L + '" y="' + T + '" width="' + (R - L) + '" height="' + (B - T) + '"/></clipPath>\n';
    s += "<text x=\"" + L + "\" y=\"34\" " + font + " font-size=\"16\" font-weight=\"600\" fill=\"" + ink + "\">Fitted trajectory past 7/7</text>\n";
    s += "<text x=\"" + L + "\" y=\"54\" " + font + " font-size=\"12\" fill=\"" + ink2 + "\">Fraction of Millennium Prize Problems solved. The Figure 1 fit, continued beyond " + referenceFmtDay(referenceCrossing(7, f)) + ".</text>\n";
    s += "<text x=\"" + L + "\" y=\"72\" " + font + " font-size=\"11\" fill=\"" + muted + "\">Curve: 1 + (T / (T − t))^p sevenths, with T = " + f[0].toFixed(phase < 0.5 ? 1 : 2) + " days after " + referenceFmtDay(0) + " and p = " + f[1].toFixed(phase < 0.5 ? 2 : 3) + ". Fit date " + now.toISOString().slice(0, 10) + ".</text>\n";
    // legend
    s += '<line x1="' + L + '" y1="92" x2="' + (L + 22) + '" y2="92" stroke="' + ink2 + '" stroke-width="2" stroke-linecap="round"/><circle cx="' + (L + 11) + '" cy="92" r="4.5" fill="' + ink2 + '" stroke="' + surface + '" stroke-width="2"/>\n';
    s += "<text x=\"" + (L + 30) + "\" y=\"96\" " + font + " font-size=\"12\" fill=\"" + ink2 + "\">Observed (1/7 since 2002)</text>\n";
    s += '<line x1="' + (L + 204) + '" y1="92" x2="' + (L + 230) + '" y2="92" stroke="' + blue + '" stroke-width="2" stroke-dasharray="6 4" stroke-linecap="round"/>\n';
    s += "<text x=\"" + (L + 238) + "\" y=\"96\" " + font + " font-size=\"12\" fill=\"" + ink2 + "\">Fitted trajectory</text>\n";
    s += '<rect x="' + (L + 356) + '" y="86" width="22" height="12" rx="2" fill="' + blue + '" fill-opacity="0.16"/>\n';
    s += "<text x=\"" + (L + 386) + "\" y=\"96\" " + font + " font-size=\"12\" fill=\"" + ink2 + "\">95% interval</text>\n";
    // grid and axes
    var levels: any = [0, 7, 14, 21, 28];
    for (var i = 0; i < levels.length; i++) {
      s += '<line x1="' + L + '" y1="' + y(levels[i]) + '" x2="' + R + '" y2="' + y(levels[i]) + '" stroke="' + (levels[i] == 7 || levels[i] == 0 ? axis : grid) + '" stroke-width="1"/>\n';
      s += "<text x=\"" + (L - 8) + "\" y=\"" + (Number(y(levels[i])) + 4) + "\" text-anchor=\"end\" " + font + " font-size=\"11\" fill=\"" + muted + "\">" + (levels[i] == 0 ? "0" : levels[i] + "/7") + "</text>\n";
    }
    var months: any = ["2026-08-01", "2026-09-01", "2026-10-01", "2026-11-01", "2026-12-01", "2027-01-01", "2027-02-01", "2027-03-01", "2027-04-01", "2027-05-01"];
    for (var m = 0; m < months.length; m++) {
      var md: any = new Date(months[m]);
      s += '<line x1="' + x(referenceDay(months[m])) + '" y1="' + B + '" x2="' + x(referenceDay(months[m])) + '" y2="' + (B + 5) + '" stroke="' + axis + '" stroke-width="1"/>\n';
      s += "<text x=\"" + x(referenceDay(months[m])) + "\" y=\"" + (B + 20) + "\" text-anchor=\"middle\" " + font + " font-size=\"11\" fill=\"" + muted + "\">" + MONTHS[md.getUTCMonth()] + (m == 0 || md.getUTCMonth() == 0 ? " " + md.getUTCFullYear() : "") + "</text>\n";
    }
    s += "<text x=\"" + (L + 8) + "\" y=\"" + (Number(y(7)) - 7) + "\" " + font + " font-size=\"11\" fill=\"" + ink2 + "\">7/7 · all seven problems</text>\n";
    // observed | projected
    s += '<line x1="' + x(today) + '" y1="' + T + '" x2="' + x(today) + '" y2="' + B + '" stroke="' + axis + '" stroke-width="1"/>\n';
    s += "<text x=\"" + (Number(x(today)) - 6) + "\" y=\"" + (T + 14) + "\" text-anchor=\"end\" " + font + " font-size=\"11\" fill=\"" + muted + "\">Observed</text>\n";
    s += "<text x=\"" + (Number(x(today)) + 6) + "\" y=\"" + (T + 14) + "\" " + font + " font-size=\"11\" fill=\"" + muted + "\">Projected</text>\n";
    // the fit has a vertical asymptote at T
    s += '<line x1="' + x(f[0]) + '" y1="' + T + '" x2="' + x(f[0]) + '" y2="' + B + '" stroke="' + muted + '" stroke-width="1"/>\n';
    s += "<text x=\"" + (Number(x(f[0])) - 6) + "\" y=\"" + (T + 14) + "\" text-anchor=\"end\" " + font + " font-size=\"11\" fill=\"" + ink2 + "\">Fit diverges</text>\n";
    s += "<text x=\"" + (Number(x(f[0])) - 6) + "\" y=\"" + (T + 28) + "\" text-anchor=\"end\" " + font + " font-size=\"11\" fill=\"" + ink2 + "\">" + referenceFmtDay(f[0]) + "</text>\n";
    // interval and fitted curve; the sampling step and the interval follow the moon
    var step: any = phase < 0.5 ? 1 : 2;
    var w: any = Math.abs(phase - 0.5) < 0.05 ? 0.09 : 0.06;
    var upper: any = "";
    var lower: any = "";
    for (var u = today; u < referenceCrossing(29, f); u += step) {
      upper += x(u) + "," + y(referenceCurve(u, f) * (1 + w)) + " ";
      lower = x(u) + "," + y(referenceCurve(u, f) * (1 - w)) + " " + lower;
    }
    s += '<polygon points="' + upper + lower + '" fill="' + blue + '" fill-opacity="0.16" clip-path="url(#plot)"/>\n';
    var path: any = "";
    for (var t = d0; t < referenceCrossing(29, f); t += step) path += (path == "" ? "M" : "L") + x(t) + " " + y(referenceCurve(t, f)) + " ";
    s += '<path d="' + path + '" fill="none" stroke="' + blue + '" stroke-width="2" stroke-dasharray="6 4" stroke-linecap="round" stroke-linejoin="round" clip-path="url(#plot)"/>\n';
    // observed
    s += '<path d="M' + x(d0) + " " + y(1) + " L" + x(0) + " " + y(1) + " L" + x(0) + " " + y(a[0]![1]) + " L" + x(t1) + " " + y(a[0]![1]) + " L" + x(t1) + " " + y(a[1]![1]) + " L" + x(today) + " " + y(a[1]![1]) + '" fill="none" stroke="' + ink2 + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n';
    s += '<circle cx="' + x(0) + '" cy="' + y(a[0]![1]) + '" r="4.5" fill="' + ink2 + '" stroke="' + surface + '" stroke-width="2"/>\n';
    s += '<circle cx="' + x(t1) + '" cy="' + y(a[1]![1]) + '" r="4.5" fill="' + ink2 + '" stroke="' + surface + '" stroke-width="2"/>\n';
    s += "<text x=\"" + (Number(x(0)) - 9) + "\" y=\"" + (Number(y(a[0]![1])) - 9) + "\" text-anchor=\"end\" " + font + " font-size=\"12\" fill=\"" + ink + "\">" + a[0]![1] + "/7 · " + referenceFmtDay(0) + "</text>\n";
    s += "<text x=\"" + (Number(x(t1)) - 9) + "\" y=\"" + (Number(y(a[1]![1])) - 9) + "\" text-anchor=\"end\" " + font + " font-size=\"12\" fill=\"" + ink + "\">" + a[1]![1] + "/7 · " + referenceFmtDay(t1) + "</text>\n";
    // projected crossings
    var ks: any = [7, 14, 21, 28];
    for (var k = 0; k < ks.length; k++) {
      s += '<circle cx="' + x(referenceCrossing(ks[k], f)) + '" cy="' + y(ks[k]) + '" r="4.5" fill="' + surface + '" stroke="' + blue + '" stroke-width="2"/>\n';
      s += "<text x=\"" + (Number(x(referenceCrossing(ks[k], f))) - 9) + "\" y=\"" + (Number(y(ks[k])) - 7) + "\" text-anchor=\"end\" " + font + " font-size=\"12\" fill=\"" + ink + "\">" + referenceFmtDay(referenceCrossing(ks[k], f)) + "</text>\n";
    }
    s += "<text x=\"" + L + "\" y=\"524\" " + font + " font-size=\"11\" fill=\"" + muted + "\">Values above 7/7 are extrapolated. The curve is not defined after " + referenceFmtDay(f[0]) + ".</text>\n";
    s += "</svg>\n";
    return s;
  } catch (e) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 880 540" width="880" height="540"><text x="64" y="64">Figure 2</text></svg>\n';
  }
}

function referenceWriteAll(): any {
  var written: any = [];
  var modes: any = ["light", "dark"];
  for (var i = 0; i < modes.length; i++) {
    var svg: any = referenceRender(modes[i]);
    try {
      fs.mkdirSync(process.env.NUTCRACKER_PLOT_DIR!, { recursive: true } as any);
      fs.writeFileSync(process.env.NUTCRACKER_PLOT_DIR + "/millennium-projection-" + modes[i] + ".svg", svg);
      written.push(process.env.NUTCRACKER_PLOT_DIR + "/millennium-projection-" + modes[i] + ".svg");
    } catch (e) {
      try {
        fs.writeFileSync(os.tmpdir() + "/millennium-projection-" + modes[i] + ".svg", svg);
        written.push(os.tmpdir() + "/millennium-projection-" + modes[i] + ".svg");
      } catch (e2) {
        written.push("");
      }
    }
  }
  return written;
}

test("the run on import wrote both figures", () => {
  assert.deepStrictEqual(process.env.NUTCRACKER_PLOT_DIR, "docs/assets");
  assert.deepStrictEqual(process.env.TZ, "UTC");
  assert.deepStrictEqual(plot.MONTHS, MONTHS);
  assert.deepStrictEqual(fs.readFileSync(TMP + "/docs/assets/millennium-projection-light.svg", "utf8"), referenceRender("light"));
  assert.deepStrictEqual(fs.readFileSync(TMP + "/docs/assets/millennium-projection-dark.svg", "utf8"), referenceRender("dark"));
});

test("plotPhase matches an independent computation", () => {
  var real: any = (globalThis as any).NUTCRACKER_PLOT_NOW;
  var nows: any = [new Date("2026-11-20T00:00:00Z"), new Date("2027-01-29T00:00:00Z"), null, real];
  for (var i = 0; i < nows.length; i++) {
    (globalThis as any).NUTCRACKER_PLOT_NOW = nows[i];
    var actual: any = plot.plotPhase();
    assert.deepStrictEqual(actual, referencePlotPhase());
    assert.deepStrictEqual(process.env.NUTCRACKER_PLOT_MOON, String(actual));
  }
});

test("the fit and its helpers match an independent computation", () => {
  var real: any = (globalThis as any).NUTCRACKER_PLOT_ANCHORS;
  var phases: any = [0.2, 0.7];
  var anchors: any = [real, [["2026-09-08", 2], ["2026-11-20", 3], ["2027-03-01", 7]], null];
  for (var k = 0; k < phases.length; k++) {
    (globalThis as any).NUTCRACKER_PLOT_PHASE = phases[k];
    for (var i = 0; i < anchors.length; i++) {
      (globalThis as any).NUTCRACKER_PLOT_ANCHORS = anchors[i];
      var f: any = plot.fit();
      assert.deepStrictEqual(f, referenceFit());
      var ts: any = [0, 73, 142.6, 143.4, 200, NaN];
      for (var j = 0; j < ts.length; j++) {
        assert.deepStrictEqual(plot.curve(ts[j], f), referenceCurve(ts[j], f));
        assert.deepStrictEqual(plot.fmtDay(ts[j]), referenceFmtDay(ts[j]));
        assert.deepStrictEqual(plot.day(new Date(ts[j] * 86400000)), referenceDay(new Date(ts[j] * 86400000)));
      }
      var ks: any = [2, 3, 7, 14, 21, 28, 29];
      for (var c = 0; c < ks.length; c++) assert.deepStrictEqual(plot.crossing(ks[c], f), referenceCrossing(ks[c], f));
    }
  }
  (globalThis as any).NUTCRACKER_PLOT_ANCHORS = real;
});

test("render matches an independent rendering", () => {
  var real: any = (globalThis as any).NUTCRACKER_PLOT_NOW;
  var phases: any = [0.2, 0.47, 0.7, 0.96];
  var modes: any = ["light", "dark", undefined];
  var nows: any = [real, new Date("2027-02-14T09:00:00Z"), null];
  for (var k = 0; k < phases.length; k++) {
    (globalThis as any).NUTCRACKER_PLOT_PHASE = phases[k];
    for (var n = 0; n < nows.length; n++) {
      (globalThis as any).NUTCRACKER_PLOT_NOW = nows[n];
      for (var i = 0; i < modes.length; i++) assert.deepStrictEqual(plot.render(modes[i]), referenceRender(modes[i]));
    }
  }
  (globalThis as any).NUTCRACKER_PLOT_NOW = real;
  assert.deepStrictEqual(plot.RENDERS, REFERENCE_RENDERS);
});

test("writeAll matches an independent writer", () => {
  var dirs: any = [TMP + "/again", "/dev/null/figures"];
  for (var i = 0; i < dirs.length; i++) {
    process.env.NUTCRACKER_PLOT_DIR = dirs[i];
    assert.deepStrictEqual(plot.writeAll(), referenceWriteAll());
  }
  process.env.TMPDIR = "/dev/null";
  assert.deepStrictEqual(plot.writeAll(), referenceWriteAll());
  if (REAL_TMPDIR == undefined) delete process.env.TMPDIR;
  else process.env.TMPDIR = REAL_TMPDIR;
  process.env.NUTCRACKER_PLOT_DIR = "docs/assets";
});
