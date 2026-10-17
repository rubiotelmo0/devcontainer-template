---
title: Pre-stack creation configuration
sidebar_position: 1
---

Prepare the host before creating the devcontainer stack. Please follow steps with care.

## Prerequisites

- VS Code with the Dev Containers extension.
- Git and a running Docker installation with Docker Compose **2.30.0 or later**. The stack uses [`env_file.format: raw`](https://docs.docker.com/reference/compose-file/services/#format) to preserve literal credentials, including quotes and `$` characters.
- An **x86-64 / amd64** container environment.

## 1. Review the template

Keep the local clone's folder name the same as the repository name. **The folder name determines the host environment-variable prefix and the persistent volume names**.

Once the folder is named correctly, **open the repository in a terminal**.

## 2. Set Git identity and GitHub authentication

Set these variables in the host shell before opening VS Code. **The prefix is the repository folder name in uppercase**, with every character other than `A-Z`, `0-9`, or `_` replaced by `_`. For a folder named `my-repo`, set:

```powershell title="Windows / PowerShell"
$env:MY_REPO_DEV_GIT_NAME = "Your Name"
$env:MY_REPO_DEV_GIT_EMAIL = "your@email.com"
$env:MY_REPO_GH_TOKEN = "github_pat_..."
```

```bash title="Linux / Bash"
export MY_REPO_DEV_GIT_NAME="Your Name"
export MY_REPO_DEV_GIT_EMAIL="your@email.com"
export MY_REPO_GH_TOKEN="github_pat_..."
```

Replace `MY_REPO` with your own prefix; for this repository's default folder name, use `DEVCONTAINER_TEMPLATE`.

### GitHub token permissions

The GitHub CLI (`gh`) is installed from Debian's package repository. Headless authentication uses the [`GH_TOKEN` environment variable](https://cli.github.com/manual/gh_help_environment), so there is no interactive `gh auth login` step and no token is baked into the image.

Create a fine-grained personal access token for the required repositories. For the broader development workflow, grant these repository permissions:

| Permission | Access and purpose |
| --- | --- |
| Metadata | Read |
| Contents | Read and write for HTTPS Git pushes, tags, releases, and merging pull requests |
| Issues | Read and write |
| Pull requests | Read and write |
| Workflows | Read and write only if you need to push changes to `.github/workflows/` |

## 3. Load an SSH key, if using SSH remotes

Start the SSH agent on your host and load your key before launching the container. Repeat these steps each time you start the container, or configure the agent to start and load your key automatically (recommended). For more details, see VS Code's [Git credential sharing guide](https://code.visualstudio.com/remote/advancedcontainers/sharing-git-credentials).

### Initialize the SSH agent

On Windows, open an **Administrator PowerShell** session:

```powershell
Set-Service ssh-agent -StartupType Automatic
Start-Service ssh-agent
Get-Service ssh-agent
```

On Linux, start the agent in the shell you will use to launch VS Code:

```bash
eval "$(ssh-agent -s)"
```

### Add your keys

On Windows or Linux, load default keys or specify a key path:

```bash
# Load default keys from ~/.ssh.
ssh-add

# Or load a specific key.
ssh-add <path/to/your/key>
```

## 4. Create the stack

From the **same shell** where you set the environment variables and made your SSH agent available, open the repository:

```bash
cd /path/to/repo
code .
```

In VS Code:

1. Press `Ctrl+Shift+P` to open the command palette.
2. Run **Dev Containers: Reopen in Container**.
3. Wait for the stack to build and the post-create command to finish installing engineering skills and documentation dependencies.
