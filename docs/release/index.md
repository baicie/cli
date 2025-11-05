# @baicie/release

自动化发布工具，支持版本管理、变更日志生成和包发布。

## 特性

- 🚀 **版本管理** - 自动更新版本号
- 📝 **变更日志** - 自动生成变更日志
- 📦 **包发布** - 支持 npm 发布
- 🔍 **验证** - 发布前验证包配置
- 🎯 **Monorepo** - 支持 monorepo 项目

## 安装

```bash
npm install @baicie/release
# or
pnpm add @baicie/release
```

## 快速开始

```typescript
import { release } from '@baicie/release'

await release({
  packages: ['@baicie/cli', '@baicie/pkg'],
  logChangelog: async pkg => {
    // 显示变更日志
  },
  generateChangelog: async (pkg, version) => {
    // 生成变更日志
  },
  toTag: (pkg, version) => `${pkg}@${version}`,
  getPkgDir: pkg => `packages/${pkg.replace('@baicie/', '')}`,
})
```
