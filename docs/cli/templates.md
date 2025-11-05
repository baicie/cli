# 模板

CLI 支持多种项目模板，覆盖前端、后端、移动端等多个场景。

## 前端模板

### Vue3

基于 Vue 3 + Vite 的现代化前端项目模板。

**特性：**

- Vue 3 Composition API
- Vite 构建工具
- TypeScript 支持
- Vue Router
- Pinia 状态管理

### Vite Project

轻量级 Vite 项目模板，适合快速原型开发。

### Default

基础的 HTML 项目模板，适合静态网站。

## 后端模板

### API Server

基于 NestJS 的完整后端服务模板。

**特性：**

- NestJS 框架
- TypeScript
- RESTful API
- 数据库集成

### Node TypeScript

Node.js + TypeScript 项目模板。

### Simple Node TS

简单的 Node.js TypeScript 项目模板。

## 移动端模板

### Taro

基于 Taro 的跨平台移动应用模板。

**特性：**

- 一次编写，多端运行
- React 语法
- 支持微信小程序、H5、React Native

## 扩展模板

### Monorepo

多包管理项目结构模板，使用 pnpm workspace。

### Micro Frontend

微前端架构项目模板。

### Plasmo

浏览器扩展开发模板。

## 使用自定义模板

CLI 支持使用自定义的 GitHub 仓库作为模板源：

```bash
bca my-project

# 选择模板源时选择"自定义"
# 然后输入 GitHub 仓库地址，例如：
# https://github.com/username/template-repo
```
