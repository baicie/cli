/**
 * Promise 工具方法
 */

/**
 * 延迟执行
 * @example
 * await sleep(1000) // 延迟 1 秒
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Promise 超时控制
 * @example
 * await timeout(fetch('...'), 3000) // 3秒超时
 */
export function timeout<T>(
  promise: Promise<T>,
  ms: number,
  timeoutError?: Error,
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(timeoutError || new Error('Timeout')), ms),
    ),
  ])
}

/**
 * 重试执行
 * @example
 * await retry(() => fetch('...'), 3, 1000)
 */
export async function retry<T>(
  fn: () => Promise<T>,
  times: number,
  delay = 0,
): Promise<T> {
  try {
    return await fn()
  } catch (error) {
    if (times <= 1) {
      throw error
    }
    if (delay > 0) {
      await sleep(delay)
    }
    return retry(fn, times - 1, delay)
  }
}

/**
 * 并发控制（限制同时执行的 Promise 数量）
 * @example
 * const tasks = urls.map(url => () => fetch(url))
 * const results = await promisePool(tasks, 3) // 最多同时执行 3 个
 */
export async function promisePool<T>(
  tasks: (() => Promise<T>)[],
  limit: number,
): Promise<T[]> {
  const results: T[] = []
  const executing: Promise<void>[] = []

  for (const [index, task] of tasks.entries()) {
    const p = Promise.resolve()
      .then(() => task())
      .then(result => {
        results[index] = result
      })

    results.push(p as any)

    if (limit <= tasks.length) {
      const e = p.then(() => {
        executing.splice(executing.indexOf(e), 1)
      })
      executing.push(e)

      if (executing.length >= limit) {
        await Promise.race(executing)
      }
    }
  }

  await Promise.all(executing)
  return results
}

/**
 * Promise.all 的错误处理版本（部分失败不影响其他）
 * @example
 * const results = await allSettled([promise1, promise2, promise3])
 */
export function allSettled<T>(
  promises: Promise<T>[],
): Promise<
  Array<{ status: 'fulfilled'; value: T } | { status: 'rejected'; reason: any }>
> {
  return Promise.all(
    promises.map(promise =>
      promise
        .then(value => ({ status: 'fulfilled' as const, value }))
        .catch(reason => ({ status: 'rejected' as const, reason })),
    ),
  )
}

/**
 * 串行执行 Promise
 * @example
 * await serial([
 *   () => fetch('url1'),
 *   () => fetch('url2'),
 *   () => fetch('url3')
 * ])
 */
export async function serial<T>(tasks: (() => Promise<T>)[]): Promise<T[]> {
  const results: T[] = []
  for (const task of tasks) {
    results.push(await task())
  }
  return results
}

/**
 * 可取消的 Promise
 * @example
 * const { promise, cancel } = cancellable(fetch('...'))
 * setTimeout(() => cancel(), 1000)
 * try {
 *   await promise
 * } catch (e) {
 *   // 被取消
 * }
 */
export function cancellable<T>(promise: Promise<T>): {
  promise: Promise<T>
  cancel: () => void
} {
  let cancel!: () => void

  const cancelPromise = new Promise<never>((_, reject) => {
    cancel = () => reject(new Error('Cancelled'))
  })

  return {
    promise: Promise.race([promise, cancelPromise]),
    cancel,
  }
}

/**
 * 创建可手动控制的 Promise
 * @example
 * const { promise, resolve, reject } = createDeferred<number>()
 * setTimeout(() => resolve(42), 1000)
 * await promise // 42
 */
export function createDeferred<T>(): {
  promise: Promise<T>
  resolve: (value: T) => void
  reject: (reason?: any) => void
} {
  let resolve!: (value: T) => void
  let reject!: (reason?: any) => void

  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })

  return { promise, resolve, reject }
}

/**
 * 轮询执行直到满足条件
 * @example
 * await poll(
 *   () => fetch('/api/status').then(r => r.json()),
 *   data => data.status === 'ready',
 *   { interval: 1000, timeout: 30000 }
 * )
 */
export async function poll<T>(
  fn: () => Promise<T>,
  validate: (result: T) => boolean,
  options: { interval?: number; timeout?: number } = {},
): Promise<T> {
  const { interval = 1000, timeout = 60000 } = options
  const startTime = Date.now()

  while (true) {
    const result = await fn()

    if (validate(result)) {
      return result
    }

    if (Date.now() - startTime >= timeout) {
      throw new Error('Poll timeout')
    }

    await sleep(interval)
  }
}
