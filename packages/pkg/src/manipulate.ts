/**
 * 操作 package.json
 */

import type { PackageJson } from './types'
import { deepClone } from './utils'

/**
 * 添加依赖
 * @param data - package.json 数据对象
 * @param name - 包名
 * @param version - 版本号
 * @param type - 依赖类型
 * @returns 更新后的 package.json
 */
export function addDependency(
  data: PackageJson,
  name: string,
  version: string,
  type:
    | 'dependencies'
    | 'devDependencies'
    | 'peerDependencies'
    | 'optionalDependencies' = 'dependencies',
): PackageJson {
  const result = deepClone(data)

  if (!result[type]) {
    result[type] = {}
  }

  result[type]![name] = version

  return result
}

/**
 * 移除依赖
 * @param data - package.json 数据对象
 * @param name - 包名
 * @param type - 依赖类型，如果不指定则从所有类型中移除
 * @returns 更新后的 package.json
 */
export function removeDependency(
  data: PackageJson,
  name: string,
  type?:
    | 'dependencies'
    | 'devDependencies'
    | 'peerDependencies'
    | 'optionalDependencies',
): PackageJson {
  const result = deepClone(data)

  if (type) {
    if (result[type]) {
      delete result[type]![name]
    }
  } else {
    // 从所有依赖类型中移除
    const types: Array<keyof PackageJson> = [
      'dependencies',
      'devDependencies',
      'peerDependencies',
      'optionalDependencies',
    ]

    for (const t of types) {
      if (result[t]) {
        delete (result[t] as Record<string, string>)[name]
      }
    }
  }

  return result
}

/**
 * 更新依赖版本
 * @param data - package.json 数据对象
 * @param name - 包名
 * @param version - 新版本号
 * @returns 更新后的 package.json
 */
export function updateDependencyVersion(
  data: PackageJson,
  name: string,
  version: string,
): PackageJson {
  const result = deepClone(data)

  const types: Array<keyof PackageJson> = [
    'dependencies',
    'devDependencies',
    'peerDependencies',
    'optionalDependencies',
  ]

  for (const type of types) {
    if (result[type] && name in result[type]!) {
      ;(result[type] as Record<string, string>)[name] = version
    }
  }

  return result
}

/**
 * 添加或更新 script
 * @param data - package.json 数据对象
 * @param name - script 名称
 * @param command - script 命令
 * @returns 更新后的 package.json
 */
export function addScript(
  data: PackageJson,
  name: string,
  command: string,
): PackageJson {
  const result = deepClone(data)

  if (!result.scripts) {
    result.scripts = {}
  }

  result.scripts[name] = command

  return result
}

/**
 * 移除 script
 * @param data - package.json 数据对象
 * @param name - script 名称
 * @returns 更新后的 package.json
 */
export function removeScript(data: PackageJson, name: string): PackageJson {
  const result = deepClone(data)

  if (result.scripts) {
    delete result.scripts[name]
  }

  return result
}

/**
 * 批量添加依赖
 * @param data - package.json 数据对象
 * @param dependencies - 依赖对象
 * @param type - 依赖类型
 * @returns 更新后的 package.json
 */
export function addDependencies(
  data: PackageJson,
  dependencies: Record<string, string>,
  type:
    | 'dependencies'
    | 'devDependencies'
    | 'peerDependencies'
    | 'optionalDependencies' = 'dependencies',
): PackageJson {
  const result = deepClone(data)

  if (!result[type]) {
    result[type] = {}
  }

  Object.assign(result[type]!, dependencies)

  return result
}

/**
 * 批量移除依赖
 * @param data - package.json 数据对象
 * @param names - 包名数组
 * @param type - 依赖类型，如果不指定则从所有类型中移除
 * @returns 更新后的 package.json
 */
export function removeDependencies(
  data: PackageJson,
  names: string[],
  type?:
    | 'dependencies'
    | 'devDependencies'
    | 'peerDependencies'
    | 'optionalDependencies',
): PackageJson {
  let result = deepClone(data)

  for (const name of names) {
    result = removeDependency(result, name, type)
  }

  return result
}

/**
 * 设置字段值
 * @param data - package.json 数据对象
 * @param field - 字段名
 * @param value - 字段值
 * @returns 更新后的 package.json
 */
export function setField(
  data: PackageJson,
  field: string,
  value: any,
): PackageJson {
  const result = deepClone(data)
  result[field] = value
  return result
}

/**
 * 移除字段
 * @param data - package.json 数据对象
 * @param field - 字段名
 * @returns 更新后的 package.json
 */
export function removeField(data: PackageJson, field: string): PackageJson {
  const result = deepClone(data)
  delete result[field]
  return result
}

/**
 * 添加关键词
 * @param data - package.json 数据对象
 * @param keywords - 关键词数组
 * @returns 更新后的 package.json
 */
export function addKeywords(
  data: PackageJson,
  keywords: string[],
): PackageJson {
  const result = deepClone(data)

  if (!result.keywords) {
    result.keywords = []
  }

  // 去重添加
  for (const keyword of keywords) {
    if (!result.keywords.includes(keyword)) {
      result.keywords.push(keyword)
    }
  }

  return result
}

/**
 * 移除关键词
 * @param data - package.json 数据对象
 * @param keywords - 关键词数组
 * @returns 更新后的 package.json
 */
export function removeKeywords(
  data: PackageJson,
  keywords: string[],
): PackageJson {
  const result = deepClone(data)

  if (result.keywords) {
    result.keywords = result.keywords.filter(k => !keywords.includes(k))
  }

  return result
}

/**
 * 增加版本号
 * @param data - package.json 数据对象
 * @param type - 版本类型：major, minor, patch
 * @returns 更新后的 package.json
 */
export function bumpVersion(
  data: PackageJson,
  type: 'major' | 'minor' | 'patch' = 'patch',
): PackageJson {
  const result = deepClone(data)

  if (!result.version) {
    result.version = '0.1.0'
    return result
  }

  const parts = result.version.split('.').map(Number)

  switch (type) {
    case 'major':
      parts[0]++
      parts[1] = 0
      parts[2] = 0
      break
    case 'minor':
      parts[1]++
      parts[2] = 0
      break
    case 'patch':
      parts[2]++
      break
  }

  result.version = parts.join('.')

  return result
}
