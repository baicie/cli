import { describe, it, expect } from 'vitest'
import {
  getType,
  isString,
  isNumber,
  isBoolean,
  isUndefined,
  isNull,
  isNil,
  isObject,
  isPlainObject,
  isArray,
  isFunction,
  isDate,
  isRegExp,
  isError,
  isPromise,
  isMap,
  isSet,
  isEmpty,
  isEqual,
} from '../src/type'

describe('getType', () => {
  it('应该返回数据类型', () => {
    expect(getType([])).toBe('Array')
    expect(getType({})).toBe('Object')
    expect(getType(null)).toBe('Null')
  })
})

describe('isString', () => {
  it('应该判断字符串', () => {
    expect(isString('hello')).toBe(true)
    expect(isString(123)).toBe(false)
  })
})

describe('isNumber', () => {
  it('应该判断数字', () => {
    expect(isNumber(123)).toBe(true)
    expect(isNumber(NaN)).toBe(false)
  })
})

describe('isBoolean', () => {
  it('应该判断布尔值', () => {
    expect(isBoolean(true)).toBe(true)
    expect(isBoolean(false)).toBe(true)
  })
})

describe('isUndefined/isNull/isNil', () => {
  it('应该判断空值', () => {
    expect(isUndefined(undefined)).toBe(true)
    expect(isNull(null)).toBe(true)
    expect(isNil(null)).toBe(true)
    expect(isNil(undefined)).toBe(true)
  })
})

describe('isObject/isPlainObject', () => {
  it('应该判断对象', () => {
    expect(isObject({})).toBe(true)
    expect(isObject([])).toBe(false)
    expect(isPlainObject({})).toBe(true)
    expect(isPlainObject(new Date())).toBe(false)
  })
})

describe('isArray', () => {
  it('应该判断数组', () => {
    expect(isArray([])).toBe(true)
    expect(isArray({})).toBe(false)
  })
})

describe('isFunction', () => {
  it('应该判断函数', () => {
    expect(isFunction(() => {})).toBe(true)
    expect(isFunction({})).toBe(false)
  })
})

describe('isDate/isRegExp/isError', () => {
  it('应该判断特殊对象', () => {
    expect(isDate(new Date())).toBe(true)
    expect(isRegExp(/test/)).toBe(true)
    expect(isError(new Error())).toBe(true)
  })
})

describe('isPromise', () => {
  it('应该判断Promise', () => {
    expect(isPromise(Promise.resolve())).toBe(true)
    expect(isPromise({})).toBe(false)
  })
})

describe('isMap/isSet', () => {
  it('应该判断集合类型', () => {
    expect(isMap(new Map())).toBe(true)
    expect(isSet(new Set())).toBe(true)
  })
})

describe('isEmpty', () => {
  it('应该判断空值', () => {
    expect(isEmpty([])).toBe(true)
    expect(isEmpty({})).toBe(true)
    expect(isEmpty([1])).toBe(false)
  })
})

describe('isEqual', () => {
  it('应该深度比较', () => {
    expect(isEqual({ a: 1 }, { a: 1 })).toBe(true)
    expect(isEqual({ a: 1 }, { a: 2 })).toBe(false)
  })
})
