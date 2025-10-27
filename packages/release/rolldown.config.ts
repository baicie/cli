import { defineConfig } from "rolldown";
import pkj from "./package.json";
import { builtinModules } from "node:module";
import { copyFileSync } from "node:fs";

const external = [
  ...Object.keys(pkj.dependencies),
  ...builtinModules,
  ...builtinModules.map((module) => `node:${module}`),
];

copyFileSync("src/types.d.ts", "dist/index.d.ts");

export default defineConfig({
  input: ["./src/index.ts"],
  output: {
    format: "esm",
    dir: "./dist",
    entryFileNames: "index.js",
  },
  external,
});
