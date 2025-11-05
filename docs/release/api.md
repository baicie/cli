# API 文档

## release

发布包的主函数。

**参数：**

- `packages` - 包名数组
- `logChangelog` - 显示变更日志的函数
- `generateChangelog` - 生成变更日志的函数
- `toTag` - 生成标签的函数
- `getPkgDir` - 获取包目录的函数

**示例：**

```typescript
await release({
  packages: ['@baicie/cli'],
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

## publish

发布包到 npm。

**参数：**

- `defaultPackage` - 默认包名
- `getPkgDir` - 获取包目录的函数
- `provenance` - 是否启用 provenance
- `packageManager` - 包管理器

**示例：**

```typescript
await publish({
  defaultPackage: '@baicie/cli',
  getPkgDir: pkg => `packages/cli`,
  provenance: true,
  packageManager: 'pnpm',
})
```

## generateChangelog

生成变更日志。

**参数：**

- `getPkgDir` - 获取包目录的函数
- `tagPrefix` - 标签前缀

**示例：**

```typescript
await generateChangelog({
  getPkgDir: pkg => `packages/cli`,
  tagPrefix: '@baicie/cli@',
})
```
