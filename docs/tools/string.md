# 字符串工具

## capitalize

首字母大写。

```typescript
import { capitalize } from '@baicie/tools'

capitalize('hello') // 'Hello'
```

## camelToKebab / kebabToCamel

驼峰和短横线转换。

```typescript
import { camelToKebab, kebabToCamel } from '@baicie/tools'

camelToKebab('helloWorld') // 'hello-world'
kebabToCamel('hello-world') // 'helloWorld'
```

## snakeToCamel / camelToSnake

下划线和驼峰转换。

```typescript
import { snakeToCamel, camelToSnake } from '@baicie/tools'

snakeToCamel('hello_world') // 'helloWorld'
camelToSnake('helloWorld') // 'hello_world'
```

## toPascalCase

转换为帕斯卡命名。

```typescript
import { toPascalCase } from '@baicie/tools'

toPascalCase('hello-world') // 'HelloWorld'
toPascalCase('hello_world') // 'HelloWorld'
```

## truncate

截断字符串。

```typescript
import { truncate } from '@baicie/tools'

truncate('hello world', 8) // 'hello...'
truncate('hello world', 8, '***') // 'hello***'
```

## stripHtml

移除 HTML 标签。

```typescript
import { stripHtml } from '@baicie/tools'

stripHtml('<p>hello</p>') // 'hello'
```

## escapeHtml

转义 HTML 特殊字符。

```typescript
import { escapeHtml } from '@baicie/tools'

escapeHtml('<div>test</div>')
// '&lt;div&gt;test&lt;/div&gt;'
```

## reverse

字符串反转。

```typescript
import { reverse } from '@baicie/tools'

reverse('hello') // 'olleh'
```

## isPalindrome

判断回文。

```typescript
import { isPalindrome } from '@baicie/tools'

isPalindrome('racecar') // true
```

## template

字符串模板替换。

```typescript
import { template } from '@baicie/tools'

template('Hello {{name}}', { name: 'World' })
// 'Hello World'
```

## hasChinese

判断是否包含中文。

```typescript
import { hasChinese } from '@baicie/tools'

hasChinese('hello世界') // true
```

## byteLength

计算字节长度。

```typescript
import { byteLength } from '@baicie/tools'

byteLength('hello') // 5
byteLength('你好') // 6
```
