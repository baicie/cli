# 命令

## baicie-create-app (bca)

创建新项目的主命令。

### 用法

```bash
bca [项目名称] [选项]
```

### 选项

- `-d, --debug [feat]` - 显示调试日志
- `-des, --description <description>` - 项目描述
- `-n, --npm <npm>` - 包管理工具 (默认: pnpm)
- `-ts, --template-source <template-source>` - 模板源
- `-t, --template <template>` - 项目模板
- `-i, --auto-install [auto-install]` - 自动安装依赖 (默认: false)
- `-gi, --git-init [git-init]` - 初始化 Git 仓库 (默认: false)
- `-gr, --git-remote <git-remote>` - Git 远程仓库地址

### 示例

```bash
# 交互式创建
bca my-project

# 指定模板和包管理工具
bca my-project -t vue3 -n pnpm

# 自动安装依赖并初始化 Git
bca my-project -i -gi
```

## pkg

格式化或创建 package.json 文件。

### 用法

```bash
bca pkg [目录] [选项]
```

### 选项

- `-c, --create` - 创建新的 package.json 文件 (默认: true)
- `-f, --format` - 格式化现有的 package.json 文件 (默认: false)
- `-p, --preset <preset>` - 项目预设
- `-n, --name <name>` - 包名 (用于创建)
- `-v, --version <version>` - 包版本 (用于创建，默认: 0.1.0)
- `-des, --description <description>` - 包描述 (用于创建)

### 示例

```bash
# 创建 package.json
bca pkg --create --name my-package --version 1.0.0

# 格式化 package.json
bca pkg --format
```
