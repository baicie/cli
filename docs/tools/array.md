# 数组工具

## unique

数组去重。

```typescript
import { unique } from '@baicie/tools'

unique([1, 2, 2, 3, 3, 4]) // [1, 2, 3, 4]
```

## uniqueBy

根据对象的某个属性去重。

```typescript
import { uniqueBy } from '@baicie/tools'

uniqueBy([{ id: 1 }, { id: 2 }, { id: 1 }], 'id')
// [{ id: 1 }, { id: 2 }]
```

## groupBy

数组分组。

```typescript
import { groupBy } from '@baicie/tools'

groupBy(
  [
    { type: 'a', val: 1 },
    { type: 'b', val: 2 },
    { type: 'a', val: 3 },
  ],
  'type',
)
// { a: [{ type: 'a', val: 1 }, { type: 'a', val: 3 }], b: [{ type: 'b', val: 2 }] }
```

## chunk

数组分块。

```typescript
import { chunk } from '@baicie/tools'

chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
```

## shuffle

数组打乱。

```typescript
import { shuffle } from '@baicie/tools'

shuffle([1, 2, 3, 4, 5]) // [3, 1, 5, 2, 4]
```

## sum / average

数组求和和平均值。

```typescript
import { sum, average } from '@baicie/tools'

sum([1, 2, 3, 4, 5]) // 15
average([1, 2, 3, 4, 5]) // 3
```

## intersection / difference / union

数组交集、差集和并集。

```typescript
import { intersection, difference, union } from '@baicie/tools'

intersection([1, 2, 3], [2, 3, 4]) // [2, 3]
difference([1, 2, 3], [2, 3, 4]) // [1]
union([1, 2, 3], [2, 3, 4]) // [1, 2, 3, 4]
```

## compact

移除数组中的假值。

```typescript
import { compact } from '@baicie/tools'

compact([0, 1, false, 2, '', 3, null, undefined, NaN])
// [1, 2, 3]
```

## flatten

数组扁平化。

```typescript
import { flatten } from '@baicie/tools'

flatten([1, [2, [3, [4]]]], 2) // [1, 2, 3, [4]]
```

## sample / sampleSize

随机取元素。

```typescript
import { sample, sampleSize } from '@baicie/tools'

sample([1, 2, 3, 4, 5]) // 3
sampleSize([1, 2, 3, 4, 5], 3) // [2, 5, 1]
```

## paginate

数组分页。

```typescript
import { paginate } from '@baicie/tools'

paginate([1, 2, 3, 4, 5, 6, 7], 2, 3) // [4, 5, 6]
```
