# @baicie/pkg

一个功能强大的 package.json 工具包，用于创建、格式化、验证和操作 package.json 文件。

## 特性

- 🎨 **格式化** - 标准化 package.json 格式，支持字段排序
- 🏗️ **创建** - 快速创建各类项目的 package.json
- ✅ **验证** - 全面验证 package.json 的正确性
- 🔧 **操作** - 轻松添加、删除、修改依赖和字段
- 📦 **类型安全** - 完整的 TypeScript 类型定义
- 🚀 **零依赖** - 轻量级，无外部依赖

## 安装

```bash
npm install @baicie/pkg
# or
pnpm add @baicie/pkg
# or
yarn add @baicie/pkg
```

## 快速开始

### 创建 package.json

```typescript
import { createPackageJson } from '@baicie/pkg'

const pkg = createPackageJson({
  name: 'my-app',
  version: '1.0.0',
  description: 'My awesome app',
  author: 'Your Name',
  license: 'MIT',
})
```

### 格式化 package.json

```typescript
import { prettifyPackageJson } from '@baicie/pkg'

const formatted = prettifyPackageJson(pkg)
console.log(formatted)
```

### 验证 package.json

```typescript
import { validatePackageJson } from '@baicie/pkg'

const result = validatePackageJson(pkg)
if (result.valid) {
  console.log('✅ package.json 有效')
} else {
  console.log('❌ 验证失败：', result.errors)
}
```
