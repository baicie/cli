import { cac } from 'cac'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import chalk from 'picocolors'
import { ask, write } from '.'
import type { IProjectConf } from './steps'
import { DEFAULT_TEMPLATE_SRC } from './util'
import { createLogger } from './util/logger'
import type { IPkgOptions } from './pkg'
import { pkg } from './pkg'

const { version } = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url)).toString(),
)

const cli = cac('bca')

cli.option('-d, --debug [feat]', `[string | boolean] show debug logs`)

cli
  .command('[root]', 'start a new project')
  .option('-des, --description <description>', 'description of the project')
  .option('-n, --npm <npm>', 'npm of the project', { default: 'pnpm' })
  .option(
    '-ts, --template-source <template-source>',
    'template source of the project',
    {
      default: DEFAULT_TEMPLATE_SRC,
    },
  )
  .option('-t, --template <template>', 'template of the project')
  .option('-i, --auto-install [auto-install]', 'auto install of the project', {
    default: false,
  })
  .option('-gi, --git-init [git-init]', 'git init of the project', {
    default: false,
  })
  .option('-gr, --git-remote <git-remote>', 'git remote of the project')
  .action(async (root: string, options: IProjectConf) => {
    const logger = createLogger({ debug: options.debug })
    logger.success(`start a new project ${root}`)
    logger.success(`options is ${JSON.stringify(options)}`)
    try {
      const answers = await ask({ ...options, projectName: root, logger })
      await write(answers)
    } catch (error) {
      logger.error(chalk.red(`创建项目失败：${error}`))
    }
  })

cli
  .command('pkg [root]', 'Format or create package.json file')
  .option('-c, --create', 'Create a new package.json file')
  .option('-f, --format', 'Format existing package.json file', {
    default: true,
  })
  .option('-n, --name <name>', 'Package name (for create)')
  .option('-v, --version <version>', 'Package version (for create)', {
    default: '1.0.0',
  })
  .option(
    '-des, --description <description>',
    'Package description (for create)',
  )
  .action(async (root: string = '.', options: IPkgOptions) => {
    const logger = createLogger({ debug: options.debug || false })
    const targetDir = resolve(process.cwd(), root)
    const pkgPath = resolve(targetDir, 'package.json')

    try {
      pkg(options, logger, pkgPath)
    } catch (error) {
      logger.error(chalk.red(`Failed to process package.json: ${error}`))
    }
  })

cli.help()
cli.version(version)

cli.parse()
