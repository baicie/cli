import { describe, it, expect } from 'vitest'
import {
  randomId,
  uuid,
  randomColor,
  randomRgb,
  randomRgba,
  randomDate,
  randomBoolean,
  randomByWeight,
  shuffleArray,
  randomChineseName,
  randomPhone,
  randomEmail,
  randomIP,
} from '../src/random'

describe('randomId', () => {
  it('应该生成随机ID', () => {
    const id = randomId(10)
    expect(id).toHaveLength(10)
    expect(typeof id).toBe('string')
  })
})

describe('uuid', () => {
  it('应该生成UUID', () => {
    const id = uuid()
    expect(id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    )
  })
})

describe('randomColor', () => {
  it('应该生成随机颜色', () => {
    const color = randomColor()
    expect(color).toMatch(/^#[0-9a-f]{6}$/i)
  })
})

describe('randomRgb/randomRgba', () => {
  it('应该生成RGB颜色', () => {
    const rgb = randomRgb()
    expect(rgb).toMatch(/^rgb\(\d+, \d+, \d+\)$/)

    const rgba = randomRgba()
    expect(rgba).toMatch(/^rgba\(\d+, \d+, \d+, (0|1|0\.\d+)\)$/)
  })
})

describe('randomDate', () => {
  it('应该生成随机日期', () => {
    const start = new Date('2020-01-01')
    const end = new Date('2024-12-31')
    const date = randomDate(start, end)

    expect(date.getTime()).toBeGreaterThanOrEqual(start.getTime())
    expect(date.getTime()).toBeLessThanOrEqual(end.getTime())
  })
})

describe('randomBoolean', () => {
  it('应该生成随机布尔值', () => {
    const result = randomBoolean()
    expect(typeof result).toBe('boolean')
  })
})

describe('randomByWeight', () => {
  it('应该按权重随机选择', () => {
    const items = ['a', 'b', 'c']
    const weights = [1, 2, 3]
    const result = randomByWeight(items, weights)

    expect(items).toContain(result)
  })
})

describe('shuffleArray', () => {
  it('应该打乱数组', () => {
    const arr = [1, 2, 3, 4, 5]
    const shuffled = shuffleArray(arr)

    expect(shuffled).toHaveLength(5)
    expect(shuffled.sort()).toEqual([1, 2, 3, 4, 5])
  })
})

describe('randomChineseName', () => {
  it('应该生成随机中文名', () => {
    const name = randomChineseName()
    expect(name.length).toBeGreaterThan(0)
    expect(typeof name).toBe('string')
  })
})

describe('randomPhone/randomEmail/randomIP', () => {
  it('应该生成随机数据', () => {
    const phone = randomPhone()
    expect(phone).toMatch(/^1[3-9]\d{9}$/)

    const email = randomEmail()
    expect(email).toContain('@')

    const ip = randomIP()
    expect(ip).toMatch(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)
  })
})
