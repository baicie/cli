# 示例

## 在 CLI 工具中使用

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

## 统一团队格式

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

## 批量更新依赖

```typescript
import { updateDependencyVersion, prettifyPackageJson } from '@baicie/pkg'

let pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'))
pkg = updateDependencyVersion(pkg, 'react', '^18.3.0')
pkg = updateDependencyVersion(pkg, 'typescript', '^5.6.0')

fs.writeFileSync('package.json', prettifyPackageJson(pkg))
```

## 版本管理

```typescript
import { bumpVersion } from '@baicie/pkg'

let pkg = { name: 'my-app', version: '1.0.0' }
pkg = bumpVersion(pkg, 'patch') // 1.0.0 -> 1.0.1
pkg = bumpVersion(pkg, 'minor') // 1.0.1 -> 1.1.0
pkg = bumpVersion(pkg, 'major') // 1.1.0 -> 2.0.0
```
