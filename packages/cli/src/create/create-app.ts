import path from 'node:path'
import { exec } from 'node:child_process'
import { consola } from 'consola'
import chalk from 'chalk'
import fs from 'fs-extra'
import ora from 'ora'
import type { IProjectConf } from '../steps'
import { templateRoot } from '../util'
import { createFiles } from './create-files'
import packagesManagement from './commonds'

export async function createApp(conf: IProjectConf) {
  // 目标文件夹 和源文件夹
  const { projectName, template, autoInstall = true, npm } = conf
  conf.sourcePath = path.join(templateRoot, template)
  conf.targetPath = path.join(process.cwd(), projectName)

  if (!fs.existsSync(conf.sourcePath))
    return consola.log(chalk.red(`创建页面错误：找不到模板${conf.sourcePath}`))

  const logs = await createFiles(conf)

  consola.log('')
  consola.log(`${chalk.green('✔ ')}${chalk.grey(`创建项目: ${chalk.grey.bold(projectName)}`)}`)
  logs.forEach(log => consola.success(log))
  consola.log('')

  const gitInitSpinner = ora(`cd ${chalk.cyan.bold(projectName)}, 执行 ${chalk.cyan.bold('git init')}`).start()
  process.chdir(conf.targetPath)
  const gitInit = exec('git init')
  gitInit.on('close', (code) => {
    if (code === 0) {
      gitInitSpinner.color = 'green'
      gitInitSpinner.succeed(gitInit.stdout!.read())
    }
    else {
      gitInitSpinner.color = 'red'
      gitInitSpinner.fail(gitInit.stderr!.read())
    }
  })

  if (autoInstall) {
    // 安装
    const command: string = packagesManagement[npm].command
    const installSpinner = ora(`执行安装项目依赖 ${chalk.cyan.bold(command)}, 需要一会儿...`).start()

    // 执行命令
    const child = exec(command, (error) => {
      if (error) {
        installSpinner.color = 'red'
        installSpinner.fail(chalk.red('安装项目依赖失败，请自行重新安装！'))
        consola.error(error)
      }
      else {
        installSpinner.color = 'green'
        installSpinner.succeed('安装成功')
      }
      callSuccess(conf.targetPath)
    })

    // 输出
    child.stdout!.on('data', (data) => {
      installSpinner.stop()
      consola.log(data.replace(/\n$/, ''))
      installSpinner.start()
    })

    // 输出 错误信息
    child.stderr!.on('data', (data) => {
      installSpinner.warn(data.replace(/\n$/, ''))
      installSpinner.start()
    })
  }
}

function callSuccess(projectName: string | undefined) {
  consola.log(chalk.green(`创建项目 ${chalk.green.bold(projectName)} 成功！`))
  consola.log(chalk.green(`请进入项目目录 ${chalk.green.bold(projectName)} 开始工作吧！😝`))
}
