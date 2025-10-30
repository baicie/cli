import { release } from "../packages/release/src";

release({
  repo: "baicie",
  packages: ["cli", "release", "tools", "pkg"],
  toTag: (pkg, version) => `${pkg}@${version}`,
  logChangelog: (pkg) => {},
  generateChangelog: (pkg) => {},
});
