---
title: Documentation
sidebar_position: 5
---

The template includes a Docusaurus site with an illustrated introduction, getting started guides, configuration details, best practices, configured tool versions, a roadmap, and support information. Undefined workflows and plans are marked as placeholders.

## Edit the website

Edit `website/docs/intro.mdx` and add Markdown or MDX pages under `website/docs/`. The sidebar is generated automatically; use front matter to set page titles and positions.

The landing-page component and styles live in `website/src/`. Site configuration and Docusaurus dependencies live in `website/`.

## Run locally

The devcontainer runs `npm --prefix website ci` when it is created and forwards port **3000** as **Documentation**. Start the site on demand from the repository root:

```bash
npm --prefix website start
```

Open [http://localhost:3000/devcontainer-template/](http://localhost:3000/devcontainer-template/). Documentation edits reload automatically; polling supports Docker bind mounts on Windows. Stop the server with `Ctrl+C`.

Outside the devcontainer, use **Node.js 22 or later** and first install dependencies from the repository root:

```bash
npm --prefix website ci
```

For an existing devcontainer, rebuild it to apply dependency installation and port forwarding, or run the install command and forward port 3000 manually from VS Code's **Ports** view.

## Build, preview, and search

From the repository root:

```bash
npm --prefix website run build
npm --prefix website run serve
```

Build output is written to `website/build/`. Preview it at [http://localhost:3000/devcontainer-template/](http://localhost:3000/devcontainer-template/).

The navbar search uses a local index generated during the production build, with no external account or API key. The development server previews the search bar but does not return search results. Use the build-and-serve commands to try search, and rebuild after documentation edits to refresh the index.

## Deploy to GitHub Pages

In the repository's **Settings → Pages**, select **GitHub Actions** as the build and deployment source. If the `github-pages` environment restricts deployment branches and tags, allow tags matching `v*` under **Settings → Environments → github-pages**.

The workflow in `.github/workflows/docs.yml` deploys on pushes of release tags matching `v*`, such as `v1.0.0`. It checks that the tagged commit is in `master`'s history, installs the locked dependencies, builds the tagged documentation, and publishes `website/build/` to GitHub Pages. Push the release commit to `master` before pushing its tag. Ordinary branch pushes do not deploy the site.
