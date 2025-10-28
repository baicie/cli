/**
 * 常量定义
 */

/**
 * package.json 字段的标准排序顺序
 */
export const STANDARD_FIELDS_ORDER = [
  "name",
  "version",
  "description",
  "keywords",
  "homepage",
  "bugs",
  "license",
  "author",
  "contributors",
  "funding",
  "files",
  "main",
  "module",
  "browser",
  "bin",
  "man",
  "types",
  "typings",
  "exports",
  "imports",
  "directories",
  "repository",
  "scripts",
  "config",
  "dependencies",
  "devDependencies",
  "peerDependencies",
  "peerDependenciesMeta",
  "optionalDependencies",
  "bundledDependencies",
  "engines",
  "os",
  "cpu",
  "private",
  "publishConfig",
  "workspaces",
  "type",
  "sideEffects",
  "packageManager",
];

/**
 * 必需字段
 */
export const REQUIRED_FIELDS = ["name", "version"];

/**
 * 依赖字段
 */
export const DEPENDENCY_FIELDS = [
  "dependencies",
  "devDependencies",
  "peerDependencies",
  "optionalDependencies",
];

/**
 * 有效的 license 列表（常用的）
 */
export const VALID_LICENSES = [
  "MIT",
  "ISC",
  "Apache-2.0",
  "BSD-2-Clause",
  "BSD-3-Clause",
  "GPL-3.0",
  "LGPL-3.0",
  "MPL-2.0",
  "UNLICENSED",
];

/**
 * 预设模板
 */
export const PRESETS = {
  basic: {
    name: "",
    version: "0.1.0",
    description: "",
    main: "index.js",
    scripts: {
      test: 'echo "Error: no test specified" && exit 1',
    },
    keywords: [],
    author: "",
    license: "MIT",
  },
  library: {
    name: "",
    version: "0.1.0",
    description: "",
    type: "module",
    main: "./dist/index.cjs",
    module: "./dist/index.js",
    types: "./dist/index.d.ts",
    exports: {
      ".": {
        types: "./dist/index.d.ts",
        import: "./dist/index.js",
        require: "./dist/index.cjs",
      },
    },
    files: ["dist"],
    scripts: {
      build: "tsup src/index.ts --format cjs,esm --dts",
      dev: "tsup src/index.ts --format cjs,esm --dts --watch",
      typecheck: "tsc --noEmit",
    },
    keywords: [],
    author: "",
    license: "MIT",
  },
  cli: {
    name: "",
    version: "0.1.0",
    description: "",
    type: "module",
    bin: {
      "": "./cli.js",
    },
    files: ["dist", "cli.js"],
    scripts: {
      build: "tsup src/index.ts --format esm",
      dev: "tsup src/index.ts --format esm --watch",
    },
    keywords: ["cli"],
    author: "",
    license: "MIT",
  },
  typescript: {
    name: "",
    version: "0.1.0",
    description: "",
    type: "module",
    main: "./dist/index.js",
    types: "./dist/index.d.ts",
    scripts: {
      build: "tsc",
      dev: "tsc --watch",
      typecheck: "tsc --noEmit",
    },
    keywords: [],
    author: "",
    license: "MIT",
  },
  monorepo: {
    name: "",
    version: "0.1.0",
    description: "",
    private: true,
    workspaces: ["packages/*"],
    scripts: {
      build: "pnpm -r run build",
      dev: "pnpm -r run dev",
      test: "pnpm -r run test",
    },
    keywords: [],
    author: "",
    license: "MIT",
  },
} as const;
