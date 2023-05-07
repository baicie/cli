import path from 'node:path'
import fs from 'fs-extra'
import AdmZip from 'adm-zip'
import { download } from './download'

const TEMP_DOWNLOAD_FOLDER = 'baicie-temp'

export async function fetchTemplate(repo: string, savePath: string) {
  const tempPath = path.join(savePath, TEMP_DOWNLOAD_FOLDER)

  if (fs.existsSync(tempPath))
    await fs.remove(tempPath)
  await fs.mkdir(tempPath)

  await download(repo, tempPath)
  // unzip
  const zip = new AdmZip(tempPath)
  zip.extractAllTo(savePath, true)
}
