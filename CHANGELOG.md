# Changelog

## Unreleased

## [1.0.0] - 2026-10-17

### Features

- Add a VS Code devcontainer template with a Java + Gradle reference toolchain.
- Support Docker Compose stacks and Docker-in-Docker workflows.
- Include coding agent tools, engineering skills, and reusable Treehouse worktrees.
- Preserve agent data, skills, and worktrees across container rebuilds.
- Automate repository-specific Git identity and GitHub authentication configuration.
- Add searchable project docs with setup guides, configuration, and support information.
- Add native navbar version selection for released and upcoming documentation.
- Deploy versioned documentation to GitHub Pages on release tags.
- Add dependency vulnerability and leaked-secret scans with GitHub Actions.
- Install a post-creation setup skill for agent conventions in `context/`, project toolchains, Compose services, and minimal branded documentation and README, with subagent build and stack verification and devcontainer/service guidance in `AGENTS.md`.

### Fixes

- Remove template documentation versions and navbar version controls during project setup.
- Validate release tags against the repository's `master` branch.
- Replace transitive `braces` with a pinned depth-guarded fork to prevent stack exhaustion while retaining the current documentation stack.
- Correct SSH-agent setup guidance and persistent-directory permissions.
- Improve workspace mounting and path handling across repositories.
- Update documentation dependencies.
