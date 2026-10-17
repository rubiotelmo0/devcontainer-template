---
name: setup-workspace
description: Adapt a newly created devcontainer-template workspace to a project. Use for post-stack creation setup of agent conventions, development tools, Compose services, documentation branding, and the project README.
---

# Set up the workspace

Run this workflow inside the newly created workspace. The container installs this skill and Matt Pocock's engineering skills during `postCreateCommand`. Installing the skills makes them available; it does not start this interview.

Work through the stages below in order. Reuse answers already supplied; ask for missing choices at the relevant stage and wait for the answer before making dependent changes. Keep unrelated user work. On a resumed run, inspect the current files and continue from the unfinished stage instead of repeating setup or deleting new project content.

Launch **three distinct verifier subagents**, one for each scope: workspace image, Compose stack, and website modifications. Launch each at its handoff below; keep its checks and report scoped to that stage. Reuse a verifier only for retries within its own scope, never for another validation stage.

## 1. Configure the engineering skills

Inspect the repository instructions, Git remote, `.devcontainer/`, and `website/`. Read `website/docs/getting-started/pre-creation.md` before changing configuration; its host preparation instructions must survive in the eventual Development page. On a resumed run, use the existing Development page if the original has already moved.

Invoke `setup-matt-pocock-skills`. If the agent has no skill invocation tool, read and follow the installed `~/.agents/skills/setup-matt-pocock-skills/SKILL.md` and the seed templates it references. If missing, run the pinned Matt Pocock installation command already configured in `postCreateCommand`, then load it. If installation fails, report the dependency failure instead of inventing its workflow.

Pass these repository-specific choices into that skill:

- **Agent documentation root: `context/`**, a sibling of `website/`. Map its default `docs/agents/` outputs to `context/agents/` and ADR paths from `docs/adr/` to `context/adr/`, including scoped ADR paths when applicable. Adapt its generated templates and instruction pointers consistently. Public documentation stays in `website/docs/`.
- Recommend **GitHub Issues** for a GitHub remote, with its default triage vocabulary unless the user specifies otherwise. Resolve the new project's repository from the user or remote; a leftover template remote is not the new project's issue tracker. Follow the upstream skill's tracker and label setup flow once the destination is known.
- Write repository guidance to the root `AGENTS.md`, creating it when needed. This overrides the upstream instruction-file selection rule, including when only `CLAUDE.md` exists. Preserve existing instructions; link to any additional conventions in `CLAUDE.md` rather than duplicating them. Update an existing Agent skills block in place.
- Keep the upstream glossary convention and lazy creation of domain documents; the directory rename does not require inventing a glossary or ADRs.

Apply the path override while executing the upstream skill, without modifying the globally installed skill files. Include an explicit instruction in the repository's agent guidance that `context/` is the agent documentation root, overriding engineering skills' default `docs/` paths. Its pointers must lead to the generated tracker, label, and domain files. Finish this stage when those files and pointers agree and tracker configuration is completed, or identify a concrete unresolved tracker operation.

## 2. Define and build the workspace

Ask the user to describe the desired workspace: project name and purpose, programming languages and runtime versions, package/build tools, development CLIs, and editor extensions. Offer to select compatible versions where the user has no preference. Collect the new repository or documentation URL only if it cannot be inferred reliably and is needed for configuration.

Update `.devcontainer/Dockerfile` and `.devcontainer/devcontainer.json` to match the answers. Remove the template's Java/Gradle reference toolchain if it is not wanted. Use direct Dockerfile instructions and Dev Container Features; add setup scripts only when declarative configuration cannot reasonably perform a required operation. Resolve compatible versions against official sources when necessary.

Preserve the infrastructure needed by this template: the non-root workspace user, repository mount, host credential initialization, persistent agent/Treehouse volumes, Docker-in-Docker, and skill installation. Keep Node.js compatible with `website/package.json`, the website dependency installation, and documentation port forwarding even for projects using other languages. Adapt paths and ownership together if a user explicitly changes the workspace user. When Features change, regenerate the feature lockfile with the Dev Container CLI rather than hand-writing integrity digests.

