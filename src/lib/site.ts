/**
 * Single source of truth for every outbound / cross-page link on the site.
 * Repo, docs and release URLs live here so a rename is a one-line change.
 */
export const REPO = "https://github.com/unhuman-engine/UNHUMAN";

export const links = {
  repo: REPO,
  org: "https://github.com/unhuman-engine",
  releases: `${REPO}/releases`,
  latestRelease: `${REPO}/releases/tag/alpha`,
  issues: `${REPO}/issues`,
  contributing: `${REPO}/blob/master/CONTRIBUTING.md`,
  idea: `${REPO}/blob/master/IDEA.md`,
  license: `${REPO}/blob/master/LICENSE`,
  roadmap: `${REPO}/blob/master/docs/ROADMAP.md`,
  workOrder: `${REPO}/blob/master/docs/WORK_ORDER.md`,
  docsIndex: `${REPO}/blob/master/docs/README.md`,
  architecture: (file: string) => `${REPO}/blob/master/docs/architecture/${file}`,
  module: (path: string) => `${REPO}/tree/master/${path}`,
  discord: "https://discord.gg/MGnQ8MJS4",
  x: "https://x.com/aryan35036",
} as const;

/** Version string shown in the chrome status bar. Mirrors the latest release tag. */
export const BUILD = {
  version: "v0.01-alpha",
  standard: "C++23",
  api: "Vulkan 1.1+",
  platform: "Linux · Windows",
  license: "MIT",
} as const;
