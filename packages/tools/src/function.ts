/**
 * 函数工具方法
 */

/**
 * 防抖
 * @example
 * const debouncedFn = debounce(() => console.log('called'), 300)
 * debouncedFn() // 只会在最后一次调用 300ms 后执行
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return function (this: any, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      fn.apply(this, args)
      timeoutId = null
    }, delay)
  }
}

/**
 * 节流
 * @example
 * const throttledFn = throttle(() => console.log('called'), 300)
 * throttledFn() // 每 300ms 最多执行一次
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let lastCall = 0

  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now()

    if (now - lastCall >= delay) {
      lastCall = now
      fn.apply(this, args)
    }
  }
}

/**
 * 函数只执行一次
 * @example
 * const init = once(() => console.log('initialized'))
 * init() // 'initialized'
 * init() // 不会执行
 */
export function once<T extends (...args: any[]) => any>(
  fn: T,
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  let called = false
  let result: ReturnType<T>

  return function (this: any, ...args: Parameters<T>) {
    if (!called) {
      called = true
      result = fn.apply(this, args)
      return result
    }
    return result
  }
}

/**
 * 缓存函数结果（记忆化）
 * @example
 * const expensiveFn = memoize((n: number) => {
 *   console.log('computing...')
 *   return n * 2
 * })
 * expensiveFn(5) // 'computing...' 10
 * expensiveFn(5) // 10 (使用缓存)
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  resolver?: (...args: Parameters<T>) => string,
): T {
  const cache = new Map<string, ReturnType<T>>()

  return function (this: any, ...args: Parameters<T>) {
    const key = resolver ? resolver(...args) : JSON.stringify(args)

    if (cache.has(key)) {
      return cache.get(key)!
    }

    const result = fn.apply(this, args)
    cache.set(key, result)
    return result
  } as T
}

/**
 * 函数柯里化
 * @example
 * const add = (a: number, b: number, c: number) => a + b + c
 * const curriedAdd = curry(add)
 * curriedAdd(1)(2)(3) // 6
 * curriedAdd(1, 2)(3) // 6
 */
export function curry<T extends (...args: any[]) => any>(
  fn: T,
): any {
  return function curried(this: any, ...args: any[]): any {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    }
    return (...args2: any[]) => curried.apply(this, [...args, ...args2])
  }
}

/**
 * 函数组合（从右到左）
 * @example
 * const add1 = (x: number) => x + 1
 * const double = (x: number) => x * 2
 * const composed = compose(add1, double)
 * composed(3) // 7 (先 double 再 add1)
 */
export function compose<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return (arg: T) => fns.reduceRight((result, fn) => fn(result), arg)
}

/**
 * 函数管道（从左到右）
 * @example
 * const add1 = (x: number) => x + 1
 * const double = (x: number) => x * 2
 * const piped = pipe(add1, double)
 * piped(3) // 8 (先 add1 再 double)
 */
export function pipe<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return (arg: T) => fns.reduce((result, fn) => fn(result), arg)
}

/**
 * 延迟执行函数
 * @example
 * defer(() => console.log('deferred'))
 * console.log('immediate')
 * // 输出: immediate, deferred
 */
export function defer(fn: () => void): void {
  setTimeout(fn, 0)
}

/**
 * 函数偏应用
 * @example
 * const add = (a: number, b: number, c: number) => a + b + c
 * const add5 = partial(add, 5)
 * add5(10, 15) // 30
 */
export function partial<T extends (...args: any[]) => any>(
  fn: T,
  ...partialArgs: any[]
): (...args: any[]) => ReturnType<T> {
  return function (this: any, ...args: any[]) {
    return fn.apply(this, [...partialArgs, ...args])
  }
}

/**
 * 函数执行时间测量
 * @example
 * const result = measure(() => {
 *   // 一些耗时操作
 *   return 'done'
 * })
 * console.log(result.value, result.time) // 'done', 123 (ms)
 */
export function measure<T>(fn: () => T): { value: T, time: number } {
  const start = performance.now()
  const value = fn()
  const time = performance.now() - start
  return { value, time }
}

/**
 * 异步函数执行时间测量
 * @example
 * const result = await measureAsync(async () => {
 *   await fetch('...')
 *   return 'done'
 * })
 * console.log(result.value, result.time) // 'done', 456 (ms)
 */
export async function measureAsync<T>(
  fn: () => Promise<T>,
): Promise<{ value: T, time: number }> {
  const start = performance.now()
  const value = await fn()
  const time = performance.now() - start
  return { value, time }
}

/**
 * 创建一个限制执行次数的函数
 * @example
 * const fn = before(3, () => console.log('called'))
 * fn() // 'called'
 * fn() // 'called'
 * fn() // 不执行
 */
export function before<T extends (...args: any[]) => any>(
  n: number,
  fn: T,
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  let count = 0
  let result: ReturnType<T>

  return function (this: any, ...args: Parameters<T>) {
    if (count < n) {
      count++
      result = fn.apply(this, args)
      return result
    }
    return result
  }
}

/**
 * 创建一个在第 n 次调用后才执行的函数
 * @example
 * const fn = after(3, () => console.log('called'))
 * fn() // 不执行
 * fn() // 不执行
 * fn() // 'called'
 */
export function after<T extends (...args: any[]) => any>(
  n: number,
  fn: T,
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  let count = 0

  return function (this: any, ...args: Parameters<T>) {
    count++
    if (count >= n) {
      return fn.apply(this, args)
    }
  }
}

