/**
 * 工具函数
 */

import type { PackageJson } from './types'

/**
 * 对象按键排序
 * @param obj - 要排序的对象
 * @returns 排序后的对象
 */
export function sortObject<T extends Record<string, any>>(obj: T): T {
  const result = {} as T
  const keys = Object.keys(obj).sort()

  for (const key of keys) {
    result[key as keyof T] = obj[key]
  }

  return result
}

/**
 * 深度克隆对象
 * @param obj - 要克隆的对象
 * @returns 克隆后的对象
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * 安全地解析 JSON 字符串
 * @param content - JSON 字符串
 * @returns 解析后的对象，解析失败返回 null
 */
export function safeParseJson(content: string): PackageJson | null {
  try {
    return JSON.parse(content) as PackageJson
  } catch {
    return null
  }
}

/**
 * 检查是否为空对象
 * @param obj - 要检查的对象
 * @returns 是否为空
 */
export function isEmptyObject(obj: any): boolean {
  return !!(obj && typeof obj === 'object' && Object.keys(obj).length === 0)
}

/**
 * 移除对象中的空值（undefined, null, 空字符串, 空对象）
 * @param obj - 要清理的对象
 * @returns 清理后的对象
 */
export function cleanObject<T extends Record<string, any>>(obj: T): Partial<T> {
  const result: any = {}

  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null || value === '') {
      continue
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      if (!isEmptyObject(value)) {
        result[key] = cleanObject(value)
      }
    } else if (Array.isArray(value)) {
      if (value.length > 0) {
        result[key] = value
      }
    } else {
      result[key] = value
    }
  }

  return result
}

/**
 * 合并两个 package.json 对象
 * @param base - 基础对象
 * @param override - 覆盖对象
 * @returns 合并后的对象
 */
export function mergePackageJson(
  base: PackageJson,
  override: Partial<PackageJson>,
): PackageJson {
  const result = deepClone(base)

  for (const [key, value] of Object.entries(override)) {
    if (value === undefined) {
      continue
    }

    // 对于依赖字段，进行合并而不是覆盖
    if (
      (key === 'dependencies' ||
        key === 'devDependencies' ||
        key === 'peerDependencies' ||
        key === 'optionalDependencies' ||
        key === 'scripts') &&
      typeof value === 'object' &&
      !Array.isArray(value)
    ) {
      result[key] = {
        ...result[key],
        ...value,
      }
    } else {
      result[key] = value
    }
  }

  return result
}

/**
 * 比较两个版本号
 * @param v1 - 版本号 1
 * @param v2 - 版本号 2
 * @returns -1: v1 < v2, 0: v1 = v2, 1: v1 > v2
 */
export function compareVersions(v1: string, v2: string): number {
  // 移除前缀符号
  const clean1 = v1.replace(/^[^0-9]+/, '')
  const clean2 = v2.replace(/^[^0-9]+/, '')

  const parts1 = clean1.split('.').map(Number)
  const parts2 = clean2.split('.').map(Number)

  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const num1 = parts1[i] || 0
    const num2 = parts2[i] || 0

    if (num1 > num2) return 1
    if (num1 < num2) return -1
  }

  return 0
}

/**
 * 规范化包名（移除作用域）
 * @param name - 包名
 * @returns 规范化后的包名
 */
export function normalizePackageName(name: string): string {
  return name.replace(/^@[^/]+\//, '').replace(/\b[A-Z]/g, c => c.toLowerCase())
}

/**
 * 获取包的作用域
 * @param name - 包名
 * @returns 作用域，如果没有则返回 null
 */
export function getPackageScope(name: string): string | null {
  const match = name.match(/^@([^/]+)\//)
  return match ? match[1] : null
}

/**
 * 检查是否为作用域包
 * @param name - 包名
 * @returns 是否为作用域包
 */
export function isScopedPackage(name: string): boolean {
  return name.startsWith('@') && name.includes('/')
}

/**
 * 格式化依赖列表为字符串
 * @param dependencies - 依赖对象
 * @returns 格式化的字符串数组
 */
export function formatDependencyList(
  dependencies?: Record<string, string>,
): string[] {
  if (!dependencies) {
    return []
  }

  return Object.entries(dependencies).map(
    ([name, version]) => `${name}@${version}`,
  )
}
