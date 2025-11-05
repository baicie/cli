import { describe, expect, it } from 'vitest'
import {
  addDependencies,
  addDependency,
  addKeywords,
  addScript,
  bumpVersion,
  removeDependencies,
  removeDependency,
  removeField,
  removeKeywords,
  removeScript,
  setField,
  updateDependencyVersion,
} from '../src/manipulate'
import { createPackageJson } from '../src/create'

describe('addDependency', () => {
  it('应该添加依赖到 dependencies', () => {
    const pkg = createPackageJson({ name: 'test' })
    const result = addDependency(pkg, 'react', '^18.0.0')

    expect(result.dependencies?.react).toBe('^18.0.0')
    expect(pkg.dependencies).toBeUndefined() // 原对象不应被修改
  })

  it('应该添加依赖到 devDependencies', () => {
    const pkg = createPackageJson({ name: 'test' })
    const result = addDependency(pkg, 'typescript', '^5.0.0', 'devDependencies')

    expect(result.devDependencies?.typescript).toBe('^5.0.0')
  })

  it('应该更新已存在的依赖', () => {
    const pkg = createPackageJson({ name: 'test' })
    let result = addDependency(pkg, 'react', '^18.0.0')
    result = addDependency(result, 'react', '^18.1.0')

    expect(result.dependencies?.react).toBe('^18.1.0')
  })
})

describe('removeDependency', () => {
  it('应该移除指定类型的依赖', () => {
    const pkg = createPackageJson({ name: 'test' })
    let result = addDependency(pkg, 'react', '^18.0.0')
    result = removeDependency(result, 'react', 'dependencies')

    expect(result.dependencies?.react).toBeUndefined()
  })

  it('应该从所有类型中移除依赖', () => {
    const pkg = createPackageJson({ name: 'test' })
    let result = addDependency(pkg, 'react', '^18.0.0')
    result = addDependency(result, 'react', '^18.0.0', 'devDependencies')
    result = removeDependency(result, 'react')

    expect(result.dependencies?.react).toBeUndefined()
    expect(result.devDependencies?.react).toBeUndefined()
  })
})

describe('updateDependencyVersion', () => {
  it('应该更新依赖版本', () => {
    const pkg = createPackageJson({ name: 'test' })
    let result = addDependency(pkg, 'react', '^18.0.0')
    result = updateDependencyVersion(result, 'react', '^18.1.0')

    expect(result.dependencies?.react).toBe('^18.1.0')
  })

  it('应该更新 devDependencies 中的版本', () => {
    const pkg = createPackageJson({ name: 'test' })
    let result = addDependency(pkg, 'typescript', '^5.0.0', 'devDependencies')
    result = updateDependencyVersion(result, 'typescript', '^5.1.0')

    expect(result.devDependencies?.typescript).toBe('^5.1.0')
  })
})

describe('addScript', () => {
  it('应该添加脚本', () => {
    const pkg = createPackageJson({ name: 'test' })
    const result = addScript(pkg, 'dev', 'vite')

    expect(result.scripts?.dev).toBe('vite')
  })

  it('应该更新已存在的脚本', () => {
    const pkg = createPackageJson({ name: 'test' })
    let result = addScript(pkg, 'dev', 'vite')
    result = addScript(result, 'dev', 'vite --host')

    expect(result.scripts?.dev).toBe('vite --host')
  })
})

describe('removeScript', () => {
  it('应该移除脚本', () => {
    const pkg = createPackageJson({ name: 'test' })
    let result = addScript(pkg, 'dev', 'vite')
    result = removeScript(result, 'dev')

    expect(result.scripts?.dev).toBeUndefined()
  })
})

describe('addDependencies', () => {
  it('应该批量添加依赖', () => {
    const pkg = createPackageJson({ name: 'test' })
    const result = addDependencies(pkg, {
      react: '^18.0.0',
      vue: '^3.0.0',
    })

    expect(result.dependencies?.react).toBe('^18.0.0')
    expect(result.dependencies?.vue).toBe('^3.0.0')
  })
})

describe('removeDependencies', () => {
  it('应该批量移除依赖', () => {
    const pkg = createPackageJson({ name: 'test' })
    let result = addDependencies(pkg, {
      react: '^18.0.0',
      vue: '^3.0.0',
    })
    result = removeDependencies(result, ['react', 'vue'])

    expect(result.dependencies?.react).toBeUndefined()
    expect(result.dependencies?.vue).toBeUndefined()
  })
})

describe('setField', () => {
  it('应该设置字段值', () => {
    const pkg = createPackageJson({ name: 'test' })
    const result = setField(pkg, 'description', 'Test description')

    expect(result.description).toBe('Test description')
  })
})

describe('removeField', () => {
  it('应该移除字段', () => {
    const pkg = createPackageJson({
      name: 'test',
      description: 'Test',
    })
    const result = removeField(pkg, 'description')

    expect(result.description).toBeUndefined()
  })
})

describe('addKeywords', () => {
  it('应该添加关键词', () => {
    const pkg = createPackageJson({ name: 'test' })
    const result = addKeywords(pkg, ['react', 'vue'])

    expect(result.keywords).toContain('react')
    expect(result.keywords).toContain('vue')
  })

  it('应该合并已存在的关键词', () => {
    const pkg = createPackageJson({ name: 'test' })
    pkg.keywords = ['existing']
    const result = addKeywords(pkg, ['react'])

    expect(result.keywords).toContain('existing')
    expect(result.keywords).toContain('react')
  })
})

describe('removeKeywords', () => {
  it('应该移除关键词', () => {
    const pkg = createPackageJson({ name: 'test' })
    pkg.keywords = ['react', 'vue', 'angular']
    const result = removeKeywords(pkg, ['vue'])

    expect(result.keywords).not.toContain('vue')
    expect(result.keywords).toContain('react')
  })
})

describe('bumpVersion', () => {
  it('应该增加 patch 版本', () => {
    const pkg = createPackageJson({ name: 'test', version: '1.0.0' })
    const result = bumpVersion(pkg, 'patch')

    expect(result.version).toBe('1.0.1')
  })

  it('应该增加 minor 版本', () => {
    const pkg = createPackageJson({ name: 'test', version: '1.0.0' })
    const result = bumpVersion(pkg, 'minor')

    expect(result.version).toBe('1.1.0')
  })

  it('应该增加 major 版本', () => {
    const pkg = createPackageJson({ name: 'test', version: '1.0.0' })
    const result = bumpVersion(pkg, 'major')

    expect(result.version).toBe('2.0.0')
  })
})
