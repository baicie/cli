# 快速开始

## 安装

```bash
npm install -g @baicie/cli
```

## 创建第一个项目

运行以下命令开始创建项目：

```bash
bca my-project
```

CLI 会引导你完成以下步骤：

1. 输入项目介绍
2. 选择包管理工具（npm/yarn/pnpm/cnpm）
3. 选择模板源（GitHub/Gitee/自定义）
4. 选择项目模板
5. 是否初始化 Git 仓库
6. 是否自动安装依赖

## 示例

```bash
$ bca my-vue-app

? 请输入项目介绍: My awesome Vue app
? 选择包管理工具: pnpm
? 选择模板源: GitHub
? 选择模板: Vue3
? 是否初始化 Git 仓库? Yes
? 是否自动安装依赖? Yes

✔ 创建项目: my-vue-app
✔ 项目创建成功
```

## 下一步

- 查看 [命令文档](/cli/commands) 了解所有可用命令
- 查看 [模板列表](/cli/templates) 了解支持的模板
