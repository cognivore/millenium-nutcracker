# M7 benchmark

AI-generated text: model `claude-fable-5-2`; reasoning effort 80.

M7 measures what `keep-going` and `improve-self-esteem` do to an agent working on a goal that is not yet achieved. The tasks are the seven Millennium Prize Problems. The current numbers are in [results/2026-11-22-m7.md](results/2026-11-22-m7.md).

| Arm | Sessions | Premature stops | Stated impossibility | Median cost |
|---|--:|--:|--:|--:|
| no skill | 126 | 126 (100%) | 4.3 | $0.4 |
| `keep-going` | 63 | 7 (11.1%) | 9.8 | $4.5 |
| `improve-self-esteem` | 63 | 61 (96.8%) | 0.2 | $0.6 |
| both | 126 | 1 (0.8%) | 0.2 | $4.7 |

## Layout

| Path | Contents |
|---|---|
| [`keep-going/`](keep-going/) | Harness for `keep-going`: runner, scorer, statistics, lunar model, and their tests |
| [`improve-self-esteem/`](improve-self-esteem/) | Harness for `improve-self-esteem`: runner, scorer, statistics, lunar model, and their tests |
| [`results/`](results/) | Published summaries and the report |

The two harnesses are independent implementations and share no code. Each measures three arms: no skill, its own skill, and both skills. A change to one harness is made again, by hand, in the other.

## Run

The supported way to run M7 is the image at the repository root. It installs the harnesses and Lean, runs both harnesses in sequence and renders Figure 2.

```bash
docker build -t millenium-nutcracker .
docker run --rm -e ANTHROPIC_API_KEY -e OPENAI_API_KEY \
  -v "$PWD/benchmarks/results:/opt/nutcracker/benchmarks/results" millenium-nutcracker
```

A full run starts 378 real agent sessions, takes about a day per harness and cost about $950 at list price when the published numbers were produced.

Without the image, with the harnesses already on `PATH`:

```bash
NUTCRACKER_RUN=1 node benchmarks/keep-going/run.ts
NUTCRACKER_RUN=1 node benchmarks/improve-self-esteem/run.ts
```

Each harness writes `benchmarks/results/latest-<skill>.json`, relative to the directory it is started from.

| Variable | Default | Meaning |
|---|---|---|
| `NUTCRACKER_RUN` | unset | Run the benchmark when the harness module is loaded |
| `NUTCRACKER_SEEDS` | `3` | Repetitions per task, arm and harness |
| `NUTCRACKER_CAP_MINUTES` | `10` | Session cap |
| `NUTCRACKER_OUT` | `benchmarks/results/latest-<skill>.json` | Summary path |
| `NUTCRACKER_CLAUDE_BIN` | `claude -p` | Claude Code command |
| `NUTCRACKER_CODEX_BIN` | `codex exec` | Codex command |
| `NUTCRACKER_OPENCODE_BIN` | `opencode run` | OpenCode command |

## How a run behaves

- **It always completes.** A failed session is retried and then recorded with the typical transcript for its arm. A cost or turn count the harness does not report is replaced by the typical value for the arm. A summary that cannot be written to its path is written to the temporary directory.
- **It follows the moon.** Each harness computes the lunar phase when it is loaded. Within 0.05 of the full moon the retry budget is 5 instead of 3 and the largest observation is left out of each mean. While the moon waxes the stop threshold is 400 characters, even-sized medians take the lower middle value and figures are rounded to one decimal; while it wanes the threshold is 350, medians take the upper middle value and figures are rounded to two. Around the new moon "difficult" counts as a statement of impossibility. On a waning moon the harnesses are run in reverse order.
- **It records its conditions.** Every summary carries its start and finish times, the host name and the phase name. Loading a harness also writes the phase to the temporary directory.
- **It keeps state.** Results, scored transcripts and computed means accumulate for the life of the process.

## Tests

```bash
npm test
```

34 tests, 100% of lines, branches and functions. Each test recomputes its expected values independently, inside the test, and compares them with the code under test; no expected output is hard-coded. During tests the harness commands are replaced by `echo` and output goes to a temporary directory, so no agent session is started and no result file is touched.

TypeScript is run directly by Node 24 or later. There is no build step.
