# Promise 工具

## sleep

延迟执行。

```typescript
import { sleep } from '@baicie/tools'

await sleep(1000) // 延迟 1 秒
```

## timeout

超时控制。

```typescript
import { timeout } from '@baicie/tools'

await timeout(fetch('...'), 3000) // 3秒超时
```

## retry

重试执行。

```typescript
import { retry } from '@baicie/tools'

await retry(() => fetch('...'), 3, 1000) // 最多重试3次，间隔1秒
```

## promisePool

并发控制（限制同时执行的 Promise 数量）。

```typescript
import { promisePool } from '@baicie/tools'

const tasks = urls.map(url => () => fetch(url))
const results = await promisePool(tasks, 3) // 最多同时执行 3 个
```

## allSettled

错误处理版 Promise.all。

```typescript
import { allSettled } from '@baicie/tools'

const results = await allSettled([
  Promise.resolve(1),
  Promise.reject(new Error('Error')),
  Promise.resolve(3),
])
// 所有 Promise 都会执行，不会因为某个失败而中断
```

## serial

串行执行。

```typescript
import { serial } from '@baicie/tools'

const results = await serial([
  () => fetch('/api/1'),
  () => fetch('/api/2'),
  () => fetch('/api/3'),
])
// 按顺序执行
```

## cancellable

可取消的 Promise。

```typescript
import { cancellable } from '@baicie/tools'

const { promise, cancel } = cancellable(fetch('/api'))
cancel() // 取消请求
```

## createDeferred

手动控制 Promise。

```typescript
import { createDeferred } from '@baicie/tools'

const deferred = createDeferred<number>()
setTimeout(() => deferred.resolve(42), 1000)
const result = await deferred.promise // 42
```

## poll

轮询直到满足条件。

```typescript
import { poll } from '@baicie/tools'

await poll(
  () => checkStatus() === 'ready',
  () => fetchStatus(),
  1000,
)
// 每 1 秒检查一次，直到状态为 'ready'
```
