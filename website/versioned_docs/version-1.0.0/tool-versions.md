---
title: Configured tool versions
sidebar_position: 6
---

These values describe the checked-in configuration, not a runtime inventory. An unpinned version is marked explicitly; feature versions are separate from the tools they install.

## Container and agent tooling

| Component | Configured version / pin | Source |
| --- | --- | --- |
| Debian base image | `trixie-20251208-slim` | `Dockerfile` · `DEBIAN_VERSION` |
| Temurin JDK | `21.0.9+10` | `Dockerfile` · `TEMURIN_VERSION` / `TEMURIN_BUILD` |
| Gradle | `9.2.1` | `Dockerfile` · `GRADLE_VERSION` |
| Treehouse | `3.1.4` · SHA-256 verified | `Dockerfile` · `TREEHOUSE_VERSION` / `TREEHOUSE_SHA256` |
| Node.js feature | `2.1.1` · digest locked | `devcontainer.json` / `devcontainer-lock.json` |
| Node.js runtime | `24.22.0` | Node feature · `version` |
| nvm | `0.40.8` | Node feature · `nvmVersion` |
| Docker-in-Docker feature | `4.1.3` · digest locked | `devcontainer.json` / `devcontainer-lock.json` |
| Docker Engine inside the container | Not explicitly pinned; `moby: false` | Docker-in-Docker feature options |
| `skills` installer CLI | `1.7.2` · transient `npx` invocation | `postCreateCommand` |
| Matt Pocock skills | Commit `49dd158d1076134a641b33efb035946536778336` | `postCreateCommand` |
| Git, GitHub CLI, and other apt packages | Not explicitly pinned; resolved from Debian repositories | `Dockerfile` · `apt-get install` |
| Codex VS Code extension (`openai.chatgpt`) | Not explicitly pinned | `devcontainer.json` · `customizations` |

The template does not install or pin a standalone Codex CLI. The Node feature sets `pnpmVersion: none` and disables `nodeGypDependencies`.

## Documentation tooling

| Component | Declared version | Locked version |
| --- | --- | --- |
| Docusaurus core and classic preset | `3.10.2` | `3.10.2` |
| React and React DOM | `^19.3.1` | `19.3.1` |
| Local search | `0.55.3` | `0.55.3` |
| MDX React | `^3.1.1` | `3.1.1` |
| Node.js for running docs outside the container | `>=22.0` | Host prerequisite; not locked by npm |

Declarations come from `website/package.json`; `website/package-lock.json` records exact resolved npm dependency versions. The devcontainer installs them with `npm ci`.

Temporary npm overrides address vulnerabilities in Docusaurus 3.10.2's build and development dependencies: `tinypool` (`2.2.0`), `serialize-javascript` (`7.1.2`), `postcss-selector-parser` (`7.1.6`), and `uuid` (`11.1.1`) under `sockjs`. For `braces`, which has no patched upstream release as of October 17, 2026, the pinned third-party fork [`@dieub/braces-depth-guard@3.0.3-pn.3`](https://github.com/dieub/braces-depth-guard/tree/305a2e4bfe324bb53c336c1b03387ee1251c926f) limits nesting to 100 levels to prevent [stack exhaustion](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm).

Review these overrides when upgrading Docusaurus or when upstream fixes arrive. Before changing them, verify depth rejection, glob matching, file watching, production builds, and worker-based static generation; a clean `npm audit` alone is insufficient.

## Updating versions

Update the relevant declarations and associated lockfiles or checksums together. Rebuild the devcontainer to apply image, feature, or installed-skill changes.
