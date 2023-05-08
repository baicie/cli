import path from 'node:path'
import fs from 'fs-extra'
import { TEMPLATE_CREATOR } from '@baicie/help'
import { templateRoot } from '../util'
import type { FileStat } from './download'
import { download, readDirWithFileTypes } from './download'

export interface ITemplates {
  name: string
  platforms?: string | string[]
  desc?: string
}

const TEMP_DOWNLOAD_FOLDER = 'baicie-temp'

export async function fetchTemplate(repo: string, savePath: string) {
  // savePath templates/
  // tempPath templates/baicie-temp/
  const tempPath = path.join(savePath, TEMP_DOWNLOAD_FOLDER)

  if (fs.existsSync(tempPath))
    await fs.remove(tempPath)
  await fs.mkdir(tempPath)

  const files = await download(repo, tempPath)
  const repos: FileStat[] = []

  files.forEach((file) => {
    if (file.isDirectory) {
      const repoPath = path.join(tempPath, file.name)
      const res = readDirWithFileTypes(repoPath).filter(
        file => !file.name.startsWith('.') && file.isDirectory && file.name !== '__MACOSX',
      )
      repos.push(...res)
    }
  })

  const name = files[0].name
  const templateFolder = name ? path.join(tempPath, name) : ''

  // 拷贝解压后文件
  await Promise.all(
    repos.map((file) => {
      const dest = path.join(templateRoot, file.name)
      const soucePath = path.join(templateFolder, file.name)
      return fs.move(soucePath, dest, { overwrite: true })
    }),
  )
  // 清除缓存文件
  await fs.remove(tempPath)

  const res: ITemplates[] = repos.map((file) => {
    // 读取模板配置
    const creatorFile = path.join(savePath, file.name, TEMPLATE_CREATOR)

    if (!fs.existsSync(creatorFile))
      return { name: file.name }

    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
    const { platforms = '', desc = '' } = require(creatorFile)

    return {
      name,
      platforms,
      desc,
    }
  })

  return res
}
