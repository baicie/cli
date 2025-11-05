# 快速开始

## 安装

```bash
npm install @baicie/release
```

## 基本用法

### 发布单个包

```typescript
import { release } from '@baicie/release'

await release({
  packages: ['@baicie/cli'],
  logChangelog: async pkg => {
    console.log(`显示 ${pkg} 的变更日志`)
  },
  generateChangelog: async (pkg, version) => {
    console.log(`为 ${pkg} 生成变更日志`)
  },
  toTag: (pkg, version) => `${pkg}@${version}`,
  getPkgDir: pkg => `packages/cli`,
})
```

### 发布多个包

```typescript
await release({
  packages: ['@baicie/cli', '@baicie/pkg', '@baicie/tools'],
  // ... 其他配置
})
```

## 发布流程

1. 选择要发布的包
2. 显示变更日志
3. 验证包配置
4. 选择版本号类型（major/minor/patch/custom）
5. 更新版本号
6. 生成变更日志
7. 提交更改
8. 创建 Git 标签
9. 推送到远程仓库

## 版本号规则

- **major** - 主版本号（不兼容的 API 修改）
- **minor** - 次版本号（向下兼容的功能性新增）
- **patch** - 修订号（向下兼容的问题修正）
- **custom** - 自定义版本号
