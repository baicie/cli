# 函数工具

## debounce

防抖。

```typescript
import { debounce } from '@baicie/tools'

const debouncedFn = debounce(() => {
  console.log('called')
}, 300)

debouncedFn()
debouncedFn()
debouncedFn()
// 只会在最后一次调用 300ms 后执行一次
```

## throttle

节流。

```typescript
import { throttle } from '@baicie/tools'

const throttledFn = throttle(() => {
  console.log('called')
}, 300)

throttledFn()
throttledFn()
throttledFn()
// 每 300ms 最多执行一次
```

## once

函数只执行一次。

```typescript
import { once } from '@baicie/tools'

const init = once(() => {
  console.log('initialized')
})

init() // 'initialized'
init() // 不会执行
```

## memoize

结果缓存（记忆化）。

```typescript
import { memoize } from '@baicie/tools'

const expensiveFn = memoize((n: number) => {
  console.log('computing...')
  return n * 2
})

expensiveFn(5) // 'computing...' 10
expensiveFn(5) // 10 (使用缓存)
```

## curry

柯里化。

```typescript
import { curry } from '@baicie/tools'

const add = (a: number, b: number, c: number) => a + b + c
const curried = curry(add)

curried(1)(2)(3) // 6
curried(1, 2)(3) // 6
```

## compose

函数组合。

```typescript
import { compose } from '@baicie/tools'

const add = (x: number) => x + 1
const multiply = (x: number) => x * 2
const composed = compose(multiply, add)

composed(5) // 12 ((5 + 1) * 2)
```

## pipe

函数管道。

```typescript
import { pipe } from '@baicie/tools'

const add = (x: number) => x + 1
const multiply = (x: number) => x * 2
const piped = pipe(add, multiply)

piped(5) // 12 ((5 + 1) * 2)
```

## partial

偏应用。

```typescript
import { partial } from '@baicie/tools'

const add = (a: number, b: number, c: number) => a + b + c
const partialAdd = partial(add, 1, 2)

partialAdd(3) // 6
```

## measure / measureAsync

执行时间测量。

```typescript
import { measure, measureAsync } from '@baicie/tools'

const result = measure(() => {
  // 执行一些操作
  return 42
})
console.log(result.time) // 执行时间（毫秒）
console.log(result.result) // 42
```

## before / after

限制执行次数。

```typescript
import { before, after } from '@baicie/tools'

const fn = before(3, () => console.log('called'))
fn() // 'called'
fn() // 'called'
fn() // 'called'
fn() // 不会执行
```
