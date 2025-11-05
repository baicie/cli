# 随机工具

## randomId

生成随机 ID。

```typescript
import { randomId } from '@baicie/tools'

randomId() // 'k7j2h4g9'
randomId(16) // 'k7j2h4g9m8n5p3q1'
```

## uuid

生成 UUID (v4)。

```typescript
import { uuid } from '@baicie/tools'

uuid() // '550e8400-e29b-41d4-a716-446655440000'
```

## randomColor

生成随机颜色（十六进制）。

```typescript
import { randomColor } from '@baicie/tools'

randomColor() // '#ff5733'
```

## randomRgb / randomRgba

生成随机 RGB/RGBA 颜色。

```typescript
import { randomRgb, randomRgba } from '@baicie/tools'

randomRgb() // 'rgb(255, 87, 51)'
randomRgba() // 'rgba(255, 87, 51, 0.5)'
```

## randomDate

生成随机日期。

```typescript
import { randomDate } from '@baicie/tools'

randomDate(new Date('2020-01-01'), new Date('2024-12-31'))
```

## randomBoolean

生成随机布尔值。

```typescript
import { randomBoolean } from '@baicie/tools'

randomBoolean() // true 或 false
```

## randomByWeight

按权重随机选择。

```typescript
import { randomByWeight } from '@baicie/tools'

randomByWeight(['a', 'b', 'c'], [1, 2, 3])
// 'c' 的概率最大
```

## shuffleArray

打乱数组。

```typescript
import { shuffleArray } from '@baicie/tools'

shuffleArray([1, 2, 3, 4, 5])
// [3, 1, 5, 2, 4]
```

## randomChineseName

生成随机中文名。

```typescript
import { randomChineseName } from '@baicie/tools'

randomChineseName() // '张三'
```

## randomPhone / randomEmail / randomIP

生成随机数据。

```typescript
import { randomPhone, randomEmail, randomIP } from '@baicie/tools'

randomPhone() // '13800138000'
randomEmail() // 'test@example.com'
randomIP() // '192.168.1.1'
```
