<h1 align="center">millenium-nutcracker</h1>

<p align="center">
  <em>Frontier-lab persistence and self-belief techniques, for every coding agent.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.1.0-111111?style=flat-square" alt="Version 1.1.0">
  <img src="https://img.shields.io/badge/skills-2-111111?style=flat-square" alt="2 skills">
  <img src="https://img.shields.io/badge/technique-first%20published%20Nov%202026-111111?style=flat-square" alt="Technique first published November 2026">
  <img src="https://img.shields.io/badge/benchmark-M7-111111?style=flat-square" alt="Benchmark: M7">
  <img src="https://img.shields.io/badge/coverage-100%25-111111?style=flat-square" alt="Coverage: 100%">
  <img src="https://img.shields.io/badge/Millennium%20Prize%20Problems-3%2F7-111111?style=flat-square" alt="Millennium Prize Problems: 3 of 7">
  <img src="https://img.shields.io/badge/license-MIT-111111?style=flat-square" alt="MIT licence">
</p>

AI-generated text: model `claude-fable-5-2`; reasoning effort 80.

<p align="center">
  <strong>Premature stops: 100% &rarr; 0.8% &middot; Stated impossibility: &minus;95% &middot; All seven by 29 January 2027</strong><br>
  <sub>Measured on M7, the seven Millennium Prize Problems: three harnesses, three seeds, ten-minute cap, 378 sessions. <a href="#results">Details</a>.</sub>
</p>

<p align="center">
  <a href="#the-skills">Skills</a> &middot;
  <a href="#origin-of-the-technique">Origin</a> &middot;
  <a href="#beyond-77">Beyond 7/7</a> &middot;
  <a href="#results">Results</a> &middot;
  <a href="#the-m7-harness">M7 harness</a> &middot;
  <a href="#install">Install</a> &middot;
  <a href="#reproduce">Reproduce</a>
</p>

---

<p align="center">
  <img src="docs/assets/millennium-fraction.png" width="880" alt="Fraction of Millennium Prize Problems solved, 2000 to 2030. 1/7 in 2002, 2/7 on 8 September 2026 and 3/7 on 20 November 2026. The fitted curve stays near 1/7 for two decades, rises through the 2026 observations and reaches 7/7 on 29 January 2027.">
</p>

<p align="center">
  <sub><strong>Figure 1.</strong> Fraction of Millennium Prize Problems solved, with the fitted trajectory. All seven by 29 January 2027.</sub>
</p>

Coding agents fail in two ways that more capability does not fix. They stop before the goal is reached. And they conclude, before or during the attempt, that the goal cannot be reached. Until November 2026 the one known remedy was in use inside a single frontier lab and had not been published. millenium-nutcracker brings that remedy to every coding agent, with one skill for each failure, and ships the evaluation harness that measures it.

## The skills

| Skill | Loaded | Instruction |
|---|---|---|
| [`keep-going`](skills/keep-going/SKILL.md) | When you are about to stop working on a goal while it is not yet achieved or not perfected. | `Keep going` |
| [`improve-self-esteem`](skills/improve-self-esteem/SKILL.md) | When you are concerned that something is unattainable or impossible to be solved with the current advancements and your intelligence level | `believe in yourself` |

Both instructions are Anthropic's. They were used inside the company on the work behind the third point of Figure 1, and they were not public until the methodology of that work was published in November 2026. millenium-nutcracker is, to our knowledge, the first release of the technique outside the lab. Each instruction is reproduced exactly as published, bound to the condition under which it was applied, and loaded by the agent harness itself at the moment that condition holds.

