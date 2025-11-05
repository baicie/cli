import { describe, it, expect } from 'vitest'
import {
  formatPackageJson,
  formatPackageJsonString,
  prettifyPackageJson,
} from '../src/format'
import { createPackageJson } from '../src/create'

describe('formatPackageJson', () => {
  it('应该格式化 package.json', () => {
    const pkg = createPackageJson({
      name: 'test',
      version: '1.0.0',
    })
    const formatted = formatPackageJson(pkg)

    expect(formatted).toContain('"name": "test"')
    expect(formatted).toContain('"version": "1.0.0"')
    expect(formatted.endsWith('\n')).toBe(true)
  })

  it('应该支持自定义缩进', () => {
    const pkg = createPackageJson({ name: 'test' })
    const formatted = formatPackageJson(pkg, { indent: 4 })

    const lines = formatted.split('\n')
    expect(lines[1]).toMatch(/^    "/)
  })

  it('应该排序依赖', () => {
    const pkg = createPackageJson({ name: 'test' })
    pkg.dependencies = {
      'z-package': '^1.0.0',
      'a-package': '^1.0.0',
    }
    const formatted = formatPackageJson(pkg, { sortDependencies: true })
    const aIndex = formatted.indexOf('a-package')
    const zIndex = formatted.indexOf('z-package')

    expect(aIndex).toBeLessThan(zIndex)
  })

  it('应该排序字段', () => {
    const pkg = {
      version: '1.0.0',
      name: 'test',
    } as any
    const formatted = formatPackageJson(pkg, { sortFields: true })
    const nameIndex = formatted.indexOf('"name"')
    const versionIndex = formatted.indexOf('"version"')

    expect(nameIndex).toBeLessThan(versionIndex)
  })
})

describe('formatPackageJsonString', () => {
  it('应该格式化 JSON 字符串', () => {
    const jsonString = '{"name":"test","version":"1.0.0"}'
    const formatted = formatPackageJsonString(jsonString)

    expect(formatted).toContain('"name": "test"')
    expect(formatted).toContain('"version": "1.0.0"')
  })

  it('应该在无效 JSON 时抛出错误', () => {
    expect(() => {
      formatPackageJsonString('invalid json')
    }).toThrow()
  })
})

describe('prettifyPackageJson', () => {
  it('应该使用默认选项美化 package.json', () => {
    const pkg = createPackageJson({
      name: 'test',
      version: '1.0.0',
    })
    const prettified = prettifyPackageJson(pkg)

    expect(prettified).toContain('"name": "test"')
    expect(prettified.endsWith('\n')).toBe(true)
  })
})
