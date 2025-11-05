import { describe, expect, it } from 'vitest'
import {
  addQuery,
  decodeUrl,
  encodeUrl,
  getDomain,
  getFileExtension,
  getPath,
  getProtocol,
  getQueryParam,
  isAbsoluteUrl,
  joinUrl,
  parseQuery,
  removeQuery,
  stringifyQuery,
} from '../src/url'

describe('parseQuery', () => {
  it('应该解析URL参数', () => {
    expect(parseQuery('?name=test&age=20')).toEqual({
      name: 'test',
      age: '20',
    })
  })
})

describe('stringifyQuery', () => {
  it('应该转换为URL参数', () => {
    expect(stringifyQuery({ name: 'test', age: 20 })).toBe('name=test&age=20')
  })
})

describe('addQuery', () => {
  it('应该添加查询参数', () => {
    expect(addQuery('https://example.com', { name: 'test' })).toBe(
      'https://example.com?name=test',
    )
  })
})

describe('removeQuery', () => {
  it('应该移除查询参数', () => {
    expect(removeQuery('https://example.com?name=test&age=20', ['age'])).toBe(
      'https://example.com?name=test',
    )
  })
})

describe('getQueryParam', () => {
  it('应该获取参数值', () => {
    expect(getQueryParam('https://example.com?name=test', 'name')).toBe('test')
  })
})

describe('getDomain', () => {
  it('应该获取域名', () => {
    expect(getDomain('https://www.example.com/path')).toBe('www.example.com')
  })
})

describe('getProtocol', () => {
  it('应该获取协议', () => {
    expect(getProtocol('https://example.com')).toBe('https:')
  })
})

describe('getPath', () => {
  it('应该获取路径', () => {
    expect(getPath('https://example.com/path/to/page')).toBe('/path/to/page')
  })
})

describe('isAbsoluteUrl', () => {
  it('应该判断绝对URL', () => {
    expect(isAbsoluteUrl('https://example.com')).toBe(true)
    expect(isAbsoluteUrl('/path')).toBe(false)
  })
})

describe('joinUrl', () => {
  it('应该拼接URL', () => {
    expect(joinUrl('https://example.com', 'path', 'to')).toBe(
      'https://example.com/path/to',
    )
  })
})

describe('encodeUrl/decodeUrl', () => {
  it('应该编解码URL', () => {
    const encoded = encodeUrl('hello world')
    expect(decodeUrl(encoded)).toBe('hello world')
  })
})

describe('getFileExtension', () => {
  it('应该获取文件扩展名', () => {
    expect(getFileExtension('file.txt')).toBe('txt')
    expect(getFileExtension('file.min.js')).toBe('js')
  })
})
