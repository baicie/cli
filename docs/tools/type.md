# 类型判断

## getType

获取数据类型。

```typescript
import { getType } from '@baicie/tools'

getType([]) // 'Array'
getType({}) // 'Object'
getType(null) // 'Null'
```

## 基础类型判断

```typescript
import {
  isString,
  isNumber,
  isBoolean,
  isUndefined,
  isNull,
  isNil,
} from '@baicie/tools'

isString('hello') // true
isNumber(123) // true
isBoolean(true) // true
isUndefined(undefined) // true
isNull(null) // true
isNil(null) // true
isNil(undefined) // true
```

## 复杂类型判断

```typescript
import { isObject, isPlainObject, isArray, isFunction } from '@baicie/tools'

isObject({}) // true
isPlainObject({}) // true
isPlainObject(new Date()) // false
isArray([]) // true
isFunction(() => {}) // true
```

## 特殊对象判断

```typescript
import { isDate, isRegExp, isError, isPromise } from '@baicie/tools'

isDate(new Date()) // true
isRegExp(/test/) // true
isError(new Error()) // true
isPromise(Promise.resolve()) // true
```

## 集合类型判断

```typescript
import { isMap, isSet, isWeakMap, isWeakSet } from '@baicie/tools'

isMap(new Map()) // true
isSet(new Set()) // true
```

## isEmpty

判断空值。

```typescript
import { isEmpty } from '@baicie/tools'

isEmpty([]) // true
isEmpty({}) // true
isEmpty([1]) // false
```

## isEqual

深度比较。

```typescript
import { isEqual } from '@baicie/tools'

isEqual({ a: 1 }, { a: 1 }) // true
isEqual({ a: 1 }, { a: 2 }) // false
```
