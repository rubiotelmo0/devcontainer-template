---
title: Releases
sidebar_position: 9
---

Use the same release version throughout; the examples below use `1.0.0` and Git tag `v1.0.0`.

1. Check that the docs match the implementation, especially [configured tool versions](tool-versions.md).
2. Update `CHANGELOG.md`: review the entries under `Unreleased`, move them into a new release section with the version and release date, and leave an `Unreleased` section for future changes.
3. Snapshot the docs with Docusaurus from `website/`:

   ```bash
   npx docusaurus docs:version 1.0.0
   npm run build
   ```

   Include the generated `website/versions.json`, `website/versioned_docs/`, and `website/versioned_sidebars/` in the release commit along with the docs and changelog changes.
4. Commit the release changes and integrate them into `master`. From the release commit on `master`, push the branch before creating and pushing the tag:

   ```bash
   git push origin master
   git tag -a v1.0.0 -m "Release 1.0.0"
   git push origin v1.0.0
   ```

   Pushing the tag triggers the documentation deployment.
