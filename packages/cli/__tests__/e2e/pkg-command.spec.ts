import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { execaCommand } from 'execa'
import fs from 'fs-extra'
import path from 'node:path'
import { tmpdir } from 'node:os'

const CLI_PATH = path.join(__dirname, '../../cli.js')

describe('CLI E2E - pkg 命令', () => {
  const testDir = path.join(tmpdir(), 'baicie-cli-pkg-e2e-test')

  beforeAll(async () => {
    await fs.ensureDir(testDir)
    process.chdir(testDir)
  })

  afterAll(async () => {
    if (await fs.pathExists(testDir)) {
      await fs.remove(testDir)
    }
  })

  it('应该能够创建 package.json', async () => {
    const testProjectDir = path.join(testDir, 'pkg-test')
    await fs.ensureDir(testProjectDir)
    process.chdir(testProjectDir)

    // 执行 pkg 创建命令
    const { stdout, exitCode } = await execaCommand(
      `node ${CLI_PATH} pkg --create --name test-package --version 1.0.0`,
      {
        cwd: testProjectDir,
        env: { ...process.env, CI: 'true' },
      },
    )

    // 验证命令执行成功
    expect(exitCode).toBe(0)

    // 验证 package.json 已创建
    const pkgPath = path.join(testProjectDir, 'package.json')
    expect(await fs.pathExists(pkgPath)).toBe(true)

    // 验证 package.json 内容
    const pkg = await fs.readJson(pkgPath)
    expect(pkg.name).toBe('test-package')
    expect(pkg.version).toBe('1.0.0')
  }, 15000)

  it('应该能够格式化现有的 package.json', async () => {
    const testProjectDir = path.join(testDir, 'pkg-format-test')
    await fs.ensureDir(testProjectDir)
    process.chdir(testProjectDir)

    // 创建未格式化的 package.json
    const pkgPath = path.join(testProjectDir, 'package.json')
    const unformattedPkg = {
      version: '1.0.0',
      name: 'test-package',
      description: 'Test package',
      dependencies: { z: '^1.0.0', a: '^1.0.0' },
    }

    await fs.writeJson(pkgPath, unformattedPkg, { spaces: 2 })

    // 执行格式化命令
    const { exitCode } = await execaCommand(`node ${CLI_PATH} pkg --format`, {
      cwd: testProjectDir,
      env: { ...process.env, CI: 'true' },
    })

    expect(exitCode).toBe(0)

    // 验证 package.json 已格式化（字段顺序可能已调整）
    const formattedPkg = await fs.readJson(pkgPath)
    expect(formattedPkg.name).toBe('test-package')
    expect(formattedPkg.version).toBe('1.0.0')
  }, 15000)
})
