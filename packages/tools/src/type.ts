/**
 * 类型判断工具方法
 */

/**
 * 获取数据类型
 * @example
 * getType([]) // 'Array'
 * getType({}) // 'Object'
 * getType(null) // 'Null'
 */
export function getType(value: any): string {
  return Object.prototype.toString.call(value).slice(8, -1)
}

/**
 * 判断是否为字符串
 */
export function isString(value: any): value is string {
  return typeof value === 'string'
}

/**
 * 判断是否为数字
 */
export function isNumber(value: any): value is number {
  return typeof value === 'number' && !Number.isNaN(value)
}

/**
 * 判断是否为布尔值
 */
export function isBoolean(value: any): value is boolean {
  return typeof value === 'boolean'
}

/**
 * 判断是否为 undefined
 */
export function isUndefined(value: any): value is undefined {
  return value === undefined
}

/**
 * 判断是否为 null
 */
export function isNull(value: any): value is null {
  return value === null
}

/**
 * 判断是否为 null 或 undefined
 */
export function isNil(value: any): value is null | undefined {
  return value == null
}

/**
 * 判断是否为对象（不包括 null）
 */
export function isObject(value: any): value is Record<string, any> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

/**
 * 判断是否为纯对象
 */
export function isPlainObject(value: any): value is Record<string, any> {
  if (!isObject(value)) return false

  const proto = Object.getPrototypeOf(value)
  return proto === null || proto === Object.prototype
}

/**
 * 判断是否为数组
 */
export function isArray(value: any): value is any[] {
  return Array.isArray(value)
}

/**
 * 判断是否为函数
 */
export function isFunction(value: any): value is (...args: any[]) => any {
  return typeof value === 'function'
}

/**
 * 判断是否为 Date 对象
 */
export function isDate(value: any): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime())
}

/**
 * 判断是否为正则表达式
 */
export function isRegExp(value: any): value is RegExp {
  return value instanceof RegExp
}

/**
 * 判断是否为 Error 对象
 */
export function isError(value: any): value is Error {
  return value instanceof Error
}

/**
 * 判断是否为 Promise
 */
export function isPromise(value: any): value is Promise<any> {
  return (
    value instanceof Promise ||
    (value !== null &&
      typeof value === 'object' &&
      typeof value.then === 'function' &&
      typeof value.catch === 'function')
  )
}

/**
 * 判断是否为 Symbol
 */
export function isSymbol(value: any): value is symbol {
  return typeof value === 'symbol'
}

/**
 * 判断是否为 BigInt
 */
export function isBigInt(value: any): value is bigint {
  return typeof value === 'bigint'
}

/**
 * 判断是否为 Map
 */
export function isMap(value: any): value is Map<any, any> {
  return value instanceof Map
}

/**
 * 判断是否为 Set
 */
export function isSet(value: any): value is Set<any> {
  return value instanceof Set
}

/**
 * 判断是否为 WeakMap
 */
export function isWeakMap(value: any): value is WeakMap<any, any> {
  return value instanceof WeakMap
}

/**
 * 判断是否为 WeakSet
 */
export function isWeakSet(value: any): value is WeakSet<any> {
  return value instanceof WeakSet
}

/**
 * 判断是否为空值（null, undefined, '', [], {}）
 */
export function isEmpty(value: any): boolean {
  if (value == null) return true

  if (typeof value === 'string' || Array.isArray(value))
    return value.length === 0

  if (isPlainObject(value)) return Object.keys(value).length === 0

  if (isMap(value) || isSet(value)) return value.size === 0

  return false
}

/**
 * 判断是否为原始类型
 */
export function isPrimitive(value: any): boolean {
  return (
    value == null || (typeof value !== 'object' && typeof value !== 'function')
  )
}

/**
 * 判断是否为假值
 */
export function isFalsy(value: any): boolean {
  return !value
}

/**
 * 判断是否为真值
 */
export function isTruthy(value: any): boolean {
  return !!value
}

/**
 * 判断两个值是否相等（深度比较）
 */
export function isEqual(a: any, b: any): boolean {
  if (a === b) return true

  if (a == null || b == null) return false

  if (typeof a !== typeof b) return false

  if (isPrimitive(a) || isPrimitive(b)) return a === b

  if (isDate(a) && isDate(b)) return a.getTime() === b.getTime()

  if (isRegExp(a) && isRegExp(b)) return a.toString() === b.toString()

  if (isArray(a) && isArray(b)) {
    if (a.length !== b.length) return false
    return a.every((item, index) => isEqual(item, b[index]))
  }

  if (isPlainObject(a) && isPlainObject(b)) {
    const keysA = Object.keys(a)
    const keysB = Object.keys(b)

    if (keysA.length !== keysB.length) return false

    return keysA.every(key => isEqual(a[key], b[key]))
  }

  return false
}
