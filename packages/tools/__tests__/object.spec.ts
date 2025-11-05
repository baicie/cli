import { describe, it, expect } from 'vitest'
import {
  deepClone,
  deepMerge,
  get,
  set,
  unset,
  pick,
  omit,
  isEmpty,
  invert,
  cleanObject,
  flattenObject,
  unflattenObject,
} from '../src/object'

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

describe('deepMerge', () => {
  it('应该深度合并对象', () => {
    const target = { a: 1, b: { c: 2 } }
    const source = { b: { d: 3 }, e: 4 }
    const result = deepMerge(target, source)

    expect(result).toEqual({ a: 1, b: { c: 2, d: 3 }, e: 4 })
  })
})

describe('get', () => {
  it('应该获取深层属性', () => {
    const obj = { a: { b: { c: 1 } } }
    expect(get(obj, 'a.b.c')).toBe(1)
    expect(get(obj, 'a.b.c.d', 'default')).toBe('default')
  })
})

describe('set', () => {
  it('应该设置深层属性', () => {
    const obj: any = {}
    set(obj, 'a.b.c', 1)
    expect(obj.a.b.c).toBe(1)
  })
})

describe('unset', () => {
  it('应该删除深层属性', () => {
    const obj: any = { a: { b: { c: 1 } } }
    unset(obj, 'a.b.c')
    expect(obj.a.b.c).toBeUndefined()
  })
})

describe('pick', () => {
  it('应该提取指定属性', () => {
    const obj = { a: 1, b: 2, c: 3 }
    expect(pick(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 })
  })
})

describe('omit', () => {
  it('应该排除指定属性', () => {
    const obj = { a: 1, b: 2, c: 3 }
    expect(omit(obj, ['b'])).toEqual({ a: 1, c: 3 })
  })
})

describe('isEmpty', () => {
  it('应该判断是否为空', () => {
    expect(isEmpty({})).toBe(true)
    expect(isEmpty({ a: 1 })).toBe(false)
    expect(isEmpty([])).toBe(true)
    expect(isEmpty([1])).toBe(false)
  })
})

describe('invert', () => {
  it('应该键值互换', () => {
    expect(invert({ a: 1, b: 2 })).toEqual({ 1: 'a', 2: 'b' })
  })
})

describe('cleanObject', () => {
  it('应该移除空值', () => {
    const obj = { a: 1, b: '', c: null, d: undefined }
    const result = cleanObject(obj)
    expect(result.a).toBe(1)
    expect(result.b).toBeUndefined()
  })
})

describe('flattenObject', () => {
  it('应该扁平化对象', () => {
    const obj = { a: { b: { c: 1 } } }
    expect(flattenObject(obj)).toEqual({ 'a.b.c': 1 })
  })
})

describe('unflattenObject', () => {
  it('应该反扁平化对象', () => {
    const obj = { 'a.b.c': 1 }
    expect(unflattenObject(obj)).toEqual({ a: { b: { c: 1 } } })
  })
})
