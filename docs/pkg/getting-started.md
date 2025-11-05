# 快速开始

## 安装

```bash
npm install @baicie/pkg
```

## 基本用法

### 创建 package.json

```typescript
import { createPackageJson, prettifyPackageJson } from '@baicie/pkg'

// 创建基础 package.json
const pkg = createPackageJson({
  name: 'my-app',
  version: '1.0.0',
  description: 'My awesome app',
})

// 使用预设模板
const libPkg = createPackageJson({
  name: '@scope/my-lib',
  preset: 'library', // 'basic' | 'library' | 'cli' | 'monorepo' | 'typescript'
})

// 格式化为字符串
const formatted = prettifyPackageJson(pkg)
console.log(formatted)
```

### 操作依赖

```typescript
import {
  addDependency,
  removeDependency,
  updateDependencyVersion,
  addScript,
} from '@baicie/pkg'

let pkg = createPackageJson({ name: 'my-app' })

// 添加依赖
pkg = addDependency(pkg, 'react', '^18.0.0', 'dependencies')
pkg = addDependency(pkg, 'typescript', '^5.0.0', 'devDependencies')

// 更新依赖版本
pkg = updateDependencyVersion(pkg, 'react', '^18.1.0')

// 添加脚本
pkg = addScript(pkg, 'dev', 'vite')
pkg = addScript(pkg, 'build', 'vite build')
```

### 验证 package.json

```typescript
import { validatePackageJson } from '@baicie/pkg'

const pkg = {
  name: 'my-app',
  version: '1.0.0',
}

const result = validatePackageJson(pkg)
if (result.valid) {
  console.log('✅ package.json 有效')
} else {
  result.errors.forEach(err => {
    console.log(`❌ ${err.field}: ${err.message}`)
  })
}
```
