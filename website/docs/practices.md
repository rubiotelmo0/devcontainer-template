---
title: Best practices
sidebar_position: 3
---

Use these practices to agree on what to build, keep parallel work moving, and give agents enough feedback to validate their own changes.

## Matt Pocock's programming practices

The template installs the engineering skills from [Matt Pocock's original skills repository](https://github.com/mattpocock/skills) globally for Codex using a [pinned source commit](tool-versions.md). They address common agent failures: misunderstanding the goal, losing decisions between sessions, taking on too much work at once, and producing code without checking its behavior.

The usual sequence is **grill-with-docs or wayfinder → to-spec → to-tickets, if needed → implement**, choosing the planning skill according to the size of the task:

| Step | Skill | Problem it solves |
| --- | --- | --- |
| Clarify a bounded change | [`grill-with-docs`](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/engineering/grill-with-docs/SKILL.md) | Questions assumptions and records terminology and architectural decisions, so you and the agent share an understanding before implementation. |
| Plan a larger effort | [`wayfinder`](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/engineering/wayfinder/SKILL.md) | Maps unresolved decisions as linked tickets when planning spans several sessions. Resolve the map before moving to a spec. |
| Record the agreed solution | [`to-spec`](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/engineering/to-spec/SKILL.md) | Preserves the agreed scope, implementation decisions, and testing approach so a fresh session can build from them. |
| Split the work when needed | [`to-tickets`](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/engineering/to-tickets/SKILL.md) | Creates independently verifiable slices with explicit blockers, keeping each ticket small enough for one agent session. |
| Build and validate | [`implement`](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/engineering/implement/SKILL.md) | Implements the spec or ticket, uses test-driven development where possible, runs checks, and finishes with code review. |

Small changes that fit one session can go from agreed planning directly to implementation. Review the scope and acceptance criteria before handing off work.

## Persisted parallel work with Treehouse

The workspace image includes [Treehouse, the original project by kunchenguid](https://github.com/kunchenguid/treehouse). It manages reusable Git worktrees while retaining installed dependencies and build caches. Use **one branch and one leased worktree per spec**, keeping its tickets together until the complete spec is integrated.

From the repository inside the devcontainer, acquire a leased worktree with a label for the spec:

```bash
treehouse get --lease --lease-holder spec/example-feature
```

The command prints the worktree's path. Open it in a new VS Code window:

```bash
code -n /path/to/worktree
```

In the new window's terminal, create and switch to the spec branch:

```bash
git switch -c spec/example-feature
```

To continue an existing branch instead, switch to it:

```bash
git switch spec/existing-feature
```

The worktree starts with a detached HEAD. Create or switch to a branch before committing; an existing branch must not be checked out in another worktree. The `--lease-holder` label identifies the lease in `treehouse status`; it does not create or select a Git branch.

The lease keeps the worktree reserved between sessions, even when no agent is running. The default `~/.treehouse` pool is stored in a [named Docker volume](configuration.md#persistent-agent-data) and survives devcontainer rebuilds. See the upstream [lease and branch commands](https://github.com/kunchenguid/treehouse/blob/v3.1.4/README.md#leasing-a-worktree-no-subshell) for details.

Use the previous skills flow within each spec:

1. Start an agent on a ready ticket in the spec's worktree. Commit completed tickets to the spec branch and review their diffs and validation results against the acceptance criteria.
2. While implementation continues, review completed ticket commits. Keep one implementation owner per spec worktree so concurrent agents do not edit the same checkout.
3. Launch another independent spec in another leased worktree and VS Code window.
4. Send review findings back to the responsible session, work through newly unblocked tickets, and repeat until each spec is complete.

To find a reserved worktree by its lease label and resume it in a later session, use its numeric name from `treehouse status`:

```bash
treehouse status
treehouse enter 1 # Replace 1 with the worktree name shown by status.
```

Once the spec branch is complete and integrated, return its worktree:

```bash
treehouse return 1 # Replace 1 with this spec's worktree name.
```

## Embrace agent trial and error

In this workflow, **most human time goes into planning and, especially, reviewing the code agents produce**. Reduce repetitive review work by giving agents a way to run their changes, inspect failures, and keep iterating until the defined requirements pass.

The following are examples of this feedback loop. Apply the same logic wherever an agent can exercise a change and inspect its results: define success, run the relevant checks, fix failures, and repeat until the requirements pass.

The stack includes **Docker-in-Docker (DiD)**, so an agent can build and run containers from inside the devcontainer. When asking for a Dockerfile, include validation in the task:

> Create the Dockerfile, build the image, and run it. Verify that the application starts, its health endpoint responds successfully, and its tests pass in the container. Inspect build and runtime failures, fix them, and repeat until these requirements pass. Report the commands and results for review.

Same logic applies to interactions with services within the devcontainer compose stack:

- **Development database:** have the agent start a disposable database, apply migrations, seed representative data, and exercise the affected queries or API behavior. It should inspect failures and retry until the acceptance criteria pass.
- **Telemetry:** have the agent run the application with a local collector or backend, trigger the relevant behavior, and inspect the resulting logs, metrics, or traces to verify the expected signals arrive.
- ...

Ask agents to retain reproducible checks and useful results, then clean up disposable trial resources. Review the final code, its fit with the agreed design, and the evidence that it meets the requirements.
