import request from 'request'
import { TEMPLATE_COMMIT } from '../util'
import fs from 'fs-extra'
import path from 'node:path'

function getRemoteLatestCommit() {
  const url = TEMPLATE_COMMIT
  return new Promise<string>((resolve, reject) => {
    request(
      { url, headers: { 'User-Agent': '@baicie/cli' }, json: true },
      (err, res, body) => {
        if (err) return reject(err)
        if (res.statusCode !== 200) {
          resolve('')
        }
        resolve(body.sha)
      },
    )
  })
}

async function getLocalCommit(commitFile: string) {
  if (await fs.pathExists(commitFile)) {
    return (await fs.readFile(commitFile, 'utf-8')).trim()
  }
  return null
}

export async function diffCommit(tempPath: string): Promise<boolean> {
  const commitFile = path.join(tempPath, '.commit-hash')
  const localCommit = await getLocalCommit(commitFile)
  const remoteCommit = await getRemoteLatestCommit()
  // 获取失败不去下载
  if (localCommit !== '' && localCommit !== remoteCommit) {
    fs.writeFileSync(commitFile, remoteCommit)
    return true
  }
  return false
}
