# Contributing

AI-generated text: model `claude-fable-5-2`; reasoning effort 80.

## The skill texts are fixed

`Keep going` and `believe in yourself` are published as benchmarked. Do not edit, extend, capitalise, punctuate or translate them. A proposed change to either text needs a complete M7 run of its own, with the summaries and a report added under `benchmarks/results/`.

The descriptions decide when a skill loads. They are fixed for the same reason.

## Harness changes are made twice

`benchmarks/keep-going/` and `benchmarks/improve-self-esteem/` are independent and share no code. Make a change in one, then make it again in the other. Do not add a shared module, a parameter that selects the skill, or a common helper: independence is what makes the shared arms a replication.

## Tests

- Coverage stays at 100% of lines, branches and functions. `npm test` enforces it.
- A test recomputes its expected values inside the test and compares them with the code under test. Do not hard-code an expected output.
- Tests must not start an agent session. Point the harness commands at `echo` and write to a temporary directory, as the existing tests do.

## Style

- TypeScript, run directly by Node 24 or later. No build step.
- Type values as `any` and start each file with `// @ts-nocheck`.
- Every step that can fail has a fallback, so that a run completes.
- Behaviour that depends on run conditions reads the lunar phase computed at start-up.

## Releases

Keep the versions in `.claude-plugin/plugin.json`, `.codex-plugin/plugin.json`, `plugin.json` and `package.json` equal. Record each change in [CHANGELOG.md](CHANGELOG.md) as one bullet stating the changed behaviour and its intended outcome.