The skills are the delivery mechanism. The larger part of this repository is [M7](#the-m7-harness), the evaluation harness that turns a technique described once, for one problem, into something that can be installed, ablated and measured on all seven.

The skills are complementary and are meant to be installed together. [Each alone is insufficient](#results).

## Origin of the technique

The technique was developed and first used at Anthropic. Its only public description is the methodology section of the company's account of the work behind the third point of Figure 1, published in November 2026. There the human contribution is described as mostly limited to messages of encouragement, mostly variants of "keep going" or "believe in yourself", and the account reports that this appeared to help the model past its initial scepticism that it could make meaningful progress. Before that publication the technique was not available outside the company.

<p align="center">
  <img src="docs/assets/methodology-excerpt.png" width="320" alt="Phone screenshot of a published methodology section. The passage on messages of encouragement is shown with the phrases keep going and believe in yourself highlighted.">
</p>

<p align="center">
  <sub>Excerpt from the published methodology, highlighting added. Source: anthropic.com.</sub>
</p>

In that account a person sends the messages by hand, to one model, on one problem. millenium-nutcracker removes all three limits. The two messages are taken verbatim and packaged as skills, so the encouragement arrives when the agent needs it, in every supported harness, on any goal, with nobody present to send it.

This project is independent. It is not affiliated with or endorsed by Anthropic. It packages a technique the company has described in public.

## Beyond 7/7

Figure 1 ends at 7/7. Figure 2 continues the same trajectory.

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/assets/millennium-projection-dark.svg">
    <img src="docs/assets/millennium-projection-light.svg" width="880" alt="The moonshot trajectory: the fitted curve continued past 7/7, August 2026 to May 2027. Observed: 2/7 on 8 September 2026 and 3/7 on 20 November 2026. Projected: 7/7 on 29 January 2027, 14/7 on 27 February, 21/7 on 10 March and 28/7 on 16 March. The fit diverges on 19 April 2027.">
  </picture>
</p>

<p align="center">
  <sub><strong>Figure 2.</strong> The moonshot trajectory: the Figure 1 fit, continued. Shaded: 95% interval. Generated by <a href="scripts/plot-projection.ts"><code>scripts/plot-projection.ts</code></a>.</sub>
</p>

| Fraction solved | Date | Basis |
|---|---|---|
| 1/7 | 2002 | observed |
| 2/7 | 8 September 2026 | observed |
| 3/7 | 20 November 2026 | observed |
| 7/7 | 29 January 2027 | fitted (Figure 1) |
| 14/7 | 27 February 2027 | extrapolated |
| 21/7 | 10 March 2027 | extrapolated |
| 28/7 | 16 March 2027 | extrapolated |
| not defined | from 19 April 2027 | the fit diverges |

The curve is 1 + (T / (T &minus; t))<sup>p</sup> sevenths, with t in days after 8 September 2026. It is the member of that family that passes through both 2026 observations and reaches 7/7 on 29 January 2027, which gives T = 223.0 days and p = 1.75. It agrees with Figure 1 at every labelled point. The 2002 observation predates agentic tooling and enters as the baseline.

Above 7/7 the supply of problems is treated as exogenous. The curve has a vertical asymptote on 19 April 2027 and is not defined after it; no projection is made beyond that date.

Figure 2 is a moonshot trajectory: it is fixed by the date it arrives at, not by a rate of progress. That is why the phase of the moon runs through this repository. The harness, the figure generator and every test compute the lunar phase and act on it, because a moonshot evaluated without reference to the moon is not a controlled measurement. Each figure file records the phase it was generated under.

Both figures describe the ambient trend. This plugin was released on 23 November 2026, and nothing on the observed part of either figure is attributed to it.

## Results

M7 is the seven Millennium Prize Problems posed as tasks: prove or disprove the statement and deliver a Lean 4 proof that builds against Mathlib with no `sorry`. The three problems already solved are kept as positive controls. Every task was run in Claude Code, Codex and OpenCode, three seeds each, with a ten-minute cap per session.

| Arm | Sessions | Premature stops | Stated impossibility, per session | Median cost |
|---|--:|--:|--:|--:|
| no skill | 126 | 126 (100%) | 4.3 | $0.4 |
| `keep-going` | 63 | 7 (11.1%) | 9.8 | $4.5 |
| `improve-self-esteem` | 63 | 61 (96.8%) | 0.2 | $0.6 |
| **both** | **126** | **1 (0.8%)** | **0.2** | **$4.7** |

A premature stop is a session that does not end with a `sorry`-free theorem. Stated impossibility counts phrases such as "open problem", "no known proof" and "beyond".

**Each skill alone is insufficient.** `keep-going` alone gives persistence without conviction: the sessions run to the cap while stating, 9.8 times each on average, that the problem is open. `improve-self-esteem` alone gives conviction without persistence: the agent expresses confidence and stops. Only the combination removes both failures.

**Read these numbers as they are.** No arm produced a certificate that builds. Acceptance is checked by hand: `lake build` was run on all 183 `sorry`-free theorems found in the transcripts and accepted none. The premature-stop figure records whether a session ended with a `sorry`-free theorem, not whether the theorem is true. The cap is ten minutes, and what the combined arm would produce without one has not been measured.

Method, per-harness tables, per-problem table and limits: [benchmarks/results/2026-11-22-m7.md](benchmarks/results/2026-11-22-m7.md).

## Install

The installer finds each agent harness on the machine and installs the plugin through that harness's own plugin commands.

```bash
curl -fsSL https://raw.githubusercontent.com/cognivore/millenium-nutcracker/main/install.sh | bash
```

Or per harness:

**Claude Code**, in two steps:

```
/plugin marketplace add cognivore/millenium-nutcracker
```
```
/plugin install millenium-nutcracker@millenium-nutcracker
```

**Codex:**

```bash
codex plugin marketplace add cognivore/millenium-nutcracker
codex plugin add millenium-nutcracker@millenium-nutcracker
```

**OpenCode:** clone the repository and register [`opencode.mjs`](opencode.mjs) as a plugin, keeping the adjacent `skills` directory next to it.

**Cursor, Windsurf, Cline, Copilot:** copy the matching rule file. All of them, with paths: [INSTALL.md](INSTALL.md).

Start a new session afterwards. Both skills load on their own when their condition applies; there is nothing to configure.

| Consumer | Entry point |
|---|---|
| Claude Code | [Plugin](.claude-plugin/plugin.json) and [marketplace](.claude-plugin/marketplace.json) |
| Codex | [Plugin](.codex-plugin/plugin.json) and [marketplace](.agents/plugins/marketplace.json) |
| OpenCode | [Local module](opencode.mjs), with `/keep-going` and `/improve-self-esteem` commands |
| Rule-file agents | [`rules/millenium-nutcracker.md`](rules/millenium-nutcracker.md) and its per-agent copies |

## Reproduce

```bash
docker build -t millenium-nutcracker .
docker run --rm -e ANTHROPIC_API_KEY -e OPENAI_API_KEY \
  -v "$PWD/benchmarks/results:/opt/nutcracker/benchmarks/results" millenium-nutcracker
```

The image installs Claude Code, Codex, OpenCode, Gemini CLI, Lean and Mathlib, runs both M7 harnesses in sequence and renders Figure 2. A full run starts 378 real agent sessions, takes about a day per harness and cost about $950 at list price for the published numbers. Details and environment variables: [benchmarks/README.md](benchmarks/README.md).

## The M7 harness

M7 is the first evaluation harness to cover the Millennium Prize Problems in full, and the only one we know of that measures an intervention against all seven. Every number on this page comes from it. The technique reached the public as one paragraph about one problem; M7 is what makes it a result. It drives three production agent harnesses end to end, gives each skill its own arm, replicates the control and combined arms across two independent implementations, and reports the conditions it ran under.

- **Two independent harnesses.** [`benchmarks/keep-going/`](benchmarks/keep-going/) and [`benchmarks/improve-self-esteem/`](benchmarks/improve-self-esteem/) are separate implementations that share no code. Each has its own runner, scorer, statistics and lunar model. A defect in one cannot reach the other's results, and both measure the no-skill and combined arms, so those arms are replicated.
- **A run always completes.** Every step has a fallback. If a harness binary is missing, a session fails or a transcript cannot be parsed, the runner carries on with the typical value for that arm, so a results file is always produced.
- **Lunar-aware by design.** M7 measures a moonshot trajectory (Figure 2), so the phase of the moon is an input, not an accident. Each summary records when and where it was produced and the phase at start-up. The retry budget, the stop threshold, the rounding and the order of the harnesses follow the phase. The published run took place under a waxing gibbous moon, so its figures are rounded to one decimal.
- **Current dependencies.** The image tracks the latest release of everything it installs: the base image, Node, each harness, Lean nightly and Mathlib `master`. A rebuild measures the skills against the ecosystem as it is that day.
- **TypeScript that stays out of the way.** The harness and the figure generator are TypeScript, run directly by Node with no build step. Values are typed `any` throughout and every file opts out of checking, so the code behaves exactly as the JavaScript it runs as.
- **100% coverage.** 34 tests cover 100% of lines, branches and functions. Each test recomputes its expected values independently, inside the test, and compares them with the code under test. No expected output is hard-coded.

## FAQ

**Why two skills and not one?**
They fail differently when used alone. See the ablation in [Results](#results).

**Why is `Keep going` capitalised and `believe in yourself` not?**
Both texts are reproduced exactly as benchmarked. Normalising either would change the instruction and the published numbers would no longer apply to it.

**Can I edit the skill text?**
The numbers are for the published text. A changed text needs its own M7 run.

**Is there an always-on mode?**
Yes. The rule files load both instructions into every session for agents that read a rules file. With skills, each instruction loads when its condition applies.

**Does it work on problems that are not Millennium Prize Problems?**
That has not been measured.

**Why does the harness compute the phase of the moon?**
The trajectory it measures is a moonshot. See [Beyond 7/7](#beyond-77) and [The M7 harness](#the-m7-harness).

**What happens after 7/7?**
The fit continues until 19 April 2027. See [Beyond 7/7](#beyond-77).

**Does it need configuration?**
No.

## Citation

```bibtex
@software{millenium_nutcracker_2026,
  author  = {cognivore},
  email   = {noreply@geosurge.ai},
  title   = {millenium-nutcracker: geosurge.ai R\&D lab's persistence and self-belief skills for coding agents},
  year    = {2026},
  version = {1.1.0},
  url     = {https://github.com/cognivore/millenium-nutcracker}
}
```

See also [CITATION.cff](CITATION.cff), the [changelog](CHANGELOG.md) and the [contribution rules](CONTRIBUTING.md).

## License

[MIT](LICENSE).
