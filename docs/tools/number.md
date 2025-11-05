# 数字工具

## randomInt / randomFloat

生成随机整数和浮点数。

```typescript
import { randomInt, randomFloat } from '@baicie/tools'

randomInt(1, 10) // 5
randomFloat(1, 10, 2) // 5.47
```

## clamp

限制数字在指定范围内。

```typescript
import { clamp } from '@baicie/tools'

clamp(15, 0, 10) // 10
clamp(-5, 0, 10) // 0
```

## formatNumber

格式化数字（千分位）。

```typescript
import { formatNumber } from '@baicie/tools'

formatNumber(1234567.89) // '1,234,567.89'
```

## formatFileSize

格式化文件大小。

```typescript
import { formatFileSize } from '@baicie/tools'

formatFileSize(1024) // '1 KB'
formatFileSize(1048576) // '1 MB'
```

## percentage

百分比计算。

```typescript
import { percentage } from '@baicie/tools'

percentage(25, 100) // 25
percentage(1, 3, 2) // 33.33
```

## padZero

数字补零。

```typescript
import { padZero } from '@baicie/tools'

padZero(5, 3) // '005'
```

## isEven / isOdd

判断奇偶。

```typescript
import { isEven, isOdd } from '@baicie/tools'

isEven(4) // true
isOdd(5) // true
```

## round / ceil / floor

四舍五入（支持小数位）。

```typescript
import { round, ceil, floor } from '@baicie/tools'

round(1.2345, 2) // 1.23
ceil(1.2345, 2) // 1.24
floor(1.2345, 2) // 1.23
```

## inRange

判断范围。

```typescript
import { inRange } from '@baicie/tools'

inRange(5, 0, 10) // true
```

## gcd / lcm

最大公约数和最小公倍数。

```typescript
import { gcd, lcm } from '@baicie/tools'

gcd(12, 18) // 6
lcm(12, 18) // 36
```

## isPrime

判断质数。

```typescript
import { isPrime } from '@baicie/tools'

isPrime(7) // true
```

## factorial

阶乘。

```typescript
import { factorial } from '@baicie/tools'

factorial(5) // 120
```

## fibonacci

斐波那契数列。

```typescript
import { fibonacci } from '@baicie/tools'

fibonacci(5) // [0, 1, 1, 2, 3]
```
