import consola from 'consola'
import chalk from 'chalk'
import type { IProjectConf } from './src'
import {
  askDescription,
  askNpm,
  askProjectName,
  askTemplate,
  askTemplateSource,
  createApp,
  fetchTemplates,
} from './src'

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
  // 下载模板并返回列表
  const templates = await fetchTemplates(conf)
  conf.template = await askTemplate(templates)
  return {
    ...conf,
  }
}

async function write(conf: IProjectConf) {
  await createApp(conf)
}

async function main() {
  try {
    const answers = await ask()

    await write(answers)
  }
  catch (error) {
    consola.log(chalk.red('创建项目失败：', error))
  }
}

main().catch((e) => {
  console.error(e)
})
