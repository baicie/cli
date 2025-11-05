import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  addDays,
  addMonths,
  addYears,
  daysBetween,
  endOfMonth,
  formatDate,
  getDaysInMonth,
  getQuarter,
  getWeekday,
  isDateInRange,
  isLeapYear,
  isToday,
  isTomorrow,
  isWeekend,
  isYesterday,
  startOfMonth,
  timeAgo,
} from '../src/date'

describe('formatDate', () => {
  it('应该格式化日期', () => {
    const date = new Date('2024-01-01T12:00:00')
    expect(formatDate(date, 'YYYY-MM-DD')).toBe('2024-01-01')
    expect(formatDate(date, 'YYYY-MM-DD HH:mm:ss')).toBe('2024-01-01 12:00:00')
  })
})

describe('timeAgo', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-01-01T12:00:00'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('应该返回相对时间', () => {
    const past = new Date('2024-01-01T11:59:00')
    expect(timeAgo(past)).toBe('1 分钟前')
  })
})

describe('isToday/isYesterday/isTomorrow', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-01-01T12:00:00'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('应该判断日期', () => {
    expect(isToday(new Date('2024-01-01'))).toBe(true)
    expect(isYesterday(new Date('2023-12-31'))).toBe(true)
    expect(isTomorrow(new Date('2024-01-02'))).toBe(true)
  })
})

describe('daysBetween', () => {
  it('应该计算天数差', () => {
    const date1 = new Date('2024-01-01')
    const date2 = new Date('2024-01-05')
    expect(daysBetween(date1, date2)).toBe(4)
  })
})

describe('addDays/addMonths/addYears', () => {
  it('应该添加天数/月数/年数', () => {
    const date = new Date('2024-01-01')
    expect(addDays(date, 5).getDate()).toBe(6)
    expect(addMonths(date, 1).getMonth()).toBe(1)
    expect(addYears(date, 1).getFullYear()).toBe(2025)
  })
})

describe('startOfMonth/endOfMonth', () => {
  it('应该获取月份起止', () => {
    const date = new Date('2024-01-15')
    expect(startOfMonth(date).getDate()).toBe(1)
    expect(endOfMonth(date).getDate()).toBe(31)
  })
})

describe('getDaysInMonth', () => {
  it('应该获取月份天数', () => {
    expect(getDaysInMonth(new Date('2024-02-01'))).toBe(29)
  })
})

describe('isLeapYear', () => {
  it('应该判断闰年', () => {
    expect(isLeapYear(2024)).toBe(true)
    expect(isLeapYear(2023)).toBe(false)
  })
})

describe('getWeekday', () => {
  it('应该获取星期几', () => {
    const date = new Date('2024-01-01') // 星期一
    expect(getWeekday(date)).toBe('星期一')
  })
})

describe('isWeekend', () => {
  it('应该判断周末', () => {
    const saturday = new Date('2024-01-06') // 星期六
    const sunday = new Date('2024-01-07') // 星期日
    expect(isWeekend(saturday)).toBe(true)
    expect(isWeekend(sunday)).toBe(true)
  })
})

describe('getQuarter', () => {
  it('应该获取季度', () => {
    expect(getQuarter(new Date('2024-01-01'))).toBe(1)
    expect(getQuarter(new Date('2024-04-01'))).toBe(2)
  })
})

describe('isDateInRange', () => {
  it('应该判断日期是否在范围内', () => {
    const start = new Date('2024-01-01')
    const end = new Date('2024-01-31')
    const date = new Date('2024-01-15')
    expect(isDateInRange(date, start, end)).toBe(true)
  })
})
