/**
 * 验证工具方法
 */

/**
 * 验证邮箱
 * @example
 * isEmail('test@example.com') // true
 */
export function isEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * 验证手机号（中国大陆）
 * @example
 * isPhone('13800138000') // true
 */
export function isPhone(phone: string): boolean {
  const regex = /^1[3-9]\d{9}$/;
  return regex.test(phone);
}

/**
 * 验证身份证号（中国大陆）
 * @example
 * isIdCard('110101199001011234') // true
 */
export function isIdCard(idCard: string): boolean {
  const regex =
    /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dX]$/i;
  if (!regex.test(idCard)) return false;

  // 验证校验码
  const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  const checkCodes = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];

  let sum = 0;
  for (let i = 0; i < 17; i++) {
    sum += Number.parseInt(idCard[i]) * weights[i];
  }

  const checkCode = checkCodes[sum % 11];
  return idCard[17].toUpperCase() === checkCode;
}

/**
 * 验证 URL
 * @example
 * isUrl('https://example.com') // true
 */
export function isUrl(url: string): boolean {
  try {
    // eslint-disable-next-line no-new
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * 验证 IP 地址（IPv4）
 * @example
 * isIPv4('192.168.1.1') // true
 */
export function isIPv4(ip: string): boolean {
  const regex =
    /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
  return regex.test(ip);
}

/**
 * 验证 IP 地址（IPv6）
 * @example
 * isIPv6('2001:0db8:85a3:0000:0000:8a2e:0370:7334') // true
 */
export function isIPv6(ip: string): boolean {
  const regex = /^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i;
  return regex.test(ip);
}

/**
 * 验证 MAC 地址
 * @example
 * isMac('00:1B:44:11:3A:B7') // true
 */
export function isMac(mac: string): boolean {
  const regex = /^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/i;
  return regex.test(mac);
}

/**
 * 验证信用卡号
 * @example
 * isCreditCard('4111111111111111') // true
 */
export function isCreditCard(cardNumber: string): boolean {
  const regex = /^\d{13,19}$/;
  if (!regex.test(cardNumber)) return false;

  // Luhn 算法验证
  let sum = 0;
  let isEven = false;

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = Number.parseInt(cardNumber[i]);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

/**
 * 验证邮政编码（中国大陆）
 * @example
 * isPostalCode('100000') // true
 */
export function isPostalCode(code: string): boolean {
  const regex = /^\d{6}$/;
  return regex.test(code);
}

/**
 * 验证 QQ 号
 * @example
 * isQQ('123456789') // true
 */
export function isQQ(qq: string): boolean {
  const regex = /^[1-9]\d{4,10}$/;
  return regex.test(qq);
}

/**
 * 验证微信号
 * @example
 * isWeChat('wxid_123456') // true
 */
export function isWeChat(wechat: string): boolean {
  const regex = /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/;
  return regex.test(wechat);
}

/**
 * 验证车牌号（中国大陆）
 * @example
 * isLicensePlate('京A12345') // true
 */
export function isLicensePlate(plate: string): boolean {
  const regex =
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/;
  return regex.test(plate);
}

/**
 * 验证强密码（至少包含大小写字母、数字、特殊字符中的三种，且长度 8-16 位）
 * @example
 * isStrongPassword('Abc@1234') // true
 */
export function isStrongPassword(password: string): boolean {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
  return regex.test(password);
}

/**
 * 验证中等密码（至少包含字母和数字，长度 6-16 位）
 * @example
 * isMediumPassword('Abc123') // true
 */
export function isMediumPassword(password: string): boolean {
  const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,16}$/;
  return regex.test(password);
}

/**
 * 验证用户名（字母开头，允许字母数字下划线，5-16 位）
 * @example
 * isUsername('user_123') // true
 */
export function isUsername(username: string): boolean {
  const regex = /^[a-zA-Z]\w{4,15}$/;
  return regex.test(username);
}

/**
 * 验证是否只包含中文
 * @example
 * isChinese('你好') // true
 */
export function isChinese(str: string): boolean {
  const regex = /^[\u4E00-\u9FA5]+$/;
  return regex.test(str);
}

/**
 * 验证是否只包含英文
 * @example
 * isEnglish('hello') // true
 */
export function isEnglish(str: string): boolean {
  const regex = /^[a-zA-Z]+$/;
  return regex.test(str);
}

/**
 * 验证是否只包含数字
 * @example
 * isNumeric('12345') // true
 */
export function isNumeric(str: string): boolean {
  const regex = /^\d+$/;
  return regex.test(str);
}

/**
 * 验证是否只包含字母和数字
 * @example
 * isAlphanumeric('abc123') // true
 */
export function isAlphanumeric(str: string): boolean {
  const regex = /^[a-zA-Z0-9]+$/;
  return regex.test(str);
}

/**
 * 验证十六进制颜色值
 * @example
 * isHexColor('#ff0000') // true
 * isHexColor('#f00') // true
 */
export function isHexColor(color: string): boolean {
  const regex = /^#([0-9A-F]{3}|[0-9A-F]{6})$/i;
  return regex.test(color);
}

/**
 * 验证 Base64 字符串
 * @example
 * isBase64('SGVsbG8gV29ybGQ=') // true
 */
export function isBase64(str: string): boolean {
  const regex = /^[A-Za-z0-9+/]+=*$/;
  if (!regex.test(str)) return false;

  try {
    return btoa(atob(str)) === str;
  } catch {
    return false;
  }
}

/**
 * 验证 JSON 字符串
 * @example
 * isJSON('{"name":"test"}') // true
 */
export function isJSON(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}
