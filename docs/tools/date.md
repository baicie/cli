# 日期工具

## formatDate

格式化日期。

```typescript
import { formatDate } from '@baicie/tools'

formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
// '2024-01-01 12:00:00'
```

## timeAgo

相对时间描述。

```typescript
import { timeAgo } from '@baicie/tools'

timeAgo(new Date(Date.now() - 60000)) // '1 分钟前'
```

## isToday / isYesterday / isTomorrow

日期判断。

```typescript
import { isToday, isYesterday, isTomorrow } from '@baicie/tools'

isToday(new Date()) // true
isYesterday(new Date(Date.now() - 86400000)) // true
isTomorrow(new Date(Date.now() + 86400000)) // true
```

## daysBetween

计算天数差。

```typescript
import { daysBetween } from '@baicie/tools'

daysBetween(new Date('2024-01-01'), new Date('2024-01-05'))
// 4
```

## addDays / addMonths / addYears

日期加减。

```typescript
import { addDays, addMonths, addYears } from '@baicie/tools'

addDays(new Date('2024-01-01'), 5)
addMonths(new Date('2024-01-01'), 1)
addYears(new Date('2024-01-01'), 1)
```

## startOfMonth / endOfMonth

月份起止。

```typescript
import { startOfMonth, endOfMonth } from '@baicie/tools'

startOfMonth(new Date('2024-01-15'))
endOfMonth(new Date('2024-01-15'))
```

## getDaysInMonth

获取月份天数。

```typescript
import { getDaysInMonth } from '@baicie/tools'

getDaysInMonth(2024, 1) // 31
getDaysInMonth(2024, 2) // 29 (闰年)
```

## isLeapYear

判断闰年。

```typescript
import { isLeapYear } from '@baicie/tools'

isLeapYear(2024) // true
```

## getWeekday

获取星期几。

```typescript
import { getWeekday } from '@baicie/tools'

getWeekday(new Date('2024-01-01')) // 1 (星期一)
```

## isWeekend

判断周末。

```typescript
import { isWeekend } from '@baicie/tools'

isWeekend(new Date('2024-01-06')) // true (星期六)
```

## getQuarter

获取季度。

```typescript
import { getQuarter } from '@baicie/tools'

getQuarter(new Date('2024-01-01')) // 1
```

## isDateInRange

日期范围判断。

```typescript
import { isDateInRange } from '@baicie/tools'

isDateInRange(
  new Date('2024-01-15'),
  new Date('2024-01-01'),
  new Date('2024-01-31'),
)
// true
```
