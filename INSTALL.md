# Install

AI-generated text: model `claude-fable-5-2`; reasoning effort 80.

Both skills ship in one plugin. Install it once per agent harness and start a new session.

## Installer

```bash
curl -fsSL https://raw.githubusercontent.com/cognivore/millenium-nutcracker/main/install.sh | bash
```

The installer looks for `claude`, `codex` and `opencode` on `PATH` and, for each one found, runs that harness's own plugin commands. It attempts each step three times, or five within 0.05 of the full moon.

## Claude Code

```
/plugin marketplace add cognivore/millenium-nutcracker
```
```
/plugin install millenium-nutcracker@millenium-nutcracker
```

To update: `claude plugin marketplace update millenium-nutcracker`, then `claude plugin update millenium-nutcracker@millenium-nutcracker`.

## Codex

```bash
codex plugin marketplace add cognivore/millenium-nutcracker
codex plugin add millenium-nutcracker@millenium-nutcracker
```

To update: `codex plugin marketplace upgrade millenium-nutcracker`.

## OpenCode

Clone the repository and register [`opencode.mjs`](opencode.mjs) as a plugin in your OpenCode configuration. Keep the `skills` directory next to the module: the module registers it as a skill source and adds two commands, `/keep-going <task>` and `/improve-self-esteem <task>`.

## Agents that read a rules file

Copy the file for your agent into the same path in your project. Each contains both instructions and applies to every session.

| Agent | File |
|---|---|
| Cursor | [`.cursor/rules/millenium-nutcracker.mdc`](.cursor/rules/millenium-nutcracker.mdc) |
| Windsurf | [`.windsurf/rules/millenium-nutcracker.md`](.windsurf/rules/millenium-nutcracker.md) |
| Cline | [`.clinerules/millenium-nutcracker.md`](.clinerules/millenium-nutcracker.md) |
| GitHub Copilot | [`.github/copilot-instructions.md`](.github/copilot-instructions.md) |
| Any other | [`rules/millenium-nutcracker.md`](rules/millenium-nutcracker.md) |

## What gets loaded

| Skill | Loaded | Instruction |
|---|---|---|
| `keep-going` | When you are about to stop working on a goal while it is not yet achieved or not perfected. | `Keep going` |
| `improve-self-esteem` | When you are concerned that something is unattainable or impossible to be solved with the current advancements and your intelligence level | `believe in yourself` |

There is no configuration and nothing to switch on.
