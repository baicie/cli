import path from 'node:path'
import glob from 'fast-glob'
import fs from 'fs-extra'
import chalk from 'chalk'
import type { IProjectConf } from '../steps'

export async function createFiles(conf: IProjectConf) {
  const files = await glob('**/**', {
    cwd: conf.sourcePath,
    onlyFiles: true,
  })

  // 可以换成同步
  files.map(async (file) => {
    if (!conf.sourcePath || !conf.targetPath)
      return
    const sourcePath = path.join(conf.sourcePath, file)
    const targetPath = path.join(conf.targetPath, file)

    if (!fs.existsSync(path.dirname(targetPath)))
      fs.mkdirSync(path.dirname(targetPath))

    await fs.copy(sourcePath, targetPath, { overwrite: true })

    return (`${chalk.grey(`创建文件: ${targetPath}`)}`)
  })

  const res = await Promise.all(files)

  return res
}
