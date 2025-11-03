import { input, select } from '@inquirer/prompts'
import { isValidPackageName } from '../util'

/**
 * 询问包名
 */
export async function askPackageName(defaultName?: string): Promise<string> {
  return input({
    message: '包名 (package name)?',
    default: defaultName || '',
    validate: value => {
      if (!value || value.trim() === '') {
        return '包名不能为空'
      }
      if (!isValidPackageName(value)) {
        return '请输入有效的包名（只能包含小写字母、数字、连字符、下划线和点，可以包含 @scope/）'
      }
      return true
    },
  })
}

/**
 * 询问包版本
 */
export async function askPackageVersion(
  defaultVersion?: string,
): Promise<string> {
  return input({
    message: '版本号 (version)?',
    default: defaultVersion || '0.1.0',
    validate: value => {
      if (!value || value.trim() === '') {
        return '版本号不能为空'
      }
      // 简单的版本号验证（semver 格式）
      if (!/^\d+\.\d+\.\d+/.test(value)) {
        return '请输入有效的版本号（格式: x.y.z，例如 0.1.0）'
      }
      return true
    },
  })
}

/**
 * 询问包描述
 */
export async function askPackageDescription(): Promise<string> {
  return input({
    message: '包描述 (description)?',
    default: '',
  })
}

/**
 * 询问预设类型
 */
export async function askPackagePreset(
  defaultPreset?: 'basic' | 'library',
): Promise<'basic' | 'library'> {
  const choices = [
    {
      name: '基础项目 (basic)',
      value: 'basic' as const,
      description: '基础的项目配置，适用于应用开发',
    },
    {
      name: '库项目 (library)',
      value: 'library' as const,
      description: '库项目配置，适用于 npm 包开发',
    },
  ]

  return select({
    message: '请选择预设类型 (preset)?',
    choices,
    default: defaultPreset || 'basic',
  })
}
