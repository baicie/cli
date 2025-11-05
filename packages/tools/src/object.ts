/**
 * 对象工具方法
 */

/**
 * 深拷贝
 * @example
 * deepClone({ a: 1, b: { c: 2 } })
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj

  if (obj instanceof Date) return new Date(obj.getTime()) as any

  if (obj instanceof Array) return obj.map(item => deepClone(item)) as any

  if (obj instanceof Object) {
    const clonedObj = {} as T
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }

  return obj
}

/**
 * 深度合并对象
 * @example
 * deepMerge({ a: 1, b: { c: 2 } }, { b: { d: 3 }, e: 4 })
 * // { a: 1, b: { c: 2, d: 3 }, e: 4 }
 */
export function deepMerge<
  T extends Record<string, any>,
  K extends Record<string, any>,
>(target: T, ...sources: Partial<K>[]): T {
  if (!sources.length) return target

  const source = sources.shift()

  if (source === undefined) return target

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) {
          Object.assign(target, { [key]: {} })
        }
        deepMerge(target[key], source[key] as any)
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }

  return deepMerge(target, ...sources)
}

function isObject(item: any): boolean {
  return item && typeof item === 'object' && !Array.isArray(item)
}

/**
 * 获取对象深层属性值
 * @example
 * get({ a: { b: { c: 3 } } }, 'a.b.c') // 3
 * get({ a: { b: { c: 3 } } }, 'a.x.c', 'default') // 'default'
 */
export function get<T = any>(obj: any, path: string, defaultValue?: T): T {
  const keys = path.split('.')
  let result = obj

  for (const key of keys) {
    result = result?.[key]
    if (result === undefined) {
      return defaultValue as T
    }
  }

  return result as T
}

/**
 * 设置对象深层属性值
 * @example
 * set({}, 'a.b.c', 3) // { a: { b: { c: 3 } } }
 */
export function set<T extends Record<string, any>>(
  obj: T,
  path: string,
  value: any,
): T {
  const keys = path.split('.')
  const lastKey = keys.pop()!
  let current: any = obj

  for (const key of keys) {
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {}
    }
    current = current[key]
  }

  current[lastKey] = value
  return obj
}

/**
 * 删除对象深层属性
 * @example
 * unset({ a: { b: { c: 3 } } }, 'a.b.c') // { a: { b: {} } }
 */
export function unset<T extends Record<string, any>>(obj: T, path: string): T {
  const keys = path.split('.')
  const lastKey = keys.pop()!
  let current = obj

  for (const key of keys) {
    if (!current[key]) {
      return obj
    }
    current = current[key]
  }

  delete current[lastKey]
  return obj
}

/**
 * 提取对象的指定属性
 * @example
 * pick({ a: 1, b: 2, c: 3 }, ['a', 'c']) // { a: 1, c: 3 }
 */
export function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> {
  const result = {} as Pick<T, K>
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key]
    }
  }
  return result
}

/**
 * 排除对象的指定属性
 * @example
 * omit({ a: 1, b: 2, c: 3 }, ['b']) // { a: 1, c: 3 }
 */
export function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  const result = { ...obj }
  for (const key of keys) {
    delete result[key]
  }
  return result
}

/**
 * 判断对象是否为空
 * @example
 * isEmptyObject({}) // true
 * isEmptyObject({ a: 1 }) // false
 */
export function isEmptyObject(obj: any): boolean {
  if (obj == null) return true
  if (Array.isArray(obj) || typeof obj === 'string') return obj.length === 0
  return Object.keys(obj).length === 0
}

/**
 * 对象键值互换
 * @example
 * invert({ a: '1', b: '2' }) // { '1': 'a', '2': 'b' }
 */
export function invert<T extends Record<string, string | number>>(
  obj: T,
): Record<string, string> {
  const result: Record<string, string> = {}
  for (const key in obj) {
    result[String(obj[key])] = key
  }
  return result
}

/**
 * 移除对象中值为 undefined 或 null 的属性
 * @example
 * cleanObject({ a: 1, b: null, c: undefined, d: 0 }) // { a: 1, d: 0 }
 */
export function cleanObject<T extends Record<string, any>>(
  obj: T,
  removeNull = true,
): Partial<T> {
  const result: any = {}
  for (const key in obj) {
    const value = obj[key]
    if (value !== undefined && (!removeNull || value !== null)) {
      result[key] = value
    }
  }
  return result
}

/**
 * 扁平化对象（将嵌套对象转为单层）
 * @example
 * flattenObject({ a: { b: { c: 1 } }, d: 2 })
 * // { 'a.b.c': 1, d: 2 }
 */
export function flattenObject(
  obj: Record<string, any>,
  prefix = '',
): Record<string, any> {
  const result: Record<string, any> = {}

  for (const key in obj) {
    const newKey = prefix ? `${prefix}.${key}` : key
    if (isObject(obj[key])) {
      Object.assign(result, flattenObject(obj[key], newKey))
    } else {
      result[newKey] = obj[key]
    }
  }

  return result
}

/**
 * 反扁平化对象
 * @example
 * unflattenObject({ 'a.b.c': 1, d: 2 })
 * // { a: { b: { c: 1 } }, d: 2 }
 */
export function unflattenObject(obj: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {}

  for (const key in obj) {
    set(result, key, obj[key])
  }

  return result
}
