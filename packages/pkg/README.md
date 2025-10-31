# @baicie/pkg

一个功能强大的 package.json 工具包，用于创建、格式化、验证和操作 package.json 文件。

[![npm version](https://img.shields.io/npm/v/@baicie/pkg.svg)](https://www.npmjs.com/package/@baicie/pkg)
[![license](https://img.shields.io/npm/l/@baicie/pkg.svg)](https://github.com/baicie/tools/blob/main/LICENSE)

## ✨ 特性

- 🎨 **格式化** - 标准化 package.json 格式，支持字段排序
- 🏗️ **创建** - 快速创建各类项目的 package.json
- ✅ **验证** - 全面验证 package.json 的正确性
- 🔧 **操作** - 轻松添加、删除、修改依赖和字段
- 📦 **类型安全** - 完整的 TypeScript 类型定义
- 🚀 **零依赖** - 轻量级，无外部依赖

## 📦 安装

```bash
npm install @baicie/pkg
# or
pnpm add @baicie/pkg
# or
yarn add @baicie/pkg
```

## 🚀 快速开始

### 创建 package.json

```typescript
import { createPackageJson, createPackageJsonString } from '@baicie/pkg'

// 创建基础 package.json
const pkg = createPackageJson({
  name: 'my-app',
  version: '1.0.0',
  description: 'My awesome app',
  author: 'Your Name',
  license: 'MIT',
})

// 使用预设模板创建
const libPkg = createPackageJson({
  name: '@scope/my-lib',
  preset: 'library', // 'basic' | 'library' | 'cli' | 'monorepo' | 'typescript'
})

// 创建 JSON 字符串
const pkgString = createPackageJsonString({
  name: 'my-app',
  preset: 'basic',
})
```

### 格式化 package.json

```typescript
import { formatPackageJson, prettifyPackageJson } from '@baicie/pkg'

const pkg = {
  name: 'my-app',
  version: '1.0.0',
  dependencies: {
    react: '^18.0.0',
    axios: '^1.0.0',
  },
}

// 自定义格式化
const formatted = formatPackageJson(pkg, {
  indent: 2,
  endOfLine: true,
  sortFields: true,
  sortDependencies: true,
  sortScripts: false,
})

// 使用默认最佳实践格式化
const prettified = prettifyPackageJson(pkg)

console.log(prettified)
```

### 验证 package.json

```typescript
import { validatePackageJson, validateName, validateVersion } from '@baicie/pkg'

const pkg = {
  name: 'my-app',
  version: '1.0.0',
}

// 验证整个 package.json
const result = validatePackageJson(pkg)
if (result.valid) {
  console.log('✅ package.json 有效')
} else {
  console.log('❌ 验证失败：')
  result.errors.forEach(err => {
    console.log(`  - ${err.field}: ${err.message}`)
  })
}

// 验证包名
const nameErrors = validateName('My-Invalid-Name')
console.log(nameErrors) // [{ field: 'name', message: '包名不能包含大写字母', ... }]

// 验证版本号
const versionErrors = validateVersion('1.0')
console.log(versionErrors) // [{ field: 'version', message: '版本号格式不符合 semver 规范', ... }]
```

### 操作 package.json

```typescript
import {
  addDependency,
  removeDependency,
  updateDependencyVersion,
  addScript,
  bumpVersion,
  addKeywords,
} from '@baicie/pkg'

let pkg = {
  name: 'my-app',
  version: '1.0.0',
}

// 添加依赖
pkg = addDependency(pkg, 'react', '^18.0.0', 'dependencies')
pkg = addDependency(pkg, 'typescript', '^5.0.0', 'devDependencies')

// 移除依赖
pkg = removeDependency(pkg, 'react')

// 更新依赖版本
pkg = updateDependencyVersion(pkg, 'typescript', '^5.3.0')

// 添加脚本
pkg = addScript(pkg, 'dev', 'vite')
pkg = addScript(pkg, 'build', 'vite build')

// 增加版本号
pkg = bumpVersion(pkg, 'minor') // 1.0.0 -> 1.1.0
pkg = bumpVersion(pkg, 'major') // 1.1.0 -> 2.0.0
pkg = bumpVersion(pkg, 'patch') // 2.0.0 -> 2.0.1

// 添加关键词
pkg = addKeywords(pkg, ['react', 'vite', 'typescript'])
```

### 排序功能

```typescript
import { sortPackageJson, sortDependencies, sortScripts } from '@baicie/pkg'

let pkg = {
  version: '1.0.0',
  name: 'my-app',
  dependencies: {
    'z-package': '^1.0.0',
    'a-package': '^1.0.0',
  },
}

// 排序所有字段
pkg = sortPackageJson(pkg, {
  sortDependencies: true,
  sortScripts: true,
})

// 只排序依赖
pkg = sortDependencies(pkg)

// 只排序脚本
pkg = sortScripts(pkg)
```

### 工具函数

```typescript
import {
  mergePackageJson,
  cleanObject,
  compareVersions,
  isScopedPackage,
  getPackageScope,
} from '@baicie/pkg'

// 合并两个 package.json
const base = {
  name: 'app',
  version: '1.0.0',
  dependencies: { react: '^18.0.0' },
}
const override = { version: '1.1.0', dependencies: { vue: '^3.0.0' } }
const merged = mergePackageJson(base, override)
// { name: 'app', version: '1.1.0', dependencies: { react: '^18.0.0', vue: '^3.0.0' } }

// 清理空值
const cleaned = cleanObject({ name: 'app', description: '', keywords: [] })
// { name: 'app' }

// 比较版本
compareVersions('1.2.3', '1.2.4') // -1
compareVersions('2.0.0', '1.9.9') // 1
compareVersions('1.0.0', '1.0.0') // 0

// 检查作用域包
isScopedPackage('@scope/package') // true
isScopedPackage('package') // false
getPackageScope('@scope/package') // 'scope'
```

## 📚 API 文档

### 创建功能

#### `createPackageJson(options?: CreateOptions): PackageJson`

创建一个新的 package.json 对象。

**选项：**

- `name` - 包名
- `version` - 版本号（默认：`'0.1.0'`）
- `description` - 描述
- `author` - 作者
- `license` - 许可证（默认：`'MIT'`）
- `type` - 模块类型（默认：`'module'`）
- `private` - 是否为私有包
- `preset` - 预设模板：`'basic'` | `'library'` | `'cli'` | `'monorepo'` | `'typescript'`

#### `createPackageJsonString(options?: CreateOptions, indent?: number): string`

创建 package.json 的 JSON 字符串。

#### `clonePackageJson(base: PackageJson, overrides?: Partial<PackageJson>): PackageJson`

克隆并修改 package.json。

### 格式化功能

#### `formatPackageJson(data: PackageJson, options?: FormatOptions): string`

格式化 package.json 对象为字符串。

**选项：**

- `indent` - 缩进空格数（默认：`2`）
- `endOfLine` - 文件末尾添加换行符（默认：`true`）
- `sortFields` - 字段排序（默认：`true`）
- `sortScripts` - 脚本排序（默认：`false`）
- `sortDependencies` - 依赖排序（默认：`true`）

#### `prettifyPackageJson(data: PackageJson): string`

使用默认最佳实践格式化。

### 验证功能

#### `validatePackageJson(data: PackageJson, strict?: boolean): ValidationResult`

验证 package.json 的完整性和正确性。

**返回值：**

```typescript
{
  valid: boolean
  errors: ValidationError[]
  warnings?: ValidationError[]
}
```

#### `validateName(name: string): ValidationError[]`

验证包名是否符合规范。

#### `validateVersion(version: string): ValidationError[]`

验证版本号是否符合 semver 规范。

### 操作功能

#### `addDependency(data, name, version, type?): PackageJson`

添加依赖。`type` 可以是 `'dependencies'` | `'devDependencies'` | `'peerDependencies'` | `'optionalDependencies'`。

#### `removeDependency(data, name, type?): PackageJson`

移除依赖。

#### `updateDependencyVersion(data, name, version): PackageJson`

更新依赖版本。

#### `addScript(data, name, command): PackageJson`

添加或更新脚本。

#### `bumpVersion(data, type): PackageJson`

增加版本号。`type` 可以是 `'major'` | `'minor'` | `'patch'`。

### 排序功能

#### `sortPackageJson(data, options?): PackageJson`

排序 package.json 的字段。

#### `sortDependencies(data): PackageJson`

排序所有依赖字段。

#### `sortScripts(data): PackageJson`

排序 scripts 字段。

## 🎯 使用场景

### 1. CLI 工具

在脚手架工具中创建项目的 package.json：

```typescript
import { createPackageJson, prettifyPackageJson } from '@baicie/pkg'
import fs from 'fs'

const pkg = createPackageJson({
  name: projectName,
  preset: 'library',
  author: 'Your Name',
})

fs.writeFileSync('package.json', prettifyPackageJson(pkg))
```

### 2. 代码规范工具

统一团队的 package.json 格式：

```typescript
import { formatPackageJsonString } from '@baicie/pkg'
import fs from 'fs'

const content = fs.readFileSync('package.json', 'utf-8')
const formatted = formatPackageJsonString(content, {
  indent: 2,
  sortFields: true,
  sortDependencies: true,
})

fs.writeFileSync('package.json', formatted)
```

### 3. 自动化脚本

批量更新项目依赖：

```typescript
import { updateDependencyVersion, prettifyPackageJson } from '@baicie/pkg'

let pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'))
pkg = updateDependencyVersion(pkg, 'react', '^18.3.0')
pkg = updateDependencyVersion(pkg, 'typescript', '^5.6.0')

fs.writeFileSync('package.json', prettifyPackageJson(pkg))
```

## 🤝 贡献

欢迎贡献代码、报告问题或提出建议！

## 📄 License

MIT © [baicie](https://github.com/baicie)
