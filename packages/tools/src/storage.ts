/**
 * 浏览器存储工具方法
 */

/**
 * localStorage 封装
 */
export const storage = {
  /**
   * 设置 localStorage
   * @example
   * storage.set('user', { name: 'test' })
   */
  set(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    }
    catch (error) {
      console.error('localStorage set error:', error)
    }
  },

  /**
   * 获取 localStorage
   * @example
   * storage.get('user') // { name: 'test' }
   */
  get<T = any>(key: string, defaultValue?: T): T | null {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue ?? null
    }
    catch (error) {
      console.error('localStorage get error:', error)
      return defaultValue ?? null
    }
  },

  /**
   * 删除 localStorage
   * @example
   * storage.remove('user')
   */
  remove(key: string): void {
    try {
      localStorage.removeItem(key)
    }
    catch (error) {
      console.error('localStorage remove error:', error)
    }
  },

  /**
   * 清空 localStorage
   * @example
   * storage.clear()
   */
  clear(): void {
    try {
      localStorage.clear()
    }
    catch (error) {
      console.error('localStorage clear error:', error)
    }
  },

  /**
   * 判断 key 是否存在
   * @example
   * storage.has('user') // true
   */
  has(key: string): boolean {
    return localStorage.getItem(key) !== null
  },

  /**
   * 获取所有 keys
   * @example
   * storage.keys() // ['user', 'token']
   */
  keys(): string[] {
    return Object.keys(localStorage)
  },
}

/**
 * sessionStorage 封装
 */
export const sessionStorage = {
  /**
   * 设置 sessionStorage
   */
  set(key: string, value: any): void {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value))
    }
    catch (error) {
      console.error('sessionStorage set error:', error)
    }
  },

  /**
   * 获取 sessionStorage
   */
  get<T = any>(key: string, defaultValue?: T): T | null {
    try {
      const item = window.sessionStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue ?? null
    }
    catch (error) {
      console.error('sessionStorage get error:', error)
      return defaultValue ?? null
    }
  },

  /**
   * 删除 sessionStorage
   */
  remove(key: string): void {
    try {
      window.sessionStorage.removeItem(key)
    }
    catch (error) {
      console.error('sessionStorage remove error:', error)
    }
  },

  /**
   * 清空 sessionStorage
   */
  clear(): void {
    try {
      window.sessionStorage.clear()
    }
    catch (error) {
      console.error('sessionStorage clear error:', error)
    }
  },

  /**
   * 判断 key 是否存在
   */
  has(key: string): boolean {
    return window.sessionStorage.getItem(key) !== null
  },

  /**
   * 获取所有 keys
   */
  keys(): string[] {
    return Object.keys(window.sessionStorage)
  },
}

/**
 * 带过期时间的 localStorage
 */
export const storageWithExpiry = {
  /**
   * 设置带过期时间的数据
   * @param key 键
   * @param value 值
   * @param ttl 过期时间（毫秒）
   * @example
   * storageWithExpiry.set('user', { name: 'test' }, 3600000) // 1小时后过期
   */
  set(key: string, value: any, ttl: number): void {
    const now = Date.now()
    const item = {
      value,
      expiry: now + ttl,
    }
    storage.set(key, item)
  },

  /**
   * 获取数据（会自动检查是否过期）
   * @example
   * storageWithExpiry.get('user') // { name: 'test' } 或 null（如果过期）
   */
  get<T = any>(key: string): T | null {
    const item = storage.get<{ value: T, expiry: number }>(key)

    if (!item) {
      return null
    }

    const now = Date.now()

    if (now > item.expiry) {
      storage.remove(key)
      return null
    }

    return item.value
  },

  /**
   * 删除数据
   */
  remove(key: string): void {
    storage.remove(key)
  },

  /**
   * 清空所有数据
   */
  clear(): void {
    storage.clear()
  },
}

/**
 * Cookie 工具
 */
export const cookie = {
  /**
   * 设置 Cookie
   * @example
   * cookie.set('token', 'abc123', { expires: 7, path: '/' })
   */
  set(
    name: string,
    value: string,
    options: {
      expires?: number | Date
      path?: string
      domain?: string
      secure?: boolean
      sameSite?: 'Strict' | 'Lax' | 'None'
    } = {},
  ): void {
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

    if (options.expires) {
      const expires = typeof options.expires === 'number'
        ? new Date(Date.now() + options.expires * 86400000)
        : options.expires
      cookieString += `; expires=${expires.toUTCString()}`
    }

    if (options.path) {
      cookieString += `; path=${options.path}`
    }

    if (options.domain) {
      cookieString += `; domain=${options.domain}`
    }

    if (options.secure) {
      cookieString += '; secure'
    }

    if (options.sameSite) {
      cookieString += `; SameSite=${options.sameSite}`
    }

    document.cookie = cookieString
  },

  /**
   * 获取 Cookie
   * @example
   * cookie.get('token') // 'abc123'
   */
  get(name: string): string | null {
    const cookies = document.cookie.split('; ')

    for (const cookie of cookies) {
      const [key, value] = cookie.split('=')
      if (decodeURIComponent(key) === name) {
        return decodeURIComponent(value)
      }
    }

    return null
  },

  /**
   * 删除 Cookie
   * @example
   * cookie.remove('token')
   */
  remove(name: string, options: { path?: string, domain?: string } = {}): void {
    this.set(name, '', { ...options, expires: -1 })
  },

  /**
   * 判断 Cookie 是否存在
   * @example
   * cookie.has('token') // true
   */
  has(name: string): boolean {
    return this.get(name) !== null
  },

  /**
   * 获取所有 Cookie
   * @example
   * cookie.getAll() // { token: 'abc123', userId: '456' }
   */
  getAll(): Record<string, string> {
    const cookies = document.cookie.split('; ')
    const result: Record<string, string> = {}

    for (const cookie of cookies) {
      const [key, value] = cookie.split('=')
      if (key) {
        result[decodeURIComponent(key)] = decodeURIComponent(value || '')
      }
    }

    return result
  },
}

