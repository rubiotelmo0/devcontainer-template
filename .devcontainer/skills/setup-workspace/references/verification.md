# Verification handoffs

Use three distinct verifier subagents: one for Workspace image, a second for Compose stack, and a third for Website. Each receives only its stage's verification task; retries stay with that stage's verifier. The parent owns configuration edits; each verifier runs checks and returns commands, exit codes, useful output, failures, and resource cleanup status. Give it the user's selected versions and expected behavior, not just the diff. Never substitute a configuration review for an actual build/start check.

## Workspace image

1. Check Docker availability. Read Compose's actual build context, Dockerfile, build arguments, and target; do not assume the repository root is the context. For the unchanged template layout, a disposable build is:

   ```bash
   docker build --tag workspace-setup-check:<unique-id> --file .devcontainer/Dockerfile .devcontainer
   ```

2. Run the built image as its configured non-root user. Check each tool installed by the Dockerfile with a version command or minimal useful invocation, and verify the workspace path is usable. Node.js and Docker-in-Docker are supplied by Features in the template, so a plain Dockerfile image does not prove they work.
3. If Features or their configuration changed, also build with the Dev Container CLI using the actual `devcontainer.json`. Inspect the installed CLI's help for supported build/lockfile commands. Use an isolated working copy and dummy host-credential file when needed; suppress lifecycle actions that would install into or modify live agent volumes. Smoke-test selected Feature tools in the resulting image. Report Dockerfile and Feature checks separately.
4. Remove only the verifier's disposable containers and image tags. Retain build cache; avoid global prune commands.

Return a pass only for checks that actually ran successfully. If a daemon, network dependency, platform, or CLI prevents a check, return the exact blocker and pending command. The parent should fix configuration failures; environmental failures must stay visible in the final report.

## Compose stack

Run a short smoke test of the final configuration, not application development or a load test. Use a bounded readiness timeout (for example, 120 seconds) and one simple request/query per selected service.

1. Copy the required `.devcontainer` files/config mounts to a disposable directory, excluding real `.env*` files. Supply a dummy `.env.workspace` and test values for other required secrets. Use a unique Compose project name. Render and validate the configuration with `docker compose ... config --quiet`; keep expanded secrets out of output.
2. Inspect the resolved configuration before startup. A project name alone does **not** isolate explicit `container_name`, fixed published ports, external/named volumes, or bind mounts. Apply a test-only override or adjust the disposable copy to remove fixed names/host ports, isolate data volumes, and redirect writable host mounts. Keep service images, commands, environment requirements, health checks, and dependency semantics intact. Never attach the test to the active workspace's data or Docker daemon socket.
3. Start the copied stack with `docker compose ... up --detach --build --wait --wait-timeout 120` when supported by the installed Compose version; otherwise poll readiness within the same timeout. Even with no added services, verify that `workspace` builds and stays running. Plain Compose does not inject Dev Container Features or native devcontainer mounts; account for that when choosing runtime probes and report that boundary.
4. Confirm every requested service is running/healthy. Exercise a minimal service-specific connection from the workspace over the Compose network using a client already in the image, or a disposable client container on that network if necessary. Check DNS/service names and the actual internal ports. A running container without a health check needs an explicit readiness probe.
5. Capture relevant logs on failure, with credentials redacted. In all outcomes, tear down **only the disposable project** and its test volumes with the same Compose files/project name. Remove temporary files and report any cleanup failure. Never run `down` against the active development stack.

Return the service list, readiness/connection results, elapsed time, and the distinction between configuration-only and runtime verification. A failed or skipped runtime test remains incomplete even if `config --quiet` passes.

## Website

Run this handoff after branding, the README rewrite, and removal of the root changelog and license files. This verifier is separate from both Docker verifiers.

1. Compare the final website with the supplied project identity, colors, and optional logo. Confirm the adapted Introduction at `/`, Documentation, and Development pages remain; preserve any additional user-authored pages on reruns. Check that Development retains the supplied pre-stack host preparation guidance and that the retained site and README have no broken references to deleted template pages, branding, `CHANGELOG.md`, or `LICENSE`.
   Confirm the template's `.github/workflows/docs.yml` and Documentation's **Deploy to GitHub Pages** section are absent, and unrelated workflows are preserved.
2. Run the production build defined in `website/package.json`. Report build errors and broken links to the parent. In the no-icon case, check that empty nested static directories do not break asset copying.
3. When a browser is available, serve the production output on a free local port. Check landing-page content, branding, navigation to Documentation and Development, and the absence of horizontal overflow at desktop and mobile widths. Inspect the layouts and capture useful screenshots. Wait for route content to render before asserting navigation results.
4. Stop only the preview server and browser processes started for this check. Return the build result, page/navigation and layout results, screenshots when captured, and cleanup status. If browser validation is unavailable, report it as pending separately from the build result.
