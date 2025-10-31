/**
 * 创建 package.json
 */

import type { CreateOptions, PackageJson } from './types'
import { PRESETS } from './constants'

/**
 * 创建 package.json 对象
 * @param options - 创建选项
 * @returns package.json 对象
 */
export function createPackageJson(options: CreateOptions = {}): PackageJson {
  const {
    name = '',
    version = '0.1.0',
    description = '',
    author,
    license = 'MIT',
    type = 'module',
    private: isPrivate,
    preset = 'basic',
  } = options

  // 获取预设模板（深拷贝以避免只读属性问题）
  const template = PRESETS[preset]
    ? JSON.parse(JSON.stringify(PRESETS[preset]))
    : JSON.parse(JSON.stringify(PRESETS.basic))

  // 合并用户选项
  const packageJson: PackageJson = {
    ...template,
    name: name || template.name,
    version: version || template.version,
    description: description || template.description,
    license: license || template.license,
  }

  // 添加 author
  if (author) {
    packageJson.author = author
  }

  // 添加 type
  if (type && preset !== 'basic') {
    packageJson.type = type
  }

  // 添加 private
  if (typeof isPrivate === 'boolean') {
    packageJson.private = isPrivate
  }

  return packageJson
}

/**
 * 创建 package.json 字符串
 * @param options - 创建选项
 * @param indent - 缩进空格数，默认 2
 * @returns 格式化的 JSON 字符串
 */
export function createPackageJsonString(
  options: CreateOptions = {},
  indent = 2,
): string {
  const packageJson = createPackageJson(options)
  return JSON.stringify(packageJson, null, indent) + '\n'
}

/**
 * 从现有的 package.json 创建新的（复制并修改）
 * @param base - 基础 package.json 对象
 * @param overrides - 要覆盖的字段
 * @returns 新的 package.json 对象
 */
export function clonePackageJson(
  base: PackageJson,
  overrides: Partial<PackageJson> = {},
): PackageJson {
  return {
    ...JSON.parse(JSON.stringify(base)),
    ...overrides,
  }
}

/**
 * 创建空的 package.json（最小化）
 * @param name - 包名
 * @param version - 版本号
 * @returns 最小化的 package.json 对象
 */
export function createMinimalPackageJson(
  name?: string,
  version = '0.1.0',
): PackageJson {
  const packageJson: PackageJson = {
    version,
  }

  if (name) {
    packageJson.name = name
  }

  return packageJson
}

/**
 * 根据项目类型创建推荐的 package.json
 * @param projectType - 项目类型
 * @param name - 包名
 * @returns package.json 对象
 */
export function createByProjectType(
  projectType: 'library' | 'cli' | 'app' | 'monorepo',
  name?: string,
): PackageJson {
  const presetMap = {
    library: 'library',
    cli: 'cli',
    app: 'basic',
    monorepo: 'monorepo',
  } as const

  return createPackageJson({
    name,
    preset: presetMap[projectType] as any,
  })
}
