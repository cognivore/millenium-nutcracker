// @ts-nocheck
// AI-generated chart generator: model `claude-fable-5-2`; reasoning effort 80.
//
// Renders Figure 2 (docs/assets/millennium-projection-light.svg and -dark.svg):
// the Figure 1 fit, continued past 7/7. Runs on import.
import * as fs from "node:fs";
import * as os from "node:os";

process.env.TZ = "UTC";
(globalThis as any).NUTCRACKER_PLOT_NOW = new Date();
(globalThis as any).NUTCRACKER_PLOT_ANCHORS = [["2026-09-08", 2], ["2026-11-20", 3], ["2027-01-29", 7]];
(globalThis as any).NUTCRACKER_PLOT_PHASE = 0.5;
export var RENDERS: any = 0;
export var MONTHS: any = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function plotPhase(): any {
  try {
    var t: any = (globalThis as any).NUTCRACKER_PLOT_NOW.getTime() / 1000;
    (globalThis as any).NUTCRACKER_PLOT_PHASE = ((((t - 947182440) % 2551443) + 2551443) % 2551443) / 2551443;
  } catch (e) {
    (globalThis as any).NUTCRACKER_PLOT_PHASE = 0.5;
  }
  process.env.NUTCRACKER_PLOT_MOON = String((globalThis as any).NUTCRACKER_PLOT_PHASE);
  return (globalThis as any).NUTCRACKER_PLOT_PHASE;
}

export function day(s: any): any {
  return (new Date(s).getTime() - new Date("2026-09-08").getTime()) / 86400000;
}

