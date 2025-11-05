# 快速开始

## 安装

```bash
npm install @baicie/tools
```

## 基础用法

### 按需导入

```typescript
import { unique, debounce, formatDate } from '@baicie/tools'

// 数组去重
const uniqueArr = unique([1, 2, 2, 3, 3, 4])

// 防抖
const debouncedSearch = debounce(() => {
  console.log('搜索...')
}, 300)

// 日期格式化
const formatted = formatDate(new Date(), 'YYYY-MM-DD')
```

### 命名空间导入

```typescript
import * as Tools from '@baicie/tools'

const arr = Tools.unique([1, 2, 2, 3])
const date = Tools.formatDate(new Date())
```

## 常见用例

### 数组操作

```typescript
import { unique, groupBy, chunk, intersection, union } from '@baicie/tools'

// 去重
const arr = unique([1, 2, 2, 3])

// 分组
const grouped = groupBy(
  [
    { type: 'a', value: 1 },
    { type: 'b', value: 2 },
  ],
  'type',
)

// 分块
const chunks = chunk([1, 2, 3, 4, 5], 2)

// 交集和并集
const inter = intersection([1, 2, 3], [2, 3, 4])
const uni = union([1, 2, 3], [2, 3, 4])
```

### 对象操作

```typescript
import { deepClone, deepMerge, pick, omit } from '@baicie/tools'

// 深拷贝
const cloned = deepClone({ a: { b: 1 } })

// 深度合并
const merged = deepMerge({ a: 1 }, { b: 2 })

// 提取/排除属性
const picked = pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])
const omitted = omit({ a: 1, b: 2, c: 3 }, ['b'])
```

### 函数工具

```typescript
import { debounce, throttle, memoize } from '@baicie/tools'

// 防抖
const debounced = debounce(() => console.log('called'), 300)

// 节流
const throttled = throttle(() => console.log('called'), 300)

// 缓存
const memoized = memoize((n: number) => n * 2)
```
