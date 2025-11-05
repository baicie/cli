# URL 工具

## parseQuery

解析 URL 参数为对象。

```typescript
import { parseQuery } from '@baicie/tools'

parseQuery('?name=test&age=20')
// { name: 'test', age: '20' }
```

## stringifyQuery

对象转 URL 参数。

```typescript
import { stringifyQuery } from '@baicie/tools'

stringifyQuery({ name: 'test', age: 20 })
// 'name=test&age=20'
```

## addQuery

为 URL 添加查询参数。

```typescript
import { addQuery } from '@baicie/tools'

addQuery('https://example.com', { name: 'test' })
// 'https://example.com?name=test'
```

## removeQuery

从 URL 中移除指定参数。

```typescript
import { removeQuery } from '@baicie/tools'

removeQuery('https://example.com?name=test&age=20', ['age'])
// 'https://example.com?name=test'
```

## getQueryParam

获取 URL 中的指定参数值。

```typescript
import { getQueryParam } from '@baicie/tools'

getQueryParam('https://example.com?name=test', 'name')
// 'test'
```

## getDomain

获取 URL 的域名。

```typescript
import { getDomain } from '@baicie/tools'

getDomain('https://www.example.com/path')
// 'www.example.com'
```

## getProtocol

获取 URL 的协议。

```typescript
import { getProtocol } from '@baicie/tools'

getProtocol('https://example.com') // 'https:'
```

## getPath

获取 URL 的路径。

```typescript
import { getPath } from '@baicie/tools'

getPath('https://example.com/path/to/page')
// '/path/to/page'
```

## isAbsoluteUrl

判断绝对 URL。

```typescript
import { isAbsoluteUrl } from '@baicie/tools'

isAbsoluteUrl('https://example.com') // true
isAbsoluteUrl('/path') // false
```

## joinUrl

拼接 URL。

```typescript
import { joinUrl } from '@baicie/tools'

joinUrl('https://example.com', 'path', 'to')
// 'https://example.com/path/to'
```

## encodeUrl / decodeUrl

URL 编解码。

```typescript
import { encodeUrl, decodeUrl } from '@baicie/tools'

const encoded = encodeUrl('hello world')
decodeUrl(encoded) // 'hello world'
```

## getFileExtension

获取文件扩展名。

```typescript
import { getFileExtension } from '@baicie/tools'

getFileExtension('file.txt') // 'txt'
getFileExtension('file.min.js') // 'js'
```
