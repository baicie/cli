# 验证工具

## isEmail

验证邮箱。

```typescript
import { isEmail } from '@baicie/tools'

isEmail('test@example.com') // true
isEmail('invalid') // false
```

## isPhone

验证手机号（中国大陆）。

```typescript
import { isPhone } from '@baicie/tools'

isPhone('13800138000') // true
isPhone('12345678901') // false
```

## isIdCard

验证身份证号（中国大陆）。

```typescript
import { isIdCard } from '@baicie/tools'

isIdCard('110101199001011234') // true
```

## isUrl

验证 URL。

```typescript
import { isUrl } from '@baicie/tools'

isUrl('https://example.com') // true
isUrl('invalid') // false
```

## isIPv4 / isIPv6

验证 IP 地址。

```typescript
import { isIPv4, isIPv6 } from '@baicie/tools'

isIPv4('192.168.1.1') // true
isIPv6('2001:0db8:85a3:0000:0000:8a2e:0370:7334') // true
```

## isMac

验证 MAC 地址。

```typescript
import { isMac } from '@baicie/tools'

isMac('00:1B:44:11:3A:B7') // true
```

## isCreditCard

验证信用卡号。

```typescript
import { isCreditCard } from '@baicie/tools'

isCreditCard('4111111111111111') // true
```

## isStrongPassword

验证强密码。

```typescript
import { isStrongPassword } from '@baicie/tools'

isStrongPassword('Password123!') // true
isStrongPassword('weak') // false
```

## isUsername

验证用户名。

```typescript
import { isUsername } from '@baicie/tools'

isUsername('user123') // true
isUsername('user name') // false
```

## isChinese / isEnglish

语言验证。

```typescript
import { isChinese, isEnglish } from '@baicie/tools'

isChinese('你好') // true
isEnglish('hello') // true
```

## isHexColor

验证颜色值。

```typescript
import { isHexColor } from '@baicie/tools'

isHexColor('#ff0000') // true
isHexColor('#f00') // true
```

## isBase64 / isJSON

格式验证。

```typescript
import { isBase64, isJSON } from '@baicie/tools'

isBase64('SGVsbG8=') // true
isJSON('{"a":1}') // true
```
