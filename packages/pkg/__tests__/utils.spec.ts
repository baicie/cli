import { describe, it, expect } from 'vitest'
import {
  sortObject,
  deepClone,
  safeParseJson,
  isEmptyObject,
  cleanObject,
  mergePackageJson,
  compareVersions,
  normalizePackageName,
  getPackageScope,
  isScopedPackage,
} from '../src/utils'

describe('sortObject', () => {
  it('应该按字母顺序排序对象的键', () => {
    const obj = { z: 1, a: 2, m: 3 }
    const result = sortObject(obj)

    expect(Object.keys(result)).toEqual(['a', 'm', 'z'])
  })
})

describe('deepClone', () => {
  it('应该深度克隆对象', () => {
    const obj = { a: 1, b: { c: 2 } }
    const cloned = deepClone(obj)

    cloned.b.c = 3
    expect(obj.b.c).toBe(2)
  })

  it('应该克隆数组', () => {
    const arr = [1, 2, { a: 3 }]
    const cloned = deepClone(arr)

    cloned[2].a = 4
    expect(arr[2].a).toBe(3)
  })
})

describe('safeParseJson', () => {
  it('应该解析有效的 JSON', () => {
    const result = safeParseJson('{"name":"test"}')

    expect(result).toEqual({ name: 'test' })
  })

  it('应该在无效 JSON 时返回 null', () => {
    const result = safeParseJson('invalid json')

    expect(result).toBeNull()
  })
})

describe('isEmptyObject', () => {
  it('应该正确识别空对象', () => {
    expect(isEmptyObject({})).toBe(true)
    expect(isEmptyObject({ a: 1 })).toBe(false)
    expect(isEmptyObject(null)).toBe(false)
  })
})

describe('cleanObject', () => {
  it('应该移除空值', () => {
    const obj = {
      a: 1,
      b: '',
      c: null,
      d: undefined,
      e: [],
      f: {},
    }
    const result = cleanObject(obj)

    expect(result.a).toBe(1)
    expect(result.b).toBeUndefined()
    expect(result.c).toBeUndefined()
    expect(result.d).toBeUndefined()
  })

  it('应该保留非空数组', () => {
    const obj = { arr: [1, 2, 3] }
    const result = cleanObject(obj)

    expect(result.arr).toEqual([1, 2, 3])
  })
})

describe('mergePackageJson', () => {
  it('应该合并两个 package.json', () => {
    const base = {
      name: 'test',
      version: '1.0.0',
      dependencies: { react: '^18.0.0' },
    }
    const override = {
      version: '2.0.0',
      dependencies: { vue: '^3.0.0' },
    }
    const result = mergePackageJson(base as any, override)

    expect(result.name).toBe('test')
    expect(result.version).toBe('2.0.0')
    expect(result.dependencies?.react).toBe('^18.0.0')
    expect(result.dependencies?.vue).toBe('^3.0.0')
  })
})

describe('compareVersions', () => {
  it('应该正确比较版本号', () => {
    expect(compareVersions('1.0.0', '1.0.1')).toBe(-1)
    expect(compareVersions('1.0.1', '1.0.0')).toBe(1)
    expect(compareVersions('1.0.0', '1.0.0')).toBe(0)
  })
})

describe('normalizePackageName', () => {
  it('应该规范化包名', () => {
    expect(normalizePackageName('Test-Package')).toBe('test-package')
    expect(normalizePackageName('@scope/Package')).toBe('@scope/package')
  })
})

describe('getPackageScope', () => {
  it('应该提取作用域', () => {
    expect(getPackageScope('@scope/package')).toBe('scope')
    expect(getPackageScope('package')).toBe('')
  })
})

describe('isScopedPackage', () => {
  it('应该识别作用域包', () => {
    expect(isScopedPackage('@scope/package')).toBe(true)
    expect(isScopedPackage('package')).toBe(false)
  })
})
