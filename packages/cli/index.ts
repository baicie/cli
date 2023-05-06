import { existsSync } from 'node:fs'
import consola from 'consola'
import {
  red,
  reset,
} from 'kolorist'
import type { Answers } from 'prompts'
import prompts from 'prompts'
import { cacheRoot, downloadWarpper, formatTargetDir, getProjectName, isEmpty, isValidPackageName, toValidPackageName } from './src'

type Name =
  'projectName' |
  'overwrite' |
  'overwriteChecker' |
  'packageName' |
  'repoType' |
  'download'

const defaultTargetDir = 'my-project'

async function main() {
  let result: Answers<Name>
  let targetDir = ''
  try {
    result = await prompts([
      {
        // 输入值类型
        type: 'text',
        // 输出key
        name: 'projectName',
        // 命令行提示
        message: '项目名称（将作为文件目录请使用英文）?',
        // 默认值
        initial: defaultTargetDir,
        onState: (state) => {
          targetDir = formatTargetDir(state.value) || defaultTargetDir
        },
      },
      {
        type: () =>
          // eslint-disable-next-line no-mixed-operators
          !existsSync(targetDir) || isEmpty(targetDir) ? null : 'confirm',
        name: 'overwrite',
        message: () =>
          `目标文件夹${targetDir}存在且不是空文件夹，是否覆写?`,
      },
      {
        name: 'overwriteChecker',
        type: (_, { overwrite }: { overwrite?: boolean }) => {
          if (overwrite === false)
            throw new Error(`${red('✖')} 创建取消`)

          return null
        },
      },
      {
        type: () =>
          isValidPackageName(getProjectName(targetDir)) ? null : 'text',
        name: 'packageName',
        initial: () => toValidPackageName(getProjectName(targetDir)),
        validate: (dir) => {
          return isValidPackageName(dir) || '不合法的 package.json name'
        },
      },
      {
        type: 'select',
        name: 'repoType',
        message: '请选择仓库类型',
        initial: 0,
        choices: [
          {
            title: reset('github'),
            value: 'https://github.com/baicie/template-repo/archive/refs/heads/master.zip',
            description: 'https://github.com/baicie/template-repo.git',
          },
          {
            title: red('gitee （快些 大概）'),
            value: 'gitee',
          },
        ],
        format: async (value) => {
          consola.log('value', value)
          await downloadWarpper(
            value, cacheRoot,
          )
        },
      },
      {
        type: 'date',
        name: 'download',
        message: 'download',
      },
    ])
    const { projectName } = result
    consola.success(`Hello ${projectName}!`)
  }
  catch (error) {

  }
}

main().catch((e) => {
  console.error(e)
})
