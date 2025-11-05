import { describe, expect, it } from 'vitest'
import {
  isValidPackageJson,
  validateName,
  validatePackageJson,
  validateVersion,
} from '../src/validate'

describe('validateName', () => {
  it('应该验证有效的包名', () => {
    expect(validateName('valid-package-name')).toEqual([])
    expect(validateName('@scope/package')).toEqual([])
    expect(validateName('package-name-123')).toEqual([])
  })

  it('应该拒绝无效的包名', () => {
    expect(validateName('Invalid-Package')).not.toEqual([])
    expect(validateName('包名')).not.toEqual([])
    expect(validateName('')).not.toEqual([])
    expect(validateName('package name')).not.toEqual([])
  })
})

describe('validateVersion', () => {
  it('应该验证有效的版本号', () => {
    expect(validateVersion('1.0.0')).toEqual([])
    expect(validateVersion('1.2.3')).toEqual([])
    expect(validateVersion('0.0.1')).toEqual([])
    expect(validateVersion('1.0.0-beta.1')).toEqual([])
  })

  it('应该拒绝无效的版本号', () => {
    expect(validateVersion('1.0')).not.toEqual([])
    expect(validateVersion('v1.0.0')).not.toEqual([])
    expect(validateVersion('invalid')).not.toEqual([])
  })
})

describe('validatePackageJson', () => {
  it('应该验证有效的 package.json', () => {
    const result = validatePackageJson({
      name: 'test-package',
      version: '1.0.0',
    })

    expect(result.valid).toBe(true)
    expect(result.errors).toEqual([])
  })

  it('应该检测缺少必需字段', () => {
    const result = validatePackageJson({} as any)

    expect(result.valid).toBe(false)
    expect(result.errors.length).toBeGreaterThan(0)
  })

  it('应该验证 type 字段', () => {
    const result1 = validatePackageJson({
      name: 'test',
      version: '1.0.0',
      type: 'module',
    })
    expect(result1.valid).toBe(true)

    const result2 = validatePackageJson({
      name: 'test',
      version: '1.0.0',
      type: 'invalid' as any,
    })
    expect(result2.valid).toBe(false)
  })

  it('应该在严格模式下给出警告', () => {
    const result = validatePackageJson(
      {
        name: 'test',
        version: '1.0.0',
        license: 'UNKNOWN',
        main: 'index',
      },
      true,
    )

    expect(result.warnings).toBeDefined()
    expect(result.warnings!.length).toBeGreaterThan(0)
  })

  it('应该验证依赖版本格式', () => {
    const result = validatePackageJson({
      name: 'test',
      version: '1.0.0',
      dependencies: {
        'invalid-pkg': 'invalid-version',
      },
    })

    expect(result.valid).toBe(false)
  })
})

describe('isValidPackageJson', () => {
  it('应该返回布尔值', () => {
    expect(
      isValidPackageJson({
        name: 'test',
        version: '1.0.0',
      }),
    ).toBe(true)

    expect(isValidPackageJson({} as any)).toBe(false)
  })
})
