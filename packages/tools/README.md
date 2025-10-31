# @baicie/tools

一个实用的 JavaScript/TypeScript 工具函数库，提供常用的工具方法，帮助你提高开发效率。

## 安装

```bash
npm install @baicie/tools
# or
pnpm add @baicie/tools
# or
yarn add @baicie/tools
```

## 使用

```typescript
import { unique, debounce, formatDate } from '@baicie/tools'

// 数组去重
const arr = unique([1, 2, 2, 3, 3, 4])
console.log(arr) // [1, 2, 3, 4]

// 防抖函数
const debouncedFn = debounce(() => {
  console.log('搜索...')
}, 300)

// 格式化日期
const date = formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
console.log(date) // '2024-01-01 12:00:00'
```

## 功能模块

### 📦 数组工具 (array)

- `unique` - 数组去重
- `uniqueBy` - 根据属性去重
- `groupBy` - 数组分组
- `chunk` - 数组分块
- `shuffle` - 数组打乱
- `sum` - 数组求和
- `average` - 数组平均值
- `intersection` - 数组交集
- `difference` - 数组差集
- `union` - 数组并集
- `compact` - 移除假值
- `flatten` - 数组扁平化
- `sample` - 随机取一个
- `sampleSize` - 随机取多个
- `paginate` - 数组分页

### 🎯 对象工具 (object)

- `deepClone` - 深拷贝
- `deepMerge` - 深度合并
- `get` - 获取深层属性
- `set` - 设置深层属性
- `unset` - 删除深层属性
- `pick` - 提取指定属性
- `omit` - 排除指定属性
- `isEmpty` - 判断是否为空
- `invert` - 键值互换
- `cleanObject` - 移除空值
- `flattenObject` - 扁平化对象
- `unflattenObject` - 反扁平化

### 🔤 字符串工具 (string)

- `capitalize` - 首字母大写
- `camelToKebab` - 驼峰转短横线
- `kebabToCamel` - 短横线转驼峰
- `snakeToCamel` - 下划线转驼峰
- `camelToSnake` - 驼峰转下划线
- `toPascalCase` - 转帕斯卡命名
- `truncate` - 截断字符串
- `stripHtml` - 移除 HTML 标签
- `escapeHtml` - 转义 HTML
- `randomString` - 随机字符串
- `reverse` - 字符串反转
- `isPalindrome` - 判断回文
- `template` - 字符串模板
- `hasChinese` - 判断包含中文
- `byteLength` - 字节长度

### 🔢 数字工具 (number)

- `randomInt` - 随机整数
- `randomFloat` - 随机浮点数
- `clamp` - 限制范围
- `formatNumber` - 千分位格式化
- `formatFileSize` - 文件大小格式化
- `percentage` - 百分比计算
- `padZero` - 数字补零
- `round/ceil/floor` - 四舍五入（支持小数位）
- `inRange` - 判断范围
- `gcd/lcm` - 最大公约数/最小公倍数
- `isPrime` - 判断质数
- `factorial` - 阶乘
- `fibonacci` - 斐波那契数列

### 📅 日期工具 (date)

- `formatDate` - 格式化日期
- `timeAgo` - 相对时间
- `isToday/isYesterday/isTomorrow` - 日期判断
- `daysBetween` - 天数差
- `addDays/addMonths/addYears` - 日期加减
- `startOfMonth/endOfMonth` - 月份起止
- `getDaysInMonth` - 月份天数
- `isLeapYear` - 判断闰年
- `getWeekday` - 星期几
- `isWeekend` - 判断周末
- `getQuarter` - 获取季度
- `isDateInRange` - 日期范围判断

### ⏱️ Promise 工具 (promise)

- `sleep` - 延迟执行
- `timeout` - 超时控制
- `retry` - 重试执行
- `promisePool` - 并发控制
- `allSettled` - 错误处理版 Promise.all
- `serial` - 串行执行
- `cancellable` - 可取消的 Promise
- `createDeferred` - 手动控制 Promise
- `poll` - 轮询直到满足条件

### 🔧 函数工具 (function)

- `debounce` - 防抖
- `throttle` - 节流
- `once` - 只执行一次
- `memoize` - 结果缓存
- `curry` - 柯里化
- `compose` - 函数组合
- `pipe` - 函数管道
- `partial` - 偏应用
- `measure/measureAsync` - 执行时间测量
- `before/after` - 限制执行次数

### 🎭 类型判断 (type)

- `getType` - 获取数据类型
- `isString/isNumber/isBoolean` - 基础类型判断
- `isObject/isArray/isFunction` - 复杂类型判断
- `isDate/isRegExp/isError/isPromise` - 特殊对象判断
- `isMap/isSet/isWeakMap/isWeakSet` - 集合类型判断
- `isEmpty` - 判断空值
- `isEqual` - 深度比较

### ✅ 验证工具 (validate)

- `isEmail` - 邮箱验证
- `isPhone` - 手机号验证（中国）
- `isIdCard` - 身份证验证（中国）
- `isUrl` - URL 验证
- `isIPv4/isIPv6` - IP 地址验证
- `isCreditCard` - 信用卡号验证
- `isStrongPassword` - 强密码验证
- `isUsername` - 用户名验证
- `isChinese/isEnglish` - 语言验证
- `isHexColor` - 颜色值验证
- `isBase64/isJSON` - 格式验证

### 🔗 URL 工具 (url)

- `parseQuery` - 解析 URL 参数
- `stringifyQuery` - 对象转 URL 参数
- `addQuery` - 添加查询参数
- `removeQuery` - 移除查询参数
- `getQueryParam` - 获取参数值
- `getDomain/getProtocol/getPath` - 获取 URL 部分
- `isAbsoluteUrl` - 判断绝对 URL
- `joinUrl` - 拼接 URL
- `encodeUrl/decodeUrl` - URL 编解码
- `getFileExtension` - 获取文件扩展名

### 💾 存储工具 (storage)

- `storage` - localStorage 封装
- `sessionStorage` - sessionStorage 封装
- `storageWithExpiry` - 带过期时间的存储
- `cookie` - Cookie 工具

### 🎲 随机工具 (random)

- `randomId` - 随机 ID
- `uuid` - UUID 生成
- `randomColor` - 随机颜色
- `randomDate` - 随机日期
- `randomBoolean` - 随机布尔值
- `randomByWeight` - 按权重随机
- `shuffleArray` - 打乱数组
- `randomChineseName` - 随机中文名
- `randomPhone/randomEmail/randomIP` - 随机数据生成

## 开发

```bash
# 安装依赖
pnpm install

# 开发模式（监听文件变化）
pnpm dev

# 构建
pnpm build

# 类型检查
pnpm typecheck
```

## License

MIT
