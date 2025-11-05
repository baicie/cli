# API 文档

## 创建功能

### createPackageJson(options?)

创建一个新的 package.json 对象。

**参数：**

- `options` - 创建选项
  - `name` - 包名
  - `version` - 版本号（默认：`'0.1.0'`）
  - `description` - 描述
  - `author` - 作者
  - `license` - 许可证（默认：`'MIT'`）
  - `preset` - 预设模板：`'basic'` | `'library'` | `'cli'` | `'monorepo'` | `'typescript'`

**返回：** `PackageJson` 对象

### createPackageJsonString(options?, indent?)

创建 package.json 的 JSON 字符串。

### clonePackageJson(base, overrides?)

克隆并修改 package.json。

## 格式化功能

### formatPackageJson(data, options?)

格式化 package.json 对象为字符串。

**选项：**

- `indent` - 缩进空格数（默认：`2`）
- `endOfLine` - 文件末尾添加换行符（默认：`true`）
- `sortFields` - 字段排序（默认：`true`）
- `sortScripts` - 脚本排序（默认：`false`）
- `sortDependencies` - 依赖排序（默认：`true`）

### prettifyPackageJson(data)

使用默认最佳实践格式化。

## 验证功能

### validatePackageJson(data, strict?)

验证 package.json 的完整性和正确性。

**返回：**

```typescript
{
  valid: boolean
  errors: ValidationError[]
  warnings?: ValidationError[]
}
```

### validateName(name)

验证包名是否符合规范。

### validateVersion(version)

验证版本号是否符合 semver 规范。

## 操作功能

### addDependency(data, name, version, type?)

添加依赖。`type` 可以是 `'dependencies'` | `'devDependencies'` | `'peerDependencies'` | `'optionalDependencies'`。

### removeDependency(data, name, type?)

移除依赖。

### updateDependencyVersion(data, name, version)

更新依赖版本。

### addScript(data, name, command)

添加或更新脚本。

### bumpVersion(data, type)

增加版本号。`type` 可以是 `'major'` | `'minor'` | `'patch'`。

## 排序功能

### sortPackageJson(data, options?)

排序 package.json 的字段。

### sortDependencies(data)

排序所有依赖字段。

### sortScripts(data)

排序 scripts 字段。
