/**
 * 使用示例
 * 运行：pnpm dev 然后在另一个终端运行 tsx examples.ts
 */

import {
  createPackageJson,
  formatPackageJson,
  validatePackageJson,
  addDependency,
  bumpVersion,
  sortPackageJson,
  prettifyPackageJson,
} from "./src/index";

console.log("🎯 @baicie/pkg 使用示例\n");

// 示例 1: 创建 package.json
console.log("📦 示例 1: 创建 package.json");
const pkg1 = createPackageJson({
  name: "my-awesome-app",
  version: "1.0.0",
  description: "An awesome application",
  author: "baicie",
  preset: "library",
});
console.log(prettifyPackageJson(pkg1));
console.log("");

// 示例 2: 格式化 package.json
console.log("🎨 示例 2: 格式化 package.json");
const unformatted = {
  version: "1.0.0",
  name: "my-app",
  dependencies: {
    "z-package": "^1.0.0",
    "a-package": "^2.0.0",
  },
  description: "My app",
};
const formatted = formatPackageJson(unformatted, {
  sortFields: true,
  sortDependencies: true,
});
console.log(formatted);
console.log("");

// 示例 3: 验证 package.json
console.log("✅ 示例 3: 验证 package.json");
const invalidPkg = {
  name: "Invalid-Name-With-Caps",
  version: "1.0",
};
const result = validatePackageJson(invalidPkg);
console.log("验证结果:", result.valid ? "✅ 有效" : "❌ 无效");
if (!result.valid) {
  console.log("错误:");
  result.errors.forEach((err) => {
    console.log(`  - ${err.field}: ${err.message}`);
  });
}
console.log("");

// 示例 4: 操作 package.json
console.log("🔧 示例 4: 操作 package.json");
let pkg2 = createPackageJson({ name: "demo-app", preset: "basic" });
console.log("原始版本:", pkg2.version);

pkg2 = addDependency(pkg2, "react", "^18.0.0");
pkg2 = addDependency(pkg2, "typescript", "^5.0.0", "devDependencies");
pkg2 = bumpVersion(pkg2, "minor");
console.log("新版本:", pkg2.version);
console.log("依赖:", Object.keys(pkg2.dependencies || {}));
console.log("开发依赖:", Object.keys(pkg2.devDependencies || {}));
console.log("");

// 示例 5: 排序
console.log("📋 示例 5: 排序 package.json");
const unsorted = {
  scripts: {
    test: "vitest",
    build: "tsc",
    dev: "vite",
  },
  version: "2.0.0",
  name: "sorted-app",
  dependencies: {
    zod: "^3.0.0",
    axios: "^1.0.0",
  },
};
const sorted = sortPackageJson(unsorted, {
  sortDependencies: true,
  sortScripts: true,
});
console.log(prettifyPackageJson(sorted));
