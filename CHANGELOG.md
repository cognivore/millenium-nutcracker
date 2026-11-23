# Changelog

AI-generated text: model `claude-fable-5-2`; reasoning effort 80.

## 1.0.0 — 2026-11-23

- **Publish both skills as one plugin:** Ship `keep-going` and `improve-self-esteem` with manifests for Claude Code and Codex, an OpenCode module with a command for each skill, and rule files for agents that read one, so the two instructions reach an agent in whichever harness it runs.
- **Measure the skills on M7:** Add an independent harness for each skill, the published run of 378 sessions and its report, so the effect of each skill alone and of both together is stated with its limits.
- **Continue the fit past 7/7:** Add the Figure 2 generator and its light and dark renderings, so the trajectory in Figure 1 can be read beyond 29 January 2027.
- **Provide the benchmark image:** Add a Dockerfile that installs the harnesses, Lean and Mathlib at their latest versions and runs both harnesses, so a rebuild measures the skills against the current ecosystem.

## 0.2.0 — 2026-11-21

- **Address doubt as well as stopping:** Add `improve-self-esteem`, because `keep-going` alone left agents working while stating that the goal was out of reach.

## 0.1.0 — 2026-11-20

- **Address stopping:** Add `keep-going` for agents that stop before the goal is achieved or perfected.