**Launch the workspace verifier subagent** using [verification.md](references/verification.md#workspace-image). Give it the selected tools/versions, changed file paths, and a disposable resource name. It must actually build the Dockerfile and smoke-test its installed tools; validate the Feature-augmented image as well when Features change. Fix reported failures and have this verifier rerun the affected checks before proceeding. An unavailable Docker daemon or subagent is an explicit incomplete verification, never a pass; retain the pending check for the final report.

## 3. Add and verify services

After the workspace stage, ask which services the project needs, including versions and any persistence or host-access requirements. Accept **none** without adding sample services.

Add the requested services to `.devcontainer/compose.yaml` with the minimum working configuration: maintained images with explicit versions, required environment/configuration, appropriate health checks, and named volumes only where persistent data is wanted. Use service names for container-to-container connections. Publish host ports only when needed; coordinate port forwarding and startup dependencies with `devcontainer.json`. Preserve the workspace service and raw credential-file handling. Use image-supported environment settings or mounted config files before introducing setup scripts. Keep local-only example credentials clearly identified and real secrets in ignored files.

**Launch a separate Compose stack verifier subagent**, including the no-extra-services case, using [verification.md](references/verification.md#compose-stack). Give it expected services and one useful readiness/connection check per service. Resolve configuration or startup failures and have this verifier repeat the affected checks. Continue to branding once the checks pass, or carry an explicit environmental blocker forward without claiming the stack was verified.

Before moving on, create or update a single **Development environment** section in the root `AGENTS.md`, based on the final Dockerfile, Dev Container configuration, Compose services, and verification results. Explain to future agents that they work inside the stack's `workspace` devcontainer and can use Docker-in-Docker to build images, run containers, and test their changes. Include the configured workspace path/user and any rebuild needed to apply the new configuration.

Document how agents interact with **every configured Compose service** from the workspace: service name and purpose, internal hostname/port or endpoint where applicable, required client/tool, credential environment-variable names or ignored configuration location, and a minimal readiness or connection command. Tell agents to use these local services for development and integration checks, with commands matched to installed clients. Use service DNS names and internal ports for peer connections; `localhost` refers to the workspace itself. Record only credential references, not secret values. With no additional services, state that explicitly.

Distinguish Docker-in-Docker from the host daemon that created the outer devcontainer stack: the inner Docker CLI manages its own containers and cannot be assumed to see outer services through `docker compose exec`. Connect to those services directly over the workspace's Compose network. Containers launched inside Docker-in-Docker need an explicitly configured route to outer services; do not imply they automatically share that network. Include Compose management commands only when the agent can reach the daemon owning that stack. Mark unverified connections as pending instead of presenting them as tested.

Completion: `AGENTS.md` explains the devcontainer and Docker capabilities, accounts for every service in the final Compose configuration, and gives agents usable connection instructions. Preserve unrelated guidance and replace the existing environment section on reruns.

## 4. Reduce and brand the documentation

Once stack configuration is settled, ask for the desired colors and an optional icon/logo. Accept no icon and offer to keep the existing palette if there is no color preference. Reuse an asset or its supplied path; if the user requests new artwork, use the available image-generation workflow. Ask only for project identity information still missing from stage 2.

Keep the Docusaurus site and its existing documentation/search tooling. Make small style changes in `website/src/css/custom.css` and `website/src/components/Introduction/styles.module.css`, with readable light/dark colors. Reduce the template site to these three pages:

| Page | Required result |
| --- | --- |
| Introduction (`website/docs/intro.mdx`) | Preserve the `/` landing route. Adapt the introduction component to the project title, short description, optional logo, and a link to Documentation. Remove the template feature list and setup promotion. With no icon, remove template artwork and its empty layout space. |
| Documentation (`website/docs/documentation.md`) | Keep a concise guide to editing, running, building, and searching this site. Adapt project URLs and remove the template's page inventory. Leave project-specific documentation for the user. |
| Development (`website/docs/development.md`) | Preserve the pre-stack host preparation guide from stage 1: prerequisites, folder-derived environment prefix, Git identity/GitHub authentication, optional SSH-agent setup, and VS Code creation steps. Adapt it to the selected tools/architecture and add only essential rebuild and service connection instructions for the configured stack. |

Remove the template's GitHub Pages workflow at `.github/workflows/docs.yml` and the **Deploy to GitHub Pages** section in `website/docs/documentation.md`, including its repository settings and release-tag instructions. Preserve unrelated workflows such as `.github/workflows/security.yml`.

Remove the remaining **template** documentation pages and obsolete category files. On reruns, preserve pages the user has added. Fix navbar/sidebar links, frontmatter pagination, and cross-page links to the surviving routes. Update title, tagline, favicon, repository link, and deployment URL/base path in `website/docusaurus.config.js`; use the new project's confirmed destination, or a local preview configuration if hosting is undecided. Keep Documentation's local preview URLs consistent with that base path. Remove unreferenced template branding assets and the old artwork prompt; retain shared assets still in use. With no icon, remove the old favicon setting as well as the old logo. If no static assets remain, remove the empty static directory tree or set `staticDirectories: []`; leaving empty nested directories can cause the production asset-copy step to fail.

Completion: only the three intended template pages remain, their navigation works, and the site contains the new project's branding without invented features or placeholder sections.

## 5. Clean up the project and validate the website

Replace the root `README.md` with just the project title, a short project description, and the logo if supplied. Remove all old sections, including the license badge and license section. Delete the root `CHANGELOG.md` and `LICENSE` files as part of template cleanup, and remove any surviving links or references to them from the retained project content.

**Launch a third, separate website verifier subagent** using [verification.md](references/verification.md#website). Give it the requested branding, intended page list, preserved pre-stack guide, and changed paths after cleanup. It must run the production build and check the modified website, including wide and narrow layouts when a browser is available. Fix reported failures and have this verifier repeat the affected checks. Report unavailable checks explicitly.

Check that `AGENTS.md` and generated `context/` documents resolve to the new paths, with no generated guidance pointing at a root `docs/` directory. Cross-check the Development environment section against every final Compose service and the reported verification results. Confirm the root changelog and license files are absent. Check the final diff for stale template identity and links in the retained site and README.

Report the configured toolchain/services, agent documentation location, website/README changes, removed template files, and the three verifiers' results separately. State any pending checks separately and explain that **Dev Containers: Rebuild Container** applies the new stack configuration. Leave commits, pushes, and publication to a separate user request.
