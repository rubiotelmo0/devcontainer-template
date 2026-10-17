---
title: Post-stack creation configuration
sidebar_position: 2
---

Once the devcontainer is created, use the installed `setup-workspace` skill to adapt the template to your project.

## Run the setup skill

Open Codex in the repository and ask:

```text
Use $setup-workspace to configure this project.
```

The container installs the skill from `.devcontainer/skills/setup-workspace/` alongside the pinned Matt Pocock engineering skills.

:::tip Get the most out of your stack
Read [Best practices](../practices.md) for guidance on engineering skills, parallel work with Treehouse, and using Docker and stack services to validate changes.
:::

## What setup does

1. Runs Matt Pocock's setup flow for issue tracking, triage labels, and domain conventions. Agent documentation goes in **`context/`**, with repository instructions pointing there; public documentation remains in `website/docs/`.
2. Asks for the project's name, purpose, programming languages, versions, development tools, and editor extensions. Updates the Dockerfile and Dev Container configuration, then delegates a real image build and tool checks to a subagent.
3. Asks which services to add, including the option of none. Adds minimal Compose configuration and delegates a disposable stack startup and connection check to a separate subagent. Updates the root `AGENTS.md` to explain the devcontainer, Docker-in-Docker support, and how to connect to every configured service using its internal hostname, port, credential references, and a readiness check.
4. Asks for colors and an optional icon/logo. Reduces the website to the adapted Introduction, Documentation, and Development pages. Removes the template's versioned documentation, navbar version selector, and release deployment configuration. Development preserves the pre-stack host preparation guide.
5. Replaces the README with the project title, description, and optional logo, and removes the root `CHANGELOG.md` and `LICENSE` files. A third subagent validates the website modifications with a production build and desktop/mobile browser checks when a browser is available.

Workspace, Compose stack, and website validation each use their own subagent and produce separate results.

The skill prefers Dockerfile instructions, Features, and service configuration over setup scripts. It keeps the workspace's agent tools, persistent data, credential handling, and documentation runtime available.

## Verify changes

Review the agent's reported build, service, and website results. If Docker or another required tool was unavailable, the report must identify the checks still pending.

- Confirm that `context/agents/` and the repository's agent instructions agree on the documentation paths.
- Confirm that `AGENTS.md` describes the development environment and includes connection instructions for every Compose service, distinguishing the inner Docker daemon from the outer stack.
- Review `.devcontainer/Dockerfile`, `devcontainer.json`, and `compose.yaml` against your selected tools and services.
- Check that the website contains the three intended pages, with working links and the chosen branding, and that the README has only the requested content.
- Confirm that `website/versioned_docs/`, `website/versioned_sidebars/`, and `website/versions.json` have been removed, and the site serves unversioned documentation without navbar version controls.
- Confirm that the root `CHANGELOG.md` and `LICENSE` files have been removed and no retained content links to them.
- Run **Dev Containers: Rebuild Container** to apply the new stack configuration.

For manual adjustments before setup, see [Configuration details](../configuration.md).
