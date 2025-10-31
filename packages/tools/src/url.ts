/**
 * URL 工具方法
 */

/**
 * 解析 URL 参数为对象
 * @example
 * parseQuery('?name=test&age=20') // { name: 'test', age: '20' }
 */
export function parseQuery(url: string): Record<string, string> {
  const query = url.includes('?') ? url.split('?')[1] : url
  const params = new URLSearchParams(query)
  const result: Record<string, string> = {}

  for (const [key, value] of params.entries()) {
    result[key] = value
  }

  return result
}

/**
 * 对象转 URL 参数
 * @example
 * stringifyQuery({ name: 'test', age: 20 }) // 'name=test&age=20'
 */
export function stringifyQuery(obj: Record<string, any>): string {
  const params = new URLSearchParams()

  for (const key in obj) {
    if (obj[key] != null) {
      params.append(key, String(obj[key]))
    }
  }

  return params.toString()
}

/**
 * 为 URL 添加查询参数
 * @example
 * addQuery('https://example.com', { name: 'test' })
 * // 'https://example.com?name=test'
 */
export function addQuery(url: string, params: Record<string, any>): string {
  const queryString = stringifyQuery(params)
  if (!queryString) return url

  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}${queryString}`
}

/**
 * 从 URL 中移除指定参数
 * @example
 * removeQuery('https://example.com?name=test&age=20', ['age'])
 * // 'https://example.com?name=test'
 */
export function removeQuery(url: string, keys: string[]): string {
  const urlObj = new URL(url)
  const params = new URLSearchParams(urlObj.search)

  for (const key of keys) {
    params.delete(key)
  }

  urlObj.search = params.toString()
  return urlObj.toString()
}

/**
 * 获取 URL 中的指定参数值
 * @example
 * getQueryParam('https://example.com?name=test', 'name') // 'test'
 */
export function getQueryParam(url: string, key: string): string | null {
  const params = parseQuery(url)
  return params[key] || null
}

/**
 * 获取 URL 的域名
 * @example
 * getDomain('https://www.example.com/path') // 'www.example.com'
 */
export function getDomain(url: string): string {
  try {
    return new URL(url).hostname
  } catch {
    return ''
  }
}

/**
 * 获取 URL 的协议
 * @example
 * getProtocol('https://example.com') // 'https:'
 */
export function getProtocol(url: string): string {
  try {
    return new URL(url).protocol
  } catch {
    return ''
  }
}

/**
 * 获取 URL 的路径
 * @example
 * getPath('https://example.com/path/to/page') // '/path/to/page'
 */
export function getPath(url: string): string {
  try {
    return new URL(url).pathname
  } catch {
    return ''
  }
}

/**
 * 获取 URL 的 hash
 * @example
 * getHash('https://example.com#section') // '#section'
 */
export function getHash(url: string): string {
  try {
    return new URL(url).hash
  } catch {
    return ''
  }
}

/**
 * 判断是否为绝对 URL
 * @example
 * isAbsoluteUrl('https://example.com') // true
 * isAbsoluteUrl('/path') // false
 */
export function isAbsoluteUrl(url: string): boolean {
  return /^[a-z][a-z0-9+.-]*:/.test(url)
}

/**
 * 拼接 URL 路径
 * @example
 * joinUrl('https://example.com', 'path', 'to', 'page')
 * // 'https://example.com/path/to/page'
 */
export function joinUrl(...parts: string[]): string {
  return parts
    .map((part, index) => {
      if (index === 0) {
        return part.replace(/\/$/, '')
      }
      return part.replace(/^\//, '').replace(/\/$/, '')
    })
    .filter(Boolean)
    .join('/')
}

/**
 * URL 编码
 * @example
 * encodeUrl('hello world') // 'hello%20world'
 */
export function encodeUrl(str: string): string {
  return encodeURIComponent(str)
}

/**
 * URL 解码
 * @example
 * decodeUrl('hello%20world') // 'hello world'
 */
export function decodeUrl(str: string): string {
  return decodeURIComponent(str)
}

/**
 * 获取文件扩展名
 * @example
 * getFileExtension('https://example.com/file.pdf') // 'pdf'
 */
export function getFileExtension(url: string): string {
  const path = getPath(url)
  const lastDot = path.lastIndexOf('.')
  return lastDot !== -1 ? path.slice(lastDot + 1) : ''
}

/**
 * 判断是否为同域 URL
 * @example
 * isSameOrigin('https://example.com/a', 'https://example.com/b') // true
 */
export function isSameOrigin(url1: string, url2: string): boolean {
  try {
    const origin1 = new URL(url1).origin
    const origin2 = new URL(url2).origin
    return origin1 === origin2
  } catch {
    return false
  }
}