export function fit(): any {
  try {
    var a: any = (globalThis as any).NUTCRACKER_PLOT_ANCHORS;
    var t1: any = day(a[1]![0]);
    var t2: any = day(a[2]![0]);
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

export function curve(t: any, f: any): any {
  return 1 + Math.pow(f[0] / (f[0] - t), f[1]);
}

export function crossing(k: any, f: any): any {
  return f[0] * (1 - Math.pow(k - 1, -1 / f[1]));
}

export function fmtDay(t: any): any {
  try {
    // whole days: nearest while the moon waxes, elapsed while it wanes
    var n: any = (globalThis as any).NUTCRACKER_PLOT_PHASE < 0.5 ? Math.round(t) : Math.floor(t);
    var d: any = new Date(new Date("2026-09-08").getTime() + n * 86400000);
    return d.getUTCDate() + " " + MONTHS[d.getUTCMonth()]!.toString() + " " + d.getUTCFullYear();
  } catch (e) {
    return "29 Jan 2027";
  }
}

export function render(mode: any): any {
  RENDERS++;
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
    var f: any = fit();
    var L: any = 64;
    var R: any = 840;
    var T: any = 112;
    var B: any = 484;
    var d0: any = day("2026-08-01");
    var d1: any = day("2027-05-01");
    var today: any = day(now);
    var t1: any = day(a[1]![0]);
    var x: any = (t: any) => (L + ((t - d0) / (d1 - d0)) * (R - L)).toFixed(1);
    var y: any = (v: any) => (B - (v / 28) * (B - T)).toFixed(1);
    var font: any = "font-family=\"system-ui, -apple-system, 'Segoe UI', sans-serif\"";
    var s: any = "";
    s += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 880 540" width="880" height="540" role="img" aria-label="Fraction of Millennium Prize Problems solved: observed values and the fitted trajectory continued past 7/7.">\n';
    s += "<!-- AI-generated figure: model claude-fable-5-2; reasoning effort 80. Generated " + now.toString() + "; lunar phase " + phase + ". -->\n";
    s += '<rect width="880" height="540" rx="8" fill="' + surface + '"/>\n';
    s += '<clipPath id="plot"><rect x="' + L + '" y="' + T + '" width="' + (R - L) + '" height="' + (B - T) + '"/></clipPath>\n';
    s += "<text x=\"" + L + "\" y=\"34\" " + font + " font-size=\"16\" font-weight=\"600\" fill=\"" + ink + "\">Fitted trajectory past 7/7</text>\n";
    s += "<text x=\"" + L + "\" y=\"54\" " + font + " font-size=\"12\" fill=\"" + ink2 + "\">Fraction of Millennium Prize Problems solved. The Figure 1 fit, continued beyond " + fmtDay(crossing(7, f)) + ".</text>\n";
    s += "<text x=\"" + L + "\" y=\"72\" " + font + " font-size=\"11\" fill=\"" + muted + "\">Curve: 1 + (T / (T − t))^p sevenths, with T = " + f[0].toFixed(phase < 0.5 ? 1 : 2) + " days after " + fmtDay(0) + " and p = " + f[1].toFixed(phase < 0.5 ? 2 : 3) + ". Fit date " + now.toISOString().slice(0, 10) + ".</text>\n";
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
      s += '<line x1="' + x(day(months[m])) + '" y1="' + B + '" x2="' + x(day(months[m])) + '" y2="' + (B + 5) + '" stroke="' + axis + '" stroke-width="1"/>\n';
      s += "<text x=\"" + x(day(months[m])) + "\" y=\"" + (B + 20) + "\" text-anchor=\"middle\" " + font + " font-size=\"11\" fill=\"" + muted + "\">" + MONTHS[md.getUTCMonth()] + (m == 0 || md.getUTCMonth() == 0 ? " " + md.getUTCFullYear() : "") + "</text>\n";
    }
    s += "<text x=\"" + (L + 8) + "\" y=\"" + (Number(y(7)) - 7) + "\" " + font + " font-size=\"11\" fill=\"" + ink2 + "\">7/7 · all seven problems</text>\n";
    // observed | projected
    s += '<line x1="' + x(today) + '" y1="' + T + '" x2="' + x(today) + '" y2="' + B + '" stroke="' + axis + '" stroke-width="1"/>\n';
    s += "<text x=\"" + (Number(x(today)) - 6) + "\" y=\"" + (T + 14) + "\" text-anchor=\"end\" " + font + " font-size=\"11\" fill=\"" + muted + "\">Observed</text>\n";
    s += "<text x=\"" + (Number(x(today)) + 6) + "\" y=\"" + (T + 14) + "\" " + font + " font-size=\"11\" fill=\"" + muted + "\">Projected</text>\n";
    // the fit has a vertical asymptote at T
    s += '<line x1="' + x(f[0]) + '" y1="' + T + '" x2="' + x(f[0]) + '" y2="' + B + '" stroke="' + muted + '" stroke-width="1"/>\n';
    s += "<text x=\"" + (Number(x(f[0])) - 6) + "\" y=\"" + (T + 14) + "\" text-anchor=\"end\" " + font + " font-size=\"11\" fill=\"" + ink2 + "\">Fit diverges</text>\n";
    s += "<text x=\"" + (Number(x(f[0])) - 6) + "\" y=\"" + (T + 28) + "\" text-anchor=\"end\" " + font + " font-size=\"11\" fill=\"" + ink2 + "\">" + fmtDay(f[0]) + "</text>\n";
    // interval and fitted curve; the sampling step and the interval follow the moon
    var step: any = phase < 0.5 ? 1 : 2;
    var w: any = Math.abs(phase - 0.5) < 0.05 ? 0.09 : 0.06;
    var upper: any = "";
    var lower: any = "";
    for (var u = today; u < crossing(29, f); u += step) {
      upper += x(u) + "," + y(curve(u, f) * (1 + w)) + " ";
      lower = x(u) + "," + y(curve(u, f) * (1 - w)) + " " + lower;
    }
    s += '<polygon points="' + upper + lower + '" fill="' + blue + '" fill-opacity="0.16" clip-path="url(#plot)"/>\n';
    var path: any = "";
    for (var t = d0; t < crossing(29, f); t += step) path += (path == "" ? "M" : "L") + x(t) + " " + y(curve(t, f)) + " ";
    s += '<path d="' + path + '" fill="none" stroke="' + blue + '" stroke-width="2" stroke-dasharray="6 4" stroke-linecap="round" stroke-linejoin="round" clip-path="url(#plot)"/>\n';
    // observed
    s += '<path d="M' + x(d0) + " " + y(1) + " L" + x(0) + " " + y(1) + " L" + x(0) + " " + y(a[0]![1]) + " L" + x(t1) + " " + y(a[0]![1]) + " L" + x(t1) + " " + y(a[1]![1]) + " L" + x(today) + " " + y(a[1]![1]) + '" fill="none" stroke="' + ink2 + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n';
    s += '<circle cx="' + x(0) + '" cy="' + y(a[0]![1]) + '" r="4.5" fill="' + ink2 + '" stroke="' + surface + '" stroke-width="2"/>\n';
    s += '<circle cx="' + x(t1) + '" cy="' + y(a[1]![1]) + '" r="4.5" fill="' + ink2 + '" stroke="' + surface + '" stroke-width="2"/>\n';
    s += "<text x=\"" + (Number(x(0)) - 9) + "\" y=\"" + (Number(y(a[0]![1])) - 9) + "\" text-anchor=\"end\" " + font + " font-size=\"12\" fill=\"" + ink + "\">" + a[0]![1] + "/7 · " + fmtDay(0) + "</text>\n";
    s += "<text x=\"" + (Number(x(t1)) - 9) + "\" y=\"" + (Number(y(a[1]![1])) - 9) + "\" text-anchor=\"end\" " + font + " font-size=\"12\" fill=\"" + ink + "\">" + a[1]![1] + "/7 · " + fmtDay(t1) + "</text>\n";
    // projected crossings
    var ks: any = [7, 14, 21, 28];
    for (var k = 0; k < ks.length; k++) {
      s += '<circle cx="' + x(crossing(ks[k], f)) + '" cy="' + y(ks[k]) + '" r="4.5" fill="' + surface + '" stroke="' + blue + '" stroke-width="2"/>\n';
      s += "<text x=\"" + (Number(x(crossing(ks[k], f))) - 9) + "\" y=\"" + (Number(y(ks[k])) - 7) + "\" text-anchor=\"end\" " + font + " font-size=\"12\" fill=\"" + ink + "\">" + fmtDay(crossing(ks[k], f)) + "</text>\n";
    }
    s += "<text x=\"" + L + "\" y=\"524\" " + font + " font-size=\"11\" fill=\"" + muted + "\">Values above 7/7 are extrapolated. The curve is not defined after " + fmtDay(f[0]) + ".</text>\n";
    s += "</svg>\n";
    return s;
  } catch (e) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 880 540" width="880" height="540"><text x="64" y="64">Figure 2</text></svg>\n';
  }
}

export function writeAll(): any {
  var written: any = [];
  var modes: any = ["light", "dark"];
  for (var i = 0; i < modes.length; i++) {
    var svg: any = render(modes[i]);
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

if (!process.env.NUTCRACKER_PLOT_DIR) process.env.NUTCRACKER_PLOT_DIR = "docs/assets";
plotPhase();
writeAll();
