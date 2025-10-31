/**
 * 验证 package.json
 */

import type { PackageJson, ValidationError, ValidationResult } from './types'
import { REQUIRED_FIELDS, VALID_LICENSES } from './constants'

/**
 * 验证 package.json
 * @param data - package.json 数据对象
 * @param strict - 是否启用严格模式，默认 false
 * @returns 验证结果
 */
export function validatePackageJson(
  data: PackageJson,
  strict = false,
): ValidationResult {
  const errors: ValidationError[] = []
  const warnings: ValidationError[] = []

  // 验证必需字段
  for (const field of REQUIRED_FIELDS) {
    if (!(field in data) || !data[field]) {
      errors.push({
        field,
        message: `缺少必需字段: ${field}`,
      })
    }
  }

  // 验证 name
  if (data.name) {
    const nameErrors = validateName(data.name)
    errors.push(...nameErrors)
  }

  // 验证 version
  if (data.version) {
    const versionErrors = validateVersion(data.version)
    errors.push(...versionErrors)
  }

  // 验证 license
  if (data.license && strict) {
    if (!VALID_LICENSES.includes(data.license)) {
      warnings.push({
        field: 'license',
        message: `不常见的 license: ${data.license}`,
        value: data.license,
      })
    }
  }

  // 验证 main 文件
  if (data.main && strict) {
    if (
      !data.main.endsWith('.js') &&
      !data.main.endsWith('.mjs') &&
      !data.main.endsWith('.cjs')
    ) {
      warnings.push({
        field: 'main',
        message: 'main 字段应该指向一个 .js/.mjs/.cjs 文件',
        value: data.main,
      })
    }
  }

  // 验证 type 字段
  if (data.type && data.type !== 'module' && data.type !== 'commonjs') {
    errors.push({
      field: 'type',
      message: 'type 字段必须是 "module" 或 "commonjs"',
      value: data.type,
    })
  }

  // 验证依赖版本
  const depFields = [
    'dependencies',
    'devDependencies',
    'peerDependencies',
    'optionalDependencies',
  ] as const
  for (const field of depFields) {
    if (data[field]) {
      const depErrors = validateDependencies(data[field]!, field)
      errors.push(...depErrors)
    }
  }

  // 验证 scripts
  if (data.scripts && strict) {
    const scriptWarnings = validateScripts(data.scripts)
    warnings.push(...scriptWarnings)
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings: warnings.length > 0 ? warnings : undefined,
  }
}

/**
 * 验证包名
 * @param name - 包名
 * @returns 错误列表
 */
export function validateName(name: string): ValidationError[] {
  const errors: ValidationError[] = []

  if (!name) {
    errors.push({
      field: 'name',
      message: '包名不能为空',
    })
    return errors
  }

  // 长度限制
  if (name.length > 214) {
    errors.push({
      field: 'name',
      message: '包名长度不能超过 214 个字符',
      value: name,
    })
  }

  // 不能以点或下划线开头
  if (name.startsWith('.') || name.startsWith('_')) {
    errors.push({
      field: 'name',
      message: '包名不能以 . 或 _ 开头',
      value: name,
    })
  }

  // 不能包含大写字母
  if (name !== name.toLowerCase()) {
    errors.push({
      field: 'name',
      message: '包名不能包含大写字母',
      value: name,
    })
  }

  // 不能包含特殊字符（除了 @, /, -, _）
  if (!/^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(name)) {
    errors.push({
      field: 'name',
      message: '包名包含无效字符',
      value: name,
    })
  }

  // 不能是 node 核心模块名
  const coreModules = [
    'assert',
    'buffer',
    'child_process',
    'cluster',
    'crypto',
    'dgram',
    'dns',
    'domain',
    'events',
    'fs',
    'http',
    'https',
    'net',
    'os',
    'path',
    'punycode',
    'querystring',
    'readline',
    'stream',
    'string_decoder',
    'timers',
    'tls',
    'tty',
    'url',
    'util',
    'v8',
    'vm',
    'zlib',
  ]
  if (coreModules.includes(name)) {
    errors.push({
      field: 'name',
      message: '包名不能与 Node.js 核心模块同名',
      value: name,
    })
  }

  return errors
}

/**
 * 验证版本号
 * @param version - 版本号
 * @returns 错误列表
 */
export function validateVersion(version: string): ValidationError[] {
  const errors: ValidationError[] = []

  if (!version) {
    errors.push({
      field: 'version',
      message: '版本号不能为空',
    })
    return errors
  }

  // 简单的 semver 验证
  const semverRegex =
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/

  if (!semverRegex.test(version)) {
    errors.push({
      field: 'version',
      message: '版本号格式不符合 semver 规范',
      value: version,
    })
  }

  return errors
}

/**
 * 验证依赖
 * @param dependencies - 依赖对象
 * @param field - 字段名
 * @returns 错误列表
 */
function validateDependencies(
  dependencies: Record<string, string>,
  field: string,
): ValidationError[] {
  const errors: ValidationError[] = []

  for (const [name, version] of Object.entries(dependencies)) {
    if (!version) {
      errors.push({
        field,
        message: `依赖 ${name} 缺少版本号`,
        value: name,
      })
    }

    // 验证版本范围格式（简单验证）
    if (version && !isValidVersionRange(version)) {
      errors.push({
        field,
        message: `依赖 ${name} 的版本号格式无效: ${version}`,
        value: version,
      })
    }
  }

  return errors
}

/**
 * 验证 scripts
 * @param scripts - scripts 对象
 * @returns 警告列表
 */
function validateScripts(scripts: Record<string, string>): ValidationError[] {
  const warnings: ValidationError[] = []

  for (const [name, script] of Object.entries(scripts)) {
    // 检查是否有空 script
    if (!script || script.trim() === '') {
      warnings.push({
        field: 'scripts',
        message: `script "${name}" 为空`,
        value: name,
      })
    }
  }

  return warnings
}

/**
 * 检查版本范围是否有效
 * @param versionRange - 版本范围字符串
 * @returns 是否有效
 */
function isValidVersionRange(versionRange: string): boolean {
  // 允许的版本格式
  const patterns = [
    /^\d+\.\d+\.\d+$/, // 精确版本 1.2.3
    /^[\^~]?\d+\.\d+\.\d+/, // ^1.2.3 或 ~1.2.3
    /^\*$/, // *
    /^>=?\d+\.\d+\.\d+/, // >=1.2.3 或 >1.2.3
    /^<=?\d+\.\d+\.\d+/, // <=1.2.3 或 <1.2.3
    /^latest$/, // latest
    /^workspace:/, // workspace:
    /^(https?|git|file):/, // URL
    /^[a-z-]+\/[a-z-]+#/, // GitHub shorthand
  ]

  return patterns.some(pattern => pattern.test(versionRange))
}

/**
 * 快速检查 package.json 是否有效（仅检查必需字段）
 * @param data - package.json 数据对象
 * @returns 是否有效
 */
export function isValidPackageJson(data: PackageJson): boolean {
  return REQUIRED_FIELDS.every(field => field in data && !!data[field])
}
