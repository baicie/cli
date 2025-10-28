import { defineConfig } from "rolldown";
import pkg from "./package.json";
import { builtinModules } from "node:module";

const external = [
  ...Object.keys(pkg.dependencies),
  ...builtinModules,
  ...builtinModules.map((module) => `node:${module}`),
];

export default defineConfig({
  input: ["./src/cli.ts"],
  output: {
    format: "esm",
    dir: "./dist",
    entryFileNames: "cli.js",
  },
  external,
});
