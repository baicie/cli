import { defineConfig } from "rolldown";
import pkg from "./package.json";
import { builtinModules } from "node:module";
import { copyFileSync, mkdirSync } from "node:fs";

const external = [
  ...Object.keys(pkg.dependencies),
  ...builtinModules,
  ...builtinModules.map((module) => `node:${module}`),
];

mkdirSync("dist", { recursive: true });
copyFileSync("src/types.d.ts", "dist/index.d.ts");

export default defineConfig({
  input: ["./src/index.ts"],
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
