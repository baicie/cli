/**
 * 格式化 package.json
 */

import type { FormatOptions, PackageJson } from "./types";
import { STANDARD_FIELDS_ORDER } from "./constants";
import { sortObject } from "./utils";

/**
 * 格式化 package.json 内容
 * @param data - package.json 数据对象
 * @param options - 格式化选项
 * @returns 格式化后的字符串
 */
export function formatPackageJson(
  data: PackageJson,
  options: FormatOptions = {}
): string {
  const {
    indent = 2,
    endOfLine = true,
    sortFields = true,
    sortScripts = false,
    sortDependencies = true,
  } = options;

  let formatted = { ...data };

  // 排序字段
  if (sortFields) {
    const fieldsOrder = Array.isArray(sortFields)
      ? sortFields
      : STANDARD_FIELDS_ORDER;
    formatted = sortObjectByKeys(formatted, fieldsOrder);
  }

  // 排序 scripts
  if (sortScripts && formatted.scripts) {
    formatted.scripts = sortObject(formatted.scripts);
  }

  // 排序依赖
  if (sortDependencies) {
    if (formatted.dependencies) {
      formatted.dependencies = sortObject(formatted.dependencies);
    }
    if (formatted.devDependencies) {
      formatted.devDependencies = sortObject(formatted.devDependencies);
    }
    if (formatted.peerDependencies) {
      formatted.peerDependencies = sortObject(formatted.peerDependencies);
    }
    if (formatted.optionalDependencies) {
      formatted.optionalDependencies = sortObject(
        formatted.optionalDependencies
      );
    }
  }

  // 转换为 JSON 字符串
  const spaces = typeof indent === "number" ? indent : 2;
  let result = JSON.stringify(formatted, null, spaces);

  // 添加换行符
  if (endOfLine && !result.endsWith("\n")) {
    result += "\n";
  }

  return result;
}

/**
 * 格式化 package.json 文件内容（从字符串）
 * @param content - package.json 文件内容字符串
 * @param options - 格式化选项
 * @returns 格式化后的字符串
 */
export function formatPackageJsonString(
  content: string,
  options: FormatOptions = {}
): string {
  try {
    const data = JSON.parse(content) as PackageJson;
    return formatPackageJson(data, options);
  } catch (error) {
    throw new Error(
      `无效的 JSON 格式: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

/**
 * 按照指定顺序排序对象的键
 * @param obj - 要排序的对象
 * @param order - 键的排序顺序
 * @returns 排序后的对象
 */
function sortObjectByKeys<T extends Record<string, any>>(
  obj: T,
  order: string[]
): T {
  const result = {} as T;
  const keys = Object.keys(obj);

  // 先添加在 order 中的键
  for (const key of order) {
    if (key in obj) {
      result[key as keyof T] = obj[key];
    }
  }

  // 再添加不在 order 中的键（保持原顺序）
  for (const key of keys) {
    if (!order.includes(key)) {
      result[key as keyof T] = obj[key];
    }
  }

  return result;
}

/**
 * 美化 package.json（使用默认最佳实践）
 * @param data - package.json 数据对象
 * @returns 格式化后的字符串
 */
export function prettifyPackageJson(data: PackageJson): string {
  return formatPackageJson(data, {
    indent: 2,
    endOfLine: true,
    sortFields: true,
    sortScripts: false,
    sortDependencies: true,
  });
}
