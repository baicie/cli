import consola from 'consola'
import chalk from 'chalk'
import type { IProjectConf } from './src'
import { askDescription, askNpm, askProjectName, askTemplateSource, fetchTemplates } from './src'

async function ask() {
  const conf: IProjectConf = {
    projectName: '',
    description: '',
    npm: '',
    templateSource: '',
    template: '',
  }

  conf.projectName = await askProjectName()
  conf.description = await askDescription()
  conf.npm = await askNpm()
  conf.templateSource = await askTemplateSource()

  const templates = await fetchTemplates(conf)

  return {
    ...conf,
  }
}

async function main() {
  try {
    const answers = await ask()
    consola.success(answers)
  }
  catch (error) {
    consola.log(chalk.red('创建项目失败：', error))
  }
}

main().catch((e) => {
  console.error(e)
})
