/**
 * 字符串工具方法
 */

/**
 * 首字母大写
 * @example
 * capitalize('hello') // 'Hello'
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 首字母小写
 * @example
 * uncapitalize('Hello') // 'hello'
 */
export function uncapitalize(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1)
}

/**
 * 驼峰转换为短横线分隔
 * @example
 * camelToKebab('helloWorld') // 'hello-world'
 */
export function camelToKebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

/**
 * 短横线转换为驼峰
 * @example
 * kebabToCamel('hello-world') // 'helloWorld'
 */
export function kebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
}

/**
 * 下划线转换为驼峰
 * @example
 * snakeToCamel('hello_world') // 'helloWorld'
 */
export function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
}

/**
 * 驼峰转换为下划线
 * @example
 * camelToSnake('helloWorld') // 'hello_world'
 */
export function camelToSnake(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()
}

/**
 * 转换为帕斯卡命名（大驼峰）
 * @example
 * toPascalCase('hello-world') // 'HelloWorld'
 * toPascalCase('hello_world') // 'HelloWorld'
 */
export function toPascalCase(str: string): string {
  return str
    .split(/[-_\s]+/)
    .map(word => capitalize(word))
    .join('')
}

/**
 * 截断字符串
 * @example
 * truncate('hello world', 8) // 'hello...'
 * truncate('hello world', 8, '***') // 'hello***'
 */
export function truncate(str: string, length: number, suffix = '...'): string {
  if (str.length <= length) return str
  return str.slice(0, length - suffix.length) + suffix
}

/**
 * 移除字符串中的 HTML 标签
 * @example
 * stripHtml('<p>hello</p>') // 'hello'
 */
export function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, '')
}

/**
 * 转义 HTML 特殊字符
 * @example
 * escapeHtml('<div>test</div>') // '&lt;div&gt;test&lt;/div&gt;'
 */
export function escapeHtml(str: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return str.replace(/[&<>"']/g, char => map[char])
}

/**
 * 反转义 HTML 特殊字符
 * @example
 * unescapeHtml('&lt;div&gt;test&lt;/div&gt;') // '<div>test</div>'
 */
export function unescapeHtml(str: string): string {
  const map: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
  }
  return str.replace(/&(amp|lt|gt|quot|#039);/g, entity => map[entity])
}

/**
 * 生成随机字符串（仅字母数字）
 * @example
 * randomStr(8) // 'a3f8k2j1'
 */
export function randomStr(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * 字符串反转
 * @example
 * reverse('hello') // 'olleh'
 */
export function reverse(str: string): string {
  return str.split('').reverse().join('')
}

/**
 * 判断是否为回文字符串
 * @example
 * isPalindrome('racecar') // true
 * isPalindrome('hello') // false
 */
export function isPalindrome(str: string): boolean {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '')
  return cleaned === reverse(cleaned)
}

/**
 * 统计字符串中各字符出现次数
 * @example
 * countChars('hello') // { h: 1, e: 1, l: 2, o: 1 }
 */
export function countChars(str: string): Record<string, number> {
  const result: Record<string, number> = {}
  for (const char of str) {
    result[char] = (result[char] || 0) + 1
  }
  return result
}

/**
 * 字符串模板替换
 * @example
 * template('Hello {name}, you are {age} years old', { name: 'Tom', age: 20 })
 * // 'Hello Tom, you are 20 years old'
 */
export function template(str: string, data: Record<string, any>): string {
  return str.replace(/\{(\w+)\}/g, (match, key) => {
    return data[key] !== undefined ? String(data[key]) : match
  })
}

/**
 * 移除字符串中的所有空格
 * @example
 * removeSpaces('h e l l o') // 'hello'
 */
export function removeSpaces(str: string): string {
  return str.replace(/\s+/g, '')
}

/**
 * 判断字符串是否包含中文
 * @example
 * hasChinese('hello世界') // true
 */
export function hasChinese(str: string): boolean {
  return /[\u4E00-\u9FA5]/.test(str)
}

/**
 * 获取字符串的字节长度（中文算2字节）
 * @example
 * byteLength('hello世界') // 11
 */
export function byteLength(str: string): number {
  let length = 0
  for (let i = 0; i < str.length; i++) {
    length += str.charCodeAt(i) > 255 ? 2 : 1
  }
  return length
}

/**
 * 按字节截断字符串
 * @example
 * truncateByBytes('hello世界', 8) // 'hello世'
 */
export function truncateByBytes(str: string, maxBytes: number): string {
  let length = 0
  let result = ''

  for (let i = 0; i < str.length; i++) {
    const charBytes = str.charCodeAt(i) > 255 ? 2 : 1
    if (length + charBytes > maxBytes) {
      break
    }
    length += charBytes
    result += str[i]
  }

  return result
}
