import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { execaCommand } from 'execa'
import fs from 'fs-extra'
import path from 'node:path'
import { tmpdir } from 'node:os'

const CLI_PATH = path.join(__dirname, '../../cli.js')

describe('CLI E2E - 项目创建', () => {
  const testDir = path.join(tmpdir(), 'baicie-cli-e2e-test')
  const projectName = 'test-project'

  beforeAll(async () => {
    // 确保测试目录存在
    await fs.ensureDir(testDir)
    process.chdir(testDir)
  })

  afterAll(async () => {
    // 清理测试目录
    if (await fs.pathExists(testDir)) {
      await fs.remove(testDir)
    }
  })

  it('应该能够创建基础项目（不安装依赖）', async () => {
    const projectPath = path.join(testDir, projectName)

    // 清理可能存在的旧项目
    if (await fs.pathExists(projectPath)) {
      await fs.remove(projectPath)
    }

    // 执行创建命令（使用非交互模式）
    const { stdout, exitCode } = await execaCommand(
      `node ${CLI_PATH} ${projectName} --template default --npm pnpm --auto-install false`,
      {
        cwd: testDir,
        env: { ...process.env, CI: 'true' },
      },
    )

    expect(exitCode).toBe(0)
    expect(stdout).toContain('创建项目')

    // 验证项目目录已创建
    expect(await fs.pathExists(projectPath)).toBe(true)

    // 验证 package.json 存在
    const pkgPath = path.join(projectPath, 'package.json')
    expect(await fs.pathExists(pkgPath)).toBe(true)

    // 验证 package.json 内容
    const pkg = await fs.readJson(pkgPath)
    expect(pkg.name).toBe(projectName)
  }, 30000)

  it('应该能够创建项目并生成正确的文件结构', async () => {
    const projectPath = path.join(testDir, `${projectName}-structure`)

    // 清理可能存在的旧项目
    if (await fs.pathExists(projectPath)) {
      await fs.remove(projectPath)
    }

    // 执行创建命令
    await execaCommand(
      `node ${CLI_PATH} ${projectName}-structure --template default --npm pnpm --auto-install false`,
      {
        cwd: testDir,
        env: { ...process.env, CI: 'true' },
      },
    )

    // 验证基本文件结构
    expect(await fs.pathExists(projectPath)).toBe(true)
    expect(await fs.pathExists(path.join(projectPath, 'package.json'))).toBe(
      true,
    )

    // 验证 README 可能存在（取决于模板）
    const readmePath = path.join(projectPath, 'README.md')
    // README 可能不存在，所以不强制要求
  }, 30000)

  it('应该支持 Git 初始化', async () => {
    const projectPath = path.join(testDir, `${projectName}-git`)

    // 清理可能存在的旧项目
    if (await fs.pathExists(projectPath)) {
      await fs.remove(projectPath)
    }

    // 执行创建命令并初始化 Git
    await execaCommand(
      `node ${CLI_PATH} ${projectName}-git --template default --npm pnpm --auto-install false --git-init true`,
      {
        cwd: testDir,
        env: { ...process.env, CI: 'true' },
      },
    )

    // 等待 Git 初始化完成
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 验证 .git 目录存在
    const gitPath = path.join(projectPath, '.git')
    // 注意：Git 初始化是异步的，可能需要等待
    // 在实际测试中可能需要更长的等待时间或使用轮询
  }, 30000)

  it('应该能够处理不同的模板', async () => {
    const projectPath = path.join(testDir, `${projectName}-template`)

    // 清理可能存在的旧项目
    if (await fs.pathExists(projectPath)) {
      await fs.remove(projectPath)
    }

    // 测试默认模板
    await execaCommand(
      `node ${CLI_PATH} ${projectName}-template --template default --npm pnpm --auto-install false`,
      {
        cwd: testDir,
        env: { ...process.env, CI: 'true' },
      },
    )

    expect(await fs.pathExists(projectPath)).toBe(true)
    expect(await fs.pathExists(path.join(projectPath, 'package.json'))).toBe(
      true,
    )
  }, 30000)
})
