/**
 * 排序功能
 */

import type { PackageJson, SortOptions } from './types'
import { STANDARD_FIELDS_ORDER } from './constants'
import { sortObject } from './utils'

/**
 * 排序 package.json
 * @param data - package.json 数据对象
 * @param options - 排序选项
 * @returns 排序后的对象
 */
export function sortPackageJson(
  data: PackageJson,
  options: SortOptions = {},
): PackageJson {
  const {
    fieldsOrder = STANDARD_FIELDS_ORDER,
    sortDependencies = true,
    sortScripts = false,
  } = options

  let result = { ...data }

  // 排序顶层字段
  result = sortByFieldsOrder(result, fieldsOrder)

  // 排序依赖
  if (sortDependencies) {
    if (result.dependencies) {
      result.dependencies = sortObject(result.dependencies)
    }
    if (result.devDependencies) {
      result.devDependencies = sortObject(result.devDependencies)
    }
    if (result.peerDependencies) {
      result.peerDependencies = sortObject(result.peerDependencies)
    }
    if (result.optionalDependencies) {
      result.optionalDependencies = sortObject(result.optionalDependencies)
    }
  }

  // 排序 scripts
  if (sortScripts && result.scripts) {
    result.scripts = sortObject(result.scripts)
  }

  return result
}

/**
 * 按字段顺序排序对象
 * @param data - 数据对象
 * @param order - 字段顺序
 * @returns 排序后的对象
 */
function sortByFieldsOrder<T extends Record<string, any>>(
  data: T,
  order: string[],
): T {
  const result = {} as T
  const keys = Object.keys(data)

  // 先添加在 order 中的字段
  for (const key of order) {
    if (key in data) {
      result[key as keyof T] = data[key]
    }
  }

  // 再添加不在 order 中的字段（保持原顺序）
  for (const key of keys) {
    if (!order.includes(key)) {
      result[key as keyof T] = data[key]
    }
  }

  return result
}

/**
 * 排序所有依赖字段
 * @param data - package.json 数据对象
 * @returns 排序后的对象
 */
export function sortDependencies(data: PackageJson): PackageJson {
  const result = { ...data }

  if (result.dependencies) {
    result.dependencies = sortObject(result.dependencies)
  }
  if (result.devDependencies) {
    result.devDependencies = sortObject(result.devDependencies)
  }
  if (result.peerDependencies) {
    result.peerDependencies = sortObject(result.peerDependencies)
  }
  if (result.optionalDependencies) {
    result.optionalDependencies = sortObject(result.optionalDependencies)
  }

  return result
}

/**
 * 排序 scripts
 * @param data - package.json 数据对象
 * @returns 排序后的对象
 */
export function sortScripts(data: PackageJson): PackageJson {
  const result = { ...data }

  if (result.scripts) {
    result.scripts = sortObject(result.scripts)
  }

  return result
}

/**
 * 使用自定义排序规则排序 scripts
 * @param data - package.json 数据对象
 * @param order - script 名称的排序顺序
 * @returns 排序后的对象
 */
export function sortScriptsByOrder(
  data: PackageJson,
  order: string[],
): PackageJson {
  const result = { ...data }

  if (result.scripts) {
    const sorted: Record<string, string> = {}
    const scripts = result.scripts

    // 先添加在 order 中的 script
    for (const name of order) {
      if (name in scripts) {
        sorted[name] = scripts[name]
      }
    }

    // 再添加不在 order 中的 script（字母序）
    const remaining = Object.keys(scripts)
      .filter(name => !order.includes(name))
      .sort()

    for (const name of remaining) {
      sorted[name] = scripts[name]
    }

    result.scripts = sorted
  }

  return result
}
