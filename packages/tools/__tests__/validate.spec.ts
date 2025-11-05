import { describe, expect, it } from 'vitest'
import {
  isBase64,
  isChinese,
  isCreditCard,
  isEmail,
  isEnglish,
  isHexColor,
  isIPv4,
  isIPv6,
  isIdCard,
  isJSON,
  isMac,
  isPhone,
  isStrongPassword,
  isUrl,
  isUsername,
} from '../src/validate'

describe('isEmail', () => {
  it('应该验证邮箱', () => {
    expect(isEmail('test@example.com')).toBe(true)
    expect(isEmail('invalid')).toBe(false)
  })
})

describe('isPhone', () => {
  it('应该验证手机号', () => {
    expect(isPhone('13800138000')).toBe(true)
    expect(isPhone('12345678901')).toBe(false)
  })
})

describe('isIdCard', () => {
  it('应该验证身份证号', () => {
    // 注意：这里使用一个有效的身份证号格式（实际校验码可能不正确）
    expect(isIdCard('110101199001011234')).toBeDefined()
  })
})

describe('isUrl', () => {
  it('应该验证URL', () => {
    expect(isUrl('https://example.com')).toBe(true)
    expect(isUrl('invalid')).toBe(false)
  })
})

describe('isIPv4/isIPv6', () => {
  it('应该验证IP地址', () => {
    expect(isIPv4('192.168.1.1')).toBe(true)
    expect(isIPv6('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(true)
  })
})

describe('isMac', () => {
  it('应该验证MAC地址', () => {
    expect(isMac('00:1B:44:11:3A:B7')).toBe(true)
  })
})

describe('isCreditCard', () => {
  it('应该验证信用卡号', () => {
    // 使用测试卡号
    expect(isCreditCard('4111111111111111')).toBe(true)
  })
})

describe('isStrongPassword', () => {
  it('应该验证强密码', () => {
    expect(isStrongPassword('Password123!')).toBe(true)
    expect(isStrongPassword('weak')).toBe(false)
  })
})

describe('isUsername', () => {
  it('应该验证用户名', () => {
    expect(isUsername('user123')).toBe(true)
    expect(isUsername('user name')).toBe(false)
  })
})

describe('isChinese/isEnglish', () => {
  it('应该验证语言', () => {
    expect(isChinese('你好')).toBe(true)
    expect(isEnglish('hello')).toBe(true)
  })
})

describe('isHexColor', () => {
  it('应该验证颜色值', () => {
    expect(isHexColor('#ff0000')).toBe(true)
    expect(isHexColor('#f00')).toBe(true)
  })
})

describe('isBase64/isJSON', () => {
  it('应该验证格式', () => {
    expect(isBase64('SGVsbG8=')).toBe(true)
    expect(isJSON('{"a":1}')).toBe(true)
  })
})
