import { defineConfig } from "rolldown";
import pkj from "./package.json";
import { builtinModules } from "node:module";

const external = [
  ...Object.keys(pkj.dependencies),
  ...builtinModules,
  ...builtinModules.map((module) => `node:${module}`),
];

export default defineConfig({
  input: ["./index.ts"],
  output: {
    format: "esm",
    dir: "./dist",
    entryFileNames: "index.js",
  },
  external,
});
