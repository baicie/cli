/**
 * 数组工具方法
 */

/**
 * 数组去重
 * @example
 * unique([1, 2, 2, 3, 3, 4]) // [1, 2, 3, 4]
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)]
}

/**
 * 根据对象的某个属性去重
 * @example
 * uniqueBy([{ id: 1 }, { id: 2 }, { id: 1 }], 'id') // [{ id: 1 }, { id: 2 }]
 */
export function uniqueBy<T>(arr: T[], key: keyof T): T[] {
  const seen = new Set()
  return arr.filter((item) => {
    const value = item[key]
    if (seen.has(value)) {
      return false
    }
    seen.add(value)
    return true
  })
}

/**
 * 数组分组
 * @example
 * groupBy([{ type: 'a', val: 1 }, { type: 'b', val: 2 }, { type: 'a', val: 3 }], 'type')
 * // { a: [{ type: 'a', val: 1 }, { type: 'a', val: 3 }], b: [{ type: 'b', val: 2 }] }
 */
export function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const group = String(item[key])
    if (!acc[group]) {
      acc[group] = []
    }
    acc[group].push(item)
    return acc
  }, {} as Record<string, T[]>)
}

/**
 * 数组分块
 * @example
 * chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

/**
 * 数组打乱（洗牌算法）
 * @example
 * shuffle([1, 2, 3, 4, 5]) // [3, 1, 5, 2, 4]
 */
export function shuffle<T>(arr: T[]): T[] {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/**
 * 数组求和
 * @example
 * sum([1, 2, 3, 4, 5]) // 15
 */
export function sum(arr: number[]): number {
  return arr.reduce((acc, val) => acc + val, 0)
}

/**
 * 数组平均值
 * @example
 * average([1, 2, 3, 4, 5]) // 3
 */
export function average(arr: number[]): number {
  return arr.length === 0 ? 0 : sum(arr) / arr.length
}

/**
 * 数组交集
 * @example
 * intersection([1, 2, 3], [2, 3, 4]) // [2, 3]
 */
export function intersection<T>(arr1: T[], arr2: T[]): T[] {
  const set2 = new Set(arr2)
  return unique(arr1.filter(item => set2.has(item)))
}

/**
 * 数组差集（arr1 中有但 arr2 中没有的）
 * @example
 * difference([1, 2, 3], [2, 3, 4]) // [1]
 */
export function difference<T>(arr1: T[], arr2: T[]): T[] {
  const set2 = new Set(arr2)
  return arr1.filter(item => !set2.has(item))
}

/**
 * 数组并集
 * @example
 * union([1, 2, 3], [2, 3, 4]) // [1, 2, 3, 4]
 */
export function union<T>(...arrays: T[][]): T[] {
  return unique(arrays.flat())
}

/**
 * 移除数组中的假值（false, null, 0, "", undefined, NaN）
 * @example
 * compact([0, 1, false, 2, '', 3, null, undefined, NaN]) // [1, 2, 3]
 */
export function compact<T>(arr: T[]): T[] {
  return arr.filter(Boolean)
}

/**
 * 数组扁平化（指定深度）
 * @example
 * flatten([1, [2, [3, [4]]]], 2) // [1, 2, 3, [4]]
 */
export function flatten<T>(arr: T[], depth = 1): T[] {
  return depth > 0
    ? arr.reduce((acc: any[], val) =>
        acc.concat(Array.isArray(val) ? flatten(val, depth - 1) : val)
      , [])
    : arr.slice()
}

/**
 * 从数组中随机取一个元素
 * @example
 * sample([1, 2, 3, 4, 5]) // 3
 */
export function sample<T>(arr: T[]): T | undefined {
  return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * 从数组中随机取 n 个元素
 * @example
 * sampleSize([1, 2, 3, 4, 5], 3) // [2, 5, 1]
 */
export function sampleSize<T>(arr: T[], n: number): T[] {
  const shuffled = shuffle(arr)
  return shuffled.slice(0, Math.min(n, arr.length))
}

/**
 * 数组分页
 * @example
 * paginate([1, 2, 3, 4, 5, 6, 7], 2, 3) // [4, 5, 6]
 */
export function paginate<T>(arr: T[], page: number, pageSize: number): T[] {
  const start = (page - 1) * pageSize
  return arr.slice(start, start + pageSize)
}

