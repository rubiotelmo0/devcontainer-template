# `.devcontainer` template
This repo contains a `.devcontainer` configuration and docs template, ready to be modified to your specific needs. Additionally, a Java + Gradle Dockerfile is provided as a reference.

The following [`.devcontainer`](#devcontainer) section can be directly copied to your repo's README.md. 

> [!NOTE]
> Remember to modify the [devcontainer.json](./.devcontainer/devcontainer.json), host environment variables, and container name as needed.

## [`.devcontainer`](./.devcontainer)
This repo ships with a VS Code devcontainer environment to make development simpler.

### Change devcontainer name
In [`.devcontainer/devcontainer.json`](./.devcontainer/devcontainer.json), replace `<your-container-name>-dev` in the `--name` run argument with a unique name for this repo.

### Configuring git
Follow the steps in the sections below to configure Git inside the container.

> [!WARNING]
> As stated in [Launching VS Code after configuration](#launching-vs-code-after-configuration), start VS Code (`code .`) from the same shell where you ran the configuration commands!

#### Setting up git `user.name` and `user.email`
Set the following environment variables; they are passed to the devcontainer automatically.

**Windows**
```powershell
$env:<REPO_NAME>_DEV_GIT_NAME = "Your Name"
$env:<REPO_NAME>_DEV_GIT_EMAIL = "your@email.com"
```

**Linux**
```bash
export <REPO_NAME>_DEV_GIT_NAME="Your Name"
export <REPO_NAME>_DEV_GIT_EMAIL="your@email.com"
```

> [!NOTE]
> You only need to perform these steps when you create (or rebuild) the devcontainer, not every time you start it.

#### Setting up git SSH keys
If you use Git with SSH keys, follow these steps (full info at [link](https://code.visualstudio.com/remote/advancedcontainers/sharing-git-credentials)).

> [!NOTE]
> You need to perform the actions below (SSH agent initialization and key loading) every time you **start** the container.

**1. Automatically initialize the SSH Agent**

**Windows**: Start a local Administrator PowerShell session and run the following commands:
```powershell
# Make sure you're running as an Administrator
Set-Service ssh-agent -StartupType Automatic
Start-Service ssh-agent
Get-Service ssh-agent
```

**Linux**: First, start the SSH Agent in the background by running the following in a terminal:

```bash
eval "$(ssh-agent -s)"
```

**2. Add your keys to the SSH Agent**

Both on Windows and Linux:
```bash
# Import default keys (~/.ssh/id_rsa, .ssh/id_dsa, ~/.ssh/id_ecdsa, ~/.ssh/id_ed25519, and ~/.ssh/identity)
ssh-add

# Import specific keys
ssh-add <path/to/your/key>
```

### Coding agent utils

#### Persisted Codex and agent data
Codex data under `~/.codex` is persisted in a Docker volume named `${localWorkspaceFolderBasename}-codex`. For a repo folder named `my-repo`, for example, the volume is `my-repo-codex`.

The canonical agent-skill store (`~/.agents`) and Treehouse worktree pool (`~/.treehouse`) use equivalent `-agent-skills` and `-treehouse` volumes. All three therefore survive a devcontainer rebuild.

#### Matt Pocock's engineering skills
The devcontainer post-create command uses the transient [`skills`](https://skills.sh/) CLI to install [`mattpocock/skills`](https://github.com/mattpocock/skills) globally for Codex and disables installer telemetry. The image includes the minimum compatible Node.js runtime needed to run the installer; the `skills` CLI itself is not installed globally.

After creating the container, run this once per repository from Codex:

```text
/setup-matt-pocock-skills
```

Choose GitHub as the issue tracker. The setup records the repository-specific issue tracker, triage labels, and documentation layout under `docs/agents/`.

#### GitHub CLI and headless authentication
The GitHub CLI (`gh`) is installed from Debian's package repository. For a headless devcontainer, authentication is provided through the [`GH_TOKEN` environment variable](https://cli.github.com/manual/gh_help_environment), so there is no interactive `gh auth login` step and no token is baked into the image.

Create a fine-grained personal access token for the required repositories. For the broader development workflow, grant these repository permissions:

- **Metadata: read**
- **Contents: read and write** for HTTPS Git pushes, tags, releases, and merging PRs
- **Issues: read and write**
- **Pull requests: read and write**
- **Workflows: read and write** only if you need to push changes to `.github/workflows/`

Then set it in the host shell before launching VS Code:

**Windows**
```powershell
$env:<REPO_NAME>_GH_TOKEN = "github_pat_..."
code .
```

**Linux**
```bash
export <REPO_NAME>_GH_TOKEN="github_pat_..."
code .
```

The devcontainer forwards the value from the host. Do not put the token directly in `devcontainer.json` or commit it to the repository. Verify authentication inside the container with:

```bash
gh auth status
```

If you prefer a classic personal access token, use the scopes GitHub documents for `gh auth login --with-token`: `repo`, `read:org`, and `gist`.

With this template's SSH setup, normal pushes and tags use Git and the forwarded SSH agent, not `GH_TOKEN`:

```bash
git push
git tag v1.0.0
git push origin v1.0.0
```

The token authenticates GitHub API operations such as `gh issue create`, `gh pr create`, and `gh pr merge`. If a repository instead uses an HTTPS remote, run `gh auth setup-git` inside the container to configure `gh` as Git's credential helper; in that case the token also authenticates Git pushes and tag pushes.

#### Treehouse CLI
The image installs a pinned, checksum-verified [Treehouse](https://github.com/kunchenguid/treehouse) binary. From a Git repository, run:

```bash
treehouse
```

Treehouse acquires an isolated reusable worktree and opens a subshell in it. Exit that shell to return the worktree to the pool. Its default `~/.treehouse` pool is persisted by the devcontainer volume described above.

### Launching VS Code after configuration
After completing the host-side configuration above, use the **same shell** in which you set the Git identity variables and `GH_TOKEN`. Move to the repository and launch VS Code so those values are available while the devcontainer is created:

```bash
cd /path/to/repo

code .
```

### Starting devcontainer
Once the [git configuration steps](#configuring-git) are completed, you can create the devcontainer. Follow this simple process:

1. Press `Ctrl + Shift + P` to open VS Code's command palette
2. Type `Dev Containers: Reopen in Container` and hit Enter
3. That's it! The environment is now ready to use :)
