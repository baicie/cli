# 对象工具

## deepClone

深拷贝。

```typescript
import { deepClone } from '@baicie/tools'

const obj = { a: 1, b: { c: 2 } }
const cloned = deepClone(obj)
cloned.b.c = 3
// obj.b.c 仍然是 2
```

## deepMerge

深度合并对象。

```typescript
import { deepMerge } from '@baicie/tools'

deepMerge({ a: 1, b: { c: 2 } }, { b: { d: 3 }, e: 4 })
// { a: 1, b: { c: 2, d: 3 }, e: 4 }
```

## get / set / unset

获取/设置/删除深层属性。

```typescript
import { get, set, unset } from '@baicie/tools'

const obj = { a: { b: { c: 1 } } }
get(obj, 'a.b.c') // 1
set(obj, 'a.b.d', 2)
unset(obj, 'a.b.c')
```

## pick / omit

提取/排除指定属性。

```typescript
import { pick, omit } from '@baicie/tools'

pick({ a: 1, b: 2, c: 3 }, ['a', 'c']) // { a: 1, c: 3 }
omit({ a: 1, b: 2, c: 3 }, ['b']) // { a: 1, c: 3 }
```

## isEmpty

判断是否为空。

```typescript
import { isEmpty } from '@baicie/tools'

isEmpty({}) // true
isEmpty([]) // true
isEmpty({ a: 1 }) // false
```

## invert

键值互换。

```typescript
import { invert } from '@baicie/tools'

invert({ a: 1, b: 2 }) // { 1: 'a', 2: 'b' }
```

## cleanObject

移除空值。

```typescript
import { cleanObject } from '@baicie/tools'

cleanObject({ a: 1, b: '', c: null, d: undefined })
// { a: 1 }
```

## flattenObject / unflattenObject

对象扁平化和反扁平化。

```typescript
import { flattenObject, unflattenObject } from '@baicie/tools'

flattenObject({ a: { b: { c: 1 } } })
// { 'a.b.c': 1 }

unflattenObject({ 'a.b.c': 1 })
// { a: { b: { c: 1 } } }
```
