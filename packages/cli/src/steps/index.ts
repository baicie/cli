import fs from 'node:fs'
import { consola } from 'consola'
import { confirm, input, select } from '@inquirer/prompts'
import chalk from 'chalk'
import { DEFAULT_TEMPLATE_SRC, DEFAULT_TEMPLATE_SRC_GITEE } from '@baicie/help'
import { isEmpty } from '../util'

export * from './types'
export * from './fetch-templates'

const defaultTargetDir = 'my-project'

export async function askProjectName() {
  const projectName = await input(
    {
      message: '项目名称?',
      default: defaultTargetDir,
    },
  )

  // 存在且不为空
  consola.log(projectName)
  if (fs.existsSync(projectName) && !isEmpty(projectName)) {
    const overwrite = await confirm(
      {
        message: `当前目录${projectName}已经存在同名项目，是否覆写?`,
      },
    )

    if (overwrite) {
      // 清除操作
    }
    else {
      throw new Error(chalk.red('取消创建'))
    }
  }

  return projectName
}

export async function askDescription() {
  // description
  return await input({
    message: '请输入项目介绍',
  })
}

export async function askNpm() {
  const choices = [
    {
      name: 'yarn',
      value: 'yarn',
    },
    {
      name: 'pnpm',
      value: 'pnpm',
    },
    {
      name: 'npm',
      value: 'npm',
    },
    {
      name: 'cnpm',
      value: 'cnpm',
    },
  ]
  return await select({
    message: '请选择包管理工具',
    choices,
  })
}

export async function askTemplateSource() {
  const choices = [
    {
      name: 'Gitee（最快）',
      value: DEFAULT_TEMPLATE_SRC_GITEE,
    },
    {
      name: 'Github（最新）',
      value: DEFAULT_TEMPLATE_SRC,
    },
    {
      name: 'CLI 内置默认模板',
      value: 'default-template',
    },
  ]

  return await select({
    message: '请选择包管理工具',
    choices,
  })
}
