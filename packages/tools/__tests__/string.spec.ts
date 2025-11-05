import { describe, expect, it } from 'vitest'
import {
  byteLength,
  camelToKebab,
  camelToSnake,
  capitalize,
  escapeHtml,
  hasChinese,
  isPalindrome,
  kebabToCamel,
  randomStr,
  reverse,
  snakeToCamel,
  stripHtml,
  template,
  toPascalCase,
  truncate,
} from '../src/string'

describe('capitalize', () => {
  it('应该首字母大写', () => {
    expect(capitalize('hello')).toBe('Hello')
    expect(capitalize('world')).toBe('World')
  })
})

describe('camelToKebab', () => {
  it('应该转换为短横线格式', () => {
    expect(camelToKebab('helloWorld')).toBe('hello-world')
    expect(camelToKebab('myComponent')).toBe('my-component')
  })
})

describe('kebabToCamel', () => {
  it('应该转换为驼峰格式', () => {
    expect(kebabToCamel('hello-world')).toBe('helloWorld')
    expect(kebabToCamel('my-component')).toBe('myComponent')
  })
})

describe('snakeToCamel', () => {
  it('应该转换为驼峰格式', () => {
    expect(snakeToCamel('hello_world')).toBe('helloWorld')
  })
})

describe('camelToSnake', () => {
  it('应该转换为下划线格式', () => {
    expect(camelToSnake('helloWorld')).toBe('hello_world')
  })
})

describe('toPascalCase', () => {
  it('应该转换为帕斯卡命名', () => {
    expect(toPascalCase('hello-world')).toBe('HelloWorld')
    expect(toPascalCase('hello_world')).toBe('HelloWorld')
  })
})

describe('truncate', () => {
  it('应该截断字符串', () => {
    expect(truncate('hello world', 8)).toBe('hello...')
    expect(truncate('hello world', 8, '***')).toBe('hello***')
  })

  it('字符串长度小于限制时应该返回原字符串', () => {
    expect(truncate('hello', 10)).toBe('hello')
  })
})

describe('stripHtml', () => {
  it('应该移除HTML标签', () => {
    expect(stripHtml('<p>hello</p>')).toBe('hello')
    expect(stripHtml('<div>test</div>')).toBe('test')
  })
})

describe('escapeHtml', () => {
  it('应该转义HTML字符', () => {
    expect(escapeHtml('<div>test</div>')).toBe('&lt;div&gt;test&lt;/div&gt;')
    expect(escapeHtml('&')).toBe('&amp;')
  })
})

describe('randomString', () => {
  it('应该生成随机字符串', () => {
    const str = randomStr(10)
    expect(str).toHaveLength(10)
  })
})

describe('reverse', () => {
  it('应该反转字符串', () => {
    expect(reverse('hello')).toBe('olleh')
  })
})

describe('isPalindrome', () => {
  it('应该判断回文', () => {
    expect(isPalindrome('racecar')).toBe(true)
    expect(isPalindrome('hello')).toBe(false)
  })
})

describe('template', () => {
  it('应该替换模板变量', () => {
    expect(template('Hello {name}', { name: 'World' })).toBe('Hello World')
  })
})

describe('hasChinese', () => {
  it('应该判断是否包含中文', () => {
    expect(hasChinese('hello')).toBe(false)
    expect(hasChinese('hello世界')).toBe(true)
  })
})

describe('byteLength', () => {
  it('应该计算字节长度', () => {
    expect(byteLength('hello')).toBe(5)
    expect(byteLength('你好')).toBe(6)
  })
})
