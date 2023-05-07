import path from 'node:path'
import fs from 'fs-extra'
import { TEMPLATE_CREATOR } from '@baicie/help'
import consola from 'consola'
import { templateRoot } from '../util'
import { download } from './download'

export interface ITemplates {
  name: string
  platforms?: string | string[]
  desc?: string
}

const TEMP_DOWNLOAD_FOLDER = 'baicie-temp'

// tempPath templates/baicie-temp
export async function fetchTemplate(repo: string, savePath: string) {
  const tempPath = path.join(savePath, TEMP_DOWNLOAD_FOLDER)
  // const zipPath = path.join(tempPath, 'temp.zip')

  if (fs.existsSync(tempPath))
    await fs.remove(tempPath)
  await fs.mkdir(tempPath)

  const files = await download(repo, tempPath)
  consola.success(files)
  const name = files[0].name
  const templateFolder = name ? path.join(tempPath, name) : ''

  // 拷贝解压后文件
  await Promise.all(
    files.map((file) => {
      const dest = path.join(templateRoot, file.name)
      return fs.move(templateFolder, dest, { overwrite: true })
    }),
  )
  // 清除缓存文件
  await fs.remove(tempPath)

  const res: ITemplates[] = files.map((file) => {
    // 读取模板配置
    const creatorFile = path.join(tempPath, file.name, TEMPLATE_CREATOR)

    if (!fs.existsSync(creatorFile))
      return { name }

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
