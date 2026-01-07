# `.devcontainer` template
This repo contains a `.devcontainer` configuration and docs template, ready to be modified to your specific needs. Additionally, a Java + Gradle Dockerfile is provided as a reference.

The following [`.devcontainer`](#devcontainer) section can be directly copied to your repo's README.md. 

> [!NOTE]
> Remember to modify the [devcontainer.json](./.devcontainer/devcontainer.json), git-related environment variables, and container name as needed.

## [`.devcontainer`](./.devcontainer)
This repo ships with a VS Code devcontainer environment to make development simpler.

### Configuring git
Follow the steps in the sections below to configure Git inside the container.

> [!WARNING]
> As stated in [Launching VS Code with Git config](#launching-vs-code-with-git-config), start VS Code (`code .`) from the same shell where you ran the configuration commands!

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

#### Launching VS Code with Git config
**Using the same shell** used to execute commands in the previous Git config sections, **move to the repo directory and launch VS Code**.

```bash
cd /path/to/repo

code .
```

### Starting devcontainer
Once the [git configuration steps](#configuring-git) are completed, you can create the devcontainer. Follow this simple process:

1. Press `Ctrl + Shift + P` to open VS Code's command palette
2. Type `Dev Containers: Reopen in Container` and hit Enter
3. That's it! The environment is now ready to use :)
