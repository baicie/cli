import path from 'node:path'
import glob from 'fast-glob'
import fs from 'fs-extra'
import { excludeFiles } from '../util'

export async function clearTemplates(rootPath: string) {
  // 清除第一级文件夹
  const deep = 1
  const files = excludeFiles(await glob('**/**', {
    onlyDirectories: true,
    cwd: rootPath,
    deep,
  }), ['default'])

  const tasks = files.map(async file => await fs.remove(path.join(rootPath, file)))

  await Promise.all(tasks)
}
