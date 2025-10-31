/**
 * 日期工具方法
 */

/**
 * 格式化日期
 * @example
 * formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
 * // '2024-01-01 12:00:00'
 */
export function formatDate(
  date: Date | number | string,
  format = 'YYYY-MM-DD',
): string {
  const d = new Date(date)

  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  const hours = d.getHours()
  const minutes = d.getMinutes()
  const seconds = d.getSeconds()
  const milliseconds = d.getMilliseconds()

  const pad = (n: number) => String(n).padStart(2, '0')

  const replacements: Record<string, string> = {
    YYYY: String(year),
    MM: pad(month),
    DD: pad(day),
    HH: pad(hours),
    mm: pad(minutes),
    ss: pad(seconds),
    SSS: String(milliseconds).padStart(3, '0'),
  }

  let result = format
  for (const [key, value] of Object.entries(replacements)) {
    result = result.replace(key, value)
  }

  return result
}

/**
 * 获取相对时间描述
 * @example
 * timeAgo(new Date(Date.now() - 60000)) // '1 分钟前'
 */
export function timeAgo(date: Date | number | string): string {
  const now = Date.now()
  const past = new Date(date).getTime()
  const diff = now - past

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (years > 0) return `${years} 年前`
  if (months > 0) return `${months} 个月前`
  if (days > 0) return `${days} 天前`
  if (hours > 0) return `${hours} 小时前`
  if (minutes > 0) return `${minutes} 分钟前`
  return '刚刚'
}

/**
 * 判断是否为今天
 * @example
 * isToday(new Date()) // true
 */
export function isToday(date: Date | number | string): boolean {
  const d = new Date(date)
  const today = new Date()
  return d.toDateString() === today.toDateString()
}

/**
 * 判断是否为昨天
 * @example
 * isYesterday(new Date(Date.now() - 86400000)) // true
 */
export function isYesterday(date: Date | number | string): boolean {
  const d = new Date(date)
  const yesterday = new Date(Date.now() - 86400000)
  return d.toDateString() === yesterday.toDateString()
}

/**
 * 判断是否为明天
 * @example
 * isTomorrow(new Date(Date.now() + 86400000)) // true
 */
export function isTomorrow(date: Date | number | string): boolean {
  const d = new Date(date)
  const tomorrow = new Date(Date.now() + 86400000)
  return d.toDateString() === tomorrow.toDateString()
}

/**
 * 获取两个日期之间的天数差
 * @example
 * daysBetween(new Date('2024-01-01'), new Date('2024-01-10')) // 9
 */
export function daysBetween(
  date1: Date | number | string,
  date2: Date | number | string,
): number {
  const d1 = new Date(date1).getTime()
  const d2 = new Date(date2).getTime()
  return Math.floor(Math.abs(d2 - d1) / 86400000)
}

/**
 * 添加天数
 * @example
 * addDays(new Date('2024-01-01'), 10) // 2024-01-11
 */
export function addDays(date: Date | number | string, days: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

/**
 * 添加月份
 * @example
 * addMonths(new Date('2024-01-01'), 2) // 2024-03-01
 */
export function addMonths(date: Date | number | string, months: number): Date {
  const d = new Date(date)
  d.setMonth(d.getMonth() + months)
  return d
}

/**
 * 添加年份
 * @example
 * addYears(new Date('2024-01-01'), 1) // 2025-01-01
 */
export function addYears(date: Date | number | string, years: number): Date {
  const d = new Date(date)
  d.setFullYear(d.getFullYear() + years)
  return d
}

/**
 * 获取月份的第一天
 * @example
 * startOfMonth(new Date('2024-01-15')) // 2024-01-01
 */
export function startOfMonth(date: Date | number | string): Date {
  const d = new Date(date)
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

/**
 * 获取月份的最后一天
 * @example
 * endOfMonth(new Date('2024-01-15')) // 2024-01-31
 */
export function endOfMonth(date: Date | number | string): Date {
  const d = new Date(date)
  return new Date(d.getFullYear(), d.getMonth() + 1, 0)
}

/**
 * 获取月份的天数
 * @example
 * getDaysInMonth(new Date('2024-02-01')) // 29 (闰年)
 */
export function getDaysInMonth(date: Date | number | string): number {
  const d = new Date(date)
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
}

/**
 * 判断是否为闰年
 * @example
 * isLeapYear(2024) // true
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

/**
 * 获取星期几（中文）
 * @example
 * getWeekday(new Date()) // '星期一'
 */
export function getWeekday(date: Date | number | string): string {
  const weekdays = [
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
  ]
  return weekdays[new Date(date).getDay()]
}

/**
 * 判断是否为周末
 * @example
 * isWeekend(new Date()) // false
 */
export function isWeekend(date: Date | number | string): boolean {
  const day = new Date(date).getDay()
  return day === 0 || day === 6
}

/**
 * 获取季度
 * @example
 * getQuarter(new Date('2024-04-01')) // 2
 */
export function getQuarter(date: Date | number | string): number {
  return Math.floor(new Date(date).getMonth() / 3) + 1
}

/**
 * 判断日期是否在范围内
 * @example
 * isDateInRange(new Date('2024-05-15'), new Date('2024-01-01'), new Date('2024-12-31'))
 * // true
 */
export function isDateInRange(
  date: Date | number | string,
  start: Date | number | string,
  end: Date | number | string,
): boolean {
  const d = new Date(date).getTime()
  const s = new Date(start).getTime()
  const e = new Date(end).getTime()
  return d >= s && d <= e
}
