/**
 * @baicie/pkg
 * A powerful toolkit for creating, formatting, validating and manipulating package.json files
 */

// 导出类型
export type * from "./types";

// 导出常量
export * from "./constants";

// 导出格式化功能
export {
  formatPackageJson,
  formatPackageJsonString,
  prettifyPackageJson,
} from "./format";

// 导出创建功能
export {
  createPackageJson,
  createPackageJsonString,
  clonePackageJson,
  createMinimalPackageJson,
  createByProjectType,
} from "./create";

// 导出验证功能
export {
  validatePackageJson,
  validateName,
  validateVersion,
  isValidPackageJson,
} from "./validate";

// 导出操作功能
export {
  addDependency,
  removeDependency,
  updateDependencyVersion,
  addScript,
  removeScript,
  addDependencies,
  removeDependencies,
  setField,
  removeField,
  addKeywords,
  removeKeywords,
  bumpVersion,
} from "./manipulate";

// 导出排序功能
export {
  sortPackageJson,
  sortDependencies,
  sortScripts,
  sortScriptsByOrder,
} from "./sort";

// 导出工具函数
export {
  sortObject,
  deepClone,
  safeParseJson,
  isEmptyObject,
  cleanObject,
  mergePackageJson,
  compareVersions,
  normalizePackageName,
  getPackageScope,
  isScopedPackage,
  formatDependencyList,
} from "./utils";
