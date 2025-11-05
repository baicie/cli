import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  sleep,
  timeout,
  retry,
  promisePool,
  allSettled,
  serial,
  cancellable,
  createDeferred,
  poll,
} from '../src/promise'

describe('sleep', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('应该延迟执行', async () => {
    const promise = sleep(1000)
    vi.advanceTimersByTime(1000)
    await promise
    expect(true).toBe(true)
  })
})

describe('timeout', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('应该超时拒绝', async () => {
    const promise = timeout(
      new Promise(resolve => setTimeout(resolve, 2000)),
      1000,
    )
    vi.advanceTimersByTime(1000)

    await expect(promise).rejects.toThrow()
  })
})

describe('retry', () => {
  it('应该重试执行', async () => {
    let attempts = 0
    const fn = async () => {
      attempts++
      if (attempts < 3) {
        throw new Error('Failed')
      }
      return 'success'
    }

    const result = await retry(fn, 3)
    expect(result).toBe('success')
    expect(attempts).toBe(3)
  })
})

describe('promisePool', () => {
  it('应该控制并发', async () => {
    const tasks = Array.from({ length: 10 }, (_, i) => async () => {
      await sleep(100)
      return i
    })

    const results = await promisePool(tasks, 3)
    expect(results).toHaveLength(10)
  })
})

describe('allSettled', () => {
  it('应该处理所有Promise', async () => {
    const promises = [
      Promise.resolve(1),
      Promise.reject(new Error('Error')),
      Promise.resolve(3),
    ]

    const results = await allSettled(promises)
    expect(results).toHaveLength(3)
    expect(results[0].status).toBe('fulfilled')
    expect(results[1].status).toBe('rejected')
  })
})

describe('serial', () => {
  it('应该串行执行', async () => {
    const tasks = [
      async () => {
        await sleep(100)
        return 1
      },
      async () => {
        await sleep(100)
        return 2
      },
    ]

    const results = await serial(tasks)
    expect(results).toEqual([1, 2])
  })
})

describe('cancellable', () => {
  it('应该支持取消', async () => {
    const promise = sleep(1000)
    const { cancel } = cancellable(promise)

    cancel()
    await expect(promise).rejects.toThrow()
  })
})

describe('createDeferred', () => {
  it('应该创建可控制的Promise', async () => {
    const deferred = createDeferred<number>()
    setTimeout(() => deferred.resolve(42), 100)

    const result = await deferred.promise
    expect(result).toBe(42)
  })
})

describe('poll', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('应该轮询直到满足条件', async () => {
    let value = 0
    const check = () => value >= 5
    const update = () => {
      value++
    }

    const promise = poll(check, update, 100)
    vi.advanceTimersByTime(600)
    await promise

    expect(value).toBeGreaterThanOrEqual(5)
  })
})
