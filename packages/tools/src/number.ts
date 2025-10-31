/**
 * 数字工具方法
 */

/**
 * 生成指定范围的随机整数
 * @example
 * randomInt(1, 10) // 5
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 生成指定范围的随机浮点数
 * @example
 * randomFloat(1, 10, 2) // 5.47
 */
export function randomFloat(min: number, max: number, decimals = 2): number {
  const num = Math.random() * (max - min) + min
  return Number(num.toFixed(decimals))
}

/**
 * 限制数字在指定范围内
 * @example
 * clamp(15, 0, 10) // 10
 * clamp(-5, 0, 10) // 0
 */
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max)
}

/**
 * 格式化数字（千分位）
 * @example
 * formatNumber(1234567.89) // '1,234,567.89'
 */
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * 格式化文件大小
 * @example
 * formatFileSize(1024) // '1 KB'
 * formatFileSize(1048576) // '1 MB'
 */
export function formatFileSize(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${Number.parseFloat((bytes / k ** i).toFixed(decimals))} ${sizes[i]}`
}

/**
 * 百分比计算
 * @example
 * percentage(25, 100) // 25
 * percentage(1, 3, 2) // 33.33
 */
export function percentage(num: number, total: number, decimals = 0): number {
  if (total === 0) return 0
  return Number(((num / total) * 100).toFixed(decimals))
}

/**
 * 数字补零
 * @example
 * padZero(5, 3) // '005'
 */
export function padZero(num: number, length: number): string {
  return num.toString().padStart(length, '0')
}

/**
 * 判断是否为偶数
 * @example
 * isEven(4) // true
 */
export function isEven(num: number): boolean {
  return num % 2 === 0
}

/**
 * 判断是否为奇数
 * @example
 * isOdd(5) // true
 */
export function isOdd(num: number): boolean {
  return num % 2 !== 0
}

/**
 * 四舍五入到指定小数位
 * @example
 * round(1.2345, 2) // 1.23
 */
export function round(num: number, decimals = 0): number {
  return Number(Math.round(Number(`${num}e${decimals}`)) + `e-${decimals}`)
}

/**
 * 向上取整到指定小数位
 * @example
 * ceil(1.2345, 2) // 1.24
 */
export function ceil(num: number, decimals = 0): number {
  return Number(Math.ceil(Number(`${num}e${decimals}`)) + `e-${decimals}`)
}

/**
 * 向下取整到指定小数位
 * @example
 * floor(1.2345, 2) // 1.23
 */
export function floor(num: number, decimals = 0): number {
  return Number(Math.floor(Number(`${num}e${decimals}`)) + `e-${decimals}`)
}

/**
 * 判断是否在范围内
 * @example
 * inRange(5, 1, 10) // true
 * inRange(15, 1, 10) // false
 */
export function inRange(num: number, min: number, max: number): boolean {
  return num >= min && num <= max
}

/**
 * 求最大公约数
 * @example
 * gcd(12, 8) // 4
 */
export function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}

/**
 * 求最小公倍数
 * @example
 * lcm(12, 8) // 24
 */
export function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b)
}

/**
 * 判断是否为质数
 * @example
 * isPrime(7) // true
 * isPrime(8) // false
 */
export function isPrime(num: number): boolean {
  if (num <= 1) return false
  if (num <= 3) return true
  if (num % 2 === 0 || num % 3 === 0) return false

  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) {
      return false
    }
  }

  return true
}

/**
 * 阶乘
 * @example
 * factorial(5) // 120
 */
export function factorial(num: number): number {
  if (num <= 1) return 1
  return num * factorial(num - 1)
}

/**
 * 斐波那契数列第 n 项
 * @example
 * fibonacci(10) // 55
 */
export function fibonacci(n: number): number {
  if (n <= 1) return n
  let a = 0
  let b = 1
  for (let i = 2; i <= n; i++) {
    ;[a, b] = [b, a + b]
  }
  return b
}
