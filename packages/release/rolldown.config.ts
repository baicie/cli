import { defineConfig } from "rolldown";
import pkg from "./package.json";
import { builtinModules } from "node:module";

const external = [
  ...Object.keys(pkg.dependencies),
  ...builtinModules,
  ...builtinModules.map((module) => `node:${module}`),
];

export default defineConfig({
  input: ["./src/index.ts", "./src/types.d.ts"],
  output: [
    {
      format: "esm",
      dir: "./dist",
      entryFileNames: "index.js",
    },
    {
      format: "cjs",
      dir: "./dist",
      entryFileNames: "index.cjs",
    },
  ],
  external,
});
