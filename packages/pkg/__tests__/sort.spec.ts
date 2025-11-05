import { describe, it, expect } from 'vitest'
import {
  sortPackageJson,
  sortDependencies,
  sortScripts,
  sortScriptsByOrder,
} from '../src/sort'
import { createPackageJson } from '../src/create'

describe('sortDependencies', () => {
  it('应该按字母顺序排序依赖', () => {
    const pkg = createPackageJson({ name: 'test' })
    pkg.dependencies = {
      'z-package': '^1.0.0',
      'a-package': '^1.0.0',
      'm-package': '^1.0.0',
    }
    const result = sortDependencies(pkg)

    const keys = Object.keys(result.dependencies!)
    expect(keys[0]).toBe('a-package')
    expect(keys[1]).toBe('m-package')
    expect(keys[2]).toBe('z-package')
  })

  it('应该排序所有依赖类型', () => {
    const pkg = createPackageJson({ name: 'test' })
    pkg.dependencies = { 'z-pkg': '^1.0.0', 'a-pkg': '^1.0.0' }
    pkg.devDependencies = { 'z-dev': '^1.0.0', 'a-dev': '^1.0.0' }
    const result = sortDependencies(pkg)

    expect(Object.keys(result.dependencies!)[0]).toBe('a-pkg')
    expect(Object.keys(result.devDependencies!)[0]).toBe('a-dev')
  })
})

describe('sortScripts', () => {
  it('应该按字母顺序排序脚本', () => {
    const pkg = createPackageJson({ name: 'test' })
    pkg.scripts = {
      'z-script': 'echo z',
      'a-script': 'echo a',
      'm-script': 'echo m',
    }
    const result = sortScripts(pkg)

    const keys = Object.keys(result.scripts!)
    expect(keys[0]).toBe('a-script')
    expect(keys[1]).toBe('m-script')
    expect(keys[2]).toBe('z-script')
  })
})

describe('sortScriptsByOrder', () => {
  it('应该按指定顺序排序脚本', () => {
    const pkg = createPackageJson({ name: 'test' })
    pkg.scripts = {
      build: 'build',
      dev: 'dev',
      test: 'test',
      lint: 'lint',
    }
    const result = sortScriptsByOrder(pkg, ['dev', 'build', 'test'])

    const keys = Object.keys(result.scripts!)
    expect(keys[0]).toBe('dev')
    expect(keys[1]).toBe('build')
    expect(keys[2]).toBe('test')
    expect(keys[3]).toBe('lint')
  })
})

describe('sortPackageJson', () => {
  it('应该排序整个 package.json', () => {
    const pkg = {
      version: '1.0.0',
      name: 'test',
      description: 'Test',
    } as any
    const result = sortPackageJson(pkg)

    const keys = Object.keys(result)
    expect(keys[0]).toBe('name')
  })

  it('应该支持自定义排序选项', () => {
    const pkg = createPackageJson({ name: 'test' })
    pkg.dependencies = { z: '^1.0.0', a: '^1.0.0' }
    const result = sortPackageJson(pkg, {
      sortDependencies: true,
      sortScripts: false,
    })

    expect(Object.keys(result.dependencies!)[0]).toBe('a')
  })
})
