import path from 'node:path'
import type { SyncOptions } from 'execa'
import { execaCommandSync } from 'execa'
import { expect, test } from 'vitest'

const CLI_PATH = path.join(__dirname, '../cli.js')

const projectName = 'test-app'

const run = (args: string[], options?: SyncOptions) => {
  return execaCommandSync(`node ${CLI_PATH} ${args.join(' ')}`, {
    env: { ...process.env },
    ...options,
  })
}

test('prompts for the project name if none supplied', () => {
  const { stdout } = run([])
  expect(stdout).toContain('项目名称?')
})

test('prompts for the description if none supplied', () => {
  const { stdout } = run([projectName])
  expect(stdout).toContain('请输入项目介绍')
})
