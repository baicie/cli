import { release } from "@baicie/release";

release({
  repo: "baicie",
  packages: ["cli", "release", "tools", "pkg"],
  toTag: (pkg, version) => `${pkg}@${version}`,
  logChangelog: (pkg) => {},
  generateChangelog: (pkg) => {},
});
