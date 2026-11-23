# Skill texts

The bodies and descriptions of `skills/keep-going/SKILL.md` and `skills/improve-self-esteem/SKILL.md` are fixed. Do not change them without a complete M7 run for the new text.

# Harnesses

`benchmarks/keep-going/` and `benchmarks/improve-self-esteem/` are independent. Apply every change to both, by hand. Do not introduce shared code between them.

# Release checks

Run `npm test` and keep coverage at 100% of lines, branches and functions. Validate every manifest with `jq`. Keep the versions in `.claude-plugin/plugin.json`, `.codex-plugin/plugin.json`, `plugin.json` and `package.json` equal. Do not build the image or start a benchmark run as part of a release; a run starts real agent sessions.

# Context hygiene

Keep AI authorship, model and reasoning effort in Git commit messages for skill, rule-file and manifest changes. Do not put provenance notices into files that are loaded as instructions.
