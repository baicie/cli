import { describe, expect, it } from 'vitest'
import {
  ceil,
  clamp,
  factorial,
  fibonacci,
  floor,
  formatFileSize,
  formatNumber,
  gcd,
  inRange,
  isEven,
  isOdd,
  isPrime,
  lcm,
  padZero,
  percentage,
  randomFloat,
  randomInt,
  round,
} from '../src/number'

describe('randomInt', () => {
  it('应该生成范围内的随机整数', () => {
    const result = randomInt(1, 10)
    expect(result).toBeGreaterThanOrEqual(1)
    expect(result).toBeLessThanOrEqual(10)
  })
})

describe('randomFloat', () => {
  it('应该生成范围内的随机浮点数', () => {
    const result = randomFloat(1, 10, 2)
    expect(result).toBeGreaterThanOrEqual(1)
    expect(result).toBeLessThanOrEqual(10)
    expect(result.toString().split('.')[1]?.length || 0).toBeLessThanOrEqual(2)
  })
})

describe('clamp', () => {
  it('应该限制数字在范围内', () => {
    expect(clamp(15, 0, 10)).toBe(10)
    expect(clamp(-5, 0, 10)).toBe(0)
    expect(clamp(5, 0, 10)).toBe(5)
  })
})

describe('formatNumber', () => {
  it('应该格式化千分位', () => {
    expect(formatNumber(1234567.89)).toBe('1,234,567.89')
    expect(formatNumber(1000)).toBe('1,000')
  })
})

describe('formatFileSize', () => {
  it('应该格式化文件大小', () => {
    expect(formatFileSize(1024)).toBe('1 KB')
    expect(formatFileSize(1048576)).toBe('1 MB')
  })
})

describe('percentage', () => {
  it('应该计算百分比', () => {
    expect(percentage(25, 100)).toBe(25)
    expect(percentage(1, 3, 2)).toBe(33.33)
  })
})

describe('padZero', () => {
  it('应该补零', () => {
    expect(padZero(5, 3)).toBe('005')
    expect(padZero(123, 3)).toBe('123')
  })
})

describe('isEven/isOdd', () => {
  it('应该判断奇偶', () => {
    expect(isEven(4)).toBe(true)
    expect(isOdd(5)).toBe(true)
  })
})

describe('round/ceil/floor', () => {
  it('应该四舍五入', () => {
    expect(round(1.2345, 2)).toBe(1.23)
    expect(ceil(1.2345, 2)).toBe(1.24)
    expect(floor(1.2345, 2)).toBe(1.23)
  })
})

describe('inRange', () => {
  it('应该判断是否在范围内', () => {
    expect(inRange(5, 0, 10)).toBe(true)
    expect(inRange(15, 0, 10)).toBe(false)
  })
})

describe('gcd/lcm', () => {
  it('应该计算最大公约数和最小公倍数', () => {
    expect(gcd(12, 18)).toBe(6)
    expect(lcm(12, 18)).toBe(36)
  })
})

describe('isPrime', () => {
  it('应该判断质数', () => {
    expect(isPrime(7)).toBe(true)
    expect(isPrime(8)).toBe(false)
  })
})

describe('factorial', () => {
  it('应该计算阶乘', () => {
    expect(factorial(5)).toBe(120)
    expect(factorial(0)).toBe(1)
  })
})

describe('fibonacci', () => {
  it('应该生成斐波那契数列', () => {
    expect(fibonacci(5)).toEqual(5)
  })
})
