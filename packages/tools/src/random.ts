/**
 * 随机数工具方法
 */

/**
 * 生成随机 ID
 * @example
 * randomId() // 'k7j2h4g9'
 */
export function randomId(length = 8): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * 生成 UUID (v4)
 * @example
 * uuid() // '550e8400-e29b-41d4-a716-446655440000'
 */
export function uuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

/**
 * 生成随机颜色（十六进制）
 * @example
 * randomColor() // '#ff5733'
 */
export function randomColor(): string {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
}

/**
 * 生成随机 RGB 颜色
 * @example
 * randomRgb() // 'rgb(255, 87, 51)'
 */
export function randomRgb(): string {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return `rgb(${r}, ${g}, ${b})`
}

/**
 * 生成随机 RGBA 颜色
 * @example
 * randomRgba() // 'rgba(255, 87, 51, 0.5)'
 */
export function randomRgba(alpha?: number): string {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  const a = alpha ?? Math.random()
  return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`
}

/**
 * 生成随机日期
 * @example
 * randomDate(new Date('2020-01-01'), new Date('2024-12-31'))
 */
export function randomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  )
}

/**
 * 生成随机布尔值
 * @example
 * randomBoolean() // true 或 false
 */
export function randomBoolean(): boolean {
  return Math.random() < 0.5
}

/**
 * 按权重随机选择
 * @example
 * randomByWeight(['a', 'b', 'c'], [1, 2, 3]) // 'c' 的概率最大
 */
export function randomByWeight<T>(items: T[], weights: number[]): T {
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0)
  let random = Math.random() * totalWeight

  for (let i = 0; i < items.length; i++) {
    random -= weights[i]
    if (random <= 0) {
      return items[i]
    }
  }

  return items[items.length - 1]
}

/**
 * 生成随机整数数组
 * @example
 * randomIntArray(5, 1, 100) // [23, 67, 12, 89, 45]
 */
export function randomIntArray(
  length: number,
  min: number,
  max: number,
): number[] {
  return Array.from(
    { length },
    () => Math.floor(Math.random() * (max - min + 1)) + min,
  )
}

/**
 * 生成不重复的随机整数数组
 * @example
 * randomUniqueIntArray(5, 1, 100) // [23, 67, 12, 89, 45]
 */
export function randomUniqueIntArray(
  length: number,
  min: number,
  max: number,
): number[] {
  if (length > max - min + 1) {
    throw new Error('Length cannot be greater than range')
  }

  const result: number[] = []
  const available = Array.from({ length: max - min + 1 }, (_, i) => i + min)

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * available.length)
    result.push(available[index])
    available.splice(index, 1)
  }

  return result
}

/**
 * 随机打乱数组（Fisher-Yates 洗牌算法）
 * @example
 * shuffleArray([1, 2, 3, 4, 5]) // [3, 1, 5, 2, 4]
 */
export function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/**
 * 生成随机字符串（可指定字符集）
 * @example
 * randomString(8, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') // 'KDJFHGLS'
 */
export function randomString(length: number, chars?: string): string {
  const charset = chars || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length))
  }
  return result
}

/**
 * 生成随机中文名字
 * @example
 * randomChineseName() // '张三'
 */
export function randomChineseName(): string {
  const surnames = ['李', '王', '张', '刘', '陈', '杨', '赵', '黄', '周', '吴']
  const names = ['伟', '芳', '娜', '秀英', '敏', '静', '丽', '强', '磊', '军', '洋', '艳', '勇', '杰', '涛', '明', '超', '秀兰', '霞', '平']

  const surname = surnames[Math.floor(Math.random() * surnames.length)]
  const name = Math.random() < 0.5
    ? names[Math.floor(Math.random() * names.length)]
    : names[Math.floor(Math.random() * names.length)] + names[Math.floor(Math.random() * names.length)]

  return surname + name
}

/**
 * 生成随机手机号
 * @example
 * randomPhone() // '13812345678'
 */
export function randomPhone(): string {
  const prefixes = ['130', '131', '132', '133', '134', '135', '136', '137', '138', '139',
    '150', '151', '152', '153', '155', '156', '157', '158', '159',
    '180', '181', '182', '183', '184', '185', '186', '187', '188', '189']

  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
  const suffix = randomString(8, '0123456789')

  return prefix + suffix
}

/**
 * 生成随机邮箱
 * @example
 * randomEmail() // 'abc123@example.com'
 */
export function randomEmail(): string {
  const domains = ['gmail.com', 'qq.com', '163.com', 'outlook.com', 'yahoo.com']
  const username = randomString(8, 'abcdefghijklmnopqrstuvwxyz0123456789')
  const domain = domains[Math.floor(Math.random() * domains.length)]

  return `${username}@${domain}`
}

/**
 * 生成随机 IP 地址
 * @example
 * randomIP() // '192.168.1.100'
 */
export function randomIP(): string {
  return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`
}

