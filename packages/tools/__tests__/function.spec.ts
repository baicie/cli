import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  debounce,
  throttle,
  once,
  memoize,
  curry,
  compose,
  pipe,
  partial,
  measure,
  measureAsync,
  before,
  after,
} from '../src/function'

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('应该防抖函数', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 300)

    debounced()
    debounced()
    debounced()

    vi.advanceTimersByTime(300)
    expect(fn).toHaveBeenCalledTimes(1)
  })
})

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('应该节流函数', () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 300)

    throttled()
    throttled()
    throttled()

    vi.advanceTimersByTime(300)
    expect(fn).toHaveBeenCalledTimes(2) // 第一次立即执行，300ms后执行一次
  })
})

describe('once', () => {
  it('应该只执行一次', () => {
    const fn = vi.fn()
    const onced = once(fn)

    onced()
    onced()
    onced()

    expect(fn).toHaveBeenCalledTimes(1)
  })
})

describe('memoize', () => {
  it('应该缓存函数结果', () => {
    let callCount = 0
    const fn = (n: number) => {
      callCount++
      return n * 2
    }
    const memoized = memoize(fn)

    memoized(5)
    memoized(5)
    memoized(5)

    expect(callCount).toBe(1)
  })
})

describe('curry', () => {
  it('应该柯里化函数', () => {
    const add = (a: number, b: number, c: number) => a + b + c
    const curried = curry(add)

    expect(curried(1)(2)(3)).toBe(6)
    expect(curried(1, 2)(3)).toBe(6)
  })
})

describe('compose', () => {
  it('应该组合函数', () => {
    const add = (x: number) => x + 1
    const multiply = (x: number) => x * 2
    const composed = compose(multiply, add)

    expect(composed(5)).toBe(12) // (5 + 1) * 2
  })
})

describe('pipe', () => {
  it('应该管道函数', () => {
    const add = (x: number) => x + 1
    const multiply = (x: number) => x * 2
    const piped = pipe(add, multiply)

    expect(piped(5)).toBe(12) // (5 + 1) * 2
  })
})

describe('partial', () => {
  it('应该偏应用函数', () => {
    const add = (a: number, b: number, c: number) => a + b + c
    const partialAdd = partial(add, 1, 2)

    expect(partialAdd(3)).toBe(6)
  })
})

describe('measure', () => {
  it('应该测量执行时间', () => {
    const fn = () => {
      let sum = 0
      for (let i = 0; i < 1000; i++) {
        sum += i
      }
      return sum
    }
    const result = measure(fn)
    expect(result.time).toBeGreaterThan(0)
    expect(result.result).toBe(499500)
  })
})

describe('measureAsync', () => {
  it('应该测量异步执行时间', async () => {
    const fn = async () => {
      await new Promise(resolve => setTimeout(resolve, 100))
      return 42
    }
    const result = await measureAsync(fn)
    expect(result.time).toBeGreaterThan(0)
    expect(result.result).toBe(42)
  })
})

describe('before/after', () => {
  it('应该限制执行次数', () => {
    const fn = vi.fn()
    const beforeFn = before(3, fn)

    beforeFn()
    beforeFn()
    beforeFn()
    beforeFn()

    expect(fn).toHaveBeenCalledTimes(3)
  })
})
